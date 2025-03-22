import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { access_token } from '../../shared/storage/localStorage';
import { API } from '../../shared/api/api';

interface IAuthState {
  id: number | null;
  isAuth: boolean;
  isLoader: boolean;
  errorAuth: string;
  email: string;
  password: string;
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
  id: null,
  isAuth: false,
  isLoader: true,
  errorAuth: '',
  email: '',
  password: '',
};

export const authSlice = createSlice({
  name: '@@Auth',
  initialState: initialAuthState,
  reducers: {
    setId: (state, action) => {
      return { ...state, id: action.payload };
    },
    setIsAuth: (state, action) => {
      return { ...state, isAuth: action.payload };
    },
    setIsLoader: (state, action) => {
      return { ...state, isLoader: action.payload };
    },
    setErrorAuth: (state, action) => {
      return { ...state, errorAuth: action.payload };
    },
    setEmail: (state, action) => {
      return { ...state, email: action.payload }
    },
    setPassword: (state, action) => {
      return { ...state, password: action.payload }
    }
  },
});

export const { setIsAuth, setIsLoader, setErrorAuth, setEmail, setPassword, setId } = authSlice.actions;

export const logIn = createAsyncThunk(
  '@@Auth/logIn',
  async (user: IUser, { dispatch }) => {
    try {
      dispatch(setIsLoader(true));
      const data: IUserResponse = await API.logIn(user)
      const { token, id } = data;
      access_token.set(token)
      dispatch(setId(id))
      dispatch(setIsAuth(true));
      dispatch(setErrorAuth(''));
      dispatch(setPassword(''));
    } catch (error: any) {
      const messageError = error.status + ' ' + error.reason + ' ' + error.message;
        dispatch(setErrorAuth(messageError));
    } finally {
      dispatch(setIsLoader(false));
    }
  }
);

export const checkAuth = createAsyncThunk(
  '@@Auth/checkAuth',
  async (_, { dispatch }) => {
      try {
        dispatch(setIsLoader(true));
        await API.checkValidationToken();
        dispatch(setIsAuth(true));
      } catch(error) {
        dispatch(setErrorAuth(''));
      } finally {
        dispatch(setIsLoader(false));
      }
    }
);

export const logOut = createAsyncThunk(
  '@@Auth/logOut',
  async (_, { dispatch }) => {
    access_token.delete()
    dispatch(setId(null))
    dispatch(setIsAuth(false));
    dispatch(setEmail(''));
    dispatch(setPassword(''))
  },
);
