<?php namespace flow\social;
if ( ! defined( 'WPINC' ) ) die;

use flow\cache\FFImageSizeCacheManager;

/**
 * Flow-Flow.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>

 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 */
abstract class FFBaseFeed implements FFFeed{
    private $id;
    /** @var FFImageSizeCacheManager */
    protected $cache;
    private $count;
    private $imageWidth;
    private $useProxyServer;
	private $type;
	private $filterByWords;
	/** @var FFGeneralSettings */
	protected $options;
	/** @var FFStreamSettings */
	protected $stream;
	/** @var stdClass */
	protected $feed;
    protected $errors;
	protected $context;

	function __construct( $type ) {
		$this->type = $type;
	}

	public function getType(){
		return $this->type;
	}

	public function id(){
        return $this->id;
    }

    public function getCount(){
        return $this->count;
    }

    /**
     * @return int
     */
    public function getImageWidth(){
        return $this->imageWidth;
    }

    /**
     * @return int
     */
    public function getAllowableWidth(){
        return 200;
    }

	/**
	 * @param $context
	 * @param FFGeneralSettings $options
	 * @param FFStreamSettings $stream
	 * @param $feed
	 *
	 * @return void
	 */
    public final function init($context, $options, $stream, $feed){
	    $this->context = $context;
	    $this->options = $options;
	    $this->stream = $stream;
	    $this->feed = $feed;

        $this->id = $feed->id;
        $this->errors = array();
        $this->useProxyServer = $options->useProxyServer();
        $this->count = intval($stream->getCountOfPosts());
        $this->imageWidth = $stream->getImageWidth();
        $this->cache = FFImageSizeCacheManager::get();
	    if (isset($feed->{'filter-by-words'})) {
		    $this->filterByWords =  explode(',', $feed->{'filter-by-words'});
		    if ($this->filterByWords === false) $this->filterByWords = array();
	    } else {
		    $this->filterByWords = array();
	    }
    }

	public final function posts() {
		$this->deferredInit($this->options, $this->stream, $this->feed);
		$this->beforeProcess();
		$result = array();
		if (sizeof($this->errors) == 0){
			do {
				$result += $this->onePagePosts();
			} while ($this->nextPage($result));
			return $this->afterProcess($result);
		}
		return $result;
	}

	protected abstract function deferredInit($options, $stream, $feed);
	protected abstract function onePagePosts( );

    /**
     * @return array
     */
    public function errors() {
        return $this->errors;
    }

	/**
	 * @param $url
	 * @param $width
	 * @param $height
	 * @param bool $scale
	 *
	 * @return array
	 */
    protected function createImage($url, $width = null, $height = null, $scale = true){
        if ($width == null || $height == null){
            $size = $this->cache->size($url);
            $width = $size['width'];
            $height = $size['height'];
        }
	    if ($scale){
		    $tWidth = $this->getImageWidth();
		    return array('url' => $url, 'width' => $tWidth, 'height' => FFFeedUtils::getScaleHeight($tWidth, $width, $height));
	    }
	    return array('url' => $url, 'width' => $width, 'height' => $height);
    }

	protected function createMedia($url, $width = null, $height = null, $type = 'image', $scale = false){
		if ($type == 'html'){
			return array('type' => $type, 'html' => $url);
		}
		if ($width == null || $height == null){
			$size = $this->cache->size($url);
			$width = $size['width'];
			$height = $size['height'];
		}
		if ($type == 'image' && $scale == true && $width > 600){
			$height = FFFeedUtils::getScaleHeight(600, $width, $height);
			$width = 600;
		}
		return array('type' => $type, 'url' => $url, 'width' => $width, 'height' => $height);
	}

    /**
     * @param string $link
     * @param string $name
     * @param mixed $image
     * @param mixed $width
     * @param mixed $height
     * @return array
     */
    protected function createAttachment($link, $name, $image = null, $width = null, $height = null){
        if ($image != null){
            if (is_string($image)) $image = $this->createImage($image, $width, $height);
            if ($image['width'] > $this->getAllowableWidth())
                return array( 'type' => 'article', 'url' => $link, 'displayName' => $name, 'image' => $image);
        }
        return array( 'type' => 'article', 'url' => $link, 'displayName' => $name);
    }

	/**
	 * @param stdClass $post
	 * @return bool
	 */
	protected function isSuitablePost($post){
		if ($post == null) return false;
		foreach ( $this->filterByWords as $word ) {
			$firstLetter = substr($word, 0, 1);
			if ($firstLetter !== false){
				switch ($firstLetter) {
					case '@':
						$word = substr($word, 1);
						if ((strpos($post->screenname, $word) !== false) || (strpos($post->nickname, $word) !== false)) {
							return false;
						}
						break;
					case '#':
						$word = substr($word, 1);
						if (strpos($post->permalink, $word) !== false) {
							return false;
						}
						break;
					default:
						if (!empty($word) && (strpos($post->text, $word) !== false) || (isset($post->header) && strpos($post->header, $word) !== false)) {
							return false;
						}
				}
			}
		}
		return true;
	}

	/**
	 * @return void
	 */
	protected function beforeProcess(){
	}

    /**
     * @param $result array
     * @return array
     */
    protected function afterProcess($result){
        $this->cache->save();
        return $result;
    }

    public function useCache(){
        return true;
    }

	/**
	 * @param array $result
	 * @return bool
	 */
	protected function nextPage($result){
		return false;
	}

	protected function getFeedData($url, $timeout = 200, $header = false, $log = true){
		/** @var LADBManager $db */
		$db = $this->context['db_manager'];
		$use = $db->getGeneralSettings()->useCurlFollowLocation();
		$useIpv4 = $db->getGeneralSettings()->useIPv4();
		return FFFeedUtils::getFeedData($url, $timeout, $header, $log, $use, $useIpv4);
	}
} 