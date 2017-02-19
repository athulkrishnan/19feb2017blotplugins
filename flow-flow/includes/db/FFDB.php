<?php namespace flow\db;
if ( ! defined( 'WPINC' ) ) die;

/**
 * Flow-Flow.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>

 * @link      http://looks-awesome.com
 *@copyright 2014-2016 Looks Awesome
 */
class FFDB {
	/** @var SafeMySQL $db */
	private static $db = null;

	/**
	 * @return string
	 */
	public static function charset(){
		if (FF_USE_WP){
			/** @var wpdb $wpdb */
			$wpdb = $GLOBALS['wpdb'];
			return $wpdb->charset;
		}
		return DB_CHARSET; // @codeCoverageIgnore
	}

	/**
	 * @param bool $reopen
	 * @return SafeMySQL
	 */
	public static function conn($reopen = false){
		if ($reopen || self::$db == null)
		{
			self::$db = self::create();
			self::$db->conn->autocommit(true);
		}
		return self::$db;
	}

	public static function create(){
		try{
			return new SafeMySQL(array('host' => DB_HOST, 'user' => DB_USER, 'pass' => DB_PASSWORD, 'db' => DB_NAME, 'charset' => FF_DB_CHARSET, 'errmode' => 'exception'));
		// @codeCoverageIgnoreStart
		} catch(Exception $e){
            echo '<b>Flow-Flow</b> plugin encountered database connection error. Please contact for support via item\'s comments section and provide info below:<br>';
			echo $e->getMessage();
			if (isset($_REQUEST['debug'])){
				var_dump($e);
			}
			die();
		}
		// @codeCoverageIgnoreEnd
	}

	/**
	 * @return bool
	 */
	public static function close(){
		$result = self::conn()->conn->close();
		self::$db = null;
		return $result;
	}

	/**
	 * @return string
	 */
	public static function collate() {
		if (FF_USE_WP){
			/** @var wpdb $wpdb */
			$wpdb = $GLOBALS['wpdb'];
			return $wpdb->collate;
		}
		return DB_COLLATE; // @codeCoverageIgnore
	}

	/**
	 * @return bool
	 */
	public static function beginTransaction(){
		return self::conn()->conn->autocommit(false);
	}

	/**
	 * @return bool
	 */
	public static function commit(){
		return self::conn()->conn->commit();
	}

	/**
	 * @return bool
	 */
	public static function rollback(){
		return self::conn()->conn->rollback();
		self::$db->conn->autocommit(true);
	}

	/**
	 * @return bool
	 */
	public static function rollbackAndClose(){
		$result = self::rollback();
		self::close();
		return $result;
	}

	/**
	 * @param $table_name
	 * @return bool
	 */
	public static function existTable($table_name){
		return self::conn()->getOne('SHOW TABLES LIKE ?s', $table_name) !== false;
	}

	public static function dropTable($table_name){
		self::conn()->query('DROP TABLE ' . $table_name);
	}

	public static function existColumn($table_name, $column_name){
		return self::conn()->getOne('SHOW COLUMNS FROM ?n LIKE ?s', $table_name, $column_name) !== false;
	}

	private static $cache = array();

	public static function getOption($table_name, $optionName, $serialized = false){
		if (!isset(self::$cache[$optionName])){
			$options = self::conn()->getOne('select `value` from ?n where `id`=?s', $table_name, $optionName);
			if ($options == false || $options == null ) return false;
			self::$cache[$optionName] = $serialized ? unserialize($options) : $options;
		}
		return self::$cache[$optionName];
	}

	public static function setOption($table_name, $optionName, $optionValue, $serialized = false, $cached = true){
		if ($cached) self::$cache[$optionName] = is_object($optionValue) ? clone $optionValue : $optionValue;
		if ($serialized) $optionValue = serialize($optionValue);
		if ( false === self::conn()->query( 'INSERT INTO ?n SET `id`=?s, `value`=?s ON DUPLICATE KEY UPDATE `value`=?s',
				$table_name, $optionName, $optionValue, $optionValue ) ) {
			throw new \Exception(); // @codeCoverageIgnore
		}
	}

	public static function deleteOption($table_name, $optionName){
		if (false === self::conn()->query('DELETE FROM ?n WHERE `id`=?s', $table_name, $optionName)){
			throw new \Exception(); // @codeCoverageIgnore
		}
		unset(self::$cache[$optionName]);
	}

