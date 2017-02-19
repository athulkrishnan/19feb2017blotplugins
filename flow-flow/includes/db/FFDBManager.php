<?php namespace flow\db;
use flow\cache\LAFacebookCacheManager;
use flow\FlowFlow;
use flow\settings\FFSettingsUtils;

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
class FFDBManager extends LADBManager{

	public function __construct($context) {
		parent::__construct($context);
	}

	protected function startVersion() {
		return '1.9999';
	}

	protected function init(){
		parent::init();
		FFDBUpdate::create_cache_table($this->cache_table_name, $this->posts_table_name);
		FFDBUpdate::create_snapshot_table();
		FFDBUpdate::create_streams_table($this->streams_table_name);
		FFDBUpdate::create_image_size_table($this->image_cache_table_name);
	}

	public function streams(){
		return FFDB::streams($this->streams_table_name);
	}

	public function streamsSafe(){
		if (FFDB::existTable($this->streams_table_name))
			return $this->streams();
		return array();
	}

	public function countStreams(){
		return FFDB::countStreams($this->streams_table_name);
	}

	public function getStream($streamId){
		return FFDB::getStream($this->streams_table_name, $streamId);
	}

	public function social_auth(){
		if (isset($_REQUEST['type'])){
			if ($_REQUEST['type'] == 'facebook'){
				global $flow_flow_context;
				/** @var LAFacebookCacheManager $facebook_сache */
				$facebook_сache = $flow_flow_context['facebook_сache'];
				$facebook_сache->save($_REQUEST['facebook_access_token'], time() + $_REQUEST['expires']);
			}
			else {
				$fieldName = $_REQUEST['type'];
				$options = $this->getOption('options', true);
				$options[$fieldName] = $_REQUEST[$fieldName];
				$this->setOption('options', $options, true);
			}

			header('Location: ' . admin_url() . '?page=flow-flow', true, 301);
		}
		die();
	}

	public function get_stream_settings(){
		$id = $_GET['stream-id'];
		$stream = FFDB::getStream( $this->streams_table_name, $id );
        if ($stream != null) {
            $status = FFDB::getStatusInfo($this->cache_table_name, (int)$stream->id, false);
            if (isset($status['status']) && $status['status'] == 0 && isset($status['error'])){
                $stream->errors = $status['error'];
            }
        }

		die(json_encode( $stream ));
	}

	public function create_stream(){
		$stream = $_POST['stream'];
		$stream = (object)$stream;
		try{
			FFDB::beginTransaction();
			if (false !== ($max = FFDB::maxIdOfStreams($this->streams_table_name))){
				$newId = (string) $max + 1;
				$stream->id = $newId;
				$stream->feeds = isset($stream->feeds) ? $stream->feeds : json_encode(array());
				$stream->name = isset($stream->name) ? $stream->name : '';
				FFDB::setStream($this->streams_table_name, $newId, $stream);
				$response = json_encode(FFDB::getStream($this->streams_table_name, $newId));
				FFDB::commit();

				$this->refreshCache($newId);
				echo $response;
			}
			else echo false;
		}catch (Exception $e){
			FFDB::rollbackAndClose();
			echo 'Caught exception: ',  $e->getMessage(), "\n";
		}
		FFDB::close();
		die();
	}

