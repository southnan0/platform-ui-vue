## UploaderFile 文件上传

### 基础用法

:::demo 基础用法

```html
<template>
  <oa-uploader-file :limit="1" :maxSize="0.1"></oa-uploader-file>
</template>
```

:::

### Attributes

| 参数         | 说明                     | 类型    | 可选值 | 默认值                                                                                                 |
| ------------ | ------------------------ | ------- | ------ | ------------------------------------------------------------------------------------------------------ |
| value        | 默认 value 值            | Array   | —      | []                                                                                                     |
| downloadPath | 文件下载路径             | String  | —      | ''                                                                                                     |
| disabled     | 是否禁用                 | Boolean | —      | false                                                                                                  |
| limit        | 上传数量限制             | Number  | —      | 9                                                                                                      |
| action       | 上传路径                 | String  | —      | /file/upload?upload_path=worksheet                                                                     |
| name         | 上传 file 的 name key 值 | String  | —      | file                                                                                                   |
| maxSize      | 默认 value 值            | Number  | —      | 20                                                                                                     |
| accept       | 默认 value 值            | Array   | —      | ['.txt','.doc','.docx','.xls','.xlsx','.pdf','.rar','.zip','.jpg','.jpeg','.gif','.png','.bmp','.dmp'] |
