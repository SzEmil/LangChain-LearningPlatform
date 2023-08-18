import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectRecivedPaymentData } from '../../redux/payUData/paymentSelectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getPaymentData } from '../../redux/payUData/paymentOperations';
import { selectAuthUserIsLoggedIn } from '../../redux/user/userSelectors';
import { IoReturnUpBack } from 'react-icons/io5';
import css from './PaymentStatus.module.css';
import { useNavigate } from 'react-router-dom';
import { MdPending } from 'react-icons/md';
import { MdOutlineCancel } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FiRefreshCcw } from 'react-icons/fi';

export const PaymentStatus = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  const { paymentId } = useParams();
  const paymentData = useSelector(selectRecivedPaymentData);

  const dispatch: AppDispatch = useDispatch();
  console.log(paymentData);
  useEffect(() => {
    if (isLoggedIn) dispatch(getPaymentData(paymentId));
  }, []);

  return (
    <div className={css.paymentStatus}>
      <button className={css.goBackBtn} onClick={() => navigate('/')}>
        <IoReturnUpBack size={46} />
      </button>
      <div className={css.card}>
        <div className={css.statusBox}>
          <h2 className={css.paymentTitle}>Payment: {paymentId}</h2>
          {paymentData?.paymentStatus === 'COMPLETED' && (
            <AiFillCheckCircle size={36} />
          )}
          {paymentData?.paymentStatus === 'PENDING' && <MdPending size={36} />}
          {paymentData?.paymentStatus === 'CANCELED' && (
            <MdOutlineCancel size={36} />
          )}
        </div>
        <p>{paymentData?.refererToItem}</p>
        <p>
          Bought for: {paymentData?.amount} {paymentData?.currency}
        </p>
        <div className={css.statusRefreshBox}>
          <p>Status: {paymentData?.paymentStatus}</p>
          <button
            className={css.refreshBtn}
            onClick={() => dispatch(getPaymentData(paymentId))}
          >
            <FiRefreshCcw size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
