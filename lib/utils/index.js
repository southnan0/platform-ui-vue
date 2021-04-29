"use strict";

exports.__esModule = true;
exports.parseTime = parseTime;
exports.formatTime = formatTime;
exports.getQueryObject = getQueryObject;
exports.byteLength = byteLength;
exports.cleanArray = cleanArray;
exports.param = param;
exports.param2Obj = param2Obj;
exports.html2Text = html2Text;
exports.objectMerge = objectMerge;
exports.toggleClass = toggleClass;
exports.getTime = getTime;
exports.debounce = debounce;
exports.deepClone = deepClone;
exports.uniqueArr = uniqueArr;
exports.createUniqueString = createUniqueString;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.buildMenuTree = buildMenuTree;
exports.flatArr2Obj = flatArr2Obj;
exports.openNew = exports.getExportFilename = void 0;

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  var date;

  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }

    date = new Date(time);
  }

  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  var time_str = format.replace(/{([ymdhisa])+}/g, function (result, key) {
    var value = formatObj[key]; // Note: getDay() returns 0 on Sunday

    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }

    return value.toString().padStart(2, '0');
  });
  return time_str;
}
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */


function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }

  var d = new Date(time);
  var now = Date.now();
  var diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }

  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}
/**
 * @param {string} url
 * @returns {Object}
 */


function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  var search = url.substring(url.lastIndexOf('?') + 1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}
/**
 * @param {string} input value
 * @returns {number} output value
 */


function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;

  for (var i = str.length - 1; i >= 0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--;
  }

  return s;
}
/**
 * @param {Array} actual
 * @returns {Array}
 */


function cleanArray(actual) {
  var newArray = [];

  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }

  return newArray;
}
/**
 * @param {Object} json
 * @returns {Array}
 */


function param(json) {
  if (!json) return '';
  return cleanArray(Object.keys(json).map(function (key) {
    if (json[key] === undefined) return '';
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  })).join('&');
}
/**
 * @param {string} url
 * @returns {Object}
 */


function param2Obj(url) {
  var search = url.split('?')[1];

  if (!search) {
    return {};
  }

  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}');
}
/**
 * @param {string} val
 * @returns {string}
 */


function html2Text(val) {
  var div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}
/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */


function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {};
  }

  if (Array.isArray(source)) {
    return source.slice();
  }

  Object.keys(source).forEach(function (property) {
    var sourceProperty = source[property];

    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}
/**
 * @param {HTMLElement} element
 * @param {string} className
 */


function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }

  var classString = element.className;
  var nameIndex = classString.indexOf(className);

  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }

  element.className = classString;
}
/**
 * @param {string} type
 * @returns {Date}
 */


function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */


function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function later() {
    // 据上一次触发时间间隔
    var last = +new Date() - timestamp; // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null; // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用

      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    context = this;
    timestamp = +new Date();
    var callNow = immediate && !timeout; // 如果延时不存在，重新设定延时

    if (!timeout) timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */


function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }

  var targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(function (keys) {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
/**
 * @param {Array} arr
 * @returns {Array}
 */


function uniqueArr(arr) {
  return Array.from(new Set(arr));
}
/**
 * @returns {string}
 */


function createUniqueString() {
  var timestamp = +new Date() + '';
  var randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */


function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */


function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}
/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */


function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}
/**
 * 将扁平的菜单数据转为树型， list的菜单id必须支持可排序
 * @param {*} menus
 */


function buildMenuTree(menus) {
  var temp = {};
  var tree = [];
  menus.sort(function (a, b) {
    return a.id - b.id;
  });
  menus.forEach(function (item) {
    temp[item.id] = item;
  });

  for (var i in temp) {
    if (temp[i].parent_id) {
      if (!temp[temp[i].parent_id].children) {
        temp[temp[i].parent_id].children = [];
      }

      temp[temp[i].parent_id].children.push(temp[i]);
    } else if (temp[i].parent_id === null) {
      tree.push(temp[i]);
    }
  } // console.log(temp, tree, menus)


  return tree;
}

function flatArr2Obj(arr, key) {
  var rs = {};
  arr.forEach(function (item) {
    rs[item[key]] = item;
  });
  return rs;
}

var getExportFilename = function getExportFilename(disposition) {
  var filename = '';

  if (disposition && disposition.indexOf('attachment') !== -1) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(disposition);

    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }

  return filename;
};

exports.getExportFilename = getExportFilename;

var openNew = function openNew(url) {
  return window.open(url, '_blank');
};

exports.openNew = openNew;