	public function save_stream_settings(){
		$force_load_cache = false;
		$stream = $_POST['stream'];
		$stream = (object)$stream;
		$id = $stream->id;
		try{
			FFDB::beginTransaction();
//			$stream->feeds = stripslashes($stream->feeds);//HACK
			if (false !== ($old = FFDB::getStream($this->streams_table_name, $id))){
				if (!empty($old) && $stream->width != $old->width){
					$this->clean(array($id));
					$force_load_cache = true;
				}
			}
			FFDB::setStream($this->streams_table_name, $id, $stream);

			if (isset($_POST['feeds_changed'])){
				foreach ( $_POST['feeds_changed'] as $feed ) {
					$state = $feed['state'];
					if ($state == 'deleted') {
						$this->cleanFeed($feed['id']);
						$force_load_cache = false;
					}
					else if ($state == 'changed') {
						$this->cleanFeed($feed['id']);
						$force_load_cache = true;
					}
					else {
						$force_load_cache = true;
					}
				}
			}
			if ($force_load_cache) $this->refreshCache($id, true);
			$status = FFDB::getStatusInfo($this->cache_table_name, (int)$stream->id, false);
			if (isset($status['status']) && $status['status'] == 0 && isset($status['error'])){
				$stream->errors = $status['error'];
			}
			echo json_encode($stream);
			FFDB::commit();

		}catch (Exception $e){
			FFDB::rollbackAndClose();
			error_log('save_stream_settings error:');
			error_log($e->getMessage());
			error_log($e->getTraceAsString());
		}
		FFDB::close();
		die();
	}

	public function clone_stream(){
		$id = $_GET['stream-id'];
		try{
			FFDB::beginTransaction();
			if (false !== ($count = FFDB::maxIdOfStreams($this->streams_table_name))){
				$newId = (string) $count + 1;
				$stream = FFDB::getStream($this->streams_table_name, $id);
				$stream->id = $newId;
				$stream->name = "{$stream->name} copy";
				if (isset($stream->feeds) && !empty($stream->feeds)){
					$feeds = json_decode( stripslashes( html_entity_decode ($stream->feeds ) ) );
					foreach ( $feeds as &$feed ) {
						$time = (string)time();
						$feed->id = substr($feed->id, 0, 2) . substr($time, 5, 5);
					}
					$stream->feeds = json_encode($feeds);
				}
				FFDB::setStream($this->streams_table_name, $newId, $stream);
				$response = json_encode(FFDB::getStream($this->streams_table_name, $newId));
				FFDB::commit();
				$this->refreshCache($newId);
				echo $response;
			}
			else echo false;
		}catch (Exception $e){
			error_log('clone_stream error:');
			error_log($e->getTraceAsString());
			FFDB::rollbackAndClose();
			echo false;
		}
		FFDB::close();
		die();
	}

	public function delete_stream(){
		try{
			FFDB::beginTransaction();
			$id = $_GET['stream-id'];
			echo FFDB::deleteStream($this->streams_table_name, $id);
			do_action('ff_after_delete_stream', $id);
			$this->clean(array($id));
			FFDB::commit();
		}catch (Exception $e){
			error_log($e->getMessage());
			error_log($e->getTraceAsString());
			FFDB::rollbackAndClose();
		}
		die();
	}

	public function  ff_save_settings_fn () {
		try{
			$serialized_settings = $_POST['settings']; // param1=foo&param2=bar
			$settings = array();
			parse_str( $serialized_settings, $settings );

			$activated = @$this->activate($settings);

			FFDB::beginTransaction();

			list($force_load_cache, $facebook_changed) = $this->clean_cache($settings);

			$this->setOption('options', $settings['flow_flow_options'], true);
			//TODO move all auth settings from the general setting to other setting
			$this->setOption('fb_auth_options', $settings['flow_flow_fb_auth_options'], true);

			FFDB::commit();
			if ($force_load_cache) $this->refreshCache(null, $force_load_cache);
			global $flow_flow_context;
			/** @var LAFacebookCacheManager $facebookCache */
			$facebookCache = $flow_flow_context['facebook_сache'];
			if ($facebook_changed) {
				$facebookCache->clean();
			}
			$extendedToken = $facebookCache->getAccessToken();
			FFDB::commit();
			echo json_encode( array('settings' => $settings, 'fb_extended_token' => $extendedToken, 'activated' => $activated) ); // return serialized string back to client

		}catch (Exception $e){
			error_log('ff_save_settings_fn error:');
			error_log($e->getMessage());
			error_log($e->getTraceAsString());
			FFDB::rollbackAndClose();
		}
		FFDB::close();
		die();
	}

