import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './userOperations';

export type authInitialStateType = {
  user: {
    id: string | null | undefined;
    username: string | null;
    email: string | null;
    avatarURL: string | undefined;
  };
  token: string | null;
  isRefreshing: boolean;
  isLoggedIn: boolean;
  error: any;
  isLoading: boolean;
  serverConnected: boolean;
};

const authInitialState: authInitialStateType = {
  user: { username: null, email: null, avatarURL: '', id: null },
  token: null,
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
        (state.user.username = null);
    },
    serverConnected: state => {
      state.serverConnected = true;
    },
  },
  extraReducers: builder => {
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
        state.user.id = null;
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
        (state.user.avatarURL = ''),
          (state.user.email = null),
          (state.user.username = null);
        state.user.id = null;
      }
    );
    builder.addCase(
      logIn.fulfilled,
      (
        state: authInitialStateType,
        action: {
          payload: {
            token: string | null;
            user: {
              username: string | null;
              avatarURL: string;
              email: string | null;
              token: string | null;
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
          (state.user.username = null);
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
      state.user.id = null;
      state.isLoading = false;
    });
  },
});

export const { importInfoData, logoutSuccess, pageLoaded, serverConnected } =
  authSlice.actions;
export const userReducer = authSlice.reducer;
