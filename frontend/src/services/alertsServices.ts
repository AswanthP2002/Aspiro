import { AxiosError, HttpStatusCode } from "axios"
import { AlertsEndpoints } from "../constants/endPoints/alerts.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const fetchUserAlerts = async (status: 'ALL' | 'ACTIVE' | 'RESOLVED' | 'DISMISSED', page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(AlertsEndpoints.ALERTS.FETCH_ALERTS,
            {
                params:{status, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('-- Error occured while fetching user alerts --', err.message)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}

export const getUnreadAlertsCount = async () => {
    try {
        const response = await axiosInstance.get(AlertsEndpoints.ALERTS.GET_UNREAD_ALERTS_COUNT,
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        console.log('-- printing unread count before sening to the user --', response.data)
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('-- Error occured while fetching unread alerts count --', err.message)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}