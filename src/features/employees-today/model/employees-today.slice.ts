import { API } from '@/shared/api/api';
import {
    TCompany,
    TDataEmployee,
    TEmployee,
    TEquipment,
    TProfession,
    TSupervisor,
} from '@/shared/model/types/employee-list-today';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TEmployeesState = {
    employees: TEmployee[];
    companies: TCompany[];
    equipments: TEquipment[];
    supervisors: TSupervisor[];
    professions: TProfession[];
    places: string[];
    status: 'loading' | 'success' | 'error';
    error: string;
    savingIdCardEmployees: number[];
    filters: Partial<TEmployee>;
    searchData: string;
};

const initialEmployeesState: TEmployeesState = {
    employees: [],
    companies: [],
    equipments: [],
    supervisors: [],
    professions: [],
    places: ['В офисе', 'На выезде'],
    status: 'loading',
    error: '',
    savingIdCardEmployees: [],
    filters: {},
    searchData: '',
};

export const employeesSlice = createSlice({
    name: '@@employees',
    initialState: initialEmployeesState,
    reducers: {
        setFilters: (state, action) => {
            if (!Object.keys(action.payload).length) return { ...state, filters: {} };

            const newFilters = { ...state.filters, ...action.payload };

            for (const key in newFilters) {
                if (newFilters[key] === null) delete newFilters[key];
            }

            return { ...state, filters: { ...newFilters } };
        },
        setSearchData: (state, action) => {
            return { ...state, searchData: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeesDataToday.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(getEmployeesDataToday.fulfilled, (state, action) => {
                state.status = 'success';
                action.payload.forEach((item) => {
                    if ('companies' in item) state.companies = item.companies;
                    if ('equipments' in item) state.equipments = item.equipments;
                    if ('supervisors' in item) state.supervisors = item.supervisors;
                    if ('users' in item) state.employees = item.users;
                    if ('professions' in item) state.professions = item.professions;
                });
            })
            .addCase(getEmployeesDataToday.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) state.error = action.error.message;
            })
            .addCase(saveEmployeeData.pending, (state, action) => {
                const { id } = action.meta.arg;
                state.savingIdCardEmployees.push(id);
            })
            .addCase(saveEmployeeData.fulfilled, (state, action) => {
                const updatedEmployees = state.employees.map((employee) => {
                    if (action.payload.id !== employee.id) return employee;
                    return { ...employee, ...action.payload };
                });

                state.employees = updatedEmployees;
            })
            .addMatcher(saveEmployeeData.settled, (state, action) => {
                const { id } = action.meta.arg;
                const arrIds = state.savingIdCardEmployees;

                const indexIdToDelete = arrIds.indexOf(id);
                const arrIdsBeforeItem = arrIds.slice(0, indexIdToDelete);
                const arrIdsAfterItem = arrIds.slice(indexIdToDelete + 1);
                state.savingIdCardEmployees = [...arrIdsBeforeItem, ...arrIdsAfterItem];
            });
    },
});

export const { setFilters, setSearchData } = employeesSlice.actions;

export const saveEmployeeData = createAsyncThunk(
    '@@employees/saveEmployeeData',
    async (employee: TDataEmployee, { signal }) => {
        return API.updateTodayEmployee(employee, signal);
    },
);

export const getEmployeesDataToday = createAsyncThunk('@@employees/getEmployeesDataToday', async () => {
    return Promise.all([
        API.getCompanies(),
        API.getEquipments(),
        API.getSupervisors(),
        API.getTodayEmployees(),
        API.getProfessions(),
    ]);
});
