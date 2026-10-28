import axiosInstance, { AxiosRequest } from "./util/AxiosInstance"
import { FollowEndpoints } from "../constants/endPoints/follow.endpoints"

export const getFollowers = async (userId: string, search: string, page: number, limit: number) => {
        const response = await axiosInstance.get(FollowEndpoints.GET_FOLLOWERS(userId), 
            {
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const getFollowings = async (userId: string, search: string, page: number, limit: number) => {
        const response = await axiosInstance.get(FollowEndpoints.GET_FOLLOWINGS(userId), 
            {
                params:{search, page, limit},
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}

export const removeAFollower = async (followerId: string) => {
        const response = await axiosInstance.delete(FollowEndpoints.REMOVE_A_FOLLOWER(followerId), 
            {
                sendAuthToken: true
            } as AxiosRequest
        )

        return response.data
}