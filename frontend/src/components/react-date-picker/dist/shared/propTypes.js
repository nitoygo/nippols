'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValueType = exports.isDetail = exports.isMinDate = exports.isMaxDate = undefined;

var _propTypes = require('react-calendar/dist/shared/propTypes');

Object.defineProperty(exports, 'isMaxDate', {
  enumerable: true,
  get: function get() {
    return _propTypes.isMaxDate;
  }
});
Object.defineProperty(exports, 'isMinDate', {
  enumerable: true,
  get: function get() {
    return _propTypes.isMinDate;
  }
});

var _propTypes2 = require('prop-types');

var _propTypes3 = _interopRequireDefault(_propTypes2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var isDetail = exports.isDetail = _propTypes3.default.oneOf(allViews);

var isValueType = exports.isValueType = _propTypes3.default.oneOf(allValueTypes);