import { describe, it, expect } from 'vitest';
import { toTimezone, fromTimezone, formatISOPrintable } from './utils';
import dayjs from 'dayjs';

describe('Timezone conversion functions', () => {
    const ISO_SQL_FORMAT = 'YYYY-MM-DD HH:mm:ssZ';
    describe('toTimezone', () => {
        it('It converts to an ISO 8601 string with only a time', () => {
            const correct = dayjs('2000-12-04 12:00').format(ISO_SQL_FORMAT);
            const result = toTimezone('12:00');
            expect(result).toBe(correct);
        });

        it('converts time to specified timezone', () => {
            const result = toTimezone('12:00', '2014-06-01', 'America/New_York');
            expect(result).toBe('2014-06-01 13:00:00-04:00');
        });

        it('uses the local timezone as a default', () => {
            const correct = dayjs('2000-12-04 12:00').format(ISO_SQL_FORMAT);
            const result = toTimezone('12:00', '2000-12-04');
            expect(result).toBe(correct)
        });
    });

    describe('fromTimezone', () => {
        it('converts back to local time by default', () => {
            const local = dayjs('2000-12-04 12:00').format(ISO_SQL_FORMAT);
            const result = fromTimezone(local);
            expect(result).toBe(local);
        });
        it('converts time from utc to a different location', () => {
            const chicago = toTimezone('2000-12-04 12:00', 'America/Chicago');
            const result = fromTimezone(chicago, 'America/New_York');
            expect(result).toBe('2000-12-04 13:00:00-05:00');
        });
    });
    
    describe('io functions', () => {
      it('gives the same time when I go to and from', () => {
        const to = toTimezone('12:00', '2000-12-04');
        const from = fromTimezone(to)
        expect(to).toBe(from)
      })
      
      it('prints out the date and time in a readable format', () => {
        const result = formatISOPrintable(fromTimezone('2024-07-22 14:00:00-05:00', 'America/Chicago'));
        expect(result).toBe('Mon 07/22/24 - 02:00 PM')
      })
    })
});
