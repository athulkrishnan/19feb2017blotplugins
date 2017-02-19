<?php if ( ! defined( 'WPINC' ) ) die;
/**
 * @package   Flow_Flow
 * @author    Looks Awesome <hello@looks-awesome.com>

 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 *
 * @wordpress-plugin
 * Plugin Name:       Flow-Flow
 * Plugin URI:        flow.looks-awesome.com
 * Description:       Awesome social streams on your site
 * Version:           2.9.0
 * Author:            Looks Awesome
 * Author URI:        looks-awesome.com
 * Text Domain:       flow-flow
 * Domain Path:       /languages
 */
if ( ! defined( 'FF_USE_WP' ) )  define( 'FF_USE_WP', true );
if ( ! defined( 'FF_USE_WPDB' ) )  define( 'FF_USE_WPDB', false );
if ( ! defined( 'FF_USE_WP_CRON' ) ) define('FF_USE_WP_CRON', true);
//TODO add a slash to the end
if ( ! defined( 'FF_LOCALE'))  define('FF_LOCALE', get_locale());
if (FF_USE_WP){
    /** @var wpdb $wpdb */
    $wpdb = $GLOBALS['wpdb'];
    define('FF_TABLE_PREFIX', $wpdb->prefix);
}
else
    define('FF_TABLE_PREFIX', DB_TABLE_PREFIX);
define('FF_SNAPSHOTS_TABLE_NAME', FF_TABLE_PREFIX . 'ff_snapshots');


function ff_debug_to_console($data) {
    if(is_array($data) || is_object($data))
        echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
    else
        echo("<script>console.log('PHP: ".$data."');</script>");
}

if (! defined('FF_DB_CHARSET')) {
    $charset = defined( 'DB_CHARSET' ) ? DB_CHARSET : 'utf8';
    define('FF_DB_CHARSET', $charset);
}

if (!function_exists('var_dump2str')) {
    function var_dump2str($object){
        ob_start();
        var_dump($object);
        $output = ob_get_contents();
        ob_get_clean();
        return $output;
    }
}

if (!class_exists('LAClassLoader')){
    require_once( plugin_dir_path( __FILE__ ) . 'LAClassLoader.php' );
    LAClassLoader::get(plugin_dir_path( __FILE__ ))->register();
}

function ff_get_context() {
	$context = array(
		'root'              => plugin_dir_path( __FILE__ ),
		'slug'              => 'flow-flow',
		'slug_down'         => 'flow_flow',
		'plugin_url'        => plugin_dir_url(dirname(__FILE__).'/'),
		'admin_url'         => admin_url('admin-ajax.php'),
		'table_name_prefix' => FF_TABLE_PREFIX . 'ff_',
		'facebook_сache'    => new flow\cache\FFFacebookCacheAdapter()
	);
	$context['db_manager'] = new flow\db\FFDBManager($context);

	global $flow_flow_context;
	$flow_flow_context = $context;
	return $context;
}
register_activation_hook( __FILE__, array( 'flow\\FlowFlow', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'flow\\FlowFlow', 'deactivate' ) );

