
import React from 'react';
import { 
  List,
  Datagrid, 
  TextField,
  ShowButton,
} from 'react-admin';

export const ProjectList = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source="code" />
        <TextField source="name" />
        <ShowButton basePath="/project"/>
      </Datagrid>
    </List>
  );