import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(utc);

function getRandomOffset() {
    return Math.floor(Math.random() * 21) - 10; // Generate a random number between -10 and 10
  }

function getClocks(userId: string, numShifts: number, startDate: dayjs.Dayjs) {
    let clocksql = '';
    for (let shift = 0; shift < numShifts; shift++) {
        const dayOffset = Math.floor(Math.random() * 7); // 0 to 6 days in the current week
        const shiftType = Math.floor(Math.random() * 3) + 1; // Random shift type between 1 and 3
        const shiftDate = startDate.add(dayOffset, 'day');

        let startHour: number = 0;
        switch (shiftType) {
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
        const punch_in = shiftDate.hour(startHour).add(getRandomOffset(), 'minute');
        const lunch_in = punch_in.add(3, 'hour').add(getRandomOffset(), 'minute');
        const lunch_out = lunch_in.add(1, 'hour').add(getRandomOffset(), 'minute');
        const punch_out = punch_in.add(8, 'hour').add(getRandomOffset(), 'minute');
      
       /*  console.log('Punch In:', punch_in.format());
        console.log('Lunch In:', lunch_in.format());
        console.log('Lunch Out:', lunch_out.format());
        console.log('Punch Out:', punch_out.format()); */
      
        clocksql += `('${punch_in.format('YYYY-MM-DD HH:mm:ssZ')}', ${1}, ${userId}),\n`;
        clocksql += `('${lunch_in.format('YYYY-MM-DD HH:mm:ssZ')}', ${3}, ${userId}),\n`;
        clocksql += `('${lunch_out.format('YYYY-MM-DD HH:mm:ssZ')}', ${4}, ${userId}),\n`;
        clocksql += `('${punch_out.format('YYYY-MM-DD HH:mm:ssZ')}', ${2}, ${userId}),\n`;
    }
    return clocksql.slice(0, -2); // Removes the last comma and newline
}

// function generateShiftsSql(userId: string, numShifts: number, startDate: dayjs.Dayjs) {
//     let shiftsSql = '';
//     for (let i = 0; i < numShifts; i++) {
//         const dayOffset = Math.floor(Math.random() * 7); // 0 to 6 days in the current week
//         const shiftType = Math.floor(Math.random() * 3) + 1; // Random shift type between 1 and 3
//         const shiftDate = startDate.add(dayOffset, 'day');
//         const { startDate: shiftStart, endDate: shiftEnd } = getShiftTimes(shiftType, shiftDate);
//         shiftsSql += `    ('${shiftStart.format('YYYY-MM-DD HH:mm:ssZ')}', '${shiftEnd.format('YYYY-MM-DD HH:mm:ssZ')}', ${shiftType}, ${userId}),\n`;
//     }
//     return shiftsSql.slice(0, -2); // Removes the last comma and newline
// }

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

--Clock type seeding
INSERT INTO public.clock_types (label)
VALUES
('PUNCH_IN'),
('PUNCH_OUT'),
('LUNCH_IN'),
('LUNCH_OUT');

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
    INSERT INTO public.clocks (start_time, clock_type, employee_id)
    VALUES
    ${getClocks('user_id_eric', 9, startOfThisWeek)};F
 END
$$;
`;
    console.log(sqlStatements);
}

main();
