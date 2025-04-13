import './styles/reset.css';
import './styles/global.css';
import { FC } from 'react';
import { ErrorPage } from './../pages/error/ErrorPage';
import { HomePage } from './../pages/home/HomePage';
import { EmployeesPage } from './../pages/employees/ui/employees-page';
import { CarPage } from './../pages/car/CarPage';
import { AuthPage } from './../pages/auth/AuthPage';
import { Outlet, Route, Routes } from 'react-router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { Header } from './ui/header/header';
import { LayoutCheckAuth } from './ui/layout/LayoutCheckAuth';
import { LayoutBase } from './ui/layout/layoutBase/LayoutBase';

registerLocale('ru', ru);

const App: FC = () => {
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

export { App };
