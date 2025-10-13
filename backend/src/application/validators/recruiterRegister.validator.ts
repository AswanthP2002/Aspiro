import zod from 'zod';

export const RecruiterRegisterValidator = zod.object({
  fullName: zod.string().regex(/^[\p{L}'\-\s]{2,}(?:\s[\p{L}'\-]+)*$/u, {
    message: 'Name is not valid',
  }),
  email: zod
    .string()
    .regex(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/, {
      message: 'Email is not valid',
    }),
  phone: zod.string().regex(/^(?:(?:\+|0{0,2})91[\s\-]?)?([6-9]\d{9})$/, {
    message: 'Phone number is not valid',
  }),
  password: zod
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: 'Password is not valid',
    }),
});
