/* eslint-disable vue/require-default-prop */
<template>
  <el-select
    :value="currentValue"
    v-bind="$attrs"
    :disabled="disabled"
    :filterable="filterable"
    :multiple="multiple"
    :clearable="clearable"
    :remote-method="remoteMethod"
    :loading="loading"
    :remote="remote"
    :autocomplete="autocomplete"
    :reserve-keyword="reserveKeyword"
    :popper-append-to-body="popperAppendToBody"
    @input="change($event)"
  >
    <el-option
      v-for="item in ajaxOptions"
      :key="getKeyName(item[keyName], item[labelName])"
      :label="getOptionLabel(item)"
      :value="getKeyName(item[keyName], item[labelName])"
      :disabled="item.disabled"
    />
  </el-select>
</template>
<script>
import request from "oa-ui/src/utils/request";
import { Select, Option } from "element-ui";
import keyMixins from "oa-ui/packages/mixins/key";

export default {
  name: "OaRemoteSelect",
  components: {
    ElSelect: Select,
    ElOption: Option,
  },
  mixins: [keyMixins],
  props: {
    label: {
      type: [String, Number, Object, Array, Boolean],
      default: "",
    },
    value: {
      type: [String, Number, Object, Array, Boolean],
      default: "",
    },
    remoteUrl: {
      type: String,
      default: "",
    }, // 远程链接地址
    keyName: {
      // 返回的数据对应key的字段名
      type: String,
      default: "id",
    },
    labelName: {
      // 返回的数据对应label的字段名
      type: String,
      default: "name",
    },
    defaultFirstValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    searchLabelName: {
      // 搜索字段名
      type: String,
      default: "",
    },
    queryParams: {
      type: [Object, Function],
      default() {
        return {};
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    filterable:{
      type: Boolean,
      default: false
    },
    remote:{
      type: Boolean,
      default: false
    },
    labelMethod:{
      type:Function,
      default: undefined
    },
    autocomplete:{
      type:String,
      default: 'off'
    },
    reserveKeyword:{
      type: Boolean,
      default: false
    },
    triggerRefresh: {
      type:[Number,String],
      default:0
    },
    popperAppendToBody:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      ajaxOptions: this.options || [],
      loading: false,
      currentValue: undefined
    };
  },
  computed: {
    isRemote() {
      return !!this.remoteUrl;
    },
    currentLabel() {
      const value = this.getKeyValue(this.value);
      if (Array.isArray(value)) {
        const items = this.ajaxOptions?.filter((item) => {
          return value?.indexOf(item[this.keyName]) !== -1;
        });
        const label = items?.map((item) => item?.[this.labelName]);
        return label || this.label;
      } else {
        const curItem = this.ajaxOptions?.find((item) => {
          return item[this.keyName] === value;
        });
        const label = curItem?.[this.labelName];
        return label || this.label;
      }
    },
    refresh() {
      if(this.queryParams instanceof Function){
         return {
            remoteUrl: this.remoteUrl,
            queryParams: this.queryParams,
            triggerRefresh: this.triggerRefresh
         }
      }
      return {
        remoteUrl: this.remoteUrl,
        queryParams: this.queryParams,
        queryParamStr: JSON.stringify(this.queryParams),
        triggerRefresh: this.triggerRefresh
      };
    }
  },
  watch: {
    options(newValue) {
      this.ajaxOptions = newValue;
    },
    ajaxOptions(newValue) {
      if (this.defaultFirstValue && !this.value) {
        const item = newValue?.[0];
        if (this.multiple) {
          if (item) {
            this.$emit("input", [item[this.keyName]], [item]);
            this.$emit("update:label", [item[this.labelName]]);
            this.$emit("change", [item[this.keyName]]);
          } else {
            this.$emit("input", [], []);
            this.$emit("update:label", []);
            this.$emit("change", []);
          }
        } else {
          if (item) {
            this.$emit("input", item[this.keyName], item);
            this.$emit("update:label", item[this.labelName]);
            this.$emit("change", item[this.keyName]);
          } else {
            this.$emit("input", "", {});
            this.$emit("update:label", "");
            this.$emit("change", "");
          }
        }
      }
    },
    refresh(newValue,oldValue) {
      const isNotFn = !(newValue.queryParams instanceof Function) && !(oldValue.queryParams instanceof Function)
      if(newValue.triggerRefresh !== oldValue.triggerRefresh
      || newValue.remoteUrl !== oldValue.remoteUrl
      || ( isNotFn && newValue.queryParamStr !== oldValue.queryParamStr)){
        if (this.isRemote && this.remote === false) {
          this.getData(newValue);
        }
      }
    },
    value(newValue){
      this.currentValue = this.getValue(newValue);
    }
  },
  created() {
    if (this.isRemote && this.remote === false) {
      this.getData();
    }
  },
  mounted(){
    this.currentValue = this.getValue(this.value)
  },
  methods: {
    getValue(value){
      const {ajaxOptions,keyName,label} = this
      const keyValue = this.getKeyValue(value);
      const item = ajaxOptions?.find((item) => {
        if (Array.isArray(keyValue)) {
          return keyValue?.indexOf(item[keyName]) !== -1;
        } else {
          return item[keyName] === keyValue;
        }
      });

      if (!item && value && label) {
        return label;
      }
      
      if(value === null){
        return undefined;
      }
      return value;
    },
    change(v) {
      const value = this.getKeyValue(v);
      if (Array.isArray(value)) {
        const items = this.ajaxOptions?.filter((item) => {
          return value?.indexOf(item[this.keyName]) !== -1;
        });
        const label = items?.map((item) => item?.[this.labelName]);
        this.$emit("input", value, items);
        this.$emit("update:label", label);
      } else {
        const curItem = this.ajaxOptions?.find((item) => {
          return item[this.keyName] === value;
        });
        const label = curItem?.[this.labelName];
        this.$emit("input", value, curItem);
        this.$emit("update:label", label);
      }

      this.$emit("change", value);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.getData({
          [this.searchLabelName || this.labelName]: query,
        });
      } else {
        this.ajaxOptions = [];
      }
    },
    getData(query = {}) {
      // eslint-disable-next-line no-unused-vars
      let {remoteUrl,queryParams,queryParamStr,triggerRefresh,...searchParams} = query;
      remoteUrl = remoteUrl || this.remoteUrl
      queryParams = queryParams || this.queryParams
      this.loading = true;
      request({
        url: remoteUrl,
        method: "GET",
        params:
          queryParams instanceof Function
            ? queryParams(searchParams)
            : {
                ...queryParams,
                ...searchParams,
              },
      })
        .then((res) => {
          this.loading = false;
          if (res.data && res.data.dataList) {
            this.ajaxOptions = res.data.dataList;
          } else if (res.data) {
            this.ajaxOptions = res.data;
          }
        })
        .catch((err) => {
          this.loading = false;
          console.info(err)
        });
    },
    getOptionLabel(item){
      if(this.labelMethod instanceof Function){
        return this.labelMethod(item)
      }

      return item[this.labelName]
    }
  },
};
</script>
