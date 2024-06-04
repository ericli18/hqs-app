import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getClockTimes } from '@/lib/data';
import { ShiftDataTable } from './datatable';

export default async function Page() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    const clocks = await getClockTimes();
    return (
        <div>
            <ShiftDataTable data={clocks} />
        </div>
    );
}
