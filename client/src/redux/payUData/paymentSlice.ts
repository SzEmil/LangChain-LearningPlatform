import { createSlice } from '@reduxjs/toolkit';
import { createNewPayment } from './paymentOperations';
import { getPaymentData } from './paymentOperations';

type paymentStatusDataType = {
  amount: string;
  refererToItem: string;
  currency: string;
  paymentStatus: string;
};
export type paymentStateType = {
  courseId: string | null;
  redirectLink: string | null;
  recivedPaymentData: paymentStatusDataType | null;
  isLoading: boolean;
  error: any;
};

const paymentInitialState: paymentStateType = {
  courseId: null,
  redirectLink: null,
  isLoading: false,
  error: null,
  recivedPaymentData: null,
};

const paymentSlice = createSlice({
  name: 'payement',
  initialState: paymentInitialState,
  reducers: {
    importInfoData: state => state,
    pickCourse: (state, action) => {
      state.courseId = action.payload;
    },
    userRedirected: state => {
      state.redirectLink = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(createNewPayment.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createNewPayment.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createNewPayment.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.redirectLink = action.payload;
    });

    builder.addCase(getPaymentData.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPaymentData.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPaymentData.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.recivedPaymentData = action.payload;
    });
  },
});

export const { importInfoData, pickCourse, userRedirected } =
  paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
