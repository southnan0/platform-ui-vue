<template>
  <el-button type="text">
    <router-link :to="transformLink()">
      <slot />
    </router-link>
  </el-button>
</template>

<script>
import {Button} from "element-ui";
export default {
  name: "OaTableLink",
  comments:{
    ElButton:Button
  },
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
    link: {
      type: String,
      default: "",
    },
  },
  methods: {
    // /a/[id]?name=[name]  => 方括号内进行替换
    transformLink() {
      const reg = new RegExp("\\[(.+?)\\]", "g");
      return this.link?.replace(reg, (replacement) => {
        return this.row[replacement?.replace(reg, "$1")];
      });
    },
  },
};
</script>
