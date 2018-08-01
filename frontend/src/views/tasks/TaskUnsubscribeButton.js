
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-admin';

import compose from 'recompose/compose';

import Button from '@material-ui/core/Button';
import ActionUnsubscribe from '@material-ui/icons/Star';

import { taskUnsubscribe as taskUnsubscribeAction } from './actions/taskSubscribeActions';

class TaskUnsubscribeButton extends React.Component {
  handleClick = () => {
    const { taskUnsubscribe, record } = this.props;
    taskUnsubscribe(record.id, record);
  }

  render() {
    return (
      <Button color="primary" onClick={this.handleClick}>
        <ActionUnsubscribe
          color="primary"
          style={{ paddingRight: '0.5em', color: 'green' }}
        />
        Unwatch
      </Button>
    );
  }
}

TaskUnsubscribeButton.propTypes = {
  taskUnsubscribe: PropTypes.func,
  translate: PropTypes.func,
  record: PropTypes.object,
};

const enhance = compose(
  translate,
  connect(
      null,
      {
        taskUnsubscribe: taskUnsubscribeAction,
      }
  )
);

export default enhance(TaskUnsubscribeButton);
