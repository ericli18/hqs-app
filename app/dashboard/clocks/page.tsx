import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getClockTimes } from '@/lib/data';
import { ShiftDataTable } from './tables/datatable';
import { SelfTimeTable } from './tables/selfTimetable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default async function Page() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    const clocks = await getClockTimes();
    return (
        <Tabs defaultValue="selfClocks" className="w-full">
            <TabsList>
                <TabsTrigger value="selfClocks">Your clocks</TabsTrigger>
                <TabsTrigger value="selfTimes">Your times</TabsTrigger>
            </TabsList>
            <TabsContent value="selfClocks">
                <ShiftDataTable data={clocks} />
            </TabsContent>
            <TabsContent value="selfTimes">
                <SelfTimeTable data={clocks} id={data.user.id} />
            </TabsContent>
        </Tabs>
    );

}
