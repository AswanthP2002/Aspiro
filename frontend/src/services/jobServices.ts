import { AxiosError, HttpStatusCode } from "axios"
import { JobsEndpoints } from "../constants/endPoints/jobs.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const getRecommendedJobs = async () => {
    try {
        const response = await axiosInstance.get(JobsEndpoints.LOAD_RECOMMENDED_JOBS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error) {
        const err = error as AxiosError
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const fetchJobsForHomePage = async (search: string) => {
    try {
        const response = await axiosInstance.get(JobsEndpoints.FETCH_JOB_HOME_PAGE, 
            {
                params: {search},
                sendAuthToken: false
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        if(err.response && err.response.status < 500 && err.response.status !== 403) throw err
    }
}