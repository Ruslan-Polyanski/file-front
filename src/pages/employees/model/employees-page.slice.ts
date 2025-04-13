import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../../shared/api/api';
import { RootState } from '../../../app/store';
import { logOut } from '../../auth/authPage.slice';

export interface ICompany {
  id: number;
  title: string;
}

export type TEquipment = {
  id: number;
  title: string;
}

export interface ISupervisor {
  id: number;
  fullName: string;
}

export type TProfession = {
  id: number;
  name: string;
}

export type TEmployee = {
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
  place: string;
}

interface IUsersRequest {
  [key: string]: string | null | number;
}

interface IEmployeesState {
  employees: TEmployee[];
  companies: ICompany[];
  equipments: TEquipment[];
  supervisors: ISupervisor[];
  professions: TProfession[];
  places: string[];
  isLoaderPage: boolean;
  isSavingCardEmployee: number[];
  filters: Partial<TEmployee>;
}

const initialEmployeesState: IEmployeesState = {
  employees: [],
  companies: [],
  equipments: [],
  supervisors: [],
  professions: [],
  places: ['В офисе', 'На выезде'],
  isLoaderPage: false,
  isSavingCardEmployee: [],
  filters: {},
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
    setEmployees: (state, action) => {
      return { ...state, employees: action.payload };
    },
    setFilters: (state, action) => {
      if(!Object.keys(action.payload).length) return {...state, filters: {}}

      const newFilters = {...state.filters, ...action.payload}

      for(const key in newFilters) {
        if(newFilters[key] === null) delete newFilters[key]
      }

      return {...state, filters: {...newFilters}}
    },
    setProfessions: (state, action) => {
      return {...state, professions: action.payload}
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

export const {
  setIsLoaderPage,
  setCompanies,
  setEquipments,
  setSupervisors,
  setEmployees,
  setIsSavingCardEmployee,
  setProfessions,
  setFilters,
} = employeesSlice.actions;

export const saveEmployeeData = createAsyncThunk(
  '@@employees/saveEmployeeData',
  async (employee: IUsersRequest, { dispatch , getState, signal }) => {
      try {
        dispatch(setIsSavingCardEmployee(employee.id));

        const response = await API.updateTodayEmployees(employee, signal)

        const {employees: { employees }} = getState() as RootState; 
        
        const updateUsers = employees.map(employee => {
          if(employee.id !== response.id) {
            return employee;
          } 
          return{...employee, ...response}
        })

        dispatch(setEmployees(updateUsers))
        
      } catch (error: any) {
          if(error.status === 401) dispatch(logOut())
      } finally {
        dispatch(setIsSavingCardEmployee(employee.id));
      }
  },
);

export const getEmployeesData = createAsyncThunk(
  '@@employees/getEmployeesData',
  async (_, { dispatch }) => {
    try {
      dispatch(setIsLoaderPage(true));
      const data = await Promise.all([
        API.getCompanies(),
        API.getEquipments(),
        API.getSupervisors(),
        API.getTodayEmployees(),
        API.getProfessions(),
      ]);
  
      data.forEach((item) => {
        if (item.companies) dispatch(setCompanies(item.companies));
        if (item.equipments) dispatch(setEquipments(item.equipments));
        if (item.supervisors) dispatch(setSupervisors(item.supervisors));
        if (item.users) dispatch(setEmployees(item.users));
        if (item.professions) dispatch(setProfessions(item.professions));
      });
    } catch(error: any) {
        if(error.status === 401) dispatch(logOut())
    } finally {
      dispatch(setIsLoaderPage(false));
    }
  },
);
