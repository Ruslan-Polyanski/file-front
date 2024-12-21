import { FC } from 'react';
import style from './LogOut.module.css';

interface IPropsLogOut {
  callBack: () => void;
}

const LogOut: FC<IPropsLogOut> = ({ callBack }) => {
  return (
    <>
      <button className={style.bg} onClick={callBack}>
        <span>Выход</span>
      </button>
    </>
  );
};

export { LogOut };
