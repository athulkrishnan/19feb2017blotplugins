<?php
if( is_admin() ) {

	/* Start of: WordPress Administration */

	function woo_ce_get_export_type_subscription_count( $count = 0, $export_type = '', $args ) {

		if( $export_type <> 'subscription' )
			return $count;

		$count = 0;
		// Check that WooCommerce Subscriptions exists
		if( class_exists( 'WC_Subscriptions' ) ) {
			$count = woo_ce_get_subscription_count();
		}
		return $count;

	}
	add_filter( 'woo_ce_get_export_type_count', 'woo_ce_get_export_type_subscription_count', 10, 3 );

	function woo_ce_get_subscription_count() {

		$count = 0;
		// Check if the existing Transient exists
		$cached = get_transient( WOO_CE_PREFIX . '_subscription_count' );
		if( $cached == false ) {
			$wcs_version = woo_ce_get_wc_subscriptions_version();
			if( version_compare( $wcs_version, '2.0.1', '<' ) ) {
				if( method_exists( 'WC_Subscriptions', 'is_large_site' ) ) {
					// Does this store have roughly more than 3000 Subscriptions
					if( false === WC_Subscriptions::is_large_site() ) {
						if( class_exists( 'WC_Subscriptions_Manager' ) ) {
							// Check that the get_all_users_subscriptions() function exists
							if( method_exists( 'WC_Subscriptions_Manager', 'get_all_users_subscriptions' ) ) {
								if( $subscriptions = WC_Subscriptions_Manager::get_all_users_subscriptions() ) {
									if( version_compare( $wcs_version, '2.0.1', '<' ) ) {
										foreach( $subscriptions as $key => $user_subscription ) {
											if( !empty( $user_subscription ) ) {
												foreach( $user_subscription as $subscription )
													$count++;
											}
										}
										unset( $subscriptions, $subscription, $user_subscription );
									}
								}
							}
						}
					} else {
						if( method_exists( 'WC_Subscriptions', 'get_total_subscription_count' ) )
							$count = WC_Subscriptions::get_total_subscription_count();
						else
							$count = "~2500";
					}
				} else {
					if( method_exists( 'WC_Subscriptions', 'get_subscription_count' ) )
						$count = WC_Subscriptions::get_subscription_count();
				}
			} else {
				if( function_exists( 'wcs_get_subscriptions' ) ) {
					$args = array(
						'subscriptions_per_page' => -1,
						'subscription_status' => 'trash'
					);
					$count += count( wcs_get_subscriptions( $args ) );
					$args['subscription_status'] = 'any';
					$count += count( wcs_get_subscriptions( $args ) );
				}
			}
			set_transient( WOO_CE_PREFIX . '_subscription_count', $count, HOUR_IN_SECONDS );
		} else {
			$count = $cached;
		}
		return $count;

	}

	// HTML template for disabled Filter Subscriptions by Subscription Status widget on Store Exporter screen
	function woo_ce_subscriptions_filter_by_subscription_status() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$subscription_statuses = woo_ce_get_subscription_statuses();

		ob_start(); ?>
<p><label><input type="checkbox" id="subscriptions-filters-status" /> <?php _e( 'Filter Subscriptions by Subscription Status', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-subscriptions-filters-status" class="separator">
	<ul>
		<li>
<?php if( !empty( $subscription_statuses ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Subscription Status...', 'woocommerce-exporter' ); ?>" name="subscription_filter_status[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $subscription_statuses as $key => $subscription_status ) { ?>
				<option value="<?php echo $key; ?>"><?php echo $subscription_status; ?></option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Subscription Status\'s have been found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Subscription Status options you want to filter exported Subscriptions by. Default is to include all Subscription Status options.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-subscriptions-filters-status -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Subscriptions by Subscription Product widget on Store Exporter screen
	function woo_ce_subscriptions_filter_by_subscription_product() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$products = woo_ce_get_subscription_products();

		ob_start(); ?>
<p><label><input type="checkbox" id="subscriptions-filters-product" /> <?php _e( 'Filter Subscriptions by Subscription Product', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-subscriptions-filters-product" class="separator">
	<ul>
		<li>
<?php if( !empty( $products ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Subscription Product...', 'woocommerce-exporter' ); ?>" name="subscription_filter_product[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $products as $product ) { ?>
				<option value="<?php echo $product; ?>"><?php echo get_the_title( $product ); ?> (<?php printf( __( 'SKU: %s', 'woocommerce-exporter' ), get_post_meta( $product, '_sku', true ) ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Subscription Products were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Subscription Product you want to filter exported Subscriptions by. Default is to include all Subscription Products.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-subscriptions-filters-status -->
<?php
		ob_end_flush();

	}


	/* End of: WordPress Administration */

}

function woo_ce_get_subscription_fields( $format = 'full' ) {

	$export_type = 'subscription';

	$fields = array();
	$fields[] = array(
		'name' => 'key',
		'label' => __( 'Subscription Key', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'status',
		'label' => __( 'Subscription Status', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'name',
		'label' => __( 'Subscription Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'user',
		'label' => __( 'User', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'user_id',
		'label' => __( 'User ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'email',
		'label' => __( 'E-mail Address', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_id',
		'label' => __( 'Order ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_status',
		'label' => __( 'Order Status', 'woocommerce-exporter' )
	);
	// Check if this is a pre-WooCommerce 2.2 instance
	$woocommerce_version = woo_get_woo_version();
	if( version_compare( $woocommerce_version, '2.2', '<' ) ) {
		$fields[] = array(
			'name' => 'post_status',
			'label' => __( 'Post Status', 'woocommerce-exporter' )
		);
	}
	$fields[] = array(
		'name' => 'start_date',
		'label' => __( 'Start Date', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'expiration',
		'label' => __( 'Expiration', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'end_date',
		'label' => __( 'End Date', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'trial_end_date',
		'label' => __( 'Trial End Date', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'last_payment',
		'label' => __( 'Last Payment', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'next_payment',
		'label' => __( 'Next Payment', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'renewals',
		'label' => __( 'Renewals', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'product_id',
		'label' => __( 'Product ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'product_sku',
		'label' => __( 'Product SKU', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'variation_id',
		'label' => __( 'Variation ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'coupon',
		'label' => __( 'Coupon Code', 'woocommerce-exporter' )
	);
/*
	$fields[] = array(
		'name' => '',
		'label' => __( '', 'woocommerce-exporter' )
	);
*/

	// Allow Plugin/Theme authors to add support for additional columns
	$fields = apply_filters( 'woo_ce_' . $export_type . '_fields', $fields, $export_type );

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

function woo_ce_get_subscription_statuses() {

	$subscription_statuses = array(
		'active'    => __( 'Active', 'woocommerce-subscriptions' ),
		'cancelled' => __( 'Cancelled', 'woocommerce-subscriptions' ),
		'expired'   => __( 'Expired', 'woocommerce-subscriptions' ),
		'pending'   => __( 'Pending', 'woocommerce-subscriptions' ),
		'failed'   => __( 'Failed', 'woocommerce-subscriptions' ),
		'on-hold'   => __( 'On-hold', 'woocommerce-subscriptions' ),
		'trash'     => __( 'Deleted', 'woocommerce-exporter' ),
	);
	return apply_filters( 'woo_ce_subscription_statuses', $subscription_statuses );

}

function woo_ce_get_wc_subscriptions_version() {

	if( class_exists( 'WC_Subscriptions' ) ) {
		return WC_Subscriptions::$version;
	}

}

function woo_ce_get_subscription_products() {

	$term_taxonomy = 'product_type';
	$args = array(
		'post_type' => array( 'product', 'product_variation' ),
		'posts_per_page' => -1,
		'fields' => 'ids',
		'suppress_filters' => false,
		'tax_query' => array(
			array(
				'taxonomy' => $term_taxonomy,
				'field' => 'slug',
				'terms' => array( 'subscription', 'variable-subscription' )
			)
		)
	);
	$products = array();
	$product_ids = new WP_Query( $args );
	if( $product_ids->posts ) {
		foreach( $product_ids->posts as $product_id )
			$products[] = $product_id;
	}
	return $products;

}
?>