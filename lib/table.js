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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
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

/***/ 10:
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

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table.vue?vue&type=template&id=493fe34e&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
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
        key: _vm.tableKey,
        attrs: { data: _vm.data },
        on: {
          "row-click": function() {
            var args = [],
              len = arguments.length
            while (len--) args[len] = arguments[len]

            return _vm.handleAction("rowClick", args)
          }
        }
      },
      "el-table",
      _vm.getTableAttrs(_vm.tableConfig),
      false
    ),
    [
      _vm.tableConfig.selection
        ? _c("el-table-column", { attrs: { type: "selection", width: "55" } })
        : _vm._e(),
      _vm._l(_vm.formateColumns, function(col) {
        return [
          col.tableIsShow !== false && col.colProps && col.colProps.formatter
            ? _c(
                "el-table-column",
                _vm._b(
                  { key: col.prop, attrs: { label: col.label } },
                  "el-table-column",
                  col.colProps,
                  false
                )
              )
            : col.tableIsShow !== false &&
              col.colProps &&
              col.colProps.component
            ? _c(
                "el-table-column",
                _vm._b(
                  {
                    key: col.prop,
                    attrs: { label: col.label },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _c(
                                col.colProps.component,
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

                                        return _vm.handleAction(
                                          methodName,
                                          args
                                        )
                                      }
                                    }
                                  },
                                  "component",
                                  col.colProps.props,
                                  false
                                )
                              )
                            ]
                          }
                        }
                      ],
                      null,
                      true
                    )
                  },
                  "el-table-column",
                  col.colProps,
                  false
                )
              )
            : col.tableIsShow !== false
            ? _c(
                "el-table-column",
                _vm._b(
                  {
                    key: col.prop,
                    attrs: { label: col.label },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              col.colProps && col.colProps.constant
                                ? _c("span", [
                                    _vm._v(
                                      "\n          " +
                                        _vm._s(
                                          col.colProps.constant[
                                            scope.row[col.prop]
                                          ]
                                        ) +
                                        "\n        "
                                    )
                                  ])
                                : _c("span", [
                                    _vm._v(_vm._s(scope.row[col.prop]))
                                  ])
                            ]
                          }
                        }
                      ],
                      null,
                      true
                    )
                  },
                  "el-table-column",
                  col.colProps,
                  false
                )
              )
            : _vm._e()
        ]
      }),
      _vm.tableConfig.operations
        ? _c("operation", {
            attrs: { operations: _vm.getOperations(_vm.tableConfig) },
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
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/table/src/table.vue?vue&type=template&id=493fe34e&

// EXTERNAL MODULE: ./packages/table/src/operation.vue + 12 modules
var operation = __webpack_require__(10);

// EXTERNAL MODULE: external "oa-ui/lib/utils/fields-tools"
var fields_tools_ = __webpack_require__(6);

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "OaTable",
  components: {
    Operation: operation["a" /* default */],
    ELTable: external_element_ui_["Table"],
    ElTableColumn: external_element_ui_["TableColumn"],
    ElButton: external_element_ui_["Button"]
  },
  props: {
    size: {
      type: String,
      default: ''
    },
    tableConfig: {
      type: Object,
      default: function () {
        return {
          showHeader: true,
          isLoading: false,
          // 是否loading状态
          selection: false,
          // 是否多选
          operations: {
            btn: [// 表格操作按钮
            {
              name: "编辑",
              method: "handleEdit"
            }, {
              name: "删除",
              method: "handleDelete",
              needConfirm: true
            }]
          }
        };
      }
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
    data: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },

  data() {
    return {
      tableKey: 0,
      checkedColumnsName: null,
      selectedSelection: this.defaultSelectedSelection || []
    };
  },

  computed: {
    tableSize() {
      var _this$$ELEMENT;

      return this.size || (this === null || this === void 0 ? void 0 : (_this$$ELEMENT = this.$ELEMENT) === null || _this$$ELEMENT === void 0 ? void 0 : _this$$ELEMENT.size);
    },

    formateColumns() {
      var _this$columns;

      return (_this$columns = this.columns) === null || _this$columns === void 0 ? void 0 : _this$columns.map(col => {
        return {
          label: col.title,
          prop: col.field,
          ...col
        };
      });
    }

  },
  watch: {
    checkedColumnsName(valArr) {
      // 更新表格列数据
      this.tableKey = this.tableKey + 1;
      this.columns.forEach(item => {
        item.tableIsShow = valArr.indexOf(item.prop) >= 0;
      });
    }

  },

  created() {
    // 初始化选中的列
    const checkedColumns = [];
    this.columns.forEach(item => {
      if (item.tableIsShow !== false) {
        checkedColumns.push(item.prop);
      }
    });
    this.checkedColumnsName = checkedColumns;
  },

  methods: {
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

    getOperations(tableConfig) {
      return {
        size: this.tableSize,
        ...tableConfig.operations
      };
    },

    handleAction(methodName, args) {
      this.$emit('action', methodName, ...args);
    }

  }
});
// CONCATENATED MODULE: ./packages/table/src/table.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tablevue_type_script_lang_js_ = (tablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/table/src/table.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/table/src/table.vue"
/* harmony default export */ var table = (component.exports);
// CONCATENATED MODULE: ./packages/table/index.js

/* istanbul ignore next */

table.install = function (Vue) {
  Vue.component(table.name, table);
};

/* harmony default export */ var packages_table = __webpack_exports__["default"] = (table);

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("oa-ui/lib/utils/fields-tools");

/***/ })

/******/ });