'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { employeeAvailabilities } from '@/drizzle/schema';
import { formatISOPrintable, combineDateTime } from '@/lib/utils';
import dayjs from 'dayjs';

type availabilities = InferSelectModel<typeof employeeAvailabilities>;
export type Availability = availabilities;
const columnHelper = createColumnHelper<Availability>();

const displayDate = (date: string, time: string | null) => {
    if (time == null) {
        return dayjs(date).format('ddd MM/DD/YY');
    }
    return formatISOPrintable(combineDateTime(date, time));
};
export const defaultColumns = [
    columnHelper.accessor((cell) => displayDate(cell.startDate, cell.startTime), {
        header: 'Start',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((cell) => displayDate(cell.endDate, cell.endTime), {
        header: 'End',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
        header: 'Reason',
        cell: (info) => info.getValue(),
    }),
    columnHelper.display({
        id: 'actions',
    }),
];
