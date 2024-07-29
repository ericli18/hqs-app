import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { isBusy, type availabilities } from './utils';

dayjs.extend(isBetween);

describe('isBusy', () => {
    beforeAll(() => {
        dayjs.tz.setDefault('America/Chicago');
    });

    afterAll(() => {
        dayjs.tz.setDefault();
    });

    const timezone = 'America/Chicago';

    const createAvailability = (
        startDate: string,
        endDate: string,
        isFullDayEvent: boolean,
        startTime?: string,
        endTime?: string
    ): availabilities => ({
        employeeAvailabilityId: 1,
        description: 'Test Availability',
        startDate,
        endDate,
        isFullDayEvent,
        startTime: startTime ? `2000-12-04 ${startTime}:00+00` : null,
        endTime: endTime ? `2000-12-04 ${endTime}:00+00` : null,
        rrule: '',
        employeeId: '1',
    });

    test('should return availability for full day availability when shift is within range', () => {
        const availabilities = [createAvailability('2023-07-01', '2023-07-03', true)];
        const result = isBusy(availabilities, '09:00', '2023-07-02', '2023-07-02', '17:00', timezone);
        expect(result).toBeTruthy();
    });

    test('should return availability for full day availability when shift just intersects range', () => {
        const availabilities = [createAvailability('2023-07-01', '2023-07-01', true)];
        const result = isBusy(availabilities, '09:00', '2023-07-01', '2023-07-01', '17:00', timezone);
        expect(result).toBeTruthy();
    });

    test('should return undefined for full day availability when shift is outside range', () => {
        const availabilities = [createAvailability('2023-07-01', '2023-07-03', true)];
        const result = isBusy(availabilities, '09:00', '2023-07-04', '2023-07-04', '17:00', timezone);
        expect(result).toBeUndefined();
    });

    test('should return availability for partial day shift when shift is within range', () => {
        //these are utc times, so relative to Fremont are ~ 7 hours behind
        const availabilities = [createAvailability('2023-07-01', '2023-07-03', false, '09:00', '17:00')];
        const result = isBusy(availabilities, '10:00', '2023-07-02', '2023-07-02', '16:00', timezone);
        expect(result).toBeTruthy();
    });

    test('should return undefined for partial day event when shift is outside range', () => {
        const availabilities = [createAvailability('2023-07-02', '2023-07-03', false, '09:00', '17:00')];
        const result = isBusy(availabilities, '08:00', '2023-07-01', '2023-07-01', '18:00', timezone);
        expect(result).toBeUndefined();
    });

    test('should handle shift spanning multiple days', () => {
        const availabilities = [createAvailability('2023-07-01', '2023-07-03', true)];
        const result = isBusy(availabilities, '22:00', '2023-07-01', '2023-07-02', '06:00', timezone);
        expect(result).toBeTruthy();
    });

    test('should return first matching availability when multiple availabilities exist', () => {
        const availabilities = [
            createAvailability('2023-07-01', '2023-07-02', true),
            createAvailability('2023-07-03', '2023-07-04', true),
        ];
        const result = isBusy(availabilities, '09:00', '2023-07-03', '2023-07-03', '17:00', timezone);
        expect(result).toEqual(availabilities[1]);
    });

    test('should handle edge case: shift starts exactly at availability end', () => {
        const availabilities = [createAvailability('2023-07-01', '2023-07-03', false, '10:00', '17:00')];
        const result = isBusy(availabilities, '10:00', '2023-07-03', '2023-07-03', '16:00', timezone);
        expect(result).toBeTruthy();
    });

    //doesn't really work yet
    test('should handle edge case: shift ends exactly at availability start', () => {
        const availabilities = [createAvailability('2023-07-01', '2023-07-03', false, '10:00', '17:00')];
        const result = isBusy(availabilities, '10:00', '2023-07-01', '2023-07-01', '17:00', timezone);
        expect(result).toBeTruthy();
    });
});
