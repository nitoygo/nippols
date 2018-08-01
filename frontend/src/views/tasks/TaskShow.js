import React from 'react';
import {
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  UrlField,
  ReferenceField
} from 'react-admin';

import TaskTitle from './TaskTitle';
import TaskShowActions from './TaskShowActions';

class TaskShowComponent extends React.Component {

  render() {
    return (
      <Show title={<TaskTitle />} actions={<TaskShowActions />} {...this.props}>
        <TabbedShowLayout>
          <Tab label="Overview">
            <TextField label="Task Number" source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="status" />
            <UrlField source="externalLink" />
            <ReferenceField label="Project Scope" source="projectScope" reference="project" allowEmpty={true}>
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Parent Task" source="parentTask" reference="task" allowEmpty={true}>
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Assignee" source="assignee" reference="user" allowEmpty={true}>
              <TextField source="username" />
            </ReferenceField>
            <TextField source="estimatedHours" />
          </Tab>
          <Tab label="Notes">
          </Tab>
          <Tab label="Files">
          </Tab>
        </TabbedShowLayout>
      </Show>
    );
  }
}

export const TaskShow = TaskShowComponent;
