<template>
  <el-select
    v-model="currentValue"
    multiple
    @input="onInputEvent"
  >
    <div style="padding:5px 20px">
      <el-checkbox
        v-model="isCheckAll"
        :indeterminate="!!isIndeterminate"
        @input="handleChangeAll"
      >
        全选
      </el-checkbox>
    </div>
    <el-option
      v-for="item in (options || []).length || ajaxOptions"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      <el-checkbox
        :value="currentValue.indexOf(item.value) !== -1"
        :label="item.value"
        @click.native.prevent="preventSuffix"
      >
        {{ item.label }}
      </el-checkbox>
    </el-option>
  </el-select>
</template>

<script>
import { cacheRequest } from 'oa-ui/src/utils/request'
import {Select,Option,Checkbox} from 'element-ui'

export default {
  name: 'OaSelectCheck',
  components: {
    ElSelect: Select,
    ElOption: Option,
    ElCheckbox:Checkbox
  },
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    },
    field: {
      type: String,
      default: ''
    },
    remoteUrl: {
      type: String,
      default: ''
    },
    keyName: {
      type: String,
      default: 'id'
    },
    labelName: {
      type: String,
      default: 'name'
    }
  },
  data() {
    return {
      currentValue: this.filterValue(this.value),
      ajaxOptions: [],
      ALL: '_all',
      isCheckAll: false
    }
  },
  computed: {
    isIndeterminate() {
      const len = (this.currentValue || []).length
      return len && len < this.ajaxOptions.length
    }
  },
  watch: {
    remoteUrl(newValue, oldValue) {
      if (newValue) {
        this.currentValue = []
        this.getOptions(newValue)
      } else if (oldValue) {
        this.ajaxOptions = []
      }
    },
    value(val) {
      this.currentValue = this.filterValue(val)
    },
    currentValue(newValue) {
      const len = (newValue || []).length
      this.isCheckAll = !!(len && len === this.ajaxOptions.length)
    }
  },
  created() {
    const { remoteUrl } = this
    if (remoteUrl) {
      this.getOptions(remoteUrl)
    }
  },
  methods: {
    filterValue(value) {
      return value?.filter(item => item !== null && item !== undefined) || []
    },
    onInputEvent(value) {
      if (value === this.ALL) {
        if (this.isIndeterminate || !this.isCheckAll) {
          value = this.getAllValue()
        } else {
          value = []
        }
      }
      this.currentValue = value
      this.$emit('input', value)
    },
    getAllValue() {
      return this.ajaxOptions.map((item) => item.value)
    },
    handleChangeAll(value) {
      if (value) {
        this.currentValue = this.getAllValue()
      } else {
        this.currentValue = []
      }

      this.$emit('input', this.currentValue)
    },
    getOptions(remoteUrl) {
      const { keyName = 'id', labelName = 'name' } = this
      cacheRequest({
        url: `${remoteUrl}`,
        method: 'GET'
      })
        .then((res) => {
          if (res.data && res.data.dataList) {
            this.ajaxOptions = res.data.dataList.map((item) => {
              return {
                value: item[keyName],
                label: item[labelName]
              }
            })
          } else if (res.data) {
            this.ajaxOptions = res.data.map((item) => {
              return {
                value: item[keyName],
                label: item[labelName]
              }
            })
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    preventSuffix() {}
  }
}
</script>