	protected function refreshCache($streamId, $force_load_cache = false){
		FlowFlow::get_instance()->refreshCache($streamId, $force_load_cache);
	}

	private function clean_cache($options) {
		$facebook_changed = false;
		$force_load_cache = false;
		$general = $options['flow_flow_options'];
		$old = $this->getOption('options', true);

		if (sizeof($old) > 0){
			if ($general['oauth_access_token'] != $old['oauth_access_token'] ||
			    $general['oauth_access_token_secret'] != $old['oauth_access_token_secret'] ||
			    $general['consumer_secret'] != $old['consumer_secret'] ||
			    $general['consumer_key'] != $old['consumer_key']){
				$this->cleanByFeedType('twitter');
				$force_load_cache = true;
			}
		} else if (trim($general['oauth_access_token']) == '' &&
		           trim($general['oauth_access_token_secret']) == '' &&
		           trim($general['consumer_secret']) == '' &&
		           trim($general['consumer_key']) == ''){
			$this->cleanByFeedType('twitter');
			$force_load_cache = true;
		}

		if (sizeof($old) > 0){
			if ($general['foursquare_client_id'] != $old['foursquare_client_id'] ||
			    $general['foursquare_client_secret'] != $old['foursquare_client_secret']){
				$this->cleanByFeedType('foursquare');
				$force_load_cache = true;
			}
		} else if (trim($general['foursquare_client_id']) == '' && trim($general['foursquare_client_secret']) == ''){
			$this->cleanByFeedType('foursquare');
			$force_load_cache = true;
		}

		if (sizeof($old) > 0){
			if ($general['instagram_access_token'] != $old['instagram_access_token']){
				$this->cleanByFeedType('instagram');
				$force_load_cache = true;
			}
		} else if (trim($general['instagram_access_token']) == ''){
			$this->cleanByFeedType('instagram');
			$force_load_cache = true;
		}

		if (sizeof($old) > 0){
			if ($general['google_api_key'] != $old['google_api_key']){
				$this->cleanByFeedType('google');
				$force_load_cache = true;
			}
		} else if (trim($general['google_api_key']) == ''){
			$this->cleanByFeedType('google');
			$force_load_cache = true;
		}

		$fb = $options['flow_flow_fb_auth_options'];
		$old = $this->getOption('fb_auth_options', true);
		$fb_use_own = FFSettingsUtils::YepNope2ClassicStyleSafe($fb, 'facebook_use_own_app', true);
		$old_use_own = FFSettingsUtils::YepNope2ClassicStyleSafe($old, 'facebook_use_own_app', true);
		if (sizeof($old) > 0){
			if ($fb_use_own != $old_use_own){
				//$this->cleanByFeedType('facebook');
				$force_load_cache = true;
				$facebook_changed = true;
			}
			else {
				if ($fb_use_own) {
					if ($fb['facebook_access_token'] != $old['facebook_access_token'] ||
					    $fb['facebook_app_id'] != $old['facebook_app_id'] ||
					    $fb['facebook_app_secret'] != $old['facebook_app_secret'])
					{
						//$this->cleanByFeedType('facebook');
						$force_load_cache = true;
						$facebook_changed = true;
					}
				}
				else {
					if ($fb['facebook_access_token'] != $old['facebook_access_token'])
					{
						//$this->cleanByFeedType('facebook');
						$force_load_cache = true;
						$facebook_changed = true;
					}
				}
			}
		} else {
			if ((!$fb_use_own && trim($fb['facebook_access_token']) == '') ||
			    ($fb_use_own && trim($fb['facebook_access_token']) == '' && trim($fb['facebook_app_id']) == '' && trim($fb['facebook_app_secret']) == ''))
			{
				//$this->cleanByFeedType('facebook');
				$force_load_cache = true;
				$facebook_changed = true;
			}
		}
		return array($force_load_cache, $facebook_changed);
	}

