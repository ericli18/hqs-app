'use client';

import { useState } from 'react';
import { type User } from '@supabase/supabase-js';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { createClient } from '@/utils/supabase/client';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z
    .object({
        hqsId: z
            .string()
            .toUpperCase()
            .startsWith('HQS', { message: 'HQS ID must start with HQS' })
            .length(7, { message: 'HQS ID should follow the form HQS####' }),
        email: z.string().email(),
        password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
        confirmPassword: z.string().min(5),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const SignupForm = ({ user }: { user: User | null }) => {
    if (user) {
        console.log(user.role);
    }
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hqsId: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        });

        if (error) {
            // console.log(error)
            toast({
                title: `Error adding employee ${values.email}`,
                description: `Error: ${error}`,
            });
        } else {
            toast({
                title: 'Employee succesfully added',
                description: `User ${values.email} is now registered`,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[20rem]">
                <FormField
                    control={form.control}
                    name="hqsId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>HQS ID</FormLabel>
                            <FormControl>
                                <Input placeholder="HQS ID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mt-6">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Email" autoComplete="true" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mt-6">
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

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="mt-6">
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mt-6 w-full">
                    Create employee
                </Button>
            </form>
        </Form>
    );
};

export default SignupForm;
