import LoginForm from './LoginForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const Page = async () => {
    const supabase = createClient();

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();
    if (error) {
        console.log(error);
        return <div>Something happened, service might be down</div>;
    }
    if (session != null) {
        redirect('/');
    }
    return (
        <div className="grid min-h-screen place-items-center">
            <LoginForm />
        </div>
    );
};

export default Page;
