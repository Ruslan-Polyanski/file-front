import { useSelector } from 'react-redux';
import { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import { RootState, useAppDispatch } from '../../store';
import { checkAuth } from '../../../pages/auth/authPage.slice';
import { UiLoader } from '../../../shared/ui/loaders/loader/ui-loader';
import { AuthPage } from '../../../pages/auth/AuthPage';

const LayoutCheckAuth: FC = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isLoader = useSelector((state: RootState) => state.auth.isLoader);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    if (isLoader) {
        return (
            <Box
                marginTop={10}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <UiLoader />
            </Box>
        );
    }

    return isAuth ? <Outlet /> : <AuthPage />;
};

export { LayoutCheckAuth };
