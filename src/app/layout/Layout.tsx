import { FC } from 'react';
import { Header } from '../ui/header/Header';
import { Outlet } from 'react-router';
import style from './Layout.module.css';

const Layout: FC = () => {
  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <main>
        <div className={style.box}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export { Layout };
