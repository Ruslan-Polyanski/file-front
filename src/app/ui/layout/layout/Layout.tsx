import { FC } from 'react';
import style from './Layout.module.css';

interface IProps {
    header: React.ReactNode;
    outlet: React.ReactNode;
}

const Layout: FC<IProps> = ({ header, outlet }) => {
    return (
        <>
            <header>{header}</header>
            <main>
                <div className={style.box}>{outlet}</div>
            </main>
        </>
    );
};

export { Layout };
