import { Db } from "mongodb";
import Notifications from "../../domain/entities/notification";
import INotificationRepo from "../../domain/interfaces/INotificationRepo";
import BaseRepository from "./baseRepository";
import mongoose from "mongoose";

export default class NotificationRepository extends BaseRepository<Notifications> implements INotificationRepo {
    db : Db
    collection : string
    constructor(db : Db){
        super(db, 'notification')
        this.db = db
        this.collection = 'notification'
    }

    async getNotifications(userId: string): Promise<Notifications[] | null> {
        const notifications = await this.db.collection<Notifications>(this.collection).find({userId:new mongoose.Types.ObjectId(userId)}).sort({createdAt:-1}).toArray()
        return notifications
    }
}