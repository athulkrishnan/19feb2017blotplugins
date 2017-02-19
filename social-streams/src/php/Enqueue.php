<?php

namespace SocialStreams;

/**
 * Enqueue styles and scripts
 */
class Enqueue
{

  /**
   * bower components - styles
   */
  static protected $styles = array(
    array(
      'handle'  => 'selectize',
      'src'     => '/bower_components/selectize/dist/css/selectize.css',
      'src_min' => '/bower_components/selectize/dist/css/selectize.css',
      'deps'    => array(),
    ),
    array(
      'handle'  => 'alertify',
      'src'     => '/bower_components/alertify-js/build/css/alertify.css',
      'src_min' => '/bower_components/alertify-js/build/css/alertify.min.css',
      'deps'    => array(),
    ),
    array(
      'handle'  => 'socialstreams-font',
      'src'     => '/src/fonts/socialstreams/style.css',
      'src_min' => '/src/fonts/socialstreams/style.css',
      'deps'    => array(),
    ),
  );

  /**
   * bower components - scripts
   */
  static protected $scripts = array(
    array(
      'handle'  => 'moment',
      'src'     => '/bower_components/moment/moment.js',
      'src_min' => '/bower_components/moment/min/moment.min.js',
      'deps'    => array(),
    ),
    array(
      'handle'  => 'alertify',
      'src'     => '/bower_components/alertify-js/build/alertify.js',
      'src_min' => '/bower_components/alertify-js/build/alertify.min.js',
      'deps'    => array(),
    ),
    array(
      'handle'  => 'livestamp',
      'src'     => '/bower_components/livestampjs/livestamp.js',
      'src_min' => '/bower_components/livestampjs/livestamp.min.js',
      'deps'    => array('moment'),
    ),
    array(
      'handle'  => 'jquery-custom-select',
      'src'     => '/bower_components/jquery.customSelect/jquery.customSelect.js',
      'src_min' => '/bower_components/jquery.customSelect/jquery.customSelect.min.js',
      'deps'    => array('jquery'),
    ),
    array(
      'handle'  => 'jquery-sticky',
      'src'     => '/bower_components/sticky/jquery.sticky.js',
      'src_min' => '/bower_components/sticky/jquery.sticky.js',
      'deps'    => array('jquery'),
    ),
    array(
      'handle'  => 'jquery-tappy',
      'src'     => '/bower_components/tappy/tappy.js',
      'src_min' => '/bower_components/tappy/tappy.js',
      'deps'    => array('jquery'),
    ),
    array(
      'handle'  => 'backbone-marionette',
      'src'     => '/bower_components/backbone.marionette/lib/backbone.marionette.js',
      'src_min' => '/bower_components/backbone.marionette/lib/backbone.marionette.min.js',
      'deps'    => array('backbone','underscore'),
    ),
    array(
      'handle'  => 'selectize',
      'src'     => '/bower_components/selectize/dist/js/standalone/selectize.js',
      'src_min' => '/bower_components/selectize/dist/js/standalone/selectize.min.js',
      'deps'    => array('jquery'),
    ),
    array(
      'handle'  => 'spin',
      'src'     => '/bower_components/spin.js/spin.js',
      'src_min' => '/bower_components/spin.js/spin.js',
      'deps'    => array(),
    ),
    array(
      'handle'  => 'jquery-spin',
      'src'     => '/bower_components/spin.js/jquery.spin.js',
      'src_min' => '/bower_components/spin.js/jquery.spin.js',
      'deps'    => array('jquery', 'spin'),
    ),
  );


  public function __construct()
  {

    add_action( 'wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ) );

    add_action( 'wp_enqueue_scripts', array( $this, 'wp_enqueue_styles' ) );

    add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );

    add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_styles' ) );

    add_action( 'admin_print_styles', array( $this, 'admin_print_styles' ) );

    // add_action( 'wp_footer', array( $this, 'wp_footer' ) );
    add_action( 'admin_footer', array( $this, 'wp_footer' ) );

  }/* construct() */



