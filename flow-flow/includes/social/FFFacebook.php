<?php namespace flow\social;
use flow\cache\LAFacebookCacheManager;
use flow\settings\FFSettingsUtils;

if ( ! defined( 'WPINC' ) ) die;
/**
 * Flow-Flow.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>

 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 */
class FFFacebook extends FFHttpRequestFeed{
    /** @var  string | bool */
    private $accessToken;
    /** @var bool */
    private $hideStatus = true;
	/** @var  bool */
	private $saveImages = false;
	private $image;
	private $media;
	private $images;
	private $youtube_api_key;

	public function __construct() {
		parent::__construct( 'facebook' );
	}

	/**
     * @param FFGeneralSettings $options
     * @param FFStreamSettings $stream
     * @param $feed
     */
    public function deferredInit($options, $stream, $feed) {
	    global $flow_flow_context;
	    /** @var LAFacebookCacheManager $facebookCache */
	    $facebookCache = $flow_flow_context['facebook_сache'];
	    $this->accessToken = $facebookCache->getAccessToken();
	    if ($this->accessToken === false){
		    $this->errors[] = $facebookCache->getError();
	    }

	    $this->images = array();
        if (isset($feed->{'timeline-type'})) {
	        $locale = defined('FF_LOCALE') ? 'locale=' . FF_LOCALE : 'locale=en_US';
	        $fields    = 'fields=';
	        $fields    = $fields . 'likes.summary(true),comments.summary(true),shares,';
	        $fields    = $fields . 'id,created_time,from,link,message,name,object_id,picture,full_picture,attachments{media{image}},source,status_type,story,type&';
            switch ($feed->{'timeline-type'}) {
                case 'user_timeline':
	                $this->url = "https://graph.facebook.com/v2.5/me/posts?{$fields}access_token={$this->accessToken}&limit={$this->getCount()}&{$locale}";
	                break;
	            case 'group':
		            $groupId = (string)$feed->content;
		            $this->url        = "https://graph.facebook.com/v2.5/{$groupId}/feed?{$fields}access_token={$this->accessToken}&limit={$this->getCount()}&{$locale}";
		            $this->hideStatus = false;
		            break;
                case 'page_timeline':
                    $userId = (string)$feed->content;
	                $this->url        = "https://graph.facebook.com/v2.5/{$userId}/posts?{$fields}access_token={$this->accessToken}&limit={$this->getCount()}&{$locale}";
	                $this->hideStatus = false;
                    break;
	            case 'album':
					$albumId = (string)$feed->content;
		            $this->url = "https://graph.facebook.com/v2.5/{$albumId}/photos?{$fields}access_token={$this->accessToken}&limit={$this->getCount()}&{$locale}";
		            break;
                default:
	                $this->url = "https://graph.facebook.com/v2.5/me/home?{$fields}access_token={$this->accessToken}&limit={$this->getCount()}&{$locale}";
            }
        }
	    $original = $options->original();
	    $this->youtube_api_key = @$original['google_api_key'];

	    $this->saveImages = false;//FFSettingsUtils::YepNope2ClassicStyleSafe($original, 'general-settings-save-images', false);
    }

    protected function getUrl() {
        return $this->url;
    }

    protected function items( $request ) {
        if (false !== $this->accessToken){
            $pxml = json_decode($request);
            if (isset($pxml->data)) {
                return $pxml->data;
            }
        }
        return array();
    }

	protected function isSuitableOriginalPost( $post ) {
		if (isset($post->type)){
			if ($post->type == 'status' && ($this->hideStatus || !isset($post->message))) return;
			if ($post->type == 'photo' && isset($post->status_type) && $post->status_type == 'tagged_in_photo') return false;
		}
		if (!isset($post->created_time)) return false;
		return true;
	}


	protected function prepare( $item ) {
		$this->image = null;
		$this->media = null;
		return parent::prepare( $item );
	}

	protected function getHeader($item){
		if (!isset($item->type) || (isset($item->status_type) && $item->status_type == 'added_photos')){
			return '';
		}
		if (isset($item->name)){
			return $item->name;
		}
        return '';
    }

