(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/scripts/admin.coffee":[function(require,module,exports){
"use strict";
require('./appMain');

require('./selectize-tab-separator');

require('./selectize-blacklisted-chars');

require("console-log-shim");

require('./Modules/SSOptions/ssOptionsMain');

require('./Modules/SSPosts/ssPostsMain');

require('./Modules/SSAuth/ssAuthMain');

require('./Modules/SSSearch/ssSearchMain');

require('./Modules/SSAdmin/ssAdminMain');



},{"./Modules/SSAdmin/ssAdminMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/ssAdminMain.coffee","./Modules/SSAuth/ssAuthMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/ssAuthMain.coffee","./Modules/SSOptions/ssOptionsMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/ssOptionsMain.coffee","./Modules/SSPosts/ssPostsMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/ssPostsMain.coffee","./Modules/SSSearch/ssSearchMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/ssSearchMain.coffee","./appMain":"/srv/social-streams/releases/tmp/social-streams/src/scripts/appMain.coffee","./selectize-blacklisted-chars":"/srv/social-streams/releases/tmp/social-streams/src/scripts/selectize-blacklisted-chars.coffee","./selectize-tab-separator":"/srv/social-streams/releases/tmp/social-streams/src/scripts/selectize-tab-separator.coffee","console-log-shim":"/srv/social-streams/releases/tmp/social-streams/lib/console-log-shim.coffee"}],"/srv/social-streams/releases/tmp/social-streams/lib/console-log-shim.coffee":[function(require,module,exports){
"use strict";
if (window.console == null) {
  window.console = {};
}

if (window.console.log == null) {
  window.console.log = function() {};
}



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



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Controllers/AdminController.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSAdmin', function(SSAdmin, App, Backbone, Marionette, $, _) {
  return SSAdmin.Controllers.AdminController = (function(superClass) {
    extend(AdminController, superClass);

    function AdminController() {
      this.resetTrashToggle = bind(this.resetTrashToggle, this);
      this.onStart = bind(this.onStart, this);
      this.initialize = bind(this.initialize, this);
      return AdminController.__super__.constructor.apply(this, arguments);
    }

    AdminController.prototype.initialize = function() {
      return SSAdmin.on('start', this.onStart);
    };

    AdminController.prototype.onStart = function() {
      var headerView, homeView, loaderView;
      if ($('.ss-header-region').length > 0) {
        App.addRegions({
          header: '.ss-header-region'
        });
        headerView = new SSAdmin.Views.HeaderItemView({
          model: App.SSOptions.reqres.request('options')
        });
        App.header.show(headerView);
      }
      if ($('.ss-home-region').length > 0) {
        App.addRegions({
          home: '.ss-home-region'
        });
        homeView = new SSAdmin.Views.HomeItemView({
          model: new Backbone.Model
        });
        App.home.show(homeView);
      }
      if ($('.ss-loader-region').length > 0) {
        App.addRegions({
          loader: '.ss-loader-region'
        });
        loaderView = new App.Views.LoaderItemView({
          model: new Backbone.Model
        });
        App.loader.show(loaderView);
        return loaderView.stopSpinner();
      }
    };

    AdminController.prototype.resetTrashToggle = function() {
      if ((App.header.currentView != null) && App.header.currentView instanceof SSAdmin.Views.HeaderItemView) {
        return App.header.currentView.resetTrashToggle();
      }
    };

    return AdminController;

  })(Backbone.Marionette.Controller);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/SSAdmin.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

App.module('SSAdmin', function(SSAdmin, App, Backbone, Marionette, $, _) {
  SSAdmin.Controllers = {};
  SSAdmin.Models = {};
  SSAdmin.Collections = {};
  SSAdmin.Views = {};
  SSAdmin.Layouts = {};
  SSAdmin.Routers = {};
  SSAdmin.Templates = {};
  SSAdmin.vent = new Backbone.Wreqr.EventAggregator();
  SSAdmin.commands = new Backbone.Wreqr.Commands();
  return SSAdmin.reqres = new Backbone.Wreqr.RequestResponse();
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Templates/HeaderItemViewTemplate.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"ss-header-inner\">\n  <div class=\"ss-logo\">\n    <a href=\"http://socialstreams.com/\" target=\"_blank\">SocialStreams</a>\n  </div><!-- .ss-logo -->\n  <div class=\"ss-header-actions\">\n    <a href=\"javascript:void(0);\" class=\"ss-settings-toggle\"><i class=\"ss-icon-cog\"></i> <span class=\"ss-inner-text\">Settings</span></a>\n    <a href=\"javascript:void(0);\" class=\"ss-trash-toggle\"><i class=\"ss-icon-trash-o\"></i> <span class=\"ss-inner-text\">View Trash</span></a>\n  </div><!-- .ss-header-actions -->\n</div>\n";
  },"useData":true});

},{"hbsfy/runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/hbsfy/runtime.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Templates/HomeItemViewTemplate.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<img class=\"home-logo\" alt=\"home-logo\" width=\"330\" src=\"data:image/png;base64,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\" />\n<div class=\"home-text\">Start by adding a social channel:</div>\n<div class=\"home-big-buttons\">\n  <a href=\"javascript:void(0)\" class=\"home-big-button big-button-twitter\" data-service=\"twitter\"><i class=\"ss-icon-twitter\"></i></a>\n  <a href=\"javascript:void(0)\" class=\"home-big-button big-button-instagram\" data-service=\"instagram\"><i class=\"ss-icon-instagram\"></i></a>\n</div>\n";
  },"useData":true});

},{"hbsfy/runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/hbsfy/runtime.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Views/HeaderItemView.coffee":[function(require,module,exports){
(function (global){
'use strict';
var App, alertify,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

alertify = (typeof window !== "undefined" ? window.alertify : typeof global !== "undefined" ? global.alertify : null);

App.module('SSAdmin', function(SSAdmin, App, Backbone, Marionette, $, _) {
  return SSAdmin.Views.HeaderItemView = (function(superClass) {
    extend(HeaderItemView, superClass);

    function HeaderItemView() {
      this.resetTrashToggle = bind(this.resetTrashToggle, this);
      this.click__toggleTrash = bind(this.click__toggleTrash, this);
      this.click__toggleModeration = bind(this.click__toggleModeration, this);
      this.click__toggleSettings = bind(this.click__toggleSettings, this);
      return HeaderItemView.__super__.constructor.apply(this, arguments);
    }

    HeaderItemView.prototype.template = require('../Templates/HeaderItemViewTemplate');

    HeaderItemView.prototype.className = 'ss-header';

    HeaderItemView.prototype.events = {
      'click .ss-settings-toggle': 'click__toggleSettings',
      'click .ss-trash-toggle': 'click__toggleTrash'
    };

    HeaderItemView.prototype.click__toggleSettings = function() {
      var alertMessage;
      alertify.alert().setting({
        onshow: (function(_this) {
          return function() {
            return $('.moderation-toggle').on('click', function() {
              return _this.click__toggleModeration();
            });
          };
        })(this)
      });
      alertMessage = '<span> <strong>Auto-Approve </strong> is </span>';
      if (this.model.get('moderation')) {
        alertMessage += '<button class="moderation-toggle btn btn-info">OFF</button> <button class="moderation-toggle btn btn-default">ON</button>';
      } else {
        alertMessage += '<button class="moderation-toggle btn btn-default">OFF</button> <button class="moderation-toggle btn btn-info">ON</button>';
      }
      return alertify.alert('<h3><i class="ss-icon-cog"></i> Settings </h3>', alertMessage);
    };

    HeaderItemView.prototype.click__toggleModeration = function() {
      var alertMessage;
      alertify.closeAll();
      alertMessage = '<h1><i class="ss-icon-refresh"></i></h1>';
      if (this.model.get('moderation')) {
        alertMessage += '<h3>Future posts will now automatically be published.</h3><p>Previously saved content will not change</p>';
      } else {
        alertMessage += '<h3>Future posts will now need manual approval before being published.</h3><p>Previously saved content will not change</p>';
      }
      return alertify.confirm('', alertMessage, (function(_this) {
        return function() {
          _this.model.toggleAttribute('moderation');
          return _this.model.save();
        };
      })(this), (function(_this) {
        return function() {};
      })(this));
    };

    HeaderItemView.prototype.click__toggleTrash = function(event) {
      var $target, fetchData, fetchOptions, iconClass, innerText, postFetchCommand;
      if ((App.SSSearch == null) || (App.SSPosts == null)) {
        return;
      }
      $target = this.$('.ss-trash-toggle');
      if ((this.showingTrash != null) && this.showingTrash === true) {
        this.showingTrash = false;
      } else {
        this.showingTrash = true;
      }
      fetchOptions = {};
      fetchData = {};
      iconClass = 'ss-icon-trash-o';
      innerText = 'View Trash';
      postFetchCommand = 'fetchServerPosts';
      fetchData.status = ['publish', 'draft'];
      if (this.showingTrash) {
        fetchData.status = 'trash';
        iconClass = 'ss-icon-level-up';
        innerText = "Go Back";
        this.prevSearchAction = App.SSSearch.reqres.request('action');
        App.SSSearch.commands.execute('setAction', '');
      }
      if (!this.showingTrash && (this.prevSearchAction != null) && this.prevSearchAction === 'publish') {
        postFetchCommand = 'fetchApiPosts';
      }
      fetchOptions.success = (function(_this) {
        return function() {
          var action, postsCollection;
          App.loader.currentView.stopSpinner();
          if (!_this.showingTrash && (_this.prevSearchAction != null)) {
            action = '';
            switch (_this.prevSearchAction) {
              case 'view':
              case 'search':
                postsCollection = App.SSPosts.reqres.request('postsCollection');
                break;
              default:
                postsCollection = App.SSPosts.reqres.request('apiPostsCollection');
            }
            if (postsCollection.length > 0) {
              action = _this.prevSearchAction;
            }
            return App.SSSearch.commands.execute('setAction', action);
          }
        };
      })(this);
      App.posts.close();
      App.loader.currentView.startSpinner();
      $target.find('i').attr('class', iconClass);
      $target.find('.ss-inner-text').text(innerText);
      return App.SSPosts.commands.execute(postFetchCommand, fetchData, fetchOptions);
    };

    HeaderItemView.prototype.resetTrashToggle = function() {
      var $target, iconClass, innerText;
      this.showingTrash = false;
      this.prevSearchAction = null;
      $target = this.$('.ss-trash-toggle');
      iconClass = 'ss-icon-trash-o';
      innerText = 'View Trash';
      $target.find('i').attr('class', iconClass);
      return $target.find('.ss-inner-text').text(innerText);
    };

    return HeaderItemView;

  })(App.Views.BaseItemView);
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../Templates/HeaderItemViewTemplate":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Templates/HeaderItemViewTemplate.hbs","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Views/HomeItemView.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSAdmin', function(SSAdmin, App, Backbone, Marionette, $, _) {
  return SSAdmin.Views.HomeItemView = (function(superClass) {
    extend(HomeItemView, superClass);

    function HomeItemView() {
      this.login = bind(this.login, this);
      return HomeItemView.__super__.constructor.apply(this, arguments);
    }

    HomeItemView.prototype.template = require('../Templates/HomeItemViewTemplate');

    HomeItemView.prototype.className = 'ss-home';

    HomeItemView.prototype.events = {
      'click .home-big-button': 'login'
    };

    HomeItemView.prototype.login = function(event) {
      if (App.SSAuth == null) {
        return;
      }
      return App.SSAuth.commands.execute('login', $(event.currentTarget).attr('data-service'));
    };

    return HomeItemView;

  })(App.Views.BaseItemView);
});



},{"../Templates/HomeItemViewTemplate":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Templates/HomeItemViewTemplate.hbs","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/ssAdminMain.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

require('./SSAdmin');

require('./Views/HeaderItemView');

require('./Views/HomeItemView');

require('./Controllers/AdminController');

App.module('SSAdmin', function(SSAdmin, App, Backbone, Marionette, $, _) {
  return SSAdmin.addInitializer(function() {
    var controller;
    controller = new SSAdmin.Controllers.AdminController();

    /*
    Define Module API
     */
    return SSAdmin.commands.setHandler('resetTrashToggle', controller.resetTrashToggle);
  });
});



},{"./Controllers/AdminController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Controllers/AdminController.coffee","./SSAdmin":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/SSAdmin.coffee","./Views/HeaderItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Views/HeaderItemView.coffee","./Views/HomeItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAdmin/Views/HomeItemView.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/Collections/ServicesCollection.coffee":[function(require,module,exports){
'use strict';
var App,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSAuth', function(SSAuth, App, Backbone, Marionette, $, _) {
  return SSAuth.Collections.ServicesCollection = (function(superClass) {
    extend(ServicesCollection, superClass);

    function ServicesCollection() {
      return ServicesCollection.__super__.constructor.apply(this, arguments);
    }

    ServicesCollection.prototype.model = SSAuth.Models.ServiceModel;

    ServicesCollection.prototype.apiUrl = '1/site/socialstreams_services';

    return ServicesCollection;

  })(App.Collections.ApiCollection);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/Controllers/AuthController.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSAuth', function(SSAuth, App, Backbone, Marionette, $, _) {
  return SSAuth.Controllers.AuthController = (function(superClass) {
    extend(AuthController, superClass);

    function AuthController() {
      this.logout = bind(this.logout, this);
      this.checkLoginStatus = bind(this.checkLoginStatus, this);
      this.login = bind(this.login, this);
      this.getServicesCollection = bind(this.getServicesCollection, this);
      return AuthController.__super__.constructor.apply(this, arguments);
    }

    AuthController.prototype.getServicesCollection = function() {
      if (this.servicesCollection == null) {
        this.servicesCollection = new SSAuth.Collections.ServicesCollection;
        this.servicesCollection.fetch();
      }
      return this.servicesCollection;
    };

    AuthController.prototype.login = function(service) {
      var access_token, admin_page_url, features, height, left, outerHeight, outerWidth, plugin_version, screenX, screenY, ss_oauth_url, ss_user_id, top, urlArgs, urlString, width;
      ss_oauth_url = App.SSOptions.reqres.request('option', 'ss_oauth_url');
      admin_page_url = App.SSOptions.reqres.request('option', 'admin_page_url');
      ss_user_id = App.SSOptions.reqres.request('option', 'ss_user_id');
      plugin_version = App.SSOptions.reqres.request('option', 'plugin_version');
      access_token = App.SSOptions.reqres.request('option', 'access_token');
      urlArgs = {
        origin_url: encodeURIComponent(admin_page_url),
        ss_user_id: ss_user_id,
        access_token: access_token,
        plugin_version: plugin_version
      };
      urlString = App.Helpers.http.toUrl(ss_oauth_url + '/' + service + '-redirect', urlArgs);
      screenX = (typeof window.screenX !== "undefined" ? window.screenX : window.screenLeft);
      screenY = (typeof window.screenY !== "undefined" ? window.screenY : window.screenTop);
      outerWidth = (typeof window.outerWidth !== "undefined" ? window.outerWidth : document.body.clientWidth);
      outerHeight = (typeof window.outerHeight !== "undefined" ? window.outerHeight : document.body.clientHeight - 22);
      width = 1000;
      height = 600;
      left = parseInt(screenX + ((outerWidth - width) / 2), 10);
      top = parseInt(screenY + ((outerHeight - height) / 2.5), 10);
      features = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;
      this.login_win = window.open(urlString, "", features);
      if (window.focus) {
        this.login_win.focus();
      }
      return setTimeout(this.checkLoginStatus, 500);
    };

    AuthController.prototype.checkLoginStatus = function() {
      if (this.login_win == null) {
        return;
      }
      if (!this.login_win.closed) {
        return setTimeout(this.checkLoginStatus, 500);
      } else {
        return window.location.reload();
      }
    };

    AuthController.prototype.logout = function(service) {
      var serviceModel;
      serviceModel = this.getServicesCollection().get(service);
      return serviceModel.save({
        authenticated: false,
        success: function() {
          return setTimeout(function() {
            return window.location.reload();
          }, 400);
        }
      });
    };

    return AuthController;

  })(Backbone.Marionette.Controller);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/Models/ServiceModel.coffee":[function(require,module,exports){
'use strict';
var App,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSAuth', function(SSAuth, App, Backbone, Marionette, $, _) {
  return SSAuth.Models.ServiceModel = (function(superClass) {
    extend(ServiceModel, superClass);

    function ServiceModel() {
      return ServiceModel.__super__.constructor.apply(this, arguments);
    }

    ServiceModel.prototype.apiUrl = '1/site/socialstreams_services';

    ServiceModel.prototype.defaults = {
      iconClass: function() {
        return 'ss-icon-' + this.get('id');
      },
      placeholder: function() {
        var output;
        output = '';
        switch (this.get('id')) {
          case 'twitter':
            output = 'Search Twitter for up to 3 keywords';
            break;
          case 'instagram':
            output = 'Search Instagram for only 1 keyword';
        }
        return output;
      },
      types: function() {
        var output;
        output = [];
        switch (this.get('id')) {
          case 'twitter':
            output = [
              {
                value: 'global',
                label: 'Public Twitter'
              }, {
                value: 'user',
                label: 'Search @Your posts'
              }
            ];
            break;
          case 'instagram':
            output = [
              {
                value: 'global',
                label: 'Public Instagram'
              }, {
                value: 'user',
                label: 'Search @Your posts'
              }
            ];
        }
        return output;
      },
      tabindex: function() {
        return this.collection.indexOf(this) + 1;
      },
      explodeQuery: function() {
        var queryArray, service;
        service = this.get('id');
        if (App.SSSearch.reqres.request('searchModel').get(service + 'Query') != null) {
          queryArray = App.SSSearch.reqres.request('searchModel').get(service + 'Query').split(' OR ');
          return queryArray;
        }
      }
    };

    return ServiceModel;

  })(App.Models.ApiModel);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/SSAuth.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

App.module('SSAuth', function(SSAuth, App, Backbone, Marionette, $, _) {
  SSAuth.Controllers = {};
  SSAuth.Models = {};
  SSAuth.Collections = {};
  SSAuth.Views = {};
  SSAuth.Layouts = {};
  SSAuth.Routers = {};
  SSAuth.Templates = {};
  SSAuth.vent = new Backbone.Wreqr.EventAggregator();
  SSAuth.commands = new Backbone.Wreqr.Commands();
  return SSAuth.reqres = new Backbone.Wreqr.RequestResponse();
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/ssAuthMain.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

require('./SSAuth');

require('./Models/ServiceModel');

require('./Collections/ServicesCollection');

require('./Controllers/AuthController');

App.module('SSAuth', function(SSAuth, App, Backbone, Marionette, $, _) {
  return SSAuth.addInitializer(function() {
    var controller;
    controller = new SSAuth.Controllers.AuthController;

    /*
    Define Module API
     */
    SSAuth.reqres.setHandler('servicesCollection', controller.getServicesCollection);
    SSAuth.commands.setHandler('login', controller.login);
    return SSAuth.commands.setHandler('logout', controller.logout);
  });
});



},{"./Collections/ServicesCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/Collections/ServicesCollection.coffee","./Controllers/AuthController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/Controllers/AuthController.coffee","./Models/ServiceModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/Models/ServiceModel.coffee","./SSAuth":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSAuth/SSAuth.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSOptions/Controllers/OptionsController.coffee":[function(require,module,exports){
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



},{"./Collections/ApiPostsCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Collections/ApiPostsCollection.coffee","./Collections/PostsCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Collections/PostsCollection.coffee","./Controllers/AutoReloadController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Controllers/AutoReloadController.coffee","./Controllers/PostsController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Controllers/PostsController.coffee","./Models/PostModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Models/PostModel.coffee","./Models/PostsLayoutModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Models/PostsLayoutModel.coffee","./SSPosts":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/SSPosts.coffee","./Views/PostItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Views/PostItemView.coffee","./Views/PostsCompositeView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSPosts/Views/PostsCompositeView.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/Controllers/SearchController.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSSearch', function(SSSearch, App, Backbone, Marionette, $, _) {
  return SSSearch.Controllers.SearchController = (function(superClass) {
    extend(SearchController, superClass);

    function SearchController() {
      this.setAction = bind(this.setAction, this);
      this.getAction = bind(this.getAction, this);
      this.getServicesCollection = bind(this.getServicesCollection, this);
      this.getSearchView = bind(this.getSearchView, this);
      this.getSearchModel = bind(this.getSearchModel, this);
      this.onStart = bind(this.onStart, this);
      this.initialize = bind(this.initialize, this);
      return SearchController.__super__.constructor.apply(this, arguments);
    }

    SearchController.prototype.initialize = function() {
      return SSSearch.on('start', this.onStart);
    };

    SearchController.prototype.onStart = function() {
      if ($('.ss-search-region').length > 0) {
        App.addRegions({
          search: '.ss-search-region'
        });
        return App.search.show(this.getSearchView());
      }
    };

    SearchController.prototype.getSearchModel = function() {
      if (this.searchModel == null) {
        this.searchModel = new SSSearch.Models.SearchModel({
          id: 'socialstreams_search'
        });
        this.searchModel.fetch();
      }
      return this.searchModel;
    };

    SearchController.prototype.getSearchView = function() {
      if (this.searchView == null) {
        this.searchView = new SSSearch.Views.SearchItemView({
          model: this.getSearchModel()
        });
      }
      return this.searchView;
    };

    SearchController.prototype.getServicesCollection = function() {
      if (this.servicesCollection == null) {
        this.servicesCollection = new SSSearch.Collections.ServicesCollection;
        this.servicesCollection.fetch();
      }
      return this.servicesCollection;
    };

    SearchController.prototype.getAction = function(action) {
      return this.getSearchModel().get('action');
    };

    SearchController.prototype.setAction = function(action) {
      return this.getSearchModel().set('action', action);
    };

    return SearchController;

  })(Backbone.Marionette.Controller);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/Models/SearchModel.coffee":[function(require,module,exports){
'use strict';
var App,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

App.module('SSSearch', function(SSSearch, App, Backbone, Marionette, $, _) {
  return SSSearch.Models.SearchModel = (function(superClass) {
    extend(SearchModel, superClass);

    function SearchModel() {
      this.validate = bind(this.validate, this);
      return SearchModel.__super__.constructor.apply(this, arguments);
    }

    SearchModel.prototype.defaults = {
      action: function() {
        var output, postsCollection;
        output = '';
        postsCollection = [];
        if (App.SSPosts != null) {
          postsCollection = App.SSPosts.reqres.request('postsCollection');
        }
        if (postsCollection.length > 0) {
          return output = 'view';
        }
      },
      public_page_url: function() {
        var public_page_url;
        public_page_url = null;
        if (App.SSOptions != null) {
          public_page_url = App.SSOptions.reqres.request('option', 'public_page_url');
        }
        return public_page_url;
      },
      time_to_next_cron: function() {
        var time_to_next_cron;
        time_to_next_cron = '';
        if (App.SSOptions != null) {
          time_to_next_cron = App.SSOptions.reqres.request('option', 'time_to_next_cron');
          if ((time_to_next_cron != null) && time_to_next_cron !== '') {
            time_to_next_cron = moment.unix(parseInt(time_to_next_cron, 10)).from(0, true);
          }
        }
        return time_to_next_cron;
      },
      services: function() {
        var services;
        services = [];
        if (App.SSAuth != null) {
          App.SSAuth.reqres.request('servicesCollection').each(function(model) {
            var serviceData;
            serviceData = model.toJSON();
            serviceData.query = this.get(serviceData.id + 'Query');
            serviceData.type = this.get(serviceData.id + 'Type');
            _.each(serviceData.types, function(type, index) {
              if (type.value === serviceData.type) {
                return serviceData.types[index].selected = true;
              }
            }, this);
            return services.push(serviceData);
          }, this);
        }
        return services;
      }
    };

    SearchModel.prototype.validate = function(attrs, options) {
      var errors, services, validSearchFound;
      errors = {};
      services = this.get('services');
      _.each(services, function(service) {
        var error;
        error = false;
        if (attrs[service.id + 'Type'] != null) {
          switch (attrs[service.id + 'Type']) {
            case 'global':
              if ((attrs[service.id + 'Query'] == null) || attrs[service.id + 'Query'] === '') {
                error = true;
              }
          }
        }
        return errors[service.id] = error;
      });
      validSearchFound = false;
      _.each(errors, function(error) {
        if (error === false) {
          return validSearchFound = true;
        }
      });
      if (validSearchFound) {
        errors = null;
      }
      return errors;
    };

    return SearchModel;

  })(App.Models.WPOptionModel);
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/SSSearch.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

App.module('SSSearch', function(SSSearch, App, Backbone, Marionette, $, _) {
  SSSearch.Controllers = {};
  SSSearch.Models = {};
  SSSearch.Collections = {};
  SSSearch.Views = {};
  SSSearch.Layouts = {};
  SSSearch.Routers = {};
  SSSearch.Templates = {};
  SSSearch.vent = new Backbone.Wreqr.EventAggregator();
  SSSearch.commands = new Backbone.Wreqr.Commands();
  return SSSearch.reqres = new Backbone.Wreqr.RequestResponse();
});



},{"app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/Templates/SearchItemViewTemplate.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <div class=\"ss-search-service-wrapper "
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-search_type=\""
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\">\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.authenticated : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  </div>\n\n  <!-- MOBILE -->\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.authenticated : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div><!-- end MOBILE -->\n  </div><!-- .search-fields -->\n\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "\n    <span class=\"ss-search-box-icon "
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\""
    + escapeExpression(((helper = (helper = helpers.iconClass || (depth0 != null ? depth0.iconClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"iconClass","hash":{},"data":data}) : helper)))
    + "\"></i></span>\n\n    <div class=\"ss-search-type ss-search-field\">\n      <select name=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "Type\" data-service_select=\"twitter\" tabindex=\"0\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.types : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </select>\n    </div>\n\n    <div class=\"ss-search-query ss-search-field\">\n      <input type=\"text\" name=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "Query\" class=\"input search-bar "
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-search selectized\" placeholder=\""
    + escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\" tabindex=\""
    + escapeExpression(((helper = (helper = helpers.tabindex || (depth0 != null ? depth0.tabindex : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tabindex","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + escapeExpression(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"query","hash":{},"data":data}) : helper)))
    + "\" />\n    </div>\n\n    <a href=\"javascript:void(0);\" class=\"ss-search-box-remove\" data-service=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\"ss-icon-close\"></i></a>\n\n    <input name=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "User\" type=\"hidden\" value=\""
    + escapeExpression(((helper = (helper = helpers.bw_account_id || (depth0 != null ? depth0.bw_account_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bw_account_id","hash":{},"data":data}) : helper)))
    + "\">\n\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "        <option value=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.selected : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"4":function(depth0,helpers,partials,data) {
  return "selected=\"selected\"";
  },"6":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "\n    <a href=\"javascript:void(0);\" class=\"ss-social-auth-box\" data-service=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n      <span class=\"ss-social-auth-box-icon\"><i class=\""
    + escapeExpression(((helper = (helper = helpers.iconClass || (depth0 != null ? depth0.iconClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"iconClass","hash":{},"data":data}) : helper)))
    + "\"></i></span>\n      <span class=\"ss-social-auth-box-text\">+Add ";
  stack1 = ((helpers.toTitleCase || (depth0 && depth0.toTitleCase) || helperMissing).call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"toTitleCase","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n    </a>\n\n";
},"7":function(depth0,helpers,partials,data) {
  return "";
},"9":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <div class=\"ss-search-mobile-wrapper\">\n      <span class=\"ss-search-box-icon "
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\""
    + escapeExpression(((helper = (helper = helpers.iconClass || (depth0 != null ? depth0.iconClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"iconClass","hash":{},"data":data}) : helper)))
    + "\"></i></span>\n\n      <div class=\"ss-mobile-search-box\">\n        <div class=\"ss-mobile-query\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.explodeQuery : depth0), {"name":"each","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n      </div>\n";
},"10":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <span class=\"ss-mobile-query-term\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</span>\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <div class=\"view-stream-actions\">\n      <span class=\"ss-search-action-text\"> Your stream is now live. Check it out. </span>\n      <a href=\""
    + escapeExpression(((helper = (helper = helpers.public_page_url || (depth0 != null ? depth0.public_page_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"public_page_url","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-info see-your-stream-btn btn-lg\">SEE YOUR STREAM</a>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.time_to_next_cron : depth0), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div><!-- .view-stream-actions -->\n";
},"13":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <p>New content will be loaded every 15 minutes (<span class=\"time-to-cron\">"
    + escapeExpression(((helper = (helper = helpers.time_to_next_cron || (depth0 != null ? depth0.time_to_next_cron : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"time_to_next_cron","hash":{},"data":data}) : helper)))
    + "</span> to go). Need more frequent updates? <a href=\"http://socialstreams.com/get-pro/\" target=\"_blank\">go premium &raquo</a></p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"ss-search-fields\">\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.services : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n<span class=\"help-block\"></span>\n\n<div class=\"ss-sticky-bar ss-search-actions\">\n  <div class=\"ss-search-actions-inner\">\n\n    <div class=\"publish-stream-actions\">\n      <span class=\"ss-search-action-text\"> This is just a preview. Click Publish to save changes. </span>\n      <a href=\"javascript:void(0);\" class=\"btn btn-success publish-stream-btn btn-lg\">PUBLISH</a>\n    </div><!-- .publish-stream -->\n\n  </div>\n</div>\n\n<div class=\"ss-search-actions non-sticky\">\n  <div class=\"ss-search-actions-inner\">\n\n    <div class=\"search-stream-actions\">\n      <span class=\"ss-search-action-text\"> Click to preview your search. </span>\n      <input type=\"submit\" class=\"btn btn-info search-btn btn-lg\" tabindex=\"3\" value=\"PREVIEW\" />\n    </div><!-- .search-stream -->\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.public_page_url : depth0), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  </div><!-- .ss-search-actions-inner -->\n</div><!-- .ss-search-actions -->\n";
},"useData":true});

},{"hbsfy/runtime":"/srv/social-streams/releases/tmp/social-streams/node_modules/hbsfy/runtime.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/Views/SearchItemView.coffee":[function(require,module,exports){
(function (global){
'use strict';
var App, alertify,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

App = require('app');

alertify = (typeof window !== "undefined" ? window.alertify : typeof global !== "undefined" ? global.alertify : null);

App.module('SSSearch', function(SSSearch, App, Backbone, Marionette, $, _) {
  return SSSearch.Views.SearchItemView = (function(superClass) {
    extend(SearchItemView, superClass);

    function SearchItemView() {
      this.logout = bind(this.logout, this);
      this.login = bind(this.login, this);
      this.onValidationError = bind(this.onValidationError, this);
      this.publishStream = bind(this.publishStream, this);
      this.onPublish = bind(this.onPublish, this);
      this.toggleLoadingClass = bind(this.toggleLoadingClass, this);
      this.onChangeSearch = bind(this.onChangeSearch, this);
      this.onSubmit = bind(this.onSubmit, this);
      this.onChange = bind(this.onChange, this);
      this.getValues = bind(this.getValues, this);
      this.onChangeAction = bind(this.onChangeAction, this);
      this.initialize = bind(this.initialize, this);
      return SearchItemView.__super__.constructor.apply(this, arguments);
    }

    SearchItemView.prototype.tagName = 'form';

    SearchItemView.prototype.template = require('../Templates/SearchItemViewTemplate');

    SearchItemView.prototype.events = {
      'submit': 'onSubmit',
      'change select': 'onChange',
      'click .publish-stream-btn': 'onPublish',
      'click .ss-social-auth-box': 'login',
      'click .ss-search-box-remove': 'logout'
    };

    SearchItemView.prototype.className = function() {
      var action;
      action = this.model.get('action');
      if ((action == null) || action === '') {
        action = 'none';
      }
      return 'ss-search ss-search-action-' + action;
    };

    SearchItemView.prototype.attributes = function() {
      return {
        action: App.SSOptions.reqres.request('option', 'ss_api_url')
      };
    };

    SearchItemView.prototype.initialize = function() {
      this.listenTo(this.model, 'change:action', this.onChangeAction);
      this.listenTo(this.model, 'change:search', this.onChangeSearch);
      return this.listenTo(this.model, 'invalid', this.onValidationError);
    };

    SearchItemView.prototype.onChangeAction = function() {
      this.$el.attr('class', _.result(this, 'className'));
      return this.toggleLoadingClass('.search-btn, .publish-stream-btn', false);
    };

    SearchItemView.prototype.onRender = function() {
      var instaHack;
      this.$('.twitter .ss-search-query input').selectize({
        plugins: ['restore_on_backspace', 'selectize-tab-separator', 'selectize-blacklisted-chars'],
        blacklistedChars: [],
        tabTriggers: [32, 188],
        delimiter: ' OR ',
        maxItems: 3,
        createOnBlur: true,
        labelField: "query",
        valueField: "query",
        sortField: 'query',
        searchField: 'query',
        create: true,
        persist: false,
        onChange: this.onChange
      });
      this.$('.instagram .ss-search-query input').selectize({
        plugins: ['restore_on_backspace', 'selectize-tab-separator', 'selectize-blacklisted-chars'],
        blacklistedChars: ['@'],
        tabTriggers: [32, 188],
        delimiter: ',',
        maxItems: 1,
        createOnBlur: true,
        labelField: "query",
        valueField: "query",
        sortField: 'query',
        searchField: 'query',
        create: true,
        persist: false,
        onChange: this.onChange
      });
      instaHack = this.$('.instagram .ss-search-query input, .selectize-control');
      instaHack.removeClass('single');
      instaHack.addClass('multi');
      this.$('.selectize-input.items:not(.has-items) input').css({
        width: '100%'
      });
      this.$('select').customSelect();
      return this.$('.ss-sticky-bar').sticky({
        topSpacing: 32
      });
    };

    SearchItemView.prototype.getValues = function() {
      var data;
      data = {};
      this.$('[name]').each(function(index, input) {
        var name, value;
        name = $(input).attr('name');
        if ($(input).is('select')) {
          value = $(input).val();
        } else if ($(input).is('input')) {
          value = $(input).val();
        }
        return data[name] = value;
      });
      return data;
    };

    SearchItemView.prototype.onChange = function(event) {
      var values;
      this.model.set({
        action: 'search'
      });
      values = this.getValues();
      return _.each(this.model.get('services'), function(service) {
        var searchType;
        searchType = '';
        if (values[service.id + 'Type'] != null) {
          searchType = values[service.id + 'Type'];
        }
        return this.$('.ss-search-service-wrapper.' + service.id).attr('data-search_type', searchType);
      }, this);
    };

    SearchItemView.prototype.onSubmit = function(event) {
      var values;
      event.preventDefault();
      if ((this.loading != null) && this.loading === true) {
        return;
      }
      this.$('.ss-error').removeClass('ss-error');
      values = this.getValues();
      values.search = true;
      this.model.set({
        search: false
      }, {
        silent: true
      });
      this.model.set(values, {
        validate: true
      });
      if (App.SSAdmin != null) {
        App.SSAdmin.commands.execute('resetTrashToggle');
      }
      return false;
    };

    SearchItemView.prototype.onChangeSearch = function(model) {
      if (App.SSPosts == null) {
        return;
      }
      this.toggleLoadingClass('.search-btn', true);
      return App.SSPosts.commands.execute('fetchApiPosts', {
        search: this.getValues()
      }, {
        success: (function(_this) {
          return function() {
            return _this.model.set({
              action: 'publish'
            });
          };
        })(this)
      });
    };

    SearchItemView.prototype.toggleLoadingClass = function(el, loading) {
      var $el;
      $el = this.$(el);
      if ($el.length === 0) {
        return;
      }
      if (loading == null) {
        loading = $el.first().hasClass('loading');
      }
      $el.toggleClass('loading', loading);
      this.loading = loading;
      return $el.each(function(index, element) {
        var text;
        text = $(element).attr('data-text');
        if ((text == null) || text === '') {
          if ($(element).is('input')) {
            text = $(element).attr('value');
          } else {
            text = $(element).html();
          }
          $(element).attr('data-text', text);
        }
        if (loading) {
          if ($(element).is('input')) {
            return $(element).attr('value', 'Loading...');
          } else {
            return text = $(element).html('Loading...');
          }
        } else {
          if ($(element).is('input')) {
            return $(element).attr('value', text);
          } else {
            return $(element).html(text);
          }
        }
      });
    };

    SearchItemView.prototype.onPublish = function(event) {
      var confirmBox, message, moderation;
      moderation = App.SSOptions.reqres.request('option', 'moderation');
      message = '<h1><i class="ss-icon-warning"></i></h1>';
      message += '<h3>Publishing will make all approved posts public.</h3>';
      if (this.length < 1) {
        message = '<h3>You don\'t seem to have any posts ready to publish.</h3>';
      } else if (moderation) {
        message = message + '<p>All future posts will need to be moderated before they appear on your Social Stream. Consider turning Auto-Approve <strong>ON</strong></p>';
      } else if (!moderation) {
        message = message + '<p>All future posts will be automatically added to your Social Stream.</p>';
      }
      return confirmBox = alertify.confirm('', message, (function(_this) {
        return function() {
          return _this.publishStream();
        };
      })(this), (function(_this) {
        return function() {
          return confirmBox.close();
        };
      })(this));
    };

    SearchItemView.prototype.publishStream = function() {
      if ((this.loading != null) && this.loading === true) {
        return;
      }
      this.toggleLoadingClass('.publish-stream-btn', true);
      App.SSPosts.commands.execute('publishApiPosts');
      return this.model.save({}, {
        batch: true,
        batchSuccess: (function(_this) {
          return function() {
            var public_page_url;
            public_page_url = _this.model.get('public_page_url');
            if ((public_page_url == null) || public_page_url === '') {
              window.location.reload();
              return;
            }
            _this.model.set({
              action: 'view'
            });
            $('html,body').animate({
              scrollTop: 0
            }, 400, 'easieEaseInOut');
            return App.SSPosts.commands.execute('fetchServerPosts', {
              status: ['publish', 'draft']
            });
          };
        })(this)
      });
    };

    SearchItemView.prototype.onValidationError = function(model, errors) {
      console.log('onValidationError');
      return _.each(errors, function(error, service) {
        return this.$('.ss-search-service-wrapper.' + service).addClass('ss-error');
      }, this);
    };

    SearchItemView.prototype.login = function(event) {
      if (App.SSAuth == null) {
        return;
      }
      return App.SSAuth.commands.execute('login', $(event.currentTarget).attr('data-service'));
    };

    SearchItemView.prototype.logout = function(event) {
      var service;
      if (App.SSAuth == null) {
        return;
      }
      service = $(event.currentTarget).data('service');
      return alertify.confirm('', '<h1><i class="ss-icon-warning"></i></h1><h3>Are you sure you want to remove <span style="text-transform:capitalize;"><strong>' + service + '</strong></span> from your Social Stream?</h3>', (function(_this) {
        return function() {
          return App.SSAuth.commands.execute('logout', $(event.currentTarget).attr('data-service'));
        };
      })(this), (function(_this) {
        return function() {};
      })(this));
    };

    return SearchItemView;

  })(App.Views.BaseItemView);
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../Templates/SearchItemViewTemplate":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/Templates/SearchItemViewTemplate.hbs","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/ssSearchMain.coffee":[function(require,module,exports){
'use strict';
var App;

App = require('app');

require('./SSSearch');

require('./Models/SearchModel');

require('./Views/SearchItemView');

require('./Controllers/SearchController');

App.module('SSSearch', function(SSSearch, App, Backbone, Marionette, $, _) {
  return SSSearch.addInitializer(function() {
    var controller;
    controller = new SSSearch.Controllers.SearchController;

    /*
    Define Module API
     */
    SSSearch.commands.setHandler('setAction', controller.setAction);
    SSSearch.reqres.setHandler('action', controller.getAction);
    return SSSearch.reqres.setHandler('searchModel', controller.getSearchModel);
  });
});



},{"./Controllers/SearchController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/Controllers/SearchController.coffee","./Models/SearchModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/Models/SearchModel.coffee","./SSSearch":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/SSSearch.coffee","./Views/SearchItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Modules/SSSearch/Views/SearchItemView.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/Templates/Helpers/toTitleCase.coffee":[function(require,module,exports){
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

},{"./Collections/ApiCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Collections/ApiCollection.coffee","./Collections/InfiniteScrollCollection":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Collections/InfiniteScrollCollection.coffee","./Config/BackboneAjax":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Config/BackboneAjax.coffee","./Controllers/AppController":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Controllers/AppController.coffee","./Helpers/browserSupport":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/browserSupport.coffee","./Helpers/data":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/data.coffee","./Helpers/date":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/date.coffee","./Helpers/env":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/env.coffee","./Helpers/http":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Helpers/http.coffee","./Models/ApiModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/ApiModel.coffee","./Models/WPOptionModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/WPOptionModel.coffee","./Models/WPUserMetaModel":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Models/WPUserMetaModel.coffee","./Templates/Helpers/toTitleCase":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Templates/Helpers/toTitleCase.coffee","./Views/BaseCompositeView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/BaseCompositeView.coffee","./Views/BaseItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/BaseItemView.coffee","./Views/InfiniteScrollCompositeView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/InfiniteScrollCompositeView.coffee","./Views/LoaderItemView":"/srv/social-streams/releases/tmp/social-streams/src/scripts/Views/LoaderItemView.coffee","app":"/srv/social-streams/releases/tmp/social-streams/src/scripts/app.coffee","browsernizr/test/touchevents":"/srv/social-streams/releases/tmp/social-streams/node_modules/browsernizr/test/touchevents.js"}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/selectize-blacklisted-chars.coffee":[function(require,module,exports){
(function (global){
var Selectize;

Selectize = (typeof window !== "undefined" ? window.Selectize : typeof global !== "undefined" ? global.Selectize : null);

Selectize.define('selectize-blacklisted-chars', function(options) {
  var originalOnKeyPress;
  originalOnKeyPress = this.onKeyPress;
  return this.onKeyPress = (function(_this) {
    return function(event) {
      var character;
      character = String.fromCharCode(event.keyCode || event.which);
      if ((_this.settings.blacklistedChars != null) && _.indexOf(_this.settings.blacklistedChars, character) >= 0) {
        event.preventDefault();
        return;
      }
      return originalOnKeyPress.apply(_this, arguments);
    };
  })(this);
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/srv/social-streams/releases/tmp/social-streams/src/scripts/selectize-tab-separator.coffee":[function(require,module,exports){
(function (global){
var Selectize;

Selectize = (typeof window !== "undefined" ? window.Selectize : typeof global !== "undefined" ? global.Selectize : null);

Selectize.define('selectize-tab-separator', function(options) {
  var originalOnKeyDown;
  originalOnKeyDown = this.onKeyDown;
  return this.onKeyDown = (function(_this) {
    return function(event) {
      var value;
      if ((_this.settings.tabTriggers != null) && _.indexOf(_this.settings.tabTriggers, event.keyCode) >= 0) {
        value = _this.$control_input.val();
        if (value !== '') {
          _this.createItem(value);
        }
        event.preventDefault();
        return;
      }
      return originalOnKeyDown.apply(_this, arguments);
    };
  })(this);
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},["./src/scripts/admin.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9hZG1pbi5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9saWIvY29uc29sZS1sb2ctc2hpbS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL01vZGVybml6ci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2Vybml6ci9saWIvTW9kZXJuaXpyUHJvdG8uanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2NsYXNzZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2NyZWF0ZUVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2RvY0VsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2dldEJvZHkuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2luamVjdEVsZW1lbnRXaXRoU3R5bGVzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL2xpYi9pcy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2Vybml6ci9saWIvcHJlZml4ZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3NldENsYXNzZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3Rlc3RSdW5uZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3Rlc3RTdHlsZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3Rlc3RzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL3Rlc3QvdG91Y2hldmVudHMuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9oYnNmeS9ydW50aW1lLmpzIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvQ29sbGVjdGlvbnMvQXBpQ29sbGVjdGlvbi5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Db2xsZWN0aW9ucy9JbmZpbml0ZVNjcm9sbENvbGxlY3Rpb24uY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvQ29uZmlnL0JhY2tib25lQWpheC5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Db250cm9sbGVycy9BcHBDb250cm9sbGVyLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL0hlbHBlcnMvYnJvd3NlclN1cHBvcnQuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvSGVscGVycy9kYXRhLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL0hlbHBlcnMvZGF0ZS5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9IZWxwZXJzL2Vudi5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9IZWxwZXJzL2h0dHAuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kZWxzL0FwaU1vZGVsLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZGVscy9XUE9wdGlvbk1vZGVsLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZGVscy9XUFVzZXJNZXRhTW9kZWwuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU0FkbWluL0NvbnRyb2xsZXJzL0FkbWluQ29udHJvbGxlci5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTQWRtaW4vU1NBZG1pbi5jb2ZmZWUiLCJzcmMvc2NyaXB0cy9Nb2R1bGVzL1NTQWRtaW4vVGVtcGxhdGVzL0hlYWRlckl0ZW1WaWV3VGVtcGxhdGUuaGJzIiwic3JjL3NjcmlwdHMvTW9kdWxlcy9TU0FkbWluL1RlbXBsYXRlcy9Ib21lSXRlbVZpZXdUZW1wbGF0ZS5oYnMiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTQWRtaW4vVmlld3MvSGVhZGVySXRlbVZpZXcuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU0FkbWluL1ZpZXdzL0hvbWVJdGVtVmlldy5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTQWRtaW4vc3NBZG1pbk1haW4uY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU0F1dGgvQ29sbGVjdGlvbnMvU2VydmljZXNDb2xsZWN0aW9uLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NBdXRoL0NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NBdXRoL01vZGVscy9TZXJ2aWNlTW9kZWwuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU0F1dGgvU1NBdXRoLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NBdXRoL3NzQXV0aE1haW4uY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU09wdGlvbnMvQ29udHJvbGxlcnMvT3B0aW9uc0NvbnRyb2xsZXIuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU09wdGlvbnMvTW9kZWxzL09wdGlvbnNNb2RlbC5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTT3B0aW9ucy9Nb2RlbHMvVXNlck1ldGFNb2RlbC5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTT3B0aW9ucy9TU09wdGlvbnMuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU09wdGlvbnMvc3NPcHRpb25zTWFpbi5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTUG9zdHMvQ29sbGVjdGlvbnMvQXBpUG9zdHNDb2xsZWN0aW9uLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9Db2xsZWN0aW9ucy9Qb3N0c0NvbGxlY3Rpb24uY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL0NvbnRyb2xsZXJzL0F1dG9SZWxvYWRDb250cm9sbGVyLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9Db250cm9sbGVycy9Qb3N0c0NvbnRyb2xsZXIuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL01vZGVscy9Qb3N0TW9kZWwuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL01vZGVscy9Qb3N0c0xheW91dE1vZGVsLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9TU1Bvc3RzLmNvZmZlZSIsInNyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9UZW1wbGF0ZXMvUG9zdEl0ZW1WaWV3VGVtcGxhdGUuaGJzIiwic3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL1RlbXBsYXRlcy9Qb3N0c0NvbXBvc2l0ZVZpZXdUZW1wbGF0ZS5oYnMiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTUG9zdHMvVmlld3MvUG9zdEl0ZW1WaWV3LmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NQb3N0cy9WaWV3cy9Qb3N0c0NvbXBvc2l0ZVZpZXcuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1Bvc3RzL3NzUG9zdHNNYWluLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL01vZHVsZXMvU1NTZWFyY2gvQ29udHJvbGxlcnMvU2VhcmNoQ29udHJvbGxlci5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTU2VhcmNoL01vZGVscy9TZWFyY2hNb2RlbC5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTU2VhcmNoL1NTU2VhcmNoLmNvZmZlZSIsInNyYy9zY3JpcHRzL01vZHVsZXMvU1NTZWFyY2gvVGVtcGxhdGVzL1NlYXJjaEl0ZW1WaWV3VGVtcGxhdGUuaGJzIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvTW9kdWxlcy9TU1NlYXJjaC9WaWV3cy9TZWFyY2hJdGVtVmlldy5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9Nb2R1bGVzL1NTU2VhcmNoL3NzU2VhcmNoTWFpbi5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9UZW1wbGF0ZXMvSGVscGVycy90b1RpdGxlQ2FzZS5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9WaWV3cy9CYXNlQ29tcG9zaXRlVmlldy5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9WaWV3cy9CYXNlSXRlbVZpZXcuY29mZmVlIiwiL3Nydi9zb2NpYWwtc3RyZWFtcy9yZWxlYXNlcy90bXAvc29jaWFsLXN0cmVhbXMvc3JjL3NjcmlwdHMvVmlld3MvSW5maW5pdGVTY3JvbGxDb21wb3NpdGVWaWV3LmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL1ZpZXdzL0xvYWRlckl0ZW1WaWV3LmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL2FwcC5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9hcHBNYWluLmNvZmZlZSIsIi9zcnYvc29jaWFsLXN0cmVhbXMvcmVsZWFzZXMvdG1wL3NvY2lhbC1zdHJlYW1zL3NyYy9zY3JpcHRzL3NlbGVjdGl6ZS1ibGFja2xpc3RlZC1jaGFycy5jb2ZmZWUiLCIvc3J2L3NvY2lhbC1zdHJlYW1zL3JlbGVhc2VzL3RtcC9zb2NpYWwtc3RyZWFtcy9zcmMvc2NyaXB0cy9zZWxlY3RpemUtdGFiLXNlcGFyYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFBLENBQUE7QUFBQSxPQU1BLENBQVEsV0FBUixDQU5BLENBQUE7O0FBQUEsT0FTQSxDQUFRLDJCQUFSLENBVEEsQ0FBQTs7QUFBQSxPQVVBLENBQVEsK0JBQVIsQ0FWQSxDQUFBOztBQUFBLE9BYUEsQ0FBUSxrQkFBUixDQWJBLENBQUE7O0FBQUEsT0FtQkEsQ0FBUSxtQ0FBUixDQW5CQSxDQUFBOztBQUFBLE9Bb0JBLENBQVEsK0JBQVIsQ0FwQkEsQ0FBQTs7QUFBQSxPQXFCQSxDQUFRLDZCQUFSLENBckJBLENBQUE7O0FBQUEsT0FzQkEsQ0FBUSxpQ0FBUixDQXRCQSxDQUFBOztBQUFBLE9BdUJBLENBQVEsK0JBQVIsQ0F2QkEsQ0FBQTs7Ozs7QUNBQSxZQUFBLENBQUE7QUFHQSxJQUFPLHNCQUFQO0FBQ0MsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixFQUFqQixDQUREO0NBSEE7O0FBTUEsSUFBTywwQkFBUDtBQUNDLEVBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFmLEdBQXFCLFNBQUEsR0FBQSxDQUFyQixDQUREO0NBTkE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QWxCLENBQXdCLEtBQXhCLEVBQTJCLFNBQTNCLEVBaEJXO0lBQUEsRUFBQTtFQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsRUFKNkI7QUFBQSxDQUE1QyxDQUZBLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCJcblxuIyBleHRyYSBtb2Rlcm5penIgbW9kdWxlc1xuIyByZXF1aXJlICdicm93c2Vybml6ci90ZXN0L2Nzcy9vcGFjaXR5J1xuXG4jIE1haW4gYXBwIGxvYWRlclxucmVxdWlyZSAnLi9hcHBNYWluJ1xuXG4jIFNlbGVjdGl6ZVxucmVxdWlyZSAnLi9zZWxlY3RpemUtdGFiLXNlcGFyYXRvcidcbnJlcXVpcmUgJy4vc2VsZWN0aXplLWJsYWNrbGlzdGVkLWNoYXJzJ1xuXG4jIGNvbnNvbGUgbG9nIHNoaW1cbnJlcXVpcmUgXCJjb25zb2xlLWxvZy1zaGltXCJcblxuIyBMb2FkIE1vZHVsZXMgdGhhdCB3aWxsIGJlIHVzZWQgYnkgdGhlIGFwcFxuIyBUaGVzZSBtb2R1bGVzIHdpbGwgYmUgYXV0b21hdGljYWxseSBzdGFydGVkXG4jIHdoZW4gdGhlIGFwcCBzdGFydHMgKG9uIGRvY3JlYWR5KSBpbiB0aGVcbiMgb3JkZXIgdGhleSBhcHBlYXIgaGVyZS5cbnJlcXVpcmUgJy4vTW9kdWxlcy9TU09wdGlvbnMvc3NPcHRpb25zTWFpbidcbnJlcXVpcmUgJy4vTW9kdWxlcy9TU1Bvc3RzL3NzUG9zdHNNYWluJ1xucmVxdWlyZSAnLi9Nb2R1bGVzL1NTQXV0aC9zc0F1dGhNYWluJ1xucmVxdWlyZSAnLi9Nb2R1bGVzL1NTU2VhcmNoL3NzU2VhcmNoTWFpbidcbnJlcXVpcmUgJy4vTW9kdWxlcy9TU0FkbWluL3NzQWRtaW5NYWluJ1xuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuIyBzaGltIGZvciBjb25zb2xlIGxvZ1xuaWYgbm90IHdpbmRvdy5jb25zb2xlP1xuXHR3aW5kb3cuY29uc29sZSA9IHt9XG5cbmlmIG5vdCB3aW5kb3cuY29uc29sZS5sb2c/XG5cdHdpbmRvdy5jb25zb2xlLmxvZyA9ICgpIC0+XG5cdFx0IyBkbyBub3RoaW5nXG4iLCJ2YXIgTW9kZXJuaXpyID0gcmVxdWlyZSgnLi9saWIvTW9kZXJuaXpyJyksXG4gICAgTW9kZXJuaXpyUHJvdG8gPSByZXF1aXJlKCcuL2xpYi9Nb2Rlcm5penJQcm90bycpLFxuICAgIGNsYXNzZXMgPSByZXF1aXJlKCcuL2xpYi9jbGFzc2VzJyksXG4gICAgdGVzdFJ1bm5lciA9IHJlcXVpcmUoJy4vbGliL3Rlc3RSdW5uZXInKSxcbiAgICBzZXRDbGFzc2VzID0gcmVxdWlyZSgnLi9saWIvc2V0Q2xhc3NlcycpO1xuXG4vLyBSdW4gZWFjaCB0ZXN0XG50ZXN0UnVubmVyKCk7XG5cbi8vIFJlbW92ZSB0aGUgXCJuby1qc1wiIGNsYXNzIGlmIGl0IGV4aXN0c1xuc2V0Q2xhc3NlcyhjbGFzc2VzKTtcblxuZGVsZXRlIE1vZGVybml6clByb3RvLmFkZFRlc3Q7XG5kZWxldGUgTW9kZXJuaXpyUHJvdG8uYWRkQXN5bmNUZXN0O1xuXG4vLyBSdW4gdGhlIHRoaW5ncyB0aGF0IGFyZSBzdXBwb3NlZCB0byBydW4gYWZ0ZXIgdGhlIHRlc3RzXG5mb3IgKHZhciBpID0gMDsgaSA8IE1vZGVybml6ci5fcS5sZW5ndGg7IGkrKykge1xuICBNb2Rlcm5penIuX3FbaV0oKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2Rlcm5penI7XG4iLCJ2YXIgTW9kZXJuaXpyUHJvdG8gPSByZXF1aXJlKCcuL01vZGVybml6clByb3RvJyk7XG5cblxuICAvLyBGYWtlIHNvbWUgb2YgT2JqZWN0LmNyZWF0ZVxuICAvLyBzbyB3ZSBjYW4gZm9yY2Ugbm9uIHRlc3QgcmVzdWx0c1xuICAvLyB0byBiZSBub24gXCJvd25cIiBwcm9wZXJ0aWVzLlxuICB2YXIgTW9kZXJuaXpyID0gZnVuY3Rpb24oKXt9O1xuICBNb2Rlcm5penIucHJvdG90eXBlID0gTW9kZXJuaXpyUHJvdG87XG5cbiAgLy8gTGVhayBtb2Rlcm5penIgZ2xvYmFsbHkgd2hlbiB5b3UgYHJlcXVpcmVgIGl0XG4gIC8vIHJhdGhlciB0aGFuIGZvcmNlIGl0IGhlcmUuXG4gIC8vIE92ZXJ3cml0ZSBuYW1lIHNvIGNvbnN0cnVjdG9yIG5hbWUgaXMgbmljZXIgOkRcbiAgTW9kZXJuaXpyID0gbmV3IE1vZGVybml6cigpO1xuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVybml6cjsiLCJ2YXIgdGVzdHMgPSByZXF1aXJlKCcuL3Rlc3RzJyk7XG5cblxuICB2YXIgTW9kZXJuaXpyUHJvdG8gPSB7XG4gICAgLy8gVGhlIGN1cnJlbnQgdmVyc2lvbiwgZHVtbXlcbiAgICBfdmVyc2lvbjogJ3YzLjAuMHByZScsXG5cbiAgICAvLyBBbnkgc2V0dGluZ3MgdGhhdCBkb24ndCB3b3JrIGFzIHNlcGFyYXRlIG1vZHVsZXNcbiAgICAvLyBjYW4gZ28gaW4gaGVyZSBhcyBjb25maWd1cmF0aW9uLlxuICAgIF9jb25maWc6IHtcbiAgICAgIGNsYXNzUHJlZml4IDogJycsXG4gICAgICBlbmFibGVDbGFzc2VzIDogdHJ1ZVxuICAgIH0sXG5cbiAgICAvLyBRdWV1ZSBvZiB0ZXN0c1xuICAgIF9xOiBbXSxcblxuICAgIC8vIFN0dWIgdGhlc2UgZm9yIHBlb3BsZSB3aG8gYXJlIGxpc3RlbmluZ1xuICAgIG9uOiBmdW5jdGlvbiggdGVzdCwgY2IgKSB7XG4gICAgICAvLyBJIGRvbid0IHJlYWxseSB0aGluayBwZW9wbGUgc2hvdWxkIGRvIHRoaXMsIGJ1dCB3ZSBjYW5cbiAgICAgIC8vIHNhZmUgZ3VhcmQgaXQgYSBiaXQuXG4gICAgICAvLyAtLSBOT1RFOjogdGhpcyBnZXRzIFdBWSBvdmVycmlkZGVuIGluIHNyYy9hZGRUZXN0IGZvclxuICAgICAgLy8gYWN0dWFsIGFzeW5jIHRlc3RzLiBUaGlzIGlzIGluIGNhc2UgcGVvcGxlIGxpc3RlbiB0b1xuICAgICAgLy8gc3luY2hyb25vdXMgdGVzdHMuIEkgd291bGQgbGVhdmUgaXQgb3V0LCBidXQgdGhlIGNvZGVcbiAgICAgIC8vIHRvICpkaXNhbGxvdyogc3luYyB0ZXN0cyBpbiB0aGUgcmVhbCB2ZXJzaW9uIG9mIHRoaXNcbiAgICAgIC8vIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGxhcmdlciB0aGFuIHRoaXMuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBjYih0aGlzW3Rlc3RdKTtcbiAgICAgIH0sIDApO1xuICAgIH0sXG5cbiAgICBhZGRUZXN0OiBmdW5jdGlvbiggbmFtZSwgZm4sIG9wdGlvbnMgKSB7XG4gICAgICB0ZXN0cy5wdXNoKHtuYW1lIDogbmFtZSwgZm4gOiBmbiwgb3B0aW9ucyA6IG9wdGlvbnMgfSk7XG4gICAgfSxcblxuICAgIGFkZEFzeW5jVGVzdDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICB0ZXN0cy5wdXNoKHtuYW1lIDogbnVsbCwgZm4gOiBmbn0pO1xuICAgIH1cbiAgfTtcblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBNb2Rlcm5penJQcm90bzsiLCJcbiAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzZXM7IiwiXG4gIHZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkoZG9jdW1lbnQsIGFyZ3VtZW50cyk7XG4gIH07XG4gIFxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVFbGVtZW50OyIsIlxuICB2YXIgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGRvY0VsZW1lbnQ7IiwidmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL2NyZWF0ZUVsZW1lbnQnKTtcblxuXG4gIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgLy8gQWZ0ZXIgcGFnZSBsb2FkIGluamVjdGluZyBhIGZha2UgYm9keSBkb2Vzbid0IHdvcmsgc28gY2hlY2sgaWYgYm9keSBleGlzdHNcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICBpZighYm9keSkge1xuICAgICAgLy8gQ2FuJ3QgdXNlIHRoZSByZWFsIGJvZHkgY3JlYXRlIGEgZmFrZSBvbmUuXG4gICAgICBib2R5ID0gY3JlYXRlRWxlbWVudCgnYm9keScpO1xuICAgICAgYm9keS5mYWtlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keTtcbiAgfVxuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJvZHk7IiwidmFyIE1vZGVybml6clByb3RvID0gcmVxdWlyZSgnLi9Nb2Rlcm5penJQcm90bycpO1xudmFyIGRvY0VsZW1lbnQgPSByZXF1aXJlKCcuL2RvY0VsZW1lbnQnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi9jcmVhdGVFbGVtZW50Jyk7XG52YXIgZ2V0Qm9keSA9IHJlcXVpcmUoJy4vZ2V0Qm9keScpO1xuXG5cbiAgLy8gSW5qZWN0IGVsZW1lbnQgd2l0aCBzdHlsZSBlbGVtZW50IGFuZCBzb21lIENTUyBydWxlc1xuICBmdW5jdGlvbiBpbmplY3RFbGVtZW50V2l0aFN0eWxlcyggcnVsZSwgY2FsbGJhY2ssIG5vZGVzLCB0ZXN0bmFtZXMgKSB7XG4gICAgdmFyIG1vZCA9ICdtb2Rlcm5penInO1xuICAgIHZhciBzdHlsZTtcbiAgICB2YXIgcmV0O1xuICAgIHZhciBub2RlO1xuICAgIHZhciBkb2NPdmVyZmxvdztcbiAgICB2YXIgZGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGJvZHkgPSBnZXRCb2R5KCk7XG5cbiAgICBpZiAoIHBhcnNlSW50KG5vZGVzLCAxMCkgKSB7XG4gICAgICAvLyBJbiBvcmRlciBub3QgdG8gZ2l2ZSBmYWxzZSBwb3NpdGl2ZXMgd2UgY3JlYXRlIGEgbm9kZSBmb3IgZWFjaCB0ZXN0XG4gICAgICAvLyBUaGlzIGFsc28gYWxsb3dzIHRoZSBtZXRob2QgdG8gc2NhbGUgZm9yIHVuc3BlY2lmaWVkIHVzZXNcbiAgICAgIHdoaWxlICggbm9kZXMtLSApIHtcbiAgICAgICAgbm9kZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub2RlLmlkID0gdGVzdG5hbWVzID8gdGVzdG5hbWVzW25vZGVzXSA6IG1vZCArIChub2RlcyArIDEpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPHN0eWxlPiBlbGVtZW50cyBpbiBJRTYtOSBhcmUgY29uc2lkZXJlZCAnTm9TY29wZScgZWxlbWVudHMgYW5kIHRoZXJlZm9yZSB3aWxsIGJlIHJlbW92ZWRcbiAgICAvLyB3aGVuIGluamVjdGVkIHdpdGggaW5uZXJIVE1MLiBUbyBnZXQgYXJvdW5kIHRoaXMgeW91IG5lZWQgdG8gcHJlcGVuZCB0aGUgJ05vU2NvcGUnIGVsZW1lbnRcbiAgICAvLyB3aXRoIGEgJ3Njb3BlZCcgZWxlbWVudCwgaW4gb3VyIGNhc2UgdGhlIHNvZnQtaHlwaGVuIGVudGl0eSBhcyBpdCB3b24ndCBtZXNzIHdpdGggb3VyIG1lYXN1cmVtZW50cy5cbiAgICAvLyBtc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMzg5NyUyOFZTLjg1JTI5LmFzcHhcbiAgICAvLyBEb2N1bWVudHMgc2VydmVkIGFzIHhtbCB3aWxsIHRocm93IGlmIHVzaW5nICZzaHk7IHNvIHVzZSB4bWwgZnJpZW5kbHkgZW5jb2RlZCB2ZXJzaW9uLiBTZWUgaXNzdWUgIzI3N1xuICAgIHN0eWxlID0gWycmIzE3MzsnLCc8c3R5bGUgaWQ9XCJzJywgbW9kLCAnXCI+JywgcnVsZSwgJzwvc3R5bGU+J10uam9pbignJyk7XG4gICAgZGl2LmlkID0gbW9kO1xuICAgIC8vIElFNiB3aWxsIGZhbHNlIHBvc2l0aXZlIG9uIHNvbWUgdGVzdHMgZHVlIHRvIHRoZSBzdHlsZSBlbGVtZW50IGluc2lkZSB0aGUgdGVzdCBkaXYgc29tZWhvdyBpbnRlcmZlcmluZyBvZmZzZXRIZWlnaHQsIHNvIGluc2VydCBpdCBpbnRvIGJvZHkgb3IgZmFrZWJvZHkuXG4gICAgLy8gT3BlcmEgd2lsbCBhY3QgYWxsIHF1aXJreSB3aGVuIGluamVjdGluZyBlbGVtZW50cyBpbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBwYWdlIGlzIHNlcnZlZCBhcyB4bWwsIG5lZWRzIGZha2Vib2R5IHRvby4gIzI3MFxuICAgICghYm9keS5mYWtlID8gZGl2IDogYm9keSkuaW5uZXJIVE1MICs9IHN0eWxlO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBpZiAoIGJvZHkuZmFrZSApIHtcbiAgICAgIC8vYXZvaWQgY3Jhc2hpbmcgSUU4LCBpZiBiYWNrZ3JvdW5kIGltYWdlIGlzIHVzZWRcbiAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgLy9TYWZhcmkgNS4xMy81LjEuNCBPU1ggc3RvcHMgbG9hZGluZyBpZiA6Oi13ZWJraXQtc2Nyb2xsYmFyIGlzIHVzZWQgYW5kIHNjcm9sbGJhcnMgYXJlIHZpc2libGVcbiAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgIGRvY092ZXJmbG93ID0gZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdztcbiAgICAgIGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgIGRvY0VsZW1lbnQuYXBwZW5kQ2hpbGQoYm9keSk7XG4gICAgfVxuXG4gICAgcmV0ID0gY2FsbGJhY2soZGl2LCBydWxlKTtcbiAgICAvLyBJZiB0aGlzIGlzIGRvbmUgYWZ0ZXIgcGFnZSBsb2FkIHdlIGRvbid0IHdhbnQgdG8gcmVtb3ZlIHRoZSBib2R5IHNvIGNoZWNrIGlmIGJvZHkgZXhpc3RzXG4gICAgaWYgKCBib2R5LmZha2UgKSB7XG4gICAgICBib2R5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYm9keSk7XG4gICAgICBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gZG9jT3ZlcmZsb3c7XG4gICAgICAvLyBUcmlnZ2VyIGxheW91dCBzbyBraW5ldGljIHNjcm9sbGluZyBpc24ndCBkaXNhYmxlZCBpbiBpT1M2K1xuICAgICAgZG9jRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpdik7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhcmV0O1xuXG4gIH1cblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBpbmplY3RFbGVtZW50V2l0aFN0eWxlczsiLCJcbiAgLyoqXG4gICAqIGlzIHJldHVybnMgYSBib29sZWFuIGZvciBpZiB0eXBlb2Ygb2JqIGlzIGV4YWN0bHkgdHlwZS5cbiAgICovXG4gIGZ1bmN0aW9uIGlzKCBvYmosIHR5cGUgKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IHR5cGU7XG4gIH1cbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGlzOyIsInZhciBNb2Rlcm5penJQcm90byA9IHJlcXVpcmUoJy4vTW9kZXJuaXpyUHJvdG8nKTtcblxuXG4gIC8vIExpc3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIHNldCBmb3IgY3NzIHRlc3RzLiBTZWUgdGlja2V0ICMyMVxuICB2YXIgcHJlZml4ZXMgPSAnIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtICcuc3BsaXQoJyAnKTtcblxuICAvLyBleHBvc2UgdGhlc2UgZm9yIHRoZSBwbHVnaW4gQVBJLiBMb29rIGluIHRoZSBzb3VyY2UgZm9yIGhvdyB0byBqb2luKCkgdGhlbSBhZ2FpbnN0IHlvdXIgaW5wdXRcbiAgTW9kZXJuaXpyUHJvdG8uX3ByZWZpeGVzID0gcHJlZml4ZXM7XG5cbiAgXG5cbm1vZHVsZS5leHBvcnRzID0gcHJlZml4ZXM7IiwidmFyIE1vZGVybml6ciA9IHJlcXVpcmUoJy4vTW9kZXJuaXpyJyk7XG52YXIgZG9jRWxlbWVudCA9IHJlcXVpcmUoJy4vZG9jRWxlbWVudCcpO1xuXG5cbiAgLy8gUGFzcyBpbiBhbiBhbmQgYXJyYXkgb2YgY2xhc3MgbmFtZXMsIGUuZy46XG4gIC8vICBbJ25vLXdlYnAnLCAnYm9yZGVycmFkaXVzJywgLi4uXVxuICBmdW5jdGlvbiBzZXRDbGFzc2VzKCBjbGFzc2VzICkge1xuICAgIHZhciBjbGFzc05hbWUgPSBkb2NFbGVtZW50LmNsYXNzTmFtZTtcbiAgICB2YXIgcmVnZXg7XG4gICAgdmFyIGNsYXNzUHJlZml4ID0gTW9kZXJuaXpyLl9jb25maWcuY2xhc3NQcmVmaXggfHwgJyc7XG5cbiAgICAvLyBDaGFuZ2UgYG5vLWpzYCB0byBganNgICh3ZSBkbyB0aGlzIHJlZ2FyZGxlcyBvZiB0aGUgYGVuYWJsZUNsYXNzZXNgXG4gICAgLy8gb3B0aW9uKVxuICAgIC8vIEhhbmRsZSBjbGFzc1ByZWZpeCBvbiB0aGlzIHRvb1xuICAgIHZhciByZUpTID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpJytjbGFzc1ByZWZpeCsnbm8tanMoXFxcXHN8JCknKTtcbiAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUucmVwbGFjZShyZUpTLCAnJDEnK2NsYXNzUHJlZml4KydqcyQyJyk7XG5cbiAgICBpZihNb2Rlcm5penIuX2NvbmZpZy5lbmFibGVDbGFzc2VzKSB7XG4gICAgICAvLyBBZGQgdGhlIG5ldyBjbGFzc2VzXG4gICAgICBjbGFzc05hbWUgKz0gJyAnICsgY2xhc3NQcmVmaXggKyBjbGFzc2VzLmpvaW4oJyAnICsgY2xhc3NQcmVmaXgpO1xuICAgICAgZG9jRWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgfVxuXG4gIH1cblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDbGFzc2VzOyIsInZhciB0ZXN0cyA9IHJlcXVpcmUoJy4vdGVzdHMnKTtcbnZhciBNb2Rlcm5penIgPSByZXF1aXJlKCcuL01vZGVybml6cicpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcblxuXG4gIC8vIFJ1biB0aHJvdWdoIGFsbCB0ZXN0cyBhbmQgZGV0ZWN0IHRoZWlyIHN1cHBvcnQgaW4gdGhlIGN1cnJlbnQgVUEuXG4gIGZ1bmN0aW9uIHRlc3RSdW5uZXIoKSB7XG4gICAgdmFyIGZlYXR1cmVOYW1lcztcbiAgICB2YXIgZmVhdHVyZTtcbiAgICB2YXIgYWxpYXNJZHg7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB2YXIgbmFtZUlkeDtcbiAgICB2YXIgZmVhdHVyZU5hbWU7XG4gICAgdmFyIGZlYXR1cmVOYW1lU3BsaXQ7XG4gICAgdmFyIG1vZGVybml6clByb3A7XG4gICAgdmFyIG1Qcm9wQ291bnQ7XG5cbiAgICBmb3IgKCB2YXIgZmVhdHVyZUlkeCBpbiB0ZXN0cyApIHtcbiAgICAgIGZlYXR1cmVOYW1lcyA9IFtdO1xuICAgICAgZmVhdHVyZSA9IHRlc3RzW2ZlYXR1cmVJZHhdO1xuICAgICAgLy8gcnVuIHRoZSB0ZXN0LCB0aHJvdyB0aGUgcmV0dXJuIHZhbHVlIGludG8gdGhlIE1vZGVybml6cixcbiAgICAgIC8vICAgdGhlbiBiYXNlZCBvbiB0aGF0IGJvb2xlYW4sIGRlZmluZSBhbiBhcHByb3ByaWF0ZSBjbGFzc05hbWVcbiAgICAgIC8vICAgYW5kIHB1c2ggaXQgaW50byBhbiBhcnJheSBvZiBjbGFzc2VzIHdlJ2xsIGpvaW4gbGF0ZXIuXG4gICAgICAvL1xuICAgICAgLy8gICBJZiB0aGVyZSBpcyBubyBuYW1lLCBpdCdzIGFuICdhc3luYycgdGVzdCB0aGF0IGlzIHJ1bixcbiAgICAgIC8vICAgYnV0IG5vdCBkaXJlY3RseSBhZGRlZCB0byB0aGUgb2JqZWN0LiBUaGF0IHNob3VsZFxuICAgICAgLy8gICBiZSBkb25lIHdpdGggYSBwb3N0LXJ1biBhZGRUZXN0IGNhbGwuXG4gICAgICBpZiAoIGZlYXR1cmUubmFtZSApIHtcbiAgICAgICAgZmVhdHVyZU5hbWVzLnB1c2goZmVhdHVyZS5uYW1lLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGlmIChmZWF0dXJlLm9wdGlvbnMgJiYgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMgJiYgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gQWRkIGFsbCB0aGUgYWxpYXNlcyBpbnRvIHRoZSBuYW1lcyBsaXN0XG4gICAgICAgICAgZm9yIChhbGlhc0lkeCA9IDA7IGFsaWFzSWR4IDwgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMubGVuZ3RoOyBhbGlhc0lkeCsrKSB7XG4gICAgICAgICAgICBmZWF0dXJlTmFtZXMucHVzaChmZWF0dXJlLm9wdGlvbnMuYWxpYXNlc1thbGlhc0lkeF0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgdGVzdCwgb3IgdXNlIHRoZSByYXcgdmFsdWUgaWYgaXQncyBub3QgYSBmdW5jdGlvblxuICAgICAgcmVzdWx0ID0gaXMoZmVhdHVyZS5mbiwgJ2Z1bmN0aW9uJykgPyBmZWF0dXJlLmZuKCkgOiBmZWF0dXJlLmZuO1xuXG5cbiAgICAgIC8vIFNldCBlYWNoIG9mIHRoZSBuYW1lcyBvbiB0aGUgTW9kZXJuaXpyIG9iamVjdFxuICAgICAgZm9yIChuYW1lSWR4ID0gMDsgbmFtZUlkeCA8IGZlYXR1cmVOYW1lcy5sZW5ndGg7IG5hbWVJZHgrKykge1xuICAgICAgICBmZWF0dXJlTmFtZSA9IGZlYXR1cmVOYW1lc1tuYW1lSWR4XTtcbiAgICAgICAgLy8gU3VwcG9ydCBkb3QgcHJvcGVydGllcyBhcyBzdWIgdGVzdHMuIFdlIGRvbid0IGRvIGNoZWNraW5nIHRvIG1ha2Ugc3VyZVxuICAgICAgICAvLyB0aGF0IHRoZSBpbXBsaWVkIHBhcmVudCB0ZXN0cyBoYXZlIGJlZW4gYWRkZWQuIFlvdSBtdXN0IGNhbGwgdGhlbSBpblxuICAgICAgICAvLyBvcmRlciAoZWl0aGVyIGluIHRoZSB0ZXN0LCBvciBtYWtlIHRoZSBwYXJlbnQgdGVzdCBhIGRlcGVuZGVuY3kpLlxuICAgICAgICAvL1xuICAgICAgICAvLyBDYXAgaXQgdG8gVFdPIHRvIG1ha2UgdGhlIGxvZ2ljIHNpbXBsZSBhbmQgYmVjYXVzZSB3aG8gbmVlZHMgdGhhdCBraW5kIG9mIHN1YnRlc3RpbmdcbiAgICAgICAgLy8gaGFzaHRhZyBmYW1vdXMgbGFzdCB3b3Jkc1xuICAgICAgICBmZWF0dXJlTmFtZVNwbGl0ID0gZmVhdHVyZU5hbWUuc3BsaXQoJy4nKTtcblxuICAgICAgICBpZiAoZmVhdHVyZU5hbWVTcGxpdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV0gPSByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmVhdHVyZU5hbWVTcGxpdC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV1bZmVhdHVyZU5hbWVTcGxpdFsxXV0gPSByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjbGFzc2VzLnB1c2goKHJlc3VsdCA/ICcnIDogJ25vLScpICsgZmVhdHVyZU5hbWVTcGxpdC5qb2luKCctJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RSdW5uZXI7IiwidmFyIE1vZGVybml6clByb3RvID0gcmVxdWlyZSgnLi9Nb2Rlcm5penJQcm90bycpO1xudmFyIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzID0gcmVxdWlyZSgnLi9pbmplY3RFbGVtZW50V2l0aFN0eWxlcycpO1xuXG5cbiAgdmFyIHRlc3RTdHlsZXMgPSBNb2Rlcm5penJQcm90by50ZXN0U3R5bGVzID0gaW5qZWN0RWxlbWVudFdpdGhTdHlsZXM7XG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RTdHlsZXM7IiwiXG4gIHZhciB0ZXN0cyA9IFtdO1xuICBcbm1vZHVsZS5leHBvcnRzID0gdGVzdHM7IiwidmFyIE1vZGVybml6ciA9IHJlcXVpcmUoJy4vLi4vbGliL01vZGVybml6cicpO1xudmFyIHByZWZpeGVzID0gcmVxdWlyZSgnLi8uLi9saWIvcHJlZml4ZXMnKTtcbnZhciB0ZXN0U3R5bGVzID0gcmVxdWlyZSgnLi8uLi9saWIvdGVzdFN0eWxlcycpO1xuXG4vKiFcbntcbiAgXCJuYW1lXCI6IFwiVG91Y2ggRXZlbnRzXCIsXG4gIFwicHJvcGVydHlcIjogXCJ0b3VjaGV2ZW50c1wiLFxuICBcImNhbml1c2VcIiA6IFwidG91Y2hcIixcbiAgXCJ0YWdzXCI6IFtcIm1lZGlhXCIsIFwiYXR0cmlidXRlXCJdLFxuICBcIm5vdGVzXCI6IFt7XG4gICAgXCJuYW1lXCI6IFwiVG91Y2ggRXZlbnRzIHNwZWNcIixcbiAgICBcImhyZWZcIjogXCJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDEzL1dELXRvdWNoLWV2ZW50cy0yMDEzMDEyNC9cIlxuICB9XSxcbiAgXCJ3YXJuaW5nc1wiOiBbXG4gICAgXCJJbmRpY2F0ZXMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIFRvdWNoIEV2ZW50cyBzcGVjLCBhbmQgZG9lcyBub3QgbmVjZXNzYXJpbHkgcmVmbGVjdCBhIHRvdWNoc2NyZWVuIGRldmljZVwiXG4gIF0sXG4gIFwia25vd25CdWdzXCI6IFtcbiAgICBcIkZhbHNlLXBvc2l0aXZlIG9uIHNvbWUgY29uZmlndXJhdGlvbnMgb2YgTm9raWEgTjkwMFwiLFxuICAgIFwiRmFsc2UtcG9zaXRpdmUgb24gc29tZSBCbGFja0JlcnJ5IDYuMCBidWlsZHMg4oCTIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy8zNzIjaXNzdWVjb21tZW50LTMxMTI2OTVcIlxuICBdXG59XG4hKi9cbi8qIERPQ1xuXG5JbmRpY2F0ZXMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIFczQyBUb3VjaCBFdmVudHMgQVBJLlxuXG5UaGlzICpkb2VzIG5vdCogbmVjZXNzYXJpbHkgcmVmbGVjdCBhIHRvdWNoc2NyZWVuIGRldmljZTpcblxuKiBPbGRlciB0b3VjaHNjcmVlbiBkZXZpY2VzIG9ubHkgZW11bGF0ZSBtb3VzZSBldmVudHNcbiogTW9kZXJuIElFIHRvdWNoIGRldmljZXMgaW1wbGVtZW50IHRoZSBQb2ludGVyIEV2ZW50cyBBUEkgaW5zdGVhZDogdXNlIGBNb2Rlcm5penIucG9pbnRlcmV2ZW50c2AgdG8gZGV0ZWN0IHN1cHBvcnQgZm9yIHRoYXRcbiogU29tZSBicm93c2VycyAmIE9TIHNldHVwcyBtYXkgZW5hYmxlIHRvdWNoIEFQSXMgd2hlbiBubyB0b3VjaHNjcmVlbiBpcyBjb25uZWN0ZWRcbiogRnV0dXJlIGJyb3dzZXJzIG1heSBpbXBsZW1lbnQgb3RoZXIgZXZlbnQgbW9kZWxzIGZvciB0b3VjaCBpbnRlcmFjdGlvbnNcblxuU2VlIHRoaXMgYXJ0aWNsZTogW1lvdSBDYW4ndCBEZXRlY3QgQSBUb3VjaHNjcmVlbl0oaHR0cDovL3d3dy5zdHVjb3guY29tL2Jsb2cveW91LWNhbnQtZGV0ZWN0LWEtdG91Y2hzY3JlZW4vKS5cblxuSXQncyByZWNvbW1lbmRlZCB0byBiaW5kIGJvdGggbW91c2UgYW5kIHRvdWNoL3BvaW50ZXIgZXZlbnRzIHNpbXVsdGFuZW91c2x5IOKAkyBzZWUgW3RoaXMgSFRNTDUgUm9ja3MgdHV0b3JpYWxdKGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vbW9iaWxlL3RvdWNoYW5kbW91c2UvKS5cblxuVGhpcyB0ZXN0IHdpbGwgYWxzbyByZXR1cm4gYHRydWVgIGZvciBGaXJlZm94IDQgTXVsdGl0b3VjaCBzdXBwb3J0LlxuXG4qL1xuXG4gIC8vIENocm9tZSAoZGVza3RvcCkgdXNlZCB0byBsaWUgYWJvdXQgaXRzIHN1cHBvcnQgb24gdGhpcywgYnV0IHRoYXQgaGFzIHNpbmNlIGJlZW4gcmVjdGlmaWVkOiBodHRwOi8vY3JidWcuY29tLzM2NDE1XG4gIE1vZGVybml6ci5hZGRUZXN0KCd0b3VjaGV2ZW50cycsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBib29sO1xuICAgIGlmKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkge1xuICAgICAgYm9vbCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBxdWVyeSA9IFsnQG1lZGlhICgnLHByZWZpeGVzLmpvaW4oJ3RvdWNoLWVuYWJsZWQpLCgnKSwnaGVhcnR6JywnKScsJ3sjbW9kZXJuaXpye3RvcDo5cHg7cG9zaXRpb246YWJzb2x1dGV9fSddLmpvaW4oJycpO1xuICAgICAgdGVzdFN0eWxlcyhxdWVyeSwgZnVuY3Rpb24oIG5vZGUgKSB7XG4gICAgICAgIGJvb2wgPSBub2RlLm9mZnNldFRvcCA9PT0gOTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYm9vbDtcbiAgfSk7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuLypnbG9iYWxzIEhhbmRsZWJhcnM6IHRydWUgKi9cbnZhciBiYXNlID0gcmVxdWlyZShcIi4vaGFuZGxlYmFycy9iYXNlXCIpO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxudmFyIFNhZmVTdHJpbmcgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nXCIpW1wiZGVmYXVsdFwiXTtcbnZhciBFeGNlcHRpb24gPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3V0aWxzXCIpO1xudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3J1bnRpbWVcIik7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59O1xuXG52YXIgSGFuZGxlYmFycyA9IGNyZWF0ZSgpO1xuSGFuZGxlYmFycy5jcmVhdGUgPSBjcmVhdGU7XG5cbkhhbmRsZWJhcnNbJ2RlZmF1bHQnXSA9IEhhbmRsZWJhcnM7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSGFuZGxlYmFyczsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBVdGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xudmFyIEV4Y2VwdGlvbiA9IHJlcXVpcmUoXCIuL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBWRVJTSU9OID0gXCIyLjAuMFwiO1xuZXhwb3J0cy5WRVJTSU9OID0gVkVSU0lPTjt2YXIgQ09NUElMRVJfUkVWSVNJT04gPSA2O1xuZXhwb3J0cy5DT01QSUxFUl9SRVZJU0lPTiA9IENPTVBJTEVSX1JFVklTSU9OO1xudmFyIFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgMzogJz09IDEuMC4wLXJjLjQnLFxuICA0OiAnPT0gMS54LngnLFxuICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gIDY6ICc+PSAyLjAuMC1iZXRhLjEnXG59O1xuZXhwb3J0cy5SRVZJU0lPTl9DSEFOR0VTID0gUkVWSVNJT05fQ0hBTkdFUztcbnZhciBpc0FycmF5ID0gVXRpbHMuaXNBcnJheSxcbiAgICBpc0Z1bmN0aW9uID0gVXRpbHMuaXNGdW5jdGlvbixcbiAgICB0b1N0cmluZyA9IFV0aWxzLnRvU3RyaW5nLFxuICAgIG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xufVxuXG5leHBvcnRzLkhhbmRsZWJhcnNFbnZpcm9ubWVudCA9IEhhbmRsZWJhcnNFbnZpcm9ubWVudDtIYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZyxcblxuICByZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICBVdGlscy5leHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHBhcnRpYWwpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgVXRpbHMuZXh0ZW5kKHRoaXMucGFydGlhbHMsICBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICB9XG59O1xuXG5mdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHVjdC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvbWVvbmUgaXMgYWN0dWFsbHkgdHJ5aW5nIHRvIGNhbGwgc29tZXRoaW5nLCBibG93IHVwLlxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk1pc3NpbmcgaGVscGVyOiAnXCIgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aC0xXS5uYW1lICsgXCInXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGZuKHRoaXMpO1xuICAgIH0gZWxzZSBpZihjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYoY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICAgIG9wdGlvbnMuaWRzID0gW29wdGlvbnMubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICBvcHRpb25zID0ge2RhdGE6IGRhdGF9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIHZhciBmbiA9IG9wdGlvbnMuZm4sIGludmVyc2UgPSBvcHRpb25zLmludmVyc2U7XG4gICAgdmFyIGkgPSAwLCByZXQgPSBcIlwiLCBkYXRhO1xuXG4gICAgdmFyIGNvbnRleHRQYXRoO1xuICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgIGNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSkgKyAnLic7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgfVxuXG4gICAgaWYoY29udGV4dCAmJiB0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGZvcih2YXIgaiA9IGNvbnRleHQubGVuZ3RoOyBpPGo7IGkrKykge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLmluZGV4ID0gaTtcbiAgICAgICAgICAgIGRhdGEuZmlyc3QgPSAoaSA9PT0gMCk7XG4gICAgICAgICAgICBkYXRhLmxhc3QgID0gKGkgPT09IChjb250ZXh0Lmxlbmd0aC0xKSk7XG5cbiAgICAgICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ldLCB7IGRhdGE6IGRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcih2YXIga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZihjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgICAgICAgZGF0YS5rZXkgPSBrZXk7XG4gICAgICAgICAgICAgIGRhdGEuaW5kZXggPSBpO1xuICAgICAgICAgICAgICBkYXRhLmZpcnN0ID0gKGkgPT09IDApO1xuXG4gICAgICAgICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGtleTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0ID0gcmV0ICsgZm4oY29udGV4dFtrZXldLCB7ZGF0YTogZGF0YX0pO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKGkgPT09IDApe1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgVXRpbHMuaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICB2YXIgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKCFVdGlscy5pc0VtcHR5KGNvbnRleHQpKSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIHZhciBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IFV0aWxzLmFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pO1xuICAgICAgICBvcHRpb25zID0ge2RhdGE6ZGF0YX07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbihtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgdmFyIGxldmVsID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsID8gcGFyc2VJbnQob3B0aW9ucy5kYXRhLmxldmVsLCAxMCkgOiAxO1xuICAgIGluc3RhbmNlLmxvZyhsZXZlbCwgbWVzc2FnZSk7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbihvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmpbZmllbGRdO1xuICB9KTtcbn1cblxudmFyIGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiB7IDA6ICdkZWJ1ZycsIDE6ICdpbmZvJywgMjogJ3dhcm4nLCAzOiAnZXJyb3InIH0sXG5cbiAgLy8gU3RhdGUgZW51bVxuICBERUJVRzogMCxcbiAgSU5GTzogMSxcbiAgV0FSTjogMixcbiAgRVJST1I6IDMsXG4gIGxldmVsOiAzLFxuXG4gIC8vIGNhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBob3N0IGVudmlyb25tZW50XG4gIGxvZzogZnVuY3Rpb24obGV2ZWwsIG1lc3NhZ2UpIHtcbiAgICBpZiAobG9nZ2VyLmxldmVsIDw9IGxldmVsKSB7XG4gICAgICB2YXIgbWV0aG9kID0gbG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGVbbWV0aG9kXSkge1xuICAgICAgICBjb25zb2xlW21ldGhvZF0uY2FsbChjb25zb2xlLCBtZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5leHBvcnRzLmxvZ2dlciA9IGxvZ2dlcjtcbnZhciBsb2cgPSBsb2dnZXIubG9nO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG52YXIgY3JlYXRlRnJhbWUgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIGZyYW1lID0gVXRpbHMuZXh0ZW5kKHt9LCBvYmplY3QpO1xuICBmcmFtZS5fcGFyZW50ID0gb2JqZWN0O1xuICByZXR1cm4gZnJhbWU7XG59O1xuZXhwb3J0cy5jcmVhdGVGcmFtZSA9IGNyZWF0ZUZyYW1lOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIHZhciBsaW5lO1xuICBpZiAobm9kZSAmJiBub2RlLmZpcnN0TGluZSkge1xuICAgIGxpbmUgPSBub2RlLmZpcnN0TGluZTtcblxuICAgIG1lc3NhZ2UgKz0gJyAtICcgKyBsaW5lICsgJzonICsgbm9kZS5maXJzdENvbHVtbjtcbiAgfVxuXG4gIHZhciB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICBpZiAobGluZSkge1xuICAgIHRoaXMubGluZU51bWJlciA9IGxpbmU7XG4gICAgdGhpcy5jb2x1bW4gPSBub2RlLmZpcnN0Q29sdW1uO1xuICB9XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFeGNlcHRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbnZhciBFeGNlcHRpb24gPSByZXF1aXJlKFwiLi9leGNlcHRpb25cIilbXCJkZWZhdWx0XCJdO1xudmFyIENPTVBJTEVSX1JFVklTSU9OID0gcmVxdWlyZShcIi4vYmFzZVwiKS5DT01QSUxFUl9SRVZJU0lPTjtcbnZhciBSRVZJU0lPTl9DSEFOR0VTID0gcmVxdWlyZShcIi4vYmFzZVwiKS5SRVZJU0lPTl9DSEFOR0VTO1xudmFyIGNyZWF0ZUZyYW1lID0gcmVxdWlyZShcIi4vYmFzZVwiKS5jcmVhdGVGcmFtZTtcblxuZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgdmFyIGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIHZhciBydW50aW1lVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKFwiK3J1bnRpbWVWZXJzaW9ucytcIikgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uIChcIitjb21waWxlclZlcnNpb25zK1wiKS5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoXCIrY29tcGlsZXJJbmZvWzFdK1wiKS5cIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMuY2hlY2tSZXZpc2lvbiA9IGNoZWNrUmV2aXNpb247Ly8gVE9ETzogUmVtb3ZlIHRoaXMgbGluZSBhbmQgYnJlYWsgdXAgY29tcGlsZVBhcnRpYWxcblxuZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTm8gZW52aXJvbm1lbnQgcGFzc2VkIHRvIHRlbXBsYXRlXCIpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIHZhciBpbnZva2VQYXJ0aWFsV3JhcHBlciA9IGZ1bmN0aW9uKHBhcnRpYWwsIGluZGVudCwgbmFtZSwgY29udGV4dCwgaGFzaCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEsIGRlcHRocykge1xuICAgIGlmIChoYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBoYXNoKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBuYW1lLCBjb250ZXh0LCBoZWxwZXJzLCBwYXJ0aWFscywgZGF0YSwgZGVwdGhzKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7IGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSwgZGVwdGhzOiBkZXB0aHMgfTtcbiAgICAgIHBhcnRpYWxzW25hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgeyBkYXRhOiBkYXRhICE9PSB1bmRlZmluZWQsIGNvbXBhdDogdGVtcGxhdGVTcGVjLmNvbXBhdCB9LCBlbnYpO1xuICAgICAgcmVzdWx0ID0gcGFydGlhbHNbbmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKGluZGVudCkge1xuICAgICAgICB2YXIgbGluZXMgPSByZXN1bHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpbmVzW2ldID0gaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGhlIHBhcnRpYWwgXCIgKyBuYW1lICsgXCIgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZVwiKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICBsb29rdXA6IGZ1bmN0aW9uKGRlcHRocywgbmFtZSkge1xuICAgICAgdmFyIGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlU3BlY1tpXTtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlcHRocykge1xuICAgICAgdmFyIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSxcbiAgICAgICAgICBmbiA9IHRoaXMuZm4oaSk7XG4gICAgICBpZiAoZGF0YSB8fCBkZXB0aHMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSBwcm9ncmFtKHRoaXMsIGksIGZuLCBkYXRhLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gcHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKGRhdGEsIGRlcHRoKSB7XG4gICAgICB3aGlsZSAoZGF0YSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICB2YXIgcmV0ID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICByZXQgPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIHZhciByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cbiAgICByZXQuX3NldHVwKG9wdGlvbnMpO1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG4gICAgICBkYXRhID0gaW5pdERhdGEoY29udGV4dCwgZGF0YSk7XG4gICAgfVxuICAgIHZhciBkZXB0aHM7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMpIHtcbiAgICAgIGRlcHRocyA9IG9wdGlvbnMuZGVwdGhzID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBbY29udGV4dF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlbXBsYXRlU3BlYy5tYWluLmNhbGwoY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBkZXB0aHMpO1xuICB9O1xuICByZXQuaXNUb3AgPSB0cnVlO1xuXG4gIHJldC5fc2V0dXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGRlcHRocykge1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydHMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtmdW5jdGlvbiBwcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlcHRocykge1xuICB2YXIgcHJvZyA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHJldHVybiBmbi5jYWxsKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgb3B0aW9ucy5kYXRhIHx8IGRhdGEsIGRlcHRocyAmJiBbY29udGV4dF0uY29uY2F0KGRlcHRocykpO1xuICB9O1xuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gZGVwdGhzID8gZGVwdGhzLmxlbmd0aCA6IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnRzLnByb2dyYW0gPSBwcm9ncmFtO2Z1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgbmFtZSwgY29udGV4dCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEsIGRlcHRocykge1xuICB2YXIgb3B0aW9ucyA9IHsgcGFydGlhbDogdHJ1ZSwgaGVscGVyczogaGVscGVycywgcGFydGlhbHM6IHBhcnRpYWxzLCBkYXRhOiBkYXRhLCBkZXB0aHM6IGRlcHRocyB9O1xuXG4gIGlmKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgZm91bmRcIik7XG4gIH0gZWxzZSBpZihwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnRzLmludm9rZVBhcnRpYWwgPSBpbnZva2VQYXJ0aWFsO2Z1bmN0aW9uIG5vb3AoKSB7IHJldHVybiBcIlwiOyB9XG5cbmV4cG9ydHMubm9vcCA9IG5vb3A7ZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcbi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFwiXCIgKyB0aGlzLnN0cmluZztcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU2FmZVN0cmluZzsiLCJcInVzZSBzdHJpY3RcIjtcbi8qanNoaW50IC1XMDA0ICovXG52YXIgU2FmZVN0cmluZyA9IHJlcXVpcmUoXCIuL3NhZmUtc3RyaW5nXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIGVzY2FwZSA9IHtcbiAgXCImXCI6IFwiJmFtcDtcIixcbiAgXCI8XCI6IFwiJmx0O1wiLFxuICBcIj5cIjogXCImZ3Q7XCIsXG4gICdcIic6IFwiJnF1b3Q7XCIsXG4gIFwiJ1wiOiBcIiYjeDI3O1wiLFxuICBcImBcIjogXCImI3g2MDtcIlxufTtcblxudmFyIGJhZENoYXJzID0gL1smPD5cIidgXS9nO1xudmFyIHBvc3NpYmxlID0gL1smPD5cIidgXS87XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gIHJldHVybiBlc2NhcGVbY2hyXTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKG9iaiAvKiAsIC4uLnNvdXJjZSAqLykge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0cy5leHRlbmQgPSBleHRlbmQ7dmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8vIFNvdXJjZWQgZnJvbSBsb2Rhc2hcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9sb2Rhc2gvYmxvYi9tYXN0ZXIvTElDRU5TRS50eHRcbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn07XG4vLyBmYWxsYmFjayBmb3Igb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmlcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoaXNGdW5jdGlvbigveC8pKSB7XG4gIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH07XG59XG52YXIgaXNGdW5jdGlvbjtcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xufTtcbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG4gIC8vIGRvbid0IGVzY2FwZSBTYWZlU3RyaW5ncywgc2luY2UgdGhleSdyZSBhbHJlYWR5IHNhZmVcbiAgaWYgKHN0cmluZyBpbnN0YW5jZW9mIFNhZmVTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZyArICcnO1xuICB9XG5cbiAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gIC8vIHRoZSByZWdleCB0ZXN0IHdpbGwgZG8gdGhpcyB0cmFuc3BhcmVudGx5IGJlaGluZCB0aGUgc2NlbmVzLCBjYXVzaW5nIGlzc3VlcyBpZlxuICAvLyBhbiBvYmplY3QncyB0byBzdHJpbmcgaGFzIGVzY2FwZWQgY2hhcmFjdGVycyBpbiBpdC5cbiAgc3RyaW5nID0gXCJcIiArIHN0cmluZztcblxuICBpZighcG9zc2libGUudGVzdChzdHJpbmcpKSB7IHJldHVybiBzdHJpbmc7IH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZXhwb3J0cy5lc2NhcGVFeHByZXNzaW9uID0gZXNjYXBlRXhwcmVzc2lvbjtmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0cy5pc0VtcHR5ID0gaXNFbXB0eTtmdW5jdGlvbiBhcHBlbmRDb250ZXh0UGF0aChjb250ZXh0UGF0aCwgaWQpIHtcbiAgcmV0dXJuIChjb250ZXh0UGF0aCA/IGNvbnRleHRQYXRoICsgJy4nIDogJycpICsgaWQ7XG59XG5cbmV4cG9ydHMuYXBwZW5kQ29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aDsiLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzL3J1bnRpbWVcIilbXCJkZWZhdWx0XCJdO1xuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuQXBwICAgICAgPSByZXF1aXJlICdhcHAnXG5CYWNrYm9uZSA9IHJlcXVpcmUgXCJiYWNrYm9uZVwiXG5cbmNsYXNzIEFwcC5Db2xsZWN0aW9ucy5BcGlDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXG4gIGFwaVVybDogJy8nXG5cbiAgdXJsOiA9PlxuICAgIEFwcC5yZXF1ZXN0KCdhcGlSb290JykgKyBfLnJlc3VsdChALCAnYXBpVXJsJylcblxuXG4gIHBhcnNlOiAocmVzcG9uc2UpID0+XG4gICAgcmVzcG9uc2UuZGF0YVxuXG5cblxuICBmZXRjaDogKG9wdGlvbnMpID0+XG5cbiAgICAjIENoZWNrIGlmIHdlIG5lZWQgdG8gcGFzcyBhbG9uZyBhbnkgZ2V0IHZhcmlhYmxlc1xuICAgIGlmIG5vdCBAZGF0YT9cbiAgICAgIGRhdGEgPSB7fVxuXG4gICAgIyBzZXQgZXh0cmEgZmllbGRzXG4gICAgaWYgbm90IF8uaXNFbXB0eShAZGF0YSlcblxuICAgICAgaWYgbm90IG9wdGlvbnM/XG4gICAgICAgIG9wdGlvbnMgPSB7fVxuXG4gICAgICBpZiBub3Qgb3B0aW9ucy5kYXRhP1xuICAgICAgICBvcHRpb25zLmRhdGEgPSB7fVxuXG4gICAgICBvcHRpb25zLmRhdGEgPSBfLmV4dGVuZCB7fSwgQGRhdGEsIG9wdGlvbnMuZGF0YVxuXG4gICAgQXBwLkNvbGxlY3Rpb25zLkFwaUNvbGxlY3Rpb24uX19zdXBlcl9fLmZldGNoLmFwcGx5IEAsIFsgb3B0aW9ucyBdXG5cblxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuQXBwICAgICAgPSByZXF1aXJlICdhcHAnXG5cbmNsYXNzIEFwcC5Db2xsZWN0aW9ucy5JbmZpbml0ZVNjcm9sbENvbGxlY3Rpb24gZXh0ZW5kcyBBcHAuQ29sbGVjdGlvbnMuQXBpQ29sbGVjdGlvblxuXG4gIG5leHRQYWdlOiAoYXJncykgPT5cblxuICAgIEBmZXRjaCBhcmdzXG5cblxuICBwYXJzZTogKHJlc3BvbnNlKSA9PlxuXG4gICAgIyBjaGVjayBpZiB0aGUgY29sbGVjdGlvbiBoYXMgYSBuZXh0IHBhZ2VcbiAgICBpZiBAZGF0YT8gYW5kIEBkYXRhLnBlclBhZ2U/IGFuZCByZXNwb25zZS5kYXRhLmxlbmd0aCA8IEBkYXRhLnBlclBhZ2VcbiAgICAgIEBoYXNOZXh0ID0gZmFsc2VcblxuICAgIHJlc3BvbnNlLmRhdGFcbiIsIid1c2Ugc3RyaWN0JztcblxuXG5BcHAgICAgICAgPSByZXF1aXJlIFwiYXBwXCJcbiQgICAgICAgICA9IHJlcXVpcmUgXCJqcXVlcnlcIlxuQmFja2JvbmUgID0gcmVxdWlyZSBcImJhY2tib25lXCJcbl8gICAgICAgICA9IHJlcXVpcmUgXCJ1bmRlcnNjb3JlXCJcblxuXG5BcHAuYWRkSW5pdGlhbGl6ZXIgLT5cblxuICAjIHNldCBiYWNrYm9uZSBnbG9iYWwgb3B0aW9uc1xuICBCYWNrYm9uZS5lbXVsYXRlSlNPTiA9IHRydWVcbiAgQmFja2JvbmUuZW11bGF0ZUhUVFAgPSB0cnVlXG5cbiAgdHJpbUNoYXIgPSAoc3RyLCBjaGFyKSAtPlxuXG4gICAgaWYgc3RyLmNoYXJBdCgwKSBpcyBjaGFyXG4gICAgICBzdHIgPSBzdHIuc3Vic3RyIDFcblxuICAgIGlmIHN0ci5jaGFyQXQoIHN0ci5sZW5ndGggLSAxICkgaXMgY2hhclxuICAgICAgc3RyID0gc3RyLnN1YnN0ciAwLCBzdHIubGVuZ3RoIC0gMVxuXG4gICAgc3RyXG5cblxuICBub3JtYWxpemVSZXF1ZXN0ID0gKHVybCkgLT5cblxuICAgICMgZ2V0IHRoZSBBUEkgcmVxdWVzdCBwYXRoIGZyb20gdGhlIFVSTFxuICAgIGFwaVJvb3QgPSBBcHAucmVxdWVzdCAnYXBpUm9vdCdcbiAgICBpZiB1cmwuaW5kZXhPZihhcGlSb290KSA+PSAwXG4gICAgICB1cmxQYXJ0cyA9IHVybC5zcGxpdCBhcGlSb290XG4gICAgICB1cmwgPSB1cmxQYXJ0c1sxXVxuXG4gICAgIyB0cmltIHNsYXNoZXNcbiAgICB1cmwgPSB0cmltQ2hhciB1cmwsICcvJ1xuXG4gICAgdXJsXG5cblxuICByZWFkRG9tID0gKG9wdGlvbnMpIC0+XG5cbiAgICAjIGNoZWNrIERPTSFcbiAgICBpZiBvcHRpb25zLnR5cGUgaXMgJ0dFVCdcblxuICAgICAgIyBnZXQgQVBJIHJlcXVlc3QgZnJvbSB1cmxcbiAgICAgIHJlcXVlc3QgPSBub3JtYWxpemVSZXF1ZXN0IG9wdGlvbnMudXJsXG4gICAgICByZXF1ZXN0SURRdWVyeSA9ICcnXG5cbiAgICAgIGlmIG9wdGlvbnMuZGF0YT8gYW5kIG9wdGlvbnMuZGF0YS5yZXF1ZXN0SUQ/IGFuZCBvcHRpb25zLmRhdGEucmVxdWVzdElEIGlzbnQgJydcbiAgICAgICAgcmVxdWVzdElEUXVlcnkgPSAnW2RhdGEtaWQ9XCInICsgb3B0aW9ucy5kYXRhLnJlcXVlc3RJRCArICdcIl0nXG5cblxuICAgICAgJGRhdGFFbGVtZW50ID0gJCgnLmJ3YXBpLWNhbGwtZGF0YVtkYXRhLXR5cGU9XCJnZXRcIl0nICsgcmVxdWVzdElEUXVlcnkgKyAnW2RhdGEtcmVxdWVzdD1cIicgKyByZXF1ZXN0ICsgJ1wiXTpub3QoLmxvYWRlZCknKVxuXG4gICAgICBpZiAkZGF0YUVsZW1lbnQubGVuZ3RoID4gMFxuXG4gICAgICAgICMgYWRkIGxvYWRlZCBjbGFzc1xuICAgICAgICAkZGF0YUVsZW1lbnQuYWRkQ2xhc3MoJ2xvYWRlZCcpXG5cblxuICAgICAgICAjIHRyeSB0byBsb29rIGZvciBtb2RlbCBkYXRhIG9uIGRvbS5cbiAgICAgICAgZGF0YSA9IEFwcC5IZWxwZXJzLmRhdGEuZ2V0RWxlbWVudERhdGEoICRkYXRhRWxlbWVudCApXG5cbiAgICAgICAgaWYgZGF0YT8gYW5kIGRhdGEgaXNudCAnJyBhbmQgbm90IF8uaXNFbXB0eShkYXRhKVxuXG4gICAgICAgICAgIyBjb25zb2xlLmxvZyAnVXNpbmcgRE9NISEhJywgcmVxdWVzdFxuXG4gICAgICAgICAgIyBjaGVjayBpZiB3ZSBoYXZlIHRoZSBvcHRpb25zIGhhc2hcbiAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiBub3Qgb3B0aW9ucz9cblxuICAgICAgICAgICMgY2FsbCBjYWxsYmFjayBmdW5jdGlvbnMsIGlmIGRlZmluZWRcbiAgICAgICAgICBpZiBkYXRhLm1ldGEuY29kZSBpcyAyMDBcblxuICAgICAgICAgICAgIyBjYWxsIFNVQ0NFU1MgY2FsbGJhY2tcbiAgICAgICAgICAgIGlmIHR5cGVvZiBvcHRpb25zLnN1Y2Nlc3MgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MuYXBwbHkgQCwgW2RhdGFdXG5cbiAgICAgICAgICBlbHNlXG5cbiAgICAgICAgICAgICMgY2FsbCBFUlJPUiBjYWxsYmFja1xuICAgICAgICAgICAgaWYgdHlwZW9mIG9wdGlvbnMuZXJyb3IgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICBvcHRpb25zLmVycm9yLmFwcGx5IEAsIFtkYXRhXVxuXG4gICAgICAgICAgIyBjYWxsIENPTVBMRVRFIGNhbGxiYWNrXG4gICAgICAgICAgaWYgdHlwZW9mIG9wdGlvbnMuY29tcGxldGUgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZS5hcHBseSBALCBbZGF0YV1cblxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcblxuXG5cblxuXG4gIGFqYXhJbW1lZGlhdGUgPSAob3B0aW9ucykgLT5cblxuICAgICMgQ2hlY2sgaWYgd2UgY2FuIGNhbGwgdGhyb3VnaCB0aGUgV2ViU29ja2V0IGFwaVxuICAgIGNvbm5lY3RlZCA9IEFwcC5hcGlTb2NrZXQuZ2V0ICdjb25uZWN0ZWQnIGlmIEFwcC5hcGlTb2NrZXQ/XG4gICAgaWYgY29ubmVjdGVkPyBhbmQgY29ubmVjdGVkXG5cbiAgICAgICMgY29uc29sZS5sb2cgJ1VzaW5nIFdlYlNvY2tldHMhISEnXG4gICAgICB4aHIgPSBBcHAuYXBpU29ja2V0LmNhbGwgb3B0aW9ucy50eXBlLCBvcHRpb25zLnVybCwgb3B0aW9ucy5kYXRhLCBvcHRpb25zXG5cbiAgICBlbHNlXG5cbiAgICAgICMgY29uc29sZS5sb2cgJ1VzaW5nIEFKQVghISEnXG4gICAgICB4aHIgPSBhamF4QmFja3VwIG9wdGlvbnNcblxuICAgIHhoclxuXG5cblxuICBhcGlDYWxsU3RhY2sgPSBbXVxuXG4gIGFqYXhEZWJvdW5jZVdyYXBwZXIgPSAoZnVuYykgLT5cblxuICAgICMgY29uc29sZS5sb2cgJ2FqYXhEZWJvdW5jZVdyYXBwZXInLCBhcGlDYWxsU3RhY2tcblxuICAgICMgY2hlY2sgaWYgd2UgaGF2ZSBhbnkgY2FsbHMgaW4gdGhlIHN0YWNrXG4gICAgcmV0dXJuIGlmIGFwaUNhbGxTdGFjay5sZW5ndGggPT0gMFxuXG4gICAgIyBjb25zb2xlLmxvZyAnU2VuZGluZyBiYXRjaCByZXF1ZXN0IGZvciAnICsgYXBpQ2FsbFN0YWNrLmxlbmd0aCArICcgQVBJIGNhbGxzJ1xuXG4gICAgIyBnZXQgY29udGVudCB0eXBlIGZyb20gZmlyc3QgY2FsbCBpbiBzdGFja1xuICAgIGNvbnRlbnRUeXBlID0gYXBpQ2FsbFN0YWNrWzBdLmNvbnRlbnRUeXBlXG4gICAgZGF0YVR5cGUgPSBcImpzb25cIlxuICAgIHR5cGUgPSBcIlBPU1RcIlxuICAgIGFwaVJvb3QgPSBBcHAucmVxdWVzdCAnYXBpUm9vdCdcbiAgICB1cmwgPSBhcGlSb290ICsgXCIxL3NpdGUvYmF0Y2gvXCJcblxuXG4gICAgZGF0YSA9IHt9XG4gICAgYXBpQ2FsbE9wdGlvbnMgPSB7fVxuXG4gICAgIyBidWlsZCAnc3VjY2VzcycsICdjb21wbGV0ZScgYW5kICdlcnJvcicgY2FsbGJhY2tzXG4gICAgZm9yIGFwaUNhbGwsIGFwaUNhbGxJbmRleCBpbiBhcGlDYWxsU3RhY2tcblxuICAgICAgcmVxdWVzdCA9IG5vcm1hbGl6ZVJlcXVlc3QgYXBpQ2FsbC51cmxcblxuICAgICAgaWYgYXBpQ2FsbC5kYXRhP1xuICAgICAgICBhcGlDYWxsRGF0YSA9IGFwaUNhbGwuZGF0YVxuICAgICAgZWxzZVxuICAgICAgICBhcGlDYWxsRGF0YSA9ICcnXG5cbiAgICAgIHJlcXVlc3RJRCA9IGFwaUNhbGxJbmRleCArICc6JyArIGFwaUNhbGwudHlwZSArICc6JyArIHJlcXVlc3RcblxuICAgICAgZGF0YVsgcmVxdWVzdElEIF0gPVxuICAgICAgICB1cmw6IHJlcXVlc3RcbiAgICAgICAgdHlwZTogYXBpQ2FsbC50eXBlXG4gICAgICAgIGRhdGE6IGFwaUNhbGxEYXRhXG5cbiAgICAgIGFwaUNhbGxPcHRpb25zWyByZXF1ZXN0SUQgXSA9IGFwaUNhbGxcblxuXG4gICAgc3VjY2VzcyA9IChiYXRjaFJlc3BvbnNlLCBiYXRjaFJlc3BvbnNlVGV4dCwgYmF0Y2hYSFIpIC0+XG4gICAgICAjIGNvbnNvbGUubG9nICdiYXRjaCBzdWNjZXNzJywgYmF0Y2hSZXNwb25zZVxuXG4gICAgICAjICMgY2hlY2sgZm9yIGVycm9yIHJlc3BvbnNlXG4gICAgICAjIGlmIGJhdGNoUmVzcG9uc2UucmVzdWx0PyBhbmQgYmF0Y2hSZXNwb25zZS5yZXN1bHQgaXNudCAnc3VjY2VzcycgYW5kIGJhdGNoUmVzcG9uc2UucmVzdWx0IGlzbnQgJ2Fib3J0J1xuXG4gICAgICAjICAgIyB0cmlnZ2VyIGFwcCBldmVudFxuICAgICAgIyAgIEFwcC52ZW50LnRyaWdnZXIgJ2FqYXg6ZXJyb3InLCBiYXRjaFJlc3BvbnNlLCBiYXRjaFJlc3BvbnNlVGV4dCwgYmF0Y2hYSFJcblxuICAgICAgIyAgIHJldHVyblxuXG5cbiAgICAgICMgY2hlY2sgZWFjaCByZXNwb25zZSBhbmQgY2FsbCBwcm9wZXIgY2FsbGJhY2sgKCdzdWNjZXNzJyBvciAnZXJyb3InKVxuICAgICAgcmVzcG9uc2VzID0gYmF0Y2hSZXNwb25zZS5kYXRhXG5cbiAgICAgIGlmIG5vdCByZXNwb25zZXM/XG4gICAgICAgIHJlc3BvbnNlcyA9IHt9XG5cbiAgICAgICMgc2F2ZSBiYXRjaCBjYWxsYmFja3MgaW4gYW4gYXJyYXlcbiAgICAgIGJhdGNoQ2FsbGJhY2tzID0gW11cblxuICAgICAgZm9yIHJlcXVlc3RJRCwgYXBpQ2FsbCBvZiBhcGlDYWxsT3B0aW9uc1xuICAgICAgICAjIGNvbnNvbGUubG9nIHJlcXVlc3RJRCwgYXBpQ2FsbFxuICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlc1sgcmVxdWVzdElEIF1cblxuICAgICAgICBpZiBub3QgcmVzcG9uc2U/XG4gICAgICAgICAgcmVzcG9uc2UgPSB7fVxuXG4gICAgICAgIHJlc3BvbnNlUmVzdWx0ID0gJ2Vycm9yJ1xuICAgICAgICBpZiByZXNwb25zZS5zdGF0dXM/IGFuZCByZXNwb25zZS5zdGF0dXMgaXMgJ3N1Y2Nlc3MnXG4gICAgICAgICAgcmVzcG9uc2VSZXN1bHQgPSAnc3VjY2VzcydcblxuICAgICAgICBjYWxsYmFjayA9IGFwaUNhbGxbIHJlc3BvbnNlUmVzdWx0IF1cbiAgICAgICAgY29udGV4dCA9IGFwaUNhbGwuY29udGV4dFxuXG4gICAgICAgIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkgY29udGV4dCwgWyByZXNwb25zZSBdXG5cbiAgICAgICAgIyBiYXRjaCBjYWxsYmFja1xuICAgICAgICBiYXRjaENhbGxiYWNrID0gYXBpQ2FsbFsgJ2JhdGNoU3VjY2VzcycgXVxuXG4gICAgICAgIGlmIHR5cGVvZiBiYXRjaENhbGxiYWNrIGlzICdmdW5jdGlvbidcbiAgICAgICAgICBiYXRjaENhbGxiYWNrcy5wdXNoXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgICAgICBjYWxsYmFjazogYXBpQ2FsbFsgJ2JhdGNoU3VjY2VzcycgXVxuXG5cbiAgICAgIGZvciBiYXRjaENhbGxiYWNrIGluIGJhdGNoQ2FsbGJhY2tzXG4gICAgICAgIGJhdGNoQ2FsbGJhY2suY2FsbGJhY2suYXBwbHkgYmF0Y2hDYWxsYmFjay5jb250ZXh0LCBbIGJhdGNoUmVzcG9uc2UgXVxuXG5cbiAgICBjb21wbGV0ZSA9IC0+XG4gICAgICAjIGNvbnNvbGUubG9nICdjb21wbGV0ZScsIGFyZ3VtZW50c1xuXG4gICAgICAjIHNhdmUgYmF0Y2ggY2FsbGJhY2tzIGluIGFuIGFycmF5XG4gICAgICBiYXRjaENhbGxiYWNrcyA9IFtdXG5cbiAgICAgICMgZmlyZSAnY29tcGxldGUnIGNhbGxiYWNrIGZvciBhbGwgcmVxdWVzdHMgaW4gYmF0Y2hcbiAgICAgIGZvciByZXF1ZXN0SUQsIGFwaUNhbGwgb2YgYXBpQ2FsbE9wdGlvbnNcblxuICAgICAgICBjYWxsYmFjayA9IGFwaUNhbGxbICdjb21wbGV0ZScgXVxuICAgICAgICBjb250ZXh0ID0gYXBpQ2FsbC5jb250ZXh0XG5cbiAgICAgICAgaWYgdHlwZW9mIGNhbGxiYWNrIGlzICdmdW5jdGlvbidcbiAgICAgICAgICBjYWxsYmFjay5hcHBseSBjb250ZXh0LCBhcmd1bWVudHNcblxuICAgICAgICAjIGJhdGNoIGNhbGxiYWNrXG4gICAgICAgIGJhdGNoQ2FsbGJhY2sgPSBhcGlDYWxsWyAnYmF0Y2hDb21wbGV0ZScgXVxuXG4gICAgICAgIGlmIHR5cGVvZiBiYXRjaENhbGxiYWNrIGlzICdmdW5jdGlvbidcbiAgICAgICAgICBiYXRjaENhbGxiYWNrcy5wdXNoXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgICAgICBjYWxsYmFjazogYXBpQ2FsbFsgJ2JhdGNoQ29tcGxldGUnIF1cblxuXG5cbiAgICAgIGZvciBiYXRjaENhbGxiYWNrIGluIGJhdGNoQ2FsbGJhY2tzXG4gICAgICAgIGJhdGNoQ2FsbGJhY2suY2FsbGJhY2suYXBwbHkgYmF0Y2hDYWxsYmFjay5jb250ZXh0LCBhcmd1bWVudHNcblxuXG4gICAgZXJyb3IgPSAtPlxuICAgICAgIyBjb25zb2xlLmxvZyAnZXJyb3InLCBhcmd1bWVudHNcblxuICAgICAgIyBzYXZlIGJhdGNoIGNhbGxiYWNrcyBpbiBhbiBhcnJheVxuICAgICAgYmF0Y2hDYWxsYmFja3MgPSBbXVxuXG4gICAgICAjIGZpcmUgJ2Vycm9yJyBjYWxsYmFjayBmb3IgYWxsIHJlcXVlc3RzIGluIGJhdGNoXG4gICAgICBmb3IgcmVxdWVzdElELCBhcGlDYWxsIG9mIGFwaUNhbGxPcHRpb25zXG5cbiAgICAgICAgY2FsbGJhY2sgPSBhcGlDYWxsWyAnZXJyb3InIF1cbiAgICAgICAgY29udGV4dCA9IGFwaUNhbGwuY29udGV4dFxuXG4gICAgICAgIGlmIHR5cGVvZiBjYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkgY29udGV4dCwgYXJndW1lbnRzXG5cbiAgICAgICAgIyBiYXRjaCBjYWxsYmFja1xuICAgICAgICBiYXRjaENhbGxiYWNrID0gYXBpQ2FsbFsgJ2JhdGNoRXJyb3InIF1cblxuICAgICAgICBpZiB0eXBlb2YgYmF0Y2hDYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgYmF0Y2hDYWxsYmFja3MucHVzaFxuICAgICAgICAgICAgY29udGV4dDogY29udGV4dFxuICAgICAgICAgICAgY2FsbGJhY2s6IGFwaUNhbGxbICdiYXRjaEVycm9yJyBdXG5cblxuICAgICAgZm9yIGJhdGNoQ2FsbGJhY2sgaW4gYmF0Y2hDYWxsYmFja3NcbiAgICAgICAgYmF0Y2hDYWxsYmFjay5jYWxsYmFjay5hcHBseSBiYXRjaENhbGxiYWNrLmNvbnRleHQsIGFyZ3VtZW50c1xuXG5cbiAgICAjIGJ1aWxkIG5ldyBvcHRpb25zIGZvciBiYXRjaCBjYWxsXG4gICAgb3B0aW9ucyA9XG4gICAgICBlcnJvcjogZXJyb3JcbiAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3NcbiAgICAgIGNvbXBsZXRlOiBjb21wbGV0ZVxuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlXG4gICAgICBkYXRhVHlwZTogZGF0YVR5cGVcbiAgICAgIHR5cGU6IHR5cGVcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG5cblxuICAgIGZ1bmMgb3B0aW9uc1xuXG4gICAgIyByZXNldCBjYWxsIHN0YWNrXG4gICAgYXBpQ2FsbFN0YWNrID0gW11cblxuXG5cbiAgYWpheERlYm91bmNlQ2FsbGJhY2sgPSBfLndyYXAgYWpheEltbWVkaWF0ZSwgYWpheERlYm91bmNlV3JhcHBlclxuICBhamF4RGVib3VuY2UgPSBfLmRlYm91bmNlIGFqYXhEZWJvdW5jZUNhbGxiYWNrLCA0MFxuXG5cblxuICAjIyNcbiAgYmFja3VwIEJhY2tib25lIEFKQVggZnVuY3Rpb25cbiAgIyMjXG4gIGFqYXhCYWNrdXAgPSBCYWNrYm9uZS5hamF4XG5cbiAgIyMjXG4gIG92ZXJyaWRlIEJhY2tib25lIEFqYXhcbiAgIyMjXG4gIEJhY2tib25lLmFqYXggPSAob3B0aW9ucykgLT5cblxuXG4gICAgIyMjXG4gICAgQ2hlY2sgaWYgY2FsbCBjYW4gYmUgZmV0Y2hlZCBmcm9tIERPTVxuICAgICMjI1xuICAgIHJlc3VsdCA9IHJlYWREb20gb3B0aW9uc1xuICAgIGlmIHJlc3VsdCBpcyB0cnVlXG4gICAgICByZXR1cm4gcmVzdWx0XG5cblxuICAgICMgc2V0IGNvbnRleHQgYmFzZWQgb24gb3B0aW9uXG4gICAgaWYgbm90IG9wdGlvbnMuY29udGV4dD9cbiAgICAgIG9wdGlvbnMuY29udGV4dCA9IEBcblxuXG4gICAgaWYgb3B0aW9ucy5iYXRjaD8gYW5kIG9wdGlvbnMuYmF0Y2ggaXMgdHJ1ZVxuXG4gICAgICAjIEFkZCB0byBkZWJvdW5jZWQgYmF0Y2ggY2FsbFxuICAgICAgYXBpQ2FsbFN0YWNrLnB1c2ggb3B0aW9uc1xuICAgICAgYWpheERlYm91bmNlLmFwcGx5IEBcblxuICAgIGVsc2VcblxuICAgICAgIyBDYWxsIGFqYXggaW1tZWRpYXRlbHkgaWYgXCJpbW1lZGlhdGVcIiBpcyBzZXQgdG8gdHJ1ZVxuICAgICAgYWpheEltbWVkaWF0ZS5hcHBseSBALCBbb3B0aW9uc11cblxuXG5cbiIsIlwidXNlIHN0cmljdFwiXG5cbkFwcCAgICAgID0gcmVxdWlyZSAnYXBwJ1xuQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcblxuY2xhc3MgQXBwLkNvbnRyb2xsZXJzLkFwcENvbnRyb2xsZXIgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbnRyb2xsZXJcblxuICBnZXRBcGlSb290OiAtPlxuXG4gICAgd3BSb290ID0gJy8nXG4gICAgYXBpUm9vdCA9ICc/YndhcGk9LydcblxuICAgIGlmIEFwcC5TU09wdGlvbnM/XG4gICAgICB3cFJvb3QgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAnd3BSb290J1xuXG4gICAgd3BSb290ICsgYXBpUm9vdFxuXG5cbiAgaXNFdmVuOiAobikgLT5cbiAgICBuICUgMiBpcyAwXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5cbl8gICAgICAgICA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxuQmFja2JvbmUgID0gcmVxdWlyZSgnYmFja2JvbmUnKVxuJCAgICAgICAgID0gcmVxdWlyZSgnanF1ZXJ5Jylcbk1vZGVybml6ciA9IHJlcXVpcmUoXCJtb2Rlcm5penJcIilcblxuXG5cbmNsYXNzIEJyb3dzZXJTdXBwb3J0SGVscGVyIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICBjaGVja0ZvcklFOiAoKSAtPlxuXG4gICAgaWYgKCBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTVNJRSA3LlwiKSA+IDAgKSBvciAoIG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJNU0lFIDguXCIpID4gMCApIG9yICggbmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1TSUUgOS5cIikgPiAwIClcbiAgICAgICMgY29uc29sZS5sb2cgJ2ZvdW5kIElFOSdcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZWxzZVxuICAgICAgIyBjb25zb2xlLmxvZyAnbm90IElFJ1xuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgaWVBamF4U3VwcG9ydDogKCkgLT5cblxuICAgIGlmICggQGNoZWNrRm9ySUUoKSApXG5cbiAgICAgIGlmIHdpbmRvdy5YRG9tYWluUmVxdWVzdFxuICAgICAgICAkLmFqYXhUcmFuc3BvcnQgKHMpIC0+XG4gICAgICAgICAgaWYgcy5jcm9zc0RvbWFpbiBhbmQgcy5hc3luY1xuICAgICAgICAgICAgaWYgcy50aW1lb3V0XG4gICAgICAgICAgICAgIHMueGRyVGltZW91dCA9IHMudGltZW91dFxuICAgICAgICAgICAgICBkZWxldGUgcy50aW1lb3V0XG4gICAgICAgICAgICB4ZHIgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHNlbmQ6IChfLCBjb21wbGV0ZSkgLT5cbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSAoc3RhdHVzLCBzdGF0dXNUZXh0LCByZXNwb25zZXMsIHJlc3BvbnNlSGVhZGVycykgLT5cbiAgICAgICAgICAgICAgICB4ZHIub25sb2FkID0geGRyLm9uZXJyb3IgPSB4ZHIub250aW1lb3V0ID0galF1ZXJ5Lm5vb3BcbiAgICAgICAgICAgICAgICB4ZHIgPSBgdW5kZWZpbmVkYFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlIHN0YXR1cywgc3RhdHVzVGV4dCwgcmVzcG9uc2VzLCByZXNwb25zZUhlYWRlcnNcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgeGRyID0gbmV3IFhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgICAgICAgeGRyLm9ubG9hZCA9IC0+XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgMjAwLCBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiB4ZHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgLCBcIkNvbnRlbnQtVHlwZTogXCIgKyB4ZHIuY29udGVudFR5cGVcbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgICB4ZHIub25lcnJvciA9IC0+XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgNDA0LCBcIk5vdCBGb3VuZFwiXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgICAgeGRyLm9ucHJvZ3Jlc3MgPSBqUXVlcnkubm9vcFxuICAgICAgICAgICAgICB4ZHIub250aW1lb3V0ID0gLT5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayAwLCBcInRpbWVvdXRcIlxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICAgIHhkci50aW1lb3V0ID0gcy54ZHJUaW1lb3V0IG9yIE51bWJlci5NQVhfVkFMVUVcbiAgICAgICAgICAgICAgeGRyLm9wZW4gcy50eXBlLCBzLnVybFxuICAgICAgICAgICAgICB4ZHIuc2VuZCAocy5oYXNDb250ZW50IGFuZCBzLmRhdGEpIG9yIG51bGxcbiAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIGFib3J0OiAtPlxuICAgICAgICAgICAgICBpZiB4ZHJcbiAgICAgICAgICAgICAgICB4ZHIub25lcnJvciA9IGpRdWVyeS5ub29wXG4gICAgICAgICAgICAgICAgeGRyLmFib3J0KClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBcImFib3J0ZWRcIlxuICAgICAgICAgICAgICByZXR1cm5cblxuXG5cbiMjI1xuSW5zdGFudGlhdGUgaGVscGVyXG4jIyNcbm1vZHVsZS5leHBvcnRzID0gbmV3IEJyb3dzZXJTdXBwb3J0SGVscGVyXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5fICAgICAgICAgPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcbkJhY2tib25lICA9IHJlcXVpcmUoJ2JhY2tib25lJylcbiQgICAgICAgICA9IHJlcXVpcmUoJ2pxdWVyeScpXG5Nb2Rlcm5penIgPSByZXF1aXJlKFwibW9kZXJuaXpyXCIpXG5KU09OICAgICAgPSByZXF1aXJlKFwianNvbjNcIilcblxuXG5jbGFzcyBEYXRhSGVscGVyIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuXHQjIyNcblx0R2V0IGRhdGEgZnJvbSBlbGVtZW50IG9uIERPTS5cblxuXHRAYXV0aG9yIEFsZXNzYW5kcm8gQmlhdmF0aSA8QGFsZWJpYXZhdGk+XG5cdEBwYWNrYWdlIGRhdGEuY29mZmVlXG5cdEBzaW5jZSAxLjBcblx0QHBhcmFtIChqUXVlcnkvc3RyaW5nKSBlbFxuXHRAcmV0dXJuIChPYmplY3QpIGRhdGFcblx0IyMjXG5cblx0Z2V0RWxlbWVudERhdGE6ICggZWwsIGZvcm1hdCApIC0+XG5cblx0XHQjIGdldCBqUXVlcnkgZWxlbWVudFxuXHRcdGlmIHR5cGVvZiBlbCA9PSAnc3RyaW5nJ1xuXHRcdFx0ZWwgPSAkKCBlbCApXG5cblx0XHQjIGNoZWNrIGlmIGVsIHdhcyBmb3VuZFxuXHRcdGlmIG5vdCBlbCBpbnN0YW5jZW9mICQgb3IgZWwubGVuZ3RoID09IDBcblx0XHRcdHJldHVyblxuXG5cblx0XHQjIGluaXRpYWxpemUgZGF0YSB0byBlbXB0eSBvYmpcblx0XHRkYXRhID0ge31cblxuXHRcdCMgZ2V0IGRhdGFcblx0XHRpZiBlbC5pcyggJ3NjcmlwdCcgKSBvciAoIGZvcm1hdD8gYW5kIGZvcm1hdCBpcyAnanNvbicgKVxuXG5cdFx0XHRkYXRhID0gSlNPTi5wYXJzZSBlbC5odG1sKClcblxuXHRcdGVsc2VcblxuXHRcdFx0ZGF0YSA9IGVsLmRhdGEoKTtcblxuXHRcdGRhdGFcblxuXHQjIGdldEVsZW1lbnREYXRhKClcblxuXG4jIyNcbkluc3RhbnRpYXRlIGhlbHBlclxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBEYXRhSGVscGVyXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5CYWNrYm9uZSAgPSByZXF1aXJlKCdiYWNrYm9uZScpXG5cblxuY2xhc3MgRGF0ZUhlbHBlciBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cbiAgZ2V0RGF0ZXRpbWU6IChzZXJ2ZXJfZ210X29mZnNldCkgPT5cblxuICAgIHNlcnZlcl90aW1lID0gQGdldFRpbWUoc2VydmVyX2dtdF9vZmZzZXQpXG4gICAgc2VydmVyX2RhdGV0aW1lID0gbmV3IERhdGUoIHNlcnZlcl90aW1lIClcbiAgICBzZXJ2ZXJfZGF0ZXRpbWVcblxuXG4gIGdldFRpbWU6IChvZmZzZXQpIC0+XG5cbiAgICAjIGNyZWF0ZSBEYXRlIG9iamVjdCBmb3IgY3VycmVudCBsb2NhdGlvblxuICAgIGQgPSBuZXcgRGF0ZSgpXG5cbiAgICAjIGNvbnZlcnQgdG8gbXNlY1xuICAgICMgYWRkIGxvY2FsIHRpbWUgem9uZSBvZmZzZXRcbiAgICAjIGdldCBVVEMgdGltZSBpbiBtc2VjXG4gICAgdXRjID0gZC5nZXRUaW1lKCkgKyAoZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApXG5cbiAgICAjIGNyZWF0ZSBuZXcgRGF0ZSBvYmplY3QgZm9yIGRpZmZlcmVudCBjaXR5XG4gICAgIyB1c2luZyBzdXBwbGllZCBvZmZzZXRcbiAgICBuZCA9IG5ldyBEYXRlKHV0YyArICgzNjAwMDAwKm9mZnNldCkpO1xuXG4gICAgc2VydmVyX3RpbWUgPSBNYXRoLnJvdW5kKG5kLmdldFRpbWUoKSAvIDEwMDApXG5cbiAgICBzZXJ2ZXJfdGltZVxuXG5cbiAgcGFyc2VUaW1lc3RhbXAgOiAodGltZXN0YW1wKSAtPlxuXG4gICAgc2VjcyA9ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMTAwMCkgLSB0aW1lc3RhbXBcbiAgICBNYXRoLmZsb29yIHNlY3NcbiAgICBtaW51dGVzID0gc2VjcyAvIDYwXG4gICAgc2VjcyA9IE1hdGguZmxvb3Ioc2VjcyAlIDYwKVxuICAgIHJldHVybiBzZWNzICsgKChpZiBzZWNzID4gMSB0aGVuIFwiIHNlY29uZHMgYWdvXCIgZWxzZSBcIiBzZWNvbmQgYWdvXCIpKSAgaWYgbWludXRlcyA8IDFcbiAgICBob3VycyA9IG1pbnV0ZXMgLyA2MFxuICAgIG1pbnV0ZXMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgJSA2MClcbiAgICByZXR1cm4gbWludXRlcyArICgoaWYgbWludXRlcyA+IDEgdGhlbiBcIiBtaW51dGVzIGFnb1wiIGVsc2UgXCIgbWludXRlIGFnb1wiKSkgIGlmIGhvdXJzIDwgMVxuICAgIGRheXMgPSBob3VycyAvIDI0XG4gICAgaG91cnMgPSBNYXRoLmZsb29yKGhvdXJzICUgMjQpXG4gICAgcmV0dXJuIGhvdXJzICsgKChpZiBob3VycyA+IDEgdGhlbiBcIiBob3VycyBhZ29cIiBlbHNlIFwiIGhvdXIgYWdvXCIpKSAgaWYgZGF5cyA8IDFcbiAgICB3ZWVrcyA9IGRheXMgLyA3XG4gICAgZGF5cyA9IE1hdGguZmxvb3IoZGF5cyAlIDcpXG4gICAgcmV0dXJuIGRheXMgKyAoKGlmIGRheXMgPiAxIHRoZW4gXCIgZGF5cyBhZ29cIiBlbHNlIFwiIGRheSBhZ29cIikpICBpZiB3ZWVrcyA8IDFcbiAgICBtb250aHMgPSB3ZWVrcyAvIDQuMzVcbiAgICB3ZWVrcyA9IE1hdGguZmxvb3Iod2Vla3MgJSA0LjM1KVxuICAgIHJldHVybiB3ZWVrcyArICgoaWYgd2Vla3MgPiAxIHRoZW4gXCIgd2Vla3MgYWdvXCIgZWxzZSBcIiB3ZWVrIGFnb1wiKSkgIGlmIG1vbnRocyA8IDFcbiAgICB5ZWFycyA9IG1vbnRocyAvIDEyXG4gICAgbW9udGhzID0gTWF0aC5mbG9vcihtb250aHMgJSAxMilcbiAgICByZXR1cm4gbW9udGhzICsgKChpZiBtb250aHMgPiAxIHRoZW4gXCIgbW9udGhzIGFnb1wiIGVsc2UgXCIgbW9udGggYWdvXCIpKSAgaWYgeWVhcnMgPCAxXG4gICAgeWVhcnMgPSBNYXRoLmZsb29yKHllYXJzKVxuICAgIHllYXJzICsgKChpZiB5ZWFycyA+IDEgdGhlbiBcIiB5ZWFycyBhZ29cIiBlbHNlIFwiIHllYXJzIGFnb1wiKSlcblxuXG5cbiMjI1xuSW5zdGFudGlhdGUgaGVscGVyXG4jIyNcbm1vZHVsZS5leHBvcnRzID0gbmV3IERhdGVIZWxwZXJcblxuXG5cbiIsIlwidXNlIHN0cmljdFwiXG5cbl8gICAgICAgICA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxuQmFja2JvbmUgID0gcmVxdWlyZSgnYmFja2JvbmUnKVxuJCAgICAgICAgID0gcmVxdWlyZSgnanF1ZXJ5Jylcbk1vZGVybml6ciA9IHJlcXVpcmUoXCJtb2Rlcm5penJcIilcblxuXG5jbGFzcyBFbnZIZWxwZXIgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gICAgZGVmYXVsdHM6XG5cbiAgICAgICAgcmVzaXplRXZlbnQ6ICAgICAgICAgIFwicmVzaXplXCJcbiAgICAgICAgc2Nyb2xsVG9wOiAgICAgICAgICAgIDBcbiAgICAgICAgb3JpZW50YXRpb246ICAgICAgICAgIG51bGxcbiAgICAgICAgY2VudGVyOiAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaGVpZ2h0RnVsbDogICAgICAgICAgIG51bGxcbiAgICAgICAgaGVpZ2h0UmF3OiAgICAgICAgICAgIG51bGxcbiAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgd2lkdGg6ICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgc2FmYXJpOiAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaXNNb2JpbGU6ICAgICAgICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlSXBob25lOiAgICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlSXBhZDogICAgICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlSW9zOiAgICAgICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlQW5kcm9pZDogICAgICAgIG51bGxcbiAgICAgICAgbW9iaWxlQW5kcm9pZFZlcnNpb246IG51bGxcbiAgICAgICAgbW9iaWxlUmF3c2NyZWVuOiAgICAgIG51bGxcbiAgICAgICAgaW9zOiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zMTogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zMjogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zMl80OiAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zMzogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNDogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNTogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNV91cDogICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNjogICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgaW9zNl91cDogICAgICAgICAgICAgIG51bGxcblxuXG4gICAgc3RhcnQ6ID0+XG4gICAgICAgIEB1cGRhdGVFbnYoKVxuXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICAgICMgXy5iaW5kQWxsIEBcblxuICAgICAgICAjIGRldGVjdCB1c2VyIGFnZW50XG4gICAgICAgIEB1c2VyQWdlbnREZXRlY3RzKClcblxuICAgICAgICBpZiBAZ2V0KFwiaXNfbW9iaWxlXCIpIG9yIEBnZXQoXCJpc190YWJsZXRcIilcbiAgICAgICAgICAgICQod2luZG93KS5vbiBAZ2V0KFwicmVzaXplRXZlbnRcIiksIF8uZGVib3VuY2UoQHVwZGF0ZUVudiwgMzAwKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAkKHdpbmRvdykub24gQGdldChcInJlc2l6ZUV2ZW50XCIpLCBfLnRocm90dGxlKEB1cGRhdGVFbnYsIDEwMCwge2xlYWRpbmc6IGZhbHNlfSlcblxuICAgICAgICAjIGRldGVjdCBzY3JvbGxcbiAgICAgICAgaWYgXCJtb3VzZXdoZWVsXCIgb2Ygd2luZG93XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbiBcIm1vdXNld2hlZWxcIiwgQHdoZWVsSGFuZGxlclxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsIEB1cGRhdGVTY3JvbGxEaXJcblxuICAgICAgICAjIGJpbmQgY2hhbmdlOmNlbnRlciB0byBhbGwgb3RoZXIgaGFuZGxlcnNcbiAgICAgICAgQG9uIFwiY2hhbmdlOm9yaWVudGF0aW9uXCIsIEBtb2JpbGVBZGRyZXNzQmFyU2Nyb2xsRml4LCB0aGlzXG5cbiAgICAgICAgIyBkZXRlY3Qgb25saW5lL29mZmxpbmVcbiAgICAgICAgaWYgd2luZG93Lm5hdmlnYXRvci5vbkxpbmU/XG4gICAgICAgICAgICBAc2V0ICdvZmZsaW5lJywgKG5vdCB3aW5kb3cubmF2aWdhdG9yLm9uTGluZSlcbiAgICAgICAgICAgICMgYmluZCBvZmZsaW5lL29ubGluZSBldmVudHNcbiAgICAgICAgICAgICQod2luZG93KS5vbiAnb2ZmbGluZSBvbmxpbmUnLCBAb2ZmbGluZUNoZWNrXG5cblxuXG4gICAgb2ZmbGluZUNoZWNrOiAoZXZlbnQpID0+XG5cbiAgICAgICAgQHNldCAnb2ZmbGluZScsIChldmVudC50eXBlID09ICdvZmZsaW5lJylcblxuXG5cblxuICAgIHVzZXJBZ2VudERldGVjdHM6ID0+XG5cbiAgICAgICAgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhXG5cbiAgICAgICAgaW9zID0gdW5kZWZpbmVkXG4gICAgICAgIGlvczEgPSB1bmRlZmluZWRcbiAgICAgICAgaW9zMiA9IHVuZGVmaW5lZFxuICAgICAgICBpb3MyXzQgPSB1bmRlZmluZWRcbiAgICAgICAgaW9zMyA9IHVuZGVmaW5lZFxuICAgICAgICBpb3M0ID0gdW5kZWZpbmVkXG4gICAgICAgIGlvczUgPSB1bmRlZmluZWRcbiAgICAgICAgaW9zNV91cCA9IHVuZGVmaW5lZFxuICAgICAgICBpb3M2ID0gdW5kZWZpbmVkXG4gICAgICAgIGlvczZfdXAgPSB1bmRlZmluZWRcbiAgICAgICAgc2FmYXJpID0gfnVhLmluZGV4T2YoXCJTYWZhcmlcIikgaXNudCAwIGFuZCB+dWEuaW5kZXhPZihcIkNocm9tZVwiKSBpcyAwXG4gICAgICAgIG1vYmlsZV9pcGhvbmUgPSB+dWEuaW5kZXhPZihcImlQaG9uZVwiKSBpc250IDAgb3IgfnVhLmluZGV4T2YoXCJpUG9kXCIpIGlzbnQgMFxuICAgICAgICBtb2JpbGVfaXBhZCA9IH51YS5pbmRleE9mKFwiaVBhZFwiKSBpc250IDBcbiAgICAgICAgbW9iaWxlX2lvcyA9IG1vYmlsZV9pcGhvbmUgb3IgbW9iaWxlX2lwYWRcbiAgICAgICAgbW9iaWxlX2FuZHJvaWQgPSB+dWEuaW5kZXhPZihcIkFuZHJvaWRcIikgaXNudCAwXG4gICAgICAgIG1vYmlsZV9hbmRyb2lkX3ZlcnNpb24gPSB1bmRlZmluZWRcblxuICAgICAgICAjIERldGVjdCBpZiB0aGlzIGlzIHJ1bm5pbmcgYXMgYSBmdWxsc2NyZWVuIGFwcCBmcm9tIHRoZSBob21lc2NyZWVuXG4gICAgICAgIG1vYmlsZV9yYXdzY3JlZW4gPSB3aW5kb3cubmF2aWdhdG9yLnN0YW5kYWxvbmVcblxuICAgICAgICBpc19tb2JpbGUgPSBAaXNNb2JpbGUoIHVhIClcblxuICAgICAgICBtb2JpbGVfYW5kcm9pZF92ZXJzaW9uID0gdWEuc2xpY2UodWEuaW5kZXhPZihcIkFuZHJvaWRcIikgKyA4LCB1YS5pbmRleE9mKFwiQW5kcm9pZFwiKSArIDEzKSAgaWYgbW9iaWxlX2FuZHJvaWRcbiAgICAgICAgaWYgLyhpUGhvbmV8aVBvZHxpUGFkKS9pLnRlc3QodWEpXG4gICAgICAgICAgICBpb3MgPSB0cnVlXG4gICAgICAgICAgICBpZiAvT1MgMl9cXGQoX1xcZCk/IGxpa2UgTWFjIE9TIFgvaS50ZXN0KHVhKVxuXG4gICAgICAgICAgICAgICAgIyBpT1MgMiBzbyBEbyBTb21ldGhpbmdcbiAgICAgICAgICAgICAgICBpb3MyID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlvczJfNCA9IHRydWVcbiAgICAgICAgICAgIGVsc2UgaWYgL09TIDNfXFxkKF9cXGQpPyBsaWtlIE1hYyBPUyBYL2kudGVzdCh1YSlcblxuICAgICAgICAgICAgICAgICMgaU9TIDMgc28gRG8gU29tZXRoaW5nXG4gICAgICAgICAgICAgICAgaW9zMyA9IHRydWVcbiAgICAgICAgICAgICAgICBpb3MyXzQgPSB0cnVlXG4gICAgICAgICAgICBlbHNlIGlmIC9PUyA0X1xcZChfXFxkKT8gbGlrZSBNYWMgT1MgWC9pLnRlc3QodWEpXG5cbiAgICAgICAgICAgICAgICAjIGlPUyA0IHNvIERvIFNvbWV0aGluZ1xuICAgICAgICAgICAgICAgIGlvczQgPSB0cnVlXG4gICAgICAgICAgICAgICAgaW9zMl80ID0gdHJ1ZVxuICAgICAgICAgICAgZWxzZSBpZiAvT1MgNV9cXGQoX1xcZCk/IGxpa2UgTWFjIE9TIFgvaS50ZXN0KHVhKVxuXG4gICAgICAgICAgICAgICAgIyBpT1MgNSBzbyBEbyBTb21ldGhpbmdcbiAgICAgICAgICAgICAgICBpb3M1ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlvczVfdXAgPSB0cnVlXG4gICAgICAgICAgICBlbHNlIGlmIC9PUyA2X1xcZChfXFxkKT8gbGlrZSBNYWMgT1MgWC9pLnRlc3QodWEpXG5cbiAgICAgICAgICAgICAgICAjIGlPUyA2IHNvIERvIFNvbWV0aGluZ1xuICAgICAgICAgICAgICAgIGlvczYgPSB0cnVlXG4gICAgICAgICAgICAgICAgaW9zNV91cCA9IHRydWVcbiAgICAgICAgICAgICAgICBpb3M2X3VwID0gdHJ1ZVxuICAgICAgICAgICAgZWxzZSBpZiAvQ1BVIGxpa2UgTWFjIE9TIFgvaS50ZXN0KHVhKVxuXG4gICAgICAgICAgICAgICAgIyBpT1MgMSBzbyBEbyBTb21ldGhpbmdcbiAgICAgICAgICAgICAgICBpb3MxID0gdHJ1ZVxuICAgICAgICAgICAgZWxzZVxuXG4gICAgICAgICAgICAgICAgIyBpT1MgNiBvciBOZXdlciBzbyBEbyBOb3RoaW5nXG4gICAgICAgICAgICAgICAgaW9zNV91cCA9IHRydWVcblxuICAgICAgICBAc2V0XG4gICAgICAgICAgICAjIHNhZmFyaTogc2FmYXJpXG4gICAgICAgICAgICBpc19tb2JpbGU6IGlzX21vYmlsZVxuICAgICAgICAgICAgbW9iaWxlX2lwaG9uZTogbW9iaWxlX2lwaG9uZVxuICAgICAgICAgICAgbW9iaWxlX2lwYWQ6IG1vYmlsZV9pcGFkXG4gICAgICAgICAgICBtb2JpbGVfaW9zOiBtb2JpbGVfaW9zXG4gICAgICAgICAgICBtb2JpbGVfYW5kcm9pZDogbW9iaWxlX2FuZHJvaWRcbiAgICAgICAgICAgIG1vYmlsZV9hbmRyb2lkX3ZlcnNpb246IG1vYmlsZV9hbmRyb2lkX3ZlcnNpb25cbiAgICAgICAgICAgIG1vYmlsZV9yYXdzY3JlZW46IG1vYmlsZV9yYXdzY3JlZW5cbiAgICAgICAgICAgIGlvczogaW9zXG4gICAgICAgICAgICBpb3MxOiBpb3MxXG4gICAgICAgICAgICBpb3MyOiBpb3MyXG4gICAgICAgICAgICBpb3MyXzQ6IGlvczJfNFxuICAgICAgICAgICAgaW9zMzogaW9zM1xuICAgICAgICAgICAgaW9zNDogaW9zNFxuICAgICAgICAgICAgaW9zNTogaW9zNVxuICAgICAgICAgICAgaW9zNV91cDogaW9zNV91cFxuICAgICAgICAgICAgaW9zNjogaW9zNlxuICAgICAgICAgICAgaW9zNl91cDogaW9zNl91cFxuXG5cblxuICAgIGlzTW9iaWxlOiAodWEpID0+XG5cbiAgICAgICAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIChjZXxwaG9uZSl8eGRhfHhpaW5vL2kudGVzdCh1YSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QodWEuc3Vic3RyKDAsNCkpKVxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmYWxzZVxuXG4gICAgdXBkYXRlRW52OiA9PlxuICAgICAgICBoZWlnaHQgPSB1bmRlZmluZWRcbiAgICAgICAgaGVpZ2h0X3JhdyA9IHVuZGVmaW5lZFxuICAgICAgICBoZWlnaHRfZnVsbCA9IHVuZGVmaW5lZFxuICAgICAgICB3aWR0aCA9IHVuZGVmaW5lZFxuICAgICAgICBjZW50ZXIgPSB1bmRlZmluZWRcbiAgICAgICAgb3JpZW50YXRpb24gPSB1bmRlZmluZWRcblxuICAgICAgICAjIGdldCB3aWR0aFxuICAgICAgICB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpXG5cbiAgICAgICAgIyBnZXQgaGVpZ2h0LCBkZXBlbmRpbmcgb24gd2hhdCBkZXZpY2Ugd2UgYXJlIG9uXG4gICAgICAgIGlmIEBnZXQoXCJtb2JpbGVfaW9zXCIpIGFuZCBAZ2V0KFwic2FmYXJpXCIpXG4gICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHRfcmF3ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgICAgICAgaGVpZ2h0ICs9IDYwICBpZiBAZ2V0KFwibW9iaWxlX2lwaG9uZVwiKSBhbmQgbm90IEBnZXQoXCJtb2JpbGVfcmF3c2NyZWVuXCIpIGFuZCBoZWlnaHQgaXNudCAzMjBcbiAgICAgICAgICAgIGhlaWdodF9mdWxsID0gaGVpZ2h0XG4gICAgICAgIGVsc2UgaWYgQGdldChcIm1vYmlsZV9hbmRyb2lkXCIpXG4gICAgICAgICAgICBpZiBAZ2V0KFwibW9iaWxlX2FuZHJvaWRfdmVyc2lvblwiKSBpcyBcIjQuMS4xXCJcbiAgICAgICAgICAgICAgICBoZWlnaHRfZnVsbCA9IGhlaWdodCA9IGhlaWdodF9yYXcgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHRfcmF3ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICAgICAgaGVpZ2h0X2Z1bGwgPSBoZWlnaHQgKyA1NlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHRfcmF3ID0gaGVpZ2h0X2Z1bGwgPSAkKHdpbmRvdykuaGVpZ2h0KClcblxuICAgICAgICAjIGNoZWNrIG9yaWVudGF0aW9uXG4gICAgICAgIGlmIHdpZHRoID4gaGVpZ2h0XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9IFwibGFuZHNjYXBlXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgb3JpZW50YXRpb24gPSBcInBvcnRyYWl0XCJcblxuICAgICAgICAjIHNldCBhdHRyaWJ1dGVzXG4gICAgICAgIEBzZXRcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgIGhlaWdodF9yYXc6IGhlaWdodF9yYXdcbiAgICAgICAgICAgIGhlaWdodF9mdWxsOiBoZWlnaHRfZnVsbFxuICAgICAgICAgICAgY2VudGVyOlxuICAgICAgICAgICAgICAgIGxlZnQ6IHdpZHRoIC8gMlxuICAgICAgICAgICAgICAgIHRvcDogaGVpZ2h0IC8gMlxuXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cblxuXG4gICAgdXBkYXRlU2Nyb2xsRGlyOiAoZXZlbnQpID0+XG4gICAgICAgIHNjcm9sbFRvcCA9IEBnZXRTY3JvbGxUb3AoKVxuICAgICAgICBsYXN0U2Nyb2xsVG9wID0gQGdldChcInNjcm9sbFRvcFwiKVxuICAgICAgICBpZiBzY3JvbGxUb3AgPiBsYXN0U2Nyb2xsVG9wXG4gICAgICAgICAgICBAc2V0IFwic2Nyb2xsRGlyXCIsIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHNldCBcInNjcm9sbERpclwiLCBmYWxzZVxuICAgICAgICBAc2V0IFwic2Nyb2xsVG9wXCIsIHNjcm9sbFRvcFxuXG4gICAgd2hlZWxIYW5kbGVyOiAoZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSkgPT5cblxuXG4gICAgZ2V0U2Nyb2xsVG9wOiA9PlxuICAgICAgICBpZiB0eXBlb2Ygd2luZG93LnBhZ2VZT2Zmc2V0IGlzbnQgXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0ICNtb3N0IGJyb3dzZXJzXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEIgPSBkb2N1bWVudC5ib2R5ICNJRSAncXVpcmtzJ1xuICAgICAgICAgICAgRCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAjSUUgd2l0aCBkb2N0eXBlXG4gICAgICAgICAgICBEID0gKGlmIChELmNsaWVudEhlaWdodCkgdGhlbiBEIGVsc2UgQilcbiAgICAgICAgICAgIEQuc2Nyb2xsVG9wXG5cbiAgICBtb2JpbGVBZGRyZXNzQmFyU2Nyb2xsRml4OiA9PlxuXG4gICAgICAgIGlmIEBnZXQoXCJtb2JpbGVfYW5kcm9pZFwiKSBvciAoQGdldChcIm1vYmlsZV9pb3NcIikgYW5kIEBnZXQoXCJzYWZhcmlcIikpXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5oZWlnaHQgQGdldChcImhlaWdodF9mdWxsXCIpXG4gICAgICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgICAgICAgIyBIaWRlIHRoZSBhZGRyZXNzIGJhciFcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8gMCwgMVxuICAgICAgICAgICAgLCAwXG5cbiMgZW52SGVscGVyXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEVudkhlbHBlclxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuXyAgICAgICAgID0gcmVxdWlyZSgndW5kZXJzY29yZScpXG5CYWNrYm9uZSAgPSByZXF1aXJlKCdiYWNrYm9uZScpXG4kICAgICAgICAgPSByZXF1aXJlKCdqcXVlcnknKVxuTW9kZXJuaXpyID0gcmVxdWlyZShcIm1vZGVybml6clwiKVxuXG5cbmNsYXNzIEh0dHBIZWxwZXIgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gIHRvVXJsOiAoYmFzZV91cmwsIGFyZ3MpIC0+XG5cbiAgICB1cmwgPSBiYXNlX3VybFxuICAgIGluZGV4ID0gMFxuICAgIGZpcnN0X3NlcGFyYXRvciA9IChpZiBiYXNlX3VybC5pbmRleE9mKFwiP1wiKSBpcyAtMSB0aGVuIFwiP1wiIGVsc2UgXCImXCIpXG4gICAgJC5lYWNoIGFyZ3MsIChrZXksIHZhbCkgLT5cbiAgICAgIHJldHVybiB0cnVlICBpZiB2YWwgaXMgYHVuZGVmaW5lZGAgb3IgdmFsIGlzIFwiXCJcbiAgICAgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgdXJsICs9IGZpcnN0X3NlcGFyYXRvclxuICAgICAgZWxzZVxuICAgICAgICB1cmwgKz0gXCImXCJcbiAgICAgIHVybCArPSBrZXkgKyBcIj1cIiArIHZhbFxuICAgICAgaW5kZXgrK1xuICAgIHVybFxuXG4gICMgdG9VcmwoKVxuXG5cbiAgcmVxdWlyZUZpbGVzOiAoZmlsZXMpIC0+XG5cbiAgICBfLmVhY2ggZmlsZXMsIChmaWxlbmFtZSkgLT5cblxuICAgICAgZmlsZUV4dCA9IGZpbGVuYW1lLnNwbGl0KCcuJykucG9wKClcbiAgICAgIGZpbGVyZWYgPSBudWxsO1xuXG4gICAgICBpZiBmaWxlRXh0IGlzICdqcydcblxuICAgICAgICBmaWxlcmVmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgICAgICBmaWxlcmVmLnNldEF0dHJpYnV0ZSAndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgICAgIGZpbGVyZWYuc2V0QXR0cmlidXRlICdzcmMnLCBmaWxlbmFtZVxuXG4gICAgICBlbHNlIGlmIGZpbGVFeHQgaXMgJ2NzcydcblxuICAgICAgICBmaWxlcmVmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnbGluaydcbiAgICAgICAgZmlsZXJlZi5zZXRBdHRyaWJ1dGUgJ3JlbCcsICdzdHlsZXNoZWV0J1xuICAgICAgICBmaWxlcmVmLnNldEF0dHJpYnV0ZSAndHlwZScsICd0ZXh0L2NzcydcbiAgICAgICAgZmlsZXJlZi5zZXRBdHRyaWJ1dGUgJ2hyZWYnLCBmaWxlbmFtZVxuXG5cbiAgICAgIGlmIGZpbGVyZWY/XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdoZWFkJyApWzBdLmFwcGVuZENoaWxkKCBmaWxlcmVmIClcblxuXG4gIGdldFF1ZXJ5VmFyaWFibGU6ICh2YXJpYWJsZSkgLT5cblxuICAgIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSlcbiAgICB2YXJzID0gcXVlcnkuc3BsaXQoJyYnKTtcblxuICAgIHZhbHVlID0gbnVsbFxuXG4gICAgXy5lYWNoIHZhcnMsICh2LCBpKSAtPlxuICAgICAgcGFpciA9IHYuc3BsaXQoJz0nKTtcbiAgICAgIGlmIGRlY29kZVVSSUNvbXBvbmVudCggcGFpclswXSApIGlzIHZhcmlhYmxlXG4gICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50IHBhaXJbMV1cblxuICAgIHZhbHVlXG5cbiMgSHR0cEhlbHBlclxuXG5cbiMjI1xuSW5zdGFudGlhdGUgaGVscGVyXG4jIyNcbm1vZHVsZS5leHBvcnRzID0gbmV3IEh0dHBIZWxwZXJcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwICAgICAgPSByZXF1aXJlICdhcHAnXG5CYWNrYm9uZSA9IHJlcXVpcmUgXCJiYWNrYm9uZVwiXG5cbmNsYXNzIEFwcC5Nb2RlbHMuQXBpTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gIHVybFJvb3Q6ID0+XG5cbiAgICB1cmxSb290ID0gbnVsbFxuXG4gICAgYXBpVXJsID0gXy5yZXN1bHQoQCwgJ2FwaVVybCcpXG4gICAgaWYgYXBpVXJsP1xuICAgICAgdXJsUm9vdCA9IEFwcC5yZXF1ZXN0KCdhcGlSb290JykgKyBhcGlVcmxcblxuICAgIHVybFJvb3RcblxuXG4gIHBhcnNlOiAocmVzcG9uc2UpIC0+XG5cbiAgICBwYXJzZWREYXRhID0ge31cbiAgICBpZiByZXNwb25zZS5kYXRhP1xuICAgICAgcGFyc2VkRGF0YSA9IHJlc3BvbnNlLmRhdGFcbiAgICBlbHNlXG4gICAgICBwYXJzZWREYXRhID0gcmVzcG9uc2VcblxuICAgIHBhcnNlZERhdGFcblxuICBnZXQ6ID0+XG5cbiAgICB2YWx1ZSA9IEFwcC5Nb2RlbHMuQXBpTW9kZWwuX19zdXBlcl9fLmdldC5hcHBseSBALCBhcmd1bWVudHNcblxuICAgIGlmIF8uaXNGdW5jdGlvbiB2YWx1ZVxuICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseSBAXG5cbiAgICB2YWx1ZVxuXG5cbiAgdG9KU09OOiA9PlxuXG4gICAgZGF0YSA9IHt9XG5cbiAgICBqc29uID0gQXBwLk1vZGVscy5BcGlNb2RlbC5fX3N1cGVyX18udG9KU09OLmFwcGx5IEAsIGFyZ3VtZW50c1xuXG4gICAgXy5lYWNoIGpzb24sICh2YWx1ZSwga2V5KSAtPlxuICAgICAgZGF0YVtrZXldID0gQGdldChrZXkpXG4gICAgLCBAXG5cbiAgICBkYXRhXG5cblxuICB0b2dnbGVBdHRyaWJ1dGU6IChhdHRyLCBvcHRpb25zKSA9PlxuXG4gICAgQHNldCggYXR0ciwgbm90IEBnZXQoIGF0dHIsIF8uZGVmYXVsdCggb3B0aW9ucywge30gKSApIClcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5jbGFzcyBBcHAuTW9kZWxzLldQT3B0aW9uTW9kZWwgZXh0ZW5kcyBBcHAuTW9kZWxzLkFwaU1vZGVsXG5cbiAgYXBpVXJsOiAnMS9zaXRlL29wdGlvbnMnXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbmNsYXNzIEFwcC5Nb2RlbHMuV1BVc2VyTWV0YU1vZGVsIGV4dGVuZHMgQXBwLk1vZGVscy5BcGlNb2RlbFxuXG4gIGFwaVVybDogJzEvc2l0ZS91c2VybWV0YSdcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5BcHAubW9kdWxlICdTU0FkbWluJywgKFNTQWRtaW4sIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgY2xhc3MgU1NBZG1pbi5Db250cm9sbGVycy5BZG1pbkNvbnRyb2xsZXIgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbnRyb2xsZXJcblxuXG4gICAgaW5pdGlhbGl6ZTogPT5cblxuICAgICAgU1NBZG1pbi5vbiAnc3RhcnQnLCBAb25TdGFydFxuXG5cblxuICAgIG9uU3RhcnQ6ID0+XG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIGhlYWRlciByZWdpb24gaXMgaW4gdGhlIGRvbVxuICAgICAgaWYgJCgnLnNzLWhlYWRlci1yZWdpb24nKS5sZW5ndGggPiAwXG5cbiAgICAgICAgQXBwLmFkZFJlZ2lvbnNcbiAgICAgICAgICBoZWFkZXI6ICcuc3MtaGVhZGVyLXJlZ2lvbidcblxuICAgICAgICBoZWFkZXJWaWV3ID0gbmV3IFNTQWRtaW4uVmlld3MuSGVhZGVySXRlbVZpZXdcbiAgICAgICAgICBtb2RlbDogQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9ucydcblxuICAgICAgICBBcHAuaGVhZGVyLnNob3cgaGVhZGVyVmlld1xuXG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIGhvbWUgcmVnaW9uIGlzIGluIHRoZSBkb21cbiAgICAgIGlmICQoJy5zcy1ob21lLXJlZ2lvbicpLmxlbmd0aCA+IDBcblxuICAgICAgICBBcHAuYWRkUmVnaW9uc1xuICAgICAgICAgIGhvbWU6ICcuc3MtaG9tZS1yZWdpb24nXG5cbiAgICAgICAgaG9tZVZpZXcgPSBuZXcgU1NBZG1pbi5WaWV3cy5Ib21lSXRlbVZpZXdcbiAgICAgICAgICBtb2RlbDogKG5ldyBCYWNrYm9uZS5Nb2RlbClcblxuICAgICAgICBBcHAuaG9tZS5zaG93IGhvbWVWaWV3XG5cblxuICAgICAgIyBjaGVjayBpZiB0aGUgaG9tZSByZWdpb24gaXMgaW4gdGhlIGRvbVxuICAgICAgaWYgJCgnLnNzLWxvYWRlci1yZWdpb24nKS5sZW5ndGggPiAwXG5cbiAgICAgICAgQXBwLmFkZFJlZ2lvbnNcbiAgICAgICAgICBsb2FkZXI6ICcuc3MtbG9hZGVyLXJlZ2lvbidcblxuICAgICAgICBsb2FkZXJWaWV3ID0gbmV3IEFwcC5WaWV3cy5Mb2FkZXJJdGVtVmlld1xuICAgICAgICAgIG1vZGVsOiAobmV3IEJhY2tib25lLk1vZGVsKVxuXG4gICAgICAgIEFwcC5sb2FkZXIuc2hvdyBsb2FkZXJWaWV3XG4gICAgICAgIGxvYWRlclZpZXcuc3RvcFNwaW5uZXIoKVxuXG5cblxuICAgIHJlc2V0VHJhc2hUb2dnbGU6ID0+XG5cbiAgICAgIGlmIEFwcC5oZWFkZXIuY3VycmVudFZpZXc/IGFuZCBBcHAuaGVhZGVyLmN1cnJlbnRWaWV3IGluc3RhbmNlb2YgU1NBZG1pbi5WaWV3cy5IZWFkZXJJdGVtVmlld1xuICAgICAgICBBcHAuaGVhZGVyLmN1cnJlbnRWaWV3LnJlc2V0VHJhc2hUb2dnbGUoKVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NBZG1pbicsIChTU0FkbWluLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIFNTQWRtaW4uQ29udHJvbGxlcnMgPSB7fVxuICBTU0FkbWluLk1vZGVscyA9IHt9XG4gIFNTQWRtaW4uQ29sbGVjdGlvbnMgPSB7fVxuICBTU0FkbWluLlZpZXdzID0ge31cbiAgU1NBZG1pbi5MYXlvdXRzID0ge31cbiAgU1NBZG1pbi5Sb3V0ZXJzID0ge31cbiAgU1NBZG1pbi5UZW1wbGF0ZXMgPSB7fVxuXG4gIFNTQWRtaW4udmVudCA9IG5ldyBCYWNrYm9uZS5XcmVxci5FdmVudEFnZ3JlZ2F0b3IoKVxuICBTU0FkbWluLmNvbW1hbmRzID0gbmV3IEJhY2tib25lLldyZXFyLkNvbW1hbmRzKClcbiAgU1NBZG1pbi5yZXFyZXMgPSBuZXcgQmFja2JvbmUuV3JlcXIuUmVxdWVzdFJlc3BvbnNlKClcblxuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJzcy1oZWFkZXItaW5uZXJcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwic3MtbG9nb1xcXCI+XFxuICAgIDxhIGhyZWY9XFxcImh0dHA6Ly9zb2NpYWxzdHJlYW1zLmNvbS9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5Tb2NpYWxTdHJlYW1zPC9hPlxcbiAgPC9kaXY+PCEtLSAuc3MtbG9nbyAtLT5cXG4gIDxkaXYgY2xhc3M9XFxcInNzLWhlYWRlci1hY3Rpb25zXFxcIj5cXG4gICAgPGEgaHJlZj1cXFwiamF2YXNjcmlwdDp2b2lkKDApO1xcXCIgY2xhc3M9XFxcInNzLXNldHRpbmdzLXRvZ2dsZVxcXCI+PGkgY2xhc3M9XFxcInNzLWljb24tY29nXFxcIj48L2k+IDxzcGFuIGNsYXNzPVxcXCJzcy1pbm5lci10ZXh0XFxcIj5TZXR0aW5nczwvc3Bhbj48L2E+XFxuICAgIDxhIGhyZWY9XFxcImphdmFzY3JpcHQ6dm9pZCgwKTtcXFwiIGNsYXNzPVxcXCJzcy10cmFzaC10b2dnbGVcXFwiPjxpIGNsYXNzPVxcXCJzcy1pY29uLXRyYXNoLW9cXFwiPjwvaT4gPHNwYW4gY2xhc3M9XFxcInNzLWlubmVyLXRleHRcXFwiPlZpZXcgVHJhc2g8L3NwYW4+PC9hPlxcbiAgPC9kaXY+PCEtLSAuc3MtaGVhZGVyLWFjdGlvbnMgLS0+XFxuPC9kaXY+XFxuXCI7XG4gIH0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICByZXR1cm4gXCI8aW1nIGNsYXNzPVxcXCJob21lLWxvZ29cXFwiIGFsdD1cXFwiaG9tZS1sb2dvXFxcIiB3aWR0aD1cXFwiMzMwXFxcIiBzcmM9XFxcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBVmdBQUFCRUNBWUFBQURFRHkwVUFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBRG1CSlJFRlVlTnJzWGR0MTI3b1NoYlB5TDk4S3BGUmd1Z0l4bi9teVVvSG9DaUpYRUxtQ3lCV1lyaUQwVno0UFZVR29DbzVVd1pFcjhDVTBvRWxUZUJPVUpYdnZ0WkNISkJMQVlHWmo4QnFjUFQ4L013QUFBQ0E4UGtFRUFBQUFJRmdBQUFBUUxBQUFBQUNDQlFBQUFNRUNBQUNBWUFFQUFBQVFMQUFBQUFnV0FBQUFCQXNBQUFDQVlBRUFBRUN3QUFBQUlGaEFoYk52NTJVcXl2UmNwaFFDQVlBUFl2b0k5bklBY21Vc0w5TkY0OU1IOXZ3bk9iSnl4dVdmVVptS3NtdzVHZzRBUUxDblNLN0hSYkx5TXE3S0ZKZmwyNklSQVFCVEJNZUtWRUd1SE5PUzNHWkhVTWFGcEl6OC93bWFEd0JBc0tlTTlSR1VZYVQ0ZklMbUFRQVE3REVqRWNOdEdhN0xJWGdHRVFFQUNCYndBYzFoeGhLUzVlU2FRa0J2Z0xOdlVabEdFQVFBZ24yZkpBdHlmUnRpblplSnQ4WGZNdjFiL2p2ZmtTMEE5SWpQRU1IQlNCYkcvSGJrbXBSLy9teDlPaTRUbjZLQk53dkFnd1dBRGtnVW53L0YvbDhBQU1FQ0FBQ0FZQUVBQUFBUUxBQUFRRjhJczhoRnE3RjhZenIvKzd6MWJjN29mSHNXS0o5WTVCSHYzc3ZZVnZ5ZEJ6dmFTZmtrb2o3anhqY2JSb2NEZUoyeU1yL0M0bDI4ckROUlhpYWVuMW1YOWV6YlJEd3JXeVRMUkRuV2pkODJUNGVsSjdsamdlVFAwNmp4YWJHVG5ZM00reXNYTDgrOFVhN1g4cVcybnJUS3ZSVy8yMXJxU3J1ZGk0QjZQUkx2ajFweUxWNTBhTittcTNxdXJkdE8xa2FVZDl5UXpWYlliT0VvazVEeU9HOXdWaVRzbWdrOVd3ZkpvbE1zQWxxZDVRbzN0UGoxRTZOam1RdG5BZG5uODdEN25hOXdhTUZqM2lKVkhUYUNMRFBOTzNQSis4eG4vZDFrZXlzTTViZmtPLzIyTUhuNU9KYmxjL0Via0JjMzZvRkJqektuZGxiWGtlT3JWWEFiTXNhMXBHdzM1Zk9MM1RZdzZ0d0dpakpIMHZKU3ZXZWkza09Obm1YQ2R0WTkyV210eXhUeGJlcW9SOXkyZjd6U0g2clR1Y2g3cW5oeUtmSXRKRTVKb2loenBRT3BjMkFpZW5jaTBvVkJIdjR5NzBTd1ZNak1nWWphd29rdHZiOUk1RE4wek9PMmZQKzhwY1NUbG5lZHYycWNmUVZ4Z1R4d0M1WC9yK0ladWNMNnkvWkpZZHg2b2p3R2dpVnkrdW54NUYxWnhwbkM2MDhhN1IxcFNIc2x2S2syMnQ0cGw4VS9pdWNMRFlISWRZVGFlZTZoYzdmV1RncnBYMm9na2pZZXkzUWwvZWI1ejVtR3dPOFY1QmtaT3N4S2R4TkI3b2x3eEFhVzVWMktaOWNXOG5COXQ1eFBlaVZZZllTb2NDU3JialRtSVBpNXdTUGRDSUZIRmdiaVRySnFvNVEzV2hqWm5oYkJ5cjBsRjd3ZURYUi9uNXpBOVczcDFnNytqb1BMQ0tnYThnNkN0WldhWUgwN3lEWW5wSjVPamcyZmROVUxMM3Z3V2VSS0F4REFZS2RnUkNpcW9mcDl4enpHd2lCMG5pQlg4RitCRERKRWRLeDVZSEk5YnRDb29hdnNMNFRjS2xLWkJpemhqNER2eWhxanFid0R1VloxempYMmN4NmNYUHZIb0lPOEIwSWVJNFU4WmdIMFlpejB0VWVDSmVLN3N2amx4dUkzUXlhTDJFVEtrWjRvWmN5VlNtK1c3U2l3UVI4N3VZYXM3NC9Xb3N5eDRXNDNUMXNUYlFqaXU5RFl5WUtkRnJtR0l1aFVvV2Z6d0hyV213ZWJHSVl0WDNmRGlPYy9JekdjK0NMbWRGU1lLUElZR29iKzE3dThHUHR1ZUg5WHJIWjVVSjE0ZlM0WkxhVHBHdG5YeU9lT1pmbWZrTVBUeVhaRytpSGZuV2pqS3QwWjZzcmx2ZzVjeG8zSE03VitWbTFWVHpNa3pMeXd3dlhyVnJ6SGhLdTlrMmhFS0ZPTGV0MDJiT2poQU8yOUViYjY2Q0hYcFNpalNTWmpDUUhPREozTlE0dFBiUFRNR3E3YnRFWWE0ZTNQQ2RIRTg2U3NkS2J3ZkdVR29SdG0zelE4Z1hybzFYMitWa1Zvcit0RWN6eEptUjh2OTA5TkEvaDQ0Qk9EZ2sxYVphSHRQelNIV3B5Z3h4SnJ5RlcyNHA2THViNjFwcTVaWU8vTnhmTjVFbTJVZTc1UE5pYy9FblhTa2ZLTTFkdUxiQWhBdG1DVGllRnZYOU1LKzNaTEM1R3BJYitOa0dsemg0RnBibmtpN0tGQ3BHa3YyYnh0SllzZ051WHF3WTZWaXExZjFWeG81NlZlSzVUT2U1VjdLTFRhZXh0WUtTYWFPdW5tWXR5bkNFaHBCZ2JEM1NycXZtYW5HUnhiMWM3cVBaY2tBeFZKNVkzSVpZOGRQZnVsR0MzWWRwU1ZzZWFHTmg0NmtGN1Z0ckdoTGxjT0hmV2RjaldjaUNidW9aMGZKRTRSRTFzYlRXc1d5UjRCMHY4bkRoMjNqck1LalUzTm5UZ29FTUdxWEh2OXZBUXAzbTFEVWFycGhOelNRNjQ5QVBVY1oyWXdnQnN4clA3U0tvc01qOXB0SDJUSWp4N2w4Q0hsekxnbGgrUzRZUjhES2R1UHIzdjdva3ZjYUo3LzhBN3B2REdkb2h0YU5vZnlWWW9kRDhha0Z0c09kWjdVd3FCcmMwTUhIVnZhNHR5Z1IwVVAwd1Z6VFg2cFJtODN5ZzZMUG4veTRxSWFXdzg5ZTNBOXVPTktzR3ZOM0VlcVhlRGhQV2V0OUpIbnphVVhPOWVkVHdsVWN5MTBKYlpwV0Y3c2VsR3VySnc0cVJjdnRMODNJNUUwd0lxRlg2RExPN2JOc1dLamxLdHVJWUhhTUdMMTNPd1gzejJLQVdGemNHYWswVTNUOHk2bjF3WktyOXp1Z0U4ZVZETG0vYWxyVDMwdUxPdS84dFl6OG9hL0MrZnMwdWVTVXRjNVdOMEcrQ21qK2RZRmN6bGE1emUwdkJmaytuWW1WY1Y0SlhLdnJydnU0d3FZVXlOT2w0NWpxakNRdjZWYzlhZnljTFY0WDNoditsWXcrUngydGJWTHpWZGs0NTFzMnRXRFRRMURhMTVvdnZqREk4WVh1LzFuNy8xNkRrNnE1SjNqZmkxM1hkSmgrcUgwQ0hnTFBXdnlWU1pHeHVjaE0zY2pXR0owV3plWjl4cS9Hb1hITGFWQTJ3Tjk4TkNqNUoxSmdrK3ZQV3RUdHhOazBETTdQYnNTSStQL3hIUm5FTDc2NUZGZzdxbGRPejdGQy85N3Q3MEpSQXZVNEt2SUswYzl1dC9kclVWM2JKMURoRUFQZWpadDhGV24wNWwrOFdCcEplM1NzZEFjUTFIdzNNTTQrQWJnRFhUbFhYa1gxWUxWbmVPVDFkQU9IVFpnTy9LT1BmU01qdElUMGNhSEkxZ3FkQ0dNZzN1elM4ZW4rVUtaSzhsbXV4Tml0S3BYblhTcEVoZmNEVHZNaVJRZ3ZBSE1SSWZ0ZWlwdklEcnN4UWVYNEJaS1pOV1pjejM3NnNGWG5Hai84Wm1lK2h5ZzROeWJUUnZCaHFzQTBhWlRFQmVNVnVoaXgvd3lwbHJabzVNK3dHa2FBRzBncjBOTHhzd3U3Z1hIajkxaTJNZThEdjNoVFlPUW41NmU1VHZkcW1OWFRKaDlnS1g3M2M0bEJ6MzdITERnZEhTeldyVWp0aytZUHByVmVPZDZuL0tXbTNyb3NQMHdpbDVIeHVlZGFoRzAzclJkaGdLelU2Y2RDejB5a2UxaXR3Z1dLdHI5NGZERTNQYTVOcjNXRkx0WE9uWG9QTTBidHkyWStNcFp6ejczV0lIS3M0MlpQb0pRd2tKdmJqNE15ZXpIYmozN3RoOHo0UDJSYThMYWNSLzZxbmU5RHpFVFJyRFFFTzFBNk5LcFRSY1VCNzA1QWxCMTZoVmZqY1MveHlIMDdKTXpxZEFXaHJWSXFYRWVsYnhUM1VMRXlETDM2SUFpdDVrYlhraUdGdU1lRER3NkdrVWs1YnVYamtUTTU4cGw3NXVJM1FCejR5SUNuY0NiTVAwOGU1OUVOV0xBcVRvRlVVUFBSaFo2Rmh2MHpIcGg5Wk5ESWM5WmZUWEdVS1Fwc3prYXFqODdISkpvVkJYUHBaNUROd0hHQnpMRXlMSnRJZy9GYzMxdUZJemNLQW9ZdjBQc3AwaTJpd2l6amgyanI3SDBSZDduRGpLYldIVkczZlR5ZlhuVGRKUEIzNGFlL1d1bFp4N0hZcnQ2c0FtVFJ3TzZNalk0R2JKTjZDOGQ2VTIxWjRlcERLcko2clZqWGtQdC9qZjZiaGhRRFV6MU5pbTlMa1RmV0NNM1hhek04OTQ2RDFMd3NiUWU1aEhSTnJCOHphZDN6REZXYmVaUWM4WG5GMWFFU1NFL2Z6YzZJOVV1bktWR3B5Y1dkcHBvUFVHM1RtTEYzaEpVMzZtWG5nWENwMER2eVF5UnZuWEQ1bmFNMDVWV1NXWEtXTS96dWlpM2FYSGdsMVFoNjV0blhRM0pSQm9yZzN4blVzTW53NXRhdEU4czZTUjA5eWhkdk9ycDYwdjZRdFJiUmRRRDR4U0xmdVAzMnZIektrL1Q5U3NtWFZsM0pQbk00RHpNMlA3YzgxalJIcnA4VW1VK2RsZlo3RThKMWxmYzYyMzdiUkIxMExNZys2dGRGcmt5MGFBRFJZR3JBQjFaUTdCVmozaGxlRytiak84MWd1Rzk5MG84VjYweTY3WlpMSldCSEtpOE9uTDZMUlp3OHNid1NiZksrTVQ4NTJCTjlmNGx0cUVWRGRuYWJpK3A5dkZ0QkJuWTNQVEpHRzFMaWNVemljSDRYRmF6YlVZcSsvRWRpR2grZWJ6WFJQNVZsTFk1bzdpeTY4YTJRMU1BNzQzVkxnclNOOVdOcmZMQUkvWDExVDhkQ0lUTDdJZEdqeW83elVXN05yZFhEaXpsVk5sNFpkL0hHdXc5MThodStuS2RUSHNYRStsOEdzS1pjTHRWTnN6dGtXMUNHdTBOKy9pZXhuQ1gvMTBxRFVCOTE3MHYydGVGeDh6dFZ0bDE0S21IUTJFakRvRzQ2RkxPN0s0bXI2N1ZIbnZwa250KzNkcGNYMmVkUHNqcVk5SkwrVTJuWWUybkM2Nk5lMFo5YnpYV3RXZno5bHU3ZG05dWxSdFoyT0FYMjJpQnJsTUVpOER6S2pPRlFTUXN6RjFUdDFydmd2SU9kZFR5TVVCYzBsTTk5cGw0dGIwZExpeUpjV0dZbjUzM1VHKzNFUXQ1U3JiSE5RZVc5dGhGdG4xM3V1a1JsR05tS2V1eFNDWnl2WE1KeGVvVFRXdkN3c1FFVUVjSHI2K3ZlT3I0L3JtbDBsOTNyTXZTazJSazllNVNsaFU3L0hIaGE2K0RJdDNyMnZaMjVnSEp6WlpjWStkRk56cXVHYUtON3BTSERNTG9kRmRIS21ISGdMQjZ0bkx0cUgyaWFhM0YzTSt5ZzJKZUc3ZEIxQ1M3NnVYOXIvTktHWjJGOStrNGJzVVZJekpEMC9WMFJlQ3lQQXFEVHp3TWVNWGNZd0U4V1EwQnpYTHZlalB1ZzdYblQrUVdnbVNyU3o0THozb25IY3R4KzNKVHJWbTJ2czVKMUtFamNPbDB0NDZmbTc3ZkJKWkYwMGFjTzFUZmFGcGJNVC95MWNFb3E2dVlJMnVqZkIxUTV0RkM2VzhaemNPbEhuVXF4RHppdFFXNVBRbmwwMTlYUXAzUm5VS0JNMFBuRW9uNmJDd0k1cXU0aDJyYk1PRHZGcDNUUmhoRDlIS1hGVDIzdEtoN0ZHUUlTTy93TWVZTm80c0pFeWVsOXcvNDBkU3hxUFB4WUw5eUxFVmJ6eDFrZSttUVJ5M1RXbzl1SE10MzZhZ1hDOGZQVGQrbmdXVFIxUGNiWVNQT3V5TGNGcm0wYjlwTjRJL1kvaFljWHFnOHlIbjFlbU44ZFE2ZXNXbzFOUFFWTmJTU0hVbnFrenNQaVVrMjhZdFg2MHBNOHJMa3pPWStwL3FjOWNpcFRlcDRBMUhqbWFMWHVCSDF5djJJcVRlODgveXpRUG8wRXZrMVpUdG1yeGM5MWlKbHZjV2FxQU9QeEFwUHJhcnpPbUFlelhvV1RIZHhJOGxwSnVRMGxuaDJhMFp6NEhrSDdwZ0ptOTVhdit2MWMwdzhsM20wTzAvREJxRVdqVGJ2Rk9zaEhNRUNBQUFBQWFZSUFBQUFBQkFzQUFBQUNCWUFBQUFFQ3dBQUFJQmdBUUFBUUxBQUFBQWdXQUFBQUFBRUN3QUFBSUlGQUFBQXdRSUFBQUFnV0FBQWdEZkgvd1VZQUd1d05Bc3MwWlJsQUFBQUFFbEZUa1N1UW1DQ1xcXCIgLz5cXG48ZGl2IGNsYXNzPVxcXCJob21lLXRleHRcXFwiPlN0YXJ0IGJ5IGFkZGluZyBhIHNvY2lhbCBjaGFubmVsOjwvZGl2PlxcbjxkaXYgY2xhc3M9XFxcImhvbWUtYmlnLWJ1dHRvbnNcXFwiPlxcbiAgPGEgaHJlZj1cXFwiamF2YXNjcmlwdDp2b2lkKDApXFxcIiBjbGFzcz1cXFwiaG9tZS1iaWctYnV0dG9uIGJpZy1idXR0b24tdHdpdHRlclxcXCIgZGF0YS1zZXJ2aWNlPVxcXCJ0d2l0dGVyXFxcIj48aSBjbGFzcz1cXFwic3MtaWNvbi10d2l0dGVyXFxcIj48L2k+PC9hPlxcbiAgPGEgaHJlZj1cXFwiamF2YXNjcmlwdDp2b2lkKDApXFxcIiBjbGFzcz1cXFwiaG9tZS1iaWctYnV0dG9uIGJpZy1idXR0b24taW5zdGFncmFtXFxcIiBkYXRhLXNlcnZpY2U9XFxcImluc3RhZ3JhbVxcXCI+PGkgY2xhc3M9XFxcInNzLWljb24taW5zdGFncmFtXFxcIj48L2k+PC9hPlxcbjwvZGl2PlxcblwiO1xuICB9LFwidXNlRGF0YVwiOnRydWV9KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuYWxlcnRpZnkgPSByZXF1aXJlICdhbGVydGlmeSdcblxuQXBwLm1vZHVsZSAnU1NBZG1pbicsIChTU0FkbWluLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTQWRtaW4uVmlld3MuSGVhZGVySXRlbVZpZXcgZXh0ZW5kcyBBcHAuVmlld3MuQmFzZUl0ZW1WaWV3XG5cbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi4vVGVtcGxhdGVzL0hlYWRlckl0ZW1WaWV3VGVtcGxhdGUnKVxuXG4gICAgY2xhc3NOYW1lOiAnc3MtaGVhZGVyJ1xuXG4gICAgZXZlbnRzOlxuICAgICAgJ2NsaWNrIC5zcy1zZXR0aW5ncy10b2dnbGUnIDogJ2NsaWNrX190b2dnbGVTZXR0aW5ncydcbiAgICAgICdjbGljayAuc3MtdHJhc2gtdG9nZ2xlJyA6ICdjbGlja19fdG9nZ2xlVHJhc2gnXG5cblxuICAgIGNsaWNrX190b2dnbGVTZXR0aW5nczogPT5cblxuICAgICAgYWxlcnRpZnkuYWxlcnQoKS5zZXR0aW5nXG4gICAgICAgIG9uc2hvdzogPT5cbiAgICAgICAgICAkKCcubW9kZXJhdGlvbi10b2dnbGUnKS5vbiAnY2xpY2snLCA9PlxuICAgICAgICAgICAgQGNsaWNrX190b2dnbGVNb2RlcmF0aW9uKClcblxuXG4gICAgICBhbGVydE1lc3NhZ2UgPSAnPHNwYW4+IDxzdHJvbmc+QXV0by1BcHByb3ZlIDwvc3Ryb25nPiBpcyA8L3NwYW4+J1xuXG4gICAgICBpZiggQG1vZGVsLmdldCAnbW9kZXJhdGlvbicgKVxuICAgICAgICBhbGVydE1lc3NhZ2UgKz0gJzxidXR0b24gY2xhc3M9XCJtb2RlcmF0aW9uLXRvZ2dsZSBidG4gYnRuLWluZm9cIj5PRkY8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1vZGVyYXRpb24tdG9nZ2xlIGJ0biBidG4tZGVmYXVsdFwiPk9OPC9idXR0b24+J1xuICAgICAgZWxzZVxuICAgICAgICBhbGVydE1lc3NhZ2UgKz0gJzxidXR0b24gY2xhc3M9XCJtb2RlcmF0aW9uLXRvZ2dsZSBidG4gYnRuLWRlZmF1bHRcIj5PRkY8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1vZGVyYXRpb24tdG9nZ2xlIGJ0biBidG4taW5mb1wiPk9OPC9idXR0b24+J1xuXG4gICAgICBhbGVydGlmeS5hbGVydCAnPGgzPjxpIGNsYXNzPVwic3MtaWNvbi1jb2dcIj48L2k+IFNldHRpbmdzIDwvaDM+JywgYWxlcnRNZXNzYWdlXG5cblxuXG5cbiAgICBjbGlja19fdG9nZ2xlTW9kZXJhdGlvbjogPT5cblxuICAgICAgYWxlcnRpZnkuY2xvc2VBbGwoKVxuXG4gICAgICBhbGVydE1lc3NhZ2UgPSAnPGgxPjxpIGNsYXNzPVwic3MtaWNvbi1yZWZyZXNoXCI+PC9pPjwvaDE+J1xuXG4gICAgICBpZiggQG1vZGVsLmdldCAnbW9kZXJhdGlvbicgKVxuICAgICAgICBhbGVydE1lc3NhZ2UgKz0gJzxoMz5GdXR1cmUgcG9zdHMgd2lsbCBub3cgYXV0b21hdGljYWxseSBiZSBwdWJsaXNoZWQuPC9oMz48cD5QcmV2aW91c2x5IHNhdmVkIGNvbnRlbnQgd2lsbCBub3QgY2hhbmdlPC9wPidcbiAgICAgIGVsc2VcbiAgICAgICAgYWxlcnRNZXNzYWdlICs9ICc8aDM+RnV0dXJlIHBvc3RzIHdpbGwgbm93IG5lZWQgbWFudWFsIGFwcHJvdmFsIGJlZm9yZSBiZWluZyBwdWJsaXNoZWQuPC9oMz48cD5QcmV2aW91c2x5IHNhdmVkIGNvbnRlbnQgd2lsbCBub3QgY2hhbmdlPC9wPidcblxuXG4gICAgICBhbGVydGlmeS5jb25maXJtICcnXG4gICAgICAsIGFsZXJ0TWVzc2FnZVxuICAgICAgICAsID0+XG4gICAgICAgICAgQG1vZGVsLnRvZ2dsZUF0dHJpYnV0ZSAnbW9kZXJhdGlvbidcbiAgICAgICAgICBAbW9kZWwuc2F2ZSgpXG4gICAgICAsID0+XG5cblxuXG5cbiAgICBjbGlja19fdG9nZ2xlVHJhc2g6IChldmVudCkgPT5cblxuICAgICAgaWYgbm90IEFwcC5TU1NlYXJjaD8gb3Igbm90IEFwcC5TU1Bvc3RzP1xuICAgICAgICByZXR1cm5cblxuICAgICAgJHRhcmdldCA9IEAkKCcuc3MtdHJhc2gtdG9nZ2xlJylcblxuICAgICAgaWYgQHNob3dpbmdUcmFzaD8gYW5kIEBzaG93aW5nVHJhc2ggaXMgdHJ1ZVxuICAgICAgICBAc2hvd2luZ1RyYXNoID0gZmFsc2VcbiAgICAgIGVsc2VcbiAgICAgICAgQHNob3dpbmdUcmFzaCA9IHRydWVcblxuICAgICAgI1NFVCBERUZBVUxUU1xuICAgICAgZmV0Y2hPcHRpb25zICA9IHt9XG4gICAgICBmZXRjaERhdGEgID0ge31cbiAgICAgIGljb25DbGFzcyA9ICdzcy1pY29uLXRyYXNoLW8nXG4gICAgICBpbm5lclRleHQgID0gJ1ZpZXcgVHJhc2gnXG4gICAgICBwb3N0RmV0Y2hDb21tYW5kID0gJ2ZldGNoU2VydmVyUG9zdHMnXG4gICAgICBmZXRjaERhdGEuc3RhdHVzID0gWydwdWJsaXNoJywnZHJhZnQnXVxuXG5cbiAgICAgICNJRiBTRUUgVFJBU0gsIFNFVCBTRUUgQUxMXG4gICAgICBpZiBAc2hvd2luZ1RyYXNoXG4gICAgICAgIGZldGNoRGF0YS5zdGF0dXMgPSAndHJhc2gnXG4gICAgICAgIGljb25DbGFzcyA9ICdzcy1pY29uLWxldmVsLXVwJ1xuICAgICAgICBpbm5lclRleHQgPSBcIkdvIEJhY2tcIlxuXG4gICAgICAgICMgc2V0IHNlYXJjaCBhY3Rpb24gdG8gZW1wdHkgYW5kIHNhdmUgcHJldmlvdXMgc2VhcmNoIGFjdGlvblxuICAgICAgICBAcHJldlNlYXJjaEFjdGlvbiA9IEFwcC5TU1NlYXJjaC5yZXFyZXMucmVxdWVzdCAnYWN0aW9uJ1xuXG4gICAgICAgICMgc2V0IGVtcHR5IGZvcm0gYWN0aW9uXG4gICAgICAgIEFwcC5TU1NlYXJjaC5jb21tYW5kcy5leGVjdXRlICdzZXRBY3Rpb24nLCAnJ1xuXG5cbiAgICAgICMgY2hlY2sgaWYgd2UgbmVlZCB0byBmZXRjaCBmcm9tIHRoZSBBUElcbiAgICAgIGlmIG5vdCBAc2hvd2luZ1RyYXNoIGFuZCBAcHJldlNlYXJjaEFjdGlvbj8gYW5kIEBwcmV2U2VhcmNoQWN0aW9uIGlzICdwdWJsaXNoJ1xuICAgICAgICBwb3N0RmV0Y2hDb21tYW5kID0gJ2ZldGNoQXBpUG9zdHMnXG5cblxuICAgICAgIyBzZXQgc3VjY2VzcyBjYWxsYmFjayB0byBiZSBydW4gYWZ0ZXIgZmV0Y2hcbiAgICAgIGZldGNoT3B0aW9ucy5zdWNjZXNzID0gPT5cblxuICAgICAgICAjIHN0b3Agc3Bpbm5lclxuICAgICAgICBBcHAubG9hZGVyLmN1cnJlbnRWaWV3LnN0b3BTcGlubmVyKClcblxuICAgICAgICBpZiBub3QgQHNob3dpbmdUcmFzaCBhbmQgQHByZXZTZWFyY2hBY3Rpb24/XG4gICAgICAgICAgYWN0aW9uID0gJydcbiAgICAgICAgICBzd2l0Y2ggQHByZXZTZWFyY2hBY3Rpb25cbiAgICAgICAgICAgIHdoZW4gJ3ZpZXcnLCAnc2VhcmNoJ1xuICAgICAgICAgICAgICBwb3N0c0NvbGxlY3Rpb24gPSBBcHAuU1NQb3N0cy5yZXFyZXMucmVxdWVzdCAncG9zdHNDb2xsZWN0aW9uJ1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBwb3N0c0NvbGxlY3Rpb24gPSBBcHAuU1NQb3N0cy5yZXFyZXMucmVxdWVzdCAnYXBpUG9zdHNDb2xsZWN0aW9uJ1xuXG4gICAgICAgICAgaWYgcG9zdHNDb2xsZWN0aW9uLmxlbmd0aCA+IDBcbiAgICAgICAgICAgIGFjdGlvbiA9IEBwcmV2U2VhcmNoQWN0aW9uXG5cbiAgICAgICAgICBBcHAuU1NTZWFyY2guY29tbWFuZHMuZXhlY3V0ZSAnc2V0QWN0aW9uJywgYWN0aW9uXG5cblxuICAgICAgIyBjbG9zZSBwb3N0cyB2aWV3XG4gICAgICBBcHAucG9zdHMuY2xvc2UoKVxuXG4gICAgICAjIFNob3cgbG9hZGVyXG4gICAgICBBcHAubG9hZGVyLmN1cnJlbnRWaWV3LnN0YXJ0U3Bpbm5lcigpXG5cbiAgICAgICNBREpVU1QgU1RZTEUgQ0xBU1NFU1xuICAgICAgJHRhcmdldC5maW5kKCdpJykuYXR0ciAnY2xhc3MnLCBpY29uQ2xhc3NcbiAgICAgICR0YXJnZXQuZmluZCgnLnNzLWlubmVyLXRleHQnKS50ZXh0IGlubmVyVGV4dFxuXG4gICAgICAjRkVUQ0ggUE9TVFMgV0lUSCBVUERBVEVEIEFSR1VNRU5UU1xuICAgICAgQXBwLlNTUG9zdHMuY29tbWFuZHMuZXhlY3V0ZSBwb3N0RmV0Y2hDb21tYW5kLCBmZXRjaERhdGEsIGZldGNoT3B0aW9uc1xuXG5cblxuICAgIHJlc2V0VHJhc2hUb2dnbGU6ID0+XG5cbiAgICAgIEBzaG93aW5nVHJhc2ggPSBmYWxzZVxuICAgICAgQHByZXZTZWFyY2hBY3Rpb24gPSBudWxsXG5cbiAgICAgICR0YXJnZXQgPSBAJCgnLnNzLXRyYXNoLXRvZ2dsZScpXG4gICAgICBpY29uQ2xhc3MgPSAnc3MtaWNvbi10cmFzaC1vJ1xuICAgICAgaW5uZXJUZXh0ICA9ICdWaWV3IFRyYXNoJ1xuXG4gICAgICAjQURKVVNUIFNUWUxFIENMQVNTRVNcbiAgICAgICR0YXJnZXQuZmluZCgnaScpLmF0dHIgJ2NsYXNzJywgaWNvbkNsYXNzXG4gICAgICAkdGFyZ2V0LmZpbmQoJy5zcy1pbm5lci10ZXh0JykudGV4dCBpbm5lclRleHRcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NBZG1pbicsIChTU0FkbWluLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTQWRtaW4uVmlld3MuSG9tZUl0ZW1WaWV3IGV4dGVuZHMgQXBwLlZpZXdzLkJhc2VJdGVtVmlld1xuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4uL1RlbXBsYXRlcy9Ib21lSXRlbVZpZXdUZW1wbGF0ZScpXG5cbiAgICBjbGFzc05hbWU6ICdzcy1ob21lJ1xuXG4gICAgZXZlbnRzOlxuICAgICAgJ2NsaWNrIC5ob21lLWJpZy1idXR0b24nOiAnbG9naW4nXG5cblxuICAgIGxvZ2luOiAoZXZlbnQpID0+XG5cbiAgICAgIGlmIG5vdCBBcHAuU1NBdXRoP1xuICAgICAgICByZXR1cm5cblxuICAgICAgQXBwLlNTQXV0aC5jb21tYW5kcy5leGVjdXRlICdsb2dpbicsICQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1zZXJ2aWNlJylcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5yZXF1aXJlICcuL1NTQWRtaW4nXG5cbiMgVmlld3NcbnJlcXVpcmUgJy4vVmlld3MvSGVhZGVySXRlbVZpZXcnXG5yZXF1aXJlICcuL1ZpZXdzL0hvbWVJdGVtVmlldydcblxuIyBDb250cm9sbGVyc1xucmVxdWlyZSAnLi9Db250cm9sbGVycy9BZG1pbkNvbnRyb2xsZXInXG5cblxuQXBwLm1vZHVsZSAnU1NBZG1pbicsIChTU0FkbWluLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIFNTQWRtaW4uYWRkSW5pdGlhbGl6ZXIgLT5cblxuICAgIGNvbnRyb2xsZXIgPSBuZXcgU1NBZG1pbi5Db250cm9sbGVycy5BZG1pbkNvbnRyb2xsZXIoKVxuXG4gICAgIyMjXG4gICAgRGVmaW5lIE1vZHVsZSBBUElcbiAgICAjIyNcbiAgICBTU0FkbWluLmNvbW1hbmRzLnNldEhhbmRsZXIgJ3Jlc2V0VHJhc2hUb2dnbGUnLCBjb250cm9sbGVyLnJlc2V0VHJhc2hUb2dnbGVcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5BcHAubW9kdWxlICdTU0F1dGgnLCAoU1NBdXRoLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTQXV0aC5Db2xsZWN0aW9ucy5TZXJ2aWNlc0NvbGxlY3Rpb24gZXh0ZW5kcyBBcHAuQ29sbGVjdGlvbnMuQXBpQ29sbGVjdGlvblxuXG4gICAgbW9kZWw6IFNTQXV0aC5Nb2RlbHMuU2VydmljZU1vZGVsXG4gICAgYXBpVXJsOiAnMS9zaXRlL3NvY2lhbHN0cmVhbXNfc2VydmljZXMnXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NBdXRoJywgKFNTQXV0aCwgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU0F1dGguQ29udHJvbGxlcnMuQXV0aENvbnRyb2xsZXIgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbnRyb2xsZXJcblxuXG4gICAgZ2V0U2VydmljZXNDb2xsZWN0aW9uOiA9PlxuXG4gICAgICBpZiBub3QgQHNlcnZpY2VzQ29sbGVjdGlvbj9cblxuICAgICAgICBAc2VydmljZXNDb2xsZWN0aW9uID0gbmV3IFNTQXV0aC5Db2xsZWN0aW9ucy5TZXJ2aWNlc0NvbGxlY3Rpb25cblxuICAgICAgICAjIGZldGNoIGluaXRpYWwgcG9zdHMgZnJvbSBET01cbiAgICAgICAgQHNlcnZpY2VzQ29sbGVjdGlvbi5mZXRjaCgpXG5cbiAgICAgIEBzZXJ2aWNlc0NvbGxlY3Rpb25cblxuXG4gICAgbG9naW46IChzZXJ2aWNlKSA9PlxuXG4gICAgICAjIFNhdmUgc3RyZWFtIG9wdGlvbnMgdmlhIEFKQVhcbiAgICAgIHNzX29hdXRoX3VybCAgID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ3NzX29hdXRoX3VybCdcbiAgICAgIGFkbWluX3BhZ2VfdXJsID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ2FkbWluX3BhZ2VfdXJsJ1xuICAgICAgc3NfdXNlcl9pZCAgICAgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAnc3NfdXNlcl9pZCdcbiAgICAgIHBsdWdpbl92ZXJzaW9uID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ3BsdWdpbl92ZXJzaW9uJ1xuICAgICAgYWNjZXNzX3Rva2VuID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ2FjY2Vzc190b2tlbidcblxuICAgICAgdXJsQXJncyA9XG4gICAgICAgIG9yaWdpbl91cmwgICAgIDogZW5jb2RlVVJJQ29tcG9uZW50KCBhZG1pbl9wYWdlX3VybCApXG4gICAgICAgIHNzX3VzZXJfaWQgICAgIDogc3NfdXNlcl9pZFxuICAgICAgICBhY2Nlc3NfdG9rZW4gICA6IGFjY2Vzc190b2tlblxuICAgICAgICBwbHVnaW5fdmVyc2lvbiA6IHBsdWdpbl92ZXJzaW9uXG5cbiAgICAgIHVybFN0cmluZyA9IEFwcC5IZWxwZXJzLmh0dHAudG9Vcmwgc3Nfb2F1dGhfdXJsICsgJy8nICsgc2VydmljZSArICctcmVkaXJlY3QnLCB1cmxBcmdzXG5cbiAgICAgIHNjcmVlblggPSAoIGlmIHR5cGVvZiB3aW5kb3cuc2NyZWVuWCBpc250IFwidW5kZWZpbmVkXCIgdGhlbiB3aW5kb3cuc2NyZWVuWCBlbHNlIHdpbmRvdy5zY3JlZW5MZWZ0IClcbiAgICAgIHNjcmVlblkgPSAoIGlmIHR5cGVvZiB3aW5kb3cuc2NyZWVuWSBpc250IFwidW5kZWZpbmVkXCIgdGhlbiB3aW5kb3cuc2NyZWVuWSBlbHNlIHdpbmRvdy5zY3JlZW5Ub3AgKVxuICAgICAgb3V0ZXJXaWR0aCA9ICggaWYgdHlwZW9mIHdpbmRvdy5vdXRlcldpZHRoIGlzbnQgXCJ1bmRlZmluZWRcIiB0aGVuIHdpbmRvdy5vdXRlcldpZHRoIGVsc2UgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCApXG4gICAgICBvdXRlckhlaWdodCA9ICggaWYgdHlwZW9mIHdpbmRvdy5vdXRlckhlaWdodCBpc250IFwidW5kZWZpbmVkXCIgdGhlbiB3aW5kb3cub3V0ZXJIZWlnaHQgZWxzZSAoZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQgLSAyMikgKVxuICAgICAgd2lkdGggPSAxMDAwXG4gICAgICBoZWlnaHQgPSA2MDBcbiAgICAgIGxlZnQgPSBwYXJzZUludChzY3JlZW5YICsgKCAoIG91dGVyV2lkdGggLSB3aWR0aCApIC8gMiApLCAxMCApXG4gICAgICB0b3AgPSBwYXJzZUludChzY3JlZW5ZICsgKCAoIG91dGVySGVpZ2h0IC0gaGVpZ2h0ICkgLyAyLjUgKSwgMTAgKVxuXG4gICAgICBmZWF0dXJlcyA9ICggXCJ3aWR0aD1cIiArIHdpZHRoICsgXCIsaGVpZ2h0PVwiICsgaGVpZ2h0ICsgXCIsbGVmdD1cIiArIGxlZnQgKyBcIix0b3A9XCIgKyB0b3AgKVxuXG4gICAgICBAbG9naW5fd2luID0gd2luZG93Lm9wZW4oIHVybFN0cmluZywgXCJcIiwgZmVhdHVyZXMgKVxuICAgICAgQGxvZ2luX3dpbi5mb2N1cygpICBpZiB3aW5kb3cuZm9jdXNcblxuICAgICAgc2V0VGltZW91dCBAY2hlY2tMb2dpblN0YXR1cywgNTAwXG5cblxuICAgIGNoZWNrTG9naW5TdGF0dXM6ID0+XG5cbiAgICAgIGlmIG5vdCBAbG9naW5fd2luP1xuICAgICAgICByZXR1cm5cblxuICAgICAgaWYgbm90IEBsb2dpbl93aW4uY2xvc2VkXG4gICAgICAgIHNldFRpbWVvdXQgQGNoZWNrTG9naW5TdGF0dXMsIDUwMFxuICAgICAgZWxzZVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcblxuXG4gICAgbG9nb3V0OiAoc2VydmljZSkgPT5cblxuICAgICAgIyBTYXZlIHN0cmVhbSBvcHRpb25zIHZpYSBBSkFYXG4gICAgICBzZXJ2aWNlTW9kZWwgPSBAZ2V0U2VydmljZXNDb2xsZWN0aW9uKCkuZ2V0KCBzZXJ2aWNlIClcblxuICAgICAgc2VydmljZU1vZGVsLnNhdmVcbiAgICAgICAgYXV0aGVudGljYXRlZDogZmFsc2VcbiAgICAgICAgc3VjY2VzczogLT5cbiAgICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAsIDQwMFxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NBdXRoJywgKFNTQXV0aCwgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU0F1dGguTW9kZWxzLlNlcnZpY2VNb2RlbCBleHRlbmRzIEFwcC5Nb2RlbHMuQXBpTW9kZWxcblxuICAgIGFwaVVybDogJzEvc2l0ZS9zb2NpYWxzdHJlYW1zX3NlcnZpY2VzJ1xuXG4gICAgZGVmYXVsdHM6XG5cbiAgICAgIGljb25DbGFzczogLT5cbiAgICAgICAgJ3NzLWljb24tJyArIEBnZXQoJ2lkJylcblxuICAgICAgcGxhY2Vob2xkZXI6IC0+XG4gICAgICAgIG91dHB1dCA9ICcnXG5cbiAgICAgICAgc3dpdGNoIEBnZXQoJ2lkJylcbiAgICAgICAgICB3aGVuICd0d2l0dGVyJ1xuICAgICAgICAgICAgb3V0cHV0ID0gJ1NlYXJjaCBUd2l0dGVyIGZvciB1cCB0byAzIGtleXdvcmRzJ1xuICAgICAgICAgIHdoZW4gJ2luc3RhZ3JhbSdcbiAgICAgICAgICAgIG91dHB1dCA9ICdTZWFyY2ggSW5zdGFncmFtIGZvciBvbmx5IDEga2V5d29yZCdcblxuICAgICAgICBvdXRwdXRcblxuXG4gICAgICB0eXBlczogLT5cbiAgICAgICAgb3V0cHV0ID0gW11cblxuICAgICAgICBzd2l0Y2ggQGdldCgnaWQnKVxuICAgICAgICAgIHdoZW4gJ3R3aXR0ZXInXG4gICAgICAgICAgICBvdXRwdXQgPSBbXG4gICAgICAgICAgICAgIHZhbHVlOiAnZ2xvYmFsJ1xuICAgICAgICAgICAgICBsYWJlbDogJ1B1YmxpYyBUd2l0dGVyJ1xuICAgICAgICAgICAgLFxuICAgICAgICAgICAgICB2YWx1ZTogJ3VzZXInXG4gICAgICAgICAgICAgIGxhYmVsOiAnU2VhcmNoIEBZb3VyIHBvc3RzJ1xuICAgICAgICAgICAgXVxuXG4gICAgICAgICAgd2hlbiAnaW5zdGFncmFtJ1xuICAgICAgICAgICAgb3V0cHV0ID0gW1xuICAgICAgICAgICAgICB2YWx1ZTogJ2dsb2JhbCdcbiAgICAgICAgICAgICAgbGFiZWw6ICdQdWJsaWMgSW5zdGFncmFtJ1xuICAgICAgICAgICAgLFxuICAgICAgICAgICAgICB2YWx1ZTogJ3VzZXInXG4gICAgICAgICAgICAgIGxhYmVsOiAnU2VhcmNoIEBZb3VyIHBvc3RzJ1xuICAgICAgICAgICAgXVxuXG4gICAgICAgIG91dHB1dFxuXG5cbiAgICAgIHRhYmluZGV4OiAtPlxuICAgICAgICBAY29sbGVjdGlvbi5pbmRleE9mKEApICsgMVxuXG5cbiAgICAgIGV4cGxvZGVRdWVyeTogLT5cblxuICAgICAgICBzZXJ2aWNlID0gQGdldCgnaWQnKVxuXG4gICAgICAgIGlmIEFwcC5TU1NlYXJjaC5yZXFyZXMucmVxdWVzdCgnc2VhcmNoTW9kZWwnKS5nZXQoc2VydmljZSArICdRdWVyeScpP1xuICAgICAgICAgIHF1ZXJ5QXJyYXkgPSBBcHAuU1NTZWFyY2gucmVxcmVzLnJlcXVlc3QoJ3NlYXJjaE1vZGVsJykuZ2V0KHNlcnZpY2UgKyAnUXVlcnknKS5zcGxpdCggJyBPUiAnKVxuXG4gICAgICAgICAgcmV0dXJuIHF1ZXJ5QXJyYXlcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5BcHAubW9kdWxlICdTU0F1dGgnLCAoU1NBdXRoLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIFNTQXV0aC5Db250cm9sbGVycyA9IHt9XG4gIFNTQXV0aC5Nb2RlbHMgPSB7fVxuICBTU0F1dGguQ29sbGVjdGlvbnMgPSB7fVxuICBTU0F1dGguVmlld3MgPSB7fVxuICBTU0F1dGguTGF5b3V0cyA9IHt9XG4gIFNTQXV0aC5Sb3V0ZXJzID0ge31cbiAgU1NBdXRoLlRlbXBsYXRlcyA9IHt9XG5cbiAgU1NBdXRoLnZlbnQgPSBuZXcgQmFja2JvbmUuV3JlcXIuRXZlbnRBZ2dyZWdhdG9yKClcbiAgU1NBdXRoLmNvbW1hbmRzID0gbmV3IEJhY2tib25lLldyZXFyLkNvbW1hbmRzKClcbiAgU1NBdXRoLnJlcXJlcyA9IG5ldyBCYWNrYm9uZS5XcmVxci5SZXF1ZXN0UmVzcG9uc2UoKVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxucmVxdWlyZSAnLi9TU0F1dGgnXG5cbiMgTW9kZWxzXG5yZXF1aXJlICcuL01vZGVscy9TZXJ2aWNlTW9kZWwnXG5cbiMgQ29sbGVjdGlvbnNcbnJlcXVpcmUgJy4vQ29sbGVjdGlvbnMvU2VydmljZXNDb2xsZWN0aW9uJ1xuXG4jIENvbnRyb2xsZXJzXG5yZXF1aXJlICcuL0NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyJ1xuXG5cbkFwcC5tb2R1bGUgJ1NTQXV0aCcsIChTU0F1dGgsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgU1NBdXRoLmFkZEluaXRpYWxpemVyIC0+XG5cbiAgICBjb250cm9sbGVyID0gbmV3IFNTQXV0aC5Db250cm9sbGVycy5BdXRoQ29udHJvbGxlclxuXG4gICAgIyMjXG4gICAgRGVmaW5lIE1vZHVsZSBBUElcbiAgICAjIyNcbiAgICBTU0F1dGgucmVxcmVzLnNldEhhbmRsZXIgJ3NlcnZpY2VzQ29sbGVjdGlvbicsIGNvbnRyb2xsZXIuZ2V0U2VydmljZXNDb2xsZWN0aW9uXG4gICAgU1NBdXRoLmNvbW1hbmRzLnNldEhhbmRsZXIgJ2xvZ2luJywgY29udHJvbGxlci5sb2dpblxuICAgIFNTQXV0aC5jb21tYW5kcy5zZXRIYW5kbGVyICdsb2dvdXQnLCBjb250cm9sbGVyLmxvZ291dFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbkFwcC5tb2R1bGUgJ1NTT3B0aW9ucycsIChTU09wdGlvbnMsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgY2xhc3MgU1NPcHRpb25zLkNvbnRyb2xsZXJzLk9wdGlvbnNDb250cm9sbGVyIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5Db250cm9sbGVyXG5cblxuICAgIGdldE9wdGlvbnM6IChrZXkpID0+XG5cbiAgICAgIG9wdGlvbnNNb2RlbCA9IEBnZXRPcHRpb25zTW9kZWwoKVxuXG4gICAgICBpZiBrZXk/XG4gICAgICAgIHJldHVybiBvcHRpb25zTW9kZWwuZ2V0IGtleVxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gb3B0aW9uc01vZGVsXG5cblxuICAgIGdldE9wdGlvbnNNb2RlbDogPT5cblxuICAgICAgaWYgbm90IEBvcHRpb25zTW9kZWw/XG5cbiAgICAgICAgQG9wdGlvbnNNb2RlbCA9IG5ldyBTU09wdGlvbnMuTW9kZWxzLk9wdGlvbnNNb2RlbFxuICAgICAgICAgIGlkOiAnc29jaWFsc3RyZWFtc19hcHBfc2V0dGluZ3MnXG5cbiAgICAgICAgIyBmZXRjaCBpbml0aWFsIGRhdGEgZnJvbSBET01cbiAgICAgICAgQG9wdGlvbnNNb2RlbC5mZXRjaCgpXG5cbiAgICAgIEBvcHRpb25zTW9kZWxcblxuXG5cbiAgICBnZXRVc2VyTWV0YTogKGtleSkgPT5cblxuICAgICAgdXNlck1ldGEgPSBAZ2V0VXNlck1ldGFNb2RlbCgpXG5cbiAgICAgIGlmIGtleT9cbiAgICAgICAgcmV0dXJuIHVzZXJNZXRhLmdldCBrZXlcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHVzZXJNZXRhXG5cblxuICAgIGdldFVzZXJNZXRhTW9kZWw6ID0+XG5cbiAgICAgIGlmIG5vdCBAdXNlck1ldGFNb2RlbD9cblxuICAgICAgICBAdXNlck1ldGFNb2RlbCA9IG5ldyBTU09wdGlvbnMuTW9kZWxzLlVzZXJNZXRhTW9kZWxcbiAgICAgICAgICBpZDogJ3NvY2lhbHN0cmVhbXMnXG5cbiAgICAgICAgIyBmZXRjaCBpbml0aWFsIGRhdGEgZnJvbSBET01cbiAgICAgICAgQHVzZXJNZXRhTW9kZWwuZmV0Y2goKVxuXG4gICAgICBAdXNlck1ldGFNb2RlbFxuXG4iLCIndXNlIHN0cmljdCdcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5BcHAubW9kdWxlICdTU09wdGlvbnMnLCAoU1NPcHRpb25zLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTT3B0aW9ucy5Nb2RlbHMuT3B0aW9uc01vZGVsIGV4dGVuZHMgQXBwLk1vZGVscy5XUE9wdGlvbk1vZGVsXG5cbiAgICBkZWZhdWx0czpcbiAgICAgIGFwcF9zZXR0aW5nczogdHJ1ZVxuICAgICAgbW9kZXJhdGlvbjogZmFsc2VcbiAgICAgIHVzZXJfY2FuX21vZGVyYXRlOiBmYWxzZVxuICAgICAgaXNfYWRtaW46IGZhbHNlXG4gICAgICBkZXZfbW9kZTogZmFsc2VcbiAgICAgIHNzX2FwaV91cmw6ICdodHRwczovL2FwaS5zb2NpYWxzdHJlYW1zLmNvbS8nXG4gICAgICBzc19vYXV0aF91cmw6ICdodHRwczovL29hdXRoLnNvY2lhbHN0cmVhbXMuY29tLydcbiAgICAgIHNzX3VzZXJfaWQ6ICduZXcnXG4gICAgICBhY2Nlc3NfdG9rZW46ICduZXcnXG4gICAgICB0aW1lX3RvX25leHRfY3JvbjogZmFsc2VcbiAgICAgIHB1YmxpY19wYWdlX3VybDogJydcbiAgICAgIGFkbWluX3BhZ2VfdXJsOiAnJ1xuICAgICAgd3BSb290OiAnLydcblxuXG5cbiAgICB0b2dnbGVBdHRyaWJ1dGU6IChhdHRyKSA9PlxuICAgICAgQHNldCggYXR0ciwgbm90IEBnZXQoIGF0dHIgKSApXG5cblxuICAgIGluaXRpYWxpemU6ID0+XG5cbiAgICAgIEBsaXN0ZW5UbyBALCAnY2hhbmdlOm1vZGVyYXRpb24nLCBAb25Nb2RlcmF0aW9uQ2hhbmdlXG5cblxuICAgIG9uTW9kZXJhdGlvbkNoYW5nZTogKG1vZGVsLCBtb2RlcmF0aW9uKSA9PlxuXG4gICAgICBBcHAuU1NPcHRpb25zLnZlbnQudHJpZ2dlciAnY2hhbmdlOm1vZGVyYXRpb24nLCBtb2RlbCwgbW9kZXJhdGlvblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NPcHRpb25zJywgKFNTT3B0aW9ucywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU09wdGlvbnMuTW9kZWxzLlVzZXJNZXRhTW9kZWwgZXh0ZW5kcyBBcHAuTW9kZWxzLldQVXNlck1ldGFNb2RlbFxuXG4gICAgZGVmYXVsdHM6XG4gICAgICBwdWJsaXNoUG9wdXA6IGZhbHNlXG4gICAgICB0cmFzaFBvcHVwOiBmYWxzZVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NPcHRpb25zJywgKFNTT3B0aW9ucywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBTU09wdGlvbnMuQ29udHJvbGxlcnMgPSB7fVxuICBTU09wdGlvbnMuTW9kZWxzID0ge31cbiAgU1NPcHRpb25zLkNvbGxlY3Rpb25zID0ge31cbiAgU1NPcHRpb25zLlZpZXdzID0ge31cbiAgU1NPcHRpb25zLkxheW91dHMgPSB7fVxuICBTU09wdGlvbnMuUm91dGVycyA9IHt9XG4gIFNTT3B0aW9ucy5UZW1wbGF0ZXMgPSB7fVxuXG4gIFNTT3B0aW9ucy52ZW50ID0gbmV3IEJhY2tib25lLldyZXFyLkV2ZW50QWdncmVnYXRvcigpXG4gIFNTT3B0aW9ucy5jb21tYW5kcyA9IG5ldyBCYWNrYm9uZS5XcmVxci5Db21tYW5kcygpXG4gIFNTT3B0aW9ucy5yZXFyZXMgPSBuZXcgQmFja2JvbmUuV3JlcXIuUmVxdWVzdFJlc3BvbnNlKClcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5cbnJlcXVpcmUgJy4vU1NPcHRpb25zJ1xuXG4jIE1vZGVsc1xucmVxdWlyZSAnLi9Nb2RlbHMvT3B0aW9uc01vZGVsJ1xucmVxdWlyZSAnLi9Nb2RlbHMvVXNlck1ldGFNb2RlbCdcblxuIyBDb250cm9sbGVyc1xucmVxdWlyZSAnLi9Db250cm9sbGVycy9PcHRpb25zQ29udHJvbGxlcidcblxuXG5BcHAubW9kdWxlICdTU09wdGlvbnMnLCAoU1NPcHRpb25zLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIFNTT3B0aW9ucy5hZGRJbml0aWFsaXplciAtPlxuXG4gICAgY29udHJvbGxlciA9IG5ldyBTU09wdGlvbnMuQ29udHJvbGxlcnMuT3B0aW9uc0NvbnRyb2xsZXIoKVxuXG4gICAgIyMjXG4gICAgRGVmaW5lIE1vZHVsZSBBUElcbiAgICAjIyNcbiAgICBTU09wdGlvbnMucmVxcmVzLnNldEhhbmRsZXIgJ29wdGlvbicsIGNvbnRyb2xsZXIuZ2V0T3B0aW9uc1xuICAgIFNTT3B0aW9ucy5yZXFyZXMuc2V0SGFuZGxlciAnb3B0aW9ucycsIGNvbnRyb2xsZXIuZ2V0T3B0aW9uc1xuICAgIFNTT3B0aW9ucy5yZXFyZXMuc2V0SGFuZGxlciAndXNlck1ldGEnLCBjb250cm9sbGVyLmdldFVzZXJNZXRhXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NQb3N0cycsIChTU1Bvc3RzLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTUG9zdHMuQ29sbGVjdGlvbnMuQXBpUG9zdHNDb2xsZWN0aW9uIGV4dGVuZHMgQXBwLkNvbGxlY3Rpb25zLkluZmluaXRlU2Nyb2xsQ29sbGVjdGlvblxuXG4gICAgbW9kZWw6IFNTUG9zdHMuTW9kZWxzLlBvc3RNb2RlbFxuXG4gICAgZGF0YTpcbiAgICAgIHBlclBhZ2UgOiAyNFxuICAgICAgY3JvbiA6ICdmYWxzZSdcblxuICAgIHVybDogLT5cblxuICAgICAgIyBjcmVhdGUgQVBJIHVybCwgYWRkaW5nIGV4dHJhIGZpZWxkcyBmb3IgYXV0aGVudGljYXRpb25cbiAgICAgIHVybCAgICAgICAgICAgID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ3NzX2FwaV91cmwnXG4gICAgICBzc19vYXV0aF91cmwgICA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdzc19vYXV0aF91cmwnXG4gICAgICBhZG1pbl9wYWdlX3VybCA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdhZG1pbl9wYWdlX3VybCdcbiAgICAgIHNzX3VzZXJfaWQgICAgID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ3NzX3VzZXJfaWQnXG4gICAgICBwbHVnaW5fdmVyc2lvbiA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdwbHVnaW5fdmVyc2lvbidcbiAgICAgIGFjY2Vzc190b2tlbiAgID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ2FjY2Vzc190b2tlbidcblxuICAgICAgZGF0YSA9XG4gICAgICAgIG9yaWdpbl91cmwgICAgIDogZW5jb2RlVVJJQ29tcG9uZW50KCBhZG1pbl9wYWdlX3VybCApXG4gICAgICAgIHNzX3VzZXJfaWQgICAgIDogc3NfdXNlcl9pZFxuICAgICAgICBhY2Nlc3NfdG9rZW4gICA6IGFjY2Vzc190b2tlblxuICAgICAgICBwbHVnaW5fdmVyc2lvbiA6IHBsdWdpbl92ZXJzaW9uXG5cbiAgICAgIEFwcC5IZWxwZXJzLmh0dHAudG9VcmwgdXJsLCBkYXRhXG5cblxuICAgIHBhcnNlOiAocmVzcG9uc2UpID0+XG5cbiAgICAgICMgd2Ugc2V0IGEgbWF4aW11bSBvZiA5NCBwb3N0c1xuICAgICAgaWYgQGxlbmd0aCA+PSA5NFxuICAgICAgICByZXR1cm4gW11cblxuICAgICAgaWYgcmVzcG9uc2Uuc2VhcmNoX21ldGFkYXRhP1xuXG4gICAgICAgIGlmIG5vdCBAZGF0YT9cbiAgICAgICAgICBAZGF0YSA9IHt9XG5cbiAgICAgICAgQGRhdGEuc2VhcmNoX21ldGFkYXRhID0gcmVzcG9uc2Uuc2VhcmNoX21ldGFkYXRhXG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIGNvbGxlY3Rpb24gaGFzIGEgbmV4dCBwYWdlXG4gICAgICBpZiBAZGF0YT8gYW5kIEBkYXRhLnBlclBhZ2U/IGFuZCByZXNwb25zZS5zdGF0dXNlcy5sZW5ndGggPCBAZGF0YS5wZXJQYWdlXG4gICAgICAgIEBoYXNOZXh0ID0gZmFsc2VcblxuICAgICAgIyByZXR1cm4gdGhlIHN0YXR1c2VzIGZyb20gdGhlIHJlc3BvbnNlXG4gICAgICByZXNwb25zZS5zdGF0dXNlc1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NQb3N0cycsIChTU1Bvc3RzLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTUG9zdHMuQ29sbGVjdGlvbnMuUG9zdHNDb2xsZWN0aW9uIGV4dGVuZHMgQXBwLkNvbGxlY3Rpb25zLkluZmluaXRlU2Nyb2xsQ29sbGVjdGlvblxuXG4gICAgbW9kZWw6IFNTUG9zdHMuTW9kZWxzLlBvc3RNb2RlbFxuXG4gICAgZGF0YTpcbiAgICAgIHBlclBhZ2UgOiAyNFxuICAgICAgc3RhdHVzOiAncHVibGlzaCdcblxuICAgIGFwaVVybDogJzEvc2l0ZS9zb2NpYWxzdHJlYW1zJ1xuXG4gICAgY29tcGFyYXRvcjogKGEsYikgPT5cblxuICAgICAgYUlkID0gcGFyc2VJbnQgYS5nZXQoJ29yZGVyX2lkJyksIDEwXG4gICAgICBiSWQgPSBwYXJzZUludCBiLmdldCgnb3JkZXJfaWQnKSwgMTBcblxuICAgICAgaWYgYUlkID4gYklkXG4gICAgICAgIC0xXG4gICAgICBlbHNlIGlmIGFJZCA8IGJJZFxuICAgICAgICAxXG4gICAgICBlbHNlXG4gICAgICAgIDBcblxuICAgIG5leHRQYWdlOiAoYXJncykgPT5cblxuICAgICAgaWYgbm90IGFyZ3M/XG4gICAgICAgIGFyZ3MgPSB7fVxuXG4gICAgICBhcmdzID0gXy5kZWZhdWx0cyBhcmdzLFxuICAgICAgICBpbW1lZGlhdGU6IHRydWVcblxuICAgICAgaWYgbm90IGFyZ3MuZGF0YT9cbiAgICAgICAgYXJncy5kYXRhID0ge31cblxuICAgICAgIyBzZXQgdGhlIG1heCBvcmRlciBJRCBmcm9tIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb25cbiAgICAgIGlmIEBsZW5ndGggPiAwXG4gICAgICAgIGFyZ3MuZGF0YS5tYXhfb3JkZXJfaWQgPSBAbGFzdCgpLmdldCgnb3JkZXJfaWQnKVxuXG4gICAgICBAZmV0Y2ggYXJnc1xuXG5cbiAgICBwcmV2UGFnZTogKGFyZ3MpID0+XG5cbiAgICAgIGlmIG5vdCBhcmdzP1xuICAgICAgICBhcmdzID0ge31cblxuICAgICAgYXJncyA9IF8uZGVmYXVsdHMgYXJncyxcbiAgICAgICAgaW1tZWRpYXRlOiB0cnVlXG5cbiAgICAgIGlmIG5vdCBhcmdzLmRhdGE/XG4gICAgICAgIGFyZ3MuZGF0YSA9IHt9XG5cbiAgICAgICMgc2V0IHRoZSBtYXggb3JkZXIgSUQgZnJvbSB0aGUgbGFzdCBpdGVtIGluIHRoZSBjb2xsZWN0aW9uXG4gICAgICBpZiBAbGVuZ3RoID4gMFxuICAgICAgICBhcmdzLmRhdGEubWluX29yZGVyX2lkID0gQGZpcnN0KCkuZ2V0KCdvcmRlcl9pZCcpXG5cbiAgICAgIEBmZXRjaCBhcmdzXG5cblxuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5BcHAubW9kdWxlICdTU1Bvc3RzJywgKFNTUG9zdHMsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgY2xhc3MgU1NQb3N0cy5Db250cm9sbGVycy5BdXRvUmVsb2FkQ29udHJvbGxlciBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQ29udHJvbGxlclxuXG4gICAgIyBzZXQgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzXG4gICAgYXV0b1JlbG9hZEludGVydmFsOiAxNSAqIDYwICogMTAwMCAjIDE1bWluXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICBTU1Bvc3RzLm9uICdzdGFydCcsIEBvblN0YXJ0XG5cblxuICAgIG9uU3RhcnQ6ID0+XG5cbiAgICAgICMgaW5pdGlhbGl6ZSBhdXRvcmVsb2FkIGlmIHRoaXMgaXMgdGhlIGZ1bGwgc2NyZWVuIGV2ZW50IHBhZ2VcbiAgICAgIGlmICQoJ2JvZHknKS5oYXNDbGFzcyAncGFnZS10ZW1wbGF0ZS10ZW1wbGF0ZS1zb2NpYWxzdHJlYW0tZnVsbHNjcmVlbi1waHAnXG5cbiAgICAgICAgIyBpbml0aWFsaXplIGF1dG9yZWxvYWRcbiAgICAgICAgQGluaXRBdXRvcmVsb2FkKClcblxuICAgICAgICBwb3N0c0NvbXBvc2l0ZVZpZXcgPSBTU1Bvc3RzLnJlcXJlcy5yZXF1ZXN0ICdwb3N0c0NvbXBvc2l0ZVZpZXcnXG5cbiAgICAgICAgbW9kZWxzID0gW11cblxuICAgICAgICBwb3N0c0NvbXBvc2l0ZVZpZXcuY29sbGVjdGlvbi5lYWNoIChtb2RlbCkgLT5cbiAgICAgICAgICBtb2RlbHMucHVzaCBtb2RlbFxuXG4gICAgICAgIEBzaG93SW5Sb3dzIHBvc3RzQ29tcG9zaXRlVmlldywgbW9kZWxzLFxuICAgICAgICAgIGludGVydmFsOiAxNTAwXG5cblxuXG4gICAgaW5pdEF1dG9yZWxvYWQ6ID0+XG5cbiAgICAgIGF1dG9yZWxvYWRNZXRob2QgPSAnJ1xuXG4gICAgICAjIGNoZWNrIGlmIHdlYnNvY2tldCBpcyBhdmFpbGFibGVcbiAgICAgICMgLi4uXG5cbiAgICAgIGlmIGF1dG9yZWxvYWRNZXRob2QgaXMgJ3dlYnNvY2tldCdcbiAgICAgICAgQGluaXRBdXRvcmVsb2FkU29ja2V0KClcbiAgICAgIGVsc2VcbiAgICAgICAgQGluaXRBdXRvcmVsb2FkUG9sbCgpXG5cblxuXG4gICAgaW5pdEF1dG9yZWxvYWRTb2NrZXQ6ID0+XG5cblxuICAgIGluaXRBdXRvcmVsb2FkUG9sbDogPT5cblxuICAgICAgc2V0SW50ZXJ2YWwgQGF1dG9yZWxvYWRQb2xsLCBAYXV0b1JlbG9hZEludGVydmFsXG5cblxuICAgIGF1dG9yZWxvYWRQb2xsOiA9PlxuXG4gICAgICAjIGdldCBjb21wb3NpdGVWaWV3XG4gICAgICBjb21wb3NpdGVWaWV3ID0gU1NQb3N0cy5yZXFyZXMucmVxdWVzdCAncG9zdHNDb21wb3NpdGVWaWV3J1xuXG4gICAgICBpZiBjb21wb3NpdGVWaWV3LmxvYWRpbmc/IGFuZCBjb21wb3NpdGVWaWV3LmxvYWRpbmdcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGNvbXBvc2l0ZVZpZXcubG9hZGluZyA9IHRydWVcblxuICAgICAgZmlyc3RPcmRlcklEID0gcGFyc2VJbnQgY29tcG9zaXRlVmlldy5jaGlsZHJlbi5maW5kQnlJbmRleCgwKS5tb2RlbC5nZXQoJ29yZGVyX2lkJyksIDEwXG4gICAgICBjb21wb3NpdGVWaWV3LmNvbGxlY3Rpb24ucHJldlBhZ2VcbiAgICAgICAgcmVtb3ZlOiBmYWxzZVxuXG4gICAgICAgIGRhdGE6XG4gICAgICAgICAgcGVyUGFnZTogLTFcblxuICAgICAgICBzdWNjZXNzOiAoY29sbGVjdGlvbiwgcmVzKSA9PlxuXG4gICAgICAgICAgaWYgY29sbGVjdGlvbi5sZW5ndGggaXMgMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICBjb21wb3NpdGVWaWV3LnJlbmRlcigpXG5cbiAgICAgICAgICBtb2RlbHMgPSBbXVxuXG4gICAgICAgICAgY29sbGVjdGlvbi5lYWNoIChtb2RlbCkgLT5cbiAgICAgICAgICAgIGlmIHBhcnNlSW50KCBtb2RlbC5nZXQoJ29yZGVyX2lkJyksIDEwICkgPiBmaXJzdE9yZGVySURcbiAgICAgICAgICAgICAgbW9kZWxzLnB1c2ggbW9kZWxcblxuICAgICAgICAgIEBzaG93SW5Sb3dzIGNvbXBvc2l0ZVZpZXcsIG1vZGVsc1xuXG5cbiAgICBzaG93SW5Sb3dzOiAoY29tcG9zaXRlVmlldywgbW9kZWxzLCBhcmdzKSA9PlxuXG4gICAgICBpZiBub3QgYXJncz9cbiAgICAgICAgYXJncyA9IHt9XG4gICAgICBhcmdzID0gXy5kZWZhdWx0cyBhcmdzLCB7fVxuXG4gICAgICBuZXdWaWV3cyA9IFtdXG5cbiAgICAgIF8uZWFjaCBtb2RlbHMsIChtb2RlbCkgLT5cbiAgICAgICAgIyBmaW5kIGNoaWxkIHZpZXcgZm9yIHRoaXMgbW9kZWxcbiAgICAgICAgY2hpbGRWaWV3ID0gY29tcG9zaXRlVmlldy5jaGlsZHJlbi5maW5kQnlNb2RlbCBtb2RlbFxuXG4gICAgICAgIGNoaWxkVmlldy4kZWwuaGlkZSgpXG4gICAgICAgIG5ld1ZpZXdzLnB1c2ggY2hpbGRWaWV3XG5cblxuICAgICAgIyBmaW5kIGhvdyBtYW55IGNvbHVtbnMgd2UgaGF2ZVxuICAgICAgbGF5b3V0ID0gJCgnLnNzLXdyYXBwZXInKS5hdHRyKCdkYXRhLWxheW91dCcpXG5cbiAgICAgIGNvbHMgPSAxXG4gICAgICBzd2l0Y2ggbGF5b3V0XG4gICAgICAgIHdoZW4gJ3NtYWxsJ1xuICAgICAgICAgIGNvbHMgPSAyXG4gICAgICAgIHdoZW4gJ21lZGl1bSdcbiAgICAgICAgICBjb2xzID0gM1xuICAgICAgICB3aGVuICdsYXJnZSdcbiAgICAgICAgICBjb2xzID0gNFxuXG4gICAgICAjIGRpdmlkZSBuZXcgcG9zdHMgaW4gZ3JvdXBzIG9yIGBjb2xzYCBwb3N0cyBlYWNoXG4gICAgICBuZXdWaWV3c0dyb3VwcyA9IFtdXG4gICAgICBfLmVhY2ggbmV3Vmlld3MucmV2ZXJzZSgpLCAobmV3VmlldywgbmV3Vmlld0luZGV4KSAtPlxuICAgICAgICBncm91cEluZGV4ID0gTWF0aC5mbG9vciggbmV3Vmlld0luZGV4IC8gY29scyApXG5cbiAgICAgICAgaWYgbm90IG5ld1ZpZXdzR3JvdXBzWyBncm91cEluZGV4IF0/XG4gICAgICAgICAgbmV3Vmlld3NHcm91cHMucHVzaCBbXVxuXG4gICAgICAgIG5ld1ZpZXdzR3JvdXBzWyBncm91cEluZGV4IF0ucHVzaCBuZXdWaWV3XG5cblxuICAgICAgaWYgYXJncy5pbnRlcnZhbD9cbiAgICAgICAgc2hvd0ludGVydmFsID0gYXJncy5pbnRlcnZhbFxuICAgICAgZWxzZVxuICAgICAgICBzaG93SW50ZXJ2YWwgPSBNYXRoLnJvdW5kKCBAYXV0b1JlbG9hZEludGVydmFsIC8gKCBuZXdWaWV3c0dyb3Vwcy5sZW5ndGggKyAxICkgKVxuXG4gICAgICBfLmVhY2ggbmV3Vmlld3NHcm91cHMsIChuZXdWaWV3R3JvdXAsIG5ld1ZpZXdHcm91cEluZGV4KSAtPlxuXG4gICAgICAgICMgc2hvdyBhZnRlciBzb21lIHRpbWVcbiAgICAgICAgc2V0VGltZW91dCAtPlxuXG4gICAgICAgICAgaWYgbmV3Vmlld0dyb3VwLmxlbmd0aCBpcyBjb2xzXG4gICAgICAgICAgICBfLmVhY2ggbmV3Vmlld0dyb3VwLCAobmV3VmlldykgLT5cbiAgICAgICAgICAgICAgbmV3Vmlldy4kZWwuc2xpZGVEb3duIDUwMFxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIF8uZWFjaCBuZXdWaWV3R3JvdXAsIChuZXdWaWV3KSAtPlxuICAgICAgICAgICAgICBuZXdWaWV3LiRlbC5mYWRlSW4gODAwXG5cbiAgICAgICAgLCBuZXdWaWV3R3JvdXBJbmRleCAqIHNob3dJbnRlcnZhbFxuXG5cbiAgICAgICMgY2xlYXIgdGhlIGxvYWRpbmcgZmxhZ1xuICAgICAgY29tcG9zaXRlVmlldy5sb2FkaW5nID0gZmFsc2VcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NQb3N0cycsIChTU1Bvc3RzLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTUG9zdHMuQ29udHJvbGxlcnMuUG9zdHNDb250cm9sbGVyIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5Db250cm9sbGVyXG5cblxuICAgIGluaXRpYWxpemU6ID0+XG5cbiAgICAgIFNTUG9zdHMub24gJ3N0YXJ0JywgQG9uU3RhcnRcblxuXG4gICAgb25TdGFydDogPT5cblxuICAgICAgIyBjaGVjayBpZiB0aGUgaGVhZGVyIHJlZ2lvbiBpcyBpbiB0aGUgZG9tXG4gICAgICBpZiAkKCcuc3MtcG9zdHMtcmVnaW9uJykubGVuZ3RoID4gMFxuXG4gICAgICAgIEFwcC5hZGRSZWdpb25zXG4gICAgICAgICAgcG9zdHM6ICcuc3MtcG9zdHMtcmVnaW9uJ1xuXG5cbiAgICAgICMjI1xuICAgICAgUmVuZGVyIHBvc3RzIGZvciB0aGUgZmlyc3QgdGltZSwgaWYgYW55IHBvc3RzIGFyZSBmb3VuZCBpbiB0aGUgRE9NLlxuICAgICAgIyMjXG4gICAgICBpZiAkKCcuc3Mtd3JhcHBlcicpLmxlbmd0aCA+IDBcbiAgICAgICAgQGdldFBvc3RzQ29tcG9zaXRlVmlldygpLnJlbmRlckZyb21ET00gJCgnLnNzLXdyYXBwZXInKVxuXG4gICAgICAgIGlmIEFwcC5wb3N0cz9cbiAgICAgICAgICBBcHAucG9zdHMuY3VycmVudFZpZXcgPSBAZ2V0UG9zdHNDb21wb3NpdGVWaWV3KClcblxuXG5cbiAgICBnZXRQb3N0c0NvbGxlY3Rpb246ID0+XG5cbiAgICAgIGlmIG5vdCBAcG9zdHNDb2xsZWN0aW9uP1xuXG4gICAgICAgIEBwb3N0c0NvbGxlY3Rpb24gPSBuZXcgU1NQb3N0cy5Db2xsZWN0aW9ucy5Qb3N0c0NvbGxlY3Rpb24oKVxuXG4gICAgICAgICMgaWYgdGhlIHBocCBhcGkgY2FsbCB3YXMgbWFkZSB3aXRoIGEgcmVxdWVzdElELCBmZXRjaCB0aGF0XG4gICAgICAgIGlmICQoJy5id2FwaS1jYWxsLWRhdGFbZGF0YS1pZD1cInNvY2lhbHN0cmVhbXNfdG9wXCJdJykubGVuZ3RoID4gMFxuICAgICAgICAgIEBwb3N0c0NvbGxlY3Rpb24uZGF0YS5yZXF1ZXN0SUQgPSAnc29jaWFsc3RyZWFtc190b3AnXG5cbiAgICAgICAgIyBJZiB3ZSBhcmUgaW4gdGhlIGFkbWluIGFyZWEsIHdlIG5lZWQgdG8gc2V0IHRoZVxuICAgICAgICAjIG9mIHRoZSBjb2xsZWN0aW9uIHRvIGZldGNoIGJvdGggZHJhZnQgYW5kIHB1Ymxpc2hlZCBwb3N0c1xuICAgICAgICBpZiAkKCcuc3MtYWRtaW4nKS5sZW5ndGggPiAwXG4gICAgICAgICAgQHBvc3RzQ29sbGVjdGlvbi5kYXRhLnN0YXR1cyA9IFsnZHJhZnQnLCAncHVibGlzaCddXG5cbiAgICAgICAgIyBmZXRjaCBpbml0aWFsIHBvc3RzIGZyb20gRE9NXG4gICAgICAgIEBwb3N0c0NvbGxlY3Rpb24uZmV0Y2goKVxuXG4gICAgICBAcG9zdHNDb2xsZWN0aW9uXG5cblxuICAgIGdldEFwaVBvc3RzQ29sbGVjdGlvbjogPT5cblxuICAgICAgaWYgbm90IEBhcGlQb3N0c0NvbGxlY3Rpb24/XG5cbiAgICAgICAgQGFwaVBvc3RzQ29sbGVjdGlvbiA9IG5ldyBTU1Bvc3RzLkNvbGxlY3Rpb25zLkFwaVBvc3RzQ29sbGVjdGlvbigpXG5cbiAgICAgIEBhcGlQb3N0c0NvbGxlY3Rpb25cblxuXG5cbiAgICBnZXRBbGxQb3N0c0NvbGxlY3Rpb246ID0+XG5cbiAgICAgIGlmIG5vdCBAYWxsUG9zdHNDb2xsZWN0aW9uP1xuXG4gICAgICAgIEBhbGxQb3N0c0NvbGxlY3Rpb24gPSBuZXcgU1NQb3N0cy5Db2xsZWN0aW9ucy5Qb3N0c0NvbGxlY3Rpb24oKVxuXG4gICAgICAgIEBhbGxQb3N0c0NvbGxlY3Rpb24uZGF0YSA9XG4gICAgICAgICAgcmVxdWVzdElEIDogJ3NvY2lhbHN0cmVhbXNfYWxsJ1xuICAgICAgICAgIHBlclBhZ2U6IC0xXG4gICAgICAgICAgc3RhdHVzOiBbXG4gICAgICAgICAgICAncHVibGlzaCdcbiAgICAgICAgICAgICdkcmFmdCdcbiAgICAgICAgICAgICd0cmFzaCdcbiAgICAgICAgICBdXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICAnaWQnXG4gICAgICAgICAgICAnc3RhdHVzJ1xuICAgICAgICAgICAgJ3ZlbmRvcl9pZCdcbiAgICAgICAgICAgICdzZXJ2aWNlX25hbWUnXG4gICAgICAgICAgXVxuXG4gICAgICAgIEBhbGxQb3N0c0NvbGxlY3Rpb24uZmV0Y2goKVxuXG4gICAgICAgICMgY29uc29sZS5sb2cgQGFsbFBvc3RzQ29sbGVjdGlvblxuXG4gICAgICBAYWxsUG9zdHNDb2xsZWN0aW9uXG5cblxuICAgIGdldFBvc3RzQ29tcG9zaXRlVmlldzogPT5cblxuICAgICAgaWYgbm90IEBwb3N0c0NvbXBvc2l0ZVZpZXc/IG9yIEBwb3N0c0NvbXBvc2l0ZVZpZXcuaXNDbG9zZWRcblxuICAgICAgICBAcG9zdHNDb21wb3NpdGVWaWV3ID0gbmV3IFNTUG9zdHMuVmlld3MuUG9zdHNDb21wb3NpdGVWaWV3XG4gICAgICAgICAgY29sbGVjdGlvbjogQGdldFBvc3RzQ29sbGVjdGlvbigpXG4gICAgICAgICAgbW9kZWw6IChuZXcgU1NQb3N0cy5Nb2RlbHMuUG9zdHNMYXlvdXRNb2RlbClcblxuICAgICAgQHBvc3RzQ29tcG9zaXRlVmlld1xuXG5cblxuICAgIGdldEFwaVBvc3RzQ29tcG9zaXRlVmlldzogPT5cblxuICAgICAgaWYgbm90IEBhcGlQb3N0c0NvbXBvc2l0ZVZpZXc/IG9yIEBhcGlQb3N0c0NvbXBvc2l0ZVZpZXcuaXNDbG9zZWRcblxuICAgICAgICBAYXBpUG9zdHNDb21wb3NpdGVWaWV3ID0gbmV3IFNTUG9zdHMuVmlld3MuUG9zdHNDb21wb3NpdGVWaWV3XG4gICAgICAgICAgY29sbGVjdGlvbjogQGdldEFwaVBvc3RzQ29sbGVjdGlvbigpXG4gICAgICAgICAgbW9kZWw6IChuZXcgU1NQb3N0cy5Nb2RlbHMuUG9zdHNMYXlvdXRNb2RlbClcblxuICAgICAgQGFwaVBvc3RzQ29tcG9zaXRlVmlld1xuXG5cblxuICAgIGRvaW5nQmF0Y2hTYXZlOiAodmFsdWUpID0+XG5cbiAgICAgIGlmIG5vdCBAZG9pbmdCYXRjaFNhdmVGbGFnP1xuICAgICAgICBAZG9pbmdCYXRjaFNhdmVGbGFnID0gZmFsc2VcblxuICAgICAgaWYgdmFsdWU/XG4gICAgICAgIEBkb2luZ0JhdGNoU2F2ZUZsYWcgPSB2YWx1ZVxuXG4gICAgICBAZG9pbmdCYXRjaFNhdmVGbGFnXG5cblxuICAgIGZldGNoU2VydmVyUG9zdHM6IChkYXRhLCBvcHRpb25zKSA9PlxuXG4gICAgICBwb3N0c0NvbGxlY3Rpb24gPSBAZ2V0UG9zdHNDb2xsZWN0aW9uKClcblxuICAgICAgaWYgbm90IHBvc3RzQ29sbGVjdGlvbi5kYXRhP1xuICAgICAgICBwb3N0c0NvbGxlY3Rpb24uZGF0YSA9IHt9XG5cbiAgICAgIGlmIGRhdGE/XG4gICAgICAgIHBvc3RzQ29sbGVjdGlvbi5kYXRhID0gXy5leHRlbmQge30sIHBvc3RzQ29sbGVjdGlvbi5kYXRhLCBkYXRhXG5cbiAgICAgICMgc2V0IGhhc05leHQgZmxhZyB0byB0cnVlIHNvIHRoYXQgaW5maW5pdGUgc2Nyb2xsIGNhbiBzdGFydCBhZ2FpblxuICAgICAgcG9zdHNDb2xsZWN0aW9uLmhhc05leHQgPSB0cnVlXG5cbiAgICAgICMgZmlyc3QgcmVzZXQgY29sbGVjdGlvblxuICAgICAgcG9zdHNDb2xsZWN0aW9uLnJlc2V0KClcblxuICAgICAgIyBmZXRjaCBuZXcgcG9zdHNcbiAgICAgIHBvc3RzQ29sbGVjdGlvbi5mZXRjaFxuICAgICAgICBzdWNjZXNzOiA9PlxuXG4gICAgICAgICAgIyBjaGVjayBpZiB0aGUgcmVnaW9uIGNvbnRhaW5zIHBvc3RzIGZyb20gdGhlIEFQSVxuICAgICAgICAgIHBvc3RzQ29tcG9zaXRlVmlldyA9IEBnZXRQb3N0c0NvbXBvc2l0ZVZpZXcoKVxuICAgICAgICAgIGlmIG5vdCBwb3N0c0NvbXBvc2l0ZVZpZXcuaXNSZW5kZXJlZFxuICAgICAgICAgICAgQXBwLnBvc3RzLnNob3cgcG9zdHNDb21wb3NpdGVWaWV3XG5cbiAgICAgICAgICBpZiBvcHRpb25zPyBhbmQgb3B0aW9ucy5zdWNjZXNzPyBhbmQgdHlwZW9mIG9wdGlvbnMuc3VjY2VzcyBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MoKVxuXG5cblxuICAgIGZldGNoQXBpUG9zdHM6IChkYXRhLCBvcHRpb25zKSA9PlxuXG4gICAgICBhcGlQb3N0c0NvbGxlY3Rpb24gPSBAZ2V0QXBpUG9zdHNDb2xsZWN0aW9uKClcblxuICAgICAgaWYgbm90IGFwaVBvc3RzQ29sbGVjdGlvbi5kYXRhP1xuICAgICAgICBhcGlQb3N0c0NvbGxlY3Rpb24uZGF0YSA9IHt9XG5cbiAgICAgIGlmIGRhdGE/XG4gICAgICAgIGFwaVBvc3RzQ29sbGVjdGlvbi5kYXRhID0gXy5leHRlbmQge30sIGFwaVBvc3RzQ29sbGVjdGlvbi5kYXRhLCBkYXRhXG5cbiAgICAgIGFwaVBvc3RzQ29sbGVjdGlvbi5oYXNOZXh0ID0gdHJ1ZVxuXG4gICAgICAjIGZvciBuZXcgYXBpIGNvbGxlY3Rpb25zIHdlIHNldCB0aGUgc2VhcmNoX21ldGFkYXRhIHRvIG51bGxcbiAgICAgIGlmIGFwaVBvc3RzQ29sbGVjdGlvbi5kYXRhLnNlYXJjaF9tZXRhZGF0YT9cbiAgICAgICAgZGVsZXRlIGFwaVBvc3RzQ29sbGVjdGlvbi5kYXRhLnNlYXJjaF9tZXRhZGF0YVxuXG4gICAgICAjIGZpcnN0IHJlc2V0IGNvbGxlY3Rpb25cbiAgICAgIGFwaVBvc3RzQ29sbGVjdGlvbi5yZXNldCgpXG5cbiAgICAgICMgZmV0Y2ggbmV3IHBvc3RzXG4gICAgICBhcGlQb3N0c0NvbGxlY3Rpb24uZmV0Y2hcblxuICAgICAgICBzdWNjZXNzOiA9PlxuXG4gICAgICAgICAgIyBjaGVjayBpZiB0aGUgcmVnaW9uIGNvbnRhaW5zIHBvc3RzIGZyb20gdGhlIEFQSVxuICAgICAgICAgIGFwaVBvc3RzQ29tcG9zaXRlVmlldyA9IEBnZXRBcGlQb3N0c0NvbXBvc2l0ZVZpZXcoKVxuICAgICAgICAgIGlmIG5vdCBhcGlQb3N0c0NvbXBvc2l0ZVZpZXcuaXNSZW5kZXJlZFxuICAgICAgICAgICAgQXBwLnBvc3RzLnNob3cgYXBpUG9zdHNDb21wb3NpdGVWaWV3XG5cbiAgICAgICAgICBpZiBvcHRpb25zPyBhbmQgb3B0aW9ucy5zdWNjZXNzPyBhbmQgdHlwZW9mIG9wdGlvbnMuc3VjY2VzcyBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MoKVxuXG5cbiAgICBwdWJsaXNoQXBpUG9zdHM6ID0+XG5cbiAgICAgICMgbG9vcCB0aHJvdWdoIGFsbCBwb3N0cyBpbiB0aGUgQVBJIGNvbGxlY3Rpb25cbiAgICAgIGFwaVBvc3RzQ29sbGVjdGlvbiA9IEBnZXRBcGlQb3N0c0NvbGxlY3Rpb24oKVxuXG4gICAgICBpZiBhcGlQb3N0c0NvbGxlY3Rpb24ubGVuZ3RoID4gMFxuICAgICAgICBhcGlQb3N0c0NvbGxlY3Rpb24uZWFjaCAoYXBpUG9zdE1vZGVsKSAtPlxuICAgICAgICAgIGFwaVBvc3RNb2RlbC5zYXZlIHt9LFxuICAgICAgICAgICAgYmF0Y2g6IHRydWVcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgPSByZXF1aXJlICdhcHAnXG5tb21lbnQgPSByZXF1aXJlICdtb21lbnQnXG5cbkFwcC5tb2R1bGUgJ1NTUG9zdHMnLCAoU1NQb3N0cywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU1Bvc3RzLk1vZGVscy5Qb3N0TW9kZWwgZXh0ZW5kcyBBcHAuTW9kZWxzLkFwaU1vZGVsXG5cbiAgICBhcGlVcmw6ICcxL3NpdGUvc29jaWFsc3RyZWFtcydcblxuICAgIGluaXRpYWxpemU6ID0+XG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIG9wdGlvbnMgbW9kdWxlIHdhcyBsb2FkZWRcbiAgICAgIGlmIEFwcC5TU09wdGlvbnM/IGFuZCBBcHAuU1NPcHRpb25zLnZlbnQ/XG5cbiAgICAgICAgIyBsaXN0ZW4gZm9yIG1vZGVyYXRpb24gY2hhbmdlc1xuICAgICAgICBAbGlzdGVuVG8gQXBwLlNTT3B0aW9ucy52ZW50LCAnY2hhbmdlOm1vZGVyYXRpb24nLCBAb25Nb2RlcmF0aW9uQ2hhbmdlXG5cblxuICAgICAgaWYgbm90IEBpZD8gb3IgQGlkIGlzICcnXG4gICAgICAgIHNhdmVkUG9zdCA9IEBnZXRTYXZlZFBvc3QoKVxuICAgICAgICBpZiBzYXZlZFBvc3Q/XG4gICAgICAgICAgaWQgPSBzYXZlZFBvc3QuZ2V0KCdpZCcpXG5cblxuICAgIG9uTW9kZXJhdGlvbkNoYW5nZTogKG1vZGVsLCBtb2RlcmF0aW9uKSA9PlxuXG4gICAgICAjIElmIHBvc3QgZG9lcyBub3QgaGF2ZSBhIGlkIHNldCwgZG8gbm90IHRvZ2dsZSBvbiBtb2RlcmF0aW9uIGNoYW5nZXNcbiAgICAgIGlmIG5vdCBAaWQ/IG9yIEBpZCBpcyAnJ1xuXG4gICAgICAgICMgYnkgZGVmYXVsdCB0aGUgc3RhdHVzIGlzICdwdWJsaWMnXG4gICAgICAgIHN0YXR1cyA9ICdwdWJsaXNoJ1xuXG4gICAgICAgICMgaWYgbW9kZXJhdGlvbiBpcyB0dXJuZWQgT04sIHRoZW4gd2Ugc2hvdWxkIHN3aXRjaCBhbGwgcG9zdHMgdG8gZHJhZnRcbiAgICAgICAgaWYgbW9kZXJhdGlvblxuICAgICAgICAgIHN0YXR1cyA9ICdkcmFmdCdcblxuICAgICAgICBAc2V0ICdzdGF0dXMnLCBzdGF0dXNcblxuXG4gICAgcGFyc2U6IChkYXRhKSAtPlxuXG4gICAgICBjb21wdXRlZEZpZWxkcyA9IFtcbiAgICAgICAgJ2Zvcm1hdHRlZF90aW1lJ1xuICAgICAgICAnYXZhdGFyJ1xuICAgICAgICAncGVybWFsaW5rJ1xuICAgICAgICAndXNlcl9saW5rJ1xuICAgICAgICAnZm9ybWF0dGVkX2NhcHRpb24nXG4gICAgICAgICdpbWFnZSdcbiAgICAgICAgJ3ZpZGVvJ1xuICAgICAgICAnaGFzX2ltYWdlJ1xuICAgICAgICAnaGFzX3ZpZGVvJ1xuICAgICAgICAnaGFzX21lZGlhJ1xuICAgICAgICAnYWN0aW9ucydcbiAgICAgICAgJ3N0YXR1c19pY29uJ1xuICAgICAgXVxuXG4gICAgICAjIHJlbW92ZSBjb21wdXRlZCBkYXRhXG4gICAgICBfLmVhY2ggY29tcHV0ZWRGaWVsZHMsIChrZXkpIC0+XG4gICAgICAgIGlmIGRhdGFba2V5XT9cbiAgICAgICAgICBkZWxldGUgZGF0YVtrZXldXG5cbiAgICAgIGlmIEBjb2xsZWN0aW9uP1xuXG4gICAgICAgIGR1cGVzID0gQGNvbGxlY3Rpb24ud2hlcmVcbiAgICAgICAgICB2ZW5kb3JfaWQ6IGRhdGEudmVuZG9yX2lkXG4gICAgICAgICAgc2VydmljZV9uYW1lOiBkYXRhLnNlcnZpY2VfbmFtZVxuXG4gICAgICAgIGlmIGR1cGVzLmxlbmd0aCA+IDFcbiAgICAgICAgICBkYXRhLmR1cGxpY2F0ZSA9IHRydWVcblxuICAgICAgZGF0YVxuXG5cbiAgICBkZWZhdWx0czpcblxuICAgICAgZHVwbGljYXRlOiBmYWxzZVxuXG4gICAgICBzdGF0dXM6IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJ2RyYWZ0J1xuXG4gICAgICAgICMgY2hlY2sgbW9kZXJhdGlvblxuICAgICAgICBpZiBBcHAuU1NPcHRpb25zP1xuICAgICAgICAgIG1vZGVyYXRpb24gPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAnbW9kZXJhdGlvbidcbiAgICAgICAgICBpZiBtb2RlcmF0aW9uPyBhbmQgbW9kZXJhdGlvbiBpcyBmYWxzZVxuICAgICAgICAgICAgb3V0cHV0ID0gJ3B1Ymxpc2gnXG5cblxuICAgICAgICBzYXZlZFBvc3QgPSBAZ2V0U2F2ZWRQb3N0KClcbiAgICAgICAgaWYgc2F2ZWRQb3N0P1xuICAgICAgICAgIG91dHB1dCA9IHNhdmVkUG9zdC5nZXQoJ3N0YXR1cycpXG5cbiAgICAgICAgb3V0cHV0XG5cblxuICAgICAgZm9ybWF0dGVkX3RpbWUgOiAtPlxuICAgICAgICBBcHAuSGVscGVycy5kYXRlLnBhcnNlVGltZXN0YW1wIEBnZXQoJ3RpbWVzdGFtcCcpXG5cbiAgICAgIHNjcmVlbl9uYW1lOiAtPlxuXG4gICAgICAgIG91dHB1dCA9ICcnXG5cbiAgICAgICAgc3dpdGNoIEBnZXQoJ3NlcnZpY2VfbmFtZScpXG4gICAgICAgICAgd2hlbiAndHdpdHRlcidcbiAgICAgICAgICAgIG91dHB1dCA9IEBnZXQoJ3VzZXInKS5zY3JlZW5fbmFtZVxuXG4gICAgICAgICAgd2hlbiAnaW5zdGFncmFtJ1xuICAgICAgICAgICAgb3V0cHV0ID0gQGdldCgndXNlcicpLnVzZXJuYW1lXG5cbiAgICAgICAgb3V0cHV0XG5cblxuICAgICAgYXZhdGFyOiAtPlxuXG4gICAgICAgIG91dHB1dCA9ICcnXG5cbiAgICAgICAgc3dpdGNoIEBnZXQoJ3NlcnZpY2VfbmFtZScpXG4gICAgICAgICAgd2hlbiAndHdpdHRlcidcbiAgICAgICAgICAgIG91dHB1dCA9IEBnZXQoJ3VzZXInKS5wcm9maWxlX2ltYWdlX3VybF9odHRwc1xuXG4gICAgICAgICAgd2hlbiAnaW5zdGFncmFtJ1xuICAgICAgICAgICAgb3V0cHV0ID0gQGdldCgndXNlcicpLnByb2ZpbGVfcGljdHVyZVxuXG4gICAgICAgIG91dHB1dFxuXG5cbiAgICAgIHBlcm1hbGluazogLT5cblxuICAgICAgICBvdXRwdXQgPSAnJ1xuXG4gICAgICAgIHN3aXRjaCBAZ2V0KCdzZXJ2aWNlX25hbWUnKVxuICAgICAgICAgIHdoZW4gJ3R3aXR0ZXInXG4gICAgICAgICAgICBvdXRwdXQgPSBcImh0dHBzOi8vd3d3LnR3aXR0ZXIuY29tL1wiICsgQGdldCgnc2NyZWVuX25hbWUnKSArIFwiL3N0YXR1cy9cIiArIEBnZXQoJ3ZlbmRvcl9pZCcpXG5cbiAgICAgICAgICB3aGVuICdpbnN0YWdyYW0nXG4gICAgICAgICAgICBvdXRwdXQgPSBAZ2V0KCdsaW5rJylcblxuICAgICAgICBvdXRwdXRcblxuXG4gICAgICB1c2VyX2xpbms6IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJydcblxuICAgICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgICB3aGVuICd0d2l0dGVyJ1xuICAgICAgICAgICAgb3V0cHV0ID0gXCJodHRwczovL3d3dy50d2l0dGVyLmNvbS9cIiArIEBnZXQoJ3NjcmVlbl9uYW1lJylcblxuICAgICAgICAgIHdoZW4gJ2luc3RhZ3JhbSdcbiAgICAgICAgICAgIG91dHB1dCA9IFwiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9cIiArIEBnZXQoJ3NjcmVlbl9uYW1lJylcblxuICAgICAgICBvdXRwdXRcblxuXG4gICAgICBmb3JtYXR0ZWRfY2FwdGlvbjogLT5cblxuICAgICAgICBvdXRwdXQgPSAnJ1xuXG4gICAgICAgIHN3aXRjaCBAZ2V0KCdzZXJ2aWNlX25hbWUnKVxuICAgICAgICAgIHdoZW4gJ3R3aXR0ZXInXG4gICAgICAgICAgICBvdXRwdXQgPSBAZ2V0KCd0ZXh0JylcblxuICAgICAgICAgIHdoZW4gJ2luc3RhZ3JhbSdcbiAgICAgICAgICAgIGNhcHRpb24gPSBAZ2V0KCdjYXB0aW9uJylcbiAgICAgICAgICAgIGlmIGNhcHRpb24/IGFuZCBjYXB0aW9uLnRleHQ/XG4gICAgICAgICAgICAgIG91dHB1dCA9IGNhcHRpb24udGV4dFxuXG4gICAgICAgIG91dHB1dCA9IEBwYXJzZVVybHMgb3V0cHV0XG4gICAgICAgIG91dHB1dCA9IEBwYXJzZU1lbnRpb25zIG91dHB1dFxuICAgICAgICBvdXRwdXQgPSBAcGFyc2VIYXNodGFncyBvdXRwdXRcbiAgICAgICAgb3V0cHV0ID0gQGFkZExpbmVicmVha3Mgb3V0cHV0XG5cbiAgICAgICAgb3V0cHV0XG5cblxuICAgICAgaW1hZ2U6IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJydcblxuICAgICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgICB3aGVuICd0d2l0dGVyJ1xuICAgICAgICAgICAgZW50aXRpZXMgPSBAZ2V0KCdlbnRpdGllcycpXG4gICAgICAgICAgICBpZiBlbnRpdGllcz8gYW5kIGVudGl0aWVzLm1lZGlhPyBhbmQgZW50aXRpZXMubWVkaWEubGVuZ3RoID4gMFxuICAgICAgICAgICAgICBvdXRwdXQgPSBlbnRpdGllcy5tZWRpYVswXS5tZWRpYV91cmxfaHR0cHNcblxuICAgICAgICAgIHdoZW4gJ2luc3RhZ3JhbSdcbiAgICAgICAgICAgIG91dHB1dCA9IEBnZXQoJ2ltYWdlcycpLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsXG5cbiAgICAgICAgb3V0cHV0XG5cblxuICAgICAgdmlkZW86IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJydcblxuICAgICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgICB3aGVuICdpbnN0YWdyYW0nXG4gICAgICAgICAgICB2aWRlb3MgPSBAZ2V0KCd2aWRlb3MnKVxuICAgICAgICAgICAgaWYgdmlkZW9zPyBhbmQgdmlkZW9zLnN0YW5kYXJkX3Jlc29sdXRpb24/IGFuZCB2aWRlb3Muc3RhbmRhcmRfcmVzb2x1dGlvbi51cmw/XG4gICAgICAgICAgICAgIG91dHB1dCA9IHZpZGVvcy5zdGFuZGFyZF9yZXNvbHV0aW9uLnVybFxuXG4gICAgICAgIG91dHB1dFxuXG5cbiAgICAgIGhhc19pbWFnZTogLT5cbiAgICAgICAgKEBnZXQoJ2ltYWdlJykgaXNudCAnJylcblxuICAgICAgaGFzX3ZpZGVvOiAtPlxuICAgICAgICAoQGdldCgndmlkZW8nKSBpc250ICcnKVxuXG5cbiAgICAgIGhhc19tZWRpYTogLT5cbiAgICAgICAgKEBnZXQoJ2hhc19pbWFnZScpIG9yIEBnZXQoJ2hhc192aWRlbycpKVxuXG5cbiAgICAgIGFjdGlvbnM6IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJydcblxuICAgICAgICAjIGNoZWNrIGlmIHRoZSBjdXJyZW50IHVzZXIgY2FuIG1vZGVyYXRlXG4gICAgICAgIHVzZXJfY2FuX21vZGVyYXRlID0gZmFsc2VcbiAgICAgICAgIyBjaGVjayBpZiB0aGUgb3B0aW9ucyBtb2R1bGUgd2FzIGxvYWRlZFxuICAgICAgICBpZiBBcHAuU1NPcHRpb25zP1xuICAgICAgICAgIHVzZXJfY2FuX21vZGVyYXRlID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ3VzZXJfY2FuX21vZGVyYXRlJ1xuXG4gICAgICAgIGlmIHVzZXJfY2FuX21vZGVyYXRlXG4gICAgICAgICAgb3V0cHV0ICs9ICc8YSBjbGFzcz1cInNzLXBvc3QtYWN0aW9uIHNzLXB1Ymxpc2gtYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIj48aSBjbGFzcz1cInNzLWljb24tY2hlY2tcIj48L2k+PHNwYW4gY2xhc3M9XCJzcy1pbm5lclwiPlB1Ymxpc2g8L3NwYW4+PC9hPidcbiAgICAgICAgICBvdXRwdXQgKz0gJzxhIGNsYXNzPVwic3MtcG9zdC1hY3Rpb24gc3MtdHJhc2gtYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIj48aSBjbGFzcz1cInNzLWljb24tdHJhc2gtb1wiPjwvaT48c3BhbiBjbGFzcz1cInNzLWlubmVyXCI+VHJhc2g8L3NwYW4+PC9hPidcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHN3aXRjaCBAZ2V0KCdzZXJ2aWNlX25hbWUnKVxuICAgICAgICAgICAgd2hlbiAndHdpdHRlcidcbiAgICAgICAgICAgICAgdmVuZG9yX2lkID0gQGdldCgndmVuZG9yX2lkJylcbiAgICAgICAgICAgICAgb3V0cHV0ICs9ICc8YSBjbGFzcz1cInNzLXBvc3QtYWN0aW9uXCIgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P2luX3JlcGx5X3RvPScgKyB2ZW5kb3JfaWQgKyAnJnZpYT1Tb2NpYWxTdHJlYW1zV1AmcmVsYXRlZD1Tb2NpYWxTdHJlYW1zV1BcIiB0YXJnZXQ9XCJfYmxhbmtcIj48aSBjbGFzcz1cInNzLWljb24tcmVwbHlcIj48L2k+PHNwYW4gY2xhc3M9XCJzcy1pbm5lclwiPlJlcGx5PC9zcGFuPjwvYT4nXG4gICAgICAgICAgICAgIG91dHB1dCArPSAnPGEgY2xhc3M9XCJzcy1wb3N0LWFjdGlvblwiIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC9yZXR3ZWV0P3R3ZWV0X2lkPScgKyB2ZW5kb3JfaWQgKyAnJnJlbGF0ZWQ9U29jaWFsU3RyZWFtc1dQXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGkgY2xhc3M9XCJzcy1pY29uLXJldHdlZXRcIj48L2k+PHNwYW4gY2xhc3M9XCJzcy1pbm5lclwiPlJldHdlZXQ8L3NwYW4+PC9hPidcblxuICAgICAgICBvdXRwdXRcblxuXG4gICAgICBzdGF0dXNfaWNvbjogLT5cblxuICAgICAgICBvdXRwdXQgPSAnJ1xuXG4gICAgICAgICMgY2hlY2sgaWYgdGhlIGN1cnJlbnQgdXNlciBjYW4gbW9kZXJhdGVcbiAgICAgICAgdXNlcl9jYW5fbW9kZXJhdGUgPSBmYWxzZVxuICAgICAgICAjIGNoZWNrIGlmIHRoZSBvcHRpb25zIG1vZHVsZSB3YXMgbG9hZGVkXG4gICAgICAgIGlmIEFwcC5TU09wdGlvbnM/XG4gICAgICAgICAgdXNlcl9jYW5fbW9kZXJhdGUgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAndXNlcl9jYW5fbW9kZXJhdGUnXG5cbiAgICAgICAgaWYgdXNlcl9jYW5fbW9kZXJhdGVcbiAgICAgICAgICBzd2l0Y2ggQGdldCgnc3RhdHVzJylcbiAgICAgICAgICAgIHdoZW4gJ3B1Ymxpc2gnXG4gICAgICAgICAgICAgIG91dHB1dCArPSAnPGkgY2xhc3M9XCJzcy1pY29uLWNoZWNrXCI+PC9pPidcbiAgICAgICAgICAgIHdoZW4gJ2RyYWZ0J1xuICAgICAgICAgICAgICBvdXRwdXQgKz0gJzxpIGNsYXNzPVwic3MtaWNvbi1idyBidy1kcmFmdC1pY29uXCI+PC9pPidcbiAgICAgICAgICAgIHdoZW4gJ3RyYXNoJ1xuICAgICAgICAgICAgICBvdXRwdXQgKz0gJzxpIGNsYXNzPVwic3MtaWNvbi10cmFzaC1vXCI+PC9pPidcblxuICAgICAgICBvdXRwdXRcblxuXG4gICAgICBkZXZfbWV0YTogLT5cblxuICAgICAgICAjIGNoZWNrIGlmIHRoZSBvcHRpb25zIG1vZHVsZSB3YXMgbG9hZGVkXG4gICAgICAgIGlmIG5vdCBBcHAuU1NPcHRpb25zP1xuICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICMgZ2V0IHRoZSBkZXZfbW9kZSBvcHRpb25cbiAgICAgICAgZGV2X21vZGUgPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAnZGV2X21vZGUnXG4gICAgICAgIGlmIG5vdCBkZXZfbW9kZT8gb3Igbm90IGRldl9tb2RlXG4gICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgb3V0cHV0ID0gJydcbiAgICAgICAgb3V0cHV0ICs9ICc8cCBjbGFzcz1cInNzLXBvc3QtaWRcIj5pZDogJyArIEBnZXQoJ2lkJykgKyAnPC9wPidcbiAgICAgICAgb3V0cHV0ICs9ICc8cCBjbGFzcz1cInNzLXBvc3Qtb3JkZXJfaWRcIj5vcmRlcl9pZDogJyArIEBnZXQoJ29yZGVyX2lkJykgKyAnPC9wPidcbiAgICAgICAgb3V0cHV0ICs9ICc8cCBjbGFzcz1cInNzLXBvc3QtdmVuZG9yX2lkXCI+dmVuZG9yX2lkOiAnICsgQGdldCgndmVuZG9yX2lkJykgKyAnPC9wPidcbiAgICAgICAgb3V0cHV0ICs9ICc8cCBjbGFzcz1cInNzLXBvc3Qtc2VydmljZV9uYW1lXCI+c2VydmljZV9uYW1lOiAnICsgQGdldCgnc2VydmljZV9uYW1lJykgKyAnPC9wPidcbiAgICAgICAgb3V0cHV0ICs9ICc8cCBjbGFzcz1cInNzLXBvc3QtdGltZXN0YW1wXCI+dGltZXN0YW1wOiAnICsgQGdldCgndGltZXN0YW1wJykgKyAnPC9wPidcbiAgICAgICAgb3V0cHV0ICs9ICc8cCBjbGFzcz1cInNzLXBvc3QtZGF0ZVwiPmRhdGU6ICcgKyBtb21lbnQudW5peCggQGdldCgndGltZXN0YW1wJykgKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSArICc8L3A+J1xuXG4gICAgICAgIG91dHB1dFxuXG5cbiAgICAjIC9kZWZhdWx0c1xuXG5cblxuICAgIHBhcnNlVXJsczogKHRleHQpIC0+XG5cblxuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSAvW0EtWmEtel0rOlxcL1xcL1tBLVphLXowLTktX10rXFwuW0EtWmEtejAtOS1fOiUmXFw/XFwvLj1dKy9nLCAodXJpKSAtPlxuICAgICAgICAnPGEgaHJlZj1cIicgKyB1cmkgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIHVyaSArICc8L2E+J1xuXG4gICAgICB0ZXh0XG5cblxuICAgIHBhcnNlTWVudGlvbnM6ICh0ZXh0KSAtPlxuXG4gICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgd2hlbiAndHdpdHRlcidcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlIC9bQF0rKFtBLVphLXowLTktX10rKS9nLCAobWF0Y2gsIGhhbmRsZSkgLT5cbiAgICAgICAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS8nICsgaGFuZGxlICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPkAnICsgaGFuZGxlICsgJzwvYT4nXG5cbiAgICAgICAgd2hlbiAnaW5zdGFncmFtJ1xuICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgL1tAXSsoW0EtWmEtejAtOS1fXSspL2csIChtYXRjaCwgaGFuZGxlKSAtPlxuICAgICAgICAgICAgJzxhIGhyZWY9XCJodHRwczovL2luc3RhZ3JhbS5jb20vJyArIGhhbmRsZSArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj5AJyArIGhhbmRsZSArICc8L2E+J1xuXG4gICAgICB0ZXh0XG5cblxuICAgIHBhcnNlSGFzaHRhZ3M6ICh0ZXh0KSAtPlxuXG4gICAgICBzd2l0Y2ggQGdldCgnc2VydmljZV9uYW1lJylcbiAgICAgICAgd2hlbiAndHdpdHRlcidcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlIC9bXFxzXT9bI10rKFtBLVphLXowLTktX10rKS9nLCAobWF0Y2gsIGhhc2h0YWcpIC0+XG4gICAgICAgICAgICAnIDxhIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL2hhc2h0YWcvJyArIGhhc2h0YWcgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+IycgKyBoYXNodGFnICsgJzwvYT4nXG5cbiAgICAgICAgd2hlbiAnaW5zdGFncmFtJ1xuICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgL1tcXHNdP1sjXSsoW0EtWmEtejAtOS1fXSspL2csIChtYXRjaCwgaGFzaHRhZykgLT5cbiAgICAgICAgICAgICMgJzxhIGhyZWY9XCJodHRwOi8vc2VhcmNoaW5zdGFncmFtLmNvbS8nICsgaGFzaHRhZyArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4jJyArIGhhc2h0YWcgKyAnPC9hPidcbiAgICAgICAgICAgICcgIycgKyBoYXNodGFnXG5cbiAgICAgIHRleHRcblxuXG4gICAgYWRkTGluZWJyZWFrczogKHRleHQpIC0+XG5cbiAgICAgIHN3aXRjaCBAZ2V0KCdzZXJ2aWNlX25hbWUnKVxuICAgICAgICB3aGVuICd0d2l0dGVyJ1xuICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgL1xccj9cXG4vZywgJzxiciAvPidcblxuICAgICAgICB3aGVuICdpbnN0YWdyYW0nXG4gICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSAvXFxyP1xcbi9nLCAnICdcblxuICAgICAgdGV4dFxuXG5cblxuICAgIGdldFNhdmVkUG9zdDogPT5cblxuICAgICAgIyByZW1vdmluZyB0aGlzIGZlYXR1cmUgZm9yIG5vd1xuICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgaWYgbm90IEBzYXZlZFBvc3Q/XG5cbiAgICAgICAgIyBjaGVjayBzdGF0dXMgZnJvbSB0aGUgY29sbGVjdGlvbiBvZiBhbGwgc2F2ZWQgcG9zdHNcbiAgICAgICAgYWxsUG9zdHNDb2xsZWN0aW9uID0gU1NQb3N0cy5yZXFyZXMucmVxdWVzdCAnYWxsUG9zdHNDb2xsZWN0aW9uJ1xuICAgICAgICBAc2F2ZWRQb3N0ID0gYWxsUG9zdHNDb2xsZWN0aW9uLmZpbmRXaGVyZVxuICAgICAgICAgIHZlbmRvcl9pZDogQGdldCAndmVuZG9yX2lkJ1xuICAgICAgICAgIHNlcnZpY2VfbmFtZTogQGdldCAnc2VydmljZV9uYW1lJ1xuXG4gICAgICBAc2F2ZWRQb3N0XG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NQb3N0cycsIChTU1Bvc3RzLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTUG9zdHMuTW9kZWxzLlBvc3RzTGF5b3V0TW9kZWwgZXh0ZW5kcyBBcHAuTW9kZWxzLkFwaU1vZGVsXG5cbiAgICBkZWZhdWx0czpcblxuICAgICAgd2lkdGg6IG51bGxcblxuICAgICAgbGF5b3V0OiAtPlxuXG4gICAgICAgIHBhcmVudFdpZHRoID0gQGdldCgnd2lkdGgnKVxuXG4gICAgICAgIGlmIG5vdCBwYXJlbnRXaWR0aD9cbiAgICAgICAgICByZXR1cm5cblxuICAgICAgICBsYXlvdXQgPSAnJ1xuXG4gICAgICAgIGlmIHBhcmVudFdpZHRoIDw9IDYwMFxuICAgICAgICAgIGxheW91dCA9ICd4LXNtYWxsJ1xuXG4gICAgICAgIGVsc2UgaWYgcGFyZW50V2lkdGggPiA2MDAgYW5kIHBhcmVudFdpZHRoIDw9IDkwMFxuICAgICAgICAgIGxheW91dCA9ICdzbWFsbCdcblxuICAgICAgICBlbHNlIGlmIHBhcmVudFdpZHRoID4gOTAwIGFuZCBwYXJlbnRXaWR0aCA8PSAxMjUwXG4gICAgICAgICAgbGF5b3V0ID0gJ21lZGl1bSdcblxuICAgICAgICBlbHNlIGlmIHBhcmVudFdpZHRoID4gMTI1MFxuICAgICAgICAgIGxheW91dCA9ICdsYXJnZSdcblxuICAgICAgICAjIGVsc2UgaWYgcGFyZW50V2lkdGggPiAxNTAwXG4gICAgICAgICMgICBsYXlvdXQgPSAneC1sYXJnZSdcblxuICAgICAgICBsYXlvdXRcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5BcHAubW9kdWxlICdTU1Bvc3RzJywgKFNTUG9zdHMsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgU1NQb3N0cy5Db250cm9sbGVycyA9IHt9XG4gIFNTUG9zdHMuTW9kZWxzID0ge31cbiAgU1NQb3N0cy5Db2xsZWN0aW9ucyA9IHt9XG4gIFNTUG9zdHMuVmlld3MgPSB7fVxuICBTU1Bvc3RzLkxheW91dHMgPSB7fVxuICBTU1Bvc3RzLlJvdXRlcnMgPSB7fVxuICBTU1Bvc3RzLlRlbXBsYXRlcyA9IHt9XG5cbiAgU1NQb3N0cy52ZW50ID0gbmV3IEJhY2tib25lLldyZXFyLkV2ZW50QWdncmVnYXRvcigpXG4gIFNTUG9zdHMuY29tbWFuZHMgPSBuZXcgQmFja2JvbmUuV3JlcXIuQ29tbWFuZHMoKVxuICBTU1Bvc3RzLnJlcXJlcyA9IG5ldyBCYWNrYm9uZS5XcmVxci5SZXF1ZXN0UmVzcG9uc2UoKVxuXG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzQ29tcGlsZXIudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIHN0YWNrMSwgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYnVmZmVyID0gXCIgIDxkaXYgY2xhc3M9XFxcInNzLW1ldGFcXFwiPlxcbiAgICBcIjtcbiAgc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXZfbWV0YSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGV2X21ldGEgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiZGV2X21ldGFcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKTtcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiXFxuICA8L2Rpdj48IS0tIC5zcy1tZXRhIC0tPlxcblwiO1xufSxcIjNcIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHZhciBzdGFjazEsIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBidWZmZXIgPSBcIiAgPGRpdiBjbGFzcz1cXFwic3MtcG9zdC1tZWRpYVxcXCI+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJzcy1wb3N0LXNvY2lhbC1pY29uXFxcIj48aSBjbGFzcz1cXFwic3MtaWNvbi1cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnNlcnZpY2VfbmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2VydmljZV9uYW1lIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInNlcnZpY2VfbmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCIgc3Mtd2F0ZXJtYXJrXFxcIj48L2k+PC9zcGFuPlxcblwiO1xuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaGFzX3ZpZGVvIDogZGVwdGgwKSwge1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDQsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMucHJvZ3JhbSg2LCBkYXRhKSxcImRhdGFcIjpkYXRhfSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIHJldHVybiBidWZmZXIgKyBcIiAgPC9kaXY+PCEtLSAuc3MtcG9zdC1tZWRpYSAtLT5cXG5cIjtcbn0sXCI0XCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XG4gIHJldHVybiBcIiAgICAgIDx2aWRlbyBjbGFzcz1cXFwic3MtcG9zdC12aWRlb1xcXCIgbXV0ZWQgYXV0b3BsYXkgbG9vcCBwb3N0ZXI9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaW1hZ2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmltYWdlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS1pbWFnZT1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbWFnZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaW1hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBkYXRhLXNyYz1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy52aWRlbyB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudmlkZW8gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwidmlkZW9cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiAvPjwhLS0gdmlkZW8uc3MtcG9zdC1pbWFnZSAtLT5cXG5cIjtcbn0sXCI2XCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XG4gIHJldHVybiBcIiAgICAgIDxkaXYgY2xhc3M9XFxcInNzLXBvc3QtaW1hZ2Utd3JhcHBlclxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtaW1hZ2U6dXJsKFwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaW1hZ2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmltYWdlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIik7XFxcIj5cXG4gICAgICAgIDxpbWcgc3JjPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJpbWFnZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGNsYXNzPVxcXCJzcy1wb3N0LWltYWdlXFxcIiAvPlxcbiAgICAgIDwvZGl2PjwhLS0gLnNzLXBvc3QtaW1hZ2Utd3JhcHBlciAtLT5cXG5cIjtcbn0sXCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIHN0YWNrMSwgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIGJ1ZmZlciA9IFwiPGRpdiBjbGFzcz1cXFwic3MtcG9zdC1pbm5lclxcXCI+XFxuXFxuICA8c3BhbiBjbGFzcz1cXFwic3MtcG9zdC1zcGFjZXJcXFwiPjwvc3Bhbj5cXG5cXG5cIjtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRldl9tZXRhIDogZGVwdGgwKSwge1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDEsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMubm9vcCxcImRhdGFcIjpkYXRhfSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwic3MtcG9zdC1jb250ZW50XFxcIj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcInNzLXBvc3Qtc29jaWFsLWljb25cXFwiPjxpIGNsYXNzPVxcXCJzcy1pY29uLVwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuc2VydmljZV9uYW1lIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zZXJ2aWNlX25hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwic2VydmljZV9uYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PC9pPjwvc3Bhbj5cXG4gICAgPGRpdiBjbGFzcz1cXFwic3MtcG9zdC1jb250ZW50LWlubmVyXFxcIj5cXG4gICAgICBcIjtcbiAgc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5mb3JtYXR0ZWRfY2FwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZm9ybWF0dGVkX2NhcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiZm9ybWF0dGVkX2NhcHRpb25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKTtcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgYnVmZmVyICs9IFwiXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+PCEtLSAuc3MtcG9zdC1jb250ZW50IC0tPlxcblxcblwiO1xuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaGFzX21lZGlhIDogZGVwdGgwKSwge1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDMsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMubm9vcCxcImRhdGFcIjpkYXRhfSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIlxcbiAgPGRpdiBjbGFzcz1cXFwic3MtcG9zdC1hY3Rpb25zXFxcIj5cXG4gICAgXCI7XG4gIHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYWN0aW9ucyB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYWN0aW9ucyA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJhY3Rpb25zXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIlxcbiAgPC9kaXY+PCEtLSAuc3MtcG9zdC1hY3Rpb25zIC0tPlxcblxcbiAgPGRpdiBjbGFzcz1cXFwic3MtcG9zdC1zdGF0dXNcXFwiPlxcbiAgICBcIjtcbiAgc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5zdGF0dXNfaWNvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc3RhdHVzX2ljb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwic3RhdHVzX2ljb25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKTtcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiXFxuICA8L2Rpdj48IS0tIC5zcy1wb3N0LXN0YXR1cyAtLT5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInNzLXBvc3QtZm9vdGVyXFxcIj5cXG4gICAgPGEgaHJlZj1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy51c2VyX2xpbmsgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnVzZXJfbGluayA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ1c2VyX2xpbmtcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBjbGFzcz1cXFwic3MtYXZhdGFyXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+IDxpbWcgc3JjPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmF2YXRhciB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYXZhdGFyIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImF2YXRhclwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiLz4gPC9hPlxcbiAgICA8YSBocmVmPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnVzZXJfbGluayB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudXNlcl9saW5rIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInVzZXJfbGlua1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGNsYXNzPVxcXCJzcy1oYW5kbGVcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5AXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5zY3JlZW5fbmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2NyZWVuX25hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwic2NyZWVuX25hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9hPlxcbiAgICA8YSBocmVmPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnBlcm1hbGluayB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucGVybWFsaW5rIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInBlcm1hbGlua1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGNsYXNzPVxcXCJzcy1wb3N0LXRpbWVcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5cXG4gICAgICA8c3BhbiBkYXRhLWxpdmVzdGFtcD1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aW1lc3RhbXAgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpbWVzdGFtcCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ0aW1lc3RhbXBcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj48L3NwYW4+XFxuICAgIDwvYT5cXG4gIDwvZGl2PjwhLS0gLnNzLXBvc3QtZm9vdGVyIC0tPlxcblxcbjwvZGl2PjwhLS0gLnNzLXBvc3QtaW5uZXIgLS0+XFxuXCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgcmV0dXJuIFwiXFxuPGRpdiBjbGFzcz1cXFwic3MtcG9zdHNcXFwiPjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XFxcInNzLWluZmluaXRlLXNjcm9sbC1sb2FkZXJcXFwiPjxkaXYgY2xhc3M9XFxcInNzLWlubmVyLXRleHRcXFwiPk5vIG1vcmUgY29udGVudCB0byBsb2FkLjwvZGl2PjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XFxcInNzLWZvb3RlclxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJzcy1jcmVkaXRzXFxcIj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcInNzLXBvd2VyZWQtYnlcXFwiPlBvd2VyZWQgYnk8L3NwYW4+XFxuICAgIDxhIGhyZWY9XFxcImh0dHA6Ly9zb2NpYWxzdHJlYW1zLmNvbVxcXCIgY2xhc3M9XFxcInNzLWZvb3Rlci1sb2dvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxuICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzcy1mb290ZXItbG9nby10ZXh0XFxcIj5Tb2NpYWwgU3RyZWFtczwvc3Bhbj5cXG4gICAgPC9hPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXFxuXCI7XG4gIH0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbkFwcCAgICAgICA9IHJlcXVpcmUgJ2FwcCdcbk1vZGVybml6ciA9IHJlcXVpcmUgJ21vZGVybml6cidcbmFsZXJ0aWZ5ICA9IHJlcXVpcmUgJ2FsZXJ0aWZ5J1xuXG5BcHAubW9kdWxlICdTU1Bvc3RzJywgKFNTUG9zdHMsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgY2xhc3MgU1NQb3N0cy5WaWV3cy5Qb3N0SXRlbVZpZXcgZXh0ZW5kcyBBcHAuVmlld3MuQmFzZUl0ZW1WaWV3XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4uL1RlbXBsYXRlcy9Qb3N0SXRlbVZpZXdUZW1wbGF0ZScpXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICBAbGlzdGVuVG8gQG1vZGVsLCAnY2hhbmdlOnN0YXR1cycsIEBvblN0YXR1c0NoYW5nZVxuXG4gICAgY2xhc3NOYW1lOiA9PlxuXG4gICAgICAjIHNldCBjbGFzcyBiYXNlZCBvbiBjaGlsZCBpbmRleFxuICAgICAgY2xhc3NlcyA9IFsnc3MtcG9zdCddXG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIG9wdGlvbnMgbW9kdWxlIHdhcyBsb2FkZWRcbiAgICAgIGlmIEFwcC5TU09wdGlvbnM/XG4gICAgICAgIHNzT3B0aW9ucyA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbnMnXG5cbiAgICAgICAgaWYgc3NPcHRpb25zLmdldCgnZGV2X21vZGUnKVxuICAgICAgICAgIGNsYXNzZXMucHVzaCAnc3MtZGV2J1xuXG4gICAgICBpZiBAbW9kZWwuZ2V0KCdoYXNfbWVkaWEnKVxuICAgICAgICBjbGFzc2VzLnB1c2ggJ3NzLWhhcy1tZWRpYSdcblxuICAgICAgaWYgQG1vZGVsLmdldCgnaGFzX3ZpZGVvJylcbiAgICAgICAgY2xhc3Nlcy5wdXNoICdzcy1oYXMtdmlkZW8nXG5cbiAgICAgIGlmIEBtb2RlbC5nZXQoJ2R1cGxpY2F0ZScpXG4gICAgICAgIGNsYXNzZXMucHVzaCAnc3MtZHVwbGljYXRlJ1xuXG4gICAgICAjIHNlcnZpY2UgY2xhc3NcbiAgICAgIGNsYXNzZXMucHVzaCAnc3MtJyArIEBtb2RlbC5nZXQoJ3NlcnZpY2VfbmFtZScpXG5cbiAgICAgICMgc3RhdHVzIGNsYXNzXG4gICAgICBjbGFzc2VzLnB1c2ggJ3NzLXN0YXR1cy0nICsgQG1vZGVsLmdldCgnc3RhdHVzJylcblxuICAgICAgY2xhc3Nlcy5qb2luICcgJ1xuXG5cbiAgICBhdHRyaWJ1dGVzOiA9PlxuICAgICAgJ2RhdGEtaWQnOiBAbW9kZWwuZ2V0ICdvcmRlcl9pZCdcblxuICAgIG9uUmVuZGVyOiA9PlxuXG4gICAgICAjaWYgdmlkZW9cbiAgICAgIGlmIEBtb2RlbC5nZXQoJ2hhc192aWRlbycpP1xuXG4gICAgICAgICMgTXV0ZSB2aWRlb1xuICAgICAgICBAJCgndmlkZW8nKS5wcm9wICdtdXRlZCcsIHRydWVcblxuXG4gICAgICAjIGNoZWNrIGlmIGl0IGlzIG1vYmlsZSBvciB0YWJsZXRcbiAgICAgIGlmIE1vZGVybml6ci50b3VjaGV2ZW50cz8gYW5kIE1vZGVybml6ci50b3VjaGV2ZW50cyBpcyB0cnVlXG5cbiAgICAgICAgIyBiaW5kIHRoZSBjbGljayBldmVudCB0byB0aGUgYSB0YWcgc28gaU9TIGNhbiBmaXJlIHRoZSBjbGljayBldmVudFxuICAgICAgICBAJGVsLm9uICdjbGljaycsICdhJywgQG9uQ2xpY2tBbmNob3JcblxuICAgICAgICAjIGJpbmQgdGhlIGVsZW1lbnQgd2l0aCB0YXBweVxuICAgICAgICBAJGVsLm9uICd0YXAnLCBAb25UYXBcblxuICAgICAgZWxzZVxuICAgICAgICAjaWYgdmlkZW9cbiAgICAgICAgaWYgQG1vZGVsLmdldCgnaGFzX3ZpZGVvJyk/XG4gICAgICAgICAgIyBzZXQgdmlkZW8gc3JjXG4gICAgICAgICAgQCQoJ3ZpZGVvJykuYXR0ciBcInNyY1wiLCBAJCgndmlkZW8nKS5kYXRhKFwic3JjXCIpXG5cbiAgICAgICAgIyBkbyB0aGUgZGVza3RvcCBldmVudHNcbiAgICAgICAgQCRlbC5vbiAnbW91c2VlbnRlciBtb3VzZWxlYXZlJywgJy5zcy1wb3N0LWlubmVyJywgQG9uTW91c2VvdmVyXG4gICAgICAgIEAkZWwub24gJ2NsaWNrJywgJy5zcy1wdWJsaXNoLWJ0biwgLnNzLXRyYXNoLWJ0bicsIEBvbkNsaWNrVG9nZ2xlU3RhdHVzXG5cblxuICAgIG9uQ2xpY2tBbmNob3I6ICggZXZlbnQgKSA9PlxuXG4gICAgICAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KVxuICAgICAgJHRhcmdldC5hZGRDbGFzcyggJ2NsaWNrLWZpcmVkJyApXG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIGEgdGFnIGhhcyB0aGUgcHVibGlzaCBvciB0cmFzaCBjbGFzc2VzXG4gICAgICAjIGlmIGl0IGRvZXMsIHRyaWdnZXIgdGhlIHN0YXR1cyBjaGFuZ2UgZnVuY3Rpb25cbiAgICAgIGlmICR0YXJnZXQuaGFzQ2xhc3MoICdzcy1wdWJsaXNoLWJ0bicgKSBvciAkdGFyZ2V0Lmhhc0NsYXNzKCAnc3MtdHJhc2gtYnRuJyApXG4gICAgICAgIEBvbkNsaWNrVG9nZ2xlU3RhdHVzKGV2ZW50KVxuICAgICAgICByZXR1cm5cblxuICAgICAgIyB0cmlnZ2VyIHRoZSBhIHRhZyBmb3IgdGhlIGxpbmtzIGluc2lkZSB0aGUgcG9zdCBtYW51YWxseVxuICAgICAgaHJlZiA9ICR0YXJnZXQuYXR0ciggJ2hyZWYnIClcblxuICAgICAgdGFyZ2V0QXR0ciA9ICR0YXJnZXQuYXR0ciggJ3RhcmdldCcgKVxuICAgICAgaWYgbm90IHRhcmdldEF0dHI/XG4gICAgICAgIHRhcmdldEF0dHIgPSAnJ1xuXG4gICAgICAjIG9wZW4gdGhlIGxpbmsgaW4gYSBuZXcgdGFiXG4gICAgICB3aW5kb3cub3BlbiBocmVmLCB0YXJnZXRBdHRyXG5cbiAgICBvblRhcDogKCBldmVudCApID0+XG5cbiAgICAgICR0YXJnZXQgPSAkKCBldmVudC50YXJnZXQgKVxuICAgICAgJGN1cnJlbnRUYXJnZXQgPSAkKCBldmVudC5jdXJyZW50VGFyZ2V0IClcblxuICAgICAgIyBjaGVjayBpZiB0aGUgdGFyZ2V0IGlzIGFuIGEgdGFnIG9yIGlmIHRoZSBwYXJlbnQgaXMgYW4gYSB0YWdcbiAgICAgIGlmICR0YXJnZXQuaXMoICdhJyApIG9yICR0YXJnZXQucGFyZW50cyggJ2EnICkubGVuZ3RoID4gMFxuXG4gICAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAgICMgYmVmb3JlIGdvaW5nIGluc2lkZSB0aGUgc2V0dGltZW91dCBmdW5jdGlvbiwgaXQgd2lsbCBmaXJzdCB0cmlnZ2VyIGEgY2xpY2sgZXZlbnQgZm9yIHRoZSBhIHRhZ1xuICAgICAgICAgICMgd2hpY2ggYWRkcyB0aGUgJ2NsaWNrLWZpcmVkJyBjbGFzc1xuICAgICAgICAgICMgc28gd2UgY2hlY2sgaWYgdGhlIGEgdGFnIGhhcyB0aGF0IGNsYXNzIGFuZCBtYW51YWxseSB0cmlnZ2VyIHRoZSBjbGljayBldmVudFxuICAgICAgICAgIGlmIG5vdCAkdGFyZ2V0Lmhhc0NsYXNzKCAnY2xpY2stZmlyZWQnIClcbiAgICAgICAgICAgICR0YXJnZXQucmVtb3ZlQ2xhc3MoICdjbGljay1maXJlZCcgKS5jbGljaygpXG4gICAgICAgICwgMFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgICAjIGNoZWNrIGlmIHdlIGhhdmUgdGhlIHRhcCBjbGFzcyBpbiB0aGUgY3VycmVudCB0YXJnZXRcbiAgICAgIGhhc1RhcENsYXNzID0gJGN1cnJlbnRUYXJnZXQuaGFzQ2xhc3MoICd0YXAnIClcbiAgICAgICQoICcuc3MtcG9zdC50YXAnICkucmVtb3ZlQ2xhc3MoICd0YXAnIClcbiAgICAgICRjdXJyZW50VGFyZ2V0LnRvZ2dsZUNsYXNzICd0YXAnLCBub3QgaGFzVGFwQ2xhc3NcblxuICAgIG9uQ2xpY2tUb2dnbGVTdGF0dXM6IChldmVudCkgPT5cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAjIFNldCBkZWZhdWx0IHN0YXR1c1xuICAgICAgc3RhdHVzID0gJ3B1Ymxpc2gnXG4gICAgICBpZiAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdzcy10cmFzaC1idG4nKVxuICAgICAgICBzdGF0dXMgPSAndHJhc2gnXG5cbiAgICAgIGN1cnJlbnRTdGF0dXMgPSBAbW9kZWwuZ2V0KCdzdGF0dXMnKVxuXG4gICAgICBpZiBjdXJyZW50U3RhdHVzIGlzIHN0YXR1c1xuXG4gICAgICAgIEBtb2RlbC5zZXRcbiAgICAgICAgICBzdGF0dXM6ICcnXG4gICAgICAgICxcbiAgICAgICAgICBzaWxlbnQ6IHRydWVcblxuICAgICAgICBAbW9kZWwuc2V0XG4gICAgICAgICAgc3RhdHVzOiBzdGF0dXNcblxuICAgICAgZWxzZVxuXG4gICAgICAgIEBtb2RlbC5zYXZlXG4gICAgICAgICAgc3RhdHVzOiBzdGF0dXNcblxuXG4gICAgb25Nb3VzZW92ZXI6IChldmVudCkgPT5cblxuICAgICAgaG92ZXIgPSBmYWxzZVxuICAgICAgaWYgZXZlbnQudHlwZSA9PSAnbW91c2VlbnRlcicgb3IgZXZlbnQudHlwZSA9PSAndGFwJ1xuICAgICAgICBob3ZlciA9IHRydWVcblxuICAgICAgQHRvZ2dsZUVsIEAkKCcuc3MtcG9zdC1tZWRpYScpLCBub3QgaG92ZXJcbiAgICAgIEB0b2dnbGVFbCBAJCgnLnNzLXBvc3QtYWN0aW9ucycpLCBob3ZlclxuXG4gICAgICBAJGVsLnRvZ2dsZUNsYXNzICdzcy1ob3ZlcicsIGhvdmVyXG5cbiAgICAgICMgY2hlY2sgaWYgaXQgaXMgbW9iaWxlIG9yIHRhYmxldFxuICAgICAgaWYgTW9kZXJuaXpyLnRvdWNoZXZlbnRzPyBhbmQgTW9kZXJuaXpyLnRvdWNoZXZlbnRzIGlzIHRydWVcbiAgICAgICAgQCRlbC5wYXJlbnQoKS50b2dnbGVDbGFzcyAndGFwJywgaG92ZXJcblxuXG4gICAgdG9nZ2xlRWw6ICgkZWwsIHRvZ2dsZSkgLT5cblxuICAgICAgY3NzU3RhcnQgPSB7fVxuICAgICAgYW5pbWF0ZSA9IHt9XG4gICAgICBjc3NFbmQgPSB7fVxuXG4gICAgICAjIGZhZGUgaW4vb3V0IGltYWdlXG4gICAgICBpZiB0b2dnbGVcblxuICAgICAgICBjc3NTdGFydCA9XG4gICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICAgIG9wYWNpdHk6IDBcblxuICAgICAgICBhbmltYXRlID1cbiAgICAgICAgICBvcGFjaXR5OiAxXG5cbiAgICAgIGVsc2VcblxuICAgICAgICBjc3NTdGFydCA9XG4gICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuXG4gICAgICAgIGFuaW1hdGUgPVxuICAgICAgICAgIG9wYWNpdHk6IDBcblxuICAgICAgICBjc3NFbmQgPVxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuXG4gICAgICAkZWxcbiAgICAgICAgLnN0b3AoMCwwKVxuICAgICAgICAuY3NzKCBjc3NTdGFydCApXG4gICAgICAgIC5hbmltYXRlIGFuaW1hdGUsIDIwMCwgLT5cbiAgICAgICAgICAkZWwuY3NzKCBjc3NFbmQgKVxuXG5cblxuICAgIG9uU3RhdHVzQ2hhbmdlOiAobW9kZWwsIHN0YXR1cykgPT5cblxuICAgICAgIyBnZXQgcHJldmlvdXMgc3RhdHVzXG4gICAgICBwcmV2U3RhdHVzID0gJ3B1Ymxpc2gnXG4gICAgICBpZiBAJGVsLmhhc0NsYXNzKCdzcy1zdGF0dXMtZHJhZnQnKVxuICAgICAgICBwcmV2U3RhdHVzID0gJ2RyYWZ0J1xuICAgICAgaWYgQCRlbC5oYXNDbGFzcygnc3Mtc3RhdHVzLXRyYXNoJylcbiAgICAgICAgcHJldlN0YXR1cyA9ICd0cmFzaCdcblxuICAgICAgZG9pbmdCYXRjaFNhdmUgPSBTU1Bvc3RzLnJlcXJlcy5yZXF1ZXN0ICdkb2luZ0JhdGNoU2F2ZSdcbiAgICAgIHVzZXJNZXRhID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAndXNlck1ldGEnXG5cbiAgICAgIG1lc3NhZ2UgPSAnJ1xuXG4gICAgICBzd2l0Y2ggcHJldlN0YXR1cyArICctJyArIHN0YXR1c1xuXG4gICAgICAgIHdoZW4gJ3B1Ymxpc2gtcHVibGlzaCdcblxuICAgICAgICAgIGlmIG5vdCBkb2luZ0JhdGNoU2F2ZVxuICAgICAgICAgICAgbW9kZXJhdGlvbiA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdtb2RlcmF0aW9uJ1xuICAgICAgICAgICAgaWYgbm90IG1vZGVyYXRpb25cbiAgICAgICAgICAgICAgaWYgbm90IHVzZXJNZXRhLmdldCgncHVibGlzaFBvcHVwJylcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCI8aDE+PGkgY2xhc3M9J3NzLWljb24tY2hlY2snPjwvaT48L2gxPjxoMz5UaGlzIHBvc3QgaXMgYWxyZWFkeSBhcHByb3ZlZC48L2gzPiA8YnIgLz4gVG8gdHVybiBBdXRvLUFwcHJvdmUgPHN0cm9uZz5PRkY8L3N0cm9uZz4gc2VlIHRoZSA8aT5hZHZhbmNlZCBzZXR0aW5nczwvaT4gPGkgY2xhc3M9J3NzLWljb24tY29nJz48L2k+XCJcbiAgICAgICAgICAgICAgICB1c2VyTWV0YS5zYXZlXG4gICAgICAgICAgICAgICAgICBwdWJsaXNoUG9wdXA6IHRydWVcblxuICAgICAgICB3aGVuICdwdWJsaXNoLXRyYXNoJywgJ2RyYWZ0LXRyYXNoJ1xuXG4gICAgICAgICAgaWYgbm90IGRvaW5nQmF0Y2hTYXZlIGFuZCBub3QgdXNlck1ldGEuZ2V0KCd0cmFzaFBvcHVwJylcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBcIjxoMT48aSBjbGFzcz0nc3MtaWNvbi10cmFzaC1vJz48L2k+PC9oMT48aDM+VGhpcyBwb3N0IGlzIHRyYXNoZWQhPC9oMz4gPGJyIC8+IDxoMz5UbyByZXNjdWUgdGhpcyBwb3N0IGNsaWNrIDxpPlZpZXcgVHJhc2g8L2k+IDxpIGNsYXNzPSdzcy1pY29uLXRyYXNoLW8nPjwvaT48L2gzPiA8YnIvPiBZb3Ugd2lsbCBub3Qgc2VlIHRoaXMgbWVzc2FnZSBhZ2Fpbi5cIlxuICAgICAgICAgICAgdXNlck1ldGEuc2F2ZVxuICAgICAgICAgICAgICB0cmFzaFBvcHVwOiB0cnVlXG5cbiAgICAgICAgICAjIHJlbW92ZSBpdGVtIGZyb20gbGlzdCAoZG8gYW5pbWF0aW9uKVxuICAgICAgICAgIEAkZWwuYWRkQ2xhc3MgJ3NzLXRyYXNoaW5nJ1xuXG4gICAgICAgICAgQCRlbC5mYWRlT3V0IDUwMCwgPT5cbiAgICAgICAgICAgIEByZW1vdmUoKVxuXG5cbiAgICAgICAgd2hlbiAnZHJhZnQtcHVibGlzaCdcblxuICAgICAgICAgIEByZW5kZXIoKVxuICAgICAgICAgIEAkZWwuYXR0cignY2xhc3MnLCBfLnJlc3VsdChALCAnY2xhc3NOYW1lJykpXG5cbiAgICAgICAgICBAJGVsLmFkZENsYXNzICdzcy1wdWJsaXNoaW5nJ1xuICAgICAgICAgIEAkKCcuc3MtcG9zdC1zcGFjZXInKS5mYWRlT3V0IDUwMCwgPT5cbiAgICAgICAgICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ3NzLXB1Ymxpc2hpbmcnXG4gICAgICAgICAgICBAJCgnLnNzLXBvc3Qtc3BhY2VyJykuc2hvdygpXG5cblxuICAgICAgICB3aGVuICd0cmFzaC1wdWJsaXNoJ1xuXG4gICAgICAgICAgIyByZW1vdmUgaXRlbSBmcm9tIGxpc3QgKGRvIGFuaW1hdGlvbilcbiAgICAgICAgICBAJGVsLmFkZENsYXNzICdzcy1wdWJsaXNoaW5nJ1xuICAgICAgICAgIEAkZWwuZmFkZU91dCA1MDAsID0+XG4gICAgICAgICAgICBAcmVtb3ZlKClcblxuICAgICAgICB3aGVuICd0cmFzaC10cmFzaCdcblxuICAgICAgICAgICMgZG8gbm90aGluZ1xuXG4gICAgICAgIGVsc2VcblxuICAgICAgICAgIEByZW5kZXIoKVxuICAgICAgICAgIEAkZWwuYXR0cignY2xhc3MnLCBfLnJlc3VsdChALCAnY2xhc3NOYW1lJykpXG5cblxuICAgICAgIyBJRiBNT0RFTCBJUyBQVUJMSVNIIE9SIFRSQVNIIEFMRVJUIChub3QgZHJhZnQpXG4gICAgICBpZiBtZXNzYWdlIGlzbnQgJycgYW5kIGFsZXJ0aWZ5P1xuICAgICAgICBhbGVydGlmeS5hbGVydCAnJywgbWVzc2FnZVxuXG4iLCIndXNlIHN0cmljdCdcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5yZXF1aXJlICcuL1Bvc3RJdGVtVmlldydcblxuQXBwLm1vZHVsZSAnU1NQb3N0cycsIChTU1Bvc3RzLCBBcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXG4gIGNsYXNzIFNTUG9zdHMuVmlld3MuUG9zdHNDb21wb3NpdGVWaWV3IGV4dGVuZHMgQXBwLlZpZXdzLkluZmluaXRlU2Nyb2xsQ29tcG9zaXRlVmlld1xuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUgJy4uL1RlbXBsYXRlcy9Qb3N0c0NvbXBvc2l0ZVZpZXdUZW1wbGF0ZSdcblxuICAgIGNsYXNzTmFtZTogLT5cbiAgICAgIGNsYXNzTmFtZSA9ICdzcy13cmFwcGVyJ1xuXG4gICAgICAjIGFkZCBjbGFzcyBpZiB0aGUgcG9zdHMgYXJlIGNvbWluZyBmcm9tIHRoZSBCVyBBUElcbiAgICAgIGlmIEBjb2xsZWN0aW9uPyBhbmQgQGNvbGxlY3Rpb24gaW5zdGFuY2VvZiBTU1Bvc3RzLkNvbGxlY3Rpb25zLkFwaVBvc3RzQ29sbGVjdGlvblxuICAgICAgICBjbGFzc05hbWUgKz0gJyBzcy1hcGktcG9zdHMnXG5cbiAgICAgICMgY2hlY2sgaWYgdGhlIG9wdGlvbnMgbW9kdWxlIHdhcyBsb2FkZWRcbiAgICAgIGlmIEFwcC5TU09wdGlvbnM/XG4gICAgICAgIHNzT3B0aW9ucyA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbnMnXG5cbiAgICAgICAgIyBjb25zb2xlLmxvZyBzc09wdGlvbnMudG9KU09OKClcblxuICAgICAgICBpZiBzc09wdGlvbnMuZ2V0KCd1c2VyX2Nhbl9tb2RlcmF0ZScpXG4gICAgICAgICAgY2xhc3NOYW1lICs9ICcgc3MtbW9kZXJhdGlvbidcblxuICAgICAgICBpZiBzc09wdGlvbnMuZ2V0KCdpc19hZG1pbicpXG4gICAgICAgICAgY2xhc3NOYW1lICs9ICcgc3MtaXMtYWRtaW4nXG5cbiAgICAgIGNsYXNzTmFtZVxuXG5cbiAgICBpdGVtVmlld0NvbnRhaW5lcjogJy5zcy1wb3N0cydcblxuICAgIGl0ZW1WaWV3OiBTU1Bvc3RzLlZpZXdzLlBvc3RJdGVtVmlld1xuXG4gICAgc2Nyb2xsQ29udGFpbmVyOiAnd2luZG93J1xuXG5cbiAgICBfZ2V0Q2hpbGRWaWV3RWxGcm9tTW9kZWw6IChtb2RlbCkgPT5cblxuICAgICAgQCQoQGl0ZW1WaWV3Q29udGFpbmVyKS5maW5kKCdbZGF0YS1pZD1cIicgKyBtb2RlbC5nZXQoJ29yZGVyX2lkJykgKyAnXCJdJylcblxuXG4gICAgaW5pdGlhbGl6ZTogPT5cblxuICAgICAgIyMjXG4gICAgICBMaXN0ZW4gZm9yIHdpZHRoIGNoYW5nZXMgdG8gcmVzZXQgdGhlIG51bWJlciBvZiBjb2x1bW5zXG4gICAgICAjIyNcbiAgICAgIEBsaXN0ZW5UbyBBcHAuSGVscGVycy5lbnYsICdjaGFuZ2U6d2lkdGgnLCBAb25DaGFuZ2VFbnZXaWR0aFxuICAgICAgQGxpc3RlblRvIEBtb2RlbCwgJ2NoYW5nZTp3aWR0aCcsIEBvbkNoYW5nZVdpZHRoXG5cbiAgICAgICMgY2FsbCB0aGUgcGFyZW50J3MgY29uc3RydWN0b3JcbiAgICAgIFNTUG9zdHMuVmlld3MuUG9zdHNDb21wb3NpdGVWaWV3Ll9fc3VwZXJfXy5pbml0aWFsaXplLmFwcGx5IEAsIGFyZ3VtZW50c1xuXG5cbiAgICBvblJlbmRlcjogPT5cbiAgICAgIEBvbkNoYW5nZUVudldpZHRoKClcbiAgICAgIEAkZWwuYXR0ciAnY2xhc3MnLCBfLnJlc3VsdChALCAnY2xhc3NOYW1lJylcblxuICAgICAgU1NQb3N0cy5WaWV3cy5Qb3N0c0NvbXBvc2l0ZVZpZXcuX19zdXBlcl9fLm9uUmVuZGVyLmFwcGx5IEAsIGFyZ3VtZW50c1xuXG5cbiAgICBvbkNoYW5nZUVudldpZHRoOiA9PlxuICAgICAgIyBjb25zb2xlLmxvZyAnb25DaGFuZ2VFbnZXaWR0aCdcblxuICAgICAgcGFyZW50V2lkdGggPSBudWxsXG4gICAgICBpZiBAJGVsPyBhbmQgQCRlbC5wYXJlbnQoKS5sZW5ndGggPiAwXG4gICAgICAgIHBhcmVudFdpZHRoID0gQCRlbC5wYXJlbnQoKS53aWR0aCgpXG5cbiAgICAgIGlmIG5vdCBwYXJlbnRXaWR0aD8gb3IgcGFyZW50V2lkdGggaXMgMFxuICAgICAgICBzZXRUaW1lb3V0IEBvbkNoYW5nZUVudldpZHRoLCAyMDBcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgICMgaWYgdGhlIHdpZHRoIGlzIHNldCwgcHJvY2VkZSB3aXRoIHRoZSBsYXlvdXQgY2hlY2tzXG4gICAgICBAbW9kZWwuc2V0ICd3aWR0aCcsIHBhcmVudFdpZHRoXG5cblxuICAgIG9uQ2hhbmdlV2lkdGg6ID0+XG5cbiAgICAgIGxheW91dCA9IEBtb2RlbC5nZXQoJ2xheW91dCcpXG5cbiAgICAgICMgY29uc29sZS5sb2cgJ29uQ2hhbmdlV2lkdGgnLCBsYXlvdXRcblxuICAgICAgaWYgbm90IGxheW91dD9cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGlmIG5vdCBAY3VycmVudExheW91dD9cbiAgICAgICAgQGN1cnJlbnRMYXlvdXQgPSAnJ1xuXG4gICAgICBpZiBsYXlvdXQgaXMgQGN1cnJlbnRMYXlvdXRcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIEBjdXJyZW50TGF5b3V0ID0gbGF5b3V0XG5cbiAgICAgICMgc2V0IGRhdGEgbGF5b3V0XG4gICAgICBAJGVsLmF0dHIgJ2RhdGEtbGF5b3V0JywgbGF5b3V0XG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxucmVxdWlyZSAnLi9TU1Bvc3RzJ1xuXG4jIE1vZGVsc1xucmVxdWlyZSAnLi9Nb2RlbHMvUG9zdE1vZGVsJ1xucmVxdWlyZSAnLi9Nb2RlbHMvUG9zdHNMYXlvdXRNb2RlbCdcblxuIyBDb2xsZWN0aW9uc1xucmVxdWlyZSAnLi9Db2xsZWN0aW9ucy9Qb3N0c0NvbGxlY3Rpb24nXG5yZXF1aXJlICcuL0NvbGxlY3Rpb25zL0FwaVBvc3RzQ29sbGVjdGlvbidcblxuIyBWaWV3c1xucmVxdWlyZSAnLi9WaWV3cy9Qb3N0SXRlbVZpZXcnXG5yZXF1aXJlICcuL1ZpZXdzL1Bvc3RzQ29tcG9zaXRlVmlldydcblxuIyBDb250cm9sbGVyc1xucmVxdWlyZSAnLi9Db250cm9sbGVycy9Qb3N0c0NvbnRyb2xsZXInXG5yZXF1aXJlICcuL0NvbnRyb2xsZXJzL0F1dG9SZWxvYWRDb250cm9sbGVyJ1xuXG5cbkFwcC5tb2R1bGUgJ1NTUG9zdHMnLCAoU1NQb3N0cywgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBTU1Bvc3RzLmFkZEluaXRpYWxpemVyIC0+XG5cbiAgICBwb3N0c0NvbnRyb2xsZXIgPSBuZXcgU1NQb3N0cy5Db250cm9sbGVycy5Qb3N0c0NvbnRyb2xsZXIoKVxuICAgIGF1dG9SZWxvYWRDb250cm9sbGVyID0gbmV3IFNTUG9zdHMuQ29udHJvbGxlcnMuQXV0b1JlbG9hZENvbnRyb2xsZXIoKVxuXG4gICAgIyMjXG4gICAgRGVmaW5lIE1vZHVsZSBBUElcbiAgICAjIyNcbiAgICBTU1Bvc3RzLnJlcXJlcy5zZXRIYW5kbGVyICdwb3N0c0NvbGxlY3Rpb24nLCBwb3N0c0NvbnRyb2xsZXIuZ2V0UG9zdHNDb2xsZWN0aW9uXG4gICAgU1NQb3N0cy5yZXFyZXMuc2V0SGFuZGxlciAnYXBpUG9zdHNDb2xsZWN0aW9uJywgcG9zdHNDb250cm9sbGVyLmdldEFwaVBvc3RzQ29sbGVjdGlvblxuICAgIFNTUG9zdHMucmVxcmVzLnNldEhhbmRsZXIgJ3Bvc3RzQ29tcG9zaXRlVmlldycsIHBvc3RzQ29udHJvbGxlci5nZXRQb3N0c0NvbXBvc2l0ZVZpZXdcbiAgICBTU1Bvc3RzLnJlcXJlcy5zZXRIYW5kbGVyICdhbGxQb3N0c0NvbGxlY3Rpb24nLCBwb3N0c0NvbnRyb2xsZXIuZ2V0QWxsUG9zdHNDb2xsZWN0aW9uXG5cbiAgICBTU1Bvc3RzLnJlcXJlcy5zZXRIYW5kbGVyICdkb2luZ0JhdGNoU2F2ZScsIHBvc3RzQ29udHJvbGxlci5kb2luZ0JhdGNoU2F2ZVxuICAgIFNTUG9zdHMuY29tbWFuZHMuc2V0SGFuZGxlciAnZG9pbmdCYXRjaFNhdmUnLCBwb3N0c0NvbnRyb2xsZXIuZG9pbmdCYXRjaFNhdmVcbiAgICBTU1Bvc3RzLmNvbW1hbmRzLnNldEhhbmRsZXIgJ2ZldGNoU2VydmVyUG9zdHMnLCBwb3N0c0NvbnRyb2xsZXIuZmV0Y2hTZXJ2ZXJQb3N0c1xuICAgIFNTUG9zdHMuY29tbWFuZHMuc2V0SGFuZGxlciAnZmV0Y2hBcGlQb3N0cycsIHBvc3RzQ29udHJvbGxlci5mZXRjaEFwaVBvc3RzXG4gICAgU1NQb3N0cy5jb21tYW5kcy5zZXRIYW5kbGVyICdwdWJsaXNoQXBpUG9zdHMnLCBwb3N0c0NvbnRyb2xsZXIucHVibGlzaEFwaVBvc3RzXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NTZWFyY2gnLCAoU1NTZWFyY2gsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgY2xhc3MgU1NTZWFyY2guQ29udHJvbGxlcnMuU2VhcmNoQ29udHJvbGxlciBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQ29udHJvbGxlclxuXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICBTU1NlYXJjaC5vbiAnc3RhcnQnLCBAb25TdGFydFxuXG5cbiAgICBvblN0YXJ0OiA9PlxuXG4gICAgICAjIGNoZWNrIGlmIHRoZSBoZWFkZXIgcmVnaW9uIGlzIGluIHRoZSBkb21cbiAgICAgIGlmICQoJy5zcy1zZWFyY2gtcmVnaW9uJykubGVuZ3RoID4gMFxuXG4gICAgICAgIEFwcC5hZGRSZWdpb25zXG4gICAgICAgICAgc2VhcmNoOiAnLnNzLXNlYXJjaC1yZWdpb24nXG5cbiAgICAgICAgQXBwLnNlYXJjaC5zaG93IEBnZXRTZWFyY2hWaWV3KClcblxuXG4gICAgZ2V0U2VhcmNoTW9kZWw6ID0+XG5cbiAgICAgIGlmIG5vdCBAc2VhcmNoTW9kZWw/XG5cbiAgICAgICAgQHNlYXJjaE1vZGVsID0gbmV3IFNTU2VhcmNoLk1vZGVscy5TZWFyY2hNb2RlbFxuICAgICAgICAgIGlkOiAnc29jaWFsc3RyZWFtc19zZWFyY2gnXG5cbiAgICAgICAgQHNlYXJjaE1vZGVsLmZldGNoKClcblxuICAgICAgQHNlYXJjaE1vZGVsXG5cblxuXG4gICAgZ2V0U2VhcmNoVmlldzogPT5cblxuICAgICAgaWYgbm90IEBzZWFyY2hWaWV3P1xuXG4gICAgICAgIEBzZWFyY2hWaWV3ID0gbmV3IFNTU2VhcmNoLlZpZXdzLlNlYXJjaEl0ZW1WaWV3XG4gICAgICAgICAgbW9kZWw6IEBnZXRTZWFyY2hNb2RlbCgpXG5cbiAgICAgIEBzZWFyY2hWaWV3XG5cblxuICAgIGdldFNlcnZpY2VzQ29sbGVjdGlvbjogPT5cblxuICAgICAgaWYgbm90IEBzZXJ2aWNlc0NvbGxlY3Rpb24/XG5cbiAgICAgICAgQHNlcnZpY2VzQ29sbGVjdGlvbiA9IG5ldyBTU1NlYXJjaC5Db2xsZWN0aW9ucy5TZXJ2aWNlc0NvbGxlY3Rpb25cblxuICAgICAgICAjIGZldGNoIGluaXRpYWwgcG9zdHMgZnJvbSBET01cbiAgICAgICAgQHNlcnZpY2VzQ29sbGVjdGlvbi5mZXRjaCgpXG5cbiAgICAgIEBzZXJ2aWNlc0NvbGxlY3Rpb25cblxuXG4gICAgZ2V0QWN0aW9uOiAoYWN0aW9uKSA9PlxuXG4gICAgICBAZ2V0U2VhcmNoTW9kZWwoKS5nZXQgJ2FjdGlvbidcblxuXG4gICAgc2V0QWN0aW9uOiAoYWN0aW9uKSA9PlxuXG4gICAgICBAZ2V0U2VhcmNoTW9kZWwoKS5zZXQgJ2FjdGlvbicsIGFjdGlvblxuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuXG5BcHAubW9kdWxlICdTU1NlYXJjaCcsIChTU1NlYXJjaCwgQXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICBjbGFzcyBTU1NlYXJjaC5Nb2RlbHMuU2VhcmNoTW9kZWwgZXh0ZW5kcyBBcHAuTW9kZWxzLldQT3B0aW9uTW9kZWxcblxuICAgIGRlZmF1bHRzOlxuXG4gICAgICBhY3Rpb246IC0+XG5cbiAgICAgICAgb3V0cHV0ID0gJydcblxuICAgICAgICBwb3N0c0NvbGxlY3Rpb24gPSBbXVxuICAgICAgICBpZiBBcHAuU1NQb3N0cz9cbiAgICAgICAgICBwb3N0c0NvbGxlY3Rpb24gPSBBcHAuU1NQb3N0cy5yZXFyZXMucmVxdWVzdCAncG9zdHNDb2xsZWN0aW9uJ1xuXG4gICAgICAgIGlmIHBvc3RzQ29sbGVjdGlvbi5sZW5ndGggPiAwXG4gICAgICAgICAgb3V0cHV0ID0gJ3ZpZXcnXG5cblxuICAgICAgcHVibGljX3BhZ2VfdXJsOiAtPlxuXG4gICAgICAgIHB1YmxpY19wYWdlX3VybCA9IG51bGxcblxuICAgICAgICBpZiBBcHAuU1NPcHRpb25zP1xuICAgICAgICAgIHB1YmxpY19wYWdlX3VybCA9IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdwdWJsaWNfcGFnZV91cmwnXG5cbiAgICAgICAgcHVibGljX3BhZ2VfdXJsXG5cblxuICAgICAgdGltZV90b19uZXh0X2Nyb246IC0+XG5cbiAgICAgICAgdGltZV90b19uZXh0X2Nyb24gPSAnJ1xuXG4gICAgICAgIGlmIEFwcC5TU09wdGlvbnM/XG4gICAgICAgICAgdGltZV90b19uZXh0X2Nyb24gPSBBcHAuU1NPcHRpb25zLnJlcXJlcy5yZXF1ZXN0ICdvcHRpb24nLCAndGltZV90b19uZXh0X2Nyb24nXG5cbiAgICAgICAgICBpZiB0aW1lX3RvX25leHRfY3Jvbj8gYW5kIHRpbWVfdG9fbmV4dF9jcm9uIGlzbnQgJydcbiAgICAgICAgICAgIHRpbWVfdG9fbmV4dF9jcm9uID0gbW9tZW50LnVuaXgoIHBhcnNlSW50KCB0aW1lX3RvX25leHRfY3JvbiwgMTAgKSApLmZyb20oMCx0cnVlKVxuXG4gICAgICAgIHRpbWVfdG9fbmV4dF9jcm9uXG5cblxuICAgICAgIyBnZXQgbGlzdCBvZiBzZXJ2aWNlc1xuICAgICAgc2VydmljZXM6IC0+XG4gICAgICAgIHNlcnZpY2VzID0gW11cblxuICAgICAgICBpZiBBcHAuU1NBdXRoP1xuICAgICAgICAgIEFwcC5TU0F1dGgucmVxcmVzLnJlcXVlc3QoJ3NlcnZpY2VzQ29sbGVjdGlvbicpLmVhY2ggKG1vZGVsKSAtPlxuXG4gICAgICAgICAgICBzZXJ2aWNlRGF0YSA9IG1vZGVsLnRvSlNPTigpXG5cbiAgICAgICAgICAgIHNlcnZpY2VEYXRhLnF1ZXJ5ID0gQGdldCggc2VydmljZURhdGEuaWQgKyAnUXVlcnknIClcbiAgICAgICAgICAgIHNlcnZpY2VEYXRhLnR5cGUgPSBAZ2V0KCBzZXJ2aWNlRGF0YS5pZCArICdUeXBlJyApXG5cbiAgICAgICAgICAgIF8uZWFjaCBzZXJ2aWNlRGF0YS50eXBlcywgKHR5cGUsIGluZGV4KSAtPlxuICAgICAgICAgICAgICBpZiB0eXBlLnZhbHVlIGlzIHNlcnZpY2VEYXRhLnR5cGVcbiAgICAgICAgICAgICAgICBzZXJ2aWNlRGF0YS50eXBlc1sgaW5kZXggXS5zZWxlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICwgQFxuXG4gICAgICAgICAgICBzZXJ2aWNlcy5wdXNoIHNlcnZpY2VEYXRhXG5cbiAgICAgICAgICAsIEBcblxuICAgICAgICBzZXJ2aWNlc1xuXG5cbiAgICB2YWxpZGF0ZTogKGF0dHJzLCBvcHRpb25zKSA9PlxuXG4gICAgICBlcnJvcnMgPSB7fVxuXG4gICAgICBzZXJ2aWNlcyA9IEBnZXQgJ3NlcnZpY2VzJ1xuXG4gICAgICBfLmVhY2ggc2VydmljZXMsIChzZXJ2aWNlKSAtPlxuXG4gICAgICAgICMgYnkgZGVmYXVsdCB0aGlzIHNlcnZpY2UgZG9lc24ndCBoYXZlIGVycm9yc1xuICAgICAgICBlcnJvciA9IGZhbHNlXG5cbiAgICAgICAgIyBmaW5kIGVycm9yc1xuICAgICAgICBpZiBhdHRyc1sgc2VydmljZS5pZCArICdUeXBlJyBdP1xuICAgICAgICAgIHN3aXRjaCBhdHRyc1sgc2VydmljZS5pZCArICdUeXBlJyBdXG4gICAgICAgICAgICB3aGVuICdnbG9iYWwnXG4gICAgICAgICAgICAgIGlmIG5vdCBhdHRyc1sgc2VydmljZS5pZCArICdRdWVyeScgXT8gb3IgYXR0cnNbIHNlcnZpY2UuaWQgKyAnUXVlcnknIF0gaXMgJydcbiAgICAgICAgICAgICAgICBlcnJvciA9IHRydWVcblxuICAgICAgICBlcnJvcnNbIHNlcnZpY2UuaWQgXSA9IGVycm9yXG5cblxuICAgICAgIyBjaGVjayBpZiB0aGVyZSBpcyBhdCBsZWFzdCBhIHZhbGlkIHNlYXJjaFxuICAgICAgdmFsaWRTZWFyY2hGb3VuZCA9IGZhbHNlXG4gICAgICBfLmVhY2ggZXJyb3JzLCAoZXJyb3IpIC0+XG4gICAgICAgIGlmIGVycm9yIGlzIGZhbHNlXG4gICAgICAgICAgdmFsaWRTZWFyY2hGb3VuZCA9IHRydWVcblxuXG4gICAgICAjIHJldHVybiBudWxsIGlmIG5vIGVycm9ycyB3ZXJlIGZvdW5kXG4gICAgICBpZiB2YWxpZFNlYXJjaEZvdW5kXG4gICAgICAgIGVycm9ycyA9IG51bGxcblxuICAgICAgZXJyb3JzXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuQXBwLm1vZHVsZSAnU1NTZWFyY2gnLCAoU1NTZWFyY2gsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgU1NTZWFyY2guQ29udHJvbGxlcnMgPSB7fVxuICBTU1NlYXJjaC5Nb2RlbHMgPSB7fVxuICBTU1NlYXJjaC5Db2xsZWN0aW9ucyA9IHt9XG4gIFNTU2VhcmNoLlZpZXdzID0ge31cbiAgU1NTZWFyY2guTGF5b3V0cyA9IHt9XG4gIFNTU2VhcmNoLlJvdXRlcnMgPSB7fVxuICBTU1NlYXJjaC5UZW1wbGF0ZXMgPSB7fVxuXG4gIFNTU2VhcmNoLnZlbnQgPSBuZXcgQmFja2JvbmUuV3JlcXIuRXZlbnRBZ2dyZWdhdG9yKClcbiAgU1NTZWFyY2guY29tbWFuZHMgPSBuZXcgQmFja2JvbmUuV3JlcXIuQ29tbWFuZHMoKVxuICBTU1NlYXJjaC5yZXFyZXMgPSBuZXcgQmFja2JvbmUuV3JlcXIuUmVxdWVzdFJlc3BvbnNlKClcblxuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHZhciBzdGFjazEsIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBidWZmZXIgPSBcIiAgPGRpdiBjbGFzcz1cXFwic3Mtc2VhcmNoLXNlcnZpY2Utd3JhcHBlciBcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmlkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJpZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGRhdGEtc2VhcmNoX3R5cGU9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudHlwZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudHlwZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ0eXBlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxuXFxuXCI7XG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5hdXRoZW50aWNhdGVkIDogZGVwdGgwKSwge1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDIsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMucHJvZ3JhbSg2LCBkYXRhKSxcImRhdGFcIjpkYXRhfSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIlxcbiAgPC9kaXY+XFxuXFxuICA8IS0tIE1PQklMRSAtLT5cXG5cIjtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmF1dGhlbnRpY2F0ZWQgOiBkZXB0aDApLCB7XCJuYW1lXCI6XCJpZlwiLFwiaGFzaFwiOnt9LFwiZm5cIjp0aGlzLnByb2dyYW0oOSwgZGF0YSksXCJpbnZlcnNlXCI6dGhpcy5ub29wLFwiZGF0YVwiOmRhdGF9KTtcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiICAgIDwvZGl2PjwhLS0gZW5kIE1PQklMRSAtLT5cXG4gIDwvZGl2PjwhLS0gLnNlYXJjaC1maWVsZHMgLS0+XFxuXFxuXCI7XG59LFwiMlwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIHN0YWNrMSwgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIGJ1ZmZlciA9IFwiXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJzcy1zZWFyY2gtYm94LWljb24gXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj48aSBjbGFzcz1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pY29uQ2xhc3MgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmljb25DbGFzcyA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJpY29uQ2xhc3NcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj48L2k+PC9zcGFuPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJzcy1zZWFyY2gtdHlwZSBzcy1zZWFyY2gtZmllbGRcXFwiPlxcbiAgICAgIDxzZWxlY3QgbmFtZT1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiVHlwZVxcXCIgZGF0YS1zZXJ2aWNlX3NlbGVjdD1cXFwidHdpdHRlclxcXCIgdGFiaW5kZXg9XFxcIjBcXFwiPlxcblwiO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50eXBlcyA6IGRlcHRoMCksIHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDMsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMubm9vcCxcImRhdGFcIjpkYXRhfSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIHJldHVybiBidWZmZXIgKyBcIiAgICAgIDwvc2VsZWN0PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwic3Mtc2VhcmNoLXF1ZXJ5IHNzLXNlYXJjaC1maWVsZFxcXCI+XFxuICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmlkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImlkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlF1ZXJ5XFxcIiBjbGFzcz1cXFwiaW5wdXQgc2VhcmNoLWJhciBcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmlkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJpZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCItc2VhcmNoIHNlbGVjdGl6ZWRcXFwiIHBsYWNlaG9sZGVyPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnBsYWNlaG9sZGVyIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5wbGFjZWhvbGRlciA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJwbGFjZWhvbGRlclwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIHRhYmluZGV4PVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRhYmluZGV4IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50YWJpbmRleCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ0YWJpbmRleFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIHZhbHVlPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnF1ZXJ5IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5xdWVyeSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJxdWVyeVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIC8+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8YSBocmVmPVxcXCJqYXZhc2NyaXB0OnZvaWQoMCk7XFxcIiBjbGFzcz1cXFwic3Mtc2VhcmNoLWJveC1yZW1vdmVcXFwiIGRhdGEtc2VydmljZT1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj48aSBjbGFzcz1cXFwic3MtaWNvbi1jbG9zZVxcXCI+PC9pPjwvYT5cXG5cXG4gICAgPGlucHV0IG5hbWU9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmlkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImlkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlVzZXJcXFwiIHR5cGU9XFxcImhpZGRlblxcXCIgdmFsdWU9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYndfYWNjb3VudF9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYndfYWNjb3VudF9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJid19hY2NvdW50X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxuXFxuXCI7XG59LFwiM1wiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIHN0YWNrMSwgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIGJ1ZmZlciA9IFwiICAgICAgICA8b3B0aW9uIHZhbHVlPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnZhbHVlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC52YWx1ZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ2YWx1ZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIFwiO1xuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2VsZWN0ZWQgOiBkZXB0aDApLCB7XCJuYW1lXCI6XCJpZlwiLFwiaGFzaFwiOnt9LFwiZm5cIjp0aGlzLnByb2dyYW0oNCwgZGF0YSksXCJpbnZlcnNlXCI6dGhpcy5ub29wLFwiZGF0YVwiOmRhdGF9KTtcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubGFiZWwgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmxhYmVsIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImxhYmVsXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvb3B0aW9uPlxcblwiO1xufSxcIjRcIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHJldHVybiBcInNlbGVjdGVkPVxcXCJzZWxlY3RlZFxcXCJcIjtcbiAgfSxcIjZcIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHZhciBzdGFjazEsIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBidWZmZXIgPSBcIlxcbiAgICA8YSBocmVmPVxcXCJqYXZhc2NyaXB0OnZvaWQoMCk7XFxcIiBjbGFzcz1cXFwic3Mtc29jaWFsLWF1dGgtYm94XFxcIiBkYXRhLXNlcnZpY2U9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmlkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImlkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInNzLXNvY2lhbC1hdXRoLWJveC1pY29uXFxcIj48aSBjbGFzcz1cXFwiXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pY29uQ2xhc3MgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmljb25DbGFzcyA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJpY29uQ2xhc3NcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj48L2k+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJzcy1zb2NpYWwtYXV0aC1ib3gtdGV4dFxcXCI+K0FkZCBcIjtcbiAgc3RhY2sxID0gKChoZWxwZXJzLnRvVGl0bGVDYXNlIHx8IChkZXB0aDAgJiYgZGVwdGgwLnRvVGl0bGVDYXNlKSB8fCBoZWxwZXJNaXNzaW5nKS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmlkIDogZGVwdGgwKSwge1wibmFtZVwiOlwidG9UaXRsZUNhc2VcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDcsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMubm9vcCxcImRhdGFcIjpkYXRhfSkpO1xuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICByZXR1cm4gYnVmZmVyICsgXCI8L3NwYW4+XFxuICAgIDwvYT5cXG5cXG5cIjtcbn0sXCI3XCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICByZXR1cm4gXCJcIjtcbn0sXCI5XCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgc3RhY2sxLCBoZWxwZXIsIGZ1bmN0aW9uVHlwZT1cImZ1bmN0aW9uXCIsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgYnVmZmVyID0gXCIgICAgPGRpdiBjbGFzcz1cXFwic3Mtc2VhcmNoLW1vYmlsZS13cmFwcGVyXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwic3Mtc2VhcmNoLWJveC1pY29uIFwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmlkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImlkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PGkgY2xhc3M9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaWNvbkNsYXNzIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pY29uQ2xhc3MgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiaWNvbkNsYXNzXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PC9pPjwvc3Bhbj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzcy1tb2JpbGUtc2VhcmNoLWJveFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcy1tb2JpbGUtcXVlcnlcXFwiPlxcblwiO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5leHBsb2RlUXVlcnkgOiBkZXB0aDApLCB7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOnRoaXMucHJvZ3JhbSgxMCwgZGF0YSksXCJpbnZlcnNlXCI6dGhpcy5ub29wLFwiZGF0YVwiOmRhdGF9KTtcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cIjtcbn0sXCIxMFwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIGxhbWJkYT10aGlzLmxhbWJkYSwgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XG4gIHJldHVybiBcIiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzcy1tb2JpbGUtcXVlcnktdGVybVxcXCI+XCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24obGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9zcGFuPlxcblwiO1xufSxcIjEyXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgc3RhY2sxLCBoZWxwZXIsIGZ1bmN0aW9uVHlwZT1cImZ1bmN0aW9uXCIsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgYnVmZmVyID0gXCIgICAgPGRpdiBjbGFzcz1cXFwidmlldy1zdHJlYW0tYWN0aW9uc1xcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInNzLXNlYXJjaC1hY3Rpb24tdGV4dFxcXCI+IFlvdXIgc3RyZWFtIGlzIG5vdyBsaXZlLiBDaGVjayBpdCBvdXQuIDwvc3Bhbj5cXG4gICAgICA8YSBocmVmPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnB1YmxpY19wYWdlX3VybCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucHVibGljX3BhZ2VfdXJsIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInB1YmxpY19wYWdlX3VybFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWluZm8gc2VlLXlvdXItc3RyZWFtLWJ0biBidG4tbGdcXFwiPlNFRSBZT1VSIFNUUkVBTTwvYT5cXG5cXG5cIjtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpbWVfdG9fbmV4dF9jcm9uIDogZGVwdGgwKSwge1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDEzLCBkYXRhKSxcImludmVyc2VcIjp0aGlzLm5vb3AsXCJkYXRhXCI6ZGF0YX0pO1xuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICByZXR1cm4gYnVmZmVyICsgXCIgICAgPC9kaXY+PCEtLSAudmlldy1zdHJlYW0tYWN0aW9ucyAtLT5cXG5cIjtcbn0sXCIxM1wiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xuICByZXR1cm4gXCIgICAgICA8cD5OZXcgY29udGVudCB3aWxsIGJlIGxvYWRlZCBldmVyeSAxNSBtaW51dGVzICg8c3BhbiBjbGFzcz1cXFwidGltZS10by1jcm9uXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpbWVfdG9fbmV4dF9jcm9uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aW1lX3RvX25leHRfY3JvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ0aW1lX3RvX25leHRfY3JvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+IHRvIGdvKS4gTmVlZCBtb3JlIGZyZXF1ZW50IHVwZGF0ZXM/IDxhIGhyZWY9XFxcImh0dHA6Ly9zb2NpYWxzdHJlYW1zLmNvbS9nZXQtcHJvL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPmdvIHByZW1pdW0gJnJhcXVvPC9hPjwvcD5cXG5cIjtcbn0sXCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIHN0YWNrMSwgYnVmZmVyID0gXCI8ZGl2IGNsYXNzPVxcXCJzcy1zZWFyY2gtZmllbGRzXFxcIj5cXG5cXG5cIjtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2VydmljZXMgOiBkZXB0aDApLCB7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOnRoaXMucHJvZ3JhbSgxLCBkYXRhKSxcImludmVyc2VcIjp0aGlzLm5vb3AsXCJkYXRhXCI6ZGF0YX0pO1xuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICBidWZmZXIgKz0gXCJcXG5cXG48c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCI+PC9zcGFuPlxcblxcbjxkaXYgY2xhc3M9XFxcInNzLXN0aWNreS1iYXIgc3Mtc2VhcmNoLWFjdGlvbnNcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwic3Mtc2VhcmNoLWFjdGlvbnMtaW5uZXJcXFwiPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwdWJsaXNoLXN0cmVhbS1hY3Rpb25zXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwic3Mtc2VhcmNoLWFjdGlvbi10ZXh0XFxcIj4gVGhpcyBpcyBqdXN0IGEgcHJldmlldy4gQ2xpY2sgUHVibGlzaCB0byBzYXZlIGNoYW5nZXMuIDwvc3Bhbj5cXG4gICAgICA8YSBocmVmPVxcXCJqYXZhc2NyaXB0OnZvaWQoMCk7XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zdWNjZXNzIHB1Ymxpc2gtc3RyZWFtLWJ0biBidG4tbGdcXFwiPlBVQkxJU0g8L2E+XFxuICAgIDwvZGl2PjwhLS0gLnB1Ymxpc2gtc3RyZWFtIC0tPlxcblxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cXFwic3Mtc2VhcmNoLWFjdGlvbnMgbm9uLXN0aWNreVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJzcy1zZWFyY2gtYWN0aW9ucy1pbm5lclxcXCI+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInNlYXJjaC1zdHJlYW0tYWN0aW9uc1xcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInNzLXNlYXJjaC1hY3Rpb24tdGV4dFxcXCI+IENsaWNrIHRvIHByZXZpZXcgeW91ciBzZWFyY2guIDwvc3Bhbj5cXG4gICAgICA8aW5wdXQgdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1pbmZvIHNlYXJjaC1idG4gYnRuLWxnXFxcIiB0YWJpbmRleD1cXFwiM1xcXCIgdmFsdWU9XFxcIlBSRVZJRVdcXFwiIC8+XFxuICAgIDwvZGl2PjwhLS0gLnNlYXJjaC1zdHJlYW0gLS0+XFxuXFxuXCI7XG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5wdWJsaWNfcGFnZV91cmwgOiBkZXB0aDApLCB7XCJuYW1lXCI6XCJpZlwiLFwiaGFzaFwiOnt9LFwiZm5cIjp0aGlzLnByb2dyYW0oMTIsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMubm9vcCxcImRhdGFcIjpkYXRhfSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIHJldHVybiBidWZmZXIgKyBcIlxcbiAgPC9kaXY+PCEtLSAuc3Mtc2VhcmNoLWFjdGlvbnMtaW5uZXIgLS0+XFxuPC9kaXY+PCEtLSAuc3Mtc2VhcmNoLWFjdGlvbnMgLS0+XFxuXCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwID0gcmVxdWlyZSAnYXBwJ1xuYWxlcnRpZnkgPSByZXF1aXJlICdhbGVydGlmeSdcblxuQXBwLm1vZHVsZSAnU1NTZWFyY2gnLCAoU1NTZWFyY2gsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgY2xhc3MgU1NTZWFyY2guVmlld3MuU2VhcmNoSXRlbVZpZXcgZXh0ZW5kcyBBcHAuVmlld3MuQmFzZUl0ZW1WaWV3XG5cbiAgICB0YWdOYW1lOiAnZm9ybSdcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi4vVGVtcGxhdGVzL1NlYXJjaEl0ZW1WaWV3VGVtcGxhdGUnKVxuXG4gICAgZXZlbnRzOlxuICAgICAgJ3N1Ym1pdCc6ICdvblN1Ym1pdCdcbiAgICAgICdjaGFuZ2Ugc2VsZWN0JzogJ29uQ2hhbmdlJ1xuICAgICAgJ2NsaWNrIC5wdWJsaXNoLXN0cmVhbS1idG4nOiAnb25QdWJsaXNoJ1xuICAgICAgJ2NsaWNrIC5zcy1zb2NpYWwtYXV0aC1ib3gnOiAnbG9naW4nXG4gICAgICAnY2xpY2sgLnNzLXNlYXJjaC1ib3gtcmVtb3ZlJzogJ2xvZ291dCdcblxuXG4gICAgY2xhc3NOYW1lOiAtPlxuICAgICAgYWN0aW9uID0gIEBtb2RlbC5nZXQoJ2FjdGlvbicpXG4gICAgICBpZiBub3QgYWN0aW9uPyBvciBhY3Rpb24gaXMgJydcbiAgICAgICAgYWN0aW9uID0gJ25vbmUnXG5cbiAgICAgICdzcy1zZWFyY2ggc3Mtc2VhcmNoLWFjdGlvbi0nICsgYWN0aW9uXG5cblxuICAgIGF0dHJpYnV0ZXM6IC0+XG4gICAgICBhY3Rpb246IEFwcC5TU09wdGlvbnMucmVxcmVzLnJlcXVlc3QgJ29wdGlvbicsICdzc19hcGlfdXJsJ1xuXG5cbiAgICBpbml0aWFsaXplOiA9PlxuXG4gICAgICBAbGlzdGVuVG8gQG1vZGVsLCAnY2hhbmdlOmFjdGlvbicsIEBvbkNoYW5nZUFjdGlvblxuICAgICAgQGxpc3RlblRvIEBtb2RlbCwgJ2NoYW5nZTpzZWFyY2gnLCBAb25DaGFuZ2VTZWFyY2hcbiAgICAgIEBsaXN0ZW5UbyBAbW9kZWwsICdpbnZhbGlkJywgQG9uVmFsaWRhdGlvbkVycm9yXG5cblxuICAgIG9uQ2hhbmdlQWN0aW9uOiA9PlxuXG4gICAgICAjIHJlLWV2YWx1YXRlIGVsZW1lbnQgY2xhc3NcbiAgICAgIEAkZWwuYXR0ciAnY2xhc3MnLCBfLnJlc3VsdCggQCwgJ2NsYXNzTmFtZScgKVxuXG4gICAgICAjIHVuc2V0IGxvYWRpbmcgY2xhc3NcbiAgICAgIEB0b2dnbGVMb2FkaW5nQ2xhc3MgJy5zZWFyY2gtYnRuLCAucHVibGlzaC1zdHJlYW0tYnRuJywgZmFsc2VcblxuXG5cbiAgICBvblJlbmRlcjogLT5cblxuICAgICAgI1xuICAgICAgIyBUdXJuIHNlYXJjaCBmaWVsZHMgaW50byBzZWxlY3RpemUgZmllbGRzXG4gICAgICAjXG4gICAgICAjIFR3aXR0ZXJcbiAgICAgICNcbiAgICAgIEAkKCcudHdpdHRlciAuc3Mtc2VhcmNoLXF1ZXJ5IGlucHV0Jykuc2VsZWN0aXplXG4gICAgICAgIHBsdWdpbnM6IFsncmVzdG9yZV9vbl9iYWNrc3BhY2UnLCdzZWxlY3RpemUtdGFiLXNlcGFyYXRvcicsICdzZWxlY3RpemUtYmxhY2tsaXN0ZWQtY2hhcnMnXVxuICAgICAgICBibGFja2xpc3RlZENoYXJzOiBbXVxuICAgICAgICB0YWJUcmlnZ2VyczogWzMyLCAxODhdXG4gICAgICAgIGRlbGltaXRlcjogJyBPUiAnXG4gICAgICAgIG1heEl0ZW1zOiAzXG4gICAgICAgIGNyZWF0ZU9uQmx1cjogdHJ1ZVxuICAgICAgICBsYWJlbEZpZWxkOiBcInF1ZXJ5XCJcbiAgICAgICAgdmFsdWVGaWVsZDogXCJxdWVyeVwiXG4gICAgICAgIHNvcnRGaWVsZDogJ3F1ZXJ5J1xuICAgICAgICBzZWFyY2hGaWVsZDogJ3F1ZXJ5J1xuICAgICAgICBjcmVhdGU6IHRydWVcbiAgICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgICAgb25DaGFuZ2U6IEBvbkNoYW5nZVxuXG5cbiAgICAgICNcbiAgICAgICMgSW5zdGFncmFtXG4gICAgICAjXG4gICAgICBAJCgnLmluc3RhZ3JhbSAuc3Mtc2VhcmNoLXF1ZXJ5IGlucHV0Jykuc2VsZWN0aXplXG4gICAgICAgIHBsdWdpbnM6IFsncmVzdG9yZV9vbl9iYWNrc3BhY2UnLCdzZWxlY3RpemUtdGFiLXNlcGFyYXRvcicsICdzZWxlY3RpemUtYmxhY2tsaXN0ZWQtY2hhcnMnXVxuICAgICAgICBibGFja2xpc3RlZENoYXJzOiBbJ0AnXVxuICAgICAgICB0YWJUcmlnZ2VyczogWzMyLCAxODhdXG4gICAgICAgIGRlbGltaXRlcjogJywnXG4gICAgICAgIG1heEl0ZW1zOiAxXG4gICAgICAgIGNyZWF0ZU9uQmx1cjogdHJ1ZVxuICAgICAgICBsYWJlbEZpZWxkOiBcInF1ZXJ5XCJcbiAgICAgICAgdmFsdWVGaWVsZDogXCJxdWVyeVwiXG4gICAgICAgIHNvcnRGaWVsZDogJ3F1ZXJ5J1xuICAgICAgICBzZWFyY2hGaWVsZDogJ3F1ZXJ5J1xuICAgICAgICBjcmVhdGU6IHRydWVcbiAgICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICAgICAgb25DaGFuZ2U6IEBvbkNoYW5nZVxuXG5cbiAgICAgICNIYWNrIHNlbGVjdGl6ZSB0byBkaXNwbGF5IHRhZ3Mgb24gc2luZ2xlIHNlYXJjaCBmaWVsZFxuICAgICAgaW5zdGFIYWNrID0gQCQoJy5pbnN0YWdyYW0gLnNzLXNlYXJjaC1xdWVyeSBpbnB1dCwgLnNlbGVjdGl6ZS1jb250cm9sJylcbiAgICAgIGluc3RhSGFjay5yZW1vdmVDbGFzcyAnc2luZ2xlJ1xuICAgICAgaW5zdGFIYWNrLmFkZENsYXNzICdtdWx0aSdcblxuXG4gICAgICAjIGNvbnNvbGUubG9nIEAkKCcuc2VsZWN0aXplLWlucHV0Lm5vdC1mdWxsJylbMF1cbiAgICAgICMgc2V0IGluaXRpYWwgd2lkdGggZm9yIG5vbi1lbXB0eSBmaWVsZHNcbiAgICAgIEAkKCcuc2VsZWN0aXplLWlucHV0Lml0ZW1zOm5vdCguaGFzLWl0ZW1zKSBpbnB1dCcpLmNzc1xuICAgICAgICB3aWR0aDogJzEwMCUnXG5cbiAgICAgICMgaW5pdGlhbGl6ZSBjdXN0b20gc2VsZWN0XG4gICAgICBAJCgnc2VsZWN0JykuY3VzdG9tU2VsZWN0KClcblxuICAgICAgIyBpbml0aWFsaXplIHN0aWNreSBiYXJzXG4gICAgICBAJCgnLnNzLXN0aWNreS1iYXInKS5zdGlja3lcbiAgICAgICAgdG9wU3BhY2luZzogMzJcblxuXG4gICAgZ2V0VmFsdWVzOiA9PlxuXG4gICAgICBkYXRhID0ge31cblxuICAgICAgQCQoJ1tuYW1lXScpLmVhY2ggKGluZGV4LCBpbnB1dCkgLT5cblxuICAgICAgICBuYW1lID0gJChpbnB1dCkuYXR0cignbmFtZScpXG5cbiAgICAgICAgaWYgJChpbnB1dCkuaXMoJ3NlbGVjdCcpXG4gICAgICAgICAgdmFsdWUgPSAkKGlucHV0KS52YWwoKVxuXG4gICAgICAgIGVsc2UgaWYgJChpbnB1dCkuaXMoJ2lucHV0JylcbiAgICAgICAgICB2YWx1ZSA9ICQoaW5wdXQpLnZhbCgpXG5cbiAgICAgICAgZGF0YVtuYW1lXSA9IHZhbHVlXG5cbiAgICAgIGRhdGFcblxuXG4gICAgb25DaGFuZ2U6IChldmVudCkgPT5cblxuICAgICAgIyBzZXQgdGhlIGFjdGlvbiBiYWNrIHRvICdzZWFyY2gnXG4gICAgICBAbW9kZWwuc2V0XG4gICAgICAgIGFjdGlvbjogJ3NlYXJjaCdcblxuICAgICAgIyBVcGRhdGUgdGhlIHNlYXJjaCB0eXBlIGRhdGEgYXR0cmlidXRlc1xuICAgICAgdmFsdWVzID0gQGdldFZhbHVlcygpXG4gICAgICBfLmVhY2ggQG1vZGVsLmdldCgnc2VydmljZXMnKSwgKHNlcnZpY2UpIC0+XG5cbiAgICAgICAgc2VhcmNoVHlwZSA9ICcnXG4gICAgICAgIGlmIHZhbHVlc1sgc2VydmljZS5pZCArICdUeXBlJyBdP1xuICAgICAgICAgIHNlYXJjaFR5cGUgPSB2YWx1ZXNbIHNlcnZpY2UuaWQgKyAnVHlwZScgXVxuXG4gICAgICAgIEAkKCcuc3Mtc2VhcmNoLXNlcnZpY2Utd3JhcHBlci4nICsgc2VydmljZS5pZCkuYXR0ciAnZGF0YS1zZWFyY2hfdHlwZScsIHNlYXJjaFR5cGVcblxuICAgICAgLCBAXG5cblxuICAgIG9uU3VibWl0OiAoZXZlbnQpID0+XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgaWYgQGxvYWRpbmc/IGFuZCBAbG9hZGluZyBpcyB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgICAjIGNsZWFyIGFsbCB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAgQCQoJy5zcy1lcnJvcicpLnJlbW92ZUNsYXNzICdzcy1lcnJvcidcblxuICAgICAgdmFsdWVzID0gQGdldFZhbHVlcygpXG5cbiAgICAgICMgZm9yY2Utc2V0IHRoZSBzZWFyY2ggZmxhZ1xuICAgICAgdmFsdWVzLnNlYXJjaCA9IHRydWVcbiAgICAgIEBtb2RlbC5zZXRcbiAgICAgICAgc2VhcmNoOiBmYWxzZVxuICAgICAgLFxuICAgICAgICBzaWxlbnQ6IHRydWVcblxuXG4gICAgICBAbW9kZWwuc2V0IHZhbHVlcyxcbiAgICAgICAgdmFsaWRhdGU6IHRydWVcblxuXG4gICAgICAjIHJlc2V0IHRyYXNoIHRvZ2dsZSBpbiB0aGUgaGVhZGVyIGlmIHNldFxuICAgICAgaWYgQXBwLlNTQWRtaW4/XG4gICAgICAgIEFwcC5TU0FkbWluLmNvbW1hbmRzLmV4ZWN1dGUgJ3Jlc2V0VHJhc2hUb2dnbGUnXG5cbiAgICAgICMgIyBNSVhQQU5FTCBUUkFDS1xuICAgICAgIyBpZiB3aW5kb3cubWl4cGFuZWw/XG4gICAgICAjICAgd2luZG93Lm1peHBhbmVsLnRyYWNrIFwiU2VhcmNoXCIsXG4gICAgICAjICAgICBcIkluc3RhZ3JhbSBUeXBlXCI6IHZhbHVlcy5pbnN0YWdyYW1UeXBlXG4gICAgICAjICAgICBcIkluc3RhZ3JhbSBTZWFyY2hcIjogdmFsdWVzLmluc3RhZ3JhbVF1ZXJ5XG4gICAgICAjICAgICBcIkluc3RhZ3JhbSBVc2VyXCI6IHZhbHVlcy5pbnN0YWdyYW1Vc2VyXG4gICAgICAjICAgICBcIlR3aXR0ZXIgVHlwZVwiOiB2YWx1ZXMudHdpdHRlclR5cGVcbiAgICAgICMgICAgIFwiVHdpdHRlciBTZWFyY2hcIjogdmFsdWVzLnR3aXR0ZXJRdWVyeVxuICAgICAgIyAgICAgXCJUd2l0dGVyIFVzZXJcIjogdmFsdWVzLnR3aXR0ZXJVc2VyXG5cblxuXG4gICAgICAjICAgd2luZG93Lm1peHBhbmVsLnBlb3BsZS5zZXQoXG4gICAgICAjICAgICBcIkluc3RhZ3JhbSBVc2VyXCI6IHZhbHVlcy5pbnN0YWdyYW1Vc2VyXG4gICAgICAjICAgICBcIlR3aXR0ZXIgVXNlclwiOiB2YWx1ZXMudHdpdHRlclVzZXJcbiAgICAgICMgICApXG5cbiAgICAgIGZhbHNlXG5cblxuXG4gICAgb25DaGFuZ2VTZWFyY2g6IChtb2RlbCkgPT5cblxuICAgICAgaWYgbm90IEFwcC5TU1Bvc3RzP1xuICAgICAgICByZXR1cm5cblxuICAgICAgIyBzZXQgbG9hZGluZyBjbGFzc1xuICAgICAgQHRvZ2dsZUxvYWRpbmdDbGFzcyAnLnNlYXJjaC1idG4nLCB0cnVlXG5cbiAgICAgIEFwcC5TU1Bvc3RzLmNvbW1hbmRzLmV4ZWN1dGUgJ2ZldGNoQXBpUG9zdHMnLFxuICAgICAgICBzZWFyY2g6IEBnZXRWYWx1ZXMoKVxuICAgICAgLFxuICAgICAgICBzdWNjZXNzOiA9PlxuXG4gICAgICAgICAgQG1vZGVsLnNldFxuICAgICAgICAgICAgYWN0aW9uOiAncHVibGlzaCdcblxuXG4gICAgdG9nZ2xlTG9hZGluZ0NsYXNzOiAoZWwsIGxvYWRpbmcpID0+XG5cbiAgICAgICRlbCA9IEAkKGVsKVxuXG4gICAgICBpZiAkZWwubGVuZ3RoIGlzIDBcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGlmIG5vdCBsb2FkaW5nP1xuICAgICAgICBsb2FkaW5nID0gJGVsLmZpcnN0KCkuaGFzQ2xhc3MoJ2xvYWRpbmcnKVxuXG4gICAgICAjIHRvZ2dsZSBjbGFzc1xuICAgICAgJGVsLnRvZ2dsZUNsYXNzICdsb2FkaW5nJywgbG9hZGluZ1xuXG4gICAgICAjIHdlIGFsc28gc2V0IGEgbG9hZGluZyBmbGFnIHRvIHRoZSB2aWV3XG4gICAgICAjIHNvIHdlIGRvbid0IHJpc2sgdG8gc3VibWl0IG11bHRpcGxlIHRpbWVzXG4gICAgICBAbG9hZGluZyA9IGxvYWRpbmdcblxuICAgICAgJGVsLmVhY2ggKGluZGV4LCBlbGVtZW50KSAtPlxuXG4gICAgICAgICMgc2F2ZSBkYXRhIGF0dHJpYnV0ZSB3aXRoIHZhbHVlIGlmIG5vdCBhbHJlYWR5IHNldFxuICAgICAgICB0ZXh0ID0gJChlbGVtZW50KS5hdHRyICdkYXRhLXRleHQnXG5cbiAgICAgICAgaWYgbm90IHRleHQ/IG9yIHRleHQgaXMgJydcbiAgICAgICAgICBpZiAkKGVsZW1lbnQpLmlzKCdpbnB1dCcpXG4gICAgICAgICAgICB0ZXh0ID0gJChlbGVtZW50KS5hdHRyICd2YWx1ZSdcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB0ZXh0ID0gJChlbGVtZW50KS5odG1sKClcblxuICAgICAgICAgICQoZWxlbWVudCkuYXR0ciAnZGF0YS10ZXh0JywgdGV4dFxuXG5cbiAgICAgICAgaWYgbG9hZGluZ1xuXG4gICAgICAgICAgaWYgJChlbGVtZW50KS5pcygnaW5wdXQnKVxuICAgICAgICAgICAgJChlbGVtZW50KS5hdHRyICd2YWx1ZScsICdMb2FkaW5nLi4uJ1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRleHQgPSAkKGVsZW1lbnQpLmh0bWwgJ0xvYWRpbmcuLi4nXG5cbiAgICAgICAgZWxzZVxuXG4gICAgICAgICAgaWYgJChlbGVtZW50KS5pcygnaW5wdXQnKVxuICAgICAgICAgICAgJChlbGVtZW50KS5hdHRyICd2YWx1ZScsIHRleHRcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAkKGVsZW1lbnQpLmh0bWwgdGV4dFxuXG5cblxuXG5cbiAgICBvblB1Ymxpc2g6IChldmVudCkgPT5cblxuXG5cbiAgICAgICNcbiAgICAgICNTRVQgTUVTU0FHRSBGT1IgUFJPTVBUXG4gICAgICAjXG4gICAgICBtb2RlcmF0aW9uID0gQXBwLlNTT3B0aW9ucy5yZXFyZXMucmVxdWVzdCAnb3B0aW9uJywgJ21vZGVyYXRpb24nXG5cbiAgICAgIG1lc3NhZ2UgPSAnPGgxPjxpIGNsYXNzPVwic3MtaWNvbi13YXJuaW5nXCI+PC9pPjwvaDE+J1xuICAgICAgbWVzc2FnZSArPSAnPGgzPlB1Ymxpc2hpbmcgd2lsbCBtYWtlIGFsbCBhcHByb3ZlZCBwb3N0cyBwdWJsaWMuPC9oMz4nXG5cbiAgICAgIGlmIEBsZW5ndGggPCAxXG4gICAgICAgIG1lc3NhZ2UgPSAnPGgzPllvdSBkb25cXCd0IHNlZW0gdG8gaGF2ZSBhbnkgcG9zdHMgcmVhZHkgdG8gcHVibGlzaC48L2gzPidcblxuICAgICAgZWxzZSBpZiBtb2RlcmF0aW9uXG4gICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlICsgJzxwPkFsbCBmdXR1cmUgcG9zdHMgd2lsbCBuZWVkIHRvIGJlIG1vZGVyYXRlZCBiZWZvcmUgdGhleSBhcHBlYXIgb24geW91ciBTb2NpYWwgU3RyZWFtLiBDb25zaWRlciB0dXJuaW5nIEF1dG8tQXBwcm92ZSA8c3Ryb25nPk9OPC9zdHJvbmc+PC9wPidcblxuICAgICAgZWxzZSBpZiAhbW9kZXJhdGlvblxuICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSArICc8cD5BbGwgZnV0dXJlIHBvc3RzIHdpbGwgYmUgYXV0b21hdGljYWxseSBhZGRlZCB0byB5b3VyIFNvY2lhbCBTdHJlYW0uPC9wPidcblxuXG5cbiAgICAgICNcbiAgICAgICNESVNQTEFZIENPTkZJUk0gTUVTU0FHRVxuICAgICAgI1xuICAgICAgY29uZmlybUJveCA9IGFsZXJ0aWZ5LmNvbmZpcm0gJycsIG1lc3NhZ2VcbiAgICAgICwgPT5cbiAgICAgICAgQHB1Ymxpc2hTdHJlYW0oKVxuICAgICAgLCA9PlxuICAgICAgICBjb25maXJtQm94LmNsb3NlKClcblxuXG5cbiAgICBwdWJsaXNoU3RyZWFtOiA9PlxuXG4gICAgICBpZiBAbG9hZGluZz8gYW5kIEBsb2FkaW5nIGlzIHRydWVcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgICMgc2V0IGxvYWRpbmcgY2xhc3NcbiAgICAgIEB0b2dnbGVMb2FkaW5nQ2xhc3MgJy5wdWJsaXNoLXN0cmVhbS1idG4nLCB0cnVlXG5cbiAgICAgICMgIyBNSVhQQU5FTCBUUkFDS1xuICAgICAgIyBpZiB3aW5kb3cubWl4cGFuZWw/XG4gICAgICAjICAgd2luZG93Lm1peHBhbmVsLnRyYWNrIFwiUHVibGlzaFwiLFxuXG5cbiAgICAgIEFwcC5TU1Bvc3RzLmNvbW1hbmRzLmV4ZWN1dGUgJ3B1Ymxpc2hBcGlQb3N0cydcblxuICAgICAgQG1vZGVsLnNhdmUge30sXG4gICAgICAgIGJhdGNoOiB0cnVlXG4gICAgICAgIGJhdGNoU3VjY2VzczogPT5cblxuICAgICAgICAgICMgcmVsb2FkIHRoZSBwYWdlIGlmIHRoZSBwYWdlIGlzIG5vdCBkZWZpbmVkXG4gICAgICAgICAgcHVibGljX3BhZ2VfdXJsID0gQG1vZGVsLmdldCgncHVibGljX3BhZ2VfdXJsJylcbiAgICAgICAgICBpZiBub3QgcHVibGljX3BhZ2VfdXJsPyBvciBwdWJsaWNfcGFnZV91cmwgaXMgJydcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICBAbW9kZWwuc2V0XG4gICAgICAgICAgICBhY3Rpb246ICd2aWV3J1xuXG4gICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZVxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgLCA0MDAsICdlYXNpZUVhc2VJbk91dCdcblxuICAgICAgICAgIEFwcC5TU1Bvc3RzLmNvbW1hbmRzLmV4ZWN1dGUgJ2ZldGNoU2VydmVyUG9zdHMnLFxuICAgICAgICAgICAgc3RhdHVzOiBbJ3B1Ymxpc2gnLCAnZHJhZnQnXVxuXG5cblxuXG5cbiAgICBvblZhbGlkYXRpb25FcnJvcjogKG1vZGVsLCBlcnJvcnMpID0+XG5cbiAgICAgIGNvbnNvbGUubG9nICdvblZhbGlkYXRpb25FcnJvcidcblxuICAgICAgXy5lYWNoIGVycm9ycywgKGVycm9yLCBzZXJ2aWNlKSAtPlxuICAgICAgICBAJCgnLnNzLXNlYXJjaC1zZXJ2aWNlLXdyYXBwZXIuJyArIHNlcnZpY2UpLmFkZENsYXNzICdzcy1lcnJvcidcbiAgICAgICwgQFxuXG5cbiAgICBsb2dpbjogKGV2ZW50KSA9PlxuXG4gICAgICBpZiBub3QgQXBwLlNTQXV0aD9cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIEFwcC5TU0F1dGguY29tbWFuZHMuZXhlY3V0ZSAnbG9naW4nLCAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtc2VydmljZScpXG5cblxuXG4gICAgbG9nb3V0OiAoZXZlbnQpID0+XG5cbiAgICAgIGlmIG5vdCBBcHAuU1NBdXRoP1xuICAgICAgICByZXR1cm5cblxuICAgICAgc2VydmljZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnc2VydmljZScpXG5cbiAgICAgIGFsZXJ0aWZ5LmNvbmZpcm0gJycsJzxoMT48aSBjbGFzcz1cInNzLWljb24td2FybmluZ1wiPjwvaT48L2gxPjxoMz5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVtb3ZlIDxzcGFuIHN0eWxlPVwidGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTtcIj48c3Ryb25nPicgKyAgc2VydmljZSArICc8L3N0cm9uZz48L3NwYW4+IGZyb20geW91ciBTb2NpYWwgU3RyZWFtPzwvaDM+J1xuICAgICAgLCA9PlxuICAgICAgICBBcHAuU1NBdXRoLmNvbW1hbmRzLmV4ZWN1dGUgJ2xvZ291dCcsICQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1zZXJ2aWNlJylcbiAgICAgICwgPT5cblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxucmVxdWlyZSAnLi9TU1NlYXJjaCdcblxuIyBNb2RlbHNcbnJlcXVpcmUgJy4vTW9kZWxzL1NlYXJjaE1vZGVsJ1xuXG4jIFZpZXdzXG5yZXF1aXJlICcuL1ZpZXdzL1NlYXJjaEl0ZW1WaWV3J1xuXG4jIENvbnRyb2xsZXJzXG5yZXF1aXJlICcuL0NvbnRyb2xsZXJzL1NlYXJjaENvbnRyb2xsZXInXG5cblxuQXBwLm1vZHVsZSAnU1NTZWFyY2gnLCAoU1NTZWFyY2gsIEFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgU1NTZWFyY2guYWRkSW5pdGlhbGl6ZXIgLT5cblxuICAgIGNvbnRyb2xsZXIgPSBuZXcgU1NTZWFyY2guQ29udHJvbGxlcnMuU2VhcmNoQ29udHJvbGxlclxuXG4gICAgIyMjXG4gICAgRGVmaW5lIE1vZHVsZSBBUElcbiAgICAjIyNcbiAgICBTU1NlYXJjaC5jb21tYW5kcy5zZXRIYW5kbGVyICdzZXRBY3Rpb24nLCBjb250cm9sbGVyLnNldEFjdGlvblxuICAgIFNTU2VhcmNoLnJlcXJlcy5zZXRIYW5kbGVyICdhY3Rpb24nLCBjb250cm9sbGVyLmdldEFjdGlvblxuICAgIFNTU2VhcmNoLnJlcXJlcy5zZXRIYW5kbGVyICdzZWFyY2hNb2RlbCcsIGNvbnRyb2xsZXIuZ2V0U2VhcmNoTW9kZWxcbiIsIlwidXNlIHN0cmljdFwiXG5cbkFwcCAgICAgICAgPSByZXF1aXJlIFwiYXBwXCJcbkhhbmRsZWJhcnMgPSByZXF1aXJlIFwiaGJzZnkvcnVudGltZVwiXG5cblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlciAndG9UaXRsZUNhc2UnLCAoc3RyKSAtPlxuICBzdHIucmVwbGFjZSAvXFx3XFxTKi9nLCAodHh0KSAtPlxuICAgIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgICAgICA9IHJlcXVpcmUgXCJhcHBcIlxuQmFja2JvbmUgPSByZXF1aXJlIFwiYmFja2JvbmVcIlxuJCAgICAgICAgPSByZXF1aXJlIFwianF1ZXJ5XCJcblxuY2xhc3MgQXBwLlZpZXdzLkJhc2VDb21wb3NpdGVWaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3XG5cbiAgcmVuZGVyRnJvbURPTTogKGVsKSA9PlxuXG4gICAgaWYgbm90IGVsP1xuICAgICAgcmV0dXJuIEBcblxuICAgICMgYXNzaWduIGRvbSBlbGVtZW50IHRvIHZpZXdcbiAgICBpZiBlbCBpbnN0YW5jZW9mICRcbiAgICAgIGlmIGVsLmxlbmd0aCA+IDBcbiAgICAgICAgQGVsID0gZWxbMF1cbiAgICBlbHNlXG4gICAgICBAZWwgPSBlbFxuXG4gICAgaWYgbm90IEBlbD9cbiAgICAgIHJldHVybiBAXG5cbiAgICBAJGVsID0gJChlbClcblxuICAgIEBpc1JlbmRlcmVkID0gdHJ1ZVxuICAgIEBpc0Nsb3NlZCA9IGZhbHNlXG4gICAgQHJlc2V0SXRlbVZpZXdDb250YWluZXIoKVxuXG4gICAgQHRyaWdnZXJCZWZvcmVSZW5kZXIoKVxuXG4gICAgQGJpbmRVSUVsZW1lbnRzKClcbiAgICBAdHJpZ2dlck1ldGhvZChcImNvbXBvc2l0ZTptb2RlbDpyZW5kZXJlZFwiKVxuXG4gICAgQF9yZW5kZXJDaGlsZHJlbkZyb21ET00oKVxuXG4gICAgQHRyaWdnZXJNZXRob2QoXCJjb21wb3NpdGU6cmVuZGVyZWRcIilcbiAgICBAdHJpZ2dlclJlbmRlcmVkKClcblxuICAgIEBcblxuXG5cbiAgX3JlbmRlckNoaWxkcmVuRnJvbURPTTogPT5cblxuICAgIGlmIEBjb2xsZWN0aW9uLmxlbmd0aCA+IDBcblxuICAgICAgQGNvbGxlY3Rpb24uZWFjaCAobW9kZWwpIC0+XG5cbiAgICAgICAgZWwgPSBAX2dldENoaWxkVmlld0VsRnJvbU1vZGVsIG1vZGVsXG5cbiAgICAgICAgIyBhc3NpZ24gZG9tIGVsZW1lbnQgdG8gdmlld1xuICAgICAgICBpZiBlbD8gYW5kIGVsIGluc3RhbmNlb2YgJCBhbmQgZWwubGVuZ3RoID4gMFxuICAgICAgICAgIGVsID0gZWxbMF1cblxuICAgICAgICBpZiBub3QgZWw/XG4gICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgdmlldyA9IG5ldyB0aGlzLml0ZW1WaWV3XG4gICAgICAgICAgZWw6IGVsXG4gICAgICAgICAgbW9kZWw6IG1vZGVsXG5cbiAgICAgICAgIyBzZXQgdXAgdGhlIGNoaWxkIHZpZXcgZXZlbnQgZm9yd2FyZGluZ1xuICAgICAgICBAYWRkQ2hpbGRWaWV3RXZlbnRGb3J3YXJkaW5nIHZpZXdcblxuICAgICAgICAjIFN0b3JlIHRoZSBjaGlsZCB2aWV3IGl0c2VsZiBzbyB3ZSBjYW4gcHJvcGVybHlcbiAgICAgICAgIyByZW1vdmUgYW5kL29yIGNsb3NlIGl0IGxhdGVyXG4gICAgICAgIEBjaGlsZHJlbi5hZGQgdmlld1xuXG4gICAgICAgIHZpZXcudHJpZ2dlck1ldGhvZCAncmVuZGVyJ1xuXG4gICAgICAsIEBcblxuXG5cbiAgX2dldENoaWxkVmlld0VsRnJvbU1vZGVsOiAobW9kZWwpID0+XG5cbiAgICBAJChAaXRlbVZpZXdDb250YWluZXIpLmZpbmQoJ1tkYXRhLWlkPVwiJyArIG1vZGVsLmdldCgnaWQnKSArICdcIl0nKVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgICAgICA9IHJlcXVpcmUgXCJhcHBcIlxuQmFja2JvbmUgPSByZXF1aXJlIFwiYmFja2JvbmVcIlxuJCAgICAgICAgPSByZXF1aXJlIFwianF1ZXJ5XCJcblxuY2xhc3MgQXBwLlZpZXdzLkJhc2VJdGVtVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuSXRlbVZpZXdcblxuICByZW5kZXJGcm9tRE9NOiAoZWwpID0+XG5cbiAgICBpZiBub3QgZWw/XG4gICAgICByZXR1cm4gQFxuXG4gICAgIyBhc3NpZ24gZG9tIGVsZW1lbnQgdG8gdmlld1xuICAgIGlmIGVsIGluc3RhbmNlb2YgJFxuICAgICAgaWYgZWwubGVuZ3RoID4gMFxuICAgICAgICBAZWwgPSBlbFswXVxuICAgIGVsc2VcbiAgICAgIEBlbCA9IGVsXG5cbiAgICBpZiBub3QgQGVsP1xuICAgICAgcmV0dXJuIEBcblxuICAgIEAkZWwgPSAkKGVsKVxuXG4gICAgQGlzUmVuZGVyZWQgPSB0cnVlXG4gICAgQGlzQ2xvc2VkID0gZmFsc2VcblxuICAgICMgZGVsZWdhdGUgRE9NIGV2ZW50c1xuICAgIEBkZWxlZ2F0ZUV2ZW50cygpXG5cbiIsIid1c2Ugc3RyaWN0JztcblxuQXBwICAgICAgID0gcmVxdWlyZSBcImFwcFwiXG5CYWNrYm9uZSAgPSByZXF1aXJlIFwiYmFja2JvbmVcIlxuJCAgICAgICAgID0gcmVxdWlyZSBcImpxdWVyeVwiXG5fICAgICAgICAgPSByZXF1aXJlIFwidW5kZXJzY29yZVwiXG5Nb2Rlcm5penIgPSByZXF1aXJlIFwibW9kZXJuaXpyXCJcblxuXG53aW5kb3dTY3JvbGxIYW5kbGVyVmlld3MgPSB7fVxuXG5cbm9uV2luZG93U2Nyb2xsID0gKGV2ZW50KSAtPlxuXG4gIGZvciBjaWQsIHZpZXcgb2Ygd2luZG93U2Nyb2xsSGFuZGxlclZpZXdzXG5cbiAgICBpZiB2aWV3PyBhbmQgbm90IHZpZXcuaXNDbG9zZWQgYW5kIHZpZXcuZWw/XG4gICAgICB2aWV3LnRyaWdnZXJNZXRob2QgJ3Njcm9sbCcsIGV2ZW50XG5cblxuZGVib3VuY2VkT25XaW5kb3dTY3JvbGwgPSBfLnRocm90dGxlKCBvbldpbmRvd1Njcm9sbCwgMzAwIClcblxuYmluZFdpbmRvd1Njcm9sbEV2ZW50ID0gLT5cblxuICAkKHdpbmRvdykub24gJ3Njcm9sbCcsIGRlYm91bmNlZE9uV2luZG93U2Nyb2xsXG5cblxuYmluZFdpbmRvd1Njcm9sbEV2ZW50T25jZSA9IF8ub25jZSggYmluZFdpbmRvd1Njcm9sbEV2ZW50IClcblxuXG5cbmNsYXNzIEFwcC5WaWV3cy5JbmZpbml0ZVNjcm9sbENvbXBvc2l0ZVZpZXcgZXh0ZW5kcyBBcHAuVmlld3MuQmFzZUNvbXBvc2l0ZVZpZXdcblxuICBpbml0aWFsaXplOiA9PlxuXG4gICAgcmV0dXJuIGlmIG5vdCBAc2Nyb2xsQ29udGFpbmVyP1xuXG4gICAgaWYgQGNvbGxlY3Rpb24/IGFuZCBAY29sbGVjdGlvbiBpbnN0YW5jZW9mIEFwcC5Db2xsZWN0aW9ucy5JbmZpbml0ZVNjcm9sbENvbGxlY3Rpb25cblxuICAgICAgQGxpc3RlblRvIEBtb2RlbCwgJ2NoYW5nZTpsb2FkaW5nJywgQG9uTG9hZGluZ0NoYW5nZVxuXG5cbiAgb25SZW5kZXI6ID0+XG5cbiAgICBAYmluZFNjcm9sbEV2ZW50KClcblxuXG4gIG9uQ2xvc2U6ID0+XG5cbiAgICBpZiBAc2Nyb2xsQ29udGFpbmVyIGlzICd3aW5kb3cnIGFuZCB3aW5kb3dTY3JvbGxIYW5kbGVyVmlld3NbIEBjaWQgXT9cbiAgICAgIGRlbGV0ZSB3aW5kb3dTY3JvbGxIYW5kbGVyVmlld3NbIEBjaWQgXVxuXG5cbiAgYmluZFNjcm9sbEV2ZW50OiA9PlxuXG4gICAgaWYgQHNjcm9sbENvbnRhaW5lciBpcyAnd2luZG93J1xuXG4gICAgICBiaW5kV2luZG93U2Nyb2xsRXZlbnRPbmNlKClcbiAgICAgIHdpbmRvd1Njcm9sbEhhbmRsZXJWaWV3c1sgQGNpZCBdID0gQFxuXG4gICAgZWxzZVxuXG4gICAgICBpZiBAJCggQHNjcm9sbENvbnRhaW5lciApLmxlbmd0aCA+IDBcbiAgICAgICAgZGVib3VuY2VkU2Nyb2xsID0gXy50aHJvdHRsZSggQG9uU2Nyb2xsLCAxMDAgKVxuICAgICAgICBAJCggQHNjcm9sbENvbnRhaW5lciApLnNjcm9sbCBkZWJvdW5jZWRTY3JvbGxcblxuXG5cbiAgb25TY3JvbGw6IChldmVudCkgPT5cblxuXG4gICAgIyBnZXQgc2Nyb2xsIGhlaWdodHNcbiAgICBpZiBAc2Nyb2xsQ29udGFpbmVyIGlzICd3aW5kb3cnXG5cbiAgICAgIHNjcm9sbEhlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpXG4gICAgICBpbm5lckhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKVxuXG4gICAgICAjIGdldCBzY3JvbGx0b3AgcG9zaXRpb25cbiAgICAgIHNjcm9sbFRvcCA9IEFwcC5IZWxwZXJzLmVudi5nZXQgJ3Njcm9sbFRvcCdcblxuICAgIGVsc2VcblxuICAgICAgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldClcblxuICAgICAgc2Nyb2xsSGVpZ2h0ID0gJHRhcmdldFswXS5zY3JvbGxIZWlnaHRcbiAgICAgIGlubmVySGVpZ2h0ID0gJHRhcmdldC5pbm5lckhlaWdodCgpXG5cbiAgICAgICMgZ2V0IHNjcm9sbHRvcCBwb3NpdGlvblxuICAgICAgc2Nyb2xsVG9wID0gJHRhcmdldC5zY3JvbGxUb3AoKVxuXG5cbiAgICAjIGNhbGN1bGF0ZSBkaWZmZXJlbnRpYWxzXG4gICAgcGl4ZWxzRnJvbVRvcCA9IHNjcm9sbFRvcFxuICAgIHBpeGVsc0Zyb21Cb3R0b20gPSAwICsgc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsVG9wIC0gaW5uZXJIZWlnaHRcblxuICAgICMgZml4ZWQgb2Zmc2V0XG4gICAgb2Zmc2V0ID0gNzAwICAjID0gMTAwMDAgKiAwLjJcblxuICAgICMgZ2V0IGJvdHRvbSBvZmZzZXQgb2YgZWxlbWVudCBpbiB0aGUgc2Nyb2xsaW5nIGFyZWFcbiAgICBvZmZzZXRCb3R0b20gPSBAZ2V0T2Zmc2V0Qm90dG9tICQoJy5zcy13cmFwcGVyJyksIHNjcm9sbEhlaWdodFxuXG4gICAgIyByZXR1cm4gZm9yIG5lZ2F0aXZlIHZhbHVlcyAoZWxhc3RpYyBzY3JvbGxpbmcgb24gTWFjIE9TIGFuZCBpT1MpXG4gICAgcmV0dXJuIGlmIHBpeGVsc0Zyb21Cb3R0b20gPCAwIG9yIHBpeGVsc0Zyb21Ub3AgPCAwXG5cbiAgICAjIHRyaWdnZXIgZXZlbnRzXG4gICAgaWYgcGl4ZWxzRnJvbUJvdHRvbSA8IG9mZnNldCArIG9mZnNldEJvdHRvbVxuXG4gICAgICAjIGNvbnNvbGUubG9nICdOZWFyQm90dG9tJ1xuICAgICAgQHRyaWdnZXJNZXRob2QgJ3Njcm9sbDpuZWFyOmJvdHRvbSdcblxuICAgIGVsc2UgaWYgcGl4ZWxzRnJvbVRvcCA8IG9mZnNldFxuXG4gICAgICAjIGNvbnNvbGUubG9nICdOZWFyVG9wJ1xuICAgICAgQHRyaWdnZXJNZXRob2QgJ3Njcm9sbDpuZWFyOnRvcCdcblxuXG5cbiAgZ2V0T2Zmc2V0Qm90dG9tOiAoJGVsLCBzY3JvbGxIZWlnaHQpID0+XG5cbiAgICBpZiBub3QgQG9mZnNldEJvdHRvbT9cbiAgICAgICMgY2FsY3VsYXRlIHRoZSBvZmZzZXQgb2YgdGhlIHBvc3RzIGRpdiBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHBhZ2VcbiAgICAgIEBvZmZzZXRCb3R0b20gPSBzY3JvbGxIZWlnaHQgLSAoICRlbC5oZWlnaHQoKSArICRlbC5vZmZzZXQoKS50b3AgKVxuXG4gICAgICAjIG1ha2Ugc3VyZSB0aGF0IHRoaXMgaXMgbm90IG5lZ2F0aXZlLlxuICAgICAgaWYgQG9mZnNldEJvdHRvbSA8IDBcbiAgICAgICAgQG9mZnNldEJvdHRvbSA9IDBcblxuICAgIEBvZmZzZXRCb3R0b21cblxuXG4gIG9uU2Nyb2xsTmVhckJvdHRvbTogPT5cblxuICAgIGlmIG5vdCBAY29sbGVjdGlvbi5uZXh0UGFnZT8gb3Igbm90IEBjb2xsZWN0aW9uPyBvciBAY29sbGVjdGlvbi5sZW5ndGggaXMgMFxuICAgICAgcmV0dXJuXG5cbiAgICBpZiBAbG9hZGluZz8gYW5kIEBsb2FkaW5nXG4gICAgICByZXR1cm5cblxuICAgIGlmIEBjb2xsZWN0aW9uLmhhc05leHQ/IGFuZCBAY29sbGVjdGlvbi5oYXNOZXh0IGlzIGZhbHNlXG4gICAgICByZXR1cm5cblxuXG4gICAgQGxvYWRpbmcgPSB0cnVlXG4gICAgQG1vZGVsLnNldCAnbG9hZGluZycsIHRydWVcblxuICAgIEBjb2xsZWN0aW9uLm5leHRQYWdlXG4gICAgICByZW1vdmU6IGZhbHNlXG4gICAgICBzdWNjZXNzOiAoY29sbGVjdGlvbiwgcmVzcG9uc2UpID0+XG4gICAgICAgIEBsb2FkaW5nID0gZmFsc2VcbiAgICAgICAgQG1vZGVsLnNldCAnbG9hZGluZycsIGZhbHNlXG5cblxuICBvbkxvYWRpbmdDaGFuZ2U6IChtb2RlbCwgbG9hZGluZywgb3B0aW9ucykgLT5cblxuICAgIGlmIG5vdCBAbG9hZGVyVmlldz9cblxuICAgICAgIyBjcmVhdGUgbG9hZGVyXG4gICAgICBpZiBAJCgnLnNzLWluZmluaXRlLXNjcm9sbC1sb2FkZXInKS5sZW5ndGggaXMgMFxuXG4gICAgICAgIGluZmluaXRlU2Nyb2xsTG9hZGVySHRtbCA9ICc8ZGl2IGNsYXNzPVwic3MtaW5maW5pdGUtc2Nyb2xsLWxvYWRlclwiPjxkaXYgY2xhc3M9XCJzcy1pbm5lci10ZXh0XCI+Tm8gbW9yZSBjb250ZW50IHRvIGxvYWQuPC9kaXY+PC9kaXY+J1xuXG4gICAgICAgIGlmIEBzY3JvbGxDb250YWluZXIgaXMgJ3dpbmRvdydcblxuICAgICAgICAgIEAkZWwuYXBwZW5kIGluZmluaXRlU2Nyb2xsTG9hZGVySHRtbFxuXG4gICAgICAgIGVsc2VcblxuICAgICAgICAgIEAkKCBAc2Nyb2xsQ29udGFpbmVyICkuYXBwZW5kIGluZmluaXRlU2Nyb2xsTG9hZGVySHRtbFxuXG5cbiAgICAgIEBsb2FkZXJWaWV3ID0gbmV3IEFwcC5WaWV3cy5Mb2FkZXJJdGVtVmlld1xuICAgICAgICBtb2RlbDogbmV3IEJhY2tib25lLk1vZGVsXG5cbiAgICAgIEAkKCcuc3MtaW5maW5pdGUtc2Nyb2xsLWxvYWRlcicpLmFwcGVuZCBAbG9hZGVyVmlldy5yZW5kZXIoKS5lbFxuXG5cbiAgICBkb25lID0gZmFsc2VcblxuICAgIGlmIGxvYWRpbmdcblxuICAgICAgQGxvYWRlclZpZXcuc3RhcnRTcGlubmVyKClcblxuICAgIGVsc2VcblxuICAgICAgQGxvYWRlclZpZXcuc3RvcFNwaW5uZXIoKVxuXG4gICAgICAjICMgc2V0ICdkb25lJyBmbGFnIHRvIHRydWUgd2hlbiB0aGUgY29sbGVjdGlvbiBpcyBhdCB0aGUgYm90dG9tLlxuICAgICAgIyAjIFdlIGRvbid0IG5lZWQgaXQgb24gdGhlIGZyb250IGVuZCwgYnV0IHdlIG1pZ2h0IHdhbnQgaXQgb24gdGhlXG4gICAgICAjICMgYmFjayBlbmQgdG8gc2hvdyBhIG1lc3NhZ2UgbGlrZTogXCJHbyBwcm8gdG8gbG9hZCBtb3JlIHBvc3RzXCJcbiAgICAgICMgaWYgQGNvbGxlY3Rpb24uaGFzTmV4dD8gYW5kIEBjb2xsZWN0aW9uLmhhc05leHQgaXMgZmFsc2VcbiAgICAgICMgICBkb25lID0gdHJ1ZVxuXG4gICAgQCQoJy5zcy1pbmZpbml0ZS1zY3JvbGwtbG9hZGVyJykudG9nZ2xlQ2xhc3MgJ3NzLWxvYWRpbmcnLCBsb2FkaW5nXG4gICAgQCQoJy5zcy1pbmZpbml0ZS1zY3JvbGwtbG9hZGVyJykudG9nZ2xlQ2xhc3MgJ3NzLWRvbmUnLCBkb25lXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcHAgICAgICAgPSByZXF1aXJlIFwiYXBwXCJcbkJhY2tib25lICA9IHJlcXVpcmUgXCJiYWNrYm9uZVwiXG5fICAgICAgICAgPSByZXF1aXJlIFwidW5kZXJzY29yZVwiXG5cblxuY2xhc3MgQXBwLlZpZXdzLkxvYWRlckl0ZW1WaWV3IGV4dGVuZHMgQXBwLlZpZXdzLkJhc2VJdGVtVmlld1xuXG4gIGNsYXNzTmFtZTogJ3NzLWFqYXgtbG9hZGVyLXZpZXcnXG5cbiAgZGVmYXVsdFNwaW5BcmdzOlxuXG4gICAgbGluZXM6IDEyICAgICAgICAgICAgICAgIyBUaGUgbnVtYmVyIG9mIGxpbmVzIHRvIGRyYXdcbiAgICBsZW5ndGg6IDcgICAgICAgICAgICAgICAjIFRoZSBsZW5ndGggb2YgZWFjaCBsaW5lXG4gICAgd2lkdGg6IDIgICAgICAgICAgICAgICAgIyBUaGUgbGluZSB0aGlja25lc3NcbiAgICByYWRpdXM6IDkgICAgICAgICAgICAgICAjIFRoZSByYWRpdXMgb2YgdGhlIGlubmVyIGNpcmNsZVxuICAgIGNvcm5lcnM6IDEgICAgICAgICAgICAgICMgQ29ybmVyIHJvdW5kbmVzcyAoMC4uMSlcbiAgICByb3RhdGU6IDAgICAgICAgICAgICAgICAjIFRoZSByb3RhdGlvbiBvZmZzZXRcbiAgICBkaXJlY3Rpb246IDEgICAgICAgICAgICAjIDE6IGNsb2Nrd2lzZSwgLTE6IGNvdW50ZXJjbG9ja3dpc2VcbiAgICBjb2xvcjogJyNhZWFlYWUnICAgICAgICAjICNyZ2Igb3IgI3JyZ2diYiBvciBhcnJheSBvZiBjb2xvcnNcbiAgICBzcGVlZDogMSAgICAgICAgICAgICAgICAjIFJvdW5kcyBwZXIgc2Vjb25kXG4gICAgdHJhaWw6IDYwICAgICAgICAgICAgICAgIyBBZnRlcmdsb3cgcGVyY2VudGFnZVxuICAgIHNoYWRvdzogZmFsc2UgICAgICAgICAgICMgV2hldGhlciB0byByZW5kZXIgYSBzaGFkb3dcbiAgICBod2FjY2VsOiBmYWxzZSAgICAgICAgICAjIFdoZXRoZXIgdG8gdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvblxuICAgIGNsYXNzTmFtZTogJ3NzLXNwaW5uZXInICAgICMgVGhlIENTUyBjbGFzcyB0byBhc3NpZ24gdG8gdGhlIHNwaW5uZXJcblxuXG4gIHRlbXBsYXRlOiAtPlxuICAgICcnXG5cbiAgb25SZW5kZXI6ID0+XG5cbiAgICBAc3RhcnRTcGlubmVyKClcblxuXG4gIHN0YXJ0U3Bpbm5lcjogPT5cblxuICAgIHNwaW5BcmdzID0gXy5leHRlbmQge30sIEBkZWZhdWx0U3BpbkFyZ3MsIEBtb2RlbC50b0pTT04oKVxuXG4gICAgQCRlbC5zcGluIHNwaW5BcmdzXG5cbiAgc3RvcFNwaW5uZXI6ID0+XG5cbiAgICBAJGVsLnNwaW4gZmFsc2VcbiIsIlwidXNlIHN0cmljdFwiXG5cbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5cbiMgQ1JFQVRFIE5FVyBCQUNLQk9ORS5NQVJJT05FVFRFIEFQUExJQ0FUSU9OXG5BcHAgPSBuZXcgQmFja2JvbmUuTWFyaW9uZXR0ZS5BcHBsaWNhdGlvblxuXG5cdENvbnRyb2xsZXJzOiB7fVxuXHRNb2RlbHM6IHt9XG5cdENvbGxlY3Rpb25zOiB7fVxuXHRWaWV3czoge31cblx0TGF5b3V0czoge31cblx0Um91dGVyczoge31cblx0VGVtcGxhdGVzOiB7fVxuXHRQYXJ0aWFsczoge31cblx0SGVscGVyczoge31cblxud2luZG93LlNTQXBwID0gQXBwXG5cbiMgUkVUVVJOIE1BSU4gQVBQXG5tb2R1bGUuZXhwb3J0cyA9IEFwcFxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuIyBtb2Rlcm5penIgbW9kdWxlc1xucmVxdWlyZSAnYnJvd3Nlcm5penIvdGVzdC90b3VjaGV2ZW50cydcblxuIyBsb2FkIGFwcCBvYmplY3RcbkFwcCA9IHJlcXVpcmUgJ2FwcCdcblxuIyByZXF1aXJlIGhlbHBlcnNcbkFwcC5IZWxwZXJzLmJyb3dzZXJTdXBwb3J0ICA9IHJlcXVpcmUgXCIuL0hlbHBlcnMvYnJvd3NlclN1cHBvcnRcIlxuQXBwLkhlbHBlcnMuZGF0YSAgICAgICAgICAgID0gcmVxdWlyZSBcIi4vSGVscGVycy9kYXRhXCJcbkFwcC5IZWxwZXJzLmRhdGUgICAgICAgICAgICA9IHJlcXVpcmUgXCIuL0hlbHBlcnMvZGF0ZVwiXG5BcHAuSGVscGVycy5lbnYgICAgICAgICAgICAgPSByZXF1aXJlIFwiLi9IZWxwZXJzL2VudlwiXG5BcHAuSGVscGVycy5odHRwICAgICAgICAgICAgPSByZXF1aXJlIFwiLi9IZWxwZXJzL2h0dHBcIlxuXG5cbiMgbG9hZCB0ZW1wbGF0ZSBoZWxwZXJzXG5yZXF1aXJlICcuL1RlbXBsYXRlcy9IZWxwZXJzL3RvVGl0bGVDYXNlJ1xuXG4jIGxvYWQgYXBwIGNvbnRyb2xsZXJzXG5yZXF1aXJlICcuL0NvbnRyb2xsZXJzL0FwcENvbnRyb2xsZXInXG5cbiMgbG9hZCBhcHAgbW9kZWxzXG5yZXF1aXJlICcuL01vZGVscy9BcGlNb2RlbCdcbnJlcXVpcmUgJy4vTW9kZWxzL1dQT3B0aW9uTW9kZWwnXG5yZXF1aXJlICcuL01vZGVscy9XUFVzZXJNZXRhTW9kZWwnXG5cbiMgbG9hZCBhcHAgY29sbGVjdGlvbnNcbnJlcXVpcmUgJy4vQ29sbGVjdGlvbnMvQXBpQ29sbGVjdGlvbidcbnJlcXVpcmUgJy4vQ29sbGVjdGlvbnMvSW5maW5pdGVTY3JvbGxDb2xsZWN0aW9uJ1xuXG4jIHJlcXVpcmUgYXBwIHZpZXdzXG5yZXF1aXJlICcuL1ZpZXdzL0Jhc2VJdGVtVmlldydcbnJlcXVpcmUgJy4vVmlld3MvQmFzZUNvbXBvc2l0ZVZpZXcnXG5yZXF1aXJlICcuL1ZpZXdzL0xvYWRlckl0ZW1WaWV3J1xucmVxdWlyZSAnLi9WaWV3cy9JbmZpbml0ZVNjcm9sbENvbXBvc2l0ZVZpZXcnXG5cbiMgYmFja2JvbmUgZXh0ZW50aW9uc1xucmVxdWlyZSAnLi9Db25maWcvQmFja2JvbmVBamF4J1xuXG5cbiMjI1xuaW5pdGlhbGl6ZSBjb250cm9sbGVyIG9uIGRvYyByZWFkeSAtIGJlZm9yZSBldmVuIHN0YXJ0aW5nIHRoZSBhcHBcbnNvIHRoYXQgc3ViIGFwcHMgYW5kIG1vZGVscyB3aWxsIGhhdmUgYWNjZXNzIHRvIHRoZSBhcHAgYXBpIGluc2lkZSB0aGUgYXBwaW5pdGlhbGl6ZXJzXG4jIyNcbiQgPSByZXF1aXJlICdqcXVlcnknXG4kKGRvY3VtZW50KS5yZWFkeSAtPlxuXG4gICQoJ3ZpZGVvJykucHJvcCBcIm11dGVkXCIsIHRydWVcblxuICAjb25seSBsb2FkIHRoZSBhcHAgb25jZVxuICAjIGNvbnNvbGUubG9nKCAkKCcuc3Mtc2hvcnRjb2RlJykgKVxuICAjIGNvbnNvbGUubG9nKCAkKCcud2lkZ2V0X3NvY2lhbHN0cmVhbXNfd2lkZ2V0JykgKVxuXG4gICMgJCgnLnNzLXNob3J0Y29kZScpLmhpZGUoKVxuICAjICQoJy53aWRnZXRfc29jaWFsc3RyZWFtc193aWRnZXQnKS5oaWRlKClcbiAgIyAkKCcuc3Mtd2lkZ2V0JykuaGlkZSgpXG5cblxuXG4gICMgYWRkIEFKQVggc3VwcG9ydCBmb3IgSUU5XG4gIEFwcC5IZWxwZXJzLmJyb3dzZXJTdXBwb3J0LmllQWpheFN1cHBvcnQoKVxuXG4gICMgSW5zdGFudGlhdGUgYXBwIGNvbnRyb2xsZXJcbiAgY29udHJvbGxlciA9IG5ldyBBcHAuQ29udHJvbGxlcnMuQXBwQ29udHJvbGxlcigpXG5cbiAgIyMjXG4gIERlZmluZSBBcHAgUmVxdWVzdHNcbiAgIyMjXG4gIEFwcC5yZXFyZXMuc2V0SGFuZGxlciAnYXBpUm9vdCcsIGNvbnRyb2xsZXIuZ2V0QXBpUm9vdFxuICBBcHAucmVxcmVzLnNldEhhbmRsZXIgJ2lzRXZlbicsIGNvbnRyb2xsZXIuaXNFdmVuXG5cbiAgIyMjXG4gIHN0YXJ0IHRoZSBhcHBcbiAgVGhpcyBpcyB3aGVuIG1vZHVsZXMgZ2V0IGluaXRpYWxpemVkXG4gICMjI1xuICBBcHAuc3RhcnQoKVxuXG4gICMjI1xuICBzdGFydCBFTlYgaGVscGVyLlxuICAjIyNcbiAgQXBwLkhlbHBlcnMuZW52LnN0YXJ0KClcbiIsIlNlbGVjdGl6ZSA9IHJlcXVpcmUgJ3NlbGVjdGl6ZSdcblxuU2VsZWN0aXplLmRlZmluZSAnc2VsZWN0aXplLWJsYWNrbGlzdGVkLWNoYXJzJywgKG9wdGlvbnMpIC0+XG5cbiAgIyBvdmVycmlkZSB0aGUgb25LZXlQcmVzcyBtZXRob2RcbiAgb3JpZ2luYWxPbktleVByZXNzID0gQG9uS2V5UHJlc3NcbiAgQG9uS2V5UHJlc3MgPSAoZXZlbnQpID0+XG5cbiAgICAjIGNoZWNrIGlmIHRoZSBrZXkgdGhhdCB3YXMgcHJlc3NlZCBpcyBvbmUgb2YgdGhlIGJsYWNrbGlzdGVkIGNoYXJzXG4gICAgY2hhcmFjdGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSBldmVudC5rZXlDb2RlIG9yIGV2ZW50LndoaWNoXG4gICAgaWYgQHNldHRpbmdzLmJsYWNrbGlzdGVkQ2hhcnM/IGFuZCBfLmluZGV4T2YoIEBzZXR0aW5ncy5ibGFja2xpc3RlZENoYXJzLCBjaGFyYWN0ZXIgKSA+PSAwXG4gICAgICAjIHN0b3AgZXZlbnQgcHJvcGFnYXRpb24gaGVyZVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgcmV0dXJuXG5cbiAgICAjIHJ1biBvcmlnaW5hbCBvbktleURvd24gaGFuZGxlclxuICAgIG9yaWdpbmFsT25LZXlQcmVzcy5hcHBseSBALCBhcmd1bWVudHNcbiIsIlNlbGVjdGl6ZSA9IHJlcXVpcmUgJ3NlbGVjdGl6ZSdcblxuU2VsZWN0aXplLmRlZmluZSAnc2VsZWN0aXplLXRhYi1zZXBhcmF0b3InLCAob3B0aW9ucykgLT5cblxuICAjIG92ZXJyaWRlIHRoZSBvbktleURvd24gbWV0aG9kXG4gIG9yaWdpbmFsT25LZXlEb3duID0gQG9uS2V5RG93blxuICBAb25LZXlEb3duID0gKGV2ZW50KSA9PlxuXG4gICAgIyBjaGVjayBpZiB0aGUga2V5IHRoYXQgd2FzIHByZXNzZWQgaXMgb25lIG9mIHRoZSB0YWIgdHJpZ2dlcnNcbiAgICBpZiBAc2V0dGluZ3MudGFiVHJpZ2dlcnM/IGFuZCBfLmluZGV4T2YoIEBzZXR0aW5ncy50YWJUcmlnZ2VycywgZXZlbnQua2V5Q29kZSApID49IDBcblxuICAgICAgIyBmaXJzdCwgY2hlY2sgaWYgdGhlIGlucHV0IGhhcyBhIG5vbi1lbXB0eSB2YWx1ZVxuICAgICAgdmFsdWUgPSBAJGNvbnRyb2xfaW5wdXQudmFsKClcbiAgICAgIGlmIHZhbHVlIGlzbnQgJydcbiAgICAgICAgIyBjcmVhdGUgbmV3IGl0ZW0gd2l0aCB2YWx1ZSBmb3VuZFxuICAgICAgICBAY3JlYXRlSXRlbSh2YWx1ZSlcblxuICAgICAgIyBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uIGhlcmVcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIHJldHVyblxuXG4gICAgIyBydW4gb3JpZ2luYWwgb25LZXlEb3duIGhhbmRsZXJcbiAgICBvcmlnaW5hbE9uS2V5RG93bi5hcHBseSBALCBhcmd1bWVudHNcbiJdfQ==
