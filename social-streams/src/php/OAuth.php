<?php

  namespace SocialStreams;

  class OAuth
  {

    /**
     * Constructor. Add filters and actions
     *
     * @author Dan Costello <@dstello>
     * @package briteweb/social-streams
     * @since 1.0.0
     */
    public function __construct()
    {

      /**
       * Hook for registering post type
       */
      add_action( 'admin_init', array( $this, 'admin_init__oAuthReturn' ) );

    }/* construct() */


    /**
     * @internal Catches $_GET variables from oAuth return. Sets bw_account_id and authenticated to TRUE;
     *
     * @author Dan Costello <dan@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     */

    public function admin_init__oAuthReturn( )
    {

      /**
       * If service and app_name exist, expect good auth returned
       */
      if ( isset( $_GET['service'] ) && !empty( $_GET['service'] ) && isset( $_GET['app_name'] ) && !empty( $_GET['app_name'] ) )
      {
        $service = $_GET['service'];

        // Get options to update (app + service options!)
        $service_options = get_option( 'socialstreams_'. $service );

        // Confirm BW account ID came back (confirms good auth returned)
        if ( isset( $_GET['ss_account_id'] ) && !empty( $_GET['ss_account_id'] ) )
        {
          $service_options['bw_account_id'] = $_GET['ss_account_id'];
          $service_options['app_name'] = $_GET['app_name'];
          $service_options['authenticated'] = true;

          if ( isset( $_GET['service_username'] ) )
            $service_options['service_username'] = $_GET['service_username'];
        }
        else
        {
          $service_options['authenticated'] = false;
        }

        update_option( 'socialstreams_'. $_GET['service'], $service_options );

        // save SS user ID
        if ( isset( $_GET['ss_user_id'] ) && !empty( $_GET['ss_user_id'] ) )
          update_option( 'socialstreams_user_id', $_GET['ss_user_id'] );


        /**
         * socialstreams_access_token not being saved?
         */

        // exchange code for access_token
        if ( isset( $_GET['code'] ) && !empty( $_GET['code'] ) )
        {

          // make POST request to SS Server to get token
          $oauthUrl = Utils::getOauthUrl();
          $response = wp_remote_post( $oauthUrl . '/access_token?code=' . $_GET['code'] );

          // \BW\Debug::pre($response );

          // \BW\Debug::pre( $_GET['code'] );
          // die( $response );

          if ( !is_wp_error( $response ) )
          {
            $resultData = json_decode( $response['body'], true );

            if ( !empty( $resultData ) && isset( $resultData['access_token'] ) )
              update_option( 'socialstreams_access_token', $resultData['access_token'] );
          }

        }

        echo "<html><head></head><body onload='window.close();'></body></html>";
        die();


      } elseif ( isset( $_GET['auth_error'] ) && !empty( $_GET['auth_error'] ) )  {

        echo "<html><head></head><body><h3> oh hai. something went wrong. kthnx bai.</h3><h4>is the user already authenticated?</h4></body></html>";
        die();

      }

    }/* admin_init__oAuthReturn() */


  }
