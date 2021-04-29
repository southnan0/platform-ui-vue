import OaTableList from './src/table-list';

/* istanbul ignore next */
OaTableList.install = function(Vue) {
  Vue.component(OaTableList.name, OaTableList);
};

export default OaTableList;
