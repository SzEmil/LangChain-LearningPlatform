import { createSlice } from '@reduxjs/toolkit';
import { CourseType } from '../../types/courseTypes';
import { getUserCourses } from './coursesOperations';
import { getUserCourseById } from './coursesOperations';

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
    clearCoursesData: state => {
      state.courses.data = [];
      state.currentCourse.data = null;
    },
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

    builder.addCase(getUserCourseById.pending, state => {
      (state.currentCourse.isLoading = true), (state.currentCourse.error = null);
    });
    builder.addCase(getUserCourseById.rejected, (state, action) => {
      (state.currentCourse.isLoading = false),
        (state.currentCourse.error = action.payload);
    });
    builder.addCase(getUserCourseById.fulfilled, (state, action) => {
      (state.currentCourse.isLoading = false),
        (state.currentCourse.error = null),
        (state.currentCourse.data = action.payload);
    });
  },
});

export const { importInfoData, clearCoursesData } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
