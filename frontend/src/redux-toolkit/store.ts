import { configureStore } from "@reduxjs/toolkit";
import candidateAuthReducer from './candidateAuthSlice'

const store = configureStore({
    reducer:{
        candidateAuth:candidateAuthReducer
    }
})


export default store