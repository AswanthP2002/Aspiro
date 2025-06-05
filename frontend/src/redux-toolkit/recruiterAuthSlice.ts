import { createSlice } from "@reduxjs/toolkit";

const recruiterAuthSlice = createSlice({
    name:'recruiterAuthSlice',
    initialState:{
        recruiter:localStorage.getItem('logedRecruiter') || null,
        recruiterToken:localStorage.getItem('recruiterToken') || null
    },
    reducers:{
        recruiterLogedIn:(state, action) => {
            state.recruiter = action.payload.recruiter
            state.recruiterToken = action.payload.token
            localStorage.setItem('logedRecruiter', JSON.stringify(action.payload.recruiter))
            localStorage.setItem('recruiterToken', action.payload.token)
        },
        recruiterLogout:(state) => {
            state.recruiter = null
            state.recruiterToken = null
            localStorage.removeItem('logedRecruiter')
            localStorage.removeItem('recruiterToken')
        }
    }
})

export const {recruiterLogedIn, recruiterLogout} = recruiterAuthSlice.actions
export default recruiterAuthSlice.reducer