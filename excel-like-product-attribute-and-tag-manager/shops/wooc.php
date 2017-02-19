<?php
/*
 * Title: WooCommerce
 * Origin plugin: woocommerce/woocommerce.php,envato-wordpress-toolkit/woocommerce.php
*/
?>
<?php
if ( !function_exists('add_action') ) {
	header('Status: 403 Forbidden');
	header('HTTP/1.1 403 Forbidden');
	exit();
}

ob_get_clean();
ob_get_clean();
ob_get_clean();
ob_get_clean();

if(ini_get('max_execution_time') < 300)
	set_time_limit ( 300 ); //1.5 min

global $start_time, $max_time, $mem_limit, $res_limit_interupted, $resume_skip;
$resume_skip          = 0;  
$res_limit_interupted = 0;

if(isset($_REQUEST["resume_skip"]))
	$resume_skip = intval($_REQUEST["resume_skip"]);

$start_time     = time();
$max_time       = ini_get('max_execution_time') / 2;
if(!$max_time)
   $max_time    = 30;


global $wpdb;
global $wooc_fields_visible, $variations_fields;
global $custom_fileds, $use_image_picker, $use_content_editior;

$use_image_picker    = false;
$use_content_editior = false;

if(isset($_REQUEST['keep_alive'])){
	if($_REQUEST['keep_alive']){
		return;
	}
}



if(isset($_REQUEST["set_mem_limit"])){
	update_option("plem_mem_limit" . ini_get('memory_limit'),$_REQUEST["set_mem_limit"],false);
	?><!DOCTYPE html>
		<html>
		<head>
		<style type="text/css">
			html, body{
				background:#505050;
				color:white;
				font-family:sans-serif;	
			}
		</style>
		</head>
		<body>
		  <script type="text/javascript">
				window.location = window.location.href.split("&set_mem_limit")[0];
		  </script>
		</body>
		</html>
	<?php
	die;
	return;
}

$mem_limit = get_option("plem_mem_limit" . ini_get('memory_limit'), 0); 
global $start_mem;
$start_mem = memory_get_usage();

function getMemAllocated(){
	global $start_mem;
	return memory_get_usage() - $start_mem;
} 

if(isset($_REQUEST["memtest"])){
	header('Content-Type: text/text; charset=' . get_option('blog_charset'), true);
	$x = array_fill ( 0 , intval($_REQUEST["memtest"]) , false );
	echo "OK ". count($x);
	die;
	return;
}elseif($mem_limit == 0){
	wp_enqueue_script('jquery');
	?>
	<!DOCTYPE html>
	<html>
		<head>
		<style type="text/css">
			html, body{
				background:#505050;
				color:white;
				font-family:sans-serif;	
			}
		</style>
		<?php wp_print_scripts() ; ?>
		</head>
		<body>
		<h3>Inspecting environment...</h3>
		<p>Please wait a moment!</p>
	<script type="text/javascript">
	var curr_memtest = 100000;
	var test_jump    = curr_memtest;
	function checkmem(){
		jQuery.ajax({
			url: window.location.href + "&memtest=" + (curr_memtest + test_jump),
			type: "GET",
			success: function (data) {
				if(curr_memtest > 6400000){
					window.location = window.location.href + "&set_mem_limit=" + (curr_memtest * 80);
					return;
				}
				
				if(data){
					curr_memtest += test_jump;
					checkmem();
				}else{
					if(test_jump == 25000){
						window.location = window.location.href + "&set_mem_limit=" + (curr_memtest * 80); 
					}else{
						test_jump = test_jump / 2;
						checkmem();
					}
				}
			},
			error:function (a,b,c) {
				if(test_jump == 25000){
						window.location = window.location.href + "&set_mem_limit=" + (curr_memtest * 80); 
				}else{
					test_jump = test_jump / 2;
					checkmem();
				}
			}
		});
	};
	checkmem();
	</script>
	</body>
	</html>
	<?php
	die;
}

//ob_clean();
//header('Content-Type: text/html; charset=' . get_option('blog_charset'), true);

$wooc_fields_visible = array();
if(isset($plem_settings['wooc_fileds'])){
	foreach(explode(",",$plem_settings['wooc_fileds']) as $I => $val){
		if($val)
			$wooc_fields_visible[$val] = true;
	}
}

global $impexp_settings, $custom_export_columns;

$impexp_settings = NULL;
$custom_export_columns=array();		

if(isset($plem_settings[$_REQUEST["elpm_shop_com"].'_custom_import_settings'])){
	$impexp_settings = $plem_settings[$_REQUEST["elpm_shop_com"].'_custom_import_settings'];
	if(!isset($impexp_settings->custom_export_columns))
		$impexp_settings->custom_export_columns = "";
	if($impexp_settings){
		foreach(explode(",",$impexp_settings->custom_export_columns) as $col){
			   if($col)
				$custom_export_columns[] = $col;
		}
	}
}

if(!isset($impexp_settings->delimiter2))
	$impexp_settings->delimiter2 = ',';

if(!isset($impexp_settings->use_custom_export))
	$impexp_settings->use_custom_export = false;

function fn_show_filed($name){
	global $wooc_fields_visible, $custom_export_columns, $impexp_settings;;
	
	if(empty($wooc_fields_visible))
		return true;
	
	if($impexp_settings->use_custom_export && $_REQUEST["do_export"]){
		if(in_array($name,$custom_export_columns))
			return true;
		else
			return false;
	}else if($name=="categories_paths" && $impexp_settings->use_custom_export && $_REQUEST["do_export"]){
		return true;
	}
		
	if(isset($wooc_fields_visible[$name]))
		return $wooc_fields_visible[$name];
	
	$wooc_fields_visible[$name] = false;
	return false;
};

function fn_correct_type($s){
  if( is_numeric(trim($s)))
	return intval($s);
  else 
    return trim($s);  
};

function arrayVal($val){
   if(is_string($val))
		return explode(",",$val);
   return $val;	
};

function is_assoc($arr){
	if(empty($arr))
		return false;
	$ak = array_keys($arr);
	if(is_string($ak[0]))
	  return true;		
	return !(end($ak ) === count($arr) - 1); 
}

global $sitepress;
if(isset($sitepress)){
	$sitepress->switch_lang($sitepress->get_default_language(), true);
}

function peatm_on_product_update($id, $post = NULL){
	global $woocommerce_wpml;
	if(isset($woocommerce_wpml)){
		if(isset($woocommerce_wpml->products)){
			global $pagenow;
			$pagenow = 'post.php';
			if(method_exists($woocommerce_wpml->products,"sync_post_action"))
				$woocommerce_wpml->products->sync_post_action($id, $post === NULL ? get_post( $id ) : $post );
		}
	}
}

function asArray($val){
	if(!is_array($val)){
		return array($val);
	}
	return $val;
}

$variations_fields = array(
    'stock',
	'slug',
	'sku',
	'shipping_class',
	"weight",
	"length",
	"width",
	"height",
    "price",
	"override_price",
	"stock_status",
	"backorders",
	"virtual",
	"downloadable",
	"downloads",
	"status"
); 
global $attributes;
$attributes      = array();
$attributes_asoc = array();
function loadAttributes(&$attributes, &$attributes_asoc){
    global $wpdb, $variations_fields;
	$woo_attrs = $wpdb->get_results("select * from " . $wpdb->prefix . "woocommerce_attribute_taxonomies",ARRAY_A);
	
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
		$variations_fields[] = 'pattribute_'.$att->id;
	}
};

loadAttributes($attributes,$attributes_asoc);




function get_array_value(&$array,$key,$default){
	   if(isset($array[$key]))
		  return $array[$key];
	   else
		  return $default;
}; 

$custom_fileds = array();
function loadCustomFields(&$plem_settings,&$custom_fileds){
    global $use_image_picker, $use_content_editior, $variations_fields;
	
	
	for($I = 0 ; $I < 20 ; $I++){
		$n = $I + 1;
		if(isset($plem_settings["wooccf_enabled".$n])){
			if($plem_settings["wooccf_enabled".$n]){
				$cfield = new stdClass();
				
				$cfield->type  = get_array_value($plem_settings,"wooccf_type".$n, "");
				if(!$cfield->type)
				  continue;
				  
				$cfield->title = get_array_value($plem_settings,"wooccf_title".$n, "");
				if(!$cfield->title)
				  continue;
			   
				$cfield->source = get_array_value($plem_settings,"wooccf_source".$n, "");
				if(!$cfield->source)
				  continue;  
				  
				$cfield->options = get_array_value($plem_settings,"wooccf_editoptions".$n, "");
				if($cfield->options){
				  $cfield->options = json_decode($cfield->options);
				}else{
				  $cfield->options = new stdClass();	
				  $cfield->options->formater = '';
				}
					
				if($cfield->type == 'term'){
				   $cfield->terms = array();
				   $terms = get_terms( $cfield->source , array('hide_empty' => false));
				   foreach($terms as $val){
						$value            = new stdClass();
						$value->value     = $val->term_id;
						//$value->slug      = $val->slug;
						$value->name      = $val->name;
						//$value->parent    = $val->parent;
						$cfield->terms[]  = $value;
					}
				}else{
					if($cfield->options->formater == "content")
						$use_content_editior = true;
					elseif($cfield->options->formater == "image")
						$use_image_picker    = true;
				}	
					
				$cfield->name = 'cf_'. strtolower($cfield->source);
				$cfield->name = str_replace(".","_",$cfield->name);
				$cfield->name = str_replace("!","_",$cfield->name);
				
				$custom_fileds[$cfield->name] = $cfield;	
				
				if(get_array_value($plem_settings,"wooccf_varedit".$n, "")){	
					$variations_fields[] = $cfield->name;	
				}
			}   
		}
	}
};


function updateParentPriceData($parent){
	global $wpdb;
	$wpdb->flush();
	
	$var_ids = $wpdb->get_col($wpdb->prepare( 
		"SELECT      p.ID
			FROM        $wpdb->posts p
		 WHERE       p.post_type = 'product_variation'
						AND 
					 p.post_parent = %d
		 ORDER BY    p.ID
		",
		$parent
	));
	
	$_min_variation_price            = '';
	$_max_variation_price            = '';
	$_min_price_variation_id         = '';
	$_max_price_variation_id         = ''; 
	
	$_min_variation_regular_price    = '';
	$_max_variation_regular_price    = '';
	$_min_regular_price_variation_id = '';
	$_max_regular_price_variation_id = '';
	
	$_min_variation_sale_price       = '';
	$_max_variation_sale_price       = '';
	$_min_sale_price_variation_id    = '';
	$_max_sale_price_variation_id    = '';
	
	foreach($var_ids as $vid){
		$_regular_price = get_post_meta($vid,'_regular_price',true);
		$_sale_price = get_post_meta($vid,'_sale_price',true);
		$_price  = get_post_meta($vid,'_price',true);
		
		if(!$_price)
			$_price = $_sale_price ? $_sale_price : $_regular_price;
		
		if($_price){
			if(!$_min_variation_price){
				$_min_variation_price    = $_price;
				$_min_price_variation_id = $vid;
			}
			if(!$_max_variation_price){
				$_max_variation_price    = $_price;
				$_max_price_variation_id = $vid;
			}
			
			if(floatval($_min_variation_price) > floatval($_price)){
				$_min_variation_price    = $_price;
				$_min_price_variation_id = $vid;
			}
			
			if(floatval($_max_variation_price) < floatval($_price)){
				$_max_variation_price    = $_price;
				$_max_price_variation_id = $vid;
			}
		}
		
		if($_regular_price){
			if(!$_min_variation_regular_price){
				$_min_variation_regular_price    = $_regular_price;
				$_min_regular_price_variation_id = $vid;
			}
			
			if(!$_max_variation_regular_price){
				$_max_variation_regular_price    = $_regular_price;
				$_max_regular_price_variation_id = $vid;
			}
			
			if(floatval($_min_variation_regular_price) > floatval($_regular_price)){
				$_min_variation_regular_price    = $_regular_price;
				$_min_regular_price_variation_id = $vid;
			}
			
			if(floatval($_max_variation_regular_price) < floatval($_regular_price)){
				$_max_variation_regular_price    = $_regular_price;
				$_max_regular_price_variation_id = $vid;
			}
		}
		
		if($_sale_price){
			if(!$_min_variation_sale_price){
				$_min_variation_sale_price    = $_sale_price;
				$_min_sale_price_variation_id = $vid;
			}
			
			if(!$_max_variation_sale_price){
				$_max_variation_sale_price    = $_sale_price;
				$_max_sale_price_variation_id = $vid;
			}
			
			if(floatval($_min_variation_sale_price) > floatval($_sale_price)){
				$_min_variation_sale_price    = $_sale_price;
				$_min_sale_price_variation_id = $vid;
			}
			
			if(floatval($_max_variation_sale_price) < floatval($_sale_price)){
				$_max_variation_sale_price    = $_sale_price;
				$_max_sale_price_variation_id = $vid;
			}
		}
	}
	
	update_post_meta($parent,'_min_variation_price',$_min_variation_price);
	update_post_meta($parent,'_max_variation_price',$_max_variation_price);
	update_post_meta($parent,'_min_price_variation_id',$_min_price_variation_id);
	update_post_meta($parent,'_max_price_variation_id',$_max_price_variation_id);
	update_post_meta($parent,'_min_variation_regular_price',$_min_variation_regular_price);
	update_post_meta($parent,'_max_variation_regular_price',$_max_variation_regular_price);
	update_post_meta($parent,'_min_regular_price_variation_id',$_min_regular_price_variation_id);
	update_post_meta($parent,'_max_regular_price_variation_id',$_max_regular_price_variation_id);
	update_post_meta($parent,'_min_variation_sale_price',$_min_variation_sale_price);
	update_post_meta($parent,'_max_variation_sale_price',$_max_variation_sale_price);
	update_post_meta($parent,'_min_sale_price_variation_id',$_min_sale_price_variation_id);
	update_post_meta($parent,'_max_sale_price_variation_id',$_max_sale_price_variation_id);
	update_post_meta($parent,'_price',$_min_variation_price);
	if(function_exists("wc_delete_product_transients"))
		wc_delete_product_transients($parent);
}

