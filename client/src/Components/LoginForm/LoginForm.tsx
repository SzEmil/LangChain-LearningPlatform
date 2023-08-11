import css from './LoginForm.module.css';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/user/userOperations';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';

type credentialsLoginType = {
  email: string;
  password: string;
};
export const LoginForm = () => {
  const language = useSelector(selectPageLanguage);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const credentials: credentialsLoginType = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };

    await dispatch(logIn(credentials));
    navigate('/');
    form.reset();
  };
  return (
    <div className={css.formWrapper}>
      <form className={css.loginForm} onSubmit={handleSubmit}>
        <h2>{language === 'PL' ? 'Logowanie' : 'Login'}</h2>
        <div className={css.inputGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="password">
            {language === 'PL' ? 'Hasło' : 'Password'}
          </label>
          <input type="password" id="password" name="password" required />
        </div>
        <button className={css.button} type="submit">
          {language === 'PL' ? 'Zaloguj' : 'Log in'}
        </button>
      </form>
    </div>
  );
};
