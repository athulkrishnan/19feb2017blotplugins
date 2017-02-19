<?php

namespace SocialStreams;


class PageTemplate {


  /**
   * The array of templates that this plugin tracks.
   */
  public static $templates = array(
    'template-socialstream.php' => 'Social Streams',
    'template-socialstream-fullscreen.php' => 'Social Streams - Full Screen'
  );

  /**
   * Initializes the plugin by setting filters and administration functions.
   */
  public function __construct() {

    // Add a filter to the attributes metabox to inject template into the cache.
    add_filter( 'page_attributes_dropdown_pages_args', array( $this, 'register_project_templates' ) );


    // Add a filter to the save post to inject out template into the page cache
    add_filter( 'wp_insert_post_data', array( $this, 'register_project_templates' ) );


    // Add a filter to the template include to determine if the page has our
    // template assigned and return it's path
    add_filter( 'template_include', array( $this, 'view_project_template') );


    // Filter to add the SS public app to the bottom of the content.
    add_filter( 'the_content', array( $this, 'the_content__addSocialStreams'), 999 );


  }


  /**
   * Adds our template to the pages cache in order to trick WordPress
   * into thinking the template file exists where it doens't really exist.
   *
   */

  public function register_project_templates( $atts ) {

    // get current theme object
    $theme = wp_get_theme();

    // Create the key used for the themes cache
    $field = 'page_templates';
    $cache_hash = md5( $theme->theme_root . '/' . $theme->stylesheet );
    $cache_key = $field . '-' . $cache_hash;

    // Retrieve the cache list.
    // If it doesn't exist, or it's empty prepare an array
    $templates = $theme->get_page_templates();
    if ( empty( $templates ) )
      $templates = array();


    // New cache, therefore remove the old one
    wp_cache_delete( $cache_key , 'themes');


    // Now add our template to the list of templates by merging our templates
    // with the existing templates array from the cache.
    $templates = array_merge( $templates, static::$templates);

    // Add the modified cache to allow WordPress to pick it up for listing
    // available templates
    wp_cache_add( $cache_key, $templates, 'themes', 1800 );

    return $atts;

  }


  /**
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   * @param (string) $arg - Description
   * @return (object) Description
   */

  public function view_project_template( $template )
  {

    if ( isset( static::$templates[ basename( $template ) ] ) )
      return $template;

    global $post;
    $_wp_page_template = get_post_meta( $post->ID, '_wp_page_template', true );

    if( isset( static::$templates[ basename( $_wp_page_template ) ] ) )
      $template = Utils::getAppRootPath() . '/templates/' . basename( $_wp_page_template );

    return $template;

  } /* page_template() */


  /**
   * Filter to add the Social Streams public app
   *
   * @author Alessandro Biavati <ale@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   * @param (string) $content - Content of the current page (HTML)
   * @return (string) Modified content (HTML)
   */

  public function the_content__addSocialStreams($content)
  {
    global $wp_query, $post;


    // check if this is the main query
    if ( !isset( $wp_query->post ) || !isset( $wp_query->post->ID ) || $wp_query->post->ID != $post->ID )
      return $content;

    // check this post type is "page"
    if ( $post->post_type != 'page' )
      return $content;

    // check if page has the SS template
    $_wp_page_template = get_post_meta( $post->ID, '_wp_page_template', true );
    if(  empty( $_wp_page_template ) || !isset( static::$templates[ basename( $_wp_page_template ) ] ) )
      return $content;

    // get the social streams settings loaded in the footer
    \SocialStreams\JsonAPI\Utils::call( 'get', '1/site/options/socialstreams_app_settings' );

    // get social streams posts
    $socialStreams = new \SocialStreams\Query();


    ob_start();
    include Utils::getAppRootPath() . '/src/views/socialstreams.php';
    $socialstreams = ob_get_contents();
    ob_end_clean();

    $content .= $socialstreams;

    return $content;

  } /* the_content__addSocialStreams() */


}
