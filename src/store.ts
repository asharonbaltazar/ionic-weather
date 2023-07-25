import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { appApi } from './slices/api';
import { app } from './slices/app';
import { useSelector } from 'react-redux';

const reducers = combineReducers({
  appApi: appApi.reducer,
  app: app.reducer,
});

// redux-persist config
const persistConfig = {
  key: 'ionic-weather',
  version: 0,
  stateReconciler: autoMergeLevel2,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  reducers as any
) as any as typeof reducers & PersistPartial;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(appApi.middleware),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

// Type definitions
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
