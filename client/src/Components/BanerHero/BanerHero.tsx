import css from './BanerHero.module.css';
import baner from '../../images/baner.jpg';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUserIsLoggedIn } from '../../redux/user/userSelectors';
export const BanerHero = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  return (
    <section className={css.baner} style={{ backgroundImage: baner }} id="home">
      <div className={css.container}>
        <div className={css.box}>
          <div className={css.sloganWrapper}>
            <h2 className={css.headerSecondary}>
              Become LangChain Developer !
            </h2>
            <h1 className={css.headerPrimary}>
              LangChain Course for Beginners
            </h1>
            <div className={css.btnBox}>
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('courses')}
                  className={css.btnRegister}
                >
                  Buy Now
                </button>
              ) : (
                <button
                  onClick={() => navigate('auth')}
                  className={css.btnRegister}
                >
                  Register Now
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
                  <span className={css.btnInfoText}>How it works</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
