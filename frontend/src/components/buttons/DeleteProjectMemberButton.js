
import React from 'react';

import Button from '@material-ui/core/Button';
import ActionDelete from '@material-ui/icons/Delete';

class DeleteProjectMemberButton extends React.Component {

  handleClick = () => {
    console.log(this.props);
  }

  render() {
    return (
      <Button 
        onClick={this.handleClick} 
      >
        <ActionDelete />
      </Button>
    );
  }
}

export default DeleteProjectMemberButton;
