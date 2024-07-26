import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ISO_SQL_FORMAT = 'YYYY-MM-DD HH:mm:ssZ';
const INPUT_FORMAT = 'YYYY-MM-DD HH:mm';
// 1997-12-17 07:37:16-08
/**
 * Converts from time to specified timezone before insertion,
 * for ex: 9am local time to 9am new york time
 * @param time HH:MM
 * @param date YYYY-MM-DD
 * @param timezone iso timezone
 * @returns ISO 8601 formatted string
 */
export function toTimezone(time: string, date = '2000-12-04', timezone = 'default') {
    if (timezone !== 'default') {
        try {
            return dayjs.tz(`${date} ${time}`, INPUT_FORMAT, timezone).format(ISO_SQL_FORMAT);
        } catch {
            console.log('Timezone not found, reverting to local time');
        }
    }
    return dayjs(`${date} ${time}`, INPUT_FORMAT).format(ISO_SQL_FORMAT);
}

/**
 * Converts from UTC Timestamp to local timezone, or specified timezone
 * @param timestamptz string
 * @param toTimezone string
 * @returns string
 */
export function fromTimezone(timestamptz: string, toTimezone = 'default') {
    if (toTimezone !== 'default') {
        try {
            return dayjs(timestamptz, ISO_SQL_FORMAT).tz(toTimezone).format(ISO_SQL_FORMAT);
        } catch {
            console.log('Timezone not found, reverting to local time');
        }
    }
    return dayjs(timestamptz, ISO_SQL_FORMAT).format(ISO_SQL_FORMAT);
}

export function formatISOPrintable(isoTimestamp: string) {
    return dayjs(isoTimestamp).format('ddd MM/DD/YY - hh:mm A');
}
