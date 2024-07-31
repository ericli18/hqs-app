'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { employeeAvailabilities } from '@/drizzle/schema';
import { formatISOPrintable, combineDateTime } from '@/lib/utils';
import dayjs from 'dayjs';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';
import { removeAvailability } from '@/services/availability';

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
        id: 'delete',
        cell: ({ row }) => {
            const timeslot = row.original;

            return (
                <AlertDialog>
                    <AlertDialogTrigger aria-label="delete-availability-timeslot">
                        <Trash className="text-red-600" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-700"
                                onClick={async () => {
                                    await removeAvailability(timeslot.employeeAvailabilityId);
                                }}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        },
    }),
];
