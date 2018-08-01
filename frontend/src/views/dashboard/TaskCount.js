import React from 'react';
import Card from '@material-ui/core/Card';
import TaskIcon from '@material-ui/icons/Assignment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CardIcon from './CardIcon';

const styles = {
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: 20,
  },
  card: {
    overflow: 'inherit',
    textAlign: 'right',
    padding: 16,
    minHeight: 52,
  },
};

const TaskCount = ({ value, classes }) => (
  <div className={classes.main}>
    <CardIcon Icon={TaskIcon} bgColor="#31708f" />
    <Card className={classes.card}>
      <Typography className={classes.title} color="textSecondary">
        Open Tasks
      </Typography>
      <Typography variant="headline" component="h2">
        {value}
      </Typography>
    </Card>
  </div>
);

export default withStyles(styles)(TaskCount);
