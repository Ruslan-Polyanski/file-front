import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorage } from '../../shared/storage/localStorage';

interface IAuthState {
  isAuth: boolean;
  isLoader: boolean;
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
  },
});

export const { setIsAuth, setIsLoader } = authSlice.actions;

export const createLogin = createAsyncThunk(
  '@@Auth/createLogin',
  async (user: IUser, { dispatch }) => {
    fetch('/api/auth/login', {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
);

export const createCheckAuth = createAsyncThunk(
  '@@Auth/createCheckAuth',
  async (_, { dispatch }) => {
    const access_token = LocalStorage.getItem('token');

    if (access_token) {
      fetch('/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            dispatch(setIsAuth(true));
            return response.json();
          } else {
            throw new Error('Your token is destroy');
          }
        })
        .then((data: Omit<IUserResponse, 'token'>) => {
          const { id, email } = data;
          console.log(id, email);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(setIsLoader(false));
        });
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
