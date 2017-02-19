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
