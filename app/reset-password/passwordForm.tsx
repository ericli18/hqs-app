'use client';
import { schema } from './schema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeOff, Eye } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const ResetForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible((visible) => !visible);
    };

    async function onSubmit(data: z.infer<typeof schema>) {
        try {
            console.log('Submitted');
            console.log(data);
        } catch (error) {
            console.error('Error in form submission:', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Password"
                                        {...field}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                                        {passwordVisible ? (
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
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                                        {passwordVisible ? (
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
                <Button type="submit">Change Password</Button>
            </form>
        </Form>
    );
};

export default ResetForm;
