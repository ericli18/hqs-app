import { selectProfile } from '@/lib/data';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    const self = await selectProfile();
    return <div>{self?.employees.first_name}</div>;
}
