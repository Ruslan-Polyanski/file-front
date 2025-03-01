import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { access_token } from '../../shared/storage/localStorage';
import { API } from '../../shared/api/api';
import { RootState } from '../../app/store/store';

const BASE_URL = 'http://89.111.153.176';

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
  async (employee: IUsersRequest, { dispatch , getState}) => {
      try {
        dispatch(setIsSavingCardEmployee(employee.id));

        const response = await API.updateTodayEmployees(employee)

        const {employees: { users }} = getState() as RootState; 
        
        const updateUsers = users.map(user => {
          if(user.id !== response.id) {
            return user;
          } 
          return{...user, ...response}
        })

        dispatch(setUsers(updateUsers))
        
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsSavingCardEmployee(employee.id));
      }
  },
);

export const getEmployeesData = createAsyncThunk(
  '@@employees/getEmployeesData',
  async (_, { dispatch }) => {
    const accessToken = access_token.get();
    dispatch(setIsLoaderPage(true));
    if (accessToken) {
      const data = await Promise.all([
        API.getCompanies(),
        API.getEquipments(),
        API.getSupervisors(),
        API.getTodayEmployees(),
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
