'use client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { submit } from './actions';
import { formSchema } from './schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

export default function AvailabilityForm() {
    const { toast } = useToast();
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            isFullDayEvent: false,
            reason: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setSubmitDisabled(true);
        try {
            const result = await submit(data);
            if (result.success) {
                toast({
                    title: 'Availability Submitted',
                    description: `Your availability from ${data.startDate} to ${data.endDate} has been recorded.`,
                    duration: 5000,
                });
                form.reset();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Submission Failed',
                    description: result.error || 'An unexpected error occurred. Please try again.',
                    duration: 7000,
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred. Please try again later.',
                duration: 7000,
            });
        }
        setSubmitDisabled(false);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl">
                <div className="flex items-start gap-8">
                    <div>
                        <div className="grid grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormDescription>First unavailable day</FormDescription>
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
                                            <Input
                                                type="time"
                                                {...field}
                                                value={field.value ?? ''}
                                                disabled={form.watch('isFullDayEvent')}
                                            />
                                        </FormControl>
                                        <FormDescription>First unavailable time</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormDescription>End date</FormDescription>
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
                                            <Input
                                                type="time"
                                                {...field}
                                                value={field.value ?? ''}
                                                disabled={form.watch('isFullDayEvent')}
                                            />
                                        </FormControl>
                                        <FormDescription>Ending time</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="isFullDayEvent"
                        render={({ field }) => (
                            <FormItem className="flex max-w-48 flex-row items-start space-x-3 space-y-0 self-center rounded-md border p-4">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Full day availability</FormLabel>
                                    <FormDescription>Check to ask off for full days</FormDescription>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reasoning</FormLabel>
                            <FormControl>
                                <Textarea className="resize-none" {...field} />
                            </FormControl>
                            <FormDescription>The reason you are not available</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {submitDisabled ? (
                    <Button className="mt-8" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </Button>
                ) : (
                    <Button type="submit" className="mt-8">
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    );
}
