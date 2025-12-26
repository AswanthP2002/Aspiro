import z from 'zod';

export const SaveUserBasicsSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  city: z.string(),
  district: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
});
