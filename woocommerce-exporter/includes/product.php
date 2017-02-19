<?php
if( is_admin() ) {

	/* Start of: WordPress Administration */

	function woo_ce_get_export_type_product_count() {

		$count = 0;
		// Check if the existing Transient exists
		$cached = get_transient( WOO_CE_PREFIX . '_product_count' );
		if( $cached == false ) {
			$post_type = apply_filters( 'woo_ce_get_export_type_product_count_post_types', array( 'product', 'product_variation' ) );
			$args = array(
				'post_type' => $post_type,
				'posts_per_page' => 1,
				'fields' => 'ids',
				'suppress_filters' => 1
			);
			$count_query = new WP_Query( $args );
			$count = $count_query->found_posts;
			set_transient( WOO_CE_PREFIX . '_product_count', $count, HOUR_IN_SECONDS );
		} else {
			$count = $cached;
		}
		return $count;

	}

	// HTML template for Filter Products by Product Category widget on Store Exporter screen
	function woo_ce_products_filter_by_product_category() {

		$args = array(
			'hide_empty' => 1
		);
		$product_categories = woo_ce_get_product_categories( $args );

		ob_start(); ?>
<p><label><input type="checkbox" id="products-filters-categories" /> <?php _e( 'Filter Products by Product Category', 'woocommerce-exporter' ); ?></label></p>
<div id="export-products-filters-categories" class="separator">
	<ul>
		<li>
<?php if( !empty( $product_categories ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product Category...', 'woocommerce-exporter' ); ?>" name="product_filter_category[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $product_categories as $product_category ) { ?>
				<option value="<?php echo $product_category->term_id; ?>"<?php disabled( $product_category->count, 0 ); ?>><?php echo woo_ce_format_product_category_label( $product_category->name, $product_category->parent_name ); ?> (<?php printf( __( 'Term ID: %d', 'woocommerce-exporter' ), $product_category->term_id ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Product Categories were found.', 'woocommerce-exporter' ); ?></li>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Product Categories you want to filter exported Products by. Product Categories not assigned to Products are hidden from view. Default is to include all Product Categories.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-products-filters-categories -->
<?php
		ob_end_flush();

	}

	// HTML template for Filter Products by Product Tag widget on Store Exporter screen
	function woo_ce_products_filter_by_product_tag() {

		$args = array(
			'hide_empty' => 1
		);
		$product_tags = woo_ce_get_product_tags( $args );

		ob_start(); ?>
<p><label><input type="checkbox" id="products-filters-tags" /> <?php _e( 'Filter Products by Product Tag', 'woocommerce-exporter' ); ?></label></p>
<div id="export-products-filters-tags" class="separator">
	<ul>
		<li>
<?php if( !empty( $product_tags ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product Tag...', 'woocommerce-exporter' ); ?>" name="product_filter_tag[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $product_tags as $product_tag ) { ?>
				<option value="<?php echo $product_tag->term_id; ?>"<?php disabled( $product_tag->count, 0 ); ?>><?php echo $product_tag->name; ?> (<?php printf( __( 'Term ID: %d', 'woocommerce-exporter' ), $product_tag->term_id ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Product Tags were found.', 'woocommerce-exporter' ); ?></li>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Product Tags you want to filter exported Products by. Product Tags not assigned to Products are hidden from view. Default is to include all Product Tags.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-products-filters-tags -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Products by Product Brand widget on Store Exporter screen
	function woo_ce_products_filter_by_product_brand() {

		// Check if Brands is available
		if( woo_ce_detect_product_brands() == false )
			return;

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$args = array(
			'hide_empty' => 1,
			'orderby' => 'term_group'
		);
		$product_brands = woo_ce_get_product_brands( $args );

		ob_start(); ?>
<p><label><input type="checkbox" id="products-filters-brands" /> <?php _e( 'Filter Products by Product Brands', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-products-filters-brands" class="separator">
	<ul>
		<li>
<?php if( !empty( $product_brands ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product Brand...', 'woocommerce-exporter' ); ?>" name="product_filter_brand[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $product_brands as $product_brand ) { ?>
				<option value="<?php echo $product_brand->term_id; ?>"<?php disabled( $product_brand->count, 0 ); ?>><?php echo woo_ce_format_product_category_label( $product_brand->name, $product_brand->parent_name ); ?> (<?php printf( __( 'Term ID: %d', 'woocommerce-exporter' ), $product_brand->term_id ); ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Product Brands were found.', 'woocommerce-exporter' ); ?>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Product Brands you want to filter exported Products by. Default is to include all Product Brands.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-products-filters-brands -->
<?php
		ob_end_flush();

	}

	// HTML template for disabled Filter Products by Product Vendor widget on Store Exporter screen
	function woo_ce_products_filter_by_product_vendor() {

		if( class_exists( 'WooCommerce_Product_Vendors' ) == false )
			return;

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		$args = array(
			'hide_empty' => 1
		);
		$product_vendors = woo_ce_get_product_vendors( $args, 'full' );

		ob_start(); ?>
<p><label><input type="checkbox" id="products-filters-vendors" /> <?php _e( 'Filter Products by Product Vendors', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></p>
<div id="export-products-filters-vendors" class="separator">
<?php if( $product_vendors ) { ?>
	<ul>
	<?php foreach( $product_vendors as $product_vendor ) { ?>
		<li>
			<label><input type="checkbox" name="product_filter_vendor[<?php echo $product_vendor->term_id; ?>]" value="<?php echo $product_vendor->term_id; ?>" title="<?php printf( __( 'Term ID: %d', 'woocommerce-exporter' ), $product_vendor->term_id ); ?>"<?php disabled( $product_vendor->count, 0 ); ?> disabled="disabled" /> <?php echo $product_vendor->name; ?></label>
			<span class="description">(<?php echo $product_vendor->count; ?>)</span>
		</li>
	<?php } ?>
	</ul>
	<p class="description"><?php _e( 'Select the Product Vendors you want to filter exported Products by. Default is to include all Product Vendors.', 'woocommerce-exporter' ); ?></p>
<?php } else { ?>
	<p><?php _e( 'No Product Vendors were found.', 'woocommerce-exporter' ); ?></p>
<?php } ?>
</div>
<!-- #export-products-filters-vendors -->
<?php
		ob_end_flush();

	}

	// HTML template for Filter Products by Product Status widget on Store Exporter screen
	function woo_ce_products_filter_by_product_status() {

		$product_statuses = get_post_statuses();
		if( !isset( $product_statuses['trash'] ) )
			$product_statuses['trash'] = __( 'Trash', 'woocommerce-exporter' );

		ob_start(); ?>
<p><label><input type="checkbox" id="products-filters-status" /> <?php _e( 'Filter Products by Product Status', 'woocommerce-exporter' ); ?></label></p>
<div id="export-products-filters-status" class="separator">
	<ul>
		<li>
<?php if( !empty( $product_statuses ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product Status...', 'woocommerce-exporter' ); ?>" name="product_filter_status[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $product_statuses as $key => $product_status ) { ?>
				<option value="<?php echo $key; ?>"><?php echo $product_status; ?></option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Product Status were found.', 'woocommerce-exporter' ); ?></li>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Product Status options you want to filter exported Products by. Default is to include all Product Status options.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-products-filters-status -->
<?php
		ob_end_flush();

	}

	// HTML template for Filter Products by Product Type widget on Store Exporter screen
	function woo_ce_products_filter_by_product_type() {

		$product_types = woo_ce_get_product_types();

		ob_start(); ?>
<p><label><input type="checkbox" id="products-filters-type" /> <?php _e( 'Filter Products by Product Type', 'woocommerce-exporter' ); ?></label></p>
<div id="export-products-filters-type" class="separator">
	<ul>
		<li>
<?php if( !empty( $product_types ) ) { ?>
			<select data-placeholder="<?php _e( 'Choose a Product Type...', 'woocommerce-exporter' ); ?>" name="product_filter_type[]" multiple class="chzn-select" style="width:95%;">
	<?php foreach( $product_types as $key => $product_type ) { ?>
				<option value="<?php echo $key; ?>"><?php echo woo_ce_format_product_type( $product_type['name'] ); ?> (<?php echo $product_type['count']; ?>)</option>
	<?php } ?>
			</select>
<?php } else { ?>
			<?php _e( 'No Product Types were found.', 'woocommerce-exporter' ); ?></li>
<?php } ?>
		</li>
	</ul>
	<p class="description"><?php _e( 'Select the Product Type\'s you want to filter exported Products by. Default is to include all Product Types and Variations.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-products-filters-type -->
<?php
		ob_end_flush();

	}

	// HTML template for Filter Products by Product Type widget on Store Exporter screen
	function woo_ce_products_filter_by_stock_status() {

		// Store Exporter Deluxe
		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		ob_start(); ?>
<p><label><input type="checkbox" id="products-filters-stock" /> <?php _e( 'Filter Products by Stock Status', 'woocommerce-exporter' ); ?></label></p>
<div id="export-products-filters-stock" class="separator">
	<ul>
		<li value=""><label><input type="radio" name="product_filter_stock" value="" checked="checked" /><?php _e( 'Include both', 'woocommerce-exporter' ); ?></label></li>
		<li value="instock"><label><input type="radio" name="product_filter_stock" value="instock" disabled="disabled" /><?php _e( 'In stock', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></li>
		<li value="outofstock"><label><input type="radio" name="product_filter_stock" value="outofstock" disabled="disabled" /><?php _e( 'Out of stock', 'woocommerce-exporter' ); ?><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label></li>
	</ul>
	<p class="description"><?php _e( 'Select the Stock Status\'s you want to filter exported Products by. Default is to include all Stock Status\'s.', 'woocommerce-exporter' ); ?></p>
</div>
<!-- #export-products-filters-stock -->
<?php
		ob_end_flush();

	}

	// HTML template for Product Sorting widget on Store Exporter screen
	function woo_ce_product_sorting() {

		$product_orderby = woo_ce_get_option( 'product_orderby', 'ID' );
		$product_order = woo_ce_get_option( 'product_order', 'DESC' );

		ob_start(); ?>
<p><label><?php _e( 'Product Sorting', 'woocommerce-exporter' ); ?></label></p>
<div>
	<select name="product_orderby">
		<option value="ID"<?php selected( 'ID', $product_orderby ); ?>><?php _e( 'Product ID', 'woocommerce-exporter' ); ?></option>
		<option value="title"<?php selected( 'title', $product_orderby ); ?>><?php _e( 'Product Name', 'woocommerce-exporter' ); ?></option>
		<option value="sku"<?php selected( 'sku', $product_orderby ); ?>><?php _e( 'Product SKU', 'woocommerce-exporter' ); ?></option>
		<option value="date"<?php selected( 'date', $product_orderby ); ?>><?php _e( 'Date Created', 'woocommerce-exporter' ); ?></option>
		<option value="modified"<?php selected( 'modified', $product_orderby ); ?>><?php _e( 'Date Modified', 'woocommerce-exporter' ); ?></option>
		<option value="rand"<?php selected( 'rand', $product_orderby ); ?>><?php _e( 'Random', 'woocommerce-exporter' ); ?></option>
		<option value="menu_order"<?php selected( 'menu_order', $product_orderby ); ?>><?php _e( 'Sort Order', 'woocommerce-exporter' ); ?></option>
	</select>
	<select name="product_order">
		<option value="ASC"<?php selected( 'ASC', $product_order ); ?>><?php _e( 'Ascending', 'woocommerce-exporter' ); ?></option>
		<option value="DESC"<?php selected( 'DESC', $product_order ); ?>><?php _e( 'Descending', 'woocommerce-exporter' ); ?></option>
	</select>
	<p class="description"><?php _e( 'Select the sorting of Products within the exported file. By default this is set to export Products by Product ID in Desending order.', 'woocommerce-exporter' ); ?></p>
</div>
<?php
		ob_end_flush();

	}

	// HTML template for Up-sells formatting on Store Exporter screen
	function woo_ce_products_upsells_formatting() {

		$upsell_formatting = woo_ce_get_option( 'upsell_formatting', 1 );

		ob_start(); ?>
<tr class="export-options product-options">
	<th><label for=""><?php _e( 'Up-sells formatting', 'woocommerce-exporter' ); ?></label></th>
	<td>
		<label><input type="radio" name="product_upsell_formatting" value="0"<?php checked( $upsell_formatting, 0 ); ?> />&nbsp;<?php _e( 'Export Up-Sells as Product ID', 'woocommerce-exporter' ); ?></label><br />
		<label><input type="radio" name="product_upsell_formatting" value="1"<?php checked( $upsell_formatting, 1 ); ?> />&nbsp;<?php _e( 'Export Up-Sells as Product SKU', 'woocommerce-exporter' ); ?></label>
		<p class="description"><?php _e( 'Choose the up-sell formatting that is accepted by your WooCommerce import Plugin (e.g. Product Importer Deluxe, Product Import Suite, etc.).', 'woocommerce-exporter' ); ?></p>
	</td>
</tr>

<?php
		ob_end_flush();

	}

	// HTML template for Cross-sells formatting on Store Exporter screen
	function woo_ce_products_crosssells_formatting() {

		$crosssell_formatting = woo_ce_get_option( 'crosssell_formatting', 1 );

		ob_start(); ?>
<tr class="export-options product-options">
	<th><label for=""><?php _e( 'Cross-sells formatting', 'woocommerce-exporter' ); ?></label></th>
	<td>
		<label><input type="radio" name="product_crosssell_formatting" value="0"<?php checked( $crosssell_formatting, 0 ); ?> />&nbsp;<?php _e( 'Export Cross-Sells as Product ID', 'woocommerce-exporter' ); ?></label><br />
		<label><input type="radio" name="product_crosssell_formatting" value="1"<?php checked( $crosssell_formatting, 1 ); ?> />&nbsp;<?php _e( 'Export Cross-Sells as Product SKU', 'woocommerce-exporter' ); ?></label>
		<p class="description"><?php _e( 'Choose the cross-sell formatting that is accepted by your WooCommerce import Plugin (e.g. Product Importer Deluxe, Product Import Suite, etc.).', 'woocommerce-exporter' ); ?></p>
	</td>
</tr>

<?php
		ob_end_flush();

	}

	// HTML template for Custom Products widget on Store Exporter screen
	function woo_ce_products_custom_fields() {

		// Store Exporter Deluxe
		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		if( $custom_products = woo_ce_get_option( 'custom_products', '' ) )
			$custom_products = implode( "\n", $custom_products );
		$custom_attributes = '';

		$troubleshooting_url = 'http://www.visser.com.au/documentation/store-exporter-deluxe/usage/';

		ob_start(); ?>
<form method="post" id="export-products-custom-fields" class="export-options product-options">
	<div id="poststuff">

		<div class="postbox" id="export-options product-options">
			<h3 class="hndle"><?php _e( 'Custom Product Fields', 'woocommerce-exporter' ); ?></h3>
			<div class="inside">
				<p class="description"><?php _e( 'To include additional custom Product meta or custom Attributes in the Export Products table above fill the meta text box then click Save Custom Fields.', 'woocommerce-exporter' ); ?></p>
				<table class="form-table">

					<tr>
						<th>
							<label><?php _e( 'Product meta', 'woocommerce-exporter' ); ?></label>
						</th>
						<td>
							<textarea name="custom_products" rows="5" cols="70"><?php echo esc_textarea( $custom_products ); ?></textarea>
							<p class="description"><?php _e( 'Include additional custom Product meta in your export file by adding each custom Product meta name to a new line above.<br />For example: <code>Customer UA</code> (new line) <code>Customer IP Address</code>', 'woocommerce-exporter' ); ?></p>
						</td>
					</tr>

					<tr>
						<th>
							<label><?php _e( 'Custom attribute', 'woocommerce-exporter' ); ?></label>
						</th>
						<td>
							<textarea name="custom_attributes" rows="5" cols="70" disabled="disabled"><?php echo esc_textarea( $custom_attributes ); ?></textarea><br /><span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span>
							<p class="description"><?php _e( 'Include custom Attributes in your export file by adding each custom Attribute name to a new line above.<br />For example: <code>condition</code> (new line) <code>colour</code>', 'woocommerce-exporter' ); ?></p>
						</td>
					</tr>

					<?php do_action( 'woo_ce_products_custom_fields' ); ?>

				</table>
				<p class="submit">
					<input type="submit" value="<?php _e( 'Save Custom Fields', 'woocommerce-exporter' ); ?>" class="button" />
				</p>
				<p class="description"><?php printf( __( 'For more information on custom Product meta and Attributes consult our <a href="%s" target="_blank">online documentation</a>.', 'woocommerce-exporter' ), $troubleshooting_url ); ?></p>
			</div>
			<!-- .inside -->
		</div>
		<!-- .postbox -->

	</div>
	<!-- #poststuff -->
	<input type="hidden" name="action" value="update" />
</form>
<!-- #export-products-custom-fields -->
<?php
		ob_end_flush();

	}

	function woo_ce_export_options_gallery_format() {

		$woo_cd_url = 'http://www.visser.com.au/woocommerce/plugins/exporter-deluxe/';
		$woo_cd_link = sprintf( '<a href="%s" target="_blank">' . __( 'Store Exporter Deluxe', 'woocommerce-exporter' ) . '</a>', $woo_cd_url );

		ob_start(); ?>
<tr class="export-options product-options">
	<th><label for=""><?php _e( 'Product gallery formatting', 'woocommerce-exporter' ); ?></label></th>
	<td>
		<label><input type="radio" name="product_gallery_formatting" value="0"<?php checked( 0, 0 ); ?> />&nbsp;<?php _e( 'Export Product Gallery as Attachment ID', 'woocommerce-exporter' ); ?></label><br />
		<label><input type="radio" name="product_gallery_formatting" value="1" disabled="disabled" />&nbsp;<?php _e( 'Export Product Gallery as Image URL', 'woocommerce-exporter' ); ?> <span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label><br />
		<label><input type="radio" name="product_gallery_formatting" value="2" disabled="disabled" />&nbsp;<?php _e( 'Export Product Gallery as Image filepath', 'woocommerce-exporter' ); ?> <span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label>
		<hr />
		<label><input type="radio" name="product_gallery_unique" value="0"<?php checked( 0, 0 ); ?> />&nbsp;<?php _e( 'Export Product Gallery as a single combined image cell', 'woocommerce-exporter' ); ?></label><br />
		<label><input type="radio" name="product_gallery_unique" value="1" disabled="disabled" />&nbsp;<?php _e( 'Export Product Gallery as individual image cells', 'woocommerce-exporter' ); ?> <span class="description"> - <?php printf( __( 'available in %s', 'woocommerce-exporter' ), $woo_cd_link ); ?></span></label>
		<p class="description"><?php _e( 'Choose the product gallery formatting that is accepted by your WooCommerce import Plugin (e.g. Product Importer Deluxe, Product Import Suite, etc.).', 'woocommerce-exporter' ); ?></p>
	</td>
</tr>
<?php
		ob_end_flush();

	}

	/* End of: WordPress Administration */

}

// Returns a list of Product export columns
function woo_ce_get_product_fields( $format = 'full' ) {

	$export_type = 'product';

	$fields = array();
	$fields[] = array(
		'name' => 'parent_id',
		'label' => __( 'Parent ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'parent_sku',
		'label' => __( 'Parent SKU', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'product_id',
		'label' => __( 'Product ID', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'sku',
		'label' => __( 'Product SKU', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'name',
		'label' => __( 'Product Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'post_title',
		'label' => __( 'Post Title', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'slug',
		'label' => __( 'Slug', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'permalink',
		'label' => __( 'Permalink', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'product_url',
		'label' => __( 'Product URL', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'description',
		'label' => __( 'Description', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'excerpt',
		'label' => __( 'Excerpt', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'post_date',
		'label' => __( 'Product Published', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'post_modified',
		'label' => __( 'Product Modified', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'type',
		'label' => __( 'Type', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'visibility',
		'label' => __( 'Visibility', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'featured',
		'label' => __( 'Featured', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'virtual',
		'label' => __( 'Virtual', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'downloadable',
		'label' => __( 'Downloadable', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'price',
		'label' => __( 'Price', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'sale_price',
		'label' => __( 'Sale Price', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'sale_price_dates_from',
		'label' => __( 'Sale Price Dates From', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'sale_price_dates_to',
		'label' => __( 'Sale Price Dates To', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'weight',
		'label' => __( 'Weight', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'weight_unit',
		'label' => __( 'Weight Unit', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'height',
		'label' => __( 'Height', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'height_unit',
		'label' => __( 'Height Unit', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'width',
		'label' => __( 'Width', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'width_unit',
		'label' => __( 'Width Unit', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'length',
		'label' => __( 'Length', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'length_unit',
		'label' => __( 'Length Unit', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'category',
		'label' => __( 'Category', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'tag',
		'label' => __( 'Tag', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'image',
		'label' => __( 'Featured Image', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'image_thumbnail',
		'label' => __( 'Featured Image Thumbnail', 'woocommerce-exporter' ),
		'disabled' => 1
	);
	$fields[] = array(
		'name' => 'image_embed',
		'label' => __( 'Featured Image (Embed)', 'woocommerce-exporter' ),
		'disabled' => 1
	);
	$fields[] = array(
		'name' => 'product_gallery',
		'label' => __( 'Product Gallery', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'product_gallery_thumbnail',
		'label' => __( 'Product Gallery Thumbnail', 'woocommerce-exporter' ),
		'disabled' => 1
	);
	$fields[] = array(
		'name' => 'tax_status',
		'label' => __( 'Tax Status', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'tax_class',
		'label' => __( 'Tax Class', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'shipping_class',
		'label' => __( 'Shipping Class', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'download_file_name',
		'label' => __( 'Download File Name', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'download_file_path',
		'label' => __( 'Download File URL Path', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'download_limit',
		'label' => __( 'Download Limit', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'download_expiry',
		'label' => __( 'Download Expiry', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'download_type',
		'label' => __( 'Download Type', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'manage_stock',
		'label' => __( 'Manage Stock', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'quantity',
		'label' => __( 'Quantity', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'stock_status',
		'label' => __( 'Stock Status', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'allow_backorders',
		'label' => __( 'Allow Backorders', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'sold_individually',
		'label' => __( 'Sold Individually', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'total_sales',
		'label' => __( 'Total Sales', 'woocommerce-exporter' ),
		'disabled' => 1
	);
	$fields[] = array(
		'name' => 'upsell_ids',
		'label' => __( 'Up-Sells', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'crosssell_ids',
		'label' => __( 'Cross-Sells', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'external_url',
		'label' => __( 'External URL', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'button_text',
		'label' => __( 'Button Text', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'purchase_note',
		'label' => __( 'Purchase Note', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'product_status',
		'label' => __( 'Product Status', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'enable_reviews',
		'label' => __( 'Enable Reviews', 'woocommerce-exporter' )
	);
	$fields[] = array(
		'name' => 'review_count',
		'label' => __( 'Review Count', 'woocommerce-exporter' ),
		'disabled' => 1
	);
	$fields[] = array(
		'name' => 'rating_count',
		'label' => __( 'Rating Count', 'woocommerce-exporter' ),
		'disabled' => 1
	);
	$fields[] = array(
		'name' => 'average_rating',
		'label' => __( 'Average rating', 'woocommerce-exporter' ),
		'disabled' => 1
	);
	$fields[] = array(
		'name' => 'menu_order',
		'label' => __( 'Sort Order', 'woocommerce-exporter' )
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
	$fields = apply_filters( sprintf( WOO_CE_PREFIX . '_%s_fields', $export_type ), $fields, $export_type );

	// Remove our content filters here to play nice with other Plugins
	remove_filter( 'sanitize_key', 'woo_ce_sanitize_key' );

	$remember = woo_ce_get_option( $export_type . '_fields', array() );
	if( !empty( $remember ) ) {
		$remember = maybe_unserialize( $remember );
		$size = count( $fields );
		for( $i = 0; $i < $size; $i++ ) {
			$fields[$i]['disabled'] = ( isset( $fields[$i]['disabled'] ) ? $fields[$i]['disabled'] : 0 );
			$fields[$i]['default'] = 1;
			if( !array_key_exists( $fields[$i]['name'], $remember ) )
				$fields[$i]['default'] = 0;
		}
	}

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

function woo_ce_override_product_field_labels( $fields = array() ) {

	$labels = woo_ce_get_option( 'product_labels', array() );
	if( !empty( $labels ) ) {
		foreach( $fields as $key => $field ) {
			if( isset( $labels[$field['name']] ) )
				$fields[$key]['label'] = $labels[$field['name']];
		}
	}
	return $fields;

}
add_filter( 'woo_ce_product_fields', 'woo_ce_override_product_field_labels', 11 );

function woo_ce_extend_product_fields( $fields ) {

/*
	// Attributes
	if( $attributes = woo_ce_get_product_attributes() ) {
		foreach( $attributes as $attribute ) {
			if( empty( $attribute->attribute_label ) )
				$attribute->attribute_label = $attribute->attribute_name;
			$fields[] = array(
				'name' => sprintf( 'attribute_%s', $attribute->attribute_name ),
				'label' => sprintf( __( 'Attribute: %s', 'woocommerce-exporter' ), $attribute->attribute_label )
			);
		}
	}
*/

	// Advanced Google Product Feed - http://www.leewillis.co.uk/wordpress-plugins/
	if( function_exists( 'woocommerce_gpf_install' ) ) {
		$fields[] = array(
			'name' => 'gpf_availability',
			'label' => __( 'Advanced Google Product Feed - Availability', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_condition',
			'label' => __( 'Advanced Google Product Feed - Condition', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_brand',
			'label' => __( 'Advanced Google Product Feed - Brand', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_product_type',
			'label' => __( 'Advanced Google Product Feed - Product Type', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_google_product_category',
			'label' => __( 'Advanced Google Product Feed - Google Product Category', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_gtin',
			'label' => __( 'Advanced Google Product Feed - Global Trade Item Number (GTIN)', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_mpn',
			'label' => __( 'Advanced Google Product Feed - Manufacturer Part Number (MPN)', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_gender',
			'label' => __( 'Advanced Google Product Feed - Gender', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_agegroup',
			'label' => __( 'Advanced Google Product Feed - Age Group', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_colour',
			'label' => __( 'Advanced Google Product Feed - Colour', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'gpf_size',
			'label' => __( 'Advanced Google Product Feed - Size', 'woocommerce-exporter' ),
			'hover' => __( 'Advanced Google Product Feed', 'woocommerce-exporter' )
		);
	}

	// All in One SEO Pack - http://wordpress.org/extend/plugins/all-in-one-seo-pack/
	if( function_exists( 'aioseop_activate' ) ) {
		$fields[] = array(
			'name' => 'aioseop_keywords',
			'label' => __( 'All in One SEO - Keywords', 'woocommerce-exporter' ),
			'hover' => __( 'All in One SEO Pack', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'aioseop_description',
			'label' => __( 'All in One SEO - Description', 'woocommerce-exporter' ),
			'hover' => __( 'All in One SEO Pack', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'aioseop_title',
			'label' => __( 'All in One SEO - Title', 'woocommerce-exporter' ),
			'hover' => __( 'All in One SEO Pack', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'aioseop_title_attributes',
			'label' => __( 'All in One SEO - Title Attributes', 'woocommerce-exporter' ),
			'hover' => __( 'All in One SEO Pack', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'aioseop_menu_label',
			'label' => __( 'All in One SEO - Menu Label', 'woocommerce-exporter' ),
			'hover' => __( 'All in One SEO Pack', 'woocommerce-exporter' )
		);
	}

	// WordPress SEO - http://wordpress.org/plugins/wordpress-seo/
	if( function_exists( 'wpseo_admin_init' ) ) {
		$fields[] = array(
			'name' => 'wpseo_focuskw',
			'label' => __( 'WordPress SEO - Focus Keyword', 'woocommerce-exporter' ),
			'hover' => __( 'WordPress SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'wpseo_metadesc',
			'label' => __( 'WordPress SEO - Meta Description', 'woocommerce-exporter' ),
			'hover' => __( 'WordPress SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'wpseo_title',
			'label' => __( 'WordPress SEO - SEO Title', 'woocommerce-exporter' ),
			'hover' => __( 'WordPress SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'wpseo_googleplus_description',
			'label' => __( 'WordPress SEO - Google+ Description', 'woocommerce-exporter' ),
			'hover' => __( 'WordPress SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'wpseo_opengraph_description',
			'label' => __( 'WordPress SEO - Facebook Description', 'woocommerce-exporter' ),
			'hover' => __( 'WordPress SEO', 'woocommerce-exporter' )
		);
	}

	// Ultimate SEO - http://wordpress.org/plugins/seo-ultimate/
	if( function_exists( 'su_wp_incompat_notice' ) ) {
		$fields[] = array(
			'name' => 'useo_meta_title',
			'label' => __( 'Ultimate SEO - Title Tag', 'woocommerce-exporter' ),
			'hover' => __( 'Ultimate SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'useo_meta_description',
			'label' => __( 'Ultimate SEO - Meta Description', 'woocommerce-exporter' ),
			'hover' => __( 'Ultimate SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'useo_meta_keywords',
			'label' => __( 'Ultimate SEO - Meta Keywords', 'woocommerce-exporter' ),
			'hover' => __( 'Ultimate SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'useo_social_title',
			'label' => __( 'Ultimate SEO - Social Title', 'woocommerce-exporter' ),
			'hover' => __( 'Ultimate SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'useo_social_description',
			'label' => __( 'Ultimate SEO - Social Description', 'woocommerce-exporter' ),
			'hover' => __( 'Ultimate SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'useo_meta_noindex',
			'label' => __( 'Ultimate SEO - NoIndex', 'woocommerce-exporter' ),
			'hover' => __( 'Ultimate SEO', 'woocommerce-exporter' )
		);
		$fields[] = array(
			'name' => 'useo_meta_noautolinks',
			'label' => __( 'Ultimate SEO - Disable Autolinks', 'woocommerce-exporter' ),
			'hover' => __( 'Ultimate SEO', 'woocommerce-exporter' )
		);
	}

	// WooCommerce MSRP Pricing - http://woothemes.com/woocommerce/
	if( function_exists( 'woocommerce_msrp_activate' ) ) {
		$fields[] = array(
			'name' => 'msrp',
			'label' => __( 'MSRP', 'woocommerce-exporter' ),
			'hover' => __( 'Manufacturer Suggested Retail Price (MSRP)', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// WooCommerce Brands Addon - http://woothemes.com/woocommerce/
	// WooCommerce Brands - http://proword.net/Woocommerce_Brands/
	if( woo_ce_detect_product_brands() ) {
		$fields[] = array(
			'name' => 'brands',
			'label' => __( 'Brands', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Brands', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// Cost of Goods - http://www.skyverge.com/product/woocommerce-cost-of-goods-tracking/
	if( class_exists( 'WC_COG' ) ) {
		$fields[] = array(
			'name' => 'cost_of_goods',
			'label' => __( 'Cost of Goods', 'woocommerce-exporter' ),
			'hover' => __( 'Cost of Goods', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// Per-Product Shipping - http://www.woothemes.com/products/per-product-shipping/
	if( function_exists( 'woocommerce_per_product_shipping_init' ) ) {
		$fields[] = array(
			'name' => 'per_product_shipping',
			'label' => __( 'Per-Product Shipping', 'woocommerce-exporter' ),
			'hover' => __( 'Per-Product Shipping', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// Product Vendors - http://www.woothemes.com/products/product-vendors/
	if( class_exists( 'WooCommerce_Product_Vendors' ) ) {
		$fields[] = array(
			'name' => 'vendors',
			'label' => __( 'Product Vendors', 'woocommerce-exporter' ),
			'hover' => __( 'Product Vendors', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'vendor_ids',
			'label' => __( 'Product Vendor ID\'s', 'woocommerce-exporter' ),
			'hover' => __( 'Product Vendors', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'vendor_commission',
			'label' => __( 'Vendor Commission', 'woocommerce-exporter' ),
			'hover' => __( 'Product Vendors', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// WC Vendors - http://wcvendors.com
	if( class_exists( 'WC_Vendors' ) ) {
		$fields[] = array(
			'name' => 'vendor',
			'label' => __( 'Vendor' ),
			'hover' => __( 'WC Vendors', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'vendor_commission_rate',
			'label' => __( 'Commission (%)' ),
			'hover' => __( 'WC Vendors', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// WooCommerce Wholesale Pricing - http://ignitewoo.com/woocommerce-extensions-plugins-themes/woocommerce-wholesale-pricing/
	if( class_exists( 'woocommerce_wholesale_pricing' ) ) {
		$fields[] = array(
			'name' => 'wholesale_price',
			'label' => __( 'Wholesale Price', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Wholesale Pricing', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'wholesale_price_text',
			'label' => __( 'Wholesale Text', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Wholesale Pricing', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// Advanced Custom Fields - http://www.advancedcustomfields.com
	if( class_exists( 'acf' ) ) {
		$custom_fields = woo_ce_get_acf_product_fields();
		if( !empty( $custom_fields ) ) {
			foreach( $custom_fields as $custom_field ) {
				$fields[] = array(
					'name' => $custom_field['name'],
					'label' => $custom_field['label'],
					'hover' => __( 'Advanced Custom Fields', 'woocommerce-exporter' ),
					'disabled' => 1
				);
			}
			unset( $custom_fields, $custom_field );
		}
	}

	// WooCommerce Subscriptions -
	if( class_exists( 'WC_Subscriptions_Manager' ) ) {
		$fields[] = array(
			'name' => 'subscription_price',
			'label' => __( 'Subscription Price', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'subscription_period_interval',
			'label' => __( 'Subscription Period Interval', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'subscription_period',
			'label' => __( 'Subscription Period', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'subscription_length',
			'label' => __( 'Subscription Length', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'subscription_sign_up_fee',
			'label' => __( 'Subscription Sign-up Fee', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'subscription_trial_length',
			'label' => __( 'Subscription Trial Length', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'subscription_trial_period',
			'label' => __( 'Subscription Trial Period', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'subscription_limit',
			'label' => __( 'Limit Subscription', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Subscriptions', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// WooCommerce Bookings - http://www.woothemes.com/products/woocommerce-bookings/
	if( class_exists( 'WC_Bookings' ) ) {
		$fields[] = array(
			'name' => 'booking_has_persons',
			'label' => __( 'Booking Has Persons', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'booking_has_resources',
			'label' => __( 'Booking Has Resources', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'booking_base_cost',
			'label' => __( 'Booking Base Cost', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'booking_block_cost',
			'label' => __( 'Booking Block Cost', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'booking_display_cost',
			'label' => __( 'Booking Display Cost', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'booking_requires_confirmation',
			'label' => __( 'Booking Requires Confirmation', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'booking_user_can_cancel',
			'label' => __( 'Booking Can Be Cancelled', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Bookings', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// Barcodes for WooCommerce - http://www.wolkenkraft.com/produkte/barcodes-fuer-woocommerce/
	if( function_exists( 'wpps_requirements_met' ) ) {
		$fields[] = array(
			'name' => 'barcode_type',
			'label' => __( 'Barcode Type', 'woocommerce-exporter' ),
			'hover' => __( 'Barcodes for WooCommerce', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'barcode',
			'label' => __( 'Barcode', 'woocommerce-exporter' ),
			'hover' => __( 'Barcodes for WooCommerce', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// WooCommerce Pre-Orders - http://www.woothemes.com/products/woocommerce-pre-orders/
	if( class_exists( 'WC_Pre_Orders' ) ) {
		$fields[] = array(
			'name' => 'pre_orders_enabled',
			'label' => __( 'Pre-Order Enabled', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Pre-Orders', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'pre_orders_availability_date',
			'label' => __( 'Pre-Order Availability Date', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Pre-Orders', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'pre_orders_fee',
			'label' => __( 'Pre-Order Fee', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Pre-Orders', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'pre_orders_charge',
			'label' => __( 'Pre-Order Charge', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Pre-Orders', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// WooCommerce Product Fees - https://wordpress.org/plugins/woocommerce-product-fees/
	if( class_exists( 'WooCommerce_Product_Fees' ) ) {
		$fields[] = array(
			'name' => 'fee_name',
			'label' => __( 'Product Fee Name', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Product Fees', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'fee_amount',
			'label' => __( 'Product Fee Amount', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Product Fees', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'fee_multiplier',
			'label' => __( 'Product Fee Multiplier', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Product Fees', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// WooCommerce Events - http://www.woocommerceevents.com/
	if( class_exists( 'WooCommerce_Events' ) ) {
		$fields[] = array(
			'name' => 'is_event',
			'label' => __( 'Is Event', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_date',
			'label' => __( 'Event Date', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_start_time',
			'label' => __( 'Event Start Time', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_end_time',
			'label' => __( 'Event End Time', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_venue',
			'label' => __( 'Event Venue', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_gps',
			'label' => __( 'Event GPS Coordinates', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_googlemaps',
			'label' => __( 'Event Google Maps Coordinates', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_directions',
			'label' => __( 'Event Directions', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_phone',
			'label' => __( 'Event Phone', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_email',
			'label' => __( 'Event E-mail', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_ticket_logo',
			'label' => __( 'Event Ticket Logo', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
		$fields[] = array(
			'name' => 'event_ticket_text',
			'label' => __( 'Event Ticket Text', 'woocommerce-exporter' ),
			'hover' => __( 'WooCommerce Events', 'woocommerce-exporter' ),
			'disabled' => 1
		);
	}

	// Custom Product meta
	$custom_products = woo_ce_get_option( 'custom_products', '' );
	if( !empty( $custom_products ) ) {
		foreach( $custom_products as $custom_product ) {
			if( !empty( $custom_product ) ) {
				$fields[] = array(
					'name' => $custom_product,
					'label' => woo_ce_clean_export_label( $custom_product ),
					'hover' => sprintf( apply_filters( 'woo_ce_extend_product_fields_custom_product_hover', '%s: %s' ), __( 'Custom Product', 'woocommerce-exporter' ), $custom_product )
				);
			}
		}
	}
	unset( $custom_products, $custom_product );

	return $fields;

}
add_filter( 'woo_ce_product_fields', 'woo_ce_extend_product_fields' );

// Returns the export column header label based on an export column slug
function woo_ce_get_product_field( $name = null, $format = 'name' ) {

	$output = '';
	if( $name ) {
		$fields = woo_ce_get_product_fields();
		$size = count( $fields );
		for( $i = 0; $i < $size; $i++ ) {
			if( $fields[$i]['name'] == $name ) {
				switch( $format ) {

					case 'name':
						$output = $fields[$i]['label'];
						break;

					case 'full':
						$output = $fields[$i];
						break;

				}
				$i = $size;
			}
		}
	}
	return $output;

}

// Returns a list of WooCommerce Product IDs to export process
function woo_ce_get_products( $args = array() ) {

	global $export;

	$limit_volume = -1;
	$offset = 0;
	$product_categories = false;
	$product_tags = false;
	$product_status = false;
	$product_type = false;
	$orderby = 'ID';
	$order = 'ASC';
	if( $args ) {
		$limit_volume = ( isset( $args['limit_volume'] ) ? $args['limit_volume'] : false );
		$offset = ( isset( $args['offset'] ) ? $args['offset'] : false );
		if( !empty( $args['product_categories'] ) )
			$product_categories = $args['product_categories'];
		if( !empty( $args['product_tags'] ) )
			$product_tags = $args['product_tags'];
		if( !empty( $args['product_status'] ) )
			$product_status = $args['product_status'];
		if( !empty( $args['product_type'] ) )
			$product_type = $args['product_type'];
		if( isset( $args['product_orderby'] ) )
			$orderby = $args['product_orderby'];
		if( isset( $args['product_order'] ) )
			$order = $args['product_order'];
	}
	$post_type = array( 'product', 'product_variation' );
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
	$args['tax_query'] = array();
	// Filter Products by Product Category
	if( $product_categories ) {
		$term_taxonomy = 'product_cat';
		$args['tax_query'][] = array(
			array(
				'taxonomy' => $term_taxonomy,
				'field' => 'id',
				'terms' => $product_categories
			)
		);
	}
	// Filter Products by Product Tag
	if( $product_tags ) {
		$term_taxonomy = 'product_tag';
		$args['tax_query'][] = array(
			array(
				'taxonomy' => $term_taxonomy,
				'field' => 'id',
				'terms' => $product_tags
			)
		);
	}
	if( $product_status )
		$args['post_status'] = woo_ce_post_statuses( $product_status, true );
	if( $product_type ) {
		if( in_array( 'variation', $product_type ) && count( $product_type ) == 1 )
			$args['post_type'] = array( 'product_variation' );
		if( !empty( $product_type ) ) {
			$term_taxonomy = 'product_type';
			$args['tax_query'] = array(
				array(
					'taxonomy' => $term_taxonomy,
					'field' => 'slug',
					'terms' => $product_type
				)
			);
		} else {
			unset( $args['meta_query'] );
		}
	}
	// Sort Products by SKU
	if( $orderby == 'sku' ) {
		$args['orderby'] = 'meta_value';
		$args['meta_key'] = '_sku';
	}
	$products = array();
	$product_ids = new WP_Query( $args );
	if( $product_ids->posts ) {
		foreach( $product_ids->posts as $product_id ) {

			// Get Product details
			$product = get_post( $product_id );

			// Filter out variations that don't have a Parent Product that exists
			if( isset( $product->post_type ) && $product->post_type == 'product_variation' ) {
				// Check if Parent exists
				if( $product->post_parent ) {
					if( !get_post( $product->post_parent ) ) {
						unset( $product_id, $product );
						continue;
					}
				}
			}
			if( isset( $product_id ) )
				$products[] = $product_id;
		}
		// Only populate the $export Global if it is an export
		if( isset( $export ) )
			$export->total_rows = count( $products );
		unset( $product_ids, $product_id );
	}
	return $products;

}

function woo_ce_get_product_data( $product_id = 0, $args = array() ) {

	// Get Product defaults
	$weight_unit = get_option( 'woocommerce_weight_unit' );
	$dimension_unit = get_option( 'woocommerce_dimension_unit' );
	$height_unit = $dimension_unit;
	$width_unit = $dimension_unit;
	$length_unit = $dimension_unit;

	$product = get_post( $product_id );
	$_product = ( function_exists( 'wc_get_product' ) ? wc_get_product( $product_id ) : false );

	$product->parent_id = '';
	$product->parent_sku = '';
	if( $product->post_type == 'product_variation' ) {
		// Assign Parent ID for Variants then check if Parent exists
		if( $product->parent_id = $product->post_parent )
			$product->parent_sku = get_post_meta( $product->post_parent, '_sku', true );
		else
			$product->parent_id = '';
	}
	$product->product_id = $product_id;
	$product->sku = get_post_meta( $product_id, '_sku', true );
	$product->name = get_the_title( $product_id );
	$product->permalink = get_permalink( $product_id );
	$product->product_url = ( method_exists( $_product, 'get_permalink' ) ? $_product->get_permalink() : get_permalink( $product_id ) );
	$product->slug = $product->post_name;
	$product->description = $product->post_content;
	$product->excerpt = $product->post_excerpt;
	$product->regular_price = get_post_meta( $product_id, '_regular_price', true );
	// Check that a valid price has been provided and that wc_format_localized_price() exists
	if( isset( $product->regular_price ) && $product->regular_price != '' && function_exists( 'wc_format_localized_price' ) )
		$product->regular_price = wc_format_localized_price( $product->regular_price );
	$product->price = get_post_meta( $product_id, '_price', true );
	if( $product->regular_price != '' && ( $product->regular_price <> $product->price ) )
		$product->price = $product->regular_price;
	// Check that a valid price has been provided and that wc_format_localized_price() exists
	if( isset( $product->price ) && $product->price != '' && function_exists( 'wc_format_localized_price' ) )
		$product->price = wc_format_localized_price( $product->price );
	$product->sale_price = get_post_meta( $product_id, '_sale_price', true );
	// Check that a valid price has been provided and that wc_format_localized_price() exists
	if( isset( $product->sale_price ) && $product->sale_price != '' && function_exists( 'wc_format_localized_price' ) )
		$product->sale_price = wc_format_localized_price( $product->sale_price );
	$product->sale_price_dates_from = woo_ce_format_product_sale_price_dates( get_post_meta( $product_id, '_sale_price_dates_from', true ) );
	$product->sale_price_dates_to = woo_ce_format_product_sale_price_dates( get_post_meta( $product_id, '_sale_price_dates_to', true ) );
	$product->post_date = woo_ce_format_date( $product->post_date );
	$product->post_modified = woo_ce_format_date( $product->post_modified );
	$product->type = woo_ce_get_product_assoc_type( $product_id );
	if( $product->post_type == 'product_variation' )
		$product->type = __( 'Variation', 'woocommerce-exporter' );
	$product->visibility = woo_ce_format_product_visibility( get_post_meta( $product_id, '_visibility', true ) );
	$product->featured = woo_ce_format_switch( get_post_meta( $product_id, '_featured', true ) );
	$product->virtual = woo_ce_format_switch( get_post_meta( $product_id, '_virtual', true ) );
	$product->downloadable = woo_ce_format_switch( get_post_meta( $product_id, '_downloadable', true ) );
	$product->weight = get_post_meta( $product_id, '_weight', true );
	$product->weight_unit = ( $product->weight != '' ? $weight_unit : '' );
	$product->height = get_post_meta( $product_id, '_height', true );
	$product->height_unit = ( $product->height != '' ? $height_unit : '' );
	$product->width = get_post_meta( $product_id, '_width', true );
	$product->width_unit = ( $product->width != '' ? $width_unit : '' );
	$product->length = get_post_meta( $product_id, '_length', true );
	$product->length_unit = ( $product->length != '' ? $length_unit : '' );
	$product->category = woo_ce_get_product_assoc_categories( $product_id, $product->parent_id );
	$product->tag = woo_ce_get_product_assoc_tags( $product_id );
	$product->manage_stock = woo_ce_format_switch( get_post_meta( $product_id, '_manage_stock', true ) );
	$product->allow_backorders = woo_ce_format_switch( get_post_meta( $product_id, '_backorders', true ) );
	$product->sold_individually = woo_ce_format_switch( get_post_meta( $product_id, '_sold_individually', true ) );
	$product->upsell_ids = woo_ce_get_product_assoc_upsell_ids( $product_id );
	$product->crosssell_ids = woo_ce_get_product_assoc_crosssell_ids( $product_id );
	$product->quantity = get_post_meta( $product_id, '_stock', true );
	$product->stock_status = woo_ce_format_product_stock_status( get_post_meta( $product_id, '_stock_status', true ), $product->quantity );
	$product->image = woo_ce_get_product_assoc_featured_image( $product_id );
	$product->product_gallery = woo_ce_get_product_assoc_product_gallery( $product_id );
	$product->tax_status = woo_ce_format_product_tax_status( get_post_meta( $product_id, '_tax_status', true ) );
	$product->tax_class = woo_ce_format_product_tax_class( get_post_meta( $product_id, '_tax_class', true ) );
	$product->shipping_class = woo_ce_get_product_assoc_shipping_class( $product_id );
	$product->external_url = get_post_meta( $product_id, '_product_url', true );
	$product->button_text = get_post_meta( $product_id, '_button_text', true );
	$product->file_download = woo_ce_get_product_assoc_file_downloads( $product_id );
	$product->download_limit = get_post_meta( $product_id, '_download_limit', true );
	$product->download_expiry = get_post_meta( $product_id, '_download_expiry', true );
	$product->download_type = woo_ce_format_product_download_type( get_post_meta( $product_id, '_download_type', true ) );
	$product->purchase_note = get_post_meta( $product_id, '_purchase_note', true );
	$product->product_status = woo_ce_format_product_status( $product->post_status );
	$product->enable_reviews = woo_ce_format_comment_status( $product->comment_status );
	$product->menu_order = $product->menu_order;
	unset( $_product );

	// Scan for global Attributes first
	$attributes = woo_ce_get_product_attributes();
	if( !empty( $attributes ) && $product->post_type == 'product_variation' ) {
		// We're dealing with a single Variation, strap yourself in.
		foreach( $attributes as $attribute ) {
			$attribute_value = get_post_meta( $product_id, sprintf( 'attribute_pa_%s', $attribute->attribute_name ), true );
			if( !empty( $attribute_value ) ) {
				$term_id = term_exists( $attribute_value, sprintf( 'pa_%s', $attribute->attribute_name ) );
				if( $term_id !== 0 && $term_id !== null && !is_wp_error( $term_id ) ) {
					$term = get_term( $term_id['term_id'], sprintf( 'pa_%s', $attribute->attribute_name ) );
					$attribute_value = $term->name;
					unset( $term );
				}
				unset( $term_id );
			}
			$product->{'attribute_' . $attribute->attribute_name} = $attribute_value;
			unset( $attribute_value );
		}
	} else {
		// Either the Variation Parent or a Simple Product, scan for global and custom Attributes
		$product->attributes = maybe_unserialize( get_post_meta( $product_id, '_product_attributes', true ) );
		if( !empty( $product->attributes ) ) {
			// Check for taxonomy-based attributes
			foreach( $attributes as $attribute ) {
				if( isset( $product->attributes['pa_' . $attribute->attribute_name] ) )
					$product->{'attribute_' . $attribute->attribute_name} = woo_ce_get_product_assoc_attributes( $product_id, $product->attributes['pa_' . $attribute->attribute_name], 'product' );
				else
					$product->{'attribute_' . $attribute->attribute_name} = woo_ce_get_product_assoc_attributes( $product_id, $attribute, 'global' );
			}
			// Check for per-Product attributes (custom)
			foreach( $product->attributes as $key => $attribute ) {
				if( $attribute['is_taxonomy'] == 0 ) {
					if( !isset( $product->{'attribute_' . $key} ) )
						$product->{'attribute_' . $key} = $attribute['value'];
				}
			}
		}
	}

	// Advanced Google Product Feed - http://plugins.leewillis.co.uk/downloads/wp-e-commerce-product-feeds/
	if( function_exists( 'woocommerce_gpf_install' ) ) {
		$product->gpf_data = get_post_meta( $product_id, '_woocommerce_gpf_data', true );
		$product->gpf_availability = ( isset( $product->gpf_data['availability'] ) ? woo_ce_format_gpf_availability( $product->gpf_data['availability'] ) : '' );
		$product->gpf_condition = ( isset( $product->gpf_data['condition'] ) ? woo_ce_format_gpf_condition( $product->gpf_data['condition'] ) : '' );
		$product->gpf_brand = ( isset( $product->gpf_data['brand'] ) ? $product->gpf_data['brand'] : '' );
		$product->gpf_product_type = ( isset( $product->gpf_data['product_type'] ) ? $product->gpf_data['product_type'] : '' );
		$product->gpf_google_product_category = ( isset( $product->gpf_data['google_product_category'] ) ? $product->gpf_data['google_product_category'] : '' );
		$product->gpf_gtin = ( isset( $product->gpf_data['gtin'] ) ? $product->gpf_data['gtin'] : '' );
		$product->gpf_mpn = ( isset( $product->gpf_data['mpn'] ) ? $product->gpf_data['mpn'] : '' );
		$product->gpf_gender = ( isset( $product->gpf_data['gender'] ) ? $product->gpf_data['gender'] : '' );
		$product->gpf_age_group = ( isset( $product->gpf_data['age_group'] ) ? $product->gpf_data['age_group'] : '' );
		$product->gpf_color = ( isset( $product->gpf_data['color'] ) ? $product->gpf_data['color'] : '' );
		$product->gpf_size = ( isset( $product->gpf_data['size'] ) ? $product->gpf_data['size'] : '' );
	}

	// All in One SEO Pack - http://wordpress.org/extend/plugins/all-in-one-seo-pack/
	if( function_exists( 'aioseop_activate' ) ) {
		$product->aioseop_keywords = get_post_meta( $product_id, '_aioseop_keywords', true );
		$product->aioseop_description = get_post_meta( $product_id, '_aioseop_description', true );
		$product->aioseop_title = get_post_meta( $product_id, '_aioseop_title', true );
		$product->aioseop_titleatr = get_post_meta( $product_id, '_aioseop_titleatr', true );
		$product->aioseop_menulabel = get_post_meta( $product_id, '_aioseop_menulabel', true );
	}

	// WordPress SEO - http://wordpress.org/plugins/wordpress-seo/
	if( function_exists( 'wpseo_admin_init' ) ) {
		$product->wpseo_focuskw = get_post_meta( $product_id, '_yoast_wpseo_focuskw', true );
		$product->wpseo_metadesc = get_post_meta( $product_id, '_yoast_wpseo_metadesc', true );
		$product->wpseo_title = get_post_meta( $product_id, '_yoast_wpseo_title', true );
		$product->wpseo_googleplus_description = get_post_meta( $product_id, '_yoast_wpseo_google-plus-description', true );
		$product->wpseo_opengraph_description = get_post_meta( $product_id, '_yoast_wpseo_opengraph-description', true );
	}

	// Ultimate SEO - http://wordpress.org/plugins/seo-ultimate/
	if( function_exists( 'su_wp_incompat_notice' ) ) {
		$product->useo_meta_title = get_post_meta( $product_id, '_su_title', true );
		$product->useo_meta_description = get_post_meta( $product_id, '_su_description', true );
		$product->useo_meta_keywords = get_post_meta( $product_id, '_su_keywords', true );
		$product->useo_social_title = get_post_meta( $product_id, '_su_og_title', true );
		$product->useo_social_description = get_post_meta( $product_id, '_su_og_description', true );
		$product->useo_meta_noindex = get_post_meta( $product_id, '_su_meta_robots_noindex', true );
		$product->useo_meta_noautolinks = get_post_meta( $product_id, '_su_disable_autolinks', true );
	}

	// WooCommerce MSRP Pricing - http://woothemes.com/woocommerce/
	if( function_exists( 'woocommerce_msrp_activate' ) ) {
		$product->msrp = get_post_meta( $product_id, '_msrp_price', true );
		if( $product->msrp == false && $product->post_type == 'product_variation' )
			$product->msrp = get_post_meta( $product_id, '_msrp', true );
			// Check that a valid price has been provided and that wc_format_localized_price() exists
			if( isset( $product->msrp ) && $product->msrp != '' && function_exists( 'wc_format_localized_price' ) )
				$product->msrp = wc_format_localized_price( $product->msrp );
	}

	// Allow Plugin/Theme authors to add support for additional Product columns
	$product = apply_filters( 'woo_ce_product_item', $product, $product_id );

	return $product;

}

// Returns Product Categories associated to a specific Product
function woo_ce_get_product_assoc_categories( $product_id = 0, $parent_id = 0 ) {

	global $export;

	$output = '';
	$term_taxonomy = 'product_cat';
	// Return Product Categories of Parent if this is a Variation
	$categories = array();
	if( !empty( $parent_id ) )
		$product_id = $parent_id;
	if( !empty( $product_id ) )
		$categories = wp_get_object_terms( $product_id, $term_taxonomy );
	if( !empty( $categories ) && !is_wp_error( $categories ) ) {
		$size = apply_filters( 'woo_ce_get_product_assoc_categories_size', count( $categories ) );
		for( $i = 0; $i < $size; $i++ ) {
			if( $categories[$i]->parent == '0' ) {
				$output .= $categories[$i]->name . $export->category_separator;
			} else {
				// Check if Parent -> Child
				$parent_category = get_term( $categories[$i]->parent, $term_taxonomy );
				// Check if Parent -> Child -> Subchild
				if( $parent_category->parent == '0' ) {
					$output .= $parent_category->name . '>' . $categories[$i]->name . $export->category_separator;
					$output = str_replace( $parent_category->name . $export->category_separator, '', $output );
				} else {
					$root_category = get_term( $parent_category->parent, $term_taxonomy );
					$output .= $root_category->name . '>' . $parent_category->name . '>' . $categories[$i]->name . $export->category_separator;
					$output = str_replace( array(
						$root_category->name . '>' . $parent_category->name . $export->category_separator,
						$parent_category->name . $export->category_separator
					), '', $output );
				}
				unset( $root_category, $parent_category );
			}
		}
		$output = substr( $output, 0, -1 );
	} else {
		$output .= __( 'Uncategorized', 'woocommerce-exporter' );
	}
	return $output;

}

// Returns Product Tags associated to a specific Product
function woo_ce_get_product_assoc_tags( $product_id = 0 ) {

	global $export;

	$output = '';
	$term_taxonomy = 'product_tag';
	$tags = wp_get_object_terms( $product_id, $term_taxonomy );
	if( !empty( $tags ) && is_wp_error( $tags ) == false ) {
		$size = count( $tags );
		for( $i = 0; $i < $size; $i++ ) {
			if( $tag = get_term( $tags[$i]->term_id, $term_taxonomy ) )
				$output .= $tag->name . $export->category_separator;
		}
		$output = substr( $output, 0, -1 );
	}
	return $output;

}

// Returns the Featured Image associated to a specific Product
function woo_ce_get_product_assoc_featured_image( $product_id = 0 ) {

	$output = '';
	if( !empty( $product_id ) ) {
		$thumbnail_id = get_post_meta( $product_id, '_thumbnail_id', true );
		if( !empty( $thumbnail_id ) ) {
			$output = wp_get_attachment_url( $thumbnail_id );
		}
	}
	return $output;

}

// Returns the Product Galleries associated to a specific Product
function woo_ce_get_product_assoc_product_gallery( $product_id = 0, $size = 'full' ) {

	global $export;

	if( !empty( $product_id ) ) {
		$images = get_post_meta( $product_id, '_product_image_gallery', true );
		if( !empty( $images ) ) {
			$images = explode( ',', $images );
			$size = count( $images );
			for( $i = 0; $i < $size; $i++ ) {
				// Post ID
				if( $export->gallery_formatting == 0 ) {
					continue;
				// Media URL
				} else {
					if( $size == 'full' )
						$images[$i] = wp_get_attachment_url( $images[$i] );
					else if( $size == 'thumbnail' )
						$images[$i] = wp_get_attachment_thumb_url( $images[$i] );
				}
			}
			$output = implode( $export->category_separator, $images );
			return $output;
		}
	}

}

// Returns the Product Type of a specific Product
function woo_ce_get_product_assoc_type( $product_id = 0 ) {

	global $export;

	$output = '';
	$term_taxonomy = 'product_type';
	$types = wp_get_object_terms( $product_id, $term_taxonomy );
	if( empty( $types ) )
		$types = array( get_term_by( 'name', 'simple', $term_taxonomy ) );
	if( $types ) {
		$size = count( $types );
		for( $i = 0; $i < $size; $i++ ) {
			$type = get_term( $types[$i]->term_id, $term_taxonomy );
			$output .= woo_ce_format_product_type( $type->name ) . $export->category_separator;
		}
		$output = substr( $output, 0, -1 );
	}
	return $output;

}

// Returns the Shipping Class of a specific Product
function woo_ce_get_product_assoc_shipping_class( $product_id = 0 ) {

	global $export;

	$output = '';
	$term_taxonomy = 'product_shipping_class';
	$types = wp_get_object_terms( $product_id, $term_taxonomy );
	if( empty( $types ) )
		$types = get_term_by( 'name', 'simple', $term_taxonomy );
	if( !empty( $types ) ) {
		$size = count( $types );
		for( $i = 0; $i < $size; $i++ ) {
			$type = get_term( $types[$i]->term_id, $term_taxonomy );
			if( is_wp_error( $type ) !== true )
				$output .= $type->name . $export->category_separator;
		}
		$output = substr( $output, 0, -1 );
	}
	return $output;

}

// Returns the Up-Sell associated to a specific Product
function woo_ce_get_product_assoc_upsell_ids( $product_id = 0 ) {

	global $export;

	$output = '';
	if( $product_id ) {
		$upsell_ids = get_post_meta( $product_id, '_upsell_ids', true );
		// Convert Product ID to Product SKU as per Up-Sells Formatting
		if( $export->upsell_formatting == 1 && !empty( $upsell_ids ) ) {
			$size = count( $upsell_ids );
			for( $i = 0; $i < $size; $i++ ) {
				$upsell_ids[$i] = get_post_meta( $upsell_ids[$i], '_sku', true );
				if( empty( $upsell_ids[$i] ) )
					unset( $upsell_ids[$i] );
			}
			// 'reindex' array
			$upsell_ids = array_values( $upsell_ids );
		}
		$output = woo_ce_convert_product_ids( $upsell_ids );
	}
	return $output;

}

// Returns the Cross-Sell associated to a specific Product
function woo_ce_get_product_assoc_crosssell_ids( $product_id = 0 ) {

	global $export;

	$output = '';
	if( $product_id ) {
		$crosssell_ids = get_post_meta( $product_id, '_crosssell_ids', true );
		// Convert Product ID to Product SKU as per Cross-Sells Formatting
		if( $export->crosssell_formatting == 1 && !empty( $crosssell_ids ) ) {
			$size = count( $crosssell_ids );
			for( $i = 0; $i < $size; $i++ ) {
				$crosssell_ids[$i] = get_post_meta( $crosssell_ids[$i], '_sku', true );
				// Remove Cross-Sell if SKU is empty
				if( empty( $crosssell_ids[$i] ) )
					unset( $crosssell_ids[$i] );
			}
			// 'reindex' array
			$crosssell_ids = array_values( $crosssell_ids );
		}
		$output = woo_ce_convert_product_ids( $crosssell_ids );
	}
	return $output;
	
}

// Returns Product Attributes associated to a specific Product
function woo_ce_get_product_assoc_attributes( $product_id = 0, $attribute = array(), $type = 'product' ) {

	global $export;

	$output = '';
	if( $product_id ) {
		$terms = array();
		if( $type == 'product' ) {
			if( $attribute['is_taxonomy'] == 1 )
				$term_taxonomy = $attribute['name'];
		} else if( $type == 'global' ) {
			$term_taxonomy = 'pa_' . $attribute->attribute_name;
		}
		$terms = wp_get_object_terms( $product_id, $term_taxonomy );
		if( !empty( $terms ) && is_wp_error( $terms ) == false ) {
			$size = count( $terms );
			for( $i = 0; $i < $size; $i++ )
				$output .= $terms[$i]->name . $export->category_separator;
			unset( $terms );
		}
		$output = substr( $output, 0, -1 );
	}
	return $output;

}

// Returns File Downloads associated to a specific Product
function woo_ce_get_product_assoc_file_downloads( $product_id = 0 ) {

	global $export;

	$output = '';
	if( $product_id ) {
		if( version_compare( WOOCOMMERCE_VERSION, '2.0', '>=' ) ) {
			// If WooCommerce 2.0+ is installed then use new _downloadable_files Post meta key
			if( $file_downloads = maybe_unserialize( get_post_meta( $product_id, '_downloadable_files', true ) ) ) {
				foreach( $file_downloads as $file_download ) {
					$output .= $file_download['file'] . $export->category_separator;
				}
				unset( $file_download, $file_downloads );
			}
			$output = substr( $output, 0, -1 );
		} else {
			// If WooCommerce -2.0 is installed then use legacy _file_paths Post meta key
			if( $file_downloads = maybe_unserialize( get_post_meta( $product_id, '_file_paths', true ) ) ) {
				foreach( $file_downloads as $file_download ) {
					$output .= $file_download . $export->category_separator;
				}
				unset( $file_download, $file_downloads );
			}
			$output = substr( $output, 0, -1 );
		}
	}
	return $output;

}

// Returns list of Product Add-on columns
function woo_ce_get_product_addons() {

	// Product Add-ons - http://www.woothemes.com/
	if( class_exists( 'Product_Addon_Admin' ) || class_exists( 'Product_Addon_Display' ) ) {
		$post_type = 'global_product_addon';
		$args = array(
			'post_type' => $post_type,
			'numberposts' => -1
		);
		$output = array();

		// First grab the Global Product Add-ons
		if( $product_addons = get_posts( $args ) ) {
			foreach( $product_addons as $product_addon ) {
				if( $meta = maybe_unserialize( get_post_meta( $product_addon->ID, '_product_addons', true ) ) ) {
					$size = count( $meta );
					for( $i = 0; $i < $size; $i++ ) {
						$output[] = (object)array(
							'post_name' => $meta[$i]['name'],
							'post_title' => $meta[$i]['name'],
							'form_title' => $product_addon->post_title
						);
					}
				}
			}
		}
	}

	// Custom Order Items
	if( $custom_order_items = woo_ce_get_option( 'custom_order_items', '' ) ) {
		foreach( $custom_order_items as $custom_order_item ) {
			$output[] = (object)array(
				'post_name' => $custom_order_item,
				'post_title' => $custom_order_item
			);
		}
	}

	return $output;

}

function woo_ce_format_product_visibility( $visibility = '' ) {

	$output = '';
	if( !empty( $visibility ) ) {
		switch( $visibility ) {

			case 'visible':
				$output = __( 'Catalog & Search', 'woocommerce-exporter' );
				break;

			case 'catalog':
				$output = __( 'Catalog', 'woocommerce-exporter' );
				break;

			case 'search':
				$output = __( 'Search', 'woocommerce-exporter' );
				break;

			case 'hidden':
				$output = __( 'Hidden', 'woocommerce-exporter' );
				break;

		}
	}
	return $output;

}

function woo_ce_format_product_download_type( $download_type = '' ) {

	$output = __( 'Standard', 'woocommerce-exporter' );
	if( !empty( $download_type ) ) {
		switch( $download_type ) {

			case 'application':
				$output = __( 'Application', 'woocommerce-exporter' );
				break;

			case 'music':
				$output = __( 'Music', 'woocommerce-exporter' );
				break;

		}
	}
	return $output;

}

function woo_ce_format_gpf_availability( $availability = null ) {

	$output = '';
	if( !empty( $availability ) ) {
		switch( $availability ) {

			case 'in stock':
				$output = __( 'In Stock', 'woocommerce-exporter' );
				break;

			case 'available for order':
				$output = __( 'Available For Order', 'woocommerce-exporter' );
				break;

			case 'preorder':
				$output = __( 'Pre-order', 'woocommerce-exporter' );
				break;

		}
	}
	return $output;

}

function woo_ce_format_gpf_condition( $condition ) {

	$output = '';
	if( !empty( $condition ) ) {
		switch( $condition ) {

			case 'new':
				$output = __( 'New', 'woocommerce-exporter' );
				break;

			case 'refurbished':
				$output = __( 'Refurbished', 'woocommerce-exporter' );
				break;

			case 'used':
				$output = __( 'Used', 'woocommerce-exporter' );
				break;

		}
	}
	return $output;

}

function woo_ce_format_product_stock_status( $stock_status = '', $stock = '' ) {

	$output = '';
	if( empty( $stock_status ) && !empty( $stock ) ) {
		if( $stock )
			$stock_status = 'instock';
		else
			$stock_status = 'outofstock';
	}
	if( $stock_status ) {
		switch( $stock_status ) {

			case 'instock':
				$output = __( 'In Stock', 'woocommerce-exporter' );
				break;

			case 'outofstock':
				$output = __( 'Out of Stock', 'woocommerce-exporter' );
				break;

		}
	}
	return $output;

}

function woo_ce_format_product_tax_status( $tax_status = null ) {

	$output = '';
	if( $tax_status ) {
		switch( $tax_status ) {
	
			case 'taxable':
				$output = __( 'Taxable', 'woocommerce-exporter' );
				break;
	
			case 'shipping':
				$output = __( 'Shipping Only', 'woocommerce-exporter' );
				break;

			case 'none':
				$output = __( 'None', 'woocommerce-exporter' );
				break;

		}
	}
	return $output;

}

function woo_ce_format_product_tax_class( $tax_class = '' ) {

	global $export;

	$output = '';
	if( $tax_class ) {
		switch( $tax_class ) {

			case '*':
				$tax_class = __( 'Standard', 'woocommerce-exporter' );
				break;

			case 'reduced-rate':
				$tax_class = __( 'Reduced Rate', 'woocommerce-exporter' );
				break;

			case 'zero-rate':
				$tax_class = __( 'Zero Rate', 'woocommerce-exporter' );
				break;

		}
		$output = $tax_class;
	}
	return $output;

}

function woo_ce_format_product_type( $type_id = '' ) {

	$output = $type_id;
	if( $output ) {
		$product_types = apply_filters( 'woo_ce_format_product_types', array(
			'simple' => __( 'Simple Product', 'woocommerce' ),
			'downloadable' => __( 'Downloadable', 'woocommerce' ),
			'grouped' => __( 'Grouped Product', 'woocommerce' ),
			'virtual' => __( 'Virtual', 'woocommerce' ),
			'variable' => __( 'Variable', 'woocommerce' ),
			'external' => __( 'External/Affiliate Product', 'woocommerce' ),
			'variation' => __( 'Variation', 'woocommerce-exporter' )
		) );
		if( isset( $product_types[$type_id] ) )
			$output = $product_types[$type_id];
	}
	return $output;

}

// Returns a list of WooCommerce Product Types to export process
function woo_ce_get_product_types() {

	$term_taxonomy = 'product_type';
	$args = array(
		'hide_empty' => 0
	);
	$types = get_terms( $term_taxonomy, $args );
	if( !empty( $types ) && is_wp_error( $types ) == false ) {
		$output = array();
		$size = count( $types );
		for( $i = 0; $i < $size; $i++ ) {
			$output[$types[$i]->slug] = array(
				'name' => ucfirst( $types[$i]->name ),
				'count' => $types[$i]->count
			);
			// Override the Product Type count for Downloadable and Virtual
			if( in_array( $types[$i]->slug, array( 'downloadable', 'virtual' ) ) ) {
				if( $types[$i]->slug == 'downloadable' ) {
					$args = array(
						'meta_key' => '_downloadable',
						'meta_value' => 'yes'
					);
				} else if( $types[$i]->slug == 'virtual' ) {
					$args = array(
						'meta_key' => '_virtual',
						'meta_value' => 'yes'
					);
				}
				$output[$types[$i]->slug]['count'] = woo_ce_get_product_type_count( 'product', $args );
			}
		}
		$output['variation'] = array(
			'name' => __( 'variation', 'woocommerce-exporter' ),
			'count' => woo_ce_get_product_type_count( 'product_variation' )
		);
		asort( $output );
		return $output;
	}

}

function woo_ce_get_product_type_count( $post_type = 'product', $args = array() ) {

	$defaults = array(
		'post_type' => $post_type,
		'posts_per_page' => 1,
		'fields' => 'ids'
	);
	$args = wp_parse_args( $args, $defaults );
	$product_ids = new WP_Query( $args );
	$size = $product_ids->found_posts;
	return $size;

}

// Returns a list of WooCommerce Product Attributes to export process
function woo_ce_get_product_attributes() {

	global $wpdb;

	$output = array();
	$attributes_sql = "SELECT * FROM `" . $wpdb->prefix . "woocommerce_attribute_taxonomies`";
	$attributes = $wpdb->get_results( $attributes_sql );
	$wpdb->flush();
	if( !empty( $attributes ) ) {
		$output = $attributes;
		unset( $attributes );
	} else {
		$output = ( function_exists( 'wc_get_attribute_taxonomies' ) ? wc_get_attribute_taxonomies() : array() );
	}
	return $output;

}

function woo_ce_get_acf_product_fields() {

	global $wpdb;

	$post_type = 'acf';
	$args = array(
		'post_type' => $post_type,
		'numberposts' => -1
	);
	if( $field_groups = get_posts( $args ) ) {
		$fields = array();
		$post_types = array( 'product', 'product_variation' );
		foreach( $field_groups as $field_group ) {
			$has_fields = false;
			if( $rules = get_post_meta( $field_group->ID, 'rule' ) ) {
				$size = count( $rules );
				for( $i = 0; $i < $size; $i++ ) {
					if( ( $rules[$i]['param'] == 'post_type' ) && ( $rules[$i]['operator'] == '==' ) && ( in_array( $rules[$i]['value'], $post_types ) ) ) {
						$has_fields = true;
						$i = $size;
					}
				}
			}
			unset( $rules );
			if( $has_fields ) {
				$custom_fields_sql = "SELECT `meta_value` FROM `" . $wpdb->postmeta . "` WHERE `post_id` = " . absint( $field_group->ID ) . " AND `meta_key` LIKE 'field_%'";
				if( $custom_fields = $wpdb->get_col( $custom_fields_sql ) ) {
					foreach( $custom_fields as $custom_field ) {
						$custom_field = maybe_unserialize( $custom_field );
						$fields[] = array(
							'name' => $custom_field['name'],
							'label' => $custom_field['label']
						);
					}
				}
				unset( $custom_fields, $custom_field );
			}
		}
		return $fields;
	}

}

function woo_ce_extend_product_item( $product, $product_id ) {

	// Custom Product meta
	$custom_products = woo_ce_get_option( 'custom_products', '' );
	if( !empty( $custom_products ) ) {
		foreach( $custom_products as $custom_product ) {
			// Check that the custom Product name is filled and it hasn't previously been set
			if( !empty( $custom_product ) && !isset( $product->{$custom_product} ) )
				$product->{$custom_product} = get_post_meta( $product_id, $custom_product, true );
		}
	}

	return $product;

}
add_filter( 'woo_ce_product_item', 'woo_ce_extend_product_item', 10, 2 );

function woo_ce_format_product_sale_price_dates( $sale_date = '' ) {

	$output = $sale_date;
	if( $sale_date )
		$output = woo_ce_format_date( date( 'Y-m-d H:i:s', $sale_date ) );
	return $output;

}

?>