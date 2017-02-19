<?php namespace flow\cache;
if ( ! defined( 'WPINC' ) ) die;

use flow\db\FFDB;
use flow\social\FFFeedUtils;
use flow\settings\FFGeneralSettings;

/**
 * Flow-Flow.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>

 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 *
 * @property FFStreamSettings stream
 */
class FFCacheManager implements FFCache{
	/** @var  FFDBManager */
	protected $db;
    private $force;
    private $stream;
	private $hash = '';
    private $errors = array();

    function __construct($context = null, $force = false){
	    $this->force = $force;
	    $this->db = $context['db_manager'];
    }

    /**
     * @param array $feeds
     * @param bool $disableCache
     * @return array
     */
    public function posts($feeds, $disableCache){
	    if (isset($_REQUEST['clean']) && $_REQUEST['clean']) $this->db->clean();
	    if (isset($_REQUEST['clean-stream']) && $_REQUEST['clean-stream']) $this->db->clean(array($this->stream->getId()));
	    if ($this->force){
		    if ($this->expiredLifeTime())
		    {
			    $this->debug('Started background task');
			    try {
				    $allPosts = array();
				    $this->hash = time();
				    $this->trace('Ready get posts');
				    $statuses = array();
				    /** @var FFFeed $feed */
				    foreach ( $feeds as $feed ) {
					    $this->trace('Ready get feed %s', $feed->id());
					    $posts = array();
					    try {
						    $posts = $feed->posts();
						    $this->trace('Have got posts for feed %s', $feed->id());
						    $errors = $feed->errors();
					    } catch (Exception $e) {
						    //$this->error('Cache:: Feed: %s ERROR: %s', array($feed->id(), $e->getMessage()));
						    $this->debug('Cache:: Feed: %s ERROR: %s', array($feed->id(), $e->getTraceAsString()));
						    $errors = $feed->errors();
						    $errors[] = "<h3>Sorry, there was a problem.</h3><p>Feed {$feed->id()} returned the following error message:</p><p><em>{$e->getMessage()}</em></p>";
					    }
					    $countGotPosts = sizeof( $posts );
					    $criticalError = ($countGotPosts == 0 && sizeof($errors) > 0);
					    $statuses[$feed->id()] = array('last_update' => $criticalError ? 0 : time(), 'errors' => $errors, 'status' => (int)(!$criticalError));
					    $allPosts += $posts;
				    }

				    $posts = $this->getOnlyNewPosts($allPosts);
				    $countPosts4Insert = sizeof($posts);
				    $this->trace('Count posts for insert %s', $countPosts4Insert);
				    if ($countPosts4Insert > 0 && FFDB::beginTransaction()) {
					    $this->trace('Have got transaction for feed %s', $feed->id());
					    $this->db->deleteEmptyRecordsFromCacheInfo($this->stream->getId());

					    $feed_id = '';
					    try{
						    $this->save( $posts, $feed_id );
					    } catch (Exception $e) {
						    $statuses[$feed_id] = array('last_update' => 0, 'errors' => serialize($e->getMessage()), 'status' => 0);
					    }

					    if ( false == $this->db->setRandomOrder($this->stream->getId())) {
						    throw new \Exception();
					    }
					    $this->trace('Have updated the random sort column');
				    }

				    $this->setCacheInfo($statuses);
				    $this->trace('Updated status for all feeds');
				    FFDB::commit();
				    $this->trace( 'Have updated stream, new hash for it %s', $this->hash);
				    if ($countPosts4Insert > 0){
					    $this->removeOldRecords();
					    FFDB::commit();
				    }
			    } catch (Exception $e) {
				    $this->error('Can`t save posts to DB');
				    $this->debug('Rollback query: %s', FFDB::conn()->lastQuery());
				    FFDB::rollbackAndClose();
				    return array();
			    }
		    }
		    FFDB::rollbackAndClose();
		    return array();
	    } else {
		    if (empty($_REQUEST['hash']) || $disableCache){
			    $this->force = true;
			    $_REQUEST['force'] = true;
			    $this->posts($feeds, $disableCache);
			    unset($_REQUEST['force']);
			    $_REQUEST['hash'] = $this->hash();
		    }
		    return $this->get();
	    }
    }

