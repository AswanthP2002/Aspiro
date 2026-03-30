export const ExperienceApiRoutes = {
  EXPERIENCE: {
    ADD: '/v2/experience/add',
    GET: '/v2/experiences/load',
    EDIT: '/v2/experience/:experienceId',
    DELETE: '/v2/experience/:experienceId/delete',
  },
} as const;
