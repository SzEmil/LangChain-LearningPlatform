import css from './Offer.module.css';
import { GiChoice } from 'react-icons/gi';
import { GiProgression } from 'react-icons/gi';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { CourseInfo } from '../CourseInfo/CourseInfo';

export const Offer = () => {
  const sectionInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });

  return (
    <section className={css.offer} id="offer">
      <div className={css.container}>
        <h2
          className={`${css.title} ${
            sectionInView.inView ? css.titleVisible : css.titleNoVisible
          }`}
        >
          Start your career as a LangChain programmer from scratch!
        </h2>
        {/* <h3
          className={`${css.headerSecondary} ${
            sectionInView.inView ? css.titleVisible : css.titleNoVisible
          }`}
        >
          A few steps to the profession of the future
        </h3> */}
        <div
          className={`${css.spanLine} ${
            sectionInView.inView && css.lineVisible
          }`}
        ></div>
        <p
          className={`${css.text} ${sectionInView.inView && css.titleVisible}`}
        >
          Embark on an exciting journey from absolute beginner to a skilled
          LangChain programmer. Our comprehensive course is tailored for those
          with no prior programming experience. Unlock the world of programming
          and unleash your potential today
        </p>
        <ul className={css.list} ref={sectionInView.ref}>
          <li
            className={`${css.item} ${
              sectionInView.inView ? css.cardVisible : css.cardNoVisible
            }`}
          >
            <div className={css.itemArrow}>
              <AiOutlineArrowRight size={28} />
            </div>
            <div className={css.card}>
              <div className={css.image}>
                <GiChoice size={'100%'} />
              </div>
              <h3 className={css.itemHeader}>Choose course</h3>
              <p className={css.description}>
                If you're ready to shift industries or expand services, now's
                the time to acquire skills all future programmers will seek.
              </p>
              <div className={css.buttonBox}>
                <button className={css.button}>Learn More</button>
              </div>
            </div>
          </li>

          <li
            className={`${css.item} ${
              sectionInView.inView ? css.cardVisible : null
            }`}
          >
            <div className={css.itemArrow}>
              <AiOutlineArrowRight size={28} />
            </div>
            <div className={css.card}>
              <div className={css.image}>
                <GiProgression size={'100%'} />
              </div>
              <h3 className={css.itemHeader}>Enroll in Program</h3>
              <p className={css.description}>
                Enroll in LangChain's program to revolutionize your coding
                journey. Unlock skills for a dynamic career shift or amplified
                service range in the tech world.
              </p>
              <div className={css.buttonBox}>
                <button className={css.button}>Check Courses</button>
              </div>
            </div>
          </li>

          <li
            className={`${css.item} ${
              sectionInView.inView ? css.cardVisible : null
            }`}
          >
            <div className={css.card}>
              <div className={css.image}>
                <BiMoneyWithdraw size={'100%'} />
              </div>
              <h3 className={css.itemHeader}>Start New Career</h3>
              <p className={css.description}>
                Embrace LangChain's program to shape your programming future.
                Gain skills for a career shift or service enhancement, standing
                out in evolving tech.
              </p>
              <div className={css.buttonBox}>
                <button className={css.button}>Buy Now</button>
              </div>
            </div>
          </li>
        </ul>
        <CourseInfo />
      </div>
    </section>
  );
};
