<?php
/**
 * Plugin Name: WooCommerce Bulk Edit Product Variations (shared on wplocker.com)
 * Description: Bulk edit product variations in woocommerce for wordpress.
 * Author: matterico_themes
 * Author URI: http://themeforest.net/user/Matterico_Themes
 * Version: 2.4.0
 * License: GPLv2 or later
 */

//if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * WooCommerce fallback notice.
 */
function bulkvariations_woocommerce_fallback_notice() {
    echo '<div class="error"><p>' . sprintf( __( 'WooCommerce Bulk Edit Product Variations depends on the last version of %s to work!', 'woocommerce-bulkvariations' ), '<a href="http://wordpress.org/extend/plugins/woocommerce/">WooCommerce</a>' ) . '</p></div>';
}

require_once( 'woocp.php' );

function wcbulkvariations_load(){

	if ( ! class_exists( 'WC_Product_Variable' ) ) {
        add_action( 'admin_notices', 'bulkvariations_woocommerce_fallback_notice' );

        return;
    }
    
	// Add 'Variations Edition' link under WooCommerce menu
	add_action( 'admin_menu', 'bulkvariations_add_menu_link' );
}
add_action( 'plugins_loaded', 'wcbulkvariations_load', 0 );



function bulkvariations_add_menu_link() {
	add_submenu_page('woocommerce',__( 'WooCommerce Bulk Edit Product Variations', 'woocommerce-bulkvariations' ),__( 'Bulk Edit Product Variations', 'woocommerce-bulkvariations' ),'manage_woocommerce','woocommerce-bulkvariations','wcbulkvariations_panel');
}

function variable_product_sync($post_parent_id) {
	global $woocommerce;

	$children = get_posts( array(
		'post_parent' 	=> $post_parent_id,
		'posts_per_page'=> -1,
		'post_type' 	=> 'product_variation',
		'fields' 		=> 'ids',
		'post_status'	=> 'publish'
	));

	if ( $children ) {
		foreach ( $children as $child ) {

			$child_price 			= get_post_meta( $child, '_price', true );
			$child_regular_price 	= get_post_meta( $child, '_regular_price', true );
			$child_sale_price 		= get_post_meta( $child, '_sale_price', true );
			$min_variation_regular_price = '';
			$max_variation_regular_price = '';
			$min_variation_sale_price = '';
			$max_variation_sale_price = '';
			$min_variation_price = '';
			$max_variation_price = '';

			if ( $child_price === '' && $child_regular_price === '' )
				continue;

			// Regular prices
			if ( $child_regular_price !== '' ) {
				if ( ! is_numeric( $min_variation_regular_price ) || $child_regular_price < $min_variation_regular_price )
					$min_variation_regular_price = $child_regular_price;

				if ( ! is_numeric( $max_variation_regular_price ) || $child_regular_price > $max_variation_regular_price )
					$max_variation_regular_price = $child_regular_price;
			}

			// Sale prices
			if ( $child_sale_price !== '' ) {
				if ( $child_price == $child_sale_price ) {
					if ( ! is_numeric( $min_variation_sale_price ) || $child_sale_price < $min_variation_sale_price )
						$min_variation_sale_price = $child_sale_price;

					if ( ! is_numeric( $max_variation_sale_price ) || $child_sale_price > $max_variation_sale_price )
						$max_variation_sale_price = $child_sale_price;
				}
			}

			// Actual prices
			if ( $child_price !== '' ) {
				if ( $child_price > $max_variation_price )
					$max_variation_price = $child_price;

				if ( $min_variation_price === '' || $child_price < $min_variation_price )
					$min_variation_price = $child_price;
			}
		}

		$price = $min_variation_price;

		update_post_meta( $post_parent_id, '_price', $price );
		update_post_meta( $post_parent_id, '_min_variation_price', $min_variation_price );
		update_post_meta( $post_parent_id, '_max_variation_price', $max_variation_price );
		update_post_meta( $post_parent_id, '_min_variation_regular_price', $min_variation_regular_price );
		update_post_meta( $post_parent_id, '_max_variation_regular_price', $max_variation_regular_price );
		update_post_meta( $post_parent_id, '_min_variation_sale_price', $min_variation_sale_price );
		update_post_meta( $post_parent_id, '_max_variation_sale_price', $max_variation_sale_price );

	}
}

