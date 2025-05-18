import { access_token, refresh_token } from '../model/local-storage';

const BASE_URL = 'http://localhost:3001';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const;

class API {
    private readonly baseURL: string;
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async fetcher<T, U extends HeadersInit, K, S extends AbortSignal>(
        path: T,
        method: string,
        headers: U,
        body?: K,
        signal?: S,
    ): Promise<any> {
        const response = await fetch(this.baseURL + path, {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) }),
            signal,
        });

        if (!response.ok) {
            if (response.status === 401) {
                const refreshToken = refresh_token.get();
                const response = await fetch('http://localhost:3001/api/auth/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${refreshToken}`,
                    },
                    body: JSON.stringify({
                        id: 5,
                        email: 'guyda@guyda.com',
                    }),
                });

                if (!response.ok) {
                    console.log('logount');
                    throw new Error('Logout');
                }
                const result = await response.json();
                access_token.set(result.accessToken);
                refresh_token.set(result.refreshToken);
            }
            // const error: { error: string; message: string; statusCode: number } = await response.json();

            // const castomError = {
            //     status: error.statusCode || response.status,
            //     reason: response.statusText,
            //     message: error.message === 'Unauthorized' ? response.url : error.message,
            // };

            // throw castomError;
        }

        return await response.json();
    }

    public get<T extends string, U extends Record<string, string>, S extends AbortSignal>(
        path: T,
        headers: U,
        signal?: S,
    ) {
        return this.fetcher(path, METHOD.GET, headers, signal);
    }

    public post<
        T extends string,
        U extends Record<string, string>,
        K extends Record<string, unknown>,
        S extends AbortSignal,
    >(path: T, headers: U, body: K, signal?: S) {
        return this.fetcher(path, METHOD.POST, headers, body, signal);
    }

    public put<
        T extends string,
        U extends Record<string, string>,
        K extends Record<string, unknown>,
        S extends AbortSignal,
    >(path: T, headers: U, body: K, signal?: S) {
        return this.fetcher(path, METHOD.PUT, headers, body, signal);
    }

    public patch<
        T extends string,
        U extends Record<string, string>,
        K extends Record<string, unknown>,
        S extends AbortSignal,
    >(path: T, headers: U, body: K, signal?: S) {
        return this.fetcher(path, METHOD.PATCH, headers, body, signal);
    }
}

export const axioses = new API(BASE_URL);
