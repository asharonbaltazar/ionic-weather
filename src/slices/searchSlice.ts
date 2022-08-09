import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPlacesBySearch } from '../utilities/fetch';

type SearchQuery = {
  label: string;
  id: string;
};

interface InitialState {
  queries: SearchQuery[];
  recentQueries: SearchQuery[];
  errors: string[];
  loading: boolean;
}

// Thunk functions
export const getPlacesBySearch = createAsyncThunk(
  'search/fetchSearch',
  async (query: string, { rejectWithValue }) => {
    const formattedResults = await fetchPlacesBySearch(query);

    if (typeof formattedResults === 'string') {
      return rejectWithValue(formattedResults);
    }

    return formattedResults;
  }
);

// Slice in charge of retrieving search queries
export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    queries: [],
    recentQueries: [],
    errors: [],
    loading: false,
  } as InitialState,
  reducers: {
    resetQueries: (state) => {
      state.queries = [];
      state.loading = false;
    },

    dismissSearchErrors: (state) => {
      state.errors = [];
    },

    setRecentQuery: (state, action) => {
      state.recentQueries = state.recentQueries.filter(
        (element) => element.id !== action.payload.id
      );

      if (state.recentQueries.length >= 5) {
        state.recentQueries.pop();
      }

      state.recentQueries.unshift(action.payload);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPlacesBySearch.fulfilled, (state, action) => {
      state.queries = action.payload;
      state.loading = false;
    });
    builder.addCase(getPlacesBySearch.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }

      state.loading = false;
      state.queries = [];
    });
  },
});

export const {
  resetQueries,
  setRecentQuery,
  setLoading: setSearchLoading,
  dismissSearchErrors,
} = searchSlice.actions;
export default searchSlice.reducer;
