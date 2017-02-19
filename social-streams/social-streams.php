<?php

  /**
   * Plugin Name: Social Streams
   * Plugin URI: https://socialstreams.com
   * Description: Social Streams
   * Version: 1.0.1
   * Author: #BRITEWEB
   * Author URI: http://briteweb.com
   */

  // Don't allow the plugin to be loaded directly
  if ( ! function_exists( 'add_action' ) ) {
    echo 'Please enable this plugin from the WordPress admin area.';
    exit;
  }

  if ( version_compare( phpversion(), '5.3', '<') )
  {
    echo '<p style="line-height: 24px;">Social Streams requires PHP v5.3+ <br />Installed PHP version: ' . phpversion() . '</p>';
    exit;
  }

  function ss_plugins_loaded__socialstreams_init()
  {
    // If the class exists we don't need to require the autoloader
    $bootstrapClass = 'SocialStreams\\Bootstrap';

    // Initialize Composer Autoload
    if ( !class_exists( $bootstrapClass ) && file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) && version_compare( phpversion(), '5.3', '>=' ) )
      require_once( dirname( __FILE__ ) . '/vendor/autoload.php' );

    // Initialize plugin
    $version = '1.0.1';

    if( class_exists( $bootstrapClass ) )
      new $bootstrapClass( __FILE__, $version );

  } /* socialstreams_plugins_loaded() */

  add_action( 'plugins_loaded', 'ss_plugins_loaded__socialstreams_init' );
