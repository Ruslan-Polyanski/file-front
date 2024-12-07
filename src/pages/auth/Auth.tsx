import { FC, useState } from 'react';

const URL = 'http://localhost:3001/api/auth/login';

interface IUser {
  email: string;
  password: string;
}

interface IUserResponse {
  id: number;
  email: string;
  token: string;
}

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userDataResponse, setUserDataResponse] =
    useState<IUserResponse | null>(null);
  // const [isLogin, setIsLogin] = useState(false);
  // const [error, setError] = useState('');

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

  const handleClickButtonSendForm: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();
    const user: IUser = {
      email,
      password,
    };

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDataResponse(data);
      })
      .catch(() => {
        console.log('ConsoleError');
      });
  };

  return (
    <div>
      <form>
        <input value={email} type="text" onChange={handleChangeEmail} />
        <input
          value={password}
          type="password"
          onChange={handleChangePassword}
        />
        <button onClick={handleClickButtonSendForm}>Send</button>
      </form>
    </div>
  );
};

export { Auth };
