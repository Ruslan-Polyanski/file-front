import './styles/reset.css';
import './styles/global.css';
import { FC } from 'react';

import { Router } from './router/Router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

registerLocale('ru', ru);

const App: FC = () => {
  return <Router />;
};

export { App };
