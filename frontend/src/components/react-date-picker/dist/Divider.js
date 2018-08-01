'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Divider = function Divider(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'span',
    { className: 'react-date-picker__button__input__divider' },
    children
  );
};

Divider.propTypes = {
  children: _propTypes2.default.node
};

exports.default = Divider;