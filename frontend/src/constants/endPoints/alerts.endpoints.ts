export const AlertsEndpoints = {
  ALERTS: {
    FETCH_ALERTS: '/v2/alerts/me',
    GET_UNREAD_ALERTS_COUNT: '/v2/alerts/unread/count'
  },
} as const;
