import { GMapGeocodeResult, GMapPrediction } from '@functions/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getGeocode,
  getGeolocationGeocode,
  getLocationByQuery,
} from '@slices/searchSlice.thunks';

interface SelectionLocation extends GMapGeocodeResult {
  isGeolocation: boolean;
}

interface SearchState {
  locations: GMapPrediction[];
  recentLocations: GMapPrediction[];
  selectedLocation: SelectionLocation | null;
  errors: string[];
  loading: boolean;
}

const initialState: SearchState = {
  locations: [],
  recentLocations: [],
  selectedLocation: null,
  errors: [],
  loading: false,
};

// Slice in charge of retrieving search queries
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetLocations: (state) => {
      state.locations = [];
      state.loading = false;
    },

    dismissSearchErrors: (state) => {
      state.errors = [];
    },

    setRecentLocation: (state, action: PayloadAction<GMapPrediction>) => {
      state.recentLocations = state.recentLocations.filter(
        (element) => element.placeId !== action.payload.placeId
      );

      if (state.recentLocations.length >= 5) {
        state.recentLocations.pop();
      }

      state.recentLocations.unshift(action.payload);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    // getLocationByQuery
    builder.addCase(getLocationByQuery.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(getLocationByQuery.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }

      state.loading = false;
      state.locations = [];
    });

    // getGeocodeResult
    builder.addCase(getGeocode.fulfilled, (state, action) => {
      state.errors = [];
      state.selectedLocation = {
        ...action.payload,
        isGeolocation: false,
      };
    });
    builder.addCase(getGeocode.pending, (state) => {
      state.errors = [];
    });
    builder.addCase(getGeocode.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }
    });

    // getGeolocationGeocodeResult
    builder.addCase(getGeolocationGeocode.fulfilled, (state, action) => {
      state.errors = [];
      state.selectedLocation = {
        ...action.payload,
        isGeolocation: true,
      };
    });
    builder.addCase(getGeolocationGeocode.pending, (state) => {
      state.errors = [];
    });
    builder.addCase(getGeolocationGeocode.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }
    });
  },
});

export const {
  resetLocations,
  setRecentLocation,
  setLoading: setSearchLoading,
  dismissSearchErrors,
} = searchSlice.actions;
export default searchSlice.reducer;
