export const EducationApiRoutes = {
  EDUCATION: {
    ADD: '/v2/education/add',
    GET: '/v2/educations/load',
    EDIT: '/v2/education/:educationId',
    DELETE: '/v2/education/:educationId/delete',
  },
} as const;
