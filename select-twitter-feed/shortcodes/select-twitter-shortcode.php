<?php
/**
 * Class Carousel
 * @package SelectCore\Twitter\Shortcodes
 */
class SelectTwitterShortcode {
    /**
     * @var string
     */
    private $base;

    public function __construct() {
        $this->base = 'select_twitter_shortcode';

        add_action('vc_before_init', array($this, 'vcMap'));
    }

    /**
     * Returns base for shortcode
     * @return string
     */
    public function getBase() {
        return $this->base;
    }

    /**
     * Maps shortcode to Visual Composer. Hooked on vc_before_init
     *
     *
     */
    public function vcMap() {
        if(function_exists('vc_map')) {
            vc_map( array(
                "name" => "Select Twitter Feed",
                "base" => $this->base,
                "category" => 'by SELECT',
                "icon" => "icon-wpb-twitter-shortcode",
                "allowed_container_element" => 'vc_row',
                "params" => array(
                    array(
                        "type" => "textfield",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "User ID",
                        "param_name" => "user_id"
                    ),
                    array(
                        "type" => "textfield",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "Number of Tweets",
                        "param_name" => "count"
                    ),
                    array(
                        "type" => "dropdown",
                        "class" => "",
                        "heading" => "Show Tweet Time",
                        "param_name" => "show_tweet_time",
                        "value" => array(
                            "No"  => "no",
                            "Yes" => "yes"
                        ),
                        'save_always' => true
                    ),
                    array(
                        "type" => "textfield",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "Tweets Cache Time",
                        "param_name" => "transient_time"
                    ),
                    array(
                        "type" => "textfield",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "Twitter Feed ID",
                        "param_name" => "feed_id"
                    ),
                    array(
                        "type" => "dropdown",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "Show navigation bullets",
                        "param_name" => "show_navigation",
                        "value" => array(
                            "Yes" => "yes",
                            "No" => "no"
                        ),
                        'save_always' => true,
                        "description" => ""
                    ),
                    array(
                        "type" => "dropdown",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "Show navigation arrows",
                        "param_name" => "show_arrows",
                        "value" => array(
                            "Yes" => "yes",
                            "No" => "no"
                        ),
                        'save_always' => true,
                        "description" => ""
                    ),
                    array(
                        "type" => "dropdown",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "Auto rotate slides",
                        "param_name" => "auto_rotate_slides",
                        "value" => array(
                            "3"         => "3",
                            "5"         => "5",
                            "10"        => "10",
                            "15"        => "15",
                            "Disable"   => "0"
                        ),
                        'save_always' => true,
                        "description" => ""
                    ),
                    array(
                        "type" => "dropdown",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "Animation type",
                        "param_name" => "animation_type",
                        "value" => array(
                            "Fade"   => "fade",
                            "Slide"  => "slide"
                        ),
                        'save_always' => true,
                        "description" => ""
                    ),
                    array(
                        "type" => "textfield",
                        "holder" => "div",
                        "class" => "",
                        "heading" => "Animation speed",
                        "param_name" => "animation_speed",
                        "value" => "",
                        "description" => "Speed of slide animation in miliseconds"
                    )
                )
            ) );
        }
    }

    /**
     * Renders shortcodes HTML
     *
     * @param $atts array of shortcode params
     * @param $content string shortcode content
     * @return string
     */
    public function render($atts, $content = null) {

        $args = array(
            "user_id"               => "",
            "count"                 => "",
            "show_tweet_time"       => "no",
            "transient_time"        => "",
            "feed_id"               => "",
            "show_navigation"       => "",
            "show_arrows"           => "",
            "auto_rotate_slides"    => "",
            "animation_type"        => "",
            "animation_speed"       => ""
        );

        extract(shortcode_atts($args, $atts));
        $shortcode_id =
        $html = "";

        $user_id = !empty($user_id) ? $user_id : '';
        $count = !empty($count) ? $count : '';
        $transient_time = !empty($transient_time) ? $transient_time : 0;
        $feed_id = !empty($feed_id) ? $feed_id : rand();

        $twitter_api = QodeStockholmTwitterApi::getInstance();

        if($twitter_api->hasUserConnected()) {
            $response = $twitter_api->fetchTweets($user_id, $count, array(
                'transient_time' => $transient_time,
                'transient_id' => 'qode_twitter_'.$feed_id
            ));

            if($response->status) {
                if(is_array($response->data) && count($response->data)) { ?>
                    <div class="qode_twitter_shortcode twitter_carousel" data-show-navigation="<?php echo esc_attr($show_navigation) ?>" data-show-arrows="<?php echo esc_attr($show_arrows) ?>" data-animation-type="<?php echo esc_attr($animation_type) ?>" data-animation-speed="<?php echo esc_attr($animation_speed) ?>" data-auto-rotate-slides="<?php echo esc_attr($auto_rotate_slides) ?>">
                        <ul class="slides">
                            <?php foreach($response->data as $tweet) { ?>
                                <li>
                                    <div class="grid_section"><div class="section_inner">
                                    <div class="qode_twitter_holder">
                                        <div class="tweet_icon_holder">
                                            <span class="social_twitter"></span>
                                        </div>
                                        <div class="tweet_content_holder">
                                            <div class="qode_tweet_text_holder">
                                                <div class="qode_tweet_text">
                                                    <?php echo wp_kses_post($twitter_api->getHelper()->getTweetText($tweet)); ?>
                                                </div>
                                                <?php if($show_tweet_time == 'yes') { ?>
                                                    <div class="qode_tweet_time">
                                                        <a target="_blank" href="<?php echo esc_url($twitter_api->getHelper()->getTweetURL($tweet)); ?>">
                                                            <?php echo wp_kses_post($twitter_api->getHelper()->getTweetTime($tweet)); ?>
                                                        </a>
                                                    </div>
                                                <?php } ?>
                                            </div>
                                            <div class="qode_tweet_author">
                                                &ndash;<?php echo esc_html($twitter_api->getHelper()->getTweetUserName($tweet)); ?>
                                                (<a target="_blank" href="<?php echo esc_url('https://twitter.com/'.$twitter_api->getHelper()->getTweetUserScreenName($tweet)); ?>">@<?php echo esc_html($twitter_api->getHelper()->getTweetUserScreenName($tweet)); ?></a>)
                                            </div>
                                        </div>
                                    </div>
                                    </div></div>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                <?php }
            } else {
                echo esc_html($response->message);
            }
        } else {
            esc_html_e('It seams that you haven\'t connected with your Twitter account','select-twitter-feed');
        }

        return $html;
    }


}