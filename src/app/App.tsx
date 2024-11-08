import './styles/reset.css';
import './styles/global.css';
import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

registerLocale('ru', ru);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export { App };