function updateParentVariationData($parent, &$res_obj, &$aasoc,$attributes_set, $add_var_display_updates = false){
	global $wpdb;
	global $attributes;
	
	
	
	$dirty = false;	
	$skip_normalize = false;
	
	$defaultAtt = get_post_meta($parent,'_product_attributes',true);
	
	if(isset($defaultAtt[0])){
		unset($defaultAtt[0]);
		$dirty = true;
		$skip_normalize = (!$res_obj && !$aasoc && !$attributes_set);
	}
	
	$wpdb->flush();
	
	$ptype = implode(",",wp_get_object_terms($parent, 'product_type', array('fields' => 'names')));
	
	$var_ids = $wpdb->get_col($wpdb->prepare( 
			"SELECT      p.ID
				FROM        $wpdb->posts p
			 WHERE       p.post_type   = 'product_variation'
							AND 
						 p.post_parent = %d
			 ORDER BY    p.ID
			",
			$parent
	));
	
	if($ptype !== 'variable'){
	  if($defaultAtt){
		  foreach($defaultAtt as $a_key => $patt){
			  if($a_key){
				  if($defaultAtt[$a_key]["is_variation"]){
					$defaultAtt[$a_key]["is_variation"] = 0;
					$dirty           = true;
					$skip_normalize  = true;
					
					/*
					if(!empty($var_ids)){
						$wpdb->query("DELETE FROM $wpdb->postmeta pm WHERE pm.post_id IN (".implode(",",$var_ids).") AND pm.meta_key LIKE 'attribute_$a_key' ");
					}
					*/
				  }
			  }
		  }
	  }
    }	
	
    if(!$skip_normalize){	
		

		$attrs = array();
		if(!empty($var_ids)){
			$wpdb->flush();
			$attrs = $wpdb->get_col("SELECT DISTINCT pm.meta_key
							FROM        $wpdb->postmeta pm
						 WHERE       pm.post_id IN (".implode(",",$var_ids).")
									 AND
									 pm.meta_key LIKE 'attribute_pa_%'");
		}
		
		$curr_attrs = array_keys($defaultAtt);
		
		foreach($curr_attrs as $attr_name){
			if($attr_name){
				$a = "attribute_" . $attr_name;
				if($defaultAtt[$attr_name]["is_variation"]){
					if(!in_array($a,$attrs)){
						$defaultAtt[$attr_name]['is_variation'] = 0; ;	
						$dirty = true;
						wp_set_object_terms( $parent , NULL , $attr_name );
					}
				}
			}
		}
		
		if($attributes_set){
			if(!empty($attributes_set)){
				foreach($attrs as $ind => $att){
					$a = substr($att,10);
					if(!$a)
						continue;
					
					if(in_array(substr($a,3), $attributes_set)){
						if(!in_array($a,$attrs)){
							$defaultAtt[$a] = array (
													'name'         => $a,
													'value'        => '',
													'position'     => count($defaultAtt),
													'is_visible'   => 1,
													'is_variation' => 1,
													'is_taxonomy'  => 1
												);
							$dirty = true;					
						}else{
							if(!$defaultAtt[$a]["is_variation"]){
								$defaultAtt[$a]["is_variation"] = 1;
								$dirty = true;					
							}
						}
					}
				}
			}
		}
	}
	
	
	
	if($dirty){
		
		
		
		update_post_meta($parent,'_product_attributes',$defaultAtt);
		updateParentPriceData($parent);
		
		foreach($defaultAtt as $key=> $val){
			if($defaultAtt[$key]["is_variation"]){
				$aterm = substr($key,3);
				$val = array();
				foreach($var_ids as $v_id){
					$v = get_post_meta($v_id,'attribute_'. $key ,true);
					if($v)
						$val[] = $v."";
				}
				wp_set_object_terms( $parent , asArray($val) , $key );
			}
		}
		
		if($res_obj){
			
			
			
			$ainf = array();
		    
			if(!isset($res_obj->dependant_updates))
				$res_obj->dependant_updates = array();
			
			if(!isset($res_obj->dependant_updates[$parent]))
				$res_obj->dependant_updates[$parent] = new stdClass;
					
			foreach($aasoc as $key=> $val){
				$a_id = $val->id;
				$ainf[$a_id]    = new stdClass;
				if(isset($defaultAtt["pa_".$key])){
					$ainf[$a_id]->v = $defaultAtt["pa_".$key]["is_variation"];
					$ainf[$a_id]->s = $defaultAtt["pa_".$key]["is_visible"] ? true : false;
				}else{
					$ainf[$a_id]->v = 0;
					$ainf[$a_id]->s = true;
				}
				
				$res_obj->dependant_updates[$parent]->{"pattribute_" . $val->id } = wp_get_object_terms($parent,"pa_".$key, array('fields' => 'ids'));
			}
			
			if(!isset($res_obj->dependant_updates[$parent]))
				$res_obj->dependant_updates[$parent] = new stdClass;
			
			$res_obj->dependant_updates[$parent]->att_info = $ainf;
		} 
	}
	
	if($add_var_display_updates && $res_obj){	
		if(!isset($res_obj->dependant_updates))
			$res_obj->dependant_updates = array();
		if(!empty($var_ids)){
			foreach($var_ids as $v_id){
				if(isset($res_obj->dependant_updates[$v_id]))
					continue;
				if(isset($res_obj->pnew))
					if(isset($res_obj->pnew[$v_id]))
						continue;
					
				$res_obj->dependant_updates[$v_id] = product_render($v_id , $attributes, "data");
			}
		}
	}
}


loadCustomFields($plem_settings,$custom_fileds);


$tax_classes  = array();
foreach(explode("\n",get_option('woocommerce_tax_classes')) as $tc){
  $tax_classes[ str_replace(" ","-",strtolower($tc))] = $tc;
}

$tax_statuses = array();
$tax_statuses['taxable'] = 'Taxable';
$tax_statuses['shipping'] = 'Shipp. only';
$tax_statuses['none'] = 'None';

$productsPerPage = 500;
if(isset($plem_settings["productsPerPage"])){
	$productsPerPage = intval($plem_settings["productsPerPage"]);
}

$limit = $productsPerPage;

if(isset($_COOKIE['peatm_txtlimit']))
	$limit = $_COOKIE['peatm_txtlimit'] ? $_COOKIE['peatm_txtlimit'] : $productsPerPage;

	
$page_no  = 1;

$orderby         = "ID";
$orderby_key     = "";

$sort_order  = "ASC";
$sku = '';
$product_name = '';
$product_category = '';
$product_tag      = '';
$product_shipingclass = '';
$product_status   = '';

if(isset($_REQUEST['limit'])){
	$limit = $_REQUEST['limit'];
	setcookie('peatm_txtlimit',$limit, time() + 3600 * 24 * 30);
}

if(isset($_REQUEST['page_no'])){
	$page_no = $_REQUEST['page_no'];
}

if(isset($_REQUEST['sku'])){
	$sku = $_REQUEST['sku'];
}

if(isset($_REQUEST['product_name'])){
	$product_name = $_REQUEST['product_name'];
}

if(isset($_REQUEST['product_tag'])){
	$product_tag = explode(",", $_REQUEST['product_tag']);
}

if(isset($_REQUEST['product_category'])){
	$product_category = explode(",", $_REQUEST['product_category']);
}

if(isset($_REQUEST['product_shipingclass'])){
	$product_shipingclass = explode(",", $_REQUEST['product_shipingclass']);
}

if(isset($_REQUEST['product_status'])){
	$product_status = explode(",", $_REQUEST['product_status']);
}

$filter_attributes = array();
foreach($attributes as $attr){
	if(isset($_REQUEST['pattribute_'.$attr->id])){
        $filter_attributes[$attr->name] = explode(",", $_REQUEST['pattribute_'.$attr->id]);
	}
}



if(isset($_REQUEST['sortColumn'])){

	$orderby = $_REQUEST['sortColumn'];
	$orderby_key = "";

    if(isset($custom_fileds[$_REQUEST['sortColumn']])){
	    
		$field = $custom_fileds[$_REQUEST['sortColumn']];
		if($custom_fileds[$_REQUEST['sortColumn']]->type == 'post'){
			$orderby = $custom_fileds[$_REQUEST['sortColumn']]->source;
			$orderby_key = "";
		}elseif($custom_fileds[$_REQUEST['sortColumn']]->type == 'meta'){
			$orderby = "meta_value";
			$orderby_key = $custom_fileds[$_REQUEST['sortColumn']]->source;
		}
		
		$orderby_key = explode("!",$orderby_key);
		$orderby_key = $orderby_key[0];
		$orderby_key = explode(".",$orderby_key);
		$orderby_key = $orderby_key[0];
		
	}elseif($orderby == "sku") {
		$orderby = "meta_value";
		$orderby_key = "_sku";
	}elseif($orderby == "slug") $orderby = "name";
	 elseif($orderby == "name") $orderby = "title";
     elseif($orderby == "stock") {
		$orderby = "meta_value_num";
		$orderby_key = "_stock";
	}elseif($orderby == "stock_status") {
		$orderby = "meta_value";
		$orderby_key = "_stock_status";
	}elseif($orderby == "price") {
		$orderby = "meta_value_num";
		$orderby_key = "_regular_price";
	}elseif($orderby == "override_price") {
		$orderby = "meta_value_num";
		$orderby_key = "_sale_price";
	}elseif($orderby == "status"){ 
		$orderby = "status";
	}elseif($orderby == "weight"){ 
		$orderby = "meta_value_num";
		$orderby_key = "_weight";
	}elseif($orderby == "length"){ 
		$orderby = "meta_value_num";
		$orderby_key = "_length";
	}elseif($orderby == "width"){ 
		$orderby = "meta_value_num";
		$orderby_key = "_width";
	}elseif($orderby == "height"){ 
		$orderby = "meta_value_num";
		$orderby_key = "_height";
	}elseif($orderby == "featured"){ 
		$orderby = "meta_value";
		$orderby_key = "_featured";
	}elseif($orderby == "virtual"){ 
		$orderby = "meta_value";
		$orderby_key = "_virtual";
	}elseif($orderby == "downloadable"){ 
		$orderby = "meta_value";
		$orderby_key = "_downloadable";
	}elseif($orderby == "tax_status"){ 
		$orderby = "meta_value";
		$orderby_key = "_tax_status";
	}elseif($orderby == "tax_class"){ 
		$orderby = "meta_value";
		$orderby_key = "_tax_class";
	}elseif($orderby == "backorders"){ 
		$orderby = "meta_value";
		$orderby_key = "_backorders";
	}elseif($orderby == "tags"){ 
		$orderby = "ID";
	}else
		$orderby = "ID";
	
	if(!$orderby)
		$orderby = "ID";
}

if(isset($_REQUEST['sortOrder'])){
	$sort_order = $_REQUEST['sortOrder'];
}

function get_attachment_id_from_src ($media_src) {
	global $wpdb;
	$query = "SELECT ID FROM {$wpdb->posts} WHERE guid LIKE '$media_src'";
	$id = $wpdb->get_var($query);
	return $id;
}

function getDownloads($pr_id, $export = false){
	$ret = array();
	
	$downloads = get_post_meta($pr_id, "_downloadable_files" ,true);
	if(is_array($downloads)){
		foreach($downloads as $dkey => $download){
			if($export){
				$ret[] = $download["file"];
			}else{
				$f_download = new stdClass;
				$f_download->id    = get_attachment_id_from_src($download["file"]);
				$f_download->src   = $download["file"];
				$f_download->thumb = null;
				$ret[] = $f_download;
			}
		} 
	}
	
	if($export)
		return implode(",", $ret);
	
	return $ret;
}



if(isset($_REQUEST['DO_UPDATE'])){

if($_REQUEST['DO_UPDATE'] == '1' && strtoupper($_SERVER['REQUEST_METHOD']) == 'POST'){
	$timestamp = time();
	$json = file_get_contents('php://input');
	$tasks = json_decode($json);
    
	
	
	$res = array();
	$temp = '';
	
	foreach($tasks as $key => $task){
		
	   $return_added = false;
	   $res_item = new stdClass();
	   $res_item->id = $key;
	   
	   $sKEY = "".$key;
	   
	   
	   $parent = get_ancestors($key,'product');
	   if( !empty($parent))
			$parent = $parent[0];
	   else		
			$parent = 0;
	   
	   
	   
	   	   
	   $needs_var_update = false;
	   

	   
	   $upd_prop = array();
	   $post_update = array( 'ID' => $key );
	  
	   
	   
	   $any_price_set = false;
	   
	   
	  
	   if($parent){
		   $attributes_set = array();
		   $update_par_att = false;
	       foreach($attributes as $attr){
				if(isset($task->{'pattribute_'.$attr->id})){
					 $store = array();
					 $vals = $task->{'pattribute_'.$attr->id};
					 if(is_string($vals))
						$vals = explode(",",$vals);
					
					 $attributes_set[] = $attr->name;
					 if(empty($vals)){
						 delete_post_meta($key, 'attribute_pa_' . $attr->name);
					 }else{
						 foreach($vals as $val){
							if(is_numeric($val)){
								foreach($attr->values as $trm){
								   if($trm->id == $val){
										$store[] = $trm->slug;
										break;
								   }
								}
							}else{
								$store[] = $val;
							}
							
							if(!empty($store))
								break;	
						 }
						 update_post_meta($key, 'attribute_pa_' . $attr->name, $store[0]);
					 }
					 $update_par_att = true;
				}
		   }
		   
		   if($update_par_att)
			 updateParentVariationData($parent,$res_item,$attributes_asoc,$attributes_set);
		 
	   }else{ 
	   
	       
		   $patts = get_post_meta($key,'_product_attributes',true);
		   $patts_set = false;
		   if(!$patts)
			$patts = array();
		   
		   foreach($attributes as $attr){
			    $a_tax_name = 'pa_' . $attr->name;
				
				if(isset($task->{'pattribute_'.$attr->id})){
					
					$setval = $task->{'pattribute_'.$attr->id};
					if(is_string($setval))
						$setval = explode(",",$setval);
					
					wp_set_object_terms( $key , array_map(fn_correct_type, $setval) , $a_tax_name );
					
					if(!$task->{'pattribute_'.$attr->id}){
					   if(isset($patts[$a_tax_name]))
						unset($patts[$a_tax_name]);
					   
					   	if(!isset($res_obj->dependant_updates))
							$res_item->dependant_updates = array();
					
						if(!isset($res_item->dependant_updates[$key]))
							$res_item->dependant_updates[$key] = new stdClass;
						
						$res_item->dependant_updates[$key]->{'pattribute_'.$attr->id.'_visible'} = true;
					
					}else{
						if(!isset($patts[$a_tax_name]))
							$patts[$a_tax_name] = array();
						elseif(!$patts[$a_tax_name]){
							$patts[$a_tax_name] = array();
						}
						$patts[$a_tax_name]["name"]         = $a_tax_name;
						if(!isset($patts[$a_tax_name]["is_visible"]))
							$patts[$a_tax_name]["is_visible"]   = 1;
						$patts[$a_tax_name]["is_taxonomy"]  = 1;
						$patts[$a_tax_name]["is_variation"] = 0;
						
						if(!isset($patts[$a_tax_name]["value"])) $patts[$a_tax_name]["value"]       = "";
						if(!isset($patts[$a_tax_name]["position"])) $patts[$a_tax_name]["position"] = "0";
					}
					$patts_set = true;
				}
				
				if(isset($task->{'pattribute_'.$attr->id.'_visible'})){
					if(!isset($patts[$a_tax_name]))
						$patts[$a_tax_name] = array();
					elseif(!$patts[$a_tax_name]){
						$patts[$a_tax_name] = array();
					}
					$patts[$a_tax_name]["name"]         = $a_tax_name;
					$patts[$a_tax_name]["is_visible"]   = $task->{'pattribute_'.$attr->id.'_visible'} ? 1 : 0;
					$patts[$a_tax_name]["is_taxonomy"]  = 1;
					$patts[$a_tax_name]["is_variation"] = 0;
					
					if(!isset($patts[$a_tax_name]["value"])) $patts[$a_tax_name]["value"]       = "";
					if(!isset($patts[$a_tax_name]["position"])) $patts[$a_tax_name]["position"] = "0";
					$patts_set = true;
				}
		   }
		   
		   if($patts_set){
			 update_post_meta($key, "_product_attributes" , $patts);
		   }
	   }
	   
	   if(isset($task->tags)){
		  $setval= $task->tags;
		  if(is_string($setval))
			$setval = explode(",",$setval);	
		  wp_set_object_terms( $key , array_map(fn_correct_type, $setval) , 'product_tag' );
	   }
	   
	   if(function_exists("wc_delete_product_transients"))
		wc_delete_product_transients($key);
	   
	   $res_item->success = true;
	   $res[] = $res_item;
	   
	   peatm_on_product_update($parent ? $parent : $key);
	}
	
	
	
	echo json_encode($res);
    exit; 
	return;
}
}

function Getfloat($str) { 
  global $impexp_settings;

  if(!isset($impexp_settings->german_numbers))
	$impexp_settings->german_numbers = 0; 
	
  if($impexp_settings->german_numbers){
	  $str = str_replace(".", "", $str);
	  $str = str_replace(",", ".", $str);
  }else{
	  if(strstr($str, ",")) { 
		$str = str_replace(",", "", $str); // replace ',' with '.' 
	  }
  }
  return $str;
}; 

if(isset($_REQUEST['remote_import'])){
  if(isset( $this->settings["wooc_remote_import_timestamp"])){
     if(intval($_REQUEST['file_timestamp'])  <= intval($this->settings["wooc_remote_import_timestamp"])){
		echo "Requested import CSV is equal or older that latest processed!";
	    exit();
	    return;
	 }
  }
}

function &get_category_path($pcat_id){
	global $cat_asoc,$catpath_asoc;
	
	if(!isset($cat_asoc[$pcat_id]->category_path)){
		$cname = "";
		$tname = "";
		$tmp   = $cat_asoc[$pcat_id];
		do{
			if(!$cname){
				$tname = $cname = $tmp->category_name;
			}else{
				$cname = $tmp->category_name . ('/' . $cname);
				$tname = '-' . $tname;
			}
			if(isset($cat_asoc[$tmp->category_parent]))
				$tmp = $cat_asoc[$tmp->category_parent];
			else
				$tmp = false;
		}while($tmp);
		
		$cat_asoc[$pcat_id]->category_path = $cname;
		$cat_asoc[$pcat_id]->treename      = $tname;
		if($catpath_asoc !== NULL){
			$catpath_asoc[strtolower($cname)] = $pcat_id;
		}
	}
	return $cat_asoc[$pcat_id]->category_path;
}

function get_product_categories_paths($id){
	global $cat_asoc;
	$pcategories = wp_get_object_terms($id, 'product_cat', array('fields' => 'ids') );
	$cpaths = array();
	foreach($pcategories as $pcat_id){
		$cpaths[] = get_category_path($pcat_id);
	}
	return implode(",",$cpaths);
}


//CSV IMPORT FNs ///////////////////////////////////////////////////////////////////////////////////////////
function get_csv_order(){
	global $wpdb;
	
	$value  =$wpdb->get_col("SELECT option_value FROM $wpdb->options WHERE option_name LIKE '%peatm_order_csv%'");
	
	$csv_order=array();
	$csv_order=explode(",",$value[0]);

	return $csv_order;
	
}
function remember_csv_order($order){
	$order_string = implode(",",$order);
	update_option("peatm_order_csv", $order_string, "no");	
}

function save_csv_for_cross_req_import($csv_file,$import_uid, $tmp_file_read = 0){
	global $wpdb,$impexp_settings;
	global $start_time, $max_time, $mem_limit;
	
	if($tmp_file_read == 0){
		
		$probecnt = file_get_contents($csv_file, false, NULL, 0,2048);
		
		/*
		$enc = mb_detect_encoding($probecnt,mb_list_encodings(), true);
		
		if( stripos($enc,"utf-8") === false){
			 echo "CSV file you tried to import is not UTF8 encoded! Correct this then try to import again!";
			 die;
			 return;
		}*/
		
		
		if(!$probecnt){
			 echo "CSV file you tried to import could not be stored on temporal loaction : " . $csv_file . "! Check folder permissions and max upload size!" ;
			 die;
			 return;
		}
		
		if( !preg_match('!!u', $probecnt) ){
			 echo "CSV file you tried to import is not UTF8 encoded! Correct this then try to import again!";
			 die;
			 return;
		}
		
		$first_line = explode("\n",$probecnt);
		if(empty($first_line)){
			echo "CSV file you tried to import is invalid. Check file then try again!";
			die;
			return;
		}elseif(strpos($first_line[0],$impexp_settings->delimiter) === false){
			echo "CSV file you tried to import is of invalid format. Probable cause is incorrect delimiter! Check file then try again!";
			die;
			return;
		}
	}
	
	$handle = fopen($csv_file,"r");
	$n = 0;
	if($handle){
		$added = 0;
		$data  = null;
		while (($data = fgetcsv($handle, 32768 * 2 , $impexp_settings->delimiter)) !== FALSE) {
			if($n < $tmp_file_read){
				$n++;
				continue;
			}
			
			if($n == 0){//REMOVE UTF8 BOM IF THERE
				 $bom     = pack('H*','EFBBBF');
				 $data[0] = preg_replace("/^$bom/", '', $data[0]);
			}
			
			//update_option($import_uid."_". $n, $data , "no");
			
			$wpdb->query($wpdb->prepare("INSERT INTO $wpdb->options (option_name,option_value,autoload) VALUES('%s','%s','%s');",$import_uid."_". $n, serialize($data), "no"));
			$n++;	
			$added++;
			
			if($added == 2000 || ($start_time + $max_time  < time() || getMemAllocated() + 1048576 > $mem_limit)){
				fclose($handle);
				return $n;
			}
		}
		
		fclose($handle);
		
		if(empty($data)){
			unlink($csv_file);
			return NULL;
		}
		
		return $n;
	}
	
	return NULL;
}

global $cat_asoc,$categories, $catpath_asoc;
$catpath_asoc = NULL;
if(isset($_REQUEST["do_import"])){
	if($_REQUEST["do_import"] = "1"){
		$catpath_asoc = array();
	}
}
	
$cat_asoc   = array();
$categories = array();

$shipping_classes   = array();
$shippclass_asoc    = array();

$product_types      = array();
//$product_types_asoc = array();

$args = array(
    'number'     => 99999,
    'orderby'    => 'slug',
    'order'      => 'ASC',
    'hide_empty' => false,
    'include'    => ''
);

function catsort($a, $b){
	return strcmp ( $a->category_path , $b->category_path);
}

$woo_categories = get_terms( 'product_cat', $args );


foreach($woo_categories as $category){
   $cat = new stdClass();
   $cat->category_id     = $category->term_id;
   $cat->category_name   = $category->name;
   $cat->category_slug   = urldecode($category->slug);
   $cat->category_parent = $category->parent;
   $cat_asoc[$cat->category_id] = $cat;
   $categories[]         = $cat_asoc[$cat->category_id];
};

foreach($cat_asoc as $cid => $cat){
   get_category_path($cid);	
}

usort($categories, "catsort");

$woo_shipping_classes = get_terms( 'product_shipping_class', $args );
foreach($woo_shipping_classes as $shipping_class){
   $sc = new stdClass();
   $sc->id     = $shipping_class->term_id;
   $sc->name   = $shipping_class->name;
   $sc->slug   = urldecode($shipping_class->slug);
   $sc->parent = $shipping_class->parent;
   $shipping_classes[] = $sc;   
   $shippclass_asoc[$sc->id] = $sc;
}

$woo_ptypes = get_terms( 'product_type', $args );
foreach($woo_ptypes as $T){
   $PT = new stdClass();
   $PT->id     = $T->term_id;
   $PT->name   = $T->name;
   $PT->slug   = urldecode($T->slug);
   $PT->parent = $T->parent;
   $product_types[] = $PT;   
   //$product_types_asoc[$sc->id] = $PT;
}


function normalizeFileLineEndings ($filename) {
	$string = @file_get_contents($filename);
	if (!string) {
		return false;
	}
    $out = "";
	
	$string = explode("\r",$string);
	
	for($i = 0 ; $i < count($string); $i++){
		$string[$i] = explode("\n",$string[$i]);
		for($j = 0; $j < count($string[$i]);$j++){
			if($string[$i][$j]){
				$out .= ($string[$i][$j] . "\r\n");
			}
		}
	}
	
	file_put_contents($filename, $out);
	return true;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
function toUTF8($str){
	if(is_string($str))
		return mb_convert_encoding($str,"UTF-8");
	else
		return $str;
}
$import_count = 0;
if(isset($_REQUEST["do_import"])){
	if($_REQUEST["do_import"] = "1"){
		
		$import_uid = isset($_REQUEST["import_uid"]) ? $_REQUEST["import_uid"] : uniqid("peatm_import_");
		$n = 0;
		if (isset($_FILES['file']['tmp_name']) || isset($_REQUEST["continueFrom"]) || isset($_REQUEST["tmp_file"]) || isset($_REQUEST["commit_import"])) {
			
			$tmp_file   = NULL;
			$tmp_file_n = NULL;
			
			$echo_prep = false;
			
			if(!isset($_REQUEST["commit_import"])){
				if(isset($_FILES['file']['tmp_name']) && !isset($_REQUEST["continueFrom"])){
					$wpdb->query("DELETE FROM $wpdb->options WHERE option_name LIKE 'peatm_import_%'");
					$tmp_file = wp_upload_dir();
					$tmp_file = $tmp_file["path"] . DIRECTORY_SEPARATOR . $import_uid .".csv";
					$tmp_file = str_replace(array("\\\\","\\\\","\\\\","\\","/"),array("\\","\\","\\", DIRECTORY_SEPARATOR,DIRECTORY_SEPARATOR),$tmp_file);
					move_uploaded_file( $_FILES['file']['tmp_name'], $tmp_file);
					
					normalizeFileLineEndings($tmp_file);
					
					$tmp_file_n = save_csv_for_cross_req_import($tmp_file, $import_uid, 0 );
					$echo_prep  = true;
					
					$wpdb->query("DELETE p from $wpdb->posts as p LEFT JOIN $wpdb->posts as pp on pp.ID = p.post_parent where p.post_type ='product_variation' AND  coalesce(p.post_parent,0) > 0 AND pp.ID IS NULL");
					$wpdb->query("DELETE PM FROM $wpdb->postmeta as PM LEFT JOIN $wpdb->posts as P ON P.ID = PM.post_id WHERE P.ID IS NULL");
					
				}elseif(isset($_REQUEST["tmp_file"])){
					$tmp_file	= $_REQUEST["tmp_file"];
					$tmp_file = str_replace(array("\\\\","\\\\","\\\\","\\","/"),array("\\","\\","\\", DIRECTORY_SEPARATOR,DIRECTORY_SEPARATOR),$tmp_file);
					$tmp_file_n	= $_REQUEST["tmp_file_n"];
					$tmp_file_n = save_csv_for_cross_req_import($tmp_file, $import_uid, $tmp_file_n);
					$echo_prep  = true;
				}
			}
			
			if($echo_prep){
				?>
					<!DOCTYPE html>
					<html>
						<head>
							<style type="text/css">
								html, body{
									background:#505050;
									color:white;
									font-family:sans-serif;	
								}
							</style>
						</head>
						<body>
							<form method="POST" id="continueImportForm">
								<h2><?php echo __("Importing...",'excellikeproductatttag'); ?></h2>
								<?php if($tmp_file_n) { ?>
								<p><?php echo __("Preparing product data ",'excellikeproductatttag').$tmp_file_n; ?></p>
								<hr/>
								<input type="hidden" name="tmp_file" value="<?php echo $tmp_file ;?>">
								<input type="hidden" name="tmp_file_n" value="<?php echo $tmp_file_n;?>">
								<?php }else{?>
								<p><?php echo __("Commiting import...",'excellikeproductatttag'); ?></p>
								<hr/>
								<input type="hidden" name="commit_import" value="1">
								<?php }?>
								
								<input type="hidden" name="import_uid" value="<?php echo $import_uid;?>">
								
								<input type="hidden" name="do_import" value="1">
								<?php if(isset($_REQUEST["sortOrder"])) {?>
									<input type="hidden" name="sortOrder" value="<?php echo $orderby;?>">
								<?php } 
								if(isset($_REQUEST["sortColumn"])) {?>
									<input type="hidden" name="sortColumn" value="<?php echo $sort_order;?>">
								<?php } 
								if(isset($_REQUEST["page_no"])) {?>
									<input type="hidden" name="page_no" value="<?php echo $_REQUEST["page_no"];?>">
								<?php }
								if(isset($_REQUEST["limit"])) {?>
									<input type="hidden" name="limit" value="<?php echo $_REQUEST["limit"];?>">
								<?php } 
								if(isset($_REQUEST["sku"])) {?>
									<input type="hidden" name="sku" value="<?php echo $_REQUEST["sku"];?>">
								<?php } 
								if(isset($_REQUEST["product_name"])) {?>
									<input type="hidden" name="product_name" value="<?php echo $_REQUEST["product_name"];?>">
								<?php }
								if(isset($_REQUEST["product_category"])) {?>
									<input type="hidden" name="product_category" value="<?php echo $_REQUEST["product_category"];?>">
								<?php } 									
								if(isset($_REQUEST["product_shipingclass"])) {?>
									<input type="hidden" name="product_shipingclass" value="<?php echo $_REQUEST["product_shipingclass"];?>">
								<?php } 
								if(isset($_REQUEST["product_tag"])) {?>
									<input type="hidden" name="product_tag" value="<?php echo $_REQUEST["product_tag"];?>">
								<?php } 
								if(isset($_REQUEST["product_status"])) {?>
									<input type="hidden" name="product_status" value="<?php echo $_REQUEST["product_status"];?>">
								<?php } ?>
								
								<?php foreach($attributes as $attr){ 
										if(isset($_REQUEST["pattribute_" . $attr->id])){
											if($_REQUEST["pattribute_" . $attr->id]){
											?>
											<input type="hidden" name="pattribute_<?php echo $attr->id;?>" value="<?php echo $_REQUEST["pattribute_" . $attr->id];?>">
											<?php	
											}
										}
									 } ?>
								
								<input type="hidden" name="import_count" value="<?php echo $import_count ;?>" />
							</form>
							<script type="text/javascript">
								document.getElementById("continueImportForm").submit();
							</script>
						</body>
					</html>
				<?php
				die;
				return;
			}
			
			
			
			$id_index                  = -1;
			$price_index               = -1;
			$price_o_index             = -1;
			$stock_index               = -1;
			$sku_index                 = -1;
			$name_index                = -1;
            $slug_index                = -1;
			$status_index              = -1;
			$categories_names_index    = -1;
			$categories_paths_index    = -1;
			$shipping_class_name_index = -1;
			$weight_index              = -1;
			$length_index              = -1;
			$width_index               = -1;
			$height_index              = -1;
			$featured_index            = -1;
			$virtual_index             = -1;
			$downloadable_index        = -1;
			$downloads_index           = -1;
			$tax_status_index          = -1;
			$tax_class_index           = -1;
			$backorders_index          = -1;
			$tags_names_index          = -1;
			$product_type_index        = -1;
			$parent_index              = -1;
			$featured_image_index	   = -1; 
			$product_gallery_index     = -1; 

			$attribute_indexes         = array();
			$attribute_visibility_indexes = array();
			$cf_indexes                = array();
			$col_count = 0;
			$skip_first                = false;
			$custom_import             = false;
			$imported_ids              = array();
			$data_column_order         = array();
			$load_from_cross_state     = false;      
			
			
			if($impexp_settings){
				if($impexp_settings->use_custom_import){
					$cic = array();
					foreach(explode(",",$impexp_settings->custom_import_columns) as $col){
					   if($col)
						$cic[] = $col;
					}
					if($impexp_settings->first_row_header)
						$skip_first = true;
						
					$col_count         = count($cic);
					$data_column_order = $cic;
					$custom_import = true;
				}
			}
			
			$csv_row_processed_count = 0;
			global $image_import_path_cache;
			$image_import_path_cache = get_option("peatm_impc",array());
			
			if(!isset($impexp_settings->delimiter))
				$impexp_settings->delimiter = ",";
			
			if(isset($_REQUEST["import_count"]))
				$import_count      = intval($_REQUEST["import_count"]);
			
			if(!$custom_import){
				if(isset($_REQUEST["continueFrom"])){
					if(intval($_REQUEST["continueFrom"]) > 0)
						$data_column_order = get_csv_order();	
					else{
						$data_column_order = get_option($import_uid."_0",null);
						$n = 1;
					}
				}else{
					$data_column_order = get_option($import_uid."_0",null);
					$n = 1;
				}
			}else if($skip_first){
				$n = 1;
			}
			
			if(isset($_REQUEST["continueFrom"]))
				$n = intval($_REQUEST["continueFrom"]);
			
					
			$data = get_option($import_uid."_".$n,null);
			
			if(!$data_column_order){
				die;
				return;
			}
			
			$col_count = count($data_column_order);
			for($i = 0 ; $i < $col_count; $i++){
				$data_column_order[$i] = trim($data_column_order[$i]);
				if($data_column_order[$i]     == "id") $id_index = $i;
				elseif($data_column_order[$i] == "price") $price_index = $i;
				elseif($data_column_order[$i] == "override_price") $price_o_index = $i;
				elseif($data_column_order[$i] == "sku") $sku_index   = $i;
				elseif($data_column_order[$i] == 'stock') $stock_index = $i;
				elseif($data_column_order[$i] == 'name') $name_index = $i;
				elseif($data_column_order[$i] == 'slug') $slug_index = $i;
				elseif($data_column_order[$i] == 'status') $status_index = $i;
				elseif($data_column_order[$i] == 'categories_names') $categories_names_index = $i;
				elseif($data_column_order[$i] == 'shipping_class_name') $shipping_class_name_index = $i;
				elseif($data_column_order[$i] == 'tags_names') $tags_names_index = $i;
				elseif($data_column_order[$i] == 'weight') $weight_index = $i;
				elseif($data_column_order[$i] == 'length') $length_index = $i;
				elseif($data_column_order[$i] == 'width') $width_index = $i;
				elseif($data_column_order[$i] == 'height') $height_index = $i;
				elseif($data_column_order[$i] == 'featured') $featured_index = $i;
				elseif($data_column_order[$i] == 'virtual') $virtual_index = $i;
				elseif($data_column_order[$i] == 'downloadable') $downloadable_index = $i;
				elseif($data_column_order[$i] == 'downloads') $downloads_index = $i;
				elseif($data_column_order[$i] == 'tax_status') $tax_status_index = $i;
				elseif($data_column_order[$i] == 'tax_class') $tax_class_index = $i;
				elseif($data_column_order[$i] == 'backorders') $backorders_index = $i;
				elseif($data_column_order[$i] == 'product_type') $product_type_index = $i;
				elseif($data_column_order[$i] == 'parent') $parent_index = $i;
				elseif($data_column_order[$i] == 'image') $featured_image_index = $i;
				elseif($data_column_order[$i] == 'gallery') $product_gallery_index = $i;
				elseif($data_column_order[$i] == 'categories_paths') $categories_paths_index = $i;
				
				foreach($attributes as $att){
					if('pattribute_'.$att->id == $data_column_order[$i]){
						$attribute_indexes[$att->name] = $i;
						break;
					}
					
					if('pattribute_'.$att->id.'_visible' == $data_column_order[$i]){
						$attribute_visibility_indexes[$att->name] = $i;
						break;
					}
				}
				
				foreach($custom_fileds as $cfname => $cfield){
					if($cfname == $data_column_order[$i]){
						$cf_indexes[$cfname] = $i;
						break;
					}
				}
			}
			
			remember_csv_order($data_column_order);
			
					
			while ($data) {
				
				$data = array_map("toUTF8",$data);
				
			    if($csv_row_processed_count > 0 && ($csv_row_processed_count >= 300 || $start_time + $max_time  < time() || getMemAllocated() + 1048576 > $mem_limit)){
				   //////////////////////BREAK EXEC AND DO ANOTHER REQUEST/////////////////////////
				   	update_option("peatm_impc", $image_import_path_cache, "no");	
					?>
						<!DOCTYPE html>
						<html>
							<head>
								<style type="text/css">
									html, body{
										background:#505050;
										color:white;
										font-family:sans-serif;	
									}
								</style>
							</head>
							<body>
								<form method="POST" id="continueImportForm">
									<h2><?php echo __("Importing...",'excellikeproductatttag'); ?></h2>
									<p><?php echo $import_count; ?> <?php echo __("products/product variations entries processed from ",'excellikeproductatttag'); ?> <?php echo $n." CSV ".__("rows.",'excellikeproductatttag');  ?> </p>
									<hr/>
									
									<input type="hidden" name="import_uid" value="<?php echo $import_uid;?>">
									<input type="hidden" name="continueFrom" value="<?php echo $n;?>">
									<input type="hidden" name="do_import" value="1">
									<?php if(isset($_REQUEST["sortOrder"])) {?>
										<input type="hidden" name="sortOrder" value="<?php echo $orderby;?>">
									<?php } 
									if(isset($_REQUEST["sortColumn"])) {?>
										<input type="hidden" name="sortColumn" value="<?php echo $sort_order;?>">
									<?php } 
									if(isset($_REQUEST["page_no"])) {?>
										<input type="hidden" name="page_no" value="<?php echo $_REQUEST["page_no"];?>">
									<?php }
									if(isset($_REQUEST["limit"])) {?>
										<input type="hidden" name="limit" value="<?php echo $_REQUEST["limit"];?>">
									<?php } 
									if(isset($_REQUEST["sku"])) {?>
										<input type="hidden" name="sku" value="<?php echo $_REQUEST["sku"];?>">
									<?php } 
									if(isset($_REQUEST["product_name"])) {?>
										<input type="hidden" name="product_name" value="<?php echo $_REQUEST["product_name"];?>">
									<?php }
									if(isset($_REQUEST["product_category"])) {?>
										<input type="hidden" name="product_category" value="<?php echo $_REQUEST["product_category"];?>">
									<?php } 									
									if(isset($_REQUEST["product_shipingclass"])) {?>
										<input type="hidden" name="product_shipingclass" value="<?php echo $_REQUEST["product_shipingclass"];?>">
									<?php } 
									if(isset($_REQUEST["product_tag"])) {?>
										<input type="hidden" name="product_tag" value="<?php echo $_REQUEST["product_tag"];?>">
									<?php } 
									if(isset($_REQUEST["product_status"])) {?>
										<input type="hidden" name="product_status" value="<?php echo $_REQUEST["product_status"];?>">
									<?php } ?>
									
									<?php foreach($attributes as $attr){ 
											if(isset($_REQUEST["pattribute_" . $attr->id])){
												if($_REQUEST["pattribute_" . $attr->id]){
												?>
												<input type="hidden" name="pattribute_<?php echo $attr->id;?>" value="<?php echo $_REQUEST["pattribute_" . $attr->id];?>">
												<?php	
												}
											}
										 } ?>
									
									<input type="hidden" name="import_count" value="<?php echo $import_count ;?>" />
								</form>
								<script type="text/javascript">
										document.getElementById("continueImportForm").submit();
								</script>
							</body>
						</html>
					<?php
					
					if( isset( $impexp_settings->notfound_setpending )){
						if($impexp_settings->notfound_setpending){
							 if(!empty($imported_ids)){
								$wpdb->query( 
									$wpdb->prepare( "UPDATE $wpdb->posts SET post_status = 'pending' WHERE (post_type LIKE 'product_variation' or post_type LIKE 'product') AND NOT ID IN (". implode(",", $imported_ids ) .")")
								 ); 
							 }else{
								$wpdb->query( 
									$wpdb->prepare( "UPDATE $wpdb->posts SET post_status = 'pending' WHERE (post_type LIKE 'product_variation' or post_type LIKE 'product')")
								 );
							 }
						}
					}
					die;
					return;
					exit;
				   
				   ///////////////////////////////////////////////////////////////////////////////
				   break;
			    }
				//UPD ROUTINE/////////////////////////////////////////////////////////////////////////
				
				$csv_row_processed_count++;
				$id = NULL;
				if($id_index >= 0)	
					$id = intval($data[$id_index]);
				
				

				if($sku_index != -1)
					$data[$sku_index] = trim($data[$sku_index]);

				if(!$id && $sku_index != -1){
					if($data[$sku_index]){
						$res = $wpdb->get_col("select post_id from $wpdb->postmeta where meta_key like '_sku' and meta_value like '".$data[$sku_index]."'");
						if(!empty($res))
							$id = $res[0];
					}
				}	

				if(!$id && $name_index != -1){
					if($data[$name_index]){
						$res = $wpdb->get_col("select ID from $wpdb->posts where cast(post_title as char(255)) like '" . $data[$name_index] . "' and (post_type like 'product' OR post_type like 'product_variation') ");
						if(!empty($res))
							$id = $res[0];
					}
				}

				$continue = false;
				
				if(trim(implode("",$data))){
					if(!$id){
						$continue = true;
					}
				}else
					$continue = true;
				
				if( $id){
					if(false === get_post_status( $id ))
						$continue = true;
				}
				
				if($continue){
					$n++;
					$data = get_option($import_uid."_".$n,null);
					continue;
				}
				
				$parent = get_ancestors($id,'product');
				if( !empty($parent)){
					$parent = $parent[0];
				}else
					$parent = 0;
				
				$imported_ids[] = $id;	
								
				while(count($data) < $col_count)
				  $data[] = NULL;	
					
				$post_update = array( 'ID' => $id );

				

				$any_price_set = false;
				

				
				
				
				if($parent){
				   $attributes_set = array();
				   
				   $update_par_att = false;
				   foreach($attributes as $attr){
						if(isset($attribute_indexes[$attr->name])){
							if(isset($data[$attribute_indexes[$attr->name]])){
								
								$att_value = explode(",",$data[$attribute_indexes[$attr->name]]);
								if(!empty($att_value)){
									$att_value = $att_value[0];
									$att_value = toUTF8($att_value);
								}else
									$att_value = NULL;
								
								$tnames    = array();
								$tids      = array();
								$val       = "";
								$attributes_set[] = $attr->name;
								if($att_value){
									
									$term = null;
									foreach($attr->values as $trm){
									   if(trim(strtolower($trm->name)) == trim(strtolower($att_value))){
											$term = $trm;
											break;
									   }
									}
									
									if($term){
										update_post_meta($id, 'attribute_pa_' . $attr->name, $term->slug);
									}else{
										update_post_meta($id, 'attribute_pa_' . $attr->name, $att_value);
									}
									
								}else{
									delete_post_meta($id, 'attribute_pa_' . $attr->name);
								}
								$update_par_att = true;
							}	 
						}
				   }
				   
				   if($update_par_att){
						$false = false;   
						updateParentVariationData($parent,$false,$attributes_asoc,$attributes_set);
						wp_set_object_terms($parent, array('variable'), 'product_type');
				   }
				   
				}else{ 

				   $patts = get_post_meta($id,'_product_attributes',true);
				   
				   $patts_set = false;
				   if(!$patts)
					$patts = array();
				
				   foreach($attributes as $attr){
					   $a_tax_name = 'pa_' . $attr->name;
					   if(isset($attribute_indexes[$attr->name])){
						   
						    $atts_input = array_map("trim", explode(",",$data[$attribute_indexes[$attr->name]]));
							
							if(!isset($attr->ndict)){
								$attr->ndict = array();
								foreach($attr->values as $trm){
									$attr->ndict[trim(strtolower($trm->name))] = $trm->slug;
								}
							}
							
							for($a_i = 0 ; $a_i < count($atts_input); $a_i++){
								if(isset($attr->ndict[trim(strtolower($atts_input[$a_i]))]))
									$atts_input[$a_i] = $attr->ndict[trim(strtolower($atts_input[$a_i]))];
							}
							
							wp_set_object_terms( $id , asArray($atts_input) , $a_tax_name );
						  
							if(!$data[$attribute_indexes[$attr->name]]){
							   if(isset($patts[$a_tax_name]))
								unset($patts[$a_tax_name]);
							}else{
								if(!isset($patts[$a_tax_name])){
									$patts[$a_tax_name] = array();
								}elseif(!$patts[$a_tax_name]){
									$patts[$a_tax_name] = array();
								}
								$patts[$a_tax_name]["name"]         = $a_tax_name;
								if(!isset($patts[$a_tax_name]["is_visible"]))
									$patts[$a_tax_name]["is_visible"]   = 1;
								$patts[$a_tax_name]["is_taxonomy"]  = 1;
								$patts[$a_tax_name]["is_variation"] = 0;
								
								if(!isset($patts[$a_tax_name]["value"])) $patts[$a_tax_name]["value"]       = "";
								if(!isset($patts[$a_tax_name]["position"])) $patts[$a_tax_name]["position"] = count($patts) - 1;
								
							}
							$patts_set = true;
						}
						
						if(isset($attribute_visibility_indexes[$attr->name])){
							
							if(!isset($patts[$a_tax_name])){
									$patts[$a_tax_name] = array();
							}elseif(!$patts[$a_tax_name]){
								$patts[$a_tax_name] = array();
							}
							$patts[$a_tax_name]["name"]         = $a_tax_name;
							$patts[$a_tax_name]["is_visible"]   = filter_var($data[$attribute_visibility_indexes[$attr->name]], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
							$patts[$a_tax_name]["is_taxonomy"]  = 1;
							$patts[$a_tax_name]["is_variation"] = 0;
							
							if(!isset($patts[$a_tax_name]["value"])) $patts[$a_tax_name]["value"]       = "";
							if(!isset($patts[$a_tax_name]["position"])) $patts[$a_tax_name]["position"] = count($patts) - 1;
							$patts_set = true;
						}
				   }
				   
				   if($patts_set){
						update_post_meta($id, "_product_attributes" , $patts);
				   }
				}

				if($tags_names_index > -1){
				  wp_set_object_terms( $id , explode(",",$data[$tags_names_index]) , 'product_tag' );
				}

							
							
				$false = false;   
				//updateParentVariationData($id,$false,$attributes_asoc,NULL);
				
				if(function_exists("wc_delete_product_transients"))
					wc_delete_product_transients($id);
				
				peatm_on_product_update($parent ? $parent : $id);
				//////////////////////////////////////////////////////////////////////////////////////
				$import_count++;
			    $n++;
				$data = get_option($import_uid."_".$n,null);
			}
			
			if($csv_row_processed_count > 0){
				if( isset( $impexp_settings->notfound_setpending )){
					if($impexp_settings->notfound_setpending){
						 if(!empty($imported_ids)){
							$wpdb->query( 
								$wpdb->prepare( "UPDATE $wpdb->posts SET post_status = 'pending' WHERE (post_type LIKE 'product_variation' or post_type LIKE 'product') AND NOT ID IN (". implode(",", $imported_ids ) .")")
							 ); 
						 }else{
							$wpdb->query( 
								$wpdb->prepare( "UPDATE $wpdb->posts SET post_status = 'pending' WHERE (post_type LIKE 'product_variation' or post_type LIKE 'product')")
							 );
						 }
					}
				}
			}
		
			
		}
		//WE NEED TO RELOAD ATTRIBUTES BECUSE WE MIGHT CREATED SOME NEW ONES
		$attributes      = array();
		$attributes_asoc = array();
		loadAttributes($attributes,$attributes_asoc);
		$custom_fileds   = array();
		loadCustomFields($plem_settings,$custom_fileds);
		////////////////////////////////////////////////////////////////////
		
		
		//WHEN WE REACH THIS POINT IMPORT IS DONE///////
		$wpdb->query("DELETE FROM $wpdb->options WHERE option_name LIKE '$import_uid%'");
		delete_option("peatm_order_csv");
		delete_option("peatm_impc");
		////////////////////////////////////////////////
		$wpdb->query("DELETE p from $wpdb->posts as p LEFT JOIN $wpdb->posts as pp on pp.ID = p.post_parent where p.post_type ='product_variation' AND  coalesce(p.post_parent,0) > 0 AND pp.ID IS NULL");
	}
}


$tags           = array();
foreach((array)get_terms('product_tag',array('hide_empty' => false )) as $pt){
    $t = new stdClass();
	$t->id   = $pt->term_id;
	$t->slug = urldecode($pt->slug);
	$t->name = $pt->name;
	$tags[]     = $t;
}	


$post_statuses = get_post_stati();
$pos_stat = get_post_statuses();        
foreach($post_statuses as $name => $title){
	if(isset($pos_stat[$name]))
		$post_statuses[$name] = $pos_stat[$name];		
}


if(isset($_REQUEST['remote_import'])){
  if(isset($_REQUEST['file_timestamp'])){
      $this->settings["wooc_remote_import_timestamp"] = $_REQUEST['file_timestamp'];
	  $this->saveOptions();
  }
  echo "Remote import success: " . $import_count ." products processed.";
  exit();
  return;
}

$_num_sample = (1/2).'';

if(!isset($_REQUEST["IDS"])){
	$args = array(
		 'post_type' => array('product')
		,'posts_per_page' => -1
		,'ignore_sticky_posts' => true
		,'orderby' => $orderby 
		,'order' => $sort_order
		,'fields' => 'ids'
	);

	if($product_status)
		$args['post_status'] = $product_status;

	if($orderby_key){
	   $args['meta_key'] = $orderby_key;
	}

	$meta_query = array();

	if(isset($product_name) && $product_name){
		$name_postids = $wpdb->get_col("select ID from $wpdb->posts where post_title like '%$product_name%' ");
		$args['post__in'] = empty($name_postids) ? array(-9999) : $name_postids;
	}

	$tax_query = array();

	if($product_category){
		$tax_query[] =  array(
							'taxonomy' => 'product_cat',
							'field' => 'id',
							'terms' => $product_category
						);
	}

	if($product_tag){
		$tax_query[] =  array(
							'taxonomy' => 'product_tag',
							'field' => 'id',
							'terms' => $product_tag
						);
	}

	if($product_shipingclass){
		$tax_query[] =  array(
							'taxonomy' => 'product_shipping_class',
							'field' => 'id',
							'terms' => $product_shipingclass
						);
	}

	foreach($filter_attributes as $fattr => $vals){
		$ids   = array();
		$names = array();
		foreach($vals as $val){
		  if(is_numeric($val))
			$ids[] = intval($val);
		  else
			$names[] = $val;
		}
		if(!empty($ids)){
			$tax_query[] =  array(
								'taxonomy' => 'pa_' . $fattr,
								'field' => 'id',
								'terms' => $ids
							);
		}
		
		if(!empty($names)){
			$tax_query[] =  array(
								'taxonomy' => 'pa_' . $fattr,
								'field' => 'name',
								'terms' => $names
							);
		}				
	}

	if($sku){
		$meta_query[] =	array(
							'key' => '_sku',
							'value' => $sku,
							'compare' => 'LIKE'
						);
	}

	if(!empty($tax_query )){
		$args['tax_query']  = $tax_query;
	}

	if(!empty($meta_query))
		$args['meta_query'] = $meta_query;
		

		


	if(!isset($_REQUEST["mass_update_val"])){
		$args['posts_per_page'] = $limit; 
		$args['paged']          = $page_no;
	}



	$products_query = new WP_Query( $args );
	$count          = $products_query->found_posts;
	$IDS            = $products_query->get_posts();		

	if($count == 0){
		$IDS = array();
		unset($args['fields']);
		$products_query = new WP_Query( $args );
		$count          = $products_query->found_posts;	
		
		while($products_query->have_posts()){
			$products_query->next_post();
			$pid = $products_query->post->ID; 
			$IDS[] = $pid;
		}
		
		wp_reset_postdata();
	}

	$ID_TMP = array();
	foreach($IDS as $p_id){
		$ID_TMP[] = $p_id;
		
		$wpdb->flush();
		$variat_ids = $wpdb->get_col($wpdb->prepare( 
			"SELECT      p.ID
				FROM        $wpdb->posts p
			 WHERE       p.post_type = 'product_variation'
							AND 
						 p.post_parent = %d
			 ORDER BY    p.ID
			",
			$p_id
		));
				
		foreach($variat_ids as $vid)
			$ID_TMP[] = $vid;
	}

	unset($IDS);
	$IDS = $ID_TMP;
}else{
	$IDS = explode(",",$_REQUEST["IDS"]);
	$count = count($IDS);
}



//$count = count($ID_TMP);

function array_escape(&$arr){
	foreach($arr as $key => $value){
		if(is_string($value)){
			if(strpos($value, "\n") !== false)
				$arr[$key] = str_replace(array("\n","\r"),array("\\n","\\r") , $value);
		}
	}
}




function product_render(&$IDS,&$attributes,$op,&$df = null){
	global $wpdb, $custom_fileds, $impexp_settings, $custom_export_columns,$resume_skip;
	
	$p_ids = is_array($IDS) ? $IDS : array($IDS);
	
	if($resume_skip > 0){
		$p_ids = array_slice($p_ids,$resume_skip);
	}
	
	$fcols = array();	
	foreach($custom_fileds as $cfname => $cfield){
		if($cfield->type == "post"){
			$fcols[] = $cfield->source;
		}
	}
	
	$id_list = implode(",",$p_ids);
	if(!$id_list)
		$id_list = 9999999;
	$raw_data = $wpdb->get_results("select ID, post_name ". (!empty($fcols) ? "," . implode(",",$fcols) : "") ." from $wpdb->posts where ID in (". $id_list .")",OBJECT_K); 
    
    
    $p_n = 0;
	foreach($p_ids as $id) {
	  $prod = new stdClass();
	  $prod->id             = $id;
	  
	  if(!isset($_REQUEST["do_export"])){
		$prod->type           = get_post_type($id);
	  }
	  
	  $prod->parent  = get_ancestors($id,'product');
	  if(!empty($prod->parent))
		$prod->parent = $prod->parent[0];
	  else
        $prod->parent = null;
	
	  if(fn_show_filed('sku'))
		$prod->sku            = get_post_meta($id,'_sku',true);
	  
	  if(fn_show_filed('slug'))
		$prod->slug           = urldecode($raw_data[$id]->post_name);
		
	  if(fn_show_filed('stock'))
		$prod->stock              = get_post_meta($id,'_stock',true);//_manage_stock - null if not
	  
	  if(fn_show_filed('stock_status')){
		  if(isset($_REQUEST["do_export"]))
			$prod->stock_status       = get_post_meta($id,'_stock_status',true);
		  else
			$prod->stock_status       = get_post_meta($id,'_stock_status',true) == "instock" ? true : false;
	  }
	  
	  if(fn_show_filed('categories'))
		$prod->categories     = wp_get_object_terms($id, 'product_cat', array('fields' => 'ids') );
	
	  if(fn_show_filed('shipping_class'))
		$prod->shipping_class = wp_get_object_terms($id, 'product_shipping_class', array('fields' => 'ids') );
	
	  $ptype =  implode(",",wp_get_object_terms($id, 'product_type', array('fields' => 'names')));
	  if(fn_show_filed('product_type') || !isset($_REQUEST["do_export"])){
		if(isset($_REQUEST["do_export"]))
			$prod->product_type = $ptype;
		else	  
			$prod->product_type = wp_get_object_terms($id, 'product_type', array('fields' => 'ids'));
	  }
	  
	  if(fn_show_filed('virtual') || fn_show_filed('downloadable')  || fn_show_filed('downloads')){
		$ptype = wp_get_object_terms($id, 'product_type', array('fields' => 'names'));
		if(is_array($ptype))
			$ptype = $ptype[0];
		
		if(fn_show_filed('virtual')){
			if(isset($_REQUEST["do_export"]))
				$prod->virtual     = get_post_meta($id,'_virtual',true);
			else{
				$prod->virtual     = get_post_meta($id,'_virtual',true) == "yes" ? true : false;
			}
		}
		
		if(fn_show_filed('downloadable')){
			if(isset($_REQUEST["do_export"]))
				$prod->downloadable     = get_post_meta($id,'_downloadable',true);
			else{
				$prod->downloadable     = get_post_meta($id,'_downloadable',true) == "yes" ? true : false;
			}
		}
		
		if(fn_show_filed('downloads')){
			if(isset($_REQUEST["do_export"]))
				$prod->downloads     = getDownloads($id,true);
			else{
				$prod->downloads     = getDownloads($id);
			}
		}
	  }
	 
	  if(!isset($_REQUEST["do_export"]) && $prod->parent){
		if(fn_show_filed('categories'))
			$prod->categories     = wp_get_object_terms($prod->parent, 'product_cat', array('fields' => 'ids') );
		
		if(fn_show_filed('shipping_class')){
			if($prod->shipping_class == -1)
				$prod->shipping_class = wp_get_object_terms($prod->parent, 'product_shipping_class', array('fields' => 'ids') );
		}	
	  }
	  
	  if(isset($_REQUEST["do_export"])){
		
		if(fn_show_filed("categories_paths")){
			$prod->categories_paths     = get_product_categories_paths($id);
		}elseif(fn_show_filed('categories')){
			$prod->categories_names     = implode(", ",wp_get_object_terms( $id, 'product_cat', array('fields' => 'names') ));
		}
		
		unset($prod->categories);
		
		if(fn_show_filed('shipping_class')){
			$prod->shipping_class_name  = implode(", ",wp_get_object_terms( $id, 'product_shipping_class', array('fields' => 'names') ));
			unset($prod->shipping_class);
		}
		
		if(fn_show_filed('stock_status'))
			unset($prod->stock_status);
	  }
	  
	  if(fn_show_filed('price')){
		  $prod->price              = get_post_meta($id,'_regular_price',true);
	  }
	  
	  if(fn_show_filed('override_price')){
		  $prod->override_price     = get_post_meta($id,'_sale_price',true);
	  }
	  
	  $name_suffix = '';	
	  if(fn_show_filed('name')){
		  if($prod->parent){
			$prod->name         = get_the_title($prod->parent). "(var #". $id . ')';
		  }else
			$prod->name         = get_the_title($id);
	  } 
	  
	  
	  $pa = get_post_meta($prod->parent ? $prod->parent : $id,'_product_attributes',true);
	  $att_info = array();
	  
	  if(!$prod->parent && $ptype !== 'variable'){
		  if($pa){
			  if(!empty($pa)){
				  $fix = false;
				  foreach($pa as $_akey => $_a){
					  if($_a["is_variation"] && $_akey == '0'){
						  $fix = true;
						  break;
					  }
				  }
				  if($fix){
					  $NULL = null;
					  updateParentVariationData($id,$NULL,$NULL,null);
					  $pa = get_post_meta($prod->parent ? $prod->parent : $id,'_product_attributes',true);
				  }
			  }
		  }
	  }else if(!$prod->parent && $ptype === 'variable'){
		  if($pa){
			if(isset($pa[0])){
				updateParentVariationData($id,$NULL,$NULL,null);
			    $pa = get_post_meta($prod->parent ? $prod->parent : $id,'_product_attributes',true);
			}
		  }
		  
		  
	  }
	  
	    
	  foreach($attributes as $att){
		  
		  
		$inf    = new stdClass();
		$inf->v = 0;
		$inf->s = true;
		if(isset($pa['pa_'. $att->name])){
			$inf->v = $pa['pa_'. $att->name]["is_variation"];
			$inf->s = $pa['pa_'. $att->name]["is_visible"] ? true : false;
		}
		$att_info[$att->id] = $inf;
		
		if($prod->parent){
			if($inf->v){
				$att_value = get_post_meta($id,'attribute_pa_'. $att->name,true);
				$att_value = explode(",",$att_value);
				$tnames    = array();
				$tids      = array();
				foreach($att_value as $tslug){
					$term = null;
					foreach($att->values as $trm){
					   if($trm->slug == $tslug){
							$term = $trm;
							break;
					   }
					}
					
					if($term){
						$tnames[] = $term->name;
						$tids[]   = $term->id; 
					}
					
					if(!empty($tids))//VARIANT Can have only one 
						break;
				}
				
				if(fn_show_filed('name') && !empty($tnames)){
					$prod->name .= (", ". implode(",",$tnames));
				}
				
				if(!fn_show_filed('pattribute_' . $att->id))
					continue;
					
				if(isset($_REQUEST["do_export"]))
					$prod->{'pattribute_'.$att->id} =  implode(",",$tnames);
				else	
					$prod->{'pattribute_'.$att->id} = $tids;
				
			}else{
				if(!fn_show_filed('pattribute_' . $att->id))
					continue;
					
				if(isset($_REQUEST["do_export"])){
					$prod->{'pattribute_'.$att->id} = null;//NO APPLACABLE
				}else{
					$prod->{'pattribute_'.$att->id} = wp_get_object_terms($prod->parent,'pa_'. $att->name, array('fields' => 'ids'));//INHERITED
				}
			}
			
			
			if(fn_show_filed("attribute_show"))
				$prod->{'pattribute_'.$att->id."_visible"} = null;
		}else{
			
			if(!fn_show_filed('pattribute_' . $att->id))
				continue;
			
			if(isset($_REQUEST["do_export"])){
				if($inf->v){
					$prod->{'pattribute_'.$att->id} = NULL;
				}else{
					$prod->{'pattribute_'.$att->id} = implode(", ",wp_get_object_terms($id,'pa_'. $att->name, array('fields' => 'names')));
				}
				if(fn_show_filed("attribute_show"))
					$prod->{'pattribute_'.$att->id."_visible"} = $inf->s ? "yes" : "no";
			}else{
				$prod->{'pattribute_'.$att->id} = wp_get_object_terms($id,'pa_'. $att->name, array('fields' => 'ids'));
				if(fn_show_filed("attribute_show"))
					$prod->{'pattribute_'.$att->id."_visible"} = $inf->s;
			}
			
		}
	  }
	  
	  if(!isset($_REQUEST["do_export"])){
			$prod->att_info = $att_info;
	  }
	  
	  
	  //if(fn_show_filed('name'))
	  //$prod->name .= $name_suffix;
	 
	  foreach($custom_fileds as $cfname => $cfield){ 
		   if($cfield->type == "term"){
				if(isset($_REQUEST["do_export"]))
					$prod->{$cfname} = implode(", ",wp_get_object_terms($id,$cfield->source, array('fields' => 'names')));
				else{
					if($prod->parent)
						$prod->{$cfname} = wp_get_object_terms($prod->parent,$cfield->source, array('fields' => 'ids'));
					else
						$prod->{$cfname} = wp_get_object_terms($id, $cfield->source , array('fields' => 'ids'));
				}	
				
		   }elseif($cfield->type == "meta"){
				$prod->{$cfname} = fn_get_meta_by_path( $id , $cfield->source);
				
				if($cfield->options->formater){
					if($cfield->options->formater == "image"){
						if(isset($cfield->options->format) && $prod->{$cfname}){
							if($cfield->options->format == "id"){
								$i_val = new stdClass;
								$i_val->id    = $prod->{$cfname};
								$i_val->src   = wp_get_attachment_url($i_val->id);
								$i_val->thumb = wp_get_attachment_thumb_url($i_val->id);
								$i_val->name  = pathinfo($i_val->src, PATHINFO_FILENAME);
								$i_val->title = get_the_title($img_id);
								$prod->{$cfname} = $i_val;
							}elseif($cfield->options->format == "url"){
								$m_id = get_attachment_id_from_src($prod->{$cfname});
								if($m_id){
									$i_val = new stdClass;
									$i_val->id    = $m_id;
									$i_val->src   = $prod->{$cfname};
									$i_val->thumb = wp_get_attachment_thumb_url($prod->{$cfname});
									$i_val->name  = pathinfo($i_val->src, PATHINFO_FILENAME);
									$i_val->title = get_the_title($m_id);
									if($i_val->src)
										$prod->{$cfname} = $i_val;
									else
										$prod->{$cfname} = NULL;
								}else{
									$i_val = new stdClass;
									$i_val->id    = 0;
									$i_val->src   = $prod->{$cfname};
									$i_val->thumb = NULL;
									$i_val->name  = pathinfo($i_val->src, PATHINFO_FILENAME);
									$i_val->title = $i_val->name;
									if($i_val->src)
										$prod->{$cfname} = $i_val;
									else
										$prod->{$cfname} = NULL;
								}
								//ovde
							}elseif($cfield->options->format == "object"){
								//nothing
							}
						}
						
						if(isset($_REQUEST["do_export"])){
							if($prod->{$cfname})
								$prod->{$cfname} = $prod->{$cfname}->src;
						}
							
						
					}elseif($cfield->options->formater == "gallery"){
						if(isset($cfield->options->format) && $prod->{$cfname}){
							if($cfield->options->format == "id"){
								$m_ids = explode(",",$prod->{$cfname});
								if($m_ids){
									$m_val = array();
									foreach($m_ids as $m_id){
										$i_val = new stdClass;
										$i_val->id    = $m_id;
										$i_val->src   = wp_get_attachment_url($m_id);
										$i_val->thumb = wp_get_attachment_thumb_url($m_id);
										$i_val->name  = pathinfo($i_val->src, PATHINFO_FILENAME);
										$i_val->title = get_the_title($m_id);
										if($i_val->src)
											$m_val[] = $i_val;
									}
									$prod->{$cfname} = $m_val;
								}else
									$prod->{$cfname} = NULL;
								
							}elseif($cfield->options->format == "url"){
								$m_urls = explode(",",$prod->{$cfname});
								if(!empty($m_urls)){
									$m_val = array();
									foreach($m_urls as $m_url){
										$m_id = get_attachment_id_from_src($m_url);
										$i_val = new stdClass;
										if($m_id){
											$i_val->id    = $m_id;
											$i_val->src   = $m_url;
											$i_val->thumb = wp_get_attachment_thumb_url($m_id);
											$i_val->name  = pathinfo($i_val->src, PATHINFO_FILENAME);
											$i_val->title = get_the_title($m_id);
										}else{
											$i_val->id    = 0;
											$i_val->src   = $m_url;
											$i_val->thumb = NULL;
											$i_val->name  = pathinfo($i_val->src, PATHINFO_FILENAME);
											$i_val->title = $i_val->name;
										}
										if($i_val->src)
											$m_val[] = $i_val;
									}
									$prod->{$cfname} = $m_val;
								}else
									$prod->{$cfname} = NULL;
								
							}elseif($cfield->options->format == "object"){
								//nothing
							}
						}
						
						if(isset($_REQUEST["do_export"])){
							if($prod->{$cfname}){
								if(!empty($prod->{$cfname})){
									$e_val = array();
									foreach($prod->{$cfname} as $m){
										$e_val[] = $m->src; 
									}
									$prod->{$cfname} = implode(",",$e_val);
								}
							}
						}
					}	
				}
				
				if(isset($cfield->options)){
					if(isset($cfield->options->format)){
						if($cfield->options->format == "json_array")	
							$prod->{$cfname} = implode(",",json_decode($prod->{$cfname}));
						else if(isset($_REQUEST["do_export"])){
							if(strpos($cfield->options->format,'_array') !== false){
								if(is_array($prod->{$cfname}))
									$prod->{$cfname} = implode(",",$prod->{$cfname});
							}
						}
					}	
				}
				
		   }elseif($cfield->type == "post"){
		        $prod->{$cfname} = $raw_data[$id]->{$cfield->source};
		   }
		   
		   if($cfield->options->formater == "checkbox"){
				if($prod->{$cfname} !== null)
					$prod->{$cfname} = $prod->{$cfname} . "";
				else if( isset($cfield->options->null_value)){
					if($cfield->options->null_value){
						$prod->{$cfname} = $prod->{$cfname} = $cfield->options->null_value."";
					}
				}
		   }
	  }
	  
	  if(fn_show_filed('status'))
		$prod->status       = get_post_status($id);
		
		
	  $ptrems = get_the_terms($id,'product_tag');
	  
	  if(fn_show_filed('tags')){
		  if(isset($_REQUEST["do_export"])){
			  $prod->tags_names         = null;
			  if($ptrems){
				  foreach((array)$ptrems as $pt){
					if(!isset($prod->tags_names)) 
						$prod->tags_names = array();
						
					$prod->tags_names[] = $pt->name;
				  }
				  $prod->tags_names = implode(", ",$prod->tags_names);
			  }
		  }else{
			  $prod->tags               = null;
			  if($ptrems){
				  foreach((array)$ptrems as $pt){
					if(!isset($prod->tags)) 
						$prod->tags = array();
						
					$prod->tags[] = $pt->term_id;
				  }
			  }
		  }
	  }
	  
	  if(fn_show_filed('weight'))
		$prod->weight       = get_post_meta($id,'_weight',true);
	  if(fn_show_filed('length'))
		$prod->length       = get_post_meta($id,'_length',true);
	  if(fn_show_filed('width'))
		$prod->width        = get_post_meta($id,'_width',true);
	  if(fn_show_filed('height'))
		$prod->height       = get_post_meta($id,'_height',true);
	  
	  if(fn_show_filed('featured')){
		  if(isset($_REQUEST["do_export"]))
			$prod->featured     = get_post_meta($id,'_featured',true);
		  else{
			$prod->featured     = get_post_meta($prod->parent ? $prod->parent : $id,'_featured',true) == "yes" ? true : false;
		  }
	  }
	  

	  
	  if(fn_show_filed('tax_status'))
		$prod->tax_status   = get_post_meta(($prod->parent && !isset($_REQUEST["do_export"])) ? $prod->parent : $id,'_tax_status',true);
	  if(fn_show_filed('tax_class'))
		$prod->tax_class    = get_post_meta(($prod->parent && !isset($_REQUEST["do_export"])) ? $prod->parent : $id,'_tax_class',true);
	  if(fn_show_filed('backorders'))
		$prod->backorders   = get_post_meta(($prod->parent && !isset($_REQUEST["do_export"])) ? $prod->parent : $id,'_backorders',true);
	
      if(fn_show_filed('image')){	
		  $prod->image = null;
		  
		  if(has_post_thumbnail($id)){
			$thumb_id    = get_post_thumbnail_id($id);
			if(isset($_REQUEST["do_export"])){
				if(!$prod->parent){
					$prod->image = wp_get_attachment_image_src($thumb_id, 'full');
					if(is_array($prod->image))
						$prod->image = $prod->image[0];
				}
			}else{
				$prod->image = new stdClass;
				$prod->image->id    = $thumb_id;
				
				$prod->image->src   = wp_get_attachment_image_src($thumb_id, 'full');
				if(is_array($prod->image->src))
					$prod->image->src = $prod->image->src[0];
				
				$prod->image->thumb = wp_get_attachment_image_src($thumb_id, 'thumbnail');
				if(is_array($prod->image->thumb))
					$prod->image->thumb = $prod->image->thumb[0];
				
				if(!$prod->image->src)
				$prod->image = null;
			}
		  }
	  }
	  
	  if(fn_show_filed('gallery')){	
		  $prod->gallery = null;
		  
		  if(!(isset($_REQUEST["do_export"]) && $prod->parent)){
			  $gallery = get_post_meta($prod->parent ? $prod->parent : $id,"_product_image_gallery",true);
			  if($gallery){
				  $prod->gallery = array();
				  foreach(explode(",",$gallery) as $ind => $img_id){
					  if(isset($_REQUEST["do_export"])){
						  $img = wp_get_attachment_image_src($img_id, 'full');
						  if(is_array($img))
							  $img = $img[0];
						  $prod->gallery[] = $img;
					  }else{
						  $gimg = new stdClass;
						  $gimg->id    = $img_id; 
						  $gimg->src   = wp_get_attachment_image_src($img_id, 'full');
						  if(is_array($gimg->src))
							  $gimg->src = $gimg->src[0];
						  
						  $gimg->thumb = wp_get_attachment_image_src($img_id, 'thumbnail'); 
						  if(is_array($gimg->thumb))
							  $gimg->thumb =$gimg->thumb[0];
						  
						  if($gimg->src)
						  $prod->gallery[] = $gimg; 
					  }
				  }
				  
				  if(isset($_REQUEST["do_export"])){
					  $prod->gallery = implode(",",$prod->gallery);
				  }
			  }
		 }
	  }
	  
	  if(!fn_show_filed('parent') && isset($_REQUEST["do_export"])){
			unset($prod->parent);
	  }
	  
	  if($op == "json"){
	     if($p_n > 0) echo ",";
	     $out = json_encode($prod);
		 if($out)
			echo $out;
		 else
            echo "/*ERROR json_encode product ID $id*/";
		
		global $start_time,$max_time,$mem_limit,$res_limit_interupted;
		
		if($p_n > 0 && $start_time + $max_time  < time() || getMemAllocated() + 1048576 > $mem_limit){
			$res_limit_interupted = $p_n + 1;
			break;	
		}
		
	  }elseif($op == "export"){
		 
		 if($p_n == 0 && $resume_skip == 0){	
		   if($impexp_settings->use_custom_export){
			   fputcsv($df, $custom_export_columns, $impexp_settings->delimiter2);
		   }else{		 
			   $pprops =  (array)$prod;
			   $props = array();
			   foreach( $pprops as $key => $pprop){
				$props[] = $key;
			   }
			   fputcsv($df, $props);
		   }
		 }
		 
		 if($impexp_settings->use_custom_export){
			$eprod = array();
			foreach($custom_export_columns as $prop){
				$eprod[] = &$prod->$prop;
			}
			array_escape($eprod);
			fputcsv($df, $eprod, $impexp_settings->delimiter2);
		 }else{
			$aprod = (array)$prod;
			array_escape($aprod);
			fputcsv($df, $aprod, $impexp_settings->delimiter2);
		 }
		 
		 global $start_time,$max_time,$mem_limit,$res_limit_interupted, $in_export_chunk;
		 
		 if(!isset($in_export_chunk))
			 $in_export_chunk = 1;
		 else
			 $in_export_chunk++;
		 
		 if($in_export_chunk == 300 || $p_n > $resume_skip && $start_time + $max_time  < time() || getMemAllocated() + 1048576 > $mem_limit){
			$res_limit_interupted = $p_n + 1;
			break;	
		 }
		
	  }elseif($op == "data"){
		  return $prod;
	  }
	  $p_n++;
	  
	  unset($prod);
	  
	}
};


if(isset($_REQUEST["do_export"])){
	if($_REQUEST["do_export"] = "1"){
	
		$export_uid = isset($_REQUEST["export_uid"]) ? $_REQUEST["export_uid"] : uniqid("plem_export_");
		$chunk_n    = get_option( $export_uid ."_chunk", 0);
		$chunk_n++;
		
	    $df = fopen("php://temp", 'w+');
	    ///////////////////////////////////////////////////
		product_render($IDS,$attributes,"export",$df);
		///////////////////////////////////////////////////
		rewind($df);
		$contents = '';
		while (!feof($df)) {
			$contents .= fread($df, 8192 * 4);
		}
		
		update_option( $export_uid ."_chunk" , $chunk_n, false );
		update_option( $export_uid . "_" . $chunk_n , $contents, false );
		
		fclose($df);
		
		if($res_limit_interupted == 0){
			
			$filename = "csv_export_" .(isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST']."_" : ""). date("Y-m-d") . ".csv";
			$now = gmdate("D, d M Y H:i:s");
			header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
			header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
			header("Last-Modified: {$now} GMT");

			// force download  
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");

			// disposition / encoding on response body
			header("Content-Disposition: attachment;filename={$filename}");
			header("Content-type:application/csv;charset=UTF-8");
			header("Content-Transfer-Encoding: binary");
			echo "\xEF\xBB\xBF"; // UTF-8 BOM
			$csv_df = fopen("php://output", 'w');
			$chunk_n = 1;
			$contents = get_option($export_uid . "_" . $chunk_n, false);
			while($contents !== false){
				fwrite($csv_df,$contents);
				$chunk_n++;
				$contents = get_option($export_uid . "_" . $chunk_n, false);
			}
			fclose($csv_df);
			
			delete_option( $export_uid ."_chunk");
			$chunk_n = 1;
			while(delete_option( $export_uid . "_" . $chunk_n))
				$chunk_n++;
			
		}else{
			$resume_skip += $res_limit_interupted;
			?>
				<!DOCTYPE html>
				<html>
					<head>
					<style type="text/css">
						html, body{
							background:#505050;
							color:white;
							font-family:sans-serif;	
						}
					</style>
					</head>
					<body>
						<form method="POST" id="continueExportForm">
							<h2><?php echo __("Preparing export...",'excellikeproductatttag'); ?></h2>
							<p>(<?php echo $resume_skip;?>) <?php echo __("products/product variations entries processed",'excellikeproductatttag'); ?></p>
							<hr/>
							<p><?php echo __("You can close this browser tab once you receive CSV file",'excellikeproductatttag'); ?></p>
							<input type="hidden" name="resume_skip" value="<?php echo $resume_skip;?>">
							<input type="hidden" name="export_uid" value="<?php echo $export_uid;?>">
							<input type="hidden" name="do_export" value="1">
							<input type="hidden" name="IDS" value="<?php echo implode(",",$IDS);?>">
							<?php if(isset($_REQUEST["sortOrder"])) {?>
								<input type="hidden" name="sortOrder" value="<?php echo $orderby;?>">
							<?php } 
							if(isset($_REQUEST["sortColumn"])) {?>
								<input type="hidden" name="sortColumn" value="<?php echo $sort_order;?>">
							<?php } 
							if(isset($_REQUEST["page_no"])) {?>
								<input type="hidden" name="page_no" value="<?php echo $_REQUEST["page_no"];?>">
							<?php }
							if(isset($_REQUEST["limit"])) {?>
								<input type="hidden" name="limit" value="<?php echo $_REQUEST["limit"];?>">
							<?php } 
							if(isset($_REQUEST["sku"])) {?>
								<input type="hidden" name="sku" value="<?php echo $_REQUEST["sku"];?>">
							<?php } 
							if(isset($_REQUEST["product_name"])) {?>
								<input type="hidden" name="product_name" value="<?php echo $_REQUEST["product_name"];?>">
							<?php }
							if(isset($_REQUEST["product_category"])) {?>
								<input type="hidden" name="product_category" value="<?php echo $_REQUEST["product_category"];?>">
							<?php }						
							if(isset($_REQUEST["product_shipingclass"])) {?>
								<input type="hidden" name="product_shipingclass" value="<?php echo $_REQUEST["product_shipingclass"];?>">
							<?php } 
							if(isset($_REQUEST["product_tag"])) {?>
								<input type="hidden" name="product_tag" value="<?php echo $_REQUEST["product_tag"];?>">
							<?php } 
							if(isset($_REQUEST["product_status"])) {?>
								<input type="hidden" name="product_status" value="<?php echo $_REQUEST["product_status"];?>">
							<?php } ?>
							
							<?php foreach($attributes as $attr){ 
									if(isset($_REQUEST["pattribute_" . $attr->id])){
										if($_REQUEST["pattribute_" . $attr->id]){
										?>
										<input type="hidden" name="pattribute_<?php echo $attr->id;?>" value="<?php echo $_REQUEST["pattribute_" . $attr->id];?>">
										<?php	
										}
									}
								 } ?>
						</form>
						<script type="text/javascript">
								document.getElementById("continueExportForm").submit();
						</script>
					</body>
				</html>
			<?php
		}
		
		die();
	    exit;  
	    return;
	}
}

?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php echo get_option('blog_charset'); ?>" />
<script type="text/javascript">
var _wpColorScheme = {"icons":{"base":"#999","focus":"#2ea2cc","current":"#fff"}};
var ajaxurl = '<?php echo $_SERVER['PHP_SELF']; ?>';
var plugin_version = '<?php echo $plem_settings['plugin_version']; ?>';
var localStorage_clear_flag = false;
function cleanLayout(){
	localStorage.clear();
	localStorage_clear_flag = true;
	doLoad();
	return false;
}

if(<?php echo fn_show_filed("attribute_show") ? "'1'" : "'0'"; ?> != localStorage["dg_wooc_attribute_show_visible"]){
	localStorage.clear();
}
localStorage["dg_wooc_attribute_show_visible"] = <?php echo fn_show_filed("attribute_show") ? "'1'" : "'0'"; ?>;

/*
try{
	
  if(localStorage['dg_wooc_manualColumnWidths']){
    localStorage['dg_wooc_manualColumnWidths'] = JSON.stringify( eval(localStorage['dg_wooc_manualColumnWidths']).map(function(s){
	   if(!s) return null;
	   if(s > 220)
			return 220;
	   return s;	
	}));
  }  
}catch(e){}
*/
</script>

<?php
wp_register_script( 'fictive-script', "www.fictive-script.com/fictive-script.js" );
wp_enqueue_script('fictive-script');

wp_register_style( 'fictive-style', "www.fictive-script.com/fictive-script.css" );
wp_enqueue_style('fictive-style');

global $wp_scripts;
foreach($wp_scripts as $skey => $scripts){
	if(is_array($scripts)){
		if(!empty($scripts)){
			if(in_array("fictive-script",$scripts)){
				foreach($scripts as $script){
					wp_dequeue_script($script);
				}
			}
		}
	}
}

global $wp_styles;
foreach($wp_styles as $skey => $styles){
	if(is_array($styles)){
		if(!empty($styles)){
			if(in_array("fictive-style",$styles)){
				foreach($styles as $style){
					wp_dequeue_style($style);
				}
			}
		}
	}
}
	
wp_enqueue_script('jquery');
wp_enqueue_script('jquery-ui-dialog');
if($use_content_editior){
	wp_enqueue_script('word-count');
	wp_enqueue_script('editor');
	wp_enqueue_script('quicktags');
	wp_enqueue_script('wplink');
	wp_enqueue_script('wpdialogs-popup');
	wp_print_styles('wp-jquery-ui-dialog');
}else{
	wp_print_styles('wp-jquery-ui-dialog');
}

if( $use_image_picker || $use_content_editior || fn_show_filed('image')  || fn_show_filed('gallery')){
wp_enqueue_media();	
}

wp_print_scripts() ;

?>
<!--
<script src="<?php echo $excellikeproductatttag_baseurl. 'lib/jquery-2.0.3.min.js' ;?>" type="text/javascript"></script>
-->

<script src="<?php echo $excellikeproductatttag_baseurl. 'core/m/moment.js'; ?>" type="text/javascript"></script>
<link rel="stylesheet" href="<?php echo $excellikeproductatttag_baseurl. 'core/pday/pikaday.css';?>">
<script src="<?php echo $excellikeproductatttag_baseurl. 'core/pday/pikaday.js'; ?>" type="text/javascript"></script>
<script src="<?php echo $excellikeproductatttag_baseurl. 'core/zc/ZeroClipboard.js'; ?>" type="text/javascript"></script>

<link rel="stylesheet" href="<?php echo $excellikeproductatttag_baseurl. 'core/jquery.handsontable.css';?>">
<script src="<?php echo $excellikeproductatttag_baseurl. 'core/jquery.handsontable.js'; ?>" type="text/javascript"></script>

<?php

if(isset($plem_settings['enable_delete'])){ 
	if($plem_settings['enable_delete']){
		?>
<link rel="stylesheet" href="<?php echo $excellikeproductatttag_baseurl. 'core/removeRow.css';?>">
<script src="<?php echo $excellikeproductatttag_baseurl. 'core/removeRow.js'; ?>" type="text/javascript"></script>		
		<?php
	} 
}

?>

<!--
//FIX IN jquery.handsontable.js:

WalkontableTable.prototype.getLastVisibleRow = function () {
  return this.rowFilter.visibleToSource(this.rowStrategy.cellCount - 1);
};

//changed to:

WalkontableTable.prototype.getLastVisibleRow = function () {
  var hsum = 0;
  var sizes_check = jQuery(".htCore tbody tr").toArray().map(function(s){var h = jQuery(s).innerHeight(); hsum += h; return h;});
  var o_size = this.rowStrategy.cellSizesSum;
  
  if(hsum - o_size > 20){
	this.rowStrategy.cellSizes = sizes_check;
	this.rowStrategy.cellSizesSum = hsum - 1;
	this.rowStrategy.cellCount = this.rowStrategy.cellSizes.length;
	this.rowStrategy.remainingSize = hsum - o_size;
  }
	
  return this.rowFilter.visibleToSource(this.rowStrategy.cellCount - 1);
};
-->
<link rel="stylesheet" href="<?php echo $excellikeproductatttag_baseurl.'/lib/chosen.min.css'; ?>">
<script src="<?php echo $excellikeproductatttag_baseurl.'lib/chosen.jquery.min.js'; ?>" type="text/javascript"></script>

<link rel="stylesheet" href="<?php echo $excellikeproductatttag_baseurl.'assets/style.css'; ?>">

<script type='text/javascript'>
/* <![CDATA[ */
//var commonL10n = {"warnDelete":"You are about to permanently delete the selected items.\n  'Cancel' to stop, 'OK' to delete."};var thickboxL10n = {"next":"Next >","prev":"< Prev","image":"Image","of":"of","close":"Close","noiframes":"This feature requires inline frames. You have iframes disabled or your browser does not support them.","loadingAnimation":"http:\/\/localhost\/wooexcel\/wp-includes\/js\/thickbox\/loadingAnimation.gif"};var wpAjax = {"noPerm":"You do not have permission to do that.","broken":"An unidentified error has occurred."};var autosaveL10n = {"autosaveInterval":"60","savingText":"Saving Draft\u2026","saveAlert":"The changes you made will be lost if you navigate away from this page.","blog_id":"1"};var quicktagsL10n = {"closeAllOpenTags":"Close all open tags","closeTags":"close tags","enterURL":"Enter the URL","enterImageURL":"Enter the URL of the image","enterImageDescription":"Enter a description of the image","fullscreen":"fullscreen","toggleFullscreen":"Toggle fullscreen mode","textdirection":"text direction","toggleTextdirection":"Toggle Editor Text Direction"};var adminCommentsL10n = {"hotkeys_highlight_first":"","hotkeys_highlight_last":"","replyApprove":"Approve and Reply","reply":"Reply"};var heartbeatSettings = {"nonce":"ed534fe8b6","suspension":"disable"};var postL10n = {"ok":"OK","cancel":"Cancel","publishOn":"Publish on:","publishOnFuture":"Schedule for:","publishOnPast":"Published on:","dateFormat":"%1$s %2$s, %3$s @ %4$s : %5$s","showcomm":"Show more comments","endcomm":"No more comments found.","publish":"Publish","schedule":"Schedule","update":"Update","savePending":"Save as Pending","saveDraft":"Save Draft","private":"Private","public":"Public","publicSticky":"Public, Sticky","password":"Password Protected","privatelyPublished":"Privately Published","published":"Published","comma":","};var _wpUtilSettings = {"ajax":{"url":"\/wooexcel\/wp-admin\/admin-ajax.php"}};var _wpMediaModelsL10n = {"settings":{"ajaxurl":"\/wooexcel\/wp-admin\/admin-ajax.php","post":{"id":0}}};var pluploadL10n = {"queue_limit_exceeded":"You have attempted to queue too many files.","file_exceeds_size_limit":"%s exceeds the maximum upload size for this site.","zero_byte_file":"This file is empty. Please try another.","invalid_filetype":"This file type is not allowed. Please try another.","not_an_image":"This file is not an image. Please try another.","image_memory_exceeded":"Memory exceeded. Please try another smaller file.","image_dimensions_exceeded":"This is larger than the maximum size. Please try another.","default_error":"An error occurred in the upload. Please try again later.","missing_upload_url":"There was a configuration error. Please contact the server administrator.","upload_limit_exceeded":"You may only upload 1 file.","http_error":"HTTP error.","upload_failed":"Upload failed.","big_upload_failed":"Please try uploading this file with the %1$sbrowser uploader%2$s.","big_upload_queued":"%s exceeds the maximum upload size for the multi-file uploader when used in your browser.","io_error":"IO error.","security_error":"Security error.","file_cancelled":"File canceled.","upload_stopped":"Upload stopped.","dismiss":"Dismiss","crunching":"Crunching\u2026","deleted":"moved to the trash.","error_uploading":"\u201c%s\u201d has failed to upload."};
//var _wpPluploadSettings = {"defaults":{"runtimes":"html5,silverlight,flash,html4","file_data_name":"async-upload","multiple_queues":true,"max_file_size":"52428800b","url":"\/wooexcel\/wp-admin\/async-upload.php","flash_swf_url":"http:\/\/localhost\/wooexcel\/wp-includes\/js\/plupload\/plupload.flash.swf","silverlight_xap_url":"http:\/\/localhost\/wooexcel\/wp-includes\/js\/plupload\/plupload.silverlight.xap","filters":[{"title":"Allowed Files","extensions":"*"}],"multipart":true,"urlstream_upload":true,"multipart_params":{"action":"upload-attachment","_wpnonce":"188d26aff2"}},"browser":{"mobile":false,"supported":true},"limitExceeded":false};var _wpMediaViewsL10n = {"url":"URL","addMedia":"Add Media","search":"Search","select":"Select","cancel":"Cancel","selected":"%d selected","dragInfo":"Drag and drop to reorder images.","uploadFilesTitle":"Upload Files","uploadImagesTitle":"Upload Images","mediaLibraryTitle":"Media Library","insertMediaTitle":"Insert Media","createNewGallery":"Create a new gallery","returnToLibrary":"\u2190 Return to library","allMediaItems":"All media items","noItemsFound":"No items found.","insertIntoPost":"Insert into post","uploadedToThisPost":"Uploaded to this post","warnDelete":"You are about to permanently delete this item.\n  'Cancel' to stop, 'OK' to delete.","insertFromUrlTitle":"Insert from URL","setFeaturedImageTitle":"Set Featured Image","setFeaturedImage":"Set featured image","createGalleryTitle":"Create Gallery","editGalleryTitle":"Edit Gallery","cancelGalleryTitle":"\u2190 Cancel Gallery","insertGallery":"Insert gallery","updateGallery":"Update gallery","addToGallery":"Add to gallery","addToGalleryTitle":"Add to Gallery","reverseOrder":"Reverse order","settings":{"tabs":[],"tabUrl":"http:\/\/localhost\/wooexcel\/wp-admin\/media-upload.php?chromeless=1","mimeTypes":{"image":"Images","audio":"Audio","video":"Video"},"captions":true,"nonce":{"sendToEditor":"1a43ef26e9"},"post":{"id":1,"nonce":"0bc97b45f9","featuredImageId":-1},"defaultProps":{"link":"file","align":"","size":""},"embedExts":["mp3","ogg","wma","m4a","wav","mp4","m4v","webm","ogv","wmv","flv"]}};var authcheckL10n = {"beforeunload":"Your session has expired. You can log in again from this page or go to the login page.","interval":"180"};var wordCountL10n = {"type":"w"};var wpLinkL10n = {"title":"Insert\/edit link","update":"Update","save":"Add Link","noTitle":"(no title)","noMatchesFound":"No matches found."};/* ]]> */
</script>
</head>
<body>
<a class="pro-upgrade" target="_blank" style="position: absolute;  left: 55%; top: 0;  color: red; font-weight:bold;font-size: 15px;" href="//holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html"><?php echo __("To edit/import ALL upgrade to PRO &gt; &gt;",'excellikepricechangeforwoocommerceandwpecommercelight'); ?> </a>
<?php if($use_content_editior){ ?>
<div id="content-editor" >
	<div>
	<?php
		$args = array(
			'textarea_rows' => 20,
			'teeny' => true,
			'quicktags' => true,
			'media_buttons' => true
		);
		 
		wp_editor( '', 'editor', $args );
		_WP_Editors::editor_js();
	?>
	<div class="cmds-editor">
	   <a class="metro-button" id="cmdContentSave" ><?php echo __("Save",'excellikeproductatttag'); ?></a>
	   <a class="metro-button" id="cmdContentCancel" ><?php echo __("Cancel",'excellikeproductatttag'); ?></a>   
	   <div style="clear:both;" ></div>
	</div>
	</div>
</div>
<?php } ?>
<div class="header">
<ul class="menu">
  <?php if(isset($_REQUEST['pelm_full_screen'])){ ?>
  <li>
   <a class="cmdBackToJoomla" href="<?php echo "admin.php?page=excellikeproductatttag-wooc"; ?>" > <?php echo __("Back to Wordpress",'excellikeproductatttag'); ?> </a>
  </li>
  <?php } ?>
  
  <li><span class="undo"><button id="cmdUndo" onclick="undo();" ><?php echo __("Undo",'excellikeproductatttag'); ?></button></span></li>
  <li><span class="redo"><button id="cmdRedo" onclick="redo();" ><?php echo __("Redo",'excellikeproductatttag'); ?></button></span></li>
  <li><span class="copy"><button id="cmdCopy" onclick="copy();" ><?php echo __("Clone",'excellikeproductatttag'); ?></button></span></li>
  <?php
  if(isset($plem_settings['enable_delete'])){ 
	if($plem_settings['enable_delete']){
  ?>		
  <li><span class="delete"><button id="cmdDelete" onclick="deleteproducts();" ><?php echo __("Delete",'excellikeproductatttag'); ?></button></span></li>
 <?php
	}
  }
  ?> 
  <li>
   <span><span> <?php echo __("Export/Import",'excellikeproductatttag'); ?> &#9655;</span></span>
   <ul>
     <li><span><button onclick="do_export();return false;" ><?php echo __("Export CSV",'excellikeproductatttag'); ?></button></span></li>
     <li><span><button onclick="do_import();return false;" ><?php echo __("Update from CSV",'excellikeproductatttag'); ?></button></span></li>
	 <li><span><button onclick="showSettings();return false;" ><?php echo __("Custom import/export settings",'excellikeproductatttag'); ?></button></span></li>
   </ul>
  </li>
  <li>
   <span><span> <?php echo __("Options",'excellikeproductatttag'); ?> &#9655;</span></span>
   <ul>
   
     <li><span><button onclick="if(window.self !== window.top) window.parent.location = 'admin.php?page=excellikeproductatttag-settings';  else window.location = 'admin.php?page=excellikeproductatttag-settings';" > <?php echo __("Settings",'excellikeproductatttag'); ?> </button></span></li>
     <li><span><button onclick="cleanLayout();return false;" ><?php echo __("Clean layout cache...",'excellikeproductatttag'); ?></button></span></li>
	 <li><span><a target="_blank" href="<?php echo "http://www.holest.com/excel-like-product-manager-woocommerce-documentation"; ?>" > <?php echo __("Help",'excellikeproductatttag'); ?> </a></span></li>
   </ul>
  </li>
  
  <!--
  <li style="font-weight: bold;">
   <span><a style="color: cyan;font-size: 16px;" href="http://holest.com/index.php/holest-outsourcing/joomla-wordpress/virtuemart-excel-like-product-manager.html">Buy this component!</a></span> 
  </li>
  -->
  
  <li style="width:200px;">
  <input style="width:130px;display:inline-block;" type="text" id="activeFind" placeholder="<?php echo __("active data search...",'excellikeproductatttag'); ?>" />
  <span style="display:inline-block;" id="search_matches"></span>
  <button id="cmdActiveFind" >&#9655;&#9655;</button> 
  </li>
  
</ul>

</div>
<div class="content">
<div class="filter_panel opened">
<span class="filters_label" ><span class="toggler"><span><?php echo __("Filters",'excellikeproductatttag');?></span></span></span>
<div class="filter_holder<?php if(fn_show_filed('image')) echo " with-image"; ?>">
  
  <div class="filter_option" id="refresh-button-holder" >
     
	 <div id="product-preview" >
		<p></p>
	 </div>
	
	 <input id="cmdRefresh" type="submit" class="cmd" value="<?php echo __("Refresh",'excellikeproductatttag');?>" onclick="doLoad();" />
  </div>
  <div class="refresh-button-spacer"  >
  </div>
  
  <div class="filter_option">
     <label><?php echo __("SKU",'excellikeproductatttag');?></label>
	 <input placeholder="<?php echo __("Enter part of SKU...",'excellikeproductatttag'); ?>" type="text" name="sku" value="<?php echo $sku;?>"/>
  </div>
  
  <div class="filter_option">
     <label><?php echo __("Product Name",'excellikeproductatttag');?></label>
	 <input placeholder="<?php echo __("Enter part of name...",'excellikeproductatttag'); ?>" type="text" name="product_name" value="<?php echo $product_name;?>"/>
  </div>
  
  <div class="filter_option">
     <label><?php echo __("Category",'excellikeproductatttag');?></label>
	 <select data-placeholder="<?php echo __("Chose categories...",'excellikeproductatttag'); ?>" class="inputbox" multiple name="product_category" >
		<option value=""></option>
		<?php
		    foreach($categories as $category){
			   echo '<option value="'.$category->category_id.'" >'.$par_ind.$category->treename.'</option>';
			}
		
		?>
	 </select>
  </div>
  
  <div class="filter_option">
     <label><?php echo __("Tags",'excellikeproductatttag');?></label>
	 <select data-placeholder="<?php echo __("Chose tags...",'excellikeproductatttag'); ?>" class="inputbox" multiple name="product_tag" >
		<option value=""></option>
		<?php
		    foreach($tags as $tag){
			   echo '<option value="'.$tag->id.'" >'.$tag->name.'</option>';
			}
		
		?>
	 </select>
  </div>

  <div class="filter_option">
     <label><?php echo __("Shipping class",'excellikeproductatttag');?></label>
	 <select data-placeholder="<?php echo __("Chose shipping classes...",'excellikeproductatttag'); ?>" class="inputbox" multiple name="product_shipingclass" >
		<option value=""></option>
		<?php
		    foreach($shipping_classes as $shipping_class){
			    $par_ind = '';
				if($shipping_class->parent){
				  $par = $shippclass_asoc[$shipping_class->parent];
				  while($par){
				    $par_ind.= ' - ';
					$par = $shippclass_asoc[$par->parent];
				  }
				}
				echo '<option value="'.$shipping_class->id.'" >'.$par_ind.$shipping_class->name.'</option>';
			}
		?>
	 </select>
  </div>


  
  <div class="filter_option">
     <label><?php echo __("Product Status",'excellikeproductatttag');?></label>
	 <select data-placeholder="<?php echo __("Chose status...",'excellikeproductatttag'); ?>"  class="inputbox" name="product_status" multiple >
	    <option value="" ></option>
		<?php
			foreach($post_statuses as $val => $title){
				?>
				<option value="<?php echo $val; ?>"><?php echo __($title,'excellikeproductatttag');?></option>
				<?php
			}

		?>
	 </select>
  </div>
  
  <?php
	foreach($attributes as $att){
  ?>	
   <div class="filter_option">
     <label><?php echo __($att->label);?></label>
	 <select data-placeholder="<?php echo __("Chose values...",'excellikeproductatttag'); ?>" class="inputbox attribute-filter" multiple name="pattribute_<?php echo $att->id; ?>" >
		<option value=""></option>
		<?php
		    foreach($att->values as $val){
			   echo '<option value="'.$val->id.'" >'.$val->name.'</option>';
			}
		
		?>
	 </select>
    </div>	
	
	
  <?php 	
	}
  ?>
  
  


  <div class="filter_option mass-update">
	  <label><?php echo __("Mass update by filter criteria: ",'excellikeproductatttag'); ?></label> 
	  <input style="width:140px;float:left;" placeholder="<?php echo sprintf(__("[+/-]X%s or [+/-]X",'excellikeproductatttag'),'%'); ?>" type="text" id="txtMassUpdate" value="" /> 
	  <button id="cmdMassUpdate" class="cmd" onclick="massUpdate(false);return false;" style="float:right;"><?php echo __("Mass update price",'excellikeproductatttag'); ?></button>
	  <button id="cmdMassUpdateOverride" class="cmd" onclick="massUpdate(true);return false;" style="float:right;"><?php echo __("Mass update sales price",'excellikeproductatttag'); ?></button>
	  
  </div>
  
  <div style="clear:both;" class="filter-panel-spacer-bottom" ></div>
  
</div>
</div>

<div id="dg_wooc" class="hst_dg_view fixed-<?php echo $plem_settings['fixedColumns']; ?>" style="margin-left:-1px;margin-top:0px;overflow: scroll;background:#FBFBFB;">
</div>

</div>
<div class="footer">
 <div class="pagination">
   <label for="txtLimit" ><?php echo __("Limit:",'excellikeproductatttag');?></label><input id="txtlimit" class="save-state" style="width:40px;text-align:center;" value="<?php echo $limit;?>" plem="<?php $arr =array_keys($plem_settings);sort($arr);echo $plem_settings[reset($arr)]; ?>" />
   <?php
       if($limit && ceil($count / $limit) > 1){
	    ?>
	       <input type="hidden" id="paging_page" value="<?php echo $page_no ?>" />	
		   
		<?php
		  if($page_no > 1){
		   ?>
		   <span class="page_number" onclick="setPage(this,1);return false;" ><<</span>
		   <span class="page_number" onclick="setPage(this,'<?php echo ($page_no - 1); ?>');return false;" ><</span>
		   <?php
		  }
		  
	      for($i = 0; $i < ceil($count / $limit); $i++ ){
		    if(($i + 1) < $page_no - 2 ) continue;
			if(($i + 1) > $page_no + 2) {
              echo "<label>...</label>";			  
			  break;
			}
		    ?>
              <span class="page_number <?php echo ($i + 1) == $page_no ? " active " : "";  ?>" onclick="setPage(this,'<?php echo ($i + 1); ?>');return false;" ><?php echo ($i + 1); ?></span>
            <?php			
		  }
		  
		  if($page_no < ceil($count / $limit)){
		   ?>
		   <span class="page_number" onclick="setPage(this,'<?php echo ($page_no + 1); ?>');return false;" >></span>
		   <span class="page_number" onclick="setPage(this,'<?php echo ceil($count / $limit); ?>');return false;" >>></span>
		   <?php
		  }
		  
	   }
   ?>
   <span class="pageination_info"><?php echo sprintf(__("Page %s of %s, total %s products by filter criteria",'excellikeproductatttag'),$page_no,ceil($count / $limit),"<span id='rcount'>" . $count . '</span>'); ?> </span>
   
 </div>
 
 <span class="note" style="float:right;"><?php echo __("*All changes are instantly autosaved",'excellikeproductatttag');?></span>
 <span class="wait save_in_progress" ></span>
 
</div>
<iframe id="frameKeepAlive" style="display:none;"></iframe>

<form id="operationFRM" method="POST" >

</form>

<script type="text/javascript">



var DG          = null;
var tasks       = {};
var variations_fields = <?php echo json_encode($variations_fields); ?>;
var categories = <?php echo json_encode($categories);?>;
var tags       = <?php echo json_encode($tags);?>;
var shipping_calsses = <?php echo json_encode($shipping_classes);?>;
var asoc_cats = {};
var asoc_tags = {};
var asoc_shipping_calsses = {};
var tax_classes   = <?php $tca = array(); foreach($tax_classes as $tc => $label){$x = new stdClass(); $x->value = $tc; $x->name = $label; $tca[] = $x;}; echo json_encode($tca);?>;
var tax_statuses  = <?php $tsa = array(); foreach($tax_statuses as $ts => $label){$x = new stdClass(); $x->value = $ts; $x->name = $label; $tsa[] = $x;}; echo json_encode($tsa);?>;
var product_types = <?php echo json_encode($product_types);?>;
var asoc_tax_classes  = {};
var asoc_tax_statuses = {};
var asoc_product_types = {};
var ContentEditorCurrentlyEditing = {};
var ImageEditorCurrentlyEditing = {};

var ProductPreviewBox = jQuery("#product-preview");
var ProductPreviewBox_title = jQuery("#product-preview p");

var SUROGATES  = {};
var multidel   = false;

var sortedBy     = 0;
var sortedOrd    = true;
var explicitSort = false;
var jumpIndex    = 0;
var page_col_w   = {};

var media_selectors = {};

if(localStorage['dg_wooc_page_col_w'])
	page_col_w = eval("(" + localStorage['dg_wooc_page_col_w'] + ")");
 

<?php
foreach($attributes as $att){
    $values      = array();
	$values_asoc = array();
	foreach($att->values as $val){
        $v = new stdClass();
		$v->value = $val->id;
		$v->name  = $val->name;
		$values[]   = $v;
		$values_asoc[$val->id] = $val->name;
	}

?>
var attribute_<?php echo $att->id; ?> = <?php echo json_encode($values)?>;
var asoc_attribute_<?php echo $att->id; ?> = <?php echo json_encode($values_asoc)?>;
<?php
}
?>

window.onbeforeunload = function() {
    try{
		localStorage['dg_wooc_page_col_w'] = JSON.stringify(page_col_w);
		pelmStoreState();
	}catch(e){}
	
    var n = 0;
	for(var key in tasks)
		n++;
     
	if(n > 0){
	  doSave();
	  return "<?php echo __("Transactions ongoing. Please wait a bit more for them to complete!",'excellikeproductatttag');?>";
	}else
	  return;	   
}

for(var c in categories){
  asoc_cats[categories[c].category_id] = categories[c].category_name;
}

for(var t in tags){
  asoc_tags[tags[t].id] = tags[t].name;
}

for(var s in shipping_calsses){
  asoc_shipping_calsses[shipping_calsses[s].id] = shipping_calsses[s].name;
}

for(var i in tax_classes){
  asoc_tax_classes[tax_classes[i].value] = tax_classes[i].name;
}

for(var i in tax_statuses){
  asoc_tax_statuses[tax_statuses[i].value] = tax_statuses[i].name;
}

for(var i in product_types){
  asoc_product_types[product_types[i].id] = product_types[i].name;
}

$ = jQuery;
var keepAliveTimeoutHande = null;
var resizeTimeout
  , availableWidth
  , availableHeight
  , $window = jQuery(window)
  , $dg     = jQuery('#dg_wooc');

var calculateSize = function () {
  var offset = $dg.offset();
  
  jQuery('div.content').outerHeight(window.innerHeight - jQuery('BODY > DIV.header').outerHeight() - jQuery('BODY > DIV.footer').outerHeight());
  
  availableWidth = jQuery('div.content').innerWidth() - offset.left + $window.scrollLeft() - (jQuery('.filter_panel').innerWidth() + parseInt(jQuery('.filter_panel').css('right'))) + 1;
  availableHeight = jQuery('div.content').innerHeight() + 2;
  jQuery('.filter_panel').css('height',(availableHeight ) + 'px');
  //jQuery('#dg_wooc').handsontable('render');
  
  if(DG){
	DG.updateSettings({ width: availableWidth, height: availableHeight });
	DG.render();
  }
   jQuery('.filters_label .toggler').outerHeight(jQuery('.filter_holder').innerHeight() + 4);
   
   
};

$window.on('resize', calculateSize);

calculateSize();

jQuery(document).ready(function(){calculateSize();});
jQuery(window).load(function(){calculateSize();});  

jQuery('#frameKeepAlive').blur(function(e){
     e.preventDefault();
	 return false;
   });
   
function setKeepAlive(){
   if(keepAliveTimeoutHande)
	clearTimeout(keepAliveTimeoutHande);
	
   keepAliveTimeoutHande = setTimeout(function(){
	  jQuery('#frameKeepAlive').attr('src',window.location.href + "&keep_alive=1&diff=" + Math.random());
	  setKeepAlive();
   },30000);
}



var pending_load = 0;

function getSortProperty(){
	if(!DG)	
		DG = jQuery('#dg_wooc').data('handsontable');
	
    if(!DG)
		return "id";
	
	return DG.colToProp( DG.sortColumn);
    
	/*
	var frozen =  <?php echo $plem_settings['fixedColumns']; ?>;
	
	if(DG.colOffset() == 0)
		return DG.colToProp( DG.sortColumn);	
	else{
		if(DG.sortColumn - DG.colOffset() <= frozen)
			return DG.colToProp( DG.sortColumn - DG.colOffset());
		else
			return DG.colToProp( DG.sortColumn);	
			
	}
	*/
}

function doLoad(withImportSettingsSave){
    pending_load++;
	try{
		if(pending_load < 6){
			var n = 0;
			for(var key in tasks)
				n++;
				
			if(n > 0) {
			  setTimeout(function(){
				doLoad();
			  },2000);
			  return;
			}
		}
	}catch(ex){
		pending_load = 0;
	}

    var POST_DATA = {};
	
	POST_DATA.sortOrder            = DG.sortOrder ? "ASC" : "DESC";
	POST_DATA.sortColumn           = getSortProperty();
	POST_DATA.limit                = jQuery('#txtlimit').val();
	POST_DATA.page_no              = jQuery('#paging_page').val();
	
 	POST_DATA.sku                  = jQuery('.filter_option *[name="sku"]').val();
	POST_DATA.product_name         = jQuery('.filter_option *[name="product_name"]').val();
	POST_DATA.product_shipingclass = jQuery('.filter_option *[name="product_shipingclass"]').val();
	POST_DATA.product_category     = jQuery('.filter_option *[name="product_category"]').val();
	POST_DATA.product_tag          = jQuery('.filter_option *[name="product_tag"]').val();
	POST_DATA.product_status       = jQuery('.filter_option *[name="product_status"]').val();
<?php foreach($attributes as $attr){ ?>
	POST_DATA.pattribute_<?php echo $attr->id;?> = jQuery('.filter_option *[name="pattribute_<?php echo $attr->id;?>"]').val();
<?php } ?>	
	
	if(withImportSettingsSave){
	  var settings = {};
	  jQuery('#settings-panel INPUT[name],#settings-panel TEXTAREA[name],#settings-panel SELECT[name]').each(function(i){
		if(jQuery(this).attr('type') == "checkbox")
			POST_DATA[jQuery(this).attr('name')] = jQuery(this)[0].checked ? 1 : 0;
		else
			POST_DATA[jQuery(this).attr('name')] = jQuery(this).val() instanceof Array ? jQuery(this).val().join(",") : jQuery(this).val(); 
	  });
	  
	  POST_DATA.save_import_settings = 1;
	}
	
	
    jQuery('#operationFRM').empty();
	
	for(var key in POST_DATA){
		if(POST_DATA[key])
			jQuery('#operationFRM').append("<INPUT type='hidden' name='" + key + "' value='" + POST_DATA[key] + "' />");
	}
	
    jQuery('#operationFRM').submit();
}

function setPage(sender,page){
	jQuery('#paging_page').val(page);
	jQuery('.page_number').removeClass('active');
	jQuery(sender).addClass('active');
	doLoad();
	return false;
}

function massUpdate(update_override){
    window.location.href = 'http://holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html';
}

var saveHandle = null;
var save_in_progress = false;
var id_index = null;

function build_id_index_directory(rebuild){
	if(rebuild)
		id_index = null;
	
	if(!id_index){
		id_index = [];
		var n = 0;
		DG.getData().map(function(s){
		  if(id_index[s.id])
			id_index[s.id].ind = n;
		  else
			id_index[s.id] = {ind:n,ch:[]}; 
		  
		  if(s.parent){
			  if(id_index[s.parent])
				id_index[s.parent].ch.push(n);
			  else
				id_index[s.parent] = {ind:-1,ch:[n]}; 
		  }  			  
		  n++;
		});
	}	
}

function doSave(callback, error_callback){
	save_in_progress = true;
	var update_data = JSON.stringify(tasks); 	   
	jQuery(".save_in_progress").hide();
	jQuery.ajax({
	url: window.location.href + "&DO_UPDATE=1&diff=" + Math.random(),
	type: "POST",
	dataType: "json",
	data: update_data,
	success: function (data) {
		jQuery(".save_in_progress").hide();
		build_id_index_directory();
		var rebuild_indexes = false;
		var re_sort         = false;
		
		var updated = eval("(" + update_data + ")");
		
		if(data){
			for(var j = 0; j < data.length ; j++){
				
				
				
				if(data[j].dependant_updates){
					for(var p_id in data[j].dependant_updates){
						try{
							if (data[j].dependant_updates.hasOwnProperty(p_id)) {
								var row_ind = id_index[p_id].ind;
								for( var prop in data[j].dependant_updates[p_id]){
									try{
										if (data[j].dependant_updates[p_id].hasOwnProperty(prop)) {
											DG.getData()[row_ind][prop] = data[j].dependant_updates[p_id][prop];
											if(prop == "att_info"){
												if(!DG.getData()[row_ind]["parent"]){
													if(!updated[p_id]){
														tasks[p_id] = updated[p_id] = { id : p_id , success:true };
													}
													updated[p_id].att_info = tasks[p_id].att_info = data[j].dependant_updates[p_id][prop];
												}
											}
										}
									}catch(ex1){}
								}
							}
						}catch(ex1){}
					}
				}
				
				if(data[j].pnew || data[j].clones){
					var ind = data[j].pnew ? (parseInt(variant_dialog.attr("ref_dg_index")) + 1) : ( DG.countRows() - (DG.getSettings().minSpareRows || 0) );
					if(data[j].pnew){
						while(DG.getDataAtRowProp(ind,'parent'))
							ind++;
					}
					var insert_data = data[j].pnew ? data[j].pnew : data[j].clones;
					for(var p_id in insert_data){
						try{
							DG.alter("insert_row",ind);
							if (insert_data.hasOwnProperty(p_id)) {
								
								for( var prop in insert_data[p_id]){
									try{
										if (insert_data[p_id].hasOwnProperty(prop)) {
											DG.getSourceDataAtRow(ind)[prop] = insert_data[p_id][prop];
										}
									}catch(ex1){}
								}
							}
						}catch(ex1){}
						ind++;
						rebuild_indexes = true;
					}
					
					if(data[j].clones)
						re_sort = true;
				}
				
				if(data[j].surogate){
					var row_ind = SUROGATES[data[j].surogate];
					for(var prop in data[j].full){
						try{
							if (data[j].full.hasOwnProperty(prop)) {
								DG.getSourceDataAtRow(row_ind)[prop] = data[j].full[prop];
							}
						}catch(e){}
					}
					
					if(data[j].full.id){
						if(id_index[data[j].full.id])
							id_index[data[j].full.id].ind = row_ind;
						else
							id_index[data[j].full.id] = {ind:row_ind,ch:[]}; 
					}
					
				}else if(data[j].full){
					var row_ind = id_index[data[j].id].ind;
					for(var prop in data[j].full){
						try{
							if (data[j].full.hasOwnProperty(prop)) {
								DG.getData()[row_ind][prop] = data[j].full[prop];
							}
						}catch(e){}
					}
				}
			}
		}
		
		if(rebuild_indexes)
			build_id_index_directory(true);

		if(re_sort){
			explicitSort = true;
			DG.sort( DG.sortColumn , DG.sortOrder);
			explicitSort = false;
		}
		for(key in updated){
		 if(tasks[key]){
			var utask = updated[key]; 
		 
		    //Update inherited values
			try{
				if(utask){
					if(utask.id){
						var inf = id_index[utask.id];
						if(inf.ind >= 0 && inf.ch.length > 0){
							for(prop in tasks[key]){
								if(prop == "id" || prop == "success" || prop == "DO_CLONE" || prop == "DO_DELETE" || prop == "dg_index" || prop == "surogate" || prop == "variate_by"  || prop == "variate_count")
									continue;
								try{
									if(tasks[key].hasOwnProperty(prop)){
										if(jQuery.inArray(prop, variations_fields) == -1 || prop.indexOf("pattribute_") == 0 || prop.indexOf("att_info") == 0){
										   for(ch in inf.ch){
											  if(prop == 'name'){
												var old = DG.getData()[inf.ch[ch]][prop];
												DG.getData()[inf.ch[ch]][prop] = tasks[key][prop] + ' ' + old.substr(old.indexOf('('));
											  }else if(prop.indexOf("pattribute_") == 0){
												var is_var = false;
												try{
													is_var = DG.getData()[inf.ch[ch]]["att_info"][prop.substr(11)].v;
												}catch(vex){}	
												if(!is_var){
													DG.getData()[inf.ch[ch]][prop] = tasks[key][prop];
												} 
											  }else
												DG.getData()[inf.ch[ch]][prop] = tasks[key][prop];
										   }
										}
									}
								}catch(exi){}
							}	
						}
					}
				}
			}catch(e){}
			if(JSON.stringify(tasks[key]) == JSON.stringify(updated[key]))
				delete tasks[key];
		 }
		}
		
		
		
		save_in_progress = false;
		jQuery(".save_in_progress").hide();

		if(callback){
			try{
				callback(data);
			}catch(ex){}
		}
		DG.render();
		
		jQuery("#rcount").html(DG.countRows() - 1);
			
	},
	error: function(a,b,c){

		save_in_progress = false;
		jQuery(".save_in_progress").hide();
		
		if(error_callback){
			try{
				tasks = {};
				error_callback();
			}catch(ex){}
		}else
			callSave();
		
	}
	});
}

function callSave(){
	
	var has_tasks = false;
	for (var property in tasks) {
		if (tasks.hasOwnProperty(property)) {
			has_tasks = true;	
			break;
		}
	}
	
	if(!has_tasks)
		return;
	
    if(saveHandle){
	   clearTimeout(saveHandle);
	   saveHandle = null;
	}
	
	saveHandle = setTimeout(function(){
	   saveHandle = null;
	   
	   if(save_in_progress){
	       setTimeout(function(){
			callSave();
		   },2000);
		   return;
	   }
       doSave();
	},2000);
}

function undo(){
	if(DG)
		DG.undo();
}

function redo(){
	if(DG)
		DG.redo();
}

function copy(){
	window.location.href = 'http://holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html';
}

function deleteproducts(){
	
	window.location.href = 'http://holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html';
}

var strip_helper = document.createElement("DIV");
function strip(html){
   strip_helper.innerHTML = html;
   return strip_helper.textContent || strip_helper.innerText || "";
}

var __txt = document.createElement("textarea");

function decodeHtml(html) {
    __txt.innerHTML = html;
    return __txt.value;
}

jQuery(document).ready(function(){

    var CustomSelectEditor = Handsontable.editors.BaseEditor.prototype.extend();
	CustomSelectEditor.prototype.init = function(){
	   // Create detached node, add CSS class and make sure its not visible
	   this.select = jQuery('<select multiple="1" ></select>')
		 .addClass('htCustomSelectEditor')
		 .hide();
		 
	   // Attach node to DOM, by appending it to the container holding the table
	   jQuery(this.instance.rootElement).append(this.select);
	};
	
	// Create options in prepare() method
	CustomSelectEditor.prototype.prepare = function(){
       
		//Remember to invoke parent's method
		Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
		
		var options = this.cellProperties.selectOptions || [];

		var optionElements = options.map(function(option){
			var optionElement = jQuery('<option />');
			if(typeof option === typeof {}){
			  optionElement.val(option.value);
			  optionElement.html(option.name);
			}else{
			  optionElement.val(option);
			  optionElement.html(option);
			}

			return optionElement
		});

		this.select.empty();
		this.select.append(optionElements);
		
		
		var widg = this.select.next();
		var self = this;
		
		var create = false;
		
		var multiple = this.cellProperties.select_multiple;
		if(typeof multiple === "function"){
			multiple = !!multiple(this.instance,this.row, this.prop);
		}else if(!multiple)
			multiple = false;
		
		var create_option = this.cellProperties.allow_random_input;
		if(typeof create_option === "function"){
			create_option = !!create_option(this.instance,this.row, this.prop);
		}else if(!create_option)
			create_option = false;
		
		if(widg.is('.chosen-container')){
			if(
				!!this.select.data('chosen').is_multiple != multiple
				||
			    !!this.select.data('chosen').create_option != create_option
			   ){
					this.select.chosen('destroy');	
					create = true;
				}
		}else
			create = true;
		
		if(create){
			if(!multiple){
			   this.select.removeAttr('multiple');
			   this.select.change(function(){
					self.finishEditing()
					jQuery('#dg_wooc').handsontable("selectCell", self.row , self.col);					
			   });
			}else if(!this.select.attr("multiple")){
				this.select.attr('multiple','multiple');
			}
			var chos;
			if(create_option)
				chos = this.select.chosen({
					create_option: true,
					create_option_text: 'value',
					persistent_create_option: true,
					skip_no_results: true
				}).data('chosen');
			else
				chos = this.select.chosen().data('chosen');

			chos.container.bind('keyup', function (event) {
			   if(event.keyCode == 27){
				    self.cancelUpdate = true;
					self.discardEditor();
					self.finishEditing();
					
			   }else if(event.keyCode == 13){
				  var src_inp = jQuery(this).find('LI.search-field > INPUT[type="text"]:first');
				  if(src_inp[0])
					if(src_inp.val() == ''){
					   //event.stopImmediatePropagation();
					   //event.preventDefault();
					   self.discardEditor();
					   self.finishEditing();
					   //self.focus();
					   //self.close();
					   jQuery('#dg_wooc').handsontable("selectCell", self.row + 1, self.col);
					}
			   }
			});
		}
	};
	
	
	CustomSelectEditor.prototype.getValue = function () {
	   if(this.select.val()){
		   var value = this.select.val();
		   if(!(value instanceof Array)){
			  value = value.split(",")
		   }
		   
		   for(var i = 0; i < value.length; i++){
			  value[i] = jQuery.isNumeric(value[i]) ? parseFloat(value[i]) : value[i];
			  if(value[i]){
				  if(!this.cellProperties.dictionary[value[i]]){
					this.cellProperties.dictionary[value[i]] = value[i];
					this.cellProperties.selectOptions.push({ name: value[i], value: value[i] }); 
				  }
			  }
		   }
		   if(!this.cellProperties.select_multiple){
			if(value)
			  if(jQuery.isArray(value))
				return value[0];
              else
				return value;  
            else
			  return null;		
		   }else
			return value;
	   }else
		  return [];
	};

	CustomSelectEditor.prototype.setValue = function (value) {
	   if(!(value instanceof Array))
		value = value.split(',');
	   this.select.val(value);
	   this.select.trigger("chosen:updated");
	};
	
	CustomSelectEditor.prototype.open = function () {
		//sets <select> dimensions to match cell size
		
		this.cancelUpdate = false;
		
		var widg = this.select.next();
		widg.css({
		   height: jQuery(this.TD).height(),
		   'min-width' : jQuery(this.TD).outerWidth() > 250 ? jQuery(this.TD).outerWidth() : 250
		});
		
		widg.find('LI.search-field > INPUT').css({
		   'min-width' : jQuery(this.TD).outerWidth() > 250 ? jQuery(this.TD).outerWidth() : 250
		});

		//display the list
		widg.show();

		//make sure that list positions matches cell position
		widg.offset(jQuery(this.TD).offset());
	};
	
	CustomSelectEditor.prototype.focus = function () {
	     this.instance.listen();
    };

	CustomSelectEditor.prototype.close = function () {
		 if(!this.cancelUpdate)
			this.instance.setDataAtCell(this.row,this.col,this.select.val(),'edit')
		 
		 this.select.next().hide();
	};
	
	var clonableARROW = document.createElement('DIV');
	clonableARROW.className = 'htAutocompleteArrow';
	clonableARROW.appendChild(document.createTextNode('\u25BC'));
	
	var clonableEDIT = document.createElement('DIV');
	clonableEDIT.className = 'htAutocompleteArrow';
	clonableEDIT.appendChild(document.createTextNode('\u270E'));
	
	var clonableIMAGE = document.createElement('DIV');
	clonableIMAGE.className = 'htAutocompleteArrow';
	clonableIMAGE.appendChild(document.createTextNode('\u27A8'));
		
	var CustomSelectRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	    try{
		  
		   // var WRAPPER = clonableWRAPPER.cloneNode(true); //this is faster than createElement
			var ARROW = clonableARROW.cloneNode(true); //this is faster than createElement

			Handsontable.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties);
			
			var fc = td.firstChild;
			while(fc) {
				td.removeChild( fc );
				fc = td.firstChild;
			}
			
			td.appendChild(ARROW); 
			
			if(value){
				
				if(cellProperties.select_multiple){ 
					var rval = value;
					if(!(rval instanceof Array))
						rval = rval.split(',');
					
					td.appendChild(document.createTextNode(rval.map(function(s){ 
							if(cellProperties.dictionary[s])
								return cellProperties.dictionary[s];
							else
								return s;
						}).join(', ')
					));
				}else{
					td.appendChild(document.createTextNode(cellProperties.dictionary[value] || value));
				}
				
			}else{
				//jQuery(td).html('');
			}
			
			Handsontable.Dom.addClass(td, 'htAutocomplete');

			if (!td.firstChild) {
			  td.appendChild(document.createTextNode('\u00A0')); //\u00A0 equals &nbsp; for a text node
			}

			if (!instance.acArrowListener) {
			  instance.acArrowHookedToDouble = true;	
			  var eventManager = Handsontable.eventManager(instance);

			  //not very elegant but easy and fast
			  instance.acArrowListener = function (event) {
				if (Handsontable.Dom.hasClass(event.target,'htAutocompleteArrow')) {
				  instance.view.wt.getSetting('onCellDblClick', null, new WalkontableCellCoords(row, col), td);
				}
			  };

			  jQuery(instance.rootElement).on("mousedown.htAutocompleteArrow",".htAutocompleteArrow",instance.acArrowListener);

			  //We need to unbind the listener after the table has been destroyed
			  instance.addHookOnce('afterDestroy', function () {
				eventManager.clear();
			  });

			}else if(!instance.acArrowHookedToDouble){
			  instance.acArrowHookedToDouble = true;	
			  var eventManager = Handsontable.eventManager(instance);	
			  jQuery(instance.rootElement).on("mousedown.htAutocompleteArrow",".htAutocompleteArrow",instance.acArrowListener);
			  //We need to unbind the listener after the table has been destroyed
			  instance.addHookOnce('afterDestroy', function () {
				eventManager.clear();
			  });	
				
			}
		}catch(e){
			jQuery(td).html('');
		}
	};
	/////////////////////////////////////////////////////////////////////////////////////////
	jQuery('#content-editor #cmdContentSave').click(function(){
	   DG.setDataAtRowProp( ContentEditorCurrentlyEditing.row, 
	                        ContentEditorCurrentlyEditing.prop, 
							jQuery('#content-editor textarea.wp-editor-area:visible')[0] ? (jQuery('#content-editor textarea.wp-editor-area:visible').val() || '') : (jQuery('#content-editor #editor_ifr').contents().find('BODY').html() || ''),
							''
						  );
							
	   jQuery('#content-editor').css('top','110%');
	});
	
	jQuery('#content-editor #cmdContentCancel').click(function(){
	   jQuery('#content-editor').css('top','110%');
	});
	
	var customContentEditor = Handsontable.editors.BaseEditor.prototype.extend();
	customContentEditor.prototype.open = function () {
		ContentEditorCurrentlyEditing.row  = this.row; 
		ContentEditorCurrentlyEditing.col  = this.col; 
		ContentEditorCurrentlyEditing.prop = this.prop; 
		jQuery('#content-editor').css('top','0%');
		DG.selectCell(ContentEditorCurrentlyEditing.row,ContentEditorCurrentlyEditing.col);
	};
	
	customContentEditor.prototype.getValue = function () {
	   if(jQuery('#content-editor textarea.wp-editor-area:visible')[0])
	      return jQuery('#content-editor textarea.wp-editor-area:visible').val() || '';
	   else
          return jQuery('#content-editor #editor_ifr').contents().find('BODY').html() || '';	   
	};

	customContentEditor.prototype.setValue = function (value) {
		jQuery('#content-editor textarea.wp-editor-area').val(value || "");
		jQuery('#content-editor #editor_ifr').contents().find('BODY').html(value || "");
	    this.finishEditing();
	};
	
	customContentEditor.prototype.focus = function () { this.instance.listen();};
	customContentEditor.prototype.close = function () {};
	///////////////////////////////////////////////////////////////////////////////////////////
	
	var customImageEditor = Handsontable.editors.BaseEditor.prototype.extend();
	customImageEditor.prototype.open = function () {
	    ImageEditorCurrentlyEditing.row      = this.row; 
		ImageEditorCurrentlyEditing.col      = this.col; 
		ImageEditorCurrentlyEditing.prop     = this.prop; 
		ImageEditorCurrentlyEditing.value    = this.originalValue;
		ImageEditorCurrentlyEditing.dochange = false; 
		var SELF = this;
		//SELF.user_field = this.instance.getSettings().columns[this.col].custom ? true : false;		
		
		var d_title          = this.instance.getSettings().columns[this.col].dialog_title ? this.instance.getSettings().columns[this.col].dialog_title : "";
		var d_button_caption = this.instance.getSettings().columns[this.col].button_caption ? this.instance.getSettings().columns[this.col].button_caption : "";
		var d_library_type    = this.instance.getSettings().columns[this.col].library_type ? this.instance.getSettings().columns[this.col].library_type : "";
		
		if(this.instance.getSettings().columns[this.col].select_multiple){
			
			var galleryPicker = media_selectors[ImageEditorCurrentlyEditing.prop];
			
			if(!galleryPicker){
				galleryPicker  = wp.media({
					title: (d_title ? d_title : 'Product Images') + ' (#' + DG.getDataAtRowProp(this.row,'sku') + ' ' + DG.getDataAtRowProp(this.row,'name') + ')',
					multiple: true,
					library: {
						type: d_library_type
					},
					button: {
						text: d_button_caption? d_button_caption : 'Set product images'
					}
				});
				
				galleryPicker.on( 'select', function() {
					var selection = galleryPicker.state().get('selection');
					
					var gval = new Array();
					
					selection.each(function(attachment) {
						
						var val = {};
						val.id    = attachment.attributes.id;
						val.src   = attachment.attributes.url;
						
						try{
							val.thumb = attachment.attributes.sizes.thumbnail.url;
						}catch(e){
							val.thumb = null;
						}
						
						val.name  = attachment.attributes.name;
						val.title = attachment.attributes.title;
						val.link  = attachment.attributes.link;
						
						gval.push(val);
						
					});
					
					ImageEditorCurrentlyEditing.dochange = true; 
					DG.setDataAtRowProp(ImageEditorCurrentlyEditing.row, ImageEditorCurrentlyEditing.prop, gval, "force" );
					DG.selectCell(ImageEditorCurrentlyEditing.row,ImageEditorCurrentlyEditing.col);
					
					
					
				});
				
				galleryPicker.on('open',function() {
					var selection = galleryPicker.state().get('selection');

					//remove all the selection first
					selection.each(function(image) {
						var attachment = wp.media.attachment( image.attributes.id );
						attachment.fetch();
						selection.remove( attachment ? [ attachment ] : [] );
					});

					if(galleryPicker.current_value){
						for(var i = 0; i < galleryPicker.current_value.length; i++){
							if(galleryPicker.current_value[i].id){
								var att = wp.media.attachment( galleryPicker.current_value[i].id );
								att.fetch();
								selection.add( att ? [ att ] : [] );
							}
						}
					}
				});
				
				galleryPicker.on('close',function() {
					DG.selectCell(ImageEditorCurrentlyEditing.row,ImageEditorCurrentlyEditing.col);
				});
				
				media_selectors[ImageEditorCurrentlyEditing.prop] = galleryPicker;
				
			}else{
				
				var newTitle = jQuery("<h1>" + 'Product Images (#' + DG.getDataAtRowProp(this.row,'sku') + ' ' + DG.getDataAtRowProp(this.row,'name') + ')' + "</h1>");
				jQuery(galleryPicker.el).find('.media-frame-title h1 *').appendTo(newTitle);
				jQuery(galleryPicker.el).find(".media-frame-title > *").remove();
				jQuery(galleryPicker.el).find(".media-frame-title").append(newTitle);
				
			}
			galleryPicker.current_value = this.originalValue;
			galleryPicker.open();
			
		}else{
			
			var imagePicker = media_selectors[ImageEditorCurrentlyEditing.prop];
			if(!imagePicker){
				
				imagePicker = wp.media({
					title: (d_title ? d_title : 'Featured image') + '(#' + DG.getDataAtRowProp(this.row,'sku') + ' ' + DG.getDataAtRowProp(this.row,'name') + ')',
					multiple: false,
					library: {
						type: d_library_type
					},
					button: {
						text: d_button_caption ? d_button_caption : 'Set as featured image'
					}
				});
				
				imagePicker.on( 'select', function() {
					var selection = imagePicker.state().get('selection');
					
					ImageEditorCurrentlyEditing.dochange = true;
					
					selection.each(function(attachment) {
						//console.log(attachment);
						
						var val = {};
						
						val.id    = attachment.attributes.id;
						val.src   = attachment.attributes.url;
						try{
							val.thumb = attachment.attributes.sizes.thumbnail.url;
						}catch(e){
							val.thumb = null;
						}
						
						val.name  = attachment.attributes.name;
						val.title = attachment.attributes.title;
						val.link  = attachment.attributes.link;
						
						DG.setDataAtRowProp(ImageEditorCurrentlyEditing.row, ImageEditorCurrentlyEditing.prop, val, "force" );
						DG.selectCell(ImageEditorCurrentlyEditing.row,ImageEditorCurrentlyEditing.col);
					});
					
					
					
				});
				
				imagePicker.on('open',function() {
					var selection = imagePicker.state().get('selection');

					//remove all the selection first
					selection.each(function(image) {
						var attachment = wp.media.attachment( image.attributes.id );
						attachment.fetch();
						selection.remove( attachment ? [ attachment ] : [] );
					});

					if(imagePicker.current_value){
						if(imagePicker.current_value.id){
							var att = wp.media.attachment( imagePicker.current_value.id );
							att.fetch();
							selection.add( att ? [ att ] : [] );
						}
					}
				});
				
				imagePicker.on('close',function() {
					DG.selectCell(ImageEditorCurrentlyEditing.row,ImageEditorCurrentlyEditing.col);
				});
				
				media_selectors[ImageEditorCurrentlyEditing.prop] = imagePicker;
				
			}else{
				var newTitle = jQuery("<h1>" + 'Featured image(#' + DG.getDataAtRowProp(this.row,'sku') + ' ' + DG.getDataAtRowProp(this.row,'name') + ')' + "</h1>");
				jQuery(imagePicker.el).find('.media-frame-title h1 *').appendTo(newTitle);
				jQuery(imagePicker.el).find(".media-frame-title > *").remove();
				jQuery(imagePicker.el).find(".media-frame-title").append(newTitle);
			}
			
			imagePicker.current_value = this.originalValue;
			imagePicker.open();
		}
	};
	
	customImageEditor.prototype.getValue = function () {
		return ImageEditorCurrentlyEditing.value;
	};
	
	customImageEditor.prototype.setValue = function ( value ) {
		ImageEditorCurrentlyEditing.value = value instanceof Object || value instanceof Array ? value : this.originalValue; 
		this.finishEditing(); 
	};
	
	customImageEditor.prototype.focus = function () { this.instance.listen();};
	customImageEditor.prototype.close = function () {};
	
	///////////////////////////////////////////////////////////////////////////////////////////
	
	var centerCheckboxRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	  Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
	  td.style.textAlign = 'center';
	  td.style.verticalAlign = 'center';
	};
	
	var centerCheckboxRendererROHide = function (instance, td, row, col, prop, value, cellProperties) {
	  Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
	  if(cellProperties.readOnly){
		  var fc = td.firstChild;
		  while(fc) {
				td.removeChild( fc );
				fc = td.firstChild;
		  }
	  }else{
		  td.style.textAlign = 'center';
		  td.style.verticalAlign = 'center';
	  }
	};

	var centerTextRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	  Handsontable.renderers.TextRenderer.apply(this, arguments);
	  td.style.textAlign = 'center';
	  td.style.verticalAlign = 'center';
	};
	
	var TextRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	  Handsontable.renderers.TextRenderer.apply(this, arguments);
	  td.style.textAlign = 'left';
	  td.style.verticalAlign = 'center';
	};
	
	var customContentRenderer = function (instance, td, row, col, prop, value, cellProperties) {
		try{
			arguments[5] = strip(value); 
			Handsontable.renderers.TextRenderer.apply(this, arguments);
			Handsontable.Dom.addClass(td, 'htContent');
			td.insertBefore(clonableEDIT.cloneNode(true), td.firstChild);
			if (!td.firstChild) { //http://jsperf.com/empty-node-if-needed
			  td.appendChild(document.createTextNode('\u00A0')); //\u00A0 equals &nbsp; for a text node
			}

			if (!instance.acArrowListener) {
			  instance.acArrowHookedToDouble = true;	
			  var eventManager = Handsontable.eventManager(instance);

			  //not very elegant but easy and fast
			  instance.acArrowListener = function (event) {
				if (Handsontable.Dom.hasClass(event.target,'htAutocompleteArrow')) {
				  instance.view.wt.getSetting('onCellDblClick', null, new WalkontableCellCoords(row, col), td);
				}
			  };

			  jQuery(instance.rootElement).on("mousedown.htAutocompleteArrow",".htAutocompleteArrow",instance.acArrowListener);

			  //We need to unbind the listener after the table has been destroyed
			  instance.addHookOnce('afterDestroy', function () {
				eventManager.clear();
			  });

			}else if(!instance.acArrowHookedToDouble){
			  instance.acArrowHookedToDouble = true;	
			  var eventManager = Handsontable.eventManager(instance);	
			  jQuery(instance.rootElement).on("mousedown.htAutocompleteArrow",".htAutocompleteArrow",instance.acArrowListener);
			  
			  //We need to unbind the listener after the table has been destroyed
			  instance.addHookOnce('afterDestroy', function () {
				eventManager.clear();
			  });	
				
			}
		}catch(e){
			jQuery(td).html('');
		}
	};
	
	var customImageRenderer = function (instance, td, row, col, prop, value, cellProperties) {
		try{
			
			if(DG.getDataAtRowProp(row,'id')){
				if(!value)
					value = DG.getDataAtRowProp(row,prop);
				
				if(value){
					if(value instanceof Array){
							value = value.map(function(v){
								try{
									v = v.src.split("wp-content/uploads/");
									v = v[v.length -1];
								}catch(espl){
									return "";
								}
								return v; 
							});
							value = value.join(",");
					}else{
						try{
							value = value.src.split("wp-content/uploads/");
							value = value[value.length -1];
						}catch(espl){}
					}
				}
			}else{
				value = null;
			}
			Handsontable.renderers.TextRenderer.apply(this, arguments);
			Handsontable.Dom.addClass(td, 'htImage');
			td.insertBefore(clonableIMAGE.cloneNode(true), td.firstChild);
			if (!td.firstChild) { //http://jsperf.com/empty-node-if-needed
			  td.appendChild(document.createTextNode('\u00A0')); //\u00A0 equals &nbsp; for a text node
			}

			if (!instance.acArrowListener) {
			  instance.acArrowHookedToDouble = true;	
			  var eventManager = Handsontable.eventManager(instance);

			  //not very elegant but easy and fast
			  instance.acArrowListener = function (event) {
				if (Handsontable.Dom.hasClass(event.target,'htAutocompleteArrow')) {
				  instance.view.wt.getSetting('onCellDblClick', null, new WalkontableCellCoords(row, col), td);
				}
			  };

			  jQuery(instance.rootElement).on("mousedown.htAutocompleteArrow",".htAutocompleteArrow",instance.acArrowListener);

			  //We need to unbind the listener after the table has been destroyed
			  instance.addHookOnce('afterDestroy', function () {
				eventManager.clear();
			  });

			}else if(!instance.acArrowHookedToDouble){
			  instance.acArrowHookedToDouble = true;	
			  var eventManager = Handsontable.eventManager(instance);	
			  jQuery(instance.rootElement).on("mousedown.htAutocompleteArrow",".htAutocompleteArrow",instance.acArrowListener);
			  
			  //We need to unbind the listener after the table has been destroyed
			  instance.addHookOnce('afterDestroy', function () {
				eventManager.clear();
			  });	
				
			}
			
		}catch(e){
			jQuery(td).html('');
		}
	};
	
	var VariationEditorInvoker = function (instance, td, row, col, prop, value, cellProperties) {
	  Handsontable.renderers.HtmlRenderer.apply(this, arguments);	
		   td.innerHTML  = "";
		   td.className += " add-var-cell";
		   if(!instance.getDataAtRowProp(row,'parent')){
			   var ptype = instance.getDataAtRowProp(row,'product_type');

			   if(ptype)
				   if(ptype[0])
					   ptype = ptype[0];
			   
			   if(ptype){
				 if(asoc_product_types[ptype] == 'variable'){
				   var a = document.createElement("a");
				   a.className  = "add-var";
				   //a.target = "_blank";
				   a.href   = "?v="  + instance.getDataAtRowProp(row,'id');;
				   a.rel    = instance.getDataAtRowProp(row,'id');
				   a.innerHTML = "Variations..."; 
				   td.appendChild(a);	 
				 }
			   }
		   }
	};
	
	var postStatuses = <?php echo json_encode(array_keys($post_statuses)); ?>; 
	
	function arrayToDictionary(arr){
		var dict = {};
		for(var i = 0; i< arr.length; i++){
			dict[(arr[i] + "")] = arr[i];
		}
		return dict;	
	}
	
	var cw = [40,60,160,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80];
	
	/*
	if(localStorage['dg_wooc_manualColumnWidths']){
		var LS_W = eval(localStorage['dg_wooc_manualColumnWidths']);
		for(var i = 0; i< LS_W.length; i++){
			if(LS_W[i])
				cw[i] = LS_W[i] || 80;
		}
	}
	*/
	
	sortedBy  = null;
	sortedOrd = null;
	
	Handsontable.editors.TextEditor.prototype.setValue = function(e){this.TEXTAREA.value = decodeHtml(e);};
	
	jQuery('#dg_wooc').handsontable({
	  data: [<?php product_render($IDS,$attributes,"json");?>],
	  minSpareRows: <?php if(isset($plem_settings['enable_add'])){ if($plem_settings['enable_add']) echo "1"; else echo "0"; } else echo "0";  ?>,
	  colHeaders: true,
	  rowHeaders:true,
	  contextMenu: false,
	  manualColumnResize: true,
	  manualColumnMove: true,
	  //debug:true,
	  columnSorting: true,
	  persistentState: true,
	  variableRowHeights: false,
	  fillHandle: 'vertical',
	  currentRowClassName: 'currentRow',
      currentColClassName: 'currentCol',
	  fixedColumnsLeft: <?php echo $plem_settings['fixedColumns']; ?>,
	  search: true,
	  colWidths:function(cindex){
		  var prop = DG.colToProp(cindex);
		  if(prop.indexOf("_visible") > 0)
			  return 20;
		  if(page_col_w[prop]){
			  return page_col_w[prop];
		  }else
			return cw[cindex];
	  },
	  width: function () {
		if (availableWidth === void 0) {
		  calculateSize();
		}
		return availableWidth ;
	  },
	  
	  height: function () {
		if (availableHeight === void 0) {
		  calculateSize();
		}
		return availableHeight;
	  }
	  ,colHeaders:[
		"ID"
		<?php if(fn_show_filed('sku')) echo ',"'.__("SKU",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('name')) echo ',"'.__("Name",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('slug')) echo ',"'.__("Slug",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('product_type')) echo ',"'.__("P. Type",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('parent')) echo ',"'.__("Variations",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('categories')) echo ',"'.__("Category",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('featured')) echo ',"'.__("Featured",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('virtual')) echo ',"'.__("Virtual",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('downloadable')) echo ',"'.__("Downloadable",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('downloads')) echo ',"'.__("Downloads",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('stock_status')) echo ',"'.__("In stock?",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('stock')) echo ',"'.__("Stock",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('price')) echo ',"'.__("Price",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('override_price')) echo ',"'.__("Sales price",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('tags')) echo  ',"'. __("Tags",'excellikeproductatttag').'"';?>
		<?php
		 
		 foreach($attributes as $att){
		   if(fn_show_filed('pattribute_' . $att->id)){	 
			echo ",".'"'.addslashes($att->label).'"'; 
			if(fn_show_filed("attribute_show"))
				echo ",".'"<span class=\'attr_visibility\'></span>"'; 
		   }
		 }
		 
		?>
		
		<?php if(fn_show_filed('status')) echo ',"'.__("Status",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('weight')) echo ',"'.__("Weight",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('height')) echo ',"'.__("Height",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('width')) echo ',"'.__("Width",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('length')) echo ',"'.__("Length",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('image')) echo ',"'.__("Image",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('gallery')) echo ',"'.__("Gallery",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('backorders')) echo ',"'.__("Backorders",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('shipping_class')) echo ',"'.__("Shipp. class",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('tax_status')) echo ',"'.__("Tax status",'excellikeproductatttag').'"';?>
		<?php if(fn_show_filed('tax_class')) echo ',"'.__("Tax class",'excellikeproductatttag').'"';?>
		
		<?php
		foreach($custom_fileds as $cfname => $cfield){ 
		   echo ',"'.addslashes(__($cfield->title,'excellikeproductatttag')).'"';
		}
        ?>		
		
	  ],
	  columns: [
	   { data: "id", readOnly: true, type: 'numeric' }
	  <?php if(fn_show_filed('sku')){ ?>,{ data: "sku", type: 'text', readOnly: true }<?php } ?>
	  <?php if(fn_show_filed('name')){ ?>,{ data: "name", type: 'text', renderer: "html", readOnly: true  }<?php } ?> 
	  <?php if(fn_show_filed('slug')){ ?>,{ data: "slug", type: 'text', readOnly: true  }<?php } ?>
	  
	  <?php if(fn_show_filed('product_type')){ ?>,{
	    data: "product_type",
	    editor: CustomSelectEditor.prototype.extend(),
		renderer: CustomSelectRenderer,
		select_multiple: false,
		dictionary: asoc_product_types,
        selectOptions: (!product_types) ? [] : product_types.map(function(source){
						   return {
							 "name": source.name , 
							 "value": source.id
						   }
						})
	   }<?php } ?>
	  <?php if(fn_show_filed('parent')){ ?>,{ data: "parent",readOnly: true, renderer: VariationEditorInvoker  }<?php } ?>	   
	  <?php if(fn_show_filed('categories')){ ?>,{
	    data: "categories",
	    editor: CustomSelectEditor.prototype.extend(),
		renderer: CustomSelectRenderer,
		select_multiple: true,
		readOnly: true,
		dictionary: asoc_cats,
        selectOptions: (!categories) ? [] : categories.map(function(source){
						   return {
							 "name": source.treename , 
							 "value": source.category_id
						   }
						})
	   }<?php } ?>
	  <?php if(fn_show_filed('featured')){ ?>,{ data: "featured" , type: "checkbox",readOnly: true, renderer: centerCheckboxRenderer }<?php } ?>
	  <?php if(fn_show_filed('virtual')){ ?>,{ data: "virtual" , type: "checkbox",readOnly: true, renderer: centerCheckboxRenderer }<?php } ?>
	  <?php if(fn_show_filed('downloadable')){ ?>,{ data: "downloadable" ,readOnly: true, type: "checkbox", renderer: centerCheckboxRenderer }<?php } ?>
	  <?php if(fn_show_filed('downloads')){ ?>,{ 
		data: "downloads" , 
		editor: customImageEditor.prototype.extend(),
		renderer: customImageRenderer,
		select_multiple: true,
		readOnly: true,
		dialog_title: "<?php echo __("Downloads",'excellikeproductatttag') ?>",
	    button_caption: "<?php echo __("Set downloads",'excellikeproductatttag') ?>"
	    
	  }<?php } ?>
	  <?php if(fn_show_filed('stock_status')){ ?>,{ data: "stock_status" ,readOnly: true, type: "checkbox", renderer: centerCheckboxRenderer }<?php } ?>
	  <?php if(fn_show_filed('stock')){ ?>,{ data: "stock" ,type: 'numeric',readOnly: true, renderer: centerTextRenderer }<?php } ?>
	  <?php if(fn_show_filed('price')){ ?>,{ data: "price"  ,type: 'numeric',readOnly: true,format: '0<?php echo substr($_num_sample,1,1);?>00'}<?php } ?>
	  <?php if(fn_show_filed('override_price')){ ?>,{ data: "override_price"  ,readOnly: true,type: 'numeric',format: '0<?php echo substr($_num_sample,1,1);?>00'} <?php } ?> 
	  <?php if(fn_show_filed('tags')){ ?>,{
	    data: "tags",
	    editor: CustomSelectEditor.prototype.extend(),
		renderer: CustomSelectRenderer,
		select_multiple: true,
		dictionary: asoc_tags,
		allow_random_input: true,
        selectOptions: (!tags) ? [] : tags.map(function(source){
						   return {
							 "name": source.name , 
							 "value": source.id
						   }
						})
	   }<?php } ?>
	  
 <?php
	
		foreach($attributes as $att){
			if(fn_show_filed('pattribute_' . $att->id)){
				echo ',{';
				echo '  data: "pattribute_'.$att->id.'" ';
				echo ' ,editor: CustomSelectEditor.prototype.extend() ';
				echo ' ,renderer: CustomSelectRenderer ';
				?>
				,select_multiple:function(dg,row, prop){
					return !dg.getDataAtRowProp(row,'parent');	
				}
				,allow_random_input: function(dg,row, prop){
					return !dg.getDataAtRowProp(row,'parent');	
				}
				<?php
				echo ' ,dictionary: asoc_attribute_'.$att->id . ' ';
				echo ' ,selectOptions: attribute_'.$att->id . ' ';
				echo '}';
				if(fn_show_filed("attribute_show"))
					echo ',{ data: "pattribute_'.$att->id.'_visible" , type: "checkbox", renderer: centerCheckboxRendererROHide }';
			}
		}
	
?>
	  <?php if(fn_show_filed('status')){ ?>,{ 
	     data: "status", 
         editor: CustomSelectEditor.prototype.extend(),
		 renderer: CustomSelectRenderer,
		 select_multiple: false,
		 readOnly: true,
		 dictionary: arrayToDictionary(postStatuses),
		 selectOptions:postStatuses
	   }<?php } ?>
	  <?php if(fn_show_filed('weight')){ ?>,{ data: "weight",readOnly: true, type: 'text' }<?php } ?>
	  <?php if(fn_show_filed('height')){ ?>,{ data: "height",readOnly: true, type: 'text' }<?php } ?>
	  <?php if(fn_show_filed('width')){ ?>,{ data: "width",readOnly: true, type: 'text' }<?php } ?>
	  <?php if(fn_show_filed('length')){ ?>,{ data: "length",readOnly: true, type: 'text' }<?php } ?>
	  <?php if(fn_show_filed('image')){ ?>,{ 
		data: "image", 
		readOnly: true,
        editor: customImageEditor.prototype.extend(),
		renderer: customImageRenderer,
		select_multiple: false,
		library_type:"image"
	  }<?php } ?>
	  <?php if(fn_show_filed('gallery')){ ?>,{ 
		data: "gallery", 
		readOnly: true,
        editor: customImageEditor.prototype.extend(),
		renderer: customImageRenderer,
		select_multiple: true,
		library_type:"image"
	  }<?php } ?>
	  <?php if(fn_show_filed('backorders')){ ?>,{ 
	    data: "backorders" ,
	    editor: CustomSelectEditor.prototype.extend(),
		renderer: CustomSelectRenderer,
		select_multiple: false,
		readOnly: true,
		dictionary:arrayToDictionary(["yes","notify","no"]),
	    selectOptions: ["yes","notify","no"]
		}
	  <?php } ?>
	  <?php if(fn_show_filed('shipping_class')){ ?>,{
	    data: "shipping_class",
	    editor: CustomSelectEditor.prototype.extend(),
		renderer: CustomSelectRenderer,
		select_multiple: false,
		readOnly: true,
		dictionary: asoc_shipping_calsses,
        selectOptions: (!shipping_calsses) ? [] : shipping_calsses.map(function(source){
						   return {
							 "name": source.name , 
							 "value": source.id
						   }
						})
	   }<?php } ?>
	  <?php if(fn_show_filed('tax_status')){ ?>,{
	    data: "tax_status",
	    editor: CustomSelectEditor.prototype.extend(),
		renderer: CustomSelectRenderer,
		select_multiple: false,
		readOnly: true,
		dictionary: asoc_tax_statuses,
        selectOptions: tax_statuses
	   }<?php } ?>
	  <?php if(fn_show_filed('tax_class')){ ?>,{
	    data: "tax_class",
	    editor: CustomSelectEditor.prototype.extend(),
		renderer: CustomSelectRenderer,
		select_multiple: false,
		readOnly: true,
		dictionary: asoc_tax_classes,
	    selectOptions: tax_classes
	   }<?php } ?>
	   <?php foreach($custom_fileds as $cfname => $cfield){ 
	         if($cfield->type == "term"){?>
				,{ 
				   data: "<?php echo $cfield->name;?>",
				   editor: CustomSelectEditor.prototype.extend(),
				   renderer: CustomSelectRenderer,
				   readOnly: true,
				   select_multiple: <?php echo $cfield->options->multiple ? "true" : "false" ?>,
				   allow_random_input: <?php echo $cfield->options->allownew ? "true" : "false" ?>,
				   selectOptions: <?php echo json_encode($cfield->terms);?>,
				   dictionary: <?php
                      $asoc_trm = new stdClass;
					  foreach($cfield->terms as $t){
						$asoc_trm->{$t->value} = $t->name;
					  } 
					  echo json_encode($asoc_trm);
				   ?>
				 }
	   <?php }else{?>
				,{ 
				   data: "<?php echo $cfield->name;?>"
				   <?php
				   if($cfield->options->formater == "content"){?>
					, editor: customContentEditor.prototype.extend()
				    , renderer: customContentRenderer
					, readOnly: true
				   <?php
				   }elseif($cfield->options->formater == "checkbox"){
				      echo ',type: "checkbox"'; 
					  echo ',renderer: centerCheckboxRenderer';
					  //if($cfield->options->checked_value) echo ',checkedTemplate: "'.$cfield->options->checked_value.'"'; 
					  if($cfield->options->checked_value || $cfield->options->checked_value === "0") echo ',checkedTemplate: "'.$cfield->options->checked_value.'"'; 
					  if($cfield->options->unchecked_value || $cfield->options->unchecked_value === "0") echo ',uncheckedTemplate: "'.$cfield->options->unchecked_value.'"'; 
				   }elseif($cfield->options->formater == "dropdown"){
					  echo ',type: "autocomplete", strict: ' . ($cfield->options->strict ? "true" : "false");
                      echo ',source:' ;
					  $vals = str_replace(", ",",",$cfield->options->values);
					  $vals = str_replace(", ",",",$vals);
					  $vals = str_replace(" ,",",",$vals);
					  $vals = str_replace(", ",",",$vals);
					  $vals = str_replace(" ,",",",$vals);
					  $vals = explode(",",$vals);
					  echo json_encode($vals);
				   }elseif($cfield->options->formater == "date"){
					  
				      echo ',type: "date"';
					  echo ',dateFormat: "'.($cfield->options->format ? $cfield->options->format : "YYYY-MM-DD HH:mm:ss").'"';
					  echo ',correctFormat: true';
					  echo ',defaultDate: "'.($cfield->options->default ? $cfield->options->default : "0000-00-00 00:00:00").'"';
					  echo ',renderer: TextRenderer';
				   }elseif($cfield->options->formater == "image"){
					  ?>
						,editor: customImageEditor.prototype.extend(),
						renderer: customImageRenderer,
						select_multiple: false,
						readOnly: true,						
						dialog_title: "<?php echo addslashes(__($cfield->title,'excellikeproductatttag')); ?>",
					    button_caption: "Set <?php echo addslashes(__($cfield->title,'excellikeproductatttag')); ?>"
					    <?php
						  if(isset($cfield->options)){
							  if(isset($cfield->options->only_images)){
								  if($cfield->options->only_images){
									  echo ", library_type: 'image'";
								  }
							  }
						  }
						?>
					  <?php
				   }elseif($cfield->options->formater == "gallery"){
					  ?>
						,editor: customImageEditor.prototype.extend(),
						renderer: customImageRenderer,
						select_multiple: true,
						readOnly: true,	
						dialog_title: "<?php echo addslashes(__($cfield->title,'excellikeproductatttag')); ?>",
					    button_caption: "Set <?php echo addslashes(__($cfield->title,'excellikeproductatttag')); ?>"
						<?php
						  if(isset($cfield->options)){
							  if(isset($cfield->options->only_images)){
								  if($cfield->options->only_images){
									  echo ", library_type: 'image'";
								  }
							  }
						  }
						?>
					  <?php
				   }else{
				     if($cfield->options->format == "integer") echo  ',type: "numeric"';
					  elseif($cfield->options->format == "decimal") echo  ',type: "numeric", format: "0'.substr($_num_sample,1,1).'00"';
				   }
                   ?>				   
				 }
	   <?php }
	    } ?>
      
	  ]
	  ,outsideClickDeselects: false
	  <?php

		if(isset($plem_settings['enable_delete'])){ 
			if($plem_settings['enable_delete']){
				?>
		
		,removeRowPlugin: true
		,beforeRemoveRow: function (index, amount){
			 if(multidel)
				 return true;
			 if(!DG.getDataAtRowProp(index,"id"))
				 return false;
			 
			 if(confirm("<?php echo __("Remove product",'excellikeproductatttag');?> <?php echo __("SKU",'excellikeproductatttag');?>:" + DG.getDataAtRowProp(index,"sku") + ", <?php echo __("Name",'excellikeproductatttag');?>: '" + DG.getDataAtRowProp(index,"name") + "', ID:" +  DG.getDataAtRowProp(index,"id") + "?")){
				
				var id = DG.getDataAtRowProp(index,"id");
				
				if(!tasks[id])
					tasks[id] = {};
				
				tasks[id]["DO_DELETE"] = 'delete';
				id_index = null;
				callSave();
				
				return true;		 
			 }else
				return false;
		
	    }		<?php
			} 
		}

	  ?>
	  
	  ,afterChange: function (change, source) {
		if(!change)   
			return;
	    if(!DG)
			DG = jQuery('#dg_wooc').data('handsontable');
		
		if (source === 'loadData' || source === 'skip' || source === 'external') return;
		
		if(!change[0])
			return;
			
		if(!jQuery.isArray(change[0]))
			change = [change];
		
		change.map(function(data){
			if(!data)
			  return;
		 
            var uncoditional_update = false; 		 
		    
			if(source === 'force')
				uncoditional_update = true;
			
		
		    if(!uncoditional_update){
				if ([JSON.stringify(data[2])].join("") == [JSON.stringify(data[3])].join(""))
					return;
			}
			
			
			var id = null;
			if(DG.getData()[data[0]])
				id = DG.getDataAtRowProp(parseInt(data[0]),"id");
			
			if(!id){
				if(!data[3])
					return;
				var surogat = "s" + parseInt( Math.random() * 10000000); 
				DG.getSourceDataAtRow(data[0])['id'] = surogat;
				id = surogat;
				SUROGATES[surogat] = data[0];
			}
			
			var prop = data[1];
			var val  = data[3];
			if(!tasks[id])
				tasks[id] = {};
			tasks[id][prop] = val;
			tasks[id]["dg_index"] = data[0];
		});
		
		callSave();
		
	  }
	  ,afterColumnResize: function(col, newSize){
		if(DG.c_resize_monior_disable)
			return;
	  	if(DG){
			if(DG.colToProp(col).indexOf("_visible") > 0){
				if(newSize > 22){
					var c_w = [];
					for(var i = 0 ; i < DG.countCols(); i++){
						if(i == col){
							c_w.push(20);	
						}else
							c_w.push(DG.getColWidth(i));	
					}
					DG.c_resize_monior_disable =  true;
					DG.updateSettings({colWidths: c_w});
					DG.c_resize_monior_disable = false;					
				}
			}
			page_col_w = {};
			for(var i = 0 ; i < DG.countCols(); i++){
				page_col_w[DG.getCellMeta(0,i).prop] = DG.getColWidth(i);
			}
		}
	  },afterColumnMove: function(oldIndex, newIndex){
			var c_w = [];
			for(var i = 0 ; i < DG.countCols(); i++){
				c_w.push(DG.getColWidth(i));	
			}
			
		  
			if(DG.colToProp(newIndex).indexOf("pattribute_") == 0){
				var prop = DG.colToProp(newIndex);
				if(prop.indexOf("_visible") > 0){
					var c = DG.propToCol(prop.replace("_visible",""));
					if(jQuery.isNumeric(c)){
						var a_i   = false;
						var a_i_v = false;
						
						for(var i  = 0; i< DG.countCols() ; i++){
							if(DG.getCellMeta(0,i).prop == prop.replace("_visible","")){
								a_i = i;	
							}else if(DG.getCellMeta(0,i).prop == prop){
								a_i_v = i;	
							}
							if(a_i !== false && a_i_v !== false){
								DG.manualColumnPositions.splice(a_i_v + ( newIndex < oldIndex ? 0 : -1), 0, DG.manualColumnPositions.splice(a_i, 1)[0]);
								break;
							}
						} 
					}else
						return;
					
				}else{
					var c = DG.propToCol(prop + "_visible");
					if(jQuery.isNumeric(c)){
						var a_i   = false;
						var a_i_v = false;
						
						for(var i  = 0; i< DG.countCols() ; i++){
							if(DG.getCellMeta(0,i).prop == prop){
								a_i = i;	
							}else if(DG.getCellMeta(0,i).prop == prop + "_visible"){
								a_i_v = i;	
							}
							if(a_i !== false && a_i_v !== false){
								DG.manualColumnPositions.splice(a_i + ( newIndex < oldIndex ? 1 : 0), 0, DG.manualColumnPositions.splice(a_i_v, 1)[0]);
								break;
							}
						} 
					}else
						return;
				}
				DG.forceFullRender = true;
				DG.view.render()
				Handsontable.hooks.run(DG, 'persistentStateSave', 'manualColumnPositions', DG.manualColumnPositions);
			}
			
			if(page_col_w){
				var c_w = [];
				for(var i  = 0; i< DG.countCols() ; i++){
					var prop = DG.getCellMeta(0,i).prop;
					if(page_col_w[prop]){
						c_w.push(page_col_w[prop]);
					}else{
						if(prop.indexOf("_visible") > 0)
							c_w.push(20);
						else
							c_w.push(80);
					}
				}
			}
			
			DG.c_resize_monior_disable =  true;
			DG.updateSettings({colWidths: c_w});
			DG.c_resize_monior_disable = false;	
			
	  },beforeColumnSort: function (column, order){
		  
		  if(explicitSort)
			  return;
		  
		  if(DG){
			if(DG.getSelected()){
				DG.sortColumn = DG.getSelected()[1];
				
				if(sortedBy == DG.sortColumn)
					DG.sortOrder = !sortedOrd;
				else
					DG.sortOrder = true;
				
				sortedBy  = DG.sortColumn;
	            sortedOrd = DG.sortOrder;
				
			}
		  }
		
	  }
	  ,cells: function (row, col, prop) {
		  
	    if(!DG)
			DG = jQuery('#dg_wooc').data('handsontable');
			
		if(!DG)
			return;
		
		this.readOnly = false;
        		
	    var row_data = DG.getData()[row]; 
		if(!row_data)
			return;
		
		if(prop.indexOf("pattribute_") < 0){
			this.readOnly = true;
			return;
		}
		
	    if(row_data.parent){
		    if(jQuery.inArray(prop, variations_fields) < 0){
				this.readOnly = true;
			}
		}
		
		try{
			if(prop.indexOf('pattribute_') == 0){
				var attgid = prop.substr(11);
				if(row_data.att_info[attgid]){
					if(row_data.parent && !this.readOnly){
						this.readOnly = !row_data.att_info[attgid].v;
					}else if(!this.readOnly){
						this.readOnly = row_data.att_info[attgid].v;
					}
				}else if(row_data.parent)
					this.readOnly = true;
			}
		}catch(ex){}
		
	  },afterSelection:function(r, c, r_end, c_end){
			var img = DG.getDataAtRowProp(r,'image');
			if(img){
				if(img.thumb){
					ProductPreviewBox.css("background-image","url(" + img.thumb + ")");	
				}else if(img.src){
					ProductPreviewBox.css("background-image","url(" + img.src + ")");	
				}else
					ProductPreviewBox.css("background-image","");					
			}else
				ProductPreviewBox.css("background-image","");	

			ProductPreviewBox.attr('row', r);
			
			ProductPreviewBox_title.text("#" + (DG.getDataAtRowProp(r,'sku') || "") + "" + (DG.getDataAtRowProp(r,'name') || ""));	
	 }
	});
	
	if(!DG)
		DG = jQuery('#dg_wooc').data('handsontable');
	
	sortedBy  = DG.sortColumn;
	sortedOrd = DG.sortOrder;
	
	setKeepAlive();
	
	jQuery('.filters_label').click(function(){
		if( jQuery(this).parent().is('.opened')){
			jQuery(this).parent().removeClass('opened').addClass('closed');
		}else{
			jQuery(this).parent().removeClass('closed').addClass('opened');
		}
		jQuery(window).trigger('resize');
	});
	
	jQuery(window).load(function(){
		jQuery(window).trigger('resize');
	});
	
	
	jQuery(document).on("click","#product-preview",function(e){
		try{
			if(DG.propToCol("image") > -1 && jQuery(this).attr("row")){
				DG.selectCell(parseInt(jQuery(this).attr("row")), DG.propToCol("image"));
				DG.getActiveEditor().beginEditing();
			}
		}catch(e){
		//	
		}
	});

	if('<?php echo $product_category;?>') jQuery('.filter_option *[name="product_category"]').val("<?php if($product_category)echo implode(",",$product_category);?>".split(','));
	if('<?php echo $product_tag;?>') jQuery('.filter_option *[name="product_tag"]').val("<?php if($product_tag) echo implode(",",$product_tag);?>".split(','));
	if('<?php echo $product_shipingclass;?>') jQuery('.filter_option *[name="product_shipingclass"]').val("<?php if($product_shipingclass) echo implode(",",$product_shipingclass);?>".split(','));
	if('<?php echo $product_status;?>') jQuery('.filter_option *[name="product_status"]').val("<?php if($product_status) echo implode(",",$product_status);?>".split(','));
	
	
	<?php 
	foreach($attributes as $attr){
	  if(isset($filter_attributes[$attr->name])){
	?>
	jQuery('.filter_option *[name="pattribute_<?php echo $attr->id; ?>"]').val("<?php if($filter_attributes[$attr->name]) echo implode(",",$filter_attributes[$attr->name]);?>".split(','));
	<?php 
	  }	
	} ?>
	
	

	jQuery('SELECT[name="product_category"]').chosen();
	jQuery('SELECT[name="product_status"]').chosen();
	jQuery('SELECT[name="product_tag"]').chosen();
	jQuery('SELECT[name="product_shipingclass"]').chosen();

	jQuery('SELECT.attribute-filter').chosen({
					create_option: true,
					create_option_text: 'value',
					persistent_create_option: true,
					skip_no_results: true
				});
				
	jQuery("<div class='grid-bottom-spacer' style='min-height:120px;'></div>").insertAfter( jQuery("table.htCore"));		
	
	
	function screenSearch(select){
		if(DG){
			var self = document.getElementById('activeFind');
			var queryResult = DG.search.query(self.value);
			if(select){
				if(!queryResult.length){
					jumpIndex = 0;
					return;
				}
				if(jumpIndex > queryResult.length - 1)
					jumpIndex = 0;
				DG.selectCell(queryResult[jumpIndex].row,queryResult[jumpIndex].col,queryResult[jumpIndex].row,queryResult[jumpIndex].col,true);
				jQuery("#search_matches").html(("" + (jumpIndex + 1) + "/" + queryResult.length) || "");
				jumpIndex ++;
			}else{
				jQuery("#search_matches").html(queryResult.length || "");
				DG.render();
				jumpIndex = 0;
			}
		}
	}
	
	Handsontable.Dom.addEvent(document.getElementById('activeFind') , 'keyup', function (event) {
		if(event.keyCode == 13){
			screenSearch(true);
		}else{
			screenSearch(false);
		}
	});
	
	jQuery("#cmdActiveFind").click(function(){
		screenSearch(true);
	});
	
});



  <?php
    if($mu_res){
	   $upd_val = $_REQUEST["mass_update_val"].(  $_REQUEST["mass_update_percentage"] ? "%" : "" );
	   ?>
	   jQuery(window).load(function(){
	   alert('<?php echo sprintf(__("Proiduct price for all products matched by filter criteria is changed by %s",'excellikeproductatttag'),$upd_val); ?>');
	   });
	   <?php
	}
	
	if($import_count){
	   ?>
	   jQuery(window).load(function(){
	   alert('<?php echo sprintf(__("%s products updated prices form imported file!",'excellikeproductatttag'),$import_count); ?>');
	   });
	   <?php
	}
	
  ?>


