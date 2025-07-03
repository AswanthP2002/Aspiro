import z from 'zod'

export const ResumeSchema = z.object({
    resumeUrlCoudinary : z.string(),
    resumePublicIdCloudinary : z.string()
})


export type ResumeDTO = z.infer<typeof ResumeSchema>