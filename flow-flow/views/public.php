<?php if ( ! defined( 'WPINC' ) ) die;
/**
 * Represents the view for the public-facing component of the plugin.
 *
 * This typically includes any information, if any, that is rendered to the
 * frontend of the theme when the plugin is activated.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>
 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 */
$moderation = $context['moderation'] && $context['can_moderate'];
$stream = $context['stream'];
if (FF_USE_WP)
	$admin = $moderation ? $moderation : function_exists('current_user_can') && current_user_can('manage_options');
else
	$admin = ff_user_can_moderate();
$id = $stream->id;
$hash = $context['hashOfStream'];
$seo = $context['seo'];
$disableCache = isset($_REQUEST['disable-cache']);
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '0';

if ( ! in_array( 'curl', get_loaded_extensions() ) ) {
	echo "<p style='background: indianred;padding: 15px;color: white;'>Flow-Flow admin info: Your server doesn't have cURL module installed. Please ask your hosting to check this.</p>";
	return;
}

if (!isset($stream->layout) || empty($stream->layout)) {
	echo "<p style='background: indianred;padding: 15px;color: white;'>Flow-Flow admin info: Please choose stream layout on options page.</p>";
	return;
}

?>
	<!-- Flow-Flow — Social streams plugin for Wordpress -->
	<style type="text/css" id="ff-dynamic-styles-<?php echo $id;?>">
	#ff-stream-<?php echo $id;?> .ff-header h1,#ff-stream-<?php echo $id;?> .ff-controls-wrapper > span:hover { color: <?php echo $stream->headingcolor;?>; }
	#ff-stream-<?php echo $id;?> .ff-controls-wrapper > span:hover { border-color: <?php echo $stream->headingcolor;?> !important; }
	#ff-stream-<?php echo $id;?> .ff-header h2 { color: <?php echo $stream->subheadingcolor;?>; }
	#ff-stream-<?php echo $id;?> .ff-filter-holder .ff-filter,
	#ff-stream-<?php echo $id;?> .ff-filter-holder:before,
	#ff-stream-<?php echo $id;?> .ff-loadmore-wrapper .ff-btn:hover {
		background-color: <?php echo $stream->filtercolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-filter:hover,
	#ff-stream-<?php echo $id;?> .ff-filter.ff-filter--active,
	#ff-stream-<?php echo $id;?> .ff-moderation-button,
	#ff-stream-<?php echo $id;?> .ff-loadmore-wrapper .ff-btn,
	#ff-stream-<?php echo $id;?> .ff-square:nth-child(1) {
		background-color: <?php echo $stream->headingcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-filter-holder .ff-search input {
		border-color: <?php echo $stream->filtercolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-filter-holder .ff-search:after {
		color: <?php echo $stream->filtercolor;?>;
	}
	#ff-stream-<?php echo $id;?>, #ff-stream-<?php echo $id;?> .ff-popup,
	#ff-stream-<?php echo $id;?> .ff-search input,
	#ff-stream-<?php echo $id;?>.ff-layout-compact .picture-item__inner {
		background-color: <?php echo $stream->bgcolor;?>;
	}
    <?php if(strpos( $stream->bgcolor , 'rgba') !== false ):?>
    #ff-stream-<?php echo $id;?> .ff-search input {
        background-color: <?php echo $stream->filtercolor;?>;
    }
    #ff-stream-<?php echo $id;?> .ff-search input,
    #ff-stream-<?php echo $id;?> .ff-filter-holder .ff-search:after {
        color: #FFF;
    }
    <?php endif?>
    <?php if( $stream->hidetext === 'yep' ):?>
    #ff-stream-<?php echo $id;?> .ff-content, #ff-stream-<?php echo $id;?> h4, #ff-stream-<?php echo $id;?> .readmore-js-toggle {
        display: none !important;
    }
    #ff-stream-<?php echo $id;?> .ff-theme-flat.ff-style-3 .ff-content + .ff-item-meta {
        padding: 7px 0 20px;
    }
    <?php endif?>
    <?php if( $stream->hidemeta === 'yep' ):?>
    #ff-stream-<?php echo $id;?> .ff-stream .ff-item-meta, .ff-theme-flat .ff-icon, .ff-theme-flat.ff-style-3 .ff-item-cont:before {
        display: none !important;
    }
    #ff-stream-<?php echo $id;?> .ff-theme-flat.ff-style-3 .ff-item-cont {
        padding-bottom: 15px;
    }
    #ff-stream-<?php echo $id;?> .ff-theme-flat .ff-img-holder + .ff-item-cont,
    #ff-stream-<?php echo $id;?> .ff-theme-flat a + .ff-item-cont {
        margin-top: 0;
    }
    <?php endif?>
    <?php if( $stream->hidetext === 'yep' && $stream->hidemeta === 'yep' ):?>
    #ff-stream-<?php echo $id;?> .ff-item-cont > .ff-img-holder:first-child {
        margin-bottom: 0;
    }

    #ff-stream-<?php echo $id;?> .ff-theme-flat .ff-item-cont {
        display: none;
    }
    <?php endif?>
	#ff-stream-<?php echo $id;?> .ff-header h1, #ff-stream-<?php echo $id;?> .ff-header h2 {
		text-align: <?php echo $stream->hhalign;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-controls-wrapper, #ff-stream-<?php echo $id;?> .ff-controls-wrapper > span {
		border-color: <?php echo $stream->filtercolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-controls-wrapper, #ff-stream-<?php echo $id;?> .ff-controls-wrapper > span {
		color: <?php echo $stream->filtercolor;?>;
	}
	<?php if($stream->layout == 'grid'):?>
	#ff-stream-<?php echo $id;?> .ff-item, #ff-stream-<?php echo $id;?> .shuffle__sizer{
		width:  <?php echo $stream->width;?>px;
	}
	#ff-stream-<?php echo $id;?> .ff-item {
		margin-bottom: <?php echo $stream->margin;?>px !important;
	}
	#ff-stream-<?php echo $id;?> .shuffle__sizer {
		margin-left: <?php echo $stream->margin;?>px !important;
	}
	<?php endif?>
	<?php if($stream->layout == 'grid' && $stream->theme == 'classic'):?>
	#ff-stream-<?php echo $id;?>  .picture-item__inner {
		background: <?php echo $stream->cardcolor;?>;
		color: <?php echo $stream->textcolor;?>;
		box-shadow: 0 1px 4px 0 <?php echo $stream->shadow;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a,
	#ff-stream-<?php echo $id;?> .ff-mob-link,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a {
		background-color: <?php echo $stream->textcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a:after,
	#ff-stream-<?php echo $id;?> .ff-mob-link:after,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a:after {
		color: <?php echo $stream->cardcolor;?>;
	}
	#ff-stream-<?php echo $id;?>,
	#ff-stream-<?php echo $id;?>-slideshow {
		color: <?php echo $stream->textcolor;?>;
	}
	#ff-stream-<?php echo $id;?> li,
	#ff-stream-<?php echo $id;?>-slideshow li,
	#ff-stream-<?php echo $id;?> .ff-square {
		background: <?php echo $stream->cardcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-icon, #ff-stream-<?php echo $id;?>-slideshow .ff-icon {
		border-color: <?php echo $stream->cardcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-style-2 .ff-icon:after {
		text-shadow: -1px 0 <?php echo $stream->cardcolor;?>, 0 1px <?php echo $stream->cardcolor;?>, 1px 0 <?php echo $stream->cardcolor;?>, 0 -1px <?php echo $stream->cardcolor;?>;
	}
	#ff-stream-<?php echo $id;?>  a, #ff-stream-<?php echo $id;?>-slideshow  a{
		color: <?php echo $stream->linkscolor;?>;
	}

	#ff-stream-<?php echo $id;?> h4, #ff-stream-<?php echo $id;?>-slideshow h4,
	#ff-stream-<?php echo $id;?> .ff-name, #ff-stream-<?php echo $id;?>-slideshow .ff-name {
		color: <?php echo $stream->namecolor;?> !important;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a:hover,
	#ff-stream-<?php echo $id;?> .ff-mob-link:hover,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a:hover {
		background-color: <?php echo $stream->namecolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-nickname,
	#ff-stream-<?php echo $id;?>-slideshow .ff-nickname,
	#ff-stream-<?php echo $id;?> .ff-timestamp,
	#ff-stream-<?php echo $id;?>-slideshow .ff-timestamp {
		color: <?php echo $stream->restcolor;?> !important;
	}
	#ff-stream-<?php echo $id;?> .ff-item {
		text-align: <?php echo $stream->talign;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-theme-classic.ff-style-1 .ff-item-meta:before,
	#ff-stream-<?php echo $id;?> .ff-theme-classic.ff-style-2 .ff-item-meta:before,
	#ff-stream-<?php echo $id;?> .ff-theme-classic.ff-style-6 .ff-item-meta:before,
	#ff-stream-<?php echo $id;?> .ff-item-meta,
	#ff-stream-<?php echo $id;?>-slideshow .ff-item-meta {
		border-color: <?php echo $stream->bcolor;?>;
	}
	<?php endif;?>
	<?php if($stream->layout == 'grid' && $stream->theme == 'flat'):?>
	#ff-stream-<?php echo $id;?> .picture-item__inner {
		background: <?php echo $stream->fcardcolor;?>;
		color: <?php echo $stream->ftextcolor;?>;
	}
	#ff-stream-<?php echo $id;?>, #ff-stream-<?php echo $id;?> h4,
	#ff-stream-<?php echo $id;?>-slideshow, #ff-stream-<?php echo $id;?>-slideshow h4  {
		color: <?php echo $stream->ftextcolor;?>;
	}
	#ff-stream-<?php echo $id;?> > li,
	#ff-stream-<?php echo $id;?>-slideshow li,
	#ff-stream-<?php echo $id;?> .ff-square {
		background: <?php echo $stream->fcardcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a:after,
	#ff-stream-<?php echo $id;?> .ff-mob-link:after,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a:after {
		color: <?php echo $stream->fcardcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a,
	#ff-stream-<?php echo $id;?> .ff-mob-link,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a {
		background-color: <?php echo $stream->ftextcolor;?>;
	}
	#ff-stream-<?php echo $id;?> a,
	#ff-stream-<?php echo $id;?>-slideshow a {
		color: <?php echo $stream->fnamecolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-name,
	#ff-stream-<?php echo $id;?>-slideshow .ff-name {
		color: <?php echo $stream->fnamecolor;?> !important;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a:hover,
	#ff-stream-<?php echo $id;?> .ff-mob-link:hover,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a:hover {
		background-color: <?php echo $stream->fnamecolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-nickname, #ff-stream-<?php echo $id;?> .ff-timestamp,
	#ff-stream-<?php echo $id;?>-slideshow .ff-nickname, #ff-stream-<?php echo $id;?>-slideshow .ff-timestamp {
		color: <?php echo $stream->frestcolor;?> !important;
	}
	#ff-stream-<?php echo $id;?> .ff-theme-flat h4,
	#ff-stream-<?php echo $id;?> .ff-theme-flat .ff-content,
	#ff-stream-<?php echo $id;?> .ff-item-meta,
	#ff-stream-<?php echo $id;?>-slideshow .ff-item-meta {
		border-color: <?php echo $stream->fbcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-item {
		text-align: <?php echo $stream->ftalign;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-style-1 .ff-no-image  .ff-item-cont:before,
	#ff-stream-<?php echo $id;?> .ff-style-3 .ff-item-cont:before{
		background: <?php echo $stream->fscardcolor;?>;
	}
	<?php endif;;?>
	<?php if($stream->mborder == 'yep'):?>
	#ff-stream-<?php echo $id;?> .picture-item__inner {
		border: 1px solid #eee;
	}
	<?php endif;?>
	<?php if($stream->layout == 'compact'): ?>
	#ff-stream-<?php echo $id;?> li, #ff-stream-<?php echo $id;?>-slideshow li {
		background: <?php echo $stream->bgcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-item {
		text-align: <?php echo $stream->calign;?>;
	}
	#ff-stream-<?php echo $id;?>  .picture-item__inner, #ff-stream-<?php echo $id;?>, #ff-stream-<?php echo $id;?>-slideshow {
		color: <?php echo $stream->ctextcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a,
	#ff-stream-<?php echo $id;?> .ff-mob-link,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a {
		background-color: <?php echo $stream->ctextcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a:after,
	#ff-stream-<?php echo $id;?> .ff-mob-link:after,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a:after {
		color: <?php echo $stream->bgcolor;?>;
	}
	#ff-stream-<?php echo $id;?> a, #ff-stream-<?php echo $id;?>-slideshow a {
		color: <?php echo $stream->clinkscolor;?>;
	}
	#ff-stream-<?php echo $id;?>  h4,
	#ff-stream-<?php echo $id;?>-slideshow  h4,
	#ff-stream-<?php echo $id;?> .ff-name,
	#ff-stream-<?php echo $id;?>-slideshow .ff-name {
		color: <?php echo $stream->cnamecolor;?> !important;
	}
	#ff-stream-<?php echo $id;?> .ff-share-wrapper a:hover,
	#ff-stream-<?php echo $id;?> .ff-mob-link:hover,
	#ff-stream-<?php echo $id;?>-slideshow .ff-share-wrapper a:hover {
		background-color: <?php echo $stream->cnamecolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-nickname,
	#ff-stream-<?php echo $id;?>-slideshow .ff-nickname,
	#ff-stream-<?php echo $id;?> .ff-timestamp,
	#ff-stream-<?php echo $id;?>-slideshow .ff-timestamp {
		color: <?php echo $stream->crestcolor;?> !important;
	}
	#ff-stream-<?php echo $id;?>  .ff-c-style-2 .ff-item-cont:after {
		border-top-color: <?php echo $stream->bgcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-item-cont,
	#ff-stream-<?php echo $id;?>-slideshow .ff-item-cont,
	#ff-stream-<?php echo $id;?> .ff-item-meta,
	#ff-stream-<?php echo $id;?>-slideshow .ff-item-meta {
		border-color: <?php echo $stream->cbcolor;?>;
	}
	#ff-stream-<?php echo $id;?> .ff-c-style-2 .ff-item-cont:before {
		border-top-color: <?php echo $stream->cbcolor;?>;
	}
	<?php endif;?>
	<?php
	  if(!empty($stream->css)) echo stripslashes($stream->css);
	?>
	</style>
	<div class="ff-stream" id="ff-stream-<?php echo $id;?>"><span class="ff-loader"><span class="ff-square" ></span><span class="ff-square"></span><span class="ff-square ff-last"></span><span class="ff-square ff-clear"></span><span class="ff-square"></span><span class="ff-square ff-last"></span><span class="ff-square ff-clear"></span><span class="ff-square"></span><span class="ff-square ff-last"></span></span></div>

	<script type="text/javascript">

		(function ( $ ) {
			"use strict";
			var hash = '<?php echo $hash; ?>';
			if (/MSIE 8/.test(navigator.userAgent)) return;
			var opts = window.FlowFlowOpts;
            var isLS = isLocalStorageNameSupported();
			if (!opts) {
				window.console && window.console.log('no Flow-Flow options');
				return;
			}
			if (!window.FF_resource) {
				window.console && window.console.log('no required script');
				return
			}
			var data = {
				'action': 'fetch_posts',
				'stream-id': '<?php echo $id;?>',
				'disable-cache': '<?php echo $disableCache;?>',
				'hash': hash,
				'page': '<?php echo $page;?>',
				'preview': '<?php echo $stream->preview ? 1 : 0;?>'
			};
			var isMobile = /android|blackBerry|iphone|ipad|ipod|opera mini|iemobile/i.test(navigator.userAgent);
			var streamOpts = <?php echo json_encode($stream); ?>;
            opts.streams['stream' + streamOpts.id] = streamOpts;
			var $cont = $("#ff-stream-"+data['stream-id']);
			var ajaxDeferred;
			var script, style;
			if (FF_resource.scriptDeferred.state() === 'pending' && !FF_resource.scriptLoading) {
				script = document.createElement('script');
				script.src = "<?php echo $context['plugin_url'] . $context['slug'];?>/js/public.js";
				script.onload = function( script, textStatus ) {
					FF_resource.scriptDeferred.resolve();
				};
				document.body.appendChild(script);
				FF_resource.scriptLoading = true;
			}
			if (FF_resource.styleDeferred.state() === 'pending' && !FF_resource.styleLoading) {
				style = document.createElement('link');
				style.type = "text/css";
                style.id = "ff_style";
                style.rel = "stylesheet";
				style.href = "<?php echo $context['plugin_url'] . $context['slug'];?>/css/public.css";
				style.media = "screen";
				style.onload = function( script, textStatus ) {
					FF_resource.styleDeferred.resolve();
				};
				document.getElementsByTagName("head")[0].appendChild(style);
				FF_resource.styleLoading = true;
			}
			$cont.addClass('ff-layout-' + streamOpts.layout);
			if (streamOpts.layout == 'grid' && !isMobile) $cont.css('minHeight', '1000px');
			ajaxDeferred = <?php if ($admin) {echo '$.get(opts.ajaxurl, data)';} else {echo 'isLS && sessionStorage.getItem(hash) ? {} : $.get(opts.ajaxurl, data)';} echo PHP_EOL; ?>;
			$.when( ajaxDeferred, FF_resource.scriptDeferred, FF_resource.styleDeferred ).done(function ( data ) {
				var response, $errCont, err;
                var moderation = <?php echo $moderation ? 1 : 0 ?>;
                var original = <?php if ($admin) {echo 'data[0]';} else {echo '(isLS && sessionStorage.getItem(hash)) ? sessionStorage.getItem(hash) : data[0]';}?>;
				try {
					response = JSON.parse(original);
				} catch (e) {
					window.console && window.console.log('Flow-Flow gets invalid data from server');
					if (opts.isAdmin || opts.isLog) {
						$errCont = $('<div class="ff-errors" id="ff-errors-invalid-response"><div class="ff-disclaim">If you see this message then you have administrator permissions and Flow-Flow got invalid data from server. Please provide error message below if you are doing support request.<\/div><div class="ff-err-info"><\/div><\/div>');
						$cont.before($errCont);
						$errCont.find('.ff-err-info').html(original == '' ? 'Empty response from server' : original)
					}
					return;
				}
                opts.streams['stream' + streamOpts.id]['items'] = response;
                if (!FlowFlowOpts.dependencies) FlowFlowOpts.dependencies = {};
				<?php
				$dependencies = apply_filters('ff_plugin_dependencies', array());
				foreach ($dependencies as $name) {
				    echo "if (!FlowFlowOpts.dependencies['{$name}']) FlowFlowOpts.dependencies['{$name}'] = true;";
				}
				?>
                var requests = [];
                var request, extension, style;

                for ( extension in FlowFlowOpts.dependencies ) {
                    if ( FlowFlowOpts.dependencies[extension] && FlowFlowOpts.dependencies[extension] !== 'loaded') {
                        request = $.getScript( opts.plugin_base + '-' + extension + '/js/ff_' + extension + '_public.js');
                        requests.push(request);

                        style = document.createElement('link');
                        style.type = "text/css";
                        style.rel = "stylesheet";
                        style.id = "ff_ad_style";
                        style.href = opts.plugin_base + '-' + extension + '/css/ff_' + extension + '_public.css';
                        style.media = "screen";
                        document.getElementsByTagName("head")[0].appendChild(style);

                        FlowFlowOpts.dependencies[extension] = 'loaded';
                    }
                }

                var resourcesLoaded = $.when.apply($, requests);

                resourcesLoaded.done(function(){
                    var $stream, width;
                    $stream = FlowFlow.buildStreamWith(response, streamOpts, moderation, FlowFlowOpts.dependencies);
                    <?php if (!$admin) {echo 'if (isLS && response.items.length > 0 && response.hash.length > 0) sessionStorage.setItem(response.hash, original);' . PHP_EOL;}?>
                    var num = streamOpts.layout === 'compact' || (streamOpts.mobileslider === 'yep' && isMobile)? (streamOpts.mobileslider === 'yep' ? 3 : streamOpts['cards-num']) : false;
                    if (streamOpts.layout === 'compact') {
                        width = $cont.parent().width();
                        FlowFlow.adjustImgHeight($stream, (width > 300 ? 300 : width) - 72);
                    }
                    $cont.append($stream);
                    if (typeof $stream !== 'string') {
                        FlowFlow.setupGrid($cont.find('.ff-stream-wrapper'), num, streamOpts.scrolltop === 'yep', streamOpts.gallery === 'yep', streamOpts, $cont);
                    }
                    setTimeout(function(){
                        $cont.find('.ff-header').removeClass('ff-loading').end().find('.ff-loader').addClass('ff-squeezed');
                    }, 0);

	                <?php do_action('ff_add_view_action', $stream);?>

                }).fail(function(){
                    console.log('Flow-Flow: resource loading failed')
                });

                var isErr = response.status === "errors";
                if ((opts.isAdmin || opts.isLog) && isErr) {
					$errCont = $('<div class="ff-errors" id="ff-errors-'+response.id+'"><div class="ff-err-info">If you see this then you are administrator and Flow-Flow got errors from APIs while requesting data. Please go to plugin admin and after refreshing page check for error(s) on stream settings page. Please provide error message info if you are doing support request.<\/div><\/div>');
					$cont.before($errCont);
				}

                if (opts.isAdmin && response.status === 'building') {
                    window.console && window.console.log(response);
                    $cont.prepend($('<div id="ff-admin-info">ADMIN INFO: Feeds cache is being built in background. Please wait for changes to apply. Page reload is required.<\/div>'));
                }
			});

            function isLocalStorageNameSupported() {
                var testKey = 'test', storage = window.sessionStorage;
                try {
                    storage.setItem(testKey, '1');
                    storage.removeItem(testKey);
                    return true;
                } catch (error) {
                    return false;
                }
            };

			return false;
		}(jQuery));
	</script>
	<!-- Flow-Flow — Social streams plugin for Wordpress -->
