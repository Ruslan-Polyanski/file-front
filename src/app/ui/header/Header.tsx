import { FC } from 'react';
import { HeaderLayout } from './header-layout/header-layout';
import { LinkLogo } from './link-logo/link-logo';
import { Menu } from './menu/menu';
import { LogOutButton } from '@/features/auth';

const Header: FC = () => {
    return <HeaderLayout menu={<Menu />} linkLogo={<LinkLogo />} logOutButton={<LogOutButton />} />;
};

export { Header };
