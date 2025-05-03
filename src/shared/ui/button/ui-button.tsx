import { FC } from 'react';
import style from './ui-button.module.css';
import classNames from 'classnames';

interface IProps {
    onClick: () => void;
    children: string;
    color?: 'red' | 'blue';
    disabled?: boolean;
}

const UiButton: FC<IProps> = ({ onClick, children, disabled, color }) => {
    const classColor = color && style[color];

    return (
        <>
            <button className={classNames(style.button, classColor)} disabled={disabled} onClick={onClick}>
                <span>{children}</span>
            </button>
        </>
    );
};

export { UiButton };
