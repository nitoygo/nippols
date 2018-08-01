import React from 'react';
import { 
    List, 
    Datagrid, 
    Edit, 
    Create, 
    Show,
    SimpleForm, 
    SimpleShowLayout,
    TextField, 
    EmailField,
    ShowButton,
    DisabledInput, 
    TextInput
} from 'react-admin';

import PersonIcon from '@material-ui/icons/Person';
export const UserIcon = PersonIcon;

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <ShowButton basePath="/user" />
        </Datagrid>
    </List>
);

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.username}"` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput label="Username" source="username" />
            <TextInput label="Password" source="password" type="password" />
            <TextInput label="E-Mail" source="email" type="email" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create title="Create a User" {...props}>
        <SimpleForm>
            <TextInput label="Username" source="username" />
            <TextInput label="Password" source="password" type="password" />
            <TextInput label="E-Mail" source="email" type="email" />
        </SimpleForm>
    </Create>
);

export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField label="Username" source="username" />
            <EmailField label="E-Mail" source="email" type="email" />
        </SimpleShowLayout>
    </Show>
);
