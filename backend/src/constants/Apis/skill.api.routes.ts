export const SkillApiRoutes = {
  SKILLS: {
    USER: {
      ADD: '/v2/skill/user/add',
      GET: '/v2/skills/user/load',
      DELETE: '/v2/skills/:skillId/user',
    },
    ADMIN: {
      ADD: '/v2/skill/admin/add',
      EDIT_BY_ID: '/v2/skills/:skillId',
      DELETE_BY_ID: '/v2/skills/:skillId',
      LOAD: '/v2/skills',
    },
  },
} as const;
