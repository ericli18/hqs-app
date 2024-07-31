'use client';

import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { type Event } from './CalendarWrapper';
import CalendarEvent from './CalendarEvent';
import './index.css'

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ events }: { events: Event[] }) => (
    <div>
        <Calendar
            components={{
                event: ({event}) => <CalendarEvent title={event.title} />
            }}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView='week'
            style={{ height: 700 }}
        />
    </div>
);

export default MyCalendar;
