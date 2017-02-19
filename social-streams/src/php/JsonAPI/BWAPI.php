<?php

    namespace SocialStreams\JsonAPI;

    class BWAPI
    {

        // What is the 'front' for the API? i.e. 'api' will mean domain.com/api/stuff/here/
        public $apiFront;

        // Store the last fired action so we can print it to our output
        private $requestAction;

        // Store full request to output with the response
        private $request;

        // Output temp variable
        private $output;

        // Output prettyPrint flag
        private $prettyPrint;

        // Cache of the original request body. We need to override $_REQUEST before running the json api actions.
        private $requestBodyBackup;

        private $initialized;

        /**
         * Set our actions and filters and class variables
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param None
         * @return null
         */

        public function __construct()
        {

            // Load our core API functionality
            //
            // Loading during 'bw_api_call' doesn't work since we need to use the API
            // from within PHP as well, so I made a new action for when any call is run.
            // This action will fire only on the first call. We should load mobules on this action.
            //
            add_action( 'bw_api_init', array( &$this, 'bw_api_init__loadModules' ) );

            // Add our rewrite rules
            add_filter( 'rewrite_rules_array', array( &$this, 'rewrite_rules_array__createRewriteRules' ) );

            // Add some query vars so WP recognises them
            add_filter( 'query_vars', array( &$this, 'query_vars__addAPIQueryVars' ) );

            // bw_api_request is made before most anything, we hook in early to check credentials
            add_action( 'bw_api_request', array( &$this, 'bw_api_request__securityChecks' ), 10, 3 );

            // Now we have the query vars set up, we need to tell WP what to do if they're in the URL
            // TODO: Do we need this to be on template_redirect? Can it be earlier? parse_query? send_headers?
            add_action( 'template_redirect', array( &$this, 'template_redirect__showJSONOutput' ), 1 );

            // run the _show_post_preview action on bw_api_init.
            add_action( 'bw_api_init', '_show_post_preview' );

            // override the server request body in case the api request is a GET request.
            add_action( 'bw_api_before_run_dynamic_actions', array( &$this, 'bw_api_before_run_dynamic_actions__overrideRequestBody' ), 10, 4 );
            add_action( 'bw_api_after_run_dynamic_actions', array( &$this, 'bw_api_after_run_dynamic_actions__resetRequestBody' ), 10, 4 );


        }/* __construct() */


        /**
         * Determine what the front part of our API Call is. This is, by default 'api' but can be changed in options or
         * via filters
         *
         * @author Richard Tape <@richardtape>
         * @package BWAPI.php
         * @since 1.0
         * @param None
         * @return null
         */

        public function getApiFront()
        {

            // store apiFront in the object cache
            if( empty( $this->apiFront ) )
            {

                // Set the default api start point to be /api/ or to what is set in the options panel
                $APIFront = 'bwapi';
                $this->apiFront = apply_filters( 'bw_api_apifront', $APIFront );

            }

            return $this->apiFront;

        }/* __construct() */


        /**
         * Create the rewrite rules for the api
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param (array) $rules - existing WP rewrite rules
         * @return (array) $rules - modified rules
         */

        public function rewrite_rules_array__createRewriteRules( $rules )
        {

            // The api front can be defined with filters or an option, it's default is /api/
            $apiFront = $this->getApiFront();

            // One (generic) rule to rule them all. My precious.
            $rules = array( "$apiFront\/(.*)" => 'index.php?'.$apiFront.'=$matches[1]' ) + $rules;

            return $rules;

        }/* rewrite_rules_array__createRewriteRules() */


        /**
         * Add our query vars so WP recognises our extra items
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param (array) $vars - existing WP query vars
         * @return (array) $vars - modified query vars
         */

        public function query_vars__addAPIQueryVars( $vars )
        {

            array_push( $vars, 'bwapi' );

            return $vars;

        }/* query_vars__addAPIQueryVars() */


        /**
         * When WP catches 'json=true' in the url we need to do something with it
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param arguments
         * @return null
         */

        public function template_redirect__showJSONOutput()
        {
            global $wp_query;

            // Cache our variables; that's the right thing to do, kids.
            $request = $wp_query->get( 'bwapi' );

            if( empty( $request ) )
                return;

            // What *type* of REQUEST was made GET/POST/PUT/DELTE
            $type = $this->getRequestType();

            // Get request arguments
            $body = $this->getRequestBody( $type );

            // run action so plugins can change the query if they want to
            do_action( 'bw_api_request', $type, $request, $body );

            // Make the request with 'json' output format
            $this->call( $type, $request, $body, 'json' );

        }/* template_redirect__showJSONOutput() */


        /**
         * Basic security - ensure a user is logged in to perform any API Requests
         *
         * @author Richard Tape <@richardtape>
         * @package BWAPI.php
         * @since 1.0
         * @param (array) $fullRequest - The full request that we're making, including the action
         * @param (string) $typeOfRequest - What type of request are we making
         * @param (array) $requestBody - the body of the request (i.e. $_GET or $_POST)
         * @return null
         */

        public function bw_api_request__securityChecks( $type, $request, $body )
        {
      $request = $this->superRegexifier( $type, $request );

            if( !is_user_logged_in() && apply_filters( 'bwapi_api_requests_require_login', true, $type, $request, $body ) )
                \SocialStreams\JsonAPI\Utils::output( array( 'result' => 'failure', 'error_code' => '401', 'reason' => 'Only registered and signed in users can perform API Requests.' ) );

        }/* bw_api_request__securityChecks() */


        /**
         * get request type in a "backbone" way
         *
         * @author Alessandro Biavati <@alebiavati>
         * @package BWAPI.php
         * @since 1.0
         * @param None
         * @return (string) $type - the type of request
         */
        public function getRequestType()
        {

            $type = strtolower( $_SERVER['REQUEST_METHOD'] );
            $body = $this->getRequestBody( $type );

            // check if body has a request type override
            $type = Utils::getRequestTypeFromBody( $type, $body );

            return $type;

        }/* getRequestType() */


        /**
         * @internal Missing Description
         *
         * @author Alessandro Biavati <@alebiavati>
         * @package BWAPI.php
         * @since 1.0
         * @param arguments
         * @return null
         */

        public function call( $type, $request, $body, $outputFormat = ARRAY_A )
        {
            // run action to initialize modules.. we probably should revisit this.
            // call only once!

            if( is_null( $this->initialized ) )
            {

                do_action( 'bw_api_init' );
                $this->initialized = true;

            }

            do_action( 'bw_api_call' );

            // generate unique ID for API call.
            $callID = uniqid();

            // $apiRequest now contains the full request (minus 'api/') so something along the lines of
            // "1.1\/1\/posts\/43\/comments"  for a request of   api/1.1/1/posts/43/comments/
            // We need to punt this through our superRegexifier (tm) to make sense of it all and return
            // something useful
            $request = $this->superRegexifier( $type, $request );

            // Get dynamic actions
            $actions = $this->getDynamicActions( $type, $request );

            // parse body, in case it was a URL query
            $body = $this->maybeParse( $body );

            // Run a single action before we go ahead and run all of the actions so we can hook in here if necessary
            do_action( 'bw_api_before_run_dynamic_actions', $actions, $type, $request, $body, $callID );

            // Run actions to allow plugins and module to respond to the API request
            $this->do_actions($actions, $type, $request, $body);

            // Run action to reset any variables that might be set during actions are run
            do_action( 'bw_api_after_run_dynamic_actions', $actions, $type, $request, $body, $callID );

            // format output array with default response data
            $this->applyOutputDefaults( $type, $request, $body, $callID );

            // print die or return the output
            return $this->printReturnOutput( $type, $request, $body, $outputFormat );


        }/* funcName() */


        /**
         * Override sever request body.
         * TODO: Not sure if this works on all servers!!!!!!!!!!!!!!!!!!!!!!
         *
         * @author Alessandro Biavati <@alebiavati>
         * @package BWAPI.php
         * @since 1.0
         * @param $actions, $type, $request, $body
         * @return null
         */

        public function bw_api_before_run_dynamic_actions__overrideRequestBody( $actions, $type, $request, $body )
        {

            if (strtolower($type) == 'get') {
                $this->requestBodyBackup = $_REQUEST;
                $_REQUEST = $body;
                $_GET = $body;
            }

        }/* bw_api_before_run_dynamic_actions__overrideRequestBody() */

        /**
         * Reset sever request body to its previous value
         * TODO: Not sure if this works on all servers!!!!!!!!!!!!!!!!!!!!!!
         *
         * @author Alessandro Biavati <@alebiavati>
         * @package BWAPI.php
         * @since 1.0
         * @param $actions, $type, $request, $body
         * @return null
         */

        public function bw_api_after_run_dynamic_actions__resetRequestBody( $actions, $type, $request, $body )
        {

            if (strtolower($type) == 'get') {
                $_REQUEST = $this->requestBodyBackup;
                $_GET = $this->requestBodyBackup;
            }

        }/* bw_api_after_run_dynamic_actions__resetRequestBody() */




        /**
         * Try to URL parse a variable.
         *
         * if an array is provided, nothing is done.
         * if an string is provided, parse_str is run
         * if another format is run, an empty array is returned
         *
         * @author Alessandro Biavati <@alebiavati>
         * @package BWAPI.php
         * @since 1.0
         * @param (any) $body
         * @return (array) $body
         */

        public function maybeParse( $body )
        {
            // first check if the body is empty
            $body_array = array();

            // check if we already have an array passed.
            if( empty( $body ) )
            {

                // do nothing, return empty array

            }
            elseif( is_array( $body ) )
            {

                $body_array = $body;

            }
            elseif( is_string( $body ) )
            {

                // try to parse url encoded array
                parse_str( $body, $body_array );

                // check if the result is not an array
                if ( !is_array($body_array) )
                    $body_array = array();

            }

            return $body_array;

        }/* maybeParse() */


        public function applyOutputDefaults( $type, $request, $body, $callID )
        {

            // check if an output was saved. If no output is saved, it means that the API
            // didn't get any response from any modules.
            if( is_array( $this->output ) )
            {

                // format API output
                $this->output = array_merge( array(
                    'request' => $request['requestStr'],
                    'action' => $this->requestAction,
                ), $this->output );

            }
            else
            {

                // format error output
                $this->output = array(
                    'error' => array(
                        'message' => 'API not defined',
                        'type' => 'APINotDefined',
                        'code' => 1,
                        'type' => $type,
                        'request' => $request,
                        'body' => $body
                    ),
                );

            }

            $this->output = apply_filters( 'bwapi_apply_output_defaults', $this->output, $type, $request, $body, $callID );

        }

        /**
         * Method to output what we need
         *
         * @author Richard Tape <@richardtape>
         * @package BWAPI.php
         * @since 1.0
         * @param arguments
         * @return null
         */
        public function printReturnOutput( $type, $request, $body, $outputFormat )
        {

            // clear temporary output variable
            $output = $this->output;
            $this->output = null;

            switch( $outputFormat )
            {

                case ARRAY_A:

                    // return output as it is
                    return $output;

                    break;

                case 'json': // json is the default
                default:

                    if (function_exists('http_response_code') )
                      http_response_code(200);;
                    header( 'Content-type: application/json' );
                    header( 'Cache-Control: no-cache, must-revalidate' );
                    header( 'Expires: Mon, 23 May 1981 04:00:00 GMT' );

                    die( json_encode( $output, $this->prettyPrint( $body ) ) );

                    break;

            }

        }/* printReturnOutput */



        /**
         * Determine if we're pretty printing the output which is done when we have readable=true in the request
         *
         * @author Richard Tape <@richardtape>
         * @package Module.php
         * @since 1.0
         * @param (array) $requestBody - the body of the request
         * @return JSON_PRETTY_PRINT or false - which is used in the json_encode() function
         */

        public function prettyPrint( $requestBody = false )
        {

            // Default to false
            $prettyPrint = false;

            // check for request body parameter
            if( $requestBody && is_array( $requestBody ) && array_key_exists( 'readable', $requestBody ) )
            {

                $prettyPrint = ( $requestBody['readable'] == 'true' ) ? JSON_PRETTY_PRINT : false;

            }
            else
            {

                // check for global constant
                if( defined( 'BW_API_DEBUG' ) && BW_API_DEBUG )
                    $prettyPrint = JSON_PRETTY_PRINT;

            }


            return $prettyPrint;

        }/* prettyPrint() */


        /**
         * A method to handle making sense of the request that has been passed to the API.
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param (string) $apiRequest - the raw api request received from the original regex
         * @param (string) $typeOfRequest - what type of request are we making? GET POST etc.
         * @return (array) $fullRequest - an array of the parameters for the api request
         */

        public function superRegexifier( $typeOfRequest, $apiRequest )
        {

            // Set up our regex filters which we run through preg_match
            // The key is the regex that we are performing. The value is an array containing an action name and a set of keys for each of the $matches
            // that the regex will return
            // i.e.
            // "(\d|site)" => array( 'action' => 'site', 'keys' => array( 'site' ) )
            // Means
            // match any digit or the text 'site' and then do an action called 'site' and then the first result (and only result in this case)
            // will be called 'site' i.e. it will be array( 'site' => $matches[1] );

            // The setup for our API is
            //
            // /api/{version*}/{site*}/{table}/{id}/{connection}            * indicates required
            //
            // version - the version of the API, currently just '1'
            //
            // site - the site ID (for non-multisite this should be 1). Can also be 'global' for all sites on m/s
            // table - which can be 'posts' or 'users' - a "collection" of stuff
            // id - a specific ID to look for in the table specified
            // connection - a set of items for the ID of the table (confusing much?)
            //
            // Examples (probably very much needed after the 'connection' explaination)
            //
            // Get (all|latest posts on site 12
            // /api/1/12/posts/
            //
            // Get post ID 5 on site 12
            // /api/1/12/posts/5/
            //
            // Get all comments connected (see!) to post 5 on site 12
            // /api/1/12/posts/5/comments/
            //
            // Get all site 17's users
            // /api/1/17/users/
            //
            //
            // Get all users across all sites
            // /api/1/global/users/
            //
            // You can also use ?readable=true to enable pretty printing of the json output. This only works in PHP 5.4+

            // strip slashes and other weird characters
            $apiRequest = trim($apiRequest, '/');

            $regexFilters = array(
                "methods" => array( 'action' => 'methods' ),
                "(\d|site)\/([^\/]+)\/([^\/]+)\/([^\/]+)" => array( 'action' => 'connection', 'keys' => array( 'site', 'table', 'item', 'connection' ) ),
                "(\d|site)\/([^\/]+)\/([^\/]+)" => array( 'action' => 'item', 'keys' => array( 'site', 'table', 'item' ) ),
                "(\d|site)\/([^\/]+)" => array( 'action' => 'table', 'keys' => array( 'site', 'table' ) ),
                "(\d|site)" => array( 'action' => 'site', 'keys' => array( 'site' ) )
            );

            // Run these regexes through a filter so we can add/remove externally
            $regexFilters =         apply_filters( 'bw_api_regexfilters', $regexFilters, $apiRequest, $typeOfRequest );

            // Filters for the preg_match() function for the flags and offset should we wish to use them
            $regexFiltersFlags =    apply_filters( 'bw_api_regexfiltersflags', false, $regexFilters, $apiRequest, $typeOfRequest );   // Empty by default
            $regexFiltersOffset =   apply_filters( 'bw_api_regexfiltersoffset', false, $regexFilters, $apiRequest, $typeOfRequest );  // Empty by default

            $request = false;

            // Loop over each regex to parse the request
            foreach( $regexFilters as $regex => $regexDetails )
            {

                // Run the regex for each, we enforce the api version number and a closing slash. The \A at the start means 'start of string'
                preg_match( '/\A(\d+\.?\d*)\/' . $regex . '[\/]?$/', $apiRequest, $matches, $regexFiltersFlags, $regexFiltersOffset );

                // If we have a match for this regex
                if( count( $matches ) > 0 )
                {

                    // We don't need the whole request which is the first item
                    array_shift( $matches );

                    // Ensure that the keys is an array
                    if ( !is_array( $regexDetails['keys'] ) )
                        $regexDetails['keys'] = array();

                    // Put the api first
                    array_unshift( $regexDetails['keys'], 'api' );

                    // Combine the $matches and $keys into a single array that makes some sense
                    $request = array_combine( $regexDetails['keys'], $matches );

                    // Add the action as the first part of the action name (just after the prefix)
                    $request = array_merge( array( 'action' => $regexDetails['action'] ), $request );


                    // Stop so we don't run any mre
                    break;

                }

            }

            // add original api request
            $request['requestStr'] = $apiRequest;

            return $request;

        }/* superRegexifier() */


        /**
         * run a series of actions
         *
         * @author Alessandro Biavati <@alebiavati>
         * @package BWAPI.php
         * @since 1.0
         * @param (array) $actions - array of actions to run
         * @return null
         */

        public function do_actions( $actions, $type, $request, $body )
        {

            // Loop through each and run an action
            foreach( $actions as $actionName )
            {

                // check if the oputput has been set for the current call
                if ( is_array($this->output) )
                    break;

                // save action being run
                $this->requestAction = $actionName;

                // pass the wp action fired to the action handler
                $request['wp_action'] = $actionName;

                // run action
                do_action( $actionName, $type, $request, $body );

            }

        }/* do_actions() */


        /**
         * This method creates an array of actions which are run for a given request
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param (array) $fullRequest - The passed full array
         * @param ($typeOfRequest) - GET, POST, PUT, DELETE
         * @return (array) an array of actions to run
         */

        public function getDynamicActions( $typeOfRequest, $fullRequest )
        {

            // You're an idiot (well, you've performed a malformed API request anyway)
            if( $fullRequest === false )
            {

                do_action( 'bwapi_error' );
                return false;

            }

            // actions can only have lower case letters. Slashes are fine. But capital letters? HELLZ NO
            $typeOfRequest = strtolower( $typeOfRequest );

            // With what do we want to prefix all of our API requests?
            $actionPrefix = 'bwapi';

            // The first action we run in this set is the name of that prefix - a 'catchall' if you will
            $actionsArray[] = $actionPrefix;

            // Now we slowly build up a set of actions based on the prefix, api version and type of request
            $actionsArray[] = $actionPrefix . '_' . $fullRequest['api'];
            $actionsArray[] = $actionPrefix . '_' . $fullRequest['api'] . '_' .$typeOfRequest;
            $actionsArray[] = $actionPrefix . '_' . $fullRequest['api'] . '_' . $typeOfRequest . '_' . $fullRequest['action'];

            // At this point we have 4 actions which are something along the lines of
            // [0] => bwapi
            // [1] => bwapi_1.1
            // [2] => bwapi_1.1_get
            // [3] => bwapi_1.1_get_connection

            // We now set our prefix to use that last one as all of our subsequent actions should be prefixed by
            // {prefix}_{api_version}_{type_of_request}_{action}
            $actionPrefix = $actionPrefix . '_' . $fullRequest['api'] . '_' . $typeOfRequest . '_' . $fullRequest['action'];

            // We no longer need the api or action as we have that in the prefix, so do a little cleanup
            unset( $fullRequest['api'] );
            unset( $fullRequest['action'] );
            unset( $fullRequest['requestStr'] );

            // We build our actions based on the keys of the array
            $fullRequestKeys = array_keys( $fullRequest );
            $j = 0;

            // For concatenation of action names
            $actionName = '';

            foreach( $fullRequest as $key => $value )
            {

                $actionsArray[] = $actionPrefix . '_' . $key . '_' . $value;

                $actionName .= '_' . $key . '_' . $value;
                $actionsArray[] = $actionPrefix . $actionName;

                for( $i = $j + 1 ; $i < count( $fullRequest ); $i++ )
                    $actionsArray[] = $actionPrefix . '_' . $key . '_' . $value . '_' . $fullRequestKeys[$i] . '_' . $fullRequest[$fullRequestKeys[$i]];

                $j++;

            }

            // Run the actions array through a filter so we can have access to this externally
            $actionsArray = apply_filters( 'bw_api_actions_array', $actionsArray, $fullRequest, $typeOfRequest );

            // Now return that array
            return $actionsArray;

        }/* getDynamicActions() */


        /**
         * Get the body of the request based on the type of request
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param (string) $typeOfRequest - GET PUT POST DELETE
         * @return () $requestBody - the body of the request
         */

        public function getRequestBody( $typeOfRequest )
        {

            $typeOfRequest = strtolower( $typeOfRequest );

            switch( $typeOfRequest )
            {

                case 'get' :    return $_GET;

                case 'put' :
                case 'delete' :
                case 'patch' :
                case 'post' :   return $_POST;

                default :       break;

            }

        }/* getRequestBody() */


        /**
         * Set up the dynamic actions for this particular request
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param (array) $apiRequest - the full request
         * @return null
         */

        public function bw_api_request__handleAPIRequest( $apiRequest )
        {

            // self::output( $apiRequest );

        }/* bw_api_request__handleAPIRequest() */


        /**
         * The method which handles the output of the data
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @version 1.1 Added PrettyPrint option (for PHP 5.4) RT
         * @param (array) $args - what to output
         * @param (bool) $prettyPrint - do we want to prettyPrint this output
         * @return null
         */

        public function output( $output = array(), $prettyPrint = false )
        {

            // if the output is a null variable, stop outputting
            if( is_null( $output ) )
                return;

            // we check if it's not an array, if not we initialize it with an empty array
            if( !is_array( $output ) )
                $output = array();

            // save output in temporary variable to output
            $this->output = $output;

        }/* output() */


        /**
         * Output an error message rather than a json string with relevant info
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @version 1.1 Added PrettyPrint option (for PHP 5.4) RT
         * @param (string) $message
         * @param (string) $type - allows us to be specific with errors or notices
         * @param (bool) $prettyPrint - do we want to prettyPrint this output
         * @return null
         */

        public function outputErrorAndExit( $message, $type = 'error', $prettyPrint = false )
        {

            header( 'Cache-Control: no-cache, must-revalidate' );
            header( 'Expires: Mon, 23 May 1981 04:00:00 GMT' );
            header( 'Content-type: application/json' );

            $output = array( $type => $message );

            $prettify = ( $prettyPrint ) ? JSON_PRETTY_PRINT : false;

            echo json_encode( $output, $prettify );

            exit;

        }/* outputError */



        /**
         * Load the core API functionality (the bits and bobs that actually returns useful data)
         *
         * @author Richard Tape <@richardtape>
         * @package bw-api
         * @since 1.0
         * @param arguments
         * @return null
         */

        public function bw_api_init__loadModules()
        {

            $modules = array(
                'Batch',
            );

            $modules = apply_filters( 'bw_api_modules', $modules );

            // activate module
            foreach( $modules as $module )
            {

                // Test if this is an internal core Module
                $internal_module = __NAMESPACE__ . '\\Module\\' . $module;

                if( is_subclass_of( $internal_module, __NAMESPACE__ . '\\Module' ) )
                    $module_class = $internal_module;
                elseif( is_subclass_of( $module, __NAMESPACE__ . '\\Module' ) )
                    $module_class = $internal_module;
                else
                    continue;

                // Instantiate
                new $module_class();

            }

        }/* bw_api_call__loadModules() */

    }/* class BW_API */