	public function streamsWithStatus(){
		if (false !== ($result = self::streams($this->streams_table_name))){
			foreach ( $result as &$stream ) {
				$status_info = FFDB::getStatusInfo($this->cache_table_name, (int)$stream['id']);
				$feeds = json_decode( html_entity_decode ($stream['feeds'] ) );
				$stream['status'] = sizeof($feeds) == $status_info['feeds_count'] ? $status_info['status'] : '0';
				if (isset($status_info['error'])) $stream['error'] = $status_info['error'];
//				if (isset($_REQUEST['debug'])) {
//					echo 'DEBUG:: FFDB::streamsWithStatus<br>';
//					var_dump($status_info);
//					echo '<br>';
//					var_dump(sizeof($feeds));
//					echo '-------<br><br>';
//				}
			}
			return $result;
		}
		return array();
	}

	public function clean(array $streams = null){
		$partOfSql = $streams == null ? '' : FFDB::conn()->parse('WHERE `stream_id` IN (?a)', $streams);
		try{
			if (FFDB::beginTransaction()){
				FFDB::conn()->query('DELETE FROM ?n ?p', $this->posts_table_name, $partOfSql);
				FFDB::conn()->query('DELETE FROM ?n ?p', $this->cache_table_name, $partOfSql);
				FFDB::conn()->query('DELETE FROM ?n', $this->image_cache_table_name);
				FFDB::commit();
			}
			FFDB::rollback();
		}catch (Exception $e){
			FFDB::rollbackAndClose();
		}
	}

	public function cleanFeed($feedId){
		try{
			if (FFDB::beginTransaction()){
				$partOfSql = FFDB::conn()->parse('WHERE `feed_id` = ?s', $feedId);
				FFDB::conn()->query('DELETE FROM ?n ?p', $this->posts_table_name, $partOfSql);
				FFDB::conn()->query('DELETE FROM ?n ?p', $this->cache_table_name, $partOfSql);
				FFDB::commit();
			}
			FFDB::rollback();
		}catch (Exception $e){
			FFDB::rollbackAndClose();
		}
	}

	public function cleanByFeedType($feedType){
		try{
			if (FFDB::beginTransaction()){
				$feeds = FFDB::conn()->getCol('SELECT DISTINCT `feed_id` FROM ?n WHERE `post_type` = ?s', $this->posts_table_name, $feedType);
				if (!empty($feeds)){
					FFDB::conn()->query("DELETE FROM ?n WHERE `feed_id` IN (?a)", $this->cache_table_name, $feeds);
					FFDB::conn()->query("DELETE FROM ?n WHERE `feed_id` IN (?a)", $this->posts_table_name, $feeds);
					FFDB::commit();
				}
			}
			FFDB::rollback();
		}catch (Exception $e){
			FFDB::rollbackAndClose();
		}
	}

	public function addOrUpdatePost($only4insertPartOfSql, $imagePartOfSql, $mediaPartOfSql, $common){
		$sql = "INSERT INTO ?n SET ?p, ?p ?p ?u ON DUPLICATE KEY UPDATE ?u";
		if (false == FFDB::conn()->query($sql, $this->posts_table_name, $only4insertPartOfSql, $imagePartOfSql, $mediaPartOfSql, $common, $common)){
			throw new \Exception(FFDB::conn()->conn->error);
		}
	}

	public function getIdPosts($streamId){
		return FFDB::conn(true)->getCol('SELECT `post_id` FROM ?n WHERE `stream_id`=?s', $this->posts_table_name, $streamId);
	}