	public function hash(){
		return $this->encodeHash($this->hash);
	}

	public function transientHash($streamId){
		$hash = $this->db->getLastUpdateHash($streamId);
		return (false !== $hash) ? $this->encodeHash($hash) : '';
	}

	public function errors(){
        return $this->errors;
    }

	public function moderate(){
	}

    /**
     * @param FFStreamSettings $stream
     * @return void
     */
    public function setStream($stream) {
        $this->stream = $stream;
    }

	protected function getGetFields(){
		$select  = "post.post_id as id, post.post_type as type, post.user_nickname as nickname, ";
		$select .= "post.user_screenname as screenname, post.user_pic as userpic, ";
		$select .= "post.post_timestamp as system_timestamp, ";
		$select .= "post.post_text as text, post.user_link as userlink, post.post_permalink as permalink, ";
		$select .= "post.image_url, post.image_width, post.image_height, post.media_url, post.media_type, ";
		$select .= "post.media_width, post.media_height, post.post_header, post.post_source, post.post_additional";
		return $select;
	}

	protected function getGetFilters(){
		$args[] = FFDB::conn()->parse('post.stream_id = ?s', $this->stream->getId());
		if ($this->stream->showOnlyMediaPosts()) $args[] = "post.image_url IS NOT NULL";
		if (isset($_REQUEST['hash']))
			if (isset($_REQUEST['recent'])){
				$args[] = FFDB::conn()->parse('post.creation_index > ?s', $this->decodeHash($_REQUEST['hash']));
			} else {
				$args[] = FFDB::conn()->parse('post.creation_index <= ?s', $this->decodeHash($_REQUEST['hash']));
			}
		if (false !== ($days = $this->stream->getDays())) $args[] = FFDB::conn()->parse('post.post_timestamp >= ?i', time()-$days);
		return $args;
	}

	protected function getOnlyNew(){
		return array();
	}

    /**
     * @return mixed
     */
    private function get(){
	    $where = implode(' AND ', $this->getGetFilters());

	    $order = 'post.smart_order, post.post_timestamp DESC';
	    if ($this->stream->order() == FF_RANDOM_ORDER)  $order = 'post.rand_order, post.post_id';
	    if ($this->stream->order() == FF_BY_DATE_ORDER) $order = 'post.post_timestamp DESC, post.post_id';

	    $limit = null;
	    $offset = null;
	    $result = array();
	    if (!isset($_REQUEST['recent'])){
		    $page = isset($_REQUEST['page']) ? (int) $_REQUEST['page'] : 0;
		    $limit = $this->stream->getCountOfPostsOnPage();
		    $offset = $page * $limit;

		    if ($page == 0){
			    $result = $this->getOnlyNew();
			    if (!isset($_REQUEST['countOfPages'])){
				    $totalCount = $this->db->countPostsIf($where);
				    if ($totalCount === false) $totalCount = 0;
				    $countOfPages = ($limit > $totalCount) ? 1 : round($totalCount / $limit, 0, PHP_ROUND_HALF_UP);
				    $_REQUEST['countOfPages'] = $countOfPages;
			    }
		    }
	    }
	    $resultFromDB = $this->db->getPostsIf($this->getGetFields(), $where, $order, $offset, $limit);
	    if (false === $resultFromDB) $resultFromDB = array();
	    foreach ( $resultFromDB as $row ) {
		    $result[] = $this->buildPost($row);
	    }

	    //$this->errors = FFDB::getError($this->db->cache_table_name, $this->stream->getId());
	    $this->hash = $this->db->getHashIf($where);
	    FFDB::close();
	    return $result;
    }

