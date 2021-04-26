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

export const editPost = createAsyncThunk(
  'post/editPost',
  async (postFormData, thunkAPI) => {
    try {
      const { data } = await postAPI.editPost(postFormData._id, postFormData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId, thunkAPI) => {
    try {
      const { data } = await postAPI.deletePost(postId);
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

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId, thunkAPI) => {
    try {
      const { data } = await postAPI.likePost(postId);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async (postId, thunkAPI) => {
    try {
      const { data } = await postAPI.unlikePost(postId);
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
    [editPost.pending]: (state, aciton) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [editPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userPosts = state.userPosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [editPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [deletePost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userPosts = state.userPosts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [deletePost.rejected]: (state, action) => {
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
    [likePost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [likePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.locationPosts = state.locationPosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [likePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [unlikePost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [unlikePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.locationPosts = state.locationPosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [unlikePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});
