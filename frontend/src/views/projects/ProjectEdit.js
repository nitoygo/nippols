import React from 'react';
import { 
    Datagrid, 
    Edit, 
    TextField,
    EmailField, 
    ArrayField,
    ReferenceManyField,
    EditButton, 
    DisabledInput, 
    TextInput,
    LongTextInput,
    AutocompleteInput,
    ArrayInput,
    SimpleFormIterator,
    TabbedForm, 
    FormTab,
    GET_LIST
} from 'react-admin';

import restClient from '../../_utilities/dataProvider';
import ProjectTitle from './ProjectTitle';
import DeleteProjectMemberButton from '../../components/buttons/DeleteProjectMemberButton';

class ProjectEditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    }
  }

  componentDidMount() {
    restClient()
      .then((dataProvider) => {
        dataProvider(GET_LIST, 'user', {
            sort: { field: 'id', order: 'ASC' },
            pagination: { page: 1, perPage: 50 },
        })
      .then(response => {
          const userList = response.data;
          this.setState({userList});
        }
      );
    });
  }

  render() {
    const { userList } = this.state;

    return (
      <Edit title={<ProjectTitle />} {...this.props}>
        <TabbedForm>
          <FormTab label="Overview">
            <DisabledInput source="code" />
            <TextInput source="name" />
            <LongTextInput source="description" />
          </FormTab>
          <FormTab label="Tasks">
            <ReferenceManyField reference="task" target="projectScope" addLabel={false}>
              <Datagrid>
                <TextField source="name" />
                <EditButton />
              </Datagrid>
            </ReferenceManyField>
          </FormTab>
          <FormTab label="Members" >
            <ReferenceManyField reference="user" target="assignedProjects" addLabel={false}>
              <Datagrid>
                <TextField source="username" label="Existing Members" />
                <EmailField source="email" label=""/>
              </Datagrid>
            </ReferenceManyField>
            <ArrayInput source="members" label="Add Members">
              <SimpleFormIterator>
                <AutocompleteInput source="user" choices={userList} optionText="username" optionValue="id"/>
              </SimpleFormIterator>
            </ArrayInput>
          </FormTab>
          <FormTab label="Files">
          </FormTab>
        </TabbedForm>
      </Edit>
    );
  }
}

export const ProjectEdit = ProjectEditComponent;
