import zod from 'zod'

export const userIdSchema = zod.object({
    id : zod.string().length(24).regex(/^[a-f\d]{24}$/i, {
        message:'Invalid user id format'
    })
})

