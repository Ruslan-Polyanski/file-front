import { FC } from 'react';
import style from './Header.module.css';
import { Logo } from '../../../shared/ui/logo/Logo';
import { Link, NavLink } from 'react-router-dom';
import { LogOut } from '../../../shared/ui/buttons/logOut/LogOut';

const Header: FC = () => {
  return (
    <>
      <header className={style.header}>
        <div className={style.logo}>
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>
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
        <div className={style.button}>
          <LogOut />
        </div>
      </header>
    </>
  );
};

export { Header };
