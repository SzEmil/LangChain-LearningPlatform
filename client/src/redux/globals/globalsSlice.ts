import { createSlice } from '@reduxjs/toolkit';

export type globalsStateType = {
  serverConnection: boolean;
  pageLanguage: 'PL' | 'ENG';
};

const globalsInitialState: globalsStateType = {
  serverConnection: true,
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
  },
  extraReducers: {},
});

export const { importInfoData, setLanguage } = globalsSlice.actions;
export const globalsReducer = globalsSlice.reducer;
