import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getEmployeesData, setFilters, setSearchData } from '../model/employees-page.slice';
import { filterData } from '../../../shared/lib/utils/filter-data';
import { createSelector } from '@reduxjs/toolkit';

const selectorCompanies = (state: RootState) => state.employees.companies;
const selectorEquipments = (state: RootState) => state.employees.equipments;
const selectorSupervisors = (state: RootState) => state.employees.supervisors;
const selectorProfessions = (state: RootState) => state.employees.professions;
const selectorPlaces = (state: RootState) => state.employees.places;

const selectorSearchData = (state: RootState) => state.employees.searchData;
const selectorFilters = (state: RootState) => state.employees.filters;
const selectorEmployees = (state: RootState) => state.employees.employees;

const memoizedSelectorFilteredEmployees = createSelector([selectorEmployees, selectorFilters], (employees, filters) =>
    filterData(employees, filters),
);

export const useEmployeesToday = () => {
    const dispatch: AppDispatch = useDispatch();

    const searchData = useSelector(selectorSearchData);
    const filters = useSelector(selectorFilters);
    const companies = useSelector(selectorCompanies);
    const equipments = useSelector(selectorEquipments);
    const supervisors = useSelector(selectorSupervisors);
    const professions = useSelector(selectorProfessions);
    const places = useSelector(selectorPlaces);
    const filteredEmployees = useSelector(memoizedSelectorFilteredEmployees);

    const resultFilteredEmployees = searchData
        ? filteredEmployees.filter((item) => item.fullName.toUpperCase().includes(searchData.toUpperCase()))
        : filteredEmployees;

    const [valueSearchInput, setValueSearchInput] = useState('');

    const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValueSearchInput(event.target.value);
    };

    const handleChangeFilters = (data: Record<string, unknown>) => {
        dispatch(setFilters(data));
    };

    const handleClickResetFilters = () => {
        if (Object.keys(filters).length) dispatch(setFilters({}));
        if (valueSearchInput) setValueSearchInput('');
        if (searchData) dispatch(setSearchData(''));
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (searchData !== valueSearchInput) dispatch(setSearchData(valueSearchInput));
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [valueSearchInput]);

    useEffect(() => {
        const promiseThunk = dispatch(getEmployeesData());

        return () => {
            dispatch(setFilters({}));
            promiseThunk.abort();
        };
    }, []);

    return {
        filters,
        resultFilteredEmployees,
        companies,
        equipments,
        supervisors,
        professions,
        places,
        valueSearchInput,
        handleChangeSearchInput,
        handleChangeFilters,
        handleClickResetFilters,
    };
};
