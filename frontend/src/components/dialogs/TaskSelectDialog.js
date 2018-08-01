
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TaskIcon from '@material-ui/icons/Assignment';
import blue from '@material-ui/core/colors/blue';

const tasks = [
  'Dummy Task 1... lalalalalalalala', 
  'Dummy Task 2',
  'Dummy Task 3',
  'Dummy Task 4',
  'Dummy Task 5'
];

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class TaskSelectDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Select Task to Update</DialogTitle>
        <div>
          <List>
            {tasks.map(task => (
              <ListItem button onClick={() => this.handleListItemClick(task)} key={task}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <TaskIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={task} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

TaskSelectDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(TaskSelectDialog);
