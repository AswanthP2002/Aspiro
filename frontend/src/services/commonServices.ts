import { JobsEndpoints } from "../constants/endPoints/jobs.endpoints"
import { EndPoints } from "../constants/endPoints/user.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const reAuthenticate = async () => {
        const response = await axiosInstance.get(EndPoints.RE_AUTHENTICATE, 
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const loadJobDetails = async (jobId : string) => {
        const response = await axiosInstance.get(JobsEndpoints.FETCH_JOB_DETAILS_BY_ID(jobId))
        return response.data
}


export const googleLogin = async (googleToken : string) => {
        const response = await axiosInstance.post(EndPoints.GOOGLE_LOGIN,
            {googleToken},
            {
            } as AxiosRequest
        )

        return response.data
}
