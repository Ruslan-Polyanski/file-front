import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getEmployeesDataToday } from './employees-today.slice';
import { useAppDispatch } from '@/app/store';
import {
    memoizedSelectorFilteredEmployees,
    selectorCompanies,
    selectorEquipments,
    selectorError,
    selectorProfessions,
    selectorStatus,
    selectorSupervisors,
} from './selectors';

export const useEmployeeListToday = () => {
    const dispatch = useAppDispatch();

    const companies = useSelector(selectorCompanies);
    const equipments = useSelector(selectorEquipments);
    const supervisors = useSelector(selectorSupervisors);
    const professions = useSelector(selectorProfessions);
    const status = useSelector(selectorStatus);
    const error = useSelector(selectorError);
    const filteredEmployees = useSelector(memoizedSelectorFilteredEmployees);

    useEffect(() => {
        dispatch(getEmployeesDataToday());
    }, []);

    return {
        filteredEmployees,
        companies,
        equipments,
        supervisors,
        professions,
        status,
        error,
    };
};
