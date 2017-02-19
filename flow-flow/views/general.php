<?php if ( ! defined( 'WPINC' ) ) die;
/**
 * FlowFlow.
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>
 *
 * @link      http://looks-awesome.com
 * @copyright 2014-2016 Looks Awesome
 */
$options = $context['options'];
?>
<div class="section-content" data-tab="general-tab">
	<div class="section" id="general-settings">
		<h1  class="desc-following">General Settings</h1>
		<p class="desc">Adjust plugin's global settings here.</p>
		<dl class="section-settings">
			<dt class="multiline">Date format<p class="desc">That will be used in posts timestamps.</p></dt>
			<dd>
				<input id="general-settings-ago-format" class="clearcache" type="radio" name="flow_flow_options[general-settings-date-format]" <?php if (isset($options['general-settings-date-format']) && $options['general-settings-date-format'] == 'agoStyleDate') echo "checked"; ?> value="agoStyleDate"/>
				<label for="general-settings-ago-format">Short</label>
				<input id="general-settings-classic-format" class="clearcache" type="radio" name="flow_flow_options[general-settings-date-format]" <?php if (!isset($options['general-settings-date-format']) || $options['general-settings-date-format'] == 'classicStyleDate') echo "checked"; ?> value="classicStyleDate"/>
				<label for="general-settings-classic-format">Classic</label>
				<?php if (FF_USE_WP) { ?>
				<input id="general-settings-wp-format" class="clearcache" type="radio" name="flow_flow_options[general-settings-date-format]" <?php if (!isset($options['general-settings-date-format']) || $options['general-settings-date-format'] == 'wpStyleDate') echo "checked"; ?> value="wpStyleDate"/>
				<label for="general-settings-wp-format">WordPress</label>
				<?php }?>
			</dd>
			<dt class="multiline">Open links in new tab<p class="desc">Any link in post will be opened in new tab.</p></dt>
			<dd>
				<label for="general-settings-open-links-in-new-window">
					<input id="general-settings-open-links-in-new-window" class="switcher clearcache" type="checkbox"
					       name="flow_flow_options[general-settings-open-links-in-new-window]"
						<?php if (!isset($options['general-settings-open-links-in-new-window']) || $options['general-settings-open-links-in-new-window'] == 'yep') echo "checked"; ?>
					       value="yep"/><div><div></div></div>
				</label>
			</dd>
			<dt class="multiline">Disable proxy pictures<p class="desc">Proxying improves performance.</p></dt>
			<dd>
				<label for="general-settings-disable-proxy-server">
					<input id="general-settings-disable-proxy-server" class="clearcache switcher" type="checkbox"
					       name="flow_flow_options[general-settings-disable-proxy-server]"
						<?php if (!isset($options['general-settings-disable-proxy-server']) || $options['general-settings-disable-proxy-server'] == 'yep') echo "checked"; ?>
					       value="yep"/><div><div></div></div>
			</dd>
			<dt class="multiline">Disable curl "follow location"
			<p class="desc">Can help if your server uses deprecated security setting 'safe_mode' and streams don't load.</p></dt>
			<dd>
				<label for="general-settings-disable-follow-location">
					<input id="general-settings-disable-follow-location" class="clearcache switcher" type="checkbox"
					       name="flow_flow_options[general-settings-disable-follow-location]"
						<?php if (!isset($options['general-settings-disable-follow-location']) || $options['general-settings-disable-follow-location'] == 'yep') echo "checked"; ?>
					       value="yep"/><div><div></div></div>
			</dd>
			<dt class="multiline">Use IPv4 protocol
	<p class="desc">Sometimes servers use older version of Internet protocol. Use setting when you see "Network is unreachable" error.</p></dt>
			<dd>
				<label for="general-settings-ipv4">
					<input id="general-settings-ipv4" class="clearcache switcher" type="checkbox"
					       name="flow_flow_options[general-settings-ipv4]"
						<?php if (isset($options['general-settings-ipv4']) && $options['general-settings-ipv4'] == 'yep') echo "checked"; ?>
					       value="yep"/><div><div></div></div>
			</dd>

			<dt class="multiline">Force HTTPS for all resources
			<p class="desc">For images and videos to load via HTTPS. Use this settings if you have HTTPS site and see browser security warnings. Keep in mind that this is forcing and not all resources can be available via HTTPS</p></dt>
			<dd>
				<label for="general-settings-https">
					<input id="general-settings-https" class="clearcache switcher" type="checkbox"
					       name="flow_flow_options[general-settings-https]"
						<?php if (isset($options['general-settings-https']) && $options['general-settings-https'] == 'yep') echo "checked"; ?>
					       value="yep"/><div><div></div></div>
			</dd>

<!--			<dt class="multiline">Save images to server-->
<!--			<p class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus a nibh condimentum commodo. Integer fermentum tortor lectus, eu porta orci dictum venenatis</p></dt>-->
<!--			<dd>-->
<!--				<label for="general-settings-save-images">-->
<!--					<input id="general-settings-save-images" class="clearcache switcher" type="checkbox"-->
<!--					       name="flow_flow_options[general-settings-save-images]"-->
								<?php //if (isset($options['general-settings-save-images']) && $options['general-settings-save-images'] == 'yep') echo "checked"; ?>
<!--					       value="yep"/><div><div></div></div>-->
<!--			</dd>-->
			<!--<dt class="multiline">SEO mode<p class="desc">When cache content is available plugin injects stream HTML synchronously and search bots index it</p></dt>
	                    <dd>
		                    <label for="general-settings-seo-mode">
			                    <input id="general-settings-seo-mode" class="switcher" type="checkbox"
			                           name="flow_flow_options[general-settings-seo-mode]"
				                    <?php /*if (isset($options['general-settings-seo-mode']) && $options['general-settings-seo-mode'] == 'yep') echo "checked"; */?>
			                           value="yep"/><div><div></div></div>

	                    </dd>-->

		</dl>
		<span id="general-settings-sbmt" class='admin-button green-button submit-button'>Save Changes</span>
	</div>
</div>