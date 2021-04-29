<template>
  <div>
    <nx-table
      ref="dataTable"
      :data="dataSource"
      :table-config="tableConfig"
      :columns="columns"
      @search="handleSearch"
      @action="$_handleAction"
    />
  </div>
</template>
<script>
import NxTable from 'oa-ui/packages/table'
import request from 'oa-ui/src/utils/request'
import _ from 'lodash'

export default {
  components: {
    NxTable
  },
  props: {
    defaultColumns: {
      type: Array,
      default() {
        return []
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
        return {}
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
    selected:{
      type:Array,
      default(){
        return []
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
          btns: [
            {
              name: '选择',
              type: 'text',
              method: 'handleSelect',
              show:(row)=>{
                return !this.selected?.find(item=>item[this.keyName] === row[this.keyName])
              }
            },
            {
              name: '选择',
              type: 'text',
              disabled: true,
              show:(row)=>{
                return !!this.selected?.find(item=>item[this.keyName] === row[this.keyName])
              }
            }
          ],
          width: 80,
          label: '操作',
          fixed: 'right'
        }
      },
      columns: this.defaultColumns || []
    }
  },
  methods: {
    handleSearch: _.debounce(function(param) {
      const { remoteUrl, queryParams } = this
      const { _searching, ...otherParams } = param
      // eslint-disable-next-line no-unused-vars
      const { start, limit, ...others } = _searching || {}
      this.tableConfig.isLoading = true;
      request({
        url: `${remoteUrl}`,
        method: 'GET',
        params: {
          ...queryParams,
          ...otherParams,
          ...others
        }
      }).then(res => {
        this.dataSource = res.data.dataList
        this.tableConfig.totalRecords = res.data.totalCount
         this.tableConfig.isLoading = false;
      }).catch(err => {
        this.$message.error(err.message)
         this.tableConfig.isLoading = false;
      })
    }, 500),
    $_handleAction(methodName, param) { // 子组件调用的方法
      this[methodName] && this[methodName](param)
    },
    handleSelect(param) {
      this.$emit('select', param)
    },
    rowClick([row]) {
      this.$emit('select', row)
    }
  }
}
</script>
