import { FC } from 'react';
import { FilterEmployees } from './filter-employees/filter-employees';
import { EmployeeList } from './employee-list/employee-list';

export const EmployeesToday: FC = () => {
    return (
        <>
            <FilterEmployees />
            <EmployeeList />
        </>
    );
};