    protected function showImage($item){
	    if (!isset($item->type)){
		    $this->image = $this->createImage($item->source);
		    $this->media = $this->createMedia($item->source);
		    return true;
	    }

	    if ((isset($item->object_id) && (($item->type == 'photo') || ($item->type == 'event')))){
	        if ($this->saveImages){
		        $flag = false;
		        $original_url = "https://graph.facebook.com/v2.5/{$item->object_id}/picture?width={$this->getImageWidth()}&type=normal";
		        list($path, $remoteUrl, $localUrl) = $this->getInfo4Save($original_url);
		        if (!file_exists($path)){
			        if (copy($remoteUrl, $path)){
				        $this->image = $this->createImage($localUrl);
				        $flag = true;
			        }
		        }
		        else {
			        $this->image = $this->createImage($localUrl);
			        $flag = true;
		        }

		        if ($flag){
			        $original_url = "https://graph.facebook.com/v2.5/{$item->object_id}/picture?width=600&type=normal";
			        list($path, $remoteUrl, $localUrl) = $this->getInfo4Save($original_url);
			        if (!file_exists($path)){
				        if (copy($remoteUrl, $path)){
					        $this->media = $this->createMedia($localUrl);
					        return true;
				        }
			        }
			        else {
				        $this->media = $this->createMedia($localUrl);
				        return true;
			        }
		        }
	        }

	        $url = "https://graph.facebook.com/v2.5/{$item->object_id}/picture?width={$this->getImageWidth()}&type=normal";
	        $original_url = $this->cache->getOriginalUrl($url);
	        if ($original_url == ''){
		        $original_url = $this->getLocation($url);
	        }
	        $size = $this->cache->size($url, $original_url);
	        $width = $size['width'];
	        $height = $size['height'];
	        $this->image = $this->createImage($original_url, $width, $height);

	        $url = "https://graph.facebook.com/v2.5/{$item->object_id}/picture?width=600&type=normal";
	        $original_url = $this->cache->getOriginalUrl($url);
	        if ($original_url == ''){
		        $original_url = $this->getLocation($url);
	        }
	        $size = $this->cache->size($url, $original_url);
	        $width = $size['width'];
	        $height = $size['height'];
	        $this->media = $this->createMedia($original_url, $width, $height);
	        return true;
        }
	    if (($item->type == 'video')
	        && (!isset($item->status_type) || $item->status_type == 'added_video' || $item->status_type == 'shared_story')){
		    if (!isset($item->object_id) && isset($item->link) && strpos($item->link, 'facebook.com') > 0 && strpos($item->link, '/videos/') > 0){
			    $path = parse_url($item->link, PHP_URL_PATH);
			    $tokens = explode('/', $path);
			    if (empty($tokens[sizeof($tokens)-1])) unset($tokens[sizeof($tokens)-1]);
			    $item->object_id = $tokens[sizeof($tokens)-1];
		    }
		    if (isset($item->object_id) && trim($item->object_id) != ''){
			    $data = $this->getFeedData("https://graph.facebook.com/v2.5/{$item->object_id}?fields=embed_html,source&access_token={$this->accessToken}");
			    $data = json_decode($data['response']);
			    preg_match("/\<iframe.+width\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/", $data->embed_html, $matches);
			    $width = $matches[1];
			    preg_match("/\<iframe.+height\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/", $data->embed_html, $matches);
			    $height = $matches[1];
			    if ($width > 600) {
				    $height = FFFeedUtils::getScaleHeight(600, $width, $height);
				    $width = 600;
			    }
			    $url = "https://graph.facebook.com/v2.5/{$item->object_id}/picture?width={$this->getImageWidth()}&type=normal";
			    if ($this->saveImages){
				    list($path, $remoteUrl, $localUrl) = $this->getInfo4Save($url);
				    if (!file_exists($path)) {
					    if ( copy( $remoteUrl, $path ) ) {
						    $this->image = $this->createImage($localUrl, $width, $height);
					    }
					    else {
						    $this->image = $this->createImage($this->getLocation($url), $width, $height);
					    }
				    }
				    else {
					    $this->image = $this->createImage($localUrl, $width, $height);
				    }
			    }
			    else {
				    $this->image = $this->createImage($this->getLocation($url), $width, $height);
			    }
			    $this->media = $this->createMedia('http://www.facebook.com/video/embed?video_id=' . $item->object_id, $width, $height, 'video');
			    return true;
		    }
		    else if (isset($item->source)){
		        if (strpos($item->source, 'giphy.com') > 0) {
			        $arr = parse_url( urldecode( $item->source ) );
			        parse_str( $arr['query'], $output );
			        $this->image = $this->createImage( $output['gif_url'], $output['giphyWidth'], $output['giphy_height'] );
			        $this->media = $this->createMedia( $output['gif_url'], $output['giphyWidth'], $output['giphy_height'] );
			        return $this->image != null;
		        }
			    if (!empty($this->youtube_api_key) && (strpos($item->source, 'youtube.com') > 0)) {
				    if (strpos($item->source, 'list=') > 0){
					    $query_str = parse_url($item->source, PHP_URL_QUERY);
					    parse_str($query_str, $query_params);
					    $listId = $query_params['list'];
					    $url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&id={$listId}&key={$this->youtube_api_key}";
				    }
				    else if ((strpos($item->link, '?v=') > 0) || (strpos($item->link, '&v=') > 0)){
					    $query_str = parse_url($item->link, PHP_URL_QUERY);
					    parse_str($query_str, $query_params);
					    $listId = $query_params['v'];
					    $url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id={$listId}&key={$this->youtube_api_key}";
				    }
				    if (isset($url)){
					    $data = @$this->getFeedData($url);
					    if (is_array($data) && isset($data['response'])){
						    $response = $data['response'];
						    $pxml = json_decode($response);
						    if (isset($pxml->items)) {
							    $youtubeItem = $pxml->items[0];
							    $thumbnail = $youtubeItem->snippet->thumbnails->high;
							    if (isset($thumbnail->width)){
								    $this->image = $this->createImage($thumbnail->url, $thumbnail->width, $thumbnail->height);
							    } else {
								    $this->image = $this->createImage($thumbnail->url);
							    }
							    $this->media = $this->createMedia($item->source, 600, FFFeedUtils::getScaleHeight(600, $this->image['width'], $this->image['height']), 'video');
							    return true;
						    }
					    }
				    }
			    }
			    if (isset($item->picture)){
				    $this->image = $this->createImage($item->picture);
				    $type = (strpos($item->source, '.mp4') > 0) ? 'video/mp4' : 'video';
				    $this->media = $this->createMedia($item->source, 600, FFFeedUtils::getScaleHeight(600, $this->image['width'], $this->image['height']), $type);
				    return true;
			    }
			    //TODO snappytv.com
			    //TODO twitch.tv swf
		    }
	    }
	    if (($item->type == 'link') && isset($item->picture)){
		    if (isset($item->full_picture)){
			    $this->image = $this->createImage($item->full_picture);
			    $this->media = $this->createMedia($item->full_picture, null, null, 'image', true);
		    }
		    else if (isset($item->attachments->data) && sizeof($item->attachments->data) > 0){
			    $media = $item->attachments->data[0];
			    if (isset($media->media) && isset($media->media->image)){
				    $media = $media->media->image;
				    $this->image = $this->createImage($media->src, $media->width, $media->height);
				    $this->media = $this->createMedia($media->src, $media->width, $media->height, 'image', true);
				    return true;
			    }
		    }

		    $image = $item->picture;
		    $parts = parse_url($image);
		    if (isset($parts['query'])){
			    parse_str($parts['query'], $attr);
			    if (isset($attr['url'])) {
				    $image = $attr['url'];
				    $original = $this->createImage($image, null, null, false);
				    if (150 > $original['width'] || 150 > $original['height']) return false;
				    $this->image = $this->createImage($image, $original['width'], $original['height']);
				    if (!empty($this->image['height'])) {
					    $this->media = $this->createMedia($image, null, null, 'image', true);
					    return true;
				    }
			    }
		    }
		    $this->image = $this->createImage($item->picture);
		    $this->media = $this->createMedia($item->picture, null, null, 'image', true);
		    return true;
	    }
	    return false;
    }

