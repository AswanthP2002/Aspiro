import z from 'zod'

export const recruiterJobsSchema = z.object({
    search: z.string(),
    page: z.number().min(1),
    limit: z.number().min(1),
    sortOption: z.string(),
    filter: z.object({
        status: z.string(),
        workMode: z.string()
    })
})