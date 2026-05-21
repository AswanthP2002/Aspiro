import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNewUnreadConversationsCount } from "../services/chatServices";


export const newUnreadConversationsCountFetchThunk = createAsyncThunk(
    'newUnreadConversations/count',
    async function(_, thunkApi){
        try {
            const response = await getNewUnreadConversationsCount()
            return response
        } catch (error: unknown) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

const intialState = {
    newUnreadChatsCount: 0
}

const ChatSlice = createSlice({
    name: 'chatSlice',
    initialState: intialState,
    reducers:{
        setNewUnreadChatsCount: (state, action: PayloadAction<{count: number}>) => {
            state.newUnreadChatsCount = action.payload.count
        },
        newUnreadChatArrived: (state) => {
            state.newUnreadChatsCount++
        },
        openedUnreadChat: (state) => {
            state.newUnreadChatsCount = state.newUnreadChatsCount > 0 ? state.newUnreadChatsCount-- : 0
        }
    },
    extraReducers(builder){
        builder
            .addCase(newUnreadConversationsCountFetchThunk.pending, (state) => {
                state.newUnreadChatsCount = 0
            })
            .addCase(newUnreadConversationsCountFetchThunk.fulfilled, (state, action: PayloadAction<{result: number}>) => {
                state.newUnreadChatsCount = action.payload.result
            })
            .addCase(newUnreadConversationsCountFetchThunk.rejected, (state) => {
                state.newUnreadChatsCount = 0
            })
    }
})

export const {setNewUnreadChatsCount, openedUnreadChat, newUnreadChatArrived} = ChatSlice.actions
export default ChatSlice.reducer