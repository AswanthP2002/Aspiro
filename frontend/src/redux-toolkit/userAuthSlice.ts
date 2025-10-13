import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
    name:"userAuth",
    initialState:{
        user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
        userToken:localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken') as string) : null,
        userRole:localStorage.getItem('userRole') ? JSON.parse(localStorage.getItem('userRole') as string) : null
    },
    reducers:{
        loginSuccess:(state, action) => {
            state.user = action.payload.user
            state.userToken = action.payload.userToken
            state.userRole = action.payload.userRole
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('userToken', JSON.stringify(action.payload.userToken))
            localStorage.setItem('userRole', JSON.stringify(action.payload.userRole))
        },
        logout:(state) => {
            state.user = null
            state.userToken = null
            state.userRole = null
            localStorage.removeItem('user')
            localStorage.removeItem('userRole')
            localStorage.removeItem('userToken')
        },
        tokenRefresh:(state, action) => {
            state.userToken = action.payload.userToken
            localStorage.setItem('userToken', JSON.stringify(action.payload.userToken))
        }
    }
})

export const {loginSuccess, logout, tokenRefresh} = userAuthSlice.actions
export default userAuthSlice.reducer