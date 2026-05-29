import { createAsyncThunk } from "@reduxjs/toolkit";
import { reAuthenticate } from "../services/commonServices";
import { AxiosError } from "axios";

export interface ReAuthenticateResultPayload {
    accessToken: string,
    userData: {
        _id: string;
        name?: string;
        email: string;
        role?: string;
        headline?: string;
        profilePicture?: string;
        subscription?: {
            name: string;
            planId: string;
            subscriptionId: string;
        }
    }
}

export const reAuthenticateThunk = createAsyncThunk(
    'user/reAuthenticate',
    async (_, {rejectWithValue}) => {
        try {
            const result: ReAuthenticateResultPayload = await reAuthenticate()
            return result
        } catch (error: unknown) {
            const err = error as AxiosError
            console.log('Error occured inside thunk while reauthenticating', error)
            return rejectWithValue(err.response?.data || 'Re authentication failed')
        }
    }
)

