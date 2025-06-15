import z from 'zod'

export const EducationSchema = z.object({
    level:z.string(),
    stream:z.string(),
    organization:z.string(),
    isPresent:z.boolean(),
    startYear:z.string(),
    endYear:z.string(),
    location:z.string()
})

export type EducationDTO = z.infer<typeof EducationSchema>