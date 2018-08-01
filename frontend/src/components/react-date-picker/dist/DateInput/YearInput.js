'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearInput = function (_PureComponent) {
  _inherits(YearInput, _PureComponent);

  function YearInput() {
    _classCallCheck(this, YearInput);

    return _possibleConstructorReturn(this, (YearInput.__proto__ || Object.getPrototypeOf(YearInput)).apply(this, arguments));
  }

  _createClass(YearInput, [{
    key: 'render',
    value: function render() {
      var maxYear = this.maxYear,
          minYear = this.minYear,
          yearStep = this.yearStep;
      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          itemRef = _props.itemRef,
          value = _props.value,
          onChange = _props.onChange,
          onKeyDown = _props.onKeyDown,
          required = _props.required;


      var name = 'year';

      return _react2.default.createElement('input', {
        className: (0, _mergeClassNames2.default)(className + '__input', className + '__year'),
        disabled: disabled,
        name: name,
        max: maxYear,
        min: minYear,
        onChange: onChange,
        onKeyDown: onKeyDown,
        placeholder: '--',
        ref: function ref(_ref) {
          if (_ref) {
            (0, _utils.updateInputWidth)(_ref);
          }

          if (itemRef) {
            itemRef(_ref, name);
          }
        },
        required: required,
        step: yearStep,
        type: 'number',
        value: value !== null ? value : ''
      });
    }
  }, {
    key: 'maxYear',
    get: function get() {
      var maxDate = this.props.maxDate;

      return maxDate ? (0, _dates.getYear)(maxDate) : null;
    }
  }, {
    key: 'minYear',
    get: function get() {
      var minDate = this.props.minDate;

      return (0, _utils.max)(1000, minDate && (0, _dates.getYear)(minDate));
    }
  }, {
    key: 'yearStep',
    get: function get() {
      var valueType = this.props.valueType;


      if (valueType === 'century') {
        return 10;
      }
      return 1;
    }
  }]);

  return YearInput;
}(_react.PureComponent);

exports.default = YearInput;


YearInput.propTypes = {
  className: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  itemRef: _propTypes2.default.func,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  value: _propTypes2.default.number,
  valueType: _propTypes3.isValueType
};