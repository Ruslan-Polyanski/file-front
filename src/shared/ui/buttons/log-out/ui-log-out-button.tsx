import { FC } from 'react';
import style from './ui-log-out-button.module.css';

interface IProps {
  onClick: () => void;
  children: string;
}

const UiLogOutButton: FC<IProps> = ({ onClick, children }) => {
  return (
    <>
      <button className={style.bg} onClick={onClick}>
        <span>{children}</span>
      </button>
    </>
  );
};

export { UiLogOutButton }

