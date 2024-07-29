import { Suspense } from 'react';
import { TableSkeleton } from '@/components/skeletons/table';
import { getShifts, selectProfile } from '@/lib/data';
import dayjs from 'dayjs';
import MyCalendar from './Calendar';

export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
}

const CalendarComponent = async () => {
    const profile = await selectProfile();
    if (!profile) {
        return null;
    }
    console.log('waiting...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const shifts = await getShifts(profile.employees.id);
    const events: Event[] = shifts.map((shift) => {
        return { title: shift.location, start: dayjs(shift.start_time).toDate(), end: dayjs(shift.end_time).toDate() };
    });

    return <MyCalendar events={events} />;
};

export default function CalendarWrapper() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <CalendarComponent />
        </Suspense>
    );
}
