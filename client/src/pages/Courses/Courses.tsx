import css from './Courses.module.css';
import { useEffect, useState } from 'react';
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

export const Courses = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const currentOfferData = useSelector(selectCurrentOfferData);
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);

  const courseInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: true,
  });

  const getOfferData = async () => {
    await dispatch(getCurrentOffer());
  };
  useEffect(() => {
    if (!isMounted) {
      getOfferData();
      setIsMounted(true);
    }
  }, [isMounted]);

  const handleOnClickPickCoursToBuy = (courseId: string) => {
    dispatch(pickCourse(courseId));
    navigate('/payment');
  };

  return (
    <div className={css.courses}>
      <div className={css.container}>
        <div className={css.titleWrapper} ref={courseInView.ref}>
          <div className={css.titleBox}>
            <h2 className={css.title}>LangChain No-Code online courses</h2>
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
                    {isLoggedIn ? (
                      <button
                        className={css.btnBuy}
                        onClick={() => handleOnClickPickCoursToBuy(offer._id)}
                      >
                        Buy Now
                      </button>
                    ) : (
                      <button
                        className={css.btnBuy}
                        onClick={() => navigate('/auth')}
                      >
                        Register free account to purchase
                      </button>
                    )}
                    <p className={css.price}>{offer.price} ZŁ</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No courses </p>
          )}
        </ul>
      </div>
    </div>
  );
};
