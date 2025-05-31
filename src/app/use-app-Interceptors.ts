import { logOut } from '@/features/auth/model/auth.slice';
import { API, axiosAPI } from '@/shared/api/api';
import { access_token, refresh_token } from '@/shared/model/local-storage';
import { useLayoutEffect } from 'react';
import { store, useAppDispatch } from './store';

export const useAppInterceptors = () => {
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        axiosAPI.interceptors.request.use(
            (config) => {
                if (config.url === '/api/auth/login') return config;

                if (config.url === '/api/auth/refresh') {
                    config.headers['x-refresh-token'] = refresh_token.get();
                    return config;
                }

                config.headers['Authorization'] = `Bearer ${access_token.get()}`;
                return config;
            },
            (error) => {
                return Promise.resolve(error);
            },
        );

        let isRefreshing = false;
        let failedRequestsQueue: (() => void)[] = [];

        axiosAPI.interceptors.response.use(
            (response) => response,
            async (error) => {
                const { config: originalRequest } = error;

                if (error.response.status === 401) {
                    if (originalRequest.url === '/api/auth/refresh') {
                        isRefreshing = false;
                        failedRequestsQueue = [];

                        const isAuth = store.getState().auth.isAuth;

                        if (isAuth) {
                            dispatch(logOut());
                        }

                        return Promise.reject('Error: refresh token expired');
                    }

                    if (isRefreshing) {
                        return new Promise((res) => {
                            failedRequestsQueue.push(() => res(axiosAPI(originalRequest)));
                        });
                    }

                    isRefreshing = true;

                    try {
                        const response = await API.refresh();

                        const { accessToken, refreshToken } = response;
                        access_token.set(accessToken);
                        refresh_token.set(refreshToken);

                        return axiosAPI(originalRequest);
                    } catch (error) {
                        return Promise.reject(error);
                    } finally {
                        isRefreshing = false;
                        failedRequestsQueue.forEach((callBack) => callBack());
                        failedRequestsQueue = [];
                    }
                }

                return Promise.reject(error);
            },
        );
    }, []);
};
