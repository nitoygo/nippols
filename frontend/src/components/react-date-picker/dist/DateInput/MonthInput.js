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

var MonthInput = function (_PureComponent) {
  _inherits(MonthInput, _PureComponent);

  function MonthInput() {
    _classCallCheck(this, MonthInput);

    return _possibleConstructorReturn(this, (MonthInput.__proto__ || Object.getPrototypeOf(MonthInput)).apply(this, arguments));
  }

  _createClass(MonthInput, [{
    key: 'render',
    value: function render() {
      var maxMonth = this.maxMonth,
          minMonth = this.minMonth;
      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          itemRef = _props.itemRef,
          value = _props.value,
          onChange = _props.onChange,
          onKeyDown = _props.onKeyDown,
          required = _props.required,
          showLeadingZeros = _props.showLeadingZeros;


      var name = 'month';
      var hasLeadingZero = showLeadingZeros && value !== null && value < 10;

      return [hasLeadingZero ? '0' : null, _react2.default.createElement('input', {
        key: 'month',
        className: (0, _mergeClassNames2.default)(className + '__input', className + '__month', hasLeadingZero && className + '__input--hasLeadingZero'),
        disabled: disabled,
        name: name,
        max: maxMonth,
        min: minMonth,
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
        type: 'number',
        required: required,
        value: value !== null ? value : ''
      })];
    }
  }, {
    key: 'maxMonth',
    get: function get() {
      var _props2 = this.props,
          maxDate = _props2.maxDate,
          year = _props2.year;

      return (0, _utils.min)(12, maxDate && year === (0, _dates.getYear)(maxDate) && (0, _dates.getMonth)(maxDate));
    }
  }, {
    key: 'minMonth',
    get: function get() {
      var _props3 = this.props,
          minDate = _props3.minDate,
          year = _props3.year;

      return (0, _utils.max)(1, minDate && year === (0, _dates.getYear)(minDate) && (0, _dates.getMonth)(minDate));
    }
  }]);

  return MonthInput;
}(_react.PureComponent);

exports.default = MonthInput;


MonthInput.propTypes = {
  className: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  itemRef: _propTypes2.default.func,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  showLeadingZeros: _propTypes2.default.bool,
  value: _propTypes2.default.number,
  year: _propTypes2.default.number
};