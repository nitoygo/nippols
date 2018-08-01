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

var DayInput = function (_PureComponent) {
  _inherits(DayInput, _PureComponent);

  function DayInput() {
    _classCallCheck(this, DayInput);

    return _possibleConstructorReturn(this, (DayInput.__proto__ || Object.getPrototypeOf(DayInput)).apply(this, arguments));
  }

  _createClass(DayInput, [{
    key: 'render',
    value: function render() {
      var maxDay = this.maxDay,
          minDay = this.minDay;
      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          itemRef = _props.itemRef,
          value = _props.value,
          onChange = _props.onChange,
          onKeyDown = _props.onKeyDown,
          required = _props.required,
          showLeadingZeros = _props.showLeadingZeros;


      var name = 'day';
      var hasLeadingZero = showLeadingZeros && value !== null && value < 10;

      return [hasLeadingZero ? '0' : null, _react2.default.createElement('input', {
        key: 'day',
        className: (0, _mergeClassNames2.default)(className + '__input', className + '__day', hasLeadingZero && className + '__input--hasLeadingZero'),
        disabled: disabled,
        name: name,
        max: maxDay,
        min: minDay,
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
        type: 'number',
        value: value !== null ? value : ''
      })];
    }
  }, {
    key: 'currentMonthMaxDays',
    get: function get() {
      var _props2 = this.props,
          year = _props2.year,
          month = _props2.month;


      if (!month) {
        return 31;
      }

      return (0, _dates.getDaysInMonth)(new Date(year, month - 1, 1));
    }
  }, {
    key: 'maxDay',
    get: function get() {
      var _props3 = this.props,
          maxDate = _props3.maxDate,
          month = _props3.month,
          year = _props3.year;

      return (0, _utils.min)(this.currentMonthMaxDays, maxDate && year === (0, _dates.getYear)(maxDate) && month === (0, _dates.getMonth)(maxDate) && (0, _dates.getDay)(maxDate));
    }
  }, {
    key: 'minDay',
    get: function get() {
      var _props4 = this.props,
          minDate = _props4.minDate,
          month = _props4.month,
          year = _props4.year;

      return (0, _utils.max)(1, minDate && year === (0, _dates.getYear)(minDate) && month === (0, _dates.getMonth)(minDate) && (0, _dates.getDay)(minDate));
    }
  }]);

  return DayInput;
}(_react.PureComponent);

exports.default = DayInput;


DayInput.propTypes = {
  className: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  itemRef: _propTypes2.default.func,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  month: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  showLeadingZeros: _propTypes2.default.bool,
  value: _propTypes2.default.number,
  year: _propTypes2.default.number
};