import z from 'zod'

export const createPostSchema = z.object({
    creatorId: z.string().length(24).regex(/^[a-f\d]{24}$/i, {
        message:'Invalid user id format'
    }),
    media: z.instanceof(Buffer),
    description: z.string()
})