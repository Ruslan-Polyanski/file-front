import { FC } from 'react';
import style from './UiStyleSquare.module.css'

interface IProps {
    status: 'green' | 'red';
}

const UiSquare: FC<IProps> = ({status}) => {
    return (
        <div className={[style.square, style[status]].join(" ")}></div>
    )
}

export { UiSquare }