import css from './Courses.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getCurrentOffer } from '../../redux/offer/offerOperations';
import { useSelector } from 'react-redux';
import { selectCurrentOfferData } from '../../redux/offer/offerSelectors';
import { nanoid } from '@reduxjs/toolkit';
import { TiTick } from 'react-icons/ti';
import { useInView } from 'react-intersection-observer';
import { selectAuthUserIsLoggedIn } from '../../redux/user/userSelectors';
import { useNavigate } from 'react-router-dom';
import { pickCourse } from '../../redux/payUData/paymentSlice';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { selectAuthUserCourses } from '../../redux/user/userSelectors';
import { selectAuthUserEmailConfrimed } from '../../redux/user/userSelectors';

export const Courses = () => {
  const language = useSelector(selectPageLanguage);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const userCoursesIds = useSelector(selectAuthUserCourses);
  const isEmailConfirmed = useSelector(selectAuthUserEmailConfrimed);
  const currentOfferData = useSelector(selectCurrentOfferData);

  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);

  const courseInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: true,
  });

  const getOfferData = async () => {
    const offerObjectData = {
      language: language,
    };
    await dispatch(getCurrentOffer(offerObjectData));
  };
  useEffect(() => {
    getOfferData();
  }, [language]);

  const handleOnClickPickCoursToBuy = (courseId: string) => {
    dispatch(pickCourse(courseId));
    navigate('/payment');
  };

  return (
    <div className={css.courses}>
      <div className="container">
        <div className={css.titleWrapper} ref={courseInView.ref}>
          <div className={css.titleBox}>
            <h2 className={css.title}>
              {language === 'PL'
                ? 'Aktualne Kursy LangChain'
                : 'LangChain No-Code online courses'}
            </h2>
            <div
              className={`${css.spanLine} ${
                courseInView.inView && css.lineMainVisible
              }`}
            ></div>
          </div>
        </div>
        <ul className={css.courseList}>
          {currentOfferData.length !== 0 ? (
            currentOfferData.map(offer => (
              <li key={offer._id} className={css.courseItem}>
                <div className={css.courseCard}>
                  <p className={css.courseType}>COURSE</p>
                  <h3 className={css.courseTitle}>{offer.name}</h3>
                  <div
                    className={`${css.spanLine} ${
                      courseInView.inView && css.lineCourseVisible
                    }`}
                  ></div>
                  <p className={css.courseDescription}>
                    {offer.description.about}
                  </p>
                  <ul className={css.highlightsList}>
                    {offer.description.highlights.map(highlight => (
                      <li className={css.highlightsItem} key={nanoid()}>
                        <div className={css.highlightsIcon}>
                          <TiTick size={34} />
                        </div>
                        <p className={css.highlightsText}>{highlight}</p>
                      </li>
                    ))}
                  </ul>
                  <div className={css.btnBox}>
                    {isEmailConfirmed ? (
                      <>
                        {isLoggedIn ? (
                          <>
                            {userCoursesIds.some(
                              course => course === offer.targetCourseId
                            ) ? (
                              <div className={css.infoText}>
                                <TiTick size={28} />

                                <p>
                                  {language === 'PL'
                                    ? 'Kupione'
                                    : 'Already Bought'}
                                </p>
                              </div>
                            ) : (
                              <button
                                className={css.btnBuy}
                                onClick={() =>
                                  handleOnClickPickCoursToBuy(offer._id)
                                }
                              >
                                {language === 'PL' ? 'Kup Teraz' : 'Buy Now'}
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            className={css.btnBuy}
                            onClick={() => navigate('/auth')}
                          >
                            {language === 'PL'
                              ? 'Zarejestruj Się By Kupić'
                              : 'Register Free Account To Purchase'}
                          </button>
                        )}
                        <p className={css.price}>{offer.price} ZŁ</p>
                      </>
                    ) : (
                      <p className={css.infoText}>
                        {language === 'PL'
                          ? 'Zweryfikuj konto'
                          : 'Account Not Verified'}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </ul>
      </div>
    </div>
  );
};
