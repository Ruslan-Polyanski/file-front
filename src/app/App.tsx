import './styles/reset.css';
import './styles/global.css';
import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { LStorage } from '../shared/storage/localStorage';

registerLocale('ru', ru);

const App: FC = () => {
  useEffect(() => {
    const access_token = LStorage.getItem('access_token');
    if (access_token) {
      console.log(access_token);
    } else {
      console.log('effect app');
    }
  }, []);
  return <RouterProvider router={router} />;
};

export { App };
