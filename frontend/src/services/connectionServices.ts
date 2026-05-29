import { AxiosError, HttpStatusCode } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { ConnectionEndpoints } from "../constants/endPoints/connection.endpoints"

export const sendConnectionRequest = async (receiverId: string, acted_by: string, acted_user_avatar: string) => {
    try {
        const response = await axiosInstance.post(ConnectionEndpoints.SEND_CONNECTION_REQUEST(receiverId),
            {acted_by, acted_user_avatar},
            {
                headers:{'Content-Type': 'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('error occured while sednign connection request', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const cancelConnectionRequest = async (receiverId: string) => {
    try {
        const response = await axiosInstance.patch(ConnectionEndpoints.CANCEL_CONNECTION_REQUEST(receiverId),
            null,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log(err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const rejectConnectionRequest = async (sender: string) => {
    try {
        const response = await axiosInstance.patch(ConnectionEndpoints.REJECT_CONNECTION_REQUEST,
            {sender},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const acceptConnectionRequest = async (sender: string, acted_by: string, acted_user_avatar: string) => {
    try {
        const response = await axiosInstance.patch(ConnectionEndpoints.ACCEPT_CONNECTION_REQUEST,
            {sender, acted_by, acted_user_avatar},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const getConnections = async (userId: string, search: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(ConnectionEndpoints.FETCH_CONNECTIONS(userId), 
            {
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const removeConnection = async (removeConnectionId: string) => {
    try {
        const response = await axiosInstance.delete(ConnectionEndpoints.REMOVE_CONNECTION(removeConnectionId), 
        {
            sendAuthToken: true
        } as AxiosRequest
    )

    return response.data
    } catch (error: unknown) {
        console.log('Error occured while removing connection', error)
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}