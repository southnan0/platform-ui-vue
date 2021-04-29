<template>
  <el-table-column
    v-if="operations"
    v-bind="operationAttrs"
  >
    <!--按钮操作-->
    <template slot-scope="scope">
      <template v-for="(btn, key) in operations.btns">
        <column
          :key="key"
          :size="operations.size"
          :btn="btn"
          :scope="scope" 
          @action="handleButton"
        />
      </template>
    </template>
  </el-table-column>
</template>

<script>
import {TableColumn} from "element-ui";
import Column from './column'

export default {
  components:{
    ElTableColumn: TableColumn,
    Column
  },
  props:{
    operations:{
      type:Object,
      default(){
        return {
          btns:[]
        }
      }
    }
  },
  computed:{
    operationAttrs(){
      // eslint-disable-next-line no-unused-vars
      const {btns,size,...others} = this.operations
      return others
    }
  },
  methods: {
    handleButton(methodName, data) {
      this.$emit("action", methodName, data);
    },
  },
}
</script>