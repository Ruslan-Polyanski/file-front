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
    setEerrorAuth: (state, action) => {
      return { ...state, errorAuth: action.payload };
    },
  },
});

export const { setIsAuth, setIsLoader, setEerrorAuth } = authSlice.actions;

export const createLogin = createAsyncThunk(
  '@@Auth/createLogin',
  async (user: IUser, { dispatch }) => {
    dispatch(setIsLoader(true));
    fetch('http://localhost:3001' + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error('You are not authorized');
        }
        return response.json();
      })
      .then((data: IUserResponse) => {
        const { token } = data;
        access_token.set(token)
        dispatch(setIsAuth(true));
        dispatch(setEerrorAuth(null));
      })
      .catch((err) => {
        dispatch(setEerrorAuth(err.message));
      })
      .finally(() => {
        dispatch(setIsLoader(false));
      });
  },
);

export const createCheckAuth = createAsyncThunk(
  '@@Auth/createCheckAuth',
  async (_, { dispatch }) => {
    try {
        const response = await API.checkValidationToken();
        dispatch(setIsAuth(true));
        dispatch(setEerrorAuth(null));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(setEerrorAuth(error.message));
        }
      } finally {
        dispatch(setIsLoader(false));
      }
    } 
);

export const createLogOut = createAsyncThunk(
  '@@Auth/createLogOut',
  async (_, { dispatch }) => {
    access_token.delete()
    dispatch(setIsAuth(false));
  },
);
