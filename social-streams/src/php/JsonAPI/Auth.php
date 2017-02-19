<?php

/**
 * API Authentication
 *
 * @author Richard Tape <@richardtape>
 * @package Auth.php
 * @since 1.0
 */

namespace SocialStreams\JsonAPI;

class Auth
{

    /**
     * Actions and filters
     *
     * @author Richard Tape <@richardtape>
     * @package Admin.php
     * @since 1.0
     * @param arguments
     * @return null
     */
    public function __construct()
    {

        // Initialize site settings page
        add_action( 'bwapi_1_get_connection_table_users_connection_nonces', array( &$this, 'bwapi_1_get_connection_table_users_connection_nonces' ), 10, 3 );

        add_action( 'wp_head', array( &$this, 'wp_head__getNonceModel' ) );


    }/* construct() */

    /**
     * API hook to get nonces for current user
     *
     * @author  <>
     * @package Auth.php
     * @since 1.0
     * @param $type, $request, $body
     * @return null
     */

    public function bwapi_1_get_connection_table_users_connection_nonces( $type, $request, $body )
    {

        $siteID = $request['site'];
        $userID = $request['item'];

        if ( $userID == 'me')
            $userID = get_current_user_id();

        $item = array();

        // get nonce keys
        $nonces = apply_filters( 'bwapi_nonces', array() );

        // Create nonces for each nonce key specified
        if ( !empty($nonces) ) {
            foreach ($nonces as $nonceKey) {

                // check fi we already have a nonce for this key
                if ( isset($item[ $nonceKey ]) )
                    continue;

                // generate nonce
                $item[ $nonceKey ] = wp_create_nonce( $nonceKey );

            }
        }


        // set dummy id for this model - this prevents Backbone from firing CREATE actions
        $item['id'] = 1;

        $output['result'] = 'success';
        $output['data'] = $item;

        \SocialStreams\JsonAPI\Utils::output( $output );

    }/* bwapi_1_get_connection_table_users_connection_nonces() */


    /**
     * Make first API call for the NonceModel
     * This will place the model data on the DOM
     *
     * @author  <>
     * @package Auth.php
     * @since 1.0
     * @param
     * @return null
     */

    public function wp_head__getNonceModel( )
    {
        // $output = \SocialStreams\JsonAPI\Utils::get( '1/site/users/me/nonces' );

    }/* wp_head__getNonceModel() */



}
