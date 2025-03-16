
// const BASE_URL = 'http://89.111.153.176';
const BASE_URL = 'http://localhost:3001';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
} as const;

class API {
    private readonly baseURL: string;
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async fetcher<T, U extends HeadersInit, K>(path: T, method: string, headers: U, body?: K): Promise<any> {
        const response = await fetch(this.baseURL + path, {
            method,
            headers,
            ...(body && {body: JSON.stringify(body)})
            });
            
            if (!response.ok) {
                const error: { error: string, message: string, statusCode: number} = await response.json();
                if(error.error && error.message && error.statusCode) {
                    throw new Error(`Error ${error.statusCode}: ${error.error} - ${error.message}`)
                }

                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

        return await response.json();
    }

    public get<T extends string, U extends Record<string, string>>(path: T, headers: U) {
        return this.fetcher(path, METHOD.GET, headers)
    }

    public post<T extends string, U extends Record<string, string>, K extends Record<string, unknown>>(path: T, headers: U, body: K) {
        return this.fetcher(path, METHOD.POST, headers, body)
    }

    public put<T extends string, U extends Record<string, string>, K extends Record<string, unknown>>(path: T, headers: U, body: K) {
        return this.fetcher(path, METHOD.PUT, headers, body)
    }

    public patch<T extends string, U extends Record<string, string>, K extends Record<string, unknown>>(path: T, headers: U, body: K) {
        return this.fetcher(path, METHOD.PATCH, headers, body)
    }
}

export const axioses = new API(BASE_URL);
