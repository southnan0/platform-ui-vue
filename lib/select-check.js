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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("element-ui");

/***/ }),

/***/ 1:
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

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("oa-ui/lib/utils/request");

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-check/src/select-check.vue?vue&type=template&id=c1c6c274&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-select",
    {
      attrs: { multiple: "" },
      on: { input: _vm.onInputEvent },
      model: {
        value: _vm.currentValue,
        callback: function($$v) {
          _vm.currentValue = $$v
        },
        expression: "currentValue"
      }
    },
    [
      _c(
        "div",
        { staticStyle: { padding: "5px 20px" } },
        [
          _c(
            "el-checkbox",
            {
              attrs: { indeterminate: !!_vm.isIndeterminate },
              on: { input: _vm.handleChangeAll },
              model: {
                value: _vm.isCheckAll,
                callback: function($$v) {
                  _vm.isCheckAll = $$v
                },
                expression: "isCheckAll"
              }
            },
            [_vm._v("\n      全选\n    ")]
          )
        ],
        1
      ),
      _vm._l((_vm.options || []).length || _vm.ajaxOptions, function(item) {
        return _c(
          "el-option",
          { key: item.value, attrs: { value: item.value, label: item.label } },
          [
            _c(
              "el-checkbox",
              {
                attrs: {
                  value: _vm.currentValue.indexOf(item.value) !== -1,
                  label: item.value
                },
                nativeOn: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.preventSuffix($event)
                  }
                }
              },
              [_vm._v("\n      " + _vm._s(item.label) + "\n    ")]
            )
          ],
          1
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/select-check/src/select-check.vue?vue&type=template&id=c1c6c274&

// EXTERNAL MODULE: external "oa-ui/lib/utils/request"
var request_ = __webpack_require__(3);

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-check/src/select-check.vue?vue&type=script&lang=js&
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


/* harmony default export */ var select_checkvue_type_script_lang_js_ = ({
  name: 'OaSelectCheck',
  components: {
    ElSelect: external_element_ui_["Select"],
    ElOption: external_element_ui_["Option"],
    ElCheckbox: external_element_ui_["Checkbox"]
  },
  props: {
    options: {
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

    },
    field: {
      type: String,
      default: ''
    },
    remoteUrl: {
      type: String,
      default: ''
    },
    keyName: {
      type: String,
      default: 'id'
    },
    labelName: {
      type: String,
      default: 'name'
    }
  },

  data() {
    return {
      currentValue: this.filterValue(this.value),
      ajaxOptions: [],
      ALL: '_all',
      isCheckAll: false
    };
  },

  computed: {
    isIndeterminate() {
      const len = (this.currentValue || []).length;
      return len && len < this.ajaxOptions.length;
    }

  },
  watch: {
    remoteUrl(newValue, oldValue) {
      if (newValue) {
        this.currentValue = [];
        this.getOptions(newValue);
      } else if (oldValue) {
        this.ajaxOptions = [];
      }
    },

    value(val) {
      this.currentValue = this.filterValue(val);
    },

    currentValue(newValue) {
      const len = (newValue || []).length;
      this.isCheckAll = !!(len && len === this.ajaxOptions.length);
    }

  },

  created() {
    const {
      remoteUrl
    } = this;

    if (remoteUrl) {
      this.getOptions(remoteUrl);
    }
  },

  methods: {
    filterValue(value) {
      return (value === null || value === void 0 ? void 0 : value.filter(item => item !== null && item !== undefined)) || [];
    },

    onInputEvent(value) {
      if (value === this.ALL) {
        if (this.isIndeterminate || !this.isCheckAll) {
          value = this.getAllValue();
        } else {
          value = [];
        }
      }

      this.currentValue = value;
      this.$emit('input', value);
    },

    getAllValue() {
      return this.ajaxOptions.map(item => item.value);
    },

    handleChangeAll(value) {
      if (value) {
        this.currentValue = this.getAllValue();
      } else {
        this.currentValue = [];
      }

      this.$emit('input', this.currentValue);
    },

    getOptions(remoteUrl) {
      const {
        keyName = 'id',
        labelName = 'name'
      } = this;
      Object(request_["cacheRequest"])({
        url: `${remoteUrl}`,
        method: 'GET'
      }).then(res => {
        if (res.data && res.data.dataList) {
          this.ajaxOptions = res.data.dataList.map(item => {
            return {
              value: item[keyName],
              label: item[labelName]
            };
          });
        } else if (res.data) {
          this.ajaxOptions = res.data.map(item => {
            return {
              value: item[keyName],
              label: item[labelName]
            };
          });
        }
      }).catch(err => {
        this.$message.error(err.message);
      });
    },

    preventSuffix() {}

  }
});
// CONCATENATED MODULE: ./packages/select-check/src/select-check.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_select_checkvue_type_script_lang_js_ = (select_checkvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/select-check/src/select-check.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_select_checkvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/select-check/src/select-check.vue"
/* harmony default export */ var select_check = (component.exports);
// CONCATENATED MODULE: ./packages/select-check/index.js

/* istanbul ignore next */

select_check.install = function (Vue) {
  Vue.component(select_check.name, select_check);
};

/* harmony default export */ var packages_select_check = __webpack_exports__["default"] = (select_check);

/***/ })

/******/ });