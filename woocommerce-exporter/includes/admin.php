<?php
// Display admin notice on screen load
function woo_ce_admin_notice( $message = '', $priority = 'updated', $screen = '' ) {

	if( $priority == false || $priority == '' )
		$priority = 'updated';
	if( $message <> '' ) {
		ob_start();
		woo_ce_admin_notice_html( $message, $priority, $screen );
		$output = ob_get_contents();
		ob_end_clean();
		// Check if an existing notice is already in queue
		$existing_notice = get_transient( WOO_CE_PREFIX . '_notice' );
		if( $existing_notice !== false ) {
			$existing_notice = base64_decode( $existing_notice );
			$output = $existing_notice . $output;
		}
		set_transient( WOO_CE_PREFIX . '_notice', base64_encode( $output ), MINUTE_IN_SECONDS );
		add_action( 'admin_notices', 'woo_ce_admin_notice_print' );
	}

}

// HTML template for admin notice
function woo_ce_admin_notice_html( $message = '', $priority = 'updated', $screen = '' ) {

	// Display admin notice on specific screen
	if( !empty( $screen ) ) {

		global $pagenow;

		if( is_array( $screen ) ) {
			if( in_array( $pagenow, $screen ) == false )
				return;
		} else {
			if( $pagenow <> $screen )
				return;
		}

	} ?>
<div id="message" class="<?php echo $priority; ?>">
	<p><?php echo $message; ?></p>
</div>
<?php

}

// Grabs the WordPress transient that holds the admin notice and prints it
function woo_ce_admin_notice_print() {

	$output = get_transient( WOO_CE_PREFIX . '_notice' );
	if( $output !== false ) {
		delete_transient( WOO_CE_PREFIX . '_notice' );
		$output = base64_decode( $output );
		echo $output;
	}

}

// HTML template header on Store Exporter screen
function woo_ce_template_header( $title = '', $icon = 'woocommerce' ) {

	if( $title )
		$output = $title;
	else
		$output = __( 'Store Export', 'woocommerce-exporter' ); ?>
<div id="woo-ce" class="wrap">
	<div id="icon-<?php echo $icon; ?>" class="icon32 icon32-woocommerce-importer"><br /></div>
	<h2>
		<?php echo $output; ?>
	</h2>
<?php

}

// HTML template footer on Store Exporter screen
function woo_ce_template_footer() { ?>
</div>
<!-- .wrap -->
<?php

}

function woo_ce_export_options_export_format() {

	$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
	$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

	ob_start(); ?>
<tr>
	<th>
		<label><?php _e( 'Export format', 'woocommerce-exporter' ); ?></label>
	</th>
	<td>
		<label><input type="radio" name="export_format" value="csv"<?php checked( 'csv', 'csv' ); ?> /> <?php _e( 'CSV', 'woocommerce-exporter' ); ?> <span class="description"><?php _e( '(Comma Separated Values)', 'woocommerce-exporter' ); ?></span></label><br />
		<label><input type="radio" name="export_format" value="xls" disabled="disabled" /> <?php _e( 'Excel (XLS)', 'woocommerce-exporter' ); ?> <span class="description"><?php _e( '(Excel 97-2003)', 'woocommerce-exporter' ); ?> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label><br />
		<label><input type="radio" name="export_format" value="xlsx" disabled="disabled" /> <?php _e( 'Excel (XLSX)', 'woocommerce-exporter' ); ?> <span class="description"><?php _e( '(Excel 2007-2013)', 'woocommerce-exporter' ); ?> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label><br />
		<label><input type="radio" name="export_format" value="xml" disabled="disabled" /> <?php _e( 'XML', 'woocommerce-exporter' ); ?> <span class="description"><?php _e( '(EXtensible Markup Language)', 'woocommerce-exporter' ); ?> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label><br />
		<div class="export-options product-options">
			<label><input type="radio" name="export_format" value="rss" disabled="disabled" /> <?php _e( 'RSS', 'woocommerce-exporter' ); ?> <span class="description"><?php printf( __( '(<attr title="%s">XML</attr> feed in RSS 2.0 format)', 'woocommerce-exporter' ), __( 'EXtensible Markup Language', 'woocommerce-exporter' ) ); ?> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label>
		</div>
		<p class="description"><?php _e( 'Adjust the export format to generate different export file formats.', 'woocommerce-exporter' ); ?></p>
	</td>
</tr>
<?php
	ob_end_flush();

}

// Add Export and Docs links to the Plugins screen
function woo_ce_add_settings_link( $links, $file ) {

	// Manually force slug
	$this_plugin = WOO_CE_RELPATH;

	if( $file == $this_plugin ) {
		$docs_url = 'http://www.visser.com.au/docs/';
		$docs_link = sprintf( '<a href="%s" target="_blank">' . __( 'Docs', 'woocommerce-exporter' ) . '</a>', $docs_url );
		$export_link = sprintf( '<a href="%s">' . __( 'Export', 'woocommerce-exporter' ) . '</a>', esc_url( add_query_arg( 'page', 'woo_ce', 'admin.php' ) ) );
		array_unshift( $links, $docs_link );
		array_unshift( $links, $export_link );
	}
	return $links;

}
add_filter( 'plugin_action_links', 'woo_ce_add_settings_link', 10, 2 );

// Add Store Export page to WooCommerce screen IDs
function woo_ce_wc_screen_ids( $screen_ids = array() ) {

	$screen_ids[] = 'woocommerce_page_woo_ce';
	return $screen_ids;

}
add_filter( 'woocommerce_screen_ids', 'woo_ce_wc_screen_ids', 10, 1 );

// Add Store Export to WordPress Administration menu
function woo_ce_admin_menu() {

	$page = add_submenu_page( 'woocommerce', __( 'Store Exporter', 'woocommerce-exporter' ), __( 'Store Export', 'woocommerce-exporter' ), 'view_woocommerce_reports', 'woo_ce', 'woo_ce_html_page' );
	add_action( 'admin_print_styles-' . $page, 'woo_ce_enqueue_scripts' );
	add_action( 'current_screen', 'woo_ce_add_help_tab' );

}
add_action( 'admin_menu', 'woo_ce_admin_menu', 11 );

