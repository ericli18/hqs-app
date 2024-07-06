import { createClient } from '@/utils/supabase/server';
import { schema } from './schema';
import { z } from 'zod';
import ResetForm from './passwordForm';

const onSubmit = async (data: z.infer<typeof schema>) => {};

const Page = async ({
    searchParams,
}: {
    searchParams: {
        token_hash: string;
        type: 'email'
    };
}) => {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash: searchParams.token_hash, type: searchParams.type });
    return <ResetForm />;
};

export default Page;