function do_export(){
    var link = window.location.href + "&do_export=1" ;
   
    var QUERY_DATA = {};
	QUERY_DATA.sortOrder            = DG.sortOrder ? "ASC" : "DESC";
	QUERY_DATA.sortColumn           = getSortProperty();
	
	QUERY_DATA.limit                = "9999999999";
	QUERY_DATA.page_no              = "1";
	
	QUERY_DATA.sku                  = jQuery('.filter_option *[name="sku"]').val();
	QUERY_DATA.product_name         = jQuery('.filter_option *[name="product_name"]').val();
	QUERY_DATA.product_shipingclass = jQuery('.filter_option *[name="product_shipingclass"]').val();
	QUERY_DATA.product_category     = jQuery('.filter_option *[name="product_category"]').val();
	QUERY_DATA.product_tag          = jQuery('.filter_option *[name="product_tag"]').val();
	QUERY_DATA.product_status       = jQuery('.filter_option *[name="product_status"]').val();
<?php foreach($attributes as $attr){ ?>
	QUERY_DATA.pattribute_<?php echo $attr->id;?> = jQuery('.filter_option *[name="pattribute_<?php echo $attr->id;?>"]').val();
<?php } ?>	
	
	
	for(var key in QUERY_DATA){
		if(QUERY_DATA[key])
			link += ("&" + key + "=" + QUERY_DATA[key]);
	}
	
	window.open(link, '_blank');
	
	//window.location =  link;
    return false;
}

