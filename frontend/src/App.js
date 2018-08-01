
import React from 'react';
import { Admin, Resource } from 'react-admin';

import './App.css';

import { ProjectList, ProjectEdit, ProjectCreate, ProjectShow, ProjectIcon } from './views/projects/';
import { TeamList, TeamEdit, TeamCreate, TeamShow, TeamIcon } from './views/teams/';
import { UserList, UserCreate, UserShow, UserIcon } from './views/users/';
import { TaskList, TaskEdit, TaskCreate, TaskShow, TaskIcon } from './views/tasks/';
import { PostList, PostEdit, PostCreate, PostShow, PostIcon } from './views/posts/';

import { Dashboard } from './views/dashboard';
import { Menu } from './components/menu';

import TaskNotification from './components/notifications/TaskNotification';

import restClient from './_utilities/dataProvider';
import authProvider from './_utilities/authProvider';
import customRoutes from './_utilities/customRoutes';
import englishMessages from './_utilities/i18n/en';
import themeReducer from './_utilities/theme-reducer';
import Layout from './Layout';

const i18nProvider = locale => {
  // Only english is supported
  return englishMessages;
};

class App extends React.Component {
  state = { dataProvider: null };

  async componentWillMount() {
    const dataProvider = await restClient();

    this.setState({ dataProvider });
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
          <div className="loader-container">
              <div className="loader">Loading...</div>
          </div>
      );
    }

    return (
      <div>
        <Admin title="NIPPOLS"
          authProvider={authProvider} 
          dataProvider={dataProvider}
          dashboard={Dashboard}
          customReducers={{ theme: themeReducer }}
          customRoutes={customRoutes}
          appLayout={Layout}
          menu={Menu}
          locale="en"
          i18nProvider={i18nProvider}
        >
          <Resource name="post" list={PostList} create={PostCreate} edit={PostEdit} show={PostShow} icon={PostIcon} />
          <Resource name="project" list={ProjectList} create={ProjectCreate} edit={ProjectEdit} show={ProjectShow} icon={ProjectIcon} />
          <Resource name="team" list={TeamList} create={TeamCreate} edit={TeamEdit} show={TeamShow} icon={TeamIcon} />
          <Resource name="task" list={TaskList} create={TaskCreate} edit={TaskEdit} show={TaskShow} icon={TaskIcon} />
          <Resource name="user" list={UserList} create={UserCreate} show={UserShow} icon={UserIcon} />
          <Resource name="ticket" />
        </Admin>
        <TaskNotification />
      </div>
    );
  };
}

export default App;
