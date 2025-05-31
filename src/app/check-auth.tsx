import { FC, ReactNode, useEffect } from 'react';
import { FormAuth, selectorIsAuth, selectorStatus } from '@/features/auth';
import { useSelector } from 'react-redux';
import { checkAuth } from '@/features/auth/model/auth.slice';
import { useAppDispatch } from '@/app/store';
import Box from '@mui/material/Box/Box';
import { UiLoader } from '@/shared/ui/loaders/loader/ui-loader';

interface IProps {
    children: ReactNode;
}

export const CheckAuth: FC<IProps> = ({ children }) => {
    const isAuth = useSelector(selectorIsAuth);
    const status = useSelector(selectorStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    if (!isAuth && status === 'loader') {
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

    if (!isAuth && status === 'error') return <FormAuth />;

    return <>{children}</>;
};
