import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Error } from '../../pages/error/Error';
import { Home } from '../../pages/home/Home';
import { Profile } from '../../pages/profile/Profile';
import { Employees } from '../../pages/employees/Employees';
import { Car } from '../../pages/car/Car';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'car',
        element: <Car />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export { router };
