<template>
  <span>
    <el-upload
      class="upload-demo"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="onSuccess"
      :on-exceed="handleExceed"
      :file-list="fileList || []"
      :disabled="disabled"
      :class="disabled ? 'hidden-input' : ''"
      :limit="limit"
      :action="actionUrl"
      with-credentials
      :name="name"
      :headers="headers"
      :before-upload="beforeUpload"
      :accept="accept.join(',')"
      :show-file-list="showFileList"
    >
      <el-button
        v-if="!disabled && buttonText"
        size="small"
        type="primary"
      >{{ buttonText }}</el-button>
      <template slot="tip">
        <div
          v-if="!disabled"
          class="el-upload__tip"
        >
          支持文件格式：{{ accept.join("，") }}
        </div>
      </template>
    </el-upload>
  </span>
</template>
<script>
import {Upload,Button} from 'element-ui'
import upload from './upload'

export default {
  name: 'OaUploaderFile',
  components:{
    ElUpload:Upload,
    ElButton:Button
  },
  mixins:[upload]
}
</script>
<style lang="scss" scoped>
.hidden-input {
  ::v-deep {
    .el-upload {
      display: none;
    }
  }
}
</style>
