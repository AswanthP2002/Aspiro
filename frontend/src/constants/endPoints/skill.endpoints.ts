export const SkillEndpoint = {
    USER:{
        ADD: '/v2/skill/user/add',
        LOAD: '/v2/skills/user/load',
        DELETE_SKILL_BY_SKILLID: (skillId: string) => `/v2/skills/${skillId}/user`
    },
    ADMIN:{
        ADD: '/v2/skill/admin/add',
        EDIT_BY_ID: (skillId: string) => `/v2/skills/${skillId}`,
        DELETE_BY_ID: (skillId: string) => `/v2/skills/${skillId}`,
        LOAD: '/v2/skills',
    }
} as const