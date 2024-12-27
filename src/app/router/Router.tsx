import { Layout } from '../layout/Layout';
import { ErrorPage } from '../../pages/error/ErrorPage';
import { HomePage } from '../../pages/home/HomePage';
import { EmployeesPage } from '../../pages/employees/EmployeesPage';
import { CarPage } from '../../pages/car/CarPage';
import { AuthPage } from '../../pages/auth/AuthPage';
import { Route, Routes } from 'react-router';

const Router = () => {
  return (
    <Routes>
      <Route path="file-front">
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="car" element={<CarPage />} />
        </Route>

        <Route path="login" element={<AuthPage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
