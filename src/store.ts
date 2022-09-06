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
import { useDispatch } from 'react-redux';
import searchSlice from '@slices/searchSlice';
import weatherSlice from '@slices/weatherSlice';
import settingsSlice from '@slices/settingsSlice';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const reducers = combineReducers({
  searchSlice,
  weatherSlice,
  settingsSlice,
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
    }),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

// Type definitions
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
