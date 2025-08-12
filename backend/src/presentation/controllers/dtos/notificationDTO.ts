import z from 'zod'

export const NotificationSchema = z.object({
        title: z.string(),
        message : z.string()
})

export type CreateNotificationDTO = z.infer<typeof NotificationSchema>