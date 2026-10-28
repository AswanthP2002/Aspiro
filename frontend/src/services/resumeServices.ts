import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { ResumeEndpoint } from "../constants/endPoints/resume.endpoints"

export const addUserResume = async (formData : FormData) => {
        const response = await axiosInstance.post(ResumeEndpoint.RESUMES.ADD,formData,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const loadUserResumes = async () => {
        const response = await axiosInstance.get(ResumeEndpoint.RESUMES.LOAD,
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const setUserResumePrimary = async (resumeId: string) => {
        const response = await axiosInstance.patch(ResumeEndpoint.RESUMES.SET_RESUME_AS_PRIMARY(resumeId), {},
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const deleteUserResume = async (resumeId : string, cloudinaryPublicId : string) => {
        const response = await axiosInstance.delete(ResumeEndpoint.RESUMES.DELETE(resumeId),
            {
                params:{cloudinaryPublicId},
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
}

export const analyzeResume = async (
    resumeData: {[key: string]: string | string[] | number | number[] | null | object | boolean | undefined}, 
    targettedRole: string
) => {
        const response = await axiosInstance.post(ResumeEndpoint.RESUMES.ANALYZE_RESUME,
            {data:resumeData, targettedRole},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const analyzeResumeDetailed = async (resumeData: string, targettedRole: string) => {
        const response = await axiosInstance.post(ResumeEndpoint.RESUMES.ANALYZE_RESUME_DETAILED,
            {data:resumeData, targettedRole},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}
