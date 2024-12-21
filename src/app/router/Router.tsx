import { createBrowserRouter } from 'react-router';
import { Layout } from '../layout/Layout';
import { ErrorPage } from '../../pages/error/ErrorPage';
import { HomePage } from '../../pages/home/HomePage';
import { ProfilePage } from '../../pages/profile/ProfilePage';
import { EmployeesPage } from '../../pages/employees/EmployeesPage';
import { CarPage } from '../../pages/car/CarPage';
import { AuthPage } from '../../pages/auth/AuthPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'employees',
          element: <EmployeesPage />,
        },
        {
          path: 'car',
          element: <CarPage />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: 'login',
      element: <AuthPage />,
    },
  ],
  { basename: '/file-front' },
);

export { router };
