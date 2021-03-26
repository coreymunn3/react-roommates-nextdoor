import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import validateLogin from '../utils/validateLogin';
import validateSignup from '../utils/validateSignup';
import { userAPI } from '../api';
// thunks
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (newUserData, thunkAPI) => {
    const validationErrors = validateSignup(newUserData);
    if (validationErrors) {
      return thunkAPI.rejectWithValue(validationErrors);
    }
    try {
      const { data } = await userAPI.signup(newUserData);
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
      const { data } = await userAPI.login(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUser = createAsyncThunk('user/getUser', async (thunkAPI) => {
  try {
    const { data } = await userAPI.getCurrentUser();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [signupUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [signupUser.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});
