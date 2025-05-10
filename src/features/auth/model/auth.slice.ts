import { API } from '@/shared/api/api';
import { access_token } from '@/shared/model/local-storage';
import { TUser } from '@/shared/model/types/auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type TAuthState = {
    userID: number | null;
    isAuth: boolean;
    status: 'loader' | 'success' | 'error';
    error: string;
    email: string;
    password: string;
};

const initialAuthState: TAuthState = {
    userID: null,
    isAuth: false,
    status: 'loader',
    error: '',
    email: '',
    password: '',
};

export const authSlice = createSlice({
    name: '@@Auth',
    initialState: initialAuthState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.status = 'loader';
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.status = 'success';
                state.isAuth = true;

                const { token, id, email } = action.payload;

                state.userID = id;
                state.email = email;

                access_token.set(token);

                state.error = '';
                state.password = '';
            })
            .addCase(logIn.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) state.error = action.error.message;
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = 'loader';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuth = true;

                const { id, email } = action.payload;

                state.userID = id;
                state.email = email;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isAuth = false;
                state.status = 'error';
            })
            .addCase(logOut.rejected, () => {
                return { ...initialAuthState, status: 'error', isAuth: false };
            });
    },
});

export const { setEmail, setPassword, setError, setStatus } = authSlice.actions;

export const logIn = createAsyncThunk('@@Auth/logIn', async (user: TUser) => {
    return API.logIn(user);
});

export const checkAuth = createAsyncThunk('@@Auth/checkAuth', async () => {
    return API.checkValidationToken();
});

export const logOut = createAsyncThunk('@@Auth/logOut', async () => {
    access_token.delete();
    return API.checkValidationToken();
});
