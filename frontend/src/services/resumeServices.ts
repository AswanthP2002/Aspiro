import { AxiosError, HttpStatusCode } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { ResumeEndpoint } from "../constants/endPoints/resume.endpoints"

export const addUserResume = async (formData : FormData) => {
    try {
        const response = await axiosInstance.post(ResumeEndpoint.RESUMES.ADD,formData,
            {
                headers: { 'Content-Type': undefined }, 
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--Error occured while adding resume--', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const loadUserResumes = async () => {
    try {
        const response = await axiosInstance.get(ResumeEndpoint.RESUMES.LOAD,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while loading candidate resumes', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}

export const setUserResumePrimary = async (resumeId: string) => {
    try {
        const response = await axiosInstance.patch(ResumeEndpoint.RESUMES.SET_RESUME_AS_PRIMARY(resumeId), null,
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--Error occured while seting resume primary--', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }
    }
}

export const deleteUserResume = async (resumeId : string, cloudinaryPublicId : string) => {
    try {
        const response = await axiosInstance.delete(ResumeEndpoint.RESUMES.DELETE(resumeId),
            {
                params:{cloudinaryPublicId},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('Error occured while deleting resume', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }
    }
}

export const analyzeResume = async (resumeData: any, targettedRole: string) => {
    try {
        const response = await axiosInstance.post(ResumeEndpoint.RESUMES.ANALYZE_RESUME,
            {data:resumeData, targettedRole},
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

export const analyzeResumeDetailed = async (resumeData: any, targettedRole: string) => {
    try {
        const response = await axiosInstance.post(ResumeEndpoint.RESUMES.ANALYZE_RESUME_DETAILED,
            {data:resumeData, targettedRole},
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
