import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { employeesSlice } from '@/features/employees-today';
import { authSlice } from '@/features/auth/model/auth.slice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        employees: employeesSlice.reducer,
    },
    devTools: true,
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
