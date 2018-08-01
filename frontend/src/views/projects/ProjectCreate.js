
import React from 'react';
import { 
    Create,
    SimpleForm, 
    TextInput,
    LongTextInput
 } from 'react-admin';

export const ProjectCreate = (props) => (
  <Create title="Create a Project" {...props}>
    <SimpleForm>
      <TextInput source="code" />
      <TextInput source="name" />
      <LongTextInput source="description" />
    </SimpleForm>
  </Create>
);