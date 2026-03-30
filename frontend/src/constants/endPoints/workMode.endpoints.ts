export const WorkModeEndpoints = {
  ADD: '/v2/workmode',
  LOAD: '/v2/workmodes',
  CHANGE_STATUS_BY_ID: (id: string) => `/v2/workmodes/${id}/status`,
  EDIT_BY_ID: (id: string) => `/v2/workmodes/${id}/edit`,
  DELETE_BY_ID: (id: string) => `/v2/workmodes/${id}`,
} as const;
