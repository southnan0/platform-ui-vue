## FormValue 表单

表单

### 基础用法

展示

:::demo 基础用法

```html
<template>
  <form-create v-model="fApi" :rule="rule" :option="options"> </form-create>
</template>

<script>
  const rule = () => [
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
      }
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
      type: "form-table",
      props: {
        keyName: "table"
      },
      value: [
        {
          name: "笑笑",
          height: "155",
          hobby: "吃喝玩乐"
        },
        {
          name: "李晓",
          height: "165",
          hobby: "麻辣烫、电影、胡萝卜"
        },
        {
          name: "王晓",
          height: "175",
          hobby: "吃喝玩乐"
        }
      ]
    }
  ];
  export default {
    data() {
      return {
        fApi: {},
        rule: rule(),
        options: {
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
