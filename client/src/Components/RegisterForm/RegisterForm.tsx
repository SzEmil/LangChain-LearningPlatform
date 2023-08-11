import { FormEvent } from 'react';
import css from './RegisterForm.module.css';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/user/userOperations';
import { useSelector } from 'react-redux';
import { selectAuthUserError } from '../../redux/user/userSelectors';
import { useNavigate } from 'react-router-dom';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';

type credentialsRegisterType = {
  username: string;
  email: string;
  password: string;
};
export const RegisterForm = () => {
  const language = useSelector(selectPageLanguage);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector(selectAuthUserError);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const credentials: credentialsRegisterType = {
      username: (form.elements.namedItem('username') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };

    await dispatch(register(credentials));
    navigate('/');
    form.reset();
  };
  return (
    <div className={css.formWrapper}>
      <form className={css.registrationForm} onSubmit={handleSubmit}>
        <h2>{language === 'PL' ? 'Rejestracja' : 'Register Now!'}</h2>
        <p>{error}</p>
        <div className={css.inputGroup}>
          <label htmlFor="username">
            {language === 'PL' ? 'Nazwa Użytkownika' : 'Username'}
          </label>
          <input type="text" id="username" name="username" required />
        </div>
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
          {language === 'PL' ? 'Zarejestruj' : 'Register'}
        </button>
      </form>
    </div>
  );
};
