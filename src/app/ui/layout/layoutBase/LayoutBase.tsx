import { FC } from 'react';
import style from './LayoutBase.module.css';

interface ILayoutBaseProps {
    header: React.ReactNode;
    outlet: React.ReactNode;
}

const LayoutBase: FC<ILayoutBaseProps> = ({ header, outlet }) => {
    return (
        <>
            <header>{header}</header>
            <main>
                <div className={style.box}>{outlet}</div>
            </main>
        </>
    );
};

export { LayoutBase };
