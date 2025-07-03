import z from 'zod'

export const JobApplicationSchema = z.object({
        coverLetterContent:z.string()
})

export type JobApplicationDTO = z.infer<typeof JobApplicationSchema>