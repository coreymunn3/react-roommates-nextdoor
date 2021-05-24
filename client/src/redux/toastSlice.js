import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: null,
  reducers: {
    setToast: (state, action) => {
      return (state = action.payload);
    },
    clearToast: (state, action) => {
      return (state = null);
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;
