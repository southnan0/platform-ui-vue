"use strict";

exports.__esModule = true;
exports.getCRUDRules = getCRUDRules;
exports.getSearchRules = getSearchRules;
exports.getDefaultSearching = getDefaultSearching;
exports.getColumns = getColumns;
exports.getPagination = getPagination;
exports.getTableConfig = getTableConfig;
exports.default = void 0;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 *  列表数据公共方法
 */
var pickByKey = function pickByKey(obj, arrKeyName) {
  if (obj === void 0) {
    obj = {};
  }

  var pickObj = {};
  (Object.keys(obj) || []).forEach(function (key) {
    if ((arrKeyName || []).indexOf(key) !== -1) {
      pickObj[key] = obj[key];
    }
  });
  return pickObj;
};

function getCRUDRules(fields) {
  var rules = [];
  fields.forEach(function (field) {
    var config = field.config,
        rule = _objectWithoutPropertiesLoose(field, ["config"]);

    if (!config || config.showInForm !== false) {
      rules.push(rule);
    }
  });
  return rules;
}

function getSearchRules(fields) {
  var rules = [];
  fields.forEach(function (field) {
    // eslint-disable-next-line no-unused-vars
    var config = field.config,
        validate = field.validate,
        rule = _objectWithoutPropertiesLoose(field, ["config", "validate"]);

    if (config && config.showInSearch && config.showInSearch !== false) {
      var searchType = config.showInSearch.searchType === undefined ? "CONTAIN" : config.showInSearch.searchType;

      if (searchType) {
        searchType = "/" + searchType;
      }

      rule.field = rule.field + searchType; // 搜索字段名拼接

      rules.push(rule);
    }
  });
  return rules;
}

function getDefaultSearching(rules) {
  var obj = {};
  rules = rules || [];
  rules.forEach(function (item) {
    obj[item.field] = item.value;
  });
  return _extends({}, obj);
}

function getColumns(fields) {
  var columns = [];
  fields.forEach(function (field) {
    if (!field.config || field.config.showInTable === true || field.config.showInTable === undefined) {
      var rule = _extends({}, field);

      rule.colProps = {};
      columns.push(rule);
    } else if (field.config && typeof field.config.showInTable === "object") {
      var showInTable = field.config.showInTable,
          _rule = _objectWithoutPropertiesLoose(field, ["config"]);

      _rule.colProps = Object.assign({}, typeof showInTable === "object" ? showInTable : {});
      columns.push(_rule);
    }
  });
  return columns;
}

function getPagination(tableConfig) {
  if (!tableConfig) return {};
  var arrKeyName = ["total", "layout", "small", "background", "pageSize", "pageCount", "pagerCount", "currentPage", "pageSizes", "popperClass", "prevText", "nextText", "disabled", "hideOnSinglePage"];
  return _extends({}, pickByKey(tableConfig, arrKeyName) || {}, tableConfig.pagination || {});
}

function getTableConfig(tableConfig) {
  if (!tableConfig) return {};
  var arrKeyName = ["height", "maxHeight", "stripe", "border", "size", "fit", "showHeader", "highlightCurrentRow", "currentRowKey", "rowClassName", "rowStyle", "cellClassName", "cellStyle", "headerRowClassName", "headerRowStyle", "headerCellClassName", "headerCellStyle", "rowKey", "emptyText", "defaultExpandAll", "expandRowKeys", "defaultSort", "tooltipEffect", "showSummary", "sumText", "summaryMethod", "spanMethod", "selectOnIndeterminate", "indent", "lazy", "load", "treeProps"];
  return _extends({}, pickByKey(tableConfig, arrKeyName) || {}, tableConfig.table || {});
}

var _default = {
  getCRUDRules: getCRUDRules,
  getColumns: getColumns,
  getSearchRules: getSearchRules,
  getPagination: getPagination,
  getTableConfig: getTableConfig
};
exports.default = _default;