  /**
   * Enqueue Scripts
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  static public function wp_enqueue_scripts( )
  {
    // global $post;

    // $_wp_page_template = get_post_meta( $post->ID, '_wp_page_template', true );
    // if ( !isset( PageTemplate::$templates[ basename( $_wp_page_template ) ] ) )
    //   return;



    // register dependencies
    $dependencies = array(
      'jquery',
      'backbone',
      'underscore',
      'moment',
      'livestamp',
      'jquery-tappy',
      'backbone-marionette',
      'spin',
      'jquery-spin',
    );

    // register bower components
    foreach ( $dependencies as $handle )
    {
      foreach( static::$scripts as $script )
      {
        if ( $handle != $script['handle'] )
          continue;

        if( Utils::isJsDebug() )
          wp_register_script( $script['handle'], Utils::getAppRootUrl() . $script['src'], $script['deps'], null, true );
        else
          wp_register_script( $script['handle'], Utils::getAppRootUrl() . $script['src_min'], $script['deps'], null, true );
      }
    }

    /**
     * Include script
     */
    if( Utils::isJsDebug() )
      $scriptUrl = '/dist/scripts/public.js';
    else
      $scriptUrl = '/dist/scripts/public.min.js';

    wp_enqueue_script( 'socialstreams', Utils::getAppRootUrl() . $scriptUrl, $dependencies, null, true );


  }/* wp_enqueue_scripts() */



  /**
   * Enqueue Scripts
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  static public function wp_enqueue_styles()
  {
    // global $post;

    // $_wp_page_template = get_post_meta( $post->ID, '_wp_page_template', true );
    // if ( !isset( PageTemplate::$templates[ basename( $_wp_page_template ) ] ) )
    //   return;


    // register dependencies
    $dependencies = array(
      'socialstreams-font',
    );

    // register bower components
    foreach ( $dependencies as $handle )
    {
      foreach( static::$styles as $style )
      {
        if ( $handle != $style['handle'] )
          continue;

        if( Utils::isJsDebug() )
          wp_register_style( $style['handle'], Utils::getAppRootUrl() . $style['src'], $style['deps'] );
        else
          wp_register_style( $style['handle'], Utils::getAppRootUrl() . $style['src_min'], $style['deps'] );
      }
    }

    // Theme styles
    if( Utils::isCssDebug() )
      $stylesUrl = '/dist/styles/public.css';
    else
      $stylesUrl = '/dist/styles/public.min.css';

    wp_enqueue_style( 'socialstreams', Utils::getAppRootUrl() . $stylesUrl, $dependencies );

  }/* wp_enqueue_styles() */



  /**
   * Enqueue Scripts
   *
   * @author Dan Costello <dan@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   */

  public function admin_enqueue_scripts()
  {
    global $pagenow;

    if ( !is_admin() || $pagenow != 'admin.php' || !isset( $_GET['page'] ) || $_GET['page'] != 'social_streams' )
      return;

    // register dependencies
    $dependencies = array(
      'jquery',
      'backbone',
      'underscore',
      'moment',
      'alertify',
      'livestamp',
      'jquery-custom-select',
      'jquery-sticky',
      'jquery-tappy',
      'backbone-marionette',
      'selectize',
      'spin',
      'jquery-spin',
    );

    // register bower components
    foreach ( $dependencies as $handle )
    {
      foreach( static::$scripts as $script )
      {
        if ( $handle != $script['handle'] )
          continue;

        if( Utils::isJsDebug() )
          wp_register_script( $script['handle'], Utils::getAppRootUrl() . $script['src'], $script['deps'], null, true );
        else
          wp_register_script( $script['handle'], Utils::getAppRootUrl() . $script['src_min'], $script['deps'], null, true );
      }
    }


    /**
     * Include main app script
     */
    if( Utils::isJsDebug() )
      $scriptUrl = '/dist/scripts/admin.js';
    else
      $scriptUrl = '/dist/scripts/admin.min.js';

    wp_enqueue_script( 'socialstreams-admin', Utils::getAppRootUrl() . $scriptUrl, $dependencies, null, true );


  }/* admin_enqueue_scripts() */


  /**
   * Enqueue styles for the admin area
   *
   * @author Alessandro Biavati <ale@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   * @return null
   */

  public function admin_enqueue_styles()
  {
    global $pagenow;

    if ( !is_admin() || $pagenow != 'admin.php' || !isset( $_GET['page'] ) || $_GET['page'] != 'social_streams' )
      return;

    // register dependencies
    $dependencies = array(
      'alertify',
      'selectize',
      'socialstreams-font',
    );

    // register bower components
    foreach ( $dependencies as $handle )
    {
      foreach( static::$styles as $style )
      {
        if ( $handle != $style['handle'] )
          continue;

        if( Utils::isJsDebug() )
          wp_register_style( $style['handle'], Utils::getAppRootUrl() . $style['src'], $style['deps'] );
        else
          wp_register_style( $style['handle'], Utils::getAppRootUrl() . $style['src_min'], $style['deps'] );
      }
    }

    // Theme styles
    if( Utils::isCssDebug() )
      $stylesUrl = '/dist/styles/admin.css';
    else
      $stylesUrl = '/dist/styles/admin.min.css';

    wp_enqueue_style( 'socialstreams-admin', Utils::getAppRootUrl() . $stylesUrl, $dependencies );

  } /* admin_enqueue_styles() */


  /**
   * Printing styles for the whole admin area. This will style the
   * menu item in the admin menu bar
   *
   * @author Alessandro Biavati <ale@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   * @return null
   */

  public function admin_print_styles()
  {
    ?>
<style type="text/css">
#adminmenu .toplevel_page_social_streams .wp-menu-image img
{
  padding: 7px 0 0 2px;
}
</style>
    <?php

  } /* admin_print_styles() */


  /**
   * Printing scripts for uservoice and mixpanel.
   *
   * @author Alessandro Biavati <ale@briteweb.com>
   * @package briteweb/package
   * @since 1.0.0
   * @return null
   */

  public function wp_footer()
  {
    global $pagenow;

    if ( !is_admin() || $pagenow != 'admin.php' || !isset( $_GET['page'] ) || $_GET['page'] != 'social_streams' )
      return;

    // Get social streams public page URL. Make sure it is set.
    $social_stream_page = Utils::getSocialStreamPage();
    $social_stream_page_url = '';

    if ( !empty( $social_stream_page ) )
      $social_stream_page_url = get_permalink( $social_stream_page->ID );
    ?>

    <script type="text/javascript">
      var social_streams_plugin_url = '<?php echo Utils::getAppRootUrl(); ?>';
      var social_stream_page_url ='<?php echo $social_stream_page_url;?>';
    </script>

    <?php
    // now get variables for uservoice and mixpanel
    $mixpanelID     = Utils::getMixpanelID();
    $mixpanelToken  = Utils::getMixpanelToken();
    $userVoiceToken = Utils::getUserVoiceToken();
    $currentUser    = wp_get_current_user();

    if ( empty( $userVoiceToken ) || empty( $mixpanelID ) || empty( $mixpanelToken ) )
      return;

    ?>

<script type="text/javascript">

<?php if ( !empty( $mixpanelID ) && !empty( $mixpanelToken ) ): ?>

  //Include Mixpanel
  (function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
  for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);

  // initialize mixpanel
  window.mixpanel.init('<?php echo $mixpanelToken; ?>');
  window.mixpanel.identify('<?php echo $mixpanelID; ?>');

<?php endif; ?>


<?php if ( !empty( $userVoiceToken ) ): ?>

// Include the UserVoice JavaScript SDK (only needed once on a page)
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/<?php echo $userVoiceToken ?>.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

// Set colors
UserVoice.push(['set', {
  accent_color: '#FF0048',
  trigger_color: 'white',
  trigger_background_color: 'rgba(46, 49, 51, 0.6)'
}]);

// Identify the user and pass traits
// To enable, replace sample data with actual user traits and uncomment the line
UserVoice.push(['identify', {
  email:      '<?php echo $currentUser->user_email ?>', // User’s email address
  name:       '<?php echo $currentUser->display_name ?>' // User’s real name
  // created_at: 1364406966, // Unix timestamp for the date the user signed up
  // id:         123, // Optional: Unique id of the user (if set, this should not change)
  // type:       'Plugin User', // Optional: segment your users by type
  // account: {
  //  id:           '<?php echo home_url() ?>', // Optional: associate multiple users with a single account
  //  name:         '<?php echo get_bloginfo("name"); ?>' // Account name
  //  created_at:   1364406966, // Unix timestamp for the date the account was created
  //  monthly_rate: 9.99, // Decimal; monthly rate of the account
  //  ltv:          1495.00, // Decimal; lifetime value of the account
  //  // plan:         'Beta' // Plan name for the account
  // }
}]);

// Add default trigger to the bottom-right corner of the window:
UserVoice.push(['addTrigger', { mode: 'contact', trigger_position: 'bottom-right' }]);

// Or, use your own custom trigger:
//UserVoice.push(['addTrigger', '#id', { mode: 'contact' }]);

// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
UserVoice.push(['autoprompt', {}]);

<?php endif ?>

</script>
    <?php

  } /* wp_footer() */


} /* class Enqueue() */
