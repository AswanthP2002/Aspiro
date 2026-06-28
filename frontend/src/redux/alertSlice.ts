import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Alerts, AlertsData } from "../types/entityTypes";
import { getUnreadAlertsCount } from "../services/alertsServices";
import { AxiosError } from "axios";
// import store from "./store";

interface AlertPayloadvalues {
    alerts: AlertsData[]
    unReadAlertsCount: number
}

const initalState: AlertPayloadvalues = {
    alerts: [],
    unReadAlertsCount: 0
}

export const unreadAlertsCountThunk = createAsyncThunk(
    '/user/unread/alerts',
    async (_, {rejectWithValue}) => {
        try {
            const result = await getUnreadAlertsCount()
            return result
        } catch (error: unknown) {
            const err = error as AxiosError
            console.log(error)
            rejectWithValue(err.response?.data || 'something went wrong')
        }
    }
)

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState: initalState,
    reducers:{
        setAlerts(state, action: PayloadAction<AlertPayloadvalues>){
            // Notify.info('Seting alerts called')
            const newAlerts = action.payload.alerts
            console.log('-- upcoming alerts --', newAlerts)
            console.log('-- exisitng state alerts --', current(state.alerts))
            const existAlertIds = new Set(state.alerts.map((a) => a._id))
            console.log('existing ids')
            existAlertIds.forEach((id) => console.log(id))
            const uniqueAlerts = newAlerts.filter((al) => !existAlertIds.has(al._id))
            console.log('-- unique laerts --', uniqueAlerts)
            state.alerts.push(...uniqueAlerts)
            console.log('-- checking alerts after filteration --', current(state.alerts))
            // state.unReadAlertsCount = action.payload.unReadAlertsCount
        },
        setAlertsCount(state, action: PayloadAction<{count: number}>){
            state.unReadAlertsCount = action.payload.count
        },
        markAsRead(state, action: PayloadAction<{alertId: string}>){
            state.alerts = state.alerts.filter((alert: Alerts) => alert._id !== action.payload.alertId)
        },
        increaseAlertsCount(state){
            state.unReadAlertsCount = state.unReadAlertsCount + 1
        },
        decreaseAlertsCount(state){
            state.unReadAlertsCount = state.unReadAlertsCount > 0 ? state.unReadAlertsCount - 1 : 0
        }
    },
    extraReducers(builder) {
        builder
            .addCase(unreadAlertsCountThunk.pending, (state) => {
                // toast.info('Fetching unread alerts count')
                state.unReadAlertsCount = 0
            })
            .addCase(unreadAlertsCountThunk.fulfilled, (state, action: PayloadAction<{result: number}>) => {
                // toast.success('Fetched unread alerts count')
                console.log('action payload count', action.payload.result)
                state.unReadAlertsCount = action.payload.result
            })
            .addCase(unreadAlertsCountThunk.rejected, (state) => {
                // toast.error('Failed to fetch unread alerts count')
                state.unReadAlertsCount = 0
            })
    },
})


export const {setAlerts, markAsRead, increaseAlertsCount, decreaseAlertsCount} = alertSlice.actions
export default alertSlice.reducer
