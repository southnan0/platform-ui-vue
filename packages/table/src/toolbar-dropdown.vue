<template>
  <el-dropdown
    v-if="filterable !== false"
    trigger="click"
    :hide-on-click="false"
  >
    <el-button>
      <i class="el-icon-menu" />
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <el-checkbox-group
          :value="value"
          class="checkbox-drowdown"
          @input="handleChange"
        >
          <template v-for="col in columns">
            <el-checkbox
              :key="col.field"
              :label="col.field"
            >
              {{ col.title }}
            </el-checkbox>
          </template>
        </el-checkbox-group>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import {Button,Dropdown, DropdownItem,Checkbox,CheckboxGroup,DropdownMenu} from "element-ui";

export default {
  components:{
    ElButton:Button,
    ElDropdown:Dropdown,
    ElDropdownItem:DropdownItem,
    ElCheckbox:Checkbox,
    ElCheckboxGroup:CheckboxGroup,
    ElDropdownMenu:DropdownMenu
  },
  props: {
    filterable:{
      type:Boolean,
      default:false
    },
    columns:{
      type:Array,
      default(){
        return []
      }
    },
    value:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    handleChange(valArr) {
      this.$emit('input',valArr)
    },
  },
};
</script>
