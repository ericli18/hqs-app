"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const formSchema = z.object({
    username: z.string().email({ message: "Must be an email or HQS ID" })
        .or(z.string().toUpperCase().startsWith("HQS", { message: "Must be an email or HQS ID" })),
    password: z.string().min(5, { message: "Must be 5 or more characters" })
})

const Page = ({
    searchParams,
}: {
    searchParams: { message: string };
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Input {...form.register("username")} />
            <Input {...form.register("password")} />
            <p>{form.formState.errors.username?.message}</p>
            <Button>
                Log in
            </Button>
        </form>
    )
}

export default Page;