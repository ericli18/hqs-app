import { redirect } from 'next/navigation';
import { selectProfile } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function Page() {
    const user = await selectProfile();
    if (!user) {
        redirect('/login');
    }

    const role = user.roles?.name;

    return (
        <Tabs defaultValue="shifts" className="w-full">
            <TabsList>
                <TabsTrigger value="shifts">Your upcoming shifts</TabsTrigger>
                <TabsTrigger value="modify">Trade shifts</TabsTrigger>
                {role && <TabsTrigger value="assign">Assign shifts</TabsTrigger>}
            </TabsList>
            <TabsContent value="shifts"></TabsContent>
            <TabsContent value="modify"></TabsContent>
            {role && <TabsContent value="assign"></TabsContent>}
        </Tabs>
    );
}
