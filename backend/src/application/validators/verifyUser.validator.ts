import zod from 'zod';

export const VerifyUserValidator = zod.object({
  id: zod.string().regex(/^[a-f\d]{24}$/i, {
    message: 'Invalid candidate id format',
  }),
  email: zod
    .string()
    .regex(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/, {
      message: 'Email is not valid',
    }),
  otp: zod.string(),
});
