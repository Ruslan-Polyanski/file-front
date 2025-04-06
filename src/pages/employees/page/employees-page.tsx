import { FC } from 'react';
import { CardEmployee } from '../card-employee/card-employee';
import { EmployeesPageLayout } from './employees-page-layout';
import { useEmployeesToday } from '../hooks/use-employees-today';
import { FilterEmployees } from '../filter-employees/filter-employees';
import { UiResetFilterButton } from '../../../shared/ui/buttons/reset-filter/ui-reset-filter-button';
import { UiLoaderPage } from '../../../shared/ui/loaders/loader-page/ui-loader-page';

const EmployeesPage: FC = () => {
  
  const { filters,
          deferredFilteredEmployees,
          companies, 
          equipments, 
          supervisors, 
          professions, 
          places,
          isLoader,
          handleChangeFilters,
          handleClickResetFilters } = useEmployeesToday()

  return (
            <EmployeesPageLayout 
              title={"Отметить сотрудников"}
              filterEmployees={ 
                <>
                  <FilterEmployees value={filters.profession === undefined ? null : filters.profession} 
                                  data={professions.map(item => item.name)} 
                                  onChange={(newValue) => handleChangeFilters({profession: newValue})} 
                                  label={"Профессия"} />
                  <FilterEmployees value={filters.place === undefined ? null : filters.place}
                                  data={places}
                                  onChange={(newValue) => handleChangeFilters({place: newValue})}
                                  label={"Место нахождения"} />
                  <FilterEmployees value={filters.equipment === undefined ? null : filters.equipment} 
                                  data={equipments.map(item => item.title)} 
                                  onChange={(newValue) => handleChangeFilters({equipment: newValue})}
                                  label={"Технологический объект"} />
                  <UiResetFilterButton onClick={handleClickResetFilters}>Сбросить фильтр</UiResetFilterButton>
                </>
              }
              employees={isLoader ? <UiLoaderPage /> : deferredFilteredEmployees.length === 0 
                                  ? <p>Нет результатов фильтрации</p> : deferredFilteredEmployees.map((employee) => (
                            <CardEmployee
                              key={employee.id}
                              employee={employee}
                              companies={companies}
                              equipments={equipments}
                              supervisors={supervisors}
                            />
                      ))} 
          />
    )
}

export { EmployeesPage }
