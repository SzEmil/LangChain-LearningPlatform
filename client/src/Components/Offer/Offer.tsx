import css from './Offer.module.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { CourseInfo } from '../CourseInfo/CourseInfo';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import progressImg from '../../images/people-and-technology.png';
import personStudingImg from '../../images/person-studying-online.png';
import personStudingAtDesk from '../../images/person-studying-at-a-desk.png';

export const Offer = () => {
  const language = useSelector(selectPageLanguage);
  const navigate = useNavigate();
  const sectionInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });

  return (
    <section className={css.offer} id="offer">
      <div className="container">
        <h2
          className={`${css.title} ${
            sectionInView.inView ? css.titleVisible : css.titleNoVisible
          }`}
        >
          {language === 'PL'
            ? 'Zacznij swoją karierę jako programista LangChain od zera!'
            : 'Start your career as a LangChain programmer from scratch!'}
        </h2>
        <div
          className={`${css.spanLine} ${
            sectionInView.inView && css.lineVisible
          }`}
        ></div>
        <p
          className={`${css.text} ${sectionInView.inView && css.titleVisible}`}
        >
          {language === 'PL'
            ? `Rozpocznij ekscytującą podróż od zupełnego początkującego do wykwalifikowanego programisty LangChain. Nasz kompleksowy kurs jest dostosowany do osób bez wcześniejszego doświadczenia programistycznego. Otwórz przed sobą świat programowania i uwolnij swój potencjał już dziś.`
            : `Embark on an exciting journey from absolute beginner to a skilled
            LangChain programmer. Our comprehensive course is tailored for those
            with no prior programming experience. Unlock the world of programming
            and unleash your potential today.`}
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
                {/* <GiChoice size={'100%'} /> */}
                <img
                  className={css.imageBox}
                  src={personStudingImg}
                  alt="people nad computer"
                />
              </div>
              <div className={css.descriptionBox}>
                <h3 className={css.itemHeader}>Choose course</h3>
                <p className={css.description}>
                  {language === 'PL'
                    ? `Jeśli jesteś gotowy/gotowa na zmianę branży lub rozszerzenie usług, teraz nadszedł czas, aby zdobyć umiejętności, których będą poszukiwać wszyscy przyszli programiści. To twój moment do zmiany swojego życia.`
                    : `If you're ready to shift industries or expand services, now's
                the time to acquire skills all future programmers will seek.`}
                </p>
                <div className={css.buttonBox}>
                  <button
                    className={css.button}
                    onClick={() => navigate('/courses')}
                  >
                    {language === 'PL' ? 'Dowiedz się Więcej' : 'Learn More'}
                  </button>
                </div>
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
                {/* <GiProgression size={'100%'} /> */}
                <img
                  className={css.imageBox}
                  src={personStudingAtDesk}
                  alt="people nad computer"
                />
              </div>
              <div className={css.descriptionBox}>
                <h3 className={css.itemHeader}>Enroll in Program</h3>
                <p className={css.description}>
                  {language === 'PL'
                    ? `Zapisz się na program LangChain, aby rewolucjonizować swoją podróż w świecie programowania. Odblokuj umiejętności umożliwiające dynamiczną zmianę kariery lub poszerzenie zakresu usług w świecie technologii.`
                    : `Enroll in LangChain's program to revolutionize your coding
                  journey. Unlock skills for a dynamic career shift or amplified
                  service range in the tech world.`}
                </p>
                <div className={css.buttonBox}>
                  <button
                    className={css.button}
                    onClick={() => navigate('/courses')}
                  >
                    {language === 'PL' ? 'Sprawdź Kursy' : 'Check Courses'}
                  </button>
                </div>
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
                {/* <BiMoneyWithdraw size={'100%'} /> */}
                <img
                  className={css.imageBox}
                  src={progressImg}
                  alt="people nad computer"
                />
              </div>
              <div className={css.descriptionBox}>
                <h3 className={css.itemHeader}>Start New Career</h3>
                <p className={css.description}>
                  {language === 'PL'
                    ? `Przyjmij program LangChain, aby kształtować swoją przyszłość w programowaniu. Zdobądź umiejętności na zmianę kariery lub wzmocnienie usług, wyróżniając się w rozwijającej się branży technologicznej.`
                    : `Embrace LangChain's program to shape your programming future.
                Gain skills for a career shift or service enhancement, standing
                out in evolving tech.`}
                </p>
                <div className={css.buttonBox}>
                  <button
                    className={css.button}
                    onClick={() => navigate('/courses')}
                  >
                    {language === 'PL' ? 'Kup Teraz' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <CourseInfo />
      </div>
    </section>
  );
};
