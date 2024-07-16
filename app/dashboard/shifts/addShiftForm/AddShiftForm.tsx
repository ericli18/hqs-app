'use client';
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Check, ChevronsUpDown, UserRoundMinus, UserRoundPlus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';

import { submit } from './actions';
import { formSchema } from './schema';
import dayjs from 'dayjs';

const formatShiftTimeRange = (start: Date | string | undefined, end: Date | string | undefined) => {
    if (!start || !end) {
        return '';
    }
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (startDate.month() === endDate.month() && startDate.date() === endDate.date()) {
        return `${startDate.format('MMMM D')} from ${startDate.format('h:mm A')} to ${endDate.format('h:mm A')}`;
    } else if (startDate.month() === endDate.month()) {
        return `${startDate.format('MMMM D')} to ${endDate.format('D')} from ${startDate.format('h:mm A')} to ${endDate.format('h:mm A')}`;
    } else {
        return `${startDate.format('MMMM D')} to ${endDate.format('MMMM D')} from ${startDate.format('h:mm A')} to ${endDate.format('h:mm A')}`;
    }
};

const AddShiftForm = ({
    employees,
    locations,
}: {
    employees: { label: string; value: string }[];
    locations: { label: string; value: number }[];
}) => {
    const [openPopover, setOpenPopover] = useState<string | null>(null);
    const { toast } = useToast();
    if (!employees) return <div>Loading...</div>;
    
    const tomorrow = dayjs().add(1, 'day');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employees: [],
            startDate: tomorrow.format('YYYY-MM-DD'),
            startTime: '',
            endDate: tomorrow.format('YYYY-MM-DD'),
            endTime: '',
            location: 0,
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: 'employees',
        control: form.control,
    });

    const [availableEmployees, setAvailableEmployees] = useState(employees);
    useEffect(() => {
        const selectedEmployees = form.getValues('employees');
        const selectedValues = selectedEmployees.map((e) => e.value).filter(Boolean);
        setAvailableEmployees(employees.filter((e) => !selectedValues.includes(e.value)));
    }, [form.getValues('employees'), employees]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await submit(values);
        if (res.success) {
            toast({
                title: res.message,
                description: formatShiftTimeRange(res.data?.start_time, res.data?.end_time),
            });
            form.reset();
        } else {
            toast({
                variant: "destructive",
                title: res.message,
            });
            console.log(res.error || res.issues);
        }
    }

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Location</FormLabel>
                            <Popover
                                open={openPopover === 'location'}
                                onOpenChange={(isOpen) => setOpenPopover(isOpen ? 'location' : null)}
                            >
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
                                                                setOpenPopover(null);
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
                            <FormDescription>Shift times will be relative to this location</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormDescription>The date the shift starts.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormDescription>The time the shift starts.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormDescription>The date the shift ends.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormDescription>The time the shift ends.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {fields.map((field, index) => (
                    <FormField
                        control={form.control}
                        name={`employees.${index}`}
                        key={field.id}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Employee {index + 1}</FormLabel>
                                <div className="flex">
                                    <Popover
                                        open={openPopover === `employees.${index}`}
                                        onOpenChange={(isOpen) => setOpenPopover(isOpen ? `employees.${index}` : null)}
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        'w-[200px] justify-between',
                                                        !field.value.label && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value.label || 'Select employee'}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search employee..." />
                                                <CommandEmpty>No employee found.</CommandEmpty>
                                                <CommandList>
                                                    <CommandGroup>
                                                        {availableEmployees.map((employee) => (
                                                            <CommandItem
                                                                value={employee.value}
                                                                key={employee.value}
                                                                onSelect={() => {
                                                                    form.setValue(`employees.${index}`, employee);
                                                                    setOpenPopover(null);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        employee.value === field.value.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                                {employee.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            remove(index);
                                        }}
                                        aria-label={`Remove employee ${field.value.label || index + 1}`}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <UserRoundMinus />
                                    </Button>
                                </div>

                                <FormDescription>Select an employee for this shift.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <div className="flex flex-col items-start gap-8">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            append({
                                value: '',
                                label: '',
                            });
                        }}
                    >
                        {' '}
                        <UserRoundPlus />
                        Add Employee
                    </Button>

                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
                            disabled={fields.length === employees.length}
    );
};

export default AddShiftForm;
