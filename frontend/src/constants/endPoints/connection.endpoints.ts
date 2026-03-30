export const ConnectionEndpoints = {
  SEND_CONNECTION_REQUEST: (receiverId: string) => `/v2/user/connect-request/${receiverId}`,
  FETCH_CONNECTIONS: (userId: string) => `/v2/connections/${userId}`,
  CANCEL_CONNECTION_REQUEST: (receiverId: string) => `/v2/user/connection-request-cancel/${receiverId}`,
  REJECT_CONNECTION_REQUEST: '/v2/user/connection-request-reject',
  ACCEPT_CONNECTION_REQUEST: '/v2/user/connection-request-accept/'
} as const;
