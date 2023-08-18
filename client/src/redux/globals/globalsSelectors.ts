import { globalsStateType } from "./globalsSlice";
export const selectPageLanguage = (state: { globals: globalsStateType }) =>
  state.globals.pageLanguage;
