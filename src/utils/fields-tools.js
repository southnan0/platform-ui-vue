/**
 *  列表数据公共方法
 */

const pickByKey = (obj = {}, arrKeyName) => {
  const pickObj = {};

  (Object.keys(obj) || []).forEach(key => {
    if ((arrKeyName || []).indexOf(key) !== -1) {
      pickObj[key] = obj[key];
    }
  });
  return pickObj;
};

export function getCRUDRules(fields) {
  const rules = [];
  fields.forEach(field => {
    const { config, ...rule } = field;
    if (!config || config.showInForm !== false) {
      rules.push(rule);
    }
  });
  return rules;
}

export function getSearchRules(fields) {
  const rules = [];
  fields.forEach(field => {
    // eslint-disable-next-line no-unused-vars
    const { config, validate, ...rule } = field;
    if (config && config.showInSearch && config.showInSearch !== false) {
      let searchType =
        config.showInSearch.searchType === undefined
          ? "CONTAIN"
          : config.showInSearch.searchType;
      if (searchType) {
        searchType = `/${searchType}`;
      }
      rule.field = rule.field + searchType; // 搜索字段名拼接
      rules.push(rule);
    }
  });
  return rules;
}

export function getDefaultSearching(rules){
  const obj = {}
  rules = rules || []
  rules.forEach((item)=>{
    obj[item.field] = item.value
  })

  return {
    ...obj
  }
}

export function getColumns(fields) {
  const columns = [];
  fields.forEach(field => {
    if (
      !field.config ||
      field.config.showInTable === true ||
      field.config.showInTable === undefined
    ) {
      const { ...rule } = field;
      rule.colProps = {};
      columns.push(rule);
    } else if (field.config && typeof field.config.showInTable === "object") {
      const {
        config: { showInTable },
        ...rule
      } = field;
      rule.colProps = Object.assign(
        {},
        typeof showInTable === "object" ? showInTable : {}
      );
      columns.push(rule);
    }
  });
  return columns;
}

export function getPagination(tableConfig) {
  if (!tableConfig) return {};
  const arrKeyName = [
    "total",
    "layout",
    "small",
    "background",
    "pageSize",
    "pageCount",
    "pagerCount",
    "currentPage",
    "pageSizes",
    "popperClass",
    "prevText",
    "nextText",
    "disabled",
    "hideOnSinglePage"
  ];
  return {
    ...(pickByKey(tableConfig, arrKeyName) || {}),
    ...(tableConfig.pagination || {})
  };
}

export function getTableConfig(tableConfig) {
  if (!tableConfig) return {};
  const arrKeyName = [
    "height",
    "maxHeight",
    "stripe",
    "border",
    "size",
    "fit",
    "showHeader",
    "highlightCurrentRow",
    "currentRowKey",
    "rowClassName",
    "rowStyle",
    "cellClassName",
    "cellStyle",
    "headerRowClassName",
    "headerRowStyle",
    "headerCellClassName",
    "headerCellStyle",
    "rowKey",
    "emptyText",
    "defaultExpandAll",
    "expandRowKeys",
    "defaultSort",
    "tooltipEffect",
    "showSummary",
    "sumText",
    "summaryMethod",
    "spanMethod",
    "selectOnIndeterminate",
    "indent",
    "lazy",
    "load",
    "treeProps"
  ];
  return {
    ...(pickByKey(tableConfig, arrKeyName) || {}),
    ...(tableConfig.table || {})
  };
}

export default {
  getCRUDRules,
  getColumns,
  getSearchRules,
  getPagination,
  getTableConfig
};
