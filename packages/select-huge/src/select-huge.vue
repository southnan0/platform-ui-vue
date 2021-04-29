<template>
  <div class="select-huge">
    <div
      v-if="multiple"
      class="input-wrapper"
      @click.stop="toggleMenu"
    >
      <div
        ref="tags"
        class="input-tags"
        :style="{ width: 'calc(100% - 30px)' }"
      >
        <el-tag
          v-for="(tag, index) in currentOptions"
          :key="index"
          :closable="!selectDisabled"
          :disable-transitions="false"
          :size="selectSize"
          type="info"
          @close="handleRemoveSelected(tag, index)"
        >
          {{ tag[labelName] }}
        </el-tag>
      </div>
      <el-input
        ref="reference"
        :placeholder="
          (currentOptions || []).length
            ? ''
            : `${$attrs.placeholder || '请选择'}`
        "
        :size="selectSize"
        :value="getSelectedLabel()"
        class="select-input"
        :disabled="selectDisabled"
        @focus="handleFocus"
        @mouseenter.native="inputHovering = true"
        @mouseleave.native="inputHovering = false"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.tab="visible = false"
      >
        <template slot="suffix">
          <i
            v-show="!showClose"
            :class="[
              'el-select__caret',
              'el-input__icon',
              'el-icon-' + iconClass,
            ]"
          />
          <i
            v-if="showClose"
            class="el-select__caret el-input__icon el-icon-circle-close"
            @click="handleClearClick"
          />
        </template>
      </el-input>
    </div>
    <el-input
      v-else
      :placeholder="
        (currentOptions || []).length ? '' : `${$attrs.placeholder || '请选择'}`
      "
      :size="selectSize"
      :value="((currentOptions || [])[0] || {})[labelName]"
      :disabled="selectDisabled"
      @focus="handleFocus"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
      @keydown.esc.stop.prevent="visible = false"
      @keydown.tab="visible = false"
    >
      <template slot="suffix">
        <i
          v-show="!showClose"
          :class="[
            'el-select__caret',
            'el-input__icon',
            'el-icon-' + iconClass,
          ]"
        />
        <i
          v-if="showClose"
          class="el-select__caret el-input__icon el-icon-circle-close"
          @click="handleClearClick"
        />
      </template>
    </el-input>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      append-to-body
      :popper-options="{ positionFixed: true }"
      :before-close="handleCancel"
      top="10vh"
      class="select-huge-dialog"
    >
      <div>
        <select-table
          :default-columns="fields"
          :remote-url="remoteUrl"
          :query-params="queryParams"
          :key-name="keyName"
          :label-name="labelName"
          :size="selectSize"
          :selected="selected"
          @select="handleSelect"
        />
        <div>
          <el-divider content-position="left">
            已选数据 {{ selected.length }}条
          </el-divider>
          <div class="tag-wrapper">
            <el-tag
              v-for="(tag, index) in selected"
              :key="tag[labelName]"
              closable
              @close="handleRemove(tag, index)"
            >
              {{ tag[labelName] }}
            </el-tag>
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          :size="selectSize"
          @click="handleCancel"
        >取 消</el-button>
        <el-button
          type="primary"
          :size="selectSize"
          @click="handleConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Input, Dialog, Divider, Tag, Button } from "element-ui";
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";
import SelectTable from "./table";
import _ from "lodash";
export default {
  name: "OaSelectHuge",
  components: {
    SelectTable,
    ElInput: Input,
    ElDialog: Dialog,
    ElDivider: Divider,
    ElTag: Tag,
    ElButton: Button,
  },
  inject: {
    elForm: {
      default: "",
    },

    elFormItem: {
      default: "",
    },
  },
  props: {
    title: {
      type: String,
      default: "请选择",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Array],
      default: "",
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    remoteUrl: {
      type: String,
      required: true,
    },
    queryParams: {
      type: Object,
      default() {
        return {};
      },
    },
    keyName: {
      type: String,
      default: "id",
    },
    labelName: {
      type: String,
      default: "name",
    },
    searchLabelName: {
      // 搜索字段名
      type: String,
      default: "searchText",
    },
    tableConfig: {
      type: Array,
      default() {
        return undefined;
      },
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      selected: _.cloneDeep(this.options) || [],
      visible: false,
      inputHovering: false,
      currentValue: this.value || "",
      currentOptions: _.cloneDeep(this.options) || [],
      fields: this.tableConfig || [
        {
          type: "el-input",
          field: this.searchLabelName,
          title: "",
          props: {
            clearable: true,
            placeholder: "请输入名称搜索",
          },
          col: {
            span: 24,
          },
          config: {
            showInTable: false,
            showInSearch: {
              searchType: "",
            },
          },
        },
        {
          field: this.labelName,
          title: "名称",
          config: {
            showInTable: {},
            showInSearch: false,
          },
        },
      ],
      initialInputHeight: 0,
    };
  },
  computed: {
    _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    iconClass() {
      return this.visible ? "arrow-up" : "arrow-down";
    },
    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== "";
      let criteria =
        this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },
    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
  },
  watch: {
    value(newValue) {
      if (newValue !== this.currentValue) {
        this.currentValue = newValue;
      }

      if (Array.isArray(newValue)) {
        this.selected = newValue?.map((key) => {
          const label = _.find(this.selected,item=>item[this.keyName] === key)?.[this.labelName]
          return {
            [this.keyName]: key,
            [this.labelName]: label || key,
          };
        });
      } else if (newValue) {
        const label = _.find(this.selected,item=>item[this.keyName] === newValue)?.[this.labelName]
        this.selected = [
          {
            [this.keyName]: newValue,
            [this.labelName]: label || newValue,
          },
        ];
      } else {
        this.selected = [];
      }
      this.$nextTick(()=>{
        this.currentOptions = _.cloneDeep(this.selected)
        this.$emit("update:options", _.cloneDeep(this.selected));
      })
    },
    options(newValue) {
      this.currentOptions = _.cloneDeep(newValue);
      this.selected = _.cloneDeep(newValue);
    },
  },
  mounted() {
    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28,
      };
      const input = reference.$el.querySelector("input");
      this.initialInputHeight =
        input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    if (this.multiple) {
      this.resetInputHeight();
      addResizeListener(this.$refs.tags, this.handleResize);
    }
  },
  beforeDestroy() {
    if (this.$el && this.handleResize)
      removeResizeListener(this.$el, this.handleResize);
  },
  methods: {
    handleResize() {
      if (this.multiple) this.resetInputHeight();
    },
    handleFocus() {
      this.visible = true;
    },
    handleRemove(tag, index) {
      this.selected.splice(index, 1);
    },
    handleRemoveSelected(tag, index) {
      this.selected.splice(index, 1);
      let value = this.selected?.map(item=>item[this.keyName])
      this.$emit("input", value);
      this.$emit("change",value);
      this.currentOptions = _.cloneDeep(this.selected);
      this.$emit("update:options", _.cloneDeep(this.selected));
    },
    handleSelect(param) {
      const id = param[this.keyName];
      const index = this.selected?.findIndex(
        (item) => item[this.keyName] === id
      );
      if (index === -1) {
        if (!this.multiple) {
          this.selected = [param];
        } else {
          this.selected.push(param);
        }
      }

      if (!this.multiple) {
        const value = this.selected?.[0]?.[this.keyName]
        const isChange = value !== this.value
        this.$emit("input", value);
        if(isChange){
          this.$emit("change",value);
        }
        this.currentOptions = _.cloneDeep(this.selected);
        this.$emit("update:options", _.cloneDeep(this.selected));
        this.visible = false;
      }
    },
    handleConfirm() {
      const value = this.selected?.map((item) => item[this.keyName])
      let isChange = true
      try{
        isChange = JSON.stringify(value) !== JSON.stringify(this.value)
      }catch (e) {
        console.info(e)
      }
      this.$emit(
        "input",
          value
      );
      if(isChange){
        this.$emit("change",value);
      }

      this.$emit("update:options", _.cloneDeep(this.selected));
      this.currentOptions = _.cloneDeep(this.selected);
      this.visible = false;
    },
    handleCancel() {
      this.selected = _.cloneDeep(this.currentOptions) || [];
      this.visible = false;
    },
    resetInputHeight() {
      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(
          inputChildNodes,
          (item) => item.tagName === "INPUT"
        )[0];
        const tags = this.$refs.tags;

        const sizeInMap = this.initialInputHeight || 40;
        input.style.height =
          this.currentOptions.length === 0
            ? sizeInMap + "px"
            : Math.max(
                tags
                  ? tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)
                  : 0,
                sizeInMap
              ) + "px";
      });
    },
    toggleMenu() {
      if (!this.disabled) {
        (this.$refs.input || this.$refs.reference).focus();
      }
    },
    handleClearClick(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : "";
      this.$emit("input", value);
      this.$emit("change",value);
      this.visible = false;
      this.$emit("clear");
      this.selected = [];
      this.currentOptions =[];
      this.$emit("update:options", []);
    },
    getSelectedLabel(){
      const selectedLabel = this.currentOptions?.map(item=>item[this.labelName])?.join(',')
      return selectedLabel
    }
  },
};
</script>
<style lang="scss" scoped>
.select-huge {
  display: inline-block;
  position: relative;
  ::v-deep {
    .el-popover {
      width: 100%;
    }
  }
  .input-wrapper {
    position: relative;
    .input-tags {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      line-height: normal;
      white-space: normal;
      ::v-deep {
        .el-tag {
          margin: 2px 0 2px 6px;
          max-width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  .select-input{
    ::v-deep{
      .el-input__inner{
        color: transparent;
      }
    }
  }
}
.tag-wrapper {
  .el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.select-huge-dialog {
  ::v-deep {
    .el-dialog__body {
      padding: 10px 20px;
      max-height: calc(100vh - 20vh - 150px);
      overflow-y: auto;
    }
  }
}
</style>
