import { useSelector } from 'react-redux';
import { selectCurrentOfferData } from '../../redux/offer/offerSelectors';
import { selectCurrentPaymentId } from '../../redux/payUData/paymentSelectors';
import { PayUForm } from '../../Components/PayUForm/PayUForm';
import css from './BuyCourse.module.css';
import { useInView } from 'react-intersection-observer';
export const BuyCourse = () => {
  const sectionInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });

  const offerCourses = useSelector(selectCurrentOfferData);
  const pickedCourseId = useSelector(selectCurrentPaymentId);

  const pickedCourseData = offerCourses.find(
    offerCourse => offerCourse._id === pickedCourseId
  );
  return (
    <div className={css.paymentWrapper}>
      <div className="container" ref={sectionInView.ref}>
        {pickedCourseData === null || undefined ? (
          <p>Loading data</p>
        ) : (
          <div>
            <div className={css.titleWrapper}>
              <h2 className={css.courseTitle}>{pickedCourseData?.name}</h2>
              <p className={css.title}>
                After payment, you will receive access to the learning platform
              </p>
              <div
                className={`${css.spanLine} ${
                  sectionInView.inView && css.lineVisible
                }`}
              ></div>
            </div>
            <div className={css.paymentBox}>
              <div className={css.pickedCourseWrapper}>
                <h2 className={css.paymentBoxTitle}>
                  You are about to purchase:
                </h2>
                <div className={css.pickedCourseCard}>
                  <p className={css.pickedCourseCardName}>
                    <span className={css.courseName}>
                      {pickedCourseData?.name}
                    </span>
                  </p>
                  <p className={css.pickedCourseCardDescription}>
                    <span className={css.cardDescription}>
                      {pickedCourseData?.description.about}
                    </span>
                  </p>
                  <p className={css.pickedCourseCardAmount}>
                    For the amount:{' '}
                    <span className={css.pickedCourseCardPrice}>
                      {pickedCourseData?.price} ZŁ
                    </span>{' '}
                    (Gross + VAT)
                  </p>
                </div>
              </div>
              <div className={css.paymentForm}>
                <PayUForm
                  pickedCourseId={pickedCourseData?.targetCourseId}
                  pickedCourseName={pickedCourseData?.name}
                  pickedCoursePrice={pickedCourseData?.price}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
