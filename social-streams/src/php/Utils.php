<?php

  namespace SocialStreams;

  class Utils
  {

    public static $mixpanel = null;
    public static $mixpanelID = null;
    public static $var = true;
    static private $viewsDirname = 'src/views';

    private function __construct(){}

    /**
     * Determine if we're in debug mode or not
     *
     * @author Richard Tape <@richardtape>
     * @package Template.php
     * @since 1.0
     * @param none
     * @return null
     */

    static public function isJsDebug()
    {
      if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG )
        return true;
      elseif( defined( 'SS_JS_DEBUG' ) && SS_JS_DEBUG )
        return true;
      else
        return false;

    }/* isJsDebug() */


    /**
     * Determine if we're in debug mode or not
     *
     * @author Richard Tape <@richardtape>
     * @package Template.php
     * @since 1.0
     * @param arguments
     * @return null
     */

    static public function isCssDebug()
    {
      if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG )
        return true;
      elseif( defined( 'SS_CSS_DEBUG' ) && SS_CSS_DEBUG )
        return true;
      else
        return false;

    }/* isCssDebug() */





    static public function getUserVoiceToken()
    {
      $token = '';

      if ( defined('SS_USERVOICE_TOKEN') )
        $token = SS_USERVOICE_TOKEN;
      else
        $token = 'xNTRkcUetp1p6xFgxfAkg';

      return $token;

    }


    static public function getMixpanelToken()
    {
      $token = '';

      if ( defined('SS_MIXPANEL_TOKEN') )
        $token = SS_MIXPANEL_TOKEN;
      else
        $token = '2fdf6c7999076c07dc31b27cf19d2735';

      return $token;

    }




    static public function getMixpanelID()
    {
      if ( is_null( static::$mixpanelID ) )
      {
        static::$mixpanelID = '';

        $ssUserID = get_option('socialstreams_user_id');

        if ( empty( $ssUserID ) )
          return;

        static::$mixpanelID = $ssUserID;
      }

      return static::$mixpanelID;

    }


    static public function getOauthUrl()
    {
      $url = '';

      if ( defined('SS_OAUTH_URL') )
        $url = SS_OAUTH_URL;
      else
        $url = 'https://oauth.socialstreams.com';

      return $url;

    }

    static public function getApiUrl()
    {
      $url = '';

      if ( defined('SS_API_URL') )
        $url = SS_API_URL;
      else
        $url = 'https://api.socialstreams.com';

      return $url;

    }


    static public function getSocialStreamPage()
    {
      $query = new \WP_Query(array(
      'post_type' => 'page',
      'posts_per_page' => 1,
      'post_status' => array('publish', 'draft', 'trash', 'pending'),
      'meta_query' => array(
        'relation' => 'OR',
        array(
        'key' => '_wp_page_template',
        'value' => 'template-socialstream.php',
        'compare' => 'LIKE'
        ),
        array(
        'key' => '_wp_page_template',
        'value' => 'template-socialstream-fullscreen.php',
        'compare' => 'LIKE'
        )
      )
      ));


      if( $query->have_posts() )
      return get_page( $query->posts[0] );

    } /* getSocialStreamPage() */


    static public function createSocialStreamPages()
    {
      $initialized = get_option('socialstreams_page_initialized');

      if ( !empty( $initialized ) && $initialized == 'true' )
      return;

      update_option('socialstreams_page_initialized', 'true');

      static::createSocialStreamPage();

      /**
       * We don't need to create a fullscreen page anymore
       * because we are going to add a toggle in the settings page.
       */
      // static::createSocialStreamFullscreenPage();

    } /* createSocialStreamPages() */


    static public function createSocialStreamPage()
    {

      $query = new \WP_Query(array(
      'post_type' => 'page',
      'post_status' => array('publish', 'draft', 'trash', 'pending'),
      'meta_query' => array(
        array(
        'key' => '_wp_page_template',
        'value' => 'template-socialstream.php',
        'compare' => 'LIKE'
        )
      )
      ));


      if( $query->have_posts() )
      {
      // TODO:
      // 1) Order the found posts by status:
      //    1) publish
      //    2) draft
      //    3) pending
      //    4) trash
      // 2) Get the first post in the sorted array.
      // 3) If the found post is not published, publish it.

      // // a page was found. Now we need to publish it.
      // while ( $query->have_posts() ) $query->have_posts()
      // {
      //   ... parse query
      // }
      }
      else
      {
      $post_data = array(
        'post_title'   => 'Social Stream',
        'post_name'    => 'socialstream',
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => 'Edit this page to change or remove this text.',
      );

      $postID = wp_insert_post( $post_data, true );

      if ( !is_wp_error( $postID ) )
        update_post_meta( $postID, '_wp_page_template', 'template-socialstream.php' );

      }

    } /* createSocialStreamPage() */



    static public function createSocialStreamFullscreenPage()
    {

      $query = new \WP_Query(array(
      'post_type' => 'page',
      'post_status' => array('publish', 'draft', 'trash', 'pending'),
      'meta_query' => array(
        array(
        'key' => '_wp_page_template',
        'value' => 'template-socialstream-fullscreen.php',
        'compare' => 'LIKE'
        )
      )
      ));


      if( $query->have_posts() )
      {
      // TODO:
      // 1) Order the found posts by status:
      //    1) publish
      //    2) draft
      //    3) pending
      //    4) trash
      // 2) Get the first post in the sorted array.
      // 3) If the found post is not published, publish it.

      // // a page was found. Now we need to publish it.
      // while ( $query->have_posts() ) $query->have_posts()
      // {
      //   ... parse query
      // }
      }
      else
      {
      $post_data = array(
        'post_title'   => 'Social Stream Full Screen',
        'post_name'    => 'socialstream-fullscreen',
        'post_status'  => 'publish',
        'post_type'    => 'page',
      );

      $postID = wp_insert_post( $post_data, true );

      if ( !is_wp_error( $postID ) )
        update_post_meta( $postID, '_wp_page_template', 'template-socialstream-fullscreen.php' );

      }

    } /* create_public_fullscreen_page() */

    /**
     * Checks what searches are saved in the SS settings
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @return (array) Array of searches that are saved in the settings
     */

    static public function getMetaSearchesFromSettings()
    {
      // check if there is a saved search query
      $ssSearch = get_option('socialstreams_search');
      if ( empty( $ssSearch ) )
      return;

      // initialize output
      $metaSearches = array();

      // define services to check queries for
      $services = array('twitter','instagram');

      // loop through all services to find searches for each service
      foreach ( $services as $service )
      {
      // first check if the service is authenticated
      $serviceData = get_option('socialstreams_' . $service);

      $authenticated = false;
      if ( !empty( $serviceData ) && isset( $serviceData['authenticated'] ) )
        $authenticated = $serviceData['authenticated'];

      if ( !$authenticated )
        continue;


      // now check if we have a valid search query for this service
      if ( !isset( $ssSearch[ $service . 'Type' ] ) ||
         !isset( $ssSearch[ $service . 'Query' ] ) ||
         !isset( $ssSearch[ $service . 'User' ] ) )
        continue;

      // set the query to empty if the type of the search is user
      if ( $ssSearch[ $service . 'Type' ] == 'user' )
        $ssSearch[ $service . 'Query' ] = '';

      // get search query
      $ssSearchQuery = $ssSearch[ $service . 'Query' ];

      if ( $service == 'instagram' )
        $ssSearchQuery = trim( $ssSearchQuery, '#' );

      // define search meta parameters
      $metaSearch = array(
        'search_type' => $service . '_' . $ssSearch[ $service . 'Type' ],
        'search_query' => $ssSearchQuery,
        'bw_account_id' => $ssSearch[ $service . 'User' ],
      );

      // push search to array
      $metaSearches[] = $metaSearch;
      }

      return $metaSearches;

    } /* getMetaSearchesFromSettings() */


    /**
     * Get the URL of the app root. Used to enqueue scripts, styles and other
     * dependencies on the page.
     *
     * This function will work no matter if the app is a plugin, a theme or even
     * if loaded from the root.
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @return (string) URL of the app root, use to enqueue scripts, styles
     */

    // cache value
    static private $appRootUrl;

    static public function getAppRootUrl()
    {
      // get cache value, if available
      if ( is_null( static::$appRootUrl ) )
      {
        $devPluginUrlFunc = array( 'BW\\Utils\\Url', 'getClassUrl' );
        if ( is_callable( $devPluginUrlFunc ) )
          static::$appRootUrl = call_user_func_array( $devPluginUrlFunc, array( dirname( dirname( __FILE__ ) ) ) );
        else
          static::$appRootUrl = plugins_url('social-streams');
      }

      return static::$appRootUrl;

    } /* getAppRootUrl() */


    static public function getAppRootPath()
    {
      return dirname( dirname( __DIR__ ) );

    } /* getAppRootPath() */


    /**
     * Render Twig templates using the timber method, but allowing us to not specify a file extension
     *
     * @author Andrew Vivash <andrew@briteweb.com>
     * @package briteweb/base-project
     * @since 1.0.0
     * @param (string) $arg - Description
     * @return (object) Description
     */

    static public function render( $views, $context = array() )
    {

      if ( empty( $views ) )
        return;

      if ( !file_exists( static::$viewsDirname . '/' . $views ) )
        return;

      global $bw_vars, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;

      if ( is_array( $wp_query->query_vars ) )
        extract( $wp_query->query_vars, EXTR_SKIP );

      // set context in global variable
      $bw_vars = $context;

      die( static::$viewsDirname );

      // require template
      require( static::$viewsDirname . '/' . $views );



    }/* render */




  }/* class Utils */
