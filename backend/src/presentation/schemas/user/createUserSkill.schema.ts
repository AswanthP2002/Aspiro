import z from 'zod'

export const createUserSkillSchema = z.object({
    skillType: z.string(),
    skillLevel: z.string(),
    skill: z.string()
});