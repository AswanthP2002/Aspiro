export const JobLevelApiRoutes = {
  ADD: '/v2/joblevel',
  LOAD: '/v2/joblevels',
  EDIT_BY_ID: '/v2/joblevel/:id/update',
  CHANGE_STATU_BY_ID: '/v2/joblevel/:id/status',
  DELETE_BY_ID: '/v2/joblevel/:id',
} as const;
