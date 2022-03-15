// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"91j40":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "1fe0474775a9ed4c";
"use strict";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"9Acdi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _indexScss = require("./index.scss");
var _sliderBlockScss = require("../blocks/slider-block/slider-block.scss");
var _jquerySlider = require("../slider/jquery.slider");
var _sliderTemplate = require("../blocks/slider-template/slider-template");
var _sliderTemplateDefault = parcelHelpers.interopDefault(_sliderTemplate);
$(function() {
    const settings = [
        {
            bubble: true,
            direction: 'horizontal',
            max: 100,
            min: 0,
            step: 1,
            type: 'double',
            valueTo: 100,
            valueFrom: 0,
            onChangeTo: function() {
            },
            onChangeFrom: function() {
            }
        },
        {
            bubble: false,
            direction: 'vertical',
            max: 90,
            min: 5,
            step: 2,
            type: 'single',
            valueTo: 50,
            valueFrom: 15,
            onChangeTo: function() {
            },
            onChangeFrom: function() {
            }
        },
        {
            bubble: true,
            direction: 'horizontal',
            max: 1000,
            min: -100,
            step: 30,
            type: 'single',
            valueTo: 780,
            valueFrom: -5,
            onChangeTo: function() {
            },
            onChangeFrom: function() {
            }
        }
    ];
    $('.slider-template').each((index, element)=>{
        // eslint-disable-next-line no-new
        new _sliderTemplateDefault.default(element, settings[index]);
    });
});

},{"./index.scss":"fFTfR","../blocks/slider-block/slider-block.scss":"2PFos","../slider/jquery.slider":"sYGOa","../blocks/slider-template/slider-template":"g4K4g","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fFTfR":[function() {},{}],"2PFos":[function() {},{}],"sYGOa":[function(require,module,exports) {
var _slider = require("./Slider");
(function($) {
    const sliders = [];
    const methods = {
        init: function(options) {
            const settings = $.extend({
                bubble: true,
                max: 100,
                min: 0,
                step: 1,
                type: 'single',
                valueTo: 100,
                valueFrom: 5,
                direction: 'horizontal',
                onChangeTo: function() {
                },
                onChangeFrom: function() {
                }
            }, options);
            return this.each(function() {
                const ths = $(this);
                if (settings.step > settings.max - settings.min || settings.step === 0) throw new Error('Шаг не может быть больше разницы максимума и минимума или равен нулю');
                if (settings.valueTo > settings.max) throw new Error('Текущее значение не может быть больше максимума');
                if (settings.valueFrom < settings.min) throw new Error('Текущее значение не может быть меньше минимума');
                sliders.push(new _slider.Slider(ths[0], settings));
            });
        },
        hideBubble: function() {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            slider.hideBubble();
        },
        showBubble: function() {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            slider.showBubble();
        },
        changeOrientation: function(value) {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            slider.changeOrientation(value);
        },
        changeType: function(value) {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            slider.changeType(value);
        },
        changeStep: function(value) {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            if (Number.isNaN(value)) throw new Error('step должно быть числом');
            slider.changeStep(value);
        },
        changeTo: function(value) {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            if (Number.isNaN(value)) throw new Error('valueTo должно быть числом');
            slider.changeTo(value);
        },
        changeFrom: function(value) {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            if (Number.isNaN(value)) throw new Error('valueFrom должно быть числом');
            slider.changeFrom(value);
        },
        changeMax: function(value) {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            if (Number.isNaN(value)) throw new Error('valueFrom должно быть числом');
            slider.changeMax(value);
        },
        getMax: function() {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            return slider.getMax();
        },
        getMin: function() {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            return slider.getMin();
        },
        getValueTo: function() {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            return slider.getValueTo();
        },
        getValueFrom: function() {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            return slider.getValueFrom();
        },
        changeMin: function(value) {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            if (Number.isNaN(value)) throw new Error('valueFrom должно быть числом');
            slider.changeMin(value);
        }
    }; // eslint-disable-next-line no-param-reassign
    $.fn.Slider = function(method) {
        if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof method === 'object' || !method) return methods.init.apply(this, arguments);
        $.error('Метод с именем ' + method + ' не существует для jQuery.slider');
        return null;
    };
})(jQuery);

},{"./Slider":"grHzt"}],"grHzt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Slider", ()=>Slider
);
var _view = require("./View");
var _presenter = require("./Presenter");
var _model = require("./Model");
class Slider {
    constructor(elem, settings){
        this.elem = elem;
        this.model = new _model.Model(this.elem, settings);
        this.view = new _view.View(this.elem, settings);
        this.view.init();
        this.presenter = new _presenter.Presenter(this.elem, this.model, this.view);
    }
    hideBubble() {
        this.view.hideBubble();
        return true;
    }
    showBubble() {
        this.view.showBubble();
        return true;
    }
    changeOrientation(value) {
        this.view.changeOrientation = value;
        this.model.changeOrientation = value;
        return true;
    }
    changeType(value) {
        this.view.changeType = value;
        this.model.changeType = value;
        return true;
    }
    changeStep(value) {
        this.model.changeStep = value;
        this.view.changeStep = value;
        return true;
    }
    changeTo(value) {
        this.model.changeTo = value;
        return true;
    }
    changeFrom(value) {
        this.model.changeFrom = value;
        return true;
    }
    changeMax(value) {
        this.model.changeMax = value;
        this.view.changeMax = value;
        return true;
    }
    changeMin(value) {
        this.model.changeMin = value;
        this.view.changeMin = value;
        return true;
    }
    getMax() {
        return this.model.getMax;
    }
    getMin() {
        return this.model.getMin;
    }
    getValueTo() {
        return this.model.getValueTo;
    }
    getValueFrom() {
        return this.model.getValueFrom;
    }
}

},{"./View":"dRZ4R","./Presenter":"aecJh","./Model":"1W6vh","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"dRZ4R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "View", ()=>View
);
var _observer = require("./Observer");
var _viewHead = require("./subView/ViewHead");
var _viewHeadDefault = parcelHelpers.interopDefault(_viewHead);
var _scale = require("./subView/Scale");
var _scaleDefault = parcelHelpers.interopDefault(_scale);
var _line = require("./subView/Line");
var _lineDefault = parcelHelpers.interopDefault(_line);
class View extends _observer.Observer {
    constructor(elem, options){
        super();
        this.handleHeadStart = (e)=>{
            const evt = View.getEvent(e); // Здесь нужен каст через 'as', так как TS не знает, что target это html объект
            const target = evt.target;
            const updatedHead = target.hasAttribute('data-valueFrom') ? 'valueFrom' : 'valueTo';
            const dataArray = [];
            if (this.state.direction === 'horizontal') {
                dataArray.push(target.getBoundingClientRect().left);
                dataArray.push(evt.clientX);
            } else {
                dataArray.push(target.getBoundingClientRect().top);
                dataArray.push(evt.clientY);
            }
            this.handleSwipe = (event)=>{
                return this.swipeAction(event, dataArray, updatedHead);
            };
            document.addEventListener('touchmove', this.handleSwipe, {
                passive: false
            });
            document.addEventListener('mousemove', this.handleSwipe);
            document.addEventListener('touchend', this.handleSwipeEnd);
            document.addEventListener('mouseup', this.handleSwipeEnd);
            return dataArray;
        };
        this.swipeAction = (event, dataArray, updatedHead)=>{
            event.preventDefault();
            const evtSwipe = View.getEvent(event);
            if (this.state.direction === 'horizontal') {
                dataArray.push(this.line.getWidth);
                dataArray.push(this.line.getLeftCoordinate);
                dataArray.push(evtSwipe.clientX);
            } else {
                dataArray.push(this.line.getHeight);
                dataArray.push(this.line.getTopCoordinate);
                dataArray.push(evtSwipe.clientY);
            }
            dataArray.push(this.head.getWidth / 2);
            this.notify({
                valueArr: dataArray.slice(),
                target: updatedHead,
                onlyState: false
            });
            dataArray.splice(2, dataArray.length - 2);
            return dataArray;
        };
        this.handleSwipeEnd = ()=>{
            document.removeEventListener('touchmove', this.handleSwipe);
            document.removeEventListener('mousemove', this.handleSwipe);
            document.removeEventListener('touchend', this.handleSwipeEnd);
            document.removeEventListener('mouseup', this.handleSwipeEnd);
            return true;
        };
        this.handleScaleClick = (event)=>{
            const dataArray = this.scaleClickData(event);
            this.notify({
                target: 'value',
                valueArr: dataArray.slice(),
                onlyState: false
            });
            return dataArray;
        };
        this.elem = elem;
        this.handleSwipe = ()=>[]
        ;
        this.state = Object.assign({
        }, options);
        this.line = new _lineDefault.default(this.elem, this.state.direction, this.state.type);
        this.scale = new _scaleDefault.default(this.line.element, this.state.direction, this.state.min, this.state.max);
        const headStartPos = this.calcHeadStartPosition(this.state.valueTo);
        this.head = new _viewHeadDefault.default(this.line.element, this.state.direction, headStartPos, this.state.valueTo);
    }
    init() {
        if (this.state.type === 'double') {
            const head2StartPos = this.calcHeadStartPosition(this.state.valueFrom);
            this.head2 = new _viewHeadDefault.default(this.line.element, this.state.direction, head2StartPos, this.state.valueFrom);
            this.head2.element.setAttribute('data-valueFrom', 'true');
        }
        if (this.state.bubble) {
            this.head.showBubble();
            if (this.state.type === 'double') {
                if (this.head2 !== undefined) this.head2.showBubble();
            }
        }
        this.line.progressValue(this.head.element, this.head2?.element);
        this.setup();
    }
    changePosition(data) {
        if (data.onlyState) return;
        let position = 0;
        if (data.valueN !== undefined) position = data.valueN;
        else throw new Error('Новое значение не определено');
        if (data.target === 'valueTo') {
            this.head.updatePosition(position);
            this.head.updateBubble(this.state.valueTo);
            this.state.onChangeTo(this.state.valueTo);
            this.line.progressValue(this.head.element, this.head2?.element);
        } else if (data.target === 'valueFrom') {
            if (this.head2 !== undefined) {
                this.head2.updatePosition(position);
                this.head2.updateBubble(this.state.valueFrom);
                this.state.onChangeFrom(this.state.valueFrom);
                this.line.progressValue(this.head.element, this.head2.element);
            } else throw new Error('Head2 не существует');
        }
    }
    hideBubble() {
        this.updateState({
            target: 'bubble',
            valueB: false,
            onlyState: true
        });
        this.head.hideBubble();
        this.head2?.hideBubble();
        this.notify({
            target: 'bubble',
            valueB: false,
            onlyState: true
        });
    }
    showBubble() {
        this.updateState({
            target: 'bubble',
            valueB: true,
            onlyState: true
        });
        this.head.showBubble();
        this.head2?.showBubble();
        this.notify({
            target: 'bubble',
            valueB: true,
            onlyState: true
        });
    }
    set changeOrientation(value) {
        this.updateState({
            target: 'direction',
            valueS: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }
    set changeType(value) {
        this.updateState({
            target: 'type',
            valueS: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        delete this.head2;
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }
    set changeStep(value) {
        if (value > this.state.max - this.state.min) throw new Error('Шаг не может быть больше разницы максимума и минимума');
        this.state.step = value;
    }
    set changeMax(value) {
        if (value < this.state.min || value <= this.state.valueFrom) throw new Error('Максимум не может быть меньше минимума');
        this.updateState({
            target: 'max',
            valueN: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }
    set changeMin(value) {
        if (value > this.state.max || value >= this.state.valueTo) throw new Error('Минимум не может быть больше максимума');
        this.updateState({
            target: 'min',
            valueN: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }
    updateState(data) {
        if (!data.onlyState) return;
        if (typeof this.state[data.target] === 'string') this.state[data.target] = data.valueS;
        else if (typeof this.state[data.target] === 'number') this.state[data.target] = data.valueN;
        else this.state[data.target] = data.valueB;
    }
    reInit() {
        this.line = new _lineDefault.default(this.elem, this.state.direction, this.state.type);
        this.scale = new _scaleDefault.default(this.line.element, this.state.direction, this.state.min, this.state.max);
        if (this.state.type === 'double') {
            const head2StartPos = this.calcHeadStartPosition(this.state.valueFrom);
            this.head2 = new _viewHeadDefault.default(this.line.element, this.state.direction, head2StartPos, this.state.valueFrom);
            this.head2.element.setAttribute('data-valueFrom', 'true');
        }
        const headStartPos = this.calcHeadStartPosition(this.state.valueTo);
        this.head = new _viewHeadDefault.default(this.line.element, this.state.direction, headStartPos, this.state.valueTo);
        if (this.state.bubble) {
            this.head.showBubble();
            if (this.state.type === 'double') {
                if (this.head2 !== undefined) this.head2.showBubble();
            }
        }
        this.line.progressValue(this.head.element, this.head2?.element);
        this.setup();
    }
    setup() {
        if (this.state.type === 'double') {
            if (this.head2 !== undefined) {
                this.head2.element.addEventListener('mousedown', this.handleHeadStart);
                this.head2.element.addEventListener('touchstart', this.handleHeadStart);
            } else throw new Error('Head2 не существует');
        }
        this.head.element.addEventListener('mousedown', this.handleHeadStart);
        this.head.element.addEventListener('touchstart', this.handleHeadStart);
        this.scale.element.addEventListener('click', this.handleScaleClick);
    }
    calcHeadStartPosition(value) {
        return (value - this.state.min) / (this.state.max - this.state.min);
    }
    static getEvent(event) {
        if (event instanceof TouchEvent) return event.touches[0];
        return event;
    }
    scaleClickData(event) {
        const evt = View.getEvent(event);
        const dataArray = [];
        if (this.state.direction === 'horizontal') {
            dataArray.push(this.line.getWidth);
            dataArray.push(this.line.getLeftCoordinate);
            dataArray.push(evt.clientX);
        } else {
            dataArray.push(this.line.getHeight);
            dataArray.push(this.line.getTopCoordinate);
            dataArray.push(evt.clientY);
        }
        return dataArray;
    }
}

},{"./Observer":"2YvSZ","./subView/ViewHead":"04QP2","./subView/Scale":"bGCIc","./subView/Line":"7Lk3Z","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2YvSZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Observer", ()=>Observer
);
class Observer {
    constructor(){
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter((x)=>x !== observer
        );
    }
    notify(data) {
        this.observers.forEach((x)=>x(data)
        );
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"04QP2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _headBubble = require("./HeadBubble");
var _headBubbleDefault = parcelHelpers.interopDefault(_headBubble);
class ViewHead {
    constructor(parent, direction, value, bubbleValue){
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.element.classList.add('slider__head');
        this.direction === 'horizontal' ? this.element.classList.add('slider__head') : this.element.classList.add('slider__head', 'slider__head_vertical');
        this.bubble = new _headBubbleDefault.default(this.element);
        this.parent.append(this.element);
        this.updatePosition(value);
        this.updateBubble(bubbleValue);
    }
    removeHead() {
        this.element.remove();
        return true;
    }
    updatePosition(newPos) {
        if (this.direction === 'horizontal') this.element.style.left = `${newPos * 100}%`;
        else this.element.style.top = `${newPos * 100}%`;
    }
    updateBubble(value) {
        if (this.bubble) this.bubble.update(value);
    }
    showBubble() {
        this.bubble.show();
    }
    hideBubble() {
        this.bubble.hide();
    }
    get getWidth() {
        return this.element.getBoundingClientRect().width;
    }
    get getHeight() {
        return this.element.getBoundingClientRect().height;
    }
}
exports.default = ViewHead;

},{"./HeadBubble":"euY79","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"euY79":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class HeadBubble {
    constructor(parent){
        this.element = document.createElement('span');
        this.element.classList.add('slider__head-bubble');
        this.element.setAttribute('data-type', 'bubble');
        this.parent = parent;
        this.parent.append(this.element);
    }
    update(value) {
        this.element.textContent = String(value);
    }
    show() {
        this.element.classList.add('slider__head-bubble_active');
    }
    hide() {
        this.element.classList.remove('slider__head-bubble_active');
    }
}
exports.default = HeadBubble;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bGCIc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Scale {
    constructor(parent, direction, min, max){
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.direction === 'horizontal' ? this.element.classList.add('slider__scale') : this.element.classList.add('slider__scale', 'slider__scale_vertical');
        this.parent.append(this.element);
        this.init(min, max);
    }
    init(min, max) {
        const step = (max - min) / 4;
        for(let i = 0; i <= 100; i += 5){
            if (i % 25 === 0) {
                if (this.direction === 'horizontal') this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash' style='left: ${i}%;'></div><div class='slider__scale-number' style='left: ${i}%;'></div>`);
                else this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_vertical' style='top: ${i}%;'></div><div class='slider__scale-number slider__scale-number_vertical' style='top: ${i}%;'></div>`);
                const numbers = this.element.querySelectorAll('.slider__scale-number');
                const number = numbers[numbers.length - 1];
                if (i === 0) number.innerHTML = String(min);
                else {
                    const dashValue = min + i / 25 * step;
                    number.innerHTML = Number.isInteger(dashValue) ? String(dashValue) : dashValue.toFixed(2);
                }
            } else if (this.direction === 'horizontal') this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_small' style='left: ${i}%;'></div>`);
            else this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_small-vertical' style='top: ${i}%;'></div>`);
        }
    }
    removeScale() {
        this.element.remove();
    }
    get getWidth() {
        return this.element.getBoundingClientRect().width;
    }
    get getLeftCoordinate() {
        return this.element.getBoundingClientRect().left;
    }
    get getHeight() {
        return this.element.getBoundingClientRect().height;
    }
    get getTopCoordinate() {
        return this.element.getBoundingClientRect().top;
    }
}
exports.default = Scale;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7Lk3Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Line {
    constructor(parent, direction, type){
        this.parent = parent;
        this.direction = direction;
        this.type = type;
        this.element = document.createElement('div');
        this.progressBar = document.createElement('span');
        if (this.direction === 'horizontal') {
            this.element.classList.add('slider__line');
            this.progressBar.classList.add('slider__line-progress');
        } else {
            this.element.classList.add('slider__line', 'slider__line_vertical');
            this.progressBar.classList.add('slider__line-progress', 'slider__line-progress_vertical');
        }
        this.element.append(this.progressBar);
        this.parent.append(this.element);
    }
    set setType(type) {
        this.type = type;
    }
    progressValue(To, From) {
        if (this.direction === 'horizontal') {
            if (this.type === 'single') this.progressBar.style.width = To.style.left;
            else if (From !== undefined) {
                this.progressBar.style.width = `${parseInt(To.style.left, 10) - parseInt(From.style.left, 10)}%`;
                this.progressBar.style.left = From.style.left;
            }
        } else if (this.type === 'single') this.progressBar.style.height = To.style.top;
        else if (From !== undefined) {
            this.progressBar.style.height = `${parseInt(To.style.top, 10) - parseInt(From.style.top, 10)}%`;
            this.progressBar.style.top = From.style.top;
        }
    }
    removeLine() {
        this.element.remove();
    }
    get getWidth() {
        return this.element.getBoundingClientRect().width;
    }
    get getLeftCoordinate() {
        return this.element.getBoundingClientRect().left;
    }
    get getHeight() {
        return this.element.getBoundingClientRect().height;
    }
    get getTopCoordinate() {
        return this.element.getBoundingClientRect().top;
    }
}
exports.default = Line;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aecJh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Presenter", ()=>Presenter
);
class Presenter {
    constructor(elem, model, view){
        this.model = model;
        this.view = view;
        this.view.subscribe(this.model.updateState.bind(this.model));
        this.view.subscribe(this.model.calcPosition.bind(this.model));
        this.model.subscribe(this.view.updateState.bind(this.view));
        this.model.subscribe(this.view.changePosition.bind(this.view));
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1W6vh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Model", ()=>Model
);
var _observer = require("./Observer");
class Model extends _observer.Observer {
    constructor(elem, options){
        super();
        this.isValueTo = (updatedValue)=>(updatedValue - this.state.valueFrom) / (this.state.valueTo - this.state.valueFrom) >= 0.5
        ;
        this.elem = elem;
        this.state = Object.assign({
        }, options);
    }
    calcPosition(data) {
        if (data.onlyState) return;
        let updatedValue;
        let updatedProperty;
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            updatedValue = this.calcUpdatedValue(data, updatedProperty);
        } else if (data.target === 'value') {
            updatedValue = this.calcUpdatedValueRelative(data);
            if (this.state.type === 'single') updatedProperty = 'valueTo';
            else updatedProperty = this.isValueTo(updatedValue) ? 'valueTo' : 'valueFrom';
            updatedValue = updatedProperty === 'valueFrom' ? this.validValueFrom(updatedValue) : this.validValueTo(updatedValue);
        } else {
            updatedProperty = 'valueFrom';
            updatedValue = this.calcUpdatedValue(data, updatedProperty);
        }
        this.updateState({
            target: updatedProperty,
            valueN: updatedValue,
            onlyState: true
        });
        this.notify({
            target: updatedProperty,
            valueN: updatedValue,
            onlyState: true
        });
        let position = Model.getValueRelative(updatedValue, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            target: updatedProperty,
            valueN: position,
            onlyState: false
        });
    }
    set changeOrientation(value) {
        this.updateState({
            target: 'direction',
            valueS: value,
            onlyState: true
        });
    }
    set changeType(value) {
        this.updateState({
            target: 'type',
            valueS: value,
            onlyState: true
        });
        if (this.state.min > this.state.valueFrom) this.changeFrom = this.state.min;
        if (this.state.valueFrom > this.state.valueTo) this.changeFrom = this.state.valueTo;
    }
    set changeStep(value) {
        const stepIsValid = (val, max, min)=>{
            return val < max - min && val !== 0;
        };
        if (!stepIsValid(value, this.state.max, this.state.min)) throw new Error('Шаг не может быть больше разницы максимума и минимума или равен нулю');
        this.state.step = value;
    }
    set changeMax(value) {
        if (value < this.state.min || value <= this.state.valueFrom) throw new Error('Максимум не может быть меньше минимума');
        this.updateState({
            target: 'max',
            valueN: value,
            onlyState: true
        });
        if (value < this.state.valueTo) this.changeTo = value;
    }
    get getMax() {
        return this.state.max;
    }
    set changeMin(value) {
        if (value > this.state.max || value >= this.state.valueTo) throw new Error('Минимум не может быть больше максимума');
        this.updateState({
            target: 'min',
            valueN: value,
            onlyState: true
        });
        if (this.state.type === 'double' && value > this.state.valueFrom) this.changeFrom = value;
    }
    get getMin() {
        return this.state.min;
    }
    set changeTo(value) {
        this.updateState({
            target: 'valueTo',
            valueN: this.validValueTo(value),
            onlyState: true
        });
        this.notify({
            valueN: this.state.valueTo,
            target: 'valueTo',
            onlyState: true
        });
        let position = Model.getValueRelative(this.state.valueTo, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            valueN: position,
            target: 'valueTo',
            onlyState: false
        });
    }
    get getValueTo() {
        return this.state.valueTo;
    }
    set changeFrom(value) {
        if (this.state.type === 'single') return;
        this.updateState({
            target: 'valueFrom',
            valueN: this.validValueFrom(value),
            onlyState: true
        });
        this.notify({
            valueN: this.state.valueFrom,
            target: 'valueFrom',
            onlyState: true
        });
        let position = Model.getValueRelative(this.state.valueFrom, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            valueN: position,
            target: 'valueFrom',
            onlyState: false
        });
    }
    get getValueFrom() {
        return this.state.valueFrom;
    }
    updateState(data) {
        if (!data.onlyState) return;
        if (typeof this.state[data.target] === 'string') this.state[data.target] = data.valueS;
        else if (typeof this.state[data.target] === 'number') this.state[data.target] = data.valueN;
        else this.state[data.target] = data.valueB;
    }
    static moreThan0LessThan1(value) {
        let newValue = value;
        newValue = newValue > 1 ? 1 : newValue;
        newValue = newValue < 0 ? 0 : newValue;
        return newValue;
    }
    static getValueRelative(value, min, max) {
        return (value - min) / (max - min);
    }
    calcValue(value, updatedProperty = 'valueTo') {
        let newValue = value;
        newValue *= this.state.max - this.state.min;
        return this.state.min + this.calcValueByStep(newValue, updatedProperty);
    }
    calcValueByStep(value, updatedProperty) {
        let newValue = value;
        if (this.state.step === undefined) throw new Error('Значение step не определено');
        const stepsInValue = newValue / this.state.step;
        if (stepsInValue % 1 >= 0.5) newValue = this.state.step * Math.ceil(stepsInValue);
        else newValue = this.state.step * Math.floor(stepsInValue);
        if (updatedProperty === 'valueTo') {
            const maxSteps = (this.state.max - this.state.min) / this.state.step;
            if (stepsInValue === maxSteps) newValue = this.state.max;
        }
        const popRes = this.state.step.toString().split('.').pop();
        let accuracy = 0;
        if (popRes !== undefined) accuracy = this.state.step.toString().includes('.') ? popRes.length : 0;
        return Number(newValue.toFixed(accuracy));
    }
    validValueTo(valueTo) {
        let value = valueTo;
        if (this.state.type === 'single') {
            if (value > this.state.max) value = this.state.max;
            else if (value < this.state.min) value = this.state.min;
        } else if (this.state.type === 'double') {
            if (value > this.state.max) value = this.state.max;
            else if (value <= this.state.valueFrom) value = this.state.valueFrom + this.state.step;
        }
        return value;
    }
    validValueFrom(valueFrom) {
        let value = valueFrom;
        if (this.state.type === 'single') value = 0;
        else if (this.state.type === 'double') {
            if (value < this.state.min) value = this.state.min;
            else if (value >= this.state.valueTo) value = this.state.valueTo - this.state.step;
        }
        return value;
    }
    calcUpdatedValue(data, updatedProperty) {
        let halfHeadWidth = 0;
        if (data.valueArr !== undefined) halfHeadWidth = data.valueArr[5];
        else throw new Error('Ожидался массив значений для Model');
        const lineParameter = data.valueArr[2];
        const lineCoordinate = data.valueArr[3];
        const HeadCoordinate = data.valueArr[0];
        const shift = data.valueArr[1] - HeadCoordinate;
        let newPosition = (data.valueArr[4] - shift - lineCoordinate + halfHeadWidth) / lineParameter;
        newPosition = Model.moreThan0LessThan1(newPosition);
        const updatedValue = this.calcValue(newPosition, updatedProperty);
        return updatedProperty === 'valueTo' ? this.validValueTo(updatedValue) : this.validValueFrom(updatedValue);
    }
    calcUpdatedValueRelative(data) {
        if (data.valueArr === undefined) throw new Error('Ожидался массив значений для Model');
        const lineParameter = data.valueArr[0];
        const lineCoordinate = data.valueArr[1];
        let newPositionRelative = (data.valueArr[2] - lineCoordinate) / lineParameter;
        newPositionRelative = Model.moreThan0LessThan1(newPositionRelative);
        return this.calcValue(newPositionRelative);
    }
}

},{"./Observer":"2YvSZ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"g4K4g":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _sliderTemplateScss = require("./slider-template.scss");
var _jquerySliderJs = require("../../slider/jquery.slider.js");
class SliderTemplate {
    constructor(element, settings){
        this.handleBubbleButtonClick = (e)=>{
            e.target.checked ? this.slider.Slider('showBubble') : this.slider.Slider('hideBubble');
        };
        this.handleVerticalButtonClick = (e)=>{
            e.target.checked ? this.slider.Slider('changeOrientation', 'vertical') : this.slider.Slider('changeOrientation', 'horizontal');
        };
        this.handleRangeButton = (e)=>{
            if (e.target.checked) {
                this.slider.Slider('changeType', 'double');
                this.$fromInput.parent().removeClass('slider-template__label_hide');
            } else {
                this.slider.Slider('changeType', 'single');
                this.$fromInput.parent().addClass('slider-template__label_hide');
            }
        };
        this.handleStepInputChange = (e)=>{
            this.slider.Slider('changeStep', parseFloat(e.target.value));
        };
        this.handleToInputChange = (e)=>{
            this.slider.Slider('changeTo', parseFloat(e.target.value));
        };
        this.handleFromInputChange = (e)=>{
            this.slider.Slider('changeFrom', parseFloat(e.target.value));
        };
        this.handleMaxInputChange = (e)=>{
            this.slider.Slider('changeMax', parseFloat(e.target.value));
        };
        this.handleMinInputChange = (e)=>{
            this.slider.Slider('changeMin', parseFloat(e.target.value));
        };
        this.element = $(element);
        this.$bubbleButton = $(this.element.find('input[data-type="bubble"]'));
        this.$verticalButton = $(this.element.find('input[data-type="vertical"]'));
        this.$rangeButton = $(this.element.find('input[data-type="range"]'));
        this.$stepInput = $(this.element.find('input[data-type="step"]'));
        this.$toInput = $(this.element.find('input[data-type="to"]'));
        this.$fromInput = $(this.element.find('input[data-type="from"]'));
        this.$maxInput = $(this.element.find('input[data-type="max"]'));
        this.$minInput = $(this.element.find('input[data-type="min"]'));
        const options = Object.assign(settings, {
            onChangeTo: (value)=>{
                this.$toInput.val(value);
            },
            onChangeFrom: (value)=>{
                this.$fromInput.val(value);
            }
        });
        this.slider = $(this.element.find('.slider')).Slider(options);
        this.init();
    }
    init() {
        this.$bubbleButton.on('click', this.handleBubbleButtonClick);
        this.$verticalButton.on('click', this.handleVerticalButtonClick);
        this.$rangeButton.on('click', this.handleRangeButton);
        if (!this.$rangeButton.is(':checked')) this.$fromInput.parent().addClass('slider-template__label_hide');
        this.$stepInput.on('change', this.handleStepInputChange);
        this.$toInput.on('change', this.handleToInputChange);
        this.$toInput.val(String(this.slider.Slider('getValueTo')));
        this.$fromInput.on('change', this.handleFromInputChange);
        this.$fromInput.val(String(this.slider.Slider('getValueFrom')));
        this.$maxInput.on('change', this.handleMaxInputChange);
        this.$maxInput.val(String(this.slider.Slider('getMax')));
        this.$minInput.on('change', this.handleMinInputChange);
        this.$minInput.val(String(this.slider.Slider('getMin')));
    }
}
exports.default = SliderTemplate;

},{"./slider-template.scss":"cDKRu","../../slider/jquery.slider.js":"sYGOa","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cDKRu":[function() {},{}]},["91j40","9Acdi"], "9Acdi", "parcelRequire94c2")

//# sourceMappingURL=index.75a9ed4c.js.map
