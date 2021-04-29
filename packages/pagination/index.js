import OaPagination from './src/pagination';

/* istanbul ignore next */
OaPagination.install = function(Vue) {
  Vue.component(OaPagination.name, OaPagination);
};

export default OaPagination;
