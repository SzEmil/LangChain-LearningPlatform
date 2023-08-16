import { createSlice } from '@reduxjs/toolkit';
import { CourseType } from '../../types/courseTypes';
import { getUserCourses } from './coursesOperations';

export type coursesInitialStateType = {
  courses: {
    data: CourseType[] | [];
    isLoading: boolean;
    error: any;
  };
  currentCourse: {
    data: CourseType | null;
    isLoading: boolean;
    error: any;
  };
};

const coursesInitialState: coursesInitialStateType = {
  courses: {
    data: [],
    isLoading: false,
    error: null,
  },
  currentCourse: {
    data: null,
    isLoading: false,
    error: null,
  },
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState: coursesInitialState,
  reducers: {
    importInfoData: state => state,
  },
  extraReducers(builder) {
    builder.addCase(getUserCourses.pending, state => {
      (state.courses.isLoading = true), (state.courses.error = null);
    });
    builder.addCase(getUserCourses.rejected, (state, action) => {
      (state.courses.isLoading = false), (state.courses.error = action.payload);
    });
    builder.addCase(getUserCourses.fulfilled, (state, action) => {
      (state.courses.isLoading = false),
        (state.courses.error = null),
        (state.courses.data = action.payload);
    });
  },
});

export const { importInfoData } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
