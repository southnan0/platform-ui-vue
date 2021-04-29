"use strict";

exports.__esModule = true;
exports.downloadUrl = void 0;

/**
 * 通过iframe进行下载
 * @param url
 */
var downloadUrl = function downloadUrl(url, errorCallback) {
  var name = 'oa-download-iframe'; // 首先创建一个用来发送数据的iframe.

  var el = document.getElementById(name);

  if (el) {
    document.body.removeChild(el);
  }

  var iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.id = name;
  iframe.style.display = 'none';

  iframe.onload = function () {
    errorCallback();
    document.body.removeChild(iframe);
  };

  document.body.appendChild(iframe);
};

exports.downloadUrl = downloadUrl;