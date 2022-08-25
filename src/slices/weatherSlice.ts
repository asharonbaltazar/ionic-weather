import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@store';
import { SelectedWeather } from '../../interface';
import {
  fetchGooglePlacesByCoordinates,
  fetchWeatherData,
  fetchGooglePlacesById,
} from '@utilities/fetch';
import { geolocation } from '@utilities/geolocation';

export const getWeather = createAsyncThunk<
  SelectedWeather,
  string,
  { state: RootState }
>('weather/getWeather', async (placeId, { rejectWithValue }) => {
  try {
    const place = await fetchGooglePlacesById(placeId);

    if (typeof place === 'string') return rejectWithValue(place);

    const { lat, lng, formattedAddress } = place;

    // Format weather data
    const weatherObj = await fetchWeatherData(
      lat,
      lng,
      formattedAddress,
      placeId,
      false
    );

    if (typeof weatherObj === 'string') {
      return rejectWithValue(weatherObj);
    }

    return weatherObj;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getWeatherByGeolocation = createAsyncThunk<
  SelectedWeather,
  void,
  { state: RootState }
>('weather/getWeatherByGeolocation', async (_, { rejectWithValue }) => {
  // geolocation coordinates
  try {
    const { coords } = await geolocation();

    if (typeof coords === 'string')
      return rejectWithValue(
        'Please allow geolocation permissions to use this feature'
      );

    const { latitude, longitude } = coords;

    const place = await fetchGooglePlacesByCoordinates(latitude, longitude);

    if (typeof place === 'string') {
      return rejectWithValue(place);
    }

    const { formattedAddress, placeId } = place;

    // Format weather data
    const weatherObj = await fetchWeatherData(
      latitude.toString(),
      longitude.toString(),
      formattedAddress,
      placeId,
      true
    );

    if (typeof weatherObj === 'string') {
      return rejectWithValue(weatherObj);
    }

    return weatherObj;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

interface InitialState {
  selectedWeather: SelectedWeather;
  savedWeather: SelectedWeather[];
  errors: string[];
  loading: boolean;
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    selectedWeather: {} as SelectedWeather,
    savedWeather: [] as SelectedWeather[],
    errors: [],
    loading: false,
  } as InitialState,
  reducers: {
    dismissWeatherErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.selectedWeather = action.payload;
      state.loading = false;
    });
    builder.addCase(getWeatherByGeolocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeatherByGeolocation.fulfilled, (state, action) => {
      state.selectedWeather = action.payload;
      state.loading = false;
    });
    builder.addCase(getWeatherByGeolocation.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors.push(action.payload);
      }

      state.loading = false;
    });
  },
});

export const refreshWeatherData =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      weatherSlice: { selectedWeather },
    } = getState();

    if (selectedWeather.geolocation) {
      return dispatch(getWeatherByGeolocation());
    }

    return dispatch(getWeather(selectedWeather.gId ?? ''));
  };

export const { dismissWeatherErrors } = weatherSlice.actions;
export default weatherSlice.reducer;
