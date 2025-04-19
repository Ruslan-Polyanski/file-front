import { FC } from 'react';
import { EmployeesPageLayout } from './employees-page-layout/employees-page-layout';
import { useEmployeesToday } from './use-employees-today';
import { ICompany, ISupervisor, TEmployee, TEquipment } from '../model/employees-page.slice';
import { UiButton } from '../../../shared/ui/button/ui-button';
import CardEmployee from './card-employee/card-employee';
import { UiInput } from '../../../shared/ui/input/ui-input';
import { UiSelect } from '../../../shared/ui/select/ui-select';

interface ICardEmployeeList {
    employeeList: TEmployee[];
    companies: ICompany[];
    equipments: TEquipment[];
    supervisors: ISupervisor[];
}

const EmployeesPage: FC = () => {
    console.log('render parant');

    const {
        filters,
        resultFilteredEmployees,
        companies,
        equipments,
        supervisors,
        professions,
        places,
        valueSearchInput,
        handleChangeSearchInput,
        handleChangeFilters,
        handleClickResetFilters,
    } = useEmployeesToday();

    return (
        <EmployeesPageLayout
            title={'Отметить сотрудников'}
            searchInput={
                <UiInput
                    label={'Поиск по ФИО'}
                    value={valueSearchInput}
                    onChange={handleChangeSearchInput}
                    variant={'outlined'}
                />
            }
            filterEmployees={
                <>
                    <UiSelect
                        value={filters.profession === undefined ? null : filters.profession}
                        data={professions.map((item) => item.name)}
                        onChange={(newValue) => handleChangeFilters({ profession: newValue })}
                        label={'Профессия'}
                    />
                    <UiSelect
                        value={filters.place === undefined ? null : filters.place}
                        data={places}
                        onChange={(newValue) => handleChangeFilters({ place: newValue })}
                        label={'Место нахождения'}
                    />
                    <UiSelect
                        value={filters.equipment === undefined ? null : filters.equipment}
                        data={equipments.map((item) => item.title)}
                        onChange={(newValue) => handleChangeFilters({ equipment: newValue })}
                        label={'Технологический объект'}
                    />
                    <UiButton onClick={handleClickResetFilters} color={'blue'}>
                        Сбросить фильтр
                    </UiButton>
                </>
            }
            employees={
                <CardEmployeeList
                    employeeList={resultFilteredEmployees}
                    companies={companies}
                    equipments={equipments}
                    supervisors={supervisors}
                />
            }
        />
    );
};

const CardEmployeeList: FC<ICardEmployeeList> = ({ employeeList, companies, equipments, supervisors }) => {
    if (employeeList.length === 0) return <p>Нет результатов фильтрации</p>;

    return (
        <>
            {employeeList.map((employee) => (
                <CardEmployee
                    key={employee.id}
                    employee={employee}
                    companies={companies}
                    equipments={equipments}
                    supervisors={supervisors}
                />
            ))}
        </>
    );
};

export { EmployeesPage };
