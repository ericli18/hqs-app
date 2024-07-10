'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { formSchema } from './schema';

export async function createEmployee(data: z.infer<typeof formSchema>) {
    const parsed = formSchema.safeParse(data);
    if (parsed.success) {
        const cookieStore = cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
                    },
                },
            }
        );
        const { data, error } = await supabase.auth.admin.inviteUserByEmail(parsed.data.email, {
            redirectTo: 'localhost:3000/reset-password',
            data: {
                first_name: parsed.data.firstName,
                last_name: parsed.data.lastName,
                hqs_id: parsed.data.hqsId,
            },
        });
        console.log(data);
        if (error) {
            return {
                message: 'server',
                issues: ['Something went wrong on the server', error.message],
            };
        }
        return { message: 'success', user: parsed.data };
    } else {
        return {
            message: 'Invalid data',
            issues: parsed.error.issues.map((issue) => issue.message),
        };
    }
}
