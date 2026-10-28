import { JobTypeEndpoints } from "../constants/endPoints/jobType.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const adminAddJobType = async (name: string, isActive: boolean) => {
        const response = await axiosInstance.post(JobTypeEndpoints.ADD,
            {name, isActive},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const adminUpdateJobType = async (id: string, name: string) => {
        const response = await axiosInstance.patch(JobTypeEndpoints.EDIT_BY_ID(id),
            {name},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const adminChangeJobTypeStatus = async (id: string, isActive: boolean) => {
        const response = await axiosInstance.patch(JobTypeEndpoints.CHANGE_STATUS_BY_ID(id),
            {isActive},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}


export const adminGetJobTypes = async (search: string, page: number, limit: number) => {
        const response = await axiosInstance.get(JobTypeEndpoints.LOAD,
            {   
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const adminDeleteJobType = async (id: string) => {
        const response = await axiosInstance.delete(JobTypeEndpoints.DELETE_BY_ID(id),
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}