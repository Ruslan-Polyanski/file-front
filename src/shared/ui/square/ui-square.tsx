import { FC } from 'react';
import style from './ui-square.module.css';
import classNames from 'classnames';

interface IProps {
    color: 'green' | 'red';
}

const UiSquare: FC<IProps> = ({ color }) => {
    return <div className={classNames(style.square, style[color])}></div>;
};

export { UiSquare };
