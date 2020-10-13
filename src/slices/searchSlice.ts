import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface recentQueries {
  label: string;
  position: object;
  id: string;
}

interface queries {
  [index: number]: { label: string; locationId: string };
}

// Slice in charge of retrieving search queries
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    queries: [] as queries[],
    recentQueries: [] as recentQueries[],
    loading: false,
  },
  reducers: {
    displaySearchQueries: (state, action) => {
      state.queries = action.payload;
      state.loading = false;
    },

    setRecentQuery: (state, action) => {
      if (state.recentQueries.length >= 5) state.recentQueries.pop();
      state.recentQueries.unshift(action.payload);
    },

    setLoading: state => {
      state.loading = true;
    },
  },
});

// Thunk functions
export const getPlacesBySearch = (query: string) => async (
  dispatch: Function
) => {
  if (query.length) {
    dispatch(setLoading());
    const response = await axios.get(
      `https://us-central1-ionic-weather-7b2ef.cloudfunctions.net/getGMapSuggestions/${query}`
    );

    if (response.data.status === "OK") {
      const formattedResults = response.data.predictions.map((element: any) => {
        return {
          text: {
            main_text: element.structured_formatting.main_text,
            secondary_text: element.structured_formatting.secondary_text,
          },
          place_id: element.place_id,
        };
      });

      dispatch(displaySearchQueries(formattedResults));
    }
  }
};

export const {
  displaySearchQueries,
  setRecentQuery,
  setLoading,
} = searchSlice.actions;
export default searchSlice.reducer;
