import { configureStore } from "@reduxjs/toolkit";
// import candidateAuthReducer from './candidateAuthSlice'
// import recruiterAuthReducer from './recruiterAuthSlice'
// import adminAuthReducer from './adminAuthSlice'
import userAuthReducer from './userAuthSlice'
import alertReducer from './alertSlice'
import notificationReducer from './notificationSlice'

const store = configureStore({
    reducer:{
        // candidateAuth:candidateAuthReducer,
        // recruiterAuth:recruiterAuthReducer,
        // adminAuth:adminAuthReducer,
        userAuth:userAuthReducer,
        alert: alertReducer,
        notification: notificationReducer
    }
})

export default store