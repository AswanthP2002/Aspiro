import {createSlice} from '@reduxjs/toolkit'

const candidateAuthrSlice = createSlice({
    name:'candidateAuth',
    initialState:{
        user:localStorage.getItem('logedCandidate') || null,
        token:localStorage.getItem('candidateToken') || null
    },
    reducers:{
        loginSucess:(state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('logedCandidate', JSON.stringify(action.payload.user))
            localStorage.setItem('candidateToken', action.payload.token)
        },
        logout:(state) => {
            state.user = null
            state.token = null
            localStorage.removeItem("logedCandidate")
            localStorage.removeItem("candidateToken")
        },
        // tokenRefresh:(state, action) => {
        //     state.token = action.payload.token
        //     localStorage.setItem('candidateToken', action.payload.token)
        // }
    }


})

export const {loginSucess, logout} = candidateAuthrSlice.actions
export default candidateAuthrSlice.reducer