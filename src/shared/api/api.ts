import { axioses } from "./axioses";
import { access_token } from "../storage/localStorage";

const API = {
  getCompanies() {
    const accessToken = access_token.get();
    if(!accessToken) throw new Error('Error 401: Unauthorized - token not found')
    return axioses.get('/api/companies', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
  },
  getEquipments() {
    const accessToken = access_token.get();
    if(!accessToken) throw new Error('Error 401: Unauthorized - token not found')
    return axioses.get('/api/equipments', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
  },
  getSupervisors() {
    const accessToken = access_token.get();
    if(!accessToken) throw new Error('Error 401: Unauthorized - token not found')
    return axioses.get('/api/levels/supervisors', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
  },
  getTodayEmployees() {
    const accessToken = access_token.get();
    if(!accessToken) throw new Error('Error 401: Unauthorized - token not found')
    return axioses.get('/api/date/today', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
  },
  checkValidationToken() {
    const accessToken = access_token.get();
    if(!accessToken) throw new Error('Error 401: Unauthorized - token not found')
    return axioses.get('/api/auth/profile', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
  },
  updateTodayEmployees<T extends Record<string, unknown>>(body: T) {
    const accessToken = access_token.get();
    if(!accessToken) throw new Error('Error 401: Unauthorized - token not found')
    return axioses.patch('/api/date/today', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }, body)
  },
  logIn<T extends Record<'email' | 'password', string>>(body: T) {
    return axioses.post('/api/auth/login', {
      'Content-Type': 'application/json',
    }, body)
  }
};

export { API };
