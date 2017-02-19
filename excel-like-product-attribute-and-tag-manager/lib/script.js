function peatm_setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

function peatm_getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
}

jQuery(document).ready(function(){
	jQuery('.save-state').each(function(i){
	    var val =  peatm_getCookie( 'peatm_' + jQuery(this).attr('id') );
		if(val)
			jQuery(this).val( val );
	});
});

function pelmStoreState(){
	if(!localStorage_clear_flag){
		var manualColumnWidths = [];
		for(var i = 0; i < DG.countCols(); i++){
			var w = DG.getColWidth(i);
			manualColumnWidths.push(w == 80 ? null : w );
		}
		DG.runHooks('persistentStateSave', 'manualColumnWidths', manualColumnWidths);
	}
	
	jQuery('.save-state').each(function(i){
		peatm_setCookie('peatm_' + jQuery(this).attr('id'), jQuery(this).val(), 30);  
	});
}

function WPSetThumbnailID(id){
  try{
	var url = jQuery('#TB_iframeContent').contents().find('INPUT[name="attachments[' + id + '][url]"').val();
	if(!url){
		url = jQuery('INPUT[name="attachments[' + id + '][url]"').val();
	}
	
	if(!url){
	    var thmb = jQuery('#TB_iframeContent').contents().find('#media-item-' + id + ' IMG.thumbnail');
		
		if(!thmb[0])
			thmb = jQuery('#media-item-' + id + ' IMG.thumbnail');
		
		if(thmb[0])
			url	= thmb.attr('src');
	}
	
	if(url){
		url = url.split('uploads/')[1];
		url = url.replace('-150x150','');
		
		if(window.customImageEditorSave)
			window.customImageEditorSave(id,url);
		else if(window.parent.customImageEditorSave)
            window.parent.customImageEditorSave(id,url);		
	}
  }catch(e){}
} 

function WPSetThumbnailHTML(id){
 //
}

window.wpsc_set_variation_product_thumbnail = function(id,url){
  try{
     
	
	var qs = url.split('?')[1].split('&');
    for(var i = 0; i < qs.length; i++)
		if(qs[i].indexOf('attachment_id') >= 0)
			id = qs[i].split("=")[1];
	
 	var url = jQuery('#TB_iframeContent').contents().find('INPUT[name="attachments[' + id + '][url]"').val();
	if(!url){
		url = jQuery('INPUT[name="attachments[' + id + '][url]"').val();
	}
	
	if(!url){
	    var thmb = jQuery('#TB_iframeContent').contents().find('#media-item-' + id + ' IMG.thumbnail');
		
		if(!thmb[0])
			thmb = jQuery('#media-item-' + id + ' IMG.thumbnail');
		
		if(thmb[0])
			url	= thmb.attr('src');
	}
	
	if(url){
		url = url.split('uploads/')[1];
		url = url.replace('-150x150','');
		
		if(window.customImageEditorSave)
			window.customImageEditorSave(id,url);
		else if(window.parent.customImageEditorSave)
            window.parent.customImageEditorSave(id,url);		
	}
  }catch(e){}
};


var ucolor = 'red';
setInterval(function(){
	if(ucolor == 'red')
		ucolor = 'cyan';
	else
		ucolor = 'red';
	try{
	jQuery('a.pro-upgrade').css('color',ucolor);
	}catch(e){}
},700);