import { FC } from 'react';
import { useEmployeeListToday } from '../../model/use-employee-list-today';
import CardEmployee from '../card-employee/card-employee';
import { UiLoader } from '@/shared/ui/loaders/loader/ui-loader';
import { UiError } from '@/shared/ui/error/ui-error';

export const EmployeeList: FC = () => {
    const { filteredEmployees, status, error } = useEmployeeListToday();

    if (status === 'loading') return <UiLoader />;
    if (status === 'error') return <UiError message={error} />;

    return (
        <>
            {filteredEmployees.map((employee) => {
                return <CardEmployee key={employee.id} employee={employee} />;
            })}
        </>
    );
};
