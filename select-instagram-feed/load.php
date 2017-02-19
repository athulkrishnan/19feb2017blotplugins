<?php
include_once 'lib/qode-instagram-api.php';
include_once 'widgets/load.php';

add_action( 'plugins_loaded', 'select_instagram_feed_load_textdomain' );
/**
 * Load plugin textdomain.
 *
 * @since 1.0.0
 */
function select_instagram_feed_load_textdomain() {
  load_plugin_textdomain( 'select-instagram-feed', false, plugin_basename( dirname( __FILE__ ) ) . '/languages' ); 
}