import { AxiosError, HttpStatusCode } from "axios"
import { ExperienceEndPoints } from "../constants/endPoints/experience.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const addUserExperience = async (jobRole: string, jobType: string, location: string, workMode: string, organization: string, isPresent: boolean, startDate: string, endDate: string, description: string) => {
    try {
        const response = await axiosInstance.post(ExperienceEndPoints.ADD_EXPERIENCE,
            {jobRole, jobType, location, workMode, organization, isPresent, startDate, endDate, description},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while adding candidat experience', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const getUserExperiences = async () => {
    try {
        const response = await axiosInstance.get(ExperienceEndPoints.GET_ALL_EXPERIENCE,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while geting candidate experiences', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}


export const editUserExperience = async (experienceId: string, jobRole: string, jobType: string, organization: string, isPresent: boolean, startDate: string, endDate: string, location: string, workMode: string) => {
    try {
        const response = await axiosInstance.put(ExperienceEndPoints.UPDATE_EXPERIENCE_BY_EXPERIENCEID(experienceId),
            {jobRole, jobType, organization, isPresent, startDate, endDate, location, workMode},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while editing candidate experience', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const deleteUserExperience = async (expId? : string) => {
    try {
        const response = await axiosInstance.delete(ExperienceEndPoints.DELETE_EXPERIENCE_BY_EXPERIENCEID(expId as string),
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while deleting experience', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}