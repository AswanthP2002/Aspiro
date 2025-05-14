import { configureStore } from "@reduxjs/toolkit";
import candidateAuthReducer from './candidateAuthSlice'
import recruiterAuthReducer from './recruiterAuthSlice'

const store = configureStore({
    reducer:{
        candidateAuth:candidateAuthReducer,
        recruiterAuth:recruiterAuthReducer
    }
})


export default store