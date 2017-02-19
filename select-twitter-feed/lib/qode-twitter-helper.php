<?php

if(!defined('ABSPATH')) exit;

class QodeStockholmTwitterHelper {
    public function getTweetText($tweet) {
        $protocol = is_ssl() ? 'https' : 'http';
        if(!empty($tweet['text'])) {

            $text = $tweet['text'];

            //add links around https or http parts of text
            $text = preg_replace('/(https?)\:\/\/([a-z0-9\/\.\&\#\?\-\+\~\_\,]+)/i', '<a target="_blank" href="'.('$1://$2').'">$1://$2</a>', $text);

            //add links around @mentions
            $text = preg_replace('/\@([a-aA-Z0-9\.\_\-]+)/i', '<a target="_blank" href="'.esc_url($protocol.'://twitter.com/$1').'">@$1</a>', $text);

            //add links around hashtags
            $text = preg_replace('/\#([a-aA-Z0-9\.\_\-]+)/i', '<a target="_blank" href="'.esc_url($protocol.'://twitter.com/search?q\=$1').'">#$1</a>', $text);

            return $text;
        }

        return '';
    }

    public function getTweetTime($tweet) {
        if(!empty($tweet['created_at'])) {
            return human_time_diff(strtotime($tweet['created_at']), current_time('timestamp') ).' '.__('ago', 'select-twitter-feed');
        }

        return '';
    }

    public function getTweetURL($tweet) {
        if(!empty($tweet['id_str']) && $tweet['user']['screen_name']) {
            return 'https://twitter.com/'.$tweet['user']['screen_name'].'/statuses/'.$tweet['id_str'];
        }

        return '#';
    }

    public function getTweetUserScreenName($tweet) {
        if(!empty($tweet['id_str']) && $tweet['user']['screen_name']) {
            return $tweet['user']['screen_name'];
        }

        return '#';
    }

    public function getTweetUserName($tweet) {
        if(!empty($tweet['id_str']) && $tweet['user']['name']) {
            return $tweet['user']['name'];
        }

        return '#';
    }
}