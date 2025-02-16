import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LocalStorage } from '../../shared/storage/localStorage';
import { API } from '../../shared/api/api';

const BASE_URL = process.env.REACT_APP_ENV_FILE_BASE_URL_SERVER;

interface ICompany {
  id: number;
  title: string;
}

interface IEquipment {
  id: number;
  title: string;
}

interface ISupervisor {
  id: number;
  fullName: string;
}

interface IUsers {
  id: number;
  dateTag: null | string;
  fullName: string;
  startTime: null | string;
  endTime: null | string;
  breakTime: null | string;
  company: null | string;
  equipment: null | string;
  supervisor: null | string;
  profession: string;
  photo: string;
}

interface IUsersRequest {
  [key: string]: string | null | number;
}

interface IEmployeesState {
  users: IUsers[];
  companies: ICompany[];
  equipments: IEquipment[];
  supervisors: ISupervisor[];
  isLoaderPage: boolean;
  isSavingCardEmployee: number[];
}

const initialEmployeesState: IEmployeesState = {
  users: [],
  companies: [],
  equipments: [],
  supervisors: [],
  isLoaderPage: false,
  isSavingCardEmployee: [],
};

export const employeesSlice = createSlice({
  name: '@@employees',
  initialState: initialEmployeesState,
  reducers: {
    setIsLoaderPage: (state, action) => {
      return { ...state, isLoaderPage: action.payload };
    },
    setCompanies: (state, action) => {
      return { ...state, companies: action.payload };
    },
    setEquipments: (state, action) => {
      return { ...state, equipments: action.payload };
    },
    setSupervisors: (state, action) => {
      return { ...state, supervisors: action.payload };
    },
    setUsers: (state, action) => {
      return { ...state, users: action.payload };
    },
    setIsSavingCardEmployee: (state, action) => {
      const isExist = state.isSavingCardEmployee.includes(action.payload);

      const newCurrentIdEmployees = isExist
        ? state.isSavingCardEmployee.filter((id) => id !== action.payload)
        : [...state.isSavingCardEmployee, action.payload];

      return {
        ...state,
        isSavingCardEmployee: newCurrentIdEmployees,
      };
    },
  },
});

const {
  setIsLoaderPage,
  setCompanies,
  setEquipments,
  setSupervisors,
  setUsers,
  setIsSavingCardEmployee,
} = employeesSlice.actions;

export const saveEmployeeData = createAsyncThunk(
  '@@employees/saveEmployeeData',
  async (employee: IUsersRequest, { dispatch }) => {
    const access_token = LocalStorage.getItem('token');

    console.log(employee.id);

    if (access_token) {
      try {
        dispatch(setIsSavingCardEmployee(employee.id));

        const response = await fetch(BASE_URL + '/api/date/today', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(employee),
        });

        if (!response.ok) {
          throw new Error('Break our request');
        }

        const resp = await response.json();
        console.log(resp);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsSavingCardEmployee(employee.id));
      }
    }
  },
);

export const getEmployeesData = createAsyncThunk(
  '@@employees/getEmployeesData',
  async (_, { dispatch }) => {
    const access_token = LocalStorage.getItem('token');
    dispatch(setIsLoaderPage(true));

    if (access_token) {
      const data = await Promise.all([
        API.getCompanies(access_token),
        API.getEquipments(access_token),
        API.getSupervisors(access_token),
        API.getTodayEmployees(access_token),
      ]);

      data.forEach((item) => {
        if (item.companies) dispatch(setCompanies(item.companies));
        if (item.equipments) dispatch(setEquipments(item.equipments));
        if (item.supervisors) dispatch(setSupervisors(item.supervisors));
        if (item.users) dispatch(setUsers(item.users));
      });

      dispatch(setIsLoaderPage(false));
    } else {
      dispatch(setIsLoaderPage(false));
    }
  },
);
