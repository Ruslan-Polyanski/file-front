import { FC } from 'react';
import style from './Employees.module.css';

const employees = [
  {
    firstName: 'Игорь',
    lastName: 'Петров',
    surname: 'Петрович',
    profession: 'Сварщик',
  },
  {
    firstName: 'Анна',
    lastName: 'Смирнова',
    surname: 'Петрович',
    profession: 'Менеджер',
  },
  {
    firstName: 'Дмитрий',
    lastName: 'Кузнецов',
    surname: 'Петрович',
    profession: 'Программист',
  },
  {
    firstName: 'Елена',
    lastName: 'Сидорова',
    surname: 'Петрович',
    profession: 'Дизайнер',
  },
  {
    firstName: 'Максим',
    lastName: 'Попов',
    surname: 'Петрович',
    profession: 'Инженер',
  },
  {
    firstName: 'Ольга',
    lastName: 'Ковалёва',
    surname: 'Петрович',
    profession: 'Маркетолог',
  },
  {
    firstName: 'Сергей',
    lastName: 'Федоров',
    surname: 'Петрович',
    profession: 'Аналитик',
  },
  {
    firstName: 'Татьяна',
    lastName: 'Лебедева',
    surname: 'Петрович',
    profession: 'Финансист',
  },
  {
    firstName: 'Алексей',
    lastName: 'Мельников',
    surname: 'Петрович',
    profession: 'Юрист',
  },
  {
    firstName: 'Мария',
    lastName: 'Григорьева',
    surname: 'Петрович',
    profession: 'Учитель',
  },
];

const Employees: FC = () => {
  return (
    <>
      <h1>Отметить сотрудников</h1>
      <article className={style.employees__box}>
        {employees.map((employee, id) => (
          <section key={id} className={style.employee__box}>
            <div className={style.imageBox}>
              <img
                src="https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg"
                alt="image"
              />
              <div className={style.profession}>{employee.profession}</div>
            </div>
            <div>
              <h2 className={style.h2}>
                {employee.firstName} {employee.lastName} {employee.surname}
              </h2>
            </div>
          </section>
        ))}
      </article>
    </>
  );
};

export { Employees };
