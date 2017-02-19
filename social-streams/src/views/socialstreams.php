<div class="ss-wrapper">

  <div class="ss-posts">
  <?php if ( !is_null( $socialStreams ) && !empty( $socialStreams->posts ) ) : ?>
  <?php foreach ( $socialStreams->posts as $ssPost ) : ?>
    <?php include dirname( __FILE__ ) . '/socialstream-post.php'; ?>
  <?php endforeach; ?>
  <?php endif; ?>
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
