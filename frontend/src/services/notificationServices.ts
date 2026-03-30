import { AxiosError, HttpStatusCode } from "axios"
import { NotificationEndpoints } from "../constants/endPoints/notifications.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const getUnReadNotificationsCount = async () => {
    try {
        const response = await axiosInstance.get(NotificationEndpoints.GET_UNREAD_NOTIFICATIONS_COUNT,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting notifications', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) {
            throw error
        }  
    }
}

export const getNotifications = async (page: number, limit: number, type: string, status: string, offSet: number) => {
    try {
        const response = await axiosInstance.get(NotificationEndpoints.LOAD_NOTIFICATIONS,
            {
                params:{page, limit, type, status, offSet},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting notifications', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) {
            throw error
        }  
    }
}

export const changeNotificationStatus = async (notificationId: string) => {
    try {
        const response = await axiosInstance.patch(NotificationEndpoints.CHANGE_NOTIFICATION_STATUS_BY_NOTIFICATION_ID(notificationId), null,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--Error occure dwhile changing notification status', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const markAllNotificationRead = async () => {
    try {
        const response = await axiosInstance.put(NotificationEndpoints.MARK_ALL_NOTIFICATION_READ, null,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--Error occure dwhile changing notification status', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const deleteNotification = async (action: string, notificationId?: string) => {
    try {
        const response = await axiosInstance.delete(NotificationEndpoints.DELETE_NOTIFICATION_BY_NOTIFICATION_ID(notificationId), 
            {   
                params:{action, notificationId},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('error occured while deleeting notifigication', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}