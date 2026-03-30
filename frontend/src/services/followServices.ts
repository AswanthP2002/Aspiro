import { AxiosError, HttpStatusCode } from "axios"
import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { FollowEndpoints } from "../constants/endPoints/follow.endpoints"

export const getFollowers = async (userId: string, search: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(FollowEndpoints.GET_FOLLOWERS(userId), 
            {
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const getFollowings = async (userId: string, search: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(FollowEndpoints.GET_FOLLOWINGS(userId), 
            {
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}

export const removeAFollower = async (followerId: string) => {
    try {
        const response = await axiosInstance.delete(FollowEndpoints.REMOVE_A_FOLLOWER(followerId), 
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
    } catch (error: unknown) {
        const err = error as AxiosError

        if(err.response && err.response.status < HttpStatusCode.InternalServerError && err.response.status !== HttpStatusCode.Forbidden) throw err
    }
}