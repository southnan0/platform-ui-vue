import { Message } from "element-ui";
import { getToken, getTs } from "oa-ui/src/utils/auth";
import { downloadUrl } from "oa-ui/src/utils/download";

import request from "oa-ui/src/utils/request";

export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    buttonText:{
      type: String,
      default: '点击上传'
    },
    downloadPath: {
      type: String,
      default: "/worksheet/file/download"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9
    },
    action: {
      type: String,
      default: "/file/upload?upload_path=worksheet"
    },
    name: {
      type: String,
      default: "file"
    },
    maxSize: {
      type: Number,
      default: 20
    },
    accept: {
      type: Array,
      default() {
        return [
          ".txt",
          ".doc",
          ".docx",
          ".xls",
          ".xlsx",
          ".pdf",
          ".rar",
          ".zip",
          ".jpg",
          ".jpeg",
          ".gif",
          ".png",
          ".bmp",
          ".dmp"
        ];
      }
    },
    showFileList:{
      type: Boolean,
      default:true
    }
  },
  data() {
    return {
      fileList: (this.value || [])[0] ? this.value : [],
      headers: {
        accessToken: getToken(),
        ts: getTs(),
        clientId: request?.defaults?.headers?.clientId || ""
      }
    };
  },
  computed: {
    actionUrl() {
      return `${request?.defaults?.baseURL || ""}${this.action}`;
    }
  },
  watch: {
    value(v) {
      this.fileList = (v || [])[0] ? v : [];
    }
  },
  methods: {
    onSuccess(res, file, fileList) {
      if (res && res.data) {
        this.handleChange(fileList);
      } else {
        const index = (fileList || []).findIndex(item => item.uid === file.uid);
        if (index !== -1) {
          (this.fileList || []).splice(index, 1);
          this.$emit("input", this.fileList);
        }
        Message.error(`上传失败 ${(res || {}).message}`);
      }
    },
    handlePreview(file) {
      downloadUrl(
        `${request?.defaults?.baseURL || ""}${this.downloadPath}/${
          file.file_id
        }`,
        () => {}
      );
    },
    handleRemove(file, fileList) {
      this.handleChange(fileList);
    },
    handleExceed(files, fileList) {
      Message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleChange(fileList) {
      this.fileList = (fileList || []).map(item => {
        return Object.assign(item, {
          file_id:
            (item || {}).file_id ||
            (item &&
              item.response &&
              item.response.data &&
              (item.response.data[0] || {}).file_id)
        });
      });
      this.$emit("input", this.fileList);
    },
    beforeUpload(file) {
      const isLimitSize = file.size / 1024 / 1024 < this.maxSize;

      if (!isLimitSize) {
        Message.error(`文件大小不能超过${this.maxSize}M`);
      }

      return isLimitSize;
    }
  }
};
