<?php
if( is_admin() ) {

	/* Start of: WordPress Administration */

	function woo_ce_get_export_type_coupon_count() {

		$count = 0;
		// Check if the existing Transient exists
		$cached = get_transient( WOO_CE_PREFIX . '_coupon_count' );
		if( $cached == false ) {
			$post_type = 'shop_coupon';
			if( post_type_exists( $post_type ) )
				$count = wp_count_posts( $post_type );
			set_transient( WOO_CE_PREFIX . '_coupon_count', $count, HOUR_IN_SECONDS );
		} else {
			$count = $cached;
		}
		return $count;

	}

	// HTML template for disabled Coupon Sorting widget on Store Exporter screen
	function woo_ce_coupon_sorting() {

		ob_start(); ?>
<p><label><?php _e( 'Coupon Sorting', 'woocommerce-exporter' ); ?></label></p>
<div>
	<select name="coupon_orderby" disabled="disabled">
		<option value="ID"><?php _e( 'Coupon ID', 'woocommerce-exporter' ); ?></option>
		<option value="title"><?php _e( 'Coupon Code', 'woocommerce-exporter' ); ?></option>
		<option value="date"><?php _e( 'Date Created', 'woocommerce-exporter' ); ?></option>
		<option value="modified"><?php _e( 'Date Modified', 'woocommerce-exporter' ); ?></option>
		<option value="rand"><?php _e( 'Random', 'woocommerce-exporter' ); ?></option>
	</select>
	<select name="coupon_order" disabled="disabled">
		<option value="ASC"><?php _e( 'Ascending', 'woocommerce-exporter' ); ?></option>
		<option value="DESC"><?php _e( 'Descending', 'woocommerce-exporter' ); ?></option>
	</select>
	<p class="description"><?php _e( 'Select the sorting of Coupons within the exported file. By default this is set to export Coupons by Coupon ID in Desending order.', 'woocommerce-exporter' ); ?></p>
</div>
<?php
		ob_end_flush();

	}

	/* End of: WordPress Administration */

}

// Returns a list of Coupon export columns
function woo_ce_get_coupon_fields( $format = 'full' ) {

	$export_type = 'coupon';

	$fields = array();
	$fields[] = array(
		'name' => 'coupon_code',
		'label' => __( 'Coupon Code', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'coupon_description',
		'label' => __( 'Coupon Description', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'discount_type',
		'label' => __( 'Discount Type', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'coupon_amount',
		'label' => __( 'Coupon Amount', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'individual_use',
		'label' => __( 'Individual Use', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'apply_before_tax',
		'label' => __( 'Apply before tax', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'exclude_sale_items',
		'label' => __( 'Exclude sale items', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'minimum_amount',
		'label' => __( 'Minimum Amount', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'product_ids',
		'label' => __( 'Products', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'exclude_product_ids',
		'label' => __( 'Exclude Products', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'product_categories',
		'label' => __( 'Product Categories', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'exclude_product_categories',
		'label' => __( 'Exclude Product Categories', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'customer_email',
		'label' => __( 'Customer e-mails', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'usage_limit',
		'label' => __( 'Usage Limit', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'expiry_date',
		'label' => __( 'Expiry Date', 'woocommerce-exporter' )
	);

/*
	$fields[] = array(
		'name' => '',
		'label' => __( '', 'woocommerce-exporter' )
	);
*/

	// Drop in our content filters here
	add_filter( 'sanitize_key', 'woo_ce_sanitize_key' );

	// Allow Plugin/Theme authors to add support for additional columns
	$fields = apply_filters( 'woo_ce_' . $export_type . '_fields', $fields, $export_type );

	// Remove our content filters here to play nice with other Plugins
	remove_filter( 'sanitize_key', 'woo_ce_sanitize_key' );

	switch( $format ) {

		case 'summary':
			$output = array();
			$size = count( $fields );
			for( $i = 0; $i < $size; $i++ ) {
				if( isset( $fields[$i] ) )
					$output[$fields[$i]['name']] = 'on';
			}
			return $output;
			break;

		case 'full':
		default:
			$sorting = woo_ce_get_option( $export_type . '_sorting', array() );
			$size = count( $fields );
			for( $i = 0; $i < $size; $i++ ) {
				$fields[$i]['reset'] = $i;
				$fields[$i]['order'] = ( isset( $sorting[$fields[$i]['name']] ) ? $sorting[$fields[$i]['name']] : $i );
			}
			// Check if we are using PHP 5.3 and above
			if( version_compare( phpversion(), '5.3' ) >= 0 )
				usort( $fields, woo_ce_sort_fields( 'order' ) );
			return $fields;
			break;

	}

}

function woo_ce_override_coupon_field_labels( $fields = array() ) {

	$labels = woo_ce_get_option( 'coupon_labels', array() );
	if( !empty( $labels ) ) {
		foreach( $fields as $key => $field ) {
			if( isset( $labels[$field['name']] ) )
				$fields[$key]['label'] = $labels[$field['name']];
		}
	}
	return $fields;

}
add_filter( 'woo_ce_coupon_fields', 'woo_ce_override_coupon_field_labels', 11 );

// Returns a list of Coupon IDs
function woo_ce_get_coupons( $args = array() ) {

	global $export;

	$limit_volume = -1;
	$offset = 0;

	if( $args ) {
		$limit_volume = ( isset( $args['limit_volume'] ) ? $args['limit_volume'] : false );
		$offset = ( isset( $args['offset'] ) ? $args['offset'] : false );
		$orderby = ( isset( $args['coupon_orderby'] ) ? $args['coupon_orderby'] : 'ID' );
		$order = ( isset( $args['coupon_order'] ) ? $args['coupon_order'] : 'ASC' );
	}

	$post_type = 'shop_coupon';
	$args = array(
		'post_type' => $post_type,
		'orderby' => $orderby,
		'order' => $order,
		'offset' => $offset,
		'posts_per_page' => $limit_volume,
		'post_status' => woo_ce_post_statuses(),
		'fields' => 'ids',
		'suppress_filters' => false
	);
	$coupons = array();
	$coupon_ids = new WP_Query( $args );
	if( $coupon_ids->posts ) {
		foreach( $coupon_ids->posts as $coupon_id )
			$coupons[] = $coupon_id;
		unset( $coupon_ids, $coupon_id );
	}
	return $coupons;

}

function woo_ce_get_coupon_code_usage( $coupon_code = '' ) {

	global $wpdb;

	$count = 0;
	if( $coupon_code ) {
		$order_item_type = 'coupon';
		$count_sql = $wpdb->prepare( "SELECT COUNT('order_item_id') FROM `" . $wpdb->prefix . "woocommerce_order_items` WHERE `order_item_type` = %s AND `order_item_name` = %s", $order_item_type, $coupon_code );
		$count = $wpdb->get_var( $count_sql );
	}
	return $count;

}
?>