import { RootState } from '@/app/store';

export const selectorUserID = (state: RootState) => state.auth.userID;
export const selectorIsAuth = (state: RootState) => state.auth.isAuth;
export const selectorStatus = (state: RootState) => state.auth.status;
export const selectorError = (state: RootState) => state.auth.error;
export const selectorEmail = (state: RootState) => state.auth.email;
export const selectorPassword = (state: RootState) => state.auth.password;
