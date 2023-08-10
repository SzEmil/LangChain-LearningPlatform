import { useState } from 'react';
import { RegisterForm } from '../../Components/RegisterForm/RegisterForm';
import { LoginForm } from '../../Components/LoginForm/LoginForm';
import css from './AuthUser.module.css';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBack } from 'react-icons/io5';

export const AuthUser = () => {
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(true);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={css.authPage}>
      <button className={css.goBackButton} onClick={() => navigate(-1)}>
        <IoReturnUpBack size={34} />
      </button>
      <div className={css.formsWrapper}>
        {isRegisterFormVisible && !isLoginFormVisible && (
          <>
            <RegisterForm />
            <p className={css.text}>
              Already have an account?{' '}
              <button
                className={css.changeFormBtn}
                onClick={() => {
                  setIsLoginFormVisible(true);
                  setIsRegisterFormVisible(false);
                }}
              >
                Login
              </button>
            </p>
          </>
        )}

        {isLoginFormVisible && !isRegisterFormVisible && (
          <>
            <LoginForm />
            <p className={css.text}>
              Still no account?
              <button
                className={css.changeFormBtn}
                onClick={() => {
                  setIsLoginFormVisible(false);
                  setIsRegisterFormVisible(true);
                }}
              >
                Register
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
