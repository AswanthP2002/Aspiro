import { NotificationEndpoints } from "../constants/endPoints/notifications.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const getUnReadNotificationsCount = async () => {
        const response = await axiosInstance.get(NotificationEndpoints.GET_UNREAD_NOTIFICATIONS_COUNT,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const getNotifications = async (page: number, limit: number, type: string, status: string, offSet: number) => {
        const response = await axiosInstance.get(NotificationEndpoints.LOAD_NOTIFICATIONS,
            {
                params:{page, limit, type, status, offSet},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data

}

export const changeNotificationStatus = async (notificationId: string) => {
        const response = await axiosInstance.patch(NotificationEndpoints.CHANGE_NOTIFICATION_STATUS_BY_NOTIFICATION_ID(notificationId), {},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const markAllNotificationRead = async () => {
        const response = await axiosInstance.put(NotificationEndpoints.MARK_ALL_NOTIFICATION_READ, {},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const deleteNotification = async (action: string, notificationId?: string) => {
        const response = await axiosInstance.delete(NotificationEndpoints.DELETE_NOTIFICATION_BY_NOTIFICATION_ID(notificationId), 
            {   
                params:{action, notificationId},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}