export const FollowEndpoints = {
    GET_FOLLOWERS: (userId: string) => `/v2/followers/${userId}`,
    GET_FOLLOWINGS: (userId: string) => `/v2/followings/${userId}`,
    REMOVE_A_FOLLOWER: (followerId: string) => `/v2/follower/${followerId}/remove`
} as const