// Load CSS and jQuery scripts for Store Exporter screen
function woo_ce_enqueue_scripts() {

	// Simple check that WooCommerce is activated
	if( class_exists( 'WooCommerce' ) ) {

		global $woocommerce;

		// Load WooCommerce default Admin styling
		wp_enqueue_style( 'woocommerce_admin_styles', $woocommerce->plugin_url() . '/assets/css/admin.css' );

	}

	// Date Picker Addon
	wp_enqueue_script( 'jquery-ui-datepicker' );
	wp_enqueue_style( 'jquery-ui-datepicker', plugins_url( '/templates/admin/jquery-ui-datepicker.css', WOO_CE_RELPATH ) );

	// Time Picker, Date Picker Addon
	wp_enqueue_script( 'jquery-ui-timepicker', plugins_url( '/js/jquery.timepicker.js', WOO_CE_RELPATH ), array( 'jquery', 'jquery-ui-datepicker' ) );
	wp_enqueue_style( 'jquery-ui-datepicker', plugins_url( '/templates/admin/jquery-ui-timepicker.css', WOO_CE_RELPATH ) );

	// Chosen
	wp_enqueue_style( 'jquery-chosen', plugins_url( '/templates/admin/chosen.css', WOO_CE_RELPATH ) );
	wp_enqueue_script( 'jquery-chosen', plugins_url( '/js/jquery.chosen.js', WOO_CE_RELPATH ), array( 'jquery' ) );

	// Common
	wp_enqueue_style( 'woo_ce_styles', plugins_url( '/templates/admin/export.css', WOO_CE_RELPATH ) );
	wp_enqueue_script( 'woo_ce_scripts', plugins_url( '/templates/admin/export.js', WOO_CE_RELPATH ), array( 'jquery', 'jquery-ui-sortable' ) );
	wp_enqueue_style( 'dashicons' );

	if( WOO_CE_DEBUG ) {
		wp_enqueue_style( 'jquery-csvToTable', plugins_url( '/templates/admin/jquery-csvtable.css', WOO_CE_RELPATH ) );
		wp_enqueue_script( 'jquery-csvToTable', plugins_url( '/js/jquery.csvToTable.js', WOO_CE_RELPATH ), array( 'jquery' ) );
	}
	wp_enqueue_style( 'woo_vm_styles', plugins_url( '/templates/admin/woocommerce-admin_dashboard_vm-plugins.css', WOO_CE_RELPATH ) );

}

function woo_ce_add_help_tab() {

	$screen = get_current_screen();
	if( $screen->id <> 'woocommerce_page_woo_ce' )
		return;

	$screen->add_help_tab( array(
		'id' => 'woo_ce',
		'title' => __( 'Store Exporter', 'woocommerce-exporter' ),
		'content' => 
			'<p>' . __( 'Thank you for using Store Exporter :) Should you need help using this Plugin please read the documentation, if an issue persists get in touch with us on the WordPress.org Support tab for this Plugin.', 'woocommerce-exporter' ) . '</p>' .
			'<p><a href="' . 'http://www.visser.com.au/documentation/store-exporter/usage/' . '" target="_blank" class="button button-primary">' . __( 'Documentation', 'woocommerce-exporter' ) . '</a> <a href="' . 'http://wordpress.org/support/plugin/woocommerce-exporter' . '" target="_blank" class="button">' . __( 'Forum Support', 'woocommerce-exporter' ) . '</a></p>'
	) );

}

function woo_ce_plugin_page_notices() {

	global $pagenow;

	if( $pagenow == 'plugins.php' ) {
		if( woo_is_jigo_activated() || woo_is_wpsc_activated() ) {
			$r_plugins = array(
				'woocommerce-exporter/exporter.php',
				'woocommerce-store-exporter/exporter.php'
			);
			$i_plugins = get_plugins();
			foreach( $r_plugins as $path ) {
				if( isset( $i_plugins[$path] ) ) {
					add_action( 'after_plugin_row_' . $path, 'woo_ce_plugin_page_notice', 10, 3 );
					break;
				}
			}
		}
	}

}

// HTML active class for the currently selected tab on the Store Exporter screen
function woo_ce_admin_active_tab( $tab_name = null, $tab = null ) {

	if( isset( $_GET['tab'] ) && !$tab )
		$tab = $_GET['tab'];
	else if( !isset( $_GET['tab'] ) && woo_ce_get_option( 'skip_overview', false ) )
		$tab = 'export';
	else
		$tab = 'overview';

	$output = '';
	if( isset( $tab_name ) && $tab_name ) {
		if( $tab_name == $tab )
			$output = ' nav-tab-active';
	}
	echo $output;

}

