<?php

  namespace SocialStreams;

  /**
   * View for Social Streams posts
   */
  class SSPost
  {
    static private $globalIndex = 0;

    public function __construct($data)
    {
      foreach ( $data as $key => $value )
      {
        $this->{$key} = $value;
      }

    } /* __construct() */


    /**
     * Catch-all get function
     */
    function __call($method_name, $args)
    {
      if ( isset( $this->{ $method_name } ))
        return $this->{ $method_name };

    } /* __call() */



    public function postIndex()
    {
      if ( !isset( $this->postIndexCache ) )
      {
        $postIndex = static::$globalIndex;

        static::$globalIndex++;

        $this->postIndexCache = $postIndex;
      }

      return $this->postIndexCache;
    }


    public function classes()
    {
      $classes = array();

      if ( defined('SS_DEV') && SS_DEV )
        $classes[] = 'ss-dev';

      if ( $this->has_media() )
        $classes[] = 'ss-has-media';

      if ( $this->has_video() )
        $classes[] = 'ss-has-video';

      // service class
      $classes[] = 'ss-' . $this->service_name();

      // status class
      $classes[] = 'ss-status-' . $this->status();

      return implode(' ', $classes);

    } /* class() */


    public function screen_name()
    {
      $output = '';

      switch ( $this->service_name() )
      {
        case 'twitter':
          $output = $this->user['screen_name'];
          break;

        case 'instagram':
          $output = $this->user['username'];
          break;

        default:
          break;
      }

      return $output;

    } /* screen_name() */


    public function avatar()
    {
      $output = '';

      switch ( $this->service_name() )
      {
        case 'twitter':
          $output = $this->user['profile_image_url_https'];
          break;

        case 'instagram':
          $output = $this->user['profile_picture'];
          break;

        default:
          break;
      }

      return $output;

    } /* avatar() */


    public function permalink()
    {
      $output = '';

      switch ( $this->service_name() )
      {
        case 'twitter':
          $output = "https://www.twitter.com/" . $this->screen_name() . "/status/" . $this->vendor_id();
          break;

        case 'instagram':
          $output = $this->link;
          break;

        default:
          break;
      }

      return $output;

    } /* permalink() */


    public function user_link()
    {
      $output = '';

      switch ( $this->service_name() )
      {
        case 'twitter':
          $output = "https://www.twitter.com/" . $this->screen_name();
          break;

        case 'instagram':
          $output = "https://www.instagram.com/" . $this->screen_name();
          break;

        default:
          break;
      }

      return $output;

    } /* user_link() */


    public function formatted_caption()
    {
      $output = '';

      switch ( $this->service_name() )
      {
        case 'twitter':
          $output = $this->text;
          break;

        case 'instagram':
          if ( isset( $this->caption ) )
            $output = $this->caption['text'];
          break;

        default:
          break;
      }

      $output = $this->parseUrls( $output );
      $output = $this->parseMentions( $output );
      $output = $this->parseHashtags( $output );
      $output = $this->addLinebreaks( $output );

      return $output;

    } /* formatted_caption() */


    private function parseUrls($text)
    {
      $text = preg_replace(
        '@(https?://([-\w\.]+)+(/([\w/_\.]*(\?\S+)?(#\S+)?)?)?)@',
        '<a href="$1" target="_blank">$1</a>',
        $text);

      return $text;

    } /* parseUrls() */


    private function parseMentions($text)
    {
      $text = preg_replace(
        '/@(\w+)/',
        '<a href="http://'.$this->service_name().'.com/$1" target="_blank">@$1</a>',
        $text);

      return $text;

    } /* parseMentions() */


    private function parseHashtags($text)
    {
      $replace = '';

      switch ( $this->service_name() )
      {
        case 'twitter':
          $replace = ' <a href="http://twitter.com/hashtag/$1" target="_blank">#$1</a>';
          break;

        case 'instagram':
          // $replace = ' <a href="http://searchinstagram.com/$1" target="_blank">#$1</a>';
          $replace = ' #$1';
          break;

        default:
          break;
      }

      if ( !empty( $replace ) )
        $text = preg_replace( '/\s?#(\w+)/', $replace, $text );

      return $text;

    } /* parseMentions() */


    public function addLinebreaks($text)
    {
      $replace = '';

      switch ( $this->service_name() )
      {
        case 'twitter':
          $replace = '<br />';
          break;

        case 'instagram':
          $replace = ' ';
          break;

        default:
          break;
      }

      if ( !empty( $replace ) )
        $text = preg_replace( '/\r?\n/', $replace, $text );

      return $text;

    } /* addLinebreaks() */


    public function image()
    {
      $output = '';

      switch ( $this->service_name() )
      {
        case 'twitter':
          if ( isset( $this->entities ) && isset( $this->entities['media'] ) && !empty( $this->entities['media'] ) )
            $output = $this->entities['media'][0]['media_url_https'];
          break;

        case 'instagram':
          $output = $this->images['standard_resolution']['url'];
          break;

        default:
          break;
      }

      return $output;

    } /* image() */


    public function video()
    {
      $output = '';

      switch ( $this->service_name() )
      {
        case 'instagram':
          if ( isset( $this->videos ) && isset( $this->videos['standard_resolution'] ) && isset( $this->videos['standard_resolution']['url'] ) )
            $output = $this->videos['standard_resolution']['url'];
          break;

        default:
          break;
      }

      return $output;

    } /* video() */


    public function has_image()
    {
      $image = $this->image();

      if ( empty( $image ) )
        return false;
      else
        return true;

    } /* has_image() */


    public function has_video()
    {
      $video = $this->video();

      if ( empty( $video ) )
        return false;
      else
        return true;

    } /* has_video() */


    public function has_media()
    {
      $has_image = $this->has_image();
      $has_video = $this->has_video();

      if ( $has_image || $has_video )
        return true;
      else
        return false;

    } /* has_media() */


    public function status_icon()
    {
      $output = '';

      if ( current_user_can( 'manage_options' ) )
      {
        switch ( $this->status() )
        {
          case 'publish':
            $output .= '<i class="ss-icon-check"></i>';
            break;

          case 'draft':
            $output .= '<i class="ss-icon-draft"></i>';
            break;

          case 'trash':
            $output .= '<i class="ss-icon-trash-o"></i>';
            break;

          default:
            break;
        }
      }

      return $output;
    }


    public function actions()
    {
      $output = '';

      # check if the current user can moderate
      if ( current_user_can( 'manage_options' ) )
      {
        $output .= '<a class="ss-post-action ss-publish-btn" href="javascript:void(0);"><i class="ss-icon-check"></i><span class="ss-inner">Publish</span></a>';
        $output .= '<a class="ss-post-action ss-trash-btn" href="javascript:void(0);"><i class="ss-icon-trash-o"></i><span class="ss-inner">Trash</span></a>';
      }
      else
      {
        switch ( $this->service_name() )
        {
          case 'twitter':
            $output .= '<a class="ss-post-action" href="https://twitter.com/intent/tweet?in_reply_to=' . $this->vendor_id() . '&via=SocialStreamsWP&related=SocialStreamsWP" target="_blank"><i class="ss-icon-reply"></i><span class="ss-inner">Reply</span></a>';
            $output .= '<a class="ss-post-action" href="https://twitter.com/intent/retweet?tweet_id=' . $this->vendor_id() . '&related=SocialStreamsWP" target="_blank"><i class="ss-icon-retweet"></i><span class="ss-inner">Retweet</span></a>';
            break;

          default:
            break;
        }
      }

      return $output;

    } /* actions() */

    public function dev_meta()
    {
      if ( !defined('SS_DEV') || !SS_DEV )
        return;

      $output = '';
      $output .= '<p class="ss-post-id">id: ' . $this->id() . '</p>';
      $output .= '<p class="ss-post-date">date: ' . date( 'Y-m-d H:i:s' , $this->timestamp() ) . '</p>';
      $output .= '<p class="ss-post-order_id">order_id: ' . $this->order_id() . '</p>';

      return $output;

    } /* dev_meta() */

  } /* class SSPost() */
