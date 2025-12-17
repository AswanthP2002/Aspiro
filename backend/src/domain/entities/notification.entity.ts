
export default interface Notification {
    _id?: string
    recepientId?: string
    type: 'USER_ACTION' | 'JOB_ALERT' | 'SYSTEM_NOTICE'
    category: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'CONNECTION_REQUEST' | 'CONNECTION_ACCEPTED' | 'EXPIRY' | 'APPLICATION_STATUS_CHANGE' | 'JOB'
    actorId?: string
    targetType?: 'USER' | 'JOB' | 'POST' | 'RECRUITER' | 'APPLICATION'
    targetId?: string
    message?: string
    isRead?: boolean
    createdAt?: string
    metaData?: {[key: string]: string | number | boolean | object | undefined | null | Date | any}
}