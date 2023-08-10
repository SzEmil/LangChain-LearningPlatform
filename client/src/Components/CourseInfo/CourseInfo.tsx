import css from './CourseInfo.module.css';
import { useInView } from 'react-intersection-observer';
import { RiAccountBoxLine } from 'react-icons/ri';
import { GoVideo } from 'react-icons/go';
import { MdOutlineQuiz } from 'react-icons/md';
import { AiOutlineCode } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUserIsLoggedIn } from '../../redux/user/userSelectors';

export const CourseInfo = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  const courseInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });
  return (
    <div className={css.course} ref={courseInView.ref} id="howItWorks">
      <h2
        className={`${css.title} ${
          courseInView.inView ? css.titleVisible : css.titleNoVisible
        }`}
      >
        How it works
      </h2>
      <div
        className={`${css.spanLine} ${courseInView.inView && css.lineVisible}`}
      ></div>
      <ul className={css.list}>
        <li className={`${css.item} ${courseInView.inView && css.cardVisible}`}>
          <div className={css.card}>
            <h3 className={css.itemHeader}>
              Register for personal learning plarform
            </h3>
            <p className={css.description}>
              After successful login, you'll have the opportunity to purchase a
              course, which will be assigned to your account.
            </p>
            <div className={css.image}>
              <RiAccountBoxLine size={'100%'} />
            </div>
            {isLoggedIn ? (
              <button
                className={css.btnRegister}
                onClick={() => navigate('/courses')}
              >
                Buy now
              </button>
            ) : (
              <button
                className={css.btnRegister}
                onClick={() => navigate('/auth')}
              >
                Register Now
              </button>
            )}
          </div>
        </li>

        <li className={`${css.item} ${courseInView.inView && css.cardVisible}`}>
          <div className={css.card}>
            <h3 className={css.itemHeader}>
              Watch instructional videos prepared by me
            </h3>
            <p className={css.description}>
              Step by step, progress through successive stages of learning by
              watching specialized instructional videos containing essential
              knowledge for working with LangChain and Flowise.
            </p>
            <div className={css.image}>
              <GoVideo size={'100%'} />
            </div>
            <button
              className={css.btnRegister}
              onClick={() => navigate('/courses')}
            >
              Get Started
            </button>
          </div>
        </li>

        <li className={`${css.item} ${courseInView.inView && css.cardVisible}`}>
          <div className={css.card}>
            <h3 className={css.itemHeader}>
              Take quizzes to test your knowledge
            </h3>
            <p className={css.description}>
              After completing each learning stage, you can test your knowledge
              using an interactive quiz.
            </p>
            <div className={css.image}>
              <MdOutlineQuiz size={'100%'} />
            </div>
            <button
              className={css.btnRegister}
              onClick={() => navigate('/courses')}
            >
              Try it now
            </button>
          </div>
        </li>

        <li className={`${css.item} ${courseInView.inView && css.cardVisible}`}>
          <div className={css.card}>
            <h3 className={css.itemHeader}>Build your first no-code app</h3>
            <p className={css.description}>
              As part of the course, you'll have the opportunity to create your
              first no-code application using LangChain. This project can serve
              as a showcase in your portfolio.
            </p>
            <div className={css.image}>
              <AiOutlineCode size={'100%'} />
            </div>
            <button
              className={css.btnRegister}
              onClick={() => navigate('/courses')}
            >
              Show me
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};
