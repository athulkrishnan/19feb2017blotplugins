<?php

  namespace SocialStreams;

  /**
   * Adjustments for the admin back-end
   *
   * @author Dan Costello <@dstello>
   * @package Admin.php
   * @since 1.0
   */

  class Admin
  {

    public function __construct()
    {
      /**
       * Initialize site settings page
       */
      add_action('admin_menu',  array( $this, 'admin_menu__addAdminPage' ) );

      /**
       * Add Edit + View buttons
       */
      add_action( 'admin_bar_menu', array( $this, 'admin_bar_menu__addAdminBarEditButton' ), 999 );

      /**
       * Setting link after install the plugin
       */
      add_filter( 'plugin_action_links', array( $this, 'plugin_action_links__addPluginSettingsLink' ), 10, 2 );

    }/* construct() */



    /**
     * Social Streams admin controller
     *
     * @author Dan Costello <dan@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     */

    public function admin_menu__addAdminPage( )
    {
      add_menu_page( "Social Streams", "Social Streams", 'manage_options', 'social_streams', array( $this, 'add_menu_page__socialStreamsAdminPage' ), Utils::getAppRootUrl() . '/src/images/logos/logo-20x20.png' );

    }/* admin_menu__addAdminPage() */



    /**
     * Social Streams admin view
     *
     * @author Dan Costello <dan@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     */
    public function add_menu_page__socialStreamsAdminPage(){

      /**
       * Call JSONAPI from PHP  - load App Settings in footer
       */
      \SocialStreams\JsonAPI\Utils::call( 'get', '1/site/options/socialstreams_app_settings');
      \SocialStreams\JsonAPI\Utils::call( 'get', '1/site/options/socialstreams_search');
      \SocialStreams\JsonAPI\Utils::call( 'get', '1/site/usermeta/socialstreams');


      /**
       * check if at least one service is authenticated
       */
      $services = \SocialStreams\JsonAPI\Utils::call( 'get', '1/site/socialstreams_services');
      $authenticated = false;
      if ( isset( $services['data'] ) && !empty( $services['data'] ) )
      {
        foreach ( $services['data'] as $service )
        {
          if ( isset( $service['authenticated'] ) && $service['authenticated'] == true )
          {
            $authenticated = true;
            break;
          }
        }
      }

      /**
       * Print app
       */
      echo '<div class="wrap-outer ss-admin">';
      if ( $authenticated )
      {
        // print admin form
        ?>
        <div class="ss-header-region"></div> <!-- .ss-header-region  -->
        <div class="ss-search-region"></div> <!-- .ss-search-region  -->
        <?php

        /**
         * get top posts
         */
        $socialStreams = new \SocialStreams\Query(array(
          'status' => array('publish', 'draft'),
          'request_id' => 'socialstreams_top'
        ));

        // /**
        //  * Make second query to load all IDs to the footer
        //  */
        // new \SocialStreams\Query(array(
        //   'perPage' => -1,
        //   'status' => array('publish','draft','trash'),
        //   'fields' => array('id', 'status', 'vendor_id', 'service_name'),
        //   'request_id' => 'socialstreams_all'
        // ));

        // print posts
        echo '<div class="ss-posts-region">';
        include Utils::getAppRootPath() . '/src/views/socialstreams.php';
        echo '</div> <!-- .ss-posts-region -->';
        echo '<div class="ss-loader-region"></div> <!-- .ss-loader-region -->';
      }
      else
      {
        ?>
        <div class="ss-home-region"></div><!-- .ss-home-region -->
        <?php
      }
      echo '</div> <!-- .wrap-outer -->';

    } /* add_menu_page__socialStreamsAdminPage() */



    /**
     * Add admin bar links
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @param (obj) $wp_admin_bar - WP admin bar object
     * @return null
     */
    public function admin_bar_menu__addAdminBarEditButton($wp_admin_bar)
    {
      //check if admin
      global $pagenow, $post;

      $socialStreamPage = Utils::getSocialStreamPage();

      if ( empty( $socialStreamPage ) || !isset( $socialStreamPage->ID ) )
        return;

      if ( is_admin() && $pagenow == 'admin.php' && isset( $_GET['page'] ) && $_GET['page'] == 'social_streams' )
      {
        $social_stream_page_url = get_permalink( $socialStreamPage->ID );

        $args = array(
          'id' => 'view_socialstream',
          'title' => 'View Social Stream',
          'href' => $social_stream_page_url,
          'meta' => array(
            'class' => 'ss-admin-bar-view-stream'
          )
        );

        $wp_admin_bar->add_node($args);
      }
      elseif ( is_page() )
      {
        // check the current page template
        $_wp_page_template = get_post_meta( $post->ID, '_wp_page_template', true );

        if ( isset( PageTemplate::$templates[ basename( $_wp_page_template ) ] ) )
        {
          $args = array(
           'id' => 'edit_socialstream',
           'title' => 'Edit Social Stream',
           'href' => admin_url('admin.php?page=social_streams'),
           'meta' => array(
             'class' => 'ss-admin-bar-edit-stream'
            )
          );

          $wp_admin_bar->add_node($args);
        }

      }

    }/* admin_bar_menu__addAdminBarEditButton() */


    /**
     * Add Social Streams settings action link to plugin admin area
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @param (array) $links - Action links for plugin
     * @param (string) $file - Plugin basename
     * @return (array) Edited array of action links
     */

    public function plugin_action_links__addPluginSettingsLink($links, $file)
    {
      if ( $file == 'social-streams/social-streams.php' )
        $links[] = '<a href="admin.php?page=social_streams">' . __('Settings') . '</a>';

      return $links;

    } /* plugin_action_links() */

  }/* class Admin() */