// HTML template for each tab on the Store Exporter screen
function woo_ce_tab_template( $tab = '' ) {

	if( !$tab )
		$tab = 'overview';

	// Store Exporter Deluxe
	$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
	$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

	$troubleshooting_url = 'http://www.visser.com.au/documentation/store-exporter-deluxe/';

	switch( $tab ) {

		case 'overview':
			$skip_overview = woo_ce_get_option( 'skip_overview', false );
			break;

		case 'export':
			$export_type = sanitize_text_field( ( isset( $_POST['dataset'] ) ? $_POST['dataset'] : woo_ce_get_option( 'last_export', 'product' ) ) );
			$export_types = array_keys( woo_ce_get_export_types() );

			// Check if the default export type exists
			if( !in_array( $export_type, $export_types ) )
				$export_type = 'product';

			$product = woo_ce_get_export_type_count( 'product' );
			$category = woo_ce_get_export_type_count( 'category' );
			$tag = woo_ce_get_export_type_count( 'tag' );
			$brand = '999';
			$order = '999';
			$customer = '999';
			$user = woo_ce_get_export_type_count( 'user' );
			$coupon = '999';
			$attribute = '999';
			$subscription = '999';
			$product_vendor = '999';
			$commission = '999';
			$shipping_class = '999';

			add_action( 'woo_ce_export_options', 'woo_ce_export_options_export_format' );
			if( $product_fields = woo_ce_get_product_fields() ) {
				foreach( $product_fields as $key => $product_field )
					$product_fields[$key]['disabled'] = ( isset( $product_field['disabled'] ) ? $product_field['disabled'] : 0 );
				add_action( 'woo_ce_export_product_options_before_table', 'woo_ce_products_filter_by_product_category' );
				add_action( 'woo_ce_export_product_options_before_table', 'woo_ce_products_filter_by_product_tag' );
				add_action( 'woo_ce_export_product_options_before_table', 'woo_ce_products_filter_by_product_brand' );
				add_action( 'woo_ce_export_product_options_before_table', 'woo_ce_products_filter_by_product_vendor' );
				add_action( 'woo_ce_export_product_options_before_table', 'woo_ce_products_filter_by_product_status' );
				add_action( 'woo_ce_export_product_options_before_table', 'woo_ce_products_filter_by_product_type' );
				add_action( 'woo_ce_export_product_options_before_table', 'woo_ce_products_filter_by_stock_status' );
				add_action( 'woo_ce_export_product_options_after_table', 'woo_ce_product_sorting' );
				add_action( 'woo_ce_export_options', 'woo_ce_products_upsells_formatting' );
				add_action( 'woo_ce_export_options', 'woo_ce_products_crosssells_formatting' );
				add_action( 'woo_ce_export_options', 'woo_ce_export_options_gallery_format' );
				add_action( 'woo_ce_export_after_form', 'woo_ce_products_custom_fields' );
			}
			if( $category_fields = woo_ce_get_category_fields() ) {
				foreach( $category_fields as $key => $category_field )
					$category_fields[$key]['disabled'] = ( isset( $category_field['disabled'] ) ? $category_field['disabled'] : 0 );
				add_action( 'woo_ce_export_category_options_after_table', 'woo_ce_category_sorting' );
			}
			if( $tag_fields = woo_ce_get_tag_fields() ) {
				foreach( $tag_fields as $key => $tag_field )
					$tag_fields[$key]['disabled'] = ( isset( $tag_field['disabled'] ) ? $tag_field['disabled'] : 0 );
				add_action( 'woo_ce_export_tag_options_after_table', 'woo_ce_tag_sorting' );
			}
			if( $brand_fields = woo_ce_get_brand_fields() ) {
				foreach( $brand_fields as $key => $brand_field )
					$brand_fields[$key]['disabled'] = ( isset( $brand_field['disabled'] ) ? $brand_field['disabled'] : 0 );
				add_action( 'woo_ce_export_brand_options_before_table', 'woo_ce_brand_sorting' );
			}
			if( $order_fields = woo_ce_get_order_fields() ) {
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_date' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_status' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_customer' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_billing_country' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_shipping_country' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_user_role' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_coupon' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_product' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_product_category' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_product_tag' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_product_brand' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_order_id' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_payment_gateway' );
				add_action( 'woo_ce_export_order_options_before_table', 'woo_ce_orders_filter_by_shipping_method' );
				add_action( 'woo_ce_export_order_options_after_table', 'woo_ce_order_sorting' );
				add_action( 'woo_ce_export_options', 'woo_ce_orders_items_formatting' );
				add_action( 'woo_ce_export_options', 'woo_ce_orders_max_order_items' );
				add_action( 'woo_ce_export_options', 'woo_ce_orders_items_types' );
				add_action( 'woo_ce_export_after_form', 'woo_ce_orders_custom_fields' );
			}
			if( $customer_fields = woo_ce_get_customer_fields() ) {
				add_action( 'woo_ce_export_customer_options_before_table', 'woo_ce_customers_filter_by_status' );
				add_action( 'woo_ce_export_customer_options_before_table', 'woo_ce_customers_filter_by_user_role' );
				add_action( 'woo_ce_export_after_form', 'woo_ce_customers_custom_fields' );
			}
			if( $user_fields = woo_ce_get_user_fields() ) {
				foreach( $user_fields as $key => $user_field )
					$user_fields[$key]['disabled'] = ( isset( $user_field['disabled'] ) ? $user_field['disabled'] : 0 );
				add_action( 'woo_ce_export_user_options_after_table', 'woo_ce_user_sorting' );
				add_action( 'woo_ce_export_after_form', 'woo_ce_users_custom_fields' );
			}
			if( $coupon_fields = woo_ce_get_coupon_fields() ) {
				add_action( 'woo_ce_export_coupon_options_before_table', 'woo_ce_coupon_sorting' );
			}
			if( $subscription_fields = woo_ce_get_subscription_fields() ) {
				add_action( 'woo_ce_export_subscription_options_before_table', 'woo_ce_subscriptions_filter_by_subscription_status' );
				add_action( 'woo_ce_export_subscription_options_before_table', 'woo_ce_subscriptions_filter_by_subscription_product' );
			}
			$product_vendor_fields = woo_ce_get_product_vendor_fields();
			if( $commission_fields = woo_ce_get_commission_fields() ) {
				add_action( 'woo_ce_export_commission_options_before_table', 'woo_ce_commissions_filter_by_date' );
				add_action( 'woo_ce_export_commission_options_before_table', 'woo_ce_commissions_filter_by_product_vendor' );
				add_action( 'woo_ce_export_commission_options_before_table', 'woo_ce_commissions_filter_by_commission_status' );
				add_action( 'woo_ce_export_commission_options_before_table', 'woo_ce_commission_sorting' );
			}
			if( $shipping_class_fields = woo_ce_get_shipping_class_fields() ) {
				add_action( 'woo_ce_export_shipping_class_options_after_table', 'woo_ce_shipping_class_sorting' );
			}
			$attribute_fields = false;

			// Export options
			$limit_volume = woo_ce_get_option( 'limit_volume' );
			$offset = woo_ce_get_option( 'offset' );
			break;

		case 'fields':
			$export_type = ( isset( $_GET['type'] ) ? sanitize_text_field( $_GET['type'] ) : '' );
			$export_types = array_keys( woo_ce_get_export_types() );
			$fields = array();
			if( in_array( $export_type, $export_types ) ) {
				if( has_filter( 'woo_ce_' . $export_type . '_fields', 'woo_ce_override_' . $export_type . '_field_labels' ) )
					remove_filter( 'woo_ce_' . $export_type . '_fields', 'woo_ce_override_' . $export_type . '_field_labels', 11 );
				if( function_exists( sprintf( 'woo_ce_get_%s_fields', $export_type ) ) )
					$fields = call_user_func( 'woo_ce_get_' . $export_type . '_fields' );
				$labels = woo_ce_get_option( $export_type . '_labels', array() );
			}
			break;

		case 'archive':
			if( isset( $_GET['deleted'] ) ) {
				$message = __( 'Archived export has been deleted.', 'woocommerce-exporter' );
				woo_ce_admin_notice( $message );
			}
			if( $files = woo_ce_get_archive_files() ) {
				foreach( $files as $key => $file )
					$files[$key] = woo_ce_get_archive_file( $file );
			}
			break;

		case 'settings':
			$export_filename = woo_ce_get_option( 'export_filename', '' );
			// Default export filename
			if( $export_filename == false )
				$export_filename = '%store_name%-export_%dataset%-%date%-%time%-%random%.csv';
			$delete_file = woo_ce_get_option( 'delete_file', 1 );
			$timeout = woo_ce_get_option( 'timeout', 0 );
			$encoding = woo_ce_get_option( 'encoding', 'UTF-8' );
			$bom = woo_ce_get_option( 'bom', 1 );
			$delimiter = woo_ce_get_option( 'delimiter', ',' );
			$category_separator = woo_ce_get_option( 'category_separator', '|' );
			$escape_formatting = woo_ce_get_option( 'escape_formatting', 'all' );
			$date_format = woo_ce_get_option( 'date_format', 'd/m/Y' );
			// Reset the Date Format if corrupted
			if( $date_format == '1' || $date_format == '' || $date_format == false )
				$date_format = 'd/m/Y';
			$file_encodings = ( function_exists( 'mb_list_encodings' ) ? mb_list_encodings() : false );
			add_action( 'woo_ce_export_settings_top', 'woo_ce_export_settings_quicklinks' );
			add_action( 'woo_ce_export_settings_after', 'woo_ce_export_settings_csv' );
			add_action( 'woo_ce_export_settings_after', 'woo_ce_export_settings_extend' );
			break;

		case 'tools':
			// Product Importer Deluxe
			$woo_pd_url = 'http://www.visser.com.au/woocommerce/plugins/product-importer-deluxe/';
			$woo_pd_target = ' target="_blank"';
			if( function_exists( 'woo_pd_init' ) ) {
				$woo_pd_url = esc_url( add_query_arg( array( 'page' => 'woo_pd', 'tab' => null ) ) );
				$woo_pd_target = false;
			}

			// Store Toolkit
			$woo_st_url = 'http://www.visser.com.au/woocommerce/plugins/store-toolkit/';
			$woo_st_target = ' target="_blank"';
			if( function_exists( 'woo_st_admin_init' ) ) {
				$woo_st_url = esc_url( add_query_arg( array( 'page' => 'woo_st', 'tab' => null ) ) );
				$woo_st_target = false;
			}

			// Export modules
			$module_status = ( isset( $_GET['module_status'] ) ? sanitize_text_field( $_GET['module_status'] ) : false );
			$modules = woo_ce_admin_modules_list( $module_status );
			$modules_all = get_transient( WOO_CE_PREFIX . '_modules_all_count' );
			$modules_active = get_transient( WOO_CE_PREFIX . '_modules_active_count' );
			$modules_inactive = get_transient( WOO_CE_PREFIX . '_modules_inactive_count' );
			break;

	}
	if( $tab ) {
		if( file_exists( WOO_CE_PATH . 'templates/admin/tabs-' . $tab . '.php' ) ) {
			include_once( WOO_CE_PATH . 'templates/admin/tabs-' . $tab . '.php' );
		} else {
			$message = sprintf( __( 'We couldn\'t load the export template file <code>%s</code> within <code>%s</code>, this file should be present.', 'woocommerce-exporter' ), 'tabs-' . $tab . '.php', WOO_CE_PATH . 'templates/admin/...' );
			woo_ce_admin_notice_html( $message, 'error' );
			ob_start(); ?>
<p><?php _e( 'You can see this error for one of a few common reasons', 'woocommerce-exporter' ); ?>:</p>
<ul class="ul-disc">
	<li><?php _e( 'WordPress was unable to create this file when the Plugin was installed or updated', 'woocommerce-exporter' ); ?></li>
	<li><?php _e( 'The Plugin files have been recently changed and there has been a file conflict', 'woocommerce-exporter' ); ?></li>
	<li><?php _e( 'The Plugin file has been locked and cannot be opened by WordPress', 'woocommerce-exporter' ); ?></li>
</ul>
<p><?php _e( 'Jump onto our website and download a fresh copy of this Plugin as it might be enough to fix this issue. If this persists get in touch with us.', 'woocommerce-exporter' ); ?></p>
<?php
			ob_end_flush();
		}
	}

}

