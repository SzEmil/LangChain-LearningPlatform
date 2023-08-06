// import { Suspense } from 'react';
 import {  Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';

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
                  <a className={css.navItemLink}>Home</a>
                </li>
                <li>
                  <a className={css.navItemLink}>About</a>
                </li>
                <li>
                  <a className={css.navItemLink}>Contact</a>
                </li>
              </ul>
            </nav>
            <button className={css.navBtn}>Buy Now</button>
          </div>
        </div>
      </header>
      {/* <Suspense fallback={<div> Loading...</div>}> */}
      <Outlet />
      {/* </Suspense> */}
    </div>
  );
};
