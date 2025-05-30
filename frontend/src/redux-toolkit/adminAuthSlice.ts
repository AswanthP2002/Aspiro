import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState:{
        admin:localStorage.getItem('admin') || null,
        adminToken:localStorage.getItem('adminToken') || null
    },
    reducers:{
        adminLoginSuccess:(state, action) => {
            state.admin = action.payload.admin
            state.adminToken = action.payload.token,
            localStorage.setItem('admin', JSON.stringify(action.payload.admin))
            localStorage.setItem('adminToken', action.payload.token)
        },
        adminLogout:(state) => {
            state.admin = null
            state.adminToken = null
            localStorage.removeItem('admin')
            localStorage.removeItem('adminToken')
        }
    }
})

export const {adminLoginSuccess, adminLogout} = adminAuthSlice.actions
export default adminAuthSlice.reducer