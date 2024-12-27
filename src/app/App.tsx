import './styles/reset.css';
import './styles/global.css';
import { FC, useEffect } from 'react';

import { Router } from './router/Router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

import { Loader } from '../shared/ui/loader/Loader';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { createCheckAuth } from '../pages/auth/authPage.slice';
import { AuthPage } from '../pages/auth/AuthPage';

registerLocale('ru', ru);

const App: FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isLoader = useSelector((state: RootState) => state.auth.isLoader);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(createCheckAuth());
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

  return isAuth ? <Router /> : <AuthPage />;
};

export { App };
