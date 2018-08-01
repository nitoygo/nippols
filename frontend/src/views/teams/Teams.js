import React from 'react';
import {
    List, 
    Datagrid, 
    Edit, 
    Create, 
    Show, 
    ShowButton, 
    TextField,
    EmailField, 
    ChipField,
    ReferenceManyField,
    ReferenceArrayInput, 
    ReferenceField,
    SelectArrayInput,
    SingleFieldList,
    DisabledInput, 
    TextInput, 
    SimpleForm, 
    TabbedShowLayout, 
    Tab
} from 'react-admin';

import PeopleIcon from '@material-ui/icons/People';
import TeamDashboard from './TeamDashboard';
export const TeamIcon = PeopleIcon;

export const TeamList = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <ReferenceManyField
            label="Members"
            reference="user"
            target="assignedTeams"
            sortable={false}
        >
            <SingleFieldList>
                <ChipField source="username" />
            </SingleFieldList>
        </ReferenceManyField>
        <ShowButton />
      </Datagrid>
    </List>
);

const TeamTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ''}</span>;
};

export const TeamEdit = (props) => (
  <Edit title={<TeamTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <ReferenceArrayInput source="members" reference="user" label="add members">
        <SelectArrayInput optionText="username">
            <ChipField source="username" />
        </SelectArrayInput>
      </ReferenceArrayInput>
      <ReferenceArrayInput source="projects" reference="project" label="add projects">
        <SelectArrayInput optionText="name">
            <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const TeamCreate = (props) => (
  <Create title="Create a Team" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceArrayInput source="members" reference="user" label="add members">
        <SelectArrayInput optionText="username">
            <ChipField source="username" />
        </SelectArrayInput>
      </ReferenceArrayInput>
      <ReferenceArrayInput source="projects" reference="project" label="add projects">
        <SelectArrayInput optionText="name">
            <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export const TeamShow = (props) => (
  <Show title={<TeamTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Dashboard">
        <TeamDashboard {...props}/>
      </Tab>
      <Tab label="Tasks">
        <ReferenceManyField reference="task" target="teamTask" addLabel={false}>
          <Datagrid>
            <TextField source="name" />
            <ReferenceField label="Assignee" source="assignee" reference="user" allowEmpty={true}>
              <TextField source="username" />
            </ReferenceField>
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="Members">
        <ReferenceManyField reference="user" target="assignedTeams" addLabel={false}>
          <Datagrid>
            <TextField source="username" />
            <EmailField source="email" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="Discussions">

      </Tab>
      <Tab label="Files">

      </Tab>
    </TabbedShowLayout>
  </Show>
);
