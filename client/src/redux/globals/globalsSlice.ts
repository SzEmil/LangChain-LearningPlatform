import { createSlice } from '@reduxjs/toolkit';

type globalsStateType = {
  serverConnection: boolean;
};

const globalsInitialState: globalsStateType = {
  serverConnection: true,
};

const globalsSlice = createSlice({
  name: 'globals',
  initialState: globalsInitialState,
  reducers: {
    importInfoData: state => state,
  },
  extraReducers: {},
});

export const { importInfoData } = globalsSlice.actions;
export const globalsReducer = globalsSlice.reducer;