	/**
	 * @param $value
	 *
	 * @throws Exception
	 * @return void
	 */
    private function save( $value, &$feed_id ) {
	    if (sizeof($value) > 0) {
		    $countByFeed = array();
		    usort( $value, array( $this, 'compareByTime' ) );
		    foreach ( $value as $id => $post ) {
			    if (!array_key_exists($post->feed_id, $countByFeed)) $countByFeed[$post->feed_id] = 0;
			    $count = $countByFeed[$post->feed_id];
			    $post->smart_order = $count;
			    $countByFeed[$post->feed_id] = $count + 1;
		    }
		    foreach ( $countByFeed as $feed => $count ) {
			    $this->db->setSmartOrder($this->stream->getId(), $feed, $count);
		    }

		    $only4insertPartOfSqlTemplate =
			    FFDB::conn()->parse('`stream_id`=?i, `creation_index`=?i', $this->stream->getId(), $this->hash);

		    $status = $this->getDefaultStreamStatus();
	        foreach ($value as $id => $post){
		        $feed_id = $post->feed_id;

		        $imagePartOfSql = (isset($post->img) && sizeof($post->img) == 3) ?
			        FFDB::conn()->parse('`image_url`=?s, `image_width`=?i, `image_height`=?i,',
			        $post->img['url'], $post->img['width'], $post->img['height']) : '';
		        $mediaPartOfSql = (isset($post->media) && sizeof($post->media) == 4) ?
			        FFDB::conn()->parse('`media_url`=?s, `media_width`=?i, `media_height`=?i, `media_type`=?s,',
			        $post->media['url'], $post->media['width'], $post->media['height'], $post->media['type']) : '';

		        $only4insertPartOfSql = FFDB::conn()->parse('?p, ?u', $only4insertPartOfSqlTemplate, array(
			        'feed_id' => $feed_id,
			        'post_id' => $post->id,
			        'post_type' => $post->type,
			        'post_permalink' => $post->permalink,
			        'user_nickname' => $post->nickname,
			        'user_screenname' => $post->screenname,
			        'user_pic' => $post->userpic,
			        'user_link' => $post->userlink,
			        'smart_order' => $post->smart_order,
			        'post_source' => isset($post->source) ? $post->source : '',
			        'post_status' => $status
		        ));

		        if (!isset($post->additional)) $post->additional = array();
		        $common = array(
			        'post_header' => @FFDB::conn()->conn->real_escape_string(trim($post->header)),
			        'post_text'   => $this->prepareText($post->text),
			        'post_timestamp' => FFFeedUtils::correctionTimeZone($post->system_timestamp),
			        'post_additional' => json_encode($post->additional)
		        );

		        $this->db->addOrUpdatePost($only4insertPartOfSql, $imagePartOfSql, $mediaPartOfSql, $common);
	        }
		    $this->debug('Have saved posts');
	    }
    }

    /**
     * @return bool
     */
    private function expiredLifeTime(){
	    if (isset($_REQUEST['force']) && $_REQUEST['force']) return true;
	    $last_update = $this->db->getLastUpdateTime($this->stream->getId());
	    if ($last_update === false || $last_update == null) {
		    $last_update = 0;
	    }
	    else if ($this->stream->getCacheLifeTime() == 0){
		    //Stream has option with cache life time = never
		    return false;
	    }
	    return ($last_update + $this->stream->getCacheLifeTime()) < time();
    }

	/**
	 * @param array $row
	 * @return stdClass
	 */
	protected function buildPost($row){
		$post = new \stdClass();
		$post->id = $row['id'];
		$post->type = $row['type'];
		$post->nickname = $row['nickname'];
		$post->screenname = $row['screenname'];
		$post->userpic = $row['userpic'];
		$post->system_timestamp = $row['system_timestamp'];
		$post->timestamp = FFFeedUtils::classicStyleDate($row['system_timestamp'], FFGeneralSettings::get()->dateStyle());
		$post->text = stripslashes($row['text']);
		$post->userlink = $row['userlink'];
		$post->permalink = $row['permalink'];
		$post->header = stripslashes($row['post_header']);
		if (!empty($row['post_source'])) $post->source = $row['post_source'];
		if ($row['image_url'] != null){
			$url = $row['image_url'];
			$width = $row['image_width'];
			$tWidth = $this->stream->getImageWidth();
			if (($post->type != 'posts') && $this->db->getGeneralSettings()->useProxyServer() && ($width + 50) > $tWidth) $url = FFFeedUtils::proxy($url, $tWidth);
			$post->img = array('url' => $url, 'width' => $width, 'height' => $row['image_height'], 'type' => 'image');
			$post->media = $post->img;
		}
		if ($row['media_url'] != null){
			$post->media = array('url' => $row['media_url'], 'width' => $row['media_width'], 'height' => $row['media_height'], 'type' => $row['media_type']);
		}
		$post->additional = json_decode($row['post_additional']);
		return $post;
	}

