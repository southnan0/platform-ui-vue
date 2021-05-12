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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
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
/* 3 */,
/* 4 */,
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("oa-ui/lib/utils/fields-tools");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("oa-ui/lib/utils/scroll-to");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(5);
            var content = __webpack_require__(14);

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
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/operation.vue?vue&type=template&id=956c5732&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.operations
    ? _c(
        "el-table-column",
        _vm._b(
          {
            scopedSlots: _vm._u(
              [
                {
                  key: "default",
                  fn: function(scope) {
                    return [
                      _vm._l(_vm.operations.btns, function(btn, key) {
                        return [
                          _c("column", {
                            key: key,
                            attrs: {
                              size: _vm.operations.size,
                              btn: btn,
                              scope: scope
                            },
                            on: { action: _vm.handleButton }
                          })
                        ]
                      })
                    ]
                  }
                }
              ],
              null,
              false,
              2067814942
            )
          },
          "el-table-column",
          _vm.operationAttrs,
          false
        )
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/table/src/operation.vue?vue&type=template&id=956c5732&

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table-link.vue?vue&type=template&id=7ecb29c9&
var table_linkvue_type_template_id_7ecb29c9_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-button",
    { attrs: { type: "text" } },
    [
      _c(
        "router-link",
        { attrs: { to: _vm.transformLink() } },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
}
var table_linkvue_type_template_id_7ecb29c9_staticRenderFns = []
table_linkvue_type_template_id_7ecb29c9_render._withStripped = true


// CONCATENATED MODULE: ./packages/table/src/table-link.vue?vue&type=template&id=7ecb29c9&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table-link.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//

/* harmony default export */ var table_linkvue_type_script_lang_js_ = ({
  name: "OaTableLink",
  comments: {
    ElButton: external_element_ui_["Button"]
  },
  props: {
    row: {
      type: Object,

      default() {
        return {};
      }

    },
    link: {
      type: String,
      default: ""
    }
  },
  methods: {
    // /a/[id]?name=[name]  => 方括号内进行替换
    transformLink() {
      var _this$link;

      const reg = new RegExp("\\[(.+?)\\]", "g");
      return (_this$link = this.link) === null || _this$link === void 0 ? void 0 : _this$link.replace(reg, replacement => {
        return this.row[replacement === null || replacement === void 0 ? void 0 : replacement.replace(reg, "$1")];
      });
    }

  }
});
// CONCATENATED MODULE: ./packages/table/src/table-link.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_table_linkvue_type_script_lang_js_ = (table_linkvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/table/src/table-link.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_table_linkvue_type_script_lang_js_,
  table_linkvue_type_template_id_7ecb29c9_render,
  table_linkvue_type_template_id_7ecb29c9_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/table/src/table-link.vue"
/* harmony default export */ var table_link = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/column.vue?vue&type=script&lang=js&


/* harmony default export */ var columnvue_type_script_lang_js_ = ({
  components: {
    OaTableLink: table_link,
    ElButton: external_element_ui_["Button"]
  },
  props: {
    btn: {
      type: Object,

      default() {
        return {};
      }

    },
    scope: {
      type: Object,

      default() {
        return {};
      }

    },
    size: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleButton({
      method: methodName,
      needConfirm,
      name
    }, ...args) {
      if (needConfirm) {
        // 用popconfirm会影响按钮间隔样式
        this.$confirm(`确定${name}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('action', methodName, ...args);
        }).catch(() => {});
      } else {
        this.$emit('action', methodName, ...args);
      }
    }

  },

  render(createElement) {
    const h = createElement;
    let children = null;
    const {
      btn,
      scope
    } = this;
    const {
      show,
      name,
      ...others
    } = btn;
    const key = scope.$index;
    const canShow = show instanceof Function ? show(scope.row, scope.$index) : true;
    const directiveName = btn.directiveName || 'permission';

    if (canShow) {
      const directives = btn[directiveName] ? [{
        name: directiveName,
        value: btn[directiveName]
      }] : [];

      if (btn.link) {
        children = h('oa-table-link', {
          key: key,
          props: {
            size: btn.size,
            ...scope,
            ...others
          },
          directives
        }, [name]);
      } else {
        children = h('el-button', {
          key: key,
          props: {
            size: this.size,
            ...others,
            type: btn.type ? btn.type : 'text'
          },
          directives,
          on: {
            click: () => {
              this.handleButton(btn, scope.row, scope.$index);
            }
          }
        }, [name]);
      }
    }

    return children;
  }

});
// CONCATENATED MODULE: ./packages/table/src/column.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_columnvue_type_script_lang_js_ = (columnvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/table/src/column.vue
var column_render, column_staticRenderFns




/* normalize component */

var column_component = Object(componentNormalizer["a" /* default */])(
  src_columnvue_type_script_lang_js_,
  column_render,
  column_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var column_api; }
column_component.options.__file = "packages/table/src/column.vue"
/* harmony default export */ var column = (column_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/operation.vue?vue&type=script&lang=js&
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


/* harmony default export */ var operationvue_type_script_lang_js_ = ({
  components: {
    ElTableColumn: external_element_ui_["TableColumn"],
    Column: column
  },
  props: {
    operations: {
      type: Object,

      default() {
        return {
          btns: []
        };
      }

    }
  },
  computed: {
    operationAttrs() {
      // eslint-disable-next-line no-unused-vars
      const {
        btns,
        size,
        ...others
      } = this.operations;
      return others;
    }

  },
  methods: {
    handleButton(methodName, ...args) {
      this.$emit("action", methodName, ...args);
    }

  }
});
// CONCATENATED MODULE: ./packages/table/src/operation.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_operationvue_type_script_lang_js_ = (operationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/table/src/operation.vue





/* normalize component */

var operation_component = Object(componentNormalizer["a" /* default */])(
  src_operationvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var operation_api; }
operation_component.options.__file = "packages/table/src/operation.vue"
/* harmony default export */ var operation = __webpack_exports__["a"] = (operation_component.exports);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/pagination/src/pagination.vue?vue&type=template&id=734cbb26&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "pagination-container", class: { hidden: _vm.hidden } },
    [
      _c(
        "el-pagination",
        _vm._b(
          {
            attrs: {
              background: _vm.background,
              "current-page": _vm.currentPage,
              "page-size": _vm.pageSize,
              layout: _vm.layout,
              "page-sizes": _vm.pageSizes,
              total: _vm.total
            },
            on: {
              "update:currentPage": function($event) {
                _vm.currentPage = $event
              },
              "update:current-page": function($event) {
                _vm.currentPage = $event
              },
              "update:pageSize": function($event) {
                _vm.pageSize = $event
              },
              "update:page-size": function($event) {
                _vm.pageSize = $event
              },
              "size-change": _vm.handleSizeChange,
              "current-change": _vm.handleCurrentChange
            }
          },
          "el-pagination",
          _vm.$attrs,
          false
        )
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/pagination/src/pagination.vue?vue&type=template&id=734cbb26&scoped=true&

// EXTERNAL MODULE: external "oa-ui/lib/utils/scroll-to"
var scroll_to_ = __webpack_require__(7);

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/pagination/src/pagination.vue?vue&type=script&lang=js&
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


/* harmony default export */ var paginationvue_type_script_lang_js_ = ({
  name: 'OaPagination',
  components: {
    ElPagination: external_element_ui_["Pagination"]
  },
  props: {
    total: {
      required: true,
      type: Number
    },
    start: {
      // 从第几条开始加载
      type: Number,
      default: undefined
    },
    page: {
      // 从第几页开始加载
      type: Number,
      default: 1
    },
    limit: {
      // 每页显示的数量
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,

      default() {
        return [10, 20, 30, 50];
      }

    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      idxMode: this.start !== undefined // 默认直接传入第几条的索引值， 否则采用指定页码

    };
  },

  computed: {
    currentPage: {
      // 根据start可自动转换为page
      get() {
        // 根据start 或 页码 获取当前页
        return this.idxMode ? (this.start + this.limit) / this.limit : this.page;
      },

      set(val) {
        // 更新page 或 start 属性
        // var reg = /url\("(.*)"\)/g
        // console.info(reg)
        this.idxMode ? this.$emit('update:start', (val - 1) * this.limit) : this.$emit('update:page', val);
      }

    },
    pageSize: {
      get() {
        return this.limit;
      },

      set(val) {
        this.$emit('update:limit', val);
      }

    }
  },
  methods: {
    handleSizeChange(val) {
      const emitParam = this.idxMode ? {
        start: this.start,
        limit: val
      } : {
        page: this.currentPage,
        limit: val
      };
      this.$emit('pagination', emitParam);

      if (this.autoScroll) {
        Object(scroll_to_["scrollTo"])(0, 800);
      }
    },

    handleCurrentChange(val) {
      const emitParam = this.idxMode ? {
        start: (val - 1) * this.pageSize,
        limit: this.pageSize
      } : {
        page: val,
        limit: this.pageSize
      };
      this.$emit('pagination', emitParam);

      if (this.autoScroll) {
        Object(scroll_to_["scrollTo"])(0, 800);
      }
    }

  }
});
// CONCATENATED MODULE: ./packages/pagination/src/pagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_paginationvue_type_script_lang_js_ = (paginationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/pagination/src/pagination.vue?vue&type=style&index=0&id=734cbb26&scoped=true&lang=css&
var paginationvue_type_style_index_0_id_734cbb26_scoped_true_lang_css_ = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/pagination/src/pagination.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_paginationvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "734cbb26",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/pagination/src/pagination.vue"
/* harmony default export */ var pagination = (component.exports);
// CONCATENATED MODULE: ./packages/pagination/index.js

/* istanbul ignore next */

pagination.install = function (Vue) {
  Vue.component(pagination.name, pagination);
};

/* harmony default export */ var packages_pagination = __webpack_exports__["a"] = (pagination);

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pagination_vue_vue_type_style_index_0_id_734cbb26_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pagination_vue_vue_type_style_index_0_id_734cbb26_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pagination_vue_vue_type_style_index_0_id_734cbb26_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n.pagination-container[data-v-734cbb26] {\r\n  background: #fff;\r\n  padding: 16px 16px;\n}\n.pagination-container.hidden[data-v-734cbb26] {\r\n  display: none;\n}\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(5);
            var content = __webpack_require__(37);

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
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

module.exports = require("element-ui/src/mixins/emitter");

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n.oa-table-form .el-form-item--mini.el-form-item{\r\n  margin-bottom:0 !important;\n}\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table-form.vue?vue&type=template&id=53d91193&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-form",
    {
      ref: "form",
      staticClass: "oa-table-form",
      attrs: { model: _vm.formData, size: _vm.size }
    },
    [
      _c(
        "el-table",
        _vm._b(
          {
            directives: [
              {
                name: "loading",
                rawName: "v-loading",
                value: _vm.tableConfig.isLoading,
                expression: "tableConfig.isLoading"
              }
            ],
            attrs: { data: _vm.value },
            on: {
              "sort-change": function(data) {
                return _vm.$emit("sort-change", data)
              },
              "row-click": function() {
                var args = [],
                  len = arguments.length
                while (len--) args[len] = arguments[len]

                return _vm.$emit("action", "rowClick", args)
              }
            }
          },
          "el-table",
          _vm.getTableAttrs(_vm.tableConfig),
          false
        ),
        [
          _vm.form !== false
            ? _c(
                "template",
                { slot: "empty" },
                [
                  _c(
                    "el-button",
                    { attrs: { size: "small" }, on: { click: _vm.handleAdd } },
                    [_vm._v("\n        新增\n      ")]
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._l(_vm.formatColumns(_vm.columns), function(col) {
            return [
              _c(
                "el-table-column",
                _vm._b(
                  {
                    key: col.prop,
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              scope.row.edit &&
                              col.show !== false &&
                              _vm.form !== false
                                ? _c(
                                    "el-form-item",
                                    {
                                      attrs: {
                                        prop: col.prop,
                                        rules: col.rules,
                                        "show-message": false
                                      }
                                    },
                                    [
                                      _c(
                                        col.type,
                                        _vm._b(
                                          {
                                            tag: "component",
                                            attrs: {
                                              row: scope.row,
                                              index: scope.$index,
                                              column: col
                                            },
                                            on: {
                                              change: function() {
                                                var args = [],
                                                  len = arguments.length
                                                while (len--)
                                                  args[len] = arguments[len]

                                                return _vm.handleChange(
                                                  col,
                                                  scope,
                                                  args
                                                )
                                              }
                                            },
                                            model: {
                                              value:
                                                _vm.formData["" + col.prop],
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.formData,
                                                  "" + col.prop,
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "formData[`${col.prop}`]"
                                            }
                                          },
                                          "component",
                                          col.props,
                                          false
                                        )
                                      )
                                    ],
                                    1
                                  )
                                : col.show !== false &&
                                  col.type &&
                                  _vm.form === false
                                ? _c(
                                    col.type,
                                    _vm._b(
                                      {
                                        tag: "component",
                                        attrs: {
                                          row: scope.row,
                                          index: scope.$index,
                                          column: col
                                        },
                                        on: {
                                          action: function(methodName) {
                                            var args = [],
                                              len = arguments.length - 1
                                            while (len-- > 0)
                                              args[len] = arguments[len + 1]

                                            return _vm.$emit(
                                              "action",
                                              methodName,
                                              args
                                            )
                                          }
                                        }
                                      },
                                      "component",
                                      col.props,
                                      false
                                    )
                                  )
                                : col.show !== false
                                ? [
                                    col.props && col.props.constant
                                      ? _c("span", [
                                          _vm._v(
                                            "\n              " +
                                              _vm._s(
                                                col.props.constant[
                                                  scope.row[col.field]
                                                ]
                                              ) +
                                              "\n            "
                                          )
                                        ])
                                      : _c("span", [
                                          _vm._v(_vm._s(scope.row[col.prop]))
                                        ])
                                  ]
                                : _vm._e()
                            ]
                          }
                        }
                      ],
                      null,
                      true
                    )
                  },
                  "el-table-column",
                  _vm.getColumnItemAttrs(col),
                  false
                )
              )
            ]
          }),
          _vm.operations
            ? _c("operation", {
                attrs: { operations: _vm.getOperations(_vm.operations) },
                on: {
                  action: function(methodName) {
                    var args = [],
                      len = arguments.length - 1
                    while (len-- > 0) args[len] = arguments[len + 1]

                    return _vm.handleAction(methodName, args)
                  }
                }
              })
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/table/src/table-form.vue?vue&type=template&id=53d91193&

// EXTERNAL MODULE: ./packages/pagination/index.js + 5 modules
var pagination = __webpack_require__(11);

// EXTERNAL MODULE: ./packages/table/src/operation.vue + 12 modules
var operation = __webpack_require__(10);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/toolbar-dropdown.vue?vue&type=template&id=27095b5a&
var toolbar_dropdownvue_type_template_id_27095b5a_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.filterable !== false
    ? _c(
        "el-dropdown",
        { attrs: { trigger: "click", "hide-on-click": false } },
        [
          _c("el-button", [_c("i", { staticClass: "el-icon-menu" })]),
          _c(
            "el-dropdown-menu",
            { attrs: { slot: "dropdown" }, slot: "dropdown" },
            [
              _c(
                "el-dropdown-item",
                [
                  _c(
                    "el-checkbox-group",
                    {
                      staticClass: "checkbox-drowdown",
                      attrs: { value: _vm.value },
                      on: { input: _vm.handleChange }
                    },
                    [
                      _vm._l(_vm.columns, function(col) {
                        return [
                          _c(
                            "el-checkbox",
                            { key: col.field, attrs: { label: col.field } },
                            [
                              _vm._v(
                                "\n            " +
                                  _vm._s(col.title) +
                                  "\n          "
                              )
                            ]
                          )
                        ]
                      })
                    ],
                    2
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    : _vm._e()
}
var toolbar_dropdownvue_type_template_id_27095b5a_staticRenderFns = []
toolbar_dropdownvue_type_template_id_27095b5a_render._withStripped = true


// CONCATENATED MODULE: ./packages/table/src/toolbar-dropdown.vue?vue&type=template&id=27095b5a&

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/toolbar-dropdown.vue?vue&type=script&lang=js&
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

/* harmony default export */ var toolbar_dropdownvue_type_script_lang_js_ = ({
  components: {
    ElButton: external_element_ui_["Button"],
    ElDropdown: external_element_ui_["Dropdown"],
    ElDropdownItem: external_element_ui_["DropdownItem"],
    ElCheckbox: external_element_ui_["Checkbox"],
    ElCheckboxGroup: external_element_ui_["CheckboxGroup"],
    ElDropdownMenu: external_element_ui_["DropdownMenu"]
  },
  props: {
    filterable: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,

      default() {
        return [];
      }

    },
    value: {
      type: Array,

      default() {
        return [];
      }

    }
  },
  methods: {
    handleChange(valArr) {
      this.$emit('input', valArr);
    }

  }
});
// CONCATENATED MODULE: ./packages/table/src/toolbar-dropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_toolbar_dropdownvue_type_script_lang_js_ = (toolbar_dropdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/table/src/toolbar-dropdown.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_toolbar_dropdownvue_type_script_lang_js_,
  toolbar_dropdownvue_type_template_id_27095b5a_render,
  toolbar_dropdownvue_type_template_id_27095b5a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/table/src/toolbar-dropdown.vue"
/* harmony default export */ var toolbar_dropdown = (component.exports);
// EXTERNAL MODULE: external "oa-ui/lib/utils/fields-tools"
var fields_tools_ = __webpack_require__(6);

// EXTERNAL MODULE: external "element-ui/src/mixins/emitter"
var emitter_ = __webpack_require__(24);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table-form.vue?vue&type=script&lang=js&
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






let value;
let formData;
/* harmony default export */ var table_formvue_type_script_lang_js_ = ({
  name: "OaTableForm",
  components: {
    OaPagination: pagination["a" /* default */],
    Operation: operation["a" /* default */],
    ToolbarDropdown: toolbar_dropdown,
    ELTable: external_element_ui_["Table"],
    ElTableColumn: external_element_ui_["TableColumn"],
    ElButton: external_element_ui_["Button"]
  },
  mixins: [emitter_default.a],
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    tableConfig: {
      type: Object,
      default: function () {
        return {
          showHeader: true,
          totalRecords: 0,
          // 总记录数
          isLoading: false,
          // 是否loading状态
          selection: false // 是否多选

        };
      }
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
    value: {
      type: Array,
      default: function () {
        return [];
      }
    },
    form: {
      type: Boolean,
      default: true
    },
    operations: {
      type: Object,

      default() {
        return {
          btns: [{
            name: "新增",
            method: "handleAdd",
            show: (row, $index) => {
              var _value;

              return !formData.edit && !row.edit && ((_value = value) === null || _value === void 0 ? void 0 : _value.length) - 1 === $index;
            }
          }, {
            name: "编辑",
            method: "handleEdit",
            show: row => {
              return !formData.edit && !row.edit;
            }
          }, {
            name: "取消",
            method: "handleCancel",
            show: row => {
              return row.edit === 'edit';
            }
          }, {
            name: "保存",
            method: "handleSave",
            show: row => {
              return row.edit;
            }
          }, {
            name: "删除",
            method: "handleDelete",
            needConfirm: true
          }],
          width: 200,
          label: '操作',
          fixed: "right"
        };
      }

    }
  },

  data() {
    return {
      formData: {}
    };
  },

  computed: {
    tableSize() {
      var _this$$ELEMENT;

      return this.size || (this === null || this === void 0 ? void 0 : (_this$$ELEMENT = this.$ELEMENT) === null || _this$$ELEMENT === void 0 ? void 0 : _this$$ELEMENT.size);
    }

  },
  watch: {
    value(newValue) {
      value = newValue;
    }

  },

  beforeDestroy() {
    value = null;
  },

  methods: {
    formatColumns(columns) {
      return columns === null || columns === void 0 ? void 0 : columns.map(item => {
        return {
          label: item.title,
          prop: item.field,
          rules: item.validate,
          ...item
        };
      });
    },

    getColumnItemAttrs(col) {
      return {
        label: col.title,
        prop: col.field,
        ...col
      };
    },

    getTableAttrs(tableConfig) {
      return {
        size: this.tableSize,
        border: true,
        stripe: true,
        fit: true,
        highlightCurrentRow: true,
        style: "width:100%",
        ...Object(fields_tools_["getTableConfig"])(tableConfig)
      };
    },

    getPaginationAttrs(tableConfig) {
      return {
        size: this.tableSize,
        style: "text-align: right",
        total: tableConfig.totalRecords,
        ...Object(fields_tools_["getPagination"])(tableConfig)
      };
    },

    getOperations(operations) {
      return {
        size: this.tableSize,
        ...operations
      };
    },

    handleChange(col, ...args) {
      var _col$props;

      if (col !== null && col !== void 0 && (_col$props = col.props) !== null && _col$props !== void 0 && _col$props.change) {
        col.props.change(col, ...args);
      }
    },

    handleAdd() {
      const lastItem = this.value[this.value.length - 1];
      this.$set(this.value, this.value.length, {
        edit: 'add',
        _orderIndex: lastItem ? lastItem._orderIndex++ : 0
      });
      this.syncValue();
      this.formData = {
        edit: 'add'
      };
      formData = this.formData;
    },

    handleEdit(row, $index) {
      this.$set(this.value[$index], 'edit', 'edit');
      this.formData = row;
      this.formData.edit = 'edit';
      formData = this.formData;
      this.syncValue();
    },

    handleCancel(row, $index) {
      this.$set(this.value[$index], 'edit', false);
      this.formData = {};
      this.formData.edit = false;
      formData = this.formData;
      this.syncValue();
    },

    handleSave(row, $index) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$set(this.value, $index, { ...row,
            ...this.formData,
            edit: false
          });
          this.formData = {};
          this.formData.edit = false;
          formData = this.formData;
          this.syncValue();
        }
      });
    },

    handleDelete(row, $index) {
      this.value.splice($index, 1);
      this.formData = {};
      this.formData.edit = false;
      formData = this.formData;
      this.syncValue();
    },

    handleAction(methodName, args) {
      if (this[methodName]) {
        this[methodName](...args);
      }
    },

    syncValue() {
      this.$emit('input', this.value);

      if (this.$parent.validateState === 'error') {
        this.dispatch('ElFormItem', 'el.form.change', this.value);
      }
    },

    handleValidate(callback) {
      this.$refs.form.validate(valid => {
        callback(valid);
      });
    }

  }
});
// CONCATENATED MODULE: ./packages/table/src/table-form.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_table_formvue_type_script_lang_js_ = (table_formvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/table/src/table-form.vue?vue&type=style&index=0&lang=css&
var table_formvue_type_style_index_0_lang_css_ = __webpack_require__(36);

// CONCATENATED MODULE: ./packages/table/src/table-form.vue






/* normalize component */

var table_form_component = Object(componentNormalizer["a" /* default */])(
  src_table_formvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var table_form_api; }
table_form_component.options.__file = "packages/table/src/table-form.vue"
/* harmony default export */ var table_form = (table_form_component.exports);
// CONCATENATED MODULE: ./packages/table-form/index.js

/* istanbul ignore next */

table_form.install = function (Vue) {
  Vue.component(table_form.name, table_form);
};

/* harmony default export */ var packages_table_form = __webpack_exports__["default"] = (table_form);

/***/ })
/******/ ]);