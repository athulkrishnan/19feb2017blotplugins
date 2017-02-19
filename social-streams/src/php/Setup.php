<?php

  namespace SocialStreams;

  class Setup
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
       * Set up new ss_posts table
       */
      // add_action( 'plugins_loaded', array( $this, 'plugins_loaded__setUpPostSchema' ) );
      add_action( 'ss_setup_db_schema', array( $this, 'plugins_loaded__setUpPostSchemaForce' ) );
      $this->plugins_loaded__setUpPostSchema();


    }/* construct() */




    public function plugins_loaded__setUpPostSchemaForce()
    {
      $this->plugins_loaded__setUpPostSchema(true);
    }

    /**
     * Sets up Social Stream Post schema
     *
     * @author Dan Costello <dan@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     */

    public function plugins_loaded__setUpPostSchema($force = false)
    {
      /*
      Register custom post type
       */
      $post_table = \SocialStreams\BWPostTypeFactory::factory( array(
        'name' => 'ss_post',
        'alias' => 'ss',
        'authorField' => 'author',
        'version' => Bootstrap::$version,
        'optionName' => 'socialstreams_version',
        'fields' => array(
          'post' => array(
            'type' => 'longtext',
            'extra' => 'NOT NULL',
            'isKey' => false,
            'object_type' => false, // 'user', 'post', 'term'
            'format' => '%s',
          ),
          'order_id' => array(
            'type' => 'varchar',
            'size' => 255,
            'default' => '',
            'extra' => 'NOT NULL',
            'isKey' => true,
            'object_type' => false, // 'user', 'post', 'term'
            'format' => '%s',
          ),
          'service_name' => array(
            'type' => 'varchar',
            'size' => 255,
            'default' => '',
            'extra' => 'NOT NULL',
            'isKey' => false,
            'object_type' => false, // 'user', 'post', 'term'
            'format' => '%s',
          ),
          'app_id' => array(
            'type' => 'varchar',
            'size' => 255,
            'default' => '',
            'extra' => 'NOT NULL',
            'isKey' => true,
            'object_type' => false, // 'user', 'post', 'term'
            'format' => '%s',
          ),
          'vendor_id' => array(
            'type' => 'varchar',
            'size' => 255,
            'default' => '',
            'extra' => 'NOT NULL',
            'isKey' => false,
            'object_type' => false, // 'user', 'post', 'term'
            'format' => '%s',
          ),
          'bw_account_id' => array(
            'type' => 'varchar',
            'size' => 255,
            'default' => '',
            'extra' => 'NOT NULL',
            'isKey' => false,
            'object_type' => false, // 'user', 'post', 'term'
            'format' => '%s',
          ),
          'search_type' => array(
            'type' => 'varchar',
            'size' => 255,
            'default' => '',
            'extra' => 'NOT NULL',
            'isKey' => false,
            'object_type' => false, // 'user', 'post', 'term'
            'format' => '%s',
          ),
          'search_query' => array(
            'type' => 'varchar',
            'size' => 255,
            'default' => '',
            'extra' => 'NOT NULL',
            'isKey' => false,
            'object_type' => false, // 'user', 'post', 'term'
            'format' => '%s',
          )

        ),

      ), $force);


    }/* plugins_loaded__setUpPostSchema() */

  }/* class setup() */
