import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorage } from '../../shared/storage/localStorage';

const BASE_URL = 'http://localhost:3001';

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
    fetch(BASE_URL + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('You are not authorized');
        }
        return response.json();
      })
      .then((data: IUserResponse) => {
        const { token } = data;
        LocalStorage.setItem('token', token);
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
    const access_token = LocalStorage.getItem('token');

    if (access_token) {
      try {
        const response = await fetch(BASE_URL + '/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Your token is destroy');
        }

        dispatch(setIsAuth(true));
        dispatch(setEerrorAuth(null));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(setEerrorAuth(error.message));
        }
      } finally {
        dispatch(setIsLoader(false));
      }
    } else {
      dispatch(setIsLoader(false));
    }
  },
);

export const createLogOut = createAsyncThunk(
  '@@Auth/createLogOut',
  async (_, { dispatch }) => {
    localStorage.removeItem('token');
    dispatch(setIsAuth(false));
  },
);
