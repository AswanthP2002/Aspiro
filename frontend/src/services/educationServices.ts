import { EducationEndpoints } from "../constants/endPoints/education.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const addUserEducation = async (educationLevel : string, educationStream : string, institution : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
        const response = await axiosInstance.post(EducationEndpoints.ADD_EDUCATION,
            {educationLevel, educationStream, institution, isPresent, startYear, endYear, location},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const getUserEducations = async () => {
        const response = await axiosInstance.get(EducationEndpoints.LOAD_ALL_EDUCATIONS,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const editUserEducation = async (educationId : string, educationLevel : string, educationStream : string, institution : string, isPresent : boolean, startYear : string, endYear : string, location : string) => {
        const response = await axiosInstance.put(EducationEndpoints.UPDATE_EDUCATION_BY_EDUCATIONID(educationId),
            {educationLevel, educationStream, institution, isPresent, startYear:startYear, endYear, location},
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
}

export const deleteUserEducation = async (educationId? : string) => {
        const response = await axiosInstance.delete(EducationEndpoints.DELETE_EDUCATION_BY_EDUCATIONID(educationId as string),
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
}