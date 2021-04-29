import OaLogSteps from './src/log-steps';

/* istanbul ignore next */
OaLogSteps.install = function(Vue) {
  Vue.component(OaLogSteps.name, OaLogSteps);
};

export default OaLogSteps;
