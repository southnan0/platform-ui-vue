import OaTable from './src/table';

/* istanbul ignore next */
OaTable.install = function(Vue) {
  Vue.component(OaTable.name, OaTable);
};

export default OaTable;
