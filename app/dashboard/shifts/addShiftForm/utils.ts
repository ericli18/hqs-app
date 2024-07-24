import dayjs from "dayjs";
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
