import { getShiftTimes } from "@/lib/data";
import { ShiftDataTable } from "./datatable";
export default async function Page() {
    const data = await getShiftTimes();
    return (
        <div>
            <ShiftDataTable data={data} />
        </div>
    );
}
