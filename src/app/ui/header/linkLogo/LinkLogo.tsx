import { Link } from 'react-router';
import style from './LinkLogo.module.css';
import { UiLogo } from '../../../../shared/ui/logo/ui-logo';

const LinkLogo = () => {
  return (
    <div className={style.logo}>
      <Link to={'/'}>
        <UiLogo />
      </Link>
    </div>
  );
};

export { LinkLogo };
