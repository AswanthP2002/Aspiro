import { createAsyncThunk } from "@reduxjs/toolkit";
import { reAuthenticate } from "../services/commonServices";
import { AxiosError } from "axios";
import { Notify } from "notiflix";

interface ReAuthenticateResultPayload {
    accessToken: string,
    userData: any
}

export const reAuthenticateThunk = createAsyncThunk(
    'user/reAuthenticate',
    async (_, {rejectWithValue}) => {
        try {
            const result: ReAuthenticateResultPayload = await reAuthenticate()
            // Notify.info(`new token ${result.accessToken}`, {timeout: 10000})
            // Notify.info(`User role ${result.userData.role}`)
            return result
        } catch (error: unknown) {
            const err = error as AxiosError
            console.log('Error occured inside thunk while reauthenticating', error)
            return rejectWithValue(err.response?.data || 'Re authentication failed')
        }
    }
)

