import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import { getEmployeesData, TEmployee, setFilters } from './employeesPage.slice';
import { filterData } from '../../shared/utils/filter-data';

export const useEmployeesToday = () => {
    const dispatch: AppDispatch = useDispatch();
    
    const employees = useSelector((state: RootState) => state.employees.employees);
    const filters = useSelector((state: RootState) => state.employees.filters);
    const companies = useSelector((state: RootState) => state.employees.companies);
    const equipments = useSelector((state: RootState) => state.employees.equipments);
    const supervisors = useSelector((state: RootState) => state.employees.supervisors);
    const isLoaderPage = useSelector((state: RootState) => state.employees.isLoaderPage);
    const professions = useSelector((state: RootState) => state.employees.professions);

    const [filteredEmployees, setFilteredEmployees] = useState<TEmployee[]>([])

    const handleChangeFilters = (data: Record<string, unknown>) => {
      dispatch(setFilters(data))
    }
    
    useEffect(() => {
      const promise = dispatch(getEmployeesData());

      return () => {
        promise.abort()
      }
    }, []);

    useEffect(() => {
      const filteredData = filterData(employees, filters) as TEmployee[]
      setFilteredEmployees(filteredData)
    }, [employees, filters])

    return { employees, filteredEmployees, companies, equipments, supervisors, isLoaderPage, professions, handleChangeFilters }
}