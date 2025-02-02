import { Link } from 'react-router';
import style from './LinkLogo.module.css';
import { Logo } from '../../../../shared/ui/logo/Logo';

const LinkLogo = () => {
  return (
    <div className={style.logo}>
      <Link to={'/file-front'}>
        <Logo />
      </Link>
    </div>
  );
};

export { LinkLogo };
