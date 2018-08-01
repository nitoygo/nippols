import React from 'react';

import Welcome from './Welcome';
import TaskCount from './TaskCount';
import TaskProgress from './TaskProgress';
import TaskList from './TaskList';
import TeamList from './TeamList';
import Announcements from './Announcements';

import CustomRequests from '../../_utilities/customRequests';

const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '1em' },
  rightCol: { flex: 1, marginLeft: '1em' },
  singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class DashboardComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    CustomRequests.getTasksForThisWeek(tasks => this.onTasksReceived(tasks));
  }

  onTasksReceived = (tasks) => {
    this.updateTasksState(tasks);
  }

  updateTasksState = (tasks) => {
    this.setState({tasks}, () => this.onUpdateTasksStateCompleted());
  }

  onUpdateTasksStateCompleted = () => {

  }

  render () {
    const {
      announcements,
      tasks,
      teams,
      taskCount,
      taskProgress
    } = this.state;

    return (
      <div style={styles.flex}>
        <div style={styles.leftCol}>
            <div style={styles.flex}>
              <TaskCount value={tasks.length} />
              <TaskProgress value={taskProgress} />
            </div>
            <div style={styles.singleCol}>
              <Welcome />
            </div>
            <div style={styles.singleCol}>
                <TaskList
                  tasks={tasks}
                />
            </div>
        </div>
        <div style={styles.rightCol}>
            <div style={styles.flex}>
                <TeamList
                  teams={teams}
                />
                <Announcements
                  announcements={announcements}
                />
            </div>
        </div>
      </div>
    );
  }
}

export default DashboardComponent;