    protected function getImage( $item ) {
        return $this->image;
    }

	protected function getMedia( $item ) {
		return $this->media;
	}

	protected function getScreenName($item){
        return $item->from->name;
    }

	//TODO going to use a message_tags attribute
    protected function getContent($item){
	    if (!isset($item->type)){
		    return (string)$item->name;
	    }
	    if (isset($item->message)) return self::wrapHashTags(FFFeedUtils::wrapLinks($item->message), $item->id);
	    if (isset($item->story)) return (string)$item->story;
    }

    protected function getProfileImage( $item ) {
	    $url = "https://graph.facebook.com/v2.5/{$item->from->id}/picture?width=80&height=80";
	    if (!array_key_exists($url, $this->images)){
		    if ($this->saveImages){
			    list($path, $remoteUrl, $localUrl) = $this->getInfo4Save($url);
			    if (!file_exists($path)) {
				    if ( copy( $remoteUrl, $path ) ) {
					    $this->images[$url] = $localUrl;
				    }
				    else {
					    $this->images[$url] = $this->getLocation($url);
				    }
			    }
			    else {
				    $this->images[$url] = $localUrl;
			    }
		    }
		    else $this->images[$url] = $this->getLocation($url);
	    }
        return $this->images[$url];
    }

    protected function getId( $item ) {
        return $item->id;
    }

