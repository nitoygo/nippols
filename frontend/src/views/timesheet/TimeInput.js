
import React from 'react';

import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  input: {
    padding: 0,
    fontSize: 'small',
  },
});

const stringPercentToMinutes = strPercent => {
  let percentNum = parseInt(strPercent, 10);
  let minutes = 60 * (percentNum/100);

  return Math.round(minutes);
}

class TimeInput extends React.Component {

  constructor(props) {
    super(props);

    this.onTimeCellChange = this.onTimeCellChange.bind(this);
    this.onTimeCellVisit = this.onTimeCellVisit.bind(this);
    this.onTimeCellLeave = this.onTimeCellLeave.bind(this);

    const { minutesValue } = this.props;

    let displayValue = "";
    if (minutesValue && minutesValue > 0) {
      let hour = Math.floor(minutesValue / 60);
      let minutes = minutesValue % 60;
      displayValue = `${hour}:${(minutes < 10? '0': '')}${minutes}`;
    }

    this.state = {
      displayValue : displayValue
    }
  }

  componentDidUpdate(prevProps) {
    const { minutesValue } = this.props;

    if (prevProps.minutesValue !== minutesValue) {
      let displayValue = "";
      if (minutesValue && minutesValue > 0) {
        let hour = Math.floor(minutesValue / 60);
        let minutes = minutesValue % 60;
        displayValue = `${hour}:${(minutes < 10? '0': '')}${minutes}`;
      }
  
      this.setState({displayValue});
    }
  }

  checkTimeValue(target) {
    let value = target.value;
    let currentChar = value.charAt(value.length - 1);

    if (value.length === 1) {
      // first character should be any number between 0 and 9
      if (currentChar >= "0" && currentChar <= "9") {
        this.setState({displayValue: value});
      }
    }
    else if (value.length === 2) {
      // second character should only be a colon or a dot
      if (currentChar === ":" || currentChar === ".") {
        this.setState({displayValue: value});
      }
    }
    else if (value.length === 3) {
      // third character should only be from 0 to 6 when second character is a colon
      if (value.charAt(1) === ":" && (currentChar >= "0" && currentChar <= "6")) {
        this.setState({displayValue: value});
      }
      // third character should can be from 0 to 9 when second character is a dot
      else if (value.charAt(1) === "." && (currentChar >= "0" && currentChar <= "9")) {
        this.setState({displayValue: value});
      }
    }
    else if (value.length === 4) {
      if (currentChar >= "0" && currentChar <= "9") {
        if (value.charAt(1) === ".") {
          let percentStr = value.substring(2, 4);
          let minutes = stringPercentToMinutes(percentStr);
    
          value = `${value.charAt(0)}:${(minutes < 10? '0': '')}${minutes}`;
        }

        this.setState({displayValue: value});
      }
    }

  }

  onTimeCellLeave(event) {
    let target = event.target;
    let value = target.value;
    this.checkTimeValue(target);

    if (value.length === 1 || value.length === 2) {
      value = `${value.charAt(0)}:00`;

    } else if (value.length === 3) {

      if (value.charAt(1) === ".") {
        let percentStr = `${value.charAt(2)}0`;
        let minutes = stringPercentToMinutes(percentStr);

        value = `${value.charAt(0)}:${(minutes < 10? '0': '')}${minutes}`;

      } else if (value.charAt(1) === ":") {
        value = `${value.charAt(0)}00`;
      }
    }

    let hours = parseInt(value.charAt(0), 10);
    let minutes = parseInt(value.charAt(2) + value.charAt(3), 10);
    let totalMinutes = (hours * 60) + (minutes)

    if (totalMinutes > 0) {
      this.props.onTimeChange(this.props.id, totalMinutes);
    }
    
    this.setState({displayValue: value});
  }

  onTimeCellVisit(event) {
    // do nothing for now
  }

  onTimeCellChange(event) {
    let target = event.target;
    let value = target.value;

    this.checkTimeValue(target);

    // due to complexity and performance reasons, we only update state when value is completed
    if (value.length === 4) {
      let hours = parseInt(value.charAt(0), 10);
      let minutes = parseInt(value.charAt(2) + value.charAt(3), 10);
      let totalMinutes = (hours * 60) + (minutes)

      if (totalMinutes > 0) {
        this.props.onTimeChange(this.props.id, totalMinutes);
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Input
        className={classes.input}
        placeholder="0:00"
        fullWidth
        onChange={this.onTimeCellChange}
        onFocus={this.onTimeCellVisit}
        onBlur={this.onTimeCellLeave}
        id={this.props.id}
        value={this.state.displayValue}
      />
    )
  }
}

TimeInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeInput);
