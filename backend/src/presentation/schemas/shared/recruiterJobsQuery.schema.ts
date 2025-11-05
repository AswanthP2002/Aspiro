import z from 'zod'

export const recruiterJobsSchema = z.object({
    search: z.string(),
    locationSearch: z.string().optional(),
    page: z.number().min(1),
    limit: z.number().min(1),
    sortOption: z.string(),
    filter: z.object({
        status: z.string(),
        workMode: z.string(),
        jobType: z.string().optional(),
        jobLevel: z.string().optional(),
    })
})