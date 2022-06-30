import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

// initial state for users
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create slice for auth
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // these reducers are not async
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: () => {},
});

// export actions
export const { reset } = authSlice.actions;

// export selectors
export default authSlice.reducer;
