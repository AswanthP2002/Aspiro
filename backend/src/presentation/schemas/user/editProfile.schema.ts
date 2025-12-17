import z from 'zod'

export const EditProfileSchema = z.object({
    name: z.string().regex(/^[a-zA-Z ]+$/, {message:'Invalid data'}),
    headline: z.string(),
    summary: z.string(),
    city: z.string(),
    district: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string()
})