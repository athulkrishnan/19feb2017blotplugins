<?php

  namespace SocialStreams;

  class SocialStreams_Widget extends \WP_Widget
  {

    function __construct() {

      parent::__construct(
        'SocialStreams_Widget', // Base ID
        __('Social Streams', 'text_domain'), // Name
        array('description' => __( 'Post your Social Stream in the side bar!', 'text_domain' ),) // Args
      );
    }


    function widget($args, $instance)
    {

      echo $args['before_widget'];
      if ( ! empty( $instance['text'] ) ) {
        echo $args['before_title'] . apply_filters( 'widget_title', $instance['text'] ). $args['after_title'];
      }
      echo $args['after_widget'];

      ?>
      <div class="ss-widget">
        <div class="ss-wrapper">
          <div class="ss-posts">

      <?php

      $socialstreams = $this->get_socialstreams();

      foreach ( $socialstreams as $ssPost ){
        // \BW\Debug::pre( $sspost );
        // \SocialStreams\Utils::render('socialstream-post-widget', array( 'sspost' => $sspost ) );
        ?>
        <div class="ss-post <?php echo $ssPost->classes() ?>" data-id="<?php echo $ssPost->order_id() ?>">
          <div class="ss-post-inner">

            <span class="ss-post-spacer"></span>

            <?php if ( $dev_meta = $ssPost->dev_meta() ): ?>
              <div class="ss-meta">
                <?php echo $dev_meta ?>
              </div><!-- .ss-meta -->
            <?php endif ?>

            <div class="ss-post-content">
              <span class="ss-post-social-icon"><i class="ss-icon-<?php echo $ssPost->service_name() ?>"></i></span>
              <div class="ss-post-content-inner">
                <?php echo $ssPost->formatted_caption() ?>
              </div>
            </div><!-- .ss-post-content -->

            <?php if ( $ssPost->has_media() ): ?>

            <div class="ss-post-media">
              <span class="ss-post-social-icon"><i class="ss-icon-<?php echo $ssPost->service_name() ?> ss-watermark"></i></span>
              <?php if ( $ssPost->has_video() ): ?>
                <video class="ss-post-video" autoplay muted loop poster="<?php echo $ssPost->image() ?>" data-src="<?php echo $ssPost->video() ?>" /><!-- video.ss-post-image -->
              <?php else: ?>
                <div class="ss-post-image-wrapper" style="background-image:url(<?php echo $ssPost->image() ?>);">
                  <img src="<?php echo $ssPost->image() ?>" class="ss-post-image" />
                </div><!-- .ss-post-image-wrapper -->
              <?php endif ?>
            </div><!-- .ss-post-media -->
            <?php endif ?>

            <div class="ss-post-actions">
              <?php echo $ssPost->actions() ?>
            </div><!-- .ss-post-actions -->

            <div class="ss-post-status">
              <?php echo $ssPost->status_icon() ?>
            </div><!-- .ss-post-status -->

            <div class="ss-post-footer">
              <a href="<?php echo $ssPost->user_link() ?>" class="ss-avatar" target="_blank"> <img src="<?php echo $ssPost->avatar() ?>"/> </a>
              <a href="<?php echo $ssPost->user_link() ?>" class="ss-handle" target="_blank">@<?php echo $ssPost->screen_name() ?></a>
              <a href="<?php echo $ssPost->permalink() ?>" class="ss-post-time" target="_blank">
                <span data-livestamp="<?php echo $ssPost->timestamp() ?>"></span>
              </a>
            </div><!-- .ss-post-footer -->

          </div><!-- .ss-post-inner -->
        </div><!-- .ss-post -->

      <?php  }  // end foreach ?>

      </div><!-- .ss-posts -->

      <div class="ss-infinite-scroll-loader"><div class="ss-inner-text">No more content to load.</div></div>

      <div class="ss-footer">
        <div class="ss-credits">
          <span class="ss-powered-by">Powered by</span>
          <a href="https://socialstreams.com" class="ss-footer-logo" target="_blank">
             <span class="ss-footer-logo-text">Social Streams</span>
          </a>
        </div>
      </div>
      </div><!-- .ss-wrapper -->
      </div><!-- .ss-widget -->

      <?php

    } // create_socialstreams_widget

    public function get_socialstreams()
    {
      /**
       * Call JSONAPI from PHP  - load top 24 posts
       */
      $args = array(
        'status' => 'publish',
        'perPage' => 4,
        'page' => 1,
        'request_id' => 'socialstreams_top'
      );

      \SocialStreams\JsonAPI\Utils::call( 'get', '1/site/options/socialstreams_app_settings');

      $response = \SocialStreams\JsonAPI\Utils::call( 'get', '1/site/socialstreams', $args );

      if ( isset( $response['data'] ) && !empty( $response['data'] ) )
      {
        foreach ( $response['data'] as $postData )
        {
          $posts[] = new SSPost( $postData );
        }
      }

      return $posts;

    }/* get_socialstreams() */



    // widget form creation
    function form($instance) {

      // Check values
      if( $instance) {
           $text = esc_attr($instance['text']);
      } else {
           $text = '';
           $textarea = '';
      }
      ?>

      <p>
      <label for="<?php echo $this->get_field_id('text'); ?>"><?php _e('Text:', 'wp_widget_plugin'); ?></label>
      <input class="widefat" id="<?php echo $this->get_field_id('text'); ?>" name="<?php echo $this->get_field_name('text'); ?>" type="text" value="<?php echo $text; ?>" />
      </p>
      <?php
    }

    // update widget
    function update($new_instance, $old_instance) {
          $instance = $old_instance;
          // Fields
          $instance['text'] = strip_tags($new_instance['text']);
         return $instance;
    }
  }/* class Widget() */
