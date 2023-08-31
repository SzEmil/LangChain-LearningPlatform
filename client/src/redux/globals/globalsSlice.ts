import { createSlice } from '@reduxjs/toolkit';

export type globalsStateType = {
  serverConnection: boolean;
  pageLanguage: 'PL' | 'ENG';
};

const globalsInitialState: globalsStateType = {
  serverConnection: false,
  pageLanguage: 'ENG',
};

const globalsSlice = createSlice({
  name: 'globals',
  initialState: globalsInitialState,
  reducers: {
    importInfoData: state => state,
    setLanguage: (state, action) => {
      state.pageLanguage = action.payload;
    },
    setServerConnection: (state, action) => {
      state.serverConnection = action.payload;
    },
  },
  extraReducers: {},
});

export const { importInfoData, setLanguage, setServerConnection } =
  globalsSlice.actions;
export const globalsReducer = globalsSlice.reducer;
