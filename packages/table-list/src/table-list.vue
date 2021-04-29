<template>
  <div>
    <div
      v-if="searchFormConfig.length"
      class="filter-container"
      style="overflow: hidden"
    >
      <search
        ref="search"
        :fields="searchFormConfig"
        :form-config="getFormConfig(tableConfig)"
        @search="(...args) => handlePageChange('search', ...args)"
      />
    </div>
    <div
      v-if="Object.keys(this.$slots).length"
      class="fixed-toolbar"
    >
      <slot name="left" />
      <div class="pull-right">
        <slot name="right" />
        <toolbar-dropdown
          v-if="Object.keys(this.$slots).length"
          v-model="checkedColumnsName"
          :filterable="tableConfig.filterable"
          :columns="currColumns"
        />
      </div>
    </div>
    <oa-table
      :data="data"
      :table-config="tableConfig"
      :columns="currColumns"
      @action="(methodName, row) => $emit('action', methodName, row)"
      @sort-change="handleSortChange"
    />
    <oa-pagination
      v-show="tableConfig.totalRecords > 0"
      :start.sync="queryParam._start"
      :limit.sync="queryParam._length"
      v-bind="getPaginationAttrs(tableConfig)"
      @pagination="(...args) => handlePageChange('page', ...args)"
    />
  </div>
</template>
<script>
import OaPagination from "oa-ui/packages/pagination";
import OaTable from "oa-ui/packages/table";
import ToolbarDropdown from "./toolbar-dropdown";
import { getColumns, getSearchRules,getPagination,getTableConfig,getDefaultSearching } from "oa-ui/src/utils/fields-tools";
import Search from "./search";

export default {
  name: "OaTableList",
  components: {
    OaPagination,
    Search,
    ToolbarDropdown,
    OaTable
  },
  props: {
    size:{
      type:String,
      default: ''
    },
    tableConfig: {
      type: Object,
      default: function () {
        return {
          showHeader: true,
          totalRecords: 0, // 总记录数
          isLoading: false, // 是否loading状态
          selection: false, // 是否多选
          operations: {
            btn: [
              // 表格操作按钮
              { name: "编辑", method: "handleEdit" },
              { name: "删除", method: "handleDelete", needConfirm: true },
            ],
          },
        };
      },
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      },
    },
    data: {
      // 数据
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
      const searchFormConfig = getSearchRules(this.columns)
    return {
      queryParam: {
        // 搜索条件
        _start: 0,
        _length: this.tableConfig.pageSize || 20,
        _searching: getDefaultSearching(searchFormConfig),
        _order_field: undefined, // 排序配置
        _order_type: undefined,
      },
      searchFormConfig,
      tableKey: 0,
      currColumns: getColumns(this.columns),
      checkedColumnsName: null,
      selectedSelection: this.defaultSelectedSelection || []
    };
  },
  computed:{
    tableSize(){
      return this.size || this?.$ELEMENT?.size
    }
  },
  watch: {
    // 更新表格列数据
    checkedColumnsName(valArr) {
      this.tableKey = this.tableKey + 1;
      this.currColumns.forEach((item) => {
        item.tableIsShow = valArr.indexOf(item.field) >= 0;
      });
    },
  },
  created() {
    this.$emit("search", this.queryParam);
    // 初始化选中的 列
    const checkedColumns = [];
    this.currColumns.forEach((item) => {
      if (item.tableIsShow !== false) {
        checkedColumns.push(item.field);
      }
    });
    this.checkedColumnsName = checkedColumns;

    // 会影响defaultSearching数据的初始化
    // this.searchFormConfig.forEach((item) => {
    //   this.queryParam._searching[item.field] = undefined;
    // });
  },
  methods: {
    handlePageChange(type, searchingParam) {
      // 页码、页数、每页条数等改变 触发
      if (searchingParam) {
        Object.assign(this.queryParam._searching, searchingParam);
      }
      if (type === "search") {
        this.queryParam._start = 0;
      }
      this.$emit("search", this.queryParam);
    },
    handleSortChange(data) {
      // 排序改变
      const { prop, order } = data;
      if (order === "ascending" || order === "descending") {
        this.queryParam._order_field = prop;
        this.queryParam._order_type = order === "ascending" ? "ASC" : "DESC";
      } else {
        this.queryParam._order_field = undefined;
        this.queryParam._order_type = undefined;
      }
      this.queryParam._start = 0;
      this.$emit("search", this.queryParam);
    },
    handleButton(methodName, data) {
      this.$emit("action", methodName, data);
    },
    handleSelectionChange(val) {
      this.selectedSelection = val;

      this.$emit("selection-change", val);
    },
    getColumnItemAttrs(col) {
      return {
        ...col.colProps,
        label: col.title,
        prop: col.field,
      };
    },
    getTableAttrs(tableConfig){
      return {
        size:this.tableSize,
        border:true,
        stripe:true,
        fit:true,
        highlightCurrentRow:true,
        style:"width:100%",
        ...getTableConfig(tableConfig),
      }
    },
    getPaginationAttrs(tableConfig){
      return {
        size:this.tableSize,
        style:"text-align: right",
        total:tableConfig.totalRecords,
        ...getPagination(tableConfig),
      }
    },
    getFormConfig(tableConfig){
      const {form,...others} = tableConfig?.formConfig || {};
      return {
        submitBtn: false,
        ...others,
        form: {
          inline: true,
          labelWidth: "80px",
          labelPosition: "right",
          size: this.tableSize,
          ...form
        },
      }
    },
    getOperations(tableConfig){
      return {
        size: this.tableSize,
        ...tableConfig.operations
      }
    }
  },
};
</script>
