import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/LibraryAdd';

import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  paper: {
    padding: 12,
    textAlign: 'right',
    align: 'center',
    color: theme.palette.text.secondary,
    margin: 0,
    fontSize: 'small'
  },
  button: {
    margin: '10px 10px',
    position: 'relative',
  },
  iconPaddingStyle: {
    paddingRight: '0.5em',
  },
});

class WeekToolbar extends React.Component {

  render() {
    const { classes, onClickSave, onClickAddTask, saving } = this.props;

    return (
      <Paper className={classes.paper} elevation={0} square>
        <Button 
          className={classes.button}
          variant="raised"
          color={saving ? 'default' : 'primary'}
          onClick={onClickSave}
        >
          {saving ? (
            <CircularProgress
              size={25}
              thickness={2}
              className={classes.iconPaddingStyle}
            />
          ) : (
            <SaveIcon className={classes.iconPaddingStyle} />
          )}
          Save All
        </Button>
        <Button 
          className={classes.button}
          variant="outlined"
          color={saving ? 'default' : 'primary'}
          onClick={onClickAddTask}
        >
          <AddIcon className={classes.iconPaddingStyle} />
          Add Row
        </Button>
      </Paper>
    )
  }

}

WeekToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeekToolbar);
