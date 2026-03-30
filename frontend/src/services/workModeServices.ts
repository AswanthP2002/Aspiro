import { AxiosError, HttpStatusCode } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { WorkModeEndpoints } from "../constants/endPoints/workMode.endpoints"

export const adminAddWorkMode = async (name: string, isActive: boolean) => {
    try {
        const response = await axiosInstance.post(WorkModeEndpoints.ADD, {name, isActive},
            {   
                headers:{
                    "Content-Type": 'application/json'
                },
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminGetWorkModes = async (search: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(WorkModeEndpoints.LOAD,
            {   params: {search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminChangeWorkmodeStatus = async (id: string, status: 'active' | 'inactive') => {
    try {
        const response = await axiosInstance.patch(WorkModeEndpoints.CHANGE_STATUS_BY_ID(id), {status},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--Error occured while chaning workmode status--', err)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminDeleteWorkMode = async (id: string) => {
    try {
        const response = await axiosInstance.delete(WorkModeEndpoints.DELETE_BY_ID(id),
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log('Error occured while deleting work mode', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminEditWorkMode = async (id: string, name: string) => {
    try {
        const response = await axiosInstance.patch(WorkModeEndpoints.EDIT_BY_ID(id), {name}, 
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error) {
        const err = error as AxiosError
        console.log('--Error occured while editing workmode--',err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}