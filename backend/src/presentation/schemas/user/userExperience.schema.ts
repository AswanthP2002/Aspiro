import z from 'zod'

export const userExperienceSchema = z.object({
    jobRole: z.string(),
    jobType: z.string(),
    organization: z.string(),
    isPresent: z.boolean(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string(),
    workMode: z.string()
})