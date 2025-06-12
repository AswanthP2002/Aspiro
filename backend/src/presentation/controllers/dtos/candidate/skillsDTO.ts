import z from 'zod'

export const SkillSchema = z.object({
    type : z.string(),
    skill : z.string(),
    level : z.string()
})


export type SkillDTO = z.infer<typeof SkillSchema>