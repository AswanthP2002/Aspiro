import z from 'zod';

export const CreateJobSchema = z.object({
  jobTitle: z.string(),
  description: z.string(),
  requirements: z.string(),
  responsibilities: z.string(),
  duration: z.string().optional(),
  jobType: z.string(),
  workMode: z.string(),
  location: z.string(),
  minSalary: z.number(),
  maxSalary: z.number(),
  salaryCurrency: z.string(),
  salaryPeriod: z.enum(['annually', 'monthly', 'weekly', 'hourly']),
  vacancies: z.number(),
  qualification: z.string(),
  experienceInYears: z.number(),
  jobLevel: z.string(),
  requiredSkills: z.array(z.string()),
  optionalSkills: z.array(z.string()),
  expiresAt: z.string(),
});
