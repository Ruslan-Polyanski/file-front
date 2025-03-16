import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { access_token } from '../../shared/storage/localStorage';
import { API } from '../../shared/api/api';

interface IAuthState {
  isAuth: boolean;
  isLoader: boolean;
  errorAuth: string | null;
}

interface IUser {
  email: string;
  password: string;
}

interface IUserResponse {
  id: number;
  email: string;
  token: string;
}

const initialAuthState: IAuthState = {
  isAuth: false,
  isLoader: true,
  errorAuth: null,
};

export const authSlice = createSlice({
  name: '@@Auth',
  initialState: initialAuthState,
  reducers: {
    setIsAuth: (state, action) => {
      return { ...state, isAuth: action.payload };
    },
    setIsLoader: (state, action) => {
      return { ...state, isLoader: action.payload };
    },
    setErrorAuth: (state, action) => {
      return { ...state, errorAuth: action.payload };
    },
  },
});

export const { setIsAuth, setIsLoader, setErrorAuth } = authSlice.actions;

export const logIn = createAsyncThunk(
  '@@Auth/createLogin',
  async (user: IUser, { dispatch }) => {
    dispatch(setIsLoader(true));
    try {
      const data: IUserResponse = await API.logIn(user)
      const { token } = data;
      access_token.set(token)
      dispatch(setIsAuth(true));
      dispatch(setErrorAuth(null));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorAuth(error.message));
      }
    } finally {
      dispatch(setIsLoader(false));
    }
  }
);

export const checkAuth = createAsyncThunk(
  '@@Auth/createCheckAuth',
  async (_, { dispatch }) => {
      try {
          await API.checkValidationToken();
          dispatch(setIsAuth(true));
          dispatch(setErrorAuth(null));
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setErrorAuth(error.message));
          }
        } finally {
          dispatch(setIsLoader(false));
        }
    }
);

export const logOut = createAsyncThunk(
  '@@Auth/createLogOut',
  async (_, { dispatch }) => {
    access_token.delete()
    dispatch(setIsAuth(false));
  },
);
