import React from 'react';
import { 
    Datagrid, 
    Show, 
    ShowButton, 
    TextField,
    EmailField, 
    RichTextField, 
    ReferenceManyField,
    TabbedShowLayout, 
    Tab, 
 } from 'react-admin';

import ProjectTitle from './ProjectTitle';

export const ProjectShow = (props) => (
    <Show title={<ProjectTitle />} {...props}>
      <TabbedShowLayout>
        <Tab label="Overview">
          <TextField label="Project Code" source="code" />
          <TextField label="Project Name" source="name" />
          <RichTextField label="Description" source="description" />
        </Tab>
        <Tab label="Tasks">
          <ReferenceManyField reference="task" target="projectScope" addLabel={false}>
            <Datagrid>
              <TextField source="name" />
              <ShowButton />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Members">
          <ReferenceManyField reference="user" target="assignedProjects" addLabel={false}>
            <Datagrid>
              <TextField source="username" />
              <EmailField source="email" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Files">
        </Tab>
      </TabbedShowLayout>
    </Show>
  );