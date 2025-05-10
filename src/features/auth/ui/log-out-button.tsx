import { UiButton } from '@/shared/ui/button/ui-button';
import { logOut } from '../model/auth.slice';
import { useAppDispatch } from '@/app/store';
import { FC } from 'react';

export const LogOutButton: FC = () => {
    const dispatch = useAppDispatch();

    const handleClickLogOut = () => {
        dispatch(logOut());
    };

    return (
        <UiButton onClick={handleClickLogOut} color={'red'}>
            Выход
        </UiButton>
    );
};
