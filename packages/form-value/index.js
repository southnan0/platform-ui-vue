import OaFormValue from './src/form-value';

/* istanbul ignore next */
OaFormValue.install = function(Vue) {
  Vue.component(OaFormValue.name, OaFormValue);
};

export default OaFormValue;
