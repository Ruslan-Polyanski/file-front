import './styles/reset.css';
import './styles/global.css';
import { FC } from 'react';
import { ErrorPage } from './../pages/error/ErrorPage';
import { HomePage } from './../pages/home/HomePage';
import { CarPage } from './../pages/car/CarPage';
import { Outlet, Route, Routes } from 'react-router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { Header } from './ui/header/header';
import { Layout } from './ui/layout/layout/Layout';
import { EmployeesPage } from '@/pages/employees/employees-page';
import { CheckAuth } from './ui/layout/CheckAuth';

registerLocale('ru', ru);

const App: FC = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <CheckAuth>
                        <Layout header={<Header />} outlet={<Outlet />} />
                    </CheckAuth>
                }
            >
                <Route index element={<HomePage />} />
                <Route path='employees' element={<EmployeesPage />} />
                <Route path='car' element={<CarPage />} />
            </Route>

            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};

export { App };
