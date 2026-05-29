export const ChatApiRoutes = {
  GET_CONVERSATIONS: '/v2/conversations',
  INITIALIZE_CONVERSATION: '/v1/conversation/initialize',
  GET_CHATS_BY_CONVERSATION_ID: '/v2/chats/:conversationId',
  DELETE_CHAT_BY_ID: '/v2/chats/:chatId/delete',
  DELETE_CHAT_FOR_ME: '/v2/chats/:chatId/delete-for-me',
  GET_NEW_UNREAD_CONVERSATIONS_COUNT: '/v2/conversations/unread/count',
} as const;
