import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './userAuthSlice'
import alertReducer from './alertSlice'
import notificationReducer from './notificationSlice'

const store = configureStore({
    reducer:{
        userAuth: userAuthReducer,
        alert: alertReducer,
        notification: notificationReducer
    }
})

export default store