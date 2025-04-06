import { FC } from 'react';
import { UiLoader } from '../loader/ui-loader';
import style from './ui-loader-page.module.css';

const UiLoaderPage: FC = () => {
    return (
        <div className={style.loader}>
            <UiLoader />
        </div>
    )
}

export { UiLoaderPage }