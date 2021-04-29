"use strict";

exports.__esModule = true;
exports.cacheRequest = cacheRequest;
exports.removeCacheData = exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _elementUi = require("element-ui");

var _auth = require("./auth");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = _axios.default.create();

var tag = false;
request.interceptors.request.use(function (config) {
  if ((0, _auth.getToken)()) {
    config.headers['accessToken'] = (0, _auth.getToken)();
  }

  config.headers['ts'] = (0, _auth.getTs)();
  return config;
}, function (error) {
  return Promise.reject(error);
});
request.interceptors.response.use(function (response) {
  var _response$config, _response$config$resp;

  var res = response.data;

  if ((response === null || response === void 0 ? void 0 : (_response$config = response.config) === null || _response$config === void 0 ? void 0 : (_response$config$resp = _response$config.responseType) === null || _response$config$resp === void 0 ? void 0 : _response$config$resp.toLocaleLowerCase()) === 'arraybuffer') {
    var disposition = response.headers['content-disposition'];
    var filename = (0, _index.getExportFilename)(disposition);
    return {
      data: res,
      filename: filename
    };
  }

  if (response.status === 204 && !res) {
    (0, _elementUi.Message)({
      message: '删除成功!',
      type: 'success',
      duration: 5 * 1000
    });
    return;
  }

  if (res.code !== 20000 && res.status !== 200 && !(res.code + '').startsWith('20')) {
    (0, _elementUi.Message)({
      message: res.message || '服务器开小差啦',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(new Error(res.message || 'Error'));
  } else {
    return res;
  }
}, function (error) {
  var res = error.response || {};
  var isLogin = location.href.match('/login'); // token 超时的错误码40102，没有权限，也会返回401status

  if (res.status && res.status === 401 && !isLogin && res.data.code === 40102) {
    if (tag) return;
    tag = true;
    (0, _auth.removeToken)();
    (0, _auth.removeTs)();

    if (request.exit) {
      request.exit();
    } else {
      location.reload();
    }
  } else {
    var _error$response, _error$response$data;

    (0, _elementUi.Message)({
      message: ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.message) || error.message || '服务器开小差啦',
      type: 'error',
      duration: 5 * 1000
    });
  }

  return Promise.reject(error);
});
var _default = request;
exports.default = _default;
var cache = {};
/**
 * 缓存请求的数据
 * @param {} config
 */

function cacheRequest(config) {
  // 只缓存get请求
  if (config.method.toLowerCase() !== 'get') {
    return request(config);
  } // 缓存key


  var cacheKey = config.url + JSON.stringify(config.data || config.params || {});

  if (cache[cacheKey]) {
    return new Promise(function (reslove) {
      reslove(Object.assign({}, cache[cacheKey]));
    });
  } else {
    return request(config).then(function (res) {
      cache[cacheKey] = res;
      return res;
    });
  }
}

var removeCacheData = function removeCacheData(cacheKey) {
  if (cacheKey) {
    delete cache[cacheKey];
  } else {
    cache = {};
  }
};

exports.removeCacheData = removeCacheData;