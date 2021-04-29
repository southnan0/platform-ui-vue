## SelectCheck Select 下拉带 checkbox，支持全选

### 基础用法

:::demo 基础用法

```html
<template>
  <oa-select-check
    v-model="value"
    remote-url="/manage/sys/user/getByRole?name=处理工程师"
    label-name="nick"
    :label="label"
  ></oa-select-check>
</template>
<script>
  export default {
    data() {
      return {
        value: [22343],
        label: ["小陈"]
      };
    }
  };
</script>
```

:::

### Attributes

| 参数      | 说明                  | 类型   | 可选值 | 默认值 |
| --------- | --------------------- | ------ | ------ | ------ |
| options   | 下拉选项列表          | Array  | —      | []     |
| value     | value                 | Array  | —      | []     |
| field     | value                 | string | —      | ''     |
| remoteUrl | 远程接口的 url        | string | —      | ''     |
| keyName   | option 的 key 的 name | string | —      | id     |
| labelName | option label 的 name  | string | —      | name   |