	public function getPostsIf($fields, $condition, $order, $offset = null, $limit = null){
		$limitPart = ($offset !== null && $offset !== null) ? FFDB::conn()->parse("LIMIT ?i, ?i", $offset, $limit) : '';
		return FFDB::conn()->getAll("SELECT ?p FROM ?p post WHERE ?p ORDER BY ?p ?p",
			$fields, $this->posts_table_name, $condition, $order, $limitPart);
	}

	public function getPostsIf2($fields, $condition){
		return FFDB::conn()->getAll("SELECT ?p FROM ?p post WHERE ?p ORDER BY post.post_timestamp DESC, post.post_id",
			$fields, $this->posts_table_name, $condition);
	}

	public function countPostsIf($condition){
		return FFDB::conn()->getOne('SELECT COUNT(*) FROM ?p post WHERE ?p', $this->posts_table_name, $condition);
	}

	public function getLastUpdateHash($streamId){
		return $this->getHashIf(FFDB::conn()->parse('`stream_id` = ?s', $streamId));
	}

	public function getHashIf($condition){
		return FFDB::conn()->getOne("SELECT MAX(post.creation_index) FROM ?n post WHERE ?p", $this->posts_table_name, $condition);
	}

	public function getLastUpdateTime($streamId){
		return FFDB::conn()->getOne('SELECT MAX(`last_update`) FROM ?n WHERE `stream_id` = ?s',  $this->cache_table_name, $streamId);
	}

	public function getLastUpdateTimeAllStreams(){
		return FFDB::conn()->getIndCol('stream_id', 'SELECT MAX(`last_update`), `stream_id` FROM ?n GROUP BY `stream_id`',  $this->cache_table_name);
	}

	public function deleteEmptyRecordsFromCacheInfo($streamId){
		FFDB::conn()->query("DELETE FROM ?n where `feed_id` = '' and `stream_id`=?s", $this->cache_table_name, $streamId);
	}

	public function setCacheInfo($feedId, $streamId, $values){
		$sql = 'INSERT INTO ?n SET `feed_id`=?s, `stream_id`=?s, ?u ON DUPLICATE KEY UPDATE ?u';
		return FFDB::conn()->query( $sql, $this->cache_table_name, $feedId, $streamId, $values, $values );
	}

	public function setRandomOrder($streamId){
		return FFDB::conn()->query('UPDATE ?n SET `rand_order` = RAND() WHERE `stream_id`=?s', $this->posts_table_name, $streamId);
	}

	public function setSmartOrder($streamId, $feedId, $count){
		$wherePartOfSql = FFDB::conn()->parse('stream_id = ?s AND feed_id = ?s', $streamId, $feedId);
		if (false === FFDB::conn()->query('UPDATE ?n SET `smart_order` = `smart_order` + ?i WHERE ?p', $this->posts_table_name, $count, $wherePartOfSql)){
			throw new \Exception(FFDB::conn()->conn->error);
		}
	}

	public function removeOldRecords($c_count){
		$result = FFDB::conn()->getAll('select count(*) as `count`, `feed_id` from ?n group by `feed_id` order by 1 desc', $this->posts_table_name);
		foreach ( $result as $row ) {
			$count = (int)$row['count'];
			if ($count > $c_count) {
				$feed = $row['feed_id'];
				$count = $count - $c_count;
				$subQuery = FFDB::conn()->parse('select max(tmp.`post_timestamp`) from (select `post_timestamp` from ?n where `feed_id` = ?s order by `post_timestamp` limit 0, ?i) as tmp',$this->posts_table_name, $feed, $count);
				FFDB::conn()->query('delete from ?n where feed_id = ?s and post_timestamp <= (?p)', $this->posts_table_name, $feed, $subQuery);
				continue;
			}
			break;
		}
	}

	public function setPostStatus($status, $condition){
		$sql = "UPDATE ?n SET `post_status` = ?s ?p";
		if (false == FFDB::conn()->query($sql, $this->posts_table_name, $status, $condition)){
			throw new \Exception(FFDB::conn()->conn->error);
		}
	}

