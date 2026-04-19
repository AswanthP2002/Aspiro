import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reAuthenticateThunk } from './reAuthenticateSlice';

interface User {
  _id: string;
  email: string;
  name?: string;
  profilePicture?: string
  role?: string
  subscription?: {
    subscriptionId: string;
    planId: string;
    name: string
  }
}

interface UserAuthState {
  user: User | null;
  userToken: string | null;
  userRole: string | null;
  initialLoading?: boolean
}

const loadInitialState = (): UserAuthState => {
  try {
    const userItem = localStorage.getItem('user');
    const userRole = localStorage.getItem('userRole'); // Roles are plain strings

    return {
      user: null, //currently not geting any data from localstorage
      userToken: null, // Always initialize token as null
      userRole: null, //currently not geting any data from localstorage
      initialLoading: true
    };
  } catch (e) {
    console.error('Could not load state from localStorage', e);
    return { user: null, userToken: null, userRole: null, initialLoading: false };
  }
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: loadInitialState(),
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserAuthState>) => {
      state.user = action.payload.user;
      state.userToken = action.payload.userToken;
      state.userRole = action.payload.userRole;
      state.initialLoading = false
      // localStorage.setItem('user', JSON.stringify(action.payload.user));
      // if (action.payload.userRole) localStorage.setItem('userRole', action.payload.userRole);
    },
    logout: (state) => {
      state.user = null;
      state.userToken = null;
      state.userRole = null;
      state.initialLoading = false;
      ['user', 'userRole'].forEach((key) => localStorage.removeItem(key));
    },
    tokenRefresh: (state, action: PayloadAction<{ userToken: string | null }>) => {
      state.userToken = action.payload.userToken;
      state.initialLoading = false;
    },
    updateUserMetaData: (state, action: PayloadAction<{user: User}>) => {
      state.user = action.payload.user;
      state.initialLoading = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(reAuthenticateThunk.pending, (state) => {
        state.initialLoading = true
      })
      .addCase(reAuthenticateThunk.fulfilled, (state, action: any) => {
        state.user = action.payload.userData
        state.userToken = action.payload.accessToken
        state.userRole = action.payload.userData.role
        state.initialLoading = false
      })
      .addCase(reAuthenticateThunk.rejected, (state) => {
        state.initialLoading = false
        state.user = null
        state.userRole = null
        state.userToken = null
      })
  },
})
    
export const { loginSuccess, logout, tokenRefresh, updateUserMetaData } = userAuthSlice.actions;
export default userAuthSlice.reducer;