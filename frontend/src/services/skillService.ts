import { AxiosError, HttpStatusCode } from "axios"
import { SkillEndpoint } from "../constants/endPoints/skill.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const addUserSkill = async (skillType : string, skill : string, skillLevel : string) => {
    try {
        const response = await axiosInstance.post(SkillEndpoint.USER.ADD, 
            {skillType, skill, skillLevel},
            {
                headers:{"Content-Type":'application/json'},
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        console.log('--error occured while adding skill--', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw error
        }
    }
}

export const getUserSkills = async () => {
    try {
        const response = await axiosInstance.get(SkillEndpoint.USER.LOAD,
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError

        console.log('Error occured while geting candidate skills', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}

export const deleteUserSkill = async (skillId : string) => {
    try {
        const response = await axiosInstance.delete(SkillEndpoint.USER.DELETE_SKILL_BY_SKILLID(skillId),
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
    } catch (error : unknown) {
        const err = error as AxiosError
        
        console.log('Error occured while deleting skills', err)
        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw error
    }
}

export const adminAddSkill = async (skills: string) => {
    try {
        const response = await axiosInstance.post(SkillEndpoint.ADMIN.ADD,
            {skills},
            {
                headers:{"Content-Type":'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminUpdateSkill = async (skillId: string, skills: string, isVerified: boolean) => {
    try {
        const response = await axiosInstance.patch(SkillEndpoint.ADMIN.EDIT_BY_ID(skillId),
            {skills, isVerified},
            {
                headers:{"Content-Type":'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminDeleteSkills = async (skillId: string) => {
    try {
        const response = await axiosInstance.delete(SkillEndpoint.ADMIN.DELETE_BY_ID(skillId),
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const adminGetSkills = async (search: string, limit?: number, page?: number) => {
    try {
        const response = await axiosInstance.get(SkillEndpoint.ADMIN.LOAD,
            {
                params:{search, limit, page},
                headers:{"Content-Type":'application/json'},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('--error occured--', error)

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden){
            throw err
        }
    }
}

export const getSkillsSuggesion = async (search: string) => {
    try {
        const response = await axiosInstance.get(SkillEndpoint.ADMIN.LOAD, 
            {
                params:{search},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError
        console.log('Error occured while fetching skills suggestions', err)
        throw err
    }
}