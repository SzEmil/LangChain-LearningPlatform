import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './userOperations';
import { ProgressData } from '../../types/userProgress';
import { getUserProgress } from './userOperations';
import { verifyUserEmail } from './userOperations';
import { getUserPaymentsData, updateUserProgress } from './userOperations';

type paymentType = {
  _id: string;
  amount: string;
  refererToItem: string;
  currency: string;
  paymentStatus: string;
  updatedAt: string;
};

export type authInitialStateType = {
  user: {
    id: string | null | undefined;
    username: string | null;
    email: string | null;
    avatarURL: string | undefined;
    emailVerification: boolean;
    courses: string[] | [];
  };
  payments: {
    data: paymentType[] | [];
    isLoading: boolean;
    error: any;
  };
  courseProgress: ProgressData | null;
  token: string | null;
  isRefreshing: boolean;
  isLoggedIn: boolean;
  error: any;
  isLoading: boolean;
  serverConnected: boolean;
};

const authInitialState: authInitialStateType = {
  user: {
    username: null,
    email: null,
    avatarURL: '',
    id: null,
    courses: [],
    emailVerification: false,
  },
  payments: {
    data: [],
    isLoading: false,
    error: null,
  },
  token: null,
  courseProgress: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
  serverConnected: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState: authInitialState,
  reducers: {
    importInfoData: state => state,
    pageLoaded: state => {
      state.isLoading = false;
    },
    logoutSuccess: state => {
      (state.token = null),
        (state.error = null),
        (state.isLoggedIn = false),
        (state.user.avatarURL = ''),
        (state.user.email = null),
        (state.courseProgress = null),
        (state.user.courses = []);
      (state.courseProgress = null), (state.user.username = null);
      state.user.emailVerification = false;
    },
    serverConnected: state => {
      state.serverConnected = true;
    },
  },
  extraReducers: builder => {
    try {
      builder.addCase(register.pending, (state: authInitialStateType) => {
        state.error = null;
        state.isLoading = true;
        state.isRefreshing = true;
      });
      builder.addCase(
        register.rejected,
        (state: authInitialStateType, action: { payload: any }) => {
          (state.isLoading = false),
            (state.isLoggedIn = false),
            (state.isRefreshing = false),
            (state.error = action.payload);
          (state.user.avatarURL = ''),
            (state.user.email = null),
            (state.user.username = null);
          (state.courseProgress = null),
            (state.courseProgress = null),
            (state.user.id = null);
          state.user.emailVerification = false;
        }
      );
      builder.addCase(
        register.fulfilled,
        (
          state: authInitialStateType,
          action: {
            payload: {
              username: string | null;
              email: string | null;
              avatarURL: string;
              emailVerification: boolean;
              token: string | null;
              _id: string | null;
            };
          }
        ) => {
          state.user.username = action.payload.username;
          state.user.email = action.payload.email;
          state.user.id = action.payload._id;
          state.user.avatarURL = action.payload.avatarURL;
          state.token = action.payload.token;
          state.user.emailVerification = action.payload.emailVerification;
          state.isLoggedIn = true;
          state.error = null;
          state.isRefreshing = false;
          // state.isLoading = false;
        }
      );

      builder.addCase(logIn.pending, (state: authInitialStateType) => {
        state.error = null;
        state.isLoading = true;
        state.isRefreshing = true;
      });
      builder.addCase(
        logIn.rejected,
        (state: authInitialStateType, action: { payload: any }) => {
          (state.isLoading = false),
            (state.isLoggedIn = false),
            (state.isRefreshing = false),
            (state.error = action.payload);
          (state.courseProgress = null),
            (state.user.avatarURL = ''),
            (state.user.email = null),
            (state.user.emailVerification = false);
          (state.user.courses = []), (state.user.username = null);
          state.user.id = null;
        }
      );
      builder.addCase(
        logIn.fulfilled,
        (
          state: authInitialStateType,
          action: {
            payload: {
              progress: ProgressData | null;
              token: string | null;
              user: {
                progress: ProgressData | null;
                username: string | null;
                avatarURL: string;
                email: string | null;
                token: string | null;
                emailVerification: boolean;
                courses: string[] | [];
                _id: string | null;
              };
            };
          }
        ) => {
          state.user.username = action.payload.user.username;
          state.user.email = action.payload.user.email;
          state.token = action.payload.token;
          state.user.avatarURL = action.payload.user.avatarURL;
          state.user.id = action.payload.user._id;
          state.user.emailVerification = action.payload.user.emailVerification;
          state.user.courses = action.payload.user.courses;
          state.courseProgress = action.payload.user.progress;
          state.isLoggedIn = true;
          state.error = null;
          state.isRefreshing = false;
          // state.isLoading = false;
        }
      );

      builder.addCase(refreshUser.pending, (state: authInitialStateType) => {
        state.error = null;
        state.isLoading = true;
        state.isRefreshing = true;
      });
      builder.addCase(
        refreshUser.rejected,
        (state: authInitialStateType, action: { payload: any }) => {
          (state.isLoading = false),
            (state.isLoggedIn = false),
            (state.isRefreshing = false),
            (state.error = action.payload);
          (state.user.avatarURL = ''),
            (state.user.email = null),
            (state.user.emailVerification = false);
          state.user.username = null;
          (state.courseProgress = null), (state.user.courses = []);
          state.user.id = null;
        }
      );
      builder.addCase(
        refreshUser.fulfilled,
        (
          state: authInitialStateType,
          action: {
            payload: any;
          }
        ) => {
          state.user.username = action.payload.username;
          state.user.email = action.payload.email;
          state.user.id = action.payload._id;
          state.user.courses = action.payload.courses;
          state.user.emailVerification = action.payload.emailVerification;
          state.courseProgress = action.payload.progress;

          state.isLoggedIn = true;
          state.error = null;
          state.isRefreshing = false;
          state.isLoading = false;
        }
      );

      builder.addCase(logOut.pending, state => {
        state.isLoading = true;
      });
      builder.addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
      builder.addCase(logOut.fulfilled, state => {
        (state.token = null),
          (state.error = null),
          (state.isLoggedIn = false),
          (state.user.avatarURL = ''),
          (state.user.email = null),
          (state.user.username = null);
        state.user.emailVerification = false;
        state.user.courses = [];
        state.courseProgress = null;
        state.user.id = null;
        state.isLoading = false;
      });

      builder.addCase(getUserProgress.pending, state => {
        state.isLoading = true;
      });
      builder.addCase(getUserProgress.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
      builder.addCase(getUserProgress.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.courseProgress = action.payload;
      });

      builder.addCase(verifyUserEmail.rejected, (state, action) => {
        state.error = action.payload;
      });
      builder.addCase(verifyUserEmail.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        if (action.payload) state.user.emailVerification = action.payload;
      });

      builder.addCase(getUserPaymentsData.pending, state => {
        state.payments.isLoading = true;
      });
      builder.addCase(getUserPaymentsData.rejected, (state, action) => {
        state.payments.error = action.payload;
        state.payments.isLoading = false;
      });
      builder.addCase(getUserPaymentsData.fulfilled, (state, action) => {
        state.payments.error = null;
        state.payments.isLoading = false;
        state.payments.data = action.payload;
      });

      builder.addCase(updateUserProgress.rejected, (state, action) => {
        state.error = action.payload;
      });
      builder.addCase(updateUserProgress.fulfilled, (state, action) => {
        state.error = null;
      });
    } catch (error) {
      console.log(error);
    }
  },
});

export const { importInfoData, logoutSuccess, pageLoaded, serverConnected } =
  authSlice.actions;
export const userReducer = authSlice.reducer;
