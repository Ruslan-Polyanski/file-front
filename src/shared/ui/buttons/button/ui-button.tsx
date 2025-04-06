import { FC } from 'react';
import style from './ui-button.module.css';

interface IProps {
  onClick: () => void;
  children: string;
}

const UiButton: FC<IProps> = ({ onClick, children }) => {
  return (
    <>
      <button className={style.bg} onClick={onClick}>
        <span>{children}</span>
      </button>
    </>
  );
};

export { UiButton };