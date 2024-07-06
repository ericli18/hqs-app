import { z } from 'zod';

export const formSchema = z.object({
    firstName: z.string().trim().min(2, {
        message: "First name is required."
    }),
    lastName: z.string().trim().min(2, {
        message: "Last name is required"
    }),
    email: z.string().trim().email({
        message: "Invalid email address"
    }),
    hqsId: z
        .string()
        .toUpperCase()
        .startsWith('HQS', { message: 'HQS ID must start with HQS' })
        .length(7, { message: 'HQS ID should follow the form HQS####' }),
});
