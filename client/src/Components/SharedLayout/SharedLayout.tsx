// import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';
import { Link } from 'react-scroll';
import { FaFacebookF } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { UserNav } from '../userNav/userNav';
import { useSelector } from 'react-redux';
import { selectAuthUserIsLoggedIn } from '../../redux/user/userSelectors';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setLanguage } from '../../redux/globals/globalsSlice';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { selectCurrentCourseId } from '../../redux/courses/coursesSelectors';

export const SharedLayout = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const language = useSelector(selectPageLanguage);
  const currentCourseId = useSelector(selectCurrentCourseId);

  const closeUserNav = () => {
    setUserModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (userModalOpen && !event.target.closest(`.${css.userWrapper}`)) {
        closeUserNav();
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [userModalOpen]);

  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  function getCurrentYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear;
  }
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = _.throttle(() => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOnClickChangeLanguage = (lang: String) => {
    dispatch(setLanguage(lang));
  };
  return (
    <div className={css.sharedLayout}>
      <header className={`${css.header} ${isScrolled && css.movedHeader}`}>
        <div className={css.container}>
          <div className={css.navBar}>
            <h2 className={css.logo} onClick={() => navigate('/')}>
              LangChain Academy
            </h2>
            {location.pathname === '/' && (
              <nav>
                <ul className={css.navList}>
                  <li>
                    <Link
                      activeClass={css.acitveLink}
                      to="home"
                      spy={true}
                      smooth={true}
                      offset={-150}
                      duration={500}
                    >
                      <p className={css.navItemLink}>
                        {language === 'ENG' && <span>Home</span>}
                        {language === 'PL' && <span>Strona główna</span>}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      activeClass={css.acitveLink}
                      to="aboutLangChain"
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                    >
                      <p className={css.navItemLink}>LangChain</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      activeClass={css.acitveLink}
                      to="offer"
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                    >
                      <p className={css.navItemLink}>
                        {language === 'PL' ? 'Oferta' : 'Offer'}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      activeClass={css.acitveLink}
                      to="aboutMe"
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                    >
                      <p className={css.navItemLink}>
                        {language === 'PL' ? 'O mnie' : 'About Me'}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      activeClass={css.acitveLink}
                      to="contact"
                      spy={true}
                      smooth={true}
                      offset={100}
                      duration={500}
                    >
                      <p className={css.navItemLink}>
                        {language === 'PL' ? 'Kontakt' : 'Contact'}
                      </p>
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
            {isLoggedIn ? (
              <div className={css.userWrapper}>
                {location.pathname !== `/my-courses/${currentCourseId}` ? (
                  <div className={css.btnLanguageWrapper}>
                    <button
                      className={`${css.languageBtn} ${
                        language === 'PL' && css.acitveLink
                      }`}
                      onClick={() => handleOnClickChangeLanguage('PL')}
                    >
                      PL
                    </button>
                    <p>/</p>
                    <button
                      className={`${css.languageBtn} ${
                        language !== 'PL' && css.acitveLink
                      }`}
                      onClick={() => handleOnClickChangeLanguage('ENG')}
                    >
                      ENG
                    </button>
                  </div>
                ) : (
                  <p>{language}</p>
                )}
                <UserNav
                  setUserModalOpen={setUserModalOpen}
                  userModalOpen={userModalOpen}
                />
              </div>
            ) : (
              <div className={css.btnLanguageBox}>
                <div className={css.btnLanguageWrapper}>
                  <button
                    className={`${css.languageBtn} ${
                      language === 'PL' && css.acitveLink
                    }`}
                    onClick={() => handleOnClickChangeLanguage('PL')}
                  >
                    PL
                  </button>
                  <p>/</p>
                  <button
                    className={`${css.languageBtn} ${
                      language !== 'PL' && css.acitveLink
                    }`}
                    onClick={() => handleOnClickChangeLanguage('ENG')}
                  >
                    ENG
                  </button>
                </div>
                {location.pathname === '/courses' ? (
                  <button
                    className={css.navBtn}
                    onClick={() => navigate('auth')}
                  >
                    {language === 'PL' ? 'Zarejestruj' : 'Register'}
                  </button>
                ) : (
                  <button
                    className={css.navBtn}
                    onClick={() => navigate('courses')}
                  >
                    {language === 'PL' ? 'Zaczynamy' : 'Get Started'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      {/* <Suspense fallback={<div> Loading...</div>}> */}

      <Outlet />

      {/* </Suspense> */}
      <footer className={css.footer}>
        <div className="container">
          <div className={css.footerWrapper}>
            <div>
              <ul className={css.socialList}>
                <li>
                  <a href="/" className={css.socialLink}>
                    <FaFacebookF size={24} />
                  </a>
                </li>
                <li>
                  <a href="/" className={css.socialLink}>
                    <SiTiktok size={24} />
                  </a>
                </li>
              </ul>
              <p>©{getCurrentYear()} LangChain Academy</p>
            </div>
            <div>
              <div className={css.linksWrapper}>
                <a className={css.navItemLink}>
                  {language === 'PL' ? 'Regulamin' : 'Terms'}
                </a>
                <a className={css.navItemLink}>
                  {language === 'PL'
                    ? 'Polityka prywatności'
                    : 'Privacy Policy'}
                </a>
              </div>
              <a
                className={css.creatorLink}
                target="_blank"
                href="https://github.com/SzEmil"
              >
                {language === 'PL' ? 'Autor aplikacji' : 'App Creator'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
