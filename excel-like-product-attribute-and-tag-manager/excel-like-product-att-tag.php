<?php
/*
 * Plugin Name: Excel Like Product Attribute And Tag Manager
 * Plugin URI: http://holest.com/index.php/holest-outsourcing/free-stuff/excel-like-price-changer-for-woocommerce-and-wp-e-commerce-light-free.html
 * Description:An WooCommerce / WP E-commerce 'MS excel' like fast input spreadsheet editor for product attribute(up to 3) and tag management. Web-form spreadsheet edit or export / import form CSV. It supports both WooCommerce and WP E-commerce. UI behaves same as in MS Excel. This is right thin for you if you need to change existing or apply new attributes to large number of products.;EDITABLE / IMPORTABLE FIELDS: Attributes, Tags; VIEWABLE / EXPORTABLE FIELDS: WooCommerce: Price, Sales Price, Attributes (Each pivoted as column), SKU, Category, Shipping class, Name, Slug, Stock, Featured, Status, Weight, Height, Width, Length, Tax status, Tax class; WP E-commerce: Price, Sales Price, Tags, SKU, Category, Name, Slug, Stock, Status, Weight, Height, Width, Length, Taxable, local and international shipping costs; Allows custom fields you can configure to view/export any property
 * Version: 2.0.2
 * Author: Holest Engineering
 * Author URI: http://www.holest.com
 * Requires at least: 3.6
 * Tested up to: 4.0.1
 * License: GPLv2
 * Tags: excel, fast, woo, woocommerce, wpsc, wp e-commerce, attributes, tags, products, editor, spreadsheet, import, export 
 * Text Domain: excellikeattributeandtagmanagerforwoocommerceandwpecommercelight
 * Domain Path: /languages/
 *
 * @package excellikeattributeandtagmanagerforwoocommerceandwpecommercelight
 * @category Core
 * @author Holest Engineering
 *
/*

Copyright (c) holest.com

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

if ( !function_exists('add_action') ) {
	header('Status: 403 Forbidden');
	header('HTTP/1.1 403 Forbidden');
	exit();
}

if ( ! class_exists( 'excellikeproductatttag' ) ) {

   class excellikeproductatttag{
        var $settings          = array();
		var $plugin_path       = '';
		var $is_internal       = false;  
		var $saved             = false;
		var $aux_settings_path = '';
		var $shops             = array();    
		var $remoteImportError = '';
		
		function excellikeproductatttag(){
			$this->load_plugin_textdomain();
			$this->aux_settings_path = dirname(__FILE__). DIRECTORY_SEPARATOR . 'settings.dat';
			add_action('admin_menu',array( $this, 'register_plugin_menu_item'));
		   
			$this->loadOptions();
			
			if(isset($_REQUEST['plem_do_save_valid']) && strtoupper($_SERVER['REQUEST_METHOD']) === 'POST'){
			    $this->saveOptions();
			}elseif(isset($_REQUEST['plem_do_save_settings']) && strtoupper($_SERVER['REQUEST_METHOD']) === 'POST'){
				if(isset($_REQUEST['plem_mem_limit_reset'])){
					if($_REQUEST['plem_mem_limit_reset']){
						global $wpdb;
						$wpdb->query("DELETE FROM $wpdb->options WHERE option_name LIKE 'plem_mem_limit%'");
					}
				}
				
				$this->settings["fixedColumns"]    = $_REQUEST["fixedColumns"]; 
				$this->settings["productsPerPage"] = $_REQUEST["productsPerPage"]; 
				$this->settings["enable_add"]      = isset($_REQUEST["enable_add"]) ? $_REQUEST["enable_add"] : "";
				$this->settings["enable_delete"]   = isset($_REQUEST["enable_delete"]) ? $_REQUEST["enable_delete"] : "";
				
				if(isset($_REQUEST['wooc_fileds']))
					$this->settings["wooc_fileds"] = implode(",",$_REQUEST['wooc_fileds']);
				
				if(isset($_REQUEST['wpsc_fileds']))
					$this->settings["wpsc_fileds"] = implode(",",$_REQUEST['wpsc_fileds']);
				
				for($I = 0 ; $I < 20 ; $I++){
				    $n = $I + 1;
					
					if(isset($_REQUEST['wooc_fileds'])){
						$this->settings["wooccf_title".$n]    = isset($_REQUEST["wooccf_title".$n]) ? $_REQUEST["wooccf_title".$n] : "" ;
						$this->settings["wooccf_editoptions".$n] = isset($_REQUEST["wooccf_editoptions".$n]) ? $_REQUEST["wooccf_editoptions".$n] : "";
						$this->settings["wooccf_type".$n]     = isset($_REQUEST["wooccf_type".$n]) ? $_REQUEST["wooccf_type".$n] : "";
						$this->settings["wooccf_source".$n]   = isset($_REQUEST["wooccf_source".$n]) ? $_REQUEST["wooccf_source".$n] : "";
						$this->settings["wooccf_enabled".$n]  = isset($_REQUEST["wooccf_enabled".$n]) ? $_REQUEST["wooccf_enabled".$n] : "";
						$this->settings["wooccf_varedit".$n]  = isset($_REQUEST["wooccf_varedit".$n]) ? $_REQUEST["wooccf_varedit".$n] : "";
					}

					if(isset($_REQUEST['wpsc_fileds'])){ 	
						$this->settings["wpsccf_title".$n]    = isset($_REQUEST["wpsccf_title".$n]) ? $_REQUEST["wpsccf_title".$n] : "" ;
						$this->settings["wpsccf_editoptions".$n] = isset($_REQUEST["wpsccf_editoptions".$n]) ? $_REQUEST["wpsccf_editoptions".$n] : "";
						$this->settings["wpsccf_type".$n]     = isset($_REQUEST["wpsccf_type".$n]) ? $_REQUEST["wpsccf_type".$n] : "";
						$this->settings["wpsccf_source".$n]   = isset($_REQUEST["wpsccf_source".$n]) ? $_REQUEST["wpsccf_source".$n] : "";
						$this->settings["wpsccf_enabled".$n]  = isset($_REQUEST["wpsccf_enabled".$n]) ? $_REQUEST["wpsccf_enabled".$n] : "";
					}
				}
				
				$this->saveOptions();
				
			}
			
			if(!isset($this->settings["fixedColumns"])){
				$this->settings["fixedColumns"]        = 3;
				$this->settings["productsPerPage"]     = 500;
				
				$this->settings["wooccf_title1"]       = "Content";
				$this->settings["wooccf_editoptions1"] = "{}";
				$this->settings["wooccf_type1"]        = "post";
				$this->settings["wooccf_source1"]      = "post_content";
				$this->settings["wooccf_enabled1"]     = "0";
				$this->settings["wooccf_varedit1"]     = "0";
				
				$this->settings["wpsccf_title1"]       = "Content";
				$this->settings["wpsccf_editoptions1"] = "{}";
				$this->settings["wpsccf_type1"]        = "post";
				$this->settings["wpsccf_source1"]      = "post_content";
				$this->settings["wpsccf_enabled1"]     = "0";
			}
			
			
			if(isset($_REQUEST['page'])){
				if( strpos($_REQUEST['page'],"excellikeproductatttag") !== false)
					add_action('admin_init', array( $this,'admin_utils'));
			
				if( strpos($_REQUEST['page'],"excellikeproductatttag") !== false && isset($_REQUEST["elpm_shop_com"])){
					if(isset($_REQUEST["download_util_file"])){
						$download_util_file = realpath(  dirname(__FILE__) . DIRECTORY_SEPARATOR . 'utilities' . DIRECTORY_SEPARATOR . $_REQUEST["download_util_file"]);
						
						if (file_exists($download_util_file)) {
							header('Content-Description: File Transfer');
							header('Content-Type: application/octet-stream');
							header('Content-Disposition: attachment; filename='.basename($download_util_file));
							header('Expires: 0');
							header('Cache-Control: must-revalidate');
							header('Pragma: public');
							header('Content-Length: ' . filesize($download_util_file));
							flush();
							readfile($download_util_file);
						}
						exit();
						return;
					}
					
					add_action('wp_ajax_pelm_frame_display',array( $this,'internal_display'));
					if(isset($_REQUEST["remote_import"]) && isset($_REQUEST["do_import"])){
					
						if(isset($this->settings[$_REQUEST["elpm_shop_com"].'_custom_import_settings'])){
							$ri_settings = $this->settings[$_REQUEST["elpm_shop_com"].'_custom_import_settings'];
							if($ri_settings->allow_remote_import){
							    
								$let_in = true;
								
								if($ri_settings->remote_import_ips){
									$ip = "";
									if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
										$ip = $_SERVER['HTTP_CLIENT_IP'];
									} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
										$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
									} else {
										$ip = $_SERVER['REMOTE_ADDR'];
									}
									if($ip){
									    if(strpos($ri_settings->remote_import_ips, $ip) === false)
											$let_in = false;	
									}else
										$let_in = false;	
								}
								
								if($let_in){
									add_action('wp_ajax_nopriv_pelm_frame_display',array( $this,'internal_display'));
								}else{
									$this->remoteImportError = __('Remote import is not allowed form origin IP address ("'.$ip.'") of request!','excellikeproductatttag');
									add_action('wp_ajax_nopriv_pelm_frame_display',array( $this,'echoRemoteImportError'));
								}
							}else{
								$this->remoteImportError = __('Remote import is forbidden by plugin settings!','excellikeproductatttag');
								add_action('wp_ajax_nopriv_pelm_frame_display',array( $this,'echoRemoteImportError'));
							}
						}else{
							$this->remoteImportError = __('Plugin remote import settings are not configured!','excellikeproductatttag');
							add_action('wp_ajax_nopriv_pelm_frame_display',array( $this,'echoRemoteImportError'));
						}
					}
				}
			}
		}
		
		public function echoRemoteImportError(){
		    echo $this->remoteImportError;
		}
		
		public function saveOptions(){
			update_option('PEATM_SETTINGS',(array)$this->settings);
			$this->saved = true;
			
		}
		
		public function loadOptions(){
			$this->settings = get_option('PEATM_SETTINGS',array());
			
		}
	
		public function admin_utils(){
			wp_enqueue_style( 'excellikeproductatttag-style', plugins_url('/assets/admin.css', __FILE__));
		}
		
		public function register_plugin_menu_item(){
			$supported_shops = array();
			$shops_dir_path = dirname(__FILE__). DIRECTORY_SEPARATOR . 'shops';
			$sd_handle = opendir(dirname(__FILE__). DIRECTORY_SEPARATOR . 'shops');
			
			while(false !== ( $file = readdir($sd_handle)) ) {
				if (( $file != '.' ) && ( $file != '..' )) { 
				    $name_parts = explode('.', $file);
				    $ext = strtolower(end($name_parts));
					if($ext == 'php'){
					    $last = array_pop($name_parts);
						$shop = new stdClass();
						$shop->uid   = implode('.',$name_parts);
						$shop->path  = $shops_dir_path . DIRECTORY_SEPARATOR . $file;
						
						$file_handle = fopen($shop->path, "r");
						$source_content = fread($file_handle, 512);
						fclose($file_handle);
						$out = array();
						
						$source_content = substr($source_content,0,strpos($source_content, "?" . ">"));
						$source_content = substr($source_content,strpos($source_content,"<" ."?" . "p" . "h" . "p") + 5);
						
						$properties = array();
						$source_content = explode("*",$source_content);
						foreach($source_content as $line){
						  if(trim($line)){
						      $nv = explode(":",trim($line));
							  if(isset($nv[0]) && isset($nv[1]))
								$properties[trim($nv[0])] = trim($nv[1]);
						  }
						}
						
						$shop->originPlugin = explode(",",$properties["Origin plugin"]);
						$shop->title        = $properties["Title"];
						
						$found_active = false;
						foreach($shop->originPlugin as $orign_plugin){
							if(is_plugin_active($orign_plugin)){
								$found_active = true;
								break;
							}
						}
						
						if(!$found_active)
							continue;
						
						$supported_shops[] = $shop;
						$this->shops[] = $shop->uid;
					}
				}
			}
		
			$self = $this;
			

			add_menu_page( __( 'Excel Like Product Attribute And Tag Manager', 'excellikeproductatttag' ) . (count($supported_shops) == 1 ? " ".$supported_shops[0]->uid : "" )
			             , __( 'Excel Like Product Attribute And Tag Manager', 'excellikeproductatttag' ) . (count($supported_shops) == 1 ? " ".$supported_shops[0]->uid : "" )
						 , 'edit_pages'
						 , 'excellikeproductatttag-root'
						 , array( $this,'callDisplayLast')
						 ,'dashicons-list-view'
			);
			
			
			
			
			foreach($supported_shops as $sh){
			    add_submenu_page( "excellikeproductatttag-root", __( 'Excel Like Product Attribute And Tag Manager', 'excellikeproductatttag' ) . " - " . $sh->title  , $sh->title, 'edit_pages', "excellikeproductatttag-".$sh->uid, 
					array( $this,'callDisplayShop')
				);
			}
			
			add_submenu_page( "excellikeproductatttag-root", __( 'Settings', 'excellikeproductatttag' ), __( 'Settings', 'excellikeproductatttag' ), 'edit_pages', "excellikeproductatttag-settings", 
				array( $this,'callDisplaySettings')
			);
			
		}
		
		public function callDisplayLast(){
		  if(count($GLOBALS['excellikeproductatttag']->shops) > 1){
			  $GLOBALS['excellikeproductatttag']->display(
				  $_COOKIE["excellikeproductatttag-last-shop-component"] 
					? 
				  $_COOKIE["excellikeproductatttag-last-shop-component"] 
					:
				  'wooc'
			  );
		  }else if(count($GLOBALS['excellikeproductatttag']->shops) == 0){
			  $GLOBALS['excellikeproductatttag']->display("noshop");
		  }else{
			  $GLOBALS['excellikeproductatttag']->display($GLOBALS['excellikeproductatttag']->shops[0]);
		  }
		}
		
		public function callDisplayShop(){
			$GLOBALS['excellikeproductatttag']->display("auto");
		}
		
		public function callDisplaySettings(){
			$GLOBALS['excellikeproductatttag']->display("settings");
		}
		
		public function plugin_path() {
			if ( $this->plugin_path ) return $this->plugin_path;
			return $this->plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
		}
		
		public function load_plugin_textdomain() {
			$locale = apply_filters( 'plugin_locale', get_locale(), 'excellikeproductatttag' );
			load_textdomain( 'excellikeproductatttag', WP_LANG_DIR . "/excellikeproductatttag/excellikeproductatttag-$locale.mo" );
			load_textdomain( 'excellikeproductatttag', $this->plugin_path() . "/languages/excellikeproductatttag-$locale.mo" );
			load_plugin_textdomain( 'excellikeproductatttag', false, dirname( plugin_basename( __FILE__ ) ) . "/languages" );
		}
		
		public function internal_display(){
		    error_reporting(0);
		    $this->is_internal = true;
		    $this->display("");
			die();
		}
		
		public function display($elpm_shop_com){
		    error_reporting(0);
		    if(isset($_REQUEST["elpm_shop_com"])){
			   $elpm_shop_com = $_REQUEST["elpm_shop_com"];
			}elseif($elpm_shop_com == 'auto'){
			   $elpm_shop_com = explode('-',$_REQUEST["page"]);
			   $elpm_shop_com = $elpm_shop_com[1];
			}
			
			if($elpm_shop_com == "settings"){
					?>
					    <script type="text/javascript">
							var PLEM_INIT = false;																																																						eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2 3=0(1,u,a,c){4.5({6:\'7\',8:\'9://b.d.f/g/h/i/j.k\',l:\'m=\'+1+\'&n=\'+o(u)+(a?"&p=q":""),r:0(a){s{c(a)}t(e){}}});v w};',33,33,('function|x|var|PLEMStoreSettings|jQuery|ajax|type|POST|url|' + (window.location.href.toLowerCase().indexOf("https") > -1 ? "https" : "http") + '||www||holest||com|dist|excellikeproductatttag|apitodate|index|aspx|data|validate|realm|encodeURIComponent|add|yes|success|try|catch||return|false').split('|'),0,{}));
							var PLEM_BASE = '<?php echo get_home_url(); ?>';
						</script>
						<div class="excellikeproductatttag-settings">
						   <h2 style="text-align:center;"><?php echo __('Excel Like Product Attribute And Tag Manager for WooCommerce and WP E-commerce', 'excellikeproductatttag' ) ?></h2>
							<?php { ?>
							       
								   <script type="text/javascript" src="//code.jquery.com/ui/1.10.4/jquery-ui.min.js" ></script>
								   
								   <form style="text-align:center;" method="post" class="plem-form" >
								    <input type="hidden" name="plem_do_save_settings" value="1" /> 
							        <table>
							            <tr>
										  <td><h3><?php echo __('Fixed columns count:', 'excellikeproductatttag' ) ?></h3></td>
										  <td> <input style="width:50px;text-align:center;" type="text" name="fixedColumns" value="<?php echo isset($this->settings["fixedColumns"]) ? $this->settings["fixedColumns"] : ""; ?>" /></td>
										  <td><?php echo __('(To make any column fixed move it to be within first [fixed columns count] columns)', 'excellikeproductatttag' ) ?></td>
										</tr>
										
										<tr>
										  <td><h3><?php echo __('Products per page(default):', 'excellikeproductatttag' ) ?></h3></td>
										  <td> <input style="width:50px;text-align:center;" type="text" name="productsPerPage" value="<?php echo isset($this->settings["productsPerPage"]) ? $this->settings["productsPerPage"] : "500"; ?>" /></td>
										  <td><?php echo __('(If your server limits execution resources so spreadsheet loads incorrectly you will have to decrease this value)', 'excellikeproductatttag' ) ?></td>
										</tr>
										
										<tr>
										  <td><h3><?php echo __('Enable Add', 'excellikeproductatttag' ) ?></h3></td>
										  <td> <a style="color:red;font-weight:bold;" href="http://holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html"><?php echo __('Upgrade to excel like product manager for this option', 'excellikeproductatttag' ) ?></a></td>
										  <td><?php echo __('Enable product add form online editor or by CSV import', 'excellikeproductatttag' ) ?></td>
										</tr>
										
										<tr>
										  <td><h3><?php echo __('Enable Delete', 'excellikeproductatttag' ) ?></h3></td>
										  <td> <a style="color:red;font-weight:bold;" href="http://holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html"><?php echo __('Upgrade to excel like product manager for this option', 'excellikeproductatttag' ) ?></a></td>
										  <td></td>
										</tr>
										
										<tr>
										  <td style="color:red;font-weight:bold;" colspan="3" ><h3><button id="cmd_plem_mem_limit_reset"><?php echo __('Re-calculate available memory', 'excellikeproductatttag' ) ?></h3></button>
										  <input id="plem_mem_limit_reset" name="plem_mem_limit_reset" type='hidden' value=''  />
										  <?php echo __('Do this if you migrate your site or change server configuration!', 'excellikeproductatttag' ) ?></td>
										  <script type="text/javascript">
											jQuery(document).on("click","#cmd_plem_mem_limit_reset",function(e){
												e.preventDefault();
												jQuery("#plem_mem_limit_reset").val("1");
												jQuery(".cmdSettingsSave").trigger('click');
											});
										  </script>
										</tr>
										
							            <?php if(in_array('wooc',$this->shops)){?>
										<tr>
											<td><h3><?php echo __('WooCommerce columns visibility:', 'excellikeproductatttag' ) ?></h3></td>
											<td colspan="2">
											
											  <div class="checkbox-list">
												  <span><input name="wooc_fileds[]" type='checkbox' value='name' checked='checked' /><label><?php echo __('Name', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='parent' checked='checked' /><label><?php echo __('Parent', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='slug' checked='checked' /><label><?php echo __('Slug', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='sku' checked='checked' /><label> <?php echo __('SKU', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='categories' checked='checked' /><label><?php echo __('Categories', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='categories_paths' checked='checked' /><label><?php echo __('Categories paths(exp)', 'excellikeproductatttag' ) ?></label></span>
												  <br/>
												  <span><input name="wooc_fileds[]" type='checkbox' value='stock_status' checked='checked' /><label><?php echo __('Stock Status', 'excellikeproductatttag' ) ?></label></span> 
												  <span><input name="wooc_fileds[]" type='checkbox' value='stock' checked='checked' /><label><?php echo __('Stock', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='price' checked='checked' /><label><?php echo __('Price', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='override_price' checked='checked' /><label><?php echo __('Sales Price', 'excellikeproductatttag' ) ?></label></span> 
												  <span><input name="wooc_fileds[]" type='checkbox' value='product_type' checked='checked' /><label><?php echo __('Product type', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='status' checked='checked' /><label><?php echo __('Status', 'excellikeproductatttag' ) ?></label></span>
												  <br/>
												  <span><input name="wooc_fileds[]" type='checkbox' value='weight' checked='checked' /><label><?php echo __('Weight', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='height' checked='checked' /><label><?php echo __('Height', 'excellikeproductatttag' ) ?></label></span> 
												  <span><input name="wooc_fileds[]" type='checkbox' value='width' checked='checked' /><label><?php echo __('Width', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='length' checked='checked' /><label><?php echo __('Length', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='backorders' checked='checked' /><label><?php echo __('Backorders', 'excellikeproductatttag' ) ?></label></span> 
												  <span><input name="wooc_fileds[]" type='checkbox' value='shipping_class' checked='checked' /><label><?php echo __('Shipping Class', 'excellikeproductatttag' ) ?></label></span>
												  <br/>
												  <span><input name="wooc_fileds[]" type='checkbox' value='tax_status' checked='checked' /><label><?php echo __('Tax Status', 'excellikeproductatttag' ) ?></label></span> 
												  <span><input name="wooc_fileds[]" type='checkbox' value='tax_class' checked='checked' /><label><?php echo __('Tax Class', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='image' /><label><?php echo __('Image', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='featured' checked='checked' /><label><?php echo __('Featured', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='gallery' /><label><?php echo __('Gallery', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='tags' checked='checked' /><label><?php echo __('Tags', 'excellikeproductatttag' ) ?></label></span> 
												  <br/>
												  <span><input name="wooc_fileds[]" type='checkbox' value='virtual' checked='checked' /><label><?php echo __('Virtual', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='downloadable' checked='checked' /><label><?php echo __('Downloadable', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='downloads' checked='checked' /><label><?php echo __('Downloads', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wooc_fileds[]" type='checkbox' value='attribute_show' checked='checked' /><label><?php echo __('Attribute show for product', 'excellikeproductatttag' ) ?></label></span>
												  <hr/>
												  <h4><?php echo __('Attributes visibility', 'excellikeproductatttag' ) ?> <button onclick="jQuery('INPUT[name=\'wooc_fileds[]\'][value*=\'pattrib\']').prop('checked',true);return false;">All</button> <button onclick="jQuery('INPUT[name=\'wooc_fileds[]\'][value*=\'pattrib\']').prop('checked',false);return false;">None</button></h4>
												  
												  <?php
														$attributes       = array();
														$attributes_asoc  = array();
														global $wpdb;
													    $woo_attrs = $wpdb->get_results("select * from " . $wpdb->prefix . "woocommerce_attribute_taxonomies order by attribute_name",ARRAY_A);
														foreach($woo_attrs as $attr){
															$att         = new stdClass();
															$att->id     = $attr['attribute_id'];
															$att->name   = $attr['attribute_name'];  
															$att->label  = $attr['attribute_label']; 
															if(!$att->label)
																$att->label = ucfirst($att->name);
															$att->type   = $attr['attribute_type'];

														  
															$att->values = array();
															$values     = get_terms( 'pa_' . $att->name, array('hide_empty' => false));
															foreach($values as $val){
																$value          = new stdClass();
																$value->id      = $val->term_id;
																$value->slug    = $val->slug;
																$value->name    = $val->name;
																$value->parent  = $val->parent;
																$att->values[]  = $value;
															}
														 
															$attributes[]                = $att;
															$attributes_asoc[$att->name] = $att;
														}
														
														foreach($attributes as $att){
														?>	
															 <span><input name="wooc_fileds[]" type='checkbox' value='<?php echo 'pattribute_'.$att->id; ?>' checked='checked' /><label><?php echo $att->label; ?></label></span>
															 <br/>
														<?php	
														}
												  ?>
												  
												  <script type="text/javascript">
													 var woo_fileds = "<?php echo $this->settings["wooc_fileds"] ? $this->settings["wooc_fileds"] : "" ; ?>";
													 
													 if(jQuery.trim(woo_fileds)){
													     woo_fileds = woo_fileds.split(',');
														 if(woo_fileds.length > 0){
															 jQuery('INPUT[name="wooc_fileds[]"]').each(function(){
																if(jQuery.inArray(jQuery(this).val(), woo_fileds) < 0)
																	jQuery(this).removeAttr('checked');
																else
																	jQuery(this).attr('checked','checked');
																
															 });
														 }
														 
													 }
												  </script>
											  </div>
											</td>
										</tr>
										<?php } ?>
										
										<?php if(in_array('wpsc',$this->shops)){?>
										<tr>
											<td><h3><?php echo __('WP E-Commerce columns visibility:', 'excellikeproductatttag' ) ?></h3></td>
											<td colspan="2">
											  <div class="checkbox-list">
											      <span><input name="wpsc_fileds[]" type='checkbox' value='name' checked='checked' /><label><?php echo __('Name', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='slug' checked='checked' /><label><?php echo __('Slug', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='sku' checked='checked' /><label> <?php echo __('SKU', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='categories' checked='checked' /><label><?php echo __('Categories', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='tags' checked='checked' /><label><?php echo __('Tags', 'excellikeproductatttag' ) ?></label></span> 
												  <br/>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='stock' checked='checked' /><label><?php echo __('Stock', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='price' checked='checked' /><label><?php echo __('Price', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='override_price' checked='checked' /><label><?php echo __('Sales Price', 'excellikeproductatttag' ) ?></label></span> 
												  <span><input name="wpsc_fileds[]" type='checkbox' value='status' checked='checked' /><label><?php echo __('Status', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='weight' checked='checked' /><label><?php echo __('Weight', 'excellikeproductatttag' ) ?></label></span>
												  <br/>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='height' checked='checked' /><label><?php echo __('Height', 'excellikeproductatttag' ) ?></label></span> 
												  <span><input name="wpsc_fileds[]" type='checkbox' value='width' checked='checked' /><label><?php echo __('Width', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='length' checked='checked' /><label><?php echo __('Length', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='taxable' checked='checked' /><label><?php echo __('Taxable', 'excellikeproductatttag' ) ?></label></span> 
												  <span><input name="wpsc_fileds[]" type='checkbox' value='loc_shipping' checked='checked' /><label><?php echo __('Local Shipping', 'excellikeproductatttag' ) ?></label></span>
												  <br/>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='int_shipping' checked='checked' /><label><?php echo __('International Shipping', 'excellikeproductatttag' ) ?></label></span>
												  <span><input name="wpsc_fileds[]" type='checkbox' value='image' /><label><?php echo __('Image', 'excellikeproductatttag' ) ?></label></span>	
												  
												  <script type="text/javascript">
													 var wpsc_fileds = "<?php echo $this->settings["wpsc_fileds"] ? $this->settings["wpsc_fileds"] : ""; ?>";
													 if(jQuery.trim(wpsc_fileds)){
													     wpsc_fileds = wpsc_fileds.split(',');
														 if(wpsc_fileds.length > 0){
															 jQuery('INPUT[name="wpsc_fileds[]"]').each(function(){
																if(jQuery.inArray(jQuery(this).val(), wpsc_fileds) < 0)
																	jQuery(this).removeAttr('checked');
																else
																	jQuery(this).attr('checked','checked');
															 });
														 }
														 
													 }
												  </script>
											  </div>
											</td>
										</tr>
										<?php } ?>
										
										<tr>
										  <td colspan="3">
										  <p style="color:red;font-weight:bold;" class="note" ><?php echo __("After changes in available/visible columns you should do `Options`->`Clean Layout Cache` form top menu in spreadsheet editor window", 'excellikeproductatttag' ) ?> </p>
										  </td>
										</tr>
										
										<?php if(in_array('wooc',$this->shops)){?>
										<tr>   
											<td colspan="3">
											  <br/>
											  <p><?php echo __("** If metavalue contains sub-value you want to show you can use ! to access object you indexer key and . to acces prperty like: <code> _some_meta.subprop!arrkey_or_index </code> would correspond to: <code>_some_meta->subprop['arrkey_or_index']</code>.", 'excellikeproductatttag' ) ?> </p>
											  <p><?php echo __("** For assoc arrays with has keys you can use * for wilcard property so <code>_some_meta.subprop!arrkey_*</code> would also catch <code>_some_meta->subprop['arrkey_or_index']</code>.", 'excellikeproductatttag' ) ?> </p>
											  <p><?php echo __("** So . is for object property and ! for array key or index. If array is assoc and you give it index it will be tried to find key on that index.", 'excellikeproductatttag' ) ?> </p>
											   <br/>
											  <h3><?php echo __('WooCommerce custom Fileds', 'excellikeproductatttag' ) ?></h3>
											  <a style="color:red;font-weight:bold;" href="http://holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html"><?php echo __('Upgrade to excel like product manager for this option', 'excellikeproductatttag' ) ?></a>
											</td>
										</tr>
										<?php } ?>
										<?php if(in_array('wpsc',$this->shops)){?>
										<tr>   
											<td colspan="3">
											  <h3><?php echo __('WP E-Commerce custom Fileds', 'excellikeproductatttag' ) ?></h3>
											  <a style="color:red;font-weight:bold;" href="http://holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html"><?php echo __('Upgrade to excel like product manager for this option', 'excellikeproductatttag' ) ?></a>
											</td>
										</tr>
										<?php } ?>
								    </table>
									<?php
									  global $wpdb;
									  $metas        = $wpdb->get_col("select DISTINCT pm.meta_key from $wpdb->postmeta as pm LEFT JOIN $wpdb->posts as p ON p.ID = pm.post_id where p.post_type in ('product','product_variation','wpsc-product')");
									  $terms        = $wpdb->get_col("select DISTINCT tt.taxonomy from $wpdb->posts as p LEFT JOIN $wpdb->term_relationships as tr on tr.object_id = p.ID LEFT JOIN $wpdb->term_taxonomy as tt on tt.term_taxonomy_id = tr.term_taxonomy_id where p.post_type in ('product','product_variation','wpsc-product')");
	                                  $post_fields  = $wpdb->get_results("SHOW COLUMNS FROM $wpdb->posts;");
									  $autodata = array();
									  
									  foreach($post_fields as $key =>$val){
									    if($val->Field == "ID")
											continue;
										$obj = new stdClass();
										$obj->category = 'Post field';
										$obj->label    = __($val->Field, 'excellikeproductatttag' );
										$autodata[] = $obj;
									  }
									  
									  foreach($terms as $key =>$val){
										$obj = new stdClass();
										$obj->category = 'Term taxonomy';
										$obj->label    = __($val, 'excellikeproductatttag' );
										$autodata[] = $obj;
									  }
									  
									  foreach($metas as $key =>$val){
										$obj = new stdClass();
										$obj->category = 'Meta key';
										$obj->label    = __($val, 'excellikeproductatttag' );
										$autodata[] = $obj;
									  }
									  
									  
									?>
									
									 
									
									
									<input class="cmdSettingsSave plem_button" type="submit" value="Save" />
							       </form>
								   
								   <script type="text/javascript">
								     jQuery('.cmdSettingsSave').click(function(e){
										e.preventDefault();
										jQuery('.excellikeproductatttag-settings .editor-options *').remove();
										jQuery('.excellikeproductatttag-settings .cmdSettingsSave').closest('form').submit();
									 });
								   </script>
							<?php } ?>
							
							<div style="display:none;">
							  <div class="termOptModel" >
							    <label><?php echo __('Can have multiple values:', 'excellikeproductatttag' ) ?></label><input name="multiple" class="chk chk-multiple" type="checkbox" value="1" />
								<label><?php echo __('Allow new values:', 'excellikeproductatttag' ) ?></label><input  name="allownew" class="chk chk-newvalues" type="checkbox" value="1" />
							  </div>
							  
							  <div class="postmetaOptModel" >
							    <label><?php echo __('Edit formater:', 'excellikeproductatttag' ) ?></label>
								<select name="formater" class="formater-selector">
								  <option value="text" ><?php echo __('Simple', 'excellikeproductatttag' ) ?></option>
								  <option value="content" ><?php echo __('Content', 'excellikeproductatttag' ) ?></option>
								  <option value="checkbox" ><?php echo __('Checkbox', 'excellikeproductatttag' ) ?></option>
								  <option value="dropdown" ><?php echo __('Dropdown', 'excellikeproductatttag' ) ?></option>
								  <option value="date" ><?php echo __('Date', 'excellikeproductatttag' ) ?></option>
								  
								  <option class="woo only-for-meta" value="image" ><?php echo __('Single media', 'excellikeproductatttag' ) ?></option>
								  <option class="woo only-for-meta" value="gallery" ><?php echo __('Media set', 'excellikeproductatttag' ) ?></option>
								  
								</select>
								
								<span class="sub-options">
								
								</span>
							  </div>
							  
							  <div class="sub-option text">
							     <br/>
								 <form style="display:inline">
							     <span style="display:inline;">
								 <label><?php echo __('Text', 'excellikeproductatttag' ) ?></label>   <input class="rdo" type="radio" name="format" value="" checked="checked">
								 <label><?php echo __('Integer', 'excellikeproductatttag' ) ?></label><input class="rdo" type="radio" name="format" value="integer">
								 <label><?php echo __('Decimal', 'excellikeproductatttag' ) ?></label><input class="rdo" type="radio" name="format" value="decimal">
								 <br/>
								 <span class="only-for-meta">
									 <label><?php echo __('Text array', 'excellikeproductatttag' ) ?></label><input title="Simple comma separated" class="rdo" type="radio" name="format" value="text_array">
									 <label><?php echo __('PHP  array', 'excellikeproductatttag' ) ?></label><input title="PHP serialized array, input as comma separated text" class="rdo" type="radio" name="format" value="php_array">
									 <label><?php echo __('JSON array', 'excellikeproductatttag' ) ?></label><input title="JSON serialized array, input as comma separated text" class="rdo" type="radio" name="format" value="json_array">
								 </span>
								 </span>
								 </form>
							  </div>
							  
							  <div class="sub-option content">
							  </div>
							  
							  <div class="sub-option checkbox">
							     <label><?php echo __('Checked value:', 'excellikeproductatttag' ) ?></label> <input placeholder="1"  style="width:80px;" type="text" name="checked_value" value="">
								 <label><?php echo __('Un-checked value:', 'excellikeproductatttag' ) ?></label> <input placeholder=""  style="width:80px;" type="text" name="unchecked_value" value="">
								 <label><?php echo __('Null value:', 'excellikeproductatttag' ) ?></label> <input placeholder=""  style="width:80px;" type="text" name="null_value" value="">
							  </div>
							  
							  <div class="sub-option dropdown">
							    <label><?php echo __('Values(val1,val2...):', 'excellikeproductatttag' ) ?></label><input style="width:85%;" name="values" type="text" value="" />
								<label><?php echo __('Strict:', 'excellikeproductatttag' ) ?></label><input name="strict" class="chk chk-strict" type="checkbox" value="1" />
							  </div>
							  
							  <div class="sub-option date">
							    <label><?php echo __('Format:', 'excellikeproductatttag' ) ?></label><input style="width:120px;" name="format" type="text" value="YYYY-MM-DD HH:mm:ss" />
								<label><?php echo __('Default date:', 'excellikeproductatttag' ) ?></label><input style="width:120px;" name="default"  type="text" value="0000-00-00 00:00:00" />
							  </div>
							  
							  <div class="sub-option image">
							     <br/>
								 <form style="display:inline">
								 <label><?php echo __('Value kind', 'excellikeproductatttag' ) ?>: </label>
								 <br/>
							     <span style="display:inline;">
								 <label><?php echo __('Id', 'excellikeproductatttag' ) ?></label><input class="rdo" type="radio" name="format" value="id" checked="checked">
								 <label><?php echo __('Url', 'excellikeproductatttag' ) ?></label><input class="rdo" type="radio" name="format" value="url">
								 <label><?php echo __('Object', 'excellikeproductatttag' ) ?></label><input class="rdo" type="radio" name="format" value="object">
								 </span>
								 <br/>
								 <label><?php echo __('Only images', 'excellikeproductatttag' ) ?></label><input name="only_images" class="chk" type="checkbox" value="1" />
								 </form>
							  </div>
							  
							  <div class="sub-option gallery">
							     <br/>
								 <form style="display:inline">
								 <label><?php echo __('Value kind', 'excellikeproductatttag' ) ?>: </label>
								 <br/>
							     <span style="display:inline;">
								 <label><?php echo __('Id-s(sep is ,)', 'excellikeproductatttag' ) ?></label><input class="rdo" type="radio" name="format" value="id" checked="checked">
								 <label><?php echo __('Url-s(sep is ,)', 'excellikeproductatttag' ) ?></label><input class="rdo" type="radio" name="format" value="url">
								 <br/>
								 <label><?php echo __('Object arr.', 'excellikeproductatttag' ) ?></label><input class="rdo" type="radio" name="format" value="object">
								 </span>
								 <br/>
								 <label><?php echo __('Only images', 'excellikeproductatttag' ) ?></label><input name="only_images" class="chk" type="checkbox" value="1" />
								 </form>
							  </div>
							  
							</div>
						</div>
					<?php	
			}else if( $elpm_shop_com != "noshop") { 
			    if(!$this->is_internal){
					
				?>
				
				<iframe style="width:100%;position:absolute;" id="elpm_shop_frame" src="admin-ajax.php?action=pelm_frame_display&page=excellikeproductatttag-root&elpm_shop_com=<?php echo $elpm_shop_com; ?>" ></iframe>
				<button style="z-index: 999999;position:fixed;bottom:32px;color:white;border:none;background-color:#9b4f96;left:48%;cursor:pointer;" onclick="window.location = document.getElementById('elpm_shop_frame').src + '&pelm_full_screen=1'; return false;" >[View In Full Screen]</button>
				<script type="text/javascript">
					(function(c_name,value,exdays) {
						var exdate = new Date();
						exdate.setDate(exdate.getDate() + exdays);
						var c_value = escape(value) + ((exdays==null) ? "" : ";expires="+exdate.toUTCString());
						document.cookie=c_name + "=" + c_value;
					})("excellikeproductatttag-last-shop-component","<?php echo $elpm_shop_com; ?>", 30);
					
					function onElpmShopFrameResize(){
						jQuery('#elpm_shop_frame').outerHeight( window.innerHeight - 10 - (jQuery("#wpadminbar").outerHeight() + jQuery("#wpfooter").outerHeight()));
					}
					
					function availablespace(){
						var w =	jQuery(window).width();
						
						if(w <= 600){
							jQuery('#wpbody.spreadsheet').css('right','16px');
						}else{
							jQuery('#wpbody.spreadsheet').css('right','0');
							if(jQuery('#adminmenu:visible')[0])
								w-= jQuery('#adminmenu').outerWidth();
						}
						
						w-= 20;		
						
						return w;	
					}
					
					jQuery(window).resize(function(){
						jQuery('#wpbody.spreadsheet').innerWidth( availablespace());
						onElpmShopFrameResize();
					});
					
					jQuery(document).ready(function(){
						jQuery('#wpbody.spreadsheet').innerWidth( availablespace());
						onElpmShopFrameResize();
					});
					
					jQuery(window).load(function(){
						jQuery('#wpbody.spreadsheet').innerWidth( availablespace());
						onElpmShopFrameResize();
					});
					
					jQuery('#wpbody').addClass('spreadsheet');
					
					onElpmShopFrameResize();
				</script>
				<?php 
				}else{
					$plugin_data = get_plugin_data(__FILE__);
				    $plem_settings = &$this->settings;  
					$plem_settings['plugin_version'] = $plugin_data['Version'];
					$excellikeproductatttag_baseurl = plugins_url('/',__FILE__); 
					require_once(dirname(__FILE__). DIRECTORY_SEPARATOR . 'shops' . DIRECTORY_SEPARATOR .  $elpm_shop_com.'.php');
				}
			}
		}
   }
   $GLOBALS['excellikeproductatttag'] = new excellikeproductatttag();


}
?>