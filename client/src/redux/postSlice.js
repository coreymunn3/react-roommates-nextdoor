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

export const getPostsByLocation = createAsyncThunk(
  'post/getPostsByLocation',
  async (locationId, thunkAPI) => {
    try {
      const { data } = await postAPI.getPostsByLocation(locationId);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (postId, thunkAPI) => {
    try {
      const { data } = await postAPI.getPostById(postId);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getPostByUser = createAsyncThunk(
  'posts/getPostByUser',
  async (thunkAPI) => {
    try {
      const { data } = await postAPI.getPostByUser();
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    newPost: null,
    currentPost: {},
    locationPosts: [],
    userPosts: [],
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
      state.newPost = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [getPostsByLocation.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [getPostsByLocation.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.locationPosts = action.payload;
      state.newPost = null;
    },
    [getPostsByLocation.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [getPostById.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [getPostById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentPost = action.payload;
    },
    [getPostById.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [getPostByUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [getPostByUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userPosts = action.payload;
    },
    [getPostByUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});
