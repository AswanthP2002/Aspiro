import { configureStore } from "@reduxjs/toolkit";
import candidateAuthReducer from './candidateAuthSlice'
import recruiterAuthReducer from './recruiterAuthSlice'
import adminAuthReducer from './adminAuthSlice'

const store = configureStore({
    reducer:{
        candidateAuth:candidateAuthReducer,
        recruiterAuth:recruiterAuthReducer,
        adminAuth:adminAuthReducer
    }
})


export default store