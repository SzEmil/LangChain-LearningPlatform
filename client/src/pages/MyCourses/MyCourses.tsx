import css from './MyCourses.module.css';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { useEffect } from 'react';
import { selectUserCoursesProgress } from '../../redux/user/userSelectors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getUserProgress } from '../../redux/user/userOperations';
import { nanoid } from '@reduxjs/toolkit';
import { useInView } from 'react-intersection-observer';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa6';
import { TbProgressCheck } from 'react-icons/tb';
import { MdQuiz } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const MyCourses = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const language = useSelector(selectPageLanguage);
  const coursesData = useSelector(selectUserCoursesProgress);

  const sectionInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });

  useEffect(() => {
    dispatch(getUserProgress());
  }, []);

  const cutDate = (date: string | null | undefined) => {
    const year = date!.slice(0, 10);
    const time = date!.slice(11, 16);

    return `${year}  ${time}`;
  };

  const handleOnClickStartCourse = (courseIdData: string) => {
    navigate(`/my-courses/${courseIdData}`);
  };
  return (
    <div className={css.myCourses}>
      <div className={css.container}>
        {coursesData !== null ? (
          <ul className={css.list} ref={sectionInView.ref}>
            {coursesData!.courses.map(course => (
              <li
                key={nanoid()}
                className={`${css.item} ${
                  sectionInView.inView && css.itemVisible
                }`}
              >
                <div className={css.card}>
                  <div className={css.infoBox}>
                    <h2 className={css.title}>{course.title}</h2>
                    <div className={css.dateBox}>
                      <BsFillCalendarDateFill size={16} />{' '}
                      <p className={css.date}>{cutDate(course.started)}</p>
                    </div>

                    <div
                      className={`${css.spanLine} ${
                        sectionInView.inView && css.lineVisible
                      }`}
                    ></div>
                    <p className={css.description}>{course.description}</p>
                    <div className={css.btnBox}>
                      <button
                        className={css.btn}
                        onClick={() =>
                          handleOnClickStartCourse(course.courseId)
                        }
                      >
                        <FaPlay size={16} />
                        {course.lastOpen ? (
                          <> {language === 'PL' ? 'Kontynuuj' : 'Continue'}</>
                        ) : (
                          <>{language === 'PL' ? 'Zacznij' : 'Start'}</>
                        )}
                      </button>
                      <div className={css.statsBox}>
                        <TbProgressCheck size={16} />
                        <p className={css.frame}>
                          {language === 'PL' ? 'Ukończono' : 'Progress'}{' '}
                          {course.progressData.sectionsCompleted}/
                          {course.progressData.sections.length}
                        </p>
                      </div>
                      <div className={css.statsBox}>
                        <MdQuiz size={16} />
                        <p className={css.frame}>
                          {language === 'PL' ? 'Quiz' : 'Quiz'}{' '}
                          {course.progressData.quizesCompleted}/
                          {course.progressData.sections.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={css.imgBox}>
                    <img
                      className={css.galleryImage}
                      src={'https://picsum.photos/350'}
                      alt="random pic"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Buy courses</p>
        )}
      </div>
    </div>
  );
};
