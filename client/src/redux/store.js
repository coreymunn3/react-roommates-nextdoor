import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { postSlice } from './postSlice';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
  },
});
