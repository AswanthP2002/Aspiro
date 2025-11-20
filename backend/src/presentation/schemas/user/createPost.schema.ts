import z from 'zod'

export const createPostSchema = z.object({
    media: z.any().optional(),
    description: z.string()
})