
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

    private async fetcher<T, U extends HeadersInit, K, S extends AbortSignal>(path: T, method: string, headers: U, body?: K, signal?: S): Promise<any> {
            const response = await fetch(this.baseURL + path, {
                method,
                headers,
                ...(body && {body: JSON.stringify(body)}),
                signal
                });
                
                if (!response.ok) {
                    const error: { error: string, message: string, statusCode: number} = await response.json();

                    const castomError = {
                        status: error.statusCode || response.status,
                        reason: response.statusText,
                        message: error.message === 'Unauthorized' ? response.url : error.message
                    }
                    
                    throw castomError
                }
    
            return await response.json();
    }

    public get<T extends string, U extends Record<string, string>, S extends AbortSignal>(path: T, headers: U, signal?: S) {
        return this.fetcher(path, METHOD.GET, headers, signal)
    }

    public post<T extends string, U extends Record<string, string>, K extends Record<string, unknown>, S extends AbortSignal>(path: T, headers: U, body: K, signal?: S) {
        return this.fetcher(path, METHOD.POST, headers, body, signal)
    }

    public put<T extends string, U extends Record<string, string>, K extends Record<string, unknown>, S extends AbortSignal>(path: T, headers: U, body: K, signal?: S) {
        return this.fetcher(path, METHOD.PUT, headers, body, signal)
    }

    public patch<T extends string, U extends Record<string, string>, K extends Record<string, unknown>, S extends AbortSignal>(path: T, headers: U, body: K, signal?: S) {
        return this.fetcher(path, METHOD.PATCH, headers, body, signal)
    }
}

export const axioses = new API(BASE_URL);
