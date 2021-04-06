import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { postSlice } from './postSlice';
import { locationSlice } from './locationSlice';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    location: locationSlice.reducer,
  },
});
