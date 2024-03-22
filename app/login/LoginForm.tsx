"use client"

import { type User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { createClient } from "@/utils/supabase/client"
import { EyeOff, Eye } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
    username: z.string().email({ message: "Must be an email or HQS ID" })
        .or(z.string().toUpperCase().startsWith("HQS", { message: "Must be an email or HQS ID" })),
    password: z.string().min(5, { message: "Must be 5 or more characters" })
})

const LoginForm = ({
    user
}: {
    user: User | null
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        } else {
            setIsAuthenticating(false);
        }
    }, [user, router]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    if (isAuthenticating) {
        return null;
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email: values.username,
            password: values.password,
        });

        if (error) {
            return router.push("/login?message=Could not authenticate user");
        }

        return router.push("/")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[20rem]">
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='Email or HQS ID' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem className="mt-6">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder='Password'
                                        {...field}
                                    />
                                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer'>
                                        {showPassword ? (
                                            <EyeOff
                                                className='h-6 w-6'
                                                onClick={togglePasswordVisibility}
                                            />
                                        ) : (
                                            <Eye
                                                className='h-6 w-6'
                                                onClick={togglePasswordVisibility}
                                            />
                                        )}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='w-full mt-6'>
                    Log in
                </Button>
                <p className="text-sm font-medium text-destructive">
                    {searchParams.get('message')}
                </p>
            </form>
        </Form>
    );
}

export default LoginForm;