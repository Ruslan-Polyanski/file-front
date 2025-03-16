import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { FC, useEffect } from 'react';
import { checkAuth } from '../../pages/auth/authPage.slice';
import Box from '@mui/material/Box';
import { Loader } from '../../shared/ui/loader/Loader';
import { Outlet } from 'react-router';
import { AuthPage } from '../../pages/auth/AuthPage';

const LayoutCheckAuth: FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isLoader = useSelector((state: RootState) => state.auth.isLoader);
  const dispatch: AppDispatch = useDispatch();

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
        <Loader />
      </Box>
    );
  }

  return isAuth ? <Outlet /> : <AuthPage />;
};

export { LayoutCheckAuth };
