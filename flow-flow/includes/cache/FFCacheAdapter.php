<?php namespace flow\cache;
use flow\settings\FFStreamSettings;

if ( ! defined( 'WPINC' ) ) die;
/**
 * FlowFlow.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>
 *
 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 */
class FFCacheAdapter implements FFCache{
	private $force;
	private $context;
	/**  @var FFCache */
	private $cache;

	function __construct($context, $force = false){
		$this->force = $force;
		$this->context = $context;
	}

	public function setStream( $stream ) {
		if ($stream->moderation()){
			$this->cache = $this->admin($stream) ?
				new FFAdminModerationCacheManager($this->context, $this->force) : new FFModerationCacheManager($this->context, $this->force);
		}
		else
			$this->cache = new FFCacheManager($this->context, $this->force);
		$this->cache->setStream($stream);
	}

	public function posts( $feeds, $disableCache ) {
		return $this->cache->posts( $feeds, $disableCache );
	}

	public function errors() {
		return $this->cache->errors();
	}

	public function hash() {
		return $this->cache->hash();
	}

	public function transientHash( $streamId ) {
		return $this->cache->transientHash($streamId);
	}

	public function moderate() {
		$this->cache->moderate();
	}

	/**
	 * @param FFStreamSettings $stream
	 * @return bool
	 */
	private function admin($stream){
		return FF_USE_WP ? $stream->canModerate() : ff_user_can_moderate();
	}
}