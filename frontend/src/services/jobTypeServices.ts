import { AxiosError, HttpStatusCode } from "axios"
import { JobTypeEndpoints } from "../constants/endPoints/jobType.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const adminAddJobType = async (name: string, isActive: boolean) => {
    try {
        const response = await axiosInstance.post(JobTypeEndpoints.ADD,
            {name, isActive},
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

export const adminUpdateJobType = async (id: string, name: string) => {
    try {
        const response = await axiosInstance.patch(JobTypeEndpoints.EDIT_BY_ID(id),
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

export const adminChangeJobTypeStatus = async (id: string, isActive: boolean) => {
    try {
        const response = await axiosInstance.patch(JobTypeEndpoints.CHANGE_STATUS_BY_ID(id),
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


export const adminGetJobTypes = async (search: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(JobTypeEndpoints.LOAD,
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

export const adminDeleteJobType = async (id: string) => {
    try {
        const response = await axiosInstance.delete(JobTypeEndpoints.DELETE_BY_ID(id),
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