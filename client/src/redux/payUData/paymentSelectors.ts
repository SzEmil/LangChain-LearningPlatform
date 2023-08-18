import { paymentStateType } from './paymentSlice';
export const selectCurrentPaymentId = (state: { payment: paymentStateType }) =>
  state.payment.courseId;

export const selectRedirectLink = (state: { payment: paymentStateType }) =>
  state.payment.redirectLink;

export const selectRecivedPaymentData = (state: {
  payment: paymentStateType;
}) => state.payment.recivedPaymentData;
