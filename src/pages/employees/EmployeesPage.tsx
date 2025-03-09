import { FC } from 'react';
import { CardEmployee } from './cardEmployee/CardEmployee';
import { EmployeesPageLayout } from './EmployeesPageLayout';
import { useEmployeesToday } from './use-employees-today';

const EmployeesPage: FC = () => {
  const {users, companies, equipments, supervisors, isLoaderPage} = useEmployeesToday()

  return (
      <EmployeesPageLayout 
          title={"Отметить сотрудников"} 
          isLoaderPage={isLoaderPage && 'Loader...'}
          users={users.map((employee) => (
              <CardEmployee
                key={employee.id}
                id={employee.id}
                profession={employee.profession}
                photo={employee.photo}
                fullName={employee.fullName}
                companies={companies}
                equipments={equipments}
                supervisors={supervisors}
                equipment={employee.equipment}
                supervisor={employee.supervisor}
                company={employee.company}
                dateTag={employee.dateTag}
                startTime={employee.startTime}
                endTime={employee.endTime}
                breakTime={employee.breakTime}
              />
        ))}/>
    )
}

export { EmployeesPage };
