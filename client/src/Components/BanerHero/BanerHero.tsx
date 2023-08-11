import css from './BanerHero.module.css';
import baner from '../../images/baner.jpg';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUserIsLoggedIn } from '../../redux/user/userSelectors';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';

export const BanerHero = () => {
  const language = useSelector(selectPageLanguage);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  return (
    <section className={css.baner} style={{ backgroundImage: baner }} id="home">
      <div className={css.container}>
        <div className={css.box}>
          <div className={css.sloganWrapper}>
            <h2 className={css.headerSecondary}>
              {language === 'PL'
                ? 'Zostań LangChain Developerem !'
                : 'Become LangChain Developer !'}
            </h2>
            <h1 className={css.headerPrimary}>
              {language === 'PL'
                ? 'Kurs LangChain dla Początkujących'
                : 'LangChain Course for Beginners !'}
            </h1>
            <div className={css.btnBox}>
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('courses')}
                  className={css.btnRegister}
                >
                  {language === 'PL' ? 'Kup Teraz' : 'Buy Now'}
                </button>
              ) : (
                <button
                  onClick={() => navigate('auth')}
                  className={css.btnRegister}
                >
                  {language === 'PL' ? 'Rejestracja' : 'Register Now'}
                </button>
              )}

              <button className={css.btnInfo}>
                <Link
                  to="howItWorks"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                >
                  <span className={css.btnInfoText}>
                    {language === 'PL' ? 'Jak to Działa' : 'How it works'}
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
