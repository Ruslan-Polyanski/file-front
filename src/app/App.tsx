import './styles/reset.css';
import './styles/global.css';
import { FC, useEffect, useState } from 'react';

import { router } from './router/Router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

import { LocalStorage } from '../shared/storage/localStorage';
import { Loader } from '../shared/ui/loader/Loader';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { logIn } from '../pages/auth/authPage.slice';
import { AuthPage } from '../pages/auth/AuthPage';
import { RouterProvider } from 'react-router';

registerLocale('ru', ru);

interface IUserResponse {
  id: number;
  email: string;
  token: string;
}

const App: FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch: AppDispatch = useDispatch();

  const [isLoader, setIsLoader] = useState<boolean>(true);

  useEffect(() => {
    const access_token = LocalStorage.getItem('token');

    if (access_token) {
      fetch('http://localhost:3001/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            dispatch(logIn());
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
          setIsLoader(false);
        });
    } else {
      setIsLoader(false);
    }
  }, []);

  if (isLoader) {
    return (
      <Box
        marginTop={10}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </Box>
    );
  }

  return isAuth ? <RouterProvider router={router} /> : <AuthPage />;
};

export { App };
