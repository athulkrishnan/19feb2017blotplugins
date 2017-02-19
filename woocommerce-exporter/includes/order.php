<?php
if( is_admin() ) {

	/* Start of: WordPress Administration */

	function woo_ce_get_export_type_order_count() {

		$count = 0;
		// Check if the existing Transient exists
		$cached = get_transient( WOO_CE_PREFIX . '_order_count' );
		if( $cached == false ) {
			$post_type = 'shop_order';
			$woocommerce_version = woo_get_woo_version();
			// Check if this is a WooCommerce 2.2+ instance (new Post Status)
			if( version_compare( $woocommerce_version, '2.2' ) >= 0 )
				$post_status = ( function_exists( 'wc_get_order_statuses' ) ? apply_filters( 'woo_ce_order_post_status', array_keys( wc_get_order_statuses() ) ) : 'any' );
			else
				$post_status = apply_filters( 'woo_ce_order_post_status', woo_ce_post_statuses() );
			$args = array(
				'post_type' => $post_type,
				'posts_per_page' => 1,
				'post_status' => $post_status,
				'fields' => 'ids'
			);
			$count_query = new WP_Query( $args );
			$count = $count_query->found_posts;
			set_transient( WOO_CE_PREFIX . '_order_count', $count, HOUR_IN_SECONDS );
		} else {
			$count = $cached;
		}
		return $count;

	}

	// HTML template for disabled Filter Orders by Order Date widget on Store Exporter screen
	function woo_ce_orders_filter_by_date() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$today = date( 'l' );
		$yesterday = date( 'l', strtotime( '-1 days' ) );
		$current_month = date( 'F' );
		$last_month = date( 'F', mktime( 0, 0, 0, date( 'n' )-1, 1, date( 'Y' ) ) );
		$order_dates_variable = '-';
		$order_dates_variable_length = '';
		$order_dates_from = '-';
		$order_dates_to = '-';

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-date" /> <?php _e( 'Filter Orders by Order Date', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-date" class="separator">
	<ul>
		<li>
			<label><input type="radio" name="order_dates_filter" value="today" disabled="disabled" /> <?php _e( 'Today', 'woocommerce-exporter' ); ?> (<?php echo $today; ?>)</label>
		</li>
		<li>
			<label><input type="radio" name="order_dates_filter" value="yesterday" disabled="disabled" /> <?php _e( 'Yesterday', 'woocommerce-exporter' ); ?> (<?php echo $yesterday; ?>)</label>
		</li>
		<li>
			<label><input type="radio" name="order_dates_filter" value="current_week" disabled="disabled" /> <?php _e( 'Current week', 'woocommerce-exporter' ); ?></label>
		</li>
		<li>
			<label><input type="radio" name="order_dates_filter" value="last_week" disabled="disabled" /> <?php _e( 'Last week', 'woocommerce-exporter' ); ?></label>
		</li>
		<li>
			<label><input type="radio" name="order_dates_filter" value="current_month" disabled="disabled" /> <?php _e( 'Current month', 'woocommerce-exporter' ); ?> (<?php echo $current_month; ?>)</label>
		</li>
		<li>
			<label><input type="radio" name="order_dates_filter" value="last_month" disabled="disabled" /> <?php _e( 'Last month', 'woocommerce-exporter' ); ?> (<?php echo $last_month; ?>)</label>
		</li>
<!--
		<li>
			<label><input type="radio" name="order_dates_filter" value="last_quarter" disabled="disabled" /> <?php _e( 'Last quarter', 'woocommerce-exporter' ); ?> (Nov. - Jan.)</label>
		</li>
-->
		<li>
			<label><input type="radio" name="order_dates_filter" value="variable" disabled="disabled" /> <?php _e( 'Variable date', 'woocommerce-exporter' ); ?></label>
			<div style="margin-top:0.2em;">
				<?php _e( 'Last', 'woocommerce-exporter' ); ?>
				<input type="text" name="order_dates_filter_variable" class="text code" size="4" maxlength="4" value="<?php echo $order_dates_variable; ?>" disabled="disabled" />
				<select name="order_dates_filter_variable_length" style="vertical-align:top;">
					<option value="">&nbsp;</option>
					<option value="second" disabled="disabled"><?php _e( 'second(s)', 'woocommerce-exporter' ); ?></option>
					<option value="minute" disabled="disabled"><?php _e( 'minute(s)', 'woocommerce-exporter' ); ?></option>
					<option value="hour" disabled="disabled"><?php _e( 'hour(s)', 'woocommerce-exporter' ); ?></option>
					<option value="day" disabled="disabled"><?php _e( 'day(s)', 'woocommerce-exporter' ); ?></option>
					<option value="week" disabled="disabled"><?php _e( 'week(s)', 'woocommerce-exporter' ); ?></option>
					<option value="month" disabled="disabled"><?php _e( 'month(s)', 'woocommerce-exporter' ); ?></option>
					<option value="year" disabled="disabled"><?php _e( 'year(s)', 'woocommerce-exporter' ); ?></option>
				</select>
			</div>
		</li>
		<li>
			<label><input type="radio" name="order_dates_filter" value="manual" disabled="disabled" /> <?php _e( 'Fixed date', 'woocommerce-exporter' ); ?></label>
			<div style="margin-top:0.2em;">
				<input type="text" size="10" maxlength="10" id="order_dates_from" name="order_dates_from" value="<?php echo esc_attr( $order_dates_from ); ?>" class="text" disabled="disabled" /> to <input type="text" size="10" maxlength="10" id="order_dates_to" name="order_dates_to" value="<?php echo esc_attr( $order_dates_to ); ?>" class="text" disabled="disabled" />
				<p class="description"><?php _e( 'Filter the dates of Orders to be included in the export. Default is the date of the first order to today.', 'woocommerce-exporter' ); ?></p>
			</div>
		</li>
	</ul>
</div>
<!-- #export-orders-filters-date -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Customer widget on Store Exporter screen
	function woo_ce_orders_filter_by_customer() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-customer" /> <?php _e( 'Filter Orders by Customer', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-customer" class="separator">
	<ul>
		<li>
			<select id="order_customer" name="order_filter_customer" class="chzn-select">
				<option value=""><?php _e( 'Show all customers', 'woocommerce-exporter' ); ?></option>
			</select>
		</li>
	</ul>
	<p class="description"><?php _e( 'Filter Orders by Customer (unique e-mail address) to be included in the export. Default is to include all Orders.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-customer -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Billing Country widget on Store Exporter screen
	function woo_ce_orders_filter_by_billing_country() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$countries = woo_ce_allowed_countries();

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-billing_country" /> <?php _e( 'Filter Orders by Billing Country', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-billing_country" class="separator">
	<ul>
		<li>
<?php if( !empty( $countries ) ) { ?>
			<select id="order_billing_country" name="order_filter_billing_country" class="chzn-select">
				<option value="" disabled="disabled"><?php _e( 'Show all Countries', 'woocommerce-exporter' ); ?></option>
	<?php if( $countries ) { ?>
		<?php foreach( $countries as $country_prefix => $country ) { ?>
				<option value="<?php echo $country_prefix; ?>" disabled="disabled"><?php printf( '%s (%s)', $country, $country_prefix ); ?></option>
		<?php } ?>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Countries were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Filter Orders by Billing Country to be included in the export. Default is to include all Countries.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-customer -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Shipping Country widget on Store Exporter screen
	function woo_ce_orders_filter_by_shipping_country() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$countries = woo_ce_allowed_countries();

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-shipping_country" /> <?php _e( 'Filter Orders by Shipping Country', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-shipping_country" class="separator">
	<ul>
		<li>
<?php if( !empty( $countries ) ) { ?>
			<select id="order_shipping_country" name="order_filter_shipping_country" class="chzn-select">
				<option value="" disabled="disabled"><?php _e( 'Show all Countries', 'woocommerce-exporter' ); ?></option>
	<?php foreach( $countries as $country_prefix => $country ) { ?>
				<option value="<?php echo $country_prefix; ?>" disabled="disabled"><?php printf( '%s (%s)', $country, $country_prefix ); ?></option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Countries were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Filter Orders by Shipping Country to be included in the export. Default is to include all Countries.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-customer -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by User Role widget on Store Exporter screen
	function woo_ce_orders_filter_by_user_role() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$user_roles = woo_ce_get_user_roles();

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-user_role" /> <?php _e( 'Filter Orders by User Role', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-user_role" class="separator">
	<ul>
		<li>
<?php if( !empty( $user_roles ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a User Role...', 'woocommerce-exporter' ); ?>" name="order_filter_user_role[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $user_roles as $key => $user_role ) { ?>
				<option value="<?php echo $key; ?>"><?php echo ucfirst( $user_role['name'] ); ?></option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No User Roles were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the User Roles you want to filter exported Orders by. Default is to include all User Role options.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-user_role -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Order ID widget on Store Exporter screen
	function woo_ce_orders_filter_by_order_id() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-id" /> <?php _e( 'Filter Orders by Order ID', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-id" class="separator">
	<ul>
		<li>
			<label for="order_filter_id"><?php _e( 'Order ID', 'woocommerce-exporter' ); ?></label>:<br />
			<input type="text" id="order_filter_id" name="order_filter_id" value="-" class="text code" disabled="disabled" />
		</li>
	</ul>
	<p class="description"><?php _e( 'Enter the Order ID\'s you want to filter exported Orders by. Multiple Order ID\'s can be entered separated by the \',\' (comma) character. Default is to include all Orders.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-user_role -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Coupon Code widget on Store Exporter screen
	function woo_ce_orders_filter_by_coupon() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$args = array(
			'coupon_orderby' => 'ID',
			'coupon_order' => 'DESC'
		);
		$coupons = woo_ce_get_coupons( $args );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-coupon" /> <?php _e( 'Filter Orders by Coupon Code', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-coupon" class="separator">
	<ul>
		<li>
<?php if( !empty( $coupons ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Coupon...', 'woocommerce-exporter' ); ?>" name="order_filter_coupon[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $coupons as $coupon ) { ?>
				<option value="<?php echo $coupon; ?>"><?php echo get_the_title( $coupon ); ?> (<?php echo woo_ce_get_coupon_code_usage( get_the_title( $coupon ) ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Coupons were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Coupon Codes you want to filter exported Orders by. Default is to include all Orders with and without assigned Coupon Codes.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-coupon -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Payment Gateway widget on Store Exporter screen
	function woo_ce_orders_filter_by_payment_gateway() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-payment_gateway" /> <?php _e( 'Filter Orders by Payment Gateway', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-payment_gateway" class="separator">
	<ul>
		<li>
			<select id="order_payment_gateway" name="order_payment_gateway" disabled="disabled">
				<option value=""><?php _e( 'Show all payment gateways', 'woocommerce-exporter' ); ?></option>
			</select>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Payment Gateways you want to filter exported Orders by. Default is to include all Orders.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-coupon -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Payment Gateway widget on Store Exporter screen
	function woo_ce_orders_filter_by_shipping_method() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-shipping_method" /> <?php _e( 'Filter Orders by Shipping Method', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-shipping_method" class="separator">
	<ul>
		<li>
			<select id="order_shipping_method" name="order_shipping_method" disabled="disabled">
				<option value=""><?php _e( 'Show all shipping methods', 'woocommerce-exporter' ); ?></option>
			</select>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Shipping Methods you want to filter exported Orders by. Default is to include all Orders.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-coupon -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Order Items Formatting on Store Exporter screen
	function woo_ce_orders_items_formatting() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		ob_start(); ?>
<tr class="export-options order-options">
	<th><label for="order_items"><?php _e( 'Order items formatting', 'woocommerce-exporter' ); ?></label></th>
	<td>
		<ul>
			<li>
				<label><input type="radio" name="order_items" value="combined" disabled="disabled" />&nbsp;<?php _e( 'Place Order Items within a grouped single Order row', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label>
				<p class="description"><?php _e( 'For example: <code>Order Items: SKU</code> cell might contain <code>SPECK-IPHONE|INCASE-NANO|-</code> for 3 Order items within an Order', 'woocommerce-exporter' ); ?></p>
			</li>
			<li>
				<label><input type="radio" name="order_items" value="unique" disabled="disabled" />&nbsp;<?php _e( 'Place Order Items on individual cells within a single Order row', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label>
				<p class="description"><?php _e( 'For example: <code>Order Items: SKU</code> would become <code>Order Item #1: SKU</code> with <codeSPECK-IPHONE</code> for the first Order item within an Order', 'woocommerce-exporter' ); ?></p>
				<p><strong><?php _e( 'Note', 'woocommerce-exporter' ); ?></strong>: <?php _e( 'Custom field labels set for Order export fields will not be applied when using this Order Item Formatting rule, if you need custom field labels use another formatting rule.', 'woocommerce-exporter' ); ?></p>
			</li>
			<li>
				<label><input type="radio" name="order_items" value="individual" disabled="disabled" />&nbsp;<?php _e( 'Place each Order Item within their own Order row', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label>
				<p class="description"><?php _e( 'For example: An Order with 3 Order items will display a single Order item on each row', 'woocommerce-exporter' ); ?></p>
			</li>
		</ul>
		<p class="description"><?php _e( 'Choose how you would like Order Items to be presented within Orders.', 'woocommerce-exporter' ); ?></p>
	</td>
</tr>
<?php
		ob_end_flush();

	}

	// HTML template for disabled Max Order Items widget on Store Exporter screen
	function woo_ce_orders_max_order_items() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$max_size = 10;

		ob_start(); ?>
<tr id="max_order_items_option" class="export-options order-options">
	<th>
		<label for="max_order_items"><?php _e( 'Max unique Order items', 'woocommerce-exporter' ); ?>: </label>
	</th>
	<td>
		<input type="text" id="max_order_items" name="max_order_items" size="3" class="text" value="<?php echo esc_attr( $max_size ); ?>" disabled="disabled" /><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span>
		<p class="description"><?php _e( 'Manage the number of Order Item colums displayed when the \'Place Order Items on individual cells within a single Order row\' Order items formatting option is selected.', 'woocommerce-exporter' ); ?></p>
	</td>
</tr>
<?php
		ob_end_flush();

	}

	// HTML template for disabled Order Items Types on Store Exporter screen
	function woo_ce_orders_items_types() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$types = woo_ce_get_order_items_types();
		$order_items_types = woo_ce_get_option( 'order_items_types', array() );
		// Default to Line Item
		if( empty( $order_items_types ) )
			$order_items_types = array( 'line_item' );

		ob_start(); ?>
<tr class="export-options order-options">
	<th><label><?php _e( 'Order item types', 'woocommerce-exporter' ); ?></label></th>
	<td>
		<ul>
<?php foreach( $types as $key => $type ) { ?>
			<li><label><input type="checkbox" name="order_items_types[<?php echo $key; ?>]" value="<?php echo $key; ?>" disabled="disabled" /> <?php echo ucfirst( $type ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></li>
<?php } ?>
		</ul>
		<p class="description"><?php _e( 'Choose what Order Item types are included within the Orders export. Default is to include all Order Item types.', 'woocommerce-exporter' ); ?></p>
	</td>
</tr>
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Order Status widget on Store Exporter screen
	function woo_ce_orders_filter_by_status() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$order_statuses = woo_ce_get_order_statuses();

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-status" /> <?php _e( 'Filter Orders by Order Status', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-status" class="separator">
	<ul>
		<li>
<?php if( !empty( $order_statuses ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Order Status...', 'woocommerce-exporter' ); ?>" name="order_filter_status[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $order_statuses as $order_status ) { ?>
				<option value="<?php echo $order_status->slug; ?>"><?php echo ucfirst( $order_status->name ); ?> (<?php echo $order_status->count; ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Order Status\'s were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Order Status you want to filter exported Orders by. Default is to include all Order Status options.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-status -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Product widget on Store Exporter screen
	function woo_ce_orders_filter_by_product() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$args = array(
			'hide_empty' => 1
		);
		$products = woo_ce_get_products( $args );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-product" /> <?php _e( 'Filter Orders by Product', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-product" class="separator">
	<ul>
		<li>
<?php if( !empty( $products ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product...', 'woocommerce-exporter' ); ?>" name="order_filter_product[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $products as $product ) { ?>
				<option value="<?php echo $product; ?>" disabled="disabled"><?php echo get_the_title( $product ); ?> (<?php printf( __( 'SKU: %s', 'woocommerce-exporter' ), get_post_meta( $product, '_sku', true ) ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Products were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Products you want to filter exported Orders by. Default is to include all Products.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-product -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Product Category widget on Store Exporter screen
	function woo_ce_orders_filter_by_product_category() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$args = array(
			'hide_empty' => 1
		);
		$product_categories = woo_ce_get_product_categories( $args );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-category" /> <?php _e( 'Filter Orders by Product Category', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-category" class="separator">
	<ul>
		<li>
<?php if( !empty( $product_categories ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product Category...', 'woocommerce-exporter' ); ?>" name="order_filter_category[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $product_categories as $product_category ) { ?>
				<option value="<?php echo $product_category->term_id; ?>"><?php echo woo_ce_format_product_category_label( $product_category->name, $product_category->parent_name ); ?> (<?php printf( __( 'Term ID: %d', 'woocommerce-exporter' ), $product_category->term_id ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Product Categories were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Product Categories you want to filter exported Orders by. Default is to include all Product Categories.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-category -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Product Tag widget on Store Exporter screen
	function woo_ce_orders_filter_by_product_tag() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$args = array(
			'hide_empty' => 1
		);
		$product_tags = woo_ce_get_product_tags( $args );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-tag" /> <?php _e( 'Filter Orders by Product Tag', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-tag" class="separator">
	<ul>
		<li>
<?php if( !empty( $product_tags ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product Tag...', 'woocommerce-exporter' ); ?>" name="order_filter_tag[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $product_tags as $product_tag ) { ?>
				<option value="<?php echo $product_tag->term_id; ?>"><?php echo $product_tag->name; ?> (<?php printf( __( 'Term ID: %d', 'woocommerce-exporter' ), $product_tag->term_id ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Product Tags were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Product Tags you want to filter exported Orders by. Default is to include all Product Tags.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-tag -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Orders by Brand widget on Store Exporter screen
	function woo_ce_orders_filter_by_product_brand() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		// WooCommerce Brands Addon - http://woothemes.com/woocommerce/
		// WooCommerce Brands - http://proword.net/Woocommerce_Brands/
		if( woo_ce_detect_product_brands() == false )
			return;

		$args = array(
			'hide_empty' => 1
		);
		$product_brands = woo_ce_get_product_brands( $args );

		ob_start(); ?>
<p><label><input type="checkbox" id="orders-filters-brand" /> <?php _e( 'Filter Orders by Product Brand', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-orders-filters-brand" class="separator">
	<ul>
		<li>
<?php if( !empty( $product_brands ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product Category...', 'woocommerce-exporter' ); ?>" name="order_filter_brand[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $product_brands as $product_brand ) { ?>
				<option value="<?php echo $product_brand->term_id; ?>"><?php echo woo_ce_format_product_category_label( $product_brand->name, $product_brand->parent_name ); ?> (<?php printf( __( 'Term ID: %d', 'woocommerce-exporter' ), $product_brand->term_id ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Product Brands were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Product Brands you want to filter exported Orders by. Default is to include all Product Brands.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-orders-filters-brand -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Order Sorting widget on Store Exporter screen
	function woo_ce_order_sorting() {

		ob_start(); ?>
<p><label><?php _e( 'Order Sorting', 'woocommerce-exporter' ); ?></label></p>
<div>
	<select name="order_orderby" disabled="disabled">
		<option value="ID"><?php _e( 'Order ID', 'woocommerce-exporter' ); ?></option>
		<option value="title"><?php _e( 'Order Name', 'woocommerce-exporter' ); ?></option>
		<option value="date"><?php _e( 'Date Created', 'woocommerce-exporter' ); ?></option>
		<option value="modified"><?php _e( 'Date Modified', 'woocommerce-exporter' ); ?></option>
		<option value="rand"><?php _e( 'Random', 'woocommerce-exporter' ); ?></option>
	</select>
	<select name="order_order" disabled="disabled">
		<option value="ASC"><?php _e( 'Ascending', 'woocommerce-exporter' ); ?></option>
		<option value="DESC"><?php _e( 'Descending', 'woocommerce-exporter' ); ?></option>
	</select>
	<p class="description"><?php _e( 'Select the sorting of Orders within the exported file. By default this is set to export Orders by Order ID in Desending order.', 'woocommerce-exporter' ); ?></p>
</div>
<?php
		ob_end_flush();

	}

	// HTML template for disabled Custom Orders widget on Store Exporter screen
	function woo_ce_orders_custom_fields() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$custom_orders = '-';
		$custom_order_items = '-';

		$troubleshooting_url = 'http://www.visser.com.au/documentation/store-exporter-deluxe/usage/';

		ob_start(); ?>
<form method="post" id="export-orders-custom-fields" class="export-options order-options">
	<div id="poststuff">

		<div class="postbox" id="export-options">
			<h3 class="hndle"><?php _e( 'Custom Order Fields', 'woocommerce-exporter' ); ?></h3>
			<div class="inside">
				<p class="description"><?php _e( 'To include additional custom Order and Order Item meta in the Export Orders table above fill the Orders and Order Items text box then click Save Custom Fields.', 'woocommerce-exporter' ); ?></p>
				<table class="form-table">

					<tr>
						<th>
							<label><?php _e( 'Order meta', 'woocommerce-exporter' ); ?></label>
						</th>
						<td>
							<textarea name="custom_orders" rows="5" cols="70" disabled="disabled"><?php echo esc_textarea( $custom_orders ); ?></textarea>
							<span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span>
							<p class="description"><?php _e( 'Include additional custom Order meta in your export file by adding each custom Order meta name to a new line above.<br />For example: <code>Customer UA, Customer IP Address</code>', 'woocommerce-exporter' ); ?></p>
						</td>
					</tr>

					<tr>
						<th>
							<label><?php _e( 'Order Item meta', 'woocommerce-exporter' ); ?></label>
						</th>
						<td>
							<textarea name="custom_order_items" rows="5" cols="70" disabled="disabled"><?php echo esc_textarea( $custom_order_items ); ?></textarea>
							<span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span>
							<p class="description"><?php _e( 'Include additional custom Order Item meta in your export file by adding each custom Order Item meta name to a new line above.<br />For example: <code>Personalized Message</code>.', 'woocommerce-exporter' ); ?></p>
						</td>
					</tr>

				</table>
				<p class="submit">
					<input type="button" class="button button-disabled" value="<?php _e( 'Save Custom Fields', 'woocommerce-exporter' ); ?>" />
				</p>
				<p class="description"><?php printf( __( 'For more information on custom Order and Order Item meta consult our <a href="%s" target="_blank">online documentation</a>.', 'woocommerce-exporter' ), $troubleshooting_url ); ?></p>
			</div>
			<!-- .inside -->
		</div>
		<!-- .postbox -->

	</div>
	<!-- #poststuff -->
	<input type="hidden" name="action" value="update" />
</form>
<!-- #export-orders-custom-fields -->
<?php
		ob_end_flush();

	}

	/* End of: WordPress Administration */

}

// Returns a list of Order export columns
function woo_ce_get_order_fields( $format = 'full' ) {

	$export_type = 'order';

	$fields = array();
	$fields[] = array(
		'name' => 'purchase_id',
		'label' => __( 'Order ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'post_id',
		'label' => __( 'Post ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'purchase_total',
		'label' => __( 'Order Total', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'purchase_subtotal',
		'label' => __( 'Order Subtotal', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_currency',
		'label' => __( 'Order Currency', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_discount',
		'label' => __( 'Order Discount', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'coupon_code',
		'label' => __( 'Coupon Code', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'purchase_total_tax',
		'label' => __( 'Order Total Tax', 'woocommerce-exporter' )
	);
/*
	$fields[] = array(
		'name' => 'order_incl_tax',
		'label' => __( 'Order Incl. Tax', 'woocommerce-exporter' )
	);
*/
	$fields[] = array(
		'name' => 'order_excl_tax',
		'label' => __( 'Order Subtotal Excl. Tax', 'woocommerce-exporter' )
	);
/*
	$fields[] = array(
		'name' => 'order_tax_rate',
		'label' => __( 'Order Tax Rate', 'woocommerce-exporter' )
	);
*/
	$fields[] = array(
		'name' => 'order_sales_tax',
		'label' => __( 'Sales Tax Total', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_shipping_tax',
		'label' => __( 'Shipping Tax Total', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_tax_percentage',
		'label' => __( 'Order Tax Percentage', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'payment_gateway_id',
		'label' => __( 'Payment Gateway ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'payment_gateway',
		'label' => __( 'Payment Gateway', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_method_id',
		'label' => __( 'Shipping Method ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_method',
		'label' => __( 'Shipping Method', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_cost',
		'label' => __( 'Shipping Cost', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_weight',
		'label' => __( 'Shipping Weight', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'payment_status',
		'label' => __( 'Order Status', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'post_status',
		'label' => __( 'Post Status', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_key',
		'label' => __( 'Order Key', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'purchase_date',
		'label' => __( 'Order Date', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'purchase_time',
		'label' => __( 'Order Time', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'customer_message',
		'label' => __( 'Customer Message', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'customer_note',
		'label' => __( 'Customer Note', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_notes',
		'label' => __( 'Order Notes', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'total_quantity',
		'label' => __( 'Total Quantity', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'total_order_items',
		'label' => __( 'Total Order Items', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'user_id',
		'label' => __( 'User ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'user_name',
		'label' => __( 'Username', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'user_role',
		'label' => __( 'User Role', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'ip_address',
		'label' => __( 'Checkout IP Address', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'browser_agent',
		'label' => __( 'Checkout Browser Agent', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_full_name',
		'label' => __( 'Billing: Full Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_first_name',
		'label' => __( 'Billing: First Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_last_name',
		'label' => __( 'Billing: Last Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_company',
		'label' => __( 'Billing: Company', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_address',
		'label' => __( 'Billing: Street Address (Full)', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_address_1',
		'label' => __( 'Billing: Street Address 1', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_address_2',
		'label' => __( 'Billing: Street Address 2', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_city',
		'label' => __( 'Billing: City', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_postcode',
		'label' => __( 'Billing: ZIP Code', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_state',
		'label' => __( 'Billing: State (prefix)', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_state_full',
		'label' => __( 'Billing: State', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_country',
		'label' => __( 'Billing: Country (prefix)', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_country_full',
		'label' => __( 'Billing: Country', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_phone',
		'label' => __( 'Billing: Phone Number', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'billing_email',
		'label' => __( 'Billing: E-mail Address', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_full_name',
		'label' => __( 'Shipping: Full Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_first_name',
		'label' => __( 'Shipping: First Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_last_name',
		'label' => __( 'Shipping: Last Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_company',
		'label' => __( 'Shipping: Company', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_address',
		'label' => __( 'Shipping: Street Address (Full)', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_address_1',
		'label' => __( 'Shipping: Street Address 1', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_address_2',
		'label' => __( 'Shipping: Street Address 2', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_city',
		'label' => __( 'Shipping: City', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_postcode',
		'label' => __( 'Shipping: ZIP Code', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_state',
		'label' => __( 'Shipping: State (prefix)', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_state_full',
		'label' => __( 'Shipping: State', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_country',
		'label' => __( 'Shipping: Country (prefix)', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_country_full',
		'label' => __( 'Shipping: Country', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_product_id',
		'label' => __( 'Order Items: Product ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_variation_id',
		'label' => __( 'Order Items: Variation ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_sku',
		'label' => __( 'Order Items: SKU', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_name',
		'label' => __( 'Order Items: Product Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_variation',
		'label' => __( 'Order Items: Product Variation', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_description',
		'label' => __( 'Order Items: Product Description', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_excerpt',
		'label' => __( 'Order Items: Product Excerpt', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_tax_class',
		'label' => __( 'Order Items: Tax Class', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_quantity',
		'label' => __( 'Order Items: Quantity', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_total',
		'label' => __( 'Order Items: Total', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_subtotal',
		'label' => __( 'Order Items: Subtotal', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_rrp',
		'label' => __( 'Order Items: RRP', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_stock',
		'label' => __( 'Order Items: Stock', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_tax',
		'label' => __( 'Order Items: Tax', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_tax_subtotal',
		'label' => __( 'Order Items: Tax Subtotal', 'woocommerce-exporter' )
	);
	$tax_rates = woo_ce_get_order_tax_rates();
	if( !empty( $tax_rates ) ) {
		foreach( $tax_rates as $tax_rate ) {
			$fields[] = array(
				'name' => sprintf( 'order_items_tax_rate_%d', $tax_rate['rate_id'] ),
				'label' => sprintf( __( 'Order Items: Tax Rate - %s', 'woocommerce-exporter' ), $tax_rate['label'] )
			);
		}
	}
	unset( $tax_rates, $tax_rate );
	$fields[] = array(
		'name' => 'order_items_type',
		'label' => __( 'Order Items: Type', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_category',
		'label' => __( 'Order Items: Category', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_tag',
		'label' => __( 'Order Items: Tag', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_total_sales',
		'label' => __( 'Order Items: Total Sales', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_weight',
		'label' => __( 'Order Items: Weight', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'order_items_total_weight',
		'label' => __( 'Order Items: Total Weight', 'woocommerce-exporter' )
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

function woo_ce_override_order_field_labels( $fields = array() ) {

	$labels = woo_ce_get_option( 'order_labels', array() );
	if( !empty( $labels ) ) {
		foreach( $fields as $key => $field ) {
			if( isset( $labels[$field['name']] ) )
				$fields[$key]['label'] = $labels[$field['name']];
		}
	}
	return $fields;

}
add_filter( 'woo_ce_order_fields', 'woo_ce_override_order_field_labels', 11 );

// Adds custom Order and Order Item columns to the Order fields list
function woo_ce_extend_order_fields( $fields = array() ) {

	// Product Add-ons - http://www.woothemes.com/
	if( class_exists( 'Product_Addon_Admin' ) || class_exists( 'Product_Addon_Display' ) ) {
		$product_addons = woo_ce_get_product_addons();
		if( !empty( $product_addons ) ) {
			foreach( $product_addons as $product_addon ) {
				if( !empty( $product_addon ) ) {
					$fields[] = array(
						'name' => sprintf( 'order_items_product_addon_%s', $product_addon->post_name ),
						'label' => sprintf( __( 'Order Items: %s', 'woocommerce-exporter' ), ucfirst( $product_addon->post_title ) ),
						'hover' => sprintf( apply_filters( 'woo_ce_extend_order_fields_product_addons', '%s: %s' ), __( 'Product Add-ons', 'woocommerce-exporter' ), $product_addon->form_title )
					);
				}
			}
		}
		unset( $product_addons, $product_addon );
	}

	// WooCommerce Sequential Order Numbers - http://www.skyverge.com/blog/woocommerce-sequential-order-numbers/
	// Sequential Order Numbers Pro - http://www.woothemes.com/products/sequential-order-numbers-pro/
	if( class_exists( 'WC_Seq_Order_Number' ) || class_exists( 'WC_Seq_Order_Number_Pro' ) ) {
		$fields[] = array(
			'name' => 'order_number',
			'label' => __( 'Order Number', 'woocommerce-exporter' )
		);
	}

	// WooCommerce Print Invoice & Delivery Note - https://wordpress.org/plugins/woocommerce-delivery-notes/
	if( class_exists( 'WooCommerce_Delivery_Notes' ) ) {
		$fields[] = array(
			'name' => 'invoice_number',
			'label' => __( 'Invoice Number', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'invoice_date',
			'label' => __( 'Invoice Date', 'woocommerce-exporter' )
		);
	}

	// WooCommerce PDF Invoices & Packing Slips - http://www.wpovernight.com
	if( class_exists( 'WooCommerce_PDF_Invoices' ) ) {
		$fields[] = array(
			'name' => 'pdf_invoice_number',
			'label' => __( 'PDF Invoice Number', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'pdf_invoice_date',
			'label' => __( 'PDF Invoice Date', 'woocommerce-exporter' )
		);
	}

	// WooCommerce Checkout Manager - http://wordpress.org/plugins/woocommerce-checkout-manager/
	// WooCommerce Checkout Manager Pro - http://www.trottyzone.com/product/woocommerce-checkout-manager-pro
	if( function_exists( 'wccs_install' ) || function_exists( 'wccs_install_pro' ) ) {
		$options = get_option( 'wccs_settings' );
		if( isset( $options['buttons'] ) ) {
			$buttons = $options['buttons'];
			if( !empty( $buttons ) ) {
				$header = ( $buttons[0]['type'] == 'heading' ? $buttons[0]['label'] : false );
				foreach( $buttons as $button ) {
					if( $button['type'] == 'heading' )
						continue;
					$fields[] = array(
						'name' => $button['label'],
						'label' => ( !empty( $header ) ? sprintf( apply_filters( 'woo_ce_extend_order_fields_wccs', '%s: %s' ), ucfirst( $header ), ucfirst( $button['label'] ) ) : ucfirst( $button['label'] ) )
					);
				}
				unset( $buttons, $button, $header );
			}
		}
		unset( $options );
	}

	// Poor Guys Swiss Knife - http://wordpress.org/plugins/woocommerce-poor-guys-swiss-knife/
	if( function_exists( 'wcpgsk_init' ) ) {

		$options = get_option( 'wcpgsk_settings' );
		$billing_fields = ( isset( $options['woofields']['billing'] ) ? $options['woofields']['billing'] : array() );
		$shipping_fields = ( isset( $options['woofields']['shipping'] ) ? $options['woofields']['shipping'] : array() );

		// Custom billing fields
		if( !empty( $billing_fields ) ) {
			foreach( $billing_fields as $key => $billing_field ) {
				$fields[] = array(
					'name' => $key,
					'label' => $options['woofields']['label_' . $key]
				);
			}
			unset( $billing_fields, $billing_field );
		}

		// Custom shipping fields
		if( !empty( $shipping_fields ) ) {
			foreach( $shipping_fields as $key => $shipping_field ) {
				$fields[] = array(
					'name' => $key,
					'label' => $options['woofields']['label_' . $key]
				);
			}
			unset( $shipping_fields, $shipping_field );
		}

		unset( $options );
	}

	// Checkout Field Editor - http://woothemes.com/woocommerce/
	if( function_exists( 'woocommerce_init_checkout_field_editor' ) ) {
		$billing_fields = get_option( 'wc_fields_billing', array() );
		$shipping_fields = get_option( 'wc_fields_shipping', array() );
		$custom_fields = get_option( 'wc_fields_additional', array() );

		// Custom billing fields
		if( !empty( $billing_fields ) ) {
			foreach( $billing_fields as $key => $billing_field ) {
				// Only add non-default Checkout fields to export columns list
				if( isset( $billing_field['custom'] ) && $billing_field['custom'] == 1 ) {
					$fields[] = array(
						'name' => sprintf( 'wc_billing_%s', $key ),
						'label' => sprintf( __( 'Billing: %s', 'woocommerce-exporter' ), ucfirst( $billing_field['label'] ) )
					);
				}
			}
		}
		unset( $billing_fields, $billing_field );

		// Custom shipping fields
		if( !empty( $shipping_fields ) ) {
			foreach( $shipping_fields as $key => $shipping_field ) {
				// Only add non-default Checkout fields to export columns list
				if( isset( $shipping_field['custom'] ) && $shipping_field['custom'] == 1 ) {
					$fields[] = array(
						'name' => sprintf( 'wc_shipping_%s', $key ),
						'label' => sprintf( __( 'Shipping: %s', 'woocommerce-exporter' ), ucfirst( $shipping_field['label'] ) )
					);
				}
			}
		}
		unset( $shipping_fields, $shipping_field );

		// Custom fields
		if( !empty( $custom_fields ) ) {
			foreach( $custom_fields as $key => $custom_field ) {
				// Only add non-default Checkout fields to export columns list
				if( isset( $custom_field['custom'] ) && $custom_field['custom'] == 1 ) {
					$fields[] = array(
						'name' => sprintf( 'wc_additional_%s', $key ),
						'label' => sprintf( __( 'Additional: %s', 'woocommerce-exporter' ), ucfirst( $custom_field['label'] ) )
					);
				}
			}
		}
		unset( $custom_fields, $custom_field );
	}

	// Checkout Field Manager - http://61extensions.com
	if( function_exists( 'sod_woocommerce_checkout_manager_settings' ) ) {
		$billing_fields = get_option( 'woocommerce_checkout_billing_fields', array() );
		$shipping_fields = get_option( 'woocommerce_checkout_shipping_fields', array() );
		$custom_fields = get_option( 'woocommerce_checkout_additional_fields', array() );

		// Custom billing fields
		if( !empty( $billing_fields ) ) {
			foreach( $billing_fields as $key => $billing_field ) {
				// Only add non-default Checkout fields to export columns list
				if( strtolower( $billing_field['default_field'] ) != 'on' ) {
					$fields[] = array(
						'name' => sprintf( 'sod_billing_%s', $billing_field['name'] ),
						'label' => sprintf( __( 'Billing: %s', 'woocommerce-exporter' ), ucfirst( $billing_field['label'] ) )
					);
				}
			}
		}
		unset( $billing_fields, $billing_field );

		// Custom shipping fields
		if( !empty( $shipping_fields ) ) {
			foreach( $shipping_fields as $key => $shipping_field ) {
				// Only add non-default Checkout fields to export columns list
				if( strtolower( $shipping_field['default_field'] ) != 'on' ) {
					$fields[] = array(
						'name' => sprintf( 'sod_shipping_%s', $shipping_field['name'] ),
						'label' => sprintf( __( 'Shipping: %s', 'woocommerce-exporter' ), ucfirst( $shipping_field['label'] ) )
					);
				}
			}
		}
		unset( $shipping_fields, $shipping_field );

		// Custom fields
		if( !empty( $custom_fields ) ) {
			foreach( $custom_fields as $key => $custom_field ) {
				// Only add non-default Checkout fields to export columns list
				if( strtolower( $custom_field['default_field'] ) != 'on' ) {
					$fields[] = array(
						'name' => sprintf( 'sod_additional_%s', $custom_field['name'] ),
						'label' => sprintf( __( 'Additional: %s', 'woocommerce-exporter' ), ucfirst( $custom_field['label'] ) )
					);
				}
			}
		}
		unset( $custom_fields, $custom_field );
	}

	// WooCommerce Checkout Add-Ons - http://www.skyverge.com/product/woocommerce-checkout-add-ons/
	if( function_exists( 'init_woocommerce_checkout_add_ons' ) ) {
		$fields[] = array(
			'name' => 'order_items_checkout_addon_id',
			'label' => __( 'Order Items: Checkout Add-ons ID', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'order_items_checkout_addon_label',
			'label' => __( 'Order Items: Checkout Add-ons Label', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'order_items_checkout_addon_value',
			'label' => __( 'Order Items: Checkout Add-ons Value', 'woocommerce-exporter' )
		);
	}

	// WooCommerce Brands Addon - http://woothemes.com/woocommerce/
	// WooCommerce Brands - http://proword.net/Woocommerce_Brands/
	if( woo_ce_detect_product_brands() ) {
		$fields[] = array(
			'name' => 'order_items_brand',
			'label' => __( 'Order Items: Brand', 'woocommerce-exporter' )
		);
	}

	// Product Vendors - http://www.woothemes.com/products/product-vendors/
	if( class_exists( 'WooCommerce_Product_Vendors' ) ) {
		$fields[] = array(
			'name' => 'order_items_vendor',
			'label' => __( 'Order Items: Product Vendor', 'woocommerce-exporter' )
		);
	}

	// Cost of Goods - http://www.skyverge.com/product/woocommerce-cost-of-goods-tracking/
	if( class_exists( 'WC_COG' ) ) {
		$fields[] = array(
			'name' => 'cost_of_goods',
			'label' => __( 'Order Total Cost of Goods', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'order_items_cost_of_goods',
			'label' => __( 'Order Items: Cost of Goods', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'order_items_total_cost_of_goods',
			'label' => __( 'Order Items: Total Cost of Goods', 'woocommerce-exporter' )
		);
	}

	// WooCommerce MSRP Pricing - http://woothemes.com/woocommerce/
	if( function_exists( 'woocommerce_msrp_activate' ) ) {
		$fields[] = array(
			'name' => 'order_items_msrp',
			'label' => __( 'Order Items: MSRP', 'woocommerce-exporter' )
		);
	}

	// Local Pickup Plus - http://www.woothemes.com/products/local-pickup-plus/
	if( class_exists( 'WC_Local_Pickup_Plus' ) ) {
		$fields[] = array(
			'name' => 'order_items_pickup_location',
			'label' => __( 'Order Items: Pickup Location', 'woocommerce-exporter' )
		);
	}

	// WooCommerce Bookings - http://www.woothemes.com/products/woocommerce-bookings/
	if( class_exists( 'WC_Bookings' ) ) {
		$fields[] = array(
			'name' => 'order_items_booking_id',
			'label' => __( 'Order Items: Booking ID', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'order_items_booking_date',
			'label' => __( 'Order Items: Booking Date', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'order_items_booking_start_date',
			'label' => __( 'Order Items: Start Date', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'order_items_booking_end_date',
			'label' => __( 'Order Items: End Date', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' )
		);
	}

	// Gravity Forms - http://woothemes.com/woocommerce
	if( class_exists( 'RGForms' ) && class_exists( 'woocommerce_gravityforms' ) ) {
		// Check if there are any Products linked to Gravity Forms
		if( $gf_fields = woo_ce_get_gravity_form_fields() ) {
			$fields[] = array(
				'name' => 'order_items_gf_form_id',
				'label' => __( 'Order Items: Gravity Form ID', 'woocommerce-exporter' )
			);
			$fields[] = array(
				'name' => 'order_items_gf_form_label',
				'label' => __( 'Order Items: Gravity Form Label', 'woocommerce-exporter' )
			);
			foreach( $gf_fields as $gf_field ) {
				$gf_field_duplicate = false;
				// Check if this isn't a duplicate Gravity Forms field
				foreach( $fields as $field ) {
					if( isset( $field['name'] ) && $field['name'] == sprintf( 'order_items_gf_%d_%s', $gf_field['formId'], $gf_field['id'] ) ) {
						// Duplicate exists
						$gf_field_duplicate = true;
						break;
					}
				}
				// If it's not a duplicate go ahead and add it to the list
				if( $gf_field_duplicate !== true ) {
					$fields[] = array(
						'name' => sprintf( 'order_items_gf_%d_%s', $gf_field['formId'], $gf_field['id'] ),
						'label' => sprintf( apply_filters( 'woo_ce_extend_order_fields_gf_label', __( 'Order Items: %s - %s', 'woocommerce-exporter' ) ), ucwords( strtolower( $gf_field['formTitle'] ) ), ucfirst( strtolower( $gf_field['label'] ) ) ),
						'hover' => sprintf( apply_filters( 'woo_ce_extend_order_fields_gf_hover', '%s: %s (ID: %d)' ), __( 'Gravity Forms', 'woocommerce-exporter' ), ucwords( strtolower( $gf_field['formTitle'] ) ), $gf_field['formId'] )
					);
				}
			}
			unset( $gf_fields, $gf_field );
		}
	}

	// WooCommerce Currency Switcher - http://dev.pathtoenlightenment.net/shop
	if( class_exists( 'WC_Aelia_CurrencySwitcher' ) ) {
		$fields[] = array(
			'name' => 'order_currency',
			'label' => __( 'Order Currency', 'woocommerce-exporter' )
		);
	}

	// WooCommerce TM Extra Product Options - http://codecanyon.net/item/woocommerce-extra-product-options/7908619
	if( class_exists( 'TM_Extra_Product_Options' ) ) {
		if( $tm_fields = woo_ce_get_extra_product_option_fields() ) {
			foreach( $tm_fields as $tm_field ) {
				$fields[] = array(
					'name' => sprintf( 'order_items_tm_%s', sanitize_key( $tm_field['name'] ) ),
					'label' => sprintf( __( 'Order Items: %s', 'woocommerce-exporter' ), $tm_field['name'] )
				);
			}
			unset( $tm_fields, $tm_field );
		}
	}

	// WooCommerce Ship to Multiple Addresses - http://woothemes.com/woocommerce
	if( class_exists( 'WC_Ship_Multiple' ) ) {
		$fields[] = array(
			'name' => 'wcms_number_packages',
			'label' => __( 'Number of Packages', 'woocommerce-exporter' ),
			'hover' => __( 'Ship to Multiple Addresses', 'woocommerce-exporter' )
		);
	}

	// Attributes
	if( $attributes = woo_ce_get_product_attributes() ) {
		foreach( $attributes as $attribute ) {
			$attribute->attribute_label = trim( $attribute->attribute_label );
			if( empty( $attribute->attribute_label ) )
				$attribute->attribute_label = $attribute->attribute_name;
			$fields[] = array(
				'name' => sprintf( 'order_items_attribute_%s', $attribute->attribute_name ),
				'label' => sprintf( __( 'Order Items: %s', 'woocommerce-exporter' ), ucwords( $attribute->attribute_label ) ),
				'hover' => sprintf( apply_filters( 'woo_ce_extend_order_fields_attribute', '%s: %s (#%d)' ), __( 'Attribute', 'woocommerce-exporter' ), $attribute->attribute_name, $attribute->attribute_id )
			);
		}
		unset( $attributes, $attribute );
	}

	// Custom Order fields
	$custom_orders = woo_ce_get_option( 'custom_orders', '' );
	if( !empty( $custom_orders ) ) {
		foreach( $custom_orders as $custom_order ) {
			if( !empty( $custom_order ) ) {
				$fields[] = array(
					'name' => $custom_order,
					'label' => woo_ce_clean_export_label( $custom_order ),
					'hover' => sprintf( apply_filters( 'woo_ce_extend_order_fields_custom_order_hover', '%s: %s' ), __( 'Custom Order', 'woocommerce-exporter' ), $custom_order )
				);
			}
		}
		unset( $custom_orders, $custom_order );
	}

	// Custom Order Items fields
	$custom_order_items = woo_ce_get_option( 'custom_order_items', '' );
	if( !empty( $custom_order_items ) ) {
		foreach( $custom_order_items as $custom_order_item ) {
			if( !empty( $custom_order_item ) ) {
				$fields[] = array(
					'name' => sprintf( 'order_items_%s', $custom_order_item ),
					'label' => sprintf( __( 'Order Items: %s', 'woocommerce-exporter' ), woo_ce_clean_export_label( $custom_order_item ) ),
					'hover' => sprintf( apply_filters( 'woo_ce_extend_order_fields_custom_order_item_hover', '%s: %s' ), __( 'Custom Order Item', 'woocommerce-exporter' ), $custom_order_item )
				);
			}
		}
	}

	// Custom Product fields
	$custom_product_fields = woo_ce_get_option( 'custom_products', '' );
	if( !empty( $custom_product_fields ) ) {
		foreach( $custom_product_fields as $custom_product_field ) {
			if( !empty( $custom_product_field ) ) {
				$fields[] = array(
					'name' => sprintf( 'order_items_%s', $custom_product_field ),
					'label' => sprintf( __( 'Order Items: %s', 'woocommerce-exporter' ), woo_ce_clean_export_label( $custom_product_field ) ),
					'hover' => sprintf( apply_filters( 'woo_ce_extend_order_fields_custom_product_hover', '%s: %s' ), __( 'Custom Product', 'woocommerce-exporter' ), $custom_product_field )
				);
			}
		}
	}

	return $fields;

}
add_filter( 'woo_ce_order_fields', 'woo_ce_extend_order_fields' );

function woo_ce_get_order_tax_rates() {

	global $wpdb;

	$tax_rates_sql = "SELECT order_items.order_item_id as item_id, order_items.order_item_name FROM " . $wpdb->prefix . "woocommerce_order_items as order_items WHERE order_items.order_item_type = 'tax' GROUP BY order_item_name";
	$tax_rates = $wpdb->get_results( $tax_rates_sql, 'ARRAY_A' );
	if( !empty( $tax_rates ) ) {
		$meta_type = 'order_item';
		foreach( $tax_rates as $key => $tax_rate ) {
			$tax_rates[$key]['rate_id'] = get_metadata( $meta_type, $tax_rate['item_id'], 'rate_id', true );
			$tax_rates[$key]['label'] = get_metadata( $meta_type, $tax_rate['item_id'], 'label', true );
		}
		return $tax_rates;
	}

}

function woo_ce_get_gravity_forms_products() {

	global $wpdb;

	$meta_key = '_gravity_form_data';
	$post_ids_sql = $wpdb->prepare( "SELECT `post_id`, `meta_value` FROM `$wpdb->postmeta` WHERE `meta_key` = %s GROUP BY `meta_value`", $meta_key );
	return $wpdb->get_results( $post_ids_sql );

}

function woo_ce_get_gravity_form_fields() {

	if( $gf_products = woo_ce_get_gravity_forms_products() ) {
		$fields = array();
		foreach( $gf_products as $gf_product ) {
			if( $gf_product_data = maybe_unserialize( get_post_meta( $gf_product->post_id, '_gravity_form_data', true ) ) ) {
				// Check the class and method for Gravity Forms exists
				if( class_exists( 'RGFormsModel' ) && method_exists( 'RGFormsModel', 'get_form_meta' ) ) {
					// Check the form exists
					$gf_form_meta = RGFormsModel::get_form_meta( $gf_product_data['id'] );
					if( !empty( $gf_form_meta ) ) {
						// Check that the form has fields assigned to it
						if( !empty( $gf_form_meta['fields'] ) ) {
							foreach( $gf_form_meta['fields'] as $gf_form_field ) {
								// Check for duplicate Gravity Form fields
								$gf_form_field['formTitle'] = $gf_form_meta['title'];
								// Do not include page and section breaks, hidden as exportable fields
								if( !in_array( $gf_form_field['type'], array( 'page', 'section', 'hidden' ) ) )
									$fields[] = $gf_form_field;
							}
						}
					}
					unset( $gf_form_meta );
				}
			}
		}
		return $fields;
	}

}

function woo_ce_get_extra_product_option_fields() {

	global $wpdb;

	$meta_key = '_tmcartepo_data';
	$tm_fields_sql = $wpdb->prepare( "SELECT order_itemmeta.`meta_value` FROM `" . $wpdb->prefix . "woocommerce_order_items` as order_items, `" . $wpdb->prefix . "woocommerce_order_itemmeta` as order_itemmeta WHERE order_items.`order_item_id` = order_itemmeta.`order_item_id` AND order_items.`order_item_type` = 'line_item' AND order_itemmeta.`meta_key` = %s", $meta_key );
	$tm_fields = $wpdb->get_col( $tm_fields_sql );
	if( !empty( $tm_fields ) ) {
		$fields = array();
		foreach( $tm_fields as $tm_field ) {
			$tm_field = maybe_unserialize( $tm_field );
			$size = count( $tm_field );
			for( $i = 0; $i < $size; $i++ ) {
				// Check that the name is set
				if( !empty( $tm_field[$i]['name'] ) ) {
				// Check if we haven't already set this
					if( !array_key_exists( sanitize_key( $tm_field[$i]['name'] ), $fields ) )
						$fields[sanitize_key( $tm_field[$i]['name'] )] = $tm_field[$i];
				}
			}
		}
	}
	return $fields;

}

function woo_ce_format_order_date( $date ) {

	$output = $date;
	if( $date )
		$output = str_replace( '/', '-', $date );
	return $output;

}

// Returns a list of WooCommerce Order statuses
function woo_ce_get_order_statuses() {

	$terms = false;
	// Check if this is a WooCommerce 2.2+ instance (new Post Status)
	$woocommerce_version = woo_get_woo_version();
	if( version_compare( $woocommerce_version, '2.2' ) >= 0 ) {
		// Convert Order Status array into our magic sauce
		$order_statuses = ( function_exists( 'wc_get_order_statuses' ) ? wc_get_order_statuses() : false );
		if( !empty( $order_statuses ) ) {
			$terms = array();
			$post_type = 'shop_order';
			$posts_count = wp_count_posts( $post_type );
			foreach( $order_statuses as $key => $order_status ) {
				$terms[] = (object)array(
					'name' => $order_status,
					'slug' => $key,
					'count' => ( isset( $posts_count->$key ) ? $posts_count->$key : 0 )
				);
			}
		}
	} else {
		$args = array(
			'hide_empty' => false
		);
		$terms = get_terms( 'shop_order_status', $args );
		if( empty( $terms ) || ( is_wp_error( $terms ) == true ) )
			$terms = false;
	}
	return $terms;

}

function woo_ce_get_order_items_types() {

	$types = array(
		'line_item' => __( 'Line Item', 'woocommerce-exporter' ),
		'coupon' => __( 'Coupon', 'woocommerce-exporter' ),
		'fee' => __( 'Fee', 'woocommerce-exporter' ),
		'tax' => __( 'Tax', 'woocommerce-exporter' ),
		'shipping' => __( 'Shipping', 'woocommerce-exporter' )
	);
	$types = apply_filters( 'woo_ce_order_item_types', $types );
	return $types;

}
?>