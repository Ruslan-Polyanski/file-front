import { FC } from 'react';
import { createLogOut } from '../../../pages/auth/authPage.slice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { HeaderLayout } from './headerLyout/HeaderLayout';
import { LinkLogo } from './linkLogo/LinkLogo';
import { Menu } from './menu/Menu';
import { LogOutButton } from '../../../shared/ui/buttons/logOutButton/LogOutButton';

const Header: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleClickLogOutButton = () => {
    dispatch(createLogOut());
  };

  return (
    <HeaderLayout
      menu={<Menu />}
      linkLogo={<LinkLogo />}
      logOutButton={<LogOutButton callBack={handleClickLogOutButton} />}
    />
  );
};

export { Header };
