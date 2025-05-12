import z from 'zod'

export const RegisterGoogleAuthCandidateSchema = z.object({
    name: z.string(),
    email: z.string(),
    googleId: z.string()
})

export type RegisterGoogleAuthCandidateDTO = z.infer<typeof RegisterGoogleAuthCandidateSchema>