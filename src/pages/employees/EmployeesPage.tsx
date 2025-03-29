import { FC } from 'react';
import { CardEmployee } from './cardEmployee/CardEmployee';
import { EmployeesPageLayout } from './EmployeesPageLayout';
import { useEmployeesToday } from './use-employees-today';
import { FilterEmployees } from './filterEmployees/filter-employees';

const EmployeesPage: FC = () => {

  const { employees,
          filteredEmployees,
          companies, 
          equipments, 
          supervisors, 
          isLoaderPage, 
          professions, 
          handleChangeFilters } = useEmployeesToday()

  return (
        <EmployeesPageLayout 
            title={"Отметить сотрудников"} 
            isLoaderPage={isLoaderPage && 'Loader...'}
            filterEmployees={<FilterEmployees data={professions} onChange={handleChangeFilters} />}
            employees={(filteredEmployees.length ? filteredEmployees : employees).map((employee) => (
              <CardEmployee
                key={employee.id}
                employee={employee}
                companies={companies}
                equipments={equipments}
                supervisors={supervisors}
              />
      ))} />
    )
}

export { EmployeesPage };
