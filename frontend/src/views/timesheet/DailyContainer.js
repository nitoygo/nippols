
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import restClient from '../../_utilities/dataProvider';
import { TASK_STATUS } from '../../_utilities/constants';

import { GET_LIST } from 'react-admin';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class DailyContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: []
    }
  }

  componentDidMount() {
    let username = localStorage.getItem('username');

    restClient()
      .then((dataProvider) => {
        dataProvider(GET_LIST, 'task', {
            filter: {
              status_like: `${TASK_STATUS.NEW}|${TASK_STATUS.ONGOING}`,
              subscribed: true
            }
        })
      .then(response => {
          const taskList = response.data;
          this.setState({taskList});
        }
      );
    });
  }

  render() {

    return (
      <div style={{ padding: 8 * 3 }}>
        <Typography>
          Daily
        </Typography>
      </div>
    );
  }

}

DailyContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DailyContainer);
