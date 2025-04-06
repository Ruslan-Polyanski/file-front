import { FC } from 'react';
import { logOut } from '../../../pages/auth/authPage.slice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { HeaderLayout } from './headerLyout/HeaderLayout';
import { LinkLogo } from './linkLogo/LinkLogo';
import { Menu } from './menu/Menu';
import { UiLogOutButton } from '../../../shared/ui/buttons/log-out/ui-log-out-button';

const Header: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleClickLogOutButton = () => {
    dispatch(logOut());
  };

  return (
    <HeaderLayout
      menu={<Menu />}
      linkLogo={<LinkLogo />}
      logOutButton={<UiLogOutButton onClick={handleClickLogOutButton}>Выход</UiLogOutButton>}
    />
  );
};

export { Header };
