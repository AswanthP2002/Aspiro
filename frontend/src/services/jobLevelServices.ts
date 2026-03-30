import { AxiosError, HttpStatusCode } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { JobLevelEndpoints } from "../constants/endPoints/jobLevel.endpoints"

export const adminAddJobLevel = async (name: string, isActive: boolean) => {
    try {
        const response = await axiosInstance.post(JobLevelEndpoints.ADD, 
            {name, isActive},
            {
                headers: {'Content-Type': 'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log('--Error occured while adding a job level--', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const adminGetJobLevels = async (search: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(JobLevelEndpoints.LOAD,
            {
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminEditJobLevel = async (id: string, name: string) => {
    try {
        const response = await axiosInstance.patch(JobLevelEndpoints.EDIT_BY_ID(id),
            {name},
            {
                headers:{'Content-Type': 'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminChangeJobLevelStatus = async (id: string, isActive: boolean) => {
    try {
        const response = await axiosInstance.patch(JobLevelEndpoints.CHANGE_STATU_BY_ID(id),
            {isActive},
            {
                headers:{'Content-Type': 'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminDeleteJobLevel = async (id: string) => {
    try {
        const response = await axiosInstance.delete(JobLevelEndpoints.DELETE_BY_ID(id),
            {
                headers:{'Content-Type': 'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
         const err = error as AxiosError
        console.log('-- Error occured', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}