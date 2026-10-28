import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { JobLevelEndpoints } from "../constants/endPoints/jobLevel.endpoints"

export const adminAddJobLevel = async (name: string, isActive: boolean) => {
        const response = await axiosInstance.post(JobLevelEndpoints.ADD, 
            {name, isActive},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const adminGetJobLevels = async (search: string, page: number, limit: number) => {
        const response = await axiosInstance.get(JobLevelEndpoints.LOAD,
            {
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const adminEditJobLevel = async (id: string, name: string) => {
        const response = await axiosInstance.patch(JobLevelEndpoints.EDIT_BY_ID(id),
            {name},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const adminChangeJobLevelStatus = async (id: string, isActive: boolean) => {
        const response = await axiosInstance.patch(JobLevelEndpoints.CHANGE_STATU_BY_ID(id),
            {isActive},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const adminDeleteJobLevel = async (id: string) => {
        const response = await axiosInstance.delete(JobLevelEndpoints.DELETE_BY_ID(id),
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}