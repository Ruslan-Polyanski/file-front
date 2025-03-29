import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';

export const useDataFormAuth = () => {
      const isAuth = useSelector((state: RootState) => state.auth.isAuth);
      const errorAuth = useSelector((state: RootState) => state.auth.errorAuth);
      const email = useSelector((state: RootState) => state.auth.email);
      const password = useSelector((state: RootState) => state.auth.password);

    return { isAuth, errorAuth, email, password }
}