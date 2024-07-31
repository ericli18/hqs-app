export default function CalendarEvent({ title }: { title: string }) {
    const isShift = (title !== 'unavailable') // this is hardcoded in to the calendar wrapper
    return <div className={`${isShift? "bg-slate-500" : "bg-red-400"} h-full py-2 grid place-items-center`}>{title}</div>;
}
