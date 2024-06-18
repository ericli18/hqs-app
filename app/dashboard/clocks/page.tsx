import { redirect } from 'next/navigation';
import { selectProfile, getClockTimes } from '@/lib/data';
import { SelfClockTable } from './tables/selfClocktable';
import { AllClockTable } from './tables/allClocktable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function Page() {
    const user = await selectProfile();
    if (!user) {
        redirect('/login');
    }

    const role = user.roles?.name;

    const clocks = await getClockTimes();
    return role ? (
        <Tabs defaultValue="selfClocks" className="w-full">
            <TabsList>
                <TabsTrigger value="selfClocks">Your clocks</TabsTrigger>
                <TabsTrigger value="selfTimes">Managed Times</TabsTrigger>
            </TabsList>
            <TabsContent value="selfClocks">
                <SelfClockTable data={clocks} id={user.employees.id} />
            </TabsContent>
            <TabsContent value="selfTimes">
                <AllClockTable data={clocks} id={user.employees.id} role={user.roles?.name} />
            </TabsContent>
        </Tabs>
    ) : (
        <SelfClockTable data={clocks} id={user.employees.id} />
    );
}
