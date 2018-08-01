import React from 'react';
import { 
    Create, 
    SimpleForm, 
    NumberInput,
    TextInput, 
    LongTextInput, 
    ReferenceInput, 
    AutocompleteInput,
} from 'react-admin';

class TaskCreateComponent extends React.Component {

  render() {
    return (
      <Create title="Create a Task" {...this.props}>
        <SimpleForm>
          <TextInput source="name" />
          <LongTextInput source="description" />
          <LongTextInput source="externalLink" />
          <ReferenceInput label="Project Scope" source="projectScope" reference="project">
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
          <ReferenceInput label="Parent Task" source="parentTask" reference="task">
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
          <ReferenceInput label="Assignee" source="assignee" reference="user">
            <AutocompleteInput optionText="username" />
          </ReferenceInput>
          <NumberInput source="estimatedHours"/>
        </SimpleForm>
      </Create>    
    );
  }
}

export const TaskCreate = TaskCreateComponent;
