import { Section } from '../../types/courseTypes';
import css from './CourseSection.module.css';
import { useState } from 'react';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { useSelector } from 'react-redux';
import { TestQuiz } from '../testQuiz/TestQuiz';
import { HiMenu } from 'react-icons/hi';
import { MdMenuBook } from 'react-icons/md';
import { BsQuestionSquareFill } from 'react-icons/bs';

type CourseSectionPropsType = {
  section: Section | undefined;
  setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CourseSection = ({
  section,
  setIsMobileNavOpen,
}: CourseSectionPropsType) => {
  const [isTextBookOpen, setIsTextBookOpen] = useState(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const language = useSelector(selectPageLanguage);

  const handleOpenQuiz = () => {
    setIsTextBookOpen(false);
    setIsQuizOpen(true);
  };

  const handleOpenTextBook = () => {
    setIsQuizOpen(false);
    setIsTextBookOpen(true);
  };

  return (
    <div className={css.courseSection}>
      <div className={css.titleWrapper}>
        <div className={css.navWrapper}>
          <button
            className={`${css.navBtn} ${css.navBtnActive}`}
            onClick={() => {
              setIsMobileNavOpen(true);
            }}
          >
            <HiMenu size={38} />
          </button>
          <h2 className={css.title}>{section?.name}</h2>
        </div>
        <div className={css.btnWrapper}>
          <button
            onClick={() => handleOpenTextBook()}
            className={`${css.quizBtn} ${isTextBookOpen && css.btnActive}`}
          >
            {language === 'PL' ? 'Dokumentacja' : 'TextBook'}
          </button>
          <button
            onClick={() => handleOpenQuiz()}
            className={`${css.quizBtn} ${isQuizOpen && css.btnActive}`}
          >
            Quiz
          </button>

          <button
            onClick={() => handleOpenTextBook()}
            className={`${css.quizNavBtn} ${isTextBookOpen && css.btnActive}`}
          >
            <MdMenuBook size={32} />
          </button>
          <button
            onClick={() => handleOpenQuiz()}
            className={`${css.quizNavBtn} ${isQuizOpen && css.btnActive}`}
          >
            <BsQuestionSquareFill size={32} />
          </button>
        </div>
      </div>
      <div className={css.content}>
        {isTextBookOpen && (
          <div>
            <p className={css.description}>{section?.description}</p>
            <iframe
              width="100%"
              height="720px"
              src="https://www.youtube.com/embed/aywZrzNaKjs"
              title={section?.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {isQuizOpen && (
          <div className={css.quizWrapper}>
            <TestQuiz setQuizOpen={setIsQuizOpen} quizStart={section?.quiz} />
          </div>
        )}
      </div>
    </div>
  );
};
