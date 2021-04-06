import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { locationAPI } from '../api';
// thunks
export const getAllLocations = createAsyncThunk(
  'location/getAllLocations',
  async (thunkAPI) => {
    try {
      const { data } = await locationAPI.getAllLocations();
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locations: [],
    isLoading: null,
    isError: null,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [getAllLocations.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [getAllLocations.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.locations = action.payload;
    },
    [getAllLocations.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});
