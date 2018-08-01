'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NativeInput = function (_PureComponent) {
  _inherits(NativeInput, _PureComponent);

  function NativeInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NativeInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NativeInput.__proto__ || Object.getPrototypeOf(NativeInput)).call.apply(_ref, [this].concat(args))), _this), _this.stopPropagation = function (event) {
      return event.stopPropagation();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NativeInput, [{
    key: 'render',
    value: function render() {
      var nativeValueParser = this.nativeValueParser;
      var _props = this.props,
          disabled = _props.disabled,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          name = _props.name,
          onChange = _props.onChange,
          required = _props.required,
          value = _props.value;


      return _react2.default.createElement('input', {
        type: this.nativeInputType,
        disabled: disabled,
        max: maxDate ? nativeValueParser(maxDate) : null,
        min: minDate ? nativeValueParser(minDate) : null,
        name: name,
        onChange: onChange,
        onFocus: this.stopPropagation,
        required: required,
        style: {
          visibility: 'hidden',
          position: 'absolute',
          top: '-9999px',
          left: '-9999px'
        },
        value: value ? nativeValueParser(value) : ''
      });
    }
  }, {
    key: 'nativeInputType',
    get: function get() {
      var valueType = this.props.valueType;


      switch (valueType) {
        case 'decade':
        case 'year':
          return 'number';
        case 'month':
          return 'month';
        case 'day':
          return 'date';
        default:
          throw new Error('Invalid valueType.');
      }
    }
  }, {
    key: 'nativeValueParser',
    get: function get() {
      var valueType = this.props.valueType;


      switch (valueType) {
        case 'century':
        case 'decade':
        case 'year':
          return _dates.getYear;
        case 'month':
          return _dates.getISOLocalMonth;
        case 'day':
          return _dates.getISOLocalDate;
        default:
          throw new Error('Invalid valueType.');
      }
    }
  }]);

  return NativeInput;
}(_react.PureComponent);

exports.default = NativeInput;


NativeInput.propTypes = {
  disabled: _propTypes2.default.bool,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Date)]),
  valueType: _propTypes3.isValueType
};