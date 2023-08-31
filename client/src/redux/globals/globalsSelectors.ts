import { globalsStateType } from "./globalsSlice";
export const selectPageLanguage = (state: { globals: globalsStateType }) =>
  state.globals.pageLanguage;

  export const selectAppServerConnection = (state: { globals: globalsStateType }) =>
  state.globals.serverConnection;
