import { FC } from 'react';
import style from './ui-reset-filter-button.module.css';

interface IProps {
  onClick: () => void;
  children: string;
}

const UiResetFilterButton: FC<IProps> = ({ onClick, children }) => {
  return (
    <>
      <button className={style.bg} onClick={onClick}>
        <span>{children}</span>
      </button>
    </>
  );
};

export { UiResetFilterButton };