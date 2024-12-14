import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { FC, useState } from 'react';
import { LocalStorage } from '../../shared/storage/localStorage';

interface IUser {
  email: string;
  password: string;
}

interface IUserResponse {
  id: number;
  email: string;
  token: string;
}

interface IProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthorizationForm: FC<IProps> = ({ setIsLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    setIsDisabled(true);
    fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('You are not authorized');
        }
        return response.json();
      })
      .then((data: IUserResponse) => {
        console.log(data);
        const { id, email, token } = data;
        LocalStorage.setItem('token', token);
        setIsLogin(true);
        console.log(id, email);
      })
      .catch((err) => {
        console.log(err);
        setError('Ошибка');
      })
      .finally(() => setIsDisabled(false));

    setEmail('');
    setPassword('');
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
        <Button
          onClick={handleClickButtonSendForm}
          variant="contained"
          disabled={isDisabled}
        >
          Отправить
        </Button>
      </Stack>

      {error ? (
        <Typography variant="body1" color="error" align="center" fontSize={16}>
          Ошибка ввода почты или пароля.
        </Typography>
      ) : null}
    </Box>
  );
};

export { AuthorizationForm };
