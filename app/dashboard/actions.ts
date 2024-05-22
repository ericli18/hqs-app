'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error('Error signing out: ' + error.message);
    }

    redirect('/');
};
