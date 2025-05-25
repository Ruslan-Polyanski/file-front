import { access_token, refresh_token } from '../model/local-storage';
import {
    TCompany,
    TDataEmployee,
    TEmployee,
    TEquipment,
    TProfession,
    TSupervisor,
    TUpdatedTodayEmployee,
} from '../model/types/employee-list-today';
import { TUserRefreshToken, TUserResponse } from '../model/types/auth';

import axios from 'axios';
import { store } from '@/app/store';

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
    async refresh<T extends TUserRefreshToken, S extends AbortSignal>(body: T, signal?: S): Promise<TUserResponse> {
        const response = await axiosAPI.post('/api/auth/refresh', body, { signal });

        return response.data;
    },
};

axiosAPI.interceptors.request.use(
    (config) => {
        if (config.url === '/api/auth/login') return config;

        if (config.url === '/api/auth/refresh') {
            config.headers['Authorization'] = `Bearer ${refresh_token.get()}`;
            return config;
        }

        config.headers['Authorization'] = `Bearer ${access_token.get()}`;
        return config;
    },
    (error) => {
        return Promise.resolve(error);
    },
);

let countRefresh = 0;
let isRefreshing = false;
let failedRequestsQueue: (() => void)[] = [];

axiosAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config: originalRequest } = error;
        console.log(originalRequest);
        if (error.status === 401 && !originalRequest._retry && countRefresh < 1) {
            if (isRefreshing) {
                console.log('isRefreshing');
                return new Promise((res) => {
                    failedRequestsQueue.push(() => res(axiosAPI(originalRequest)));
                });
            }

            console.log('try');
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                countRefresh++;
                const response = await API.refresh({ id: 5, email: 'guyda@guyda.com' });
                console.log('response: ' + response);
                const { accessToken, refreshToken } = response;
                access_token.set(accessToken);
                refresh_token.set(refreshToken);

                return axiosAPI(originalRequest);
            } catch (error) {
                console.log('error');
                access_token.delete();
                refresh_token.delete();
                const state = store.getState();
                console.log(state);
            } finally {
                console.log('finally');
                isRefreshing = false;
                failedRequestsQueue.forEach((callBack) => callBack());
                failedRequestsQueue = [];
            }
        }
        return Promise.reject(error);
    },
);
