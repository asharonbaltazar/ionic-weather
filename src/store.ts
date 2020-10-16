import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";
import weatherSlice from "./slices/weatherSlice";
import settingsSlice from "./slices/settingsSlice";

export default configureStore({
  reducer: {
    search: searchSlice,
    weather: weatherSlice,
    settings: settingsSlice,
  },
});
