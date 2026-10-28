import { ExperienceEndPoints } from "../constants/endPoints/experience.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const addUserExperience = async (jobRole: string, jobType: string, location: string, workMode: string, organization: string, isPresent: boolean, startDate: string, endDate: string, description: string) => {
        const response = await axiosInstance.post(ExperienceEndPoints.ADD_EXPERIENCE,
            {jobRole, jobType, location, workMode, organization, isPresent, startDate, endDate, description},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const getUserExperiences = async () => {
        const response = await axiosInstance.get(ExperienceEndPoints.GET_ALL_EXPERIENCE,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}


export const editUserExperience = async (experienceId: string, jobRole: string, jobType: string, organization: string, isPresent: boolean, startDate: string, endDate: string, location: string, workMode: string) => {
        const response = await axiosInstance.put(ExperienceEndPoints.UPDATE_EXPERIENCE_BY_EXPERIENCEID(experienceId),
            {jobRole, jobType, organization, isPresent, startDate, endDate, location, workMode},
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
}

export const deleteUserExperience = async (expId? : string) => {
        const response = await axiosInstance.delete(ExperienceEndPoints.DELETE_EXPERIENCE_BY_EXPERIENCEID(expId as string),
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}