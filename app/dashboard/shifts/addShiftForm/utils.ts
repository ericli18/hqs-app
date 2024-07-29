import dayjs from 'dayjs';
import { employeeAvailabilities } from '@/drizzle/schema';
import { type InferSelectModel } from 'drizzle-orm';
import {  toTimezone } from '@/lib/utils';
import isBetween from 'dayjs/plugin/isBetween';
import assert from 'assert';
import { combineDateTime } from '@/lib/utils';
dayjs.extend(isBetween);

export type availabilities = InferSelectModel<typeof employeeAvailabilities>;
export const formatShiftTimeRange = (start: Date | string | undefined, end: Date | string | undefined) => {
    if (!start || !end) {
        return '';
    }
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (startDate.month() === endDate.month() && startDate.date() === endDate.date()) {
        return `${startDate.format('MMMM D')} from ${startDate.format('h:mm A')} to ${endDate.format('h:mm A')}`;
    } else if (startDate.month() === endDate.month()) {
        return `${startDate.format('MMMM D')} to ${endDate.format('D')} from ${startDate.format('h:mm A')} to ${endDate.format('h:mm A')}`;
    } else {
        return `${startDate.format('MMMM D')} to ${endDate.format('MMMM D')} from ${startDate.format('h:mm A')} to ${endDate.format('h:mm A')}`;
    }
};

export const isBusy = (
    availabilities: availabilities[],
    shiftStartTime: string,
    shiftStartDate: string,
    shiftEndDate: string,
    shiftEndTime: string,
    timezone: string
) => {
    if(shiftStartTime === "")
    {
        shiftStartTime = "00:00";
    }
    if(shiftEndTime === "")
    {
        shiftEndTime = "23:59"
    }
    const shiftStart = toTimezone(shiftStartTime, shiftStartDate, timezone);
    const shiftEnd = toTimezone(shiftEndTime, shiftEndDate, timezone);
    const intersection = availabilities.find((availability) => {
        if (availability.isFullDayEvent) {
            const inStart = dayjs(shiftStart).isBetween(
                dayjs(availability.startDate),
                dayjs(availability.endDate),
                'day',
                '[]'
            );
            const inEnd = dayjs(shiftEnd).isBetween(
                dayjs(availability.startDate),
                dayjs(availability.endDate),
                'day',
                '[]'
            );
            return inStart || inEnd;
        } else {
            assert(availability.startTime);
            assert(availability.endTime);
            const start = combineDateTime(availability.startDate, availability.startTime, timezone);
            const end = combineDateTime(availability.endDate, availability.endTime, timezone);
            const inStart = dayjs(shiftStart).isBetween(start, end, "m", "[]");
            const inEnd = dayjs(shiftEnd).isBetween(start, end, "m", "[]");

            return inStart || inEnd;
        }
    });
    return intersection;
};
