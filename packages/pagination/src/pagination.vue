<template>
  <div
    :class="{'hidden':hidden}"
    class="pagination-container"
  >
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from 'oa-ui/src/utils/scroll-to'
import {Pagination} from 'element-ui'

export default {
  name: 'OaPagination',
  components:{ElPagination:Pagination},
  props: {
    total: {
      required: true,
      type: Number
    },
    start: { // 从第几条开始加载
      type: Number,
      default: undefined
    },
    page: { // 从第几页开始加载
      type: Number,
      default: 1
    },
    limit: { // 每页显示的数量
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      idxMode: this.start !== undefined // 默认直接传入第几条的索引值， 否则采用指定页码
    }
  },
  computed: {
    currentPage: { // 根据start可自动转换为page
      get() { // 根据start 或 页码 获取当前页
        return this.idxMode ? (this.start + this.limit) / this.limit : this.page
      },
      set(val) { // 更新page 或 start 属性
        // var reg = /url\("(.*)"\)/g
        // console.info(reg)
        this.idxMode ? this.$emit('update:start', (val - 1) * this.limit) : this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      const emitParam = this.idxMode ? { start: this.start, limit: val } : { page: this.currentPage, limit: val }
      this.$emit('pagination', emitParam)
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      const emitParam = this.idxMode ? { start: (val - 1) * this.pageSize, limit: this.pageSize } : { page: val, limit: this.pageSize }
      this.$emit('pagination', emitParam)
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 16px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
