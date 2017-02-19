<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly

/**
 * Compatibility Class
 *
 * @class   YITH_WCPSC_Compatibility
 * @package Yithemes
 * @since   1.0.0
 * @author  Yithemes
 *
 */
class YITH_WCPSC_Compatibility {

    /**
     * Single instance of the class
     *
     * @var \YITH_WCPSC_Compatibility
     * @since 1.0.0
     */
    protected static $instance;

    /**
     * Returns single instance of the class
     *
     * @return \YITH_WCPSC_Compatibility
     * @since 1.0.0
     */
    public static function get_instance() {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    /**
     * Constructor
     *
     * @access public
     * @since  1.0.0
     */
    public function __construct() {
        $this->include_compatibility_files();
    }

    /**
     * Include compatibility files
     *
     * @access public
     * @since  1.0.0
     */
    private function include_compatibility_files() {
        $compatibility_dir = YITH_WCPSC_DIR . 'includes/compatibility/';

        $files = array(
            $compatibility_dir . 'class.yith-wcpsc-multivendor-compatibility.php'
        );

        foreach ( $files as $file ) {
            file_exists( $file ) && require_once( $file );
        }

    }


    /**
     * Check if user has YITH Multivendor Premium plugin
     *
     * @author Leanza Francesco <leanzafrancesco@gmail.com>
     * @since  1.0
     * @return bool
     */
    static function has_multivendor_plugin() {
        return defined( 'YITH_WPV_PREMIUM' ) && YITH_WPV_PREMIUM && defined( 'YITH_WPV_VERSION' ) && version_compare( YITH_WPV_VERSION, apply_filters( 'yith_wcpsc_multivendor_min_version', '1.7.1' ), '>=' );
    }
}

/**
 * Unique access to instance of YITH_WCPSC_Compatibility class
 *
 * @return YITH_WCPSC_Compatibility
 * @since 1.0.0
 */
function YITH_WCPSC_Compatibility() {
    return YITH_WCPSC_Compatibility::get_instance();
}