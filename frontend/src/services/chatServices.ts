import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import { ChatEndpoints } from "../constants/endPoints/chat.endpoints";

export const getConversations = async (search: string, page: number, limit: number) => {
        const response = await axiosInstance.get(ChatEndpoints.LOAD_ALL_CONVERSATIONS,
            {params: {search, page, limit},
                sendAuthToken: true} as AxiosRequest
        )

        return response.data
}

export const getChats = async (conversationId: string) => {
        const response = await axiosInstance.get(ChatEndpoints.LOAD_CHATS_BY_CONVERSATION_ID(conversationId),
            
            {   
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const deleteChat = async (chatId: string, conversationId: string, chattingPersonId: string) => {
        const response = await axiosInstance.delete(ChatEndpoints.DELETE_CHAT_BY_ID(chatId),
            
            {   
                params:{conversationId, chattingPersonId},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const deleteChatForMe = async (chatId: string) => {
        const response = await axiosInstance.patch(ChatEndpoints.DELETE_CHAT_FOR_ME(chatId), {},
            {   
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const getNewUnreadConversationsCount = async () => {
        const response = await axiosInstance.get(ChatEndpoints.GET_NEW_UNREAD_CONVERSATIONS_COUNT,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const sendChatWithAttachments = async (data: FormData) => {
        const response = await axiosInstance.post(ChatEndpoints.SEND_CHAT_WITH_ATTACHMENT, data,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}