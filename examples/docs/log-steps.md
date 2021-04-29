## LogSteps 工作流时间轴

### 基础用法

:::demo 基础用法

```html
<template>
  <oa-log-steps :data="data"></oa-log-steps>
</template>
<script>
  export default {
    data() {
      return {
        data: [
          {
            stepName: "申请人填写",
            auditor: "小周",
            auditMemo: null,
            createTime: "2020-11-10 16:59:39",
            agent: null,
            dept: "质量部门\\企业部门\\信息化组"
          },
          {
            stepName: "直属主管",
            auditor: "小宋",
            auditMemo: "同意",
            createTime: "2020-11-10 17:01:14",
            agent: "小周",
            dept: "质量部门"
          },
          {
            stepName: "总经理",
            auditor: "小庄",
            auditMemo: "同意",
            createTime: "2020-11-10 17:01:56",
            agent: "小周",
            dept: "质量部门"
          },
          {
            stepName: "COO",
            auditor: "小李",
            auditMemo: "同意",
            createTime: "2020-11-10 17:02:08",
            agent: "小周",
            dept: "总办\\总办领导"
          },
          {
            stepName: "申请人预订",
            auditor: "小周",
            auditMemo: "同意",
            createTime: "2020-11-10 21:43:55",
            agent: null,
            dept: "质量部门\\企业部门\\信息化组"
          },
          {
            stepName: "差旅负责人",
            auditor: "梁瑞麟",
            auditMemo: "同意",
            createTime: "2020-11-10 21:47:32",
            agent: null,
            dept: "质量部门\\企业部门\\信息化组"
          }
        ]
      };
    }
  };
</script>
```

:::

### Attributes

| 参数 | 说明       | 类型  | 可选值 | 默认值 |
| ---- | ---------- | ----- | ------ | ------ |
| data | 步骤条数据 | Array | —      | []     |
