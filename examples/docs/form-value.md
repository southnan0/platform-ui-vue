## FormValue 表单 值

表单 详情/值

### 基础用法

详情值得展示

:::demo 基础用法

```html
<template>
  <oa-form-value :value="value"> </oa-form-value>
</template>
<script>
  export default {
    data() {
      return {
        value: "form-value的值",
      };
    },
  };
</script>
```

:::

### Attributes

| 参数  | 说明  | 类型   | 可选值 | 默认值 |
| ----- | ----- | ------ | ------ | ------ |
| value | value | string | —      | —      |
