import { paymentStateType } from './paymentSlice';
export const selectCurrentPaymentId = (state: { payment: paymentStateType }) =>
  state.payment.courseId;
