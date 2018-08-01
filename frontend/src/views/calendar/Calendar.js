
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {

  render () {
    return (
      <Card>
        <CardHeader title="Calendar" />
        <CardContent style={{height: '70vh'}}>
          <BigCalendar
            selectable
            {...this.props}
            events={events}
            views={allViews}
            step={60}
            defaultDate={new Date(2017, 11, 19)}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={(slotInfo) => alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`
            )}
          />
        </CardContent>
      </Card>
    );
  }
}

export default Calendar;
