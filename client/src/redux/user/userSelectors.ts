import { authInitialStateType } from './userSlice';

export const selectAuthUser = (state: { user: authInitialStateType }) =>
  state.user;

export const selectAuthUserData = (state: { user: authInitialStateType }) =>
  state.user.user;

export const selectAuthUserIsLoggedIn = (state: {
  user: authInitialStateType;
}) => state.user.isLoggedIn;

export const selectAuthUserIsLoading = (state: {
  user: authInitialStateType;
}) => state.user.isLoading;

export const selectAuthUserCourses = (state: { user: authInitialStateType }) =>
  state.user.user.courses;

export const selectAuthUserIsRefreshing = (state: {
  user: authInitialStateType;
}) => state.user.isRefreshing;

export const selectAuthUserError = (state: { user: authInitialStateType }) =>
  state.user.isRefreshing;

export const selectIsServerConnected = (state: {
  user: authInitialStateType;
}) => state.user.serverConnected;

export const selectUserCoursesProgress = (state: {
  user: authInitialStateType;
}) => state.user.courseProgress;
