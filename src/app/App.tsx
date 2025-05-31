import './styles/reset.css';
import './styles/global.css';
import { FC } from 'react';
import { ErrorPage } from '../pages/error/error-page';
import { HomePage } from '../pages/home/home-page';
import { CarPage } from '../pages/car/car-page';
import { Outlet, Route, Routes } from 'react-router';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { Header } from '../widgets/header/ui/header/header';
import { EmployeesPage } from '@/pages/employees/employees-page';
import { CheckAuth } from './check-auth';
import { useAppInterceptors } from './use-app-Interceptors';
import { Layout } from '@/shared/ui/layout/layout';

registerLocale('ru', ru);

const App: FC = () => {
    useAppInterceptors();

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
