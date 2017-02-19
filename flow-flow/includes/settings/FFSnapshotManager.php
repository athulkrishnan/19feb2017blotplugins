<?php namespace flow\settings;
if ( ! defined( 'WPINC' ) ) die;

use flow\db\FFDB;
use flow\db\FFDBManager;

/**
 * Flow-Flow
 *
 * Plugin class. This class should ideally be used to work with the
 * public-facing side of the WordPress site.
 *
 * If you're interested in introducing administrative or dashboard
 * functionality, then refer to `FlowFlowAdmin.php`
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>

 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 */
class FFSnapshotManager {
	private $context;

	public function __construct($context) {
		$this->context = $context;
	}

	public function getSnapshots(){
		$result = array();
		$rows = FFDB::conn()->getAll('SELECT * FROM ?n ORDER BY `creation_time` DESC', FF_SNAPSHOTS_TABLE_NAME);
		foreach ( $rows as $row ) {
			$sn = new \stdClass();
			$sn->id = $row['id'];
			$sn->description = $row['description'];
			$sn->creation_time = $row['creation_time'];
			$sn->settings = $row['settings'];
			$result[] = $sn;
		}
		return $result;
	}

	public function processAjaxRequest() {
		$result = array();
		if (isset($_REQUEST['action'])){
			switch ($_REQUEST['action']){
				case 'create_backup':
					$result = $this->createBackup();
					break;
				case 'restore_backup':
					$result = $this->restoreBackup();
					break;
				case 'delete_backup':
					$result = $this->deleteBackup();
					break;
			}
		}
		echo json_encode($result);
		die();
	}

	public function createBackup () {
		$op = false;
		$all = array();
		$description = '';//TODO add description for snapshot
		/** @var FFDBManager $db */
		$db = $this->context['db_manager'];
		try{
			if (false === FFDB::beginTransaction()) throw new \Exception('Don`t started transaction');

			$options = FFDB::conn()->getAll('SELECT `id`, `value` FROM ?n', $db->option_table_name);
			foreach ( $options as $option ) {
				$all[$option['id']] = $option['value'];
			}
			$all['streams'] = array();
			foreach ( $db->streams() as $stream ) {
				$all['streams'][] = $db->getStream($stream['id']);
			}
			$result = gzcompress(serialize($all), 6);

			$op = FFDB::conn()->query("INSERT INTO ?n (`description`, `settings`, `dump`) VALUES(?s, ?s, ?s)", FF_SNAPSHOTS_TABLE_NAME, $description, '', $result);

			FFDB::commit();
		}catch (Exception $e){
			FFDB::rollbackAndClose();
			error_log($e->getMessage());
			error_log($e->getTraceAsString());
		}
		return array('backed_up' => (false !== $op), 'result' => FFDB::conn()->affectedRows());
	}

	public function restoreBackup () {
		try{
			if (FFDB::beginTransaction() &&
			    (false !== ($dump = FFDB::conn()->getOne('SELECT `dump` FROM ?n WHERE id=?s', FF_SNAPSHOTS_TABLE_NAME, $_REQUEST['id'])))){
				$all = gzuncompress($dump);
				$all = unserialize($all);
				/** @var FFDBManager $db */
				$db = $this->context['db_manager'];

				foreach ( $db->streams() as $stream ) {
					FFDB::deleteStream($db->streams_table_name, $stream['id']);
				}

				foreach ( $all['streams'] as $stream ) {
					$obj = (object)$stream;
					FFDB::setStream($db->streams_table_name, $obj->id, $obj);
				}
				unset($all['streams']);

				foreach ( $all as $key => $value ) {
					$key = strpos($key, 'flow_flow_') === 0 ? str_replace('flow_flow_', '', $key) : $key;
					$db->setOption($key, $value);
				}
				$db->clean();
				FFDB::commit();
				return array('restore' => true);
			}
		}catch (Exception $e){
			FFDB::rollbackAndClose();
			error_log($e->getMessage());
			error_log($e->getTraceAsString());
		}
		return array('found' => false);
	}

	public function deleteBackup () {
		try{
			if (false === FFDB::beginTransaction()) throw new \Exception('Don`t started transaction');
			$op = FFDB::conn()->query ('DELETE FROM ?n WHERE `id`=?s', FF_SNAPSHOTS_TABLE_NAME, $_REQUEST['id']);
			FFDB::commit();
			return array('deleted' => (false !== $op));
		}catch(Exception $e){
			FFDB::rollbackAndClose();
			error_log($e->getMessage());
			error_log($e->getTraceAsString());
		}
		return array('deleted' => false);
	}
} 