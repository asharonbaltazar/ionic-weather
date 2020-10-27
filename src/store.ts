import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import searchSlice from "./slices/searchSlice";
import weatherSlice from "./slices/weatherSlice";
import settingsSlice from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    weather: weatherSlice,
    settings: settingsSlice,
  },
});

// Type definitions
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
