import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getEmployeesData, setFilters } from '../model/employees-page.slice';
import { filterData } from '../../../shared/utils/filter-data';

export const useEmployeesToday = () => {
    const dispatch: AppDispatch = useDispatch();
    
    const filters = useSelector((state: RootState) => state.employees.filters);
    const companies = useSelector((state: RootState) => state.employees.companies);
    const equipments = useSelector((state: RootState) => state.employees.equipments);
    const supervisors = useSelector((state: RootState) => state.employees.supervisors);
    const isLoaderPage = useSelector((state: RootState) => state.employees.isLoaderPage);
    const professions = useSelector((state: RootState) => state.employees.professions);
    const places = useSelector((state: RootState) => state.employees.places);
    const filteredEmployees = useSelector((state: RootState) => filterData(state.employees.employees, state.employees.filters));

    const handleChangeFilters = (data: Record<string, unknown>) => {
      dispatch(setFilters(data))
    }

    const handleClickResetFilters = () => {
      dispatch(setFilters({}))
    }

    useEffect(() => {
      const promiseThunk = dispatch(getEmployeesData());

      return () => {
        dispatch(setFilters({}))
        promiseThunk.abort()
      }
    }, []);

    return { filters,
             filteredEmployees,
             companies, 
             equipments, 
             supervisors, 
             isLoaderPage, 
             professions, 
             places,
             handleChangeFilters,
             handleClickResetFilters }
}


