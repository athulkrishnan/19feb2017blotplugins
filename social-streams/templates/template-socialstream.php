<?php

/*
 * Template Name: Social Streams
 * Description: template autogenerated by Social Streams plugin.
 * Author: Social Streams
 * Author URI: https://socialstreams.com/
 *
 */

get_header(); ?>


<div class="ss-full-width-container">

  <?php while ( have_posts() ) : the_post(); ?>

    <?php the_content(); ?>

  <?php endwhile; ?>

</div>
<?php get_footer(); ?>
