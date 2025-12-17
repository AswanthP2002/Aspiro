import z from 'zod'

export const LoadRecruiterApplicationSchem = z.object({
    search: z.string(),
    profileStatus: z.string(z.enum(['All', 'Pending', 'Approved', 'Rejected']))
})