import { useSelector } from 'react-redux';
import { selectorEmail, selectorError, selectorIsAuth, selectorPassword, selectorStatus } from './selectors';
import { validateEmail, validateForm, validatePassword } from '@/shared/lib/utils/validate-form';
import { useAppDispatch } from '@/app/store';
import { logIn, setEmail, setError, setPassword, setStatus } from './auth.slice';

export const useDataFormAuth = () => {
    const dispatch = useAppDispatch();

    const isAuth = useSelector(selectorIsAuth);
    const status = useSelector(selectorStatus);
    const error = useSelector(selectorError);
    const email = useSelector(selectorEmail);
    const password = useSelector(selectorPassword);

    const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch(setEmail(event.target.value));
    };

    const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch(setPassword(event.target.value));
    };

    const handleClickSendForm = () => {
        const dataForm = {
            email,
            password,
        };

        const { result, message } = validateForm(dataForm, [validateEmail, validatePassword]);

        if (result) {
            dispatch(logIn(dataForm));
        } else {
            dispatch(setStatus('error'));
            dispatch(setError(message));
        }
    };

    const handleClickClearForm = () => {
        dispatch(setEmail(''));
        dispatch(setPassword(''));
        dispatch(setError(''));
    };

    return {
        isAuth,
        status,
        error,
        email,
        handleChangeEmail,
        password,
        handleChangePassword,
        handleClickSendForm,
        handleClickClearForm,
    };
};
