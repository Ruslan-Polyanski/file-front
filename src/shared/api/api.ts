const BASE_URL = 'http://localhost:3001';

type TToken = string;

const API = {
  getCompanies: async (access_token: TToken) => {
    const response = await fetch(BASE_URL + '/api/companies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Status text: ${response.statusText}, 
        status: ${response.status}, 
        response url: ${response.url}`,
      );
    }

    return await response.json();
  },

  getEquipments: async (access_token: TToken) => {
    const response = await fetch(BASE_URL + '/api/equipments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Status text: ${response.statusText}, 
        status: ${response.status}, 
        response url: ${response.url}`,
      );
    }

    return await response.json();
  },

  getSupervisors: async (access_token: TToken) => {
    const response = await fetch(BASE_URL + '/api/levels/supervisors', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Status text: ${response.statusText}, 
        status: ${response.status}, 
        response url: ${response.url}`,
      );
    }

    return await response.json();
  },

  getTodayEmployees: async (access_token: TToken) => {
    const response = await fetch(BASE_URL + '/api/date/today', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Status text: ${response.statusText}, 
        status: ${response.status}, 
        response url: ${response.url}`,
      );
    }

    return await response.json();
  },
};

export { API };
