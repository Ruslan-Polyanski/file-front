import { FC } from 'react';
import { NavLink } from 'react-router';
import style from './Menu.module.css';

const Menu: FC = () => {
  return (
    <nav className={style.nav}>
      <ul className={style.list}>
        <li className={style.item}>
          <NavLink
            to={'employees'}
            className={({ isActive }) =>
              isActive ? style.active : style.notActive
            }
          >
            Отметить сотрудников
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink
            to={'car'}
            className={({ isActive }) =>
              isActive ? style.active : style.notActive
            }
          >
            Забронировать автомобиль
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export { Menu };
