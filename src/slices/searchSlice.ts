import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

type query = { label: string; id: string };
interface InitialState {
  queries: query[];
  recentQueries: query[];
  loading: boolean;
}

// Slice in charge of retrieving search queries
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    queries: [],
    recentQueries: [],
    loading: false,
  } as InitialState,
  reducers: {
    displaySearchQueries: (state, action) => {
      state.queries = action.payload;
      state.loading = false;
    },

    setRecentQuery: (state, action) => {
      const found = state.recentQueries.find(
        element => element.id === action.payload.id
      );
      if (!found) {
        if (state.recentQueries.length >= 5) state.recentQueries.pop();
        state.recentQueries.unshift(action.payload);
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Thunk functions
export const getPlacesBySearch = (query: string) => async (
  dispatch: AppDispatch
) => {
  try {
    if (query.length) {
      dispatch(setSearchLoading(true));
      const response = await axios.get(
        `https://us-central1-ionic-weather-7b2ef.cloudfunctions.net/getGMapSuggestions/${query}`
      );

      if (response.data.status === "OK") {
        const formattedResults = response.data.predictions.map(
          (element: any) => {
            return {
              text: {
                main_text: element.structured_formatting.main_text,
                secondary_text: element.structured_formatting.secondary_text,
              },
              place_id: element.place_id,
            };
          }
        );

        dispatch(displaySearchQueries(formattedResults));
      } else {
        dispatch(setSearchLoading(false));
        console.log(response.data);
      }
    }
  } catch (error) {
    console.log(error.message);

    dispatch(setSearchLoading(false));
  }
};

export const {
  displaySearchQueries,
  setRecentQuery,
  setLoading: setSearchLoading,
} = searchSlice.actions;
export default searchSlice.reducer;
