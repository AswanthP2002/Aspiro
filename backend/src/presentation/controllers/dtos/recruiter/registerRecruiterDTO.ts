import z from 'zod'

export const RegisterRecruiterSchema = z.object({
    username : z.string(),
    email : z.string(),
    password : z.string()
})


export type RegisterRecruiterDTO = z.infer<typeof RegisterRecruiterSchema>