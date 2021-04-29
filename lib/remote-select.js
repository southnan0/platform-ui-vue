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
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
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

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("oa-ui/lib/utils/parseLabelAndKey");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("oa-ui/lib/utils/request");

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/remote-select/src/remote-select.vue?vue&type=template&id=1b8eaf90&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-select",
    _vm._b(
      {
        attrs: {
          value: _vm.currentValue,
          disabled: _vm.disabled,
          filterable: _vm.filterable,
          multiple: _vm.multiple,
          clearable: _vm.clearable,
          "remote-method": _vm.remoteMethod,
          loading: _vm.loading,
          remote: _vm.remote,
          autocomplete: _vm.autocomplete,
          "reserve-keyword": _vm.reserveKeyword,
          "popper-append-to-body": _vm.popperAppendToBody
        },
        on: {
          input: function($event) {
            return _vm.change($event)
          }
        }
      },
      "el-select",
      _vm.$attrs,
      false
    ),
    _vm._l(_vm.ajaxOptions, function(item) {
      return _c("el-option", {
        key: _vm.getKeyName(item[_vm.keyName], item[_vm.labelName]),
        attrs: {
          label: _vm.getOptionLabel(item),
          value: _vm.getKeyName(item[_vm.keyName], item[_vm.labelName]),
          disabled: item.disabled
        }
      })
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/remote-select/src/remote-select.vue?vue&type=template&id=1b8eaf90&

// EXTERNAL MODULE: external "oa-ui/lib/utils/request"
var request_ = __webpack_require__(3);
var request_default = /*#__PURE__*/__webpack_require__.n(request_);

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// EXTERNAL MODULE: external "oa-ui/lib/utils/parseLabelAndKey"
var parseLabelAndKey_ = __webpack_require__(12);

// CONCATENATED MODULE: ./packages/mixins/key.js

/* harmony default export */ var mixins_key = ({
  props: {
    valueAndLabel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getKeyName(key, label) {
      if (this.valueAndLabel) {
        return Object(parseLabelAndKey_["formatKeyName"])(key, label);
      }

      return key;
    },

    getKeyValue(value) {
      if (this.valueAndLabel) {
        if (Array.isArray(value)) {
          const [keyValue] = Object(parseLabelAndKey_["parseMulKeyName"])(value);
          return (keyValue || '').split(',');
        } else {
          const [keyValue] = Object(parseLabelAndKey_["parseKeyName"])(value);
          return keyValue;
        }
      }

      return value;
    }

  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/remote-select/src/remote-select.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var remote_selectvue_type_script_lang_js_ = ({
  name: "OaRemoteSelect",
  components: {
    ElSelect: external_element_ui_["Select"],
    ElOption: external_element_ui_["Option"]
  },
  mixins: [mixins_key],
  props: {
    label: {
      type: [String, Number, Object, Array, Boolean],
      default: ""
    },
    value: {
      type: [String, Number, Object, Array, Boolean],
      default: ""
    },
    remoteUrl: {
      type: String,
      default: ""
    },
    // 远程链接地址
    keyName: {
      // 返回的数据对应key的字段名
      type: String,
      default: "id"
    },
    labelName: {
      // 返回的数据对应label的字段名
      type: String,
      default: "name"
    },
    defaultFirstValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    searchLabelName: {
      // 搜索字段名
      type: String,
      default: ""
    },
    queryParams: {
      type: [Object, Function],

      default() {
        return {};
      }

    },
    options: {
      type: Array,

      default() {
        return [];
      }

    },
    filterable: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    labelMethod: {
      type: Function,
      default: undefined
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    reserveKeyword: {
      type: Boolean,
      default: false
    },
    triggerRefresh: {
      type: [Number, String],
      default: 0
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      ajaxOptions: this.options || [],
      loading: false,
      currentValue: undefined
    };
  },

  computed: {
    isRemote() {
      return !!this.remoteUrl;
    },

    currentLabel() {
      const value = this.getKeyValue(this.value);

      if (Array.isArray(value)) {
        var _this$ajaxOptions;

        const items = (_this$ajaxOptions = this.ajaxOptions) === null || _this$ajaxOptions === void 0 ? void 0 : _this$ajaxOptions.filter(item => {
          return (value === null || value === void 0 ? void 0 : value.indexOf(item[this.keyName])) !== -1;
        });
        const label = items === null || items === void 0 ? void 0 : items.map(item => item === null || item === void 0 ? void 0 : item[this.labelName]);
        return label || this.label;
      } else {
        var _this$ajaxOptions2;

        const curItem = (_this$ajaxOptions2 = this.ajaxOptions) === null || _this$ajaxOptions2 === void 0 ? void 0 : _this$ajaxOptions2.find(item => {
          return item[this.keyName] === value;
        });
        const label = curItem === null || curItem === void 0 ? void 0 : curItem[this.labelName];
        return label || this.label;
      }
    },

    refresh() {
      if (this.queryParams instanceof Function) {
        return {
          remoteUrl: this.remoteUrl,
          queryParams: this.queryParams,
          triggerRefresh: this.triggerRefresh
        };
      }

      return {
        remoteUrl: this.remoteUrl,
        queryParams: this.queryParams,
        queryParamStr: JSON.stringify(this.queryParams),
        triggerRefresh: this.triggerRefresh
      };
    }

  },
  watch: {
    options(newValue) {
      this.ajaxOptions = newValue;
    },

    ajaxOptions(newValue) {
      if (this.defaultFirstValue && !this.value) {
        const item = newValue === null || newValue === void 0 ? void 0 : newValue[0];

        if (this.multiple) {
          if (item) {
            this.$emit("input", [item[this.keyName]], [item]);
            this.$emit("update:label", [item[this.labelName]]);
            this.$emit("change", [item[this.keyName]]);
          } else {
            this.$emit("input", [], []);
            this.$emit("update:label", []);
            this.$emit("change", []);
          }
        } else {
          if (item) {
            this.$emit("input", item[this.keyName], item);
            this.$emit("update:label", item[this.labelName]);
            this.$emit("change", item[this.keyName]);
          } else {
            this.$emit("input", "", {});
            this.$emit("update:label", "");
            this.$emit("change", "");
          }
        }
      }
    },

    refresh(newValue, oldValue) {
      const isNotFn = !(newValue.queryParams instanceof Function) && !(oldValue.queryParams instanceof Function);

      if (newValue.triggerRefresh !== oldValue.triggerRefresh || newValue.remoteUrl !== oldValue.remoteUrl || isNotFn && newValue.queryParamStr !== oldValue.queryParamStr) {
        if (this.isRemote && this.remote === false) {
          this.getData(newValue);
        }
      }
    },

    value(newValue) {
      this.currentValue = this.getValue(newValue);
    }

  },

  created() {
    if (this.isRemote && this.remote === false) {
      this.getData();
    }
  },

  mounted() {
    this.currentValue = this.getValue(this.value);
  },

  methods: {
    getValue(value) {
      const {
        ajaxOptions,
        keyName,
        label
      } = this;
      const keyValue = this.getKeyValue(value);
      const item = ajaxOptions === null || ajaxOptions === void 0 ? void 0 : ajaxOptions.find(item => {
        if (Array.isArray(keyValue)) {
          return (keyValue === null || keyValue === void 0 ? void 0 : keyValue.indexOf(item[keyName])) !== -1;
        } else {
          return item[keyName] === keyValue;
        }
      });

      if (!item && value && label) {
        return label;
      }

      if (value === null) {
        return undefined;
      }

      return value;
    },

    change(v) {
      const value = this.getKeyValue(v);

      if (Array.isArray(value)) {
        var _this$ajaxOptions3;

        const items = (_this$ajaxOptions3 = this.ajaxOptions) === null || _this$ajaxOptions3 === void 0 ? void 0 : _this$ajaxOptions3.filter(item => {
          return (value === null || value === void 0 ? void 0 : value.indexOf(item[this.keyName])) !== -1;
        });
        const label = items === null || items === void 0 ? void 0 : items.map(item => item === null || item === void 0 ? void 0 : item[this.labelName]);
        this.$emit("input", value, items);
        this.$emit("update:label", label);
      } else {
        var _this$ajaxOptions4;

        const curItem = (_this$ajaxOptions4 = this.ajaxOptions) === null || _this$ajaxOptions4 === void 0 ? void 0 : _this$ajaxOptions4.find(item => {
          return item[this.keyName] === value;
        });
        const label = curItem === null || curItem === void 0 ? void 0 : curItem[this.labelName];
        this.$emit("input", value, curItem);
        this.$emit("update:label", label);
      }

      this.$emit("change", value);
    },

    remoteMethod(query) {
      if (query !== "") {
        this.getData({
          [this.searchLabelName || this.labelName]: query
        });
      } else {
        this.ajaxOptions = [];
      }
    },

    getData(query = {}) {
      // eslint-disable-next-line no-unused-vars
      let {
        remoteUrl,
        queryParams,
        queryParamStr,
        triggerRefresh,
        ...searchParams
      } = query;
      remoteUrl = remoteUrl || this.remoteUrl;
      queryParams = queryParams || this.queryParams;
      this.loading = true;
      request_default()({
        url: remoteUrl,
        method: "GET",
        params: queryParams instanceof Function ? queryParams(searchParams) : { ...queryParams,
          ...searchParams
        }
      }).then(res => {
        this.loading = false;

        if (res.data && res.data.dataList) {
          this.ajaxOptions = res.data.dataList;
        } else if (res.data) {
          this.ajaxOptions = res.data;
        }
      }).catch(err => {
        this.loading = false;
        console.info(err);
      });
    },

    getOptionLabel(item) {
      if (this.labelMethod instanceof Function) {
        return this.labelMethod(item);
      }

      return item[this.labelName];
    }

  }
});
// CONCATENATED MODULE: ./packages/remote-select/src/remote-select.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_remote_selectvue_type_script_lang_js_ = (remote_selectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/remote-select/src/remote-select.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_remote_selectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/remote-select/src/remote-select.vue"
/* harmony default export */ var remote_select = (component.exports);
// CONCATENATED MODULE: ./packages/remote-select/index.js

/* istanbul ignore next */

remote_select.install = function (Vue) {
  Vue.component(remote_select.name, remote_select);
};

/* harmony default export */ var packages_remote_select = __webpack_exports__["default"] = (remote_select);

/***/ })

/******/ });