import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import Oa from 'main/index.js';
import hljs from 'highlight.js';
import routes from './route.config';

import demoBlock from './components/demo-block'
import nameColumn from './components/name-column.vue'
import FormTable from './components/form-table.vue'
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
import 'element-ui/packages/theme-chalk/src/index.scss';
import './assets/styles/fonts/style.css'
import './assets/styles/common.css'

import element from 'element-ui'
import formCreate from '@form-create/element-ui'


Vue.use(Oa);
Vue.use(VueRouter);
Vue.use(element);
Vue.use(formCreate);

Vue.component('demo-block', demoBlock);
Vue.component('name-column', nameColumn);
Vue.component('form-table', FormTable);
// formCreate.component('remote-select',Oa.OaRemoteSelect)

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => {globalEle.$data.$isEle = data;}
    }
  }
});

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

const title = {
  "home": "Oa - oaUI工具",
  "guide": "指南 | Oa",
  "component": "组件 | Oa",
  "resource": "资源 | Oa"
}
router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });

  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Oa';
  // ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
