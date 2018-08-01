
import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import { EditButton, ListButton, DeleteButton, RefreshButton } from 'react-admin';

import TaskSubscribeButton from './TaskSubscribeButton';
import TaskUnsubscribeButton from './TaskUnsubscribeButton';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

class TaskShowActions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      canSubscribe: false
    }
  }

  componentWillReceiveProps() {
    let isSubscribed = this.isCurrentUserSubscribed();

    this.setState({
      canSubscribe: !isSubscribed
    });
  }

  isCurrentUserSubscribed() {

    let { data } = this.props;
    let subscribers = [];

    for(let attr in data) {
      if (attr === "subscribers") {
        subscribers = data[attr];
        break;
      }
    }

    if (subscribers.length > 0) {
      let username = localStorage.getItem('username');
      for (let i = 0; i < subscribers.length; i++) {
        if (subscribers[i].username === username) {
          return true;
        }
      }
    }
  
    return false;
  }

  render() {
    const { basePath, data, resource, refresh } = this.props;
    const { canSubscribe } = this.state;

    if (canSubscribe) {
      return (
        <CardActions style={cardActionStyle}>
          <TaskSubscribeButton record={data} />
          <EditButton record={data} basePath={basePath} />
          <ListButton basePath={basePath} />
          <DeleteButton basePath={basePath} record={data} resource={resource} />
          <RefreshButton refresh={refresh} />
        </CardActions>
      );
    } else {
      return (
        <CardActions style={cardActionStyle}>
          <TaskUnsubscribeButton record={data} />
          <EditButton record={data} basePath={basePath} />
          <ListButton basePath={basePath} />
          <DeleteButton basePath={basePath} record={data} resource={resource} />
          <RefreshButton refresh={refresh} />
        </CardActions>
      );
    }
  }
}

export default TaskShowActions;
