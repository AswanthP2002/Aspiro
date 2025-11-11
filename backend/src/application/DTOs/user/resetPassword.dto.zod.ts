import z from 'zod'

export const ResetPasswordSchema = z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message:'Invalid email'
    }),
    password: z.string()
    
})

export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>