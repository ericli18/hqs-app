'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const formSchema = z.object({
    employees: z
        .array(
            z.object({
                label: z.string(),
                value: z.string(),
            })
        )
        .refine(
            (employees) => {
                const values = employees.map((e) => e.value);
                return new Set(values).size === values.length;
            },
            {
                message: 'Duplicate employees are not allowed',
            }
        ),
    startDate: z.string().date('Invalid start date format'),

    startTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid start time format. Use HH:mm (24-hour format).',
    }),

    endDate: z.string().date('Invalid end date format'),

    endTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid end time format. Use HH:mm (24-hour format).',
    }),
    location: z.number(),
});

const AddShiftForm = ({
    employees,
    locations,
}: {
    employees: { label: string; value: string }[];
    locations: { label: string; value: number }[];
}) => {
    const [openPopover, setOpenPopover] = useState<string | null>(null);
    if (!employees) return <div>Loading...</div>;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employees: [{ label: '', value: '' }],
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            location: 0,
        },
    });

    const { fields, append } = useFieldArray({
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
        await submit(values);
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
                            <FormDescription>This is the location that will be used for this shift</FormDescription>
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
                        Add Employee
                    </Button>

                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default AddShiftForm;