	public static function streams($table_name){
		if (false !== ($result = self::conn()->getAll('SELECT `id`, `name`, `layout`, `value`, `feeds` FROM ?n ORDER BY `id`',
				$table_name))){
			return $result;
		}
		return array();
	}

//	public static function streamsWithStatus($table_name){
//		if (false !== ($result = self::streams($table_name))){
//			foreach ( $result as &$stream ) {
//				$status_info = self::getStatusInfo($table_name, (int)$stream['id']);
//				$feeds = json_decode( stripslashes( html_entity_decode ($stream['feeds'] ) ) );
//				$stream['status'] = sizeof($feeds) == $status_info['feeds_count'] ? $status_info['status'] : '0';
//				if (isset($status_info['error'])) $stream['error'] = $status_info['error'];
//				if (isset($_REQUEST['debug'])) {
//					echo 'DEBUG:: FFDB::streamsWithStatus<br>';
//					var_dump($status_info);
//					echo '<br>';
//					var_dump(sizeof($feeds));
//					echo '-------<br><br>';
//				}
//			}
//			return $result;
//		}
//		return array();
//	}

	/**
	 * @param string $table_name
	 *
	 * @return bool|int
	 */
	public static function countStreams($table_name){
		if (false !== ($count = self::conn()->getOne('select count(*) from ?n', $table_name))){
			return (int) $count;
		}
		return false;
	}

	/**
	 * @param string $table_name
	 *
	 * @return bool|int
	 */
	public static function maxIdOfStreams($table_name){
		if (false !== ($max = self::conn()->getOne('select max(`id`) from ?n', $table_name))){
			return (int) $max;
		}
		return false;
	}

	public static function getStream($table_name, $id){
		if (!array_key_exists($id, self::$cache)){
			if (false !== ($row = self::conn()->getRow('select `value`, `feeds` from ?n where `id`=?s', $table_name, $id))) {
				if ($row != null){
					self::$cache[$id] = self::unserializeStream($row);
				}
				else return null;
			}
		}
		return self::$cache[$id];
	}

	public static function unserializeStream($stream){
		$options = unserialize($stream['value']);
		$options->feeds = $stream['feeds'];
		return $options;
	}

	public static function getStatusInfo($cache_table_name, $streamId, $format = true) {
		$sql_part = FFDB::conn()->parse('where `cach`.`stream_id` = ?s', $streamId);
		$status_info = FFDB::conn()->getAll('select `cach`.`stream_id` as `id`, MIN(`cach`.`status`) as `status`, COUNT(`cach`.`feed_id`) as `feeds_count` from ?n `cach` ?p  group by `cach`.`stream_id`',
			$cache_table_name, $sql_part);
		if (empty($status_info)){
			return array('id' => (string)$streamId, 'status' => '1', 'feeds_count' => '0');
		}
		$status_info = $status_info[0];
		if ($status_info['status'] == '0') {
			$status_info['error'] = self::getError($cache_table_name, $streamId, $format);
		}
		return $status_info;
	}

	public static function getError($cache_table_name, $streamId, $format = true){
		$result = '';
		$errors = FFDB::conn()->getInd('feed_id', 'select `errors`, `feed_id` from ?n where stream_id = ?s', $cache_table_name, $streamId);
		foreach ( $errors as $feed => $error ) {
			unset($error['feed_id']);
			if (is_array($error)){
				foreach ( $error as $str ) {
					$value = unserialize($str);
					if (!empty($value)){
						if (is_array($value) && sizeof($value) == 1){
							$value = $value[0];
						}
						$result[$feed] = $value;
					}

				}
			}
			else if (is_string($error)){
				$value = unserialize($str);
				if (!empty($value)){
					$result[] = unserialize($str);
				}

			}
		}
		return $format ? var_dump2str($result) : $result;
	}

	public static function setStream($table_name, $id, $stream){
		self::$cache[$id] = clone $stream;
		$name = $stream->name;
		$layout = isset($stream->layout) ? $stream->layout : NULL;
		$feeds = (is_array($stream->feeds) || is_object($stream->feeds)) ? serialize($stream->feeds) : stripslashes($stream->feeds);
		//		if (get_magic_quotes_gpc()) {
//			$stream['feeds'] = stripslashes($stream['feeds']);
//		}
		unset($stream->feeds);
		$serialized = serialize($stream);
		$common = array(
			'name'      => $name,
			'layout'    => $layout,
			'feeds'     => $feeds,
			'value'     => $serialized
		);

		if ( false === self::conn()->query( 'INSERT INTO ?n SET `id`=?s, ?u ON DUPLICATE KEY UPDATE ?u',
				$table_name, $id, $common, $common ) ) {
			throw new \Exception();
		}
		self::commit();
	}

	public static function deleteStream($table_name, $id){
		if (false === self::conn()->query('DELETE FROM ?n WHERE `id`=?s', $table_name, $id)){
			return false;
		}
		unset(self::$cache[$id]);
		return true;
	}
}