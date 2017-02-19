<?php 

if (!defined('ABSPATH') && !defined('WP_UNINSTALL_PLUGIN')) exit();

// delete plugin options
delete_option('elfsight_instashow_purchase_code');
delete_option('elfsight_instashow_activated');
delete_option('elfsight_instashow_latest_version');
delete_option('elfsight_instashow_last_check_datetime');
delete_option('elfsight_instashow_force_script_add');
delete_option('elfsight_instashow_widgets_clogged');

?>