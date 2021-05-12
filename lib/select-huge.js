module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("element-ui");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("oa-ui/lib/utils/request");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

module.exports = require("oa-ui/lib/table");

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = require("element-ui/src/utils/resize-event");

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(5);
            var content = __webpack_require__(33);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_huge_vue_vue_type_style_index_0_id_3f8bce6a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_huge_vue_vue_type_style_index_0_id_3f8bce6a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_huge_vue_vue_type_style_index_0_id_3f8bce6a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".select-huge[data-v-3f8bce6a]{display:inline-block;position:relative}.select-huge[data-v-3f8bce6a]  .el-popover{width:100%}.select-huge .input-wrapper[data-v-3f8bce6a]{position:relative}.select-huge .input-wrapper .input-tags[data-v-3f8bce6a]{position:absolute;top:50%;transform:translateY(-50%);z-index:1;display:flex;align-items:center;flex-wrap:wrap;line-height:normal;white-space:normal}.select-huge .input-wrapper .input-tags[data-v-3f8bce6a]  .el-tag{margin:2px 0 2px 6px;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.select-huge .select-input[data-v-3f8bce6a]  .el-input__inner{color:transparent}.tag-wrapper .el-tag[data-v-3f8bce6a]{margin-right:5px;margin-bottom:5px}.tag-wrapper .el-tag[data-v-3f8bce6a]:last-child{margin-right:0}.select-huge-dialog[data-v-3f8bce6a]  .el-dialog__body{padding:10px 20px;max-height:calc(100vh - 20vh - 150px);overflow-y:auto}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-huge/src/select-huge.vue?vue&type=template&id=3f8bce6a&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "select-huge" },
    [
      _vm.multiple
        ? _c(
            "div",
            {
              staticClass: "input-wrapper",
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  return _vm.toggleMenu($event)
                }
              }
            },
            [
              _c(
                "div",
                {
                  ref: "tags",
                  staticClass: "input-tags",
                  style: { width: "calc(100% - 30px)" }
                },
                _vm._l(_vm.currentOptions, function(tag, index) {
                  return _c(
                    "el-tag",
                    {
                      key: index,
                      attrs: {
                        closable: !_vm.selectDisabled,
                        "disable-transitions": false,
                        size: _vm.selectSize,
                        type: "info"
                      },
                      on: {
                        close: function($event) {
                          return _vm.handleRemoveSelected(tag, index)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n        " + _vm._s(tag[_vm.labelName]) + "\n      "
                      )
                    ]
                  )
                }),
                1
              ),
              _c(
                "el-input",
                {
                  ref: "reference",
                  staticClass: "select-input",
                  attrs: {
                    placeholder: (_vm.currentOptions || []).length
                      ? ""
                      : "" + (_vm.$attrs.placeholder || "请选择"),
                    size: _vm.selectSize,
                    value: _vm.getSelectedLabel(),
                    disabled: _vm.selectDisabled
                  },
                  on: {
                    focus: _vm.handleFocus,
                    keydown: [
                      function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k($event.keyCode, "esc", 27, $event.key, [
                            "Esc",
                            "Escape"
                          ])
                        ) {
                          return null
                        }
                        $event.stopPropagation()
                        $event.preventDefault()
                        _vm.visible = false
                      },
                      function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                        ) {
                          return null
                        }
                        _vm.visible = false
                      }
                    ]
                  },
                  nativeOn: {
                    mouseenter: function($event) {
                      _vm.inputHovering = true
                    },
                    mouseleave: function($event) {
                      _vm.inputHovering = false
                    }
                  }
                },
                [
                  _c("template", { slot: "suffix" }, [
                    _c("i", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !_vm.showClose,
                          expression: "!showClose"
                        }
                      ],
                      class: [
                        "el-select__caret",
                        "el-input__icon",
                        "el-icon-" + _vm.iconClass
                      ]
                    }),
                    _vm.showClose
                      ? _c("i", {
                          staticClass:
                            "el-select__caret el-input__icon el-icon-circle-close",
                          on: { click: _vm.handleClearClick }
                        })
                      : _vm._e()
                  ])
                ],
                2
              )
            ],
            1
          )
        : _c(
            "el-input",
            {
              attrs: {
                placeholder: (_vm.currentOptions || []).length
                  ? ""
                  : "" + (_vm.$attrs.placeholder || "请选择"),
                size: _vm.selectSize,
                value: ((_vm.currentOptions || [])[0] || {})[_vm.labelName],
                disabled: _vm.selectDisabled
              },
              on: {
                focus: _vm.handleFocus,
                keydown: [
                  function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "esc", 27, $event.key, [
                        "Esc",
                        "Escape"
                      ])
                    ) {
                      return null
                    }
                    $event.stopPropagation()
                    $event.preventDefault()
                    _vm.visible = false
                  },
                  function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                    ) {
                      return null
                    }
                    _vm.visible = false
                  }
                ]
              },
              nativeOn: {
                mouseenter: function($event) {
                  _vm.inputHovering = true
                },
                mouseleave: function($event) {
                  _vm.inputHovering = false
                }
              }
            },
            [
              _c("template", { slot: "suffix" }, [
                _c("i", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !_vm.showClose,
                      expression: "!showClose"
                    }
                  ],
                  class: [
                    "el-select__caret",
                    "el-input__icon",
                    "el-icon-" + _vm.iconClass
                  ]
                }),
                _vm.showClose
                  ? _c("i", {
                      staticClass:
                        "el-select__caret el-input__icon el-icon-circle-close",
                      on: { click: _vm.handleClearClick }
                    })
                  : _vm._e()
              ])
            ],
            2
          ),
      _c(
        "el-dialog",
        {
          staticClass: "select-huge-dialog",
          attrs: {
            title: _vm.title,
            visible: _vm.visible,
            "append-to-body": "",
            "popper-options": { positionFixed: true },
            "before-close": _vm.handleCancel,
            top: "10vh"
          },
          on: {
            "update:visible": function($event) {
              _vm.visible = $event
            }
          }
        },
        [
          _c(
            "div",
            [
              _c("select-table", {
                attrs: {
                  "default-columns": _vm.fields,
                  "remote-url": _vm.remoteUrl,
                  "query-params": _vm.queryParams,
                  "key-name": _vm.keyName,
                  "label-name": _vm.labelName,
                  size: _vm.selectSize,
                  selected: _vm.selected
                },
                on: { select: _vm.handleSelect }
              }),
              _c(
                "div",
                [
                  _c("el-divider", { attrs: { "content-position": "left" } }, [
                    _vm._v(
                      "\n          已选数据 " +
                        _vm._s(_vm.selected.length) +
                        "条\n        "
                    )
                  ]),
                  _c(
                    "div",
                    { staticClass: "tag-wrapper" },
                    _vm._l(_vm.selected, function(tag, index) {
                      return _c(
                        "el-tag",
                        {
                          key: tag[_vm.labelName],
                          attrs: { closable: "" },
                          on: {
                            close: function($event) {
                              return _vm.handleRemove(tag, index)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n            " +
                              _vm._s(tag[_vm.labelName]) +
                              "\n          "
                          )
                        ]
                      )
                    }),
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  attrs: { size: _vm.selectSize },
                  on: { click: _vm.handleCancel }
                },
                [_vm._v("取 消")]
              ),
              _c(
                "el-button",
                {
                  attrs: { type: "primary", size: _vm.selectSize },
                  on: { click: _vm.handleConfirm }
                },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/select-huge/src/select-huge.vue?vue&type=template&id=3f8bce6a&scoped=true&

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// EXTERNAL MODULE: external "element-ui/src/utils/resize-event"
var resize_event_ = __webpack_require__(16);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-huge/src/table.vue?vue&type=template&id=85cc0648&
var tablevue_type_template_id_85cc0648_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("nx-table", {
        ref: "dataTable",
        attrs: {
          data: _vm.dataSource,
          "table-config": _vm.tableConfig,
          columns: _vm.columns
        },
        on: { search: _vm.handleSearch, action: _vm.$_handleAction }
      })
    ],
    1
  )
}
var tablevue_type_template_id_85cc0648_staticRenderFns = []
tablevue_type_template_id_85cc0648_render._withStripped = true


// CONCATENATED MODULE: ./packages/select-huge/src/table.vue?vue&type=template&id=85cc0648&

// EXTERNAL MODULE: external "oa-ui/lib/table"
var table_ = __webpack_require__(9);
var table_default = /*#__PURE__*/__webpack_require__.n(table_);

// EXTERNAL MODULE: external "oa-ui/lib/utils/request"
var request_ = __webpack_require__(3);
var request_default = /*#__PURE__*/__webpack_require__.n(request_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-huge/src/table.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var tablevue_type_script_lang_js_ = ({
  components: {
    NxTable: table_default.a
  },
  props: {
    defaultColumns: {
      type: Array,

      default() {
        return [];
      }

    },
    remoteUrl: {
      type: String,
      default: '',
      required: true
    },
    queryParams: {
      type: Object,

      default() {
        return {};
      }

    },
    keyName: {
      type: String,
      default: 'id'
    },
    labelName: {
      type: String,
      default: 'name'
    },
    selected: {
      type: Array,

      default() {
        return [];
      }

    }
  },

  data() {
    return {
      dataSource: [],
      tableConfig: {
        isLoading: false,
        totalRecords: 0,
        pageSize: 5,
        filterable: false,
        layout: 'total, prev, pager, next',
        // showHeader: false,
        formConfig: {
          hideButton: true,
          form: {
            inline: false
          }
        },
        operations: {
          btns: [{
            name: '选择',
            type: 'text',
            method: 'handleSelect',
            show: row => {
              var _this$selected;

              return !((_this$selected = this.selected) !== null && _this$selected !== void 0 && _this$selected.find(item => item[this.keyName] === row[this.keyName]));
            }
          }, {
            name: '选择',
            type: 'text',
            disabled: true,
            show: row => {
              var _this$selected2;

              return !!((_this$selected2 = this.selected) !== null && _this$selected2 !== void 0 && _this$selected2.find(item => item[this.keyName] === row[this.keyName]));
            }
          }],
          width: 80,
          label: '操作',
          fixed: 'right'
        }
      },
      columns: this.defaultColumns || []
    };
  },

  methods: {
    handleSearch: external_lodash_default.a.debounce(function (param) {
      const {
        remoteUrl,
        queryParams
      } = this;
      const {
        _searching,
        ...otherParams
      } = param; // eslint-disable-next-line no-unused-vars

      const {
        start,
        limit,
        ...others
      } = _searching || {};
      this.tableConfig.isLoading = true;
      request_default()({
        url: `${remoteUrl}`,
        method: 'GET',
        params: { ...queryParams,
          ...otherParams,
          ...others
        }
      }).then(res => {
        this.dataSource = res.data.dataList;
        this.tableConfig.totalRecords = res.data.totalCount;
        this.tableConfig.isLoading = false;
      }).catch(err => {
        this.$message.error(err.message);
        this.tableConfig.isLoading = false;
      });
    }, 500),

    $_handleAction(methodName, param) {
      // 子组件调用的方法
      this[methodName] && this[methodName](param);
    },

    handleSelect(param) {
      this.$emit('select', param);
    },

    rowClick([row]) {
      this.$emit('select', row);
    }

  }
});
// CONCATENATED MODULE: ./packages/select-huge/src/table.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tablevue_type_script_lang_js_ = (tablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/select-huge/src/table.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tablevue_type_script_lang_js_,
  tablevue_type_template_id_85cc0648_render,
  tablevue_type_template_id_85cc0648_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/select-huge/src/table.vue"
/* harmony default export */ var table = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-huge/src/select-huge.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var select_hugevue_type_script_lang_js_ = ({
  name: "OaSelectHuge",
  components: {
    SelectTable: table,
    ElInput: external_element_ui_["Input"],
    ElDialog: external_element_ui_["Dialog"],
    ElDivider: external_element_ui_["Divider"],
    ElTag: external_element_ui_["Tag"],
    ElButton: external_element_ui_["Button"]
  },
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  props: {
    title: {
      type: String,
      default: "请选择"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array],
      default: ""
    },
    options: {
      type: Array,

      default() {
        return [];
      }

    },
    remoteUrl: {
      type: String,
      required: true
    },
    queryParams: {
      type: Object,

      default() {
        return {};
      }

    },
    keyName: {
      type: String,
      default: "id"
    },
    labelName: {
      type: String,
      default: "name"
    },
    searchLabelName: {
      // 搜索字段名
      type: String,
      default: "searchText"
    },
    tableConfig: {
      type: Array,

      default() {
        return undefined;
      }

    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      selected: external_lodash_default.a.cloneDeep(this.options) || [],
      visible: false,
      inputHovering: false,
      currentValue: this.value || "",
      currentOptions: external_lodash_default.a.cloneDeep(this.options) || [],
      fields: this.tableConfig || [{
        type: "el-input",
        field: this.searchLabelName,
        title: "",
        props: {
          clearable: true,
          placeholder: "请输入名称搜索"
        },
        col: {
          span: 24
        },
        config: {
          showInTable: false,
          showInSearch: {
            searchType: ""
          }
        }
      }, {
        field: this.labelName,
        title: "名称",
        config: {
          showInTable: {},
          showInSearch: false
        }
      }],
      initialInputHeight: 0
    };
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },

    iconClass() {
      return this.visible ? "arrow-up" : "arrow-down";
    },

    showClose() {
      let hasValue = this.multiple ? Array.isArray(this.value) && this.value.length > 0 : this.value !== undefined && this.value !== null && this.value !== "";
      let criteria = this.clearable && !this.selectDisabled && this.inputHovering && hasValue;
      return criteria;
    },

    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }

  },
  watch: {
    value(newValue) {
      if (newValue !== this.currentValue) {
        this.currentValue = newValue;
      }

      if (Array.isArray(newValue)) {
        this.selected = newValue === null || newValue === void 0 ? void 0 : newValue.map(key => {
          var _$find;

          const label = (_$find = external_lodash_default.a.find(this.selected, item => item[this.keyName] === key)) === null || _$find === void 0 ? void 0 : _$find[this.labelName];
          return {
            [this.keyName]: key,
            [this.labelName]: label || key
          };
        });
      } else if (newValue) {
        var _$find2;

        const label = (_$find2 = external_lodash_default.a.find(this.selected, item => item[this.keyName] === newValue)) === null || _$find2 === void 0 ? void 0 : _$find2[this.labelName];
        this.selected = [{
          [this.keyName]: newValue,
          [this.labelName]: label || newValue
        }];
      } else {
        this.selected = [];
      }

      this.$nextTick(() => {
        this.currentOptions = external_lodash_default.a.cloneDeep(this.selected);
        this.$emit("update:options", external_lodash_default.a.cloneDeep(this.selected));
      });
    },

    options(newValue) {
      this.currentOptions = external_lodash_default.a.cloneDeep(newValue);
      this.selected = external_lodash_default.a.cloneDeep(newValue);
    }

  },

  mounted() {
    const reference = this.$refs.reference;

    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      const input = reference.$el.querySelector("input");
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }

    if (this.multiple) {
      this.resetInputHeight();
      Object(resize_event_["addResizeListener"])(this.$refs.tags, this.handleResize);
    }
  },

  beforeDestroy() {
    if (this.$el && this.handleResize) Object(resize_event_["removeResizeListener"])(this.$el, this.handleResize);
  },

  methods: {
    handleResize() {
      if (this.multiple) this.resetInputHeight();
    },

    handleFocus() {
      this.visible = true;
    },

    handleRemove(tag, index) {
      this.selected.splice(index, 1);
    },

    handleRemoveSelected(tag, index) {
      var _this$selected;

      this.selected.splice(index, 1);
      let value = (_this$selected = this.selected) === null || _this$selected === void 0 ? void 0 : _this$selected.map(item => item[this.keyName]);
      this.$emit("input", value);
      this.$emit("change", value);
      this.currentOptions = external_lodash_default.a.cloneDeep(this.selected);
      this.$emit("update:options", external_lodash_default.a.cloneDeep(this.selected));
    },

    handleSelect(param) {
      var _this$selected2;

      const id = param[this.keyName];
      const index = (_this$selected2 = this.selected) === null || _this$selected2 === void 0 ? void 0 : _this$selected2.findIndex(item => item[this.keyName] === id);

      if (index === -1) {
        if (!this.multiple) {
          this.selected = [param];
        } else {
          this.selected.push(param);
        }
      }

      if (!this.multiple) {
        var _this$selected3, _this$selected3$;

        const value = (_this$selected3 = this.selected) === null || _this$selected3 === void 0 ? void 0 : (_this$selected3$ = _this$selected3[0]) === null || _this$selected3$ === void 0 ? void 0 : _this$selected3$[this.keyName];
        const isChange = value !== this.value;
        this.$emit("input", value);

        if (isChange) {
          this.$emit("change", value);
        }

        this.currentOptions = external_lodash_default.a.cloneDeep(this.selected);
        this.$emit("update:options", external_lodash_default.a.cloneDeep(this.selected));
        this.visible = false;
      }
    },

    handleConfirm() {
      var _this$selected4;

      const value = (_this$selected4 = this.selected) === null || _this$selected4 === void 0 ? void 0 : _this$selected4.map(item => item[this.keyName]);
      let isChange = true;

      try {
        isChange = JSON.stringify(value) !== JSON.stringify(this.value);
      } catch (e) {
        console.info(e);
      }

      this.$emit("input", value);

      if (isChange) {
        this.$emit("change", value);
      }

      this.$emit("update:options", external_lodash_default.a.cloneDeep(this.selected));
      this.currentOptions = external_lodash_default.a.cloneDeep(this.selected);
      this.visible = false;
    },

    handleCancel() {
      this.selected = external_lodash_default.a.cloneDeep(this.currentOptions) || [];
      this.visible = false;
    },

    resetInputHeight() {
      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(inputChildNodes, item => item.tagName === "INPUT")[0];
        const tags = this.$refs.tags;
        const sizeInMap = this.initialInputHeight || 40;
        input.style.height = this.currentOptions.length === 0 ? sizeInMap + "px" : Math.max(tags ? tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0) : 0, sizeInMap) + "px";
      });
    },

    toggleMenu() {
      if (!this.disabled) {
        (this.$refs.input || this.$refs.reference).focus();
      }
    },

    handleClearClick(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : "";
      this.$emit("input", value);
      this.$emit("change", value);
      this.visible = false;
      this.$emit("clear");
      this.selected = [];
      this.currentOptions = [];
      this.$emit("update:options", []);
    },

    getSelectedLabel() {
      var _this$currentOptions, _this$currentOptions$;

      const selectedLabel = (_this$currentOptions = this.currentOptions) === null || _this$currentOptions === void 0 ? void 0 : (_this$currentOptions$ = _this$currentOptions.map(item => item[this.labelName])) === null || _this$currentOptions$ === void 0 ? void 0 : _this$currentOptions$.join(',');
      return selectedLabel;
    }

  }
});
// CONCATENATED MODULE: ./packages/select-huge/src/select-huge.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_select_hugevue_type_script_lang_js_ = (select_hugevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/select-huge/src/select-huge.vue?vue&type=style&index=0&id=3f8bce6a&lang=scss&scoped=true&
var select_hugevue_type_style_index_0_id_3f8bce6a_lang_scss_scoped_true_ = __webpack_require__(32);

// CONCATENATED MODULE: ./packages/select-huge/src/select-huge.vue






/* normalize component */

var select_huge_component = Object(componentNormalizer["a" /* default */])(
  src_select_hugevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3f8bce6a",
  null
  
)

/* hot reload */
if (false) { var select_huge_api; }
select_huge_component.options.__file = "packages/select-huge/src/select-huge.vue"
/* harmony default export */ var select_huge = (select_huge_component.exports);
// CONCATENATED MODULE: ./packages/select-huge/index.js

/* istanbul ignore next */

select_huge.install = function (Vue) {
  Vue.component(select_huge.name, select_huge);
};

/* harmony default export */ var packages_select_huge = __webpack_exports__["default"] = (select_huge);

/***/ })
/******/ ]);