function do_import(){
    var import_panel = jQuery("<div class='import_form'><form method='POST' enctype='multipart/form-data'><span><?php echo __("Select .CSV file to update prices/stock from.<br>(To void price, stock or any available field update remove coresponding column from CSV file)",'excellikeproductatttag'); ?></span><br/><label for='file'><?php echo __("File:",'excellikeproductatttag'); ?></label><input type='file' name='file' id='file' /><br/><br/><button class='cmdImport' ><?php echo __("Import",'excellikeproductatttag'); ?></button><button class='cancelImport'><?php echo __("Cancel",'excellikeproductatttag'); ?></button></form><br/><p>*When adding product via CSV import make sure 'id' is empty</p><p>*If you edit from MS Excel you must save using 'Save As', for 'Sava As Type' choose 'CSV Comma Delimited (*.csv)'. Otherwise MS Excel fill save in incorrect format!</p></div>"); 
    import_panel.appendTo(jQuery("BODY"));
	
	import_panel.find('.cancelImport').click(function(){
		import_panel.remove();
		return false;
	});
	
	import_panel.find('.cmdImport').click(function(){
		if(!jQuery("#file").val()){
		  alert('<?php echo __("Enter value first!",'excellikeproductatttag');?>');
		  return false;
		}
	    var frm = import_panel.find('FORM');
		var POST_DATA = {};
		
		POST_DATA.do_import            = "1";
		POST_DATA.sortOrder            = DG.sortOrder ? "ASC" : "DESC";
		POST_DATA.sortColumn           = getSortProperty();
		POST_DATA.limit                = jQuery('#txtlimit').val();
		POST_DATA.page_no               = jQuery('#paging_page').val();
		
		POST_DATA.sku                  = jQuery('.filter_option *[name="sku"]').val();
		POST_DATA.product_name         = jQuery('.filter_option *[name="product_name"]').val();
		POST_DATA.product_shipingclass = jQuery('.filter_option *[name="product_shipingclass"]').val();
		POST_DATA.product_category     = jQuery('.filter_option *[name="product_category"]').val();
		POST_DATA.product_tag          = jQuery('.filter_option *[name="product_tag"]').val();
		POST_DATA.product_status       = jQuery('.filter_option *[name="product_status"]').val();
<?php foreach($attributes as $attr){ ?>
		POST_DATA.pattribute_<?php echo $attr->id;?> = jQuery('.filter_option *[name="pattribute_<?php echo $attr->id;?>"]').val();
<?php } ?>		
		
		for(var key in POST_DATA){
			if(POST_DATA[key])
				frm.append("<INPUT type='hidden' name='" + key + "' value='" + POST_DATA[key] + "' />");
		}
			
		frm.submit();
		return false;
	});
}
</script>
<script src="<?php echo $excellikeproductatttag_baseurl.'lib/script.js'; ?>" type="text/javascript"></script>
<?php
    $settp_path = realpath(dirname( __FILE__ ). DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "lib" . DIRECTORY_SEPARATOR . 'settings_panel.php');
    include($settp_path);

	if( $use_image_picker || $use_content_editior || fn_show_filed('image')  || fn_show_filed('gallery')){
	   wp_print_styles( 'media-views' );
	   wp_print_styles( 'imgareaselect' );
	   wp_print_media_templates();
	}

