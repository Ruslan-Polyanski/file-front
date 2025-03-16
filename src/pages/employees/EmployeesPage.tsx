import { FC } from 'react';
import { CardEmployee } from './cardEmployee/CardEmployee';
import { EmployeesPageLayout } from './EmployeesPageLayout';
import { useEmployeesToday } from './use-employees-today';

const EmployeesPage: FC = () => {
  const {users, companies, equipments, supervisors, isLoaderPage} = useEmployeesToday();

  return (
      <EmployeesPageLayout 
          title={"Отметить сотрудников"} 
          isLoaderPage={isLoaderPage && 'Loader...'}
          users={users.map((employee) => (
              <CardEmployee
                key={employee.id}
                employee={employee}
                companies={companies}
                equipments={equipments}
                supervisors={supervisors}
              />
        ))}/>
    )
}

export { EmployeesPage };
