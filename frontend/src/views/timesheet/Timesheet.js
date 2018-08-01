
import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

//import DailyContainer from './DailyContainer';
import WeeklyContainer from './WeeklyContainer';
import MonthlyContainer from './MonthlyContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Timesheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render () {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card>
          <CardHeader title="Timesheet" />
          <CardContent style={{height: '72vh'}}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Weekly Timesheet" />
              <Tab label="Monthly Summary" />
            </Tabs>
            <Divider />
            {value === 0 && <WeeklyContainer />}
            {value === 1 && <MonthlyContainer />}
          </CardContent>
        </Card>
      </div>
    );
  }
}

Timesheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timesheet);
