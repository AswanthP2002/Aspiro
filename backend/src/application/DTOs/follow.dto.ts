export default interface FollowUserDTO {
    follower? : string
    following? : string
    type : "candidate" | "recruiter"
}

export interface FollowUserResDTO {
    _id? : string
    follower? : string
    following? : string
    type : "candidate" | "recruiter"
    createdAt? : string
    updatedAt? : string
}

export interface UnFollowUserDTO {
    follower : string
    following : string
}