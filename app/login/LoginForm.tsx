'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { EyeOff, Eye } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
    username: z
        .string()
        .email({ message: 'Must be an email or HQS ID' })
        .or(z.string().toUpperCase().startsWith('HQS', { message: 'Must be an email or HQS ID' })),
    password: z.string().min(5, { message: 'Must be 5 or more characters' }),
});

const LoginForm = () => {
    const { toast } = useToast();

    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const supabase = createClient();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.username,
            password: values.password,
        });

        if (data) {
            toast({
                title: 'Succesfully logged in',
            });
        }

        if (error) {
            toast({
                title: 'There was a problem logging in',
            });
            return router.push('/login?message=Could not authenticate user');
            console.log(error);
        }

        return router.push('/dashboard');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[20rem]">
                <p className="mb-4 text-sm font-medium text-destructive">{searchParams.get('message')}</p>
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Joe@hqsautomotive.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            {...field}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                                            {showPassword ? (
                                                <EyeOff className="h-6 w-6" onClick={togglePasswordVisibility} />
                                            ) : (
                                                <Eye className="h-6 w-6" onClick={togglePasswordVisibility} />
                                            )}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="mt-6 w-full">
                    Log in
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
