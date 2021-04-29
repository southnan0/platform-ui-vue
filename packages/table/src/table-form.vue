<template>
  <el-form
    ref="form"
    :model="formData"
    class="oa-table-form"
    :size="size"
  >
    <el-table
      v-loading="tableConfig.isLoading"
      :data="value"
      v-bind="getTableAttrs(tableConfig)"
      @sort-change="(data) => $emit('sort-change',data)"
      @row-click="(...args) => $emit('action', 'rowClick', args)"
    >
      <template
        v-if="form !==false"
        slot="empty"
      >
        <el-button 
          size="small"
          @click="handleAdd"
        >
          新增
        </el-button>
      </template>
      <template v-for="col in formatColumns(columns)">
        <el-table-column
          :key="col.prop"
          v-bind="getColumnItemAttrs(col)"
        >
          <template slot-scope="scope">
            <el-form-item
              v-if="scope.row.edit && col.show !== false && form !== false"
              :prop="col.prop"
              :rules="col.rules"
              :show-message="false"
            >
              <component
                :is="col.type"
                v-model="formData[`${col.prop}`]"
                :row="scope.row"
                :index="scope.$index"
                :column="col"
                v-bind="col.props"
                @change="(...args)=>handleChange(col,scope,args)"
              />
            </el-form-item>
            <component
              :is="col.type"
              v-else-if="col.show !== false && col.type && form === false"
              :row="scope.row"
              :index="scope.$index"
              :column="col"
              v-bind="col.props"
              @action="(methodName, ...args) => $emit('action',methodName, args)"
            />
            <template v-else-if="col.show !== false">
              <span v-if="col.props && col.props.constant">
                {{ col.props.constant[scope.row[col.field]] }}
              </span>
              <span v-else>{{ scope.row[col.prop] }}</span>
            </template>
          </template>
        </el-table-column>
      </template>
      <operation
        v-if="operations"
        :operations="getOperations(operations)"
        @action="(methodName, ...args) => handleAction(methodName,args)"
      />
    </el-table>
  </el-form>
</template>
<script>
import OaPagination from "oa-ui/packages/pagination";
import Operation from "./operation";
import ToolbarDropdown from "./toolbar-dropdown";
import { getPagination,getTableConfig} from "oa-ui/src/utils/fields-tools";
import {Table,TableColumn,Button} from "element-ui";
import emitter from 'element-ui/src/mixins/emitter';

let value;
let formData;
export default {
  name: "OaTableForm",
  components: {
    OaPagination,
    Operation,
    ToolbarDropdown,
    ELTable:Table,
    ElTableColumn:TableColumn,
    ElButton:Button
  },
  mixins: [emitter],
  props: {
    size:{
      type:String,
      default: 'mini'
    },
    tableConfig: {
      type: Object,
      default: function () {
        return {
          showHeader: true,
          totalRecords: 0, // 总记录数
          isLoading: false, // 是否loading状态
          selection: false // 是否多选
        };
      },
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      },
    },
    value: {
      type: Array,
      default: function () {
        return [];
      },
    },
    form:{
      type: Boolean,
      default: true
    },
    operations:{
      type:Object,
      default(){
        return {
            btns: [
              { 
                name: "新增", 
                method: "handleAdd",
                show:(row,$index)=>{
                  return !formData.edit && !row.edit && value?.length -1 === $index
                }
              },
              { name: "编辑", method: "handleEdit",
                show:(row)=>{
                  return !formData.edit && !row.edit 
                }
              },
              { name: "取消", method: "handleCancel",
                show:(row)=>{
                  return row.edit === 'edit'
                }
              },
              { name: "保存", method: "handleSave",
                show:(row)=>{
                  return row.edit
                }
              },
              { name: "删除", method: "handleDelete", needConfirm: true },
            ],
            width: 200,
            label:'操作',
            fixed:"right"
          }
      }
    }
  },
  data() {
    return {
      formData:{}
    };
  },
  computed:{
    tableSize(){
      return this.size || this?.$ELEMENT?.size
    }
  },
  watch:{
    value(newValue){
      value = newValue
    }
  },
  beforeDestroy() {
    value = null;
  },
  methods: {
    formatColumns(columns){
      return columns?.map(item=>{
        return {
          label: item.title,
          prop: item.field,
          rules:item.validate,
          ...item
        }
      })
    },
    getColumnItemAttrs(col) {
      return {
        label: col.title,
        prop: col.field,
        ...col,
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
    getOperations(operations){
      return {
        size: this.tableSize,
        ...operations
      }
    },
    handleChange(col,...args){
      if(col?.props?.change){
        col.props.change(col,...args);
      }
    },
    handleAdd(){
      const lastItem = this.value[this.value.length-1]
      this.$set(this.value,this.value.length,{
        edit:'add',
        _orderIndex: lastItem? lastItem._orderIndex++ :0
      })
      this.syncValue()
      this.formData = {
        edit:'add'
      }
      formData=this.formData;
    },
    handleEdit(row,$index){
      this.$set(this.value[$index],'edit','edit')
      this.formData=row
      this.formData.edit = 'edit'
      formData=this.formData;
      this.syncValue()
    },
    handleCancel(row,$index){
      this.$set(this.value[$index],'edit', false)
      this.formData = {
        
      }
      this.formData.edit = false
      formData=this.formData;
      this.syncValue()
    },
    handleSave(row,$index){
      this.$refs.form.validate((valid)=>{
        if(valid){
          this.$set(this.value,$index,{
            ...row,
            ...this.formData,
            edit:false
          })
          
          this.formData = {
            
          }
          this.formData.edit = false
          formData=this.formData;
          this.syncValue()
        }
      })
    },
    handleDelete(row,$index){
      this.value.splice($index,1)
      this.formData = {
        
      }
      this.formData.edit = false
      formData=this.formData;
      this.syncValue()
    },
    handleAction(methodName,args){
      if(this[methodName]){
        this[methodName](...args);
      }
    },
    syncValue(){
      this.$emit('input',this.value)
      if(this.$parent.validateState === 'error'){
        this.dispatch('ElFormItem','el.form.change',this.value)
      }
    },
    handleValidate(callback){
      this.$refs.form.validate((valid)=>{
        callback(valid)
      })
    }
  },
};
</script>
<style>
.oa-table-form .el-form-item--mini.el-form-item{
  margin-bottom:0 !important;
}
</style>