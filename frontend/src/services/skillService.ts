import { SkillEndpoint } from "../constants/endPoints/skill.endpoints"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"

export const addUserSkill = async (skillType : string, skill : string, skillLevel : string) => {
        const response = await axiosInstance.post(SkillEndpoint.USER.ADD, 
            {skillType, skill, skillLevel},
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const getUserSkills = async () => {
        const response = await axiosInstance.get(SkillEndpoint.USER.LOAD,
            {
                sendAuthToken:true
            } as AxiosRequest
        )
        return response.data
}

export const deleteUserSkill = async (skillId : string) => {
        const response = await axiosInstance.delete(SkillEndpoint.USER.DELETE_SKILL_BY_SKILLID(skillId),
            {
                sendAuthToken:true
            } as AxiosRequest
        )

        return response.data
}

export const adminAddSkill = async (skills: string) => {
        const response = await axiosInstance.post(SkillEndpoint.ADMIN.ADD,
            {skills},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const adminUpdateSkill = async (skillId: string, skills: string, isVerified: boolean) => {
        const response = await axiosInstance.patch(SkillEndpoint.ADMIN.EDIT_BY_ID(skillId),
            {skills, isVerified},
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const adminDeleteSkills = async (skillId: string) => {
        const response = await axiosInstance.delete(SkillEndpoint.ADMIN.DELETE_BY_ID(skillId),
            {
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const adminGetSkills = async (search: string, limit?: number, page?: number) => {
        const response = await axiosInstance.get(SkillEndpoint.ADMIN.LOAD,
            {
                params:{search, limit, page},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}

export const getSkillsSuggesion = async (search: string) => {
        const response = await axiosInstance.get(SkillEndpoint.ADMIN.LOAD, 
            {
                params:{search},
                sendAuthToken: true
            } as AxiosRequest
        )
        return response.data
}