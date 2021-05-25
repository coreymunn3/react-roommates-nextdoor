import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// toast structure:
// {
//   id: ###
//   status: 1 (success) || 0 (fail),
//   message: 'Text to Display'
// }

export const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast(state, action) {
      return (state = [action.payload, ...state]);
    },
    clearToast(state, action) {
      return (state = state.filter((toast) => toast.id !== action.payload));
    },
  },
});

export const { addToast, clearToast } = toastSlice.actions;
