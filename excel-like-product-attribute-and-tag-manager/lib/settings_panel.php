<?php

  if(!isset($plem_settings[$elpm_shop_com.'_custom_import_settings'])){
	$isettings = new stdClass();
	$isettings->use_custom_import      = 0;
        $isettings->use_custom_export      = 0;
	
	$isettings->onimportstatus_overide = 0;
	$isettings->notfound_setpending    = '';
	
	$isettings->first_row_header       = 1;
	$isettings->custom_import_columns  = "";
        $isettings->custom_export_columns  = "";
	$isettings->german_numbers         = 0;
	$isettings->delimiter              = ','; 
        $isettings->delimiter2              = ',';
	$isettings->allow_remote_import    = 0;
	$isettings->remote_import_ips      = ''; 
    $plem_settings[$elpm_shop_com.'_custom_import_settings'] = $isettings;
	$this->saveOptions();
  }else
	$isettings = $plem_settings[$elpm_shop_com.'_custom_import_settings'];
	
  if(isset($_REQUEST['save_import_settings']) && strtoupper($_SERVER['REQUEST_METHOD']) === 'POST'){
	$isettings->use_custom_import      = $_REQUEST['use_custom_import'];
        $isettings->use_custom_export      = $_REQUEST['use_custom_export'];
	$isettings->onimportstatus_overide = $_REQUEST['onimportstatus_overide'];
	$isettings->notfound_setpending    = $_REQUEST['notfound_setpending'];
	$isettings->first_row_header       = $_REQUEST['first_row_header'];
	$isettings->custom_import_columns  = $_REQUEST['custom_import_columns'];
        $isettings->custom_export_columns  = $_REQUEST['custom_export_columns'];
	$isettings->german_numbers         = $_REQUEST['german_numbers'];
	$isettings->delimiter              = $_REQUEST['delimiter'];
        $isettings->delimiter2              = $_REQUEST['delimiter2'];
	$isettings->allow_remote_import    = $_REQUEST['allow_remote_import'];
	$isettings->remote_import_ips      = $_REQUEST['remote_import_ips']; 
	$this->saveOptions();
  }	
  
  if(!$isettings->delimiter)
	$isettings->delimiter = ',';
  if(!$isettings->delimiter2)
	$isettings->delimiter2 = ',';
  
