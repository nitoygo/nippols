
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-admin';

import compose from 'recompose/compose';

import Button from '@material-ui/core/Button';
import ActionSubscribe from '@material-ui/icons/StarBorder';

import { taskSubscribe as taskSubscribeAction } from './actions/taskSubscribeActions';

class TaskSubscribeButton extends React.Component {
  handleClick = () => {
    const { taskSubscribe, record } = this.props;
    taskSubscribe(record.id, record);
  }

  render() {
    return (
      <Button color="primary" onClick={this.handleClick}>
        <ActionSubscribe
          color="primary"
          style={{ paddingRight: '0.5em', color: 'green' }}
        />
        Watch
      </Button>
    );
  }
}

TaskSubscribeButton.propTypes = {
  taskSubscribe: PropTypes.func,
  translate: PropTypes.func,
  record: PropTypes.object,
};

const enhance = compose(
  translate,
  connect(
      null,
      {
        taskSubscribe: taskSubscribeAction,
      }
  )
);

export default enhance(TaskSubscribeButton);
