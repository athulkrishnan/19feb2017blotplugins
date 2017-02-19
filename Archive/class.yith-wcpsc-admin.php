<?php
/**
 * Admin class
 *
 * @author  Yithemes
 * @package YITH Product Size Charts for WooCommerce
 * @version 1.0.0
 */

if ( !defined( 'YITH_WCPSC' ) ) {
    exit;
} // Exit if accessed directly

if ( !class_exists( 'YITH_WCPSC_Admin' ) ) {
    /**
     * Admin class.
     * The class manage all the admin behaviors.
     *
     * @since    1.0.0
     * @author   Leanza Francesco <leanzafrancesco@gmail.com>
     */
    class YITH_WCPSC_Admin {

        /**
         * Single instance of the class
         *
         * @var \YITH_WCQV_Admin
         * @since 1.0.0
         */
        protected static $instance;

        /**
         * Plugin options
         *
         * @var array
         * @access public
         * @since  1.0.0
         */
        public $options = array();

        /**
         * Plugin version
         *
         * @var string
         * @since 1.0.0
         */
        public $version = YITH_WCPSC_VERSION;

        /**
         * @var $_panel Panel Object
         */
        protected $_panel;

        /**
         * @var string Premium version landing link
         */
        protected $_premium_landing = '#';

        /**
         * @var string Quick View panel page
         */
        protected $_panel_page = 'yith_wcpsc_panel';

        /**
         * Various links
         *
         * @var string
         * @access public
         * @since  1.0.0
         */
        public $doc_url = 'http://yithemes.com/docs-plugins/yith-product-size-charts-for-woocommerce/';

        public $templates = array();

        /**
         * Returns single instance of the class
         *
         * @return \YITH_WCPSC
         * @since 1.0.0
         */
        public static function get_instance() {
            $self = __CLASS__ . ( class_exists( __CLASS__ . '_Premium' ) ? '_Premium' : '' );

            if ( is_null( $self::$instance ) ) {
                $self::$instance = new $self;
            }

            return $self::$instance;
        }

        /**
         * Constructor
         *
         * @access public
         * @since  1.0.0
         */
        public function __construct() {

            add_action( 'admin_menu', array( $this, 'register_panel' ), 5 );

            // Add Capabilities to Administrator and Shop Manager
            add_action( 'admin_init', array( $this, 'add_capabilities' ) );

            //Add action links
            add_filter( 'plugin_action_links_' . plugin_basename( YITH_WCPSC_DIR . '/' . basename( YITH_WCPSC_FILE ) ), array( $this, 'action_links' ) );
            add_filter( 'plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 4 );

            // Enqueue Scripts
            add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );

            // Register Post Type
            add_action( 'init', array( $this, 'post_type_register' ) );
            add_action( 'save_post', array( $this, 'metabox_table_save' ) );
        }

        /**
         * Action Links
         *
         * add the action links to plugin admin page
         *
         * @param $links | links plugin array
         *
         * @return   mixed Array
         * @since    1.0
         * @author   Leanza Francesco <leanzafrancesco@gmail.com>
         * @return mixed
         * @use      plugin_action_links_{$plugin_file_name}
         */
        public function action_links( $links ) {

            //$links[] = '<a href="' . admin_url( "admin.php?page={$this->_panel_page}" ) . '">' . __( 'Description', 'yith-product-size-charts-for-woocommerce' ) . '</a>';

            return $links;
        }

        /**
         * plugin_row_meta
         *
         * add the action links to plugin admin page
         *
         * @param $plugin_meta
         * @param $plugin_file
         * @param $plugin_data
         * @param $status
         *
         * @return   Array
         * @since    1.0
         * @use      plugin_row_meta
         */
        public function plugin_row_meta( $plugin_meta, $plugin_file, $plugin_data, $status ) {

            if ( defined( 'YITH_WCPSC_FREE_INIT' ) && YITH_WCPSC_FREE_INIT == $plugin_file || defined( 'YITH_WCPSC_INIT' ) && YITH_WCPSC_INIT == $plugin_file ) {
                $plugin_meta[] = '<a href="' . $this->doc_url . '" target="_blank">' . __( 'Plugin Documentation', 'yith-product-size-charts-for-woocommerce' ) . '</a>';
            }

            return $plugin_meta;
        }

        /**
         * Add a panel under YITH Plugins tab
         *
         * @return   void
         * @since    1.0
         * @author   Leanza Francesco <leanzafrancesco@gmail.com>
         * @use      /Yit_Plugin_Panel class
         * @see      plugin-fw/lib/yit-plugin-panel.php
         */
        public function register_panel() {

            if ( !empty( $this->_panel ) ) {
                return;
            }

            $admin_tabs_free = array(
                'description' => __( 'Description', 'yith-product-size-charts-for-woocommerce' ),
                //'premium'       => __( 'Premium Version', 'yith-product-size-charts-for-woocommerce' )
            );

            $admin_tabs = apply_filters( 'yith_wcpsc_settings_admin_tabs', $admin_tabs_free );

            $args = array(
                'create_menu_page' => true,
                'parent_slug'      => '',
                'page_title'       => _x( 'Product Size Charts', 'plugin name in admin page title', 'yith-product-size-charts-for-woocommerce' ),
                'menu_title'       => _x( 'Product Size Charts', 'plugin name in admin WP menu', 'yith-product-size-charts-for-woocommerce' ),
                'capability'       => 'manage_options',
                'parent'           => '',
                'parent_page'      => 'yit_plugin_panel',
                'page'             => $this->_panel_page,
                'admin-tabs'       => $admin_tabs,
                'options-path'     => YITH_WCPSC_DIR . '/plugin-options'
            );

            /* === Fixed: not updated theme  === */
            if ( !class_exists( 'YIT_Plugin_Panel_WooCommerce' ) ) {
                require_once( 'plugin-fw/lib/yit-plugin-panel-wc.php' );
            }

            $this->_panel = new YIT_Plugin_Panel_WooCommerce( $args );

            add_action( 'woocommerce_admin_field_yith_wcpsc_upload', array( $this->_panel, 'yit_upload' ), 10, 1 );
            add_action( 'woocommerce_update_option_yith_wcpsc_upload', array( $this->_panel, 'yit_upload_update' ), 10, 1 );


        }

        /**
         * Register Order Status custom post type with options metabox
         *
         * @return   void
         * @since    1.0
         * @author   Leanza Francesco <leanzafrancesco@gmail.com>
         */
        public function post_type_register() {
            $labels = array(
                'name'               => __( 'Size Charts', 'yith-product-size-charts-for-woocommerce' ),
                'singular_name'      => __( 'Size Chart', 'yith-product-size-charts-for-woocommerce' ),
                'add_new'            => __( 'Add Size Chart', 'yith-product-size-charts-for-woocommerce' ),
                'add_new_item'       => __( 'New Size Chart', 'yith-product-size-charts-for-woocommerce' ),
                'edit_item'          => __( 'Edit Size Chart', 'yith-product-size-charts-for-woocommerce' ),
                'view_item'          => __( 'View Size Chart', 'yith-product-size-charts-for-woocommerce' ),
                'not_found'          => __( 'Size Chart not found', 'yith-product-size-charts-for-woocommerce' ),
                'not_found_in_trash' => __( 'Size Chart not found in trash', 'yith-product-size-charts-for-woocommerce' )
            );

            $capability_type = 'size_chart';
            $caps            = array(
                'edit_post'              => "edit_{$capability_type}",
                'read_post'              => "read_{$capability_type}",
                'delete_post'            => "delete_{$capability_type}",
                'edit_posts'             => "edit_{$capability_type}s",
                'edit_others_posts'      => "edit_others_{$capability_type}s",
                'publish_posts'          => "publish_{$capability_type}s",
                'read_private_posts'     => "read_private_{$capability_type}s",
                'read'                   => "read",
                'delete_posts'           => "delete_{$capability_type}s",
                'delete_private_posts'   => "delete_private_{$capability_type}s",
                'delete_published_posts' => "delete_published_{$capability_type}s",
                'delete_others_posts'    => "delete_others_{$capability_type}s",
                'edit_private_posts'     => "edit_private_{$capability_type}s",
                'edit_published_posts'   => "edit_published_{$capability_type}s",
                'create_posts'           => "edit_{$capability_type}s",
                'manage_posts'           => "manage_{$capability_type}s",
            );

            $args = array(
                'labels'               => $labels,
                'public'               => true,
                'show_ui'              => true,
                'menu_position'        => 10,
                'exclude_from_search'  => true,
                'capability_type'      => 'size_chart',
                'capabilities'         => $caps,
                'map_meta_cap'         => true,
                'rewrite'              => true,
                'has_archive'          => true,
                'hierarchical'         => false,
                'show_in_nav_menus'    => false,
                'menu_icon'            => 'dashicons-grid-view',
                'supports'             => array( 'title' ),
                'register_meta_box_cb' => array( $this, 'register_table_metabox' )
            );

            register_post_type( 'yith-wcpsc-wc-chart', $args );

            $prod_sel = array(
                'none' => __( 'None', 'yith-product-size-charts-for-woocommerce' )
            );

            if ( !defined( 'YITH_WCPSC_PREMIUM' ) ) {
                $prod_args = array(
                    'posts_per_page' => -1,
                    'post_type'      => 'product',
                    'post_status'    => 'publish',
                    'orderby'        => 'title',
                    'order'          => 'ASC',
                );

                $products = get_posts( $prod_args );

                if ( count( $products ) > 0 ) {
                    foreach ( $products as $p ) {
                        $prod_sel[ $p->ID ] = $p->post_title;
                    }
                }
            }

            $args    = array(
                'label'    => __( 'Chart Options', 'yith-product-size-charts-for-woocommerce' ),
                'pages'    => 'yith-wcpsc-wc-chart',
                'context'  => 'normal',
                'priority' => 'default',
                'tabs'     => apply_filters( 'yith_wcpsc_tabs_metabox_chart_options', array(
                    'settings' => array( //tab
                                         'label'  => __( 'Chart Options', 'yith-product-size-charts-for-woocommerce' ),
                                         'fields' => array(
                                             'product' => array(
                                                 'label'   => __( 'Product', 'yith-product-size-charts-for-woocommerce' ),
                                                 'desc'    => __( 'Select the product in which this size chart has to be shown.', 'yith-product-size-charts-for-woocommerce' ),
                                                 'type'    => 'select',
                                                 'private' => false,
                                                 'options' => $prod_sel,
                                                 'std'     => 'none'
                                             )
                                         ),
                    )
                ) )
            );
            $metabox = YIT_Metabox( 'yith-wcpsc-metabox-settings' );
            $metabox->init( $args );
        }


        /**
         * Add size_chart management capabilities to Admin and Shop Manager
         *
         *
         * @access public
         * @since  1.0.0
         * @author Leanza Francesco <leanzafrancesco@gmail.com>
         */
        public function add_capabilities() {

            $capability_type = 'size_chart';
            $caps            = array(
                'edit_post'              => "edit_{$capability_type}",
                'delete_post'            => "delete_{$capability_type}",
                'edit_posts'             => "edit_{$capability_type}s",
                'edit_others_posts'      => "edit_others_{$capability_type}s",
                'publish_posts'          => "publish_{$capability_type}s",
                'read_private_posts'     => "read_private_{$capability_type}s",
                'delete_posts'           => "delete_{$capability_type}s",
                'delete_private_posts'   => "delete_private_{$capability_type}s",
                'delete_published_posts' => "delete_published_{$capability_type}s",
                'delete_others_posts'    => "delete_others_{$capability_type}s",
                'edit_private_posts'     => "edit_private_{$capability_type}s",
                'edit_published_posts'   => "edit_published_{$capability_type}s",
                'create_posts'           => "edit_{$capability_type}s",
            );

            // gets the admin and shop_mamager roles
            $admin        = get_role( 'administrator' );
            $shop_manager = get_role( 'shop_manager' );

            foreach ( $caps as $key => $cap ) {
                $admin->add_cap( $cap );
                $shop_manager->add_cap( $cap );
            }
        }

        /**
         * Register the metabox containing the chart table
         *
         * @since       1.0.0
         * @author      Leanza Francesco <leanzafrancesco@gmail.com>
         */
        public function register_table_metabox() {
            add_meta_box( 'yith-wcpsc-metabox-table', __( 'Create your Size Chart', 'yith-product-size-charts-for-woocommerce' ), array( $this, 'metabox_table_render' ), 'yith-wcpsc-wc-chart', 'normal', 'high' );
        }

        /**
         * Render the metabox containing the chart table
         *
         * @since       1.0.0
         *
         * @param       $post
         *
         * @author      Leanza Francesco <leanzafrancesco@gmail.com>
         */
        public function metabox_table_render( $post ) {
            $table_meta = get_post_meta( $post->ID, '_table_meta', true ) ? get_post_meta( $post->ID, '_table_meta', true ) : '[[""]]';

            $args = array(
                'table_meta' => $table_meta
            );

            wc_get_template( 'metaboxes/table.php', $args, YITH_WCPSC_TEMPLATE_PATH . '/', YITH_WCPSC_TEMPLATE_PATH . '/' );
        }

        /**
         * Save meta for the metabox containing the chart table
         *
         * @since       1.0.0
         *
         * @param       $post_id
         *
         * @author      Leanza Francesco <leanzafrancesco@gmail.com>
         */
        public function metabox_table_save( $post_id ) {
            if ( !empty( $_POST[ '_table_meta' ] ) ) {
                $table_meta = $_POST[ '_table_meta' ];

                update_post_meta( $post_id, '_table_meta', $table_meta );
            }
        }

        public function admin_enqueue_scripts() {
            $premium_suffix = defined( 'YITH_WCPSC_PREMIUM' ) ? '_premium' : '';

            wp_enqueue_style( 'yith-wcpsc-admin-styles', YITH_WCPSC_ASSETS_URL . '/css/admin' . $premium_suffix . '.css' );
            wp_enqueue_style( 'wp-color-picker' );
            wp_enqueue_script( 'wp-color-picker' );
            wp_enqueue_script( 'jquery-ui-tabs' );
            wp_enqueue_style( 'jquery-ui-style-css', '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css' );
            wp_enqueue_style( 'googleFontsOpenSans', '//fonts.googleapis.com/css?family=Open+Sans:400,600,700,800,300' );

            $screen = get_current_screen();

            $metabox_js = 'metabox.js';

            if ( 'yith-wcpsc-wc-chart' == $screen->id ) {

                wp_enqueue_style( 'yith-wcpsc-hide-cpt-parts', YITH_WCPSC_ASSETS_URL . '/css/hide_cpt_parts.css' );

                wp_enqueue_script( 'yith_wcpsc_metabox_js', YITH_WCPSC_ASSETS_URL . '/js/' . $metabox_js, array( 'jquery' ), '1.0.0', true );
                wp_localize_script( 'yith_wcpsc_metabox_js', 'ajax_object', array() );
            }

        }
    }
}

/**
 * Unique access to instance of YITH_WCPSC_Admin class
 *
 * @return \YITH_WCPSC_Admin
 * @since 1.0.0
 */
function YITH_WCPSC_Admin() {
    return YITH_WCPSC_Admin::get_instance();
}

?>
