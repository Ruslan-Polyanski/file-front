import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../pages/auth/authPage.slice';
import { employeesSlice } from '../pages/employees/model/employees-page.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    employees: employeesSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
