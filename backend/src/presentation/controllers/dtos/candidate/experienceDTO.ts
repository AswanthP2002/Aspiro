import z from 'zod'

export const ExperienceSchema = z.object({
    role : z.string(),
    jobtype : z.string(),
    organization : z.string(),
    ispresent : z.boolean(),
    startdate : z.date(),
    enddate : z.any(),
    location : z.string(),
    locationtype : z.string()
})


export type ExperienceDTO = z.infer<typeof ExperienceSchema>