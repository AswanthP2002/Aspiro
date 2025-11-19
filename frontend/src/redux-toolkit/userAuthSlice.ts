import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a more specific type for the user object
interface User {
  id: string;
  email: string;
}

// Define the shape of the state
interface UserAuthState {
  user: User | null;
  userToken: string | null;
  userRole: string | null;
}

// Helper to safely load state from localStorage
const loadInitialState = (): UserAuthState => {
  try {
    const userItem = localStorage.getItem('user');
    //const userToken = localStorage.getItem('userToken'); // Tokens are plain strings
    const userRole = localStorage.getItem('userRole'); // Roles are plain strings

    // The userToken is intentionally NOT loaded from localStorage for security.
    // It will be held in memory only.
    return {
      user: userItem ? JSON.parse(userItem) : null,
      userToken: null, // Always initialize token as null
      userRole: userRole || null,
    };
  } catch (e) {
    console.error('Could not load state from localStorage', e);
    // On error, return a clean state
    return { user: null, userToken: null, userRole: null };
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
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      //if (action.payload.userToken) localStorage.setItem('userToken', action.payload.userToken);
      if (action.payload.userRole) localStorage.setItem('userRole', action.payload.userRole);
    },
    logout: (state) => {
      state.user = null;
      state.userToken = null;
      state.userRole = null;
      ['user', 'userRole'].forEach((key) => localStorage.removeItem(key));
    },
    tokenRefresh: (state, action: PayloadAction<{ userToken: string | null }>) => {
      state.userToken = action.payload.userToken;
    }
  }
})
    
export const { loginSuccess, logout, tokenRefresh } = userAuthSlice.actions;
export default userAuthSlice.reducer;