import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  handleClose = () => {
    this.props.onDialogExit();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search name of task you want to add in this week's timesheet
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FormDialog;
