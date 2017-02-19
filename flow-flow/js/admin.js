//console.profile("Processing page");
//console.time("Page loading");

;(function (window) {
  var transitions = {
      'transition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'otransitionend'
    },
    elem = document.createElement('div');

  for(var t in transitions){
    if(typeof elem.style[t] !== 'undefined'){
      window.transitionEnd = transitions[t];
      break;
    }
  }
  if (!window.transitionEnd) window.transitionEnd = false;
})(window);

;(function ( $ ) {
  "use strict";

  var $doc = $(document);
  var $win = $(window);
  var $html = $('html');
  var $errorPopup = $('<div id="error-popup"></div>');
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  var isSafari = (function(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        return false
      } else {
        return true;
      }
    }
    return false
  })();

  var ua = navigator.userAgent.toLowerCase();
  var isWebkit = /safari|chrome/.test(ua);
  var isMobile = /android|blackBerry|iphone|ipad|ipod|opera mini|iemobile/i.test(ua);
  var isIE = /msie|trident.*rv\:11\./.test(ua);
  var isFF = /firefox/.test(ua);
  var processed = false;

  $html.addClass('ff-browser-' + (isWebkit ? 'webkit' : isIE ? 'ie' : isFF ? 'ff' : '') + (window.WP_FF_admin ? ' ff-wp' : ' ff-standalone') + (window.isCompact ? ' ff-compact-admin' : ''));

  // fix for safari
  if (isSafari) $html.addClass('safari');

  $(function(){
    //console.timeEnd("Page loading");
  })

  $(document).one('html_ready ready', function () {

    if (processed) return
    else processed = true;

    //console.time("Execution time took");

    var $wrapper = $('.wrapper');
    var $form = $('#flow_flow_form');
    var templates = window.ff_templates; // defined in js/streams.js
    var $tabList = $('.section-tabs');
    var $streamsTable = $('#streams-list');
    var $tabs = $tabList.find('li');
    var $content = $('.section-contents');
    var $roles = $('#ff-roles'), rolesStr = '';
    var $streamsList = $('#streams-cont .section-stream[data-view-mode="streams-list"]');
    var $streamsUpdate = $('#streams-cont .section-stream[data-view-mode="streams-update"]');
    var sessionStorage = window.sessionStorage || {getItem: function(){}, setItem: function(){}};
    var activeTabIndex = parseInt(sessionStorage.getItem('as_active_tab') || 0);
    var activeMode = sessionStorage.getItem('as_view_mode') || 'list';
    var $overlay = $('#fade-overlay');
    var $streamsInput = $('#streams');
    var $lastSubmit = $('#lastSubmit');
    var $feedsChanged = $('#feedsChanged');
    var $rows = $('#streams-list tbody tr');
    var nextId = parseInt($rows.last().attr('data-stream-id'),10) + 1;
    var clip;
    var $submitted;
    var isStreamUpdated;
    var dontTrack = true;
    var savedScrollState;
    var initialStreamCount = $rows.length;
    var it = 0;
    var feedInitialized = false;

    if (isNaN(nextId)) {
      initialStreamCount = 0;
      nextId = 1;
    }

    $roles.find('option').each(function(){
      rolesStr += '<div class="checkbox-row"><input type="checkbox" value="' +  this.value + '" name="stream-%id%-roles" id="stream-%id%-role-' +  this.value + '"><label for="stream-%id%-role-' +  this.value + '">' + this.innerHTML +'</label></div>';
    })

    $('body').append('<div class="content-popup"><div class="content-popup__container"><div class="content-popup__content"></div><div class="content-popup__close"></div></div></div>');
		//console.log('stream count: ' + initialStreamCount, nextId)
      

    var streamsData = {} ;

    var colorPickerOpts = {
      previewontriggerelement: true,
      previewformat: 'rgba',
      flat: false,
      color: 'rgb(255, 88, 115)',
      customswatches: 'card_bg',
      swatches: [
        '#c0392b',
        'a3503c',
        '925873',
        '927758',
        '589272',
        '588c92',
        '2bb1c0',
        '2b8ac0',
        'e96701',
        'c02b74',
        '000000',
        '4C4C4C',
        'CCCCCC',
        'F0F0F0',
        'FFFFFF'
      ],
      order: {
        hsl: 1,
        opacity: 2,
        preview: 3
      },
      onchange: function(container, color) {
        var $preview = container.data('preview');
        var sel = container.data('prop').replace(/-\d+/, '');
        var $targ = $preview.find('[data-preview*="' + sel + '"]');
        var $inp = container.data('input');
        var prop = $inp.attr('data-prop');
        var pre = '';
        if (!$targ.length) return;

        if (prop === 'box-shadow') pre = '0 1px 4px 0 ';
        $targ.each(function(){
          var $t = $(this);
          //console.log(this, $t.attr('data-overrideProp') || prop)
          var col = color.tiny.toRgbString();
          $t.css($t.attr('data-overrideProp') || prop, pre + col)

          if (sel === 'card-color' && document.styleSheets && $t.is('.ff-icon')) {

            addCSSRule(document.styleSheets[0],'.ff-theme-classic.ff-style-2 .ff-icon:after', 'text-shadow: -1px 0 ' + col +', 0 1px ' + col +', 1px 0 ' + col +', 0 -1px ' + col +'!important;', it++ )
          }

        });

      }
    };

    // bind events
    $content.on('click', '[id^=stream-name] .button-go-back', showList);

    $content.find('#streams-list .button-add').on( 'click',  function (e) {

      //			console.time('show stream view')

      var html;

      if (!$content.find('.dynamic-view').length) {
        if (isNaN(nextId)) {
          nextId = 1;
        }
        //				console.log('nextId', nextId);
        html = templates.view.replace(/%ROLES%/, rolesStr)
            .replace(/%id%/g, nextId)
            .replace(/%TV%/, templates.tv || '')
            .replace(/%plugin_url%/g, plugin_url);
        html = html.replace('%LIST%', '<tr><td  class="empty-cell" colspan="4">Add at least one feed</td></tr>').replace('%FEEDS%', '');

        $content.find(' > [data-tab="streams-tab"]').append(html);
        $content.find('#streams-update-' + nextId).addClass('dynamic-view');
        setTimeout(function(){$content.find('input[data-color-format]').ColorPickerSliders(colorPickerOpts)}, 400);

			}

      showStreamView( nextId );

    });

    $content.on( 'click', '#streams-list .flaticon-copy', function () {
      var $t = $( this );
      var id = $t.closest('[data-stream-id]').attr('data-stream-id');

      showLoadingView();
      saveLastSubmit(id);

      var data = {
        'action': la_plugin_slug_down + '_clone_stream',
        'stream-id': id
      };

      $.get(_ajaxurl, data, function( response ) {
        console.log('Got this from the server: ' , response );
        if( response == -1 ){

        }
        else{
          var stream = response;

          streamsData['id' + stream.id] = stream;

          var $stream = buildStreamViewFor(stream.id);
          var $tr;
          var $feeds = $stream.find('.td-feed i').clone();

          $overlay.removeClass('loading');
          $submitted = $('#' + sessionStorage.getItem('section-submit'));
          $submitted.addClass('updated-button').html('&#10004;&nbsp;&nbsp;Updated')
          setTimeout( function () {
            $submitted.html('Save changes').removeClass('updated-button');
          }, 2500);

          // update stream list
          $tr = $('<tr data-stream-id="'+ stream.id +'"><td class="controls"><i class="flaticon-pen"></i> <i class="flaticon-copy"></i> <i class="flaticon-trash"></i></td><td class="td-name">' + (stream.name ? stream.name : 'Unnamed') + '</td><td class="td-type">' + (stream.layout ? '<span class="icon-' + stream.layout + '"></span>' : '-') + '</td><td class="td-feed"></td><td></td><td></td></tr>');
          $streamsTable.find('tbody').append($tr);
          $tr.find('.td-feed').append($feeds.length ? $feeds : '-');

          if (typeof callback === 'function') callback();
        }
      }, 'json');

    });

    /*$content.find("input[id^=moderation]").each(function(){
     var $t = $(this);
     var id = $t.attr('stream-id');
     $t.prop('checked', $('#stream-' + id + '-moderation').is(':checked'))
     }).change(function(){
     var $t = $(this);
     var id = $t.attr('stream-id');
     $('#stream-' + id + '-moderation').prop('checked', true);
     debugger
     showLoadingView();
     location.reload();
     });*/

    $content.on( 'click', '#streams-list .flaticon-pen, #streams-list .td-name', function (e) {
      var $t = $( this );
      var $tr = $t.closest('[data-stream-id]')
      var id = $tr.attr('data-stream-id');

      if (streamsData['id' + id]) {
        showStreamView( id );
      } else {
        $tr.addClass('stream-loading');
        $.get(_ajaxurl, {
          'action' : la_plugin_slug_down + '_get_stream_settings',
          'stream-id' : id
        }, function( response ) {
          console.log('Got this from the server: ' , response );
          if( response == -1 ){
          }
          else{
            streamsData['id' + id] = response;
            buildStreamViewFor( id, true );
            showStreamView( id );
            $tr.removeClass('stream-loading');
          }
        }, 'json' )
      }
    });

    $content.on( 'click', '#streams-list .flaticon-trash', function (e) {
      var $t = $( this );
      var id = $t.closest('[data-stream-id]').attr('data-stream-id');
      var promise = confirm('Do you want to permanently delete this stream?');

      promise.then(function() {

          showLoadingView();

          setTimeout(function(){
            saveLastSubmit(id);
            $.get(_ajaxurl, {
              'action' : la_plugin_slug_down + '_delete_stream',
              'stream-id' : id
            }, function( response ) {
              console.log('Got this from the server: ' , response );
              if( response == -1 ){
              }
              else{
                delete streamsData['id' + id];

                var $tr = $streamsTable.find('tr[data-stream-id='+ id +']');

                $tr.add('#streams-update-' + id).remove();

                if (!$streamsTable.find('tbody tr').length) {
                  $streamsTable.find('tbody').append('<tr><td class="empty-cell" colspan="6">Please add at least one stream</td></tr>')
                }

                nextId = parseInt($('#streams-list tbody tr').last().attr('data-stream-id'),10) + 1;

                if (isNaN(nextId)) {
                  nextId = 1;
                }

                setTimeout(function(){
                  $overlay.removeClass('loading');
                }, 100)
              }
            })
          }, 100);
        }, function() {
          console.log('Cancel');
        }
      )
    })

    // FEEDS
    $content.delegate('[id^=stream-feeds] .button-add', 'click', function() {
      var $t = $(this);
      var $cont = $t.closest('.section');
      var $popup = $cont.find('.popup');
      var top = $popup.offset().top;

      $popup.removeClass('add-feed-step-2').addClass('add-feed-step-1');
      $html.addClass('popup_visible');

      $('html, body').animate({
        scrollTop: top - 50
      }, 300);
    })

    $content.delegate('.add-feed-step-2 .button-go-back', 'click', function() {
      var $t = $(this);
      var $cont = $t.closest('[id^=stream-feeds]');
      var $popup = $cont.find('.popup');
      var top = $popup.offset().top;

      $popup.removeClass('add-feed-step-2').addClass('add-feed-step-1');
      $popup.find('.feed-view-dynamic').remove();

      $('html, body').animate({
        scrollTop: top - 50
      }, 300);
    });


    $content.delegate('[id^=stream-feeds] .flaticon-pen, .td-feed', 'click', function() {
      var $t = $(this);
      var $cont = $t.closest('.section');
      var uid = $t.closest('[data-uid]').attr('data-uid');
      var $popup = $cont.find('.popup');
      var top = $popup.offset().top;

      $popup.find('.feed-view-visible').removeClass('feed-view-visible');
      $popup.find('.feed-view[data-uid=' + uid + ']').addClass('feed-view-visible');
      $popup.addClass('add-feed-step-2');

      $popup.find('.networks-content .feed-popup-controls.add').hide();
      $popup.find('.networks-content .feed-popup-controls.edit').show();
      $html.addClass('popup_visible');

      $('html, body').animate({
        scrollTop: top - 50
      }, 300);

    });

    $content.delegate('[id^=stream-feeds] .flaticon-funnel', 'click', function() {
      var $t = $(this);
      var $cont = $t.closest('.section');
      var uid = $t.closest('[data-uid]').attr('data-uid');
      var $popup = $cont.find('.popup');
      var top = $popup.offset().top;

      $popup.find('.feed-view-visible').removeClass('feed-view-visible');
      $popup.find('.feed-view[data-filter-uid=' + uid + ']').addClass('feed-view-visible');
      $popup.addClass('add-feed-step-2');

      $popup.find('.networks-content .feed-popup-controls.add').hide();
      $popup.find('.networks-content .feed-popup-controls.edit').show();
      $html.addClass('popup_visible');

      $('html, body').animate({
        scrollTop: top - 50
      }, 300);
    });

    $content.delegate('[id^=stream-feeds] .flaticon-trash', 'click', function() {
      var promise = confirm('Do you want to permanently delete this feed?');
      var $t = $(this);


      promise.then(function success(){

        var $stream = $t.closest('[id^=streams-update]');
        var id = $stream.find('.stream-id-value').val();
        var uid = $t.closest('[data-uid]').attr('data-uid');
        var $cont = $t.closest('.section');
        var $popup = $cont.find('.popup');

        var $view = $popup.find('.feed-view[data-uid=' + uid + ']');
        var $stream = $t.closest('.view-visible');

        $view.remove();
        saveFeedsFrom($cont);
        showLoadingView();

        var data = $stream.data('feeds_changed'), curr;
        var here;

        for (var i = data.length;i--;) {
          curr = data[i];
          if (curr['id'] === uid) here = i;
        }
        if (here > -1) {
          data[here]['state'] = 'deleted';
        } else {
          data.push({'id': uid, 'state': 'deleted'});
        }

        markChanged(id);

        setTimeout(function(){
          saveLastSubmit($t.closest('[data-stream-id]').attr('data-stream-id'))
          saveStreamWithAjax($stream);
        }, 100);
      }, function fail () {})


    });

    $content.delegate('[id^=stream-feeds] .controls, .td-feed', 'click', function() {
      $errorPopup.removeClass('visible');
    })

    function markChanged(id) {
      console.log('clear cache...' + id)

      var curr = $feedsChanged.val();
      var here = false;

      if (!id || dontTrack) return;

      if (curr && curr != '' && id !== 'all') {
        curr = curr.split(',');
        for (var i = curr.length;i--;) {
          if (curr[i] == id) here = true;
        }
        if (!here) curr.push(id);
      } else {
        curr = [id];
      }

      //			console.log('stream changed', id, curr)

      $feedsChanged.val(curr.join(','));
    }

    $content.delegate('[id^=stream-feeds] .flaticon-copy', 'click', function() {
      var $t = $(this);
      var $cont = $t.closest('.section');
      var $popup = $cont.find('.popup');
      var $parent = $t.closest('[data-uid]');
      var network = $parent.attr('data-network');
      var sid = $cont.attr('id').replace('stream-feeds-', '');
      var fid = getRandomId();
      var oldUid = $parent.attr('data-uid');
      var newUid = 's' + sid + '-f' + fid;
      var $source = $popup.find('.feed-view[data-uid=' + oldUid + ']');
      var $clone = $(templates[network + 'View'].replace(/\%uid\%/g, newUid)).data('fid', fid);
      var $stream = $t.closest('.view-visible');


      $popup.find('.networks-content .feed-popup-controls.add').before($clone);

      ////
      $clone.find(':input').each(function(i, el) {
        var $input = $(this);
        var name = $input.attr('name');
        var $orig = $source.find('[name="' + name.replace(newUid, oldUid) + '"]');

        if ($orig.is(':radio') || $orig.is(':checkbox')) {
          $orig.each(function(i, el){
            var $t = $( this );
            if ($t.is(':checked') && $t.attr('id').replace(oldUid, newUid) == $input.attr('id')) {
              $input.attr('checked', true);
            }
          })
        } else {
          $input.val($source.find('[name="' + name.replace(newUid, oldUid) + '"]').val());
        }
      });
      ////

      showLoadingView();
      saveFeedsFrom($cont);
      markChanged(sid);

      setTimeout(function(){
        saveLastSubmit(sid)
        saveStreamWithAjax($stream);
      }, 100);

    });

    $content.delegate('.popup .button-cancel-action, .popupclose', 'click', function() {
      $html.removeClass('popup_visible');
      var $popup = $(this).closest('[id^=stream-feeds] .popup');
      var data, here, id, $view, curr;
      if ($popup.length) {
        $popup.removeClass('add-feed-step-1 add-feed-step-2');
        var $fresh = $popup.find('.feed-view-dynamic').last();

        if ($fresh.length && feedInitialized) {
          $view = $popup.closest('.section-stream')
          data = $view.data('feeds_changed');
          var id = $fresh.attr('data-uid');

          for (var i = data.length;i--;) {
            curr = data[i];
            if (curr['id'] === id) {
              here = i;
            }
          }

          if (here > -1) data.splice(here, 1)

          $view.data('feeds_changed', data);
          $fresh.remove();
        }
        feedInitialized = false;

      }

    });

    $content.delegate('.networks-list > li', 'click', function() {
      var $t = $( this );
      var $cont = $t.closest('[id^=stream-feeds]');
      var $popup = $cont.find('.popup');
      var network = $t.attr('data-network');
      var sid = $cont.attr('id').replace('stream-feeds-', '');
      //			  var fid = $popup.find('.feed-view').length + 1;
      var fid = getRandomId();

      var uid = 's' + sid + '-f' + fid;
      var $view = $(templates[network + 'View'].replace(/\%uid\%/g, uid));

      $popup.find('.feed-view-visible').removeClass('feed-view-visible');
      $view.addClass('feed-view-visible feed-view-dynamic').data('fid', fid);
      $popup.removeClass('add-feed-step-1').addClass('add-feed-step-2');
      $popup.find('.networks-content .feed-popup-controls.edit').hide();

      $popup.find('.networks-content .feed-popup-controls.add').show().before($view);

      feedInitialized = true;


      if ($view.attr('data-feed-type') === 'wordpress') {
        $view.find('input:radio').first().change();
      }
    });

    $content.delegate('[id^=stream-layout]', 'change', function(e) {
      var val = this.value;
      $(this).closest('.section').removeClass('grid-layout-chosen compact-layout-chosen').addClass(val + '-layout-chosen');
      setTimeout(setHeight,0);
    })

    $(document).on('section-toggle', function(e, id) {
      setHeight(id);
    });

    $content.delegate('.theme-choice input', 'change', function(e) {
      var val = this.value;
      var $cont = $(this).closest('.design-step-2');

      $cont.find('.style-choice').hide()
      $cont.find('.' + val + '-style').show()
    })

    $content.delegate('.style-choice select[id*=style]', 'change', function(e) {
      var val = this.value;
      var $preview = $(this).closest('dl').find('.preview .ff-stream-wrapper');
      var cls = $preview.attr( 'class' );

      if (/flat/.test(cls)) {
        revert($preview);
        reformat($preview, val);
      }

      $preview.removeClass(function() {
        return cls.match(/ff-style-[1-9]/)[0];
      }).addClass('ff-' + val);
    })

    $content.delegate('.layout-compact select[id*=compact-style]', 'change', function(e) {
      //console.log(this.value);
      var val = this.value;
      var $preview = $(this).closest('dl').find('.preview .ff-stream-wrapper');
      var cls = $preview.attr( 'class' );

      if (val === 'c-style-1') {
        $preview.find('.ff-item-cont').append($preview.find('.ff-item-meta'));
      } else if (val === 'c-style-2') {
        $preview.find('.ff-item-cont').after($preview.find('.ff-item-meta'));
      }

      $preview.removeClass(function() {
        return cls.match(/ff-c-style-[1-9]/)[0];
      }).addClass('ff-' + val);
    })

    $content.find('.extension__cta--disabled').click(function(e){
      e.preventDefault();
    })

    $('#facebook_use_own_app').change(function(){
      var $t = $(this);
      var $p = $t.closest('dl');
      var checked = this.checked

      $p.find('dd, dt').not('.ff-toggler').find('input')[ checked ? 'removeClass' : 'addClass' ]('disabled')
      $p[ checked ? 'addClass' : 'removeClass' ]('ff-own-app');
      $('#facebook-auth')[this.checked ? 'hide' : 'show']();

    }).change()

    function reformat ($stream, style) {
      $stream.find('.ff-item').each(function(i,el){
        var $el = $(el);
        var $img = $el.find('.ff-img-holder');
        var $meta;

        if (/[12]/.test(style)) {
          $meta = $el.find('.ff-item-meta');
          $el.find('.ff-item-cont').prepend($meta);

          if (!$img.length) {
            if (style === 'style-1') {
              $meta.append($meta.find('.ff-userpic'));
            }
            $el.addClass('ff-no-image')
          } else {
            $el.addClass('ff-image')
          }
        } else if (style === 'style-3') {
          $el.prepend($el.find('.ff-icon'));
        }

        $el.addClass('ff-' + (!$img.length ? 'no-' : '') +'image');

        $el.prepend($img);
      })
    }

    function revert ($stream) {
      $stream.find('.ff-item').each(function(i,el){
        //console.log('revert',el)
        var $el = $(el);
        var $cont = $el.find('.ff-item-cont');

        $cont.append($cont.find('h4'));
        $cont.append($cont.find('.ff-img-holder'));
        $cont.append($cont.find('p'));
        $cont.append($cont.find('.ff-item-meta'));

        $el.find('.ff-userpic').append($el.find('.ff-icon'))
      })
    }

    $content.delegate('.design-step-2 select[id*=align]', 'change', function(e) {
      var val = this.value;
      var $preview = $(this).closest('dl').find('.preview .ff-stream-wrapper');
      $preview.css('text-align', val);
    })


    $content.delegate('.design-step-2 select[id*=cmeta]', 'change', function(e) {
      var val = this.value;
      var $preview = $(this).closest('dl').find('.preview .ff-stream-wrapper');

      if (val === 'upic') {
        $preview.addClass('ff-c-upic');
      } else {
        $preview.removeClass('ff-c-upic');
      }
    })


    $content.delegate('.design-step-2 [id*=width]', 'keyup', function(e) {
      var val = this.value;
      var $preview = $(this).closest('.design-step-2').find('.classic-style .preview, .flat-style .preview');

      val = parseInt(val);


      if (isNaN(val)) return;

      $preview.find('.ff-item').css('width', val + 'px')
    })

    //		console.time('Change handlers exec')
    //$content.find('.theme-choice input:checked, select[id*=cmeta], .style-choice select[id*=style], .design-step-2 select[id*=align], .layout-compact select[id*=compact-style]').change();

    //		console.timeEnd('Change handlers exec')

    $overlay.click(function() {
      if ($('.section-stream.view-visible')) {
        $('[id^=stream-feeds] .popup').removeClass('add-feed-step-1 add-feed-step-2').find('.feed-view-dynamic').remove();
      }

      $html.removeClass('popup_visible');
    });

    var back = _ajaxurl + '?action=flow_flow_social_auth';

    var j = "https://foursquare.com/oauth2/authenticate?" + $.param({
      client_id: "22XC2KJFR2SFU4BNF4PP1HMTV3JUBSEEVTQZCSCXXIERVKA3",
      redirect_uri: "http://flow.looks-awesome.com/service/auth/foursquare.php?back=" + back,
      response_type: "code"
    });
    $("#foursquare-auth").click(function(){
      var $t = $(this);
      if ($(this).html() === 'Log Out') {
        $('#foursquare_access_token').val('');
        $('#fq-auth-settings-sbmt').click();
        $("#foursquare-auth").html('Authorize');
        return
      }
      document.location.href = j;
    });

    if ($('#foursquare_access_token').val() !== '') {
      $("#foursquare-auth").html('Log Out')
    }

    if ($('#foursquare_client_id').val() === '') {
      var $par = $('#foursquare_client_id').parent();
      $par.add($par.prev('dt').first()).hide();
    }
    if ($('#foursquare_client_secret').val() === '') {
      var $par = $('#foursquare_client_secret').parent();
      $par.add($par.prev('dt').first()).hide();
    }

    //http://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url/7297873#7297873
    if (window.location.hash && window.location.hash == '#_=_') {
      window.location.hash = '';
    }

    var h = "https://api.instagram.com/oauth/authorize/?" + $.param({
      client_id: "94072d7b728f47b68bc7fc86767b3ebe",
      redirect_uri: "http://social-streams.com/services/auth/instagram.php?back=" + back,
      response_type: "code",
		scope: "basic public_content"
    });
    $("#inst-auth").click(function(){
      var $t = $(this);
      if ($(this).html() === 'Log Out') {
        $('#instagram_access_token').val('');
        $('#inst-auth-settings-sbmt').click();
        $("#inst-auth").html('Authorize');
        return
      }
      document.location.href = h;
      //alert(h);
    });

    if ($('#instagram_access_token').val() !== '') {
      $("#inst-auth").html('Log Out')
    }

	  //https://www.facebook.com/dialog/oauth

	  var f = "http://flow.looks-awesome.com/service/auth/facebook.php?" + $.param({
			  back: back
		  });
	  $("#facebook-auth").click(function(){
		  var $t = $(this);
		  if ($(this).html() === 'Log Out') {
			  $('#facebook_access_token').val('');
			  $('#fb-auth-settings-sbmt').click();
			  $("#facebook-auth").html('Authorize');
			  return
		  }
		  document.location.href = f;
		  //alert(h);
	  });

    if ($('#facebook_access_token').val() !== '') {
	  $("#facebook-auth").html('Log Out')
    }

    //////////

    $tabs.on( 'click' , function() {
      var index = $tabs.index( this );
      var $t = $( this );

      if ($t.is('#suggestions-tab')) {
        /*
         window.open('http://goo.gl/forms/HAJ95k8kAI');
         */
        insertFeedbackForm();

      }

      $tabList.add( $content ).find( '.active' ).removeClass( 'active' );
      $t.add($content.find( '.section-content:eq(' + index + ')' )).addClass( 'active' );

      sessionStorage.setItem('as_active_tab', index);

      return false;
    });

    $content.delegate('input', 'keydown', function (e){
      var $t = $(this)
      if ($t.is('.validation-error')) {
        $t.removeClass('validation-error');
      }

      if (e.which == 13) {
        //console.log('enter')
      }
    })


    $content.delegate('.admin-button.submit-button', 'click', function (e) {
      var $t = $(this);
      var $contentInput;
      var $cont;
      var $licenseCont;
      var invalid, promise;
      var opts = {
        doReload: false,
        doSubscribe: false
      }

      if ($t.closest('#campaigns-cont').length) return;

      // validation in popup
      if ($t.is('[id^=networks-sbmt]')) {
        $cont = $t.closest('.networks-content').find('.feed-view-visible');
        $cont.find(':input').removeClass('validation-error');
        $contentInput = $cont.find('input[name$=content]');
        if ($contentInput.length && !$contentInput.val()) {
          setTimeout(function(){$contentInput.addClass('validation-error');},0);
          $('html, body').animate({
            scrollTop: $contentInput.offset().top - 150
          }, 300);
          return;
        }
        saveFeedsFrom( $t.closest('[id^=stream-feeds]') );

        // reset
        if (feedInitialized) {
          feedInitialized = false
        }
      }

      // validate activation form
      if ($t.is('#user-settings-sbmt')) {
        $licenseCont = $('#envato_license');

        if ($licenseCont.is('.plugin-activated')) {
          promise = confirm('Are you sure?');
          promise.then(function success(){
            $licenseCont.find('input').val('');
            $licenseCont.find(':checkbox').attr('checked', false);
            opts.doReload = true
            submitForm(opts);
          }, function(){
            // do nothing
          });
          return;
        } else {
          // validation
          if (!validateEmail($licenseCont.find('#company_email').val())) {
            $licenseCont.find('#company_email').addClass('validation-error');
            invalid = true;
          }

          if (!validateCode($licenseCont.find('#purchase_code').val())) {
            $licenseCont.find('#purchase_code').addClass('validation-error');
            invalid = true;
          }

          if (invalid) {
            return
          } else {
            opts.attemptToActivate = true;
            opts.doReload = true;
          }
        }
      }

      if ($t.is('#user-settings-sbmt-2')) {
        $('#news_subscription').attr('checked', true);
        opts.doReload = true;
        opts.doSubscribe = true;
      }

      submitForm(opts);

      function submitForm(opts) {
        $t.addClass('button-in-progress');
        showLoadingView();
        setTimeout(function(){
          var last = $t.closest('.view-visible').find('.stream-id-value').val(), $stream;

          if (!last) {
            last = $t.is('#general-settings-sbmt') ? 'general' : 'auth';
            saveLastSubmit(last);
            //          if ($t.is('#moderation-sbmt')) {
            //            $stream = $t.closest('.view-visible');
            //            saveStreamWithAjax($stream);
            //          }
          } else {
            var $stream = $t.closest('.view-visible');
            saveStreamWithAjax($stream);
            saveLastSubmit(last);
            return
          }
          $t.closest('form').trigger('submit', opts);
        }, 100);

        sessionStorage.setItem('section-submit', $(this).attr('id'));
      }


    });

    $win.unload(function (e) {
      sessionStorage.setItem('as_scroll', $('body').scrollTop() || $('html').scrollTop());
    });

    $form.on('submit', function(e, opts){
      //			console.time('submit')
      e.preventDefault();

      var $views = $content.find('[id^=streams-update]');
      var serialized, data;

      $views.each(function(){
        var id = $(this).find('.stream-id-value').val();
        streamsData['id' + id] = optionsToObj($(this));
      });

      //			$streamsInput.val(JSON.stringify(streamsData));
      //$('#streams').val('') // erase
      //$('#streams_count').val($views.length); // todo
      //			console.timeEnd('submit');

      //			serialized = $form.serialize();

      //Serialize form as array
      serialized = $form.serializeArray();
      //trim values
      for(var i =0, len = serialized.length;i<len;i++){
        serialized[i]['value'] = $.trim(serialized[i]['value']);
      }

      //turn it into a string if you wish
      serialized = $.param(serialized);

      $form.find('input[type=checkbox]:not(:checked)').map(
        function () {
          serialized += '&' + encodeURIComponent(this.name) + '=nope';
        })

      data = {
        action: la_plugin_slug_down + '_ff_save_settings',
        settings: serialized,
        doSubcribe: opts.doSubscribe
      };

      $.post(_ajaxurl, data, function( response ) {
        console.log('Got this from the server: ' , response );
        if( response == -1 ){

        }
        else{
          // Do something on success
          console.log(response.settings)
          if (typeof response === 'string' && response.indexOf('curl')) {
            alert('Please set DISABLE CURL_FOLLOW_LOCATION setting to YES under General tab');
            $overlay.removeClass('loading');
            return;
          }

          if (opts.attemptToActivate && response.activated !== true) {
            alert(response.activated);
            $overlay.removeClass('loading');
            return;
          }

          var $fb_token = $('input[name="flow_flow_fb_auth_options[facebook_access_token]"]').parent();
          if (response.fb_extended_token == false){
            $fb_token.find('.desc').remove()
            $fb_token.find('textarea').remove();
            $fb_token.append('<p class="desc fb-token-notice" style="margin: 10px 0 5px; color: red !important">! Extended token is not generated, Facebook feeds might not work</p>');
            $fb_token.removeClass('fb-empty')
          }
          else if (response.settings.flow_flow_fb_auth_options.facebook_access_token == response.fb_extended_token){

          }
          else {
            if (response.settings && response.settings.flow_flow_fb_auth_options && response.settings.flow_flow_fb_auth_options.facebook_access_token == '') {
              $fb_token.addClass('fb-empty')
            } else {
              if (response.fb_extended_token && !$fb_token.find('textarea').length) {
                $fb_token.find('.desc').remove()
                $fb_token.append('<p class="desc" style="margin: 10px 0 5px">Generated long-life token, it should be different from that you entered above then FB auth is OK</p><textarea disabled rows=3>'  + response.fb_extended_token + '</textarea>');
              }
              $fb_token.removeClass('fb-empty')
            }
          }

          if (!opts.doReload) $overlay.removeClass('loading');
          $submitted = $('#' + sessionStorage.getItem('section-submit'));
          $submitted.addClass('updated-button').html('&#10004;&nbsp;&nbsp;Updated');
          $submitted.removeClass('button-in-progress');

          setTimeout( function () {
            $submitted.html('Save changes').removeClass('updated-button');
          }, 2500);
        }

        if (opts.doReload) location.reload();

      }, 'json' ).fail( function( d ){
        console.log( d.responseText );
        console.log( d );
        alert('Error occured. If you see this after adding FB auth then double-check your data.')
      });

      return false
    });

    $content.delegate('.create_backup', 'click', function(){
      /*var data = {'action': 'fetch_posts',
       'stream-id': '1',
       'disable-cache': '',
       'page': '0'
       };*/
      var $views = $content.find('[id^=streams-update]');

      $views.each(function(){
        var id = $(this).find('.stream-id-value').val();
        streamsData['id' + id] = optionsToObj($(this));
      });

      //			$streamsInput.val(JSON.stringify(streamsData));

      var data = {
        'action': 'create_backup',
        'streams': JSON.stringify(streamsData)
      }
      showLoadingView();

      $.post(_ajaxurl, data).done(function(){
        location.reload();
      })
    });

    $content.find('.restore_backup').click(function(){
      var promise = confirm('Are you sure?');
      var self = this;
      promise.then(function success(){
        var data = {
          action: 'restore_backup',
          id: $(self).closest('tr').attr('backup-id')
        }
        showLoadingView();

        $.post(_ajaxurl, data).done(function(data){
          sessionStorage.setItem('as_view_mode', 'list');
          sessionStorage.setItem('as_active_tab', 0);
          location.reload();
        })
      }, function fail () {})
    })

    $content.find('.delete_backup').click(function(){
      var promise = confirm('Are you sure?');
      var self = this;

      promise.then(function success(){
        var data = {
          action: 'delete_backup',
          id: $(self).closest('tr').attr('backup-id')
        }
        showLoadingView();

        $.post(_ajaxurl, data).done(function(){
          location.reload();
        })
      }, function fail () {})

    })

    // init copying to clipboard
    clip = new ZeroClipboard( $('.shortcode-copy') );

    clip.on( "copy", function (event) {
      var $t = $(event.target);
      var clipboard = event.clipboardData;
      var text = $(event.target).parent().find('.shortcode').text();

      if (text) {
        $t.addClass('copied').html('Copied');
        clipboard.setData( "text/plain", text );
        setTimeout(function(){$t.removeClass('copied').html('Copy');}, 3000)
      } else {
        $t.addClass('copy-failed');
      }

    });

    $content.on('mouseleave', '.shortcode-copy', function(){
      $(this).removeClass('zeroclipboard-is-hover');
    });

    // restore saved scroll state
    savedScrollState = sessionStorage.getItem('as_scroll');

    if (savedScrollState) {
      $('html, body').scrollTop(savedScrollState);
      setTimeout(function(){$('html, body').scrollTop(savedScrollState)}, 0);
    }

    // utils
    function setHeight(id, list) {
      var heights = [];
      var maxH;
      //
      if (list) {
        $('#streams-list').each(function(){
          heights.push($(this).outerHeight());
        });
      }

      else if (id) {
        $('#streams-update-' + id + ', #streams-list').each(function(){
          heights.push($(this).outerHeight());
        });
      } else {
        $('#streams-cont .section-stream[data-view-mode="streams-update"], #streams-list').each(function(){
          heights.push($(this).outerHeight());
        });
      }

      maxH = Math.max.apply(Math, heights);
      $('#streams-cont').css('minHeight', maxH);
    }

    function saveStreamWithAjax ($stream, callback) {
      var isNew = $stream.is('.dynamic-view');
      var stream = optionsToObj($stream);
      var feedsData;

      var data = {
        action: isNew ? la_plugin_slug_down + '_create_stream' : la_plugin_slug_down + '_save_stream_settings',
        stream: stream
      };

      if (!isNew) {
        feedsData = $stream.data('feeds_changed');

        for (var i = 0, len = feedsData.length; i< len;i++) {
          feedsData[i]['id'] = feedsData[i]['id'].replace(/s\d+?-f/, '')
        }
        data['feeds_changed'] = feedsData;
      } else {
        nextId++;
      }

      streamsData['id' + stream.id] = stream;

      $.post(_ajaxurl, data, function( response ) {
        console.log('Got this from the server: ' , response );
        if( response == -1 ){

        }
        else{
          if (streamsData['id' + response.id]) streamsData['id' + response.id]['errors'] = response.errors;

          var $res_stream = buildStreamViewFor(stream.id);
          var $tr;
          var $feeds = $res_stream.find('.td-feed i').clone();
          // remove after first saving

          $overlay.removeClass('loading');
          $submitted = $('#' + sessionStorage.getItem('section-submit'));
          $submitted.addClass('updated-button').html('&#10004;&nbsp;&nbsp;Updated')
          setTimeout( function () {
            $submitted.html('Save changes').removeClass('updated-button');
          }, 2500);

          // update stream list
          if (isNew) {
            $tr = $('<tr id="tr-row-'+ stream.id +'" data-stream-id="'+ stream.id +'"><td class="controls"><i class="flaticon-pen"></i> <i class="flaticon-copy"></i> <i class="flaticon-trash"></i></td><td class="td-name">' + (stream.name ? stream.name : 'Unnamed') + '</td><td class="td-type">' + (stream.layout ? '<span class="icon-' + stream.layout + '"></span>' : '-') + '</td><td class="td-feed"></td>' + (window.WP_FF_admin ? '<td><span class="cache-status-ok"></span></td><td><span class="shortcode">[ff id="'+ stream.id +'"]</span><span class="shortcode-copy">Copy</span></td>':'') +'</tr>');
            $streamsTable.find('tbody').append($tr).find('tr:has(.empty-cell)').remove();
            $tr.find('.td-feed').append($feeds.length ? $feeds : '-');

            $stream.removeClass('dynamic-view');
            // init clipboard

            // init copying to clipboard
            clip = new ZeroClipboard( $('#tr-row-'+ stream.id + ' .shortcode-copy') );

            clip.on( "copy", function (event) {
              var $t = $(event.target);
              var clipboard = event.clipboardData;
              var text = $(event.target).parent().find('.shortcode').text();

              if (text) {
                $t.addClass('copied').html('Copied');
                clipboard.setData( "text/plain", text );
                setTimeout(function(){$t.removeClass('copied').html('Copy');}, 3000)
              } else {
                $t.addClass('copy-failed');
              }

            });

          } else {
            $tr = $streamsTable.find('tr[data-stream-id='+ stream.id +']');
            $tr.find('.td-name').html(stream.name);
            if (stream.layout) $tr.find('.td-type').empty().append('<span class="icon-' + stream.layout + '"></span>');
            $tr.find('.td-feed').empty().append($feeds.length ? $feeds : '-');
          }
          $('.submit-button').removeClass('button-in-progress');

          if (typeof callback === 'function') callback();
        }
      }, 'json' ).fail( function( d ){
        console.log( d.responseText );
        console.log( d );
      });
    }

    function buildStreamViewFor ( id , afterTransition) {

      //console.log('buildStreamViewFor')
      var stream = streamsData['id' + id];
      var $input;
      var feedsListStr = '', feedsStr = '', feeds, feed, $feed, $error, info, prop, ikey, ival;
      var uid;
      var name, i, len;
      var $view, $t;
      var cpInit = false;

      if (!stream) {
        activeMode = 'list';
        return
      }

      var html = templates.view.replace(/%ROLES%/, rolesStr)
          .replace(/%TV%/, templates.tv || '')
          .replace( /%id%/g, id)
          .replace(/%plugin_url%/g, plugin_url);

      if ( stream.feeds && stream.feeds !== '[]') {
        //        stream.feeds = stream.feeds.replace(/\\/g, '');

        feeds = JSON.parse( stream.feeds );

        for (i = 0, len = feeds.length; i < len; i++) {
          feed = feeds[i];
          uid = 's' + id + '-f' + feed.id;

          info = '';

          for (var prop in feed) {
            ikey = capitaliseFirstLetter ( prop.replace(' timeline', '').replace('_', ' ').replace('-', ' ').replace('timeline ', '')  );
            ival = feed[prop];
            if (prop !== 'content') ival = capitaliseFirstLetter ( ival );
            if (prop !== 'type' && prop !== 'id' && prop !== 'filter-by-words' && prop !== 'avatar-url' && ival != '') {
              ival = ival.replace('_', ' ').replace(' timeline', '').replace('http://', '').replace('https://', '');
              if (ival.length > 20) {
                ival = ival.substring(0, 20) + '...';
              }
              info = info + '<span>' + ikey + ':<span class="highlight">' + ival + '</span></span>' ;
              //							info = info + '<span class="highlight">' + ival + '</span>' ;
            }
          }

          feedsListStr = feedsListStr +
            '<tr data-uid="' + uid + '" data-network="' + feed.type + '">' +
            '<td class="controls"><i class="flaticon-pen"></i> <i class="flaticon-funnel"></i> <i class="flaticon-copy"></i> <i class="flaticon-trash"></i></td>' +
            '<td class="td-feed"><i class="flaticon-' + feed.type + '"></i>' + /*capitaliseFirstLetter(feed.type) +*/ '</td>' +
            '<td class="td-status"><span class="cache-status-ok"></span></td>' +
            '<td class="td-info">' + info + '</td>' +
            '</tr>';

          feedsStr = feedsStr + templates[ feed.type + 'View'].replace(/\%uid\%/g, uid) + templates['filterView'].replace(/\%uid\%/g, uid);

        }

      } else {
        feedsListStr = '<tr><td  class="empty-cell" colspan="4">Add at least one feed</td></tr>';
        feedsStr = '';
      }

      var $view = $('#streams-update-' + id);

      if ($view.length) {
        $t = $view;
        $t.find('.feeds-list tbody').find('tr').remove().end().prepend(feedsListStr);
        $t.find('.networks-content').find('.feed-view').remove().end().prepend(feedsStr);
        //				$t.addClass('view-visible');
        //				$view.replaceWith($t);
      } else {
        html = html.replace('%LIST%', feedsListStr).replace('%FEEDS%', feedsStr);
        $t = $( html );
        $content.find('#streams-cont').append($t);

        sectionExpandCollapse.init({
          $element: $t,
          id: id
        });

        if (afterTransition) {
          $t.on(window.transitionEnd, function(e){
            if (e.target === e.currentTarget && !cpInit ) {
              setTimeout(function(){$t.find('input[data-color-format]').ColorPickerSliders(colorPickerOpts)},0);
              $t.off(window.transitionEnd);
              cpInit = true;
            }
          })
        } else {
          $t.find('input[data-color-format]').ColorPickerSliders(colorPickerOpts);
        }

        //			console.log('stream', stream)

        for ( name in stream ) {

          $input = $t.find('[name="stream-' + id + '-' + name + '"]');

          if ($input.is(':radio') || $input.is(':checkbox')) {
            $input.each(function(){
              var $t = $( this );
              if (name === 'roles') {

                $t.attr('checked', stream[name][this.value]);
              } else {
                $t.attr('checked', $t.val() == stream[name]);
              }
            });

          } else {
            if (typeof stream[name] === 'object') {
                stream[name] = JSON.stringify(stream[name]);
            }
            if (typeof stream[name] === 'string') {
                stream[name] = stream[name].replace(/\\/g, '');
            }
            $input.val(stream[name]);
          }
        }


        // set up steps visibility
        $t.find('.design-step-1').each(function(i, el) {
          var $t = $(this);
          var $checked = $t.find(':checked');
          var val;

          if ($checked.length) {
            val = $checked.val();
            $t.closest('.section').addClass(val + '-layout-chosen');
          }
        });

        $t.find('.theme-choice input:checked, select[id*=cmeta], .style-choice select[id*=style], .design-step-2 select[id*=align], .layout-compact select[id*=compact-style]').change();
        $t.find('.design-step-2 [id*=width]').keyup();

        $t.delegate('.feed-view', 'change keyup', function(e){
          var $this = $(this);
          var isFresh = $this.is('.feed-view-dynamic');
          var data = $t.data('feeds_changed'), curr;
          var here;
          var id = $this.attr('data-uid') || $this.attr('data-filter-uid');

          if (!id) return;

          for (var i = data.length;i--;) {
            curr = data[i];
            if (curr['id'] === id) here = true;
          }
          if (!here) {
            data.push({'id': id, 'state': (isFresh ? 'created' : 'changed')});
          }

          $t.data('feeds_changed', data);

          markChanged(id);
        })

        $t.delegate('.clearcache', 'change keyup', function(e){
          //				console.log(e.type, e.target)
          markChanged(id);
        })


        $t.on('mouseenter', '.feeds-list tr', function(){
          var $error = $(this).find('.cache-status-error'), errorStr = '';
          if (!$error.length) return;
          var errorData = $error.data('err');
          var messages = errorData['message'];

          if (messages) {
            if ($.isArray(messages)) {

              for (var i = 0, len = messages.length; i < len;i++) {
                if (i > 0) errorStr += '<br>';

                errorStr += messages[i]['msg'];
              }
            } else if (typeof messages === 'object') {
              if (messages['msg']) {
                errorStr += messages['msg'];
              } else {
                try {
                  errorStr += JSON.stringify(messages)
                } catch (e) {
                  errorStr += 'Unknown. Please ask support'
                }
              }
            } else if (typeof messages === 'string')  {
              errorStr += messages
            }
          } else if (errorData['msg']) {
            errorStr += errorData['msg'];
          } else if  ($.isArray(errorData)) {
            if (errorData[0].msg) {
              errorStr += errorData[0].msg;
            } else {
              try {
                errorStr += JSON.stringify(errorData[0])
              } catch (e) {
                errorStr += 'Unknown. Please ask support'
              }
            }
          } else {
            try {
              errorStr += JSON.stringify(errorData)
            } catch (e) {
              errorStr += 'Unknown. Please ask support'
            }
          }


          var offset = $error.offset();
          $errorPopup.addClass('visible').css({top: offset.top - 20, left: offset.left + 50});

          $errorPopup.html('<h4>Plugin received next error from network API while requesting this feed:</h4><p>' + errorStr + '</p>')
        }).on('mouseleave', '.feeds-list tr', function(e){
          var $rel = $(e.relatedTarget)
          if ($rel.is('#error-popup')) return;
          $errorPopup.removeClass('visible')

        })
      }


      // update feeds

      if (feeds) {
        for ( i = 0, len = feeds.length; i < len; i++ ) {
          feed = feeds[i];
          uid = 's' + stream.id + '-f' + feed.id;

          for ( name in feed ) {

            if ( name === 'id' || name === 'type' ) continue;

            $input = $t.find('[name="' + uid + '-' + name + '"]');

            if ($input.is(':radio') || $input.is(':checkbox')) {

              $input.each(function(){
                var $t = $( this );
                if ($t.val() == feed[name]) $t.attr('checked', true);
              });

            } else {
              $input.val(feed[name]);
            }
          }
        }
      }

      //debugger
      if (stream.errors) {
          debugger
          if (typeof stream.errors !== 'object') {
              stream.errors = JSON.parse(stream.errors);
          }
          for (var _id in stream.errors) {
              uid = 's' + stream.id + '-f' + _id;
              $feed = $t.find('[data-uid="' + uid + '"]');
              $error = $('<span class="cache-status-error"></span>');
              $error.data('err', stream.errors[_id]);
              $feed.find('.td-status').addClass('td-error').html('').append($error);
          }
      }

      //			debugger;

      $t.data('feeds_changed', []);
      $doc.trigger('stream_view_built', $t);


      return $t;
    }

    function showStreamView ( id ) {
      var $streamView = $content.find('#streams-update-' + id);
      setHeight();

      $streamsList.removeClass('view-visible');
      sessionStorage.setItem('as_view_mode', 'update-' + id);
      setTimeout(function(){
        $streamView.addClass('view-visible');
      }, 0)
    }

    function saveLastSubmit(id) {
      $lastSubmit.val(id || 'nostream');
    }

    function showList () {
      $content.find('[id*=streams-update]').removeClass('view-visible');

      $streamsList.addClass('view-visible');
      sessionStorage.setItem('as_view_mode', 'list');
      setHeight('', true);
    }

    function optionsToObj ($container) {
      var obj = {};
      var id = parseInt($container.find('.stream-id-value').val());
      var roles = {};

      $container.find(':input').each(function( i, el ) {
        var $t = $( this );
        var name = $t.attr('name');
        var val = $t.val(), tst;
        if (name.indexOf('stream-' + id) === -1) return;
        name = name.replace('stream-' + id + '-', '');
        if (name === 'roles') {
          if (this.checked) roles[val] = 'checked';
        }
        /*
         if (name === 'feeds') {
         var arr = JSON.parse(val);
         var newArr = [];
         $container.find('[id*=stream-feeds] tbody tr').each(function(){
         console.log(this);

         var id = $(this).attr('data-uid').replace(/s\d+?-f/, '');
         console.log(id);

         var arrItem = $.grep(arr, function(item, i){
         console.log(item.id, id)
         return item.id == id;
         });
         console.log(arrItem)

         if (arrItem.length) newArr.push(arrItem[0]);
         })
         obj['feeds'] = JSON.stringify(newArr);
         }

         else */
        if ($t.is(':radio')) {
          if ($t.is(':checked')) obj[name] = $t.val();
        } else if ($t.is(':checkbox')) {
          obj[name] = $t.is(':checked') ? $t.val() : 'nope';
        }
        else if (name != 'roles') {
          // check if result JSON is valid
          try {
            val = val.replace(/'/g, "\'");
            tst = JSON.stringify(val);
            JSON.parse(tst);

            // then we're OK
            obj[name] = $.trim(val);
          } catch (e) {

          }
        }
      });
      obj['roles'] = roles;
      return obj;
    }

    function saveFeedsFrom ($cont, clone) {
      var $store = $cont.find( 'input[type=hidden]' );
      var arr = [];
      var $views = $cont.find('.feed-view[data-feed-type]');
      $views.each(function( i, el ){
        var obj = {};
        var $t = $( this );
        var attr = $t.attr('data-uid');
        var id = $t.data('fid') || attr.replace(/s\d+?-f/, '');
        $t.find(':input').each(function( i, el ) {
          var $t = $( this );
          var name = $t.attr('name');
          name = name.replace(/s\d+?\-f\w\w\d+?\-/, '');
          if ($t.is(':radio')) {
            if ($t.is(':checked')) obj[name] = $t.val();
          } else if ($t.is(':checkbox')) {
            if ($t.is(':checked')) {
              obj[name] = $.trim($t.val()) ;
            } else {
              obj[name] = 'nope';
            }
          }
          else {
            obj[name] = $.trim($t.val());
          }
        });


        obj['id'] = id ? id : getRandomId();
        obj['type'] = $t.attr('data-feed-type');
        obj['filter-by-words'] = $t.next().find('input').val()

        arr.push(obj);
      });

      $store.val(JSON.stringify(arr));
      //			$store.val('');

    }

    function cloneStream (id) {

      try {
        //				var obj = optionsToObj($view);
        var obj = $.extend({}, streamsData['id' + id]);
        var id = nextId;
        var $input;

        var $copy = $(templates.view.replace(/%id%/g, id).replace(/%plugin_url%/g, plugin_url));
        $content.find(' > [data-tab="streams-tab"]').append($copy);

        delete obj.id;

        // feeds

        if (obj.feeds && obj.feeds !== '[]') {
          obj.feeds = JSON.parse(obj.feeds);

          for (var i = obj.feeds.length;i--;) {
            obj.feeds[i].id = getRandomId();
          }

          obj.feeds = JSON.stringify(obj.feeds);
        }

        // renew
        nextId = nextId + 1;

        return obj;
      }
      catch (e) {
        alert('Error cloning stream');
        return false
      }
    }

    function showLoadingView () {
      $html.removeClass('popup_visible');
      $overlay.addClass('loading');
    }

    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }

    function getRandomId() {
      return randomString(1, alphabet) + randomString(1, alphabet) + new Date().getTime().toString().substr(8);
    }

    function addCSSRule (sheet, selector, rules){
      //Backward searching of the selector matching cssRules
      if (sheet && sheet.cssRules) {
        var index=sheet.cssRules.length-1;
        for(var i=index; i>0; i--){
          var current_style = sheet.cssRules[i];
          if(current_style.selectorText === selector){
            //Append the new rules to the current content of the cssRule;
            rules=current_style.style.cssText + rules;
            sheet.deleteRule(i);
            index=i;
          }
        }
        if(sheet.insertRule){
          sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else{
          sheet.addRule(selector, rules, index);
        }
        return sheet.cssRules[index].cssText;
      }
    }

    function insertFeedbackForm() {
      if (!insertFeedbackForm.inserted) {

        $('#feedback').append('<iframe src="https://docs.google.com/forms/d/1yB8YrR4FTU8UeQ9oEWN11hX8Xh-5YCO5xv6trFPVUlg/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>');

        insertFeedbackForm.inserted = true;
      }
    }

    function validateEmail (val) {
      return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(val);
    }

    function validateCode (val) {
      return /^[a-z0-9]+\-[a-z0-9]+\-[a-z0-9]+\-[a-z0-9]+\-[a-z0-9]+$/.test(val);
    }



    // Manipulations

    // show active tab
    $('.section-tabs li:eq(' + activeTabIndex +'), .section-content:eq(' + activeTabIndex + ')').addClass('active');
    if (activeTabIndex === 7) insertFeedbackForm();

    // show saved mode
    if (activeMode != 'list') {
      var streamId = activeMode.replace('update-', '');
      $.get(_ajaxurl, {
        'action' : la_plugin_slug_down + '_get_stream_settings',
        'stream-id' : streamId
      }, function( response ) {
        console.log('Got this from the server: ' , response );
        if( response == -1 ){
        }
        else{
          if (!response) {
            $('.section-stream#streams-list').addClass('view-visible');
          } else {
            streamsData['id' + streamId] = response;
            buildStreamViewFor( streamId );
            showStreamView( streamId );
          }
          setTimeout(function(){
            $html.addClass('page-loaded');
            $overlay.removeClass('loading');
            if (savedScrollState) {
              $('html, body').scrollTop(savedScrollState);
            }
          }, 100);
        }
      }, 'json' )

    } else {
      activeMode = 'list';
    }
    $('.section-stream#streams-' + activeMode).addClass('view-visible');

    setHeight();

    // show 'updated' text for submit button
    if (sessionStorage.getItem('section-submit')) {
      $submitted = $('#' + sessionStorage.getItem('section-submit'));
      setTimeout(function(){
        $submitted.addClass('updated-button').html('✔&nbsp;&nbsp;Updated');
      }, 14)
      setTimeout( function () {
        $submitted.html('Save changes').removeClass('updated-button');
      }, 2500);
    }

    sessionStorage.setItem('section-submit', '');

    // show page after all
    setTimeout(function(){
      $wrapper.css('opacity', 1);
      if (activeTabIndex !== 0 || (activeTabIndex === 0 && activeMode.indexOf('update') === -1)) {
        $overlay.removeClass('loading');
        $html.addClass('page-loaded');
      }
      $('body').append($errorPopup);

      $errorPopup.on('mouseleave', function(e){

        $errorPopup.removeClass('visible')

      })
      //console.profileEnd();
      //console.timeEnd("Execution time took");
    }, 100)

    // Alert popup

    var $popup = $('.cd-popup');
    //open popup
    $form.on('click', '.cd-popup-trigger', function(event){
      event.preventDefault();
      $popup.addClass('is-visible');
      $(document).on('keyup', escClose);
    });

    $popup.find('#cd-button-yes').on('click', function(e){
      e.preventDefault();
      $popup.data('defer') && $popup.data('defer').resolve();
      $popup.removeClass('is-visible');

    })
    $popup.find('#cd-button-no, .cd-popup-close').on('click', function(e){
      e.preventDefault();
      $popup.data('defer') && $popup.data('defer').reject();
      $popup.removeClass('is-visible');

    })

    //close popup
    $popup.on('click', function(event){
      if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
        event.preventDefault();
        $(this).removeClass('is-visible');
        $(document).off('keyup', escClose);
      }
    });

    function escClose(event) {
      if(event.which=='27'){
        $popup.data('defer') && $popup.data('defer').reject();
        $popup.removeClass('is-visible');
      }
    }

    function confirm (text) {
      var defer = $.Deferred();

      $popup.data('defer', defer);
      $popup.find('p').html(text || 'Are you sure you want to delete this element?');
      $popup.addClass('is-visible');

      $(document).on('keyup', escClose);
      return defer.promise();
    }
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
      if(event.which=='27'){
        $popup.removeClass('is-visible');
      }
    });

    window.confirmPopup = confirm;

  });

  // expand/collapse section module

  var sectionExpandCollapse = (function($) {

    if (!window.Backbone) return {init: function(){}}

    var storage = window.localStorage && JSON.parse(localStorage.getItem('ff_sections')) || {};

    var SectionsModel = Backbone.Model.extend({
      initialize: function() {
        if (storage[this.id]) {
          this.set('collapsed', storage[this.id]['collapsed']);
        } else {
          storage[this.id] = {collapsed: {}}
        }
        this.on('change', function(){
          if (window.localStorage) {
            storage[this.id]['collapsed'] = this.get('collapsed');
            window.localStorage.setItem('ff_sections', JSON.stringify(storage))
          }
        })
      },
      defaults : function () {
        return {
          'collapsed' : {}
        }
      }
    });

    var SectionsView =  Backbone.View.extend({
      initialize: function() {
        this.model.view = this;
        this.$sections = this.$el.find('> .section');
        this.render();
      },
      render: function(){
        var self = this;
        // add class if collapsed
        self.$sections.each(function(){
          var $t = $(this);
          var index = self.$sections.index(this);
          $t.append('<span class="section__toggle flaticon-arrow-down"></span>');

          if (self.model.get('collapsed')[index]) $t.addClass('section--collapsed');
        })
      },
      events: {
        "click .section__toggle": "toggle"
      },
      toggle: function (e) {
        console.log('Voi la!');
        var $section = $(e.target).closest('.section');
        var isCollapsed = $section.is('.section--collapsed');
        var index = this.$sections.index($section);
        var collapsed = _.clone(this.model.get('collapsed'));

        if (isCollapsed) {
          $section.removeClass('section--collapsed');
          collapsed[index] = 0;
        } else {
          $section.addClass('section--collapsed');
          collapsed[index] = 1;
        }
        this.model.set('collapsed', collapsed);

        $(document).trigger('section-toggle', this.model.get('id'));
      },
      $sections: null
    });

    var globalDefaults = {

    };

    function init (opts) {
//      debugger;
      var settings = $.extend(globalDefaults, opts);

      var model = new SectionsModel(settings);
      var view = new SectionsView({model: model, el: settings.$element});

      return view;
    }

    return {
      init: init
    };
  })(jQuery)

  window.sectionExpandCollapse = sectionExpandCollapse;

}(jQuery));

function capitaliseFirstLetter(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}