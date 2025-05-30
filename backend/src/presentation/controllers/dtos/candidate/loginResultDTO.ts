import { ObjectId } from "mongoose"
export default interface CandidateLoginResult{
    token : string
    refreshToken : string
    user? : {
        id? : string | ObjectId,
        email? : string
    }
}