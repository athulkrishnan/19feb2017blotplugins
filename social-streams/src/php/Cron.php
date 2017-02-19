<?php

  namespace SocialStreams;

  class Cron
  {

    public function __construct()
    {
      // Add cron schedule for fetching every 10 min
      add_filter( 'cron_schedules', array( $this, 'cron_schedules__addSocialStreamsSchedules' ) );

      // Register cron hooks
      add_action( 'init', array( $this, 'init__registerCronHooks' ) );

      // Fetch from service API
      add_action( 'socialstreams_fetch', array( $this, 'socialstreams_fetch_cron_hook' ) );

      // Cleanup old posts
      add_action( 'socialstreams_cleanup', array( $this, 'socialstreams_cleanup' ) );

    }/* __construct() */


    /**
     * Add cron schedule for fetching every 10 min
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @param (array) $schedules - Registered WP Cron schedules
     * @return (array) Modified array of schedules
     */

    public function cron_schedules__addSocialStreamsSchedules( $schedules )
    {
      $schedules['every15mins'] = array(
        'interval' => 900,
        'display' => 'Every 15 minutes',
      );

      return $schedules;

    }/* cron_schedules__addSocialStreamsSchedules() */



    /**
     * register cron hook that will fetch data from salesforce
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     */

    public function init__registerCronHooks()
    {
      // Register cron hooks only if we are in the admin page.
      global $pagenow;
      if ( !is_admin() || $pagenow != 'admin.php' || !isset( $_GET['page'] ) || $_GET['page'] != 'social_streams' )
        return;

      if( !wp_next_scheduled( 'socialstreams_fetch' ) )
        wp_schedule_event( time(), 'every15mins', 'socialstreams_fetch' );

      if( !wp_next_scheduled( 'socialstreams_cleanup' ) )
        wp_schedule_event( time(), 'daily', 'socialstreams_cleanup' );

    }/* init__registerCronHooks() */



    public function socialstreams_fetch_cron_hook()
    {
      $this->socialstreams_fetch();

    }/* socialstreams_fetch_cron_hook() */


    /**
     *
     * @author Dan Costello <dan@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     */

    public function socialstreams_fetch()
    {

      /**
       * GET APP DATA
       */
      $ssSearch = get_option( 'socialstreams_search' );


      //IF NO SEARCH QUERY, DON'T RUN THE CRON!
      if ( empty( $ssSearch ) )
        return;



      /**
       * FETCH POSTS
       */
      $posts = $this->fetchPosts( $ssSearch );

      if ( empty( $posts ) )
        return;

      $postsArray = (array) json_decode($posts, true);


      if ( empty( $postsArray ) || !isset( $postsArray['statuses'] ) || empty( $postsArray['statuses'] ) )
        return;

      // invert the order so we keep the IDs sequential
      // (and directly proportional to the timestamps)
      $postsToSave = array_reverse( $postsArray['statuses'] );

      /**
       * SAVE POSTS
       */
      foreach ( $postsToSave as $post ) {

        // set this variable to tell the API
        // to NOT override the status if a previous post
        // was found with this vendor_id.
        //
        // This ensures that previously trashed posts are not
        // re-published.
        //
        $post['override_status'] = false;

        $appSettings = get_option( 'socialstreams_app_settings' );

        if ( !$appSettings['moderation'] )
          $post['status'] = 'publish';
        else
          $post['status'] = 'draft';

        \SocialStreams\JsonAPI\Utils::call( 'post', '1/site/socialstreams', $post);

      }


    }/* socialstreams_fetch() */



    /**
     * Fetches posts from Service API and saves into
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @return (array) Latest members pulled from SF
     */
    public function fetchPosts($query)
    {

      #pass to http_build_query
      $apiUrl = Utils::getApiUrl();

      // get the ss user ID
      $ss_user_id = get_option( 'socialstreams_user_id' );
      if ( empty( $ss_user_id ) )
        return;

      // add access token for api requests
      $access_token = get_option('socialstreams_access_token');
      if ( empty( $access_token ) )
        return;

      $apiArgs = array(
        'search'         => $query,
        'perPage'        => 102,
        'ss_user_id'     => $ss_user_id,
        'access_token'   => $access_token,
        'plugin_version' => Bootstrap::$version,
        'origin_url'     => urlencode( admin_url('admin.php?page=social_streams') ),
        'cron'           => 'true'
      );



      #EXEUTE WP_GET_REMOTE
      $result = wp_remote_get( $apiUrl . "?" . http_build_query( $apiArgs ) );

      if ( is_wp_error( $result ) )
        return;

      return $result['body'];

    } /* fetchPosts() */




    /**
     * Cleanup database - cron job run daily.
     *   - Remove posts from searches that are not the currently saved search
     *   - Max 5,000 published/draft posts (keep all trashed)
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @return null
     */

    public function socialstreams_cleanup()
    {

      global $wpdb;
      $postTypeTableName = $wpdb->prefix . 'ss_posts';


      /**
       * remove posts from different searches
       */
      // Get currently saved search
      $ssSearch = get_option( 'socialstreams_search' );

      // IF NO SEARCH QUERY, REMOVE EVERYTHING
      if ( empty( $ssSearch ) )
      {
        $wpdb->query( $wpdb->prepare("DELETE FROM $postTypeTableName WHERE 1=1") );
        return;
      }

      $search = $ssSearch;

      $services = array('twitter', 'instagram');

      // remove posts from other searches
      foreach ( $services as $service )
      {
        $validSearch = true;

        $type = '';
        $query = '';
        $user = '';

        if ( isset( $search[ $service . 'Type' ] ) )
          $type = $search[ $service . 'Type' ];

        if ( isset( $search[ $service . 'Query' ] ) )
          $query = $search[ $service . 'Query' ];

        if ( isset( $search[ $service . 'User' ] ) )
          $user = $search[ $service . 'User' ];

        switch ( $type )
        {
          case 'global':
            if ( empty( $query ) )
              $validSearch = false;

            break;

          case 'user':
            if ( empty( $user ) )
              $validSearch = false;

            break;

          default:
            $validSearch = false;
            break;
        }

        if ( $validSearch )
        {
          if ( $type == 'global' )
          {
            // if it's a global search we don't care about the user field
            $wpdb->query( $wpdb->prepare("DELETE FROM $postTypeTableName WHERE 1=1 AND search_type LIKE %s AND ( search_type != %s OR search_query != %s )", $service.'_%', $service.'_'.$type, $query ) );
          }
          else
          {
            // if it's a user search we don't look at the query field
            $wpdb->query( $wpdb->prepare("DELETE FROM $postTypeTableName WHERE 1=1 AND search_type LIKE %s AND ( search_type != %s OR bw_account_id != %d )", $service.'_%', $service.'_'.$type, $user ) );
          }
        }
        else
        {
          $wpdb->query( $wpdb->prepare("DELETE FROM $postTypeTableName WHERE 1=1 AND search_type LIKE %s", $service.'_%') );
        }

      }


      /**
       * Keep only 5000 posts (+trash)
       */
      // to do this we need to first get the 5000th post
      $posts = $wpdb->get_results( "SELECT id, order_id FROM $postTypeTableName WHERE 1=1 AND status != 'trash' ORDER BY order_id DESC LIMIT 5000,1" );

      // first check if we have more then 5000 posts
      if ( !empty( $posts ) )
      {
        $res = $wpdb->query( $wpdb->prepare( "DELETE FROM $postTypeTableName WHERE 1=1 AND status != 'trash' AND order_id <= %s", $posts[0]->order_id ) );
      }


    } /* socialstreams_cleanup() */


  }/* class Cron() */