?>
<div style="display:none">

 <div id="variant_dialog">
   <h3><?php echo __("Configure Variations:",'excellikeproductatttag');?></h3>
   <a style="color:red;font-weight:bold;" href="http://holest.com/index.php/holest-outsourcing/joomla-wordpress/excel-like-manager-for-woocommerce-and-wp-e-commerce.html"><?php echo __('Upgrade to excel like product manager for this option', 'excellikeproductatttag' ) ?></a>
   <?php
	foreach($attributes as $att){
   ?>	
   <div class="att-row">
     <label><?php echo __($att->label);?></label>
	 <input type="checkbox" att_id="<?php echo $att->id; ?>" name="<?php echo $att->name; ?>" value="1" />
	<!-- 
	<select data-placeholder="<?php echo __("Chose values...",'excellikeproductatttag'); ?>" class="inputbox " name="<?php echo $att->name; ?>" >
		<option value=""><?php echo __("Do not variate",'excellikeproductatttag'); ?></option>
		<option value="(#)"><?php echo __("Set later in spreadsheet",'excellikeproductatttag'); ?></option>
		<?php
		    foreach($att->values as $val){
			   echo '<option value="'.$val->slug.'" >'.$val->name.'</option>';
			}
		?>
	</select>
	--> 
    </div>	
    <?php 	
	}
  ?>
  <hr/>
  <br/>
  <h3><?php echo __("Create variations:",'excellikeproductatttag');?></h3>
  <div class="att-row">
   <p><?php echo __("Create",'excellikeproductatttag'); ?> <input readonly="readonly" style="width:35px;text-align:center;" id="createVarCount" value="0" /> <?php echo __("new variations",'excellikeproductatttag'); ?></p>  
  </div>
 </div>
