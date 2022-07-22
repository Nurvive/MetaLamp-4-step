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
                if (settings.step > settings.max - settings.min) throw new Error('Шаг не может быть больше разницы максимума и минимума');
                if (settings.step <= 0) throw new Error('Шаг должен быть больше нуля');
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
        changeDirection: function(value) {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            slider.changeDirection(value);
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
        getStep: function() {
            let slider;
            sliders.forEach((x)=>{
                if (x.elem === this[0]) slider = x;
            });
            return slider.getStep();
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
        this.model = new _model.Model(settings);
        this.view = new _view.View(this.elem, settings);
        this.view.init();
        this.presenter = new _presenter.Presenter(this.model, this.view);
    }
    hideBubble() {
        this.model.bubble = false;
        return true;
    }
    showBubble() {
        this.model.bubble = true;
        return true;
    }
    changeDirection(value) {
        this.model.direction = value;
        return true;
    }
    changeType(value) {
        this.model.type = value;
        return true;
    }
    changeStep(value) {
        this.model.step = value;
        return true;
    }
    changeTo(value) {
        this.model.to = value;
        return true;
    }
    changeFrom(value) {
        this.model.from = value;
        return true;
    }
    changeMax(value) {
        this.model.max = value;
        return true;
    }
    changeMin(value) {
        this.model.min = value;
        return true;
    }
    getMax() {
        return this.model.max;
    }
    getMin() {
        return this.model.min;
    }
    getValueTo() {
        return this.model.valueTo;
    }
    getValueFrom() {
        return this.model.valueFrom;
    }
    getStep() {
        return this.model.step;
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
            const evt = View.getEvent(e.detail.data.data); // Здесь нужен каст через 'as', так как TS не знает, что target это html объект
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
                dataArray.push(this.line.width);
                dataArray.push(this.line.leftCoordinate);
                dataArray.push(evtSwipe.clientX);
            } else {
                dataArray.push(this.line.height);
                dataArray.push(this.line.topCoordinate);
                dataArray.push(evtSwipe.clientY);
            }
            dataArray.push(this.head.width / 2);
            this.notify('default', {
                valueArray: dataArray.slice(),
                target: updatedHead
            });
            dataArray.splice(2, dataArray.length - 2);
            return dataArray;
        };
        this.handleSwipeEnd = ()=>{
            this.onEndWork();
            document.removeEventListener('touchmove', this.handleSwipe);
            document.removeEventListener('mousemove', this.handleSwipe);
            document.removeEventListener('touchend', this.handleSwipeEnd);
            document.removeEventListener('mouseup', this.handleSwipeEnd);
            return true;
        };
        this.handleScaleClick = (event)=>{
            const dataArray = this.scaleClickData(event);
            dataArray.push(event.detail.data.value);
            this.notify('default', {
                target: 'value',
                valueArray: dataArray
            });
            this.changeZIndex();
        };
        this.handleLineClick = (event)=>{
            const dataArray = this.scaleClickData(event);
            this.notify('default', {
                target: 'valueClick',
                valueArray: dataArray
            });
            this.changeZIndex();
        };
        this.elem = elem;
        this.handleSwipe = ()=>[]
        ;
        this.state = Object.assign({
        }, options);
        this.line = new _lineDefault.default({
            parent: this.elem,
            direction: this.state.direction,
            type: this.state.type
        });
        this.scale = new _scaleDefault.default({
            parent: this.line.element,
            direction: this.state.direction,
            min: this.state.min,
            max: this.state.max
        });
        const headStartPos = this.calcHeadStartPosition(this.state.valueTo);
        this.head = new _viewHeadDefault.default({
            parent: this.line.element,
            direction: this.state.direction,
            value: headStartPos,
            bubbleValue: this.state.valueTo,
            type: 'to'
        });
    }
    init() {
        if (this.state.type === 'double') {
            const head2StartPos = this.calcHeadStartPosition(this.state.valueFrom);
            this.head2 = new _viewHeadDefault.default({
                parent: this.line.element,
                direction: this.state.direction,
                value: head2StartPos,
                bubbleValue: this.state.valueFrom,
                type: 'from'
            });
        }
        if (this.state.bubble) {
            this.head.showBubble();
            if (this.state.type === 'double' && this.head2 !== undefined) this.head2.showBubble();
        }
        this.line.progressValue(this.head.element, this.head2?.element);
        this.changeZIndex();
        this.setup();
    }
    changePosition(data) {
        let position = 0;
        if (data.valueNumber !== undefined) position = data.valueNumber;
        else throw new Error('Новое значение не определено');
        if (data.target === 'valueTo') {
            this.head.updatePosition(position);
            this.head.updateBubble(this.state.valueTo);
            this.state.onChangeTo(this.state.valueTo);
            this.line.progressValue(this.head.element, this.head2?.element);
        } else if (data.target === 'valueFrom' && this.head2 !== undefined) {
            this.head2.updatePosition(position);
            this.head2.updateBubble(this.state.valueFrom);
            this.state.onChangeFrom(this.state.valueFrom);
            this.line.progressValue(this.head.element, this.head2.element);
        } else throw new Error('Head2 не существует');
    }
    hideBubble(data) {
        this.updateState({
            target: data.target,
            valueBoolean: data.valueBoolean
        });
        this.head.hideBubble();
        this.head2?.hideBubble();
    }
    showBubble(data) {
        this.updateState({
            target: data.target,
            valueBoolean: data.valueBoolean
        });
        this.head.showBubble();
        this.head2?.showBubble();
    }
    changeDirection(data) {
        this.updateState({
            target: data.target,
            valueString: data.valueString
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }
    changeType(data) {
        this.updateState({
            target: data.target,
            valueString: data.valueString
        });
        this.head.removeHead();
        this.head2?.removeHead();
        delete this.head2;
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }
    changeStep(data) {
        this.updateState({
            target: data.target,
            valueNumber: data.valueNumber
        });
    }
    changeMaxMin(data) {
        this.updateState({
            target: data.target,
            valueNumber: data.valueNumber
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }
    updateState(data) {
        const target = data.target;
        const value = View.getValueFromData(data);
        this.state = {
            ...this.state,
            [target]: value
        };
    }
    reInit() {
        this.line = new _lineDefault.default({
            parent: this.elem,
            direction: this.state.direction,
            type: this.state.type
        });
        this.scale = new _scaleDefault.default({
            parent: this.line.element,
            direction: this.state.direction,
            min: this.state.min,
            max: this.state.max
        });
        const headStartPos = this.calcHeadStartPosition(this.state.valueTo);
        this.head = new _viewHeadDefault.default({
            parent: this.line.element,
            direction: this.state.direction,
            value: headStartPos,
            bubbleValue: this.state.valueTo,
            type: 'to'
        });
        this.init();
    }
    setup() {
        this.elem.addEventListener('headStart', this.handleHeadStart);
        this.elem.addEventListener('scaleClick', this.handleScaleClick);
        this.elem.addEventListener('lineClick', this.handleLineClick);
    }
    static getValueFromData(data) {
        let value;
        Object.entries(data).forEach((key)=>{
            if (key[0] !== 'target') value = key[1];
        });
        return value;
    }
    calcHeadStartPosition(value) {
        return (value - this.state.min) / (this.state.max - this.state.min);
    }
    static getEvent(event) {
        if (event instanceof TouchEvent) return event.touches[0];
        return event;
    }
    onEndWork() {
        this.head.offActive();
        this.head2?.offActive();
        this.changeZIndex();
    }
    changeZIndex() {
        const isInCorner = ()=>{
            return this.state.valueTo >= this.state.max - this.state.step * 2;
        };
        if (this.head2 && isInCorner()) this.head2.high();
        else if (this.head2) this.head2.down();
    }
    scaleClickData(event) {
        const evt = View.getEvent(event.detail.data.event);
        const dataArray = [];
        if (this.state.direction === 'horizontal') {
            dataArray.push(this.line.width);
            dataArray.push(this.line.leftCoordinate);
            dataArray.push(evt.clientX);
        } else {
            dataArray.push(this.line.height);
            dataArray.push(this.line.topCoordinate);
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
    subscribe(eventType, observer) {
        this.observers.push({
            eventType: eventType,
            observer: observer
        });
    }
    unsubscribe(eventType, observer) {
        this.observers = this.observers.filter((item)=>item.observer !== observer
        );
    }
    notify(eventType, data) {
        this.observers.forEach((item)=>{
            if (item.eventType === eventType) item.observer(data);
        });
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
    constructor({ parent , direction , value , bubbleValue , type  }){
        this.handleHeadStart = (e)=>{
            this.onActive();
            const headEvent = new CustomEvent('headStart', {
                detail: {
                    data: e
                }
            });
            this.parent.dispatchEvent(headEvent);
        };
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.type = type;
        this.bubble = new _headBubbleDefault.default(this.element, this.type);
        this.updatePosition(value);
        this.updateBubble(bubbleValue);
        this.init();
    }
    init() {
        this.element.classList.add('slider__head');
        if (this.type === 'to') this.element.setAttribute('data-valueTo', 'true');
        else this.element.setAttribute('data-valueFrom', 'true');
        this.direction === 'horizontal' ? this.element.classList.add('slider__head') : this.element.classList.add('slider__head', 'slider__head_direction_vertical');
        this.parent.append(this.element);
        this.element.addEventListener('mousedown', this.handleHeadStart);
        this.element.addEventListener('touchstart', this.handleHeadStart);
    }
    onActive() {
        this.element.classList.add('slider__head_active');
        this.bubble.onActive();
    }
    offActive() {
        this.element.classList.remove('slider__head_active');
        this.bubble.offActive();
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
    get width() {
        return this.element.getBoundingClientRect().width;
    }
    get height() {
        return this.element.getBoundingClientRect().height;
    }
    high() {
        this.element.classList.add('slider__head_z_high');
    }
    down() {
        this.element.classList.remove('slider__head_z_high');
    }
}
exports.default = ViewHead;

},{"./HeadBubble":"euY79","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"euY79":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class HeadBubble {
    constructor(parent, type){
        this.parent = parent;
        this.type = type;
        this.element = document.createElement('span');
        this.init();
    }
    init() {
        this.element.classList.add('slider__head-bubble');
        this.element.setAttribute('data-type', 'bubble');
        if (this.type === 'to') this.element.setAttribute('data-valueTo', 'true');
        else this.element.setAttribute('data-valueFrom', 'true');
        this.parent.append(this.element);
    }
    update(value) {
        this.element.textContent = String(value);
    }
    onActive() {
        this.element.classList.add('slider__head-bubble_isGrabbing');
    }
    offActive() {
        this.element.classList.remove('slider__head-bubble_isGrabbing');
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
    constructor({ parent , direction , min , max  }){
        this.handleScaleClick = (e)=>{
            const node = e.target;
            const headEvent = new CustomEvent('scaleClick', {
                detail: {
                    event: e,
                    value: Number(node.dataset.value)
                }
            });
            this.parent.dispatchEvent(headEvent);
        };
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.init(min, max);
    }
    init(min, max) {
        this.direction === 'horizontal' ? this.element.classList.add('slider__scale') : this.element.classList.add('slider__scale', 'slider__scale_direction_vertical');
        this.parent.append(this.element);
        const step = (max - min) / 4;
        for(let i = 0; i <= 100; i += 25){
            const dashValue = min + i / 25 * step;
            const dash = document.createElement('div');
            dash.classList.add('slider__dash');
            const scaleNumber = document.createElement('div');
            scaleNumber.classList.add('slider__scale-number');
            scaleNumber.dataset.value = String(dashValue);
            scaleNumber.addEventListener('click', this.handleScaleClick);
            if (this.direction === 'horizontal') {
                dash.style.left = `${i}%`;
                scaleNumber.style.left = `${i}%`;
                dash.append(scaleNumber);
                this.element.append(dash);
            } else {
                dash.style.top = `${i}%`;
                dash.classList.add('slider__dash_direction_vertical');
                scaleNumber.style.top = `${i}%`;
                scaleNumber.classList.add('slider__scale-number_direction_vertical');
                dash.append(scaleNumber);
                this.element.append(dash);
            }
            const numbers = this.element.querySelectorAll('.slider__scale-number');
            const number = numbers[numbers.length - 1];
            if (i === 0) number.innerHTML = String(min);
            else number.innerHTML = Number.isInteger(dashValue) ? String(dashValue) : dashValue.toFixed(2);
        }
    }
    removeScale() {
        this.element.remove();
    }
    get width() {
        return this.element.getBoundingClientRect().width;
    }
    get leftCoordinate() {
        return this.element.getBoundingClientRect().left;
    }
    get height() {
        return this.element.getBoundingClientRect().height;
    }
    get topCoordinate() {
        return this.element.getBoundingClientRect().top;
    }
}
exports.default = Scale;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7Lk3Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Line {
    constructor({ parent , direction , type  }){
        this.handleHeadStart = (e)=>{
            const headEvent = new CustomEvent('headStart', {
                detail: {
                    data: e.detail
                }
            });
            this.parent.dispatchEvent(headEvent);
        };
        this.handleScaleClick = (e)=>{
            const headEvent = new CustomEvent('scaleClick', {
                detail: {
                    data: e.detail
                }
            });
            this.parent.dispatchEvent(headEvent);
        };
        this.handleLineClick = (e)=>{
            if (e.target !== this.element) return;
            const headEvent = new CustomEvent('lineClick', {
                detail: {
                    data: {
                        event: e
                    }
                }
            });
            this.parent.dispatchEvent(headEvent);
        };
        this.parent = parent;
        this.direction = direction;
        this.type = type;
        this.element = document.createElement('div');
        this.progressBar = document.createElement('span');
        this.init();
    }
    init() {
        if (this.direction === 'horizontal') {
            this.element.classList.add('slider__line');
            this.progressBar.classList.add('slider__line-progress');
        } else {
            this.element.classList.add('slider__line', 'slider__line_direction_vertical');
            this.progressBar.classList.add('slider__line-progress', 'slider__line-progress_direction_vertical');
        }
        this.element.append(this.progressBar);
        this.parent.append(this.element);
        this.element.addEventListener('headStart', this.handleHeadStart);
        this.element.addEventListener('scaleClick', this.handleScaleClick);
        this.element.addEventListener('click', this.handleLineClick);
    }
    set Type(type) {
        this.type = type;
    }
    progressValue(to, from) {
        if (this.direction === 'horizontal') {
            if (this.type === 'single') this.progressBar.style.width = to.style.left;
            else if (from !== undefined) {
                this.progressBar.style.width = `${parseInt(to.style.left, 10) - parseInt(from.style.left, 10)}%`;
                this.progressBar.style.left = from.style.left;
            }
        } else if (this.type === 'single') this.progressBar.style.height = to.style.top;
        else if (from !== undefined) {
            this.progressBar.style.height = `${parseInt(to.style.top, 10) - parseInt(from.style.top, 10)}%`;
            this.progressBar.style.top = from.style.top;
        }
    }
    removeLine() {
        this.element.remove();
    }
    get width() {
        return this.element.getBoundingClientRect().width;
    }
    get leftCoordinate() {
        return this.element.getBoundingClientRect().left;
    }
    get height() {
        return this.element.getBoundingClientRect().height;
    }
    get topCoordinate() {
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
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.view.subscribe('default', this.model.calcPosition.bind(this.model));
        this.model.subscribe('state', this.view.updateState.bind(this.view));
        this.model.subscribe('default', this.view.changePosition.bind(this.view));
        this.model.subscribe('direction', this.view.changeDirection.bind(this.view));
        this.model.subscribe('type', this.view.changeType.bind(this.view));
        this.model.subscribe('step', this.view.changeStep.bind(this.view));
        this.model.subscribe('max', this.view.changeMaxMin.bind(this.view));
        this.model.subscribe('min', this.view.changeMaxMin.bind(this.view));
        this.model.subscribe('showBubble', this.view.showBubble.bind(this.view));
        this.model.subscribe('hideBubble', this.view.hideBubble.bind(this.view));
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1W6vh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Model", ()=>Model
);
var _observer = require("./Observer");
class Model extends _observer.Observer {
    constructor(options){
        super();
        this.isValueTo = (updatedValue)=>(updatedValue - this.state.valueFrom) / (this.state.valueTo - this.state.valueFrom) >= 0.5
        ;
        this.state = Object.assign({
        }, options);
    }
    calcPosition(data) {
        let updatedValue;
        let updatedProperty;
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            updatedValue = this.calcUpdatedValue(data, updatedProperty);
        } else if (data.target === 'value') {
            const property = this.calcValueHelper(data);
            updatedValue = data.valueArray?.[3] || 0;
            updatedProperty = property;
        } else if (data.target === 'valueClick') {
            const { property , value  } = this.calcValueHelperClick(data);
            updatedValue = value;
            updatedProperty = property;
        } else {
            updatedProperty = 'valueFrom';
            updatedValue = this.calcUpdatedValue(data, updatedProperty);
        }
        updatedValue = Number(updatedValue.toFixed(2));
        this.state = {
            ...this.state,
            [updatedProperty]: updatedValue
        };
        this.notify('state', {
            target: updatedProperty,
            valueNumber: updatedValue
        });
        let position = Model.getValueRelative({
            value: updatedValue,
            min: this.state.min,
            max: this.state.max
        });
        position = Model.moreThan0LessThan1(position);
        this.notify('default', {
            target: updatedProperty,
            valueNumber: position
        });
    }
    set bubble(value) {
        this.state.bubble = value;
        if (value) this.notify('showBubble', {
            target: 'bubble',
            valueBoolean: value
        });
        else this.notify('hideBubble', {
            target: 'bubble',
            valueBoolean: value
        });
    }
    set direction(value) {
        this.state.direction = value;
        this.notify('direction', {
            target: 'direction',
            valueString: value
        });
    }
    set type(value) {
        this.state.type = value;
        this.notify('type', {
            target: 'type',
            valueString: value
        });
        if (this.state.min > this.state.valueFrom) this.from = this.state.min;
        if (this.state.valueFrom > this.state.valueTo) this.from = this.state.valueTo;
    }
    set step(value) {
        const stepIsValid = (val, max, min)=>{
            return val < max - min && val > 0;
        };
        if (!stepIsValid(value, this.state.max, this.state.min)) throw new Error('Шаг не может быть больше разницы максимума и минимума или меньше нуля');
        this.state.step = value;
        this.notify('step', {
            target: 'step',
            valueNumber: value
        });
    }
    get step() {
        return this.state.step;
    }
    set max(value) {
        if (value <= this.state.min) throw new Error('Максимум не может быть меньше или равен минимуму');
        if (value < this.state.valueTo) {
            this.to = value;
            this.notify('state', {
                target: 'valueTo',
                valueNumber: value
            });
        }
        this.state.max = value;
        this.notify('max', {
            target: 'max',
            valueNumber: value
        });
    }
    get max() {
        return this.state.max;
    }
    set min(value) {
        if (value >= this.state.max || value >= this.state.valueTo) throw new Error('Минимум не может быть больше или равен максимуму');
        if (this.state.type === 'double' && value > this.state.valueFrom) {
            this.from = value;
            this.notify('state', {
                target: 'valueFrom',
                valueNumber: value
            });
        }
        this.state.min = value;
        this.notify('min', {
            target: 'min',
            valueNumber: value
        });
    }
    get min() {
        return this.state.min;
    }
    set to(value) {
        this.state.valueTo = this.validValueTo(value);
        this.notify('state', {
            target: 'valueTo',
            valueNumber: this.state.valueTo
        });
        let position = Model.getValueRelative({
            value: this.state.valueTo,
            min: this.state.min,
            max: this.state.max
        });
        position = Model.moreThan0LessThan1(position);
        this.notify('default', {
            target: 'valueTo',
            valueNumber: position
        });
    }
    get valueTo() {
        return this.state.valueTo;
    }
    set from(value) {
        if (this.state.type === 'single') return;
        this.state.valueFrom = Number(this.validValueFrom(value).toFixed(2));
        this.notify('state', {
            target: 'valueFrom',
            valueNumber: this.state.valueFrom
        });
        let position = Model.getValueRelative({
            value: this.state.valueFrom,
            min: this.state.min,
            max: this.state.max
        });
        position = Model.moreThan0LessThan1(position);
        this.notify('default', {
            target: 'valueFrom',
            valueNumber: position
        });
    }
    get valueFrom() {
        return this.state.valueFrom;
    }
    static moreThan0LessThan1(value) {
        let newValue = value;
        newValue = newValue > 1 ? 1 : newValue;
        newValue = newValue < 0 ? 0 : newValue;
        return newValue;
    }
    static getValueRelative({ value , min , max  }) {
        return (value - min) / (max - min);
    }
    calcValue(value, updatedProperty = 'valueTo') {
        let newValue = value;
        newValue *= this.state.max - this.state.min;
        return this.state.min + this.calcValueByStep(newValue, updatedProperty);
    }
    calcValueHelper(data) {
        const updatedValue = this.calcUpdatedValueRelative(data);
        let updatedProperty;
        if (this.state.type === 'single') updatedProperty = 'valueTo';
        else updatedProperty = this.isValueTo(updatedValue) ? 'valueTo' : 'valueFrom';
        return updatedProperty;
    }
    calcValueHelperClick(data) {
        let updatedValue = this.calcUpdatedValueRelative(data);
        let updatedProperty;
        if (this.state.type === 'single') updatedProperty = 'valueTo';
        else updatedProperty = this.isValueTo(updatedValue) ? 'valueTo' : 'valueFrom';
        updatedValue = updatedProperty === 'valueFrom' ? this.validValueFrom(updatedValue) : this.validValueTo(updatedValue);
        return {
            property: updatedProperty,
            value: updatedValue
        };
    }
    calcValueByStep(value, updatedProperty) {
        let newValue = value;
        if (this.state.step === undefined) throw new Error('Значение step не определено');
        const stepsInValue = newValue / this.state.step;
        if (stepsInValue % 1 >= 0.5) newValue = this.state.step * Math.ceil(stepsInValue);
        else newValue = this.state.step * Math.floor(stepsInValue);
        if (updatedProperty === 'valueTo') {
            const maxSteps = (this.state.max - this.state.min) / this.state.step;
            if (stepsInValue === maxSteps) newValue = this.state.min < 0 ? this.state.max + Math.abs(this.state.min) : this.state.max;
        }
        const popRes = this.state.step.toString().split('.').pop();
        let accuracy = 0;
        if (popRes !== undefined) accuracy = this.state.step.toString().includes('.') ? popRes.length : 0;
        return Number(newValue.toFixed(accuracy));
    }
    validValueTo(valueTo) {
        if (valueTo > this.state.max) return this.state.max;
        if (valueTo < this.state.min) return this.state.min;
        if (this.state.type === 'double' && valueTo <= this.state.valueFrom) return this.state.valueFrom + this.state.step;
        return valueTo;
    }
    validValueFrom(valueFrom) {
        if (valueFrom < this.state.min) return this.state.min;
        if (valueFrom >= this.state.valueTo) return this.state.valueTo - this.state.step;
        return valueFrom;
    }
    calcUpdatedValue(data, updatedProperty) {
        if (data.valueArray === undefined) throw new Error('Ожидался массив значений для Model');
        const [headCoordinate, clientCoordinate, lineParameter, lineCoordinate, swipeClient, halfHeadWidth] = data.valueArray;
        const shift = clientCoordinate - headCoordinate;
        let newPosition = (swipeClient - shift - lineCoordinate + halfHeadWidth) / lineParameter;
        newPosition = Model.moreThan0LessThan1(newPosition);
        const updatedValue = this.calcValue(newPosition, updatedProperty);
        return updatedProperty === 'valueTo' ? this.validValueTo(updatedValue) : this.validValueFrom(updatedValue);
    }
    calcUpdatedValueRelative(data) {
        if (data.valueArray === undefined) throw new Error('Ожидался массив значений для Model');
        const [lineParameter, lineCoordinate, clientCoordinate] = data.valueArray;
        let newPositionRelative = (clientCoordinate - lineCoordinate) / lineParameter;
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
            e.target.checked ? this.slider?.Slider('showBubble') : this.slider?.Slider('hideBubble');
        };
        this.handleVerticalButtonClick = (e)=>{
            e.target.checked ? this.slider?.Slider('changeDirection', 'vertical') : this.slider?.Slider('changeDirection', 'horizontal');
        };
        this.handleRangeButtonClick = (e)=>{
            if (e.target.checked) {
                this.slider?.Slider('changeType', 'double');
                this.$fromInput?.parent().removeClass('slider-template__label_hide');
            } else {
                this.slider?.Slider('changeType', 'single');
                this.$fromInput?.parent().addClass('slider-template__label_hide');
            }
        };
        this.handleStepInputChange = (e)=>{
            try {
                this.slider?.Slider('changeStep', parseFloat(e.target.value));
                const step = this.slider?.Slider('getStep');
                this.$toInput?.attr('step', String(step));
                this.$fromInput?.attr('step', String(step));
            } catch (error) {
                e.target.value = this.slider?.Slider('getStep');
            }
        };
        this.handleToInputChange = (e)=>{
            this.slider?.Slider('changeTo', parseFloat(e.target.value));
        };
        this.handleFromInputChange = (e)=>{
            this.slider?.Slider('changeFrom', parseFloat(e.target.value));
        };
        this.handleMaxInputChange = (e)=>{
            try {
                this.slider?.Slider('changeMax', parseFloat(e.target.value));
            } catch (error) {
                e.target.value = this.slider?.Slider('getMax');
            }
        };
        this.handleMinInputChange = (e)=>{
            try {
                this.slider?.Slider('changeMin', parseFloat(e.target.value));
            } catch (error) {
                e.target.value = this.slider?.Slider('getMin');
            }
        };
        this.element = $(element);
        this.init(settings);
    }
    init(settings) {
        this.$bubbleButton = $(this.element.find('.js-slider-template__inner-input-bubble'));
        this.$verticalButton = $(this.element.find('.js-slider-template__inner-input-vertical'));
        this.$rangeButton = $(this.element.find('.js-slider-template__inner-input-range'));
        this.$stepInput = $(this.element.find('.js-slider-template__inner-input-step'));
        this.$toInput = $(this.element.find('.js-slider-template__inner-input-to'));
        this.$fromInput = $(this.element.find('.js-slider-template__inner-input-from'));
        this.$maxInput = $(this.element.find('.js-slider-template__inner-input-max'));
        this.$minInput = $(this.element.find('.js-slider-template__inner-input-min'));
        const options = Object.assign(settings, {
            onChangeTo: (value)=>{
                this.$toInput?.val(value);
            },
            onChangeFrom: (value)=>{
                this.$fromInput?.val(value);
            }
        });
        this.slider = $(this.element.find('.slider')).Slider(options);
        this.setup();
    }
    setup() {
        this.$bubbleButton?.on('click', this.handleBubbleButtonClick);
        this.$verticalButton?.on('click', this.handleVerticalButtonClick);
        this.$rangeButton?.on('click', this.handleRangeButtonClick);
        if (!this.$rangeButton?.is(':checked')) this.$fromInput?.parent().addClass('slider-template__label_hide');
        this.$stepInput?.on('change', this.handleStepInputChange);
        this.$stepInput?.val(String(this.slider?.Slider('getStep')));
        this.$toInput?.on('change', this.handleToInputChange);
        this.$toInput?.val(String(this.slider?.Slider('getValueTo')));
        this.$fromInput?.on('change', this.handleFromInputChange);
        this.$fromInput?.val(String(this.slider?.Slider('getValueFrom')));
        this.$maxInput?.on('change', this.handleMaxInputChange);
        this.$maxInput?.val(String(this.slider?.Slider('getMax')));
        this.$minInput?.on('change', this.handleMinInputChange);
        this.$minInput?.val(String(this.slider?.Slider('getMin')));
    }
}
exports.default = SliderTemplate;

},{"./slider-template.scss":"cDKRu","../../slider/jquery.slider.js":"sYGOa","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cDKRu":[function() {},{}]},["91j40","9Acdi"], "9Acdi", "parcelRequire94c2")

//# sourceMappingURL=index.75a9ed4c.js.map
