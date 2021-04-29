<template>
  <el-table
    :key="tableKey"
    v-loading="tableConfig.isLoading"
    :data="data"
    v-bind="getTableAttrs(tableConfig)"
    @row-click="(...args) => handleAction('rowClick', args)"
  >
    <el-table-column
      v-if="tableConfig.selection"
      type="selection"
      width="55"
    />
    <template v-for="col in formateColumns">
      <el-table-column
        v-if="col.tableIsShow !== false && col.colProps && col.colProps.formatter"
        :key="col.prop"
        :label="col.label"
        v-bind="col.colProps"
      />
      <el-table-column
        v-else-if="col.tableIsShow !== false && col.colProps && col.colProps.component"
        :key="col.prop"
        :label="col.label"
        v-bind="col.colProps"
      >
        <template slot-scope="scope">
          <component
            :is="col.colProps.component"
            :row="scope.row"
            :index="scope.$index"
            :column="col"
            v-bind="col.colProps.props"
            @action="(methodName, ...args) => handleAction(methodName,args)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="col.tableIsShow !== false"
        :key="col.prop"
        :label="col.label"
        v-bind="col.colProps"
      >
        <template slot-scope="scope">
          <span v-if="col.colProps && col.colProps.constant">
            {{ col.colProps.constant[scope.row[col.prop]] }}
          </span>
          <span v-else>{{ scope.row[col.prop] }}</span>
        </template>
      </el-table-column>
    </template>
    <operation
      v-if="tableConfig.operations"
      :operations="getOperations(tableConfig)"
      @action="(methodName, ...args) => handleAction(methodName, args)"
    />
  </el-table>
</template>
<script>
import Operation from "./operation";
import { getTableConfig} from "oa-ui/src/utils/fields-tools";
import {Table,TableColumn,Button} from "element-ui";

export default {
  name: "OaTable",
  components: {
    Operation,
    ELTable:Table,
    ElTableColumn:TableColumn,
    ElButton:Button
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
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      tableKey: 0,
      checkedColumnsName: null,
      selectedSelection: this.defaultSelectedSelection || []
    };
  },
  computed:{
    tableSize(){
      return this.size || this?.$ELEMENT?.size
    },
    formateColumns(){
      return this.columns?.map(col=>{
        return {
          label: col.title,
          prop: col.field,
          ...col
        }
      })
    }
  },
  watch: {
    checkedColumnsName(valArr) {
    // 更新表格列数据
      this.tableKey = this.tableKey + 1;
      this.columns.forEach((item) => {
        item.tableIsShow = valArr.indexOf(item.prop) >= 0;
      });
    },
  },
  created() {
    // 初始化选中的列
    const checkedColumns = [];
    this.columns.forEach((item) => {
      if (item.tableIsShow !== false) {
        checkedColumns.push(item.prop);
      }
    });
    this.checkedColumnsName = checkedColumns;
  },
  methods: {
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
    getOperations(tableConfig){
      return {
        size: this.tableSize,
        ...tableConfig.operations
      }
    },
    handleAction(methodName,args){
      this.$emit('action',methodName,...args)
    }
  },
};
</script>
