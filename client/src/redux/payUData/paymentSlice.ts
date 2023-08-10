import { createSlice } from '@reduxjs/toolkit';

export type paymentStateType = {
  courseId: string | null;
};

const paymentInitialState: paymentStateType = {
  courseId: null,
};

const paymentSlice = createSlice({
  name: 'payement',
  initialState: paymentInitialState,
  reducers: {
    importInfoData: state => state,
    pickCourse: (state, action) => {
      state.courseId = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { importInfoData, pickCourse } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
