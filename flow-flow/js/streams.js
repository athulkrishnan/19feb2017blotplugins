var ff_templates = {
  view:      '<div class="section-stream" id="streams-update-%id%" data-view-mode="streams-update">\
                <input type="hidden" name="stream-%id%-id" class="stream-id-value" value="%id%"/>\
                <div class="section" id="stream-name-%id%">\
                    <h1>Stream #%id% <span class="admin-button grey-button button-go-back">Go back to list</span></h1>\
                    <p><input type="text" name="stream-%id%-name" placeholder="Type name of stream."/></p>\
                    <span id="stream-name-sbmt-%id%" class="admin-button green-button submit-button">Save Changes</span>\
                </div>\
                <div class="section" id="stream-feeds-%id%">\
                    <input type="hidden" name="stream-%id%-feeds"/>\
                    <h1>Feeds in your stream <span class="admin-button green-button button-add">Add social feed</span></h1>\
                    <table class="feeds-list">\
                        <thead>\
                            <tr>\
                                <th></th>\
                                <th>Feed</th>\
                                <th>Status</th>\
                                <th>Settings</th>\
                            </tr>\
                        </thead>\
                        <tbody> %LIST% </tbody>\
                    </table>\
    <div class="popup" id="feeds-settings-%id%">\
        <i class="popupclose flaticon-close-4"></i>\
        <div class="section">\
            <div class="networks-choice add-feed-step">\
                <h1>Add feed to your stream</h1>\
                <p class="desc">Choose one social network and then set up what content to show.</p>\
                <ul class="networks-list">\
                    <li class="network-twitter" data-network="twitter" data-network-name="Twitter"><i class="flaticon-twitter"></i></li>\
                    <li class="network-facebook" data-network="facebook" data-network-name="Facebook"><i class="flaticon-facebook"></i></li>\
                    <li class="network-google" data-network="google" data-network-name="Google +"><i class="flaticon-google"></i></li>\
                    <li class="network-pinterest" data-network="pinterest" data-network-name="Pinterest"><i class="flaticon-pinterest"></i></li>\
                    <li class="network-linkedin" data-network="linkedin" data-network-name="LinkedIn"><i class="flaticon-linkedin"></i></li>\
                    <li class="network-instagram" data-network="instagram" data-network-name="Instagram"><i class="flaticon-instagram"></i></li>\
                    <li class="network-flickr" data-network="flickr" data-network-name="Flickr"><i class="flaticon-flickr"></i></li>\
                    <li class="network-tumblr" data-network="tumblr" data-network-name="Tumblr" style="margin-right:0"><i class="flaticon-tumblr"></i></li><br>\
                    <li class="network-youtube" data-network="youtube" data-network-name="YouTube"><i class="flaticon-youtube"></i></li>\
                    <li class="network-vimeo" data-network="vimeo" data-network-name="Vimeo"><i class="flaticon-vimeo"></i></li>\
                    <li class="network-wordpress" data-network="wordpress" data-network-name="WordPress"><i class="flaticon-wordpress"></i></li>\
                    <li class="network-foursquare" data-network="foursquare" data-network-name="Foursquare"><i class="flaticon-foursquare"></i></li>\
                    <li class="network-soundcloud" data-network="soundcloud" data-network-name="SoundCloud"><i class="flaticon-soundcloud"></i></li>\
                    <li class="network-vine" data-network="vine" data-network-name="Vine"><i class="flaticon-vine"></i></li>\
                    <li class="network-dribbble" data-network="dribbble" data-network-name="Dribbble"><i class="flaticon-dribbble"></i></li>\
                    <li class="network-rss" data-network="rss" data-network-name="RSS" style="margin-right:0"><i class="flaticon-rss"></i></li>\
                </ul>\
                </div>\
                <div class="networks-content  add-feed-step">\
                %FEEDS%\
                    <p class="feed-popup-controls add">\
                        <span id="networks-sbmt-%id%" class="admin-button green-button submit-button">Add feed</span><span class="space"></span><span class="admin-button grey-button button-go-back">Back to first step</span>\
                    </p>\
                    <p class="feed-popup-controls edit">\
                        <span id="networks-sbmt-%id%" class="admin-button green-button submit-button">Save changes</span>\
                    </p>\
                </div>\
            </div>\
        </div>\
    </div>\
    <div class="section" id="stream-settings-%id%">\
        <h1>Stream general settings</h1>\
        <dl class="section-settings section-compact">\
            <dt class="ff_moderation">Pre-Moderation\
                <p class="desc">Set if stream posts need approval or not. Approve posts right on site pages. Users will see only approved posts.</p>\
            </dt>\
            <dd class="ff_moderation">\
                <label for="stream-%id%-moderation"><input id="stream-%id%-moderation" class="switcher" type="checkbox" name="stream-%id%-moderation" value="yep"/><div><div></div></div></label>\
            </dd>\
            <dt class="ff_mod_roles ff_hide4site">User roles\
                <p class="desc">Roles that are allowed to pre-moderate.</p>\
            </dt>\
            <dd class="ff_mod_roles ff_hide4site">\
                %ROLES%\
            </dd>\
            <dt>Items order\
                <p class="desc">Choose rule how stream sorts posts.<br>Proportional sorting will guarantee that all networks are always on first load.</p>\
                </dt>\
                <dd>\
                    <input id="stream-%id%-smart-date-order" type="radio" name="stream-%id%-order" checked value="smartCompare"/>\
                    <label for="stream-%id%-smart-date-order">Proportional by date</label><br><br>\
                    <input id="stream-%id%-date-order" type="radio" name="stream-%id%-order" value="compareByTime"/>\
                    <label for="stream-%id%-date-order">Strictly by date</label><br><br>\
                        <input id="stream-%id%-random-order" type="radio" name="stream-%id%-order" value="randomCompare"/>\
                        <label for="stream-%id%-random-order">Random</label>\
                    </dd>\
                        <dt>Load last\
                            <p class="desc">Number of items that is pulled and cached from each connected feed. Be aware that some APIs can ignore this setting.</p>\
                        </dt>\
                        <dd><input type="text"  name="stream-%id%-posts" value="40" class="short clearcache"/> posts <span class="space"></span><input type="text" class="short clearcache" name="stream-%id%-days"/> days</dd>\
                        <dt>Number of visible items\
                            <p class="desc">Overall number of items from all connected feeds to show in stream. Button "Show more" will appear if there are more items loaded.</p>\
                        </dt>\
                        <dd><input type="text"  name="stream-%id%-page-posts" value="20" class="short clearcache"/> posts</dd>\
                        <dt class="multiline" style="display:none">Cache\
                            <p class="desc">Caching stream data to reduce loading time</p></dt>\
                        <dd style="display:none">\
                            <label for="stream-%id%-cache"><input id="stream-%id%-cache" class="switcher clearcache" type="checkbox" name="stream-%id%-cache" checked value="yep"/><div><div></div></div></label>\
                        </dd>\
                        <dt class="multiline">Cache lifetime\
                            <p class="desc">Make it longer if feeds are rarely updated or shorter if you need frequent updates.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-cache-lifetime"><input id="stream-%id%-cache-lifetime" class="short clearcache" type="text" name="stream-%id%-cache-lifetime" value="10"/> minutes</label>\
                        </dd>\
                        <dt class="multiline">Show lightbox when clicked\
                            <p class="desc">Otherwise click will open original URL.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-gallery"><input id="stream-%id%-gallery" class="switcher" type="checkbox" checked name="stream-%id%-gallery" value="yep"/><div><div></div></div></label>\
                        </dd>\
                        <dt class="multiline">Private stream<p class="desc">Show only for logged in users.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-private"><input id="stream-%id%-private" class="switcher" type="checkbox" name="stream-%id%-private" value="yep"/><div><div></div></div></label>\
                        </dd>\
                        <dt class="multiline">Hide stream on a desktop<p class="desc">If you want to create desktop specific stream only.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-hide-on-desktop"><input id="stream-%id%-hide-on-desktop" class="switcher" type="checkbox" name="stream-%id%-hide-on-desktop" value="yep"/><div><div></div></div></label>\
                        </dd>\
                        <dt class="multiline">Hide stream on a mobile device<p class="desc">If you want to show stream content only on mobiles.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-hide-on-mobile"><input id="stream-%id%-hide-on-mobile" class="switcher" type="checkbox" name="stream-%id%-hide-on-mobile" value="yep"/><div><div></div></div></label>\
                        </dd>\
                        <dt class="multiline">Show only media posts<p class="desc">Will filter received posts and show only with media.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-show-only-media-posts"><input id="stream-%id%-show-only-media-posts" class="switcher" type="checkbox" name="stream-%id%-show-only-media-posts" value="yep"/><div><div></div></div></label>\
                        </dd>\
                        <dt class="multiline">Titles link<p class="desc">If yes and lightbox is enabled then titles will link to original posts.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-titles"><input id="stream-%id%-titles" class="switcher" type="checkbox" name="stream-%id%-titles" value="yep"/><div><div></div></div></label>\
                        </dd>\
                        <dt class="multiline">Hide meta info<p class="desc">Hide social network icon, name, timestamp in each post.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-hidemeta"><input id="stream-%id%-hidemeta" class="switcher" type="checkbox" name="stream-%id%-hidemeta" value="yep"/><div><div></div></div></label>\
                        </dd>\                        \
                        <dt class="multiline">Hide text<p class="desc">Hide text content of each post.</p></dt>\
                        <dd>\
                            <label for="stream-%id%-hidetext"><input id="stream-%id%-hidetext" class="switcher" type="checkbox" name="stream-%id%-hidetext" value="yep"/><div><div></div></div></label>\
                        </dd>\
                    </dl>\
                    <span id="stream-settings-sbmt-%id%" class="admin-button green-button submit-button">Save Changes</span>\
                </div>\
                                  %TV%\
                    <div class="section" id="cont-settings-%id%">\
                        <h1>Stream container settings</h1>\
                        <dl class="section-settings section-compact">\
                            <dt class="multiline">Stream heading\
                                <p class="desc">Leave empty to not show.</p></dt>\
                            <dd>\
                                <input id="stream-%id%-heading" type="text" name="stream-%id%-heading" placeholder="Enter heading"/>\
                            </dd>\
                            <dt class="multiline">Heading color and filter buttons\
                                <p class="desc">Click on field to open colorpicker. Filter buttons will have this color on hover.</p>\
                            </dt>\
                            <dd>\
                                <input id="heading-color-%id%" data-color-format="rgba" name="stream-%id%-headingcolor" type="text" value="rgb(154, 78, 141)" tabindex="-1">\
                                </dd>\
                                <dt>Stream subheading</dt>\
                                <dd>\
                                    <input id="stream-%id%-subheading" type="text" name="stream-%id%-subheading" placeholder="Enter subheading"/>\
                                </dd>\
                                <dt class="multiline">Subheading color\
                                    <p class="desc">You can also paste color in input.</p>\
                                </dt>\
                                <dd>\
                                    <input id="subheading-color-%id%" data-color-format="rgba" name="stream-%id%-subheadingcolor" type="text" value="rgb(114, 112, 114)" tabindex="-1">\
                                    </dd>\
                                    <dt><span class="valign">Headings alignment</span></dt>\
                                    <dd class="">\
                                        <div class="select-wrapper">\
                                            <select name="stream-%id%-hhalign" id="hhalign-%id%">\
                                                <option value="center" selected>Centered</option>\
                                                <option value="left">Left</option>\
                                                <option value="right">Right</option>\
                                            </select>\
                                        </div>\
                                    </dd>\
                                    <dt class="multiline">Container background color\
                                        <p class="desc">You can see it in live preview below.</p>\
                                    </dt>\
                                    <dd>\
                                        <input data-prop="backgroundColor" id="bg-color-%id%" data-color-format="rgba" name="stream-%id%-bgcolor" type="text" value="rgb(229, 229, 229)" tabindex="-1">\
                                        </dd>\
                                        <dt>Include filter and search in grid</dt>\
                                        <dd>\
                                            <label for="stream-%id%-filter"><input id="stream-%id%-filter" class="switcher" type="checkbox" name="stream-%id%-filter" checked value="yep"/><div><div></div></div></label>\
                                        </dd>\
                                        <dt>Filters and controls color\
                                        </dt>\
                                        <dd>\
                                            <input id="filter-color-%id%" data-color-format="rgba" name="stream-%id%-filtercolor" type="text" value="rgb(205, 205, 205)" tabindex="-1">\
                                            </dd>\
                                            <dt class="multiline">Slider on mobiles <p class="desc">On mobiles grid will turn into slider with 3 items per slide.</p></dt>\
                                            <dd>\
                                                <label for="stream-%id%-mobileslider"><input id="stream-%id%-mobileslider" class="switcher" type="checkbox" name="stream-%id%-mobileslider" value="yep"/><div><div></div></div></label>\
                                            </dd>\
                                            <dt class="multiline">Animate grid items <p class="desc">When they appear in viewport (otherwise all items are visible immediately).</p></dt>\
                                            <dd>\
                                                <label for="stream-%id%-viewportin"><input id="stream-%id%-viewportin" class="switcher" type="checkbox" name="stream-%id%-viewportin" checked value="yep"/><div><div></div></div></label>\
                                            </dd>\
                                        </dl>\
                                        <span id="stream-cont-sbmt-%id%" class="admin-button green-button submit-button">Save Changes</span>\
                                    </div>\
                                    <div class="section" id="stream-stylings-%id%">\
                                        <div class="design-step-1">\
                                            <h1 class="desc-following">Stream layout</h1>\
                                            <p class="desc">Choose layout to have different sets of options.</p>\
                                            <div class="choose-wrapper">\
                                                <input name="stream-%id%-layout" class="clearcache" id="stream-layout-grid-%id%" type="radio" value="grid"/><label for="stream-layout-grid-%id%"><span class="choose-button"><i class="flaticon-grid"></i>Normal view (grid)</span><br><span class="desc">Universal format for any page to achieve masonry style.</span></label>\
                                                <span class="or">Or</span>\
                                                <input name="stream-%id%-layout" class="clearcache" id="stream-layout-compact-%id%" type="radio" value="compact"/><label for="stream-layout-compact-%id%"><span class="choose-button"><i class="flaticon-bars"></i>Compact view</span><br><span class="desc">Special layout to put your stream in sidebar (not wider than 300px).</span></label>\
                                                </div>\
                                            </div>\
                                                <div class="design-step-2 layout-grid">\
                                                    <h1>Grid stylings</h1>\
                                                    <dl class="section-settings section-compact">\
                                                        <dt><span class="valign">Card dimensions</span></dt>\
                                                        <dd>Width: <input type="text" data-prop="width" id="width-%id%" name="stream-%id%-width" value="260" class="short clearcache"/> px <span class="space"></span> Margin: <input type="text" id="margin-%id%" value="20" class="short" name="stream-%id%-margin"/> px</dd>\
                                                        <dt><span class="valign">Card theme</span></dt>\
                                                        <dd class="theme-choice">\
                                                            <input id="theme-classic-%id%" type="radio" class="clearcache" name="stream-%id%-theme" checked value="classic"/> <label for="theme-classic-%id%">Classic</label> <input class="clearcache" id="theme-flat-%id%" type="radio" name="stream-%id%-theme" value="flat"/> <label for="theme-flat-%id%">Modern</label>\
                                                        </dd>\
                                                    </dl>\
                                                    <dl class="classic-style style-choice section-settings section-compact" style="display:block">\
                                                        <dt><span class="valign">Classic card style</span></dt>\
                                                        <dd>\
                                                            <div class="select-wrapper">\
                                                                <select name="stream-%id%-gc-style" id="gc-style-%id%">\
                                                                    <option value="style-1" selected>Centered meta, round icon</option>\
                                                                    <option value="style-2">Centered meta, bubble icon</option>\
                                                                    <option value="style-6">Centered meta, no social icon</option>\
                                                                    <option value="style-3">Userpic, rounded icon</option>\
                                                                    <option value="style-4">No userpic, rounded icon</option>\
                                                                    <option value="style-5">No userpic, bubble icon</option>\
                                                                </select>\
                                                            </div>\
                                                        </dd>\
                                                        <dt class="multiline">Card background color\
                                                            <p class="desc">Click on field to open colorpicker.</p>\
                                                        </dt>\
                                                        <dd>\
                                                            <input data-prop="backgroundColor" id="card-color-%id%" data-color-format="rgba" name="stream-%id%-cardcolor" type="text" value="rgb(255,255,255)" tabindex="-1">\
                                                            </dd>\
                                                            <dt class="multiline">Color for heading & name\
                                                                <p class="desc">Also for social buttons hover.</p>\
                                                            </dt>\
                                                            <dd>\
                                                                <input data-prop="color" id="name-color-%id%" data-color-format="rgba" name="stream-%id%-namecolor" type="text" value="rgb(154, 78, 141)" tabindex="-1">\
                                                                </dd>\
                                                                <dt>Regular text color\
                                                                </dt>\
                                                                <dd>\
                                                                    <input data-prop="color" id="text-color-%id%" data-color-format="rgba" name="stream-%id%-textcolor" type="text" value="rgb(85,85,85)" tabindex="-1">\
                                                                    </dd>\
                                                                    <dt>Links color</dt>\
                                                                    <dd>\
                                                                        <input data-prop="color" id="links-color-%id%" data-color-format="rgba" name="stream-%id%-linkscolor" type="text" value="rgb(94, 159, 202)" tabindex="-1">\
                                                                        </dd>\
                                                                        <dt class="multiline">Other text color\
                                                                            <p class="desc">Nicknames, timestamps.</p></dt>\
                                                                        <dd>\
                                                                            <input data-prop="color" id="other-color-%id%" data-color-format="rgba" name="stream-%id%-restcolor" type="text" value="rgb(132, 118, 129)" tabindex="-1">\
                                                                            </dd>\
                                                                            <dt>Card shadow</dt>\
                                                                            <dd>\
                                                                                <input data-prop="box-shadow" id="shadow-color-%id%" data-color-format="rgba" name="stream-%id%-shadow" type="text" value="rgba(0,0,0,.05)" tabindex="-1">\
                                                                                </dd>\
                                                                                <dt>Separator line color</dt>\
                                                                                <dd>\
                                                                                    <input data-prop="border-color" id="bcolor-%id%" data-color-format="rgba" name="stream-%id%-bcolor" type="text" value="rgba(240, 237, 231, 0.4)" tabindex="-1">\
                                                                                    </dd>\
                                                                                    <dt><span class="valign">Text alignment</span></dt>\
                                                                                    <dd class="">\
                                                                                        <div class="select-wrapper">\
                                                                                            <select name="stream-%id%-talign" id="talign-%id%">\
                                                                                                <option value="left" selected>Left</option>\
                                                                                                <option value="center">Centered</option>\
                                                                                                <option value="right">Right</option>\
                                                                                            </select>\
                                                                                        </div>\
                                                                                    </dd>\
                                                                                    <dt class="hide">Preview</dt>\
                                                                                    <dd class="preview">\
                                                                                        <h1>Live preview</h1>\
                                                                                        <div data-preview="bg-color" class="ff-stream-wrapper ff-layout-grid ff-theme-classic ff-style-1 shuffle">\
                                                                                            <div data-preview="card-color,shadow-color,width" class="ff-item ff-twitter shuffle-item filtered" style="visibility: visible; opacity:1;">\
                                                                                                <h4 data-preview="name-color">Header example</h4>\
                                                                                                <p data-preview="text-color">This is regular text paragraph, can be tweet, facebook post etc. This is example of <a href="#" data-preview="links-color">link in text</a>.</p>\
                                                                                                <span class="ff-img-holder" style="max-height: 171px"><img src="%plugin_url%/assets/67.png" style="width:100%;"></span>\
                                                                                                    <div class="ff-item-meta">\
                                                                                                        <span class="separator" data-preview="bcolor"></span>\
                                                                                                        <span class="ff-userpic" style="background:url(%plugin_url%/assets/chevy.jpeg)"><i class="ff-icon" data-overrideProp="border-color" data-preview="card-color"><i class="ff-icon-inner"></i></i></span><a data-preview="name-color" target="_blank" rel="nofollow" href="#" class="ff-name">Looks Awesome</a><a data-preview="other-color" target="_blank" rel="nofollow" href="#" class="ff-nickname">@looks_awesome</a><a data-preview="other-color" target="_blank" rel="nofollow" href="#" class="ff-timestamp">21m ago </a>\
                                                                                                    </div>\
                                                                                                </div>\
                                                                                            </div>\
                                                                                        </dd>\
                                                                                    </dl>\
                                                                                    <dl class="flat-style style-choice section-settings section-compact" style="display:none">\
                                                                                        <dt><span class="valign">Modern card style</span></dt>\
                                                                                        <dd class="flat-style style-choice">\
                                                                                            <div class="select-wrapper">\
                                                                                                <select name="stream-%id%-gf-style" id="gf-style-%id%">\
                                                                                                    <option value="style-3" selected>Cornered social icon</option>\
                                                                                                    <option value="style-1">Rounded userpic</option>\
                                                                                                    <option value="style-2">Square userpic</option>\
                                                                                                </select>\
                                                                                            </div>\
                                                                                        </dd>\
                                                                                        <dt class="multiline">Card background color\
                                                                                            <p class="desc">Click on field to open colorpicker.</p>\
                                                                                        </dt>\
                                                                                        <dd>\
                                                                                            <input data-prop="backgroundColor" id="fcolor-%id%" data-color-format="rgba" name="stream-%id%-fcardcolor" type="text" value="rgb(64,68,71)" tabindex="-1">\
                                                                                            </dd>\
                                                                                            <dt class="multiline">Secondary background color\
                                                                                                <p class="desc">Depends on card content.</p>\
                                                                                            </dt>\
                                                                                            <dd>\
                                                                                                <input data-prop="backgroundColor" id="fscolor-%id%" data-color-format="rgba" name="stream-%id%-fscardcolor" type="text" value="rgb(44,45,46)" tabindex="-1">\
                                                                                                </dd>\
                                                                                                <dt>Heading and regular text color\
                                                                                                </dt>\
                                                                                                <dd>\
                                                                                                    <input data-prop="color" id="ftextcolor-%id%" data-color-format="rgba" name="stream-%id%-ftextcolor" type="text" value="rgb(255,255,255)" tabindex="-1">\
                                                                                                    </dd>\
                                                                                                    <dt class="multiline">Card color for links & name\
                                                                                                        <p class="desc">Also for social button hover.</p>\
                                                                                                    </dt>\
                                                                                                    <dd>\
                                                                                                        <input data-prop="color" id="fnamecolor-%id%" data-color-format="rgba" name="stream-%id%-fnamecolor" type="text" value="rgb(94,191,255);" tabindex="-1">\
                                                                                                        </dd>\
                                                                                                        <dt class="multiline">Color for other texts\
                                                                                                            <p class="desc">Nickname and timestamp.</p>\
                                                                                                        </dt>\
                                                                                                        <dd>\
                                                                                                            <input data-prop="color" id="frest-%id%" data-color-format="rgba" name="stream-%id%-frestcolor" type="text" value="rgb(175,195,208);" tabindex="-1">\
                                                                                                            </dd>\
                                                                                                            <dt>Separator line color</dt>\
                                                                                                            <dd>\
                                                                                                                <input data-prop="border-color" id="fbcolor-%id%" data-color-format="rgba" name="stream-%id%-fbcolor" type="text" value="rgba(255,255,255,0.4)" tabindex="-1">\
                                                                                                                </dd>\
                                                                                                                <dt class="multiline">Card border\
                                                                                                                    <p class="desc">If photo is merging to background.</p></dt>\
                                                                                                                <dd>\
                                                                                                                    <label for="stream-%id%-mborder-yep"><input id="stream-%id%-mborder-yep" class="switcher" type="checkbox" name="stream-%id%-mborder" value="yep"/><div><div></div></div></label>\
                                                                                                                </dd>\
                                                                                                                <dt><span class="valign">Text alignment</span></dt>\
                                                                                                                <dd class="">\
                                                                                                                    <div class="select-wrapper">\
                                                                                                                        <select name="stream-%id%-ftalign" id="ftalign-%id%">\
                                                                                                                            <option value="center" selected>Centered</option>\
                                                                                                                            <option value="left" >Left</option>\
                                                                                                                            <option value="right">Right</option>\
                                                                                                                        </select>\
                                                                                                                    </div>\
                                                                                                                </dd>\
                                                                                                                <dt class="hide">Preview</dt>\
                                                                                                                <dd class="preview">\
                                                                                                                    <h1>Live preview</h1>\
                                                                                                                    <div data-preview="bg-color" class="ff-stream-wrapper ff-layout-grid ff-theme-flat ff-style-1 shuffle">\
                                                                                                                        <div data-preview="fcolor, width" class="ff-item ff-twitter shuffle-item filtered" style="visibility: visible; opacity:1;">\
                                                                                                                            <div class="ff-item-cont">\
                                                                                                                                <span class="overlay" data-preview="fscolor"></span>\
                                                                                                                                <span class="ff-img-holder" style="max-height:162px"><img src="%plugin_url%/assets/7.jpg" style="width:100%;"></span>\
                                                                                                                                    <p data-preview="ftextcolor, fbcolor">This is regular text paragraph, can be tweet, facebook post etc. This is example of <a href="#" data-preview="fnamecolor">link in text</a>. Good day!</p>\
                                                                                                                                    <div class="ff-item-meta">\
                                                                                                                                        <span class="ff-userpic" style="background:url(%plugin_url%/assets/Steve-Zissou.png)"><i class="ff-icon"><i class="ff-icon-inner"></i></i></span><a data-preview="fnamecolor" target="_blank" rel="nofollow" href="#" class="ff-name">Looks Awesome</a><a data-preview="frest" target="_blank" rel="nofollow" href="#" class="ff-nickname">@looks_awesome</a><a data-preview="frest" target="_blank" rel="nofollow" href="#" class="ff-timestamp">21m ago </a>\
                                                                                                                                    </div>\
                                                                                                                                </div>\
                                                                                                                            </div>\
                                                                                                                        </div>\
                                                                                                                    </dd>\
                                                                                                                </dl>\
                                                                                                                <span id="stream-stylings-sbmt-%id%" class="admin-button green-button submit-button">Save Changes</span>\
                                                                                                            </div>\
                                                                                                            <div class="design-step-2 layout-compact">\
                                                                                                                <h1>Compact stylings</h1>\
                                                                                                                <dl class="section-settings section-compact">\
                                                                                                                    <dt><span class="valign">Item style</span></dt>\
                                                                                                                    <dd>\
                                                                                                                        <div class="select-wrapper">\
                                                                                                                            <select name="stream-%id%-compact-style" id="compact-style-%id%">\
                                                                                                                                <option value="c-style-1" selected>Text and meta in container</option>\
                                                                                                                                <option value="c-style-2">Text in bubble, meta separately</option>\
                                                                                                                            </select>\
                                                                                                                        </div>\
                                                                                                                    </dd>\
                                                                                                                    <dt class="multiline">Color for heading & name\
                                                                                                                        <p class="desc">Also for social button hover.</p>\
                                                                                                                    </dt>\
                                                                                                                    <dd>\
                                                                                                                        <input data-prop="color" id="cnamecolor-%id%" data-color-format="rgba" name="stream-%id%-cnamecolor" type="text" value="rgb(154, 78, 141)" tabindex="-1">\
                                                                                                                        </dd>\
                                                                                                                        <dt>Regular text color\
                                                                                                                        </dt>\
                                                                                                                        <dd>\
                                                                                                                            <input data-prop="color" id="ctextcolor-%id%" data-color-format="rgba" name="stream-%id%-ctextcolor" type="text" value="rgb(85,85,85)" tabindex="-1">\
                                                                                                                            </dd>\
                                                                                                                            <dt>Links color</dt>\
                                                                                                                            <dd>\
                                                                                                                                <input data-prop="color" id="clinkscolor-%id%" data-color-format="rgba" name="stream-%id%-clinkscolor" type="text" value="rgb(94, 159, 202)" tabindex="-1">\
                                                                                                                                </dd>\
                                                                                                                                <dt class="multiline">Other text color\
                                                                                                                                    <p class="desc">Nicknames, timestamps.</p></dt>\
                                                                                                                                <dd>\
                                                                                                                                    <input data-prop="color" id="crestcolor-%id%" data-color-format="rgba" name="stream-%id%-crestcolor" type="text" value="rgb(132, 118, 129)" tabindex="-1">\
                                                                                                                                    </dd>\
                                                                                                                                    <dt>Item border color</dt>\
                                                                                                                                    <dd>\
                                                                                                                                        <input data-prop="border-color" id="cbcolor-%id%" data-color-format="rgba" name="stream-%id%-cbcolor" type="text" value="rgba(226,226,226,1)" tabindex="-1">\
                                                                                                                                        </dd>\
                                                                                                                                        <dt><span class="valign">Show in item meta</span></dt>\
                                                                                                                                        <dd>\
                                                                                                                                            <div class="select-wrapper">\
                                                                                                                                                <select name="stream-%id%-cmeta" id="cmeta-%id%">\
                                                                                                                                                    <option value="upic" selected>User picture</option>\
                                                                                                                                                    <option value="icon">Social icon</option>\
                                                                                                                                                </select>\
                                                                                                                                            </div>\
                                                                                                                                        </dd>\
                                                                                                                                        <dt><span class="valign">Text alignment</span></dt>\
                                                                                                                                        <dd class="">\
                                                                                                                                            <div class="select-wrapper">\
                                                                                                                                                <select name="stream-%id%-calign" id="calign-%id%">\
                                                                                                                                                    <option value="left" selected>Left</option>\
                                                                                                                                                    <option value="center" >Centered</option>\
                                                                                                                                                    <option value="right">Right</option>\
                                                                                                                                                </select>\
                                                                                                                                            </div>\
                                                                                                                                        </dd>\
                                                                                                                                        <dt class="multiline">Number of items to show in slide\
                                                                                                                                            <p class="desc">Leave empty to show all at once in long container.</p>\
                                                                                                                                        </dt>\
                                                                                                                                        <dd>\
                                                                                                                                            <input class="short" id="cards-num-%id%" name="stream-%id%-cards-num" type="text" value="3" tabindex="-1">\
                                                                                                                                            </dd>\
                                                                                                                                            <dt class="multiline">Scroll top when user slides<p class="desc">Recommended when there are many items in one slide.</p></dt>\
                                                                                                                                            <dd>\
                                                                                                                                                <label for="stream-%id%-scrolltop"><input id="stream-%id%-scrolltop" class="switcher" type="checkbox" name="stream-%id%-scrolltop" checked value="yep"/><div><div></div></div></label>\
                                                                                                                                            </dd>\
                                                                                                                                            <dt class="hide">Preview</dt>\
                                                                                                                                            <dd class="preview  ff-layout-compact">\
                                                                                                                                                <h1>Live preview</h1>\
                                                                                                                                                <div data-preview="bg-color" class="ff-stream-wrapper ff-c-style-1 ff-c-upic shuffle">\
                                                                                                                                                    <div data-preview="fcolor" class="ff-item ff-twitter shuffle-item filtered" style="visibility: visible; opacity:1;">\
                                                                                                                                                        <div data-preview="cbcolor" class="ff-item-cont">\
                                                                                                                                                            <span class="corner1" data-preview="cbcolor" data-overrideProp="border-top-color"></span>\
                                                                                                                                                            <h4 data-preview="cnamecolor">Header example</h4>\
                                                                                                                                                            <span class="ff-img-holder" style="max-height:152px"><img src="%plugin_url%/assets/compact.jpg" style="width:100%;"></span>\
                                                                                                                                                                <p data-preview="ctextcolor">This is regular text paragraph, can be tweet, facebook post etc. This is example of <a href="#" data-preview="clinkscolor">link in text</a>. Good day!</p>\
                                                                                                                                                                <div class="ff-item-meta">\
                                                                                                                                                                    <span class="ff-userpic" style="background:url(%plugin_url%/assets/Steve-Zissou.png)"><i class="ff-icon"><i class="ff-icon-inner"></i></i></span><a data-preview="cnamecolor" target="_blank" rel="nofollow" href="#" class="ff-name">Looks Awesome</a><a data-preview="crestcolor" target="_blank" rel="nofollow" href="#" class="ff-nickname">@looks_awesome</a><a data-preview="crestcolor" target="_blank" rel="nofollow" href="#" class="ff-timestamp">21m ago </a>\
                                                                                                                                                                </div>\
                                                                                                                                                                <span class="corner2" data-preview="bg-color"  data-overrideProp="border-top-color"></span>\
                                                                                                                                                            </div>\
                                                                                                                                                        </div>\
                                                                                                                                                    </div>\
                                                                                                                                                </dd>\
                                                                                                                                            </dl>\
                                                                                                                                            <span id="stream-stylings-sbmt-%id%" class="admin-button green-button submit-button">Save Changes</span>\
                                                                                                                                        </div>\
                                                                                                                                    </div>\
                                                                                                                                    <div class="section" id="css-%id%">\
                                                                                                                                        <h1 class="desc-following">Stream custom CSS</h1>\
                                                                                                                                        <p class="desc" style="margin-bottom:10px">\
                                                                                                                                        Prefix your selectors with <strong>#ff-stream-%id%</strong> to target this specific stream.\
                                                                                                                                        </p>\
                                                                                                                                        <textarea  name="stream-%id%-css" cols="100" rows="10" id="stream-%id%-css"/> </textarea>\
                                                                                                                                    <p style="margin-top:10px"><span id="stream-css-sbmt-%id%" class="admin-button green-button submit-button">Save Changes</span><p>\
                                                                                                                                    </div>\
                                                                                                                                    </div>', twitterView: '\
                                                                                                                                    <div class="feed-view" data-feed-type="twitter" data-uid="%uid%">\
                                                                                                                                        <h1>Content settings for Twitter feed</h1>\
                                                                                                                                        <dl class="section-settings">\
                                                                                                                                            <dt>Timeline type </dt>\
                                                                                                                                            <dd>\
                                                                                                                                                <input id="%uid%-home-timeline-type" type="radio" name="%uid%-timeline-type" value="home_timeline" checked/>\
                                                                                                                                                <label for="%uid%-home-timeline-type">Home timeline</label><br><br>\
                                                                                                                                                <input id="%uid%-user-timeline-type" type="radio" name="%uid%-timeline-type" value="user_timeline" />\
                                                                                                                                                <label for="%uid%-user-timeline-type">User timeline</label><br><br>\
                                                                                                                                                    <input id="%uid%-search-timeline-type" type="radio" name="%uid%-timeline-type" value="search"/>\
                                                                                                                                                    <label for="%uid%-search-timeline-type">Tweets by search</label><br><br>\
                                                                                                                                                        <input id="%uid%-list-timeline-type" type="radio" name="%uid%-timeline-type" value="list_timeline"/>\
                                                                                                                                                        <label for="%uid%-list-timeline-type">User list</label><br><br>\
                                                                                                                                                            <input id="%uid%-fav-timeline-type" type="radio" name="%uid%-timeline-type" value="favorites"/>\
                                                                                                                                                            <label for="%uid%-fav-timeline-type">User favorites</label><br><br>\
                                                                                                                                                            </dd>\
                                                                                                                                                                <dt>Content to show</dt>\
                                                                                                                                                                <dd><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                                                                                    <p class="desc">1. For home timeline enter you own nickname (without @)<br>\
                                                                                                                                                                    2. For user timeline enter nickname (without @) of any public Twitter<br>\
                                                                                                                                                                        3. For search enter any word or #hashtag (look <a href="https://dev.twitter.com/rest/public/search">here</a> for advanced terms)<br>\
                                                                                                                                                                            4. For user list enter username here and list name in field below<br>\
                                                                                                                                                                                5. For user favorites enter username\
                                                                                                                                                                                </p>\
                                                                                                                                                                            </dd>\
                                                                                                                                                                            <dt>List name</dt>\
                                                                                                                                                                            <dd>\
                                                                                                                                                                                <input type="text" name="%uid%-list-name" placeholder=""/>\
                                                                                                                                                                                <p class="desc">Required if you choose list feed.</p>\
                                                                                                                                                                            </dd>\
                                                                                                                                                                            <dt class="">Tweets language</dt>\
                                                                                                                                                                            <dd>\
                                                                                                                                                                                <div class="select-wrapper">\
                                                                                                                                                                                    <select id="%uid%-lang" name="%uid%-lang">\
                                                                                                                                                                                        <option value="all" selected>Any Language</option>\
                                                                                                                                                                                        <option value="am">Amharic (አማርኛ)</option>\
                                                                                                                                                                                        <option value="ar">Arabic (العربية)</option>\
                                                                                                                                                                                        <option value="bg">Bulgarian (Български)</option>\
                                                                                                                                                                                        <option value="bn">Bengali (বাংলা)</option>\
                                                                                                                                                                                        <option value="bo">Tibetan (བོད་སྐད)</option>\
                                                                                                                                                                                        <option value="chr">Cherokee (ᏣᎳᎩ)</option>\
                                                                                                                                                                                        <option value="da">Danish (Dansk)</option>\
                                                                                                                                                                                        <option value="de">German (Deutsch)</option>\
                                                                                                                                                                                        <option value="dv">Maldivian (ދިވެހި)</option>\
                                                                                                                                                                                        <option value="el">Greek (Ελληνικά)</option>\
                                                                                                                                                                                        <option value="en">English (English)</option>\
                                                                                                                                                                                        <option value="es">Spanish (Español)</option>\
                                                                                                                                                                                        <option value="fa">Persian (فارسی)</option>\
                                                                                                                                                                                        <option value="fi">Finnish (Suomi)</option>\
                                                                                                                                                                                        <option value="fr">French (Français)</option>\
                                                                                                                                                                                        <option value="gu">Gujarati (ગુજરાતી)</option>\
                                                                                                                                                                                        <option value="iw">Hebrew (עברית)</option>\
                                                                                                                                                                                        <option value="hi">Hindi (हिंदी)</option>\
                                                                                                                                                                                        <option value="hu">Hungarian (Magyar)</option>\
                                                                                                                                                                                        <option value="hy">Armenian (Հայերեն)</option>\
                                                                                                                                                                                        <option value="in">Indonesian (Bahasa Indonesia)</option>\
                                                                                                                                                                                        <option value="is">Icelandic (Íslenska)</option>\
                                                                                                                                                                                        <option value="it">Italian (Italiano)</option>\
                                                                                                                                                                                        <option value="iu">Inuktitut (ᐃᓄᒃᑎᑐᑦ)</option>\
                                                                                                                                                                                        <option value="ja">Japanese (日本語)</option>\
                                                                                                                                                                                        <option value="ka">Georgian (ქართული)</option>\
                                                                                                                                                                                        <option value="km">Khmer (ខ្មែរ)</option>\
                                                                                                                                                                                        <option value="kn">Kannada (ಕನ್ನಡ)</option>\
                                                                                                                                                                                        <option value="ko">Korean (한국어)</option>\
                                                                                                                                                                                        <option value="lo">Lao (ລາວ)</option>\
                                                                                                                                                                                        <option value="lt">Lithuanian (Lietuvių)</option>\
                                                                                                                                                                                        <option value="ml">Malayalam (മലയാളം)</option>\
                                                                                                                                                                                        <option value="my">Myanmar (မြန်မာဘာသာ)</option>\
                                                                                                                                                                                        <option value="ne">Nepali (नेपाली)</option>\
                                                                                                                                                                                        <option value="nl">Dutch (Nederlands)</option>\
                                                                                                                                                                                        <option value="no">Norwegian (Norsk)</option>\
                                                                                                                                                                                        <option value="or">Oriya (ଓଡ଼ିଆ)</option>\
                                                                                                                                                                                        <option value="pa">Panjabi (ਪੰਜਾਬੀ)</option>\
                                                                                                                                                                                        <option value="pl">Polish (Polski)</option>\
                                                                                                                                                                                        <option value="pt">Portuguese (Português)</option>\
                                                                                                                                                                                        <option value="ru">Russian (Русский)</option>\
                                                                                                                                                                                        <option value="si">Sinhala (සිංහල)</option>\
                                                                                                                                                                                        <option value="sv">Swedish (Svenska)</option>\
                                                                                                                                                                                        <option value="ta">Tamil (தமிழ்)</option>\
                                                                                                                                                                                        <option value="te">Telugu (తెలుగు)</option>\
                                                                                                                                                                                        <option value="th">Thai (ไทย)</option>\
                                                                                                                                                                                        <option value="tl">Tagalog (Tagalog)</option>\
                                                                                                                                                                                        <option value="tr">Turkish (Türkçe)</option>\
                                                                                                                                                                                        <option value="ur">Urdu (ﺍﺭﺩﻭ)</option>\
                                                                                                                                                                                        <option value="vi">Vietnamese (Tiếng Việt)</option>\
                                                                                                                                                                                        <option value="zh">Chinese (中文)</option>\
                                                                                                                                                                                    </select>\
                                                                                                                                                                                </div>\
                                                                                                                                                                                <p class="desc">As detected by Twitter. Only for search feeds.</p>\
                                                                                                                                                                            </dd>\
                                                                                                                                                                            <!--\
                                                                                                                                                                            <dt class="multiline">Geolocalization<p class="desc">Only for search</p></dt>\
                                                                                                                                                                            <dd>\
                                                                                                                                                                                <label for="%uid%-use-geo"><input id="%uid%-use-geo" class="switcher" type="checkbox" name="%uid%-use-geo" value="yep"/><div><div></div></div></label>\
                                                                                                                                                                                <div id="%uid%-geo-container" style="width: 500px; height: 400px; display: none;"></div>\
                                                                                                                                                                                <input type="hidden" id="%uid%-latitude" name="%uid%-latitude" value=""/>\
                                                                                                                                                                                <input type="hidden" id="%uid%-longitude" name="%uid%-longitude" value=""/>\
                                                                                                                                                                                <input type="text" id="%uid%-radius" name="%uid%-radius" placeholder="Enter radius (in meter)" style="display: none;"/>\
                                                                                                                                                                            </dd>-->\
                                                                                                                                                                            <dt>Include retweets (if present)</dt>\
                                                                                                                                                                            <dd>\
                                                                                                                                                                                <label for="%uid%-retweets"><input id="%uid%-retweets" class="switcher" type="checkbox" name="%uid%-retweets" value="yep"/><div><div></div></div></label>\
                                                                                                                                                                            </dd>\
                                                                                                                                                                            <dt>Include replies (if present)</dt>\
                                                                                                                                                                            <dd>\
                                                                                                                                                                                <label for="%uid%-replies"><input id="%uid%-replies" class="switcher" type="checkbox" name="%uid%-replies" value="yep"/><div><div></div></div></label>\
                                                                                                                                                                            </dd>\
                                                                                                                                                                        </dl>\
                                                                                                                                                                    </div>\
                                                                                                                                                                    ', facebookView: '\
                                                                                                                                                                        <div class="feed-view"  data-feed-type="facebook" data-uid="%uid%">\
                                                                                                                                                                            <h1>Content settings for Facebook feed</h1>\
                                                                                                                                                                            <dl class="section-settings">\
                                                                                                                                                                                <dt>Timeline type </dt>\
                                                                                                                                                                                <dd>\
                                                                                                                                                                                        <input id="%uid%-page-timeline-type" type="radio" name="%uid%-timeline-type" value="page_timeline" checked />\
                                                                                                                                                                                        <label for="%uid%-page-timeline-type">Facebook public page</label><br><br>\
                                                                                                                                                                                            <input id="%uid%-group-timeline-type" type="radio" name="%uid%-timeline-type" value="group" />\
                                                                                                                                                                                            <label for="%uid%-group-timeline-type">Public group page</label><br><br>\
                                                                                                                                                                                            <input id="%uid%-album-timeline-type" type="radio" name="%uid%-timeline-type" value="album" />\
                                                                                                                                                                                            <label for="%uid%-album-timeline-type">Public album</label>\
                                                                                                                                                                                        </dd>\
                                                                                                                                                                                            <dt>\
                                                                                                                                                                                            Content to show\
                                                                                                                                                                                            </dt>\
                                                                                                                                                                                            <dd><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                                                                                                                <p class="desc">1. For News feed enter your own nickname to stream what you see on facebook.com<br>\
                                                                                                                                                                                                2. For your page Posts enter your own nickname<br>\
                                                                                                                                                                                                    3. For public Page posts enter nickname of any public page (or ID if it is in page address)<br>\
                                                                                                                                                                                                        4. For public Group enter its ID (use <a target="_blank" href="http://lookup-id.com/">this tool</a>)<br>\
                                                                                                                                                                                                        5. For public Album enter its ID. <a target="_blank" href="http://social-streams.com/doc/find-facebook-album-id/">Where to find?</a>\
                                                                                                                                                                                                        </p></dd>\
                                                                                                                                                                                                </dl>\
                                                                                                                                                                                                </div>\
                                                                                                                                                                                            ',
  vimeoView: '\
      <div class="feed-view"  data-feed-type="vimeo" data-uid="%uid%">\
          <h1>Content settings for Vimeo feed</h1>\
          <dl class="section-settings">\
              <dt>Feed type </dt>\
              <dd>\
                  <input id="%uid%-type-videos" type="radio" name="%uid%-timeline-type" value="videos" checked/>\
                  <label for="%uid%-type-videos">Own videos</label><br><br>\
                  <input id="%uid%-type-likes" type="radio" name="%uid%-timeline-type" value="likes" />\
                  <label for="%uid%-type-likes">Liked videos</label><br><br>\
                      <input id="%uid%-type-channel" type="radio" name="%uid%-timeline-type" value="channel" />\
                      <label for="%uid%-type-channel">Channel videos</label><br><br>\
                          <input id="%uid%-type-group" type="radio" name="%uid%-timeline-type" value="group" />\
                          <label for="%uid%-type-group">Group videos</label><br><br>\
                              <input id="%uid%-type-album" type="radio" name="%uid%-timeline-type" value="album" />\
                              <label for="%uid%-type-album">Album videos</label>\
                          </dd>\
                              <dt>\
                              Content to show\
                              </dt>\
                              <dd>\
                                  <input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                  <p class="desc">Enter nickname of Vimeo user/album/channel (only users have <strong>liked</strong> videos feed).</p>\
                              </dd>\
                          </dl>\
                      </div>\
                      ', googleView: '\
                          <div class="feed-view" data-feed-type="google" data-uid="%uid%">\
                              <h1>Content settings for Google+ feed</h1>\
                              <dl class="section-settings">\
                                  <dt>\
                                  Content to show\
                                  </dt>\
                                  <dd><input type="text" name="%uid%-content" placeholder="+UserName"/>\
                                      <p class="desc">Google username starting with plus or numeric ID of your page.</p>\
                                  </dd>\
                              </dl>\
                          </div>\
                      ', rssView: '\
                          <div class="feed-view"  data-feed-type="rss" data-uid="%uid%">\
                              <h1>Content settings for RSS feed</h1>\
                              <dl class="section-settings">\
                                  <dt class="">Content to show</dt>\
                                  <dd class=""><input type="text" name="%uid%-content" placeholder="Enter RSS feed full URL"/></dd>\
                                  <dt class="multiline">RSS channel name<p class="desc">Fill if RSS does not have own title.</p></dt><dd><input type="text" name="%uid%-channel-name" placeholder="Enter name to show in card"/></dd>\
                                  <dt>Avatar url</dt>\
                                  <dd>\
                                      <input type="text" name="%uid%-avatar-url" placeholder="Enter avatar full URL"/>\
                                  </dd>\
                                  <dt>Hide caption</dt>\
                                  <dd>\
                                      <label for="%uid%-hide-caption"><input id="%uid%-hide-caption" class="switcher" type="checkbox" name="%uid%-hide-caption" value="yep"/><div><div></div></div></label>\
                                  </dd>\
                                  <dt>Rich text</dt>\
                                  <dd>\
                                      <label for="%uid%-rich-text"><input id="%uid%-rich-text" class="switcher" type="checkbox" name="%uid%-rich-text" value="yep"/><div><div></div></div></label>\
                                  </dd>\
                              </dl>\
                          </div>\
                      ', pinterestView: '\
                          <div class="feed-view" data-feed-type="pinterest" data-uid="%uid%">\
                              <h1>Content settings for Pinterest feed</h1>\
                              <dl class="section-settings">\
                                  <dt class="">Content to show</dt>\
                                  <dd class=""><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                      <p class="desc">e.g. <strong>elainen</strong> (for user feed) or <strong>elainen/cute-animals</strong> (for user board).\
                                      </p></dd>\
                                  <dt>Hide text</dt>\
                                  <dd>\
                                      <label for="%uid%-hide-text"><input id="%uid%-hide-text" class="switcher" type="checkbox" name="%uid%-hide-text" value="yep"/><div><div></div></div></label>\
                                  </dd>\
                              </dl>\
                          </div>\
                      ', instagramView: '\
                          <div class="feed-view" data-feed-type="instagram" data-uid="%uid%">\
                              <h1>Content settings for Instagram feed</h1>\
                              <dl class="section-settings">\
                                  <dt>Timeline type</dt>\
                                  <dd>\
                                      <input id="%uid%-home-timeline-type" type="radio" checked name="%uid%-timeline-type" value="home_timeline"/>\
                                      <label for="%uid%-home-timeline-type">Home timeline</label><br><br>\
                                      <input id="%uid%-likes-type"  type="radio" name="%uid%-timeline-type" value="likes"/>\
                                      <label for="%uid%-likes-type">Likes timeline</label><br><br>\
                                          <input id="%uid%-user-timeline-type"  type="radio" name="%uid%-timeline-type" value="user_timeline"/>\
                                          <label for="%uid%-user-timeline-type">User</label><br><br>\
                                              <input id="%uid%-popular-timeline-type" type="radio" name="%uid%-timeline-type" value="popular"/>\
                                              <label for="%uid%-popular-timeline-type">Popular</label><br><br>\
                                                  <input id="%uid%-search-timeline-type" type="radio" name="%uid%-timeline-type" value="tag"/>\
                                                  <label for="%uid%-search-timeline-type">Hashtag</label>\
                                              </dt>\
                                                  <dt>Content to show</dt>\
                                                  <dd>\
                                                      <input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                      <p class="desc">1. For home timeline enter you own nickname<br>\
                                                      2. For likes timeline enter you own nickname<br>\
                                                          3. For user timeline enter nickname of any public Instagram account<br>\
                                                              4. For popular enter any word<br>\
                                                                  5. For photos by hashtag enter one word without #\
                                                                  </p>\
                                                              </dd>\
                                                              <dt>Hide text</dt>\
                                                              <dd>\
                                                                  <label for="%uid%-hide-text"><input id="%uid%-hide-text" class="switcher" type="checkbox" name="%uid%-hide-text" value="yep"/><div><div></div></div></label>\
                                                              </dd>\
                                                          </dl>\
                                                      </div>\
                                                      ', wordpressView: '\
                                                          <div class="feed-view" data-feed-type="wordpress" data-uid="%uid%">\
                                                              <h1>Content settings for WordPress feed</h1>\
                                                              <dl class="section-settings">\
                                                                  <dt>Show latest</dt>\
                                                                  <dd>\
                                                                      <input id="%uid%-wordpress-posts" type="radio" name="%uid%-wordpress-type" checked value="posts"/> <label for="%uid%-wordpress-posts">Posts</label>\
                                                                      <input id="%uid%-wordpress-comments" type="radio" name="%uid%-wordpress-type" value="comments"/> <label for="%uid%-wordpress-comments">Comments</label>\
                                                                  </dd>\
                                                                  <dt>Category Name</dt>\
                                                                  <dd>\
                                                                      <input type="text" name="%uid%-category-name" placeholder="Category name"/>\
                                                                      <p class="desc">If you choose Posts then you can show specific category,<br> enter category name or names divided by comma or leave empty to show all.</p>\
                                                                      </dd>\
                                                                      <dt>Post ID</dt>\
                                                                      <dd>\
                                                                          <input type="text" name="%uid%-post-id" placeholder="Post ID"/>\
                                                                          <p class="desc">If you choose Comments then you can show specific post comments,<br> enter post ID.</p>\
                                                                          </dd>\
                                                                          <dt>Custom post slug</dt>\
                                                                          <dd>\
                                                                              <input type="text" name="%uid%-slug" placeholder="Custom post slug"/>\
                                                                              <p class="desc">If you want to show only custom posts of specific type.</p>\
                                                                          </dd>\
                                                                          <dt>Shortcodes in post</dt>\
                                                                          <dd>\
                                                                          <input id = "%uid%-strip" type = "radio" name = "%uid%-shortcodes" checked value = "strip" /> <label for="%uid%-strip">Remove shortcodes</label>\
                                                                          <input id="%uid%-expand" type="radio" name="%uid%-shortcodes" value="expand"/> <label for="%uid%-expand">Expand shortcodes</label> <br>\
                                                                              <p class="desc" style="margin-top: 5px">Disclaimer: we do not guarantee compatibility with any shortcodes if you choose expanding option</p>\
                                                                          </dd>\
                                                                          <dt>Include post title in comments</dt>\
                                                                          <dd>\
                                                                              <label for="%uid%-include-post-title">\
                                                                                  <input id="%uid%-include-post-title" class="switcher" type="checkbox" name="%uid%-include-post-title" value="yep"/> <div><div></div></div>\
                                                                              </label>\
                                                                          </dd>\
                                                                          <dt>Use excerpt instead of full text</dt>\
                                                                          <dd>\
                                                                              <label for="%uid%-use-excerpt">\
                                                                                  <input id="%uid%-use-excerpt" class="switcher" type="checkbox" name="%uid%-use-excerpt" value="yep"/> <div><div></div></div>\
                                                                              </label>\
                                                                          </dd>\
                                                                          </dl>\
                                                                          </div>\
                                                                          ', youtubeView: '\
                                                                      <div class="feed-view" data-feed-type="youtube" data-uid="%uid%">\
                                                                          <h1>Content settings for YouTube feed</h1>\
                                                                          <dl class="section-settings">\
                                                                              <dt>Timeline type</dt>\
                                                                              <dd>\
                                                                                  <input id="%uid%-user-timeline-type"  type="radio" name="%uid%-timeline-type" value="user_timeline" checked/>\
                                                                                  <label for="%uid%-user-timeline-type">User</label><br><br>\
                                                                                  <input id="%uid%-channel-type"  type="radio" name="%uid%-timeline-type" value="channel"/>\
                                                                                  <label for="%uid%-channel-type">Channel</label><br><br>\
                                                                                      <input id="%uid%-pl-type"  type="radio" name="%uid%-timeline-type" value="playlist"/>\
                                                                                      <label for="%uid%-pl-type">Playlist</label><br><br>\
                                                                                          <input id="%uid%-search-timeline-type" type="radio" name="%uid%-timeline-type" value="search"/>\
                                                                                          <label for="%uid%-search-timeline-type">Search</label>\
                                                                                      </dt>\
                                                                                          <dt class="">Content to show</dt>\
                                                                                          <dd class=""><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                              <p class="desc">\
                                                                                              1. For user feed enter YouTube username with public access eg. <strong>VEVO</strong><br>\
                                                                                              2. For channel enter channel ID<br>\
                                                                                                  3. For playlist enter playlist ID<br>\
                                                                                                      4. For search enter any word</p>\
                                                                                                  </dd>\
                                                                                                  <dt>Playlist reverse order</dt>\
                                                                          <dd>\
                                                                              <label for="%uid%-playlist-order">\
                                                                                  <input id="%uid%-playlist-order" class="switcher" type="checkbox" name="%uid%-playlist-order" value="yep"/> <div><div></div></div>\
                                                                              </label>\
                                                                          </dd>\
                                                                                              </dl>\
                                                                                              </div>\
                                                                                      ', vineView: '\
                                                                                         <div class="feed-view" data-feed-type="vine" data-uid="%uid%">\
                                                                                             <h1>Content settings for Vine feed</h1>\
                                                                                             <dl class="section-settings">\
                                                                                                 <dt>Timeline type</dt>\
                                                                                                 <dd>\
                                                                                                     <input id="%uid%-user-timeline-type"  type="radio" name="%uid%-timeline-type" value="user_timeline" checked/>\
                                                                                                     <label for="%uid%-user-timeline-type">User</label><br><br>\
                                                                                                     <input id="%uid%-popular-timeline-type" type="radio" name="%uid%-timeline-type" value="liked"/>\
                                                                                                     <label for="%uid%-popular-timeline-type">User likes</label><br><br>\
                                                                                                         <input id="%uid%-search-timeline-type" type="radio" name="%uid%-timeline-type" value="tag"/>\
                                                                                                         <label for="%uid%-search-timeline-type">Hashtag</label>\
                                                                                                     </dt>\
                                                                                                         <dt class="">Content to show</dt>\
                                                                                                         <dd class="">\
                                                                                                             <input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                             <p class="desc">\
                                                                                                             1. For user timeline enter Vine account username or ID <a target="_blank" href="http://social-streams.com/doc/find-vine-id/">See instructions</a><br>\
                                                                                                             2. For liked timeline enter Vine account username or ID <a target="_blank" href="http://social-streams.com/doc/find-vine-id/">See instructions</a><br>\
                                                                                                                 3. To stream posts by hashtag enter one word without #\
                                                                                                                 </p>\
                                                                                                             </dd>\
                                                                                                                 <dt>Hide text</dt>\
                                                                                                                 <dd>\
                                                                                                                     <label for="%uid%-hide-text"><input id="%uid%-hide-text" class="switcher" type="checkbox" name="%uid%-hide-text" value="yep"/><div><div></div></div></label>\
                                                                                                                 </dd>\
                                                                                                             </dl>\
                                                                                                         </div>\
                                                                                                     ', dribbbleView: '\
                                                                                                         <div class="feed-view" data-feed-type="dribbble" data-uid="%uid%">\
                                                                                                             <h1>Content settings for Dribbble feed</h1>\
                                                                                                             <dl class="section-settings">\
                                                                                                                 <dt>Timeline type</dt>\
                                                                                                                 <dd>\
                                                                                                                     <input id="%uid%-user-timeline-type"  type="radio" name="%uid%-timeline-type" value="user_timeline" checked/>\
                                                                                                                     <label for="%uid%-user-timeline-type">User</label><br><br>\
                                                                                                                     <input id="%uid%-popular-timeline-type" type="radio" name="%uid%-timeline-type" value="liked"/>\
                                                                                                                     <label for="%uid%-popular-timeline-type">Liked by user</label><br><br>\
                                                                                                                     </dt>\
                                                                                                                         <dt class="">Content to show</dt>\
                                                                                                                         <dd class=""><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                                             <p class="desc">Enter Dribbble username.</p>\
                                                                                                                         </dd>\
                                                                                                                         <dt>Hide text</dt>\
                                                                                                                         <dd>\
                                                                                                                             <label for="%uid%-hide-text"><input id="%uid%-hide-text" class="switcher" type="checkbox" name="%uid%-hide-text" value="yep"/><div><div></div></div></label>\
                                                                                                                         </dd>\
                                                                                                                     </dl>\
                                                                                                                 </div>\
                                                                                                                 ', foursquareView: '\
                                                                                                                     <div class="feed-view" data-feed-type="foursquare" data-uid="%uid%">\
                                                                                                                         <h1>Content settings for Foursquare feed</h1>\
                                                                                                                         <dl class="section-settings">\
                                                                                                                             <dt class="">Content to show</dt>\
                                                                                                                             <dd class=""><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                                                 <p class="desc">Enter venue ID (<a target="_blank" href="https://www.dropbox.com/s/4rpzuu52lxb2yh5/Screenshot%202014-12-12%2011.59.17.png?dl=0">Find it in location URL</a> ).</p>\
                                                                                                                             </dd>\
                                                                                                                             <dt>Content type</dt>\
                                                                                                                             <dd>\
                                                                                                                                 <input id="%uid%-foursquare-tips" type="radio" name="%uid%-content-type" value="tips" checked/> <label for="%uid%-foursquare-tips">Tips</label>\
                                                                                                                                 <input id="%uid%-foursquare-photos" type="radio" name="%uid%-content-type" value="photos"/> <label for="%uid%-foursquare-photos">Photos</label>\
                                                                                                                             </dd>\
                                                                                                                             <dt>Only text</dt>\
                                                                                                                             <dd>\
                                                                                                                                 <label for="%uid%-only-text"><input id="%uid%-only-text" class="switcher" type="checkbox" name="%uid%-only-text" value="yep"/><div><div></div></div></label>\
                                                                                                                             </dd>\
                                                                                                                         </dl>\
                                                                                                                     </div>\
                                                                                                                 ', flickrView: '\
                                                                                                                     <div class="feed-view" data-feed-type="flickr" data-uid="%uid%">\
                                                                                                                         <h1>Content settings for Flickr feed</h1>\
                                                                                                                         <dl class="section-settings">\
                                                                                                                             <dt>Timeline type</dt>\
                                                                                                                             <dd>\
                                                                                                                                 <input id="%uid%-user_timeline" type="radio" checked name="%uid%-timeline-type" value="user_timeline"/>\
                                                                                                                                 <label for="%uid%-user_timeline">User timeline</label><br><br>\
                                                                                                                                 <input id="%uid%-tag" type="radio" name="%uid%-timeline-type" value="tag"/>\
                                                                                                                                 <label for="%uid%-tag">Tag</label>\
                                                                                                                             </dt>\
                                                                                                                                 <dt class="">Content to show</dt>\
                                                                                                                                 <dd class=""><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                                                     <p class="desc">1. For user timeline enter Flickr username<br>2. For tag enter word or words divided by comma</p>\
                                                                                                                                     </dd>\
                                                                                                                                     <dt>Hide text</dt>\
                                                                                                                                     <dd>\
                                                                                                                                         <label for="%uid%-hide-text"><input id="%uid%-hide-text" class="switcher" type="checkbox" name="%uid%-hide-text" value="yep"/><div><div></div></div></label>\
                                                                                                                                     </dd>\
                                                                                                                                 </dl>\
                                                                                                                             </div>\
                                                                                                                             ', tumblrView: '\
                                                                                                                                 <div class="feed-view" data-feed-type="tumblr" data-uid="%uid%">\
                                                                                                                                     <h1>Content settings for Tumblr feed</h1>\
                                                                                                                                     <dl class="section-settings">\
                                                                                                                                         <dt class="">Content to show</dt>\
                                                                                                                                         <dd class=""><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                                                             <p class="desc">Enter Tumblr username to show images from tlog.</p>\
                                                                                                                                         </dd>\
                                                                                                                                         <dt>Hide text</dt>\
                                                                                                                                         <dd>\
                                                                                                                                             <label for="%uid%-hide-text"><input id="%uid%-hide-text" class="switcher" type="checkbox" name="%uid%-hide-text" value="yep"/><div><div></div></div></label>\
                                                                                                                                         </dd>\
                                                                                                                                         <dt>Rich text</dt>\
                                                                                                                                         <dd>\
                                                                                                                                             <label for="%uid%-rich-text"><input id="%uid%-rich-text" class="switcher" type="checkbox" name="%uid%-rich-text" value="yep"/><div><div></div></div></label>\
                                                                                                                                         </dd>\
                                                                                                                                     </dl>\
                                                                                                                                 </div>\
                                                                                                                             ', linkedinView: '\
                                                                                                                                 <div class="feed-view" data-feed-type="linkedin" data-uid="%uid%">\
                                                                                                                                     <h1>Content settings for LinkedIn feed</h1>\
                                                                                                                                     <dl class="section-settings">\
                                                                                                                                         <dt class="">Content to show</dt>\
                                                                                                                                         <dd class=""><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                                                             <p class="desc">Enter company ID, <a href="http://social-streams.com/doc/find-linkedin-id/" target="_blank">find out where to get</a> if it is not in company page URL.</p>\
                                                                                                                                         </dd>\
                                                                                                                                         <dt>Event type</dt>\
                                                                                                                                         <dd>\
                                                                                                                                             <input id="%uid%-status-update" type="radio" name="%uid%-event-type" value="status-update"/> <label for="%uid%-status-update">Updates of company</label><br/><br/>\
                                                                                                                                             <input id="%uid%-job-posting" type="radio" name="%uid%-event-type" value="job-posting"/> <label for="%uid%-job-posting">Job offers (BETA)</label><br><br/>\
                                                                                                                                             <input id="%uid%-any" type="radio" name="%uid%-event-type" checked checked value="any"/> <label for="%uid%-any">Any</label>\
                                                                                                                                         </dd>\
                                                                                                                                         </dl>\
                                                                                                                                     </div>\
                                                                                                                                 ', soundcloudView: '\
                                                                                                                                     <div class="feed-view" data-feed-type="soundcloud" data-uid="%uid%">\
                                                                                                                                         <h1>Content settings for SoundCloud feed</h1>\
                                                                                                                                         <dl class="section-settings">\
                                                                                                                                             <dt class="">Username</dt>\
                                                                                                                                             <dd class=""><input type="text" name="%uid%-username" placeholder="What content to stream"/>\
                                                                                                                                                 <p class="desc">Enter SoundCloud username, eg. <strong>username</strong> in soundcloud.com/<strong>username</strong>/sets/playlist.</p>\
                                                                                                                                             </dd>\
                                                                                                                                             <dt class="">Playlist</dt>\
                                                                                                                                             <dd class=""><input type="text" name="%uid%-content" placeholder="What content to stream"/>\
                                                                                                                                                 <p class="desc">Enter playlist ID, eg. <strong>playlist</strong> in soundcloud.com/username/sets/<strong>playlist</strong>.</p>\
                                                                                                                                             </dd>\
                                                                                                                                         </dl>\
                                                                                                                                     </div>\
                                                                                                                                 ', filterView: '\
                                                                                                                                     <div class="feed-view" data-filter-uid="%uid%">\
                                                                                                                                         <h1>Moderation settings</h1>\
                                                                                                                                         <dl class="section-settings">\
                                                                                                                                             <dt class="">Content to exclude</dt>\
                                                                                                                                             <dd class=""><input type="text" name="%uid%-filter-by-words" placeholder="What content to exclude"/>\
                                                                                                                                                 <p class="desc">\
                                                                                                                                                 1. To exclude posts by word in text enter any word<br>\
                                                                                                                                                 2. To exclude by URL enter any substring with hash like this <strong>#badpost</strong> or <strong>#1234512345</strong><br>\
                                                                                                                                                     3. To exclude by nickname enter word like this <strong>@nickname</strong><br>\
                                                                                                                                                         4. You can enter multiple exclusion rules separated by comma without spaces eg <strong>anyword,@nickname,#URLpart</strong>\
                                                                                                                                                         </p>\
                                                                                                                                                     </dd>\
                                                                                                                                                 </dl>\
                                                                                                                                                 </div>\
                                                                                                                                                 '
}