import { useState } from 'react';
import { RegisterForm } from '../../Components/RegisterForm/RegisterForm';
import { LoginForm } from '../../Components/LoginForm/LoginForm';
import css from './AuthUser.module.css';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBack } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';

export const AuthUser = () => {
  const language = useSelector(selectPageLanguage);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(true);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={css.authPage}>
      <button className={css.goBackButton} onClick={() => navigate('/')}>
        <IoReturnUpBack size={34} />
      </button>
      <div className={css.formsWrapper}>
        {isRegisterFormVisible && !isLoginFormVisible && (
          <>
            <RegisterForm />
            <p className={css.text}>
              {language === 'PL'
                ? 'Posiadasz już konto w serwisie?'
                : 'Already have an account?'}
              <button
                className={css.changeFormBtn}
                onClick={() => {
                  setIsLoginFormVisible(true);
                  setIsRegisterFormVisible(false);
                }}
              >
                {language === 'PL' ? 'Zaloguj się' : 'LogIn'}
              </button>
            </p>
          </>
        )}

        {isLoginFormVisible && !isRegisterFormVisible && (
          <>
            <LoginForm />
            <p className={css.text}>
              {language === 'PL'
                ? 'Nadal nie posiadasz konta?'
                : 'Still no account?'}

              <button
                className={css.changeFormBtn}
                onClick={() => {
                  setIsLoginFormVisible(false);
                  setIsRegisterFormVisible(true);
                }}
              >
                {language === 'PL' ? 'Rejestracja' : 'Register'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
