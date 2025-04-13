import { FC, ReactNode } from "react"
import style from './employees-page-layout.module.css';

interface IEmployeesProps {
  title: string; 
  employees?:  ReactNode;
  filterEmployees: ReactNode;
}

const EmployeesPageLayout: FC<IEmployeesProps> = ({title, employees, filterEmployees}) => {
    return (
      <>
        <h1>{title}</h1>
        <div className={style.filters}>
          {filterEmployees}
        </div>
        <div className={style.employees}>
          {employees}
        </div>
      </>
    );
  };

export { EmployeesPageLayout }