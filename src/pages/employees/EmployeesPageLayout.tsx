import { FC, ReactNode } from "react"
import style from './EmployeesPage.module.css';

const EmployeesPageLayout: FC<{title: string, isLoaderPage: string | boolean, users:  ReactNode }> = ({title, isLoaderPage, users}) => {
    return (
      <>
        <h1>{title}</h1>
        {isLoaderPage}
        <article className={style.employees__box}>
          {users}
        </article>
      </>
    );
  };

export { EmployeesPageLayout }