    protected function getSystemDate( $item ) {
        return strtotime($item->created_time);
    }

    protected function getUserlink( $item ) {
        return 'https://www.facebook.com/'.$item->from->id;
    }

    protected function getPermalink( $item ) {
	    if (!isset($item->type)){
		    return $item->link;
	    }
        $parts = explode('_', $item->id);
        return 'https://www.facebook.com/'.$parts[0].'/posts/'.$parts[1];
    }

	protected function getAdditionalInfo( $item ) {
		$additional = parent::getAdditionalInfo( $item );
		$additional['likes']      = (string)@$item->likes->summary->total_count;
		$additional['comments']   = (string)@$item->comments->summary->total_count;
		$additional['shares']     = (string)@$item->shares->count;
		return $additional;
	}

	protected function customize( $post, $item ) {
		if (isset($item->type) && $item->type == 'link' && isset($item->link)){
			$post->source = $item->link;
		}
        return parent::customize( $post, $item );
    }

	private function getInfo4Save($url){
		$fileName = hash('md5', $url);
		$path = WP_CONTENT_DIR . '/flow-flow-media-cache/' . $fileName;
		if(!file_exists(WP_CONTENT_DIR . '/flow-flow-media-cache')){
			mkdir(WP_CONTENT_DIR . '/flow-flow-media-cache', 0777);
		}
		$remoteUrl = $url . "&access_token={$this->accessToken}";
		$localUrl = content_url('flow-flow-media-cache/' . $fileName);
		return array($path, $remoteUrl, $localUrl);
	}

	/**
	 * @param string $text
	 * @param string $id
	 *
	 * @return mixed
	 */
	private function wrapHashTags($text, $id){
		return preg_replace('/#([\\d\\w]+)/', '<a href="https://www.facebook.com/hashtag/$1?source=feed_text&story_id='.$id.'">$0</a>', $text);
	}

	private function getPCount( $json ){
		$count = sizeof($json->data);
		if (isset($json->paging->next)){
			$data = $this->getFeedData($json->paging->next);
			$count += $this->getPCount(json_decode($data['response']));
		}
		return $count;
	}

	private function getLocation($url) {
		if (defined('FF_DONT_USE_GET_HEADERS') && FF_DONT_USE_GET_HEADERS){
			$location = @$this->getCurlLocation($url . "&access_token={$this->accessToken}");
			if (!empty($location) && $location != 0) {
				return $location;
			}
		}
		else {
			$headers = $this->getHeadersSafe($url . "&access_token={$this->accessToken}" , 1);
			if (isset($headers["Location"])) {
				return $headers["Location"];
			} else {
				$location = @$this->getCurlLocation($url . "&access_token={$this->accessToken}");
				if (!empty($location) && $location != 0) {
					return $location;
				}
			}
		}

		$location = str_replace('/v2.3/', '/', $url);
		$location = str_replace('/v2.4/', '/', $location);
		$location = str_replace('/v2.5/', '/', $location);
		return $location;
	}

	private function getCurlLocation($url) {
		$curl = curl_init();
		curl_setopt_array( $curl, array(
			CURLOPT_USERAGENT => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
			CURLOPT_HEADER => true,
			CURLOPT_NOBODY => true,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_URL => $url ) );
		$headers = explode( "\n", curl_exec( $curl ) );
		curl_close( $curl );

		$location = '';
		foreach ( $headers as $header ) {
			if (strpos($header, "ocation:")) {
				$location = substr($header, 10);
				break;
			}
		}
		return $location;
	}

	private function getHeadersSafe($url, $format){
		if ( ini_get( 'allow_url_fopen' ) ) {
			return get_headers( $url, $format );
		} else {
			$ch = curl_init( $url );
			curl_setopt( $ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36');
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt( $ch, CURLOPT_HEADER, true );
			curl_setopt( $ch, CURLOPT_NOBODY, true );
			$content = curl_exec( $ch );
			curl_close( $ch );
			return array($content);
		}
	}
}