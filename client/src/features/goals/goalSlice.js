import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import goalService from './goalService';

// initial state for goals
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create goal
export const createGoal = createAsyncThunk(
  'goals/createGoal',
  async (goal, thunkAPI) => {
    try {
      // since goals are protected, we need to pass the token in the header
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.create(goal, token);
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

// create slice for goals
const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: (state) => initialState, // reset state to initialState
  },

  // in authSlice.js we followed the `builder` pattern
  extraReducers: {
    // create goal
    [createGoal.pending]: (state) => {
      state.isLoading = true;
    },

    [createGoal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.push(action.payload);
    },

    [createGoal.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

// export actions
export const { reset } = goalSlice.actions;

// export selectors
export default goalSlice.reducer;
