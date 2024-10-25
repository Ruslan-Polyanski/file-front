import { FC, useEffect, useState } from 'react';
import style from './Employees.module.css';
import { CardEmployee } from '../../shared/ui/cardEmployee/CardEmployee';

interface IEmployee {
  firstName: string;
  lastName: string;
  surname: string;
  profession: string;
  uniqueID: string;
  photo: string;
}

type TEmployees = IEmployee[];

const mickFactories = [
  'Минский моторный завод',
  'Минский тракторный завод',
  'Минский автомобильный завод',
  'Борисовский завод агрегатов',
  'Гомельский завод сельскохозяйственного машиностроения',
  'ОАО Амкодор-Унимод',
];

const mockEmployees = [
  {
    firstName: 'Игорь',
    lastName: 'Петров',
    surname: 'Петрович',
    profession: 'Сварщик',
    uniqueID: 'dfgsdf',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Анна',
    lastName: 'Смирнова',
    surname: 'Петрович',
    profession: 'Менеджер',
    uniqueID: 'yiruyi',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Дмитрий',
    lastName: 'Кузнецов',
    surname: 'Петрович',
    profession: 'Программист',
    uniqueID: 'kgjlfghjd',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Елена',
    lastName: 'Сидорова',
    surname: 'Петрович',
    profession: 'Дизайнер',
    uniqueID: 'w4wertw',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Максим',
    lastName: 'Попов',
    surname: 'Петрович',
    profession: 'Инженер',
    uniqueID: 'vnfkfhf',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Ольга',
    lastName: 'Ковалёва',
    surname: 'Петрович',
    profession: 'Маркетолог',
    uniqueID: 'wryetyerh',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Сергей',
    lastName: 'Федоров',
    surname: 'Петрович',
    profession: 'Аналитик',
    uniqueID: 'dsfgeertyreh',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Татьяна',
    lastName: 'Лебедева',
    surname: 'Петрович',
    profession: 'Финансист',
    uniqueID: 'sgwrjfgwdefg',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Алексей',
    lastName: 'Мельников',
    surname: 'Петрович',
    profession: 'Юрист',
    uniqueID: 'nmerthwer',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
  {
    firstName: 'Мария',
    lastName: 'Григорьева',
    surname: 'Петрович',
    profession: 'Учитель',
    uniqueID: 'wrthwgeh',
    photo:
      'https://optim.tildacdn.com/tild3831-3136-4039-b539-633061393531/-/resize/824x/-/format/webp/main-ph-1.jpg',
  },
];

const Employees: FC = () => {
  const [employees, setEemployees] = useState<TEmployees | []>([]);

  useEffect(() => {
    fetch('/someURL', {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => setEemployees(data))
      .catch((error) => console.log(error));

    setEemployees(mockEmployees); // временно пока нет сервера
  }, []);

  return (
    <>
      <h1>Отметить сотрудников</h1>
      <article className={style.employees__box}>
        {employees.map((employee) => (
          <CardEmployee
            key={employee.uniqueID}
            profession={employee.profession}
            photo={employee.photo}
            firstName={employee.firstName}
            lastName={employee.lastName}
            surname={employee.surname}
          />
        ))}
      </article>
    </>
  );
};

export { Employees };
