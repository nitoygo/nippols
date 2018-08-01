
import React from 'react';

import AlarmService from '../../_utilities/alarmService';

const tasks = ['Dummy Task 1', 'Dummy Task 2'];

class TaskNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ignore: true,
      title: '',
      dialogOpen: false,
      selectedValue: tasks[1]
    };

    //Get this value from user configuration next time

    //30 minutes
    //this.taskTimer = new AlarmService(this.showNotification.bind(this), 1800000);

    //1 minute
    //this.taskTimer = new AlarmService(this.showNotification.bind(this), 60000);

    //10 seconds
    this.taskTimer = new AlarmService(this.showNotification.bind(this), 15000);
  }

  startTaskPolling() {
    this.taskTimer.start();
  }

  showNotification() {
    const title = 'NIPPO Time Tracker Service';
    const body = 'Click here to change task';

    // Available options:
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      body: body,
      dir: 'ltr',
      icon: '/favicon.ico',
      tag: 'dummyTag',
      requireInteraction: true,
      actions: [
        {
          action: 'action 1',
          title: 'action 1',
        },
        {
          title: 'action 2',
          action: 'action 2',
        }
      ],
    };

    window.Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(
              title,
              options
            );
          });
        }
      }
    });
  }

  render() {

    return (
      <div>
      </div>
    )
  }
};

export default TaskNotification;
