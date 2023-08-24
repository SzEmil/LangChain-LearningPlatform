import css from './UserProfile.module.css';
import { useSelector } from 'react-redux';
import { selectAuthUserData } from '../../redux/user/userSelectors';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { getUserPaymentsData } from '../../redux/user/userOperations';
import { selectUserPaymentsData } from '../../redux/user/userSelectors';
import { selectUserPaymentsIsLoading } from '../../redux/user/userSelectors';
import { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { nanoid } from '@reduxjs/toolkit';
import { FaUser } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';

export const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const language = useSelector(selectPageLanguage);
  const user = useSelector(selectAuthUserData);
  const isPaymentsLoading = useSelector(selectUserPaymentsIsLoading);
  const paymentsData = useSelector(selectUserPaymentsData);

  useEffect(() => {
    dispatch(getUserPaymentsData());
  }, []);

  const cutDate = (date: string | null | undefined) => {
    const year = date!.slice(0, 10);
    const time = date!.slice(11, 16);

    return `${year}  ${time}`;
  };

  return (
    <div className={css.profile}>
      <div className="container">
        <ul className={css.userList}>
          <li className={css.userListItem} key={nanoid()}>
            <FaUser size={24} />
            <p>
              {language === 'PL' ? 'Nazwa Użytkownika' : 'Username'}:{' '}
              {user.username}
            </p>
          </li>
          <li className={css.userListItem} key={nanoid()}>
            <MdEmail size={24} />
            <p>Email: {user.email}</p>
          </li>
          <li className={css.userListItem}>
            {isPaymentsLoading ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
            ) : (
              <div className={css.paymentsWrapper}>
                {paymentsData.length !== 0 ? (
                  <ul className={css.paymentsList}>
                    <h3>{language === 'PL' ? 'Płatności' : 'Payments'}</h3>
                    {paymentsData.map(payment => (
                      <li key={payment._id} className={css.paymentItem}>
                        <div className={css.titleWrapper}>
                          <p>{payment._id}</p>
                          <p>{cutDate(payment.updatedAt)}</p>
                        </div>
                        <p>Course Beginner{payment.refererToItem}</p>
                        <div className={css.titleWrapper}>
                          <p>
                            Bought for {payment.amount} {payment.currency}
                          </p>
                          <p>Status: {payment.paymentStatus}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Buy course</p>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
