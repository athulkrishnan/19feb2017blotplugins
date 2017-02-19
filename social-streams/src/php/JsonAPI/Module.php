<?php

    namespace SocialStreams\JsonAPI;

    /**
     * The class which all of our json API modules extend.
     *
     * @author Richard Tape <@richardtape>
     * @package Module.php
     * @since 1.0
     * @param arguments
     * @return null
     */

    class Module
    {

        public function __construct()
        {

        }/* construct() */

        /**
         * A method to handle the filtering of fields
         *
         * @author Richard Tape <@richardtape>
         * @package Module.php
         * @since 1.0
         * @param (array) $postObjects - an array of post objects
         * @param (array) $fields - the fields which we wish to return
         * @return (array) $filteredPostObjects - an array of post objects with only the filtered items
         */

        public function filterFields( $postObjects = array(), $fields = array() )
        {

            // This is what we're returning. Start fresh.
            $filteredPostObjects = array();

            // Loop over each of the post objects
            foreach( $postObjects as $id => $postObject )
            {
                // wp_die( print_r( $postObjects, true ) );
                // Cache the post ID as we need it in several places
                $post_id = ( $postObject->id ) ? $postObject->id : $postObject->ID;

                // Each item needs to be an object
                $filteredPostObjects[$id] = new \stdClass();

                // Cache it so we can easily add to it
                $thisObject = $filteredPostObjects[$id];

                foreach( $fields as $id => $field )
                {

                    switch( $field )
                    {

                        case 'title':
                            $thisObject->title = ( $postObject->title ) ? apply_filters( 'the_title', $postObject->title ) : apply_filters( 'the_title', $postObject->post_title );
                            break;

                        case 'id':
                            $thisObject->id = $post_id;
                            break;

                        case 'post_content':
                            $thisObject->post_content = apply_filters( 'the_content', $postObject->post_content );
                            break;

                        case 'permalink':
                            $thisObject->permalink = get_permalink( $post_id );
                            break;

                        case 'post_meta':
                            $thisObject->post_meta = get_post_custom( $post_id );
                            break;

                        case 'post_parent':
                            $thisObject->post_parent = $postObject->post_parent;

                        default:
                            # code...
                            break;

                    }

                }

            }
            // wp_die( print_r( $filteredPostObjects, true ) );
            return $filteredPostObjects;

        }/* handleQueryString() */


        /**
         * Helper method for each module to generate the loop name for when using our Loop() class
         *
         * @author Richard Tape <@richardtape>
         * @package Module.php
         * @since 1.0
         * @param (string) $prefix - what to prefix this loop name with
         * @param (array) $fullRequest - the full api request
         * @param (array) $requestBody - what has been passed
         * @return null
         */

        public function getLoopName( $prefix, $fullRequest, $requestBody )
        {

            // We need to flatten the request and the body into strings
            if( is_array( $fullRequest ) )
                $fullRequest = implode( '_', $fullRequest );

            if( is_array( $requestBody ) )
                $requestBody = implode( '_', $requestBody );

            // Build the loop name
            $loopName = $prefix . '_' . $fullRequest . '_' . $requestBody;

            // We now want a hash of that loop name. We'll use md5 by default, but we'll filter it so we can user other algorithms should we want
            $loopName = hash( apply_filters( 'bw_loop_name_hash_algorithm', 'md5' ), $loopName );

            // We now add a fixed prefix so these references are easier to find in the database
            $loopName = 'bw_loop_' . $loopName;

            // And we're done
            return apply_filters( 'bw_loop_name', $loopName );

        }/* getLoopName() */


    }/* class Module */