?>
<div id="settings-panel" style="display:none;">
<div>
	<h2> <?php echo __("Custom Import Options",'productexcellikemanager'); ?> </h2>
	<h3><?php echo __("Full import options",'productexcellikemanager'); ?></h3>
	<table>
		<tr>
			<td>
				<label  class="note"><?php echo __("(Use following two opinions only if you are importing CSV containing full product list)",'productexcellikemanager'); ?></label>
				<br/>
			    <label><?php echo __("If not found in CSV change existing product status to 'Pending':",'productexcellikemanager'); ?></label>  
				<input type="checkbox" value="1" name="notfound_setpending" <?php echo $isettings->notfound_setpending ? " checked='checked' " : ""; ?> />
				<br/>
				<label><?php echo __("For imported product override status:",'productexcellikemanager'); ?></label>
				<select name="onimportstatus_overide">
					<option value="" ><?php echo __("Do not override (use data from CSV)",'productexcellikemanager'); ?></option>
					<option value="published" ><?php echo __("Always set 'Published'",'productexcellikemanager'); ?></option>
					<option value="cond_published_pending" ><?php echo __("If stock > 0 set 'Published', otherwise 'Pending'",'productexcellikemanager'); ?></option>
				</select>
			</td>
		</tr>
	</table>
	
	<h3> <?php echo __("CSV custom format",'productexcellikemanager'); ?>  <label  class="note"><?php echo __("(Allows you to use CSV files exported form external programs)",'productexcellikemanager'); ?></label> </h3>
	<table>
		<tr>
			<td colspan="2" >
				<input type="checkbox" value="1" name="german_numbers" <?php echo $isettings->german_numbers ? " checked='checked' " : ""; ?> /><label><?php echo __("Thousand separator is '.' decimal is ','",'productexcellikemanager'); ?></label>		
				<br/>
				<label><?php echo __("CSV delimiter:",'productexcellikemanager'); ?></label><input style="width:20px;" type="text" value="<?php echo $isettings->delimiter; ?>" name="delimiter" />		
				<br/>
				<input type="checkbox" value="1" name="use_custom_import" <?php echo $isettings->use_custom_import ? " checked='checked' " : ""; ?> /><label><?php echo __("Use custom import format",'productexcellikemanager'); ?></label>
				<br/>
				<input type="checkbox" value="1" name="first_row_header" <?php echo $isettings->first_row_header ? " checked='checked' " : ""; ?> /><label><?php echo __("First row is header row (skip it)",'productexcellikemanager'); ?></label>		
				<br/>
				<label><?php echo __("Input columns one by one in order your CSV file will give",'productexcellikemanager'); ?>:</label>
				<br/>
				<label class="note" ><?php echo __("(You must include ID or SKU)",'productexcellikemanager'); ?>:</label>
				<br/>
				<input type="hidden" name="custom_import_columns"  />
				<select id="custom_import_columns" multiple="multiple" > 
				</select>
			</td>
		</tr>
	</table>
	
	<hr/>
	
	<h3> <?php echo __("Remote auto-import options",'productexcellikemanager'); ?> </h3>
	<table>
		<tr>
			<td colspan="2" >
				<input type="checkbox" value="1" name="allow_remote_import" <?php echo $isettings->allow_remote_import ? " checked='checked' " : ""; ?> /><label><?php echo __("Allow remote import",'productexcellikemanager'); ?></label>
				<br/>
				<label><?php echo __("Allow update form following IP addresses",'productexcellikemanager'); ?>:</label>
				<br/>
				<label  class="note">(<?php echo __("comma separated for multiple, leave blank for no restrictions",'productexcellikemanager'); ?>)</label>
				<br/>
				<input class="full-width" type="text" value="<?php echo $isettings->remote_import_ips; ?>" name="remote_import_ips" />
				<br/>
				<a id="download_utility" href="#" ><?php echo __("Download uploading php script and set-up instructions",'productexcellikemanager'); ?> &rArr;</a>
			</td>
		</tr>
	</table>	
	<hr/>
	<!-- CUSTOM EXPORT-->
	<!--added by Nikola-->
	<h2> <?php echo __("Custom Export Options",'productexcellikemanager'); ?> </h2>
	<h3> <?php echo __("CSV custom export format",'productexcellikemanager'); ?>  <label  class="note"><?php echo __("(Allows you to use export CSV files with rows of your choice)",'productexcellikemanager'); ?></label> </h3>
	
	<table>
		<tr>
			<td colspan="2" >
				<label><?php echo __("CSV delimiter:",'productexcellikemanager'); ?></label><input style="width:20px;" type="text" value="<?php echo $isettings->delimiter2; ?>" name="delimiter2" />		
				<br/>
				<input type="checkbox" value="1" name="use_custom_export" <?php echo $isettings->use_custom_export ? " checked='checked' " : ""; ?> /><label><?php echo __("Use custom export format",'productexcellikemanager'); ?></label>
				<br/>
				<br/>
				<label><?php echo __("Input columns one by one in order your CSV file will export",'productexcellikemanager'); ?>:</label>
				<br/>
				<label class="note" ><?php echo __("(You must include ID or SKU)",'productexcellikemanager'); ?>:</label>
				<br/>
				<input type="hidden" name="custom_export_columns"  />
				<select id="custom_export_columns" multiple="multiple" > 
				</select>
			</td>
		</tr>
	</table>	
	<!-- /// -->
	<script type="text/javascript">
		function showSettings(){
			jQuery('#settings-panel').show();
		}

		jQuery(document).ready(function(){
			
			jQuery('SELECT[name="onimportstatus_overide"]').val('<?php echo $isettings->onimportstatus_overide ; ?>');
			
			jQuery('#cmdSettingsSave').click(function(){
				doLoad(true);
			});
			
			jQuery('#cmdSettingsCancel').click(function(){
				jQuery('#settings-panel').hide();
			});
			
			jQuery("a#download_utility").attr("href", window.location.href + "&download_util_file=<?php echo "autoimport_".$elpm_shop_com.".zip"; ?>");
			
		});
	
		jQuery(window).load(function(){
			 setTimeout(function(){
				 try{
					
					var inp = jQuery('INPUT[name="custom_import_columns"]');
                    var inp2 = jQuery('INPUT[name="custom_export_columns"]');
					var select = jQuery('SELECT#custom_import_columns');
					var select2 = jQuery('SELECT#custom_export_columns'); 
					var n = 0;
					DG.getSettings().columns.map(function(c){
						select.append(jQuery('<option value="' + c.data + '">' + DG.getSettings().colHeaders[n] + '</option>'));
                        if(DG.getSettings().colHeaders[n] == "Category" && jQuery('#dg_wooc')[0]){
							select2.append(jQuery('<option value="categories_names">' + DG.getSettings().colHeaders[n] + '</option>'));
							select2.append(jQuery('<option value="categories_paths">Category path</option>'));
						}else{
							select2.append(jQuery('<option value="' + c.data + '">' + DG.getSettings().colHeaders[n] + '</option>'));
						}
						n++;
						return c.data;
					});
					
					var value = "<?php echo $isettings->custom_import_columns; ?>".split(",");
                                        var value2 = "<?php echo $isettings->custom_export_columns; ?>".split(",");
					var tmp = [];
					value.map(function(v){
						if(v){
							tmp.push(v);	
						}
					});
					value = tmp;
                                        var tmp2 = [];
					value2.map(function(v){
						if(v){
							tmp2.push(v);	
						}
					});
					value2 = tmp2;
					inp.val(tmp.join(","));
                                        inp2.val(tmp2.join(","));
					select.chosen();
					select.val(value);
					select.trigger("chosen:updated");
					var cnt = select.next(".chosen-container").find("UL.chosen-choices");
					select2.chosen();
					select2.val(value2);
					select2.trigger("chosen:updated");
					var cnt2 = select2.next(".chosen-container").find("UL.chosen-choices");
					//order
					for(var i = 0 ; i < value.length; i++ ){
						var opt = select.find('option[value="'+ value[i] +'"]');
						cnt.find("a[data-option-array-index='" + opt.index() + "']").parent().insertBefore(cnt.find(".search-field"));
					}
					
                                        for(var i = 0 ; i < value2.length; i++ ){
						var opt2 = select2.find('option[value="'+ value2[i] +'"]');
						cnt2.find("a[data-option-array-index='" + opt2.index() + "']").parent().insertBefore(cnt2.find(".search-field"));
					}
					select.change(function(){
                                             setTimeout(function(){
						var newval = [];
						cnt.find("a[data-option-array-index]").map(function(item){
							var ind = parseInt( jQuery(this).attr("data-option-array-index"));
							newval.push(
								jQuery(select.find("option")[ind]).attr("value")
							);
						});
						inp.val(newval.join(","));
                                              },50);
					});
					select2.change(function(){
						setTimeout(function(){var newval = [];
							cnt2.find("a[data-option-array-index]").map(function(item){
								var ind = parseInt( jQuery(this).attr("data-option-array-index"));
								newval.push(
									jQuery(select2.find("option")[ind]).attr("value")
								);
							});
							inp2.val(newval.join(","));		
						}, 50);
					});
					
					jQuery(document).on('click','#custom_import_columns_chosen a.search-choice-close',function(e){
						e.preventDefault();
						select.trigger('change');
					});
					
					
					jQuery(document).on('click','#custom_export_columns_chosen a.search-choice-close',function(e){
						e.preventDefault();
						select2.trigger('change');
					});
						
				 }catch(e){
					alert(e.name + ":" + e.message);
				 }
			 },2000);
		});
	</script>	
  
  <button id="cmdSettingsCancel" ><?php echo __("Cancel",'productexcellikemanager'); ?></button>
  <button id="cmdSettingsSave" ><?php echo __("Save",'productexcellikemanager'); ?></button>
</div>
</div>