import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(utc);

function getShiftTimes(type: number, baseDate: dayjs.Dayjs) {
    // Set shift hours based on the type
    let startHour: number = 0;
    switch (type) {
        case 1: // Morning shift (8 AM to 4 PM)
            startHour = 8;
            break;
        case 2: // Afternoon shift (4 PM to 12 AM)
            startHour = 16;
            break;
        case 3: // Night shift (12 AM to 8 AM)
            startHour = 0;
            break;
    }
    const startDate = baseDate.hour(startHour);
    const endDate = startDate.add(8, 'hour'); // Assuming an 8-hour shift
    return { startDate, endDate };
}

function generateShiftsSql(userId: string, numShifts: number, startDate: dayjs.Dayjs) {
    let shiftsSql = '';
    for (let i = 0; i < numShifts; i++) {
        const dayOffset = Math.floor(Math.random() * 7); // 0 to 6 days in the current week
        const shiftType = Math.floor(Math.random() * 3) + 1; // Random shift type between 1 and 3
        const shiftDate = startDate.add(dayOffset, 'day');
        const { startDate: shiftStart, endDate: shiftEnd } = getShiftTimes(shiftType, shiftDate);
        shiftsSql += `    ('${shiftStart.format('YYYY-MM-DD HH:mm:ssZ')}', '${shiftEnd.format('YYYY-MM-DD HH:mm:ssZ')}', ${shiftType}, ${userId}),\n`;
    }
    return shiftsSql.slice(0, -2); // Removes the last comma and newline
}

function main() {
    const today = dayjs();
    const startOfThisWeek = today.startOf('week').add(1, 'day'); // Adjusting start to Monday

    const sqlStatements = `
--Location seeding
INSERT INTO public.locations (name)
VALUES
('Fremont'),
('Austin'),
('Germany');

--Shift type seeding
INSERT INTO public.shift_types (label)
VALUES
('Morning'),
('Afternoon'),
('Night');

--Employees seeding and shifts seeding 

DO $$
DECLARE
    user_id_john uuid;
    user_id_jane uuid;
    user_id_eric uuid;
BEGIN
    -- Creating users
    user_id_john := public.create_user('john@example.com', '123ABC', 'John', 'Doe', 'HQS0002', 2::smallint);
    user_id_jane := public.create_user('jane@example.com', '123ABC', 'Jane', 'Doe', 'HQS0003', 1::smallint);
    user_id_eric := public.create_user('eric@hqs.com', '123ABC', 'Eric', 'Li', 'HQS0001', 1::smallint);

    -- Assign random shifts
    INSERT INTO public.shifts (start_time, end_time, shift_type, employee_id)
    VALUES
${generateShiftsSql('user_id_eric', 6, startOfThisWeek)},
${generateShiftsSql('user_id_john', 6, startOfThisWeek)},
${generateShiftsSql('user_id_jane', 5, startOfThisWeek)};
END
$$;
`;
    console.log(sqlStatements);
}

main();
