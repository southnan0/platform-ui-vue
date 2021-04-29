import BackToTop from './src/back-to-top';

/* istanbul ignore next */
BackToTop.install = function(Vue) {
  Vue.component(BackToTop.name, BackToTop);
};

export default BackToTop;
