import z from 'zod';

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Not a valid email' }),
  phone: z.string().optional(),
  password: z.string().optional(),
  googleID: z.string().optional(),
  facebookID: z.string().optional(),
  linkedinId: z.string().optional(),
});
