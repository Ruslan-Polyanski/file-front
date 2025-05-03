import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import style from './AuthPage.module.css';
import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../app/store';
import { logIn, setEmail, setErrorAuth, setPassword } from './authPage.slice';
import { useLocation, useNavigate } from 'react-router';
import { ErrorMessage } from './errorMessage/ErrorMessage';
import { validateForm, validateEmail, validatePassword } from '../../shared/lib/utils/validate-form';
import { useDataFormAuth } from './hooks/use-data-form-auth';

const AuthPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth, errorAuth, email, password } = useDataFormAuth();

    useEffect(() => {
        if (location.pathname !== '/login') {
            navigate('/login');
        }

        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);

    const dispatch = useAppDispatch();

    const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch(setEmail(event.target.value));
    };

    const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch(setPassword(event.target.value));
    };

    const handleClickButtonSendForm = () => {
        const dataForm = {
            email,
            password,
        };

        const { result, message } = validateForm(dataForm, [validateEmail, validatePassword]);

        if (result) {
            dispatch(logIn(dataForm));
        } else {
            dispatch(setErrorAuth(message));
        }
    };

    const handleClickButtonClearForm = () => {
        dispatch(setEmail(''));
        dispatch(setPassword(''));
        dispatch(setErrorAuth(''));
    };

    return (
        <>
            <Box
                component='form'
                marginTop={10}
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h1' align='center' fontSize={20}>
                    Авторизация
                </Typography>
                <TextField value={email} onChange={handleChangeEmail} label='Email' variant='outlined' />
                <TextField
                    value={password}
                    onChange={handleChangePassword}
                    label='Password'
                    variant='outlined'
                    type='password'
                />
                <Stack
                    spacing={2}
                    direction='row'
                    sx={{
                        '& > :not(style)': { m: 1, width: '35ch' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className={style.wrapper}>
                        <Button onClick={handleClickButtonSendForm} variant='contained' sx={{ width: 140 }}>
                            Отправить
                        </Button>
                        <Button onClick={handleClickButtonClearForm} variant='contained' sx={{ width: 140 }}>
                            Очистить
                        </Button>
                    </div>
                </Stack>
                {errorAuth && <ErrorMessage text={errorAuth} />}
            </Box>
        </>
    );
};

export { AuthPage };
