import z from 'zod';

export const resendOtpSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, {
    message: 'Invalid User ID format',
  }),
  email: z.string().email({ message: 'Invalid email format' }),
});
