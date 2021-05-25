import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { postSlice } from './postSlice';
import { locationSlice } from './locationSlice';
import { toastSlice } from './toastSlice';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    location: locationSlice.reducer,
    toasts: toastSlice.reducer,
  },
});
