import z from 'zod'

export const RegisterCandidateSchema = z.object({
    name : z.string(),
    username : z.string(),
    email : z.string(),
    phone : z.string(),
    password : z.string()
})


export type RegisterCandidateDTO = z.infer<typeof RegisterCandidateSchema>