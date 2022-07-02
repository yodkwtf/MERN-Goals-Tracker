import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

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

// async thunk for register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// async thunk for logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// create slice for auth
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

// export actions
export const { reset } = authSlice.actions;

// export selectors
export default authSlice.reducer;
