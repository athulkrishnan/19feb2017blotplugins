<?php

  namespace SocialStreams\JsonAPI\Module;

  /**
   * Adds the ability to concatenate several API requests and get the data back equally concatenated. Each request is fully cached.
   * $requests = array(
   *      array( '1/1/posts/23/comments', array( 'fields' => array( 'ID', 'author' ), 'perPage' => 5 ) ),
   *      array( '1/global/users',        array( 'fields' => array( 'ID', 'user_nicename' ), 'perPage' => 7 ) ),
   *      array( '1/1/socialstreams',     array( 'fields' => array( 'stream_service', 'from_user_name', 'time', 'message', 'media', 'from_user', 'ID', 'thumbnail', 'urls' ), 'from' => '2013-02-15' ) ),
   *      array( '1/1/courses/' )
   * );
   *
   * $concatReq = \SocialStreams\JsonAPI\Utils::get( '1/1/batch', $requests );
   * $data = $concatReq['data'];
   *
   * @author Richard Tape <@richardtape>
   * @package Concat.php
   * @since 1.0
   * @request /api/1/site/batch
   */

  class Batch extends \SocialStreams\JsonAPI\Module
  {

    /**
     *
     * Set up our actions and filters
     *
     * @author Richard Tape <@richardtape>
     * @package Category.php
     * @since 1.0
     * @param arguments
     * @return null
     */

    public function __construct()
    {

      // TODO : Set up separate action for concat
      add_action( 'bwapi_1_post_table_table_batch', array( &$this, 'bwapi_1_post_table_table_batch' ), 10, 3 );

    }/* __construct() */


    /**
     * We have a request for several API Requests to be concatenated
     *
     * @author Richard Tape <@richardtape>
     * @package Category.php
     * @since 1.0
     * @param (array) $fullRequest - The full request that we're making, including the action
     * @param (string) $typeOfRequest - What type of request are we making
     * @param (array) $requestBody - the body of the request (i.e. $_GET or $_POST)
     * @return null
     */

    public function bwapi_1_post_table_table_batch( $fullRequest, $typeOfRequest, $APIRequests )
    {

      // Start fresh
      $output = array();

      if( !is_array( $APIRequests ) || count( $APIRequests ) < 1 )
        return \SocialStreams\JsonAPI\Utils::output( array( 'result' => 'failure', 'message' => 'Concatenation request body must be an array of arrays.' ) );

      $items = array();

      // Let's get each request
      foreach( $APIRequests as $requestID => $request )
      {
        // Each $request is now a single full request where the first array item is the request and (optionally) the second is the payload
        // The result from this request
        $requestOutput = \SocialStreams\JsonAPI\Bootstrap::$bw_api->call( strtoupper( $request['type'] ), $request['url'], $request['data'], ARRAY_A );

        // write to array
        $items[ $requestID ] = $requestOutput;

      }

      $output = array(
        'result' => 'success',
        'data' => $items,
        'requests' => $APIRequests,
      );

      \SocialStreams\JsonAPI\Utils::output( $output );

    }/* bwapi_1_post_table_table_batch() */

  }/* class Post */
