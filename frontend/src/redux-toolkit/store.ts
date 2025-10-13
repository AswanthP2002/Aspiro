import { configureStore } from "@reduxjs/toolkit";
import candidateAuthReducer from './candidateAuthSlice'
import recruiterAuthReducer from './recruiterAuthSlice'
import adminAuthReducer from './adminAuthSlice'
import userAuthReducer from './userAuthSlice'

const store = configureStore({
    reducer:{
        candidateAuth:candidateAuthReducer,
        recruiterAuth:recruiterAuthReducer,
        adminAuth:adminAuthReducer,
        userAuth:userAuthReducer
    }
})

export default store