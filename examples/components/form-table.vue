<template>
  <el-table
    :key="tableKey"
    :data="value"
    border
    size="small"
  >
    <template slot="empty">
      <el-button 
        size="small"
        @click="handleAdd"
      >
        新增
      </el-button>
    </template>
    <template v-for="col in columns">
      <el-table-column
        :key="col.key"
        :prop="col.prop"
        v-bind="col"
      >
        <template slot-scope="{row,$index}">
          <el-form-item

            :prop="`${keyName}.${$index}.${col.prop}`"
            :rules="col.rules"
          >
            <component
              :is="col.type"
              v-model="value[`${$index}`][`${col.prop}`]"
              :row="row"
              :index="$index"
              :column="col"
              v-bind="col.props"
            />
          </el-form-item>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      label="操作"
      align="center"
    >
      <template slot-scope="scope">
        <el-button 
          v-if="scope.$index === value.length -1"
          size="small"
          type="text"
          @click="handleAdd"
        >
          新增
        </el-button>
        <el-button
          size="small"
          type="text"
          @click="handleDelete(scope)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props:{
    keyName:{
      type:String,
      required:true
    },
    value:{
      type:Array,
      default(){
        return []
      }
    },
    columns:{
      type:Array,
      default(){
        return [{
          label:"姓名",
          prop:"name",
          width:100,
          type:'el-input',
          align:'center',
          rules:[{
            required:true,message:'姓名不能为空'
          }]
        },{
          label:"身高/cm",
          prop:"height",
          width:200,
          type:'el-input-number',
          align:'center',
          props:{
            placeholder:"请输入身高",
            controlsPosition:'right'
          },
          rules:[{
            required:true,message:'身高不能为空'
          }]
        },{
          label:"爱好",
          prop:"hobby",
          width:200,
          type:'el-input',
          align:'center',
          rules:[{
            required:true,message:'爱好不能为空'
          }]
        }]
      }
    }
  },
  data(){
    return {
      tableKey:0
    }
  },
  methods:{
    handleDelete({$index}){
      const v = this.value;
      v.splice($index,1);
      this.$set(this,'value',v)
    },
    handleAdd(){
      this.value.push({
        edit:true
      });
    }
  }
}
</script>
