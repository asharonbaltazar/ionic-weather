import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";
import weatherSlice from "./slices/weatherSlice";

export default configureStore({
  reducer: {
    search: searchSlice,
    weather: weatherSlice,
  },
});
