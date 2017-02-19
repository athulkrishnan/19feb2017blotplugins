<?php namespace flow\cache;
if ( ! defined( 'WPINC' ) ) die;

use flow\db\FFDB;

/**
 * FlowFlow.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>
 *
 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 */
class FFAdminModerationCacheManager extends FFCacheManager{
	function __construct( $context = null, $force = false ) {
		parent::__construct( $context, $force );
	}

	public function moderate() {
		try {
			if (FFDB::beginTransaction()){
				$hash       = $_POST['hash'];
				$action     = $_POST['moderation_action'];
				$stream_id  = $_POST['stream'];
				$commonPartOfSql = FFDB::conn()->parse("`stream_id`=?i AND `creation_index` <= ?i", $stream_id, $this->decodeHash($hash));
				$additionalPartOfSql = FFDB::conn()->parse("`post_status` = 'new'");
				$status = $action == 'new_posts_approve' ? 'approved' : 'disapproved';
				$this->db->setPostStatus($status, FFDB::conn()->parse('WHERE ?p AND ?p', $commonPartOfSql, $additionalPartOfSql));
				if (isset($_POST['changed'])){
					foreach ( $_POST['changed'] as $id => $item ) {
						$status = ($item['approved'] === "true") ? 'approved' : 'disapproved';
						$additionalPartOfSql = FFDB::conn()->parse("`post_id` = ?s", $id);
						$this->db->setPostStatus($status, FFDB::conn()->parse('WHERE ?p AND ?p', $commonPartOfSql, $additionalPartOfSql));
					}
				}
				FFDB::commit();
			}
			FFDB::rollbackAndClose();
			die();
		} catch (Exception $e){
			FFDB::rollbackAndClose();
			die($e->getMessage());
		}
	}

	protected function getGetFields() {
		$select = parent::getGetFields();
		$select .= ', post.post_status';
		return $select;
	}

	protected function getGetFilters() {
		$args = parent::getGetFilters();
		$args[] = FFDB::conn()->parse('post.post_status != ?s', 'new');
		return $args;
	}

	protected function buildPost( $row ) {
		$post = parent::buildPost( $row );
		$post->status = $row['post_status'];
		return $post;
	}

	protected function getOnlyNew() {
		$result = parent::getOnlyNew();
		$filters = parent::getGetFilters();
		$filters[] = FFDB::conn()->parse('post.post_status = ?s', 'new');
		$resultFromDB = $this->db->getPostsIf2($this->getGetFields(), implode(' AND ', $filters));
		if (false === $resultFromDB) $resultFromDB = array();
		foreach ( $resultFromDB as $row ) {
			$result[] = $this->buildPost($row);
		}
		return $result;
	}
}