import React from 'react';
import Card from '@material-ui/core/Card';
import ChartIcon from '@material-ui/icons/ShowChart';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';

const styles = {
    main: {
        flex: '1',
        marginLeft: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const TaskProgress = ({ value, translate, classes }) => (
  <div className={classes.main}>
    <CardIcon Icon={ChartIcon} bgColor="#ff9800" />
    <Card className={classes.card}>
      <Typography className={classes.title} color="textSecondary">
        Overall Progress
      </Typography>
      <Typography variant="headline" component="h2">
        0%
      </Typography>
    </Card>
  </div>
);

export default translate(withStyles(styles)(TaskProgress));
