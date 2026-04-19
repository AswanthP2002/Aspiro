import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../types/entityTypes";
import { getUnReadNotificationsCount } from "../services/notificationServices";
import { Notify } from "notiflix";
import { AxiosError } from "axios";

interface NotificationPayloadValues {
    notifications: Notification[]
    unRead: number
}
interface UnReadNotificationsCountResponsePayload {
    result: number
}

const initialState: {notifications: Notification[], unReadNotificationsCount: number, initialLoading: boolean} = {
    notifications: [],
    unReadNotificationsCount: 0,
    initialLoading: true
}

export const notificationThunk = createAsyncThunk(
    'users/notification/count',
    async (_, {rejectWithValue}) => {
        try {
            console.log('Going to call the api inside thunk')
            const result: UnReadNotificationsCountResponsePayload = await getUnReadNotificationsCount()
            console.log('API called inside the thunk, ', result)
            Notify.success(`Notification fetched - count ${result}`)
            return result
        } catch (error: unknown) {
            const err = error as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: initialState,
    reducers:{
        setNotifications(state, action: PayloadAction<NotificationPayloadValues>){
            const newNotifications = action.payload.notifications
            console.log('--new notificationss upcoming --', newNotifications)
            const existingNotifications = new Set(state.notifications.map((n) => n._id))
            console.log('existing ids')
            existingNotifications.forEach((noti) => console.log(noti))
            const uniqueNotifications = newNotifications.filter((notification) => !existingNotifications.has(notification._id))
            console.log('-- Unique notifications --', uniqueNotifications)
            if(newNotifications.length > 0){
                state.notifications.push(...uniqueNotifications)
            }else{
                state.notifications = []
            }
            // state.unReadNotificationsCount = action.payload.unRead
        },
        setNotificationsCount(state, action: PayloadAction<{count: number}>){
            Notify.info(`Notification count seting ${action.payload.count}`)
            state.unReadNotificationsCount = action.payload.count
            Notify.success(`Notification count set ${state.unReadNotificationsCount}`)
        },
        markAsRead(state, action: PayloadAction<{notificationId: string}>){
            //update notification
            state.notifications = state.notifications.map((notification: Notification) => {
                if(notification._id === action.payload.notificationId){
                    return {...notification, isRead: true}
                }else{
                    return notification
                }
            })
            if(state.notifications.length > 0){
                state.unReadNotificationsCount--
            }

            state.notifications = state.notifications.filter((notification: Notification) => notification._id !== action.payload.notificationId)
        },
        markAllNotificationAsRead(state){
            state.notifications = state.notifications.map((notification: Notification) => {
                if(notification.isRead === false){
                    return {...notification, isRead: true}
                }else {
                    return notification
                }
            })
            state.unReadNotificationsCount = 0
        },
        deleteNotificationFromStore(state, action: PayloadAction<{notificationId: string}>){
            const getDeletableNotification = state.notifications.find((notification: Notification) => notification._id === action.payload.notificationId)
            state.notifications = state.notifications.filter((noti: Notification) => noti._id !== action.payload.notificationId)
            if(!getDeletableNotification?.isRead){
                state.unReadNotificationsCount--
            }
        },
        deleteAllNotificationsFromStore(state){
            state.notifications = []
            state.unReadNotificationsCount = 0
        },
        addLiveNotification(state, action: PayloadAction<{notification: Notification}>){
            const incoming = action.payload.notification
            const isExists = state.notifications.find((noti: Notification) => noti._id === incoming._id)
            if(!isExists){
                state.notifications.unshift(incoming)
                state.unReadNotificationsCount++
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(notificationThunk.pending, (state) => {
                state.initialLoading = true
            })
            .addCase(notificationThunk.fulfilled, (state, action: PayloadAction<UnReadNotificationsCountResponsePayload>) => {
              state.unReadNotificationsCount = action.payload.result
              state.initialLoading = false
            //    toast.success('Notification fetched using thunk succesfully')
               console.log('This is final fetched notifications', action.payload.result)
            })
            .addCase(notificationThunk.rejected, (state) => {
                state.unReadNotificationsCount = 0
                state.initialLoading = false
            })
    }
})


export const {setNotifications, markAsRead, addLiveNotification, setNotificationsCount, deleteNotificationFromStore, markAllNotificationAsRead, deleteAllNotificationsFromStore} = notificationSlice.actions
export default notificationSlice.reducer