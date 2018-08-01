'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('react-calendar/dist/shared/utils');

Object.defineProperty(exports, 'between', {
  enumerable: true,
  get: function get() {
    return _utils.between;
  }
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isValidNumber = function isValidNumber(a) {
  return typeof a === 'number' && !isNaN(a);
};
var min = exports.min = function min() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Math.min.apply(Math, _toConsumableArray(args.filter(isValidNumber)));
};
var max = exports.max = function max() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Math.max.apply(Math, _toConsumableArray(args.filter(isValidNumber)));
};

var updateInputWidth = exports.updateInputWidth = function updateInputWidth(element) {
  var span = document.createElement('span');
  span.innerHTML = element.value || element.placeholder;

  var container = element.parentElement;

  container.appendChild(span);

  var width = span.getBoundingClientRect().width + 4;
  element.style.width = width + 'px';

  container.removeChild(span);
};