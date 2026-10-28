import { JobsEndpoints } from "../constants/endPoints/jobs.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const getRecommendedJobs = async () => {
        const response = await axiosInstance.get(JobsEndpoints.LOAD_RECOMMENDED_JOBS,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const fetchJobsForHomePage = async (search: string) => {
        const response = await axiosInstance.get(JobsEndpoints.FETCH_JOB_HOME_PAGE, 
            {
                params: {search},
                sendAuthToken: false
            } as AxiosRequest
        )

        return response.data
}