	public function registrationCheck(){
		$activated = false;
		if (false !== ($registration_id = $this->getOption('registration_id'))){
			if ((false !== ($registration_date = $this->getOption('registration_date'))) &&
			(time() > $registration_date + 604800)){
				$ch = curl_init( 'http://flow.looks-awesome.com/wp-admin/admin-ajax.php?action=la_check&registration_id=' . $registration_id);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_POST, false);
				$result = curl_exec( $ch );
				curl_close( $ch );
				$result = json_decode($result);
				if (isset($result->registration_id) && $registration_id == $result->registration_id){
					$this->setOption('registration_id', $result->registration_id);
					$this->setOption('registration_date', time());
					return true;
				}
				return false;
			}
			$activated = !empty($registration_id);
		}
		return $activated;
	}

	private function activate($settings){
		$activated = $this->registrationCheck();
		if (!$activated
		    && isset($settings['flow_flow_options']['company_email']) && isset($settings['flow_flow_options']['purchase_code'])
			&& !empty($settings['flow_flow_options']['company_email']) && !empty($settings['flow_flow_options']['purchase_code'])){

			$name = isset($settings['flow_flow_options']['company_name']) ? $settings['flow_flow_options']['company_name'] : 'Unnamed';
			$subscription = 0;
			if (isset($settings['flow_flow_options']['news_subscription']) && !empty($settings['flow_flow_options']['news_subscription'])){
				$subscription = $settings['flow_flow_options']['news_subscription'] == 'yep' ? 1 : 0;
			}
			$post = array(
				'action' => 'la_activation',
				'name' => $name,
				'email' => @$settings['flow_flow_options']['company_email'],
				'purchase_code'   => @$settings['flow_flow_options']['purchase_code'],
				'subscription' => $subscription,
				'plugin_name'	=>	'flow-flow'
			);

			list($result, $error) = $this->sendRequest2lo($post);
			if (false !== $result){
				$result = json_decode($result);
				if (isset($result->registration_id)){
					$this->setOption('registration_id', $result->registration_id);
					$this->setOption('registration_date', time());
					return true;
				}
				else if (isset($result->error)){
					return $result->error;
				}
			}
			else {
				return $error;
			}
		}
		if ($activated){
			$registration_id = $this->getOption('registration_id');
			$name = isset($settings['flow_flow_options']['company_name']) ? $settings['flow_flow_options']['company_name'] : 'Unnamed';
			$post = array(
				'action' => 'la_activation',
				'registration_id' => $registration_id,
				'name' => $name,
				'email' => @$settings['flow_flow_options']['company_email'],
				'purchase_code'   => @$settings['flow_flow_options']['purchase_code'],
				'subscription' => 1,
				'plugin_name'	=>	'flow-flow'
			);

			//subscribe
			if (isset($_POST['doSubcribe']) && $_POST['doSubcribe'] == 'true'){
				$result = $this->sendRequest2lo($post);
				$result = json_decode($result[0]);
				if (isset($result->registration_id)){
					$this->setOption('registration_id', $result->registration_id);
					$this->setOption('registration_date', time());
					return true;
				}
				return false;
			}

			//remove registration
			if (!isset($settings['flow_flow_options']['purchase_code']) || empty($settings['flow_flow_options']['purchase_code'])){
				$post['purchase_code'] = '';
				$this->sendRequest2lo($post);
				$this->deleteOption('registration_id');
				$this->deleteOption('registration_date');
				return false;
			}
		}
		return true;
	}

	private function sendRequest2lo($data){
		$ch = curl_init( 'http://flow.looks-awesome.com/wp-admin/admin-ajax.php' );
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
		curl_setopt($ch, CURLOPT_POST, true);
		$error = null;
		$result = curl_exec( $ch );
		if ($result === false){
			$error = curl_error($ch);
		}
		curl_close( $ch );
		return array($result, $error);
	}
}