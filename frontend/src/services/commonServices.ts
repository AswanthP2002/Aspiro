import { JobsEndpoints } from "../constants/endPoints/jobs.endpoints"
import { EndPoints } from "../constants/endPoints/user.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { AxiosError } from "axios"

export const reAuthenticate = async () => {
    try {
        const response = await axiosInstance.get(EndPoints.RE_AUTHENTICATE, 
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        console.log('Error occured while refreshing the token', error instanceof Error ? error.message : null)
    }
}

export const loadJobDetails = async (jobId : string) => {
    try {
        const response = await axiosInstance.get(JobsEndpoints.FETCH_JOB_DETAILS_BY_ID(jobId))
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < 500 && err.response.status !== 403) {
            console.log('-- error occured while loading job details --', err)
            throw error
        }
    }
}


export const googleLogin = async (googleToken : string) => {
    try {
        const response = await axiosInstance.post(EndPoints.GOOGLE_LOGIN,
            {googleToken},
            {
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while google login')
        if(err.response && err.response.status < 500 && err.response.status !== 403){
            throw err
        }

        
    }
}
