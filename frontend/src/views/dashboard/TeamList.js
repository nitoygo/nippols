import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';

const styles = theme => ({
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
    titleLink: { textDecoration: 'none', color: 'inherit' },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
    },
    value: {
        minHeight: 48,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    listItemText: {
        overflowY: 'hidden',
        height: '4em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
});

const location = {
    pathname: 'team',
    query: { filter: JSON.stringify({ status: 'pending' }) },
};

const PendingReviews = ({
    reviews = [],
    nb,
    classes,
}) => (
    <div className={classes.main}>
        <CardIcon Icon={PeopleIcon} bgColor="#4caf50" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                My Teams
            </Typography>
            <Typography
                variant="headline"
                component="h2"
                className={classes.value}
            >
                <Link to={location} className={classes.titleLink}>
                    {nb}
                </Link>
            </Typography>
            <Divider />
            <List>
                {reviews.map(record => (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/team/${record.id}`}
                    >
                        <Avatar />

                        <ListItemText
                            secondary={record.name}
                            className={classes.listItemText}
                            style={{ paddingRight: 0 }}
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    </div>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(PendingReviews);
