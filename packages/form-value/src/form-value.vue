<template>
  <div style="word-break: break-all;">{{ formatValue }}</div>
</template>

<script>
export default {
  name: "OaFormValue",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    emptyValue: {
      type: String,
      default: "",
    },
    formatter: {
      type: Function,
      default: undefined,
    },
  },
  computed: {
    formatValue() {
      if (this.formatter instanceof Function) {
        return this.formatter(this.value);
      } else {
        return this.emptyValue && !this.value ? this.emptyValue : this.value;
      }
    },
  },
};
</script>
