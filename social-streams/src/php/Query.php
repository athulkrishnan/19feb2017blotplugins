<?php

  namespace SocialStreams;

  class Query
  {

    public $posts;

    public function __construct($args = array())
    {
      $posts = array();

      $args = array_merge( array(
        'status' => 'publish'
      ), $args );

      $response = \SocialStreams\JsonAPI\Utils::call( 'get', '1/site/socialstreams', $args );

      if ( isset( $response['data'] ) && !empty( $response['data'] ) )
      {
        foreach ( $response['data'] as $postData )
        {
          $posts[] = new SSPost( $postData );
        }
      }

      $this->posts = $posts;

    }/* __construct() */


  }/* class Query */
