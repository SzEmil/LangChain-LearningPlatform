import { createSlice } from '@reduxjs/toolkit';
import { getCurrentOffer } from './offerOperations';

export type typeOfferType = {
  _id: string;
  name: string;
  price: number;
  description: {
    about: string;
    highlights: string[];
  };
  targetCourseId: string;
};

export type offerStateType = {
  currentOffer: typeOfferType[] | [];
  error: any;
  isLoading: boolean;
};

const offerInitialState: offerStateType = {
  currentOffer: [],
  error: null,
  isLoading: false,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState: offerInitialState,
  reducers: {
    importInfoData: state => state,
  },
  extraReducers(builder) {
    builder.addCase(getCurrentOffer.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCurrentOffer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getCurrentOffer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentOffer = [...action.payload];
    });
  },
});

export const { importInfoData } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