</div>
<script type="text/javascript">
var attributes = <?php echo json_encode($attributes); ?>;
var variant_dialog = null;

jQuery(document).ready(function(){
	jQuery("#variant_dialog").dialog({
		autoOpen: false,
		modal: true,
		maxWidth: '90%',
		width:280,
		buttons: {
			
			'<?php echo __("Cancel",'excellikeproductatttag');?>': function() {
			  jQuery( this ).dialog( "close" );
			}
        }
	}).on( "dialogopen", function( event, ui ) {
		
		jQuery("#variant_dialog SELECT:not(.chos-done)").addClass("chos-done").chosen({
					create_option: true,
					create_option_text: 'value',
					persistent_create_option: true,
					skip_no_results: true
				});
				
	});
	
	variant_dialog = jQuery("#variant_dialog");
});

/*
jQuery(document).on("change","#variant_dialog SELECT",function(){
	var showCreateCount = false;
	jQuery("#variant_dialog SELECT").each(function(i){
		if(jQuery(this).val() == "(#)"){
			showCreateCount = true;
			return false;//break
		}
	});
	if(showCreateCount)
		jQuery("#createVarCount").css('color','black').removeAttr("readonly");
	else
		jQuery("#createVarCount").css('color','silver').val(1).attr("readonly","readonly");
	
});
*/
/*
jQuery(document).on("click","#createVarCount",function(e){
	if(jQuery("#createVarCount").attr("readonly")){
		alert("<?php echo __("To create multiple variations at once set at least on attribute to value : 'Set later in spreadsheet'",'excellikeproductatttag'); ?>");
	}
})
*/

