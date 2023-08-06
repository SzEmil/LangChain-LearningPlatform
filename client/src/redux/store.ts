import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

export const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ignoredActions,
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