// Display the memory usage in the screen footer
function woo_ce_admin_footer_text( $footer_text = '' ) {

	$current_screen = get_current_screen();
	$pages = array(
		'woocommerce_page_woo_ce'
	);
	// Check to make sure we're on the Export screen
	if ( isset( $current_screen->id ) && apply_filters( 'woo_ce_display_admin_footer_text', in_array( $current_screen->id, $pages ) ) ) {
		$memory_usage = woo_ce_current_memory_usage( false );
		$memory_limit = absint( ini_get( 'memory_limit' ) );
		$memory_percent = absint( $memory_usage / $memory_limit * 100 );
		$memory_color = 'font-weight:normal;';
		if( $memory_percent > 75 )
			$memory_color = 'font-weight:bold; color:orange;';
		if( $memory_percent > 90 )
			$memory_color = 'font-weight:bold; color:red;';
		$footer_text .= ' | ' . sprintf( __( 'Memory: %s of %s MB (%s)', 'woocommerce-exporter' ), $memory_usage, $memory_limit, sprintf( '<span style="%s">%s</span>', $memory_color, $memory_percent . '%' ) );
	}
	return $footer_text;

}

// List of WordPress Plugins that Store Exporter integrates with
function woo_ce_admin_modules_list( $module_status = false ) {

	$modules = array();
	$modules[] = array(
		'name' => 'aioseop',
		'title' => __( 'All in One SEO Pack', 'woocommerce-exporter' ),
		'description' => __( 'Optimize your WooCommerce Products for Search Engines. Requires Store Toolkit for All in One SEO Pack integration.', 'woocommerce-exporter' ),
		'url' => 'http://wordpress.org/extend/plugins/all-in-one-seo-pack/',
		'slug' => 'all-in-one-seo-pack',
		'function' => 'aioseop_activate'
	);
	$modules[] = array(
		'name' => 'store_toolkit',
		'title' => __( 'Store Toolkit', 'woocommerce-exporter' ),
		'description' => __( 'Store Toolkit includes a growing set of commonly-used WooCommerce administration tools aimed at web developers and store maintainers.', 'woocommerce-exporter' ),
		'url' => 'http://wordpress.org/extend/plugins/woocommerce-store-toolkit/',
		'slug' => 'woocommerce-store-toolkit',
		'function' => 'woo_st_admin_init'
	);
	$modules[] = array(
		'name' => 'ultimate_seo',
		'title' => __( 'SEO Ultimate', 'woocommerce-exporter' ),
		'description' => __( 'This all-in-one SEO plugin gives you control over Product details.', 'woocommerce-exporter' ),
		'url' => 'http://wordpress.org/extend/plugins/seo-ultimate/',
		'slug' => 'seo-ultimate',
		'function' => 'su_wp_incompat_notice'
	);
	$modules[] = array(
		'name' => 'gpf',
		'title' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' ),
		'description' => __( 'Easily configure data to be added to your Google Merchant Centre feed.', 'woocommerce-exporter' ),
		'url' => 'http://www.leewillis.co.uk/wordpress-plugins/',
		'function' => 'woocommerce_gpf_install'
	);
	$modules[] = array(
		'name' => 'wpseo',
		'title' => __( 'WordPress SEO by Yoast', 'woocommerce-exporter' ),
		'description' => __( 'The first true all-in-one SEO solution for WordPress.', 'woocommerce-exporter' ),
		'url' => 'http://yoast.com/wordpress/seo/#utm_source=wpadmin&utm_medium=plugin&utm_campaign=wpseoplugin',
		'slug' => 'wordpress-seo',
		'function' => 'wpseo_admin_init'
	);
	$modules[] = array(
		'name' => 'msrp',
		'title' => __( 'WooCommerce MSRP Pricing', 'woocommerce-exporter' ),
		'description' => __( 'Define and display MSRP prices (Manufacturer\'s suggested retail price) to your customers.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/msrp-pricing/',
		'function' => 'woocommerce_msrp_activate'
	);
	$modules[] = array(
		'name' => 'wc_brands',
		'title' => __( 'WooCommerce Brands Addon', 'woocommerce-exporter' ),
		'description' => __( 'Create, assign and list brands for products, and allow customers to filter by brand.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/brands/',
		'class' => 'WC_Brands'
	);
	$modules[] = array(
		'name' => 'wc_cog',
		'title' => __( 'Cost of Goods', 'woocommerce-exporter' ),
		'description' => __( 'Easily track total profit and cost of goods by adding a Cost of Good field to simple and variable products.', 'woocommerce-exporter' ),
		'url' => 'http://www.skyverge.com/product/woocommerce-cost-of-goods-tracking/',
		'class' => 'WC_COG'
	);
	$modules[] = array(
		'name' => 'per_product_shipping',
		'title' => __( 'Per-Product Shipping', 'woocommerce-exporter' ),
		'description' => __( 'Define separate shipping costs per product which are combined at checkout to provide a total shipping cost.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/per-product-shipping/',
		'function' => 'woocommerce_per_product_shipping_init'
	);
	$modules[] = array(
		'name' => 'vendors',
		'title' => __( 'Product Vendors', 'woocommerce-exporter' ),
		'description' => __( 'Turn your store into a multi-vendor marketplace (such as Etsy or Creative Market).', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/product-vendors/',
		'class' => 'WooCommerce_Product_Vendors'
	);
	$modules[] = array(
		'name' => 'wc_vendors',
		'title' => __( 'WC Vendors', 'woocommerce-exporter' ),
		'description' => __( 'Allow vendors to sell their own products and receive a commission for each sale.', 'woocommerce-exporter' ),
		'url' => 'http://wcvendors.com',
		'class' => 'WC_Vendors'
	);
	$modules[] = array(
		'name' => 'acf',
		'title' => __( 'Advanced Custom Fields', 'woocommerce-exporter' ),
		'description' => __( 'Powerful fields for WordPress developers.', 'woocommerce-exporter' ),
		'url' => 'http://www.advancedcustomfields.com',
		'class' => 'acf'
	);
	$modules[] = array(
		'name' => 'product_addons',
		'title' => __( 'Product Add-ons', 'woocommerce-exporter' ),
		'description' => __( 'Allow your customers to customise your products by adding input boxes, dropdowns or a field set of checkboxes.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/product-add-ons/',
		'class' => 'Product_Addon_Admin'
	);
	$modules[] = array(
		'name' => 'seq',
		'title' => __( 'WooCommerce Sequential Order Numbers', 'woocommerce-exporter' ),
		'description' => __( 'This plugin extends the WooCommerce e-commerce plugin by setting sequential order numbers for new orders.', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-sequential-order-numbers/',
		'slug' => 'woocommerce-sequential-order-numbers',
		'class' => 'WC_Seq_Order_Number'
	);
	$modules[] = array(
		'name' => 'seq_pro',
		'title' => __( 'WooCommerce Sequential Order Numbers Pro', 'woocommerce-exporter' ),
		'description' => __( 'Tame your WooCommerce Order Numbers.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/sequential-order-numbers-pro/',
		'class' => 'WC_Seq_Order_Number_Pro'
	);
	$modules[] = array(
		'name' => 'print_invoice_delivery_note',
		'title' => __( 'WooCommerce Print Invoice & Delivery Note', 'woocommerce-exporter' ),
		'description' => __( 'Print invoices and delivery notes for WooCommerce orders.', 'woocommerce-exporter' ),
		'url' => 'http://wordpress.org/plugins/woocommerce-delivery-notes/',
		'slug' => 'woocommerce-delivery-notes',
		'class' => 'WooCommerce_Delivery_Notes'
	);
	$modules[] = array(
		'name' => 'pdf_invoices_packing_slips',
		'title' => __( 'WooCommerce PDF Invoices & Packing Slips', 'woocommerce-exporter' ),
		'description' => __( 'Create, print & automatically email PDF invoices & packing slips for WooCommerce orders.', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-pdf-invoices-packing-slips/',
		'slug' => 'woocommerce-pdf-invoices-packing-slips',
		'class' => 'WooCommerce_PDF_Invoices'
	);
	$modules[] = array(
		'name' => 'checkout_manager',
		'title' => __( 'WooCommerce Checkout Manager & WooCommerce Checkout Manager Pro', 'woocommerce-exporter' ),
		'description' => __( 'Manages the WooCommerce Checkout page and WooCommerce Checkout processes.', 'woocommerce-exporter' ),
		'url' => 'http://wordpress.org/plugins/woocommerce-checkout-manager/',
		'slug' => 'woocommerce-checkout-manager',
		'function' => array( 'wccs_install', 'wccs_install_pro' )
	);
	$modules[] = array(
		'name' => 'pgsk',
		'title' => __( 'Poor Guys Swiss Knife', 'woocommerce-exporter' ),
		'description' => __( 'A Swiss Knife for WooCommerce.', 'woocommerce-exporter' ),
		'url' => 'http://wordpress.org/plugins/woocommerce-poor-guys-swiss-knife/',
		'slug' => 'woocommerce-poor-guys-swiss-knife',
		'function' => 'wcpgsk_init'
	);
	$modules[] = array(
		'name' => 'checkout_field_editor',
		'title' => __( 'Checkout Field Editor', 'woocommerce-exporter' ),
		'description' => __( 'Add, edit and remove fields shown on your WooCommerce checkout page.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/woocommerce-checkout-field-editor/',
		'function' => 'woocommerce_init_checkout_field_editor'
	);
	$modules[] = array(
		'name' => 'checkout_field_manager',
		'title' => __( 'Checkout Field Manager', 'woocommerce-exporter' ),
		'description' => __( 'Quickly and effortlessly add, remove and re-orders fields in the checkout process.', 'woocommerce-exporter' ),
		'url' => 'http://61extensions.com/shop/woocommerce-checkout-field-manager/',
		'function' => 'sod_woocommerce_checkout_manager_settings'
	);
	$modules[] = array(
		'name' => 'checkout_addons',
		'title' => __( 'WooCommerce Checkout Add-Ons', 'woocommerce-exporter' ),
		'description' => __( 'Add fields at checkout for add-on products and services while optionally setting a cost for each add-on.', 'woocommerce-exporter' ),
		'url' => 'http://www.skyverge.com/product/woocommerce-checkout-add-ons/',
		'function' => 'init_woocommerce_checkout_add_ons'
	);
	$modules[] = array(
		'name' => 'local_pickup_plus',
		'title' => __( 'Local Pickup Plus', 'woocommerce-exporter' ),
		'description' => __( 'Let customers pick up products from specific locations.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/local-pickup-plus/',
		'class' => 'WC_Local_Pickup_Plus'
	);
	$modules[] = array(
		'name' => 'gravity_forms',
		'title' => __( 'Gravity Forms', 'woocommerce-exporter' ),
		'description' => __( 'Gravity Forms is hands down the best contact form plugin for WordPress powered websites.', 'woocommerce-exporter' ),
		'url' => 'http://woothemes.com/woocommerce',
		'class' => 'RGForms'
	);
	$modules[] = array(
		'name' => 'currency_switcher',
		'title' => __( 'WooCommerce Currency Switcher', 'woocommerce-exporter' ),
		'description' => __( 'Currency Switcher for WooCommerce allows your shop to display prices and accept payments in multiple currencies.', 'woocommerce-exporter' ),
		'url' => 'http://aelia.co/shop/currency-switcher-woocommerce/',
		'class' => 'WC_Aelia_CurrencySwitcher'
	);
	$modules[] = array(
		'name' => 'subscriptions',
		'title' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
		'description' => __( 'WC Subscriptions makes it easy to create and manage products with recurring payments.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/woocommerce-subscriptions/',
		'class' => 'WC_Subscriptions_Manager'
	);
	$modules[] = array(
		'name' => 'extra_product_options',
		'title' => __( 'Extra Product Options', 'woocommerce-exporter' ),
		'description' => __( 'Create extra price fields globally or per-Product', 'woocommerce-exporter' ),
		'url' => 'http://codecanyon.net/item/woocommerce-extra-product-options/7908619',
		'class' => 'TM_Extra_Product_Options'
	);
	$modules[] = array(
		'name' => 'woocommerce_jetpack',
		'title' => __( 'Booster for WooCommerce', 'woocommerce-exporter' ),
		'description' => __( 'Supercharge your WooCommerce site with these awesome powerful features (formally WooCommerce Jetpack).', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-jetpack/',
		'slug' => 'woocommerce-jetpack',
		'class' => 'WC_Jetpack'
	);
	$modules[] = array(
		'name' => 'woocommerce_jetpack_plus',
		'title' => __( 'Booster Plus', 'woocommerce-exporter' ),
		'description' => __( 'Unlock all WooCommerce Booster features and supercharge your WordPress WooCommerce site even more (formally WooCommerce Jetpack Plus).', 'woocommerce-exporter' ),
		'url' => 'http://woojetpack.com/shop/wordpress-woocommerce-jetpack-plus/',
		'class' => 'WC_Jetpack_Plus'
	);
	$modules[] = array(
		'name' => 'woocommerce_brands',
		'title' => __( 'WooCommerce Brands', 'woocommerce-exporter' ),
		'description' => __( 'Woocommerce Brands Plugin. After Install and active this plugin you\'ll have some shortcode and some widget for display your brands in fornt-end website.', 'woocommerce-exporter' ),
		'url' => 'http://proword.net/Woocommerce_Brands/',
		'class' => 'woo_brands'
	);
	$modules[] = array(
		'name' => 'woocommerce_bookings',
		'title' => __( 'WooCommerce Bookings', 'woocommerce-exporter' ),
		'description' => __( 'Setup bookable products such as for reservations, services and hires.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/woocommerce-bookings/',
		'class' => 'WC_Bookings'
	);
	$modules[] = array(
		'name' => 'eu_vat',
		'title' => __( 'WooCommerce EU VAT Number', 'woocommerce-exporter' ),
		'description' => __( 'The EU VAT Number extension lets you collect and validate EU VAT numbers during checkout to identify B2B transactions verses B2C.', 'woocommerce-exporter' ),
		'url' => 'http://woothemes.com/',
		'function' => '__wc_eu_vat_number_init'
	);
	$modules[] = array(
		'name' => 'hear_about_us',
		'title' => __( 'WooCommerce Hear About Us', 'woocommerce-exporter' ),
		'description' => __( 'Ask where your new customers come from at Checkout.', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-hear-about-us/',
		'slug' => 'woocommerce-hear-about-us', // Define this if the Plugin is hosted on the WordPress repo
		'class' => 'WooCommerce_HearAboutUs'
	);
	$modules[] = array(
		'name' => 'wholesale_pricing',
		'title' => __( 'WooCommerce Wholesale Pricing', 'woocommerce-exporter' ),
		'description' => __( 'Allows you to set wholesale prices for products and variations.', 'woocommerce-exporter' ),
		'url' => 'http://ignitewoo.com/woocommerce-extensions-plugins-themes/woocommerce-wholesale-pricing/',
		'class' => 'woocommerce_wholesale_pricing'
	);
	$modules[] = array(
		'name' => 'woocommerce_barcodes',
		'title' => __( 'Barcodes for WooCommerce', 'woocommerce-exporter' ),
		'description' => __( 'Allows you to add GTIN (former EAN) codes natively to your products.', 'woocommerce-exporter' ),
		'url' => 'http://www.wolkenkraft.com/produkte/barcodes-fuer-woocommerce/',
		'function' => 'wpps_requirements_met'
	);
	$modules[] = array(
		'name' => 'woocommerce_smart_coupons',
		'title' => __( 'WooCommerce Smart Coupons', 'woocommerce-exporter' ),
		'description' => __( 'WooCommerce Smart Coupons lets customers buy gift certificates, store credits or coupons easily.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/smart-coupons/',
		'class' => 'WC_Smart_Coupons'
	);
	$modules[] = array(
		'name' => 'woocommerce_preorders',
		'title' => __( 'WooCommerce Pre-Orders', 'woocommerce-exporter' ),
		'description' => __( 'Sell pre-orders for products in your WooCommerce store.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/woocommerce-pre-orders/',
		'class' => 'WC_Pre_Orders'
	);
	$modules[] = array(
		'name' => 'order_numbers_basic',
		'title' => __( 'WooCommerce Basic Ordernumbers', 'woocommerce-exporter' ),
		'description' => __( 'Lets the user freely configure the order numbers in WooCommerce.', 'woocommerce-exporter' ),
		'url' => 'http://open-tools.net/woocommerce/advanced-ordernumbers-for-woocommerce.html',
		'class' => 'OpenToolsOrdernumbersBasic'
	);
	$modules[] = array(
		'name' => 'admin_custom_order_fields',
		'title' => __( 'WooCommerce Admin Custom Order Fields', 'woocommerce-exporter' ),
		'description' => __( 'Easily add custom fields to your WooCommerce orders and display them in the Orders admin, the My Orders section and order emails.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/woocommerce-admin-custom-order-fields/',
		'function' => 'init_woocommerce_admin_custom_order_fields'
	);
	$modules[] = array(
		'name' => 'table_rate_shipping_plus',
		'title' => __( 'WooCommerce Table Rate Shipping Plus', 'woocommerce-exporter' ),
		'description' => __( 'Calculate shipping costs based on destination, weight and price.', 'woocommerce-exporter' ),
		'url' => 'http://mangohour.com/plugins/woocommerce-table-rate-shipping',
		'function' => 'mh_wc_table_rate_plus_init'
	);
	$modules[] = array(
		'name' => 'woocommerce-extra-checkout-fields-for-brazil',
		'title' => __( 'WooCommerce Extra Checkout Fields for Brazil', 'woocommerce-exporter' ),
		'description' => __( 'Adds Brazilian checkout fields in WooCommerce.', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-extra-checkout-fields-for-brazil/',
		'slug' => 'woocommerce-extra-checkout-fields-for-brazil',
		'class' => 'Extra_Checkout_Fields_For_Brazil'
	);
	$modules[] = array(
		'name' => 'woocommerce_gravityforms',
		'title' => __( 'WooCommerce Gravity Forms Product Add-Ons', 'woocommerce-exporter' ),
		'description' => __( 'Allows you to use Gravity Forms on individual WooCommerce products.', 'woocommerce-exporter' ),
		'url' => 'http://woothemes.com/',
		'class' => 'woocommerce_gravityforms'
	);
	$modules[] = array(
		'name' => 'woocommerce_quickdonation',
		'title' => __( 'WooCommerce Quick Donation', 'woocommerce-exporter' ),
		'description' => __( 'Turns WooCommerce into online donation.', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-quick-donation/',
		'slug' => 'woocommerce-quick-donation',
		'class' => 'WooCommerce_Quick_Donation'
	);
	$modules[] = array(
		'name' => 'woocommerce_easycheckout',
		'title' => __( 'Easy Checkout Fields Editor', 'woocommerce-exporter' ),
		'description' => __( 'WooCommerce Easy Checkout Fields Editor', 'woocommerce-exporter' ),
		'url' => 'http://codecanyon.net/item/woocommerce-easy-checkout-field-editor/9799777',
		'function' => 'pcmfe_admin_form_field'
	);
	$modules[] = array(
		'name' => 'woocommerce_productfees',
		'title' => __( 'Product Fees', 'woocommerce-exporter' ),
		'description' => __( 'WooCommerce Easy Checkout Fields Editor', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-product-fees/',
		'slug' => 'woocommerce-product-fees',
		'class' => 'WooCommerce_Product_Fees'
	);
	$modules[] = array(
		'name' => 'woocommerce_events',
		'title' => __( 'Events', 'woocommerce-exporter' ),
		'description' => __( 'Adds event and ticketing features to WooCommerce.', 'woocommerce-exporter' ),
		'url' => 'http://www.woocommerceevents.com/',
		'class' => 'WooCommerce_Events'
	);
	$modules[] = array(
		'name' => 'woocommerce_tabmanager',
		'title' => __( 'Tab Manager', 'woocommerce-exporter' ),
		'description' => __( 'A product tab manager for WooCommerce.', 'woocommerce-exporter' ),
		'url' => 'http://www.woothemes.com/products/woocommerce-tab-manager/',
		'class' => 'WC_Tab_Manager'
	);
	$modules[] = array(
		'name' => 'woocommerce_customfields',
		'title' => __( 'WooCommerce Custom Fields', 'woocommerce-exporter' ),
		'description' => __( 'Create custom fields for WooCommerce product and checkout pages.', 'woocommerce-exporter' ),
		'url' => 'http://www.rightpress.net/woocommerce-custom-fields',
		'class' => 'RP_WCCF'
	);
	$modules[] = array(
		'name' => 'barcode_isbn',
		'title' => __( 'WooCommerce Barcode & ISBN', 'woocommerce-exporter' ),
		'description' => __( 'A plugin to add a barcode & ISBN to WooCommerce.', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-barcode-isbn/',
		'slug' => 'woocommerce-barcode-isbn',
		'function' => 'woo_add_barcode'
	);
	$modules[] = array(
		'name' => 'video_product_tab',
		'title' => __( 'WooCommerce Video Product Tab', 'woocommerce-exporter' ),
		'description' => __( 'Extends WooCommerce to allow you to add a Video to the Product page.', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/woocommerce-video-product-tab/',
		'slug' => 'woocommerce-video-product-tab',
		'class' => 'WooCommerce_Video_Product_Tab'
	);
	$modules[] = array(
		'name' => 'external_featured_image',
		'title' => __( 'Nelio External Featured Image', 'woocommerce-exporter' ),
		'description' => __( 'Use external images from anywhere as the featured image of your pages and posts.', 'woocommerce-exporter' ),
		'url' => 'https://wordpress.org/plugins/external-featured-image/',
		'slug' => 'external-featured-image', // Define this if the Plugin is hosted on the WordPress repo
		'function' => '_nelioefi_url'
	);

/*
	$modules[] = array(
		'name' => '',
		'title' => __( '', 'woocommerce-exporter' ),
		'description' => __( '', 'woocommerce-exporter' ),
		'url' => '',
		'slug' => '', // Define this if the Plugin is hosted on the WordPress repo
		'function' => '' // Define this for function detection, if Class rename attribute to class
	);
*/

	$modules = apply_filters( 'woo_ce_modules_addons', $modules );

	// Check if the existing Transient exists
	$modules_all = count( $modules );
	$cached = get_transient( WOO_CE_PREFIX . '_modules_all_count' );
	if( $cached == false ) {
		set_transient( WOO_CE_PREFIX . '_modules_all_count', $modules_all, DAY_IN_SECONDS );
	}

	$modules_active = 0;
	$modules_inactive = 0;

	if( !empty( $modules ) ) {
		foreach( $modules as $key => $module ) {
			$modules[$key]['status'] = 'inactive';
			// Check if each module is activated
			if( isset( $module['function'] ) ) {
				if( is_array( $module['function'] ) ) {
					$size = count( $module['function'] );
					for( $i = 0; $i < $size; $i++ ) {
						if( function_exists( $module['function'][$i] ) ) {
							$modules[$key]['status'] = 'active';
							$modules_active++;
							break;
						}
					}
				} else {
					if( function_exists( $module['function'] ) ) {
						$modules[$key]['status'] = 'active';
						$modules_active++;
					}
				}
			} else if( isset( $module['class'] ) ) {
				if( is_array( $module['class'] ) ) {
					$size = count( $module['class'] );
					for( $i = 0; $i < $size; $i++ ) {
						if( function_exists( $module['class'][$i] ) ) {
							$modules[$key]['status'] = 'active';
							$modules_active++;
							break;
						}
					}
				} else {
					if( class_exists( $module['class'] ) ) {
						$modules[$key]['status'] = 'active';
						$modules_active++;
					}
				}
			}
			// Filter Modules by Module Status
			if( !empty( $module_status ) ) {
				switch( $module_status ) {

					case 'active':
						if( $modules[$key]['status'] == 'inactive' )
							unset( $modules[$key] );
						break;

					case 'inactive':
						if( $modules[$key]['status'] == 'active' )
							unset( $modules[$key] );
						break;

				}
			}
			if( isset( $modules[$key] ) ) {
				// Check if the Plugin has a slug and if current user can install Plugins
				if( current_user_can( 'install_plugins' ) && isset( $module['slug'] ) )
					$modules[$key]['url'] = admin_url( sprintf( 'plugin-install.php?tab=search&type=term&s=%s', $module['slug'] ) );
			}
		}
	}

	// Check if the existing Transient exists
	$cached = get_transient( WOO_CE_PREFIX . '_modules_active_count' );
	if( $cached == false ) {
		set_transient( WOO_CE_PREFIX . '_modules_active_count', $modules_active, DAY_IN_SECONDS );
	}

	// Check if the existing Transient exists
	$cached = get_transient( WOO_CE_PREFIX . '_modules_inactive_count' );
	if( $cached == false ) {
		$modules_inactive = $modules_all - $modules_active;
		set_transient( WOO_CE_PREFIX . '_modules_inactive_count', $modules_inactive, DAY_IN_SECONDS );
	}

	return $modules;

}

function woo_ce_modules_status_class( $status = 'inactive' ) {

	$output = '';
	switch( $status ) {

		case 'active':
			$output = 'green';
			break;

		case 'inactive':
			$output = 'yellow';
			break;

	}
	echo $output;

}

function woo_ce_modules_status_label( $status = 'inactive' ) {

	$output = '';
	switch( $status ) {

		case 'active':
			$output = __( 'OK', 'woocommerce-exporter' );
			break;

		case 'inactive':
			$output = __( 'Install', 'woocommerce-exporter' );
			break;

	}
	echo $output;

}

// HTML template for header prompt on Store Exporter screen
function woo_ce_support_donate() {

	$output = '';
	$show = true;
	if( function_exists( 'woo_vl_we_love_your_plugins' ) ) {
		if( in_array( WOO_CE_DIRNAME, woo_vl_we_love_your_plugins() ) )
			$show = false;
	}
	if( $show ) {
		$donate_url = 'http://www.visser.com.au/donate/';
		$rate_url = 'http://wordpress.org/support/view/plugin-reviews/' . WOO_CE_DIRNAME;
		$output = '
<div id="support-donate_rate" class="support-donate_rate">
	<p>' . sprintf( __( '<strong>Like this Plugin?</strong> %s and %s.', 'woocommerce-exporter' ), '<a href="' . $donate_url . '" target="_blank">' . __( 'Donate to support this Plugin', 'woocommerce-exporter' ) . '</a>', '<a href="' . esc_url( add_query_arg( array( 'rate' => '5' ), $rate_url ) ) . '#postform" target="_blank">rate / review us on WordPress.org</a>' ) . '</p>
</div>
';
	}
	echo $output;

}
?>
