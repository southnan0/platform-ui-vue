## SelectHuge 选择框下拉框数据量太大时，使用弹窗展示比较合适，支持多选

### 基础用法

:::demo 基础用法

```html
<template>
  <div>
    <oa-select-huge
      v-model="value"
      remote-url="/codeItem/getPage"
      :query-params="{groupId:'NC_BUDGET_CENTER'}"
      :clearable="true"
      @change="handleChange"
      :options="options"
      :disabled="true"
    ></oa-select-huge>
    <el-divider content-position="left">已选中：</el-divider>
    <el-tag v-for="item in options" :key="item.id"
      >{{item.id}}-{{item.name}}</el-tag
    >
    <el-button @click="handleReset">reset</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: [22343],
        options: [
          {
            id: 22343,
            name: "XX部门"
          }
        ]
      };
    },
    methods: {
      handleReset() {
        this.value = null;
      },
      handleChange(v) {
        console.info(v);
      }
    }
  };
</script>
```

:::

### 多选

:::demo 多选

```html
<template>
  <oa-select-huge
    v-model="value"
    remote-url="/codeItem/getPage"
    :query-params="{groupId:'NC_BUDGET_CENTER'}"
    :options.sync="options"
    :multiple="true"
    :clearable="true"
    :disabled="true"
  ></oa-select-huge>
  <el-divider content-position="left">已选中：</el-divider>
  <el-tag v-for="item in options" :key="item.id"
    >{{item.id}}-{{item.name}}</el-tag
  >
  <el-button @click="handleReset">reset</el-button>
</template>
<script>
  export default {
    data() {
      return {
        value: [22343],
        options: [
          {
            id: 22343,
            name: "XX部门"
          }
        ]
      };
    },
    methods: {
      handleReset() {
        this.value = null;
      }
    }
  };
</script>
```

:::

### options 不加 sync

:::demo options 不加 sync

```html
<template>
  <oa-select-huge
    v-model="value"
    remote-url="/codeItem/getPage"
    :query-params="{groupId:'NC_BUDGET_CENTER'}"
    :options="options"
    :multiple="true"
  ></oa-select-huge>
  <el-divider content-position="left">options：</el-divider>
  <el-tag v-for="item in options" :key="item.id"
    >{{item.id}}-{{item.name}}</el-tag
  >
  <el-divider content-position="left">value:</el-divider>
  <el-tag v-for="item in value" :key="item">{{item}}</el-tag>
</template>
<script>
  export default {
    data() {
      return {
        value: [22343],
        options: [
          {
            id: 22343,
            name: "XX部门"
          }
        ]
      };
    }
  };
</script>
```

:::

### Attributes

| 参数        | 说明                  | 类型    | 可选值 | 默认值 |
| ----------- | --------------------- | ------- | ------ | ------ |
| options     | 默认下拉选项列表值    | Array   | —      | []     |
| value       | value                 | Array   | String | Number | — | '' |
| title       | 弹窗 title            | string  | —      | ''     |
| remoteUrl   | 远程接口的 url        | string  | —      | ''     |
| queryParams | 远程接口的默认参数    | object  | —      | {}     |
| keyName     | option 的 key 的 name | string  | —      | id     |
| labelName   | option label 的 name  | string  | —      | name   |
| multiple    | 是否多选              | boolean | —      | false  |
