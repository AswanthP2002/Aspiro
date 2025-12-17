import z from 'zod';

export const CreateRecruiterSchema = z.object({
  userId: z.string().optional(),
  employerType: z.string(),
  organizationName: z.string().optional(),
  organizationType: z.string().optional(),
  industry: z.string().optional(),
  organizationContactNumber: z.string().optional(),
  organizationEmail: z.string().optional(),
  teamStrength: z.string().optional(),
  summary: z.string().optional(),
  website: z.string().optional(),
  focusingIndustries:z.array(z.string().optional()).optional(),
  linkedinUrl: z.string().optional(),
  recruitingExperience: z.string().optional()
});

export type CreateRecruiterRequestDto = z.infer<typeof CreateRecruiterSchema>


