export const ChatEndpoints = {
    LOAD_ALL_CONVERSATIONS: '/v2/conversations',
    LOAD_CHATS_BY_CONVERSATION_ID: (conversationId: string) => `/v2/chats/${conversationId}`,
    DELETE_CHAT_BY_ID: (chatId: string) => `/v2/chats/${chatId}/delete`,
    DELETE_CHAT_FOR_ME: (chatId: string) => `/v2/chats/${chatId}/delete-for-me`
} as const;