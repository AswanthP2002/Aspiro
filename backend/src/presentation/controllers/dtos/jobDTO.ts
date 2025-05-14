import z from 'zod'

export const CreateJobSchema = z.object({
    jobTitle : z.string(),
    description : z.string(),
    requirements : z.string(),
    responsibilities : z.string(),
    jobType : z.string(),
    locationType : z.string(),
    location : z.string(),
    minSalary : z.coerce.number(),
    maxSalary : z.coerce.number(),
    vacancies : z.coerce.number(),
    qualification : z.string(),
    experience : z.string(),
    jobLevel : z.string(),
})


export type CreateJobDTO = z.infer<typeof CreateJobSchema>