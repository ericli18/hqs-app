import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getShiftTimes } from '@/lib/data';
import { ShiftDataTable } from './datatable';

export default async function Page() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    const shifts = await getShiftTimes();
    return (
        <div>
            <ShiftDataTable data={shifts} />
        </div>
    );
}
