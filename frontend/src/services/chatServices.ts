import { AxiosError, HttpStatusCode } from "axios";
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance";
import { ChatEndpoints } from "../constants/endPoints/chat.endpoints";

export const getConversations = async (search: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(ChatEndpoints.LOAD_ALL_CONVERSATIONS,
            {params: {search, page, limit},
                sendAuthToken: true} as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const getChats = async (conversationId: string) => {
    try {
        const response = await axiosInstance.get(ChatEndpoints.LOAD_CHATS_BY_CONVERSATION_ID(conversationId),
            
            {   
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const deleteChat = async (chatId: string) => {
    try {
        const response = await axiosInstance.delete(ChatEndpoints.DELETE_CHAT_BY_ID(chatId),
            
            {   
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const deleteChatForMe = async (chatId: string) => {
    try {
        const response = await axiosInstance.patch(ChatEndpoints.DELETE_CHAT_FOR_ME(chatId), null,
            {   
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}