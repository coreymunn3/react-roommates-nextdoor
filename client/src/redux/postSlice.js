import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../api';

export const createPost = createAsyncThunk(
  'post/createPost',
  async (postFormData, thunkAPI) => {
    try {
      const { data } = await postAPI.createPost(postFormData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getFeedPosts = createAsyncThunk(
  'post/getFeedPosts',
  async (locationId, thunkAPI) => {
    try {
      const { data } = await postAPI.getPostsByLocation(locationId);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    userPosts: [],
    feedPosts: [],
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userPosts.push(action.payload);
      state.feedPosts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [getFeedPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [getFeedPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.feedPosts = action.payload;
    },
    [getFeedPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});
