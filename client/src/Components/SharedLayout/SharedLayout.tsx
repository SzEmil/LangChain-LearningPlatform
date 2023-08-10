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

export const SharedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
                      <p className={css.navItemLink}>Home</p>
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
                      <p className={css.navItemLink}>Offer</p>
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
                      <p className={css.navItemLink}>About Me</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      activeClass={css.acitveLink}
                      to="contact"
                      spy={true}
                      smooth={true}
                      offset={-20}
                      duration={500}
                    >
                      <p className={css.navItemLink}>Contact</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
            {isLoggedIn ? (
              <div className={css.userWrapper}>
                <UserNav />
              </div>
            ) : (
              <>
                {location.pathname === '/courses' ? (
                  <button
                    className={css.navBtn}
                    onClick={() => navigate('auth')}
                  >
                    Register
                  </button>
                ) : (
                  <button
                    className={css.navBtn}
                    onClick={() => navigate('courses')}
                  >
                    Get Started
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      {/* <Suspense fallback={<div> Loading...</div>}> */}

      <Outlet />

      {/* </Suspense> */}
      <footer className={css.footer}>
        <div className="container">
          <div className={css.creatorBox}>
            <a
              className={css.creatorText}
              target="_blank"
              href="https://github.com/SzEmil"
            >
              App creator
            </a>
          </div>
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
            <div className={css.linksWrapper}>
              <a className={css.navItemLink}>Terms</a>
              <a className={css.navItemLink}>Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
