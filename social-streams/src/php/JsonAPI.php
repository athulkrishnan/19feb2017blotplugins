<?php
/**
 * Adjustments for the admin back-end
 *
 * @author Dan Costello <@dstello>
 * @package Admin.php
 * @since 1.0
 */

namespace SocialStreams;

class JsonAPI
{

  public function __construct()
  {

    // /bwapi/1/site/options/[option_key]
    add_action( 'bwapi_1_get_item_table_options', array( $this, 'get_option' ),10 ,3 );
    add_action( 'bwapi_1_put_item_table_options', array( $this, 'update_option' ),10 ,3 );
    add_action( 'bwapi_1_post_item_table_options', array( $this, 'update_option' ),10 ,3 );

    // /bwapi/1/site/usermeta/[meta_key]
    add_action( 'bwapi_1_get_item_table_usermeta', array( $this, 'get_user_meta' ),10 ,3 );
    add_action( 'bwapi_1_put_item_table_usermeta', array( $this, 'update_user_meta' ),10 ,3 );
    add_action( 'bwapi_1_post_item_table_usermeta', array( $this, 'update_user_meta' ),10 ,3 );

    // GET /bwapi/1/site/socialstreams/
    add_action('bwapi_1_get_table_table_socialstreams', array($this,'get_posts'), 10, 3);

    // /bwapi/1/site/socialstreams/[post_id]
    add_action('bwapi_1_post_table_table_socialstreams', array($this,'update_post'), 10, 3);
    add_action('bwapi_1_post_item_table_socialstreams', array($this,'update_post'), 10, 3);
    add_action('bwapi_1_put_item_table_socialstreams', array($this,'update_post'), 10, 3);

    // /bwapi/1/site/socialstreams_services
    add_action('bwapi_1_get_table_table_socialstreams_services', array($this,'get_services'), 10, 3);

    // /bwapi/1/site/socialstreams_services/[service_name]
    add_action('bwapi_1_put_item_table_socialstreams_services', array($this,'update_service'), 10, 3);

    // allow api to be used if not loggedin
    add_filter('bwapi_api_requests_require_login', array($this,'bwapi_api_requests_require_login'), 10, 4);

  }/* construct() */




  /**
   * Ajax handler for Social Streams Settings - wp_options table
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  public function update_option( $type, $request, $body )
  {
    $output = array();

    $optionName = $request['item'];

    /**
     * Necessary for some reason?
     */
    $option = json_decode( stripslashes( $body['model'] ), true);

    // unset option ID
    if ( isset( $option['id'] ) )
      unset( $option['id'] );

    if ( $optionName == 'socialstreams_app_settings' )
    {
      $optionOriginal = $option;
      $option = array();

      $fieldsToSave = array(
        'moderation'
      );

      $serviceModelToSave = array();

      foreach ( $fieldsToSave as $field )
      {
        if ( isset( $optionOriginal[ $field ] ) )
          $option[ $field ] = $optionOriginal[ $field ];
      }
    }


    if ( $optionName == 'socialstreams_search' )
    {
      $optionOriginal = $option;
      $option = array();

      $fieldsToSave = array(
        'instagramQuery',
        'instagramType',
        'instagramUser',
        'twitterQuery',
        'twitterType',
        'twitterUser',
      );

      $serviceModelToSave = array();

      foreach ( $fieldsToSave as $field )
      {
        if ( isset( $optionOriginal[ $field ] ) )
          $option[ $field ] = $optionOriginal[ $field ];
      }
    }

    //update WP option
    update_option( $optionName, $option );

    // check if we need to publish the social stream page
    if ( $optionName == 'socialstreams_search' )
    {
      $metaSearches = Utils::getMetaSearchesFromSettings();
      if ( !empty( $metaSearches ) )
        Utils::createSocialStreamPages();
    }


    //set return values
    $output['meta'] = array(
      'code' => 200,
      'status' => 'success',
    );
    $output['data'] = $option;

