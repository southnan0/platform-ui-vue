<template>
  <span>
    {{ row.name }}
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <el-button
        slot="reference"
        icon="el-icon-info"
        type="text"
      />
    </el-popover>
  </span>
</template>

<script>
export default {
  name: "NameColumn",
  props: {
    row: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>