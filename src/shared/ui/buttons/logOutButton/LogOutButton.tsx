import { FC } from 'react';
import style from './LogOutButton.module.css';

interface IPropsLogOutButton {
  callBack: () => void;
}

const LogOutButton: FC<IPropsLogOutButton> = ({ callBack }) => {
  return (
    <>
      <button className={style.bg} onClick={callBack}>
        <span>Выход</span>
      </button>
    </>
  );
};

export { LogOutButton };
