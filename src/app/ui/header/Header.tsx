import { FC } from 'react';
import { logOut } from '../../../pages/auth/authPage.slice';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { HeaderLayout } from './header-layout/header-layout';
import { LinkLogo } from './link-logo/link-logo';
import { UiButton } from '../../../shared/ui/button/ui-button';
import { Menu } from './menu/menu';

const Header: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleClickLogOutButton = () => {
    dispatch(logOut());
  };

  return (
    <HeaderLayout
      menu={<Menu />}
      linkLogo={<LinkLogo />}
      logOutButton={<UiButton onClick={handleClickLogOutButton} color={'red'}>Выход</UiButton>}
    />
  );
};

export { Header };
