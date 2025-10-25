import { ObjectId } from "mongodb"

export default interface SocialLinks {
    _id? : ObjectId
    platform : string
    uri : string
}


