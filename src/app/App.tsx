import './styles/reset.css';
import './styles/global.css';
import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export { App };