	/**
	 * @param $statuses
	 *
	 * @throws Exception
	 * @internal param $countFeeds
	 *
	 * @internal param $id
	 * @internal param $values
	 *
	 * @internal param $errors
	 * @internal param int $status 0:have errors 1:active
	 *
	 * @return void
	 */
	private function setCacheInfo( $statuses ) {
		foreach ( $statuses as $id => $values ) {
			if (isset($values['errors']) && !is_string($values['errors'])) {
				$values['errors'] = serialize($values['errors']);
			}
			if ( false == $this->db->setCacheInfo($id, $this->stream->getId(), $values)) {
				throw new \Exception();
			}
		}
	}

	/**
	 * @param string $format
	 * @param mixed | null $args
	 *
	 * @return void
	 */
	private function debug($format, $args = null){
		if (isset($_REQUEST['debug'])) {
			$msg = vsprintf($format, $args);
			error_log('DEBUG :: Stream: ' . $this->stream->getId() . ' :: ' . $msg);
			echo 'DEBUG :: Stream: ' . $this->stream->getId() . ' :: ' . $msg . '<br>';
		}
	}

	/**
	 * @param string $format
	 * @param mixed | null $args
	 *
	 * @return void
	 */
	private function trace($format, $args = null){
		if (isset($_REQUEST['debug'])) {
			$msg = vsprintf($format, $args);
			error_log('TRACE :: Stream: ' . $this->stream->getId() . ' :: ' . $msg);
			echo 'TRACE :: Stream: ' . $this->stream->getId() . ' :: ' . $msg . '<br>';
		}
	}

	/**
	 * @param string $format
	 * @param mixed | null $args
	 *
	 * @return void
	 */
	private function error($format, $args = null){
		if (true) {
			$msg = vsprintf($format, $args);
			error_log('ERROR :: Stream: ' . $this->stream->getId() . ' :: ' . $msg);
			if (isset($_REQUEST['debug'])) echo 'ERROR :: Stream: ' . $this->stream->getId() . ' :: ' . $msg . '<br>';
		}
	}

	/**
	 * @param $posts
	 *
	 * @return array
	 */
	private function getOnlyNewPosts( $posts ) {
		$ids = $this->db->getIdPosts($this->stream->getId());
		foreach ( $ids as $id ) {
			if (isset($posts[$id])) unset($posts[$id]);
		}
		return array_values($posts);
	}

	private function encodeHash($hash){
		if (!empty($hash)){
			$postfix  = hash('md5', serialize($this->stream->original()));
			$postfix .= hash('md5', serialize(FFGeneralSettings::get()->original()));
			$postfix .= hash('md5', serialize(FFGeneralSettings::get()->originalAuth()));
			return $hash . "." . $postfix;
		}
		return $hash;
	}

	protected function decodeHash($hash){
		$pos = strpos($hash, ".");
		if ($pos === false) return $hash;
		if ($pos == 0) return '';
		return substr($hash, 0, $pos);
	}

	private function compareByTime($a, $b) {
		$a_system_date = $a->system_timestamp;
		$b_system_date = $b->system_timestamp;
		return ($a_system_date == $b_system_date) ? 0 : ($a_system_date < $b_system_date) ? 1 : -1;
	}

	private function getDefaultStreamStatus() {
		if ($this->stream->moderation()){
			if (defined('FF_SOFT_MODERATION_POLICY') && FF_SOFT_MODERATION_POLICY){
				return 'approved';
			}
			return 'new';
		}
		return 'approved';
	}

	private function removeOldRecords() {
		$count = defined('FF_FEED_POSTS_COUNT') ? FF_FEED_POSTS_COUNT : 1000;
		$this->db->removeOldRecords($count);
	}

	private function prepareText( $text ) {
		$text = str_replace("\r\n", "<br>", $text);
		$text = str_replace("\n", "<br>", $text);
		$text = trim($text);
		return @FFDB::conn()->conn->real_escape_string($text);
	}
}