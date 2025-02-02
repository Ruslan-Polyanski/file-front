import { FC } from 'react';
import style from './SaveEmloyeeButton.module.css';

interface IPropsSaveEmloyeeButton {
  callBack: () => void;
  children: string;
  isDisabled: boolean;
}

const SaveEmloyeeButton: FC<IPropsSaveEmloyeeButton> = ({
  callBack,
  children,
  isDisabled,
}) => {
  return (
    <>
      <button className={style.bg} onClick={callBack} disabled={isDisabled}>
        <span>{children}</span>
      </button>
    </>
  );
};

export { SaveEmloyeeButton };
