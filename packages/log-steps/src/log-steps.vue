<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in data"
        :key="index"
      >
        <div class="step-content-wrapper">
          <div :span="6">
            {{ activity.stepName }}
          </div>
          <div :span="18">
            {{ activity.auditor }}<span v-if="activity.agent">(代理人：{{ activity.agent }})</span>
            【{{ activity.dept }}】
            <span class="time">
              {{ activity.createTime }}
            </span>
          </div>
        </div>
        <div class="memo">
          {{ activity.auditMemo }}
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name:'OaLogSteps',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.step-content-wrapper{
  display: flex;
  >div{
    flex: 1;
    &:first-child{
      max-width: 150px;
    }
  }
  .time{
    color:#A1A7AE;
    font-size: 12px;
  }
}
.memo{
  color:#A1A7AE;
  font-size: 12px;
  line-height: 20px;
}
</style>
