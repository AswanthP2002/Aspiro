import z from 'zod';

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  password: z.string().optional(),
  googleID: z.string().optional(),
  facebookID: z.string().optional(),
});
