import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notify } from "notiflix";
import { Alerts } from "../types/entityTypes";

interface AlertPayloadvalues {
    alerts: Alerts[] | any[]
    unReadAlertsCount: number
}

const initalState: any = {
    alerts: [],
    unReadAlertsCount: 0
}

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState: initalState,
    reducers:{
        setAlerts(state, action: PayloadAction<AlertPayloadvalues>){
            Notify.success('Alerts setuped succesfully')
            console.log(action.payload.alerts)
            console.log(action.payload.unReadAlertsCount)
            state.alerts.push(...action.payload.alerts)
            state.unReadAlertsCount = action.payload.unReadAlertsCount
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
    }
})


export const {setAlerts, markAsRead, increaseAlertsCount, decreaseAlertsCount} = alertSlice.actions
export default alertSlice.reducer
