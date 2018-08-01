import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';

const style = theme => ({
    root: {
        flex: 1,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    cost: {
        marginRight: '1em',
        position: 'absolute',
        top: '1em',
        right: 0,
        color: theme.palette.text.primary,
    },
});

const TaskList = ({ tasks = [], classes }) => (
    <Card className={classes.root}>
        <CardHeader title="Task List" />
        <List dense={true}>
            {tasks.map(record => (
                <ListItem
                    key={record.id}
                    button
                    component={Link}
                    to={`/task/${record.id}`}
                >
                    <ListItemText
                        primary={record.name}
                        secondary={record.description}
                    />
                </ListItem>
            ))}
        </List>
    </Card>
);

const enhance = compose(withStyles(style), translate);

export default enhance(TaskList);
