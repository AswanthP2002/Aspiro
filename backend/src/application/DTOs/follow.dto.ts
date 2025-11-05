export default interface FollowUserDTO {
    follower? : string
    following? : string
}

export interface FollowUserResDTO {
    _id? : string
    follower? : string
    following? : string
    createdAt? : string
    updatedAt? : string
}

export interface UnFollowUserDTO {
    follower : string
    following : string
}