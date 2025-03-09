import { LayoutBase } from '../layout/layoutBase/LayoutBase';
import { ErrorPage } from '../../pages/error/ErrorPage';
import { HomePage } from '../../pages/home/HomePage';
import { EmployeesPage } from '../../pages/employees/EmployeesPage';
import { CarPage } from '../../pages/car/CarPage';
import { AuthPage } from '../../pages/auth/AuthPage';
import { Outlet, Route, Routes } from 'react-router';
import { Header } from '../ui/header/Header';
import { LayoutCheckAuth } from '../layout/LayoutCheckAuth';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutCheckAuth />}>
        <Route element={<LayoutBase header={<Header />} outlet={<Outlet />} />}>
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
