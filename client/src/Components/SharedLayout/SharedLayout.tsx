// import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';
import { Link } from 'react-scroll';

export const SharedLayout = () => {
  return (
    <div className={css.sharedLayout}>
      <header className={css.header}>
        <div className={css.container}>
          <div className={css.navBar}>
            <h2 className={css.logo}>LangChain Academy</h2>
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
                    <a className={css.navItemLink}>Home</a>
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
                    <a className={css.navItemLink}>LangChain</a>
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
                    <a className={css.navItemLink}>Offer</a>
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
                    <a className={css.navItemLink}>About Me</a>
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass={css.acitveLink}
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                  >
                    <a className={css.navItemLink}>Contact</a>
                  </Link>
                </li>
              </ul>
            </nav>
            <button className={css.navBtn}>Get Started</button>
          </div>
        </div>
      </header>
      {/* <Suspense fallback={<div> Loading...</div>}> */}
      <Outlet />
      {/* </Suspense> */}
    </div>
  );
};
