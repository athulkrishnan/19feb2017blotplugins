(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/scripts/public.coffee":[function(require,module,exports){
"use strict";
require('./appMain');

require('twitter');

require("console-log-shim");

require('./Modules/SSOptions/ssOptionsMain');

require('./Modules/SSPosts/ssPostsMain');



},{"./Modules/SSOptions/ssOptionsMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/ssOptionsMain.coffee","./Modules/SSPosts/ssPostsMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/ssPostsMain.coffee","./appMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/appMain.coffee","console-log-shim":"/srv/social-streams/releases/tmp/social-streams/lib/console-log-shim.coffee","twitter":"/srv/social-streams/releases/tmp/social-streams/lib/twitter.js"}],"/srv/social-streams/releases/tmp/social-streams/lib/console-log-shim.coffee":[function(require,module,exports){
"use strict";
if (window.console == null) {
  window.console = {};
}

if (window.console.log == null) {
  window.console.log = function() {};
}



},{}],"/srv/social-streams/releases/tmp/social-streams/lib/twitter.js":[function(require,module,exports){
(function() {
  if (window.__twitterIntentHandler) return;
  var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width;

  function handleIntent(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        m, left, top;

    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }

    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;

        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }

        window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                           ',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
  window.__twitterIntentHandler = true;
}());

},{}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/index.js":[function(require,module,exports){
var Modernizr = require('./lib/Modernizr'),
    ModernizrProto = require('./lib/ModernizrProto'),
    classes = require('./lib/classes'),
    testRunner = require('./lib/testRunner'),
    setClasses = require('./lib/setClasses');

// Run each test
testRunner();

// Remove the "no-js" class if it exists
setClasses(classes);

delete ModernizrProto.addTest;
delete ModernizrProto.addAsyncTest;

// Run the things that are supposed to run after the tests
for (var i = 0; i < Modernizr._q.length; i++) {
  Modernizr._q[i]();
}

module.exports = Modernizr;

},{"./lib/Modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/Modernizr.js","./lib/ModernizrProto":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/ModernizrProto.js","./lib/classes":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/classes.js","./lib/setClasses":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/setClasses.js","./lib/testRunner":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/testRunner.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/Modernizr.js":[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');


  // Fake some of Object.create
  // so we can force non test results
  // to be non "own" properties.
  var Modernizr = function(){};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it
  // rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  

module.exports = Modernizr;
},{"./ModernizrProto":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/ModernizrProto.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/ModernizrProto.js":[function(require,module,exports){
var tests = require('./tests');


  var ModernizrProto = {
    // The current version, dummy
    _version: 'v3.0.0pre',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      classPrefix : '',
      enableClasses : true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function( test, cb ) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for
      // actual async tests. This is in case people listen to
      // synchronous tests. I would leave it out, but the code
      // to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      setTimeout(function() {
        cb(this[test]);
      }, 0);
    },

    addTest: function( name, fn, options ) {
      tests.push({name : name, fn : fn, options : options });
    },

    addAsyncTest: function (fn) {
      tests.push({name : null, fn : fn});
    }
  };

  

module.exports = ModernizrProto;
},{"./tests":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/tests.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/classes.js":[function(require,module,exports){

  var classes = [];
  
module.exports = classes;
},{}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/createElement.js":[function(require,module,exports){

  var createElement = function() {
    return document.createElement.apply(document, arguments);
  };
  
module.exports = createElement;
},{}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/docElement.js":[function(require,module,exports){

  var docElement = document.documentElement;
  
module.exports = docElement;
},{}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/getBody.js":[function(require,module,exports){
var createElement = require('./createElement');


  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if(!body) {
      // Can't use the real body create a fake one.
      body = createElement('body');
      body.fake = true;
    }

    return body;
  }

  

module.exports = getBody;
},{"./createElement":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/createElement.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/injectElementWithStyles.js":[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var docElement = require('./docElement');
var createElement = require('./createElement');
var getBody = require('./getBody');


  // Inject element with style element and some CSS rules
  function injectElementWithStyles( rule, callback, nodes, testnames ) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if ( parseInt(nodes, 10) ) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while ( nodes-- ) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
    // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
    // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
    // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
    // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
    style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
    div.id = mod;
    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).innerHTML += style;
    body.appendChild(div);
    if ( body.fake ) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if ( body.fake ) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  

module.exports = injectElementWithStyles;
},{"./ModernizrProto":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/ModernizrProto.js","./createElement":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/createElement.js","./docElement":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/docElement.js","./getBody":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/getBody.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/is.js":[function(require,module,exports){

  /**
   * is returns a boolean for if typeof obj is exactly type.
   */
  function is( obj, type ) {
    return typeof obj === type;
  }
  
module.exports = is;
},{}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/prefixes.js":[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');


  // List of property values to set for css tests. See ticket #21
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  

module.exports = prefixes;
},{"./ModernizrProto":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/ModernizrProto.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/setClasses.js":[function(require,module,exports){
var Modernizr = require('./Modernizr');
var docElement = require('./docElement');


  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses( classes ) {
    var className = docElement.className;
    var regex;
    var classPrefix = Modernizr._config.classPrefix || '';

    // Change `no-js` to `js` (we do this regardles of the `enableClasses`
    // option)
    // Handle classPrefix on this too
    var reJS = new RegExp('(^|\\s)'+classPrefix+'no-js(\\s|$)');
    className = className.replace(reJS, '$1'+classPrefix+'js$2');

    if(Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      docElement.className = className;
    }

  }

  

module.exports = setClasses;
},{"./Modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/Modernizr.js","./docElement":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/docElement.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/testRunner.js":[function(require,module,exports){
var tests = require('./tests');
var Modernizr = require('./Modernizr');
var classes = require('./classes');
var is = require('./is');


  // Run through all tests and detect their support in the current UA.
  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;
    var modernizrProp;
    var mPropCount;

    for ( var featureIdx in tests ) {
      featureNames = [];
      feature = tests[featureIdx];
      // run the test, throw the return value into the Modernizr,
      //   then based on that boolean, define an appropriate className
      //   and push it into an array of classes we'll join later.
      //
      //   If there is no name, it's an 'async' test that is run,
      //   but not directly added to the object. That should
      //   be done with a post-run addTest call.
      if ( feature.name ) {
        featureNames.push(feature.name.toLowerCase());

        if (feature.options && feature.options.aliases && feature.options.aliases.length) {
          // Add all the aliases into the names list
          for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
          }
        }
      }

      // Run the test, or use the raw value if it's not a function
      result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


      // Set each of the names on the Modernizr object
      for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
        featureName = featureNames[nameIdx];
        // Support dot properties as sub tests. We don't do checking to make sure
        // that the implied parent tests have been added. You must call them in
        // order (either in the test, or make the parent test a dependency).
        //
        // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
        // hashtag famous last words
        featureNameSplit = featureName.split('.');

        if (featureNameSplit.length === 1) {
          Modernizr[featureNameSplit[0]] = result;
        }
        else if (featureNameSplit.length === 2) {
          Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
        }

        classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
      }
    }
  }

  

module.exports = testRunner;
},{"./Modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/Modernizr.js","./classes":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/classes.js","./is":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/is.js","./tests":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/tests.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/testStyles.js":[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var injectElementWithStyles = require('./injectElementWithStyles');


  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  

module.exports = testStyles;
},{"./ModernizrProto":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/ModernizrProto.js","./injectElementWithStyles":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/injectElementWithStyles.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/tests.js":[function(require,module,exports){

  var tests = [];
  
module.exports = tests;
},{}],"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/test/touchevents.js":[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');
var prefixes = require('./../lib/prefixes');
var testStyles = require('./../lib/testStyles');

/*!
{
  "name": "Touch Events",
  "property": "touchevents",
  "caniuse" : "touch",
  "tags": ["media", "attribute"],
  "notes": [{
    "name": "Touch Events spec",
    "href": "http://www.w3.org/TR/2013/WD-touch-events-20130124/"
  }],
  "warnings": [
    "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
  ],
  "knownBugs": [
    "False-positive on some configurations of Nokia N900",
    "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
  ]
}
!*/
/* DOC

Indicates if the browser supports the W3C Touch Events API.

This *does not* necessarily reflect a touchscreen device:

* Older touchscreen devices only emulate mouse events
* Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
* Some browsers & OS setups may enable touch APIs when no touchscreen is connected
* Future browsers may implement other event models for touch interactions

See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).

This test will also return `true` for Firefox 4 Multitouch support.

*/

  // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
  Modernizr.addTest('touchevents', function() {
    var bool;
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      var query = ['@media (',prefixes.join('touch-enabled),('),'heartz',')','{#modernizr{top:9px;position:absolute}}'].join('');
      testStyles(query, function( node ) {
        bool = node.offsetTop === 9;
      });
    }
    return bool;
  });


},{"./../lib/Modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/Modernizr.js","./../lib/prefixes":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/prefixes.js","./../lib/testStyles":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/lib/testStyles.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars.runtime.js":[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

Handlebars['default'] = Handlebars;

exports["default"] = Handlebars;
},{"./handlebars/base":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/base.js","./handlebars/exception":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/exception.js","./handlebars/runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/runtime.js","./handlebars/safe-string":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/safe-string.js","./handlebars/utils":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/base.js":[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "2.0.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 6;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function(name) {
    delete this.helpers[name];
  },

  registerPartial: function(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
    if(arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function(context, options) {
    if (!options) {
      throw new Exception('Must pass iterator to #each');
    }

    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));

            if (contextPath) {
              data.contextPath = contextPath + i;
            }
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) {
              data.key = key;
              data.index = i;
              data.first = (i === 0);

              if (contextPath) {
                data.contextPath = contextPath + key;
              }
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = {data:data};
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function(message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, message) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, message);
      }
    }
  }
};
exports.logger = logger;
var log = logger.log;
exports.log = log;
var createFrame = function(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
};
exports.createFrame = createFrame;
},{"./exception":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/exception.js","./utils":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/exception.js":[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/runtime.js":[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;
var createFrame = require("./base").createFrame;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new Exception("No environment passed to template");
  }
  if (!templateSpec || !templateSpec.main) {
    throw new Exception('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
    if (hash) {
      context = Utils.extend({}, context, hash);
    }

    var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

    if (result == null && env.compile) {
      var options = { helpers: helpers, partials: partials, data: data, depths: depths };
      partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
      result = partials[name](context, options);
    }
    if (result != null) {
      if (indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    lookup: function(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function(i, data, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths) {
        programWrapper = program(this, i, fn, data, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(this, i, fn);
      }
      return programWrapper;
    },

    data: function(data, depth) {
      while (data && depth--) {
        data = data._parent;
      }
      return data;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = Utils.extend({}, common, param);
      }

      return ret;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  var ret = function(context, options) {
    options = options || {};
    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
  };
  ret.isTop = true;

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function(i, data, depths) {
    if (templateSpec.useDepths && !depths) {
      throw new Exception('must pass parent depths');
    }

    return program(container, i, templateSpec[i], data, depths);
  };
  return ret;
}

exports.template = template;function program(container, i, fn, data, depths) {
  var prog = function(context, options) {
    options = options || {};

    return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
  };
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/base.js","./exception":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/exception.js","./utils":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/safe-string.js":[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/utils.js":[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (string == null) {
    return "";
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

exports.appendContextPath = appendContextPath;
},{"./safe-string":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars/safe-string.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/runtime.js":[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/dist/cjs/handlebars.runtime.js"}],"/srv/social-streams/releases/tmp/social-streams/node_modules/hbsfy/runtime.js":[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/handlebars/runtime.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Collections/ApiCollection.coffee":[function(require,module,exports){
(function (global){
"use strict";
var App, Backbone,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

App.Collections.ApiCollection = (function(superClass) {
  extend(ApiCollection, superClass);

  function ApiCollection() {
    this.fetch = bind(this.fetch, this);
    this.parse = bind(this.parse, this);
    this.url = bind(this.url, this);
    return ApiCollection.__super__.constructor.apply(this, arguments);
  }

  ApiCollection.prototype.apiUrl = '/';

  ApiCollection.prototype.url = function() {
    return App.request('apiRoot') + _.result(this, 'apiUrl');
  };

  ApiCollection.prototype.parse = function(response) {
    return response.data;
  };

  ApiCollection.prototype.fetch = function(options) {
    var data;
    if (this.data == null) {
      data = {};
    }
    if (!_.isEmpty(this.data)) {
      if (options == null) {
        options = {};
      }
      if (options.data == null) {
        options.data = {};
      }
      options.data = _.extend({}, this.data, options.data);
    }
    return App.Collections.ApiCollection.__super__.fetch.apply(this, [options]);
  };

  return ApiCollection;

})(Backbone.Collection);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Collections/InfiniteScrollCollection.coffee":[function(require,module,exports){
"use strict";
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.Collections.InfiniteScrollCollection = (function(superClass) {
  extend(InfiniteScrollCollection, superClass);

  function InfiniteScrollCollection() {
    this.parse = bind(this.parse, this);
    this.nextPage = bind(this.nextPage, this);
    return InfiniteScrollCollection.__super__.constructor.apply(this, arguments);
  }

  InfiniteScrollCollection.prototype.nextPage = function(args) {
    return this.fetch(args);
  };

  InfiniteScrollCollection.prototype.parse = function(response) {
    if ((this.data != null) && (this.data.perPage != null) && response.data.length < this.data.perPage) {
      this.hasNext = false;
    }
    return response.data;
  };

  return InfiniteScrollCollection;

})(App.Collections.ApiCollection);



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Config/BackboneAjax.coffee":[function(require,module,exports){
(function (global){
'use strict';
var $, App, Backbone, _;

App = require("app");

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

_ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

App.addInitializer(function() {
  var ajaxBackup, ajaxDebounce, ajaxDebounceCallback, ajaxDebounceWrapper, ajaxImmediate, apiCallStack, normalizeRequest, readDom, trimChar;
  Backbone.emulateJSON = true;
  Backbone.emulateHTTP = true;
  trimChar = function(str, char) {
    if (str.charAt(0) === char) {
      str = str.substr(1);
    }
    if (str.charAt(str.length - 1) === char) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  };
  normalizeRequest = function(url) {
    var apiRoot, urlParts;
    apiRoot = App.request('apiRoot');
    if (url.indexOf(apiRoot) >= 0) {
      urlParts = url.split(apiRoot);
      url = urlParts[1];
    }
    url = trimChar(url, '/');
    return url;
  };
  readDom = function(options) {
    var $dataElement, data, request, requestIDQuery;
    if (options.type === 'GET') {
      request = normalizeRequest(options.url);
      requestIDQuery = '';
      if ((options.data != null) && (options.data.requestID != null) && options.data.requestID !== '') {
        requestIDQuery = '[data-id="' + options.data.requestID + '"]';
      }
      $dataElement = $('.bwapi-call-data[data-type="get"]' + requestIDQuery + '[data-request="' + request + '"]:not(.loaded)');
      if ($dataElement.length > 0) {
        $dataElement.addClass('loaded');
        data = App.Helpers.data.getElementData($dataElement);
        if ((data != null) && data !== '' && !_.isEmpty(data)) {
          if (options == null) {
            return true;
          }
          if (data.meta.code === 200) {
            if (typeof options.success === 'function') {
              options.success.apply(this, [data]);
            }
          } else {
            if (typeof options.error === 'function') {
              options.error.apply(this, [data]);
            }
          }
          if (typeof options.complete === 'function') {
            options.complete.apply(this, [data]);
          }
          return true;
        }
      }
    }
  };
  ajaxImmediate = function(options) {
    var connected, xhr;
    if (App.apiSocket != null) {
      connected = App.apiSocket.get('connected');
    }
    if ((connected != null) && connected) {
      xhr = App.apiSocket.call(options.type, options.url, options.data, options);
    } else {
      xhr = ajaxBackup(options);
    }
    return xhr;
  };
  apiCallStack = [];
  ajaxDebounceWrapper = function(func) {
    var apiCall, apiCallData, apiCallIndex, apiCallOptions, apiRoot, complete, contentType, data, dataType, error, i, len, options, request, requestID, success, type, url;
    if (apiCallStack.length === 0) {
      return;
    }
    contentType = apiCallStack[0].contentType;
    dataType = "json";
    type = "POST";
    apiRoot = App.request('apiRoot');
    url = apiRoot + "1/site/batch/";
    data = {};
    apiCallOptions = {};
    for (apiCallIndex = i = 0, len = apiCallStack.length; i < len; apiCallIndex = ++i) {
      apiCall = apiCallStack[apiCallIndex];
      request = normalizeRequest(apiCall.url);
      if (apiCall.data != null) {
        apiCallData = apiCall.data;
      } else {
        apiCallData = '';
      }
      requestID = apiCallIndex + ':' + apiCall.type + ':' + request;
      data[requestID] = {
        url: request,
        type: apiCall.type,
        data: apiCallData
      };
      apiCallOptions[requestID] = apiCall;
    }
    success = function(batchResponse, batchResponseText, batchXHR) {
      var batchCallback, batchCallbacks, callback, context, j, len1, response, responseResult, responses, results;
      responses = batchResponse.data;
      if (responses == null) {
        responses = {};
      }
      batchCallbacks = [];
      for (requestID in apiCallOptions) {
        apiCall = apiCallOptions[requestID];
        response = responses[requestID];
        if (response == null) {
          response = {};
        }
        responseResult = 'error';
        if ((response.status != null) && response.status === 'success') {
          responseResult = 'success';
        }
        callback = apiCall[responseResult];
        context = apiCall.context;
        if (typeof callback === 'function') {
          callback.apply(context, [response]);
        }
        batchCallback = apiCall['batchSuccess'];
        if (typeof batchCallback === 'function') {
          batchCallbacks.push({
            context: context,
            callback: apiCall['batchSuccess']
          });
        }
      }
      results = [];
      for (j = 0, len1 = batchCallbacks.length; j < len1; j++) {
        batchCallback = batchCallbacks[j];
        results.push(batchCallback.callback.apply(batchCallback.context, [batchResponse]));
      }
      return results;
    };
    complete = function() {
      var batchCallback, batchCallbacks, callback, context, j, len1, results;
      batchCallbacks = [];
      for (requestID in apiCallOptions) {
        apiCall = apiCallOptions[requestID];
        callback = apiCall['complete'];
        context = apiCall.context;
        if (typeof callback === 'function') {
          callback.apply(context, arguments);
        }
        batchCallback = apiCall['batchComplete'];
        if (typeof batchCallback === 'function') {
          batchCallbacks.push({
            context: context,
            callback: apiCall['batchComplete']
          });
        }
      }
      results = [];
      for (j = 0, len1 = batchCallbacks.length; j < len1; j++) {
        batchCallback = batchCallbacks[j];
        results.push(batchCallback.callback.apply(batchCallback.context, arguments));
      }
      return results;
    };
    error = function() {
      var batchCallback, batchCallbacks, callback, context, j, len1, results;
      batchCallbacks = [];
      for (requestID in apiCallOptions) {
        apiCall = apiCallOptions[requestID];
        callback = apiCall['error'];
        context = apiCall.context;
        if (typeof callback === 'function') {
          callback.apply(context, arguments);
        }
        batchCallback = apiCall['batchError'];
        if (typeof batchCallback === 'function') {
          batchCallbacks.push({
            context: context,
            callback: apiCall['batchError']
          });
        }
      }
      results = [];
      for (j = 0, len1 = batchCallbacks.length; j < len1; j++) {
        batchCallback = batchCallbacks[j];
        results.push(batchCallback.callback.apply(batchCallback.context, arguments));
      }
      return results;
    };
    options = {
      error: error,
      success: success,
      complete: complete,
      contentType: contentType,
      dataType: dataType,
      type: type,
      url: url,
      data: data
    };
    func(options);
    return apiCallStack = [];
  };
  ajaxDebounceCallback = _.wrap(ajaxImmediate, ajaxDebounceWrapper);
  ajaxDebounce = _.debounce(ajaxDebounceCallback, 40);

  /*
  backup Backbone AJAX function
   */
  ajaxBackup = Backbone.ajax;

  /*
  override Backbone Ajax
   */
  return Backbone.ajax = function(options) {

    /*
    Check if call can be fetched from DOM
     */
    var result;
    result = readDom(options);
    if (result === true) {
      return result;
    }
    if (options.context == null) {
      options.context = this;
    }
    if ((options.batch != null) && options.batch === true) {
      apiCallStack.push(options);
      return ajaxDebounce.apply(this);
    } else {
      return ajaxImmediate.apply(this, [options]);
    }
  };
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Controllers/AppController.coffee":[function(require,module,exports){
(function (global){
"use strict";
var App, Backbone,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

App.Controllers.AppController = (function(superClass) {
  extend(AppController, superClass);

  function AppController() {
    return AppController.__super__.constructor.apply(this, arguments);
  }

  AppController.prototype.getApiRoot = function() {
    var apiRoot, wpRoot;
    wpRoot = '/';
    apiRoot = '?bwapi=/';
    if (App.SSOptions != null) {
      wpRoot = App.SSOptions.reqres.request('option', 'wpRoot');
    }
    return wpRoot + apiRoot;
  };

  AppController.prototype.isEven = function(n) {
    return n % 2 === 0;
  };

  return AppController;

})(Backbone.Marionette.Controller);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/browserSupport.coffee":[function(require,module,exports){
(function (global){
"use strict";
var $, Backbone, BrowserSupportHelper, Modernizr, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Modernizr = require("modernizr");

BrowserSupportHelper = (function(superClass) {
  extend(BrowserSupportHelper, superClass);

  function BrowserSupportHelper() {
    return BrowserSupportHelper.__super__.constructor.apply(this, arguments);
  }

  BrowserSupportHelper.prototype.checkForIE = function() {
    if ((navigator.appVersion.indexOf("MSIE 7.") > 0) || (navigator.appVersion.indexOf("MSIE 8.") > 0) || (navigator.appVersion.indexOf("MSIE 9.") > 0)) {
      return true;
    } else {
      return false;
    }
  };

  BrowserSupportHelper.prototype.ieAjaxSupport = function() {
    if (this.checkForIE()) {
      if (window.XDomainRequest) {
        return $.ajaxTransport(function(s) {
          var xdr;
          if (s.crossDomain && s.async) {
            if (s.timeout) {
              s.xdrTimeout = s.timeout;
              delete s.timeout;
            }
            xdr = void 0;
            return {
              send: function(_, complete) {
                var callback;
                callback = function(status, statusText, responses, responseHeaders) {
                  xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
                  xdr = undefined;
                  complete(status, statusText, responses, responseHeaders);
                };
                xdr = new XDomainRequest();
                xdr.onload = function() {
                  callback(200, "OK", {
                    text: xdr.responseText
                  }, "Content-Type: " + xdr.contentType);
                };
                xdr.onerror = function() {
                  callback(404, "Not Found");
                };
                xdr.onprogress = jQuery.noop;
                xdr.ontimeout = function() {
                  callback(0, "timeout");
                };
                xdr.timeout = s.xdrTimeout || Number.MAX_VALUE;
                xdr.open(s.type, s.url);
                xdr.send((s.hasContent && s.data) || null);
              },
              abort: function() {
                if (xdr) {
                  xdr.onerror = jQuery.noop;
                  xdr.abort();
                  console.log("aborted");
                }
              }
            };
          }
        });
      }
    }
  };

  return BrowserSupportHelper;

})(Backbone.Model);


/*
Instantiate helper
 */

module.exports = new BrowserSupportHelper;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/index.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/data.coffee":[function(require,module,exports){
(function (global){
"use strict";
var $, Backbone, DataHelper, JSON, Modernizr, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Modernizr = require("modernizr");

JSON = (typeof window !== "undefined" ? window.JSON : typeof global !== "undefined" ? global.JSON : null);

DataHelper = (function(superClass) {
  extend(DataHelper, superClass);

  function DataHelper() {
    return DataHelper.__super__.constructor.apply(this, arguments);
  }


  /*
  	Get data from element on DOM.
  
  	@author Alessandro Biavati <@alebiavati>
  	@package data.coffee
  	@since 1.0
  	@param (jQuery/string) el
  	@return (Object) data
   */

  DataHelper.prototype.getElementData = function(el, format) {
    var data;
    if (typeof el === 'string') {
      el = $(el);
    }
    if (!el instanceof $ || el.length === 0) {
      return;
    }
    data = {};
    if (el.is('script') || ((format != null) && format === 'json')) {
      data = JSON.parse(el.html());
    } else {
      data = el.data();
    }
    return data;
  };

  return DataHelper;

})(Backbone.Model);


/*
Instantiate helper
 */

module.exports = new DataHelper;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/index.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/date.coffee":[function(require,module,exports){
(function (global){
"use strict";
var Backbone, DateHelper,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

DateHelper = (function(superClass) {
  extend(DateHelper, superClass);

  function DateHelper() {
    this.getDatetime = bind(this.getDatetime, this);
    return DateHelper.__super__.constructor.apply(this, arguments);
  }

  DateHelper.prototype.getDatetime = function(server_gmt_offset) {
    var server_datetime, server_time;
    server_time = this.getTime(server_gmt_offset);
    server_datetime = new Date(server_time);
    return server_datetime;
  };

  DateHelper.prototype.getTime = function(offset) {
    var d, nd, server_time, utc;
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000 * offset));
    server_time = Math.round(nd.getTime() / 1000);
    return server_time;
  };

  DateHelper.prototype.parseTimestamp = function(timestamp) {
    var days, hours, minutes, months, secs, weeks, years;
    secs = ((new Date()).getTime() / 1000) - timestamp;
    Math.floor(secs);
    minutes = secs / 60;
    secs = Math.floor(secs % 60);
    if (minutes < 1) {
      return secs + (secs > 1 ? " seconds ago" : " second ago");
    }
    hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
      return minutes + (minutes > 1 ? " minutes ago" : " minute ago");
    }
    days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
      return hours + (hours > 1 ? " hours ago" : " hour ago");
    }
    weeks = days / 7;
    days = Math.floor(days % 7);
    if (weeks < 1) {
      return days + (days > 1 ? " days ago" : " day ago");
    }
    months = weeks / 4.35;
    weeks = Math.floor(weeks % 4.35);
    if (months < 1) {
      return weeks + (weeks > 1 ? " weeks ago" : " week ago");
    }
    years = months / 12;
    months = Math.floor(months % 12);
    if (years < 1) {
      return months + (months > 1 ? " months ago" : " month ago");
    }
    years = Math.floor(years);
    return years + (years > 1 ? " years ago" : " years ago");
  };

  return DateHelper;

})(Backbone.Model);


/*
Instantiate helper
 */

module.exports = new DateHelper;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/env.coffee":[function(require,module,exports){
(function (global){
"use strict";
var $, Backbone, EnvHelper, Modernizr, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Modernizr = require("modernizr");

EnvHelper = (function(superClass) {
  extend(EnvHelper, superClass);

  function EnvHelper() {
    this.mobileAddressBarScrollFix = bind(this.mobileAddressBarScrollFix, this);
    this.getScrollTop = bind(this.getScrollTop, this);
    this.wheelHandler = bind(this.wheelHandler, this);
    this.updateScrollDir = bind(this.updateScrollDir, this);
    this.updateEnv = bind(this.updateEnv, this);
    this.isMobile = bind(this.isMobile, this);
    this.userAgentDetects = bind(this.userAgentDetects, this);
    this.offlineCheck = bind(this.offlineCheck, this);
    this.initialize = bind(this.initialize, this);
    this.start = bind(this.start, this);
    return EnvHelper.__super__.constructor.apply(this, arguments);
  }

  EnvHelper.prototype.defaults = {
    resizeEvent: "resize",
    scrollTop: 0,
    orientation: null,
    center: null,
    heightFull: null,
    heightRaw: null,
    height: null,
    width: null,
    safari: null,
    isMobile: null,
    mobileIphone: null,
    mobileIpad: null,
    mobileIos: null,
    mobileAndroid: null,
    mobileAndroidVersion: null,
    mobileRawscreen: null,
    ios: null,
    ios1: null,
    ios2: null,
    ios2_4: null,
    ios3: null,
    ios4: null,
    ios5: null,
    ios5_up: null,
    ios6: null,
    ios6_up: null
  };

  EnvHelper.prototype.start = function() {
    return this.updateEnv();
  };

  EnvHelper.prototype.initialize = function() {
    this.userAgentDetects();
    if (this.get("is_mobile") || this.get("is_tablet")) {
      $(window).on(this.get("resizeEvent"), _.debounce(this.updateEnv, 300));
    } else {
      $(window).on(this.get("resizeEvent"), _.throttle(this.updateEnv, 100, {
        leading: false
      }));
    }
    if ("mousewheel" in window) {
      $(document).on("mousewheel", this.wheelHandler);
    } else {
      $(window).scroll(this.updateScrollDir);
    }
    this.on("change:orientation", this.mobileAddressBarScrollFix, this);
    if (window.navigator.onLine != null) {
      this.set('offline', !window.navigator.onLine);
      return $(window).on('offline online', this.offlineCheck);
    }
  };

  EnvHelper.prototype.offlineCheck = function(event) {
    return this.set('offline', event.type === 'offline');
  };

  EnvHelper.prototype.userAgentDetects = function() {
    var ios, ios1, ios2, ios2_4, ios3, ios4, ios5, ios5_up, ios6, ios6_up, is_mobile, mobile_android, mobile_android_version, mobile_ios, mobile_ipad, mobile_iphone, mobile_rawscreen, safari, ua;
    ua = navigator.userAgent || navigator.vendor || window.opera;
    ios = void 0;
    ios1 = void 0;
    ios2 = void 0;
    ios2_4 = void 0;
    ios3 = void 0;
    ios4 = void 0;
    ios5 = void 0;
    ios5_up = void 0;
    ios6 = void 0;
    ios6_up = void 0;
    safari = ~ua.indexOf("Safari") !== 0 && ~ua.indexOf("Chrome") === 0;
    mobile_iphone = ~ua.indexOf("iPhone") !== 0 || ~ua.indexOf("iPod") !== 0;
    mobile_ipad = ~ua.indexOf("iPad") !== 0;
    mobile_ios = mobile_iphone || mobile_ipad;
    mobile_android = ~ua.indexOf("Android") !== 0;
    mobile_android_version = void 0;
    mobile_rawscreen = window.navigator.standalone;
    is_mobile = this.isMobile(ua);
    if (mobile_android) {
      mobile_android_version = ua.slice(ua.indexOf("Android") + 8, ua.indexOf("Android") + 13);
    }
    if (/(iPhone|iPod|iPad)/i.test(ua)) {
      ios = true;
      if (/OS 2_\d(_\d)? like Mac OS X/i.test(ua)) {
        ios2 = true;
        ios2_4 = true;
      } else if (/OS 3_\d(_\d)? like Mac OS X/i.test(ua)) {
        ios3 = true;
        ios2_4 = true;
      } else if (/OS 4_\d(_\d)? like Mac OS X/i.test(ua)) {
        ios4 = true;
        ios2_4 = true;
      } else if (/OS 5_\d(_\d)? like Mac OS X/i.test(ua)) {
        ios5 = true;
        ios5_up = true;
      } else if (/OS 6_\d(_\d)? like Mac OS X/i.test(ua)) {
        ios6 = true;
        ios5_up = true;
        ios6_up = true;
      } else if (/CPU like Mac OS X/i.test(ua)) {
        ios1 = true;
      } else {
        ios5_up = true;
      }
    }
    return this.set({
      is_mobile: is_mobile,
      mobile_iphone: mobile_iphone,
      mobile_ipad: mobile_ipad,
      mobile_ios: mobile_ios,
      mobile_android: mobile_android,
      mobile_android_version: mobile_android_version,
      mobile_rawscreen: mobile_rawscreen,
      ios: ios,
      ios1: ios1,
      ios2: ios2,
      ios2_4: ios2_4,
      ios3: ios3,
      ios4: ios4,
      ios5: ios5,
      ios5_up: ios5_up,
      ios6: ios6,
      ios6_up: ios6_up
    });
  };

  EnvHelper.prototype.isMobile = function(ua) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4))) {
      return true;
    } else {
      return false;
    }
  };

  EnvHelper.prototype.updateEnv = function() {
    var center, height, height_full, height_raw, orientation, width;
    height = void 0;
    height_raw = void 0;
    height_full = void 0;
    width = void 0;
    center = void 0;
    orientation = void 0;
    width = $(window).width();
    if (this.get("mobile_ios") && this.get("safari")) {
      height = height_raw = document.documentElement.clientHeight;
      if (this.get("mobile_iphone") && !this.get("mobile_rawscreen") && height !== 320) {
        height += 60;
      }
      height_full = height;
    } else if (this.get("mobile_android")) {
      if (this.get("mobile_android_version") === "4.1.1") {
        height_full = height = height_raw = window.innerHeight;
      } else {
        height = height_raw = window.innerHeight;
        height_full = height + 56;
      }
    } else {
      height = height_raw = height_full = $(window).height();
    }
    if (width > height) {
      orientation = "landscape";
    } else {
      orientation = "portrait";
    }
    return this.set({
      width: width,
      height: height,
      height_raw: height_raw,
      height_full: height_full,
      center: {
        left: width / 2,
        top: height / 2
      },
      orientation: orientation
    });
  };

  EnvHelper.prototype.updateScrollDir = function(event) {
    var lastScrollTop, scrollTop;
    scrollTop = this.getScrollTop();
    lastScrollTop = this.get("scrollTop");
    if (scrollTop > lastScrollTop) {
      this.set("scrollDir", true);
    } else {
      this.set("scrollDir", false);
    }
    return this.set("scrollTop", scrollTop);
  };

  EnvHelper.prototype.wheelHandler = function(event, delta, deltaX, deltaY) {};

  EnvHelper.prototype.getScrollTop = function() {
    var B, D;
    if (typeof window.pageYOffset !== "undefined") {
      return window.pageYOffset;
    } else {
      B = document.body;
      D = document.documentElement;
      D = (D.clientHeight ? D : B);
      return D.scrollTop;
    }
  };

  EnvHelper.prototype.mobileAddressBarScrollFix = function() {
    if (this.get("mobile_android") || (this.get("mobile_ios") && this.get("safari"))) {
      $("body").height(this.get("height_full"));
      return setTimeout(function() {
        return window.scrollTo(0, 1);
      }, 0);
    }
  };

  return EnvHelper;

})(Backbone.Model);

module.exports = new EnvHelper;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/index.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/http.coffee":[function(require,module,exports){
(function (global){
"use strict";
var $, Backbone, HttpHelper, Modernizr, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Modernizr = require("modernizr");

HttpHelper = (function(superClass) {
  extend(HttpHelper, superClass);

  function HttpHelper() {
    return HttpHelper.__super__.constructor.apply(this, arguments);
  }

  HttpHelper.prototype.toUrl = function(base_url, args) {
    var first_separator, index, url;
    url = base_url;
    index = 0;
    first_separator = (base_url.indexOf("?") === -1 ? "?" : "&");
    $.each(args, function(key, val) {
      if (val === undefined || val === "") {
        return true;
      }
      if (index === 0) {
        url += first_separator;
      } else {
        url += "&";
      }
      url += key + "=" + val;
      return index++;
    });
    return url;
  };

  HttpHelper.prototype.requireFiles = function(files) {
    return _.each(files, function(filename) {
      var fileExt, fileref;
      fileExt = filename.split('.').pop();
      fileref = null;
      if (fileExt === 'js') {
        fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', filename);
      } else if (fileExt === 'css') {
        fileref = document.createElement('link');
        fileref.setAttribute('rel', 'stylesheet');
        fileref.setAttribute('type', 'text/css');
        fileref.setAttribute('href', filename);
      }
      if (fileref != null) {
        return document.getElementsByTagName('head')[0].appendChild(fileref);
      }
    });
  };

  HttpHelper.prototype.getQueryVariable = function(variable) {
    var query, value, vars;
    query = window.location.search.substring(1);
    vars = query.split('&');
    value = null;
    _.each(vars, function(v, i) {
      var pair;
      pair = v.split('=');
      if (decodeURIComponent(pair[0]) === variable) {
        return value = decodeURIComponent(pair[1]);
      }
    });
    return value;
  };

  return HttpHelper;

})(Backbone.Model);


/*
Instantiate helper
 */

module.exports = new HttpHelper;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/index.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/ApiModel.coffee":[function(require,module,exports){
(function (global){
'use strict';
var App, Backbone,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

App.Models.ApiModel = (function(superClass) {
  extend(ApiModel, superClass);

  function ApiModel() {
    this.toggleAttribute = bind(this.toggleAttribute, this);
    this.toJSON = bind(this.toJSON, this);
    this.get = bind(this.get, this);
    this.urlRoot = bind(this.urlRoot, this);
    return ApiModel.__super__.constructor.apply(this, arguments);
  }

  ApiModel.prototype.urlRoot = function() {
    var apiUrl, urlRoot;
    urlRoot = null;
    apiUrl = _.result(this, 'apiUrl');
    if (apiUrl != null) {
      urlRoot = App.request('apiRoot') + apiUrl;
    }
    return urlRoot;
  };

  ApiModel.prototype.parse = function(response) {
    var parsedData;
    parsedData = {};
    if (response.data != null) {
      parsedData = response.data;
    } else {
      parsedData = response;
    }
    return parsedData;
  };

  ApiModel.prototype.get = function() {
    var value;
    value = App.Models.ApiModel.__super__.get.apply(this, arguments);
    if (_.isFunction(value)) {
      value = value.apply(this);
    }
    return value;
  };

  ApiModel.prototype.toJSON = function() {
    var data, json;
    data = {};
    json = App.Models.ApiModel.__super__.toJSON.apply(this, arguments);
    _.each(json, function(value, key) {
      return data[key] = this.get(key);
    }, this);
    return data;
  };

  ApiModel.prototype.toggleAttribute = function(attr, options) {
    return this.set(attr, !this.get(attr, _["default"](options, {})));
  };

  return ApiModel;

})(Backbone.Model);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/WPOptionModel.coffee":[function(require,module,exports){
'use strict';
var App,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.Models.WPOptionModel = (function(superClass) {
  extend(WPOptionModel, superClass);

  function WPOptionModel() {
    return WPOptionModel.__super__.constructor.apply(this, arguments);
  }

  WPOptionModel.prototype.apiUrl = '1/site/options';

  return WPOptionModel;

})(App.Models.ApiModel);



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/WPUserMetaModel.coffee":[function(require,module,exports){
'use strict';
var App,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.Models.WPUserMetaModel = (function(superClass) {
  extend(WPUserMetaModel, superClass);

  function WPUserMetaModel() {
    return WPUserMetaModel.__super__.constructor.apply(this, arguments);
  }

  WPUserMetaModel.prototype.apiUrl = '1/site/usermeta';

  return WPUserMetaModel;

})(App.Models.ApiModel);



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/Controllers/OptionsController.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSOptions', function(SSOptions, App, Backbone, Marionette, $, _) {
  return SSOptions.Controllers.OptionsController = (function(superClass) {
    extend(OptionsController, superClass);

    function OptionsController() {
      this.getUserMetaModel = bind(this.getUserMetaModel, this);
      this.getUserMeta = bind(this.getUserMeta, this);
      this.getOptionsModel = bind(this.getOptionsModel, this);
      this.getOptions = bind(this.getOptions, this);
      return OptionsController.__super__.constructor.apply(this, arguments);
    }

    OptionsController.prototype.getOptions = function(key) {
      var optionsModel;
      optionsModel = this.getOptionsModel();
      if (key != null) {
        return optionsModel.get(key);
      } else {
        return optionsModel;
      }
    };

    OptionsController.prototype.getOptionsModel = function() {
      if (this.optionsModel == null) {
        this.optionsModel = new SSOptions.Models.OptionsModel({
          id: 'socialstreams_app_settings'
        });
        this.optionsModel.fetch();
      }
      return this.optionsModel;
    };

    OptionsController.prototype.getUserMeta = function(key) {
      var userMeta;
      userMeta = this.getUserMetaModel();
      if (key != null) {
        return userMeta.get(key);
      } else {
        return userMeta;
      }
    };

    OptionsController.prototype.getUserMetaModel = function() {
      if (this.userMetaModel == null) {
        this.userMetaModel = new SSOptions.Models.UserMetaModel({
          id: 'socialstreams'
        });
        this.userMetaModel.fetch();
      }
      return this.userMetaModel;
    };

    return OptionsController;

  })(Backbone.Marionette.Controller);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/Models/OptionsModel.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSOptions', function(SSOptions, App, Backbone, Marionette, $, _) {
  return SSOptions.Models.OptionsModel = (function(superClass) {
    extend(OptionsModel, superClass);

    function OptionsModel() {
      this.onModerationChange = bind(this.onModerationChange, this);
      this.initialize = bind(this.initialize, this);
      this.toggleAttribute = bind(this.toggleAttribute, this);
      return OptionsModel.__super__.constructor.apply(this, arguments);
    }

    OptionsModel.prototype.defaults = {
      app_settings: true,
      moderation: false,
      user_can_moderate: false,
      is_admin: false,
      dev_mode: false,
      ss_api_url: 'https://api.socialstreams.com/',
      ss_oauth_url: 'https://oauth.socialstreams.com/',
      ss_user_id: 'new',
      access_token: 'new',
      time_to_next_cron: false,
      public_page_url: '',
      admin_page_url: '',
      wpRoot: '/'
    };

    OptionsModel.prototype.toggleAttribute = function(attr) {
      return this.set(attr, !this.get(attr));
    };

    OptionsModel.prototype.initialize = function() {
      return this.listenTo(this, 'change:moderation', this.onModerationChange);
    };

    OptionsModel.prototype.onModerationChange = function(model, moderation) {
      return App.SSOptions.vent.trigger('change:moderation', model, moderation);
    };

    return OptionsModel;

  })(App.Models.WPOptionModel);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/Models/UserMetaModel.coffee":[function(require,module,exports){
'use strict';
var App,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSOptions', function(SSOptions, App, Backbone, Marionette, $, _) {
  return SSOptions.Models.UserMetaModel = (function(superClass) {
    extend(UserMetaModel, superClass);

    function UserMetaModel() {
      return UserMetaModel.__super__.constructor.apply(this, arguments);
    }

    UserMetaModel.prototype.defaults = {
      publishPopup: false,
      trashPopup: false
    };

    return UserMetaModel;

  })(App.Models.WPUserMetaModel);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/SSOptions.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

App.module('SSOptions', function(SSOptions, App, Backbone, Marionette, $, _) {
  SSOptions.Controllers = {};
  SSOptions.Models = {};
  SSOptions.Collections = {};
  SSOptions.Views = {};
  SSOptions.Layouts = {};
  SSOptions.Routers = {};
  SSOptions.Templates = {};
  SSOptions.vent = new Backbone.Wreqr.EventAggregator();
  SSOptions.commands = new Backbone.Wreqr.Commands();
  return SSOptions.reqres = new Backbone.Wreqr.RequestResponse();
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/ssOptionsMain.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

require('./SSOptions');

require('./Models/OptionsModel');

require('./Models/UserMetaModel');

require('./Controllers/OptionsController');

App.module('SSOptions', function(SSOptions, App, Backbone, Marionette, $, _) {
  return SSOptions.addInitializer(function() {
    var controller;
    controller = new SSOptions.Controllers.OptionsController();

    /*
    Define Module API
     */
    SSOptions.reqres.setHandler('option', controller.getOptions);
    SSOptions.reqres.setHandler('options', controller.getOptions);
    return SSOptions.reqres.setHandler('userMeta', controller.getUserMeta);
  });
});



},{"./Controllers/OptionsController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/Controllers/OptionsController.coffee","./Models/OptionsModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/Models/OptionsModel.coffee","./Models/UserMetaModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/Models/UserMetaModel.coffee","./SSOptions":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/SSOptions.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Collections/ApiPostsCollection.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.Collections.ApiPostsCollection = (function(superClass) {
    extend(ApiPostsCollection, superClass);

    function ApiPostsCollection() {
      this.parse = bind(this.parse, this);
      return ApiPostsCollection.__super__.constructor.apply(this, arguments);
    }

    ApiPostsCollection.prototype.model = SSPosts.Models.PostModel;

    ApiPostsCollection.prototype.data = {
      perPage: 24,
      cron: 'false'
    };

    ApiPostsCollection.prototype.url = function() {
      var access_token, admin_page_url, data, plugin_version, ss_oauth_url, ss_user_id, url;
      url = App.SSOptions.reqres.request('option', 'ss_api_url');
      ss_oauth_url = App.SSOptions.reqres.request('option', 'ss_oauth_url');
      admin_page_url = App.SSOptions.reqres.request('option', 'admin_page_url');
      ss_user_id = App.SSOptions.reqres.request('option', 'ss_user_id');
      plugin_version = App.SSOptions.reqres.request('option', 'plugin_version');
      access_token = App.SSOptions.reqres.request('option', 'access_token');
      data = {
        origin_url: encodeURIComponent(admin_page_url),
        ss_user_id: ss_user_id,
        access_token: access_token,
        plugin_version: plugin_version
      };
      return App.Helpers.http.toUrl(url, data);
    };

    ApiPostsCollection.prototype.parse = function(response) {
      if (this.length >= 94) {
        return [];
      }
      if (response.search_metadata != null) {
        if (this.data == null) {
          this.data = {};
        }
        this.data.search_metadata = response.search_metadata;
      }
      if ((this.data != null) && (this.data.perPage != null) && response.statuses.length < this.data.perPage) {
        this.hasNext = false;
      }
      return response.statuses;
    };

    return ApiPostsCollection;

  })(App.Collections.InfiniteScrollCollection);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Collections/PostsCollection.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.Collections.PostsCollection = (function(superClass) {
    extend(PostsCollection, superClass);

    function PostsCollection() {
      this.prevPage = bind(this.prevPage, this);
      this.nextPage = bind(this.nextPage, this);
      this.comparator = bind(this.comparator, this);
      return PostsCollection.__super__.constructor.apply(this, arguments);
    }

    PostsCollection.prototype.model = SSPosts.Models.PostModel;

    PostsCollection.prototype.data = {
      perPage: 24,
      status: 'publish'
    };

    PostsCollection.prototype.apiUrl = '1/site/socialstreams';

    PostsCollection.prototype.comparator = function(a, b) {
      var aId, bId;
      aId = parseInt(a.get('order_id'), 10);
      bId = parseInt(b.get('order_id'), 10);
      if (aId > bId) {
        return -1;
      } else if (aId < bId) {
        return 1;
      } else {
        return 0;
      }
    };

    PostsCollection.prototype.nextPage = function(args) {
      if (args == null) {
        args = {};
      }
      args = _.defaults(args, {
        immediate: true
      });
      if (args.data == null) {
        args.data = {};
      }
      if (this.length > 0) {
        args.data.max_order_id = this.last().get('order_id');
      }
      return this.fetch(args);
    };

    PostsCollection.prototype.prevPage = function(args) {
      if (args == null) {
        args = {};
      }
      args = _.defaults(args, {
        immediate: true
      });
      if (args.data == null) {
        args.data = {};
      }
      if (this.length > 0) {
        args.data.min_order_id = this.first().get('order_id');
      }
      return this.fetch(args);
    };

    return PostsCollection;

  })(App.Collections.InfiniteScrollCollection);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Controllers/AutoReloadController.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.Controllers.AutoReloadController = (function(superClass) {
    extend(AutoReloadController, superClass);

    function AutoReloadController() {
      this.showInRows = bind(this.showInRows, this);
      this.autoreloadPoll = bind(this.autoreloadPoll, this);
      this.initAutoreloadPoll = bind(this.initAutoreloadPoll, this);
      this.initAutoreloadSocket = bind(this.initAutoreloadSocket, this);
      this.initAutoreload = bind(this.initAutoreload, this);
      this.onStart = bind(this.onStart, this);
      this.initialize = bind(this.initialize, this);
      return AutoReloadController.__super__.constructor.apply(this, arguments);
    }

    AutoReloadController.prototype.autoReloadInterval = 15 * 60 * 1000;

    AutoReloadController.prototype.initialize = function() {
      return SSPosts.on('start', this.onStart);
    };

    AutoReloadController.prototype.onStart = function() {
      var models, postsCompositeView;
      if ($('body').hasClass('page-template-template-socialstream-fullscreen-php')) {
        this.initAutoreload();
        postsCompositeView = SSPosts.reqres.request('postsCompositeView');
        models = [];
        postsCompositeView.collection.each(function(model) {
          return models.push(model);
        });
        return this.showInRows(postsCompositeView, models, {
          interval: 1500
        });
      }
    };

    AutoReloadController.prototype.initAutoreload = function() {
      var autoreloadMethod;
      autoreloadMethod = '';
      if (autoreloadMethod === 'websocket') {
        return this.initAutoreloadSocket();
      } else {
        return this.initAutoreloadPoll();
      }
    };

    AutoReloadController.prototype.initAutoreloadSocket = function() {};

    AutoReloadController.prototype.initAutoreloadPoll = function() {
      return setInterval(this.autoreloadPoll, this.autoReloadInterval);
    };

    AutoReloadController.prototype.autoreloadPoll = function() {
      var compositeView, firstOrderID;
      compositeView = SSPosts.reqres.request('postsCompositeView');
      if ((compositeView.loading != null) && compositeView.loading) {
        return;
      }
      compositeView.loading = true;
      firstOrderID = parseInt(compositeView.children.findByIndex(0).model.get('order_id'), 10);
      return compositeView.collection.prevPage({
        remove: false,
        data: {
          perPage: -1
        },
        success: (function(_this) {
          return function(collection, res) {
            var models;
            if (collection.length === 0) {
              return;
            }
            compositeView.render();
            models = [];
            collection.each(function(model) {
              if (parseInt(model.get('order_id'), 10) > firstOrderID) {
                return models.push(model);
              }
            });
            return _this.showInRows(compositeView, models);
          };
        })(this)
      });
    };

    AutoReloadController.prototype.showInRows = function(compositeView, models, args) {
      var cols, layout, newViews, newViewsGroups, showInterval;
      if (args == null) {
        args = {};
      }
      args = _.defaults(args, {});
      newViews = [];
      _.each(models, function(model) {
        var childView;
        childView = compositeView.children.findByModel(model);
        childView.$el.hide();
        return newViews.push(childView);
      });
      layout = $('.ss-wrapper').attr('data-layout');
      cols = 1;
      switch (layout) {
        case 'small':
          cols = 2;
          break;
        case 'medium':
          cols = 3;
          break;
        case 'large':
          cols = 4;
      }
      newViewsGroups = [];
      _.each(newViews.reverse(), function(newView, newViewIndex) {
        var groupIndex;
        groupIndex = Math.floor(newViewIndex / cols);
        if (newViewsGroups[groupIndex] == null) {
          newViewsGroups.push([]);
        }
        return newViewsGroups[groupIndex].push(newView);
      });
      if (args.interval != null) {
        showInterval = args.interval;
      } else {
        showInterval = Math.round(this.autoReloadInterval / (newViewsGroups.length + 1));
      }
      _.each(newViewsGroups, function(newViewGroup, newViewGroupIndex) {
        return setTimeout(function() {
          if (newViewGroup.length === cols) {
            return _.each(newViewGroup, function(newView) {
              return newView.$el.slideDown(500);
            });
          } else {
            return _.each(newViewGroup, function(newView) {
              return newView.$el.fadeIn(800);
            });
          }
        }, newViewGroupIndex * showInterval);
      });
      return compositeView.loading = false;
    };

    return AutoReloadController;

  })(Backbone.Marionette.Controller);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Controllers/PostsController.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.Controllers.PostsController = (function(superClass) {
    extend(PostsController, superClass);

    function PostsController() {
      this.publishApiPosts = bind(this.publishApiPosts, this);
      this.fetchApiPosts = bind(this.fetchApiPosts, this);
      this.fetchServerPosts = bind(this.fetchServerPosts, this);
      this.doingBatchSave = bind(this.doingBatchSave, this);
      this.getApiPostsCompositeView = bind(this.getApiPostsCompositeView, this);
      this.getPostsCompositeView = bind(this.getPostsCompositeView, this);
      this.getAllPostsCollection = bind(this.getAllPostsCollection, this);
      this.getApiPostsCollection = bind(this.getApiPostsCollection, this);
      this.getPostsCollection = bind(this.getPostsCollection, this);
      this.onStart = bind(this.onStart, this);
      this.initialize = bind(this.initialize, this);
      return PostsController.__super__.constructor.apply(this, arguments);
    }

    PostsController.prototype.initialize = function() {
      return SSPosts.on('start', this.onStart);
    };

    PostsController.prototype.onStart = function() {
      if ($('.ss-posts-region').length > 0) {
        App.addRegions({
          posts: '.ss-posts-region'
        });
      }

      /*
      Render posts for the first time, if any posts are found in the DOM.
       */
      if ($('.ss-wrapper').length > 0) {
        this.getPostsCompositeView().renderFromDOM($('.ss-wrapper'));
        if (App.posts != null) {
          return App.posts.currentView = this.getPostsCompositeView();
        }
      }
    };

    PostsController.prototype.getPostsCollection = function() {
      if (this.postsCollection == null) {
        this.postsCollection = new SSPosts.Collections.PostsCollection();
        if ($('.bwapi-call-data[data-id="socialstreams_top"]').length > 0) {
          this.postsCollection.data.requestID = 'socialstreams_top';
        }
        if ($('.ss-admin').length > 0) {
          this.postsCollection.data.status = ['draft', 'publish'];
        }
        this.postsCollection.fetch();
      }
      return this.postsCollection;
    };

    PostsController.prototype.getApiPostsCollection = function() {
      if (this.apiPostsCollection == null) {
        this.apiPostsCollection = new SSPosts.Collections.ApiPostsCollection();
      }
      return this.apiPostsCollection;
    };

    PostsController.prototype.getAllPostsCollection = function() {
      if (this.allPostsCollection == null) {
        this.allPostsCollection = new SSPosts.Collections.PostsCollection();
        this.allPostsCollection.data = {
          requestID: 'socialstreams_all',
          perPage: -1,
          status: ['publish', 'draft', 'trash'],
          fields: ['id', 'status', 'vendor_id', 'service_name']
        };
        this.allPostsCollection.fetch();
      }
      return this.allPostsCollection;
    };

    PostsController.prototype.getPostsCompositeView = function() {
      if ((this.postsCompositeView == null) || this.postsCompositeView.isClosed) {
        this.postsCompositeView = new SSPosts.Views.PostsCompositeView({
          collection: this.getPostsCollection(),
          model: new SSPosts.Models.PostsLayoutModel
        });
      }
      return this.postsCompositeView;
    };

    PostsController.prototype.getApiPostsCompositeView = function() {
      if ((this.apiPostsCompositeView == null) || this.apiPostsCompositeView.isClosed) {
        this.apiPostsCompositeView = new SSPosts.Views.PostsCompositeView({
          collection: this.getApiPostsCollection(),
          model: new SSPosts.Models.PostsLayoutModel
        });
      }
      return this.apiPostsCompositeView;
    };

    PostsController.prototype.doingBatchSave = function(value) {
      if (this.doingBatchSaveFlag == null) {
        this.doingBatchSaveFlag = false;
      }
      if (value != null) {
        this.doingBatchSaveFlag = value;
      }
      return this.doingBatchSaveFlag;
    };

    PostsController.prototype.fetchServerPosts = function(data, options) {
      var postsCollection;
      postsCollection = this.getPostsCollection();
      if (postsCollection.data == null) {
        postsCollection.data = {};
      }
      if (data != null) {
        postsCollection.data = _.extend({}, postsCollection.data, data);
      }
      postsCollection.hasNext = true;
      postsCollection.reset();
      return postsCollection.fetch({
        success: (function(_this) {
          return function() {
            var postsCompositeView;
            postsCompositeView = _this.getPostsCompositeView();
            if (!postsCompositeView.isRendered) {
              App.posts.show(postsCompositeView);
            }
            if ((options != null) && (options.success != null) && typeof options.success === 'function') {
              return options.success();
            }
          };
        })(this)
      });
    };

    PostsController.prototype.fetchApiPosts = function(data, options) {
      var apiPostsCollection;
      apiPostsCollection = this.getApiPostsCollection();
      if (apiPostsCollection.data == null) {
        apiPostsCollection.data = {};
      }
      if (data != null) {
        apiPostsCollection.data = _.extend({}, apiPostsCollection.data, data);
      }
      apiPostsCollection.hasNext = true;
      if (apiPostsCollection.data.search_metadata != null) {
        delete apiPostsCollection.data.search_metadata;
      }
      apiPostsCollection.reset();
      return apiPostsCollection.fetch({
        success: (function(_this) {
          return function() {
            var apiPostsCompositeView;
            apiPostsCompositeView = _this.getApiPostsCompositeView();
            if (!apiPostsCompositeView.isRendered) {
              App.posts.show(apiPostsCompositeView);
            }
            if ((options != null) && (options.success != null) && typeof options.success === 'function') {
              return options.success();
            }
          };
        })(this)
      });
    };

    PostsController.prototype.publishApiPosts = function() {
      var apiPostsCollection;
      apiPostsCollection = this.getApiPostsCollection();
      if (apiPostsCollection.length > 0) {
        return apiPostsCollection.each(function(apiPostModel) {
          return apiPostModel.save({}, {
            batch: true
          });
        });
      }
    };

    return PostsController;

  })(Backbone.Marionette.Controller);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Models/PostModel.coffee":[function(require,module,exports){
(function (global){
'use strict';
var App, moment,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.Models.PostModel = (function(superClass) {
    extend(PostModel, superClass);

    function PostModel() {
      this.getSavedPost = bind(this.getSavedPost, this);
      this.onModerationChange = bind(this.onModerationChange, this);
      this.initialize = bind(this.initialize, this);
      return PostModel.__super__.constructor.apply(this, arguments);
    }

    PostModel.prototype.apiUrl = '1/site/socialstreams';

    PostModel.prototype.initialize = function() {
      var id, savedPost;
      if ((App.SSOptions != null) && (App.SSOptions.vent != null)) {
        this.listenTo(App.SSOptions.vent, 'change:moderation', this.onModerationChange);
      }
      if ((this.id == null) || this.id === '') {
        savedPost = this.getSavedPost();
        if (savedPost != null) {
          return id = savedPost.get('id');
        }
      }
    };

    PostModel.prototype.onModerationChange = function(model, moderation) {
      var status;
      if ((this.id == null) || this.id === '') {
        status = 'publish';
        if (moderation) {
          status = 'draft';
        }
        return this.set('status', status);
      }
    };

    PostModel.prototype.parse = function(data) {
      var computedFields, dupes;
      computedFields = ['formatted_time', 'avatar', 'permalink', 'user_link', 'formatted_caption', 'image', 'video', 'has_image', 'has_video', 'has_media', 'actions', 'status_icon'];
      _.each(computedFields, function(key) {
        if (data[key] != null) {
          return delete data[key];
        }
      });
      if (this.collection != null) {
        dupes = this.collection.where({
          vendor_id: data.vendor_id,
          service_name: data.service_name
        });
        if (dupes.length > 1) {
          data.duplicate = true;
        }
      }
      return data;
    };

    PostModel.prototype.defaults = {
      duplicate: false,
      status: function() {
        var moderation, output, savedPost;
        output = 'draft';
        if (App.SSOptions != null) {
          moderation = App.SSOptions.reqres.request('option', 'moderation');
          if ((moderation != null) && moderation === false) {
            output = 'publish';
          }
        }
        savedPost = this.getSavedPost();
        if (savedPost != null) {
          output = savedPost.get('status');
        }
        return output;
      },
      formatted_time: function() {
        return App.Helpers.date.parseTimestamp(this.get('timestamp'));
      },
      screen_name: function() {
        var output;
        output = '';
        switch (this.get('service_name')) {
          case 'twitter':
            output = this.get('user').screen_name;
            break;
          case 'instagram':
            output = this.get('user').username;
        }
        return output;
      },
      avatar: function() {
        var output;
        output = '';
        switch (this.get('service_name')) {
          case 'twitter':
            output = this.get('user').profile_image_url_https;
            break;
          case 'instagram':
            output = this.get('user').profile_picture;
        }
        return output;
      },
      permalink: function() {
        var output;
        output = '';
        switch (this.get('service_name')) {
          case 'twitter':
            output = "https://www.twitter.com/" + this.get('screen_name') + "/status/" + this.get('vendor_id');
            break;
          case 'instagram':
            output = this.get('link');
        }
        return output;
      },
      user_link: function() {
        var output;
        output = '';
        switch (this.get('service_name')) {
          case 'twitter':
            output = "https://www.twitter.com/" + this.get('screen_name');
            break;
          case 'instagram':
            output = "https://www.instagram.com/" + this.get('screen_name');
        }
        return output;
      },
      formatted_caption: function() {
        var caption, output;
        output = '';
        switch (this.get('service_name')) {
          case 'twitter':
            output = this.get('text');
            break;
          case 'instagram':
            caption = this.get('caption');
            if ((caption != null) && (caption.text != null)) {
              output = caption.text;
            }
        }
        output = this.parseUrls(output);
        output = this.parseMentions(output);
        output = this.parseHashtags(output);
        output = this.addLinebreaks(output);
        return output;
      },
      image: function() {
        var entities, output;
        output = '';
        switch (this.get('service_name')) {
          case 'twitter':
            entities = this.get('entities');
            if ((entities != null) && (entities.media != null) && entities.media.length > 0) {
              output = entities.media[0].media_url_https;
            }
            break;
          case 'instagram':
            output = this.get('images').standard_resolution.url;
        }
        return output;
      },
      video: function() {
        var output, videos;
        output = '';
        switch (this.get('service_name')) {
          case 'instagram':
            videos = this.get('videos');
            if ((videos != null) && (videos.standard_resolution != null) && (videos.standard_resolution.url != null)) {
              output = videos.standard_resolution.url;
            }
        }
        return output;
      },
      has_image: function() {
        return this.get('image') !== '';
      },
      has_video: function() {
        return this.get('video') !== '';
      },
      has_media: function() {
        return this.get('has_image') || this.get('has_video');
      },
      actions: function() {
        var output, user_can_moderate, vendor_id;
        output = '';
        user_can_moderate = false;
        if (App.SSOptions != null) {
          user_can_moderate = App.SSOptions.reqres.request('option', 'user_can_moderate');
        }
        if (user_can_moderate) {
          output += '<a class="ss-post-action ss-publish-btn" href="javascript:void(0);"><i class="ss-icon-check"></i><span class="ss-inner">Publish</span></a>';
          output += '<a class="ss-post-action ss-trash-btn" href="javascript:void(0);"><i class="ss-icon-trash-o"></i><span class="ss-inner">Trash</span></a>';
        } else {
          switch (this.get('service_name')) {
            case 'twitter':
              vendor_id = this.get('vendor_id');
              output += '<a class="ss-post-action" href="https://twitter.com/intent/tweet?in_reply_to=' + vendor_id + '&via=SocialStreamsWP&related=SocialStreamsWP" target="_blank"><i class="ss-icon-reply"></i><span class="ss-inner">Reply</span></a>';
              output += '<a class="ss-post-action" href="https://twitter.com/intent/retweet?tweet_id=' + vendor_id + '&related=SocialStreamsWP" target="_blank"><i class="ss-icon-retweet"></i><span class="ss-inner">Retweet</span></a>';
          }
        }
        return output;
      },
      status_icon: function() {
        var output, user_can_moderate;
        output = '';
        user_can_moderate = false;
        if (App.SSOptions != null) {
          user_can_moderate = App.SSOptions.reqres.request('option', 'user_can_moderate');
        }
        if (user_can_moderate) {
          switch (this.get('status')) {
            case 'publish':
              output += '<i class="ss-icon-check"></i>';
              break;
            case 'draft':
              output += '<i class="ss-icon-bw bw-draft-icon"></i>';
              break;
            case 'trash':
              output += '<i class="ss-icon-trash-o"></i>';
          }
        }
        return output;
      },
      dev_meta: function() {
        var dev_mode, output;
        if (App.SSOptions == null) {
          return;
        }
        dev_mode = App.SSOptions.reqres.request('option', 'dev_mode');
        if ((dev_mode == null) || !dev_mode) {
          return;
        }
        output = '';
        output += '<p class="ss-post-id">id: ' + this.get('id') + '</p>';
        output += '<p class="ss-post-order_id">order_id: ' + this.get('order_id') + '</p>';
        output += '<p class="ss-post-vendor_id">vendor_id: ' + this.get('vendor_id') + '</p>';
        output += '<p class="ss-post-service_name">service_name: ' + this.get('service_name') + '</p>';
        output += '<p class="ss-post-timestamp">timestamp: ' + this.get('timestamp') + '</p>';
        output += '<p class="ss-post-date">date: ' + moment.unix(this.get('timestamp')).format('YYYY-MM-DD HH:mm:ss') + '</p>';
        return output;
      }
    };

    PostModel.prototype.parseUrls = function(text) {
      text = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(uri) {
        return '<a href="' + uri + '" target="_blank">' + uri + '</a>';
      });
      return text;
    };

    PostModel.prototype.parseMentions = function(text) {
      switch (this.get('service_name')) {
        case 'twitter':
          text = text.replace(/[@]+([A-Za-z0-9-_]+)/g, function(match, handle) {
            return '<a href="https://twitter.com/' + handle + '" target="_blank">@' + handle + '</a>';
          });
          break;
        case 'instagram':
          text = text.replace(/[@]+([A-Za-z0-9-_]+)/g, function(match, handle) {
            return '<a href="https://instagram.com/' + handle + '" target="_blank">@' + handle + '</a>';
          });
      }
      return text;
    };

    PostModel.prototype.parseHashtags = function(text) {
      switch (this.get('service_name')) {
        case 'twitter':
          text = text.replace(/[\s]?[#]+([A-Za-z0-9-_]+)/g, function(match, hashtag) {
            return ' <a href="https://twitter.com/hashtag/' + hashtag + '" target="_blank">#' + hashtag + '</a>';
          });
          break;
        case 'instagram':
          text = text.replace(/[\s]?[#]+([A-Za-z0-9-_]+)/g, function(match, hashtag) {
            return ' #' + hashtag;
          });
      }
      return text;
    };

    PostModel.prototype.addLinebreaks = function(text) {
      switch (this.get('service_name')) {
        case 'twitter':
          text = text.replace(/\r?\n/g, '<br />');
          break;
        case 'instagram':
          text = text.replace(/\r?\n/g, ' ');
      }
      return text;
    };

    PostModel.prototype.getSavedPost = function() {
      var allPostsCollection;
      return null;
      if (this.savedPost == null) {
        allPostsCollection = SSPosts.reqres.request('allPostsCollection');
        this.savedPost = allPostsCollection.findWhere({
          vendor_id: this.get('vendor_id'),
          service_name: this.get('service_name')
        });
      }
      return this.savedPost;
    };

    return PostModel;

  })(App.Models.ApiModel);
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Models/PostsLayoutModel.coffee":[function(require,module,exports){
'use strict';
var App,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.Models.PostsLayoutModel = (function(superClass) {
    extend(PostsLayoutModel, superClass);

    function PostsLayoutModel() {
      return PostsLayoutModel.__super__.constructor.apply(this, arguments);
    }

    PostsLayoutModel.prototype.defaults = {
      width: null,
      layout: function() {
        var layout, parentWidth;
        parentWidth = this.get('width');
        if (parentWidth == null) {
          return;
        }
        layout = '';
        if (parentWidth <= 600) {
          layout = 'x-small';
        } else if (parentWidth > 600 && parentWidth <= 900) {
          layout = 'small';
        } else if (parentWidth > 900 && parentWidth <= 1250) {
          layout = 'medium';
        } else if (parentWidth > 1250) {
          layout = 'large';
        }
        return layout;
      }
    };

    return PostsLayoutModel;

  })(App.Models.ApiModel);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/SSPosts.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  SSPosts.Controllers = {};
  SSPosts.Models = {};
  SSPosts.Collections = {};
  SSPosts.Views = {};
  SSPosts.Layouts = {};
  SSPosts.Routers = {};
  SSPosts.Templates = {};
  SSPosts.vent = new Backbone.Wreqr.EventAggregator();
  SSPosts.commands = new Backbone.Wreqr.Commands();
  return SSPosts.reqres = new Backbone.Wreqr.RequestResponse();
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Templates/PostItemViewTemplate.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "  <div class=\"ss-meta\">\n    ";
  stack1 = ((helper = (helper = helpers.dev_meta || (depth0 != null ? depth0.dev_meta : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dev_meta","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  </div><!-- .ss-meta -->\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <div class=\"ss-post-media\">\n    <span class=\"ss-post-social-icon\"><i class=\"ss-icon-"
    + escapeExpression(((helper = (helper = helpers.service_name || (depth0 != null ? depth0.service_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"service_name","hash":{},"data":data}) : helper)))
    + " ss-watermark\"></i></span>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.has_video : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div><!-- .ss-post-media -->\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <video class=\"ss-post-video\" muted autoplay loop poster=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\" data-image=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\" data-src=\""
    + escapeExpression(((helper = (helper = helpers.video || (depth0 != null ? depth0.video : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"video","hash":{},"data":data}) : helper)))
    + "\" /><!-- video.ss-post-image -->\n";
},"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <div class=\"ss-post-image-wrapper\" style=\"background-image:url("
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + ");\">\n        <img src=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\" class=\"ss-post-image\" />\n      </div><!-- .ss-post-image-wrapper -->\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"ss-post-inner\">\n\n  <span class=\"ss-post-spacer\"></span>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.dev_meta : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <div class=\"ss-post-content\">\n    <span class=\"ss-post-social-icon\"><i class=\"ss-icon-"
    + escapeExpression(((helper = (helper = helpers.service_name || (depth0 != null ? depth0.service_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"service_name","hash":{},"data":data}) : helper)))
    + "\"></i></span>\n    <div class=\"ss-post-content-inner\">\n      ";
  stack1 = ((helper = (helper = helpers.formatted_caption || (depth0 != null ? depth0.formatted_caption : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formatted_caption","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    </div>\n  </div><!-- .ss-post-content -->\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.has_media : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <div class=\"ss-post-actions\">\n    ";
  stack1 = ((helper = (helper = helpers.actions || (depth0 != null ? depth0.actions : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"actions","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  </div><!-- .ss-post-actions -->\n\n  <div class=\"ss-post-status\">\n    ";
  stack1 = ((helper = (helper = helpers.status_icon || (depth0 != null ? depth0.status_icon : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"status_icon","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  </div><!-- .ss-post-status -->\n\n  <div class=\"ss-post-footer\">\n    <a href=\""
    + escapeExpression(((helper = (helper = helpers.user_link || (depth0 != null ? depth0.user_link : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user_link","hash":{},"data":data}) : helper)))
    + "\" class=\"ss-avatar\" target=\"_blank\"> <img src=\""
    + escapeExpression(((helper = (helper = helpers.avatar || (depth0 != null ? depth0.avatar : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"avatar","hash":{},"data":data}) : helper)))
    + "\"/> </a>\n    <a href=\""
    + escapeExpression(((helper = (helper = helpers.user_link || (depth0 != null ? depth0.user_link : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user_link","hash":{},"data":data}) : helper)))
    + "\" class=\"ss-handle\" target=\"_blank\">@"
    + escapeExpression(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"screen_name","hash":{},"data":data}) : helper)))
    + "</a>\n    <a href=\""
    + escapeExpression(((helper = (helper = helpers.permalink || (depth0 != null ? depth0.permalink : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"permalink","hash":{},"data":data}) : helper)))
    + "\" class=\"ss-post-time\" target=\"_blank\">\n      <span data-livestamp=\""
    + escapeExpression(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\"></span>\n    </a>\n  </div><!-- .ss-post-footer -->\n\n</div><!-- .ss-post-inner -->\n";
},"useData":true});

},{"hbsfy/runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/hbsfy/runtime.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Templates/PostsCompositeViewTemplate.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "\n<div class=\"ss-posts\"></div>\n\n<div class=\"ss-infinite-scroll-loader\"><div class=\"ss-inner-text\">No more content to load.</div></div>\n\n<div class=\"ss-footer\">\n  <div class=\"ss-credits\">\n    <span class=\"ss-powered-by\">Powered by</span>\n    <a href=\"http://socialstreams.com\" class=\"ss-footer-logo\" target=\"_blank\">\n       <span class=\"ss-footer-logo-text\">Social Streams</span>\n    </a>\n  </div>\n</div>\n\n";
  },"useData":true});

},{"hbsfy/runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/hbsfy/runtime.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Views/PostItemView.coffee":[function(require,module,exports){
(function (global){
'use strict';
var App, Modernizr, alertify,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

Modernizr = require('modernizr');

alertify = (typeof window !== "undefined" ? window.alertify : typeof global !== "undefined" ? global.alertify : null);

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.Views.PostItemView = (function(superClass) {
    extend(PostItemView, superClass);

    function PostItemView() {
      this.onStatusChange = bind(this.onStatusChange, this);
      this.onMouseover = bind(this.onMouseover, this);
      this.onClickToggleStatus = bind(this.onClickToggleStatus, this);
      this.onTap = bind(this.onTap, this);
      this.onClickAnchor = bind(this.onClickAnchor, this);
      this.onRender = bind(this.onRender, this);
      this.attributes = bind(this.attributes, this);
      this.className = bind(this.className, this);
      this.initialize = bind(this.initialize, this);
      return PostItemView.__super__.constructor.apply(this, arguments);
    }

    PostItemView.prototype.template = require('../Templates/PostItemViewTemplate');

    PostItemView.prototype.initialize = function() {
      return this.listenTo(this.model, 'change:status', this.onStatusChange);
    };

    PostItemView.prototype.className = function() {
      var classes, ssOptions;
      classes = ['ss-post'];
      if (App.SSOptions != null) {
        ssOptions = App.SSOptions.reqres.request('options');
        if (ssOptions.get('dev_mode')) {
          classes.push('ss-dev');
        }
      }
      if (this.model.get('has_media')) {
        classes.push('ss-has-media');
      }
      if (this.model.get('has_video')) {
        classes.push('ss-has-video');
      }
      if (this.model.get('duplicate')) {
        classes.push('ss-duplicate');
      }
      classes.push('ss-' + this.model.get('service_name'));
      classes.push('ss-status-' + this.model.get('status'));
      return classes.join(' ');
    };

    PostItemView.prototype.attributes = function() {
      return {
        'data-id': this.model.get('order_id')
      };
    };

    PostItemView.prototype.onRender = function() {
      if (this.model.get('has_video') != null) {
        this.$('video').prop('muted', true);
      }
      if ((Modernizr.touchevents != null) && Modernizr.touchevents === true) {
        this.$el.on('click', 'a', this.onClickAnchor);
        return this.$el.on('tap', this.onTap);
      } else {
        if (this.model.get('has_video') != null) {
          this.$('video').attr("src", this.$('video').data("src"));
        }
        this.$el.on('mouseenter mouseleave', '.ss-post-inner', this.onMouseover);
        return this.$el.on('click', '.ss-publish-btn, .ss-trash-btn', this.onClickToggleStatus);
      }
    };

    PostItemView.prototype.onClickAnchor = function(event) {
      var $target, href, targetAttr;
      $target = $(event.currentTarget);
      $target.addClass('click-fired');
      if ($target.hasClass('ss-publish-btn') || $target.hasClass('ss-trash-btn')) {
        this.onClickToggleStatus(event);
        return;
      }
      href = $target.attr('href');
      targetAttr = $target.attr('target');
      if (targetAttr == null) {
        targetAttr = '';
      }
      return window.open(href, targetAttr);
    };

    PostItemView.prototype.onTap = function(event) {
      var $currentTarget, $target, hasTapClass;
      $target = $(event.target);
      $currentTarget = $(event.currentTarget);
      if ($target.is('a') || $target.parents('a').length > 0) {
        setTimeout(function() {
          if (!$target.hasClass('click-fired')) {
            return $target.removeClass('click-fired').click();
          }
        }, 0);
        return;
      }
      hasTapClass = $currentTarget.hasClass('tap');
      $('.ss-post.tap').removeClass('tap');
      return $currentTarget.toggleClass('tap', !hasTapClass);
    };

    PostItemView.prototype.onClickToggleStatus = function(event) {
      var currentStatus, status;
      event.preventDefault();
      status = 'publish';
      if ($(event.currentTarget).hasClass('ss-trash-btn')) {
        status = 'trash';
      }
      currentStatus = this.model.get('status');
      if (currentStatus === status) {
        this.model.set({
          status: ''
        }, {
          silent: true
        });
        return this.model.set({
          status: status
        });
      } else {
        return this.model.save({
          status: status
        });
      }
    };

    PostItemView.prototype.onMouseover = function(event) {
      var hover;
      hover = false;
      if (event.type === 'mouseenter' || event.type === 'tap') {
        hover = true;
      }
      this.toggleEl(this.$('.ss-post-media'), !hover);
      this.toggleEl(this.$('.ss-post-actions'), hover);
      this.$el.toggleClass('ss-hover', hover);
      if ((Modernizr.touchevents != null) && Modernizr.touchevents === true) {
        return this.$el.parent().toggleClass('tap', hover);
      }
    };

    PostItemView.prototype.toggleEl = function($el, toggle) {
      var animate, cssEnd, cssStart;
      cssStart = {};
      animate = {};
      cssEnd = {};
      if (toggle) {
        cssStart = {
          display: 'block',
          opacity: 0
        };
        animate = {
          opacity: 1
        };
      } else {
        cssStart = {
          display: 'block'
        };
        animate = {
          opacity: 0
        };
        cssEnd = {
          display: 'none'
        };
      }
      return $el.stop(0, 0).css(cssStart).animate(animate, 200, function() {
        return $el.css(cssEnd);
      });
    };

    PostItemView.prototype.onStatusChange = function(model, status) {
      var doingBatchSave, message, moderation, prevStatus, userMeta;
      prevStatus = 'publish';
      if (this.$el.hasClass('ss-status-draft')) {
        prevStatus = 'draft';
      }
      if (this.$el.hasClass('ss-status-trash')) {
        prevStatus = 'trash';
      }
      doingBatchSave = SSPosts.reqres.request('doingBatchSave');
      userMeta = App.SSOptions.reqres.request('userMeta');
      message = '';
      switch (prevStatus + '-' + status) {
        case 'publish-publish':
          if (!doingBatchSave) {
            moderation = App.SSOptions.reqres.request('option', 'moderation');
            if (!moderation) {
              if (!userMeta.get('publishPopup')) {
                message = "<h1><i class='ss-icon-check'></i></h1><h3>This post is already approved.</h3> <br /> To turn Auto-Approve <strong>OFF</strong> see the <i>advanced settings</i> <i class='ss-icon-cog'></i>";
                userMeta.save({
                  publishPopup: true
                });
              }
            }
          }
          break;
        case 'publish-trash':
        case 'draft-trash':
          if (!doingBatchSave && !userMeta.get('trashPopup')) {
            message = "<h1><i class='ss-icon-trash-o'></i></h1><h3>This post is trashed!</h3> <br /> <h3>To rescue this post click <i>View Trash</i> <i class='ss-icon-trash-o'></i></h3> <br/> You will not see this message again.";
            userMeta.save({
              trashPopup: true
            });
          }
          this.$el.addClass('ss-trashing');
          this.$el.fadeOut(500, (function(_this) {
            return function() {
              return _this.remove();
            };
          })(this));
          break;
        case 'draft-publish':
          this.render();
          this.$el.attr('class', _.result(this, 'className'));
          this.$el.addClass('ss-publishing');
          this.$('.ss-post-spacer').fadeOut(500, (function(_this) {
            return function() {
              _this.$el.removeClass('ss-publishing');
              return _this.$('.ss-post-spacer').show();
            };
          })(this));
          break;
        case 'trash-publish':
          this.$el.addClass('ss-publishing');
          this.$el.fadeOut(500, (function(_this) {
            return function() {
              return _this.remove();
            };
          })(this));
          break;
        case 'trash-trash':
          break;
        default:
          this.render();
          this.$el.attr('class', _.result(this, 'className'));
      }
      if (message !== '' && (alertify != null)) {
        return alertify.alert('', message);
      }
    };

    return PostItemView;

  })(App.Views.BaseItemView);
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../Templates/PostItemViewTemplate":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Templates/PostItemViewTemplate.hbs","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee","modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/index.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Views/PostsCompositeView.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

require('./PostItemView');

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.Views.PostsCompositeView = (function(superClass) {
    extend(PostsCompositeView, superClass);

    function PostsCompositeView() {
      this.onChangeWidth = bind(this.onChangeWidth, this);
      this.onChangeEnvWidth = bind(this.onChangeEnvWidth, this);
      this.onRender = bind(this.onRender, this);
      this.initialize = bind(this.initialize, this);
      this._getChildViewElFromModel = bind(this._getChildViewElFromModel, this);
      return PostsCompositeView.__super__.constructor.apply(this, arguments);
    }

    PostsCompositeView.prototype.template = require('../Templates/PostsCompositeViewTemplate');

    PostsCompositeView.prototype.className = function() {
      var className, ssOptions;
      className = 'ss-wrapper';
      if ((this.collection != null) && this.collection instanceof SSPosts.Collections.ApiPostsCollection) {
        className += ' ss-api-posts';
      }
      if (App.SSOptions != null) {
        ssOptions = App.SSOptions.reqres.request('options');
        if (ssOptions.get('user_can_moderate')) {
          className += ' ss-moderation';
        }
        if (ssOptions.get('is_admin')) {
          className += ' ss-is-admin';
        }
      }
      return className;
    };

    PostsCompositeView.prototype.itemViewContainer = '.ss-posts';

    PostsCompositeView.prototype.itemView = SSPosts.Views.PostItemView;

    PostsCompositeView.prototype.scrollContainer = 'window';

    PostsCompositeView.prototype._getChildViewElFromModel = function(model) {
      return this.$(this.itemViewContainer).find('[data-id="' + model.get('order_id') + '"]');
    };

    PostsCompositeView.prototype.initialize = function() {

      /*
      Listen for width changes to reset the number of columns
       */
      this.listenTo(App.Helpers.env, 'change:width', this.onChangeEnvWidth);
      this.listenTo(this.model, 'change:width', this.onChangeWidth);
      return SSPosts.Views.PostsCompositeView.__super__.initialize.apply(this, arguments);
    };

    PostsCompositeView.prototype.onRender = function() {
      this.onChangeEnvWidth();
      this.$el.attr('class', _.result(this, 'className'));
      return SSPosts.Views.PostsCompositeView.__super__.onRender.apply(this, arguments);
    };

    PostsCompositeView.prototype.onChangeEnvWidth = function() {
      var parentWidth;
      parentWidth = null;
      if ((this.$el != null) && this.$el.parent().length > 0) {
        parentWidth = this.$el.parent().width();
      }
      if ((parentWidth == null) || parentWidth === 0) {
        setTimeout(this.onChangeEnvWidth, 200);
        return;
      }
      return this.model.set('width', parentWidth);
    };

    PostsCompositeView.prototype.onChangeWidth = function() {
      var layout;
      layout = this.model.get('layout');
      if (layout == null) {
        return;
      }
      if (this.currentLayout == null) {
        this.currentLayout = '';
      }
      if (layout === this.currentLayout) {
        return;
      }
      this.currentLayout = layout;
      return this.$el.attr('data-layout', layout);
    };

    return PostsCompositeView;

  })(App.Views.InfiniteScrollCompositeView);
});



},{"../Templates/PostsCompositeViewTemplate":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Templates/PostsCompositeViewTemplate.hbs","./PostItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Views/PostItemView.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/ssPostsMain.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

require('./SSPosts');

require('./Models/PostModel');

require('./Models/PostsLayoutModel');

require('./Collections/PostsCollection');

require('./Collections/ApiPostsCollection');

require('./Views/PostItemView');

require('./Views/PostsCompositeView');

require('./Controllers/PostsController');

require('./Controllers/AutoReloadController');

App.module('SSPosts', function(SSPosts, App, Backbone, Marionette, $, _) {
  return SSPosts.addInitializer(function() {
    var autoReloadController, postsController;
    postsController = new SSPosts.Controllers.PostsController();
    autoReloadController = new SSPosts.Controllers.AutoReloadController();

    /*
    Define Module API
     */
    SSPosts.reqres.setHandler('postsCollection', postsController.getPostsCollection);
    SSPosts.reqres.setHandler('apiPostsCollection', postsController.getApiPostsCollection);
    SSPosts.reqres.setHandler('postsCompositeView', postsController.getPostsCompositeView);
    SSPosts.reqres.setHandler('allPostsCollection', postsController.getAllPostsCollection);
    SSPosts.reqres.setHandler('doingBatchSave', postsController.doingBatchSave);
    SSPosts.commands.setHandler('doingBatchSave', postsController.doingBatchSave);
    SSPosts.commands.setHandler('fetchServerPosts', postsController.fetchServerPosts);
    SSPosts.commands.setHandler('fetchApiPosts', postsController.fetchApiPosts);
    return SSPosts.commands.setHandler('publishApiPosts', postsController.publishApiPosts);
  });
});



},{"./Collections/ApiPostsCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Collections/ApiPostsCollection.coffee","./Collections/PostsCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Collections/PostsCollection.coffee","./Controllers/AutoReloadController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Controllers/AutoReloadController.coffee","./Controllers/PostsController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Controllers/PostsController.coffee","./Models/PostModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Models/PostModel.coffee","./Models/PostsLayoutModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Models/PostsLayoutModel.coffee","./SSPosts":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/SSPosts.coffee","./Views/PostItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Views/PostItemView.coffee","./Views/PostsCompositeView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Views/PostsCompositeView.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Templates/Helpers/toTitleCase.coffee":[function(require,module,exports){
"use strict";
var App, Handlebars;

App = require("app");

Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper('toTitleCase', function(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee","hbsfy/runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/hbsfy/runtime.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/BaseCompositeView.coffee":[function(require,module,exports){
(function (global){
'use strict';
var $, App, Backbone,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require("app");

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

App.Views.BaseCompositeView = (function(superClass) {
  extend(BaseCompositeView, superClass);

  function BaseCompositeView() {
    this._getChildViewElFromModel = bind(this._getChildViewElFromModel, this);
    this._renderChildrenFromDOM = bind(this._renderChildrenFromDOM, this);
    this.renderFromDOM = bind(this.renderFromDOM, this);
    return BaseCompositeView.__super__.constructor.apply(this, arguments);
  }

  BaseCompositeView.prototype.renderFromDOM = function(el) {
    if (el == null) {
      return this;
    }
    if (el instanceof $) {
      if (el.length > 0) {
        this.el = el[0];
      }
    } else {
      this.el = el;
    }
    if (this.el == null) {
      return this;
    }
    this.$el = $(el);
    this.isRendered = true;
    this.isClosed = false;
    this.resetItemViewContainer();
    this.triggerBeforeRender();
    this.bindUIElements();
    this.triggerMethod("composite:model:rendered");
    this._renderChildrenFromDOM();
    this.triggerMethod("composite:rendered");
    this.triggerRendered();
    return this;
  };

  BaseCompositeView.prototype._renderChildrenFromDOM = function() {
    if (this.collection.length > 0) {
      return this.collection.each(function(model) {
        var el, view;
        el = this._getChildViewElFromModel(model);
        if ((el != null) && el instanceof $ && el.length > 0) {
          el = el[0];
        }
        if (el == null) {
          return;
        }
        view = new this.itemView({
          el: el,
          model: model
        });
        this.addChildViewEventForwarding(view);
        this.children.add(view);
        return view.triggerMethod('render');
      }, this);
    }
  };

  BaseCompositeView.prototype._getChildViewElFromModel = function(model) {
    return this.$(this.itemViewContainer).find('[data-id="' + model.get('id') + '"]');
  };

  return BaseCompositeView;

})(Backbone.Marionette.CompositeView);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/BaseItemView.coffee":[function(require,module,exports){
(function (global){
'use strict';
var $, App, Backbone,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require("app");

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

App.Views.BaseItemView = (function(superClass) {
  extend(BaseItemView, superClass);

  function BaseItemView() {
    this.renderFromDOM = bind(this.renderFromDOM, this);
    return BaseItemView.__super__.constructor.apply(this, arguments);
  }

  BaseItemView.prototype.renderFromDOM = function(el) {
    if (el == null) {
      return this;
    }
    if (el instanceof $) {
      if (el.length > 0) {
        this.el = el[0];
      }
    } else {
      this.el = el;
    }
    if (this.el == null) {
      return this;
    }
    this.$el = $(el);
    this.isRendered = true;
    this.isClosed = false;
    return this.delegateEvents();
  };

  return BaseItemView;

})(Backbone.Marionette.ItemView);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/InfiniteScrollCompositeView.coffee":[function(require,module,exports){
(function (global){
'use strict';
var $, App, Backbone, Modernizr, _, bindWindowScrollEvent, bindWindowScrollEventOnce, debouncedOnWindowScroll, onWindowScroll, windowScrollHandlerViews,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require("app");

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

_ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

Modernizr = require("modernizr");

windowScrollHandlerViews = {};

onWindowScroll = function(event) {
  var cid, results, view;
  results = [];
  for (cid in windowScrollHandlerViews) {
    view = windowScrollHandlerViews[cid];
    if ((view != null) && !view.isClosed && (view.el != null)) {
      results.push(view.triggerMethod('scroll', event));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

debouncedOnWindowScroll = _.throttle(onWindowScroll, 300);

bindWindowScrollEvent = function() {
  return $(window).on('scroll', debouncedOnWindowScroll);
};

bindWindowScrollEventOnce = _.once(bindWindowScrollEvent);

App.Views.InfiniteScrollCompositeView = (function(superClass) {
  extend(InfiniteScrollCompositeView, superClass);

  function InfiniteScrollCompositeView() {
    this.onScrollNearBottom = bind(this.onScrollNearBottom, this);
    this.getOffsetBottom = bind(this.getOffsetBottom, this);
    this.onScroll = bind(this.onScroll, this);
    this.bindScrollEvent = bind(this.bindScrollEvent, this);
    this.onClose = bind(this.onClose, this);
    this.onRender = bind(this.onRender, this);
    this.initialize = bind(this.initialize, this);
    return InfiniteScrollCompositeView.__super__.constructor.apply(this, arguments);
  }

  InfiniteScrollCompositeView.prototype.initialize = function() {
    if (this.scrollContainer == null) {
      return;
    }
    if ((this.collection != null) && this.collection instanceof App.Collections.InfiniteScrollCollection) {
      return this.listenTo(this.model, 'change:loading', this.onLoadingChange);
    }
  };

  InfiniteScrollCompositeView.prototype.onRender = function() {
    return this.bindScrollEvent();
  };

  InfiniteScrollCompositeView.prototype.onClose = function() {
    if (this.scrollContainer === 'window' && (windowScrollHandlerViews[this.cid] != null)) {
      return delete windowScrollHandlerViews[this.cid];
    }
  };

  InfiniteScrollCompositeView.prototype.bindScrollEvent = function() {
    var debouncedScroll;
    if (this.scrollContainer === 'window') {
      bindWindowScrollEventOnce();
      return windowScrollHandlerViews[this.cid] = this;
    } else {
      if (this.$(this.scrollContainer).length > 0) {
        debouncedScroll = _.throttle(this.onScroll, 100);
        return this.$(this.scrollContainer).scroll(debouncedScroll);
      }
    }
  };

  InfiniteScrollCompositeView.prototype.onScroll = function(event) {
    var $target, innerHeight, offset, offsetBottom, pixelsFromBottom, pixelsFromTop, scrollHeight, scrollTop;
    if (this.scrollContainer === 'window') {
      scrollHeight = $(document).height();
      innerHeight = $(window).height();
      scrollTop = App.Helpers.env.get('scrollTop');
    } else {
      $target = $(event.currentTarget);
      scrollHeight = $target[0].scrollHeight;
      innerHeight = $target.innerHeight();
      scrollTop = $target.scrollTop();
    }
    pixelsFromTop = scrollTop;
    pixelsFromBottom = 0 + scrollHeight - scrollTop - innerHeight;
    offset = 700;
    offsetBottom = this.getOffsetBottom($('.ss-wrapper'), scrollHeight);
    if (pixelsFromBottom < 0 || pixelsFromTop < 0) {
      return;
    }
    if (pixelsFromBottom < offset + offsetBottom) {
      return this.triggerMethod('scroll:near:bottom');
    } else if (pixelsFromTop < offset) {
      return this.triggerMethod('scroll:near:top');
    }
  };

  InfiniteScrollCompositeView.prototype.getOffsetBottom = function($el, scrollHeight) {
    if (this.offsetBottom == null) {
      this.offsetBottom = scrollHeight - ($el.height() + $el.offset().top);
      if (this.offsetBottom < 0) {
        this.offsetBottom = 0;
      }
    }
    return this.offsetBottom;
  };

  InfiniteScrollCompositeView.prototype.onScrollNearBottom = function() {
    if ((this.collection.nextPage == null) || (this.collection == null) || this.collection.length === 0) {
      return;
    }
    if ((this.loading != null) && this.loading) {
      return;
    }
    if ((this.collection.hasNext != null) && this.collection.hasNext === false) {
      return;
    }
    this.loading = true;
    this.model.set('loading', true);
    return this.collection.nextPage({
      remove: false,
      success: (function(_this) {
        return function(collection, response) {
          _this.loading = false;
          return _this.model.set('loading', false);
        };
      })(this)
    });
  };

  InfiniteScrollCompositeView.prototype.onLoadingChange = function(model, loading, options) {
    var done, infiniteScrollLoaderHtml;
    if (this.loaderView == null) {
      if (this.$('.ss-infinite-scroll-loader').length === 0) {
        infiniteScrollLoaderHtml = '<div class="ss-infinite-scroll-loader"><div class="ss-inner-text">No more content to load.</div></div>';
        if (this.scrollContainer === 'window') {
          this.$el.append(infiniteScrollLoaderHtml);
        } else {
          this.$(this.scrollContainer).append(infiniteScrollLoaderHtml);
        }
      }
      this.loaderView = new App.Views.LoaderItemView({
        model: new Backbone.Model
      });
      this.$('.ss-infinite-scroll-loader').append(this.loaderView.render().el);
    }
    done = false;
    if (loading) {
      this.loaderView.startSpinner();
    } else {
      this.loaderView.stopSpinner();
    }
    this.$('.ss-infinite-scroll-loader').toggleClass('ss-loading', loading);
    return this.$('.ss-infinite-scroll-loader').toggleClass('ss-done', done);
  };

  return InfiniteScrollCompositeView;

})(App.Views.BaseCompositeView);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee","modernizr":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/index.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/LoaderItemView.coffee":[function(require,module,exports){
(function (global){
'use strict';
var App, Backbone, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require("app");

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

_ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

App.Views.LoaderItemView = (function(superClass) {
  extend(LoaderItemView, superClass);

  function LoaderItemView() {
    this.stopSpinner = bind(this.stopSpinner, this);
    this.startSpinner = bind(this.startSpinner, this);
    this.onRender = bind(this.onRender, this);
    return LoaderItemView.__super__.constructor.apply(this, arguments);
  }

  LoaderItemView.prototype.className = 'ss-ajax-loader-view';

  LoaderItemView.prototype.defaultSpinArgs = {
    lines: 12,
    length: 7,
    width: 2,
    radius: 9,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#aeaeae',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: false,
    className: 'ss-spinner'
  };

  LoaderItemView.prototype.template = function() {
    return '';
  };

  LoaderItemView.prototype.onRender = function() {
    return this.startSpinner();
  };

  LoaderItemView.prototype.startSpinner = function() {
    var spinArgs;
    spinArgs = _.extend({}, this.defaultSpinArgs, this.model.toJSON());
    return this.$el.spin(spinArgs);
  };

  LoaderItemView.prototype.stopSpinner = function() {
    return this.$el.spin(false);
  };

  return LoaderItemView;

})(App.Views.BaseItemView);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee":[function(require,module,exports){
(function (global){
"use strict";
var App, Backbone;

Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null);

App = new Backbone.Marionette.Application({
  Controllers: {},
  Models: {},
  Collections: {},
  Views: {},
  Layouts: {},
  Routers: {},
  Templates: {},
  Partials: {},
  Helpers: {}
});

window.SSApp = App;

module.exports = App;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/appMain.coffee":[function(require,module,exports){
(function (global){
"use strict";
var $, App;

require('browsernizr/test/touchevents');

App = require('app');

App.Helpers.browserSupport = require("./Helpers/browserSupport");

App.Helpers.data = require("./Helpers/data");

App.Helpers.date = require("./Helpers/date");

App.Helpers.env = require("./Helpers/env");

App.Helpers.http = require("./Helpers/http");

require('./Templates/Helpers/toTitleCase');

require('./Controllers/AppController');

require('./Models/ApiModel');

require('./Models/WPOptionModel');

require('./Models/WPUserMetaModel');

require('./Collections/ApiCollection');

require('./Collections/InfiniteScrollCollection');

require('./Views/BaseItemView');

require('./Views/BaseCompositeView');

require('./Views/LoaderItemView');

require('./Views/InfiniteScrollCompositeView');

require('./Config/BackboneAjax');


/*
initialize controller on doc ready - before even starting the app
so that sub apps and models will have access to the app api inside the appinitializers
 */

$ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

$(document).ready(function() {
  var controller;
  $('video').prop("muted", true);
  App.Helpers.browserSupport.ieAjaxSupport();
  controller = new App.Controllers.AppController();

  /*
  Define App Requests
   */
  App.reqres.setHandler('apiRoot', controller.getApiRoot);
  App.reqres.setHandler('isEven', controller.isEven);

  /*
  start the app
  This is when modules get initialized
   */
  App.start();

  /*
  start ENV helper.
   */
  return App.Helpers.env.start();
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./Collections/ApiCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Collections/ApiCollection.coffee","./Collections/InfiniteScrollCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Collections/InfiniteScrollCollection.coffee","./Config/BackboneAjax":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Config/BackboneAjax.coffee","./Controllers/AppController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Controllers/AppController.coffee","./Helpers/browserSupport":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/browserSupport.coffee","./Helpers/data":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/data.coffee","./Helpers/date":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/date.coffee","./Helpers/env":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/env.coffee","./Helpers/http":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/http.coffee","./Models/ApiModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/ApiModel.coffee","./Models/WPOptionModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/WPOptionModel.coffee","./Models/WPUserMetaModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/WPUserMetaModel.coffee","./Templates/Helpers/toTitleCase":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Templates/Helpers/toTitleCase.coffee","./Views/BaseCompositeView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/BaseCompositeView.coffee","./Views/BaseItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/BaseItemView.coffee","./Views/InfiniteScrollCompositeView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/InfiniteScrollCompositeView.coffee","./Views/LoaderItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/LoaderItemView.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee","browsernizr/test/touchevents":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/test/touchevents.js"}]},{},["./src/scripts/public.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9wdWJsaWMuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvbGliL2NvbnNvbGUtbG9nLXNoaW0uY29mZmVlIiwibGliL3R3aXR0ZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL01vZGVybml6ci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2Vybml6ci9saWIvTW9kZXJuaXpyUHJvdG8uanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2NsYXNzZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2NyZWF0ZUVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2RvY0VsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2dldEJvZHkuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2luamVjdEVsZW1lbnRXaXRoU3R5bGVzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL2xpYi9pcy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2Vybml6ci9saWIvcHJlZml4ZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3NldENsYXNzZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3Rlc3RSdW5uZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3Rlc3RTdHlsZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3Rlc3RzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL3Rlc3QvdG91Y2hldmVudHMuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9oYnNmeS9ydW50aW1lLmpzIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvQ29sbGVjdGlvbnMvQXBpQ29sbGVjdGlvbi5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Db2xsZWN0aW9ucy9JbmZpbml0ZVNjcm9sbENvbGxlY3Rpb24uY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvQ29uZmlnL0JhY2tib25lQWpheC5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Db250cm9sbGVycy9BcHBDb250cm9sbGVyLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL0hlbHBlcnMvYnJvd3NlclN1cHBvcnQuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvSGVscGVycy9kYXRhLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL0hlbHBlcnMvZGF0ZS5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9IZWxwZXJzL2Vudi5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9IZWxwZXJzL2h0dHAuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kZWxzL0FwaU1vZGVsLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZGVscy9XUE9wdGlvbk1vZGVsLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZGVscy9XUFVzZXJNZXRhTW9kZWwuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU09wdGlvbnMvQ29udHJvbGxlcnMvT3B0aW9uc0NvbnRyb2xsZXIuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU09wdGlvbnMvTW9kZWxzL09wdGlvbnNNb2RlbC5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTT3B0aW9ucy9Nb2RlbHMvVXNlck1ldGFNb2RlbC5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTT3B0aW9ucy9TU09wdGlvbnMuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU09wdGlvbnMvc3NPcHRpb25zTWFpbi5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTUG9zdHMvQ29sbGVjdGlvbnMvQXBpUG9zdHNDb2xsZWN0aW9uLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9Db2xsZWN0aW9ucy9Qb3N0c0NvbGxlY3Rpb24uY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL0NvbnRyb2xsZXJzL0F1dG9SZWxvYWRDb250cm9sbGVyLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9Db250cm9sbGVycy9Qb3N0c0NvbnRyb2xsZXIuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL01vZGVscy9Qb3N0TW9kZWwuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL01vZGVscy9Qb3N0c0xheW91dE1vZGVsLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9TU1Bvc3RzLmNvZmZlZSIsInNyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9UZW1wbGF0ZXMvUG9zdEl0ZW1WaWV3VGVtcGxhdGUuaGJzIiwic3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL1RlbXBsYXRlcy9Qb3N0c0NvbXBvc2l0ZVZpZXdUZW1wbGF0ZS5oYnMiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTUG9zdHMvVmlld3MvUG9zdEl0ZW1WaWV3LmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9WaWV3cy9Qb3N0c0NvbXBvc2l0ZVZpZXcuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL3NzUG9zdHNNYWluLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL1RlbXBsYXRlcy9IZWxwZXJzL3RvVGl0bGVDYXNlLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL1ZpZXdzL0Jhc2VDb21wb3NpdGVWaWV3LmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL1ZpZXdzL0Jhc2VJdGVtVmlldy5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9WaWV3cy9JbmZpbml0ZVNjcm9sbENvbXBvc2l0ZVZpZXcuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvVmlld3MvTG9hZGVySXRlbVZpZXcuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvYXBwLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL2FwcE1haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBQSxDQUFBO0FBQUEsT0FNQSxDQUFRLFdBQVIsQ0FOQSxDQUFBOztBQUFBLE9BU0EsQ0FBUSxTQUFSLENBVEEsQ0FBQTs7QUFBQSxPQVlBLENBQVEsa0JBQVIsQ0FaQSxDQUFBOztBQUFBLE9Ba0JBLENBQVEsbUNBQVIsQ0FsQkEsQ0FBQTs7QUFBQSxPQW1CQSxDQUFRLCtCQUFSLENBbkJBLENBQUE7Ozs7O0FDQUEsWUFBQSxDQUFBO0FBR0EsSUFBTyxzQkFBUDtBQUNDLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsRUFBakIsQ0FERDtDQUhBOztBQU1BLElBQU8sMEJBQVA7QUFDQyxFQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBZixHQUFxQixTQUFBLEdBQUEsQ0FBckIsQ0FERDtDQU5BOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQUEsRUFhQSxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUEzQixDQUFBLENBYkEsQ0FBQTtBQUFBLEVBZ0JBLFVBQUEsR0FBaUIsSUFBQSxHQUFHLENBQUMsV0FBVyxDQUFDLGFBQWhCLENBQUEsQ0FoQmpCLENBQUE7QUFrQkE7QUFBQTs7S0FsQkE7QUFBQSxFQXFCQSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVgsQ0FBc0IsU0FBdEIsRUFBaUMsVUFBVSxDQUFDLFVBQTVDLENBckJBLENBQUE7QUFBQSxFQXNCQSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVgsQ0FBc0IsUUFBdEIsRUFBZ0MsVUFBVSxDQUFDLE1BQTNDLENBdEJBLENBQUE7QUF3QkE7QUFBQTs7O0tBeEJBO0FBQUEsRUE0QkEsR0FBRyxDQUFDLEtBQUosQ0FBQSxDQTVCQSxDQUFBO0FBOEJBO0FBQUE7O0tBOUJBO1NBaUNBLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQWhCLENBQUEsRUFuQ2dCO0FBQUEsQ0FBbEIsQ0E5Q0EsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIlxuXG4jIGV4dHJhIG1vZGVybml6ciBtb2R1bGVzXG4jIHJlcXVpcmUgJ2Jyb3dzZXJuaXpyL3Rlc3QvY3NzL29wYWNpdHknXG5cbiMgTWFpbiBhcHAgbG9hZGVyXG5yZXF1aXJlICcuL2FwcE1haW4nXG5cbiMgVHdpdHRlciBhcGlcbnJlcXVpcmUgJ3R3aXR0ZXInXG5cbiMgY29uc29sZSBsb2cgc2hpbVxucmVxdWlyZSBcImNvbnNvbGUtbG9nLXNoaW1cIlxuXG4jIExvYWQgTW9kdWxlcyB0aGF0IHdpbGwgYmUgdXNlZCBieSB0aGUgYXBwXG4jIFRoZXNlIG1vZHVsZXMgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHN0YXJ0ZWRcbiMgd2hlbiB0aGUgYXBwIHN0YXJ0cyAob24gZG9jcmVhZHkpIGluIHRoZVxuIyBvcmRlciB0aGV5IGFwcGVhciBoZXJlLlxucmVxdWlyZSAnLi9Nb2R1bGVzL1NTT3B0aW9ucy9zc09wdGlvbnNNYWluJ1xucmVxdWlyZSAnLi9Nb2R1bGVzL1NTUG9zdHMvc3NQb3N0c01haW4nXG4iLCJcInVzZSBzdHJpY3RcIlxuXG4jIHNoaW0gZm9yIGNvbnNvbGUgbG9nXG5pZiBub3Qgd2luZG93LmNvbnNvbGU/XG5cdHdpbmRvdy5jb25zb2xlID0ge31cblxuaWYgbm90IHdpbmRvdy5jb25zb2xlLmxvZz9cblx0d2luZG93LmNvbnNvbGUubG9nID0gKCkgLT5cblx0XHQjIGRvIG5vdGhpbmdcbiIsIihmdW5jdGlvbigpIHtcbiAgaWYgKHdpbmRvdy5fX3R3aXR0ZXJJbnRlbnRIYW5kbGVyKSByZXR1cm47XG4gIHZhciBpbnRlbnRSZWdleCA9IC90d2l0dGVyXFwuY29tKFxcOlxcZHsyLDR9KT9cXC9pbnRlbnRcXC8oXFx3KykvLFxuICAgICAgd2luZG93T3B0aW9ucyA9ICdzY3JvbGxiYXJzPXllcyxyZXNpemFibGU9eWVzLHRvb2xiYXI9bm8sbG9jYXRpb249eWVzJyxcbiAgICAgIHdpZHRoID0gNTUwLFxuICAgICAgaGVpZ2h0ID0gNDIwLFxuICAgICAgd2luSGVpZ2h0ID0gc2NyZWVuLmhlaWdodCxcbiAgICAgIHdpbldpZHRoID0gc2NyZWVuLndpZHRoO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUludGVudChlKSB7XG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsXG4gICAgICAgIG0sIGxlZnQsIHRvcDtcblxuICAgIHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdhJykge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnICYmIHRhcmdldC5ocmVmKSB7XG4gICAgICBtID0gdGFyZ2V0LmhyZWYubWF0Y2goaW50ZW50UmVnZXgpO1xuICAgICAgaWYgKG0pIHtcbiAgICAgICAgbGVmdCA9IE1hdGgucm91bmQoKHdpbldpZHRoIC8gMikgLSAod2lkdGggLyAyKSk7XG4gICAgICAgIHRvcCA9IDA7XG5cbiAgICAgICAgaWYgKHdpbkhlaWdodCA+IGhlaWdodCkge1xuICAgICAgICAgIHRvcCA9IE1hdGgucm91bmQoKHdpbkhlaWdodCAvIDIpIC0gKGhlaWdodCAvIDIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5vcGVuKHRhcmdldC5ocmVmLCAnaW50ZW50Jywgd2luZG93T3B0aW9ucyArICcsd2lkdGg9JyArIHdpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLGhlaWdodD0nICsgaGVpZ2h0ICsgJyxsZWZ0PScgKyBsZWZ0ICsgJyx0b3A9JyArIHRvcCk7XG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCAmJiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUludGVudCwgZmFsc2UpO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ29uY2xpY2snLCBoYW5kbGVJbnRlbnQpO1xuICB9XG4gIHdpbmRvdy5fX3R3aXR0ZXJJbnRlbnRIYW5kbGVyID0gdHJ1ZTtcbn0oKSk7XG4iLCJ2YXIgTW9kZXJuaXpyID0gcmVxdWlyZSgnLi9saWIvTW9kZXJuaXpyJyksXG4gICAgTW9kZXJuaXpyUHJvdG8gPSByZXF1aXJlKCcuL2xpYi9Nb2Rlcm5penJQcm90bycpLFxuICAgIGNsYXNzZXMgPSByZXF1aXJlKCcuL2xpYi9jbGFzc2VzJyksXG4gICAgdGVzdFJ1bm5lciA9IHJlcXVpcmUoJy4vbGliL3Rlc3RSdW5uZXInKSxcbiAgICBzZXRDbGFzc2VzID0gcmVxdWlyZSgnLi9saWIvc2V0Q2xhc3NlcycpO1xuXG4vLyBSdW4gZWFjaCB0ZXN0XG50ZXN0UnVubmVyKCk7XG5cbi8vIFJlbW92ZSB0aGUgXCJuby1qc1wiIGNsYXNzIGlmIGl0IGV4aXN0c1xuc2V0Q2xhc3NlcyhjbGFzc2VzKTtcblxuZGVsZXRlIE1vZGVybml6clByb3RvLmFkZFRlc3Q7XG5kZWxldGUgTW9kZXJuaXpyUHJvdG8uYWRkQXN5bmNUZXN0O1xuXG4vLyBSdW4gdGhlIHRoaW5ncyB0aGF0IGFyZSBzdXBwb3NlZCB0byBydW4gYWZ0ZXIgdGhlIHRlc3RzXG5mb3IgKHZhciBpID0gMDsgaSA8IE1vZGVybml6ci5fcS5sZW5ndGg7IGkrKykge1xuICBNb2Rlcm5penIuX3FbaV0oKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2Rlcm5penI7XG4iLCJ2YXIgTW9kZXJuaXpyUHJvdG8gPSByZXF1aXJlKCcuL01vZGVybml6clByb3RvJyk7XG5cblxuICAvLyBGYWtlIHNvbWUgb2YgT2JqZWN0LmNyZWF0ZVxuICAvLyBzbyB3ZSBjYW4gZm9yY2Ugbm9uIHRlc3QgcmVzdWx0c1xuICAvLyB0byBiZSBub24gXCJvd25cIiBwcm9wZXJ0aWVzLlxuICB2YXIgTW9kZXJuaXpyID0gZnVuY3Rpb24oKXt9O1xuICBNb2Rlcm5penIucHJvdG90eXBlID0gTW9kZXJuaXpyUHJvdG87XG5cbiAgLy8gTGVhayBtb2Rlcm5penIgZ2xvYmFsbHkgd2hlbiB5b3UgYHJlcXVpcmVgIGl0XG4gIC8vIHJhdGhlciB0aGFuIGZvcmNlIGl0IGhlcmUuXG4gIC8vIE92ZXJ3cml0ZSBuYW1lIHNvIGNvbnN0cnVjdG9yIG5hbWUgaXMgbmljZXIgOkRcbiAgTW9kZXJuaXpyID0gbmV3IE1vZGVybml6cigpO1xuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVybml6cjsiLCJ2YXIgdGVzdHMgPSByZXF1aXJlKCcuL3Rlc3RzJyk7XG5cblxuICB2YXIgTW9kZXJuaXpyUHJvdG8gPSB7XG4gICAgLy8gVGhlIGN1cnJlbnQgdmVyc2lvbiwgZHVtbXlcbiAgICBfdmVyc2lvbjogJ3YzLjAuMHByZScsXG5cbiAgICAvLyBBbnkgc2V0dGluZ3MgdGhhdCBkb24ndCB3b3JrIGFzIHNlcGFyYXRlIG1vZHVsZXNcbiAgICAvLyBjYW4gZ28gaW4gaGVyZSBhcyBjb25maWd1cmF0aW9uLlxuICAgIF9jb25maWc6IHtcbiAgICAgIGNsYXNzUHJlZml4IDogJycsXG4gICAgICBlbmFibGVDbGFzc2VzIDogdHJ1ZVxuICAgIH0sXG5cbiAgICAvLyBRdWV1ZSBvZiB0ZXN0c1xuICAgIF9xOiBbXSxcblxuICAgIC8vIFN0dWIgdGhlc2UgZm9yIHBlb3BsZSB3aG8gYXJlIGxpc3RlbmluZ1xuICAgIG9uOiBmdW5jdGlvbiggdGVzdCwgY2IgKSB7XG4gICAgICAvLyBJIGRvbid0IHJlYWxseSB0aGluayBwZW9wbGUgc2hvdWxkIGRvIHRoaXMsIGJ1dCB3ZSBjYW5cbiAgICAgIC8vIHNhZmUgZ3VhcmQgaXQgYSBiaXQuXG4gICAgICAvLyAtLSBOT1RFOjogdGhpcyBnZXRzIFdBWSBvdmVycmlkZGVuIGluIHNyYy9hZGRUZXN0IGZvclxuICAgICAgLy8gYWN0dWFsIGFzeW5jIHRlc3RzLiBUaGlzIGlzIGluIGNhc2UgcGVvcGxlIGxpc3RlbiB0b1xuICAgICAgLy8gc3luY2hyb25vdXMgdGVzdHMuIEkgd291bGQgbGVhdmUgaXQgb3V0LCBidXQgdGhlIGNvZGVcbiAgICAgIC8vIHRvICpkaXNhbGxvdyogc3luYyB0ZXN0cyBpbiB0aGUgcmVhbCB2ZXJzaW9uIG9mIHRoaXNcbiAgICAgIC8vIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGxhcmdlciB0aGFuIHRoaXMuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBjYih0aGlzW3Rlc3RdKTtcbiAgICAgIH0sIDApO1xuICAgIH0sXG5cbiAgICBhZGRUZXN0OiBmdW5jdGlvbiggbmFtZSwgZm4sIG9wdGlvbnMgKSB7XG4gICAgICB0ZXN0cy5wdXNoKHtuYW1lIDogbmFtZSwgZm4gOiBmbiwgb3B0aW9ucyA6IG9wdGlvbnMgfSk7XG4gICAgfSxcblxuICAgIGFkZEFzeW5jVGVzdDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICB0ZXN0cy5wdXNoKHtuYW1lIDogbnVsbCwgZm4gOiBmbn0pO1xuICAgIH1cbiAgfTtcblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBNb2Rlcm5penJQcm90bzsiLCJcbiAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzZXM7IiwiXG4gIHZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkoZG9jdW1lbnQsIGFyZ3VtZW50cyk7XG4gIH07XG4gIFxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVFbGVtZW50OyIsIlxuICB2YXIgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGRvY0VsZW1lbnQ7IiwidmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL2NyZWF0ZUVsZW1lbnQnKTtcblxuXG4gIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgLy8gQWZ0ZXIgcGFnZSBsb2FkIGluamVjdGluZyBhIGZha2UgYm9keSBkb2Vzbid0IHdvcmsgc28gY2hlY2sgaWYgYm9keSBleGlzdHNcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICBpZighYm9keSkge1xuICAgICAgLy8gQ2FuJ3QgdXNlIHRoZSByZWFsIGJvZHkgY3JlYXRlIGEgZmFrZSBvbmUuXG4gICAgICBib2R5ID0gY3JlYXRlRWxlbWVudCgnYm9keScpO1xuICAgICAgYm9keS5mYWtlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJvZHk7IiwidmFyIE1vZGVybml6clByb3RvID0gcmVxdWlyZSgnLi9Nb2Rlcm5penJQcm90bycpO1xudmFyIGRvY0VsZW1lbnQgPSByZXF1aXJlKCcuL2RvY0VsZW1lbnQnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi9jcmVhdGVFbGVtZW50Jyk7XG52YXIgZ2V0Qm9keSA9IHJlcXVpcmUoJy4vZ2V0Qm9keScpO1xuXG5cbiAgLy8gSW5qZWN0IGVsZW1lbnQgd2l0aCBzdHlsZSBlbGVtZW50IGFuZCBzb21lIENTUyBydWxlc1xuICBmdW5jdGlvbiBpbmplY3RFbGVtZW50V2l0aFN0eWxlcyggcnVsZSwgY2FsbGJhY2ssIG5vZGVzLCB0ZXN0bmFtZXMgKSB7XG4gICAgdmFyIG1vZCA9ICdtb2Rlcm5penInO1xuICAgIHZhciBzdHlsZTtcbiAgICB2YXIgcmV0O1xuICAgIHZhciBub2RlO1xuICAgIHZhciBkb2NPdmVyZmxvdztcbiAgICB2YXIgZGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGJvZHkgPSBnZXRCb2R5KCk7XG5cbiAgICBpZiAoIHBhcnNlSW50KG5vZGVzLCAxMCkgKSB7XG4gICAgICAvLyBJbiBvcmRlciBub3QgdG8gZ2l2ZSBmYWxzZSBwb3NpdGl2ZXMgd2UgY3JlYXRlIGEgbm9kZSBmb3IgZWFjaCB0ZXN0XG4gICAgICAvLyBUaGlzIGFsc28gYWxsb3dzIHRoZSBtZXRob2QgdG8gc2NhbGUgZm9yIHVuc3BlY2lmaWVkIHVzZXNcbiAgICAgIHdoaWxlICggbm9kZXMtLSApIHtcbiAgICAgICAgbm9kZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub2RlLmlkID0gdGVzdG5hbWVzID8gdGVzdG5hbWVzW25vZGVzXSA6IG1vZCArIChub2RlcyArIDEpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN0eWxlPiBlbGVtZW50cyBpbiBJRTYtOSBhcmUgY29uc2lkZXJlZCAnTm9TY29wZScgZWxlbWVudHMgYW5kIHRoZXJlZm9yZSB3aWxsIGJlIHJlbW92ZWRcbiAgICAvLyB3aGVuIGluamVjdGVkIHdpdGggaW5uZXJIVE1MLiBUbyBnZXQgYXJvdW5kIHRoaXMgeW91IG5lZWQgdG8gcHJlcGVuZCB0aGUgJ05vU2NvcGUnIGVsZW1lbnRcbiAgICAvLyB3aXRoIGEgJ3Njb3BlZCcgZWxlbWVudCwgaW4gb3VyIGNhc2UgdGhlIHNvZnQtaHlwaGVuIGVudGl0eSBhcyBpdCB3b24ndCBtZXNzIHdpdGggb3VyIG1lYXN1cmVtZW50cy5cbiAgICAvLyBtc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMzg5NyUyOFZTLjg1JTI5LmFzcHhcbiAgICAvLyBEb2N1bWVudHMgc2VydmVkIGFzIHhtbCB3aWxsIHRocm93IGlmIHVzaW5nICZzaHk7IHNvIHVzZSB4bWwgZnJpZW5kbHkgZW5jb2RlZCB2ZXJzaW9uLiBTZWUgaXNzdWUgIzI3N1xuICAgIHN0eWxlID0gWycmIzE3MzsnLCc8c3R5bGUgaWQ9XCJzJywgbW9kLCAnXCI+JywgcnVsZSwgJzwvc3R5bGU+J10uam9pbignJyk7XG4gICAgZGl2LmlkID0gbW9kO1xuICAgIC8vIElFNiB3aWxsIGZhbHNlIHBvc2l0aXZlIG9uIHNvbWUgdGVzdHMgZHVlIHRvIHRoZSBzdHlsZSBlbGVtZW50IGluc2lkZSB0aGUgdGVzdCBkaXYgc29tZWhvdyBpbnRlcmZlcmluZyBvZmZzZXRIZWlnaHQsIHNvIGluc2VydCBpdCBpbnRvIGJvZHkgb3IgZmFrZWJvZHkuXG4gICAgLy8gT3BlcmEgd2lsbCBhY3QgYWxsIHF1aXJreSB3aGVuIGluamVjdGluZyBlbGVtZW50cyBpbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBwYWdlIGlzIHNlcnZlZCBhcyB4bWwsIG5lZWRzIGZha2Vib2R5IHRvby4gIzI3MFxuICAgICghYm9keS5mYWtlID8gZGl2IDogYm9keSkuaW5uZXJIVE1MICs9IHN0eWxlO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBpZiAoIGJvZHkuZmFrZSApIHtcbiAgICAgIC8vYXZvaWQgY3Jhc2hpbmcgSUU4LCBpZiBiYWNrZ3JvdW5kIGltYWdlIGlzIHVzZWRcbiAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgLy9TYWZhcmkgNS4xMy81LjEuNCBPU1ggc3RvcHMgbG9hZGluZyBpZiA6Oi13ZWJraXQtc2Nyb2xsYmFyIGlzIHVzZWQgYW5kIHNjcm9sbGJhcnMgYXJlIHZpc2libGVcbiAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgIGRvY092ZXJmbG93ID0gZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdztcbiAgICAgIGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgIGRvY0VsZW1lbnQuYXBwZW5kQ2hpbGQoYm9keSk7XG4gICAgfVxuXG4gICAgcmV0ID0gY2FsbGJhY2soZGl2LCBydWxlKTtcbiAgICAvLyBJZiB0aGlzIGlzIGRvbmUgYWZ0ZXIgcGFnZSBsb2FkIHdlIGRvbid0IHdhbnQgdG8gcmVtb3ZlIHRoZSBib2R5IHNvIGNoZWNrIGlmIGJvZHkgZXhpc3RzXG4gICAgaWYgKCBib2R5LmZha2UgKSB7XG4gICAgICBib2R5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYm9keSk7XG4gICAgICBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gZG9jT3ZlcmZsb3c7XG4gICAgICAvLyBUcmlnZ2VyIGxheW91dCBzbyBraW5ldGljIHNjcm9sbGluZyBpc24ndCBkaXNhYmxlZCBpbiBpT1M2K1xuICAgICAgZG9jRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpdik7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhcmV0O1xuXG4gIH1cblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBpbmplY3RFbGVtZW50V2l0aFN0eWxlczsiLCJcbiAgLyoqXG4gICAqIGlzIHJldHVybnMgYSBib29sZWFuIGZvciBpZiB0eXBlb2Ygb2JqIGlzIGV4YWN0bHkgdHlwZS5cbiAgICovXG4gIGZ1bmN0aW9uIGlzKCBvYmosIHR5cGUgKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IHR5cGU7XG4gIH1cbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGlzOyIsInZhciBNb2Rlcm5penJQcm90byA9IHJlcXVpcmUoJy4vTW9kZXJuaXpyUHJvdG8nKTtcblxuXG4gIC8vIExpc3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIHNldCBmb3IgY3NzIHRlc3RzLiBTZWUgdGlja2V0ICMyMVxuICB2YXIgcHJlZml4ZXMgPSAnIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtICcuc3BsaXQoJyAnKTtcblxuICAvLyBleHBvc2UgdGhlc2UgZm9yIHRoZSBwbHVnaW4gQVBJLiBMb29rIGluIHRoZSBzb3VyY2UgZm9yIGhvdyB0byBqb2luKCkgdGhlbSBhZ2FpbnN0IHlvdXIgaW5wdXRcbiAgTW9kZXJuaXpyUHJvdG8uX3ByZWZpeGVzID0gcHJlZml4ZXM7XG5cbiAgXG5cbm1vZHVsZS5leHBvcnRzID0gcHJlZml4ZXM7IiwidmFyIE1vZGVybml6ciA9IHJlcXVpcmUoJy4vTW9kZXJuaXpyJyk7XG52YXIgZG9jRWxlbWVudCA9IHJlcXVpcmUoJy4vZG9jRWxlbWVudCcpO1xuXG5cbiAgLy8gUGFzcyBpbiBhbiBhbmQgYXJyYXkgb2YgY2xhc3MgbmFtZXMsIGUuZy46XG4gIC8vICBbJ25vLXdlYnAnLCAnYm9yZGVycmFkaXVzJywgLi4uXVxuICBmdW5jdGlvbiBzZXRDbGFzc2VzKCBjbGFzc2VzICkge1xuICAgIHZhciBjbGFzc05hbWUgPSBkb2NFbGVtZW50LmNsYXNzTmFtZTtcbiAgICB2YXIgcmVnZXg7XG4gICAgdmFyIGNsYXNzUHJlZml4ID0gTW9kZXJuaXpyLl9jb25maWcuY2xhc3NQcmVmaXggfHwgJyc7XG5cbiAgICAvLyBDaGFuZ2UgYG5vLWpzYCB0byBganNgICh3ZSBkbyB0aGlzIHJlZ2FyZGxlcyBvZiB0aGUgYGVuYWJsZUNsYXNzZXNgXG4gICAgLy8gb3B0aW9uKVxuICAgIC8vIEhhbmRsZSBjbGFzc1ByZWZpeCBvbiB0aGlzIHRvb1xuICAgIHZhciByZUpTID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpJytjbGFzc1ByZWZpeCsnbm8tanMoXFxcXHN8JCknKTtcbiAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUucmVwbGFjZShyZUpTLCAnJDEnK2NsYXNzUHJlZml4KydqcyQyJyk7XG5cbiAgICBpZihNb2Rlcm5penIuX2NvbmZpZy5lbmFibGVDbGFzc2VzKSB7XG4gICAgICAvLyBBZGQgdGhlIG5ldyBjbGFzc2VzXG4gICAgICBjbGFzc05hbWUgKz0gJyAnICsgY2xhc3NQcmVmaXggKyBjbGFzc2VzLmpvaW4oJyAnICsgY2xhc3NQcmVmaXgpO1xuICAgICAgZG9jRWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgfVxuXG4gIH1cblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDbGFzc2VzOyIsInZhciB0ZXN0cyA9IHJlcXVpcmUoJy4vdGVzdHMnKTtcbnZhciBNb2Rlcm5penIgPSByZXF1aXJlKCcuL01vZGVybml6cicpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcblxuXG4gIC8vIFJ1biB0aHJvdWdoIGFsbCB0ZXN0cyBhbmQgZGV0ZWN0IHRoZWlyIHN1cHBvcnQgaW4gdGhlIGN1cnJlbnQgVUEuXG4gIGZ1bmN0aW9uIHRlc3RSdW5uZXIoKSB7XG4gICAgdmFyIGZlYXR1cmVOYW1lcztcbiAgICB2YXIgZmVhdHVyZTtcbiAgICB2YXIgYWxpYXNJZHg7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB2YXIgbmFtZUlkeDtcbiAgICB2YXIgZmVhdHVyZU5hbWU7XG4gICAgdmFyIGZlYXR1cmVOYW1lU3BsaXQ7XG4gICAgdmFyIG1vZGVybml6clByb3A7XG4gICAgdmFyIG1Qcm9wQ291bnQ7XG5cbiAgICBmb3IgKCB2YXIgZmVhdHVyZUlkeCBpbiB0ZXN0cyApIHtcbiAgICAgIGZlYXR1cmVOYW1lcyA9IFtdO1xuICAgICAgZmVhdHVyZSA9IHRlc3RzW2ZlYXR1cmVJZHhdO1xuICAgICAgLy8gcnVuIHRoZSB0ZXN0LCB0aHJvdyB0aGUgcmV0dXJuIHZhbHVlIGludG8gdGhlIE1vZGVybml6cixcbiAgICAgIC8vICAgdGhlbiBiYXNlZCBvbiB0aGF0IGJvb2xlYW4sIGRlZmluZSBhbiBhcHByb3ByaWF0ZSBjbGFzc05hbWVcbiAgICAgIC8vICAgYW5kIHB1c2ggaXQgaW50byBhbiBhcnJheSBvZiBjbGFzc2VzIHdlJ2xsIGpvaW4gbGF0ZXIuXG4gICAgICAvL1xuICAgICAgLy8gICBJZiB0aGVyZSBpcyBubyBuYW1lLCBpdCdzIGFuICdhc3luYycgdGVzdCB0aGF0IGlzIHJ1bixcbiAgICAgIC8vICAgYnV0IG5vdCBkaXJlY3RseSBhZGRlZCB0byB0aGUgb2JqZWN0LiBUaGF0IHNob3VsZFxuICAgICAgLy8gICBiZSBkb25lIHdpdGggYSBwb3N0LXJ1biBhZGRUZXN0IGNhbGwuXG4gICAgICBpZiAoIGZlYXR1cmUubmFtZSApIHtcbiAgICAgICAgZmVhdHVyZU5hbWVzLnB1c2goZmVhdHVyZS5uYW1lLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGlmIChmZWF0dXJlLm9wdGlvbnMgJiYgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMgJiYgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gQWRkIGFsbCB0aGUgYWxpYXNlcyBpbnRvIHRoZSBuYW1lcyBsaXN0XG4gICAgICAgICAgZm9yIChhbGlhc0lkeCA9IDA7IGFsaWFzSWR4IDwgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMubGVuZ3RoOyBhbGlhc0lkeCsrKSB7XG4gICAgICAgICAgICBmZWF0dXJlTmFtZXMucHVzaChmZWF0dXJlLm9wdGlvbnMuYWxpYXNlc1thbGlhc0lkeF0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgdGVzdCwgb3IgdXNlIHRoZSByYXcgdmFsdWUgaWYgaXQncyBub3QgYSBmdW5jdGlvblxuICAgICAgcmVzdWx0ID0gaXMoZmVhdHVyZS5mbiwgJ2Z1bmN0aW9uJykgPyBmZWF0dXJlLmZuKCkgOiBmZWF0dXJlLmZuO1xuXG5cbiAgICAgIC8vIFNldCBlYWNoIG9mIHRoZSBuYW1lcyBvbiB0aGUgTW9kZXJuaXpyIG9iamVjdFxuICAgICAgZm9yIChuYW1lSWR4ID0gMDsgbmFtZUlkeCA8IGZlYXR1cmVOYW1lcy5sZW5ndGg7IG5hbWVJZHgrKykge1xuICAgICAgICBmZWF0dXJlTmFtZSA9IGZlYXR1cmVOYW1lc1tuYW1lSWR4XTtcbiAgICAgICAgLy8gU3VwcG9ydCBkb3QgcHJvcGVydGllcyBhcyBzdWIgdGVzdHMuIFdlIGRvbid0IGRvIGNoZWNraW5nIHRvIG1ha2Ugc3VyZVxuICAgICAgICAvLyB0aGF0IHRoZSBpbXBsaWVkIHBhcmVudCB0ZXN0cyBoYXZlIGJlZW4gYWRkZWQuIFlvdSBtdXN0IGNhbGwgdGhlbSBpblxuICAgICAgICAvLyBvcmRlciAoZWl0aGVyIGluIHRoZSB0ZXN0LCBvciBtYWtlIHRoZSBwYXJlbnQgdGVzdCBhIGRlcGVuZGVuY3kpLlxuICAgICAgICAvL1xuICAgICAgICAvLyBDYXAgaXQgdG8gVFdPIHRvIG1ha2UgdGhlIGxvZ2ljIHNpbXBsZSBhbmQgYmVjYXVzZSB3aG8gbmVlZHMgdGhhdCBraW5kIG9mIHN1YnRlc3RpbmdcbiAgICAgICAgLy8gaGFzaHRhZyBmYW1vdXMgbGFzdCB3b3Jkc1xuICAgICAgICBmZWF0dXJlTmFtZVNwbGl0ID0gZmVhdHVyZU5hbWUuc3BsaXQoJy4nKTtcblxuICAgICAgICBpZiAoZmVhdHVyZU5hbWVTcGxpdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV0gPSByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmVhdHVyZU5hbWVTcGxpdC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV1bZmVhdHVyZU5hbWVTcGxpdFsxXV0gPSByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjbGFzc2VzLnB1c2goKHJlc3VsdCA/ICcnIDogJ25vLScpICsgZmVhdHVyZU5hbWVTcGxpdC5qb2luKCctJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RSdW5uZXI7IiwidmFyIE1vZGVybml6clByb3RvID0gcmVxdWlyZSgnLi9Nb2Rlcm5penJQcm90bycpO1xudmFyIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzID0gcmVxdWlyZSgnLi9pbmplY3RFbGVtZW50V2l0aFN0eWxlcycpO1xuXG5cbiAgdmFyIHRlc3RTdHlsZXMgPSBNb2Rlcm5penJQcm90by50ZXN0U3R5bGVzID0gaW5qZWN0RWxlbWVudFdpdGhTdHlsZXM7XG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RTdHlsZXM7IiwiXG4gIHZhciB0ZXN0cyA9IFtdO1xuICBcbm1vZHVsZS5leHBvcnRzID0gdGVzdHM7IiwidmFyIE1vZGVybml6ciA9IHJlcXVpcmUoJy4vLi4vbGliL01vZGVybml6cicpO1xudmFyIHByZWZpeGVzID0gcmVxdWlyZSgnLi8uLi9saWIvcHJlZml4ZXMnKTtcbnZhciB0ZXN0U3R5bGVzID0gcmVxdWlyZSgnLi8uLi9saWIvdGVzdFN0eWxlcycpO1xuXG4vKiFcbntcbiAgXCJuYW1lXCI6IFwiVG91Y2ggRXZlbnRzXCIsXG4gIFwicHJvcGVydHlcIjogXCJ0b3VjaGV2ZW50c1wiLFxuICBcImNhbml1c2VcIiA6IFwidG91Y2hcIixcbiAgXCJ0YWdzXCI6IFtcIm1lZGlhXCIsIFwiYXR0cmlidXRlXCJdLFxuICBcIm5vdGVzXCI6IFt7XG4gICAgXCJuYW1lXCI6IFwiVG91Y2ggRXZlbnRzIHNwZWNcIixcbiAgICBcImhyZWZcIjogXCJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDEzL1dELXRvdWNoLWV2ZW50cy0yMDEzMDEyNC9cIlxuICB9XSxcbiAgXCJ3YXJuaW5nc1wiOiBbXG4gICAgXCJJbmRpY2F0ZXMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIFRvdWNoIEV2ZW50cyBzcGVjLCBhbmQgZG9lcyBub3QgbmVjZXNzYXJpbHkgcmVmbGVjdCBhIHRvdWNoc2NyZWVuIGRldmljZVwiXG4gIF0sXG4gIFwia25vd25CdWdzXCI6IFtcbiAgICBcIkZhbHNlLXBvc2l0aXZlIG9uIHNvbWUgY29uZmlndXJhdGlvbnMgb2YgTm9raWEgTjkwMFwiLFxuICAgIFwiRmFsc2UtcG9zaXRpdmUgb24gc29tZSBCbGFja0JlcnJ5IDYuMCBidWlsZHMg4oCTIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy8zNzIjaXNzdWVjb21tZW50LTMxMTI2OTVcIlxuICBdXG59XG4hKi9cbi8qIERPQ1xuXG5JbmRpY2F0ZXMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIFczQyBUb3VjaCBFdmVudHMgQVBJLlxuXG5UaGlzICpkb2VzIG5vdCogbmVjZXNzYXJpbHkgcmVmbGVjdCBhIHRvdWNoc2NyZWVuIGRldmljZTpcblxuKiBPbGRlciB0b3VjaHNjcmVlbiBkZXZpY2VzIG9ubHkgZW11bGF0ZSBtb3VzZSBldmVudHNcbiogTW9kZXJuIElFIHRvdWNoIGRldmljZXMgaW1wbGVtZW50IHRoZSBQb2ludGVyIEV2ZW50cyBBUEkgaW5zdGVhZDogdXNlIGBNb2Rlcm5penIucG9pbnRlcmV2ZW50c2AgdG8gZGV0ZWN0IHN1cHBvcnQgZm9yIHRoYXRcbiogU29tZSBicm93c2VycyAmIE9TIHNldHVwcyBtYXkgZW5hYmxlIHRvdWNoIEFQSXMgd2hlbiBubyB0b3VjaHNjcmVlbiBpcyBjb25uZWN0ZWRcbiogRnV0dXJlIGJyb3dzZXJzIG1heSBpbXBsZW1lbnQgb3RoZXIgZXZlbnQgbW9kZWxzIGZvciB0b3VjaCBpbnRlcmFjdGlvbnNcblxuU2VlIHRoaXMgYXJ0aWNsZTogW1lvdSBDYW4ndCBEZXRlY3QgQSBUb3VjaHNjcmVlbl0oaHR0cDovL3d3dy5zdHVjb3guY29tL2Jsb2cveW91LWNhbnQtZGV0ZWN0LWEtdG91Y2hzY3JlZW4vKS5cblxuSXQncyByZWNvbW1lbmRlZCB0byBiaW5kIGJvdGggbW91c2UgYW5kIHRvdWNoL3BvaW50ZXIgZXZlbnRzIHNpbXVsdGFuZW91c2x5IOKAkyBzZWUgW3RoaXMgSFRNTDUgUm9ja3MgdHV0b3JpYWxdKGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vbW9iaWxlL3RvdWNoYW5kbW91c2UvKS5cblxuVGhpcyB0ZXN0IHdpbGwgYWxzbyByZXR1cm4gYHRydWVgIGZvciBGaXJlZm94IDQgTXVsdGl0b3VjaCBzdXBwb3J0LlxuXG4qL1xuXG4gIC8vIENocm9tZSAoZGVza3RvcCkgdXNlZCB0byBsaWUgYWJvdXQgaXRzIHN1cHBvcnQgb24gdGhpcywgYnV0IHRoYXQgaGFzIHNpbmNlIGJlZW4gcmVjdGlmaWVkOiBodHRwOi8vY3JidWcuY29tLzM2NDE1XG4gIE1vZGVybml6ci5hZGRUZXN0KCd0b3VjaGV2ZW50cycsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBib29sO1xuICAgIGlmKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkge1xuICAgICAgYm9vbCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBxdWVyeSA9IFsnQG1lZGlhICgnLHByZWZpeGVzLmpvaW4oJ3RvdWNoLWVuYWJsZWQpLCgnKSwnaGVhcnR6JywnKScsJ3sjbW9kZXJuaXpye3RvcDo5cHg7cG9zaXRpb246YWJzb2x1dGV9fSddLmpvaW4oJycpO1xuICAgICAgdGVzdFN0eWxlcyhxdWVyeSwgZnVuY3Rpb24oIG5vZGUgKSB7XG4gICAgICAgIGJvb2wgPSBub2RlLm9mZnNldFRvcCA9PT0gOTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYm9vbDtcbiAgfSk7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuLypnbG9iYWxzIEhhbmRsZWJhcnM6IHRydWUgKi9cbnZhciBiYXNlID0gcmVxdWlyZShcIi4vaGFuZGxlYmFycy9iYXNlXCIpO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxudmFyIFNhZmVTdHJpbmcgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nXCIpW1wiZGVmYXVsdFwiXTtcbnZhciBFeGNlcHRpb24gPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3V0aWxzXCIpO1xudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3J1bnRpbWVcIik7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59O1xuXG52YXIgSGFuZGxlYmFycyA9IGNyZWF0ZSgpO1xuSGFuZGxlYmFycy5jcmVhdGUgPSBjcmVhdGU7XG5cbkhhbmRsZWJhcnNbJ2RlZmF1bHQnXSA9IEhhbmRsZWJhcnM7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSGFuZGxlYmFyczsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBVdGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xudmFyIEV4Y2VwdGlvbiA9IHJlcXVpcmUoXCIuL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBWRVJTSU9OID0gXCIyLjAuMFwiO1xuZXhwb3J0cy5WRVJTSU9OID0gVkVSU0lPTjt2YXIgQ09NUElMRVJfUkVWSVNJT04gPSA2O1xuZXhwb3J0cy5DT01QSUxFUl9SRVZJU0lPTiA9IENPTVBJTEVSX1JFVklTSU9OO1xudmFyIFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgMzogJz09IDEuMC4wLXJjLjQnLFxuICA0OiAnPT0gMS54LngnLFxuICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gIDY6ICc+PSAyLjAuMC1iZXRhLjEnXG59O1xuZXhwb3J0cy5SRVZJU0lPTl9DSEFOR0VTID0gUkVWSVNJT05fQ0hBTkdFUztcbnZhciBpc0FycmF5ID0gVXRpbHMuaXNBcnJheSxcbiAgICBpc0Z1bmN0aW9uID0gVXRpbHMuaXNGdW5jdGlvbixcbiAgICB0b1N0cmluZyA9IFV0aWxzLnRvU3RyaW5nLFxuICAgIG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xufVxuXG5leHBvcnRzLkhhbmRsZWJhcnNFbnZpcm9ubWVudCA9IEhhbmRsZWJhcnNFbnZpcm9ubWVudDtIYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZyxcblxuICByZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICBVdGlscy5leHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHBhcnRpYWwpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgVXRpbHMuZXh0ZW5kKHRoaXMucGFydGlhbHMsICBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICB9XG59O1xuXG5mdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHVjdC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvbWVvbmUgaXMgYWN0dWFsbHkgdHJ5aW5nIHRvIGNhbGwgc29tZXRoaW5nLCBibG93IHVwLlxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk1pc3NpbmcgaGVscGVyOiAnXCIgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aC0xXS5uYW1lICsgXCInXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGZuKHRoaXMpO1xuICAgIH0gZWxzZSBpZihjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYoY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICAgIG9wdGlvbnMuaWRzID0gW29wdGlvbnMubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICBvcHRpb25zID0ge2RhdGE6IGRhdGF9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIHZhciBmbiA9IG9wdGlvbnMuZm4sIGludmVyc2UgPSBvcHRpb25zLmludmVyc2U7XG4gICAgdmFyIGkgPSAwLCByZXQgPSBcIlwiLCBkYXRhO1xuXG4gICAgdmFyIGNvbnRleHRQYXRoO1xuICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgIGNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSkgKyAnLic7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgfVxuXG4gICAgaWYoY29udGV4dCAmJiB0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGZvcih2YXIgaiA9IGNvbnRleHQubGVuZ3RoOyBpPGo7IGkrKykge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLmluZGV4ID0gaTtcbiAgICAgICAgICAgIGRhdGEuZmlyc3QgPSAoaSA9PT0gMCk7XG4gICAgICAgICAgICBkYXRhLmxhc3QgID0gKGkgPT09IChjb250ZXh0Lmxlbmd0aC0xKSk7XG5cbiAgICAgICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ldLCB7IGRhdGE6IGRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcih2YXIga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZihjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgICAgICAgZGF0YS5rZXkgPSBrZXk7XG4gICAgICAgICAgICAgIGRhdGEuaW5kZXggPSBpO1xuICAgICAgICAgICAgICBkYXRhLmZpcnN0ID0gKGkgPT09IDApO1xuXG4gICAgICAgICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGtleTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0ID0gcmV0ICsgZm4oY29udGV4dFtrZXldLCB7ZGF0YTogZGF0YX0pO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKGkgPT09IDApe1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgVXRpbHMuaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICB2YXIgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKCFVdGlscy5pc0VtcHR5KGNvbnRleHQpKSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIHZhciBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IFV0aWxzLmFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pO1xuICAgICAgICBvcHRpb25zID0ge2RhdGE6ZGF0YX07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbihtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgdmFyIGxldmVsID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsID8gcGFyc2VJbnQob3B0aW9ucy5kYXRhLmxldmVsLCAxMCkgOiAxO1xuICAgIGluc3RhbmNlLmxvZyhsZXZlbCwgbWVzc2FnZSk7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbihvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmpbZmllbGRdO1xuICB9KTtcbn1cblxudmFyIGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiB7IDA6ICdkZWJ1ZycsIDE6ICdpbmZvJywgMjogJ3dhcm4nLCAzOiAnZXJyb3InIH0sXG5cbiAgLy8gU3RhdGUgZW51bVxuICBERUJVRzogMCxcbiAgSU5GTzogMSxcbiAgV0FSTjogMixcbiAgRVJST1I6IDMsXG4gIGxldmVsOiAzLFxuXG4gIC8vIGNhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBob3N0IGVudmlyb25tZW50XG4gIGxvZzogZnVuY3Rpb24obGV2ZWwsIG1lc3NhZ2UpIHtcbiAgICBpZiAobG9nZ2VyLmxldmVsIDw9IGxldmVsKSB7XG4gICAgICB2YXIgbWV0aG9kID0gbG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGVbbWV0aG9kXSkge1xuICAgICAgICBjb25zb2xlW21ldGhvZF0uY2FsbChjb25zb2xlLCBtZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5leHBvcnRzLmxvZ2dlciA9IGxvZ2dlcjtcbnZhciBsb2cgPSBsb2dnZXIubG9nO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG52YXIgY3JlYXRlRnJhbWUgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIGZyYW1lID0gVXRpbHMuZXh0ZW5kKHt9LCBvYmplY3QpO1xuICBmcmFtZS5fcGFyZW50ID0gb2JqZWN0O1xuICByZXR1cm4gZnJhbWU7XG59O1xuZXhwb3J0cy5jcmVhdGVGcmFtZSA9IGNyZWF0ZUZyYW1lOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIHZhciBsaW5lO1xuICBpZiAobm9kZSAmJiBub2RlLmZpcnN0TGluZSkge1xuICAgIGxpbmUgPSBub2RlLmZpcnN0TGluZTtcblxuICAgIG1lc3NhZ2UgKz0gJyAtICcgKyBsaW5lICsgJzonICsgbm9kZS5maXJzdENvbHVtbjtcbiAgfVxuXG4gIHZhciB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICBpZiAobGluZSkge1xuICAgIHRoaXMubGluZU51bWJlciA9IGxpbmU7XG4gICAgdGhpcy5jb2x1bW4gPSBub2RlLmZpcnN0Q29sdW1uO1xuICB9XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFeGNlcHRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbnZhciBFeGNlcHRpb24gPSByZXF1aXJlKFwiLi9leGNlcHRpb25cIilbXCJkZWZhdWx0XCJdO1xudmFyIENPTVBJTEVSX1JFVklTSU9OID0gcmVxdWlyZShcIi4vYmFzZVwiKS5DT01QSUxFUl9SRVZJU0lPTjtcbnZhciBSRVZJU0lPTl9DSEFOR0VTID0gcmVxdWlyZShcIi4vYmFzZVwiKS5SRVZJU0lPTl9DSEFOR0VTO1xudmFyIGNyZWF0ZUZyYW1lID0gcmVxdWlyZShcIi4vYmFzZVwiKS5jcmVhdGVGcmFtZTtcblxuZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgdmFyIGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIHZhciBydW50aW1lVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKFwiK3J1bnRpbWVWZXJzaW9ucytcIikgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uIChcIitjb21waWxlclZlcnNpb25zK1wiKS5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoXCIrY29tcGlsZXJJbmZvWzFdK1wiKS5cIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMuY2hlY2tSZXZpc2lvbiA9IGNoZWNrUmV2aXNpb247Ly8gVE9ETzogUmVtb3ZlIHRoaXMgbGluZSBhbmQgYnJlYWsgdXAgY29tcGlsZVBhcnRpYWxcblxuZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTm8gZW52aXJvbm1lbnQgcGFzc2VkIHRvIHRlbXBsYXRlXCIpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIHZhciBpbnZva2VQYXJ0aWFsV3JhcHBlciA9IGZ1bmN0aW9uKHBhcnRpYWwsIGluZGVudCwgbmFtZSwgY29udGV4dCwgaGFzaCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEsIGRlcHRocykge1xuICAgIGlmIChoYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBoYXNoKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBuYW1lLCBjb250ZXh0LCBoZWxwZXJzLCBwYXJ0aWFscywgZGF0YSwgZGVwdGhzKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7IGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSwgZGVwdGhzOiBkZXB0aHMgfTtcbiAgICAgIHBhcnRpYWxzW25hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgeyBkYXRhOiBkYXRhICE9PSB1bmRlZmluZWQsIGNvbXBhdDogdGVtcGxhdGVTcGVjLmNvbXBhdCB9LCBlbnYpO1xuICAgICAgcmVzdWx0ID0gcGFydGlhbHNbbmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKGluZGVudCkge1xuICAgICAgICB2YXIgbGluZXMgPSByZXN1bHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpbmVzW2ldID0gaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGhlIHBhcnRpYWwgXCIgKyBuYW1lICsgXCIgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZVwiKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICBsb29rdXA6IGZ1bmN0aW9uKGRlcHRocywgbmFtZSkge1xuICAgICAgdmFyIGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlU3BlY1tpXTtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlcHRocykge1xuICAgICAgdmFyIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSxcbiAgICAgICAgICBmbiA9IHRoaXMuZm4oaSk7XG4gICAgICBpZiAoZGF0YSB8fCBkZXB0aHMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSBwcm9ncmFtKHRoaXMsIGksIGZuLCBkYXRhLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gcHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKGRhdGEsIGRlcHRoKSB7XG4gICAgICB3aGlsZSAoZGF0YSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICB2YXIgcmV0ID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICByZXQgPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIHZhciByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cbiAgICByZXQuX3NldHVwKG9wdGlvbnMpO1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG4gICAgICBkYXRhID0gaW5pdERhdGEoY29udGV4dCwgZGF0YSk7XG4gICAgfVxuICAgIHZhciBkZXB0aHM7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMpIHtcbiAgICAgIGRlcHRocyA9IG9wdGlvbnMuZGVwdGhzID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBbY29udGV4dF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlbXBsYXRlU3BlYy5tYWluLmNhbGwoY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBkZXB0aHMpO1xuICB9O1xuICByZXQuaXNUb3AgPSB0cnVlO1xuXG4gIHJldC5fc2V0dXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGRlcHRocykge1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydHMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtmdW5jdGlvbiBwcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlcHRocykge1xuICB2YXIgcHJvZyA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHJldHVybiBmbi5jYWxsKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgb3B0aW9ucy5kYXRhIHx8IGRhdGEsIGRlcHRocyAmJiBbY29udGV4dF0uY29uY2F0KGRlcHRocykpO1xuICB9O1xuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gZGVwdGhzID8gZGVwdGhzLmxlbmd0aCA6IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnRzLnByb2dyYW0gPSBwcm9ncmFtO2Z1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgbmFtZSwgY29udGV4dCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEsIGRlcHRocykge1xuICB2YXIgb3B0aW9ucyA9IHsgcGFydGlhbDogdHJ1ZSwgaGVscGVyczogaGVscGVycywgcGFydGlhbHM6IHBhcnRpYWxzLCBkYXRhOiBkYXRhLCBkZXB0aHM6IGRlcHRocyB9O1xuXG4gIGlmKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgZm91bmRcIik7XG4gIH0gZWxzZSBpZihwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnRzLmludm9rZVBhcnRpYWwgPSBpbnZva2VQYXJ0aWFsO2Z1bmN0aW9uIG5vb3AoKSB7IHJldHVybiBcIlwiOyB9XG5cbmV4cG9ydHMubm9vcCA9IG5vb3A7ZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcbi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFwiXCIgKyB0aGlzLnN0cmluZztcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU2FmZVN0cmluZzsiLCJcInVzZSBzdHJpY3RcIjtcbi8qanNoaW50IC1XMDA0ICovXG52YXIgU2FmZVN0cmluZyA9IHJlcXVpcmUoXCIuL3NhZmUtc3RyaW5nXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIGVzY2FwZSA9IHtcbiAgXCImXCI6IFwiJmFtcDtcIixcbiAgXCI8XCI6IFwiJmx0O1wiLFxuICBcIj5cIjogXCImZ3Q7XCIsXG4gICdcIic6IFwiJnF1b3Q7XCIsXG4gIFwiJ1wiOiBcIiYjeDI3O1wiLFxuICBcImBcIjogXCImI3g2MDtcIlxufTtcblxudmFyIGJhZENoYXJzID0gL1smPD5cIidgXS9nO1xudmFyIHBvc3NpYmxlID0gL1smPD5cIidgXS87XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gIHJldHVybiBlc2NhcGVbY2hyXTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKG9iaiAvKiAsIC4uLnNvdXJjZSAqLykge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0cy5leHRlbmQgPSBleHRlbmQ7dmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8vIFNvdXJjZWQgZnJvbSBsb2Rhc2hcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9sb2Rhc2gvYmxvYi9tYXN0ZXIvTElDRU5TRS50eHRcbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn07XG4vLyBmYWxsYmFjayBmb3Igb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmlcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoaXNGdW5jdGlvbigveC8pKSB7XG4gIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH07XG59XG52YXIgaXNGdW5jdGlvbjtcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xufTtcbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG4gIC8vIGRvbid0IGVzY2FwZSBTYWZlU3RyaW5ncywgc2luY2UgdGhleSdyZSBhbHJlYWR5IHNhZmVcbiAgaWYgKHN0cmluZyBpbnN0YW5jZW9mIFNhZmVTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZyArICcnO1xuICB9XG5cbiAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gIC8vIHRoZSByZWdleCB0ZXN0IHdpbGwgZG8gdGhpcyB0cmFuc3BhcmVudGx5IGJlaGluZCB0aGUgc2NlbmVzLCBjYXVzaW5nIGlzc3VlcyBpZlxuICAvLyBhbiBvYmplY3QncyB0byBzdHJpbmcgaGFzIGVzY2FwZWQgY2hhcmFjdGVycyBpbiBpdC5cbiAgc3RyaW5nID0gXCJcIiArIHN0cmluZztcblxuICBpZighcG9zc2libGUudGVzdChzdHJpbmcpKSB7IHJldHVybiBzdHJpbmc7IH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZXhwb3J0cy5lc2NhcGVFeHByZXNzaW9uID0gZXNjYXBlRXhwcmVzc2lvbjtmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0cy5pc0VtcHR5ID0gaXNFbXB0eTtmdW5jdGlvbiBhcHBlbmRDb250ZXh0UGF0aChjb250ZXh0UGF0aCwgaWQpIHtcbiAgcmV0dXJuIChjb250ZXh0UGF0aCA/IGNvbnRleHRQYXRoICsgJy4nIDogJycpICsgaWQ7XG59XG5cbmV4cG9ydHMuYXBwZW5kQ29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aDsiLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzL3J1bnRpbWVcIilbXCJkZWZhdWx0XCJdO1xuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuQXBwICAgICAgPSByZXF1aXJlICdhcHAnXG5CYWNrYm9uZSA9IHJlcXVpcmUgXCJiYWNrYm9uZVwiXG5cbmNsYXNzIEFwcC5Db2xsZWN0aW9ucy5BcGlDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXG4gIGFwaVVybDogJy8nXG5cbiAgdXJsOiA9PlxuICAgIEFwcC5yZXF1ZXN0KCdhcGlSb290JykgKyBfLnJlc3VsdChALCAnYXBpVXJsJylcblxuXG4gIHBhcnNlOiAocmVzcG9uc2UpID0+XG4gICAgcmVzcG9uc2UuZGF0YVxuXG5cblxuICBmZXRjaDogKG9wdGlvbnMpID0+XG5cbiAgICAjIENoZWNrIGlmIHdlIG5lZWQgdG8gcGFzcyBhbG9uZyBhbnkgZ2V0IHZhcmlhYmxlc1xuICAgIGlmIG5vdCBAZGF0YT9cbiAgICAgIGRhdGEgPSB7fVxuXG4gICAgIyBzZXQgZXh0cmEgZmllbGRzXG4gICAgaWYgbm90IF8uaXNFbXB0eShAZGF0YSlcblxuICAgICAgaWYgbm90IG9wdGlvbnM/XG4gICAgICAgIG9wdGlvbnMgPSB7fVxuXG4gICAgICBpZiBub3Qgb3B0aW9ucy5kYXRhP1xuICAgICAgICBvcHRpb25zLmRhdGEgPSB7fVxuXG4gICAgICBvcHRpb25zLmRhdGEgPSBfLmV4dGVuZCB7fSwgQGRhdGEsIG9wdGlvbnMuZGF0YVxuXG4gICAgQXBwLkNvbGxlY3Rpb25zLkFwaUNvbGxlY3Rpb24uX19zdXBlcl9fLmZldGNoLmFwcGx5IEAsIFsgb3B0aW9ucyBdXG5cblxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuQXBwICAgICAgPSByZXF1aXJlICdhcHAnXG5cbmNsYXNzIEFwcC5Db2xsZWN0aW9ucy5JbmZpbml0ZVNjcm9sbENvbGxlY3Rpb24gZXh0ZW5kcyBBcHAuQ29sbGVjdGlvbnMuQXBpQ29sbGVjdGlvblxuXG4gIG5leHRQYWdlOiAoYXJncykgPT5cblxuICAgIEBmZXRjaCBhcmdzXG5cblxuICBwYXJzZTogKHJlc3BvbnNlKSA9PlxuXG4gICAgIyBjaGVjayBpZiB0aGUgY29sbGVjdGlvbiBoYXMgYSBuZXh0IHBhZ2VcbiAgICBpZiBAZGF0YT8gYW5kIEBkYXRhLnBlclBhZ2U/IGFuZCByZXNwb25zZS5kYXRhLmxlbmd0aCA8IEBkYXRhLnBlclBhZ2VcbiAgICAgIEBoYXNOZXh0ID0gZmFsc2VcblxuICAgIHJlc3BvbnNlLmRhdGFcbiIsIid1c2Ugc3RyaWN0JztcblxuXG5BcHAgICAgICAgPSByZXF1aXJlIFwiYXBwXCJcbiQgICAgICAgICA9IHJlcXVpcmUgXCJqcXVlcnlcIlxuQmFja2JvbmUgID0gcmVxdWlyZSBcImJhY2tib25lXCJcbl8gICAgICAgICA9IHJlcXVpcmUgXCJ1bmRlcnNjb3JlXCJcblxuXG5BcHAuYWRkSW5pdGlhbGl6ZXIgLT5cblxuICAjIHNldCBiYWNrYm9uZSBnbG9iYWwgb3B0aW9uc1xuICBCYWNrYm9uZS5lbXVsYXRlSlNPTiA9IHRydWVcbiAgQmFja2JvbmUuZW11bGF0ZUhUVFAgPSB0cnVlXG5cbiAgdHJpbUNoYXIgPSAoc3RyLCBjaGFyKSAtPlxuXG4gICAgaWYgc3RyLmNoYXJBdCgwKSBpcyBjaGFyXG4gICAgICBzdHIgPSBzdHIuc3Vic3RyIDFcblxuICAgIGlmIHN0ci5jaGFyQXQoIHN0ci5sZW5ndGggLSAxICkgaXMgY2hhclxuICAgICAgc3RyID0gc3RyLnN1YnN0ciAwLCBzdHIubGVuZ3RoIC0gMVxuXG4gICAgc3RyXG5cblxuICBub3JtYWxpemVSZXF1ZXN0ID0gKHVybCkgLT5cblxuICAgICMgZ2V0IHRoZSBBUEkgcmVxdWVzdCBwYXRoIGZyb20gdGhlIFVSTFxuICAgIGFwaVJvb3QgPSBBcHAucmVxdWVzdCAnYXBpUm9vdCdcbiAgICBpZiB1cmwuaW5kZXhPZihhcGlSb290KSA+PSAwXG4gICAgICB1cmxQYXJ0cyA9IHVybC5zcGxpdCBhcGlSb290XG4gICAgICB1cmwgPSB1cmxQYXJ0c1sxXVxuXG4gICAgIyB0cmltIHNsYXNoZXNcbiAgICB1cmwgPSB0cmltQ2hhciB1cmwsICcvJ1xuXG4gICAgdXJsXG5cblxuICByZWFkRG9tID0gKG9wdGlvbnMpIC0+XG5cbiAgICAjIGNoZWNrIERPTSFcbiAgICBpZiBvcHRpb25zLnR5cGUgaXMgJ0dFVCdcblxuICAgICAgIyBnZXQgQVBJIHJlcXVlc3QgZnJvbSB1cmxcbiAgICAgIHJlcXVlc3QgPSBub3JtYWxpemVSZXF1ZXN0IG9wdGlvbnMudXJsXG4gICAgICByZXF1ZXN0SURRdWVyeSA9ICcnXG5cbiAgICAgIGlmIG9wdGlvbnMuZGF0YT8gYW5kIG9wdGlvbnMuZGF0YS5yZXF1ZXN0SUQ/IGFuZCBvcHRpb25zLmRhdGEucmVxdWVzdElEIGlzbnQgJydcbiAgICAgICAgcmVxdWVzdElEUXVlcnkgPSAnW2RhdGEtaWQ9XCInICsgb3B0aW9ucy5kYXRhLnJlcXVlc3RJRCArICdcIl0nXG5cblxuICAgICAgJGRhdGFFbGVtZW50ID0gJCgnLmJ3YXBpLWNhbGwtZGF0YVtkYXRhLXR5cGU9XCJnZXRcIl0nICsgcmVxdWVzdElEUXVlcnkgKyAnW2RhdGEtcmVxdWVzdD1cIicgKyByZXF1ZXN0ICsgJ1wiXTpub3QoLmxvYWRlZCknKVxuXG4gICAgICBpZiAkZGF0YUVsZW1lbnQubGVuZ3RoID4gMFxuXG4gICAgICAgICMgYWRkIGxvYWRlZCBjbGFzc1xuICAgICAgICAkZGF0YUVsZW1lbnQuYWRkQ2xhc3MoJ2xvYWRlZCcpXG5cblxuICAgICAgICAjIHRyeSB0byBsb29rIGZvciBtb2RlbCBkYXRhIG9uIGRvbS5cbiAgICAgICAgZGF0YSA9IEFwcC5IZWxwZXJzLmRhdGEuZ2V0RWxlbWVudERhdGEoICRkYXRhRWxlbWVudCApXG5cbiAgICAgICAgaWYgZGF0YT8gYW5kIGRhdGEgaXNudCAnJyBhbmQgbm90IF8uaXNFbXB0eShkYXRhKVxuXG4gICAgICAgICAgIyBjb25zb2xlLmxvZyAnVXNpbmcgRE9NISEhJywgcmVxdWVzdFxuXG4gICAgICAgICAgIyBjaGVjayBpZiB3ZSBoYXZlIHRoZSBvcHRpb25zIGhhc2hcbiAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiBub3Qgb3B0aW9ucz9cblxuICAgICAgICAgICMgY2FsbCBjYWxsYmFjayBmdW5jdGlvbnMsIGlmIGRlZmluZWRcbiAgICAgICAgICBpZiBkYXRhLm1ldGEuY29kZSBpcyAyMDBcblxuICAgICAgICAgICAgIyBjYWxsIFNVQ0NFU1MgY2FsbGJhY2tcbiAgICAgICAgICAgIGlmIHR5cGVvZiBvcHRpb25zLnN1Y2Nlc3MgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MuYXBwbHkgQCwgW2RhdGFdXG5cbiAgICAgICAgICBlbHNlXG5cbiAgICAgICAgICAgICMgY2FsbCBFUlJPUiBjYWxsYmFja1xuICAgICAgICAgICAgaWYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICBvcHRpb25zLmVycm9yLmFwcGx5IEAsIFtkYXRhXVxuXG4gICAgICAgICAgIyBjYWxsIENPTVBMRVRFIGNhbGxiYWNrXG4gICAgICAgICAgaWYgdHlwZW9mIG9wdGlvbnMuY29tcGxldGUgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZS5hcHBseSBALCBbZGF0YV1cblxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcblxuXG5cblxuXG4gIGFqYXhJbW1lZGlhdGUgPSAob3B0aW9ucykgLT5cblxuICAgICMgQ2hlY2sgaWYgd2UgY2FuIGNhbGwgdGhyb3VnaCB0aGUgV2ViU29ja2V0IGFwaVxuICAgIGNvbm5lY3RlZCA9IEFwcC5hcGlTb2NrZXQuZ2V0ICdjb25uZWN0ZWQnIGlmIEFwcC5hcGlTb2NrZXQ/XG4gICAgaWYgY29ubmVjdGVkPyBhbmQgY29ubmVjdGVkXG5cbiAgICAgICMgY29uc29sZS5sb2cgJ1VzaW5nIFdlYlNvY2tldHMhISEnXG4gICAgICB4aHIgPSBBcHAuYXBpU29ja2V0LmNhbGwgb3B0aW9ucy50eXBlLCBvcHRpb25zLnVybCwgb3B0aW9ucy5kYXRhLCBvcHRpb25zXG5cbiAgICBlbHNlXG5cbiAgICAgICMgY29uc29sZS5sb2cgJ1VzaW5nIEFKQVghISEnXG4gICAgICB4aHIgPSBhamF4QmFja3VwIG9wdGlvbnNcblxuICAgIHhoclxuXG5cblxuICBhcGlDYWxsU3RhY2sgPSBbXVxuXG4gIGFqYXhEZWJvdW5jZVdyYXBwZXIgPSAoZnVuYykgLT5cblxuICAgICMgY29uc29sZS5sb2cgJ2FqYXhEZWJvdW5jZVdyYXBwZXInLCBhcGlDYWxsU3RhY2tcblxuICAgICMgY2hlY2sgaWYgd2UgaGF2ZSBhbnkgY2FsbHMgaW4gdGhlIHN0YWNrXG4gICAgcmV0dXJuIGlmIGFwaUNhbGxTdGFjay5sZW5ndGggPT0gMFxuXG4gICAgIyBjb25zb2xlLmxvZyAnU2VuZGluZyBiYXRjaCByZXF1ZXN0IGZvciAnICsgYXBpQ2FsbFN0YWNrLmxlbmd0aCArICcgQVBJIGNhbGxzJ1xuXG4gICAgIyBnZXQgY29udGVudCB0eXBlIGZyb20gZmlyc3QgY2FsbCBpbiBzdGFja1xuICAgIGNvbnRlbnRUeXBlID0gYXBpQ2FsbFN0YWNrWzBdLmNvbnRlbnRUeXBlXG4gICAgZGF0YVR5cGUgPSBcImpzb25cIlxuICAgIHR5cGUgPSBcIlBPU1RcIlxuICAgIGFwaVJvb3QgPSBBcHAucmVxdWVzdCAnYXBpUm9vdCdcbiAgICB1cmwgPSBhcGlSb290ICsgXCIxL3NpdGUvYmF0Y2gvXCJcblxuXG4gICAgZGF0YSA9IHt9XG4gICAgYXBpQ2FsbE9wdGlvbnMgPSB7fVxuXG4gICAgIyBidWlsZCAnc3VjY2VzcycsICdjb21wbGV0ZScgYW5kICdlcnJvcicgY2FsbGJhY2tzXG4gICAgZm9yIGFwaUNhbGwsIGFwaUNhbGxJbmRleCBpbiBhcGlDYWxsU3RhY2tcblxuICAgICAgcmVxdWVzdCA9IG5vcm1hbGl6ZVJlcXVlc3QgYXBpQ2FsbC51cmxcblxuICAgICAgaWYgYXBpQ2FsbC5kYXRhP1xuICAgICAgICBhcGlDYWxsRGF0YSA9IGFwaUNhbGwuZGF0YVxuICAgICAgZWxzZVxuICAgICAgICBhcGlDYWxsRGF0YSA9ICcnXG5cbiAgICAgIHJlcXVlc3RJRCA9IGFwaUNhbGxJbmRleCArICc6JyArIGFwaUNhbGwudHlwZSArICc6JyArIHJlcXVlc3RcblxuICAgICAgZGF0YVsgcmVxdWVzdElEIF0gPVxuICAgICAgICB1cmw6IHJlcXVlc3RcbiAgICAgICAgdHlwZTogYXBpQ2FsbC50eXBlXG4gICAgICAgIGRhdGE6IGFwaUNhbGxEYXRhXG5cbiAgICAgIGFwaUNhbGxPcHRpb25zWyByZXF1ZXN0SUQgXSA9IGFwaUNhbGxcblxuXG4gICAgc3VjY2VzcyA9IChiYXRjaFJlc3BvbnNlLCBiYXRjaFJlc3BvbnNlVGV4dCwgYmF0Y2hYSFIpIC0+XG4gICAgICAjIGNvbnNvbGUubG9nICdiYXRjaCBzdWNjZXNzJywgYmF0Y2hSZXNwb25zZVxuXG4gICAgICAjICMgY2hlY2sgZm9yIGVycm9yIHJlc3BvbnNlXG4gICAgICAjIGlmIGJhdGNoUmVzcG9uc2UucmVzdWx0PyBhbmQgYmF0Y2hSZXNwb25zZS5yZXN1bHQgaXNudCAnc3VjY2VzcycgYW5kIGJhdGNoUmVzcG9uc2UucmVzdWx0IGlzbnQgJ2Fib3J0J1xuXG4gICAgICAjICAgIyB0cmlnZ2VyIGFwcCBldmVudFxuICAgICAgIyAgIEFwcC52ZW50LnRyaWdnZXIgJ2FqYXg6ZXJyb3InLCBiYXRjaFJlc3BvbnNlLCBiYXRjaFJlc3BvbnNlVGV4dCwgYmF0Y2hYSFJcblxuICAgICAgIyAgIHJldHVyblxuXG5cbiAgICAgICMgY2hlY2sgZWFjaCByZXNwb25zZSBhbmQgY2FsbCBwcm9wZXIgY2FsbGJhY2sgKCdzdWNjZXNzJyBvciAnZXJyb3InKVxuICAgICAgcmVzcG9uc2VzID0gYmF0Y2hSZXNwb25zZS5kYXRhXG5cbiAgICAgIGlmIG5vdCByZXNwb25zZXM/XG4gICAgICAgIHJlc3BvbnNlcyA9IHt9XG5cbiAgICAgICMgc2F2ZSBiYXRjaCBjYWxsYmFja3MgaW4gYW4gYXJyYXlcbiAgICAgIGJhdGNoQ2FsbGJhY2tzID0gW11cblxuICAgICAgZm9yIHJlcXVlc3RJRCwgYXBpQ2FsbCBvZiBhcGlDYWxsT3B0aW9uc1xuICAgICAgICAjIGNvbnNvbGUubG9nIHJlcXVlc3RJRCwgYXBpQ2FsbFxuICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlc1sgcmVxdWVzdElEIF1cblxuICAgICAgICBpZiBub3QgcmVzcG9uc2U/XG4gICAgICAgICAgcmVzcG9uc2UgPSB7fVxuXG4gICAgICAgIHJlc3BvbnNlUmVzdWx0ID0gJ2Vycm9yJ1xuICAgICAgICBpZiByZXNwb25zZS5zdGF0dXM/IGFuZCByZXNwb25zZS5zdGF0dXMgaXMgJ3N1Y2Nlc3MnXG4gICAgICAgICAgcmVzcG9uc2VSZXN1bHQgPSAnc3VjY2VzcydcblxuICAgICAgICBjYWxsYmFjayA9IGFwaUNhbGxbIHJlc3BvbnNlUmVzdWx0IF1cbiAgICAgICAgY29udGV4dCA9IGFwaUNhbGwuY29udGV4dFxuXG4gICAgICAgIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkgY29udGV4dCwgWyByZXNwb25zZSBdXG5cbiAgICAgICAgIyBiYXRjaCBjYWxsYmFja1xuICAgICAgICBiYXRjaENhbGxiYWNrID0gYXBpQ2FsbFsgJ2JhdGNoU3VjY2VzcycgXVxuXG4gICAgICAgIGlmIHR5cGVvZiBiYXRjaENhbGxiYWNrIGlzICdmdW5jdGlvbidcbiAgICAgICAgICBiYXRjaENhbGxiYWNrcy5wdXNoXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgICAgICBjYWxsYmFjazogYXBpQ2FsbFsgJ2JhdGNoU3VjY2VzcycgXVxuXG5cbiAgICAgIGZvciBiYXRjaENhbGxiYWNrIGluIGJhdGNoQ2FsbGJhY2tzXG4gICAgICAgIGJhdGNoQ2FsbGJhY2suY2FsbGJhY2suYXBwbHkgYmF0Y2hDYWxsYmFjay5jb250ZXh0LCBbIGJhdGNoUmVzcG9uc2UgXVxuXG5cbiAgICBjb21wbGV0ZSA9IC0+XG4gICAgICAjIGNvbnNvbGUubG9nICdjb21wbGV0ZScsIGFyZ3VtZW50c1xuXG4gICAgICAjIHNhdmUgYmF0Y2ggY2FsbGJhY2tzIGluIGFuIGFycmF5XG4gICAgICBiYXRjaENhbGxiYWNrcyA9IFtdXG5cbiAgICAgICMgZmlyZSAnY29tcGxldGUnIGNhbGxiYWNrIGZvciBhbGwgcmVxdWVzdHMgaW4gYmF0Y2hcbiAgICAgIGZvciByZXF1ZXN0SUQsIGFwaUNhbGwgb2YgYXBpQ2FsbE9wdGlvbnNcblxuICAgICAgICBjYWxsYmFjayA9IGFwaUNhbGxbICdjb21wbGV0ZScgXVxuICAgICAgICBjb250ZXh0ID0gYXBpQ2FsbC5jb250ZXh0XG5cbiAgICAgICAgaWYgdHlwZW9mIGNhbGxiYWNrIGlzICdmdW5jdGlvbidcbiAgICAgICAgICBjYWxsYmFjay5hcHBseSBjb250ZXh0LCBhcmd1bWVudHNcblxuICAgICAgICAjIGJhdGNoIGNhbGxiYWNrXG4gICAgICAgIGJhdGNoQ2FsbGJhY2sgPSBhcGlDYWxsWyAnYmF0Y2hDb21wbGV0ZScgXVxuXG4gICAgICAgIGlmIHR5cGVvZiBiYXRjaENhbGxiYWNrIGlzICdmdW5jdGlvbidcbiAgICAgICAgICBiYXRjaENhbGxiYWNrcy5wdXNoXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgICAgICBjYWxsYmFjazogYXBpQ2FsbFsgJ2JhdGNoQ29tcGxldGUnIF1cblxuXG5cbiAgICAgIGZvciBiYXRjaENhbGxiYWNrIGluIGJhdGNoQ2FsbGJhY2tzXG4gICAgICAgIGJhdGNoQ2FsbGJhY2suY2FsbGJhY2suYXBwbHkgYmF0Y2hDYWxsYmFjay5jb250ZXh0LCBhcmd1bWVudHNcblxuXG4gICAgZXJyb3IgPSAtPlxuICAgICAgIyBjb25zb2xlLmxvZyAnZXJyb3InLCBhcmd1bWVudHNcblxuICAgICAgIyBzYXZlIGJhdGNoIGNhbGxiYWNrcyBpbiBhbiBhcnJheVxuICAgICAgYmF0Y2hDYWxsYmFja3MgPSBbXVxuXG4gICAgICAjIGZpcmUgJ2Vycm9yJyBjYWxsYmFjayBmb3IgYWxsIHJlcXVlc3RzIGluIGJhdGNoXG4gICAgICBmb3IgcmVxdWVzdElELCBhcGlDYWxsIG9mIGFwaUNhbGxPcHRpb25zXG5cbiAgICAgICAgY2FsbGJhY2sgPSBhcGlDYWxsWyAnZXJyb3InIF1cbiAgICAgICAgY29udGV4dCA9IGFwaUNhbGwuY29udGV4dFxuXG4gICAgICAgIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkgY29udGV4dCwgYXJndW1lbnRzXG5cbiAgICAgICAgIyBiYXRjaCBjYWxsYmFja1xuICAgICAgICBiYXRjaENhbGxiYWNrID0gYXBpQ2FsbFsgJ2JhdGNoRXJyb3InIF1cblxuICAgICAgICBpZiB0eXBlb2YgYmF0Y2hDYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgYmF0Y2hDYWxsYmFja3MucHVzaFxuICAgICAgICAgICAgY29udGV4dDogY29udGV4dFxuICAgICAgICAgICAgY2FsbGJhY2s6IGFwaUNhbGxbICdiYXRjaEVycm9yJyBdXG5cblxuICAgICAgZm9yIGJhdGNoQ2FsbGJhY2sgaW4gYmF0Y2hDYWxsYmFja3NcbiAgICAgICAgYmF0Y2hDYWxsYmFjay5jYWxsYmFjay5hcHBseSBiYXRjaENhbGxiYWNrLmNvbnRleHQsIGFyZ3VtZW50c1xuXG5cbiAgICAjIGJ1aWxkIG5ldyBvcHRpb25zIGZvciBiYXRjaCBjYWxsXG4gICAgb3B0aW9ucyA9XG4gICAgICBlcnJvcjogZXJyb3JcbiAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3NcbiAgICAgIGNvbXBsZXRlOiBjb21wbGV0ZVxuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlXG4gICAgICBkYXRhVHlwZTogZGF0YVR5cGVcbiAgICAgIHR5cGU6IHR5cGVcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG5cblxuICAgIGZ1bmMgb3B0aW9uc1xuXG4gICAgIyByZXNldCBjYWxsIHN0YWNrXG4gICAgYXBpQ2FsbFN0YWNrID0gW11cblxuXG5cbiAgYWpheERlYm91bmNlQ2FsbGJhY2sgPSBfLndyYXAgYWpheEltbWVkaWF0ZSwgYWpheERlYm91bmNlV3JhcHBlclxuICBhamF4RGVib3VuY2UgPSBfLmRlYm91bmNlIGFqYXhEZWJvdW5jZUNhbGxiYWNrLCA0MFxuXG5cblxuICAjIyNcbiAgYmFja3VwIEJhY2tib25lIEFKQVggZnVuY3Rpb25cbiAgIyMjXG4gIGFqYXhCYWNrdXAgPSBCYWNrYm9uZS5hamF4XG5cbiAgIyMjXG4gIG92ZXJyaWRlIEJhY2tib25lIEFqYXhcbiAgIyMjXG4gIEJhY2tib25lLmFqYXggPSAob3B0aW9ucykgLT5cblxuXG4gICAgIyMjXG4gICAgQ2hlY2sgaWYgY2FsbCBjYW4gYmUgZmV0Y2hlZCBmcm9tIERPTVxuICAgICMjI1xuICAgIHJlc3VsdCA9IHJlYWREb20gb3B0aW9uc1xuICAgIGlmIHJlc3VsdCBpcyB0cnVlXG4gICAgICByZXR1cm4gcmVzdWx0XG5cblxuICAgICMgc2V0IGNvbnRleHQgYmFzZWQgb24gb3B0aW9uXG4gICAgaWYgbm90IG9wdGlvbnMuY29udGV4dD9cbiAgICAgIG9wdGlvbnMuY29udGV4dCA9IEBcblxuXG4gICAgaWYgb3B0aW9ucy5iYXRjaD8gYW5kIG9wdGlvbnMuYmF0Y2ggaXMgdHJ1ZVxuXG4gICAgICAjIEFkZCB0byBkZWJvdW5jZWQgYmF0Y2ggY2FsbFxuICAgICAgYXBpQ2FsbFN0YWNrLnB1c2ggb3B0aW9uc1xuICAgICAgYWpheERlYm91bmNlLmFwcGx5IEBcblxuICAgIGVsc2VcblxuICAgICAgIyBDYWxsIGFqYXggaW1tZWRpYXRlbHkgaWYgXCJpbW1lZGlhdGVcIiBpcyBzZXQgdG8gdHJ1ZVxuICAgICAgYWpheEltbWVkaWF0ZS5hcHBseSBALCBbb3B0aW9uc11cblxuXG5cbiIsIlwidXNlIHN0cmljdFwiXG5cbkFwcCAgICAgID0gcmVxdWlyZSAnYXBwJ1xuQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcblxuY2xhc3MgQXBwLkNvbnRyb2xsZXJzLkFwcENvbnRyb2xsZXIgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbnRyb2xsZXJcblxuICBnZXRBcGlSb290OiAtPlxuXG4gICAgd3BSb290ID0gJy8nXG4gICAgYXBpUm9vdCA9ICc/YndhcGk9LydcblxuICAgIGlmIEFwcC5TU09wdGlvbnM/XG4gICAgICB3cFJvb3QgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAnd3BSb290J1xuXG4gICAgd3BSb290ICsgYXBpUm9vdFxuXG5cbiAgaXNFdmVuOiAobikgLT5cbiAgICBuICUgMiBpcyAwXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5cbl8gICAgICAgICA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxuQmFja2JvbmUgID0gcmVxdWlyZSgnYmFja2JvbmUnKVxuJCAgICAgICAgID0gcmVxdWlyZSgnanF1ZXJ5Jylcbk1vZGVybml6ciA9IHJlcXVpcmUoXCJtb2Rlcm5penJcIilcblxuXG5cbmNsYXNzIEJyb3dzZXJTdXBwb3J0SGVscGVyIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICBjaGVja0ZvcklFOiAoKSAtPlxuXG4gICAgaWYgKCBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTVNJRSA3LlwiKSA+IDAgKSBvciAoIG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJNU0lFIDguXCIpID4gMCApIG9yICggbmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1TSUUgOS5cIikgPiAwIClcbiAgICAgICMgY29uc29sZS5sb2cgJ2ZvdW5kIElFOSdcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZWxzZVxuICAgICAgIyBjb25zb2xlLmxvZyAnbm90IElFJ1xuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgaWVBamF4U3VwcG9ydDogKCkgLT5cblxuICAgIGlmICggQGNoZWNrRm9ySUUoKSApXG5cbiAgICAgIGlmIHdpbmRvdy5YRG9tYWluUmVxdWVzdFxuICAgICAgICAkLmFqYXhUcmFuc3BvcnQgKHMpIC0+XG4gICAgICAgICAgaWYgcy5jcm9zc0RvbWFpbiBhbmQgcy5hc3luY1xuICAgICAgICAgICAgaWYgcy50aW1lb3V0XG4gICAgICAgICAgICAgIHMueGRyVGltZW91dCA9IHMudGltZW91dFxuICAgICAgICAgICAgICBkZWxldGUgcy50aW1lb3V0XG4gICAgICAgICAgICB4ZHIgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHNlbmQ6IChfLCBjb21wbGV0ZSkgLT5cbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSAoc3RhdHVzLCBzdGF0dXNUZXh0LCByZXNwb25zZXMsIHJlc3BvbnNlSGVhZGVycykgLT5cbiAgICAgICAgICAgICAgICB4ZHIub25sb2FkID0geGRyLm9uZXJyb3IgPSB4ZHIub250aW1lb3V0ID0galF1ZXJ5Lm5vb3BcbiAgICAgICAgICAgICAgICB4ZHIgPSBgdW5kZWZpbmVkYFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlIHN0YXR1cywgc3RhdHVzVGV4dCwgcmVzcG9uc2VzLCByZXNwb25zZUhlYWRlcnNcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgeGRyID0gbmV3IFhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgICAgICAgeGRyLm9ubG9hZCA9IC0+XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgMjAwLCBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiB4ZHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgLCBcIkNvbnRlbnQtVHlwZTogXCIgKyB4ZHIuY29udGVudFR5cGVcbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgICB4ZHIub25lcnJvciA9IC0+XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgNDA0LCBcIk5vdCBGb3VuZFwiXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgICAgeGRyLm9ucHJvZ3Jlc3MgPSBqUXVlcnkubm9vcFxuICAgICAgICAgICAgICB4ZHIub250aW1lb3V0ID0gLT5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayAwLCBcInRpbWVvdXRcIlxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICAgIHhkci50aW1lb3V0ID0gcy54ZHJUaW1lb3V0IG9yIE51bWJlci5NQVhfVkFMVUVcbiAgICAgICAgICAgICAgeGRyLm9wZW4gcy50eXBlLCBzLnVybFxuICAgICAgICAgICAgICB4ZHIuc2VuZCAocy5oYXNDb250ZW50IGFuZCBzLmRhdGEpIG9yIG51bGxcbiAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIGFib3J0OiAtPlxuICAgICAgICAgICAgICBpZiB4ZHJcbiAgICAgICAgICAgICAgICB4ZHIub25lcnJvciA9IGpRdWVyeS5ub29wXG4gICAgICAgICAgICAgICAgeGRyLmFib3J0KClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBcImFib3J0ZWRcIlxuICAgICAgICAgICAgICByZXR1cm5cblxuXG5cbiMjI1xuSW5zdGFudGlhdGUgaGVscGVyXG4jIyNcbm1vZHVsZS5leHBvcnRzID0gbmV3IEJyb3dzZXJTdXBwb3J0SGVscGVyXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5fICAgICAgICAgPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcbkJhY2tib25lICA9IHJlcXVpcmUoJ2JhY2tib25lJylcbiQgICAgICAgICA9IHJlcXVpcmUoJ2pxdWVyeScpXG5Nb2Rlcm5penIgPSByZXF1aXJlKFwibW9kZXJuaXpyXCIpXG5KU09OICAgICAgPSByZXF1aXJlKFwianNvbjNcIilcblxuXG5jbGFzcyBEYXRhSGVscGVyIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuXHQjIyNcblx0R2V0IGRhdGEgZnJvbSBlbGVtZW50IG9uIERPTS5cblxuXHRAYXV0aG9yIEFsZXNzYW5kcm8gQmlhdmF0aSA8QGFsZWJpYXZhdGk+XG5cdEBwYWNrYWdlIGRhdGEuY29mZmVlXG5cdEBzaW5jZSAxLjBcblx0QHBhcmFtIChqUXVlcnkvc3RyaW5nKSBlbFxuXHRAcmV0dXJuIChPYmplY3QpIGRhdGFcblx0IyMjXG5cblx0Z2V0RWxlbWVudERhdGE6ICggZWwsIGZvcm1hdCApIC0+XG5cblx0XHQjIGdldCBqUXVlcnkgZWxlbWVudFxuXHRcdGlmIHR5cGVvZiBlbCA9PSAnc3RyaW5nJ1xuXHRcdFx0ZWwgPSAkKCBlbCApXG5cblx0XHQjIGNoZWNrIGlmIGVsIHdhcyBmb3VuZFxuXHRcdGlmIG5vdCBlbCBpbnN0YW5jZW9mICQgb3IgZWwubGVuZ3RoID09IDBcblx0XHRcdHJldHVyblxuXG5cblx0XHQjIGluaXRpYWxpemUgZGF0YSB0byBlbXB0eSBvYmpcblx0XHRkYXRhID0ge31cblxuXHRcdCMgZ2V0IGRhdGFcblx0XHRpZiBlbC5pcyggJ3NjcmlwdCcgKSBvciAoIGZvcm1hdD8gYW5kIGZvcm1hdCBpcyAnanNvbicgKVxuXG5cdFx0XHRkYXRhID0gSlNPTi5wYXJzZSBlbC5odG1sKClcblxuXHRcdGVsc2VcblxuXHRcdFx0ZGF0YSA9IGVsLmRhdGEoKTtcblxuXHRcdGRhdGFcblxuXHQjIGdldEVsZW1lbnREYXRhKClcblxuXG4jIyNcbkluc3RhbnRpYXRlIGhlbHBlclxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBEYXRhSGVscGVyXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5CYWNrYm9uZSAgPSByZXF1aXJlKCdiYWNrYm9uZScpXG5cblxuY2xhc3MgRGF0ZUhlbHBlciBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cbiAgZ2V0RGF0ZXRpbWU6IChzZXJ2ZXJfZ210X29mZnNldCkgPT5cblxuICAgIHNlcnZlcl90aW1lID0gQGdldFRpbWUoc2VydmVyX2dtdF9vZmZzZXQpXG4gICAgc2VydmVyX2RhdGV0aW1lID0gbmV3IERhdGUoIHNlcnZlcl90aW1lIClcbiAgICBzZXJ2ZXJfZGF0ZXRpbWVcblxuXG4gIGdldFRpbWU6IChvZmZzZXQpIC0+XG5cbiAgICAjIGNyZWF0ZSBEYXRlIG9iamVjdCBmb3IgY3VycmVudCBsb2NhdGlvblxuICAgIGQgPSBuZXcgRGF0ZSgpXG5cbiAgICAjIGNvbnZlcnQgdG8gbXNlY1xuICAgICMgYWRkIGxvY2FsIHRpbWUgem9uZSBvZmZzZXRcbiAgICAjIGdldCBVVEMgdGltZSBpbiBtc2VjXG4gICAgdXRjID0gZC5nZXRUaW1lKCkgKyAoZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApXG5cbiAgICAjIGNyZWF0ZSBuZXcgRGF0ZSBvYmplY3QgZm9yIGRpZmZlcmVudCBjaXR5XG4gICAgIyB1c2luZyBzdXBwbGllZCBvZmZzZXRcbiAgICBuZCA9IG5ldyBEYXRlKHV0YyArICgzNjAwMDAwKm9mZnNldCkpO1xuXG4gICAgc2VydmVyX3RpbWUgPSBNYXRoLnJvdW5kKG5kLmdldFRpbWUoKSAvIDEwMDApXG5cbiAgICBzZXJ2ZXJfdGltZVxuXG5cbiAgcGFyc2VUaW1lc3RhbXAgOiAodGltZXN0YW1wKSAtPlxuXG4gICAgc2VjcyA9ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMTAwMCkgLSB0aW1lc3RhbXBcbiAgICBNYXRoLmZsb29yIHNlY3NcbiAgICBtaW51dGVzID0gc2VjcyAvIDYwXG4gICAgc2VjcyA9IE1hdGguZmxvb3Ioc2VjcyAlIDYwKVxuICAgIHJldHVybiBzZWNzICsgKChpZiBzZWNzID4gMSB0aGVuIFwiIHNlY29uZHMgYWdvXCIgZWxzZSBcIiBzZWNvbmQgYWdvXCIpKSAgaWYgbWludXRlcyA8IDFcbiAgICBob3VycyA9IG1pbnV0ZXMgLyA2MFxuICAgIG1pbnV0ZXMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgJSA2MClcbiAgICByZXR1cm4gbWludXRlcyArICgoaWYgbWludXRlcyA+IDEgdGhlbiBcIiBtaW51dGVzIGFnb1wiIGVsc2UgXCIgbWludXRlIGFnb1wiKSkgIGlmIGhvdXJzIDwgMVxuICAgIGRheXMgPSBob3VycyAvIDI0XG4gICAgaG91cnMgPSBNYXRoLmZsb29yKGhvdXJzICUgMjQpXG4gICAgcmV0dXJuIGhvdXJzICsgKChpZiBob3VycyA+IDEgdGhlbiBcIiBob3VycyBhZ29cIiBlbHNlIFwiIGhvdXIgYWdvXCIpKSAgaWYgZGF5cyA8IDFcbiAgICB3ZWVrcyA9IGRheXMgLyA3XG4gICAgZGF5cyA9IE1hdGguZmxvb3IoZGF5cyAlIDcpXG4gICAgcmV0dXJuIGRheXMgKyAoKGlmIGRheXMgPiAxIHRoZW4gXCIgZGF5cyBhZ29cIiBlbHNlIFwiIGRheSBhZ29cIikpICBpZiB3ZWVrcyA8IDFcbiAgICBtb250aHMgPSB3ZWVrcyAvIDQuMzVcbiAgICB3ZWVrcyA9IE1hdGguZmxvb3Iod2Vla3MgJSA0LjM1KVxuICAgIHJldHVybiB3ZWVrcyArICgoaWYgd2Vla3MgPiAxIHRoZW4gXCIgd2Vla3MgYWdvXCIgZWxzZSBcIiB3ZWVrIGFnb1wiKSkgIGlmIG1vbnRocyA8IDFcbiAgICB5ZWFycyA9IG1vbnRocyAvIDEyXG4gICAgbW9udGhzID0gTWF0aC5mbG9vcihtb250aHMgJSAxMilcbiAgICByZXR1cm4gbW9udGhzICsgKChpZiBtb250aHMgPiAxIHRoZW4gXCIgbW9udGhzIGFnb1wiIGVsc2UgXCIgbW9udGggYWdvXCIpKSAgaWYgeWVhcnMgPCAxXG4gICAgeWVhcnMgPSBNYXRoLmZsb29yKHllYXJzKVxuICAgIHllYXJzICsgKChpZiB5ZWFycyA+IDEgdGhlbiBcIiB5ZWFycyBhZ29cIiBlbHNlIFwiIHllYXJzIGFnb1wiKSlcblxuXG5cbiMjI1xuSW5zdGFudGlhdGUgaGVscGVyXG4jIyNcbm1vZHVsZS5leHBvcnRzID0gbmV3IERhdGVIZWxwZXJcblxuXG5cbiIsIlwidXNlIHN0cmljdFwiXG5cbl8gICAgICAgICA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxuQmFja2JvbmUgID0gcmVxdWlyZSgnYmFja2JvbmUnKVxuJCAgICAgICAgID0gcmVxdWlyZSgnanF1ZXJ5Jylcbk1vZGVybml6ciA9IHJlcXVpcmUoXCJtb2Rlcm5penJcIilcblxuXG5jbGFzcyBFbnZIZWxwZXIgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gICAgZGVmYXVsdHM6XG5cbiAgICAgICAgcmVzaXplRXZlbnQ6ICAgICAgICAgIFwicmVzaXplXCJcbiAgICAgICAgc2Nyb2xsVG9wOiAgICAgICAgICAgIDBcbiAgICAgICAgb3JpZW50YXRpb246ICAgICAgICAgIG51bGxcbiAgICAgICAgY2VudGVyOiAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaGVpZ2h0RnVsbDogICAgICAgICAgIG51bGxcbiAgICAgICAgaGVpZ2h0UmF3OiAgICAgICAgICAgIG51bGxcbiAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgd2lkdGg6ICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgc2FmYXJpOiAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaXNNb2JpbGU6ICAgICAgICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlSXBob25lOiAgICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlSXBhZDogICAgICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlSW9zOiAgICAgICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlQW5kcm9pZDogICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlQW5kcm9pZFZlcnNpb246IG51bGxcbiAgICAgICAgbW9iaWxlUmF3c2NyZWVuOiAgICAgIG51bGxcbiAgICAgICAgaW9zOiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zMTogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zMjogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zMl80OiAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zMzogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNDogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNTogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNV91cDogICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNjogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNl91cDogICAgICAgICAgICAgIG51bGxcblxuXG4gICAgc3RhcnQ6ID0+XG4gICAgICAgIEB1cGRhdGVFbnYoKVxuXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICAgICMgXy5iaW5kQWxsIEBcblxuICAgICAgICAjIGRldGVjdCB1c2VyIGFnZW50XG4gICAgICAgIEB1c2VyQWdlbnREZXRlY3RzKClcblxuICAgICAgICBpZiBAZ2V0KFwiaXNfbW9iaWxlXCIpIG9yIEBnZXQoXCJpc190YWJsZXRcIilcbiAgICAgICAgICAgICQod2luZG93KS5vbiBAZ2V0KFwicmVzaXplRXZlbnRcIiksIF8uZGVib3VuY2UoQHVwZGF0ZUVudiwgMzAwKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAkKHdpbmRvdykub24gQGdldChcInJlc2l6ZUV2ZW50XCIpLCBfLnRocm90dGxlKEB1cGRhdGVFbnYsIDEwMCwge2xlYWRpbmc6IGZhbHNlfSlcblxuICAgICAgICAjIGRldGVjdCBzY3JvbGxcbiAgICAgICAgaWYgXCJtb3VzZXdoZWVsXCIgb2Ygd2luZG93XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbiBcIm1vdXNld2hlZWxcIiwgQHdoZWVsSGFuZGxlclxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsIEB1cGRhdGVTY3JvbGxEaXJcblxuICAgICAgICAjIGJpbmQgY2hhbmdlOmNlbnRlciB0byBhbGwgb3RoZXIgaGFuZGxlcnNcbiAgICAgICAgQG9uIFwiY2hhbmdlOm9yaWVudGF0aW9uXCIsIEBtb2JpbGVBZGRyZXNzQmFyU2Nyb2xsRml4LCB0aGlzXG5cbiAgICAgICAgIyBkZXRlY3Qgb25saW5lL29mZmxpbmVcbiAgICAgICAgaWYgd2luZG93Lm5hdmlnYXRvci5vbkxpbmU/XG4gICAgICAgICAgICBAc2V0ICdvZmZsaW5lJywgKG5vdCB3aW5kb3cubmF2aWdhdG9yLm9uTGluZSlcbiAgICAgICAgICAgICMgYmluZCBvZmZsaW5lL29ubGluZSBldmVudHNcbiAgICAgICAgICAgICQod2luZG93KS5vbiAnb2ZmbGluZSBvbmxpbmUnLCBAb2ZmbGluZUNoZWNrXG5cblxuXG4gICAgb2ZmbGluZUNoZWNrOiAoZXZlbnQpID0+XG5cbiAgICAgICAgQHNldCAnb2ZmbGluZScsIChldmVudC50eXBlID09ICdvZmZsaW5lJylcblxuXG5cblxuICAgIHVzZXJBZ2VudERldGVjdHM6ID0+XG5cbiAgICAgICAgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhXG5cbiAgICAgICAgaW9zID0gdW5kZWZpbmVkXG4gICAgICAgIGlvczEgPSB1bmRlZmluZWRcbiAgICAgICAgaW9zMiA9IHVuZGVmaW5lZFxuICAgICAgICBpb3MyXzQgPSB1bmRlZmluZWRcbiAgICAgICAgaW9zMyA9IHVuZGVmaW5lZFxuICAgICAgICBpb3M0ID0gdW5kZWZpbmVkXG4gICAgICAgIGlvczUgPSB1bmRlZmluZWRcbiAgICAgICAgaW9zNV91cCA9IHVuZGVmaW5lZFxuICAgICAgICBpb3M2ID0gdW5kZWZpbmVkXG4gICAgICAgIGlvczZfdXAgPSB1bmRlZmluZWRcbiAgICAgICAgc2FmYXJpID0gfnVhLmluZGV4T2YoXCJTYWZhcmlcIikgaXNudCAwIGFuZCB+dWEuaW5kZXhPZihcIkNocm9tZVwiKSBpcyAwXG4gICAgICAgIG1vYmlsZV9pcGhvbmUgPSB+dWEuaW5kZXhPZihcImlQaG9uZVwiKSBpc250IDAgb3IgfnVhLmluZGV4T2YoXCJpUG9kXCIpIGlzbnQgMFxuICAgICAgICBtb2JpbGVfaXBhZCA9IH51YS5pbmRleE9mKFwiaVBhZFwiKSBpc250IDBcbiAgICAgICAgbW9iaWxlX2lvcyA9IG1vYmlsZV9pcGhvbmUgb3IgbW9iaWxlX2lwYWRcbiAgICAgICAgbW9iaWxlX2FuZHJvaWQgPSB+dWEuaW5kZXhPZihcIkFuZHJvaWRcIikgaXNudCAwXG4gICAgICAgIG1vYmlsZV9hbmRyb2lkX3ZlcnNpb24gPSB1bmRlZmluZWRcblxuICAgICAgICAjIERldGVjdCBpZiB0aGlzIGlzIHJ1bm5pbmcgYXMgYSBmdWxsc2NyZWVuIGFwcCBmcm9tIHRoZSBob21lc2NyZWVuXG4gICAgICAgIG1vYmlsZV9yYXdzY3JlZW4gPSB3aW5kb3cubmF2aWdhdG9yLnN0YW5kYWxvbmVcblxuICAgICAgICBpc19tb2JpbGUgPSBAaXNNb2JpbGUoIHVhIClcblxuICAgICAgICBtb2JpbGVfYW5kcm9pZF92ZXJzaW9uID0gdWEuc2xpY2UodWEuaW5kZXhPZihcIkFuZHJvaWRcIikgKyA4LCB1YS5pbmRleE9mKFwiQW5kcm9pZFwiKSArIDEzKSAgaWYgbW9iaWxlX2FuZHJvaWRcbiAgICAgICAgaWYgLyhpUGhvbmV8aVBvZHxpUGFkKS9pLnRlc3QodWEpXG4gICAgICAgICAgICBpb3MgPSB0cnVlXG4gICAgICAgICAgICBpZiAvT1MgMl9cXGQoX1xcZCk/IGxpa2UgTWFjIE9TIFgvaS50ZXN0KHVhKVxuXG4gICAgICAgICAgICAgICAgIyBpT1MgMiBzbyBEbyBTb21ldGhpbmdcbiAgICAgICAgICAgICAgICBpb3MyID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlvczJfNCA9IHRydWVcbiAgICAgICAgICAgIGVsc2UgaWYgL09TIDNfXFxkKF9cXGQpPyBsaWtlIE1hYyBPUyBYL2kudGVzdCh1YSlcblxuICAgICAgICAgICAgICAgICMgaU9TIDMgc28gRG8gU29tZXRoaW5nXG4gICAgICAgICAgICAgICAgaW9zMyA9IHRydWVcbiAgICAgICAgICAgICAgICBpb3MyXzQgPSB0cnVlXG4gICAgICAgICAgICBlbHNlIGlmIC9PUyA0X1xcZChfXFxkKT8gbGlrZSBNYWMgT1MgWC9pLnRlc3QodWEpXG5cbiAgICAgICAgICAgICAgICAjIGlPUyA0IHNvIERvIFNvbWV0aGluZ1xuICAgICAgICAgICAgICAgIGlvczQgPSB0cnVlXG4gICAgICAgICAgICAgICAgaW9zMl80ID0gdHJ1ZVxuICAgICAgICAgICAgZWxzZSBpZiAvT1MgNV9cXGQoX1xcZCk/IGxpa2UgTWFjIE9TIFgvaS50ZXN0KHVhKVxuXG4gICAgICAgICAgICAgICAgIyBpT1MgNSBzbyBEbyBTb21ldGhpbmdcbiAgICAgICAgICAgICAgICBpb3M1ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlvczVfdXAgPSB0cnVlXG4gICAgICAgICAgICBlbHNlIGlmIC9PUyA2X1xcZChfXFxkKT8gbGlrZSBNYWMgT1MgWC9pLnRlc3QodWEpXG5cbiAgICAgICAgICAgICAgICAjIGlPUyA2IHNvIERvIFNvbWV0aGluZ1xuICAgICAgICAgICAgICAgIGlvczYgPSB0cnVlXG4gICAgICAgICAgICAgICAgaW9zNV91cCA9IHRydWVcbiAgICAgICAgICAgICAgICBpb3M2X3VwID0gdHJ1ZVxuICAgICAgICAgICAgZWxzZSBpZiAvQ1BVIGxpa2UgTWFjIE9TIFgvaS50ZXN0KHVhKVxuXG4gICAgICAgICAgICAgICAgIyBpT1MgMSBzbyBEbyBTb21ldGhpbmdcbiAgICAgICAgICAgICAgICBpb3MxID0gdHJ1ZVxuICAgICAgICAgICAgZWxzZVxuXG4gICAgICAgICAgICAgICAgIyBpT1MgNiBvciBOZXdlciBzbyBEbyBOb3RoaW5nXG4gICAgICAgICAgICAgICAgaW9zNV91cCA9IHRydWVcblxuICAgICAgICBAc2V0XG4gICAgICAgICAgICAjIHNhZmFyaTogc2FmYXJpXG4gICAgICAgICAgICBpc19tb2JpbGU6IGlzX21vYmlsZVxuICAgICAgICAgICAgbW9iaWxlX2lwaG9uZTogbW9iaWxlX2lwaG9uZVxuICAgICAgICAgICAgbW9iaWxlX2lwYWQ6IG1vYmlsZV9pcGFkXG4gICAgICAgICAgICBtb2JpbGVfaW9zOiBtb2JpbGVfaW9zXG4gICAgICAgICAgICBtb2JpbGVfYW5kcm9pZDogbW9iaWxlX2FuZHJvaWRcbiAgICAgICAgICAgIG1vYmlsZV9hbmRyb2lkX3ZlcnNpb246IG1vYmlsZV9hbmRyb2lkX3ZlcnNpb25cbiAgICAgICAgICAgIG1vYmlsZV9yYXdzY3JlZW46IG1vYmlsZV9yYXdzY3JlZW5cbiAgICAgICAgICAgIGlvczogaW9zXG4gICAgICAgICAgICBpb3MxOiBpb3MxXG4gICAgICAgICAgICBpb3MyOiBpb3MyXG4gICAgICAgICAgICBpb3MyXzQ6IGlvczJfNFxuICAgICAgICAgICAgaW9zMzogaW9zM1xuICAgICAgICAgICAgaW9zNDogaW9zNFxuICAgICAgICAgICAgaW9zNTogaW9zNVxuICAgICAgICAgICAgaW9zNV91cDogaW9zNV91cFxuICAgICAgICAgICAgaW9zNjogaW9zNlxuICAgICAgICAgICAgaW9zNl91cDogaW9zNl91cFxuXG5cblxuICAgIGlzTW9iaWxlOiAodWEpID0+XG5cbiAgICAgICAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIChjZXxwaG9uZSl8eGRhfHhpaW5vL2kudGVzdCh1YSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QodWEuc3Vic3RyKDAsNCkpKVxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmYWxzZVxuXG4gICAgdXBkYXRlRW52OiA9PlxuICAgICAgICBoZWlnaHQgPSB1bmRlZmluZWRcbiAgICAgICAgaGVpZ2h0X3JhdyA9IHVuZGVmaW5lZFxuICAgICAgICBoZWlnaHRfZnVsbCA9IHVuZGVmaW5lZFxuICAgICAgICB3aWR0aCA9IHVuZGVmaW5lZFxuICAgICAgICBjZW50ZXIgPSB1bmRlZmluZWRcbiAgICAgICAgb3JpZW50YXRpb24gPSB1bmRlZmluZWRcblxuICAgICAgICAjIGdldCB3aWR0aFxuICAgICAgICB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpXG5cbiAgICAgICAgIyBnZXQgaGVpZ2h0LCBkZXBlbmRpbmcgb24gd2hhdCBkZXZpY2Ugd2UgYXJlIG9uXG4gICAgICAgIGlmIEBnZXQoXCJtb2JpbGVfaW9zXCIpIGFuZCBAZ2V0KFwic2FmYXJpXCIpXG4gICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHRfcmF3ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgICAgICAgaGVpZ2h0ICs9IDYwICBpZiBAZ2V0KFwibW9iaWxlX2lwaG9uZVwiKSBhbmQgbm90IEBnZXQoXCJtb2JpbGVfcmF3c2NyZWVuXCIpIGFuZCBoZWlnaHQgaXNudCAzMjBcbiAgICAgICAgICAgIGhlaWdodF9mdWxsID0gaGVpZ2h0XG4gICAgICAgIGVsc2UgaWYgQGdldChcIm1vYmlsZV9hbmRyb2lkXCIpXG4gICAgICAgICAgICBpZiBAZ2V0KFwibW9iaWxlX2FuZHJvaWRfdmVyc2lvblwiKSBpcyBcIjQuMS4xXCJcbiAgICAgICAgICAgICAgICBoZWlnaHRfZnVsbCA9IGhlaWdodCA9IGhlaWdodF9yYXcgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHRfcmF3ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICAgICAgaGVpZ2h0X2Z1bGwgPSBoZWlnaHQgKyA1NlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHRfcmF3ID0gaGVpZ2h0X2Z1bGwgPSAkKHdpbmRvdykuaGVpZ2h0KClcblxuICAgICAgICAjIGNoZWNrIG9yaWVudGF0aW9uXG4gICAgICAgIGlmIHdpZHRoID4gaGVpZ2h0XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9IFwibGFuZHNjYXBlXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgb3JpZW50YXRpb24gPSBcInBvcnRyYWl0XCJcblxuICAgICAgICAjIHNldCBhdHRyaWJ1dGVzXG4gICAgICAgIEBzZXRcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgIGhlaWdodF9yYXc6IGhlaWdodF9yYXdcbiAgICAgICAgICAgIGhlaWdodF9mdWxsOiBoZWlnaHRfZnVsbFxuICAgICAgICAgICAgY2VudGVyOlxuICAgICAgICAgICAgICAgIGxlZnQ6IHdpZHRoIC8gMlxuICAgICAgICAgICAgICAgIHRvcDogaGVpZ2h0IC8gMlxuXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cblxuXG4gICAgdXBkYXRlU2Nyb2xsRGlyOiAoZXZlbnQpID0+XG4gICAgICAgIHNjcm9sbFRvcCA9IEBnZXRTY3JvbGxUb3AoKVxuICAgICAgICBsYXN0U2Nyb2xsVG9wID0gQGdldChcInNjcm9sbFRvcFwiKVxuICAgICAgICBpZiBzY3JvbGxUb3AgPiBsYXN0U2Nyb2xsVG9wXG4gICAgICAgICAgICBAc2V0IFwic2Nyb2xsRGlyXCIsIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHNldCBcInNjcm9sbERpclwiLCBmYWxzZVxuICAgICAgICBAc2V0IFwic2Nyb2xsVG9wXCIsIHNjcm9sbFRvcFxuXG4gICAgd2hlZWxIYW5kbGVyOiAoZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSkgPT5cblxuXG4gICAgZ2V0U2Nyb2xsVG9wOiA9PlxuICAgICAgICBpZiB0eXBlb2Ygd2luZG93LnBhZ2VZT2Zmc2V0IGlzbnQgXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0ICNtb3N0IGJyb3dzZXJzXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEIgPSBkb2N1bWVudC5ib2R5ICNJRSAncXVpcmtzJ1xuICAgICAgICAgICAgRCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAjSUUgd2l0aCBkb2N0eXBlXG4gICAgICAgICAgICBEID0gKGlmIChELmNsaWVudEhlaWdodCkgdGhlbiBEIGVsc2UgQilcbiAgICAgICAgICAgIEQuc2Nyb2xsVG9wXG5cbiAgICBtb2JpbGVBZGRyZXNzQmFyU2Nyb2xsRml4OiA9PlxuXG4gICAgICAgIGlmIEBnZXQoXCJtb2JpbGVfYW5kcm9pZFwiKSBvciAoQGdldChcIm1vYmlsZV9pb3NcIikgYW5kIEBnZXQoXCJzYWZhcmlcIikpXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5oZWlnaHQgQGdldChcImhlaWdodF9mdWxsXCIpXG4gICAgICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgICAgICAgIyBIaWRlIHRoZSBhZGRyZXNzIGJhciFcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8gMCwgMVxuICAgICAgICAgICAgLCAwXG5cbiMgZW52SGVscGVyXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEVudkhlbHBlclxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuXyAgICAgICAgID0gcmVxdWlyZSgndW5kZXJzY29yZScpXG5CYWNrYm9uZSAgPSByZXF1aXJlKCdiYWNrYm9uZScpXG4kICAgICAgICAgPSByZXF1aXJlKCdqcXVlcnknKVxuTW9kZXJuaXpyID0gcmVxdWlyZShcIm1vZGVybml6clwiKVxuXG5cbmNsYXNzIEh0dHBIZWxwZXIgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gIHRvVXJsOiAoYmFzZV91cmwsIGFyZ3MpIC0+XG5cbiAgICB1cmwgPSBiYXNlX3VybFxuICAgIGluZGV4ID0gMFxuICAgIGZpcnN0X3NlcGFyYXRvciA9IChpZiBiYXNlX3VybC5pbmRleE9mKFwiP1wiKSBpcyAtMSB0aGVuIFwiP1wiIGVsc2UgXCImXCIpXG4gICAgJC5lYWNoIGFyZ3MsIChrZXksIHZhbCkgLT5cbiAgICAgIHJldHVybiB0cnVlICBpZiB2YWwgaXMgYHVuZGVmaW5lZGAgb3IgdmFsIGlzIFwiXCJcbiAgICAgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgdXJsICs9IGZpcnN0X3NlcGFyYXRvclxuICAgICAgZWxzZVxuICAgICAgICB1cmwgKz0gXCImXCJcbiAgICAgIHVybCArPSBrZXkgKyBcIj1cIiArIHZhbFxuICAgICAgaW5kZXgrK1xuICAgIHVybFxuXG4gICMgdG9VcmwoKVxuXG5cbiAgcmVxdWlyZUZpbGVzOiAoZmlsZXMpIC0+XG5cbiAgICBfLmVhY2ggZmlsZXMsIChmaWxlbmFtZSkgLT5cblxuICAgICAgZmlsZUV4dCA9IGZpbGVuYW1lLnNwbGl0KCcuJykucG9wKClcbiAgICAgIGZpbGVyZWYgPSBudWxsO1xuXG4gICAgICBpZiBmaWxlRXh0IGlzICdqcydcblxuICAgICAgICBmaWxlcmVmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgICAgICBmaWxlcmVmLnNldEF0dHJpYnV0ZSAndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgICAgIGZpbGVyZWYuc2V0QXR0cmlidXRlICdzcmMnLCBmaWxlbmFtZVxuXG4gICAgICBlbHNlIGlmIGZpbGVFeHQgaXMgJ2NzcydcblxuICAgICAgICBmaWxlcmVmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnbGluaydcbiAgICAgICAgZmlsZXJlZi5zZXRBdHRyaWJ1dGUgJ3JlbCcsICdzdHlsZXNoZWV0J1xuICAgICAgICBmaWxlcmVmLnNldEF0dHJpYnV0ZSAndHlwZScsICd0ZXh0L2NzcydcbiAgICAgICAgZmlsZXJlZi5zZXRBdHRyaWJ1dGUgJ2hyZWYnLCBmaWxlbmFtZVxuXG5cbiAgICAgIGlmIGZpbGVyZWY/XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdoZWFkJyApWzBdLmFwcGVuZENoaWxkKCBmaWxlcmVmIClcblxuXG4gIGdldFF1ZXJ5VmFyaWFibGU6ICh2YXJpYWJsZSkgLT5cblxuICAgIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSlcbiAgICB2YXJzID0gcXVlcnkuc3BsaXQoJyYnKTtcblxuICAgIHZhbHVlID0gbnVsbFxuXG4gICAgXy5lYWNoIHZhcnMsICh2LCBpKSAtPlxuICAgICAgcGFpciA9IHYuc3BsaXQoJz0nKTtcbiAgICAgIGlmIGRlY29kZVVSSUNvbXBvbmVudCggcGFpclswXSApIGlzIHZhcmlhYmxlXG4gICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50IHBhaXJbMV1cblxuICAgIHZhbHVlXG5cbiMgSHR0cEhlbHBlclxuXG5cbiMjI1xuSW5zdGFudGlhdGUgaGVscGVyXG4jIyNcbm1vZHVsZS5leHBvcnRzID0gbmV3IEh0dHBIZWxwZXJcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwICAgICAgPSByZXF1aXJlICdhcHAnXG5CYWNrYm9uZSA9IHJlcXVpcmUgXCJiYWNrYm9uZVwiXG5cbmNsYXNzIEFwcC5Nb2RlbHMuQXBpTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gIHVybFJvb3Q6ID0+XG5cbiAgICB1cmxSb290ID0gbnVsbFxuXG4gICAgYXBpVXJsID0gXy5yZXN1bHQoQCwgJ2FwaVVybCcpXG4gICAgaWYgYXBpVXJsP1xuICAgICAgdXJsUm9vdCA9IEFwcC5yZXF1ZXN0KCdhcGlSb290JykgKyBhcGlVcmxcblxuICAgIHVybFJvb3RcblxuXG4gIHBhcnNlOiAocmVzcG9uc2UpIC0+XG5cbiAgICBwYXJzZWREYXRhID0ge31cbiAgICBpZiByZXNwb25zZS5kYXRhP1xuICAgICAgcGFyc2VkRGF0YSA9IHJlc3BvbnNlLmRhdGFcbiAgICBlbHNlXG4gICAgICBwYXJzZWREYXRhID0gcmVzcG9uc2VcblxuICAgIHBhcnNlZERhdGFcblxuICBnZXQ6ID0+XG5cbiAgICB2YWx1ZSA9IEFwcC5Nb2RlbHMuQXBpTW9kZWwuX19zdXBlcl9fLmdldC5hcHBseSBALCBhcmd1bWVudHNcblxuICAgIGlmIF8uaXNGdW5jdGlvbiB2YWx1ZVxuICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseSBAXG5cbiAgICB2YWx1ZVxuXG5cbiAgdG9KU09OOiA9PlxuXG4gICAgZGF0YSA9IHt9XG5cbiAgICBqc29uID0gQXBwLk1vZGVscy5BcGlNb2RlbC5fX3N1cGVyX18udG9KU09OLmFwcGx5IEAsIGFyZ3VtZW50c1xuXG4gICAgXy5lYWNoIGpzb24sICh2YWx1ZSwga2V5KSAtPlxuICAgICAgZGF0YVtrZXldID0gQGdldChrZXkpXG4gICAgLCBAXG5cbiAgICBkYXRhXG5cblxuICB0b2dnbGVBdHRyaWJ1dGU6IChhdHRyLCBvcHRpb25zKSA9PlxuXG4gICAgQHNldCggYXR0ciwgbm90IEBnZXQoIGF0dHIsIF8uZGVmYXVsdCggb3B0aW9ucywge30gKSApIClcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5jbGFzcyBBcHAuTW9kZWxzLldQT3B0aW9uTW9kZWwgZXh0ZW5kcyBBcHAuTW9kZWxzLkFwaU1vZGVsXG5cbiAgYXBpVXJsOiAnMS9zaXRlL29wdGlvbnMnXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbmNsYXNzIEFwcC5Nb2RlbHMuV1BVc2VyTWV0YU1vZGVsIGV4dGVuZHMgQXBwLk1vZGVscy5BcGlNb2RlbFxuXG4gIGFwaVVybDogJzEvc2l0ZS91c2VybWV0YSdcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5BcHAubW9kdWxlICdTU09wdGlvbnMnLCAoU1NPcHRpb25zLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTT3B0aW9ucy5Db250cm9sbGVycy5PcHRpb25zQ29udHJvbGxlciBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQ29udHJvbGxlclxuXG5cbiAgICBnZXRPcHRpb25zOiAoa2V5KSA9PlxuXG4gICAgICBvcHRpb25zTW9kZWwgPSBAZ2V0T3B0aW9uc01vZGVsKClcblxuICAgICAgaWYga2V5P1xuICAgICAgICByZXR1cm4gb3B0aW9uc01vZGVsLmdldCBrZXlcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNNb2RlbFxuXG5cbiAgICBnZXRPcHRpb25zTW9kZWw6ID0+XG5cbiAgICAgIGlmIG5vdCBAb3B0aW9uc01vZGVsP1xuXG4gICAgICAgIEBvcHRpb25zTW9kZWwgPSBuZXcgU1NPcHRpb25zLk1vZGVscy5PcHRpb25zTW9kZWxcbiAgICAgICAgICBpZDogJ3NvY2lhbHN0cmVhbXNfYXBwX3NldHRpbmdzJ1xuXG4gICAgICAgICMgZmV0Y2ggaW5pdGlhbCBkYXRhIGZyb20gRE9NXG4gICAgICAgIEBvcHRpb25zTW9kZWwuZmV0Y2goKVxuXG4gICAgICBAb3B0aW9uc01vZGVsXG5cblxuXG4gICAgZ2V0VXNlck1ldGE6IChrZXkpID0+XG5cbiAgICAgIHVzZXJNZXRhID0gQGdldFVzZXJNZXRhTW9kZWwoKVxuXG4gICAgICBpZiBrZXk/XG4gICAgICAgIHJldHVybiB1c2VyTWV0YS5nZXQga2V5XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiB1c2VyTWV0YVxuXG5cbiAgICBnZXRVc2VyTWV0YU1vZGVsOiA9PlxuXG4gICAgICBpZiBub3QgQHVzZXJNZXRhTW9kZWw/XG5cbiAgICAgICAgQHVzZXJNZXRhTW9kZWwgPSBuZXcgU1NPcHRpb25zLk1vZGVscy5Vc2VyTWV0YU1vZGVsXG4gICAgICAgICAgaWQ6ICdzb2NpYWxzdHJlYW1zJ1xuXG4gICAgICAgICMgZmV0Y2ggaW5pdGlhbCBkYXRhIGZyb20gRE9NXG4gICAgICAgIEB1c2VyTWV0YU1vZGVsLmZldGNoKClcblxuICAgICAgQHVzZXJNZXRhTW9kZWxcblxuIiwiJ3VzZSBzdHJpY3QnXG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NPcHRpb25zJywgKFNTT3B0aW9ucywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU09wdGlvbnMuTW9kZWxzLk9wdGlvbnNNb2RlbCBleHRlbmRzIEFwcC5Nb2RlbHMuV1BPcHRpb25Nb2RlbFxuXG4gICAgZGVmYXVsdHM6XG4gICAgICBhcHBfc2V0dGluZ3M6IHRydWVcbiAgICAgIG1vZGVyYXRpb246IGZhbHNlXG4gICAgICB1c2VyX2Nhbl9tb2RlcmF0ZTogZmFsc2VcbiAgICAgIGlzX2FkbWluOiBmYWxzZVxuICAgICAgZGV2X21vZGU6IGZhbHNlXG4gICAgICBzc19hcGlfdXJsOiAnaHR0cHM6Ly9hcGkuc29jaWFsc3RyZWFtcy5jb20vJ1xuICAgICAgc3Nfb2F1dGhfdXJsOiAnaHR0cHM6Ly9vYXV0aC5zb2NpYWxzdHJlYW1zLmNvbS8nXG4gICAgICBzc191c2VyX2lkOiAnbmV3J1xuICAgICAgYWNjZXNzX3Rva2VuOiAnbmV3J1xuICAgICAgdGltZV90b19uZXh0X2Nyb246IGZhbHNlXG4gICAgICBwdWJsaWNfcGFnZV91cmw6ICcnXG4gICAgICBhZG1pbl9wYWdlX3VybDogJydcbiAgICAgIHdwUm9vdDogJy8nXG5cblxuXG4gICAgdG9nZ2xlQXR0cmlidXRlOiAoYXR0cikgPT5cbiAgICAgIEBzZXQoIGF0dHIsIG5vdCBAZ2V0KCBhdHRyICkgKVxuXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICBAbGlzdGVuVG8gQCwgJ2NoYW5nZTptb2RlcmF0aW9uJywgQG9uTW9kZXJhdGlvbkNoYW5nZVxuXG5cbiAgICBvbk1vZGVyYXRpb25DaGFuZ2U6IChtb2RlbCwgbW9kZXJhdGlvbikgPT5cblxuICAgICAgQXBwLlNTT3B0aW9ucy52ZW50LnRyaWdnZXIgJ2NoYW5nZTptb2RlcmF0aW9uJywgbW9kZWwsIG1vZGVyYXRpb25cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbkFwcC5tb2R1bGUgJ1NTT3B0aW9ucycsIChTU09wdGlvbnMsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgY2xhc3MgU1NPcHRpb25zLk1vZGVscy5Vc2VyTWV0YU1vZGVsIGV4dGVuZHMgQXBwLk1vZGVscy5XUFVzZXJNZXRhTW9kZWxcblxuICAgIGRlZmF1bHRzOlxuICAgICAgcHVibGlzaFBvcHVwOiBmYWxzZVxuICAgICAgdHJhc2hQb3B1cDogZmFsc2VcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbkFwcC5tb2R1bGUgJ1NTT3B0aW9ucycsIChTU09wdGlvbnMsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgU1NPcHRpb25zLkNvbnRyb2xsZXJzID0ge31cbiAgU1NPcHRpb25zLk1vZGVscyA9IHt9XG4gIFNTT3B0aW9ucy5Db2xsZWN0aW9ucyA9IHt9XG4gIFNTT3B0aW9ucy5WaWV3cyA9IHt9XG4gIFNTT3B0aW9ucy5MYXlvdXRzID0ge31cbiAgU1NPcHRpb25zLlJvdXRlcnMgPSB7fVxuICBTU09wdGlvbnMuVGVtcGxhdGVzID0ge31cblxuICBTU09wdGlvbnMudmVudCA9IG5ldyBCYWNrYm9uZS5XcmVxci5FdmVudEFnZ3JlZ2F0b3IoKVxuICBTU09wdGlvbnMuY29tbWFuZHMgPSBuZXcgQmFja2JvbmUuV3JlcXIuQ29tbWFuZHMoKVxuICBTU09wdGlvbnMucmVxcmVzID0gbmV3IEJhY2tib25lLldyZXFyLlJlcXVlc3RSZXNwb25zZSgpXG5cbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5yZXF1aXJlICcuL1NTT3B0aW9ucydcblxuIyBNb2RlbHNcbnJlcXVpcmUgJy4vTW9kZWxzL09wdGlvbnNNb2RlbCdcbnJlcXVpcmUgJy4vTW9kZWxzL1VzZXJNZXRhTW9kZWwnXG5cbiMgQ29udHJvbGxlcnNcbnJlcXVpcmUgJy4vQ29udHJvbGxlcnMvT3B0aW9uc0NvbnRyb2xsZXInXG5cblxuQXBwLm1vZHVsZSAnU1NPcHRpb25zJywgKFNTT3B0aW9ucywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBTU09wdGlvbnMuYWRkSW5pdGlhbGl6ZXIgLT5cblxuICAgIGNvbnRyb2xsZXIgPSBuZXcgU1NPcHRpb25zLkNvbnRyb2xsZXJzLk9wdGlvbnNDb250cm9sbGVyKClcblxuICAgICMjI1xuICAgIERlZmluZSBNb2R1bGUgQVBJXG4gICAgIyMjXG4gICAgU1NPcHRpb25zLnJlcXJlcy5zZXRIYW5kbGVyICdvcHRpb24nLCBjb250cm9sbGVyLmdldE9wdGlvbnNcbiAgICBTU09wdGlvbnMucmVxcmVzLnNldEhhbmRsZXIgJ29wdGlvbnMnLCBjb250cm9sbGVyLmdldE9wdGlvbnNcbiAgICBTU09wdGlvbnMucmVxcmVzLnNldEhhbmRsZXIgJ3VzZXJNZXRhJywgY29udHJvbGxlci5nZXRVc2VyTWV0YVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbkFwcC5tb2R1bGUgJ1NTUG9zdHMnLCAoU1NQb3N0cywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU1Bvc3RzLkNvbGxlY3Rpb25zLkFwaVBvc3RzQ29sbGVjdGlvbiBleHRlbmRzIEFwcC5Db2xsZWN0aW9ucy5JbmZpbml0ZVNjcm9sbENvbGxlY3Rpb25cblxuICAgIG1vZGVsOiBTU1Bvc3RzLk1vZGVscy5Qb3N0TW9kZWxcblxuICAgIGRhdGE6XG4gICAgICBwZXJQYWdlIDogMjRcbiAgICAgIGNyb24gOiAnZmFsc2UnXG5cbiAgICB1cmw6IC0+XG5cbiAgICAgICMgY3JlYXRlIEFQSSB1cmwsIGFkZGluZyBleHRyYSBmaWVsZHMgZm9yIGF1dGhlbnRpY2F0aW9uXG4gICAgICB1cmwgICAgICAgICAgICA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdzc19hcGlfdXJsJ1xuICAgICAgc3Nfb2F1dGhfdXJsICAgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAnc3Nfb2F1dGhfdXJsJ1xuICAgICAgYWRtaW5fcGFnZV91cmwgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAnYWRtaW5fcGFnZV91cmwnXG4gICAgICBzc191c2VyX2lkICAgICA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdzc191c2VyX2lkJ1xuICAgICAgcGx1Z2luX3ZlcnNpb24gPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAncGx1Z2luX3ZlcnNpb24nXG4gICAgICBhY2Nlc3NfdG9rZW4gICA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdhY2Nlc3NfdG9rZW4nXG5cbiAgICAgIGRhdGEgPVxuICAgICAgICBvcmlnaW5fdXJsICAgICA6IGVuY29kZVVSSUNvbXBvbmVudCggYWRtaW5fcGFnZV91cmwgKVxuICAgICAgICBzc191c2VyX2lkICAgICA6IHNzX3VzZXJfaWRcbiAgICAgICAgYWNjZXNzX3Rva2VuICAgOiBhY2Nlc3NfdG9rZW5cbiAgICAgICAgcGx1Z2luX3ZlcnNpb24gOiBwbHVnaW5fdmVyc2lvblxuXG4gICAgICBBcHAuSGVscGVycy5odHRwLnRvVXJsIHVybCwgZGF0YVxuXG5cbiAgICBwYXJzZTogKHJlc3BvbnNlKSA9PlxuXG4gICAgICAjIHdlIHNldCBhIG1heGltdW0gb2YgOTQgcG9zdHNcbiAgICAgIGlmIEBsZW5ndGggPj0gOTRcbiAgICAgICAgcmV0dXJuIFtdXG5cbiAgICAgIGlmIHJlc3BvbnNlLnNlYXJjaF9tZXRhZGF0YT9cblxuICAgICAgICBpZiBub3QgQGRhdGE/XG4gICAgICAgICAgQGRhdGEgPSB7fVxuXG4gICAgICAgIEBkYXRhLnNlYXJjaF9tZXRhZGF0YSA9IHJlc3BvbnNlLnNlYXJjaF9tZXRhZGF0YVxuXG4gICAgICAjIGNoZWNrIGlmIHRoZSBjb2xsZWN0aW9uIGhhcyBhIG5leHQgcGFnZVxuICAgICAgaWYgQGRhdGE/IGFuZCBAZGF0YS5wZXJQYWdlPyBhbmQgcmVzcG9uc2Uuc3RhdHVzZXMubGVuZ3RoIDwgQGRhdGEucGVyUGFnZVxuICAgICAgICBAaGFzTmV4dCA9IGZhbHNlXG5cbiAgICAgICMgcmV0dXJuIHRoZSBzdGF0dXNlcyBmcm9tIHRoZSByZXNwb25zZVxuICAgICAgcmVzcG9uc2Uuc3RhdHVzZXNcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbkFwcC5tb2R1bGUgJ1NTUG9zdHMnLCAoU1NQb3N0cywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU1Bvc3RzLkNvbGxlY3Rpb25zLlBvc3RzQ29sbGVjdGlvbiBleHRlbmRzIEFwcC5Db2xsZWN0aW9ucy5JbmZpbml0ZVNjcm9sbENvbGxlY3Rpb25cblxuICAgIG1vZGVsOiBTU1Bvc3RzLk1vZGVscy5Qb3N0TW9kZWxcblxuICAgIGRhdGE6XG4gICAgICBwZXJQYWdlIDogMjRcbiAgICAgIHN0YXR1czogJ3B1Ymxpc2gnXG5cbiAgICBhcGlVcmw6ICcxL3NpdGUvc29jaWFsc3RyZWFtcydcblxuICAgIGNvbXBhcmF0b3I6IChhLGIpID0+XG5cbiAgICAgIGFJZCA9IHBhcnNlSW50IGEuZ2V0KCdvcmRlcl9pZCcpLCAxMFxuICAgICAgYklkID0gcGFyc2VJbnQgYi5nZXQoJ29yZGVyX2lkJyksIDEwXG5cbiAgICAgIGlmIGFJZCA+IGJJZFxuICAgICAgICAtMVxuICAgICAgZWxzZSBpZiBhSWQgPCBiSWRcbiAgICAgICAgMVxuICAgICAgZWxzZVxuICAgICAgICAwXG5cbiAgICBuZXh0UGFnZTogKGFyZ3MpID0+XG5cbiAgICAgIGlmIG5vdCBhcmdzP1xuICAgICAgICBhcmdzID0ge31cblxuICAgICAgYXJncyA9IF8uZGVmYXVsdHMgYXJncyxcbiAgICAgICAgaW1tZWRpYXRlOiB0cnVlXG5cbiAgICAgIGlmIG5vdCBhcmdzLmRhdGE/XG4gICAgICAgIGFyZ3MuZGF0YSA9IHt9XG5cbiAgICAgICMgc2V0IHRoZSBtYXggb3JkZXIgSUQgZnJvbSB0aGUgbGFzdCBpdGVtIGluIHRoZSBjb2xsZWN0aW9uXG4gICAgICBpZiBAbGVuZ3RoID4gMFxuICAgICAgICBhcmdzLmRhdGEubWF4X29yZGVyX2lkID0gQGxhc3QoKS5nZXQoJ29yZGVyX2lkJylcblxuICAgICAgQGZldGNoIGFyZ3NcblxuXG4gICAgcHJldlBhZ2U6IChhcmdzKSA9PlxuXG4gICAgICBpZiBub3QgYXJncz9cbiAgICAgICAgYXJncyA9IHt9XG5cbiAgICAgIGFyZ3MgPSBfLmRlZmF1bHRzIGFyZ3MsXG4gICAgICAgIGltbWVkaWF0ZTogdHJ1ZVxuXG4gICAgICBpZiBub3QgYXJncy5kYXRhP1xuICAgICAgICBhcmdzLmRhdGEgPSB7fVxuXG4gICAgICAjIHNldCB0aGUgbWF4IG9yZGVyIElEIGZyb20gdGhlIGxhc3QgaXRlbSBpbiB0aGUgY29sbGVjdGlvblxuICAgICAgaWYgQGxlbmd0aCA+IDBcbiAgICAgICAgYXJncy5kYXRhLm1pbl9vcmRlcl9pZCA9IEBmaXJzdCgpLmdldCgnb3JkZXJfaWQnKVxuXG4gICAgICBAZmV0Y2ggYXJnc1xuXG5cblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NQb3N0cycsIChTU1Bvc3RzLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTUG9zdHMuQ29udHJvbGxlcnMuQXV0b1JlbG9hZENvbnRyb2xsZXIgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbnRyb2xsZXJcblxuICAgICMgc2V0IGludGVydmFsIGluIG1pbGxpc2Vjb25kc1xuICAgIGF1dG9SZWxvYWRJbnRlcnZhbDogMTUgKiA2MCAqIDEwMDAgIyAxNW1pblxuXG4gICAgaW5pdGlhbGl6ZTogPT5cblxuICAgICAgU1NQb3N0cy5vbiAnc3RhcnQnLCBAb25TdGFydFxuXG5cbiAgICBvblN0YXJ0OiA9PlxuXG4gICAgICAjIGluaXRpYWxpemUgYXV0b3JlbG9hZCBpZiB0aGlzIGlzIHRoZSBmdWxsIHNjcmVlbiBldmVudCBwYWdlXG4gICAgICBpZiAkKCdib2R5JykuaGFzQ2xhc3MgJ3BhZ2UtdGVtcGxhdGUtdGVtcGxhdGUtc29jaWFsc3RyZWFtLWZ1bGxzY3JlZW4tcGhwJ1xuXG4gICAgICAgICMgaW5pdGlhbGl6ZSBhdXRvcmVsb2FkXG4gICAgICAgIEBpbml0QXV0b3JlbG9hZCgpXG5cbiAgICAgICAgcG9zdHNDb21wb3NpdGVWaWV3ID0gU1NQb3N0cy5yZXFyZXMucmVxdWVzdCAncG9zdHNDb21wb3NpdGVWaWV3J1xuXG4gICAgICAgIG1vZGVscyA9IFtdXG5cbiAgICAgICAgcG9zdHNDb21wb3NpdGVWaWV3LmNvbGxlY3Rpb24uZWFjaCAobW9kZWwpIC0+XG4gICAgICAgICAgbW9kZWxzLnB1c2ggbW9kZWxcblxuICAgICAgICBAc2hvd0luUm93cyBwb3N0c0NvbXBvc2l0ZVZpZXcsIG1vZGVscyxcbiAgICAgICAgICBpbnRlcnZhbDogMTUwMFxuXG5cblxuICAgIGluaXRBdXRvcmVsb2FkOiA9PlxuXG4gICAgICBhdXRvcmVsb2FkTWV0aG9kID0gJydcblxuICAgICAgIyBjaGVjayBpZiB3ZWJzb2NrZXQgaXMgYXZhaWxhYmxlXG4gICAgICAjIC4uLlxuXG4gICAgICBpZiBhdXRvcmVsb2FkTWV0aG9kIGlzICd3ZWJzb2NrZXQnXG4gICAgICAgIEBpbml0QXV0b3JlbG9hZFNvY2tldCgpXG4gICAgICBlbHNlXG4gICAgICAgIEBpbml0QXV0b3JlbG9hZFBvbGwoKVxuXG5cblxuICAgIGluaXRBdXRvcmVsb2FkU29ja2V0OiA9PlxuXG5cbiAgICBpbml0QXV0b3JlbG9hZFBvbGw6ID0+XG5cbiAgICAgIHNldEludGVydmFsIEBhdXRvcmVsb2FkUG9sbCwgQGF1dG9SZWxvYWRJbnRlcnZhbFxuXG5cbiAgICBhdXRvcmVsb2FkUG9sbDogPT5cblxuICAgICAgIyBnZXQgY29tcG9zaXRlVmlld1xuICAgICAgY29tcG9zaXRlVmlldyA9IFNTUG9zdHMucmVxcmVzLnJlcXVlc3QgJ3Bvc3RzQ29tcG9zaXRlVmlldydcblxuICAgICAgaWYgY29tcG9zaXRlVmlldy5sb2FkaW5nPyBhbmQgY29tcG9zaXRlVmlldy5sb2FkaW5nXG4gICAgICAgIHJldHVyblxuXG4gICAgICBjb21wb3NpdGVWaWV3LmxvYWRpbmcgPSB0cnVlXG5cbiAgICAgIGZpcnN0T3JkZXJJRCA9IHBhcnNlSW50IGNvbXBvc2l0ZVZpZXcuY2hpbGRyZW4uZmluZEJ5SW5kZXgoMCkubW9kZWwuZ2V0KCdvcmRlcl9pZCcpLCAxMFxuICAgICAgY29tcG9zaXRlVmlldy5jb2xsZWN0aW9uLnByZXZQYWdlXG4gICAgICAgIHJlbW92ZTogZmFsc2VcblxuICAgICAgICBkYXRhOlxuICAgICAgICAgIHBlclBhZ2U6IC0xXG5cbiAgICAgICAgc3VjY2VzczogKGNvbGxlY3Rpb24sIHJlcykgPT5cblxuICAgICAgICAgIGlmIGNvbGxlY3Rpb24ubGVuZ3RoIGlzIDBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgY29tcG9zaXRlVmlldy5yZW5kZXIoKVxuXG4gICAgICAgICAgbW9kZWxzID0gW11cblxuICAgICAgICAgIGNvbGxlY3Rpb24uZWFjaCAobW9kZWwpIC0+XG4gICAgICAgICAgICBpZiBwYXJzZUludCggbW9kZWwuZ2V0KCdvcmRlcl9pZCcpLCAxMCApID4gZmlyc3RPcmRlcklEXG4gICAgICAgICAgICAgIG1vZGVscy5wdXNoIG1vZGVsXG5cbiAgICAgICAgICBAc2hvd0luUm93cyBjb21wb3NpdGVWaWV3LCBtb2RlbHNcblxuXG4gICAgc2hvd0luUm93czogKGNvbXBvc2l0ZVZpZXcsIG1vZGVscywgYXJncykgPT5cblxuICAgICAgaWYgbm90IGFyZ3M/XG4gICAgICAgIGFyZ3MgPSB7fVxuICAgICAgYXJncyA9IF8uZGVmYXVsdHMgYXJncywge31cblxuICAgICAgbmV3Vmlld3MgPSBbXVxuXG4gICAgICBfLmVhY2ggbW9kZWxzLCAobW9kZWwpIC0+XG4gICAgICAgICMgZmluZCBjaGlsZCB2aWV3IGZvciB0aGlzIG1vZGVsXG4gICAgICAgIGNoaWxkVmlldyA9IGNvbXBvc2l0ZVZpZXcuY2hpbGRyZW4uZmluZEJ5TW9kZWwgbW9kZWxcblxuICAgICAgICBjaGlsZFZpZXcuJGVsLmhpZGUoKVxuICAgICAgICBuZXdWaWV3cy5wdXNoIGNoaWxkVmlld1xuXG5cbiAgICAgICMgZmluZCBob3cgbWFueSBjb2x1bW5zIHdlIGhhdmVcbiAgICAgIGxheW91dCA9ICQoJy5zcy13cmFwcGVyJykuYXR0cignZGF0YS1sYXlvdXQnKVxuXG4gICAgICBjb2xzID0gMVxuICAgICAgc3dpdGNoIGxheW91dFxuICAgICAgICB3aGVuICdzbWFsbCdcbiAgICAgICAgICBjb2xzID0gMlxuICAgICAgICB3aGVuICdtZWRpdW0nXG4gICAgICAgICAgY29scyA9IDNcbiAgICAgICAgd2hlbiAnbGFyZ2UnXG4gICAgICAgICAgY29scyA9IDRcblxuICAgICAgIyBkaXZpZGUgbmV3IHBvc3RzIGluIGdyb3VwcyBvciBgY29sc2AgcG9zdHMgZWFjaFxuICAgICAgbmV3Vmlld3NHcm91cHMgPSBbXVxuICAgICAgXy5lYWNoIG5ld1ZpZXdzLnJldmVyc2UoKSwgKG5ld1ZpZXcsIG5ld1ZpZXdJbmRleCkgLT5cbiAgICAgICAgZ3JvdXBJbmRleCA9IE1hdGguZmxvb3IoIG5ld1ZpZXdJbmRleCAvIGNvbHMgKVxuXG4gICAgICAgIGlmIG5vdCBuZXdWaWV3c0dyb3Vwc1sgZ3JvdXBJbmRleCBdP1xuICAgICAgICAgIG5ld1ZpZXdzR3JvdXBzLnB1c2ggW11cblxuICAgICAgICBuZXdWaWV3c0dyb3Vwc1sgZ3JvdXBJbmRleCBdLnB1c2ggbmV3Vmlld1xuXG5cbiAgICAgIGlmIGFyZ3MuaW50ZXJ2YWw/XG4gICAgICAgIHNob3dJbnRlcnZhbCA9IGFyZ3MuaW50ZXJ2YWxcbiAgICAgIGVsc2VcbiAgICAgICAgc2hvd0ludGVydmFsID0gTWF0aC5yb3VuZCggQGF1dG9SZWxvYWRJbnRlcnZhbCAvICggbmV3Vmlld3NHcm91cHMubGVuZ3RoICsgMSApIClcblxuICAgICAgXy5lYWNoIG5ld1ZpZXdzR3JvdXBzLCAobmV3Vmlld0dyb3VwLCBuZXdWaWV3R3JvdXBJbmRleCkgLT5cblxuICAgICAgICAjIHNob3cgYWZ0ZXIgc29tZSB0aW1lXG4gICAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAgIGlmIG5ld1ZpZXdHcm91cC5sZW5ndGggaXMgY29sc1xuICAgICAgICAgICAgXy5lYWNoIG5ld1ZpZXdHcm91cCwgKG5ld1ZpZXcpIC0+XG4gICAgICAgICAgICAgIG5ld1ZpZXcuJGVsLnNsaWRlRG93biA1MDBcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBfLmVhY2ggbmV3Vmlld0dyb3VwLCAobmV3VmlldykgLT5cbiAgICAgICAgICAgICAgbmV3Vmlldy4kZWwuZmFkZUluIDgwMFxuXG4gICAgICAgICwgbmV3Vmlld0dyb3VwSW5kZXggKiBzaG93SW50ZXJ2YWxcblxuXG4gICAgICAjIGNsZWFyIHRoZSBsb2FkaW5nIGZsYWdcbiAgICAgIGNvbXBvc2l0ZVZpZXcubG9hZGluZyA9IGZhbHNlXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbkFwcC5tb2R1bGUgJ1NTUG9zdHMnLCAoU1NQb3N0cywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU1Bvc3RzLkNvbnRyb2xsZXJzLlBvc3RzQ29udHJvbGxlciBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQ29udHJvbGxlclxuXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICBTU1Bvc3RzLm9uICdzdGFydCcsIEBvblN0YXJ0XG5cblxuICAgIG9uU3RhcnQ6ID0+XG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIGhlYWRlciByZWdpb24gaXMgaW4gdGhlIGRvbVxuICAgICAgaWYgJCgnLnNzLXBvc3RzLXJlZ2lvbicpLmxlbmd0aCA+IDBcblxuICAgICAgICBBcHAuYWRkUmVnaW9uc1xuICAgICAgICAgIHBvc3RzOiAnLnNzLXBvc3RzLXJlZ2lvbidcblxuXG4gICAgICAjIyNcbiAgICAgIFJlbmRlciBwb3N0cyBmb3IgdGhlIGZpcnN0IHRpbWUsIGlmIGFueSBwb3N0cyBhcmUgZm91bmQgaW4gdGhlIERPTS5cbiAgICAgICMjI1xuICAgICAgaWYgJCgnLnNzLXdyYXBwZXInKS5sZW5ndGggPiAwXG4gICAgICAgIEBnZXRQb3N0c0NvbXBvc2l0ZVZpZXcoKS5yZW5kZXJGcm9tRE9NICQoJy5zcy13cmFwcGVyJylcblxuICAgICAgICBpZiBBcHAucG9zdHM/XG4gICAgICAgICAgQXBwLnBvc3RzLmN1cnJlbnRWaWV3ID0gQGdldFBvc3RzQ29tcG9zaXRlVmlldygpXG5cblxuXG4gICAgZ2V0UG9zdHNDb2xsZWN0aW9uOiA9PlxuXG4gICAgICBpZiBub3QgQHBvc3RzQ29sbGVjdGlvbj9cblxuICAgICAgICBAcG9zdHNDb2xsZWN0aW9uID0gbmV3IFNTUG9zdHMuQ29sbGVjdGlvbnMuUG9zdHNDb2xsZWN0aW9uKClcblxuICAgICAgICAjIGlmIHRoZSBwaHAgYXBpIGNhbGwgd2FzIG1hZGUgd2l0aCBhIHJlcXVlc3RJRCwgZmV0Y2ggdGhhdFxuICAgICAgICBpZiAkKCcuYndhcGktY2FsbC1kYXRhW2RhdGEtaWQ9XCJzb2NpYWxzdHJlYW1zX3RvcFwiXScpLmxlbmd0aCA+IDBcbiAgICAgICAgICBAcG9zdHNDb2xsZWN0aW9uLmRhdGEucmVxdWVzdElEID0gJ3NvY2lhbHN0cmVhbXNfdG9wJ1xuXG4gICAgICAgICMgSWYgd2UgYXJlIGluIHRoZSBhZG1pbiBhcmVhLCB3ZSBuZWVkIHRvIHNldCB0aGVcbiAgICAgICAgIyBvZiB0aGUgY29sbGVjdGlvbiB0byBmZXRjaCBib3RoIGRyYWZ0IGFuZCBwdWJsaXNoZWQgcG9zdHNcbiAgICAgICAgaWYgJCgnLnNzLWFkbWluJykubGVuZ3RoID4gMFxuICAgICAgICAgIEBwb3N0c0NvbGxlY3Rpb24uZGF0YS5zdGF0dXMgPSBbJ2RyYWZ0JywgJ3B1Ymxpc2gnXVxuXG4gICAgICAgICMgZmV0Y2ggaW5pdGlhbCBwb3N0cyBmcm9tIERPTVxuICAgICAgICBAcG9zdHNDb2xsZWN0aW9uLmZldGNoKClcblxuICAgICAgQHBvc3RzQ29sbGVjdGlvblxuXG5cbiAgICBnZXRBcGlQb3N0c0NvbGxlY3Rpb246ID0+XG5cbiAgICAgIGlmIG5vdCBAYXBpUG9zdHNDb2xsZWN0aW9uP1xuXG4gICAgICAgIEBhcGlQb3N0c0NvbGxlY3Rpb24gPSBuZXcgU1NQb3N0cy5Db2xsZWN0aW9ucy5BcGlQb3N0c0NvbGxlY3Rpb24oKVxuXG4gICAgICBAYXBpUG9zdHNDb2xsZWN0aW9uXG5cblxuXG4gICAgZ2V0QWxsUG9zdHNDb2xsZWN0aW9uOiA9PlxuXG4gICAgICBpZiBub3QgQGFsbFBvc3RzQ29sbGVjdGlvbj9cblxuICAgICAgICBAYWxsUG9zdHNDb2xsZWN0aW9uID0gbmV3IFNTUG9zdHMuQ29sbGVjdGlvbnMuUG9zdHNDb2xsZWN0aW9uKClcblxuICAgICAgICBAYWxsUG9zdHNDb2xsZWN0aW9uLmRhdGEgPVxuICAgICAgICAgIHJlcXVlc3RJRCA6ICdzb2NpYWxzdHJlYW1zX2FsbCdcbiAgICAgICAgICBwZXJQYWdlOiAtMVxuICAgICAgICAgIHN0YXR1czogW1xuICAgICAgICAgICAgJ3B1Ymxpc2gnXG4gICAgICAgICAgICAnZHJhZnQnXG4gICAgICAgICAgICAndHJhc2gnXG4gICAgICAgICAgXVxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgJ2lkJ1xuICAgICAgICAgICAgJ3N0YXR1cydcbiAgICAgICAgICAgICd2ZW5kb3JfaWQnXG4gICAgICAgICAgICAnc2VydmljZV9uYW1lJ1xuICAgICAgICAgIF1cblxuICAgICAgICBAYWxsUG9zdHNDb2xsZWN0aW9uLmZldGNoKClcblxuICAgICAgICAjIGNvbnNvbGUubG9nIEBhbGxQb3N0c0NvbGxlY3Rpb25cblxuICAgICAgQGFsbFBvc3RzQ29sbGVjdGlvblxuXG5cbiAgICBnZXRQb3N0c0NvbXBvc2l0ZVZpZXc6ID0+XG5cbiAgICAgIGlmIG5vdCBAcG9zdHNDb21wb3NpdGVWaWV3PyBvciBAcG9zdHNDb21wb3NpdGVWaWV3LmlzQ2xvc2VkXG5cbiAgICAgICAgQHBvc3RzQ29tcG9zaXRlVmlldyA9IG5ldyBTU1Bvc3RzLlZpZXdzLlBvc3RzQ29tcG9zaXRlVmlld1xuICAgICAgICAgIGNvbGxlY3Rpb246IEBnZXRQb3N0c0NvbGxlY3Rpb24oKVxuICAgICAgICAgIG1vZGVsOiAobmV3IFNTUG9zdHMuTW9kZWxzLlBvc3RzTGF5b3V0TW9kZWwpXG5cbiAgICAgIEBwb3N0c0NvbXBvc2l0ZVZpZXdcblxuXG5cbiAgICBnZXRBcGlQb3N0c0NvbXBvc2l0ZVZpZXc6ID0+XG5cbiAgICAgIGlmIG5vdCBAYXBpUG9zdHNDb21wb3NpdGVWaWV3PyBvciBAYXBpUG9zdHNDb21wb3NpdGVWaWV3LmlzQ2xvc2VkXG5cbiAgICAgICAgQGFwaVBvc3RzQ29tcG9zaXRlVmlldyA9IG5ldyBTU1Bvc3RzLlZpZXdzLlBvc3RzQ29tcG9zaXRlVmlld1xuICAgICAgICAgIGNvbGxlY3Rpb246IEBnZXRBcGlQb3N0c0NvbGxlY3Rpb24oKVxuICAgICAgICAgIG1vZGVsOiAobmV3IFNTUG9zdHMuTW9kZWxzLlBvc3RzTGF5b3V0TW9kZWwpXG5cbiAgICAgIEBhcGlQb3N0c0NvbXBvc2l0ZVZpZXdcblxuXG5cbiAgICBkb2luZ0JhdGNoU2F2ZTogKHZhbHVlKSA9PlxuXG4gICAgICBpZiBub3QgQGRvaW5nQmF0Y2hTYXZlRmxhZz9cbiAgICAgICAgQGRvaW5nQmF0Y2hTYXZlRmxhZyA9IGZhbHNlXG5cbiAgICAgIGlmIHZhbHVlP1xuICAgICAgICBAZG9pbmdCYXRjaFNhdmVGbGFnID0gdmFsdWVcblxuICAgICAgQGRvaW5nQmF0Y2hTYXZlRmxhZ1xuXG5cbiAgICBmZXRjaFNlcnZlclBvc3RzOiAoZGF0YSwgb3B0aW9ucykgPT5cblxuICAgICAgcG9zdHNDb2xsZWN0aW9uID0gQGdldFBvc3RzQ29sbGVjdGlvbigpXG5cbiAgICAgIGlmIG5vdCBwb3N0c0NvbGxlY3Rpb24uZGF0YT9cbiAgICAgICAgcG9zdHNDb2xsZWN0aW9uLmRhdGEgPSB7fVxuXG4gICAgICBpZiBkYXRhP1xuICAgICAgICBwb3N0c0NvbGxlY3Rpb24uZGF0YSA9IF8uZXh0ZW5kIHt9LCBwb3N0c0NvbGxlY3Rpb24uZGF0YSwgZGF0YVxuXG4gICAgICAjIHNldCBoYXNOZXh0IGZsYWcgdG8gdHJ1ZSBzbyB0aGF0IGluZmluaXRlIHNjcm9sbCBjYW4gc3RhcnQgYWdhaW5cbiAgICAgIHBvc3RzQ29sbGVjdGlvbi5oYXNOZXh0ID0gdHJ1ZVxuXG4gICAgICAjIGZpcnN0IHJlc2V0IGNvbGxlY3Rpb25cbiAgICAgIHBvc3RzQ29sbGVjdGlvbi5yZXNldCgpXG5cbiAgICAgICMgZmV0Y2ggbmV3IHBvc3RzXG4gICAgICBwb3N0c0NvbGxlY3Rpb24uZmV0Y2hcbiAgICAgICAgc3VjY2VzczogPT5cblxuICAgICAgICAgICMgY2hlY2sgaWYgdGhlIHJlZ2lvbiBjb250YWlucyBwb3N0cyBmcm9tIHRoZSBBUElcbiAgICAgICAgICBwb3N0c0NvbXBvc2l0ZVZpZXcgPSBAZ2V0UG9zdHNDb21wb3NpdGVWaWV3KClcbiAgICAgICAgICBpZiBub3QgcG9zdHNDb21wb3NpdGVWaWV3LmlzUmVuZGVyZWRcbiAgICAgICAgICAgIEFwcC5wb3N0cy5zaG93IHBvc3RzQ29tcG9zaXRlVmlld1xuXG4gICAgICAgICAgaWYgb3B0aW9ucz8gYW5kIG9wdGlvbnMuc3VjY2Vzcz8gYW5kIHR5cGVvZiBvcHRpb25zLnN1Y2Nlc3MgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgb3B0aW9ucy5zdWNjZXNzKClcblxuXG5cbiAgICBmZXRjaEFwaVBvc3RzOiAoZGF0YSwgb3B0aW9ucykgPT5cblxuICAgICAgYXBpUG9zdHNDb2xsZWN0aW9uID0gQGdldEFwaVBvc3RzQ29sbGVjdGlvbigpXG5cbiAgICAgIGlmIG5vdCBhcGlQb3N0c0NvbGxlY3Rpb24uZGF0YT9cbiAgICAgICAgYXBpUG9zdHNDb2xsZWN0aW9uLmRhdGEgPSB7fVxuXG4gICAgICBpZiBkYXRhP1xuICAgICAgICBhcGlQb3N0c0NvbGxlY3Rpb24uZGF0YSA9IF8uZXh0ZW5kIHt9LCBhcGlQb3N0c0NvbGxlY3Rpb24uZGF0YSwgZGF0YVxuXG4gICAgICBhcGlQb3N0c0NvbGxlY3Rpb24uaGFzTmV4dCA9IHRydWVcblxuICAgICAgIyBmb3IgbmV3IGFwaSBjb2xsZWN0aW9ucyB3ZSBzZXQgdGhlIHNlYXJjaF9tZXRhZGF0YSB0byBudWxsXG4gICAgICBpZiBhcGlQb3N0c0NvbGxlY3Rpb24uZGF0YS5zZWFyY2hfbWV0YWRhdGE/XG4gICAgICAgIGRlbGV0ZSBhcGlQb3N0c0NvbGxlY3Rpb24uZGF0YS5zZWFyY2hfbWV0YWRhdGFcblxuICAgICAgIyBmaXJzdCByZXNldCBjb2xsZWN0aW9uXG4gICAgICBhcGlQb3N0c0NvbGxlY3Rpb24ucmVzZXQoKVxuXG4gICAgICAjIGZldGNoIG5ldyBwb3N0c1xuICAgICAgYXBpUG9zdHNDb2xsZWN0aW9uLmZldGNoXG5cbiAgICAgICAgc3VjY2VzczogPT5cblxuICAgICAgICAgICMgY2hlY2sgaWYgdGhlIHJlZ2lvbiBjb250YWlucyBwb3N0cyBmcm9tIHRoZSBBUElcbiAgICAgICAgICBhcGlQb3N0c0NvbXBvc2l0ZVZpZXcgPSBAZ2V0QXBpUG9zdHNDb21wb3NpdGVWaWV3KClcbiAgICAgICAgICBpZiBub3QgYXBpUG9zdHNDb21wb3NpdGVWaWV3LmlzUmVuZGVyZWRcbiAgICAgICAgICAgIEFwcC5wb3N0cy5zaG93IGFwaVBvc3RzQ29tcG9zaXRlVmlld1xuXG4gICAgICAgICAgaWYgb3B0aW9ucz8gYW5kIG9wdGlvbnMuc3VjY2Vzcz8gYW5kIHR5cGVvZiBvcHRpb25zLnN1Y2Nlc3MgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgb3B0aW9ucy5zdWNjZXNzKClcblxuXG4gICAgcHVibGlzaEFwaVBvc3RzOiA9PlxuXG4gICAgICAjIGxvb3AgdGhyb3VnaCBhbGwgcG9zdHMgaW4gdGhlIEFQSSBjb2xsZWN0aW9uXG4gICAgICBhcGlQb3N0c0NvbGxlY3Rpb24gPSBAZ2V0QXBpUG9zdHNDb2xsZWN0aW9uKClcblxuICAgICAgaWYgYXBpUG9zdHNDb2xsZWN0aW9uLmxlbmd0aCA+IDBcbiAgICAgICAgYXBpUG9zdHNDb2xsZWN0aW9uLmVhY2ggKGFwaVBvc3RNb2RlbCkgLT5cbiAgICAgICAgICBhcGlQb3N0TW9kZWwuc2F2ZSB7fSxcbiAgICAgICAgICAgIGJhdGNoOiB0cnVlXG5cbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xubW9tZW50ID0gcmVxdWlyZSAnbW9tZW50J1xuXG5BcHAubW9kdWxlICdTU1Bvc3RzJywgKFNTUG9zdHMsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgY2xhc3MgU1NQb3N0cy5Nb2RlbHMuUG9zdE1vZGVsIGV4dGVuZHMgQXBwLk1vZGVscy5BcGlNb2RlbFxuXG4gICAgYXBpVXJsOiAnMS9zaXRlL3NvY2lhbHN0cmVhbXMnXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICAjIGNoZWNrIGlmIHRoZSBvcHRpb25zIG1vZHVsZSB3YXMgbG9hZGVkXG4gICAgICBpZiBBcHAuU1NPcHRpb25zPyBhbmQgQXBwLlNTT3B0aW9ucy52ZW50P1xuXG4gICAgICAgICMgbGlzdGVuIGZvciBtb2RlcmF0aW9uIGNoYW5nZXNcbiAgICAgICAgQGxpc3RlblRvIEFwcC5TU09wdGlvbnMudmVudCwgJ2NoYW5nZTptb2RlcmF0aW9uJywgQG9uTW9kZXJhdGlvbkNoYW5nZVxuXG5cbiAgICAgIGlmIG5vdCBAaWQ/IG9yIEBpZCBpcyAnJ1xuICAgICAgICBzYXZlZFBvc3QgPSBAZ2V0U2F2ZWRQb3N0KClcbiAgICAgICAgaWYgc2F2ZWRQb3N0P1xuICAgICAgICAgIGlkID0gc2F2ZWRQb3N0LmdldCgnaWQnKVxuXG5cbiAgICBvbk1vZGVyYXRpb25DaGFuZ2U6IChtb2RlbCwgbW9kZXJhdGlvbikgPT5cblxuICAgICAgIyBJZiBwb3N0IGRvZXMgbm90IGhhdmUgYSBpZCBzZXQsIGRvIG5vdCB0b2dnbGUgb24gbW9kZXJhdGlvbiBjaGFuZ2VzXG4gICAgICBpZiBub3QgQGlkPyBvciBAaWQgaXMgJydcblxuICAgICAgICAjIGJ5IGRlZmF1bHQgdGhlIHN0YXR1cyBpcyAncHVibGljJ1xuICAgICAgICBzdGF0dXMgPSAncHVibGlzaCdcblxuICAgICAgICAjIGlmIG1vZGVyYXRpb24gaXMgdHVybmVkIE9OLCB0aGVuIHdlIHNob3VsZCBzd2l0Y2ggYWxsIHBvc3RzIHRvIGRyYWZ0XG4gICAgICAgIGlmIG1vZGVyYXRpb25cbiAgICAgICAgICBzdGF0dXMgPSAnZHJhZnQnXG5cbiAgICAgICAgQHNldCAnc3RhdHVzJywgc3RhdHVzXG5cblxuICAgIHBhcnNlOiAoZGF0YSkgLT5cblxuICAgICAgY29tcHV0ZWRGaWVsZHMgPSBbXG4gICAgICAgICdmb3JtYXR0ZWRfdGltZSdcbiAgICAgICAgJ2F2YXRhcidcbiAgICAgICAgJ3Blcm1hbGluaydcbiAgICAgICAgJ3VzZXJfbGluaydcbiAgICAgICAgJ2Zvcm1hdHRlZF9jYXB0aW9uJ1xuICAgICAgICAnaW1hZ2UnXG4gICAgICAgICd2aWRlbydcbiAgICAgICAgJ2hhc19pbWFnZSdcbiAgICAgICAgJ2hhc192aWRlbydcbiAgICAgICAgJ2hhc19tZWRpYSdcbiAgICAgICAgJ2FjdGlvbnMnXG4gICAgICAgICdzdGF0dXNfaWNvbidcbiAgICAgIF1cblxuICAgICAgIyByZW1vdmUgY29tcHV0ZWQgZGF0YVxuICAgICAgXy5lYWNoIGNvbXB1dGVkRmllbGRzLCAoa2V5KSAtPlxuICAgICAgICBpZiBkYXRhW2tleV0/XG4gICAgICAgICAgZGVsZXRlIGRhdGFba2V5XVxuXG4gICAgICBpZiBAY29sbGVjdGlvbj9cblxuICAgICAgICBkdXBlcyA9IEBjb2xsZWN0aW9uLndoZXJlXG4gICAgICAgICAgdmVuZG9yX2lkOiBkYXRhLnZlbmRvcl9pZFxuICAgICAgICAgIHNlcnZpY2VfbmFtZTogZGF0YS5zZXJ2aWNlX25hbWVcblxuICAgICAgICBpZiBkdXBlcy5sZW5ndGggPiAxXG4gICAgICAgICAgZGF0YS5kdXBsaWNhdGUgPSB0cnVlXG5cbiAgICAgIGRhdGFcblxuXG4gICAgZGVmYXVsdHM6XG5cbiAgICAgIGR1cGxpY2F0ZTogZmFsc2VcblxuICAgICAgc3RhdHVzOiAtPlxuXG4gICAgICAgIG91dHB1dCA9ICdkcmFmdCdcblxuICAgICAgICAjIGNoZWNrIG1vZGVyYXRpb25cbiAgICAgICAgaWYgQXBwLlNTT3B0aW9ucz9cbiAgICAgICAgICBtb2RlcmF0aW9uID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ21vZGVyYXRpb24nXG4gICAgICAgICAgaWYgbW9kZXJhdGlvbj8gYW5kIG1vZGVyYXRpb24gaXMgZmFsc2VcbiAgICAgICAgICAgIG91dHB1dCA9ICdwdWJsaXNoJ1xuXG5cbiAgICAgICAgc2F2ZWRQb3N0ID0gQGdldFNhdmVkUG9zdCgpXG4gICAgICAgIGlmIHNhdmVkUG9zdD9cbiAgICAgICAgICBvdXRwdXQgPSBzYXZlZFBvc3QuZ2V0KCdzdGF0dXMnKVxuXG4gICAgICAgIG91dHB1dFxuXG5cbiAgICAgIGZvcm1hdHRlZF90aW1lIDogLT5cbiAgICAgICAgQXBwLkhlbHBlcnMuZGF0ZS5wYXJzZVRpbWVzdGFtcCBAZ2V0KCd0aW1lc3RhbXAnKVxuXG4gICAgICBzY3JlZW5fbmFtZTogLT5cblxuICAgICAgICBvdXRwdXQgPSAnJ1xuXG4gICAgICAgIHN3aXRjaCBAZ2V0KCdzZXJ2aWNlX25hbWUnKVxuICAgICAgICAgIHdoZW4gJ3R3aXR0ZXInXG4gICAgICAgICAgICBvdXRwdXQgPSBAZ2V0KCd1c2VyJykuc2NyZWVuX25hbWVcblxuICAgICAgICAgIHdoZW4gJ2luc3RhZ3JhbSdcbiAgICAgICAgICAgIG91dHB1dCA9IEBnZXQoJ3VzZXInKS51c2VybmFtZVxuXG4gICAgICAgIG91dHB1dFxuXG5cbiAgICAgIGF2YXRhcjogLT5cblxuICAgICAgICBvdXRwdXQgPSAnJ1xuXG4gICAgICAgIHN3aXRjaCBAZ2V0KCdzZXJ2aWNlX25hbWUnKVxuICAgICAgICAgIHdoZW4gJ3R3aXR0ZXInXG4gICAgICAgICAgICBvdXRwdXQgPSBAZ2V0KCd1c2VyJykucHJvZmlsZV9pbWFnZV91cmxfaHR0cHNcblxuICAgICAgICAgIHdoZW4gJ2luc3RhZ3JhbSdcbiAgICAgICAgICAgIG91dHB1dCA9IEBnZXQoJ3VzZXInKS5wcm9maWxlX3BpY3R1cmVcblxuICAgICAgICBvdXRwdXRcblxuXG4gICAgICBwZXJtYWxpbms6IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJydcblxuICAgICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgICB3aGVuICd0d2l0dGVyJ1xuICAgICAgICAgICAgb3V0cHV0ID0gXCJodHRwczovL3d3dy50d2l0dGVyLmNvbS9cIiArIEBnZXQoJ3NjcmVlbl9uYW1lJykgKyBcIi9zdGF0dXMvXCIgKyBAZ2V0KCd2ZW5kb3JfaWQnKVxuXG4gICAgICAgICAgd2hlbiAnaW5zdGFncmFtJ1xuICAgICAgICAgICAgb3V0cHV0ID0gQGdldCgnbGluaycpXG5cbiAgICAgICAgb3V0cHV0XG5cblxuICAgICAgdXNlcl9saW5rOiAtPlxuXG4gICAgICAgIG91dHB1dCA9ICcnXG5cbiAgICAgICAgc3dpdGNoIEBnZXQoJ3NlcnZpY2VfbmFtZScpXG4gICAgICAgICAgd2hlbiAndHdpdHRlcidcbiAgICAgICAgICAgIG91dHB1dCA9IFwiaHR0cHM6Ly93d3cudHdpdHRlci5jb20vXCIgKyBAZ2V0KCdzY3JlZW5fbmFtZScpXG5cbiAgICAgICAgICB3aGVuICdpbnN0YWdyYW0nXG4gICAgICAgICAgICBvdXRwdXQgPSBcImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vXCIgKyBAZ2V0KCdzY3JlZW5fbmFtZScpXG5cbiAgICAgICAgb3V0cHV0XG5cblxuICAgICAgZm9ybWF0dGVkX2NhcHRpb246IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJydcblxuICAgICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgICB3aGVuICd0d2l0dGVyJ1xuICAgICAgICAgICAgb3V0cHV0ID0gQGdldCgndGV4dCcpXG5cbiAgICAgICAgICB3aGVuICdpbnN0YWdyYW0nXG4gICAgICAgICAgICBjYXB0aW9uID0gQGdldCgnY2FwdGlvbicpXG4gICAgICAgICAgICBpZiBjYXB0aW9uPyBhbmQgY2FwdGlvbi50ZXh0P1xuICAgICAgICAgICAgICBvdXRwdXQgPSBjYXB0aW9uLnRleHRcblxuICAgICAgICBvdXRwdXQgPSBAcGFyc2VVcmxzIG91dHB1dFxuICAgICAgICBvdXRwdXQgPSBAcGFyc2VNZW50aW9ucyBvdXRwdXRcbiAgICAgICAgb3V0cHV0ID0gQHBhcnNlSGFzaHRhZ3Mgb3V0cHV0XG4gICAgICAgIG91dHB1dCA9IEBhZGRMaW5lYnJlYWtzIG91dHB1dFxuXG4gICAgICAgIG91dHB1dFxuXG5cbiAgICAgIGltYWdlOiAtPlxuXG4gICAgICAgIG91dHB1dCA9ICcnXG5cbiAgICAgICAgc3dpdGNoIEBnZXQoJ3NlcnZpY2VfbmFtZScpXG4gICAgICAgICAgd2hlbiAndHdpdHRlcidcbiAgICAgICAgICAgIGVudGl0aWVzID0gQGdldCgnZW50aXRpZXMnKVxuICAgICAgICAgICAgaWYgZW50aXRpZXM/IGFuZCBlbnRpdGllcy5tZWRpYT8gYW5kIGVudGl0aWVzLm1lZGlhLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgb3V0cHV0ID0gZW50aXRpZXMubWVkaWFbMF0ubWVkaWFfdXJsX2h0dHBzXG5cbiAgICAgICAgICB3aGVuICdpbnN0YWdyYW0nXG4gICAgICAgICAgICBvdXRwdXQgPSBAZ2V0KCdpbWFnZXMnKS5zdGFuZGFyZF9yZXNvbHV0aW9uLnVybFxuXG4gICAgICAgIG91dHB1dFxuXG5cbiAgICAgIHZpZGVvOiAtPlxuXG4gICAgICAgIG91dHB1dCA9ICcnXG5cbiAgICAgICAgc3dpdGNoIEBnZXQoJ3NlcnZpY2VfbmFtZScpXG4gICAgICAgICAgd2hlbiAnaW5zdGFncmFtJ1xuICAgICAgICAgICAgdmlkZW9zID0gQGdldCgndmlkZW9zJylcbiAgICAgICAgICAgIGlmIHZpZGVvcz8gYW5kIHZpZGVvcy5zdGFuZGFyZF9yZXNvbHV0aW9uPyBhbmQgdmlkZW9zLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsP1xuICAgICAgICAgICAgICBvdXRwdXQgPSB2aWRlb3Muc3RhbmRhcmRfcmVzb2x1dGlvbi51cmxcblxuICAgICAgICBvdXRwdXRcblxuXG4gICAgICBoYXNfaW1hZ2U6IC0+XG4gICAgICAgIChAZ2V0KCdpbWFnZScpIGlzbnQgJycpXG5cbiAgICAgIGhhc192aWRlbzogLT5cbiAgICAgICAgKEBnZXQoJ3ZpZGVvJykgaXNudCAnJylcblxuXG4gICAgICBoYXNfbWVkaWE6IC0+XG4gICAgICAgIChAZ2V0KCdoYXNfaW1hZ2UnKSBvciBAZ2V0KCdoYXNfdmlkZW8nKSlcblxuXG4gICAgICBhY3Rpb25zOiAtPlxuXG4gICAgICAgIG91dHB1dCA9ICcnXG5cbiAgICAgICAgIyBjaGVjayBpZiB0aGUgY3VycmVudCB1c2VyIGNhbiBtb2RlcmF0ZVxuICAgICAgICB1c2VyX2Nhbl9tb2RlcmF0ZSA9IGZhbHNlXG4gICAgICAgICMgY2hlY2sgaWYgdGhlIG9wdGlvbnMgbW9kdWxlIHdhcyBsb2FkZWRcbiAgICAgICAgaWYgQXBwLlNTT3B0aW9ucz9cbiAgICAgICAgICB1c2VyX2Nhbl9tb2RlcmF0ZSA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICd1c2VyX2Nhbl9tb2RlcmF0ZSdcblxuICAgICAgICBpZiB1c2VyX2Nhbl9tb2RlcmF0ZVxuICAgICAgICAgIG91dHB1dCArPSAnPGEgY2xhc3M9XCJzcy1wb3N0LWFjdGlvbiBzcy1wdWJsaXNoLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCI+PGkgY2xhc3M9XCJzcy1pY29uLWNoZWNrXCI+PC9pPjxzcGFuIGNsYXNzPVwic3MtaW5uZXJcIj5QdWJsaXNoPC9zcGFuPjwvYT4nXG4gICAgICAgICAgb3V0cHV0ICs9ICc8YSBjbGFzcz1cInNzLXBvc3QtYWN0aW9uIHNzLXRyYXNoLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCI+PGkgY2xhc3M9XCJzcy1pY29uLXRyYXNoLW9cIj48L2k+PHNwYW4gY2xhc3M9XCJzcy1pbm5lclwiPlRyYXNoPC9zcGFuPjwvYT4nXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgICAgIHdoZW4gJ3R3aXR0ZXInXG4gICAgICAgICAgICAgIHZlbmRvcl9pZCA9IEBnZXQoJ3ZlbmRvcl9pZCcpXG4gICAgICAgICAgICAgIG91dHB1dCArPSAnPGEgY2xhc3M9XCJzcy1wb3N0LWFjdGlvblwiIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD9pbl9yZXBseV90bz0nICsgdmVuZG9yX2lkICsgJyZ2aWE9U29jaWFsU3RyZWFtc1dQJnJlbGF0ZWQ9U29jaWFsU3RyZWFtc1dQXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGkgY2xhc3M9XCJzcy1pY29uLXJlcGx5XCI+PC9pPjxzcGFuIGNsYXNzPVwic3MtaW5uZXJcIj5SZXBseTwvc3Bhbj48L2E+J1xuICAgICAgICAgICAgICBvdXRwdXQgKz0gJzxhIGNsYXNzPVwic3MtcG9zdC1hY3Rpb25cIiBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvcmV0d2VldD90d2VldF9pZD0nICsgdmVuZG9yX2lkICsgJyZyZWxhdGVkPVNvY2lhbFN0cmVhbXNXUFwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwic3MtaWNvbi1yZXR3ZWV0XCI+PC9pPjxzcGFuIGNsYXNzPVwic3MtaW5uZXJcIj5SZXR3ZWV0PC9zcGFuPjwvYT4nXG5cbiAgICAgICAgb3V0cHV0XG5cblxuICAgICAgc3RhdHVzX2ljb246IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJydcblxuICAgICAgICAjIGNoZWNrIGlmIHRoZSBjdXJyZW50IHVzZXIgY2FuIG1vZGVyYXRlXG4gICAgICAgIHVzZXJfY2FuX21vZGVyYXRlID0gZmFsc2VcbiAgICAgICAgIyBjaGVjayBpZiB0aGUgb3B0aW9ucyBtb2R1bGUgd2FzIGxvYWRlZFxuICAgICAgICBpZiBBcHAuU1NPcHRpb25zP1xuICAgICAgICAgIHVzZXJfY2FuX21vZGVyYXRlID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ3VzZXJfY2FuX21vZGVyYXRlJ1xuXG4gICAgICAgIGlmIHVzZXJfY2FuX21vZGVyYXRlXG4gICAgICAgICAgc3dpdGNoIEBnZXQoJ3N0YXR1cycpXG4gICAgICAgICAgICB3aGVuICdwdWJsaXNoJ1xuICAgICAgICAgICAgICBvdXRwdXQgKz0gJzxpIGNsYXNzPVwic3MtaWNvbi1jaGVja1wiPjwvaT4nXG4gICAgICAgICAgICB3aGVuICdkcmFmdCdcbiAgICAgICAgICAgICAgb3V0cHV0ICs9ICc8aSBjbGFzcz1cInNzLWljb24tYncgYnctZHJhZnQtaWNvblwiPjwvaT4nXG4gICAgICAgICAgICB3aGVuICd0cmFzaCdcbiAgICAgICAgICAgICAgb3V0cHV0ICs9ICc8aSBjbGFzcz1cInNzLWljb24tdHJhc2gtb1wiPjwvaT4nXG5cbiAgICAgICAgb3V0cHV0XG5cblxuICAgICAgZGV2X21ldGE6IC0+XG5cbiAgICAgICAgIyBjaGVjayBpZiB0aGUgb3B0aW9ucyBtb2R1bGUgd2FzIGxvYWRlZFxuICAgICAgICBpZiBub3QgQXBwLlNTT3B0aW9ucz9cbiAgICAgICAgICByZXR1cm5cblxuICAgICAgICAjIGdldCB0aGUgZGV2X21vZGUgb3B0aW9uXG4gICAgICAgIGRldl9tb2RlID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ2Rldl9tb2RlJ1xuICAgICAgICBpZiBub3QgZGV2X21vZGU/IG9yIG5vdCBkZXZfbW9kZVxuICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIG91dHB1dCA9ICcnXG4gICAgICAgIG91dHB1dCArPSAnPHAgY2xhc3M9XCJzcy1wb3N0LWlkXCI+aWQ6ICcgKyBAZ2V0KCdpZCcpICsgJzwvcD4nXG4gICAgICAgIG91dHB1dCArPSAnPHAgY2xhc3M9XCJzcy1wb3N0LW9yZGVyX2lkXCI+b3JkZXJfaWQ6ICcgKyBAZ2V0KCdvcmRlcl9pZCcpICsgJzwvcD4nXG4gICAgICAgIG91dHB1dCArPSAnPHAgY2xhc3M9XCJzcy1wb3N0LXZlbmRvcl9pZFwiPnZlbmRvcl9pZDogJyArIEBnZXQoJ3ZlbmRvcl9pZCcpICsgJzwvcD4nXG4gICAgICAgIG91dHB1dCArPSAnPHAgY2xhc3M9XCJzcy1wb3N0LXNlcnZpY2VfbmFtZVwiPnNlcnZpY2VfbmFtZTogJyArIEBnZXQoJ3NlcnZpY2VfbmFtZScpICsgJzwvcD4nXG4gICAgICAgIG91dHB1dCArPSAnPHAgY2xhc3M9XCJzcy1wb3N0LXRpbWVzdGFtcFwiPnRpbWVzdGFtcDogJyArIEBnZXQoJ3RpbWVzdGFtcCcpICsgJzwvcD4nXG4gICAgICAgIG91dHB1dCArPSAnPHAgY2xhc3M9XCJzcy1wb3N0LWRhdGVcIj5kYXRlOiAnICsgbW9tZW50LnVuaXgoIEBnZXQoJ3RpbWVzdGFtcCcpICkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykgKyAnPC9wPidcblxuICAgICAgICBvdXRwdXRcblxuXG4gICAgIyAvZGVmYXVsdHNcblxuXG5cbiAgICBwYXJzZVVybHM6ICh0ZXh0KSAtPlxuXG5cbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgL1tBLVphLXpdKzpcXC9cXC9bQS1aYS16MC05LV9dK1xcLltBLVphLXowLTktXzolJlxcP1xcLy49XSsvZywgKHVyaSkgLT5cbiAgICAgICAgJzxhIGhyZWY9XCInICsgdXJpICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyB1cmkgKyAnPC9hPidcblxuICAgICAgdGV4dFxuXG5cbiAgICBwYXJzZU1lbnRpb25zOiAodGV4dCkgLT5cblxuICAgICAgc3dpdGNoIEBnZXQoJ3NlcnZpY2VfbmFtZScpXG4gICAgICAgIHdoZW4gJ3R3aXR0ZXInXG4gICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSAvW0BdKyhbQS1aYS16MC05LV9dKykvZywgKG1hdGNoLCBoYW5kbGUpIC0+XG4gICAgICAgICAgICAnPGEgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vJyArIGhhbmRsZSArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj5AJyArIGhhbmRsZSArICc8L2E+J1xuXG4gICAgICAgIHdoZW4gJ2luc3RhZ3JhbSdcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlIC9bQF0rKFtBLVphLXowLTktX10rKS9nLCAobWF0Y2gsIGhhbmRsZSkgLT5cbiAgICAgICAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly9pbnN0YWdyYW0uY29tLycgKyBoYW5kbGUgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+QCcgKyBoYW5kbGUgKyAnPC9hPidcblxuICAgICAgdGV4dFxuXG5cbiAgICBwYXJzZUhhc2h0YWdzOiAodGV4dCkgLT5cblxuICAgICAgc3dpdGNoIEBnZXQoJ3NlcnZpY2VfbmFtZScpXG4gICAgICAgIHdoZW4gJ3R3aXR0ZXInXG4gICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSAvW1xcc10/WyNdKyhbQS1aYS16MC05LV9dKykvZywgKG1hdGNoLCBoYXNodGFnKSAtPlxuICAgICAgICAgICAgJyA8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9oYXNodGFnLycgKyBoYXNodGFnICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPiMnICsgaGFzaHRhZyArICc8L2E+J1xuXG4gICAgICAgIHdoZW4gJ2luc3RhZ3JhbSdcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlIC9bXFxzXT9bI10rKFtBLVphLXowLTktX10rKS9nLCAobWF0Y2gsIGhhc2h0YWcpIC0+XG4gICAgICAgICAgICAjICc8YSBocmVmPVwiaHR0cDovL3NlYXJjaGluc3RhZ3JhbS5jb20vJyArIGhhc2h0YWcgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+IycgKyBoYXNodGFnICsgJzwvYT4nXG4gICAgICAgICAgICAnICMnICsgaGFzaHRhZ1xuXG4gICAgICB0ZXh0XG5cblxuICAgIGFkZExpbmVicmVha3M6ICh0ZXh0KSAtPlxuXG4gICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgd2hlbiAndHdpdHRlcidcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlIC9cXHI/XFxuL2csICc8YnIgLz4nXG5cbiAgICAgICAgd2hlbiAnaW5zdGFncmFtJ1xuICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgL1xccj9cXG4vZywgJyAnXG5cbiAgICAgIHRleHRcblxuXG5cbiAgICBnZXRTYXZlZFBvc3Q6ID0+XG5cbiAgICAgICMgcmVtb3ZpbmcgdGhpcyBmZWF0dXJlIGZvciBub3dcbiAgICAgIHJldHVybiBudWxsXG5cbiAgICAgIGlmIG5vdCBAc2F2ZWRQb3N0P1xuXG4gICAgICAgICMgY2hlY2sgc3RhdHVzIGZyb20gdGhlIGNvbGxlY3Rpb24gb2YgYWxsIHNhdmVkIHBvc3RzXG4gICAgICAgIGFsbFBvc3RzQ29sbGVjdGlvbiA9IFNTUG9zdHMucmVxcmVzLnJlcXVlc3QgJ2FsbFBvc3RzQ29sbGVjdGlvbidcbiAgICAgICAgQHNhdmVkUG9zdCA9IGFsbFBvc3RzQ29sbGVjdGlvbi5maW5kV2hlcmVcbiAgICAgICAgICB2ZW5kb3JfaWQ6IEBnZXQgJ3ZlbmRvcl9pZCdcbiAgICAgICAgICBzZXJ2aWNlX25hbWU6IEBnZXQgJ3NlcnZpY2VfbmFtZSdcblxuICAgICAgQHNhdmVkUG9zdFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbkFwcC5tb2R1bGUgJ1NTUG9zdHMnLCAoU1NQb3N0cywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU1Bvc3RzLk1vZGVscy5Qb3N0c0xheW91dE1vZGVsIGV4dGVuZHMgQXBwLk1vZGVscy5BcGlNb2RlbFxuXG4gICAgZGVmYXVsdHM6XG5cbiAgICAgIHdpZHRoOiBudWxsXG5cbiAgICAgIGxheW91dDogLT5cblxuICAgICAgICBwYXJlbnRXaWR0aCA9IEBnZXQoJ3dpZHRoJylcblxuICAgICAgICBpZiBub3QgcGFyZW50V2lkdGg/XG4gICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgbGF5b3V0ID0gJydcblxuICAgICAgICBpZiBwYXJlbnRXaWR0aCA8PSA2MDBcbiAgICAgICAgICBsYXlvdXQgPSAneC1zbWFsbCdcblxuICAgICAgICBlbHNlIGlmIHBhcmVudFdpZHRoID4gNjAwIGFuZCBwYXJlbnRXaWR0aCA8PSA5MDBcbiAgICAgICAgICBsYXlvdXQgPSAnc21hbGwnXG5cbiAgICAgICAgZWxzZSBpZiBwYXJlbnRXaWR0aCA+IDkwMCBhbmQgcGFyZW50V2lkdGggPD0gMTI1MFxuICAgICAgICAgIGxheW91dCA9ICdtZWRpdW0nXG5cbiAgICAgICAgZWxzZSBpZiBwYXJlbnRXaWR0aCA+IDEyNTBcbiAgICAgICAgICBsYXlvdXQgPSAnbGFyZ2UnXG5cbiAgICAgICAgIyBlbHNlIGlmIHBhcmVudFdpZHRoID4gMTUwMFxuICAgICAgICAjICAgbGF5b3V0ID0gJ3gtbGFyZ2UnXG5cbiAgICAgICAgbGF5b3V0XG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NQb3N0cycsIChTU1Bvc3RzLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIFNTUG9zdHMuQ29udHJvbGxlcnMgPSB7fVxuICBTU1Bvc3RzLk1vZGVscyA9IHt9XG4gIFNTUG9zdHMuQ29sbGVjdGlvbnMgPSB7fVxuICBTU1Bvc3RzLlZpZXdzID0ge31cbiAgU1NQb3N0cy5MYXlvdXRzID0ge31cbiAgU1NQb3N0cy5Sb3V0ZXJzID0ge31cbiAgU1NQb3N0cy5UZW1wbGF0ZXMgPSB7fVxuXG4gIFNTUG9zdHMudmVudCA9IG5ldyBCYWNrYm9uZS5XcmVxci5FdmVudEFnZ3JlZ2F0b3IoKVxuICBTU1Bvc3RzLmNvbW1hbmRzID0gbmV3IEJhY2tib25lLldyZXFyLkNvbW1hbmRzKClcbiAgU1NQb3N0cy5yZXFyZXMgPSBuZXcgQmFja2JvbmUuV3JlcXIuUmVxdWVzdFJlc3BvbnNlKClcblxuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHZhciBzdGFjazEsIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGJ1ZmZlciA9IFwiICA8ZGl2IGNsYXNzPVxcXCJzcy1tZXRhXFxcIj5cXG4gICAgXCI7XG4gIHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGV2X21ldGEgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRldl9tZXRhIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImRldl9tZXRhXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIHJldHVybiBidWZmZXIgKyBcIlxcbiAgPC9kaXY+PCEtLSAuc3MtbWV0YSAtLT5cXG5cIjtcbn0sXCIzXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgc3RhY2sxLCBoZWxwZXIsIGZ1bmN0aW9uVHlwZT1cImZ1bmN0aW9uXCIsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgYnVmZmVyID0gXCIgIDxkaXYgY2xhc3M9XFxcInNzLXBvc3QtbWVkaWFcXFwiPlxcbiAgICA8c3BhbiBjbGFzcz1cXFwic3MtcG9zdC1zb2NpYWwtaWNvblxcXCI+PGkgY2xhc3M9XFxcInNzLWljb24tXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5zZXJ2aWNlX25hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnNlcnZpY2VfbmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJzZXJ2aWNlX25hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiIHNzLXdhdGVybWFya1xcXCI+PC9pPjwvc3Bhbj5cXG5cIjtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmhhc192aWRlbyA6IGRlcHRoMCksIHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOnRoaXMucHJvZ3JhbSg0LCBkYXRhKSxcImludmVyc2VcIjp0aGlzLnByb2dyYW0oNiwgZGF0YSksXCJkYXRhXCI6ZGF0YX0pO1xuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICByZXR1cm4gYnVmZmVyICsgXCIgIDwvZGl2PjwhLS0gLnNzLXBvc3QtbWVkaWEgLS0+XFxuXCI7XG59LFwiNFwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xuICByZXR1cm4gXCIgICAgICA8dmlkZW8gY2xhc3M9XFxcInNzLXBvc3QtdmlkZW9cXFwiIG11dGVkIGF1dG9wbGF5IGxvb3AgcG9zdGVyPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJpbWFnZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGRhdGEtaW1hZ2U9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaW1hZ2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmltYWdlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS1zcmM9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudmlkZW8gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnZpZGVvIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInZpZGVvXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgLz48IS0tIHZpZGVvLnNzLXBvc3QtaW1hZ2UgLS0+XFxuXCI7XG59LFwiNlwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xuICByZXR1cm4gXCIgICAgICA8ZGl2IGNsYXNzPVxcXCJzcy1wb3N0LWltYWdlLXdyYXBwZXJcXFwiIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWltYWdlOnVybChcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJpbWFnZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCIpO1xcXCI+XFxuICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbWFnZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaW1hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBjbGFzcz1cXFwic3MtcG9zdC1pbWFnZVxcXCIgLz5cXG4gICAgICA8L2Rpdj48IS0tIC5zcy1wb3N0LWltYWdlLXdyYXBwZXIgLS0+XFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNixcIj49IDIuMC4wLWJldGEuMVwiXSxcIm1haW5cIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHZhciBzdGFjazEsIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBidWZmZXIgPSBcIjxkaXYgY2xhc3M9XFxcInNzLXBvc3QtaW5uZXJcXFwiPlxcblxcbiAgPHNwYW4gY2xhc3M9XFxcInNzLXBvc3Qtc3BhY2VyXFxcIj48L3NwYW4+XFxuXFxuXCI7XG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZXZfbWV0YSA6IGRlcHRoMCksIHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOnRoaXMucHJvZ3JhbSgxLCBkYXRhKSxcImludmVyc2VcIjp0aGlzLm5vb3AsXCJkYXRhXCI6ZGF0YX0pO1xuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICBidWZmZXIgKz0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcInNzLXBvc3QtY29udGVudFxcXCI+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJzcy1wb3N0LXNvY2lhbC1pY29uXFxcIj48aSBjbGFzcz1cXFwic3MtaWNvbi1cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnNlcnZpY2VfbmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2VydmljZV9uYW1lIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInNlcnZpY2VfbmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPjwvaT48L3NwYW4+XFxuICAgIDxkaXYgY2xhc3M9XFxcInNzLXBvc3QtY29udGVudC1pbm5lclxcXCI+XFxuICAgICAgXCI7XG4gIHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZm9ybWF0dGVkX2NhcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmZvcm1hdHRlZF9jYXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImZvcm1hdHRlZF9jYXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PjwhLS0gLnNzLXBvc3QtY29udGVudCAtLT5cXG5cXG5cIjtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmhhc19tZWRpYSA6IGRlcHRoMCksIHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOnRoaXMucHJvZ3JhbSgzLCBkYXRhKSxcImludmVyc2VcIjp0aGlzLm5vb3AsXCJkYXRhXCI6ZGF0YX0pO1xuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICBidWZmZXIgKz0gXCJcXG4gIDxkaXYgY2xhc3M9XFxcInNzLXBvc3QtYWN0aW9uc1xcXCI+XFxuICAgIFwiO1xuICBzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmFjdGlvbnMgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFjdGlvbnMgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiYWN0aW9uc1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpO1xuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICBidWZmZXIgKz0gXCJcXG4gIDwvZGl2PjwhLS0gLnNzLXBvc3QtYWN0aW9ucyAtLT5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInNzLXBvc3Qtc3RhdHVzXFxcIj5cXG4gICAgXCI7XG4gIHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuc3RhdHVzX2ljb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnN0YXR1c19pY29uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInN0YXR1c19pY29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIHJldHVybiBidWZmZXIgKyBcIlxcbiAgPC9kaXY+PCEtLSAuc3MtcG9zdC1zdGF0dXMgLS0+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJzcy1wb3N0LWZvb3RlclxcXCI+XFxuICAgIDxhIGhyZWY9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudXNlcl9saW5rIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC51c2VyX2xpbmsgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwidXNlcl9saW5rXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgY2xhc3M9XFxcInNzLWF2YXRhclxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPiA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hdmF0YXIgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmF2YXRhciA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJhdmF0YXJcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIi8+IDwvYT5cXG4gICAgPGEgaHJlZj1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy51c2VyX2xpbmsgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnVzZXJfbGluayA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ1c2VyX2xpbmtcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBjbGFzcz1cXFwic3MtaGFuZGxlXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+QFwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuc2NyZWVuX25hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnNjcmVlbl9uYW1lIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInNjcmVlbl9uYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvYT5cXG4gICAgPGEgaHJlZj1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5wZXJtYWxpbmsgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnBlcm1hbGluayA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJwZXJtYWxpbmtcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBjbGFzcz1cXFwic3MtcG9zdC10aW1lXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxuICAgICAgPHNwYW4gZGF0YS1saXZlc3RhbXA9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGltZXN0YW1wIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aW1lc3RhbXAgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwidGltZXN0YW1wXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PC9zcGFuPlxcbiAgICA8L2E+XFxuICA8L2Rpdj48IS0tIC5zcy1wb3N0LWZvb3RlciAtLT5cXG5cXG48L2Rpdj48IS0tIC5zcy1wb3N0LWlubmVyIC0tPlxcblwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzQ29tcGlsZXIudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNixcIj49IDIuMC4wLWJldGEuMVwiXSxcIm1haW5cIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHJldHVybiBcIlxcbjxkaXYgY2xhc3M9XFxcInNzLXBvc3RzXFxcIj48L2Rpdj5cXG5cXG48ZGl2IGNsYXNzPVxcXCJzcy1pbmZpbml0ZS1zY3JvbGwtbG9hZGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJzcy1pbm5lci10ZXh0XFxcIj5ObyBtb3JlIGNvbnRlbnQgdG8gbG9hZC48L2Rpdj48L2Rpdj5cXG5cXG48ZGl2IGNsYXNzPVxcXCJzcy1mb290ZXJcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwic3MtY3JlZGl0c1xcXCI+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJzcy1wb3dlcmVkLWJ5XFxcIj5Qb3dlcmVkIGJ5PC9zcGFuPlxcbiAgICA8YSBocmVmPVxcXCJodHRwOi8vc29jaWFsc3RyZWFtcy5jb21cXFwiIGNsYXNzPVxcXCJzcy1mb290ZXItbG9nb1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlxcbiAgICAgICA8c3BhbiBjbGFzcz1cXFwic3MtZm9vdGVyLWxvZ28tdGV4dFxcXCI+U29jaWFsIFN0cmVhbXM8L3NwYW4+XFxuICAgIDwvYT5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblxcblwiO1xuICB9LFwidXNlRGF0YVwiOnRydWV9KTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5BcHAgICAgICAgPSByZXF1aXJlICdhcHAnXG5Nb2Rlcm5penIgPSByZXF1aXJlICdtb2Rlcm5penInXG5hbGVydGlmeSAgPSByZXF1aXJlICdhbGVydGlmeSdcblxuQXBwLm1vZHVsZSAnU1NQb3N0cycsIChTU1Bvc3RzLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTUG9zdHMuVmlld3MuUG9zdEl0ZW1WaWV3IGV4dGVuZHMgQXBwLlZpZXdzLkJhc2VJdGVtVmlld1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuLi9UZW1wbGF0ZXMvUG9zdEl0ZW1WaWV3VGVtcGxhdGUnKVxuXG4gICAgaW5pdGlhbGl6ZTogPT5cblxuICAgICAgQGxpc3RlblRvIEBtb2RlbCwgJ2NoYW5nZTpzdGF0dXMnLCBAb25TdGF0dXNDaGFuZ2VcblxuICAgIGNsYXNzTmFtZTogPT5cblxuICAgICAgIyBzZXQgY2xhc3MgYmFzZWQgb24gY2hpbGQgaW5kZXhcbiAgICAgIGNsYXNzZXMgPSBbJ3NzLXBvc3QnXVxuXG4gICAgICAjIGNoZWNrIGlmIHRoZSBvcHRpb25zIG1vZHVsZSB3YXMgbG9hZGVkXG4gICAgICBpZiBBcHAuU1NPcHRpb25zP1xuICAgICAgICBzc09wdGlvbnMgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb25zJ1xuXG4gICAgICAgIGlmIHNzT3B0aW9ucy5nZXQoJ2Rldl9tb2RlJylcbiAgICAgICAgICBjbGFzc2VzLnB1c2ggJ3NzLWRldidcblxuICAgICAgaWYgQG1vZGVsLmdldCgnaGFzX21lZGlhJylcbiAgICAgICAgY2xhc3Nlcy5wdXNoICdzcy1oYXMtbWVkaWEnXG5cbiAgICAgIGlmIEBtb2RlbC5nZXQoJ2hhc192aWRlbycpXG4gICAgICAgIGNsYXNzZXMucHVzaCAnc3MtaGFzLXZpZGVvJ1xuXG4gICAgICBpZiBAbW9kZWwuZ2V0KCdkdXBsaWNhdGUnKVxuICAgICAgICBjbGFzc2VzLnB1c2ggJ3NzLWR1cGxpY2F0ZSdcblxuICAgICAgIyBzZXJ2aWNlIGNsYXNzXG4gICAgICBjbGFzc2VzLnB1c2ggJ3NzLScgKyBAbW9kZWwuZ2V0KCdzZXJ2aWNlX25hbWUnKVxuXG4gICAgICAjIHN0YXR1cyBjbGFzc1xuICAgICAgY2xhc3Nlcy5wdXNoICdzcy1zdGF0dXMtJyArIEBtb2RlbC5nZXQoJ3N0YXR1cycpXG5cbiAgICAgIGNsYXNzZXMuam9pbiAnICdcblxuXG4gICAgYXR0cmlidXRlczogPT5cbiAgICAgICdkYXRhLWlkJzogQG1vZGVsLmdldCAnb3JkZXJfaWQnXG5cbiAgICBvblJlbmRlcjogPT5cblxuICAgICAgI2lmIHZpZGVvXG4gICAgICBpZiBAbW9kZWwuZ2V0KCdoYXNfdmlkZW8nKT9cblxuICAgICAgICAjIE11dGUgdmlkZW9cbiAgICAgICAgQCQoJ3ZpZGVvJykucHJvcCAnbXV0ZWQnLCB0cnVlXG5cblxuICAgICAgIyBjaGVjayBpZiBpdCBpcyBtb2JpbGUgb3IgdGFibGV0XG4gICAgICBpZiBNb2Rlcm5penIudG91Y2hldmVudHM/IGFuZCBNb2Rlcm5penIudG91Y2hldmVudHMgaXMgdHJ1ZVxuXG4gICAgICAgICMgYmluZCB0aGUgY2xpY2sgZXZlbnQgdG8gdGhlIGEgdGFnIHNvIGlPUyBjYW4gZmlyZSB0aGUgY2xpY2sgZXZlbnRcbiAgICAgICAgQCRlbC5vbiAnY2xpY2snLCAnYScsIEBvbkNsaWNrQW5jaG9yXG5cbiAgICAgICAgIyBiaW5kIHRoZSBlbGVtZW50IHdpdGggdGFwcHlcbiAgICAgICAgQCRlbC5vbiAndGFwJywgQG9uVGFwXG5cbiAgICAgIGVsc2VcbiAgICAgICAgI2lmIHZpZGVvXG4gICAgICAgIGlmIEBtb2RlbC5nZXQoJ2hhc192aWRlbycpP1xuICAgICAgICAgICMgc2V0IHZpZGVvIHNyY1xuICAgICAgICAgIEAkKCd2aWRlbycpLmF0dHIgXCJzcmNcIiwgQCQoJ3ZpZGVvJykuZGF0YShcInNyY1wiKVxuXG4gICAgICAgICMgZG8gdGhlIGRlc2t0b3AgZXZlbnRzXG4gICAgICAgIEAkZWwub24gJ21vdXNlZW50ZXIgbW91c2VsZWF2ZScsICcuc3MtcG9zdC1pbm5lcicsIEBvbk1vdXNlb3ZlclxuICAgICAgICBAJGVsLm9uICdjbGljaycsICcuc3MtcHVibGlzaC1idG4sIC5zcy10cmFzaC1idG4nLCBAb25DbGlja1RvZ2dsZVN0YXR1c1xuXG5cbiAgICBvbkNsaWNrQW5jaG9yOiAoIGV2ZW50ICkgPT5cblxuICAgICAgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldClcbiAgICAgICR0YXJnZXQuYWRkQ2xhc3MoICdjbGljay1maXJlZCcgKVxuXG4gICAgICAjIGNoZWNrIGlmIHRoZSBhIHRhZyBoYXMgdGhlIHB1Ymxpc2ggb3IgdHJhc2ggY2xhc3Nlc1xuICAgICAgIyBpZiBpdCBkb2VzLCB0cmlnZ2VyIHRoZSBzdGF0dXMgY2hhbmdlIGZ1bmN0aW9uXG4gICAgICBpZiAkdGFyZ2V0Lmhhc0NsYXNzKCAnc3MtcHVibGlzaC1idG4nICkgb3IgJHRhcmdldC5oYXNDbGFzcyggJ3NzLXRyYXNoLWJ0bicgKVxuICAgICAgICBAb25DbGlja1RvZ2dsZVN0YXR1cyhldmVudClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgICMgdHJpZ2dlciB0aGUgYSB0YWcgZm9yIHRoZSBsaW5rcyBpbnNpZGUgdGhlIHBvc3QgbWFudWFsbHlcbiAgICAgIGhyZWYgPSAkdGFyZ2V0LmF0dHIoICdocmVmJyApXG5cbiAgICAgIHRhcmdldEF0dHIgPSAkdGFyZ2V0LmF0dHIoICd0YXJnZXQnIClcbiAgICAgIGlmIG5vdCB0YXJnZXRBdHRyP1xuICAgICAgICB0YXJnZXRBdHRyID0gJydcblxuICAgICAgIyBvcGVuIHRoZSBsaW5rIGluIGEgbmV3IHRhYlxuICAgICAgd2luZG93Lm9wZW4gaHJlZiwgdGFyZ2V0QXR0clxuXG4gICAgb25UYXA6ICggZXZlbnQgKSA9PlxuXG4gICAgICAkdGFyZ2V0ID0gJCggZXZlbnQudGFyZ2V0IClcbiAgICAgICRjdXJyZW50VGFyZ2V0ID0gJCggZXZlbnQuY3VycmVudFRhcmdldCApXG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIHRhcmdldCBpcyBhbiBhIHRhZyBvciBpZiB0aGUgcGFyZW50IGlzIGFuIGEgdGFnXG4gICAgICBpZiAkdGFyZ2V0LmlzKCAnYScgKSBvciAkdGFyZ2V0LnBhcmVudHMoICdhJyApLmxlbmd0aCA+IDBcblxuICAgICAgICBzZXRUaW1lb3V0IC0+XG5cbiAgICAgICAgICAjIGJlZm9yZSBnb2luZyBpbnNpZGUgdGhlIHNldHRpbWVvdXQgZnVuY3Rpb24sIGl0IHdpbGwgZmlyc3QgdHJpZ2dlciBhIGNsaWNrIGV2ZW50IGZvciB0aGUgYSB0YWdcbiAgICAgICAgICAjIHdoaWNoIGFkZHMgdGhlICdjbGljay1maXJlZCcgY2xhc3NcbiAgICAgICAgICAjIHNvIHdlIGNoZWNrIGlmIHRoZSBhIHRhZyBoYXMgdGhhdCBjbGFzcyBhbmQgbWFudWFsbHkgdHJpZ2dlciB0aGUgY2xpY2sgZXZlbnRcbiAgICAgICAgICBpZiBub3QgJHRhcmdldC5oYXNDbGFzcyggJ2NsaWNrLWZpcmVkJyApXG4gICAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUNsYXNzKCAnY2xpY2stZmlyZWQnICkuY2xpY2soKVxuICAgICAgICAsIDBcblxuICAgICAgICByZXR1cm5cblxuICAgICAgIyBjaGVjayBpZiB3ZSBoYXZlIHRoZSB0YXAgY2xhc3MgaW4gdGhlIGN1cnJlbnQgdGFyZ2V0XG4gICAgICBoYXNUYXBDbGFzcyA9ICRjdXJyZW50VGFyZ2V0Lmhhc0NsYXNzKCAndGFwJyApXG4gICAgICAkKCAnLnNzLXBvc3QudGFwJyApLnJlbW92ZUNsYXNzKCAndGFwJyApXG4gICAgICAkY3VycmVudFRhcmdldC50b2dnbGVDbGFzcyAndGFwJywgbm90IGhhc1RhcENsYXNzXG5cbiAgICBvbkNsaWNrVG9nZ2xlU3RhdHVzOiAoZXZlbnQpID0+XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgIyBTZXQgZGVmYXVsdCBzdGF0dXNcbiAgICAgIHN0YXR1cyA9ICdwdWJsaXNoJ1xuICAgICAgaWYgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnc3MtdHJhc2gtYnRuJylcbiAgICAgICAgc3RhdHVzID0gJ3RyYXNoJ1xuXG4gICAgICBjdXJyZW50U3RhdHVzID0gQG1vZGVsLmdldCgnc3RhdHVzJylcblxuICAgICAgaWYgY3VycmVudFN0YXR1cyBpcyBzdGF0dXNcblxuICAgICAgICBAbW9kZWwuc2V0XG4gICAgICAgICAgc3RhdHVzOiAnJ1xuICAgICAgICAsXG4gICAgICAgICAgc2lsZW50OiB0cnVlXG5cbiAgICAgICAgQG1vZGVsLnNldFxuICAgICAgICAgIHN0YXR1czogc3RhdHVzXG5cbiAgICAgIGVsc2VcblxuICAgICAgICBAbW9kZWwuc2F2ZVxuICAgICAgICAgIHN0YXR1czogc3RhdHVzXG5cblxuICAgIG9uTW91c2VvdmVyOiAoZXZlbnQpID0+XG5cbiAgICAgIGhvdmVyID0gZmFsc2VcbiAgICAgIGlmIGV2ZW50LnR5cGUgPT0gJ21vdXNlZW50ZXInIG9yIGV2ZW50LnR5cGUgPT0gJ3RhcCdcbiAgICAgICAgaG92ZXIgPSB0cnVlXG5cbiAgICAgIEB0b2dnbGVFbCBAJCgnLnNzLXBvc3QtbWVkaWEnKSwgbm90IGhvdmVyXG4gICAgICBAdG9nZ2xlRWwgQCQoJy5zcy1wb3N0LWFjdGlvbnMnKSwgaG92ZXJcblxuICAgICAgQCRlbC50b2dnbGVDbGFzcyAnc3MtaG92ZXInLCBob3ZlclxuXG4gICAgICAjIGNoZWNrIGlmIGl0IGlzIG1vYmlsZSBvciB0YWJsZXRcbiAgICAgIGlmIE1vZGVybml6ci50b3VjaGV2ZW50cz8gYW5kIE1vZGVybml6ci50b3VjaGV2ZW50cyBpcyB0cnVlXG4gICAgICAgIEAkZWwucGFyZW50KCkudG9nZ2xlQ2xhc3MgJ3RhcCcsIGhvdmVyXG5cblxuICAgIHRvZ2dsZUVsOiAoJGVsLCB0b2dnbGUpIC0+XG5cbiAgICAgIGNzc1N0YXJ0ID0ge31cbiAgICAgIGFuaW1hdGUgPSB7fVxuICAgICAgY3NzRW5kID0ge31cblxuICAgICAgIyBmYWRlIGluL291dCBpbWFnZVxuICAgICAgaWYgdG9nZ2xlXG5cbiAgICAgICAgY3NzU3RhcnQgPVxuICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICAgICAgICBvcGFjaXR5OiAwXG5cbiAgICAgICAgYW5pbWF0ZSA9XG4gICAgICAgICAgb3BhY2l0eTogMVxuXG4gICAgICBlbHNlXG5cbiAgICAgICAgY3NzU3RhcnQgPVxuICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcblxuICAgICAgICBhbmltYXRlID1cbiAgICAgICAgICBvcGFjaXR5OiAwXG5cbiAgICAgICAgY3NzRW5kID1cbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcblxuICAgICAgJGVsXG4gICAgICAgIC5zdG9wKDAsMClcbiAgICAgICAgLmNzcyggY3NzU3RhcnQgKVxuICAgICAgICAuYW5pbWF0ZSBhbmltYXRlLCAyMDAsIC0+XG4gICAgICAgICAgJGVsLmNzcyggY3NzRW5kIClcblxuXG5cbiAgICBvblN0YXR1c0NoYW5nZTogKG1vZGVsLCBzdGF0dXMpID0+XG5cbiAgICAgICMgZ2V0IHByZXZpb3VzIHN0YXR1c1xuICAgICAgcHJldlN0YXR1cyA9ICdwdWJsaXNoJ1xuICAgICAgaWYgQCRlbC5oYXNDbGFzcygnc3Mtc3RhdHVzLWRyYWZ0JylcbiAgICAgICAgcHJldlN0YXR1cyA9ICdkcmFmdCdcbiAgICAgIGlmIEAkZWwuaGFzQ2xhc3MoJ3NzLXN0YXR1cy10cmFzaCcpXG4gICAgICAgIHByZXZTdGF0dXMgPSAndHJhc2gnXG5cbiAgICAgIGRvaW5nQmF0Y2hTYXZlID0gU1NQb3N0cy5yZXFyZXMucmVxdWVzdCAnZG9pbmdCYXRjaFNhdmUnXG4gICAgICB1c2VyTWV0YSA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ3VzZXJNZXRhJ1xuXG4gICAgICBtZXNzYWdlID0gJydcblxuICAgICAgc3dpdGNoIHByZXZTdGF0dXMgKyAnLScgKyBzdGF0dXNcblxuICAgICAgICB3aGVuICdwdWJsaXNoLXB1Ymxpc2gnXG5cbiAgICAgICAgICBpZiBub3QgZG9pbmdCYXRjaFNhdmVcbiAgICAgICAgICAgIG1vZGVyYXRpb24gPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAnbW9kZXJhdGlvbidcbiAgICAgICAgICAgIGlmIG5vdCBtb2RlcmF0aW9uXG4gICAgICAgICAgICAgIGlmIG5vdCB1c2VyTWV0YS5nZXQoJ3B1Ymxpc2hQb3B1cCcpXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiPGgxPjxpIGNsYXNzPSdzcy1pY29uLWNoZWNrJz48L2k+PC9oMT48aDM+VGhpcyBwb3N0IGlzIGFscmVhZHkgYXBwcm92ZWQuPC9oMz4gPGJyIC8+IFRvIHR1cm4gQXV0by1BcHByb3ZlIDxzdHJvbmc+T0ZGPC9zdHJvbmc+IHNlZSB0aGUgPGk+YWR2YW5jZWQgc2V0dGluZ3M8L2k+IDxpIGNsYXNzPSdzcy1pY29uLWNvZyc+PC9pPlwiXG4gICAgICAgICAgICAgICAgdXNlck1ldGEuc2F2ZVxuICAgICAgICAgICAgICAgICAgcHVibGlzaFBvcHVwOiB0cnVlXG5cbiAgICAgICAgd2hlbiAncHVibGlzaC10cmFzaCcsICdkcmFmdC10cmFzaCdcblxuICAgICAgICAgIGlmIG5vdCBkb2luZ0JhdGNoU2F2ZSBhbmQgbm90IHVzZXJNZXRhLmdldCgndHJhc2hQb3B1cCcpXG4gICAgICAgICAgICBtZXNzYWdlID0gXCI8aDE+PGkgY2xhc3M9J3NzLWljb24tdHJhc2gtbyc+PC9pPjwvaDE+PGgzPlRoaXMgcG9zdCBpcyB0cmFzaGVkITwvaDM+IDxiciAvPiA8aDM+VG8gcmVzY3VlIHRoaXMgcG9zdCBjbGljayA8aT5WaWV3IFRyYXNoPC9pPiA8aSBjbGFzcz0nc3MtaWNvbi10cmFzaC1vJz48L2k+PC9oMz4gPGJyLz4gWW91IHdpbGwgbm90IHNlZSB0aGlzIG1lc3NhZ2UgYWdhaW4uXCJcbiAgICAgICAgICAgIHVzZXJNZXRhLnNhdmVcbiAgICAgICAgICAgICAgdHJhc2hQb3B1cDogdHJ1ZVxuXG4gICAgICAgICAgIyByZW1vdmUgaXRlbSBmcm9tIGxpc3QgKGRvIGFuaW1hdGlvbilcbiAgICAgICAgICBAJGVsLmFkZENsYXNzICdzcy10cmFzaGluZydcblxuICAgICAgICAgIEAkZWwuZmFkZU91dCA1MDAsID0+XG4gICAgICAgICAgICBAcmVtb3ZlKClcblxuXG4gICAgICAgIHdoZW4gJ2RyYWZ0LXB1Ymxpc2gnXG5cbiAgICAgICAgICBAcmVuZGVyKClcbiAgICAgICAgICBAJGVsLmF0dHIoJ2NsYXNzJywgXy5yZXN1bHQoQCwgJ2NsYXNzTmFtZScpKVxuXG4gICAgICAgICAgQCRlbC5hZGRDbGFzcyAnc3MtcHVibGlzaGluZydcbiAgICAgICAgICBAJCgnLnNzLXBvc3Qtc3BhY2VyJykuZmFkZU91dCA1MDAsID0+XG4gICAgICAgICAgICBAJGVsLnJlbW92ZUNsYXNzICdzcy1wdWJsaXNoaW5nJ1xuICAgICAgICAgICAgQCQoJy5zcy1wb3N0LXNwYWNlcicpLnNob3coKVxuXG5cbiAgICAgICAgd2hlbiAndHJhc2gtcHVibGlzaCdcblxuICAgICAgICAgICMgcmVtb3ZlIGl0ZW0gZnJvbSBsaXN0IChkbyBhbmltYXRpb24pXG4gICAgICAgICAgQCRlbC5hZGRDbGFzcyAnc3MtcHVibGlzaGluZydcbiAgICAgICAgICBAJGVsLmZhZGVPdXQgNTAwLCA9PlxuICAgICAgICAgICAgQHJlbW92ZSgpXG5cbiAgICAgICAgd2hlbiAndHJhc2gtdHJhc2gnXG5cbiAgICAgICAgICAjIGRvIG5vdGhpbmdcblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgICBAcmVuZGVyKClcbiAgICAgICAgICBAJGVsLmF0dHIoJ2NsYXNzJywgXy5yZXN1bHQoQCwgJ2NsYXNzTmFtZScpKVxuXG5cbiAgICAgICMgSUYgTU9ERUwgSVMgUFVCTElTSCBPUiBUUkFTSCBBTEVSVCAobm90IGRyYWZ0KVxuICAgICAgaWYgbWVzc2FnZSBpc250ICcnIGFuZCBhbGVydGlmeT9cbiAgICAgICAgYWxlcnRpZnkuYWxlcnQgJycsIG1lc3NhZ2VcblxuIiwiJ3VzZSBzdHJpY3QnXG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxucmVxdWlyZSAnLi9Qb3N0SXRlbVZpZXcnXG5cbkFwcC5tb2R1bGUgJ1NTUG9zdHMnLCAoU1NQb3N0cywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU1Bvc3RzLlZpZXdzLlBvc3RzQ29tcG9zaXRlVmlldyBleHRlbmRzIEFwcC5WaWV3cy5JbmZpbml0ZVNjcm9sbENvbXBvc2l0ZVZpZXdcblxuICAgIHRlbXBsYXRlOiByZXF1aXJlICcuLi9UZW1wbGF0ZXMvUG9zdHNDb21wb3NpdGVWaWV3VGVtcGxhdGUnXG5cbiAgICBjbGFzc05hbWU6IC0+XG4gICAgICBjbGFzc05hbWUgPSAnc3Mtd3JhcHBlcidcblxuICAgICAgIyBhZGQgY2xhc3MgaWYgdGhlIHBvc3RzIGFyZSBjb21pbmcgZnJvbSB0aGUgQlcgQVBJXG4gICAgICBpZiBAY29sbGVjdGlvbj8gYW5kIEBjb2xsZWN0aW9uIGluc3RhbmNlb2YgU1NQb3N0cy5Db2xsZWN0aW9ucy5BcGlQb3N0c0NvbGxlY3Rpb25cbiAgICAgICAgY2xhc3NOYW1lICs9ICcgc3MtYXBpLXBvc3RzJ1xuXG4gICAgICAjIGNoZWNrIGlmIHRoZSBvcHRpb25zIG1vZHVsZSB3YXMgbG9hZGVkXG4gICAgICBpZiBBcHAuU1NPcHRpb25zP1xuICAgICAgICBzc09wdGlvbnMgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb25zJ1xuXG4gICAgICAgICMgY29uc29sZS5sb2cgc3NPcHRpb25zLnRvSlNPTigpXG5cbiAgICAgICAgaWYgc3NPcHRpb25zLmdldCgndXNlcl9jYW5fbW9kZXJhdGUnKVxuICAgICAgICAgIGNsYXNzTmFtZSArPSAnIHNzLW1vZGVyYXRpb24nXG5cbiAgICAgICAgaWYgc3NPcHRpb25zLmdldCgnaXNfYWRtaW4nKVxuICAgICAgICAgIGNsYXNzTmFtZSArPSAnIHNzLWlzLWFkbWluJ1xuXG4gICAgICBjbGFzc05hbWVcblxuXG4gICAgaXRlbVZpZXdDb250YWluZXI6ICcuc3MtcG9zdHMnXG5cbiAgICBpdGVtVmlldzogU1NQb3N0cy5WaWV3cy5Qb3N0SXRlbVZpZXdcblxuICAgIHNjcm9sbENvbnRhaW5lcjogJ3dpbmRvdydcblxuXG4gICAgX2dldENoaWxkVmlld0VsRnJvbU1vZGVsOiAobW9kZWwpID0+XG5cbiAgICAgIEAkKEBpdGVtVmlld0NvbnRhaW5lcikuZmluZCgnW2RhdGEtaWQ9XCInICsgbW9kZWwuZ2V0KCdvcmRlcl9pZCcpICsgJ1wiXScpXG5cblxuICAgIGluaXRpYWxpemU6ID0+XG5cbiAgICAgICMjI1xuICAgICAgTGlzdGVuIGZvciB3aWR0aCBjaGFuZ2VzIHRvIHJlc2V0IHRoZSBudW1iZXIgb2YgY29sdW1uc1xuICAgICAgIyMjXG4gICAgICBAbGlzdGVuVG8gQXBwLkhlbHBlcnMuZW52LCAnY2hhbmdlOndpZHRoJywgQG9uQ2hhbmdlRW52V2lkdGhcbiAgICAgIEBsaXN0ZW5UbyBAbW9kZWwsICdjaGFuZ2U6d2lkdGgnLCBAb25DaGFuZ2VXaWR0aFxuXG4gICAgICAjIGNhbGwgdGhlIHBhcmVudCdzIGNvbnN0cnVjdG9yXG4gICAgICBTU1Bvc3RzLlZpZXdzLlBvc3RzQ29tcG9zaXRlVmlldy5fX3N1cGVyX18uaW5pdGlhbGl6ZS5hcHBseSBALCBhcmd1bWVudHNcblxuXG4gICAgb25SZW5kZXI6ID0+XG4gICAgICBAb25DaGFuZ2VFbnZXaWR0aCgpXG4gICAgICBAJGVsLmF0dHIgJ2NsYXNzJywgXy5yZXN1bHQoQCwgJ2NsYXNzTmFtZScpXG5cbiAgICAgIFNTUG9zdHMuVmlld3MuUG9zdHNDb21wb3NpdGVWaWV3Ll9fc3VwZXJfXy5vblJlbmRlci5hcHBseSBALCBhcmd1bWVudHNcblxuXG4gICAgb25DaGFuZ2VFbnZXaWR0aDogPT5cbiAgICAgICMgY29uc29sZS5sb2cgJ29uQ2hhbmdlRW52V2lkdGgnXG5cbiAgICAgIHBhcmVudFdpZHRoID0gbnVsbFxuICAgICAgaWYgQCRlbD8gYW5kIEAkZWwucGFyZW50KCkubGVuZ3RoID4gMFxuICAgICAgICBwYXJlbnRXaWR0aCA9IEAkZWwucGFyZW50KCkud2lkdGgoKVxuXG4gICAgICBpZiBub3QgcGFyZW50V2lkdGg/IG9yIHBhcmVudFdpZHRoIGlzIDBcbiAgICAgICAgc2V0VGltZW91dCBAb25DaGFuZ2VFbnZXaWR0aCwgMjAwXG4gICAgICAgIHJldHVyblxuXG4gICAgICAjIGlmIHRoZSB3aWR0aCBpcyBzZXQsIHByb2NlZGUgd2l0aCB0aGUgbGF5b3V0IGNoZWNrc1xuICAgICAgQG1vZGVsLnNldCAnd2lkdGgnLCBwYXJlbnRXaWR0aFxuXG5cbiAgICBvbkNoYW5nZVdpZHRoOiA9PlxuXG4gICAgICBsYXlvdXQgPSBAbW9kZWwuZ2V0KCdsYXlvdXQnKVxuXG4gICAgICAjIGNvbnNvbGUubG9nICdvbkNoYW5nZVdpZHRoJywgbGF5b3V0XG5cbiAgICAgIGlmIG5vdCBsYXlvdXQ/XG4gICAgICAgIHJldHVyblxuXG4gICAgICBpZiBub3QgQGN1cnJlbnRMYXlvdXQ/XG4gICAgICAgIEBjdXJyZW50TGF5b3V0ID0gJydcblxuICAgICAgaWYgbGF5b3V0IGlzIEBjdXJyZW50TGF5b3V0XG4gICAgICAgIHJldHVyblxuXG4gICAgICBAY3VycmVudExheW91dCA9IGxheW91dFxuXG4gICAgICAjIHNldCBkYXRhIGxheW91dFxuICAgICAgQCRlbC5hdHRyICdkYXRhLWxheW91dCcsIGxheW91dFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbnJlcXVpcmUgJy4vU1NQb3N0cydcblxuIyBNb2RlbHNcbnJlcXVpcmUgJy4vTW9kZWxzL1Bvc3RNb2RlbCdcbnJlcXVpcmUgJy4vTW9kZWxzL1Bvc3RzTGF5b3V0TW9kZWwnXG5cbiMgQ29sbGVjdGlvbnNcbnJlcXVpcmUgJy4vQ29sbGVjdGlvbnMvUG9zdHNDb2xsZWN0aW9uJ1xucmVxdWlyZSAnLi9Db2xsZWN0aW9ucy9BcGlQb3N0c0NvbGxlY3Rpb24nXG5cbiMgVmlld3NcbnJlcXVpcmUgJy4vVmlld3MvUG9zdEl0ZW1WaWV3J1xucmVxdWlyZSAnLi9WaWV3cy9Qb3N0c0NvbXBvc2l0ZVZpZXcnXG5cbiMgQ29udHJvbGxlcnNcbnJlcXVpcmUgJy4vQ29udHJvbGxlcnMvUG9zdHNDb250cm9sbGVyJ1xucmVxdWlyZSAnLi9Db250cm9sbGVycy9BdXRvUmVsb2FkQ29udHJvbGxlcidcblxuXG5BcHAubW9kdWxlICdTU1Bvc3RzJywgKFNTUG9zdHMsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgU1NQb3N0cy5hZGRJbml0aWFsaXplciAtPlxuXG4gICAgcG9zdHNDb250cm9sbGVyID0gbmV3IFNTUG9zdHMuQ29udHJvbGxlcnMuUG9zdHNDb250cm9sbGVyKClcbiAgICBhdXRvUmVsb2FkQ29udHJvbGxlciA9IG5ldyBTU1Bvc3RzLkNvbnRyb2xsZXJzLkF1dG9SZWxvYWRDb250cm9sbGVyKClcblxuICAgICMjI1xuICAgIERlZmluZSBNb2R1bGUgQVBJXG4gICAgIyMjXG4gICAgU1NQb3N0cy5yZXFyZXMuc2V0SGFuZGxlciAncG9zdHNDb2xsZWN0aW9uJywgcG9zdHNDb250cm9sbGVyLmdldFBvc3RzQ29sbGVjdGlvblxuICAgIFNTUG9zdHMucmVxcmVzLnNldEhhbmRsZXIgJ2FwaVBvc3RzQ29sbGVjdGlvbicsIHBvc3RzQ29udHJvbGxlci5nZXRBcGlQb3N0c0NvbGxlY3Rpb25cbiAgICBTU1Bvc3RzLnJlcXJlcy5zZXRIYW5kbGVyICdwb3N0c0NvbXBvc2l0ZVZpZXcnLCBwb3N0c0NvbnRyb2xsZXIuZ2V0UG9zdHNDb21wb3NpdGVWaWV3XG4gICAgU1NQb3N0cy5yZXFyZXMuc2V0SGFuZGxlciAnYWxsUG9zdHNDb2xsZWN0aW9uJywgcG9zdHNDb250cm9sbGVyLmdldEFsbFBvc3RzQ29sbGVjdGlvblxuXG4gICAgU1NQb3N0cy5yZXFyZXMuc2V0SGFuZGxlciAnZG9pbmdCYXRjaFNhdmUnLCBwb3N0c0NvbnRyb2xsZXIuZG9pbmdCYXRjaFNhdmVcbiAgICBTU1Bvc3RzLmNvbW1hbmRzLnNldEhhbmRsZXIgJ2RvaW5nQmF0Y2hTYXZlJywgcG9zdHNDb250cm9sbGVyLmRvaW5nQmF0Y2hTYXZlXG4gICAgU1NQb3N0cy5jb21tYW5kcy5zZXRIYW5kbGVyICdmZXRjaFNlcnZlclBvc3RzJywgcG9zdHNDb250cm9sbGVyLmZldGNoU2VydmVyUG9zdHNcbiAgICBTU1Bvc3RzLmNvbW1hbmRzLnNldEhhbmRsZXIgJ2ZldGNoQXBpUG9zdHMnLCBwb3N0c0NvbnRyb2xsZXIuZmV0Y2hBcGlQb3N0c1xuICAgIFNTUG9zdHMuY29tbWFuZHMuc2V0SGFuZGxlciAncHVibGlzaEFwaVBvc3RzJywgcG9zdHNDb250cm9sbGVyLnB1Ymxpc2hBcGlQb3N0c1xuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuQXBwICAgICAgICA9IHJlcXVpcmUgXCJhcHBcIlxuSGFuZGxlYmFycyA9IHJlcXVpcmUgXCJoYnNmeS9ydW50aW1lXCJcblxuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyICd0b1RpdGxlQ2FzZScsIChzdHIpIC0+XG4gIHN0ci5yZXBsYWNlIC9cXHdcXFMqL2csICh0eHQpIC0+XG4gICAgdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCAgICAgID0gcmVxdWlyZSBcImFwcFwiXG5CYWNrYm9uZSA9IHJlcXVpcmUgXCJiYWNrYm9uZVwiXG4kICAgICAgICA9IHJlcXVpcmUgXCJqcXVlcnlcIlxuXG5jbGFzcyBBcHAuVmlld3MuQmFzZUNvbXBvc2l0ZVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcblxuICByZW5kZXJGcm9tRE9NOiAoZWwpID0+XG5cbiAgICBpZiBub3QgZWw/XG4gICAgICByZXR1cm4gQFxuXG4gICAgIyBhc3NpZ24gZG9tIGVsZW1lbnQgdG8gdmlld1xuICAgIGlmIGVsIGluc3RhbmNlb2YgJFxuICAgICAgaWYgZWwubGVuZ3RoID4gMFxuICAgICAgICBAZWwgPSBlbFswXVxuICAgIGVsc2VcbiAgICAgIEBlbCA9IGVsXG5cbiAgICBpZiBub3QgQGVsP1xuICAgICAgcmV0dXJuIEBcblxuICAgIEAkZWwgPSAkKGVsKVxuXG4gICAgQGlzUmVuZGVyZWQgPSB0cnVlXG4gICAgQGlzQ2xvc2VkID0gZmFsc2VcbiAgICBAcmVzZXRJdGVtVmlld0NvbnRhaW5lcigpXG5cbiAgICBAdHJpZ2dlckJlZm9yZVJlbmRlcigpXG5cbiAgICBAYmluZFVJRWxlbWVudHMoKVxuICAgIEB0cmlnZ2VyTWV0aG9kKFwiY29tcG9zaXRlOm1vZGVsOnJlbmRlcmVkXCIpXG5cbiAgICBAX3JlbmRlckNoaWxkcmVuRnJvbURPTSgpXG5cbiAgICBAdHJpZ2dlck1ldGhvZChcImNvbXBvc2l0ZTpyZW5kZXJlZFwiKVxuICAgIEB0cmlnZ2VyUmVuZGVyZWQoKVxuXG4gICAgQFxuXG5cblxuICBfcmVuZGVyQ2hpbGRyZW5Gcm9tRE9NOiA9PlxuXG4gICAgaWYgQGNvbGxlY3Rpb24ubGVuZ3RoID4gMFxuXG4gICAgICBAY29sbGVjdGlvbi5lYWNoIChtb2RlbCkgLT5cblxuICAgICAgICBlbCA9IEBfZ2V0Q2hpbGRWaWV3RWxGcm9tTW9kZWwgbW9kZWxcblxuICAgICAgICAjIGFzc2lnbiBkb20gZWxlbWVudCB0byB2aWV3XG4gICAgICAgIGlmIGVsPyBhbmQgZWwgaW5zdGFuY2VvZiAkIGFuZCBlbC5sZW5ndGggPiAwXG4gICAgICAgICAgZWwgPSBlbFswXVxuXG4gICAgICAgIGlmIG5vdCBlbD9cbiAgICAgICAgICByZXR1cm5cblxuICAgICAgICB2aWV3ID0gbmV3IHRoaXMuaXRlbVZpZXdcbiAgICAgICAgICBlbDogZWxcbiAgICAgICAgICBtb2RlbDogbW9kZWxcblxuICAgICAgICAjIHNldCB1cCB0aGUgY2hpbGQgdmlldyBldmVudCBmb3J3YXJkaW5nXG4gICAgICAgIEBhZGRDaGlsZFZpZXdFdmVudEZvcndhcmRpbmcgdmlld1xuXG4gICAgICAgICMgU3RvcmUgdGhlIGNoaWxkIHZpZXcgaXRzZWxmIHNvIHdlIGNhbiBwcm9wZXJseVxuICAgICAgICAjIHJlbW92ZSBhbmQvb3IgY2xvc2UgaXQgbGF0ZXJcbiAgICAgICAgQGNoaWxkcmVuLmFkZCB2aWV3XG5cbiAgICAgICAgdmlldy50cmlnZ2VyTWV0aG9kICdyZW5kZXInXG5cbiAgICAgICwgQFxuXG5cblxuICBfZ2V0Q2hpbGRWaWV3RWxGcm9tTW9kZWw6IChtb2RlbCkgPT5cblxuICAgIEAkKEBpdGVtVmlld0NvbnRhaW5lcikuZmluZCgnW2RhdGEtaWQ9XCInICsgbW9kZWwuZ2V0KCdpZCcpICsgJ1wiXScpXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCAgICAgID0gcmVxdWlyZSBcImFwcFwiXG5CYWNrYm9uZSA9IHJlcXVpcmUgXCJiYWNrYm9uZVwiXG4kICAgICAgICA9IHJlcXVpcmUgXCJqcXVlcnlcIlxuXG5jbGFzcyBBcHAuVmlld3MuQmFzZUl0ZW1WaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5JdGVtVmlld1xuXG4gIHJlbmRlckZyb21ET006IChlbCkgPT5cblxuICAgIGlmIG5vdCBlbD9cbiAgICAgIHJldHVybiBAXG5cbiAgICAjIGFzc2lnbiBkb20gZWxlbWVudCB0byB2aWV3XG4gICAgaWYgZWwgaW5zdGFuY2VvZiAkXG4gICAgICBpZiBlbC5sZW5ndGggPiAwXG4gICAgICAgIEBlbCA9IGVsWzBdXG4gICAgZWxzZVxuICAgICAgQGVsID0gZWxcblxuICAgIGlmIG5vdCBAZWw/XG4gICAgICByZXR1cm4gQFxuXG4gICAgQCRlbCA9ICQoZWwpXG5cbiAgICBAaXNSZW5kZXJlZCA9IHRydWVcbiAgICBAaXNDbG9zZWQgPSBmYWxzZVxuXG4gICAgIyBkZWxlZ2F0ZSBET00gZXZlbnRzXG4gICAgQGRlbGVnYXRlRXZlbnRzKClcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgICAgICAgPSByZXF1aXJlIFwiYXBwXCJcbkJhY2tib25lICA9IHJlcXVpcmUgXCJiYWNrYm9uZVwiXG4kICAgICAgICAgPSByZXF1aXJlIFwianF1ZXJ5XCJcbl8gICAgICAgICA9IHJlcXVpcmUgXCJ1bmRlcnNjb3JlXCJcbk1vZGVybml6ciA9IHJlcXVpcmUgXCJtb2Rlcm5penJcIlxuXG5cbndpbmRvd1Njcm9sbEhhbmRsZXJWaWV3cyA9IHt9XG5cblxub25XaW5kb3dTY3JvbGwgPSAoZXZlbnQpIC0+XG5cbiAgZm9yIGNpZCwgdmlldyBvZiB3aW5kb3dTY3JvbGxIYW5kbGVyVmlld3NcblxuICAgIGlmIHZpZXc/IGFuZCBub3Qgdmlldy5pc0Nsb3NlZCBhbmQgdmlldy5lbD9cbiAgICAgIHZpZXcudHJpZ2dlck1ldGhvZCAnc2Nyb2xsJywgZXZlbnRcblxuXG5kZWJvdW5jZWRPbldpbmRvd1Njcm9sbCA9IF8udGhyb3R0bGUoIG9uV2luZG93U2Nyb2xsLCAzMDAgKVxuXG5iaW5kV2luZG93U2Nyb2xsRXZlbnQgPSAtPlxuXG4gICQod2luZG93KS5vbiAnc2Nyb2xsJywgZGVib3VuY2VkT25XaW5kb3dTY3JvbGxcblxuXG5iaW5kV2luZG93U2Nyb2xsRXZlbnRPbmNlID0gXy5vbmNlKCBiaW5kV2luZG93U2Nyb2xsRXZlbnQgKVxuXG5cblxuY2xhc3MgQXBwLlZpZXdzLkluZmluaXRlU2Nyb2xsQ29tcG9zaXRlVmlldyBleHRlbmRzIEFwcC5WaWV3cy5CYXNlQ29tcG9zaXRlVmlld1xuXG4gIGluaXRpYWxpemU6ID0+XG5cbiAgICByZXR1cm4gaWYgbm90IEBzY3JvbGxDb250YWluZXI/XG5cbiAgICBpZiBAY29sbGVjdGlvbj8gYW5kIEBjb2xsZWN0aW9uIGluc3RhbmNlb2YgQXBwLkNvbGxlY3Rpb25zLkluZmluaXRlU2Nyb2xsQ29sbGVjdGlvblxuXG4gICAgICBAbGlzdGVuVG8gQG1vZGVsLCAnY2hhbmdlOmxvYWRpbmcnLCBAb25Mb2FkaW5nQ2hhbmdlXG5cblxuICBvblJlbmRlcjogPT5cblxuICAgIEBiaW5kU2Nyb2xsRXZlbnQoKVxuXG5cbiAgb25DbG9zZTogPT5cblxuICAgIGlmIEBzY3JvbGxDb250YWluZXIgaXMgJ3dpbmRvdycgYW5kIHdpbmRvd1Njcm9sbEhhbmRsZXJWaWV3c1sgQGNpZCBdP1xuICAgICAgZGVsZXRlIHdpbmRvd1Njcm9sbEhhbmRsZXJWaWV3c1sgQGNpZCBdXG5cblxuICBiaW5kU2Nyb2xsRXZlbnQ6ID0+XG5cbiAgICBpZiBAc2Nyb2xsQ29udGFpbmVyIGlzICd3aW5kb3cnXG5cbiAgICAgIGJpbmRXaW5kb3dTY3JvbGxFdmVudE9uY2UoKVxuICAgICAgd2luZG93U2Nyb2xsSGFuZGxlclZpZXdzWyBAY2lkIF0gPSBAXG5cbiAgICBlbHNlXG5cbiAgICAgIGlmIEAkKCBAc2Nyb2xsQ29udGFpbmVyICkubGVuZ3RoID4gMFxuICAgICAgICBkZWJvdW5jZWRTY3JvbGwgPSBfLnRocm90dGxlKCBAb25TY3JvbGwsIDEwMCApXG4gICAgICAgIEAkKCBAc2Nyb2xsQ29udGFpbmVyICkuc2Nyb2xsIGRlYm91bmNlZFNjcm9sbFxuXG5cblxuICBvblNjcm9sbDogKGV2ZW50KSA9PlxuXG5cbiAgICAjIGdldCBzY3JvbGwgaGVpZ2h0c1xuICAgIGlmIEBzY3JvbGxDb250YWluZXIgaXMgJ3dpbmRvdydcblxuICAgICAgc2Nyb2xsSGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KClcbiAgICAgIGlubmVySGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpXG5cbiAgICAgICMgZ2V0IHNjcm9sbHRvcCBwb3NpdGlvblxuICAgICAgc2Nyb2xsVG9wID0gQXBwLkhlbHBlcnMuZW52LmdldCAnc2Nyb2xsVG9wJ1xuXG4gICAgZWxzZVxuXG4gICAgICAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KVxuXG4gICAgICBzY3JvbGxIZWlnaHQgPSAkdGFyZ2V0WzBdLnNjcm9sbEhlaWdodFxuICAgICAgaW5uZXJIZWlnaHQgPSAkdGFyZ2V0LmlubmVySGVpZ2h0KClcblxuICAgICAgIyBnZXQgc2Nyb2xsdG9wIHBvc2l0aW9uXG4gICAgICBzY3JvbGxUb3AgPSAkdGFyZ2V0LnNjcm9sbFRvcCgpXG5cblxuICAgICMgY2FsY3VsYXRlIGRpZmZlcmVudGlhbHNcbiAgICBwaXhlbHNGcm9tVG9wID0gc2Nyb2xsVG9wXG4gICAgcGl4ZWxzRnJvbUJvdHRvbSA9IDAgKyBzY3JvbGxIZWlnaHQgLSBzY3JvbGxUb3AgLSBpbm5lckhlaWdodFxuXG4gICAgIyBmaXhlZCBvZmZzZXRcbiAgICBvZmZzZXQgPSA3MDAgICMgPSAxMDAwMCAqIDAuMlxuXG4gICAgIyBnZXQgYm90dG9tIG9mZnNldCBvZiBlbGVtZW50IGluIHRoZSBzY3JvbGxpbmcgYXJlYVxuICAgIG9mZnNldEJvdHRvbSA9IEBnZXRPZmZzZXRCb3R0b20gJCgnLnNzLXdyYXBwZXInKSwgc2Nyb2xsSGVpZ2h0XG5cbiAgICAjIHJldHVybiBmb3IgbmVnYXRpdmUgdmFsdWVzIChlbGFzdGljIHNjcm9sbGluZyBvbiBNYWMgT1MgYW5kIGlPUylcbiAgICByZXR1cm4gaWYgcGl4ZWxzRnJvbUJvdHRvbSA8IDAgb3IgcGl4ZWxzRnJvbVRvcCA8IDBcblxuICAgICMgdHJpZ2dlciBldmVudHNcbiAgICBpZiBwaXhlbHNGcm9tQm90dG9tIDwgb2Zmc2V0ICsgb2Zmc2V0Qm90dG9tXG5cbiAgICAgICMgY29uc29sZS5sb2cgJ05lYXJCb3R0b20nXG4gICAgICBAdHJpZ2dlck1ldGhvZCAnc2Nyb2xsOm5lYXI6Ym90dG9tJ1xuXG4gICAgZWxzZSBpZiBwaXhlbHNGcm9tVG9wIDwgb2Zmc2V0XG5cbiAgICAgICMgY29uc29sZS5sb2cgJ05lYXJUb3AnXG4gICAgICBAdHJpZ2dlck1ldGhvZCAnc2Nyb2xsOm5lYXI6dG9wJ1xuXG5cblxuICBnZXRPZmZzZXRCb3R0b206ICgkZWwsIHNjcm9sbEhlaWdodCkgPT5cblxuICAgIGlmIG5vdCBAb2Zmc2V0Qm90dG9tP1xuICAgICAgIyBjYWxjdWxhdGUgdGhlIG9mZnNldCBvZiB0aGUgcG9zdHMgZGl2IGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgcGFnZVxuICAgICAgQG9mZnNldEJvdHRvbSA9IHNjcm9sbEhlaWdodCAtICggJGVsLmhlaWdodCgpICsgJGVsLm9mZnNldCgpLnRvcCApXG5cbiAgICAgICMgbWFrZSBzdXJlIHRoYXQgdGhpcyBpcyBub3QgbmVnYXRpdmUuXG4gICAgICBpZiBAb2Zmc2V0Qm90dG9tIDwgMFxuICAgICAgICBAb2Zmc2V0Qm90dG9tID0gMFxuXG4gICAgQG9mZnNldEJvdHRvbVxuXG5cbiAgb25TY3JvbGxOZWFyQm90dG9tOiA9PlxuXG4gICAgaWYgbm90IEBjb2xsZWN0aW9uLm5leHRQYWdlPyBvciBub3QgQGNvbGxlY3Rpb24/IG9yIEBjb2xsZWN0aW9uLmxlbmd0aCBpcyAwXG4gICAgICByZXR1cm5cblxuICAgIGlmIEBsb2FkaW5nPyBhbmQgQGxvYWRpbmdcbiAgICAgIHJldHVyblxuXG4gICAgaWYgQGNvbGxlY3Rpb24uaGFzTmV4dD8gYW5kIEBjb2xsZWN0aW9uLmhhc05leHQgaXMgZmFsc2VcbiAgICAgIHJldHVyblxuXG5cbiAgICBAbG9hZGluZyA9IHRydWVcbiAgICBAbW9kZWwuc2V0ICdsb2FkaW5nJywgdHJ1ZVxuXG4gICAgQGNvbGxlY3Rpb24ubmV4dFBhZ2VcbiAgICAgIHJlbW92ZTogZmFsc2VcbiAgICAgIHN1Y2Nlc3M6IChjb2xsZWN0aW9uLCByZXNwb25zZSkgPT5cbiAgICAgICAgQGxvYWRpbmcgPSBmYWxzZVxuICAgICAgICBAbW9kZWwuc2V0ICdsb2FkaW5nJywgZmFsc2VcblxuXG4gIG9uTG9hZGluZ0NoYW5nZTogKG1vZGVsLCBsb2FkaW5nLCBvcHRpb25zKSAtPlxuXG4gICAgaWYgbm90IEBsb2FkZXJWaWV3P1xuXG4gICAgICAjIGNyZWF0ZSBsb2FkZXJcbiAgICAgIGlmIEAkKCcuc3MtaW5maW5pdGUtc2Nyb2xsLWxvYWRlcicpLmxlbmd0aCBpcyAwXG5cbiAgICAgICAgaW5maW5pdGVTY3JvbGxMb2FkZXJIdG1sID0gJzxkaXYgY2xhc3M9XCJzcy1pbmZpbml0ZS1zY3JvbGwtbG9hZGVyXCI+PGRpdiBjbGFzcz1cInNzLWlubmVyLXRleHRcIj5ObyBtb3JlIGNvbnRlbnQgdG8gbG9hZC48L2Rpdj48L2Rpdj4nXG5cbiAgICAgICAgaWYgQHNjcm9sbENvbnRhaW5lciBpcyAnd2luZG93J1xuXG4gICAgICAgICAgQCRlbC5hcHBlbmQgaW5maW5pdGVTY3JvbGxMb2FkZXJIdG1sXG5cbiAgICAgICAgZWxzZVxuXG4gICAgICAgICAgQCQoIEBzY3JvbGxDb250YWluZXIgKS5hcHBlbmQgaW5maW5pdGVTY3JvbGxMb2FkZXJIdG1sXG5cblxuICAgICAgQGxvYWRlclZpZXcgPSBuZXcgQXBwLlZpZXdzLkxvYWRlckl0ZW1WaWV3XG4gICAgICAgIG1vZGVsOiBuZXcgQmFja2JvbmUuTW9kZWxcblxuICAgICAgQCQoJy5zcy1pbmZpbml0ZS1zY3JvbGwtbG9hZGVyJykuYXBwZW5kIEBsb2FkZXJWaWV3LnJlbmRlcigpLmVsXG5cblxuICAgIGRvbmUgPSBmYWxzZVxuXG4gICAgaWYgbG9hZGluZ1xuXG4gICAgICBAbG9hZGVyVmlldy5zdGFydFNwaW5uZXIoKVxuXG4gICAgZWxzZVxuXG4gICAgICBAbG9hZGVyVmlldy5zdG9wU3Bpbm5lcigpXG5cbiAgICAgICMgIyBzZXQgJ2RvbmUnIGZsYWcgdG8gdHJ1ZSB3aGVuIHRoZSBjb2xsZWN0aW9uIGlzIGF0IHRoZSBib3R0b20uXG4gICAgICAjICMgV2UgZG9uJ3QgbmVlZCBpdCBvbiB0aGUgZnJvbnQgZW5kLCBidXQgd2UgbWlnaHQgd2FudCBpdCBvbiB0aGVcbiAgICAgICMgIyBiYWNrIGVuZCB0byBzaG93IGEgbWVzc2FnZSBsaWtlOiBcIkdvIHBybyB0byBsb2FkIG1vcmUgcG9zdHNcIlxuICAgICAgIyBpZiBAY29sbGVjdGlvbi5oYXNOZXh0PyBhbmQgQGNvbGxlY3Rpb24uaGFzTmV4dCBpcyBmYWxzZVxuICAgICAgIyAgIGRvbmUgPSB0cnVlXG5cbiAgICBAJCgnLnNzLWluZmluaXRlLXNjcm9sbC1sb2FkZXInKS50b2dnbGVDbGFzcyAnc3MtbG9hZGluZycsIGxvYWRpbmdcbiAgICBAJCgnLnNzLWluZmluaXRlLXNjcm9sbC1sb2FkZXInKS50b2dnbGVDbGFzcyAnc3MtZG9uZScsIGRvbmVcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCAgICAgICA9IHJlcXVpcmUgXCJhcHBcIlxuQmFja2JvbmUgID0gcmVxdWlyZSBcImJhY2tib25lXCJcbl8gICAgICAgICA9IHJlcXVpcmUgXCJ1bmRlcnNjb3JlXCJcblxuXG5jbGFzcyBBcHAuVmlld3MuTG9hZGVySXRlbVZpZXcgZXh0ZW5kcyBBcHAuVmlld3MuQmFzZUl0ZW1WaWV3XG5cbiAgY2xhc3NOYW1lOiAnc3MtYWpheC1sb2FkZXItdmlldydcblxuICBkZWZhdWx0U3BpbkFyZ3M6XG5cbiAgICBsaW5lczogMTIgICAgICAgICAgICAgICAjIFRoZSBudW1iZXIgb2YgbGluZXMgdG8gZHJhd1xuICAgIGxlbmd0aDogNyAgICAgICAgICAgICAgICMgVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcbiAgICB3aWR0aDogMiAgICAgICAgICAgICAgICAjIFRoZSBsaW5lIHRoaWNrbmVzc1xuICAgIHJhZGl1czogOSAgICAgICAgICAgICAgICMgVGhlIHJhZGl1cyBvZiB0aGUgaW5uZXIgY2lyY2xlXG4gICAgY29ybmVyczogMSAgICAgICAgICAgICAgIyBDb3JuZXIgcm91bmRuZXNzICgwLi4xKVxuICAgIHJvdGF0ZTogMCAgICAgICAgICAgICAgICMgVGhlIHJvdGF0aW9uIG9mZnNldFxuICAgIGRpcmVjdGlvbjogMSAgICAgICAgICAgICMgMTogY2xvY2t3aXNlLCAtMTogY291bnRlcmNsb2Nrd2lzZVxuICAgIGNvbG9yOiAnI2FlYWVhZScgICAgICAgICMgI3JnYiBvciAjcnJnZ2JiIG9yIGFycmF5IG9mIGNvbG9yc1xuICAgIHNwZWVkOiAxICAgICAgICAgICAgICAgICMgUm91bmRzIHBlciBzZWNvbmRcbiAgICB0cmFpbDogNjAgICAgICAgICAgICAgICAjIEFmdGVyZ2xvdyBwZXJjZW50YWdlXG4gICAgc2hhZG93OiBmYWxzZSAgICAgICAgICAgIyBXaGV0aGVyIHRvIHJlbmRlciBhIHNoYWRvd1xuICAgIGh3YWNjZWw6IGZhbHNlICAgICAgICAgICMgV2hldGhlciB0byB1c2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uXG4gICAgY2xhc3NOYW1lOiAnc3Mtc3Bpbm5lcicgICAgIyBUaGUgQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgc3Bpbm5lclxuXG5cbiAgdGVtcGxhdGU6IC0+XG4gICAgJydcblxuICBvblJlbmRlcjogPT5cblxuICAgIEBzdGFydFNwaW5uZXIoKVxuXG5cbiAgc3RhcnRTcGlubmVyOiA9PlxuXG4gICAgc3BpbkFyZ3MgPSBfLmV4dGVuZCB7fSwgQGRlZmF1bHRTcGluQXJncywgQG1vZGVsLnRvSlNPTigpXG5cbiAgICBAJGVsLnNwaW4gc3BpbkFyZ3NcblxuICBzdG9wU3Bpbm5lcjogPT5cblxuICAgIEAkZWwuc3BpbiBmYWxzZVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcblxuIyBDUkVBVEUgTkVXIEJBQ0tCT05FLk1BUklPTkVUVEUgQVBQTElDQVRJT05cbkFwcCA9IG5ldyBCYWNrYm9uZS5NYXJpb25ldHRlLkFwcGxpY2F0aW9uXG5cblx0Q29udHJvbGxlcnM6IHt9XG5cdE1vZGVsczoge31cblx0Q29sbGVjdGlvbnM6IHt9XG5cdFZpZXdzOiB7fVxuXHRMYXlvdXRzOiB7fVxuXHRSb3V0ZXJzOiB7fVxuXHRUZW1wbGF0ZXM6IHt9XG5cdFBhcnRpYWxzOiB7fVxuXHRIZWxwZXJzOiB7fVxuXG53aW5kb3cuU1NBcHAgPSBBcHBcblxuIyBSRVRVUk4gTUFJTiBBUFBcbm1vZHVsZS5leHBvcnRzID0gQXBwXG4iLCJcInVzZSBzdHJpY3RcIlxuXG4jIG1vZGVybml6ciBtb2R1bGVzXG5yZXF1aXJlICdicm93c2Vybml6ci90ZXN0L3RvdWNoZXZlbnRzJ1xuXG4jIGxvYWQgYXBwIG9iamVjdFxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG4jIHJlcXVpcmUgaGVscGVyc1xuQXBwLkhlbHBlcnMuYnJvd3NlclN1cHBvcnQgID0gcmVxdWlyZSBcIi4vSGVscGVycy9icm93c2VyU3VwcG9ydFwiXG5BcHAuSGVscGVycy5kYXRhICAgICAgICAgICAgPSByZXF1aXJlIFwiLi9IZWxwZXJzL2RhdGFcIlxuQXBwLkhlbHBlcnMuZGF0ZSAgICAgICAgICAgID0gcmVxdWlyZSBcIi4vSGVscGVycy9kYXRlXCJcbkFwcC5IZWxwZXJzLmVudiAgICAgICAgICAgICA9IHJlcXVpcmUgXCIuL0hlbHBlcnMvZW52XCJcbkFwcC5IZWxwZXJzLmh0dHAgICAgICAgICAgICA9IHJlcXVpcmUgXCIuL0hlbHBlcnMvaHR0cFwiXG5cblxuIyBsb2FkIHRlbXBsYXRlIGhlbHBlcnNcbnJlcXVpcmUgJy4vVGVtcGxhdGVzL0hlbHBlcnMvdG9UaXRsZUNhc2UnXG5cbiMgbG9hZCBhcHAgY29udHJvbGxlcnNcbnJlcXVpcmUgJy4vQ29udHJvbGxlcnMvQXBwQ29udHJvbGxlcidcblxuIyBsb2FkIGFwcCBtb2RlbHNcbnJlcXVpcmUgJy4vTW9kZWxzL0FwaU1vZGVsJ1xucmVxdWlyZSAnLi9Nb2RlbHMvV1BPcHRpb25Nb2RlbCdcbnJlcXVpcmUgJy4vTW9kZWxzL1dQVXNlck1ldGFNb2RlbCdcblxuIyBsb2FkIGFwcCBjb2xsZWN0aW9uc1xucmVxdWlyZSAnLi9Db2xsZWN0aW9ucy9BcGlDb2xsZWN0aW9uJ1xucmVxdWlyZSAnLi9Db2xsZWN0aW9ucy9JbmZpbml0ZVNjcm9sbENvbGxlY3Rpb24nXG5cbiMgcmVxdWlyZSBhcHAgdmlld3NcbnJlcXVpcmUgJy4vVmlld3MvQmFzZUl0ZW1WaWV3J1xucmVxdWlyZSAnLi9WaWV3cy9CYXNlQ29tcG9zaXRlVmlldydcbnJlcXVpcmUgJy4vVmlld3MvTG9hZGVySXRlbVZpZXcnXG5yZXF1aXJlICcuL1ZpZXdzL0luZmluaXRlU2Nyb2xsQ29tcG9zaXRlVmlldydcblxuIyBiYWNrYm9uZSBleHRlbnRpb25zXG5yZXF1aXJlICcuL0NvbmZpZy9CYWNrYm9uZUFqYXgnXG5cblxuIyMjXG5pbml0aWFsaXplIGNvbnRyb2xsZXIgb24gZG9jIHJlYWR5IC0gYmVmb3JlIGV2ZW4gc3RhcnRpbmcgdGhlIGFwcFxuc28gdGhhdCBzdWIgYXBwcyBhbmQgbW9kZWxzIHdpbGwgaGF2ZSBhY2Nlc3MgdG8gdGhlIGFwcCBhcGkgaW5zaWRlIHRoZSBhcHBpbml0aWFsaXplcnNcbiMjI1xuJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbiQoZG9jdW1lbnQpLnJlYWR5IC0+XG5cbiAgJCgndmlkZW8nKS5wcm9wIFwibXV0ZWRcIiwgdHJ1ZVxuXG4gICNvbmx5IGxvYWQgdGhlIGFwcCBvbmNlXG4gICMgY29uc29sZS5sb2coICQoJy5zcy1zaG9ydGNvZGUnKSApXG4gICMgY29uc29sZS5sb2coICQoJy53aWRnZXRfc29jaWFsc3RyZWFtc193aWRnZXQnKSApXG5cbiAgIyAkKCcuc3Mtc2hvcnRjb2RlJykuaGlkZSgpXG4gICMgJCgnLndpZGdldF9zb2NpYWxzdHJlYW1zX3dpZGdldCcpLmhpZGUoKVxuICAjICQoJy5zcy13aWRnZXQnKS5oaWRlKClcblxuXG5cbiAgIyBhZGQgQUpBWCBzdXBwb3J0IGZvciBJRTlcbiAgQXBwLkhlbHBlcnMuYnJvd3NlclN1cHBvcnQuaWVBamF4U3VwcG9ydCgpXG5cbiAgIyBJbnN0YW50aWF0ZSBhcHAgY29udHJvbGxlclxuICBjb250cm9sbGVyID0gbmV3IEFwcC5Db250cm9sbGVycy5BcHBDb250cm9sbGVyKClcblxuICAjIyNcbiAgRGVmaW5lIEFwcCBSZXF1ZXN0c1xuICAjIyNcbiAgQXBwLnJlcXJlcy5zZXRIYW5kbGVyICdhcGlSb290JywgY29udHJvbGxlci5nZXRBcGlSb290XG4gIEFwcC5yZXFyZXMuc2V0SGFuZGxlciAnaXNFdmVuJywgY29udHJvbGxlci5pc0V2ZW5cblxuICAjIyNcbiAgc3RhcnQgdGhlIGFwcFxuICBUaGlzIGlzIHdoZW4gbW9kdWxlcyBnZXQgaW5pdGlhbGl6ZWRcbiAgIyMjXG4gIEFwcC5zdGFydCgpXG5cbiAgIyMjXG4gIHN0YXJ0IEVOViBoZWxwZXIuXG4gICMjI1xuICBBcHAuSGVscGVycy5lbnYuc3RhcnQoKVxuIl19
