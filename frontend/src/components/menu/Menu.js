import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import EventIcon from '@material-ui/icons/Event';

import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';
import { withRouter } from 'react-router-dom';

import { TimesheetIcon } from '../../views/timesheet';

import { PostIcon } from '../../views/posts';
import { ProjectIcon } from '../../views/projects';
import { TeamIcon } from '../../views/teams';
import { TaskIcon } from '../../views/tasks';
import { UserIcon } from '../../views/users';

const items = [
    { name: 'post', icon: <PostIcon /> },
    { name: 'project', icon: <ProjectIcon /> },
    { name: 'team', icon: <TeamIcon /> },
    { name: 'task', icon: <TaskIcon /> },
    { name: 'user', icon: <UserIcon /> },
];

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

const Menu = ({ onMenuClick, translate, logout }) => (
    <div style={styles.main}>
        <DashboardMenuItem onClick={onMenuClick} />
        {items.map(item => (
            <MenuItemLink
                key={item.name}
                to={`/${item.name}`}
                primaryText={translate(`resources.${item.name}.name`, {
                    smart_count: 2,
                })}
                leftIcon={item.icon}
                onClick={onMenuClick}
            />
        ))}
        <MenuItemLink
            to="/timesheet"
            primaryText={translate('pos.timesheet')}
            leftIcon={<TimesheetIcon />}
            onClick={onMenuClick}
        />
        <MenuItemLink
            to="/calendar"
            primaryText={translate('pos.calendar')}
            leftIcon={<EventIcon />}
            onClick={onMenuClick}
        />
        <MenuItemLink
            to="/settings"
            primaryText={translate('pos.settings')}
            leftIcon={<SettingsIcon />}
            onClick={onMenuClick}
        />
        <Responsive xsmall={logout} medium={null} />
    </div>
);

const enhance = compose(
    withRouter,
    connect(
        state => ({
            theme: state.theme,
            locale: state.i18n.locale,
        }),
        {}
    ),
    translate
);

export default enhance(Menu);
