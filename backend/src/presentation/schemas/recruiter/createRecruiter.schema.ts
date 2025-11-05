import z from 'zod';

export const CreateRecruiterValidator = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid user id' }),
  employerType: z.string(),
  organizationName: z.string().optional(),
  organizationType: z.string().optional(),
  industry: z.string().optional(),
  organizationContactNumber: z.string().optional(),
  organizationEmail: z.string().optional(),
  teamStrength: z.string().optional(),
  aboutCompany: z.string().optional(),
  vision: z.string().optional(),
  website: z.string().optional()
});