    \SocialStreams\JsonAPI\Utils::output( $output );

  }/* ss_account_handler() */



  /**
   * Ajax handler for Social Streams Settings - wp_options table
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  public function get_option( $type, $request, $body )
  {
    $output = array();

    $optionName = $request['item'];

    $option = get_option( $optionName );

    if ( empty( $option ) || !is_array( $option ) )
      $option = array();

    if ( $optionName == 'socialstreams_app_settings' )
    {

      // oauth URL
      $option['ss_oauth_url'] = Utils::getOauthUrl();

      // api URL for local debug mode
      $option['ss_api_url']   = Utils::getApiUrl();


      if ( isset( $option['dev_mode'] ) )
        unset( $option['dev_mode'] );

      // oauth URL for local debug mode
      if ( defined('SS_DEV') && SS_DEV )
        $option['dev_mode'] = true;


      // pass public page url to options
      $social_stream_page = Utils::getSocialStreamPage();
      $option['public_page_url'] = null;
      if ( !empty( $social_stream_page ) && isset( $social_stream_page->ID ) )
        $option['public_page_url'] = get_permalink( $social_stream_page->ID );


      // set time to next cron
      $cronHook = 'socialstreams_fetch';

      if ( wp_next_scheduled( $cronHook ) )
        $option['time_to_next_cron'] = wp_next_scheduled( $cronHook ) - time();
      else
        $option['time_to_next_cron'] = false;


      // Set other options that only admin users can see
      $option['user_can_moderate'] = false;
      $option['admin_page_url'] = null;

      if ( isset( $option['licence'] ) )
        unset( $option['licence'] );

      if ( isset( $option['ss_user_id'] ) )
        unset( $option['ss_user_id'] );

      if ( current_user_can( 'manage_options' ) )
      {
        // set if the user can moderate or not
        $option['user_can_moderate'] = true;

        // pass admin page url to options
        $option['admin_page_url'] = admin_url('admin.php?page=social_streams');

        // get the ss user ID
        $ss_user_id = get_option( 'socialstreams_user_id' );
        if ( !empty( $ss_user_id ) )
          $option['ss_user_id'] = $ss_user_id;

        // add plugin version
        $option['plugin_version'] = Bootstrap::$version;

        // add access token for api requests
        $access_token = get_option('socialstreams_access_token');
        if ( !empty( $access_token ) )
          $option['access_token'] = $access_token;

      }

      // add is_admin flag
      $option['is_admin'] = null;
      if ( is_admin() )
        $option['is_admin'] = true;


      // add apiRoot (for subdirectory install compatibility)
      if ( isset( $_SERVER['HTTP_HOST'] ) )
      {
        // Home URL
        // Regular install: http://example.com/
        // Sub-folder install: http://example.com/wordpress/
        $homeUrl = home_url('/');

        // Host
        // example.com
        $host = $_SERVER['HTTP_HOST'];

        // split url in parts
        $urlParts = explode( '://' . $host, $homeUrl );

        $option['wpRoot'] = $urlParts[1];
      }

    }

    // Override the option ID
    $option['id'] = $optionName;

    $output['meta'] = array(
      'code' => 200,
      'status' => 'success',
    );
    $output['data'] = $option;

    \SocialStreams\JsonAPI\Utils::output( $output );

  }/* ss_account_handler() */



  /**
   * @internal Saves user meta data
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  public function update_user_meta( $type, $request, $body )
  {
    $output = array();

    $usermeta = json_decode( stripslashes( $body['model'] ), true );

    $usermetaToSave = $usermeta;
    unset( $usermetaToSave['id'] );

    $metakey = $request['item'];

    global $current_user;
    update_user_meta( $current_user->ID, $metakey,  $usermetaToSave);

    $output['meta'] = array(
      'code' => 200,
      'status' => 'success',
    );

    $output['data'] = $usermeta;

    \SocialStreams\JsonAPI\Utils::output( $output );

  }/* update_user_meta() */

  /**
   * @internal Gets user meta data
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   * @return (object) user meta object
   */

  public function get_user_meta( $type, $request, $body )
  {
    /**
     * Setup Output
     * Use JSON API to output data
     */
    $output = array();

    $metakey = $request['item'];

    global $current_user;
    $usermeta = get_user_meta( $current_user->ID, $metakey, true );

    if ( empty( $usermeta ) )
    {

      $output['meta'] = array(
        'code' => 404,
        'status' => 'error',
        'message' => 'There is no user meta with that name',
      );
    }
    else
    {

      $output['meta'] = array(
        'code' => 200,
        'status' => 'success',
      );

      $output['data'] = $usermeta;

    }


    \SocialStreams\JsonAPI\Utils::output( $output );


  }/* get_user_meta() */




  /**
   * Ajax handler for saving Social Streams Posts
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  public function update_post(  $type, $request, $body  )
  {

    // \BW\Debug::pre( $body );

    if ( isset( $body['model'] ) )
    {
      $model = json_decode( stripslashes( $body['model'] ), true );
    }
    else
    {
      $model = $body;
    }



    /*
    Get ss_posts table
     */
    $post_table = \SocialStreams\BWPostTypeFactory::factory('ss_post');


    $post = $model;
    $postForDB = $post;


    // unset fields that we don't need in the 'post' column
    // set post table date to api post date. $today = date("Y-m-d H:i:s", strToTime);
    // set array and loop through.

    $fieldsToUnset = array(
      'status',
      'override_status',
      'app_id',
      'id',
      'nuke',
      'bw_account_id',
      'search_type',
      'search_query',
      'comments',
      'likes',
      'actions',
      'dev_meta',
    );

    foreach ( $fieldsToUnset as $key )
    {
      if ( isset( $postForDB[ $key ] ) )
        unset( $postForDB[ $key ] );
    }



    $app_id = 'socialstreams_' . $post['service_name'] . '_app';


    // find actual timestamp. Depending on the API, the timestamp field
    // could contain a date string or a unix timestamp
    if ( strpos( $post['timestamp'], ':' ) !== false )
      $timestamp = strtotime( $post['timestamp'] );
    else
      $timestamp = intval( $post['timestamp'] );

    // set timestamp to post object
    $postForDB['timestamp'] = $timestamp;

    $dataToSave = array(
      'status'       => $post['status'],
      'app_id'       => $app_id,
      'post'         => $this->preparePostForDB( $postForDB ),
      'vendor_id'    => $post['vendor_id'],
      'service_name' => $post['service_name'],

      // Get the localized date base on the timestamp.
      // The GMT timestamp will be automatically set by the BWPostType utility
      'date' => get_date_from_gmt( date( 'Y-m-d H:i:s', $timestamp ) )
    );

    // set the bw_account_id, search_type and search_query for archiving.
    if ( isset( $post['bw_account_id'] ) )
      $dataToSave['bw_account_id'] = $post['bw_account_id'];

    if ( isset( $post['search_type'] ) )
      $dataToSave['search_type'] = $post['search_type'];

    if ( isset( $post['search_query'] ) )
      $dataToSave['search_query'] = $post['search_query'];


    // if incoming post id is set and not empty
    if ( isset( $post['id'] ) && !empty( $post['id'] ) )
    {
      $dataToSave['id'] = $post['id'];

    }
    else
    {

      /**
       * DEDUPE
       */

      $postFromDB = $post_table->query( array(
        'posts_per_page' => 1,
        'status' => array('publish','draft','trash'),
        'vendor_id' => $post['vendor_id'],
        'service_name' => $post['service_name'],
        'fields' => 'id'
      ) );

      //if postFromDb is found
      if ( !empty( $postFromDB ) )
      {
        $dataToSave['id'] = $postFromDB[0]->id;

        // do not override status of duplicate post
        // if the 'override_status' flag was set.
        if ( isset( $dataToSave['status'] ) &&  isset( $post['override_status'] ) && $post['override_status'] === false )
          unset( $dataToSave['status'] );

      }
    }

    /*
    Save Post
     */
    $postID = $post_table->save( $dataToSave );


    // update the ID
    $post['id'] = $postID;


    // If this was a new post, set the order_id.
    // The order_id will never change for this post after creation.
    if ( !isset( $dataToSave['id'] ) )
    {
      // get the last 3 digits of the $postID
      // $postIDStrLast = str_pad( substr( "" . $postID, -3 ), 3, '0', STR_PAD_LEFT );

      $postIDStr = '' . $postID;
      if ( strlen( $postIDStr ) > 3 )
        $postIDStr = substr( $postIDStr, -3 );

      for ( $i=0; $i < 3; $i++ )
      {
        if ( strlen( $postIDStr ) < 3 )
          $postIDStr = '0' . $postIDStr;
      }

      // Build order id as an interpolation of timestamp and post id
      $order_id = $timestamp . '' . $postIDStr;

      // save order_id to post
      $post_table->save( array( 'id' => $postID, 'order_id' => $order_id ) );
    }

    /**
     * Setup Output
     * Use JSON API to output data
     */
    $output = array();
    $output['meta'] = array(
       'code' => 200,
       'status' => 'success',
       'post' => $post,
       'archiveReturn' => $body
    );
    $output['data'] = $post;

    \SocialStreams\JsonAPI\Utils::output( $output );


  }/* update_post() */




  /**
   * @internal BW JSONAPI -   // /bwapi/1/site/socialstreams
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  public function get_posts( $type, $request, $body )
  {

    $statusesToFetch = ( isset( $body['status'] ) && !empty( $body['status'] ) ) ? $body['status'] : 'publish';
    $perPage = ( isset( $body['perPage'] ) && !empty( $body['perPage'] ) ) ? $body['perPage'] : 24;

    $post_table = \SocialStreams\BWPostTypeFactory::factory( 'ss_post' );


    $args = array(
      'status' => $statusesToFetch,
      'posts_per_page' => $perPage,
      'orderby' => 'order_id',
      'order' => 'desc',
    );


    if ( isset( $body['fields'] ) && !empty( $body['fields'] ) )
    {
      $args['fields'] = $body['fields'];
    }

    // Check if there is a saved search query and
    // create meta queries to fetch matching posts
    $metaSearches = Utils::getMetaSearchesFromSettings();


    // if no valid search query was found return nothing.
    if ( empty( $metaSearches ) )
    {
      $output = array();
      $output['meta'] = array(
         'code' => 200,
         'status' => 'success',
         'count' => 0
      );
      $output['data'] = array();

      \SocialStreams\JsonAPI\Utils::output( $output );
      return;
    }


    if ( !isset( $args['meta_query'] ) || !is_array( $args['meta_query'] ) )
      $args['meta_query'] = array();


    // We now need to find posts that match EITHER of the meta searches.
    // We need to build a custom query
    $searchesMetaQuery = array('relation' => 'OR');
    foreach ( $metaSearches as $metaSearch )
    {
      $searchesMetaQuery[] = array(
        'fields' => $metaSearch
      );
    }
    $args['meta_query'][] = $searchesMetaQuery;


    $reverseQuery = false;

    if ( isset( $body['min_order_id'] ) && !empty( $body['min_order_id'] ) )
    {
      $args['meta_query'][] = array(
        'key' => 'order_id',
        'value' => $body['min_order_id'],
        'compare' => '>',
      );

      // we are paginating in reverse, so we need to reverse the
      // order of the SQL query and then reverse the results
      $reverseQuery = true;

    }


    // add queries for order_id
    if ( isset( $body['max_order_id'] ) && !empty( $body['max_order_id'] ) )
    {
      $args['meta_query'][] = array(
        'key' => 'order_id',
        'value' => $body['max_order_id'],
        'compare' => '<',
      );

      // if max_order_id is set we don't need to reverse the query
      $reverseQuery = false;

    }


    if ( $reverseQuery )
      $args['order'] = 'asc';



    $posts = $post_table->query( $args );


    /**
     * Unserailize $posts['post'] string
     * merge
     */

    $outputPosts = array();
    foreach ($posts as $index => $post)
    {

      $postArray = (array)$post;

      if ( isset( $postArray['post'] ) )
      {
        $unserializedPost = maybe_unserialize( $postArray['post'] );
        unset( $postArray['post'] );

        if ( !empty( $unserializedPost ) && is_array( $unserializedPost ) )
        {
          $postArray = array_merge( $postArray, $unserializedPost );
        }
      }


      $outputPosts[] = $postArray;

    }

    // reverse the order of the output if the query had the
    // 'min_order_id' argument.
    if ( $reverseQuery )
      $outputPosts = array_reverse( $outputPosts );


    $output = array();
    $output['meta'] = array(
       'code' => 200,
       'status' => 'success'
    );
    $output['data'] = $outputPosts;



    \SocialStreams\JsonAPI\Utils::output( $output );

  }/* get_posts() */


  /**
   * @internal BW JSONAPI -   // /bwapi/1/site/socialstreams_services
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  public function get_services( $type, $request, $body )
  {
    $output = array();
    $servicesCollection = array();

    $services = array('twitter', 'instagram');
    foreach ( $services as $serviceName )
    {
      $serviceModel = get_option( 'socialstreams_' . $serviceName );

      // set service name as model id
      $serviceModel['id'] = $serviceName;

      $servicesCollection[] = $serviceModel;
    }

    $output['meta'] = array(
       'code' => 200,
       'status' => 'success'
    );
    $output['data'] = $servicesCollection;

    \SocialStreams\JsonAPI\Utils::output( $output );

  }/* get_services() */


  /**
   * @internal BW JSONAPI -   // /bwapi/1/site/socialstreams_services/[service_name]
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  public function update_service( $type, $request, $body )
  {
    $output = array();

    $serviceName = $request['item'];
    $serviceModel = json_decode( stripslashes( $body['model'] ), true );

    $fieldsToSave = array(
      'authenticated',
      'app_name',
      'bw_account_id',
      'service_username',
    );

    $serviceModelToSave = array();

    foreach ( $fieldsToSave as $field )
    {
      if ( isset( $serviceModel[ $field ] ) )
        $serviceModelToSave[ $field ] = $serviceModel[ $field ];
    }

    update_option( 'socialstreams_' . $serviceName, $serviceModelToSave );

    $output['meta'] = array(
       'code' => 200,
       'status' => 'success'
    );
    $output['data'] = $serviceModel;

    \SocialStreams\JsonAPI\Utils::output( $output );

  }/* update_service() */


  /**
   * Prepare post for DB save
   *
   * @author Alessandro Biavati <ale@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   * @param (array) $post - Post to be prepared
   * @return (string) serialized post
   */

  public function preparePostForDB($post = array())
  {
    $post = $this->replaceRecursion( $post );

    $postForDB = maybe_serialize( $post );

    return $postForDB;

  } /* preparePostForDB() */

  public function replaceRecursion($input)
  {
    if ( is_array( $input ) )
    {
      foreach ( $input as $key => $value )
      {
        $input[ $key ] = $this->replaceRecursion( $value );
      }
    }
    elseif( is_string( $input ) )
    {
      $input = preg_replace('/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u', ' ', $input);
      $input = $this->removeEmoji( $input );
    }

    return $input;

  } /* replaceRecursion() */


  public function removeEmoji($text) {

      $clean_text = "";

      // Match Emoticons
      $regexEmoticons = '/[\x{1F600}-\x{1F64F}]/u';
      $clean_text = preg_replace($regexEmoticons, '', $text);

      // Match Miscellaneous Symbols and Pictographs
      $regexSymbols = '/[\x{1F300}-\x{1F5FF}]/u';
      $clean_text = preg_replace($regexSymbols, '', $clean_text);

      // Match Transport And Map Symbols
      $regexTransport = '/[\x{1F680}-\x{1F6FF}]/u';
      $clean_text = preg_replace($regexTransport, '', $clean_text);

      // Match Miscellaneous Symbols
      $regexMisc = '/[\x{2600}-\x{26FF}]/u';
      $clean_text = preg_replace($regexMisc, '', $clean_text);

      // Match Dingbats
      $regexDingbats = '/[\x{2700}-\x{27BF}]/u';
      $clean_text = preg_replace($regexDingbats, '', $clean_text);

      return $clean_text;
  }

  /**
   * allow api to be used if not loggedin
   *
   * @author Alessandro Biavati <ale@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   * @param (bool) $requireLogin - Wether to require the user to be logged in
   * @return (bool) edited require-login
   */

  public function bwapi_api_requests_require_login($requireLogin, $type, $request, $body)
  {
    if ( ( $type == 'get' && $request['table'] == 'options' && $request['item'] == 'socialstreams_app_settings' ) ||
         ( $type == 'get' && $request['table'] == 'socialstreams_search' ) ||
         ( $type == 'get' && $request['table'] == 'socialstreams' ) )
    {
      return false;
    }

    return $requireLogin;

  } /* bwapi_api_requests_require_login() */


}
