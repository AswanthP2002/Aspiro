import { AxiosError, HttpStatusCode } from "axios"
import { EducationEndpoints } from "../constants/endPoints/education.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const addUserEducation = async (educationLevel : string, educationStream : string, institution : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
    try {
        const response = await axiosInstance.post(EducationEndpoints.ADD_EDUCATION,
            {educationLevel, educationStream, institution, isPresent, startYear, endYear, location},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while adding candidate education', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}

export const getUserEducations = async () => {
    try {
        const response = await axiosInstance.get(EducationEndpoints.LOAD_ALL_EDUCATIONS,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate education', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}

export const editUserEducation = async (educationId : string, educationLevel : string, educationStream : string, institution : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
    try {
        const response = await axiosInstance.put(EducationEndpoints.UPDATE_EDUCATION_BY_EDUCATIONID(educationId),
            {educationLevel, educationStream, institution, isPresent, startYear:startYear, endYear, location},
            {
                headers:{'Content-Type':'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while editing candidate education', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}

export const deleteUserEducation = async (educationId? : string) => {
    try {
        const response = await axiosInstance.delete(EducationEndpoints.DELETE_EDUCATION_BY_EDUCATIONID(educationId as string),
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while deleting education data', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}