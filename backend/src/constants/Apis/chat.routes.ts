export const ChatApiRoutes = {
  GET_CONVERSATIONS: '/v1/conversations',
  INITIALIZE_CONVERSATION: '/v1/conversation/initialize',
  GET_CHATS_BY_CONVERSATION_ID: '/v1/chats/:conversationId',
} as const;
