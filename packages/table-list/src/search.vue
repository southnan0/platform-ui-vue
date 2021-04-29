<template>
  <div>
    <form-create
      v-model="fApi"
      :rule="rule"
      :option="options"
      @search-click="search"
      @change="change"
      @reset-click="reset"
    />
  </div>
</template>
<script>
import formCreate from "@form-create/element-ui";

const defaultConfig = {
  submitBtn: false,
  form: {
    inline: true,
    labelWidth: "80px",
    labelPosition: "right",
    size: "mini",
  },
};

export default {
  name: "OaSearchForm",
  components:{
    formCreate:formCreate.$form()
  },
  /* eslint-disable vue/require-prop-types */
  props: ["value", "fields", "formConfig"],
  data() {
    const formConfig = { ...defaultConfig, ...(this.formConfig || {}) };
    return {
      fApi: {},
      options: formConfig,
      rule: this.fields,
    };
  },
  created() {
    if (this.formConfig?.hideButton) {
      return;
    }
    if(!this.formConfig.btns?.length){
      this.rule.push(
        {
          type: "el-button",
          field: "searchbtn",
          emit: ["click"],
          emitPrefix: "search",
          props: {
            type: "primary",
          },
          children: ["搜 索"],
        },
        {
          type: "el-button",
          field: "resetbtn",
          emit: ["click"],
          emitPrefix: "reset",
          children: ["重 置"],
        }
      );
    }else{
      this.formConfig.btns.forEach((btn)=>{
        this.rule.push(btn)
      })
    }
  },
  methods: {
    filterFormData(formData) {
      Object.keys(formData).forEach((key) => {
        if (formData[key] === null) {
          formData[key] = undefined;
        }
      });
      return formData;
    },
    search() {
      const formdata = this.fApi.formData();
      // 清除空字段
      Object.keys(formdata).forEach((key) => {
        if (formdata[key] === null) {
          formdata[key] = undefined;
        }
      });
      this.$emit("search", formdata);
    },
    change() {
      if (this.formConfig?.hideButton) {
        this.search();
      }
    },
    reset() {
      this.fApi.resetFields();
      const formData = this.fApi.formData();

      this.$emit("search", this.filterFormData(formData));
    },
  },
};
</script>