function wcbulkvariations_panel() {
	global $woocommerce;
		$current_tab = ( empty( $_GET['tab'] ) ) ? 'shop_loop' : urldecode( $_GET['tab'] );

		?>
		<div class="wrap woocommerce">
			<form method="post" id="mainform" action="" enctype="multipart/form-data">
			<div id="icon-woocommerce" class="icon32-woocommerce-settings icon32"><br /></div>
			<h2 class="nav-tab-wrapper woo-nav-tab-wrapper">
				<?php echo  __( 'Bulk Edit Product Variations', 'woocommerce-bulkvariations' ); ?>
			</h2>
			<?php
			if ( ! empty( $_POST ) ) {
			
				$args = array(
					'post_type' => 'product_variation',
					'posts_per_page' => 500
				);
				
				$attributes_compare = false;
				$boolean_metakeys = false;
				foreach($_POST as $_key => $_value){					
					if(substr($_key, 0, 3) == 'pa_'){
						if($_value != '' && $_value != '0'){
							$attributes_compare = true;
							$metakeys[] = array(
								'key' => 'attribute_' . $_key,
								'value' => $_value,
								'compare' => '='	
							);
							$boolean_metakeys = true;
						}	
					}
					
					if(substr($_key, 0, 8) == 'tomatch_'){
						if($_value > 0){
							$_key = str_replace('tomatch', '', $_key);
							
							if($_POST['compare' . $_key] == 'mayor'){
								$compare = '>';
							}elseif($_POST['compare' . $_key] == 'minor'){
								$compare = '<';
							}else{
								$compare = '=';
							}

							$metakeys[] = array(
								'key' => $_key,
								'value' => $_value,
								'compare' => $compare	
							);
							
							$boolean_metakeys = true;
						}
					}							
				}
				
				if($boolean_metakeys){
					$args['meta_query'] = array(
						'relation' => 'AND',
					);
					foreach($metakeys as $metakey){
						$args['meta_query'][] = $metakey;
					}
				}
				//print_r($args);
				$product_variations = new WP_Query($args);
				$count_variations = 0;
				$count_products = 0;
				
				//echo $product_variations->max_num_pages;

				for($RepeatLoop = 1; $RepeatLoop <= $product_variations->max_num_pages; $RepeatLoop++){
					if($RepeatLoop > 1){
						$args['paged'] = $RepeatLoop;
						$product_variations = new WP_Query($args);
					}
					if( $product_variations->have_posts() ) {
						
						while ($product_variations->have_posts()) : $product_variations->the_post();
							$continue = false;
							
							$parent = get_post_ancestors(get_the_ID());
							if(is_array($parent)){
								if(count($parent) > 0){
									$terms = wp_get_post_terms( $parent[0], 'product_cat' );
									foreach($terms as $term){
										if($term->term_id == $_POST['product_cat']){
											$continue = true;
										}
									}
								}
							}
							
							if($continue || $_POST['product_cat'] == 0){
							
								if(isset($_POST['_regular_price_op'])){
									$regular_price_op = $_POST['_regular_price_op'];
								}else{
									$regular_price_op = 'chage_to';
								}
	
								if(isset($_POST['_sale_price_op'])){
									$sale_price_op = $_POST['_sale_price_op'];
								}else{
									$sale_price_op = 'chage_to';
								}
								
								foreach($_POST as $key_update => $value_update){
									if(substr($key_update, 0, 9) == 'toupdate_'){
	
										if($value_update != '' || ($key_update == 'toupdate_sale_price' && $sale_price_op == 'no_sale_price')){
	
											$key_update = str_replace('toupdate', '', $key_update);
											if($key_update == '_regular_price' && $regular_price_op != 'change_to'){
												$current_value = get_post_meta( get_the_ID(), '_regular_price', true);
												
												if($regular_price_op == 'increase_pr'){
													$new_value_update = $current_value + ($current_value * $value_update) / 100;
												}elseif($regular_price_op == 'decrease_pr'){
													$new_value_update = $current_value - ($current_value * $value_update) / 100;
												}elseif($regular_price_op == 'increase_in'){
													$new_value_update = $current_value + $value_update;
												}elseif($regular_price_op == 'decrease_in'){
													$new_value_update = $current_value - $value_update;
												}
												if(isset($new_value_update)){
													update_post_meta(get_the_ID(), $key_update, $new_value_update);
												}
												
											}elseif($key_update == '_sale_price' && $sale_price_op != 'change_to'){
												
												if(substr($sale_price_op, -3) == '_rp'){
													$current_value = get_post_meta( get_the_ID(), '_regular_price', true);
												}else{
													$current_value = get_post_meta( get_the_ID(), '_sale_price', true);
												}
												
												$sale_price_op = str_replace('_rp','',$sale_price_op);
												
												if($sale_price_op == 'increase_pr'){
													$new_value_update = $current_value + ($current_value * $value_update) / 100;
												}elseif($sale_price_op == 'decrease_pr'){
													$new_value_update = $current_value - ($current_value * $value_update) / 100;
												}elseif($sale_price_op == 'increase_in'){
													$new_value_update = $current_value + $value_update;
												}elseif($sale_price_op == 'decrease_in'){
													$new_value_update = $current_value - $value_update;
												}elseif($sale_price_op == 'no_sale_price'){
													$new_value_update = '';
												}
	
												update_post_meta(get_the_ID(), $key_update, $new_value_update);
										
											}else{
												update_post_meta(get_the_ID(), $key_update, $value_update);
											}
											
										}
										
									}
									
								}
												
								$count_variations++;
								
								$regular_price = get_post_meta( get_the_ID(), '_regular_price', true);
								$sale_price = get_post_meta( get_the_ID(), '_sale_price', true);
								
								if($sale_price != '' && $sale_price < $regular_price){
									update_post_meta(get_the_ID(), '_price', $sale_price);
								}else{
									update_post_meta(get_the_ID(), '_price', $regular_price);
								}
								
								if(is_array($parent)){
									if(count($parent) > 0){
										$parents_to_update[$parent[0]] = $parent[0];
										//$woocommerce_product_variable = new WC_Product_Variable($parent[0]);
										//$woocommerce_product_variable->variable_product_sync();
										//variable_product_sync($parent[0]);
									}
								}
								
							}
						
						endwhile;
					}
				}
				
				if(is_array($parents_to_update)){
					if(count($parents_to_update) > 0){
						foreach($parents_to_update as $update_parent_id){
							$woocommerce_product_variable = new WC_Product_Variable($update_parent_id);
							$woocommerce_product_variable->variable_product_sync();
						}
					}
				}
				
				// UPDATE SIMPLE PRODUCS TOO
				$update_simple = false;
				if(isset($_POST['simple_products_too'])){
					if($_POST['simple_products_too']){
						$update_simple = true;
					}
				}
				
				if($attributes_compare === false && $update_simple === true){
					$args = array(
						'post_type' => 'product',
						'posts_per_page' => 500
					);
					
					$boolean_metakeys = false;
					foreach($_POST as $_key => $_value){					
						
						if(substr($_key, 0, 8) == 'tomatch_'){
							if($_value > 0){
								$_key = str_replace('tomatch', '', $_key);
								
								if($_POST['compare' . $_key] == 'mayor'){
									$compare = '>';
								}elseif($_POST['compare' . $_key] == 'minor'){
									$compare = '<';
								}else{
									$compare = '=';
								}
	
								$metakeys[] = array(
									'key' => $_key,
									'value' => $_value,
									'compare' => $compare	
								);
								
								$boolean_metakeys = true;
							}
						}							
					}
					
					if($boolean_metakeys){
						$args['meta_query'] = array(
							'relation' => 'AND',
						);
						foreach($metakeys as $metakey){
							$args['meta_query'][] = $metakey;
						}
					}
				
					
					$products = new WP_Query($args);
										
					$count_products = 0;
					
					for($RepeatLoop = 1; $RepeatLoop <= $products->max_num_pages; $RepeatLoop++){
						if($RepeatLoop > 1){
							$args['paged'] = $RepeatLoop;
							$products = new WP_Query($args);
						}
					
						if( $products->have_posts() ) {
							while ($products->have_posts()) : $products->the_post();
								$continue = false;
								$continue_simple_product = false;
								
								$terms = wp_get_post_terms( get_the_ID(), 'product_type' );
								foreach($terms as $term){
									if($term->name == 'simple'){
										$continue_simple_product = true;
										
									}
								}
								
								if($continue_simple_product){
								
									$terms = wp_get_post_terms( get_the_ID(), 'product_cat' );
									foreach($terms as $term){
										if($term->term_id == $_POST['product_cat']){
											$continue = true;
										}
									}
									
									if($continue || $_POST['product_cat'] == 0){
										/*
										foreach($_POST as $key_update => $value_update){
											if(substr($key_update, 0, 9) == 'toupdate_'){
												if($value_update != ''){
													$key_update = str_replace('toupdate', '', $key_update);
													update_post_meta(get_the_ID(), $key_update, $value_update);
												}
												
											}
											
										}
										*/
										if(isset($_POST['_regular_price_op'])){
											$regular_price_op = $_POST['_regular_price_op'];
										}else{
											$regular_price_op = 'chage_to';
										}
			
										if(isset($_POST['_sale_price_op'])){
											$sale_price_op = $_POST['_sale_price_op'];
										}else{
											$sale_price_op = 'chage_to';
										}
								
										foreach($_POST as $key_update => $value_update){
											if(substr($key_update, 0, 9) == 'toupdate_'){
			
												if($value_update != '' || ($key_update == 'toupdate_sale_price' && $sale_price_op == 'no_sale_price')){
													$key_update = str_replace('toupdate', '', $key_update);
													if($key_update == '_regular_price' && $regular_price_op != 'change_to'){
														$current_value = get_post_meta( get_the_ID(), '_regular_price', true);
														
														if($regular_price_op == 'increase_pr'){
															$new_value_update = $current_value + ($current_value * $value_update) / 100;
														}elseif($regular_price_op == 'decrease_pr'){
															$new_value_update = $current_value - ($current_value * $value_update) / 100;
														}elseif($regular_price_op == 'increase_in'){
															$new_value_update = $current_value + $value_update;
														}elseif($regular_price_op == 'decrease_in'){
															$new_value_update = $current_value - $value_update;
														}
														if(isset($new_value_update)){
															update_post_meta(get_the_ID(), $key_update, $new_value_update);
														}
														
													}elseif($key_update == '_sale_price' && $sale_price_op != 'change_to'){
														
														if(substr($sale_price_op, -3) == '_rp'){
															$current_value = get_post_meta( get_the_ID(), '_regular_price', true);
														}else{
															$current_value = get_post_meta( get_the_ID(), '_sale_price', true);
														}
														
														$sale_price_op = str_replace('_rp','',$sale_price_op);
														
														if($sale_price_op == 'increase_pr'){
															$new_value_update = $current_value + ($current_value * $value_update) / 100;
														}elseif($sale_price_op == 'decrease_pr'){
															$new_value_update = $current_value - ($current_value * $value_update) / 100;
														}elseif($sale_price_op == 'increase_in'){
															$new_value_update = $current_value + $value_update;
														}elseif($sale_price_op == 'decrease_in'){
															$new_value_update = $current_value - $value_update;
														}elseif($sale_price_op == 'no_sale_price'){
															$new_value_update = '';
														}
			
														update_post_meta(get_the_ID(), $key_update, $new_value_update);
												
													}else{
														update_post_meta(get_the_ID(), $key_update, $value_update);
													}
													
												}
												
											}
											
										}
																							
										$count_products++;
										
										$regular_price = get_post_meta( get_the_ID(), '_regular_price', true);
										$sale_price = get_post_meta( get_the_ID(), '_sale_price', true);
										
										if($sale_price != '' && $sale_price < $regular_price){
											update_post_meta(get_the_ID(), '_price', $sale_price);
										}else{
											update_post_meta(get_the_ID(), '_price', $regular_price);
										}
																	
									}
								}
							
							endwhile;
						}
					}
				}
				
				echo '<div id="message" class="updated fade below-h2"><p>';
				if($count_variations > 0 && $count_products > 0){
					echo '<strong>' . sprintf( __( '%s variations and %s products has been modified.', 'woocommerce-bulkvariations' ) , $count_variations, $count_products ) . '</strong>';
				}elseif($count_products > 0){
					echo '<strong>' . sprintf( __( '%s simple products has been modified. No variation has been modified.', 'woocommerce-bulkvariations' ) , $count_products ) . '</strong>';
				}elseif($count_variations > 0){
					echo '<strong>' . sprintf( __( '%s variations has been modified. No simple product has been modified.', 'woocommerce-bulkvariations' ) , $count_variations ) . '</strong>';
				}else{
					echo '<strong>' . __( 'No variations has been found with your criteria.', 'woocommerce-bulkvariations' ) . '</strong>';
				}
				echo '</p></div>';
				
				wp_reset_query();
			}
			
			?>
			<table>
			<tr><td colspan="3"><h4><?php echo __( 'Update which variations:', 'woocommerce-bulkvariations' ); ?></h4></td></tr>
			<?php
			
			$attributes = get_object_taxonomies('product', 'objects');
			
			$exclude_attributes = array('product_type','product_tag','product_shipping_class');
			
			foreach($attributes as $attribute){
				
				if( !in_array($attribute->name, $exclude_attributes)) {
				
					echo '<tr><td>';
					
					echo $attribute->label;
					
					echo '</td><td></td><td><select name="'.$attribute->name.'" style="width:140px;"><option value="0">All</option>';
					$terms = get_terms( $attribute->name );
					
					foreach($terms as $term){
						if(isset($_POST[$attribute->name])){
							$postAttribute = $_POST[$attribute->name];
						}else{
							$postAttribute = '';
						}
						if(substr($attribute->name, 0, 3) == 'pa_'){
							if($term->slug == $postAttribute){
								$selected = ' selected="selected"';
							}else{
								$selected = '';
							}			
							echo '<option value="' . $term->slug . '"' . $selected . '>' . $term->name . '</option>';
						}else{
							if($term->term_id == $postAttribute){
								$selected = ' selected="selected"';
							}else{
								$selected = '';
							}
							echo '<option value="' . $term->term_id . '"' . $selected . '>' . $term->name . '</option>';
						}
					}
					echo '</select></td></tr>';
										
				}
			}
			
			$post_compare_regular_price = '';
			$post_compare_sale_price = '';
			$mayorselr = '';
			$minorselr = '';
			$mayorsels = '';
			$minorsels = '';
			$post_tomatch_regular_price = '';
			$post_tomatch_sale_price = '';
			$simple_checked_no = ' checked="checked"';
			$simple_checked_yes = '';
			
			if(isset($_POST['compare_regular_price'])){
				$post_compare_regular_price = $_POST['compare_regular_price'];
			}
			if(isset($_POST['compare_sale_price'])){
				$post_compare_sale_price = $_POST['compare_sale_price'];
			}
			if(isset($_POST['tomatch_regular_price'])){
				$post_tomatch_regular_price = $_POST['tomatch_regular_price'];
			}
			if(isset($_POST['tomatch_sale_price'])){
				$post_tomatch_sale_price = $_POST['tomatch_sale_price'];
			}
			if(isset($_POST['simple_products_too'])){
				if($_POST['simple_products_too'] == 1){
					$simple_checked_yes = ' checked="checked"';
					$simple_checked_no = '';
				}
			}
			
			if($post_compare_regular_price == 'mayor'){
				$mayorselr = ' selected="selected"';
			}elseif($post_compare_regular_price == 'minor'){
				$minorselr = ' selected="selected"';
			}
			
			if($post_compare_sale_price == 'mayor'){
				$mayorsels = ' selected="selected"';
			}elseif($post_compare_sale_price == 'minor'){
				$minorsels = ' selected="selected"';
			}
			
			echo '<tr>
				<td>' . __( 'Regular Price', 'woocommerce-bulkvariations' ) . '</td>
				<td style="text-align:center;"><select name="compare_regular_price">
					<option value="equal">=</option>
					<option value="mayor"' . $mayorselr . '>&gt;</option>
					<option value="minor"' . $minorselr . '>&lt;</option>
				</select></td>
				<td><input type="text" name="tomatch_regular_price" value="' . $post_tomatch_regular_price . '" /></td>
			</tr>';
			
			echo '<tr>
				<td>' . __( 'Sale Price', 'woocommerce-bulkvariations' ) . '</td>
				<td style="text-align:center;"><select name="compare_sale_price">
					<option value="equal">=</option>
					<option value="mayor"' . $mayorsels . '>&gt;</option>
					<option value="minor"' . $minorsels . '>&lt;</option>
				</select></td>
				<td><input type="text" name="tomatch_sale_price" value="' . $post_tomatch_sale_price . '" /></td>
			</tr>';
			
			echo '<tr>
				<td colspan="2">' . __( 'Also Update Simple Products?', 'woocommerce-bulkvariations' ) . '</td>
				<td>
					<label>No</label> 
					<input type="radio" name="simple_products_too" value="0"' . $simple_checked_no . ' /> 
					<label>Yes</label> 
					<input type="radio" name="simple_products_too" value="1"' . $simple_checked_yes . ' />
				</td>
				</tr><tr>
					<td colspan="2"></td>
					<td><span style="font-size:10px; display:block; float:right;">(' . __( 'If selected, all basic/simple products that match the above criteria will be updated along with all product variations. If un-checked (default) only products with variations will be updated.', 'woocommerce-bulkvariations' ) . ')</span></td>
			</tr>';
			
			echo '<tr><td colspan="3" style=""><h4>' . __( 'Update values: &nbsp; (Leave blank if you wish NOT to update or modify)', 'woocommerce-bulkvariations' ) . '</h4></td></tr>
			<tr>
				<td>' . __( 'New SKU', 'woocommerce-bulkvariations' ) . '</td>
				<td></td>
				<td><input type="text" name="toupdate_sku" /></td>
			</tr>';
			echo '<tr>
				<td>' . __( 'New Stock', 'woocommerce-bulkvariations' ) . '</td>
				<td></td>
				<td><input type="text" name="toupdate_stock" /></td>
			</tr>';
			echo '<tr>
				<td>' . __( 'New Regular Price', 'woocommerce-bulkvariations' ) . '</td>
				<td><select name="_regular_price_op" style="font-size:11px; width:100px;">
					<option value="change_to">' . __( 'Change To', 'woocommerce-bulkvariations' ) . '</option>
					<option value="increase_pr">' . __( 'Increase by %', 'woocommerce-bulkvariations' ) . '</option>
					<option value="decrease_pr">' . __( 'Decrease by %', 'woocommerce-bulkvariations' ) . '</option>
					<option value="increase_in">' . __( 'Increase by $', 'woocommerce-bulkvariations' ) . '</option>
					<option value="decrease_in">' . __( 'Decrease by $', 'woocommerce-bulkvariations' ) . '</option>
				</select></td>
				<td><input type="text" name="toupdate_regular_price" /></td>
			</tr>';
			echo '<tr>
				<td>' . __( 'New Sale Price', 'woocommerce-bulkvariations' ) . '</td>
				<td><select name="_sale_price_op" style="font-size:11px; width:100px;">
					<option value="change_to">' . __( 'Change To', 'woocommerce-bulkvariations' ) . '</option>
					<option value="increase_pr">' . __( 'Increase by % based on current SALE price', 'woocommerce-bulkvariations' ) . '</option>
					<option value="decrease_pr">' . __( 'Decrease by % based on current SALE price', 'woocommerce-bulkvariations' ) . '</option>
					<option value="increase_in">' . __( 'Increase by $ based on current SALE price', 'woocommerce-bulkvariations' ) . '</option>
					<option value="decrease_in">' . __( 'Decrease by $ based on current SALE price', 'woocommerce-bulkvariations' ) . '</option>
					<option value="increase_pr_rp">' . __( 'Increase by % based on current REGULAR price', 'woocommerce-bulkvariations' ) . '</option>
					<option value="decrease_pr_rp">' . __( 'Decrease by % based on current REGULAR price', 'woocommerce-bulkvariations' ) . '</option>
					<option value="increase_in_rp">' . __( 'Increase by $ based on current REGULAR price', 'woocommerce-bulkvariations' ) . '</option>
					<option value="decrease_in_rp">' . __( 'Decrease by $ based on current REGULAR price', 'woocommerce-bulkvariations' ) . '</option>
					<option value="no_sale_price">' . __( 'No sale price (leave field blank)', 'woocommerce-bulkvariations' ) . '</option>
				</select></td>
				<td><input type="text" name="toupdate_sale_price" /></td>
			</tr>';
			echo '<tr>
				<td>' . __( 'New Weight', 'woocommerce-bulkvariations' ) . '</td>
				<td></td>
				<td><input type="text" name="toupdate_weight" /></td>
			</tr>';
			echo '<tr>
				<td>' . __( 'New Length', 'woocommerce-bulkvariations' ) . '</td>
				<td></td>
				<td><input type="text" name="toupdate_length" /></td>
			</tr>';
			echo '<tr>
				<td>' . __( 'New Width', 'woocommerce-bulkvariations' ) . '</td>
				<td></td>
				<td><input type="text" name="toupdate_width" /></td>
			</tr>';
			echo '<tr>
				<td>' . __( 'New Height', 'woocommerce-bulkvariations' ) . '</td>
				<td></td>
				<td><input type="text" name="toupdate_height" /></td>
			</tr>';

			
			?></table><?php
			
			submit_button( __( 'Apply Changes', 'woocommerce-bulkvariations' ) );
			
			
			
			?></form></div> <?php
}
?>