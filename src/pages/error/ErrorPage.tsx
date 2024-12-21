import { FC } from 'react';
import img from '../../shared/assets/notFound.png';
import style from './ErrorPage.module.css';
import { Link } from 'react-router';

const ErrorPage: FC = () => {
  return (
    <div className={style.box}>
      <div className={style.boxImg}>
        <img src={img} alt="not found" />
      </div>
      <div className={style.link}>
        <Link to="/">Вернуться на гравную</Link>
      </div>
    </div>
  );
};

export { ErrorPage };
