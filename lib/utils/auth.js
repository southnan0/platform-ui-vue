"use strict";

exports.__esModule = true;
exports.getToken = getToken;
exports.setToken = setToken;
exports.removeToken = removeToken;
exports.getTs = getTs;
exports.setTs = setTs;
exports.removeTs = removeTs;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokenKey = 'login-token';
var TsKey = 'login-ts';

function getToken() {
  return _jsCookie.default.get(TokenKey);
}

function setToken(token) {
  return _jsCookie.default.set(TokenKey, token);
}

function removeToken() {
  return _jsCookie.default.remove(TokenKey);
}

function getTs() {
  return _jsCookie.default.get(TsKey);
}

function setTs(ts) {
  return _jsCookie.default.set(TsKey, ts);
}

function removeTs() {
  return _jsCookie.default.remove(TsKey);
}