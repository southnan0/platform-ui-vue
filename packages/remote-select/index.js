import OaRemoteSelect from './src/remote-select';

/* istanbul ignore next */
OaRemoteSelect.install = function(Vue) {
  Vue.component(OaRemoteSelect.name, OaRemoteSelect);
};

export default OaRemoteSelect;
