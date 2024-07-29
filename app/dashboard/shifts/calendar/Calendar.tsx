'use client';

import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { type Event } from './CalendarWrapper';

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ events }: { events: Event[] }) => (
    <div>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />
    </div>
);

export default MyCalendar;
