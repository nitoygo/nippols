import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TeamYearlyChart from './TeamYearlyChart';

const styles = theme => ({
  infoLabel: {
    paddingTop: 10
  },
  infoTypography: {
    marginBottom: 10,
    fontSize: 14,
  },
  infoCount: {
    fontSize: 18,
  },
});

class TeamDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {

  }

  render () {
    const { record } = this.props;
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.infoLabel}>
          <Typography className={classes.infoTypography}>
            Number of Ongoing Tickets:
          </Typography>
          <Typography className={classes.infoCount} variant="title">
            <ul>
              <li>10</li>
            </ul>
          </Typography>
        </div>
        <div className={classes.infoLabel}>
          <Typography className={classes.infoTypography}>
            Number of Overdue Tickets:
          </Typography>
          <Typography className={classes.infoCount} variant="title">
            <ul>
              <li>3</li>
            </ul>
          </Typography>
        </div>
        <div className={classes.infoLabel}>
          <Typography className={classes.infoTypography}>
            Resolved Tickets (this week):
          </Typography>
          <Typography className={classes.infoCount} variant="title">
            <ul>
              <li>2</li>
            </ul>
          </Typography>
        </div>
        <div className={classes.infoLabel}>
          <Typography className={classes.infoTypography}>
            Resolved Tickets (this month):
          </Typography>
          <Typography className={classes.infoCount} variant="title">
            <ul>
              <li>8</li>
            </ul>
          </Typography>
        </div>
        <Divider />
        <div className={classes.infoLabel}>
          <Typography className={classes.infoTypography}>
            Tickets closed by this team vs average
          </Typography>
          <TeamYearlyChart />
        </div>
      </div>
    );
  }
}

TeamDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TeamDashboard);

