import { access_token, LocalStorage } from "../storage/localStorage";

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
    private readonly accessToken: LocalStorage;

    constructor(baseURL: string, access_token: LocalStorage) {
        this.baseURL = baseURL;
        this.accessToken = access_token;
    }

    private async fetcher<T>(path: string, method: string, body?: T): Promise<any> {
        const accessToken = this.accessToken.get();

        if(accessToken) {
            const response = await fetch(this.baseURL + path, {
                method,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                ...(body && {body: JSON.stringify(body)})
              });
    
              if (!response.ok) {
                throw new Error(
                  `Status text: ${response.statusText}, 
                  status: ${response.status}, 
                  response url: ${response.url}`,
                );
              }
    
            return await response.json();
        }

        return Promise.reject('Token is not available')

    }

    public async get(path: string) {
        return await this.fetcher(path, METHOD.GET)
    }

    public async post<T>(path: string, body: T) {
        return await this.fetcher(path, METHOD.POST, body)
    }

    public async put<T>(path: string, body: T) {
        return await this.fetcher(path, METHOD.PUT, body)
    }

    public async patch<T>(path: string, body: T) {
        return await this.fetcher(path, METHOD.PATCH, body)
    }
    
}

export const axioses = new API(BASE_URL, access_token);
