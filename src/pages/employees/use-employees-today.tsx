import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import { getEmployeesData } from './employeesPage.slice';

export const useEmployeesToday = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.employees.users);
    const companies = useSelector((state: RootState) => state.employees.companies);
    const equipments = useSelector((state: RootState) => state.employees.equipments);
    const supervisors = useSelector((state: RootState) => state.employees.supervisors);
    const isLoaderPage = useSelector((state: RootState) => state.employees.isLoaderPage);
    
    useEffect(() => {
      dispatch(getEmployeesData());
    }, []);

    return { users, companies, equipments, supervisors, isLoaderPage }
}