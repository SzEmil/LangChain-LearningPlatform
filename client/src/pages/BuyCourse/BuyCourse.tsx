import { useSelector } from 'react-redux';
import { selectCurrentOfferData } from '../../redux/offer/offerSelectors';
import { selectCurrentPaymentId } from '../../redux/payUData/paymentSelectors';
import { PayUForm } from '../../Components/PayUForm/PayUForm';
import css from './BuyCourse.module.css';
export const BuyCourse = () => {
  const offerCourses = useSelector(selectCurrentOfferData);
  const pickedCourseId = useSelector(selectCurrentPaymentId);

  const pickedCourseData = offerCourses.find(
    offerCourse => offerCourse._id === pickedCourseId
  );
  return (
    <div className={css.paymentWrapper}>
      <div className={css.container}>
        BuyCourse
        {pickedCourseData === null || undefined ? (
          <p>Loading data</p>
        ) : (
          <div className={css.paymentBox}>
            <div className={css.pickedCourseCard}>
              You want buy: {pickedCourseData?.name} for{' '}
              {pickedCourseData?.price} ZŁ
            </div>
            <div className={css.paymentForm}>
              <PayUForm pickedCourseId={pickedCourseData?.targetCourseId}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
