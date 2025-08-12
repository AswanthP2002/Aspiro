import mongoose from "mongoose";

export default interface Notifications {
    userId? : mongoose.Types.ObjectId,
    title: string
    message : string,
    createdAt? : Date
    isRead? : boolean
}