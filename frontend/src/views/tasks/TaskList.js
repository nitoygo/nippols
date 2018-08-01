import React from 'react';
import { 
  List,
  SimpleList,
  Filter,
  TextInput, 
  ReferenceField,
  TextField,
  Datagrid,
  EditButton,
  ShowButton
} from 'react-admin';
import TaskSubscribeButton from './TaskSubscribeButton';

const TaskFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Assignee" source="assignee" />
    <TextInput label="Status" source="status" />
  </Filter>
);

export const TaskList = (props) => (
  <List {...props} filters={<TaskFilter />}>
    <Datagrid>
    <TextField source="id" />
    <TextField source="name" />
    <ReferenceField label="Assignee" source="assignee" reference="user" allowEmpty={true}>
      <TextField source="username" />
    </ReferenceField>
    <TextField source="status" />
    <EditButton />
    <ShowButton />
    </Datagrid>
  </List>
);
