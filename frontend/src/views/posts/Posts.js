import React from 'react';
import { 
    List, Edit, Create, Show, SimpleForm, SimpleShowLayout,
    TextField, DateField, ShowButton,
    DisabledInput, TextInput, LongTextInput, ReferenceField
} from 'react-admin';

import MarkdownField from '../../components/fields/MarkdownField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
//import Avatar from '@material-ui/core/Avatar';
//import PersonIcon from '@material-ui/icons/Person';
import BookIcon from '@material-ui/icons/Book';
export const PostIcon = BookIcon;

const cardStyle = {
    width: 300,
    maxHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};
const PostGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '1em' }}>
    {ids.map(id =>
      <Card key={id} style={cardStyle}>
        <CardHeader
          title={<TextField record={data[id]} source="title" />}
          subheader={<DateField record={data[id]} source="createdAt" />}
        />

        <CardActions style={{ textAlign: 'right' }}>
          <ShowButton resource="posts" basePath={basePath} record={data[id]} />
        </CardActions>
      </Card>
    )}
    </div>
);
PostGrid.defaultProps = {
    data: {},
    ids: [],
};

export const PostList = (props) => (
    <List {...props}>
      <PostGrid />
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="title" />
      <LongTextInput source="content" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create title="Create a Post" {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <LongTextInput source="content" />
    </SimpleForm>
  </Create>
);

export const PostShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
        <ReferenceField source="author" reference="user">
          <TextField source="username" />
        </ReferenceField>
      <MarkdownField source="content" />
    </SimpleShowLayout>
  </Show>
);
