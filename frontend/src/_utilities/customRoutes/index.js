import React from 'react';
import { Route } from 'react-router-dom';
import Calendar from '../../views/calendar/Calendar';
import Timesheet from '../../views/timesheet/Timesheet';
import Settings from '../../views/settings/Settings';

export default [
    <Route exact path="/calendar" component={Calendar} />,
    <Route exact path="/timesheet" component={Timesheet} />,
    <Route exact path="/settings" component={Settings} />,
];
