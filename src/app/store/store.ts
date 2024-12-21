import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../pages/auth/authPage.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
