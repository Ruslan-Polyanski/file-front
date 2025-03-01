import { axioses } from "./axioses";

const API = {
  async getCompanies() {
    return await axioses.get('/api/companies');
  },
  async getEquipments() {
    return await axioses.get('/api/equipments')
  },
  async getSupervisors() {
    return await axioses.get('/api/levels/supervisors')
  },
  async getTodayEmployees() {
    return await axioses.get('/api/date/today')
  },
  async updateTodayEmployees(body: Record<string, unknown>) {
    return await axioses.patch('/api/date/today', body)
  }
};

export { API };