function ff_plugins_loaded () {
	$context = ff_get_context();

	//load addons
	do_action('ff_addon_loaded');

    if (! defined('FF_AJAX_URL')) {
        $admin = function_exists('current_user_can') && current_user_can('manage_options');
        if (!$admin && defined('FF_ALTERNATE_GET_DATA') && FF_ALTERNATE_GET_DATA)
            define('FF_AJAX_URL', plugins_url( 'ff.php', __FILE__ ));
        else
            define('FF_AJAX_URL', admin_url('admin-ajax.php' , is_ssl()));
    }

	$ff = flow\FlowFlow::get_instance($context);

	if (FF_USE_WP_CRON){
		function ff_custom_cron_intervals_register($intervals){
			$intervals['minute'] = array(
				'interval' => MINUTE_IN_SECONDS,
				'display' => 'Once Minute'
			);
			return $intervals;
		}
		add_filter('cron_schedules', 'ff_custom_cron_intervals_register');

		add_action('flow_flow_load_cache', array($ff, 'refreshCache'));
		$timestamp = wp_next_scheduled(  'flow_flow_load_cache' );
		if( $timestamp == false ){
			wp_schedule_event( time(), 'minute', 'flow_flow_load_cache' );
		}
	}
	if (defined('DOING_AJAX') && DOING_AJAX){
		add_action('wp_ajax_fetch_posts', array( $ff, 'processAjaxRequest'));
		add_action('wp_ajax_nopriv_fetch_posts', array( $ff, 'processAjaxRequest'));
		add_action('wp_ajax_moderation_apply_action', array( $ff, 'moderation_apply'));
		add_action('wp_ajax_load_cache', array( $ff, 'processAjaxRequestBackground'));
		add_action('wp_ajax_nopriv_load_cache', array( $ff, 'processAjaxRequestBackground'));

		add_action( 'wp_ajax_' . $context['slug_down'] . '_social_auth',   array($context['db_manager'], 'social_auth' ) );

		add_action( 'wp_ajax_' . $context['slug_down'] . '_get_stream_settings',   array($context['db_manager'], 'get_stream_settings' ) );
		add_action( 'wp_ajax_' . $context['slug_down'] . '_ff_save_settings',      array($context['db_manager'], 'ff_save_settings_fn' ) );
		add_action( 'wp_ajax_' . $context['slug_down'] . '_save_stream_settings',  array($context['db_manager'], 'save_stream_settings' ) );
		add_action( 'wp_ajax_' . $context['slug_down'] . '_create_stream',         array($context['db_manager'], 'create_stream' ) );
		add_action( 'wp_ajax_' . $context['slug_down'] . '_clone_stream',          array($context['db_manager'], 'clone_stream' ) );
		add_action( 'wp_ajax_' . $context['slug_down'] . '_delete_stream',         array($context['db_manager'], 'delete_stream' ) );

		$manager = new flow\settings\FFSnapshotManager($context);
		add_action('wp_ajax_create_backup',  array( $manager, 'processAjaxRequest'));
		add_action('wp_ajax_restore_backup', array( $manager, 'processAjaxRequest'));
		add_action('wp_ajax_delete_backup',  array( $manager, 'processAjaxRequest'));

		if (!FF_USE_WP_CRON){
			add_action('wp_ajax_' . $context['slug_down'] . '_refresh_cache', array($ff, 'refreshCache'));
			add_action('wp_ajax_nopriv_' . $context['slug_down'] . '_refresh_cache', array($ff, 'refreshCache'));
		}
	}
	else {
		if (is_admin()){
			flow\FlowFlowAdmin::get_instance($context);
		}
		else {
			add_action( 'init', array($ff, 'register_shortcodes'));
			add_action( 'init', array($ff, 'load_plugin_textdomain'));
			add_action( 'wp_enqueue_scripts',   array( $ff, 'enqueue_scripts' ) );
			add_action( 'wpmu_new_blog',        array( $ff, 'activate_new_site' ) );
		}
	}

	add_action( 'widgets_init', function () {
		register_widget( 'flow\\FlowFlowWPWidget' );
	});

	add_action( 'vc_before_init', function () {
		global $flow_flow_context;
        $db = $flow_flow_context['db_manager'];
        $streams = $db->streamsSafe();
        $stream_options = array();
        if(sizeof($streams)){
            foreach($streams as $stream){
                $stream_options['Stream #' . $stream['id'] . ( $stream['name'] ? ' - ' . $stream['name'] : '')] = $stream['id'];
            }
        }
        vc_map( array(
            "name" => __("Social Stream"),
            'admin_enqueue_css' => array($flow_flow_context['plugin_url'] . $flow_flow_context['slug'] . '/css/admin-icon.css'),
            'front_enqueue_css' => array($flow_flow_context['plugin_url'] . $flow_flow_context['slug'] . '/css/admin-icon.css'),
            'icon' => 'streams-icon',
            "description" => __("Flow-Flow plugin social stream"),
            "base" => "ff",
            "category" => __('Social'),
            "weight" => 0,
            "params" => array(
                array(
                    'type' => 'dropdown',
                    'class' => '',
                    'admin_label' => true,
                    "holder" => "div",
                    "class" => "",
                    "heading" => __("Choose stream to place on page:" ),
                    "description" => "Please create and edit stream on plugin's page in admin.",
                    "param_name" => "id",
                    "value" => $stream_options,
                    "std" => '--'
                )
            )
        ));
    });
}
add_action( 'plugins_loaded', 'ff_plugins_loaded');
