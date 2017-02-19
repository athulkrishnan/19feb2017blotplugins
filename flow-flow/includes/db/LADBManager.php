<?php  namespace flow\db;
use flow\settings\FFGeneralSettings;

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
abstract class LADBManager {
	public $table_prefix;
	public $option_table_name;
	public $posts_table_name;
	public $cache_table_name;
	public $streams_table_name;
	public $image_cache_table_name;

	protected $context;
	protected $plugin_slug;
	protected $plugin_slug_down;

	function __construct($context) {
		$this->context = $context;
		$this->table_prefix = $context['table_name_prefix'];
		$this->plugin_slug = $context['slug'];
		$this->plugin_slug_down = $context['slug_down'];

		$this->option_table_name = $this->table_prefix . 'options';
		$this->posts_table_name = $this->table_prefix . 'posts';
		$this->cache_table_name = $this->table_prefix . 'cache';
		$this->streams_table_name = $this->table_prefix . 'streams';
		$this->image_cache_table_name = $this->table_prefix . 'image_cache';
	}

	public final function migrate(){
		if (!FFDB::existTable($this->option_table_name)){
			$this->init();
			FFDB::setOption($this->option_table_name, $this->plugin_slug_down . '_db_version', $this->startVersion());
		}

		if (!FFDB::existTable($this->image_cache_table_name)){
			$this->init();
		}

		if (false !== ($version = $this->getOption('db_version'))){
			$migrations = array();
			foreach ($this->migrations() as $class) {
				$clazz = new \ReflectionClass($class);
				/** @var FFDBMigration $migration */
				$migration = $clazz->newInstance();
				$migrations[$migration->version()] = $migration;
			}
			try{
				if (FFDB::beginTransaction()){
					/** @var FFDBMigration*/
					foreach ( $migrations as $migration ) {
						if (self::needExecuteMigration($version, $migration->version())){
							$migration->execute($this);
							FFDB::setOption($this->option_table_name, $this->plugin_slug_down . '_db_version', $migration->version());
						}
					}
					FFDB::commit();

					if (isset($migrations['2.13'])){
						$migration = $migrations['2.13'];
						$migration->execute($this);
						FFDB::commit();
					}
				}
			} catch (Exception $e){
				FFDB::rollbackAndClose();
				throw $e;
			}
		}
	}

	public function getGeneralSettings(){
		return new FFGeneralSettings($this->getOption('options', true), $this->getOption('fb_auth_options', true));
	}

	public function getOption($optionName, $serialized = false){
		return FFDB::getOption($this->option_table_name, $this->plugin_slug_down . '_' . $optionName, $serialized);
	}

	public function setOption($optionName, $optionValue, $serialized = false){
		FFDB::setOption($this->option_table_name, $this->plugin_slug_down . '_' . $optionName, $optionValue, $serialized);
	}

	public function deleteOption($optionName){
		FFDB::deleteOption($this->option_table_name, $this->plugin_slug_down . '_' . $optionName);
	}

	protected function init(){
		FFDBUpdate::create_options_table($this->option_table_name);
	}
	protected abstract function startVersion();


	/**
	 * @return array
	 */
	protected function migrations(){
		$result = array();
		global $flow_flow_context;
		foreach ( glob($flow_flow_context['root'] . 'includes/db/migrations/FFMigration_*.php') as $filename ) {
			$result[] = 'flow\\db\\migrations\\' . basename($filename, ".php");
		}
		return $result;
	}

	private function needExecuteMigration($db_version, $migration_version){
		$db = explode('.', $db_version);
		$migration = explode('.', $migration_version);
		if (intval($migration[0]) > intval($db[0])) return true;
		return (intval($migration[1]) > $db[1]);
	}
} 