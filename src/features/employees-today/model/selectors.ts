import { RootState } from '@/app/store';
import { filterData } from '@/shared/lib/utils/filter-data';
import { createSelector } from '@reduxjs/toolkit';

export const selectorCompanies = (state: RootState) => state.employees.companies;
export const selectorEquipments = (state: RootState) => state.employees.equipments;
export const selectorSupervisors = (state: RootState) => state.employees.supervisors;
export const selectorProfessions = (state: RootState) => state.employees.professions;
export const selectorStatus = (state: RootState) => state.employees.status;
export const selectorError = (state: RootState) => state.employees.error;
export const selectorEmployees = (state: RootState) => state.employees.employees;
export const selectorPlaces = (state: RootState) => state.employees.places;
export const selectorSearchData = (state: RootState) => state.employees.searchData;
export const selectorFilters = (state: RootState) => state.employees.filters;
export const selectorSavingIdCardEmployees = (id: number) => (state: RootState) =>
    state.employees.savingIdCardEmployees.includes(id);

export const memoizedSelectorFilteredEmployees = createSelector(
    [selectorEmployees, selectorFilters, selectorSearchData],
    (employees, filters, searchData) => {
        const filteredData = filterData(employees, filters);
        return searchData
            ? filteredData.filter((item) => item.fullName.toUpperCase().includes(searchData.toUpperCase()))
            : filteredData;
    },
);
