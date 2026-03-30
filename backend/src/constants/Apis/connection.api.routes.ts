export const ConnectionApiRoutes = {
  SEND_CONNECTION_REQUEST: '/v2/user/connect-request/:receiverId',
  FETCH_CONNECTIONS: '/v2/connections/:userId',
  CANCEL_CONNECTION_REQUEST: '/v2/user/connection-request-cancel/:receiverId',
  REJECT_CONNECTION_REQUEST: '/v2/user/connection-request-reject',
  ACCEPT_CONNECTION_REQUEST: '/v2/user/connection-request-accept/',
} as const;
