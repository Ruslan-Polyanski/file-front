import {
    TCompany,
    TDataEmployee,
    TEmployee,
    TEquipment,
    TProfession,
    TSupervisor,
    TUpdatedTodayEmployee,
} from '../model/types/employee-list-today';
import { TUserResponse } from '../model/types/auth';

import axios from 'axios';

export const axiosAPI = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const API = {
    async getCompanies<S extends AbortSignal>(signal?: S): Promise<Record<'companies', TCompany[]>> {
        const response = await axiosAPI.get('/api/companies', {
            signal,
        });
        return response.data;
    },
    async getEquipments<S extends AbortSignal>(signal?: S): Promise<Record<'equipments', TEquipment[]>> {
        const response = await axiosAPI.get('/api/equipments', {
            signal,
        });
        return response.data;
    },
    async getSupervisors<S extends AbortSignal>(signal?: S): Promise<Record<'supervisors', TSupervisor[]>> {
        const response = await axiosAPI.get('/api/levels/supervisors', {
            signal,
        });
        return response.data;
    },
    async getTodayEmployees<S extends AbortSignal>(signal?: S): Promise<Record<'users', TEmployee[]>> {
        const response = await axiosAPI.get('/api/date/today', {
            signal,
        });
        return response.data;
    },
    async getProfessions<S extends AbortSignal>(signal?: S): Promise<Record<'professions', TProfession[]>> {
        const response = await axiosAPI.get('/api/professions', {
            signal,
        });
        return response.data;
    },
    async checkValidationToken<S extends AbortSignal>(signal?: S): Promise<TUserResponse> {
        const response = await axiosAPI.get('/api/auth/profile', {
            signal,
        });
        return response.data;
    },
    async updateTodayEmployee<T extends TDataEmployee, S extends AbortSignal>(
        body: T,
        signal?: S,
    ): Promise<TUpdatedTodayEmployee> {
        const response = await axiosAPI.patch('/api/date/today', body, {
            signal,
        });
        return response.data;
    },
    async logIn<T extends Record<'email' | 'password', string>, S extends AbortSignal>(
        body: T,
        signal?: S,
    ): Promise<TUserResponse> {
        const response = await axiosAPI.post('/api/auth/login', body, { signal });

        return response.data;
    },
    async refresh(): Promise<TUserResponse> {
        const response = await axiosAPI.post('/api/auth/refresh');

        return response.data;
    },
};
