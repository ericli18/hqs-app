'use server';
import { createClient } from '@/utils/supabase/server';
import { schema } from './schema';
import { z } from 'zod';

export const submit = async (values: z.infer<typeof schema>) => {
    const res = schema.safeParse(values);
    if (res.success) {
        const supabase = createClient();
        const { data, error } = await supabase.auth.updateUser({ password: res.data.password });
        if (error) {
            return {
                success: false,
                message: 'Failed to update user',
                data: error,
            };
        } else {
            return {
                success: true,
                message: 'Successfully confirmed email',
                data: data,
            };
        }
    } else {
        return {
            success: false,
            message: 'Invalid Data',
            data: res.error.issues.map((issue) => issue.message),
        };
    }
};
