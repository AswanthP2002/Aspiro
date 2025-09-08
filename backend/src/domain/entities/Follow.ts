export default interface Follow {
    _id? : string
    follower? : string
    following? : string
    type : "candidate" | "recruiter"
    createdAt? : string
    updatedAt? : string
}