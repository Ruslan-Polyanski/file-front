import { FC } from 'react';
import style from './ErrorMessage.module.css';

interface IErrorMessageProps {
    text: string;
}

const ErrorMessage: FC<IErrorMessageProps> = ({ text }) => {
    return <div className={style.textError}>{text}</div>;
};

export { ErrorMessage };
