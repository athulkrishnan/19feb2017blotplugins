<?php namespace flow;
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
class FlowFlowWPWidget extends \WP_Widget{

	function __construct() {
		parent::__construct( 'ff_widget', 'Flow-Flow Widget',
			array( 'description' => 'Place your social stream' ) // Args
		);
	}

	public function widget( $args, $instance ) {
		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ). $args['after_title'];
		}
		$nst = FlowFlow::get_instance_by_slug('flow-flow');
		echo $nst->renderShortCode(array('id' => $instance['streamId']));
		echo $args['after_widget'];
	}

	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : 'New title';

		/** @var FlowFlow $nst */
		$nst = FlowFlow::get_instance_by_slug('flow-flow');
		$streams = $nst->db->streams();
		$value = '';
		if (sizeof($streams) > 0){
			$streamId = ! empty( $instance['streamId'] ) ? esc_attr($instance['streamId']) : $streams[0]['id'];
			foreach ( $streams as $stream ) {
				$streamName = 'Stream #' . $stream['id'] . ( $stream['name'] ? ' - ' . $stream['name'] : '');
				$selected = ($streamId == $stream['id']) ? ' selected' : '';
				$value .= "<option value='{$stream['id']}'{$selected}>{$streamName}</option>\n";
			}
		}

		?>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'streamId' ); ?>"><?php _e( 'Stream:' ); ?></label>
			<select class="widefat" id="<?php echo $this->get_field_id( 'streamId' ); ?>" name="<?php echo $this->get_field_name( 'streamId' ); ?>">
				<?php echo $value; ?>
			</select>
		</p>
	<?php
	}

	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
		$instance['streamId'] = ( ! empty( $new_instance['streamId'] ) ) ? strip_tags( $new_instance['streamId'] ) : '1';

		return $instance;
	}
}