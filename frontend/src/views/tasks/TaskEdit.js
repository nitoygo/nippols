import React from 'react';
import { 
  Edit,
  FormTab,
  TabbedForm,
  DisabledInput,
  NumberInput,
  TextInput, 
  LongTextInput, 
  ReferenceInput, 
  AutocompleteInput,
  SelectInput
} from 'react-admin';

import TaskTitle from './TaskTitle';
import TaskEditActions from './TaskEditActions';

import { TASK_STATUS } from '../../_utilities/constants';

class TaskEditComponent extends React.Component {

  render() {
    const validStatus = [
      { id: TASK_STATUS.OPEN, name: 'open' },
      { id: TASK_STATUS.ONGOING, name: 'ongoing' },
      { id: TASK_STATUS.CLOSED, name: 'closed' },
    ];

    return (
      <Edit title={<TaskTitle />} actions={<TaskEditActions />} {...this.props}>
        <TabbedForm>
          <FormTab label="Overview">
            <DisabledInput label="Task Number" source="id" />
            <TextInput source="name" />
            <LongTextInput source="description" />
            <SelectInput  source="status" choices={validStatus} />
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
            <NumberInput source="estimatedHours" />
          </FormTab>
          <FormTab label="Notes">
          </FormTab>
          <FormTab label="Files">
          </FormTab>
        </TabbedForm>
      </Edit>
    );
  }
}

export const TaskEdit = TaskEditComponent;