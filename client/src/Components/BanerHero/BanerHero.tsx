import css from './BanerHero.module.css';
import baner from '../../images/baner.jpg';
export const BanerHero = () => {
  return (
    <section className={css.baner} style={{ backgroundImage: baner }}>
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
              <button
                onClick={() => console.log('register')}
                className={css.btnRegister}
              >
                Register Now
              </button>
              <button className={css.btnInfo}>How it works</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
