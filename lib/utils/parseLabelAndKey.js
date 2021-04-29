"use strict";

exports.__esModule = true;
exports.parseKeyName = exports.formatKeyName = exports.formatMulKeyName = exports.parseMulKeyName = void 0;
var SPLIT = '|';

var parseMulKeyName = function parseMulKeyName(arrKey) {
  var obj = {
    key: [],
    name: []
  };
  arrKey.forEach(function (key) {
    obj.key.push(parseKeyName(key)[0]);
    obj.name.push(parseKeyName(key)[1]);
  });
  return [obj.key.join(','), obj.name.join(',')];
};

exports.parseMulKeyName = parseMulKeyName;

var formatMulKeyName = function formatMulKeyName(arrKey, arrLabel) {
  return arrKey.map(function (item, index) {
    return formatKeyName(item, arrLabel[index]);
  });
};

exports.formatMulKeyName = formatMulKeyName;

var formatKeyName = function formatKeyName(key, label) {
  return "" + key + SPLIT + label;
};

exports.formatKeyName = formatKeyName;

var parseKeyName = function parseKeyName(key) {
  if (!key) return [];
  return key.split(SPLIT) || [];
};

exports.parseKeyName = parseKeyName;