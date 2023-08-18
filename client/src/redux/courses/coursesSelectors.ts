import { coursesInitialStateType } from './coursesSlice';

export const selectCoursesData = (state: { courses: coursesInitialStateType }) =>
  state.courses.courses.data;

  export const selectCoursesisLoading = (state: { courses: coursesInitialStateType }) =>
  state.courses.courses.isLoading;