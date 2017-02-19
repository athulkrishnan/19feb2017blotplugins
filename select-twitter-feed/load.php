<?php

include_once 'lib/qode-twitter-api.php';
include_once 'widgets/load.php';
require_once 'shortcodes/select-twitter-shortcode.php';
include_once 'shortcodes/load.php';

add_action( 'plugins_loaded', 'select_twitter_feed_load_textdomain' );
/**
 * Load plugin textdomain.
 *
 * @since 1.0.0
 */
function select_twitter_feed_load_textdomain() {
    load_plugin_textdomain( 'select-twitter-feed', false, plugin_basename( dirname( __FILE__ ) ) . '/languages' );
}
