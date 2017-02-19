<?php

  /**
   * Updates hooks
   *
   * @author Dan Costello <@dstello>
   * @package Admin.php
   * @since 1.0
   */

  namespace SocialStreams;

  class Updates
  {
    public function __construct()
    {
      // update DB structure or fields
      add_action( 'bw_post_type_db_update', array( $this, 'bw_post_type_db_update' ), 10, 3 );

    }/* construct() */

    /**
     * update DB structure or fields
     */
    public function bw_post_type_db_update( $postTable = null, $newVersion = null, $oldVersion = null )
    {
      if ( $postTable->get('name') != 'ss_post' )
        return;

      if ( version_compare( $oldVersion , '0.1.50', '<' ) )
        $this->addOrderIDtoPosts( $postTable );

      if ( version_compare( $oldVersion , '0.1.50', '<' ) )
        $this->moveSavedSearch( $postTable );

    } /* bw_post_type_db_update() */


    /**
     * Add the 'order_id' field to posts that were imported before the column
     * was set in the schema
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @param (object) $postTable BW Post table object
     * @return null
     */

    public function addOrderIDtoPosts($postTable)
    {
      $args = array(
        'status' => array('publish','draft','trash'),
        'posts_per_page' => -1,
        'orderby' => 'date',
        'fields' => array('id','date','date_gmt', 'order_id'),
      );

      $posts = $postTable->query( $args );

      if ( empty( $posts ) )
        return;

      // set order_id
      $postsToSave = array();
      foreach ( $posts as $index => $post )
      {
        if ( !isset( $post->order_id ) || empty( $post->order_id ) )
        {
          $post->order_id = strtotime( $post->date_gmt ) * 1000;
          $postsToSave[] = $post;
        }
      }

      // make order_ids unique
      $acc = 0;

      foreach ( $postsToSave as $i => $post )
      {
        if ( isset( $postsToSave[ $i + 1 ] ) && $postsToSave[ $i + 1 ]->order_id == $post->order_id )
        {
          $acc++;
        }
        elseif ( $acc > 0 )
        {
          for ( $equalIndex = 0; $equalIndex <= $acc; $equalIndex++ )
          {
            $postsToSave[ $i - $acc + $equalIndex ]->order_id = $post->order_id - $equalIndex;
          }

          $acc = 0;
        }
      }

      // save new data
      foreach ( $postsToSave as $index => $post )
      {
        $postTable->save(array(
          'id' => $post->id,
          'order_id' => "" . $post->order_id,
        ));
      }

    } /* addOrderIDtoPosts() */

    /**
     * Move Saved search setting to its own option
     *
     * @author Alessandro Biavati <ale@briteweb.com>
     * @package briteweb/package
     * @since 1.0.0
     * @param (object) $postTable - Description
     * @return (object) Description
     */

    public function moveSavedSearch($postTable)
    {
      $search = get_option('socialstreams_search');
      if ( !empty( $search ) )
        return;

      $settings = get_option('socialstreams_app_settings');

      if ( isset( $settings['saved_search_query'] ) && !empty( $settings['saved_search_query'] ) )
      {
        update_option( 'socialstreams_search', $settings['saved_search_query'] );
      }

    } /* moveSavedSearch() */

  } /* class Updates */
