## FormValue 表单

表单

### 基础用法

展示

:::demo 基础用法

```html
<template>
  <div>
    <form-create v-model="fApi" :rule="rule" :option="options"> </form-create>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
  const rule = that => [
    // 表单配置
    { field: "id", title: "ID", type: "hidden" },
    {
      field: "name",
      title: "物业名称",
      type: "el-input",
      validate: [
        { required: true, message: "请输入物业名称", trigger: "blur" }
      ],
      style: {
        width: "193px"
      },
      props: {}
    },
    {
      field: "showIndex",
      title: "排序",
      type: "el-input-number",
      value: undefined,
      props: {
        min: 0,
        precision: 0
      }
    },
    {
      field: "type",
      title: "类型",
      type: "oa-remote-select",
      props: {
        options: [
          {
            name: "1",
            id: 1
          }
        ]
      }
    },
    {
      field: "user",
      title: "工程师",
      type: "oa-remote-select",
      props: {
        remoteUrl: "/manage/sys/user/getByRole",
        queryParams: { name: "处理工程师" },
        labelName: "nick"
      },
      validate: [{ required: true, message: "请选择部门", trigger: "change" }]
    },
    {
      field: "group",
      title: "部门",
      type: "oa-select-huge",
      props: {
        remoteUrl: "/codeItem/getPage",
        queryParams: { groupId: "NC_BUDGET_CENTER" },
        multiple: true
      },
      validate: [{ required: true, message: "请选择部门", trigger: "change" }]
    },
    {
      field: "table",
      title: "表格",
      type: "oa-table-form",
      validate: [
        {
          validator: (rule, value, callback) => {
            if (value && value.find(item => item.edit)) {
              callback(new Error("请完善表格信息"));
            } else {
              callback();
            }
          },
          trigger: "change"
        }
      ],
      props: {
        columns: [
          {
            type: "el-input",
            title: "姓名",
            field: "name",
            validate: [
              {
                required: true,
                message: "请输入姓名",
                trigger: ["blur", "change"]
              }
            ]
          },
          {
            type: "el-input-number",
            title: "身高",
            field: "height",
            props: {
              placeholder: "请输入身高/cm",
              controlsPosition: "right"
            },
            validate: [
              {
                required: true,
                message: "请输入身高",
                trigger: ["blur", "change"]
              }
            ]
          },
          {
            type: "el-input",
            title: "爱好",
            field: "hobby",
            props: {},
            validate: [
              {
                required: true,
                message: "请输入爱好",
                trigger: ["blur", "change"]
              }
            ]
          }
        ]
      }
    }
  ];
  export default {
    data() {
      return {
        fApi: {},
        rule: rule(this),
        options: {
          submitBtn: false,
          form: {
            inline: false,
            labelWidth: "80px",
            labelPosition: "right",
            size: "mini"
          }
        }
      };
    },
    mounted() {
      this.fApi.setValue({
        table: undefined,
        showIndex: 2
      });
    },
    methods: {
      changeOptions() {
        this.fApi.updateRule("type", {
          props: {
            options: undefined
          }
        });
      },
      changeQuery() {
        this.fApi.updateRule("user", {
          props: {
            queryParams: {
              name: new Date().getTime()
            }
          }
        });
      },
      handleSubmit() {
        this.fApi.validate((valid, fail) => {
          if (valid) {
            const data = this.fApi.formData();
            console.info(data);
          }
        });
      }
    }
  };
</script>
```

:::

### Attributes

| 参数  | 说明  | 类型   | 可选值 | 默认值 |
| ----- | ----- | ------ | ------ | ------ |
| value | value | string | —      | —      |
