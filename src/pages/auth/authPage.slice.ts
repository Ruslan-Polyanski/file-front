import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorage } from '../../shared/storage/localStorage';

interface IAuthState {
  isAuth: boolean;
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
};

export const authSlice = createSlice({
  name: '@@Auth',
  initialState: initialAuthState,
  reducers: {
    logIn: (state) => {
      return { ...state, isAuth: true };
    },
    logOut: (state) => {
      return { ...state, isAuth: false };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const createLogin = createAsyncThunk(
  '@@login/createLogin',
  async (user: IUser, { dispatch }) => {
    fetch('http://localhost:3001/api/auth/login', {
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
        dispatch(logIn());
      })
      .catch((err) => {
        console.log(err);
      });
  },
);

export const createLogOut = createAsyncThunk(
  '@@login/createLogOut',
  async (_, { dispatch }) => {
    localStorage.removeItem('token');
    dispatch(logOut());
  },
);
