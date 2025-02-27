import { configureStore } from '@reduxjs/toolkit';
import membersReducer from '../features/membersSlice';

export const store = configureStore({
  reducer: {
    members: membersReducer,
  },
});