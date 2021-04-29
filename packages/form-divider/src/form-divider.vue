<template>
  <div class="form-divider">
    <div
      v-if="title"
      class="title"
    >
      <div class="bold">
        {{ title }}
      </div>
      <div>
        <slot name="right" />
      </div>
    </div>
    <el-divider v-if="title" />
    <slot />
  </div>
</template>

<script>
import {Divider} from 'element-ui'

export default {
  name:'OaFormDivider',
  components:{ElDivider:Divider},
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
  .form-divider {
    .title {
      display: flex;
      > div {
        &:last-child {
          flex: 1;
          text-align: right;
        }
      }
    }
    ::v-deep.el-divider--horizontal{
      margin-top: 5px;
    }
  }
  .bold{
    font-weight: bold;
  }

</style>
