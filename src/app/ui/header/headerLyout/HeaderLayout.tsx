import style from './HeaderLayout.module.css';
import { FC } from 'react';

interface IHeaderLayout {
  menu: React.ReactNode;
  linkLogo: React.ReactNode;
  logOutButton: React.ReactNode;
}

const HeaderLayout: FC<IHeaderLayout> = ({ menu, linkLogo, logOutButton }) => {
  return (
    <div className={style.header}>
      <div className={style.header__left}>
        {linkLogo}
        <div className={style.menu}>{menu}</div>
      </div>
      <div className={style.header__right}>{logOutButton}</div>
    </div>
  );
};

export { HeaderLayout };
