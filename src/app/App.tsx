import './styles/reset.css';
import './styles/global.css';
import { FC, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

import { LocalStorage } from '../shared/storage/localStorage';
import { AuthorizationForm } from '../widgets/forms/AuthorizationForm';
import { Loader } from '../shared/ui/loader/Loader';
import Box from '@mui/material/Box';

registerLocale('ru', ru);

interface IUserResponse {
  id: number;
  email: string;
  token: string;
}

const App: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);

  useEffect(() => {
    const access_token = LocalStorage.getItem('token');
    console.log(access_token);
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
            setIsLogin(true);
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

  return (
    <>
      {isLoader ? (
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
      ) : isLogin ? (
        <RouterProvider router={router} />
      ) : (
        <AuthorizationForm setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export { App };
