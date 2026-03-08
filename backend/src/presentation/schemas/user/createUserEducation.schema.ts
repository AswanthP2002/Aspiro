import z from 'zod';

export const addUserEducationSchema = z.object({
  educationStream: z.string(),
  educationLevel: z.string(),
  institution: z.string(),
  location: z.string(),
  isPresent: z.boolean(),
  startYear: z.string(),
  endYear: z.string(),
});
