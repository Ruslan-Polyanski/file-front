import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import { createLogin } from './authPage.slice';
import { useLocation, useNavigate } from 'react-router';

interface IUser {
  email: string;
  password: string;
}

const AuthPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    if (location.pathname !== '/file-front/login') {
      navigate('/file-front/login');
    }

    if (isAuth) {
      navigate('/file-front');
    }
  }, [isAuth]);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setEmail(event.target.value);
  };

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  const handleClickButtonSendForm = () => {
    const user: IUser = {
      email,
      password,
    };

    dispatch(createLogin(user));
  };

  return (
    <Box
      component="form"
      marginTop={10}
      sx={{
        '& > :not(style)': { m: 1, width: '35ch' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" align="center" fontSize={20}>
        Авторизация
      </Typography>
      <TextField
        value={email}
        onChange={handleChangeEmail}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <TextField
        value={password}
        onChange={handleChangePassword}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
      />
      <Stack
        spacing={2}
        direction="row"
        sx={{
          '& > :not(style)': { m: 1, width: '35ch' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button onClick={handleClickButtonSendForm} variant="contained">
          Отправить
        </Button>
      </Stack>
    </Box>
  );
};

export { AuthPage };
