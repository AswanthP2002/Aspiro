import z from 'zod';

export const verifyUserInputsSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, {
    message: 'Invalid User ID format',
  }),
  otp: z.string().length(6, 'OTP must be 6 characters long').regex(/^\d+$/, {
    message: 'OTP must contain only digits',
  }),
});
