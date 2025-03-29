import { FC, ReactNode } from "react"
import style from './EmployeesPage.module.css';

interface IEmployeesProps {
  title: string; 
  isLoaderPage: string | boolean;
  employees:  ReactNode;
  filterEmployees: ReactNode;
}

const EmployeesPageLayout: FC<IEmployeesProps> = ({title, isLoaderPage, employees, filterEmployees}) => {
    return (
      <>
        <h1>{title}</h1>
        {isLoaderPage}
        <div>{filterEmployees}</div>
        <article className={style.employees__box}>
          {employees}
        </article>
      </>
    );
  };

export { EmployeesPageLayout }