'use client';

import { createColumnHelper } from '@tanstack/react-table';
import dayjs, {Dayjs} from 'dayjs';


export type ClockSeries = 
{
    location: string;
    clock_in: Dayjs;
    clock_out: Dayjs;
    lunch_in: Dayjs | null;
    lunch_out: Dayjs | null;
    employee: {
        id: string;
        first_name: string;
        last_name: string;
    };
    supervisor: {
        id: string,
        first_name: string,
        last_name: string
    }
}
const columnHelper = createColumnHelper<ClockSeries>();
// PLANNED SHIFTS
// See if they're scheduled for work the next day
// DATE - LOCATION - TYPE - START - END - TOTAL TIME - MEAL TIME - For supervisors only see what shifts they've worked on
// SCHEDULED - WORKED
export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor((clock) => `${clock.supervisor.first_name} ${clock.supervisor.last_name}`, {
        header: 'Supervisor',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('location', {
        header: 'Location',
        cell: (info) => info.getValue(),
    })
];
