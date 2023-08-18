import css from './CourseInfo.module.css';
import { useInView } from 'react-intersection-observer';
import { RiAccountBoxLine } from 'react-icons/ri';
import { GoVideo } from 'react-icons/go';
import { MdOutlineQuiz } from 'react-icons/md';
import { AiOutlineCode } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUserIsLoggedIn } from '../../redux/user/userSelectors';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { TestQuiz } from '../testQuiz/TestQuiz';
import { useState } from 'react';
import { quizType } from '../testQuiz/TestQuizData';
import { quizData } from '../testQuiz/TestQuizData';

export const CourseInfo = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStart, setQuiz] = useState<quizType>();

  const language = useSelector(selectPageLanguage);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  const courseInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });

  const handleOnClickOpenQuiz = () => {
    setQuizOpen(true);
    if (language === 'PL') {
      setQuiz(quizData.testPL);
    } else {
      setQuiz(quizData.testENG);
    }
  };
  return (
    <div className={css.course} ref={courseInView.ref} id="howItWorks">
      <h2
        className={`${css.title} ${
          courseInView.inView ? css.titleVisible : css.titleNoVisible
        }`}
      >
        {language === 'PL' ? 'Jak To Działa' : '  How It Works'}
      </h2>
      <div
        className={`${css.spanLine} ${courseInView.inView && css.lineVisible}`}
      ></div>
      <ul className={css.list}>
        <li className={`${css.item} ${courseInView.inView && css.cardVisible}`}>
          <div className={css.card}>
            <h3 className={css.itemHeader}>
              {language === 'PL'
                ? 'Zarejestruj się by uzyskać dostęp do platformy do nauki'
                : 'Register for personal learning plarform'}
            </h3>
            <p className={css.description}>
              {language === 'PL'
                ? `Po udanym zalogowaniu będziesz mieć możliwość zakupu kursu, który zostanie przypisany do Twojego konta.`
                : `After successful login, you'll have the opportunity to purchase a
              course, which will be assigned to your account.`}
            </p>
            <div className={css.image}>
              <RiAccountBoxLine size={'100%'} />
            </div>
            {isLoggedIn ? (
              <button
                className={css.btnRegister}
                onClick={() => navigate('/courses')}
              >
                {language === 'PL' ? 'Kup Teraz' : 'Buy Now'}
              </button>
            ) : (
              <button
                className={css.btnRegister}
                onClick={() => navigate('/auth')}
              >
                {language === 'PL' ? 'Rejestracja' : 'Register Now'}
              </button>
            )}
          </div>
        </li>

        <li className={`${css.item} ${courseInView.inView && css.cardVisible}`}>
          <div className={css.card}>
            <h3 className={css.itemHeader}>
              {language === 'PL'
                ? 'Oglądaj filmy instruktarzowe przygotowane przeze mnie'
                : 'Watch instructional videos prepared by me'}
            </h3>
            <p className={css.description}>
              {language === 'PL'
                ? `Krok po kroku, posuń się przez kolejne etapy nauki, oglądając specjalistyczne filmy instruktażowe zawierające niezbędną wiedzę do pracy z LangChain i Flowise.`
                : `Step by step, progress through successive stages of learning by
              watching specialized instructional videos containing essential
              knowledge for working with LangChain and Flowise.`}
            </p>
            <div className={css.image}>
              <GoVideo size={'100%'} />
            </div>
            <button
              className={css.btnRegister}
              onClick={() => navigate('/courses')}
            >
              {language === 'PL' ? 'Zaczynamy' : 'Get Started'}
            </button>
          </div>
        </li>

        <li className={`${css.item} ${courseInView.inView && css.cardVisible}`}>
          <div className={css.card}>
            <h3 className={css.itemHeader}>
              {language === 'PL'
                ? 'Sprawdź swoją więdzę korzsytając z quizów'
                : 'Take quizzes to test your knowledge'}
            </h3>
            <p className={css.description}>
              {language === 'PL'
                ? `Po ukończeniu każdego etapu nauki, będziesz mógł/mogła przetestować swoją wiedzę za pomocą interaktywnego quizu.`
                : `After completing each learning stage, you can test your knowledge
              using an interactive quiz.`}
            </p>
            <div className={css.image}>
              <MdOutlineQuiz size={'100%'} />
            </div>
            <button
              className={css.btnRegister}
              onClick={() => handleOnClickOpenQuiz()}
            >
              {language === 'PL' ? 'Wypróbuj' : 'Try it now'}
            </button>
          </div>
        </li>

        <li className={`${css.item} ${courseInView.inView && css.cardVisible}`}>
          <div className={css.card}>
            <h3 className={css.itemHeader}>
              {language === 'PL'
                ? 'Stwórz swoją pierwszą aplikację no-code'
                : 'Build your first no-code app'}
            </h3>
            <p className={css.description}>
              {language === 'PL'
                ? `W ramach kursu będziesz miał/a okazję stworzyć swoją pierwszą aplikację bez kodowania przy użyciu LangChain. Ten projekt może posłużyć jako element wizytówki w Twoim portfolio.`
                : `As part of the course, you'll have the opportunity to create your
              first no-code application using LangChain. This project can serve
              as a showcase in your portfolio.`}
            </p>
            <div className={css.image}>
              <AiOutlineCode size={'100%'} />
            </div>
            <button
              className={css.btnRegister}
              onClick={() => navigate('/courses')}
            >
              {language === 'PL' ? `Pokaż` : 'Show me'}
            </button>
          </div>
        </li>
      </ul>
      {quizOpen && (
        <div className={css.quizBackdrop}>
          <div className={css.quizWrapper}>
            <TestQuiz setQuizOpen={setQuizOpen} quizStart={quizStart} />
          </div>
        </div>
      )}
    </div>
  );
};
