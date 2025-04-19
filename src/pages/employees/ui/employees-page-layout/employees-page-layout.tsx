import { FC, ReactNode } from 'react';
import style from './employees-page-layout.module.css';

interface IEmployeesProps {
    title: string;
    employees?: ReactNode;
    filterEmployees: ReactNode;
    searchInput: ReactNode;
}

const EmployeesPageLayout: FC<IEmployeesProps> = ({ title, employees, filterEmployees, searchInput }) => {
    return (
        <>
            <h1>{title}</h1>
            <div className={style.filters}>
                {searchInput}
                {filterEmployees}
            </div>
            <div className={style.employees}>{employees}</div>
        </>
    );
};

export { EmployeesPageLayout };
