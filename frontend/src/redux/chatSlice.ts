import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNewUnreadConversationsCount } from "../services/chatServices";
import { toast } from "react-toastify";


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

const intialState: {newUnreadChatsCount: number, conversationsWithUnreadChats: string[]} = {
    newUnreadChatsCount: 0,
    conversationsWithUnreadChats: []
}

const ChatSlice = createSlice({
    name: 'chatSlice',
    initialState: intialState,
    reducers:{
        setNewUnreadChatsCount: (state, action: PayloadAction<{count: number, conversationIds: string[]}>) => {
            state.newUnreadChatsCount = action.payload.count
            state.conversationsWithUnreadChats = action.payload.conversationIds
        },
        newUnreadChatArrived: (state, action: PayloadAction<{conversationId: string}>) => {
            const idExist = state.conversationsWithUnreadChats.includes(action.payload.conversationId)
            if(!idExist){
                state.conversationsWithUnreadChats.push(action.payload.conversationId)
                state.newUnreadChatsCount++
            }   
        },
        openedUnreadChat: (state, action: PayloadAction<{conversationId: string}>) => {
            const afterIdRemoed = state.conversationsWithUnreadChats.filter((id: string) => id !== action.payload.conversationId)
            state.conversationsWithUnreadChats = afterIdRemoed
            state.newUnreadChatsCount = state.newUnreadChatsCount > 0 ? state.newUnreadChatsCount - 1 : 0
        }
    },
    extraReducers(builder){
        builder
            .addCase(newUnreadConversationsCountFetchThunk.pending, (state) => {
                state.newUnreadChatsCount = 0
                state.conversationsWithUnreadChats = []
            })
            .addCase(newUnreadConversationsCountFetchThunk.fulfilled, (state, action: PayloadAction<{result: {count: number, conversationIds: string[]}}>) => {
                state.newUnreadChatsCount = action.payload.result.count
                state.conversationsWithUnreadChats = action.payload.result.conversationIds
            })
            .addCase(newUnreadConversationsCountFetchThunk.rejected, (state) => {
                state.newUnreadChatsCount = 0
                state.conversationsWithUnreadChats = []
            })
    }
})

export const {setNewUnreadChatsCount, openedUnreadChat, newUnreadChatArrived} = ChatSlice.actions
export default ChatSlice.reducer