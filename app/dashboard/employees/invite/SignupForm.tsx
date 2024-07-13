'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useState } from 'react';

import { createEmployee } from './action';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './schema';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';

export const SignupForm = ({
    defaultLocation,
    locations,
}: {
    defaultLocation: number;
    locations: { label: string; value: number }[];
}) => {
    const [locationOpen, setLocationOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            hqsId: '',
            location: defaultLocation,
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const res = await createEmployee(data);
        console.log(res);
        if (res.message == 'success') {
            toast({
                title: 'Success',
                description: `Invited ${data.firstName} ${data.lastName}. \n Please have them check their emails for the invite link`,
            });
            form.reset();
        } else {
            toast({
                variant: 'destructive',
                title: 'Failed to invite employee',
                description: `${res.issues?.reduce((prev, issue) => prev + ': ' + issue, '')}`,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off" placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off" placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="hqsId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>HQS ID</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>Should be in the format HQS####</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Location</FormLabel>
                            <Popover open={locationOpen} onOpenChange={(isOpen) => setLocationOpen(isOpen)}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                'w-[200px] justify-between',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value
                                                ? locations.find((location) => location.value === field.value)?.label
                                                : 'Select location'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search location..." />
                                        <CommandEmpty>No location found.</CommandEmpty>
                                        <CommandList>
                                            <CommandGroup>
                                                {locations &&
                                                    locations.map((location) => (
                                                        <CommandItem
                                                            value={location.label}
                                                            key={location.value}
                                                            onSelect={() => {
                                                                form.setValue('location', location.value);
                                                                setLocationOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    location.value === field.value
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0'
                                                                )}
                                                            />
                                                            {location.label}
                                                        </CommandItem>
                                                    ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Default location for this employee, but can be changed per shift
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Invite</Button>
            </form>
        </Form>
    );
};
