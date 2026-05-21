import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './userAuthSlice'
import alertReducer from './alertSlice'
import notificationReducer from './notificationSlice'
import chatReducer from './chatSlice'

const store = configureStore({
    reducer:{
        userAuth: userAuthReducer,
        alert: alertReducer,
        notification: notificationReducer,
        chat: chatReducer
    }
})

export default store