import LoginForm from './LoginForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const Page = async () => {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();
    console.log(data)
    if (data?.user) {
        redirect('/dashboard');
    }
    return (
        <div className="grid min-h-screen place-items-center">
            <LoginForm />
        </div>
    );
};

export default Page;
