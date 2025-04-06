import { FC } from 'react';
import style from './ui-save-emloyee-button.module.css';

interface IProps {
  onClick: () => void;
  children: string;
  isDisabled: boolean;
}

const UiSaveEmloyeeButton: FC<IProps> = ({
  onClick,
  children,
  isDisabled,
}) => {
  return (
    <>
      <button className={style.bg} onClick={onClick} disabled={isDisabled}>
        <span>{children}</span>
      </button>
    </>
  );
};

export { UiSaveEmloyeeButton };
