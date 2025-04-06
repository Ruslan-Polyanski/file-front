import { axioses } from "./axioses";
import { access_token } from "../storage/local-storage";

const errorEmptyToken = {
  status: 401,
  reason: 'Unauthorized',
  message: 'token not found',
}

const API = {
  getCompanies<S extends AbortSignal>(signal?: S) {
    const accessToken = access_token.get();
    if(!accessToken) throw errorEmptyToken
    return axioses.get('/api/companies', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }, signal)
  },
  getEquipments<S extends AbortSignal>(signal?: S) {
    const accessToken = access_token.get();
    if(!accessToken) throw errorEmptyToken
    return axioses.get('/api/equipments', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }, signal)
  },
  getSupervisors<S extends AbortSignal>(signal?: S) {
    const accessToken = access_token.get();
    if(!accessToken) throw errorEmptyToken
    return axioses.get('/api/levels/supervisors', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }, signal)
  },
  getTodayEmployees<S extends AbortSignal>(signal?: S) {
    const accessToken = access_token.get();
    if(!accessToken) throw errorEmptyToken
    return axioses.get('/api/date/today', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }, signal)
  },
  getProfessions<S extends AbortSignal>(signal?: S) {
    const accessToken = access_token.get();
    if(!accessToken) throw errorEmptyToken
    return axioses.get('/api/professions', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }, signal)
  },
  checkValidationToken<S extends AbortSignal>(signal?: S) {
    const accessToken = access_token.get();
    if(!accessToken) throw errorEmptyToken
    return axioses.get('/api/auth/profile', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }, signal)
  },
  updateTodayEmployees<T extends Record<string, unknown>, S extends AbortSignal>(body: T, signal?: S) {
    const accessToken = access_token.get();
    if(!accessToken) throw errorEmptyToken
    return axioses.patch('/api/date/today', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }, body, signal)
  },
  logIn<T extends Record<'email' | 'password', string>, S extends AbortSignal>(body: T, signal?: S) {
    return axioses.post('/api/auth/login', {
      'Content-Type': 'application/json',
    }, body, signal)
  }
};

export { API };
