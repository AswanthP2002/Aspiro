import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { ConnectionEndpoints } from "../constants/endPoints/connection.endpoints"

export const sendConnectionRequest = async (receiverId: string, acted_by: string, acted_user_avatar: string) => {
        const response = await axiosInstance.post(ConnectionEndpoints.SEND_CONNECTION_REQUEST(receiverId),
            {acted_by, acted_user_avatar},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const cancelConnectionRequest = async (receiverId: string) => {
        const response = await axiosInstance.patch(ConnectionEndpoints.CANCEL_CONNECTION_REQUEST(receiverId),
            {},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const rejectConnectionRequest = async (sender: string) => {
        const response = await axiosInstance.patch(ConnectionEndpoints.REJECT_CONNECTION_REQUEST,
            {sender},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const acceptConnectionRequest = async (sender: string, acted_by: string, acted_user_avatar: string) => {
        const response = await axiosInstance.patch(ConnectionEndpoints.ACCEPT_CONNECTION_REQUEST,
            {sender, acted_by, acted_user_avatar},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const getConnections = async (userId: string, search: string, page: number, limit: number) => {
        const response = await axiosInstance.get(ConnectionEndpoints.FETCH_CONNECTIONS(userId), 
            {
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const removeConnection = async (removeConnectionId: string) => {
        const response = await axiosInstance.delete(ConnectionEndpoints.REMOVE_CONNECTION(removeConnectionId), 
        {
            sendAuthToken: true
        } as AxiosRequest
    )

    return response.data
}