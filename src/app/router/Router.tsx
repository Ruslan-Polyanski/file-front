import { Layout } from '../layout/Layout';
import { ErrorPage } from '../../pages/error/ErrorPage';
import { HomePage } from '../../pages/home/HomePage';
import { EmployeesPage } from '../../pages/employees/EmployeesPage';
import { CarPage } from '../../pages/car/CarPage';
import { AuthPage } from '../../pages/auth/AuthPage';
import { Outlet, Route, Routes } from 'react-router';
import { Header } from '../ui/header/Header';
import { BaseLayout } from '../layout/BaseLayout';

const Router = () => {
  return (
    <Routes>
      <Route path="file-front" element={<BaseLayout />}>
        <Route element={<Layout header={<Header />} outlet={<Outlet />} />}>
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
