export const JobTypeApiRoutes = {
  ADD: '/v2/jobtype',
  LOAD: '/v2/jobtypes',
  CHANGE_STATUS_BY_ID: '/v2/jobtype/:id/status',
  EDIT_BY_ID: '/v2/jobtype/:id/update',
  DELETE_BY_ID: '/v2/jobtype/:id',
} as const;
