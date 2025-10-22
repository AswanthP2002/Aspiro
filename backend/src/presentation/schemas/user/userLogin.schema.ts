import z from 'zod';

export const userLoginSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password cannot be empty' }),
});