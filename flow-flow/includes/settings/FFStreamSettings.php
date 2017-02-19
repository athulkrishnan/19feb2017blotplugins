<?php namespace flow\settings;
if ( ! defined( 'WPINC' ) ) die;
/**
 * Flow-Flow.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>

 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 */

class FFStreamSettings
{
    private $lifeTimeCache;
    private $stream;

    function __construct($stream) {
        $this->stream = (array)$stream;
    }

    public function getId() {
        return $this->stream['id'];
    }

    /**
     * @return string
     */
    public function getCountOfPosts() {
        if (isset($this->stream["posts"])) {
	        $value = $this->stream["posts"];
	        if (!empty($value)) return $value;
        }
        return '20';
    }

    /**
     * @return string
     */
    public function getCountOfPostsOnPage() {
	    if (isset($this->stream["page-posts"]) && $this->stream["page-posts"] != ''){
		    return $this->stream["page-posts"];
	    }
        return '20';
    }

    /**
     * @return int|bool
     */
    public function getDays(){
	    if (isset($this->stream["days"]) && !empty($this->stream["days"])) {
	        $value = $this->stream["days"];
	        return $value * 24 * 60 * 60;
        }
        return false;
    }

    public function getCacheLifeTime() {
        if (!isset($this->lifeTimeCache)){
	        $this->lifeTimeCache = 0;
	        if (isset($this->stream["cache-lifetime"])) {
		        $lt = $this->stream["cache-lifetime"];
		        $this->lifeTimeCache = intval($lt) * 60;
	        }
        }
        return $this->lifeTimeCache;
    }

    public function getAllFeeds() {
        return json_decode($this->stream['feeds']);
    }

    public function original() {
        return $this->stream;
    }

    public function isPossibleToShow(){
        $mobile = (bool)$this->is_mobile();
        $hideOnMobile = FFSettingsUtils::YepNope2ClassicStyleSafe($this->stream, 'hide-on-mobile', false);
        if ($hideOnMobile && $mobile) return false;
        $hideOnDesktop = FFSettingsUtils::YepNope2ClassicStyleSafe($this->stream, 'hide-on-desktop', false);
        if ($hideOnDesktop && !$mobile) return false;
        $private = FFSettingsUtils::YepNope2ClassicStyleSafe($this->stream, 'private', false);
        if ($private && !is_user_logged_in()) return false;
        return true;
    }

	public function showOnlyMediaPosts(){
		if (!isset($this->stream["show-only-media-posts"])) return false;
		$showOnlyMediaPosts = FFSettingsUtils::YepNope2ClassicStyle($this->stream["show-only-media-posts"], false);
		return $showOnlyMediaPosts;
	}

    public function getImageWidth() {
        $value = isset($this->stream["theme"]) ? $this->stream["theme"] : 'custom';
	    $width = isset($this->stream["width"]) ? $this->stream["width"] : 300;
	    $width = intval($width);
        return ($value == 'classic') ? $width - 30 : $width;
    }

    /**
     * @return string
     */
    public function order() {
	    if (isset($this->stream["order"]) && !empty($this->stream["order"])) {
	        $value = $this->stream["order"];
	        return $value;
        }
        return FF_BY_DATE_ORDER;
    }

	public function moderation() {
		if (isset($this->stream["moderation"])){
			return FFSettingsUtils::YepNope2ClassicStyle($this->stream["moderation"], false);
		}
		return false;
	}

	public function canModerate() {
		foreach ( $this->roles() as $role ) {
			if (function_exists('current_user_can') && current_user_can($role)) return true;
		}
		return false;
	}

	public function roles(){
		if (isset($this->stream['roles'])){
			$roles = array();
			foreach ( $this->stream['roles'] as $role => $checked ) {
				if ($checked == 'checked'){
					$roles[] = $role;
				}
			}
			return $roles;
		}
		return array('administrator');
	}

    private function is_mobile(){
        return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i",
            $_SERVER["HTTP_USER_AGENT"]);
    }
}