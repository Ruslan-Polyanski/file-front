import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import style from './form-auth.module.css';
import { Typography } from '@mui/material';
import { FC } from 'react';
import { useDataFormAuth } from '../model/use-data-form-auth';
import { UiError } from '@/shared/ui/error/ui-error';

export const FormAuth: FC = () => {
    const {
        status,
        error,
        email,
        handleChangeEmail,
        password,
        handleChangePassword,
        handleClickSendForm,
        handleClickClearForm,
    } = useDataFormAuth();

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
                        <Button onClick={handleClickSendForm} variant='contained' sx={{ width: 140 }}>
                            Отправить
                        </Button>
                        <Button onClick={handleClickClearForm} variant='contained' sx={{ width: 140 }}>
                            Очистить
                        </Button>
                    </div>
                </Stack>
                {status === 'error' && <UiError message={error} />}
            </Box>
        </>
    );
};
