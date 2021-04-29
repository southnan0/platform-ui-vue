import OaUploaderFile from './src/uploader-file';

/* istanbul ignore next */
OaUploaderFile.install = function(Vue) {
  Vue.component(OaUploaderFile.name, OaUploaderFile);
};

export default OaUploaderFile;
