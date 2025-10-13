import mongoose from "mongoose";

export default interface Notification {
    userId? : mongoose.Types.ObjectId,
    title: string
    message : string,
    createdAt? : Date
    isRead? : boolean
}