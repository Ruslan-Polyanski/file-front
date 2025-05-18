import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getEmployeesDataToday } from './employees-today.slice';
import { useAppDispatch } from '@/app/store';
import { memoizedSelectorFilteredEmployees, selectorError, selectorProfessions, selectorStatus } from './selectors';

export const useEmployeeListToday = () => {
    const dispatch = useAppDispatch();

    const professions = useSelector(selectorProfessions);
    const status = useSelector(selectorStatus);
    const error = useSelector(selectorError);
    const filteredEmployees = useSelector(memoizedSelectorFilteredEmployees);

    useEffect(() => {
        dispatch(getEmployeesDataToday());
    }, []);

    return {
        filteredEmployees,
        professions,
        status,
        error,
    };
};
