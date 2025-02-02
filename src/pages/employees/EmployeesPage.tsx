import { FC, useEffect } from 'react';
import style from './EmployeesPage.module.css';
import { CardEmployee } from './cardEmployee/CardEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import { getEmployeesData } from './employeesPage.slice';

const EmployeesPage: FC = () => {
  const users = useSelector((state: RootState) => state.employees.users);
  const companies = useSelector(
    (state: RootState) => state.employees.companies,
  );
  const equipments = useSelector(
    (state: RootState) => state.employees.equipments,
  );
  const supervisors = useSelector(
    (state: RootState) => state.employees.supervisors,
  );

  const isLoaderPage = useSelector(
    (state: RootState) => state.employees.isLoaderPage,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeesData());
  }, []);

  return (
    <>
      {isLoaderPage && 'Loader...'}

      <h1>Отметить сотрудников</h1>
      <article className={style.employees__box}>
        {users.map((employee) => (
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
        ))}
      </article>
    </>
  );
};

export { EmployeesPage };
