import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";

export default configureStore({
  reducer: {
    search: searchSlice,
  },
});
