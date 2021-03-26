import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../api';

export const createPost = createAsyncThunk(
  'post/createPost',
  async (postFormData, thunkAPI) => {
    try {
      const { data } = await postAPI.createPost(postFormData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: null,
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = false;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});
