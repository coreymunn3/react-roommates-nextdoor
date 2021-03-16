import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import validateLogin from '../components/utils/validateLogin';
import validateSignup from '../components/utils/validateSignup';

// thunks
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (newUserData, thunkAPI) => {
    const validationErrors = validateSignup(newUserData);
    if (validationErrors) {
      return thunkAPI.rejectWithValue(validationErrors);
    }
    try {
      const { data } = await axios.post('/auth/signup', newUserData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, thunkAPI) => {
    const validationErrors = validateLogin(userData);
    if (validationErrors) {
      return thunkAPI.rejectWithValue(validationErrors);
    }
    try {
      const { data } = await axios.post('/auth/login', userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [signupUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signupUser.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
