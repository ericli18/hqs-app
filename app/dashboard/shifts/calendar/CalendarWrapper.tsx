import { Suspense } from 'react';
import { CalendarSkeleton } from '@/components/skeletons/calendar';
import { getShifts, selectProfile } from '@/lib/data';
import dayjs from 'dayjs';
import MyCalendar from './Calendar';
import { getAvailabilities } from '@/services/availability';
import { combineDateTime } from '@/lib/utils';

export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
}

const getDate = (date: string, time: string | null) => {
    if (time == null) {
        return dayjs(date).toDate();
    }
    return dayjs(combineDateTime(date, time)).toDate();
};

const CalendarComponent = async () => {
    const profile = await selectProfile();
    if (!profile) {
        return null;
    }
    console.log('waiting...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const shifts = await getShifts(profile.employees.id);
    const availabilities = await getAvailabilities();

    const newAvailabilties = availabilities.map((a) => {
        return {
            title: 'unavailable',
            start: getDate(a.startDate, a.startTime),
            end: getDate(a.endDate, a.endTime),
        };
    });

    const newShifts = shifts.map((shift) => {
        return { title: shift.location, start: dayjs(shift.start_time).toDate(), end: dayjs(shift.end_time).toDate() };
    });

    const events: Event[] = [...newShifts, ...newAvailabilties];
    return <MyCalendar events={events} />;
};

export default function CalendarWrapper() {
    return (
        <Suspense fallback={<CalendarSkeleton />}>
            <CalendarComponent />
        </Suspense>
    );
}
