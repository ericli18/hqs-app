import SignupForm from './SignupForm';
import { createClient } from '@/utils/supabase/server';

const Page = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return <SignupForm user={user} />;
};

export default Page;
