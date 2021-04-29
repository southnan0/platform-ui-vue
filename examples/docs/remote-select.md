## RemoteSelect 表单 Select

表单 Select

### 基础用法

基础的下拉用法

:::demo 基础用法

```html
<template>
  <div>
    <oa-remote-select
      v-model="value"
      :remote-url="remoteUrl"
      label-name="nick"
      multiple
      clearable
      :label.sync="label"
      :query-params="queryParams"
    >
    </oa-remote-select>

    <div>label:{{label}}</div>

    <el-button @click="handleChange">修改queryParams</el-button>
    <el-button @click="handleChangeUrl">remoteUrl</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: [],
        label: [],
        remoteUrl: "/manage/sys/user/getByRole",
        queryParams: { name: "处理工程师" }
      };
    },
    methods: {
      handleChange() {
        this.queryParams = {
          name: "123"
        };
      },
      handleChangeUrl() {
        this.remoteUrl = "/manage/sys/user/getByRole?hello=12";
      }
    }
  };
</script>
```

:::

### 默认选中第一个

:::demo 默认选中第一个

```html
<template>
  <div>
    <oa-remote-select
      v-model="value"
      remote-url="/manage/sys/user/getByRole?name=处理工程师"
      label-name="nick"
      :defaultFirstValue="true"
      :label.sync="label"
    >
    </oa-remote-select>
    <div>label:{{label}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "",
        label: ""
      };
    }
  };
</script>
```

:::

### 搜索

:::demo 搜索

```html
<template>
  <oa-remote-select
    v-model="value"
    :remote-url="remoteUrl"
    label-name="nick"
    searchLabelName="searchKey"
    filterable
    remote
    reserve-keyword
    :query-params="queryParams"
  >
  </oa-remote-select>
  <el-button @click="handleChange">修改queryParams</el-button>
  <el-button @click="handleChangeUrl">remoteUrl</el-button>
</template>
<script>
  export default {
    data() {
      return {
        value: "",
        remoteUrl: "/manage/sys/user/getByRole",
        queryParams: { name: "处理工程师" }
      };
    },
    methods: {
      handleChange() {
        this.queryParams = {
          name: "123"
        };
      },
      handleChangeUrl() {
        this.remoteUrl = "/manage/sys/user/getByRole?hello=12";
      }
    }
  };
</script>
```

:::

### 有默认值

有默认值的下拉用法

:::demo 有默认值

```html
<template>
  <div>
    <oa-remote-select
      v-model="value"
      remote-url="/manage/sys/user/getByRole?name=处理工程师"
      label-name="nick"
      :label.sync="label"
    >
    </oa-remote-select>
    <div>label:{{label}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "22343",
        label: "小陈"
      };
    }
  };
</script>
```

:::

### 通过 options 初始化下拉数据

如果存在默认值，但是默认值不在 options 的列表中，依然能够展示

:::demo options

```html
<template>
  <div>
    <oa-remote-select
      v-model="value"
      label-name="nick"
      :label.sync="label"
      :options="options"
      :remote="false"
      clearable
    >
    </oa-remote-select>
    <div>label:{{label}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "2235543",
        label: "小陈",
        options: [
          {
            id: 20815,
            oaId: null,
            name: "xiaopeng",
            code: "G13379",
            nick: "小鹏",
            tel: "13825555485",
            email: "panzhenxing@yy.com",
            group_id: 3105567,
            group_top_name: "质量部门",
            group_last_name: "企业部门",
            group_path: "企业部门\\信息化组",
            company_id: 1,
            company_name: "广州娃哈哈技有限公司",
            status: 1,
            oa_stat: "STATE.1",
            mobile: "13825555485",
            idCardCode: null
          }
        ]
      };
    }
  };
</script>
```

:::

### 通过 ref 获取 currentLabel

通过 ref 获取 currentLabel

:::demo 通过 ref 获取 currentLabel

```html
<template>
  <div>
    <oa-remote-select
      ref="select"
      v-model="value"
      remote-url="/manage/sys/user/getByRole?name=处理工程师"
      label-name="nick"
      :label.sync="label"
    >
    </oa-remote-select>
    <div>
      <el-button size="mini" @click="getCurrentLabel"
        >获取currentLabel</el-button
      >
    </div>
    <div>currentLabel:{{currentLabel}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "22343",
        label: "小陈",
        currentLabel: ""
      };
    },
    methods: {
      getCurrentLabel() {
        this.currentLabel = this.$refs.select.currentLabel;
      }
    }
  };
</script>
```

:::

:::

### 自定义 option 的 label

:::demo 自定义 option 的 label

```html
<template>
  <div>
    <oa-remote-select
      ref="select"
      v-model="value"
      remote-url="/manage/sys/user/getByRole?name=处理工程师"
      label-name="nick"
      :label.sync="label"
      :label-method="labelMethod"
    >
    </oa-remote-select>
    <div>
      <el-button size="mini" @click="getCurrentLabel"
        >获取currentLabel</el-button
      >
    </div>
    <div>currentLabel:{{currentLabel}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "22343",
        label: "小陈",
        currentLabel: ""
      };
    },
    methods: {
      getCurrentLabel() {
        console.info(this.$refs.select.currentLabel);
        this.currentLabel = this.$refs.select.currentLabel;
      },
      labelMethod(item) {
        return `${item.nick}/${item.code}`;
      }
    }
  };
</script>
```

:::

### Attributes

| 参数              | 说明                                                     | 类型           | 可选值 | 默认值    |
| ----------------- | -------------------------------------------------------- | -------------- | ------ | --------- |
| label             | 默认 label 值                                            | string         | —      | —         |
| value             | value                                                    | string         | —      | —         |
| remoteUrl         | 远程接口的 url                                           | string         | —      | —         |
| keyName           | option 的 key 的 name                                    | string         | —      | —         |
| labelName         | option label 的 name                                     | string         | —      | —         |
| defaultFirstValue | 是否默认第一个 option 的值                               | boolean        | —      | false     |
| disabled          | 是否禁用状态                                             | boolean        | —      | false     |
| multiple          | 是否多选                                                 | boolean        | —      | false     |
| clearable         | 是否开启清除按钮                                         | boolean        | —      | false     |
| searchLabelName   | 搜索过滤的 key name                                      | string         | —      | —         |
| queryParams       | 默认的请求参数                                           | object         | —      | {}        |
| options           | 下拉选项列表                                             | array          | —      | []        |
| filterable        | 是否可过滤                                               | boolean        | —      | false     |
| remote            | 是否远程搜索                                             | boolean        | —      | false     |
| labelMethod       | 自定义 option 的 label                                   | function(item) | —      | undefined |
| autocomplete      | select input 的 autocomplete 属性                        | string         | —      | off       |
| reserve-keyword   | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean        | —      | false     |
