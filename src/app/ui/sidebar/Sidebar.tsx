import { FC } from 'react';
import style from './Sidebar.module.css';

const Sidebar: FC = () => {
  return (
    <>
      <aside className={style.sidebar}>
        <ul>
          <li>Сотрудники</li>
          <li>Объекты</li>
          <li>Оборудование</li>
          <li>Профиль</li>
        </ul>
      </aside>
    </>
  );
};

export { Sidebar };