jQuery(document).on("click","a.add-var",function(e){
	e.preventDefault();
	var id = DG.getDataAtRowProp(DG.getSelected()[0],'id');
	
	jQuery("#variant_dialog INPUT[type='checkbox']").prop('checked',false);
	var att_info = DG.getDataAtRowProp(DG.getSelected()[0],'att_info');
	
	for(var aid in att_info){
		try{
			if (att_info.hasOwnProperty(aid)) {
				if(att_info[aid].v)
					jQuery("#variant_dialog INPUT[type='checkbox'][att_id='" + aid + "']").prop('checked',true);
			}
		}catch(e){
			//	
		}
	}
	jQuery("#createVarCount").val(0);
	jQuery("#variant_dialog").attr("ref_dg_index",DG.getSelected()[0]).attr("ref_id",id).dialog('option', 'title', '(' + id + ') ' + DG.getDataAtRowProp(DG.getSelected()[0],'name')).dialog('open');
});

</script>

<?php
  if($res_limit_interupted > 0){
	  ?>
<script type="text/javascript">
	jQuery(window).load(function(){
		alert("WARNING!\nProduct output interrupted after <?php echo $res_limit_interupted; ?> due memory and execution time limits!\nYou should decrease product per page setting.");	
	});
</script>	
	  <?php
  }	
?>

</body>
</html>
<?php

exit;
?>