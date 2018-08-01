
import { GET_LIST, CREATE } from 'react-admin';
import { TASK_STATUS } from '../../_utilities/constants';
import restClient from '../../_utilities/dataProvider';

class CustomRequests {

  /**
   * getTasksForThisWeek is used when listing tasks that the user can add manhours on the current active week. 
   * this will only list tasks that the user has subscribed to, and are currently open or ongoing
   */
  static getTasksForThisWeek(resolve) {
    let username = localStorage.getItem('username');

    restClient()
      .then(dataProvider => {
        dataProvider(GET_LIST, 'task', {
            filter: {
              status_like: `${TASK_STATUS.OPEN}|${TASK_STATUS.ONGOING}`,
              subscriber_like: `${username}`,
            }
        })
      .then(response => {
        if(resolve) {
          resolve(response.data);
        }
      });
    });
  }

  /**
   * getTasksForSpecificDates is used when listing tasks that the user have manhour records.
   * this is used for generating summary or for getting manhour records of past weeks
   */
  static getTasksForSpecificDates(startDate, endDate, resolve) {
    let data = []
    resolve(data);
  }

  static getTasksToAddForTimesheet(date, resolve) {
    let timeRange = date.getTime();

    restClient()
      .then(dataProvider => {
        dataProvider(GET_LIST, 'task', {
            filter: {
              openedBefore: timeRange,
              notClosedUntil: timeRange
            }
        })
      .then(response => {
        if(resolve) {
          resolve(response.data);
        }
      });
    });
  }

  static getTaskMinutesForDates(task, startDate, endDate, resolve) {
    let user = parseInt(localStorage.getItem('userid'));
    let startTime = startDate.getTime();
    let endTime = endDate.getTime();

    restClient()
      .then(dataProvider => {
        dataProvider(GET_LIST, 'manhour', {
            filter: {
              relatedTask: task,
              relatedUser: user,
              startDate: startTime,
              endDate: endTime,
            }
        })
      .then(response => {
        if(resolve) {
          resolve(response.data);
        }
      });
    });
  }

  static updateTaskMinutes(minutes, task, date, resolve) {
    CustomRequests._setTaskMinutes(minutes, task, date, 'UPDATE', resolve);
  }

  static addTaskMinutes(minutes, task, date, resolve) {
    CustomRequests._setTaskMinutes(minutes, task, date, 'ADD', resolve);
  }

  static _setTaskMinutes(minutes, task, date, action, resolve) {
    let user = parseInt(localStorage.getItem('userid'));
    let time = date.getTime();

    restClient()
      .then(dataProvider => {
        dataProvider(CREATE, 'manhour', {
          data : {
            numberOfMinutes: minutes,
            intendedDate: time,
            relatedTask: task,
            relatedUser: user,
            action: action
          }
        })
      .then(response => {
        if (resolve) {
          resolve(response.data);
        }
      });
    });
  }
}

export default CustomRequests;
