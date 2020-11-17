import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Vibration } from "@ionic-native/vibration";
import { AppDispatch, RootState } from "../store";
import { SelectedWeather } from "../../interface";
import {
  fetchGooglePlacesByCoordinates,
  fetchWeatherData,
  fetchGooglePlacesById,
} from "../utilities/fetch";
import { geolocation } from "../utilities/geolocation";

export const getWeather = createAsyncThunk<
  SelectedWeather,
  string,
  { state: RootState }
>("weather/getWeather", async (placeId, thunkApi) => {
  const { lat, lng, formattedAddress } = await fetchGooglePlacesById(placeId);

  // Format weather data
  const weatherObj = await fetchWeatherData(
    lat,
    lng,
    formattedAddress,
    placeId,
    false
  );

  // Vibration settings
  thunkApi.getState().settingsSlice.vibrationPreference &&
    Vibration.vibrate(100);
  return weatherObj;
});

export const getWeatherByGeolocation = createAsyncThunk<
  SelectedWeather,
  void,
  { state: RootState }
>("weather/getWeatherByGeolocation", async (_, thunkApi) => {
  // geolocation coordinates
  const { latitude, longitude } = await geolocation();

  const { formattedAddress, placeId } = await fetchGooglePlacesByCoordinates(
    latitude,
    longitude
  );

  // Format weather data
  const weatherObj = await fetchWeatherData(
    latitude.toString(),
    longitude.toString(),
    formattedAddress,
    placeId,
    true
  );

  // Vibration settings
  thunkApi.getState().settingsSlice.vibrationPreference &&
    Vibration.vibrate(100);
  return weatherObj;
});

interface InitialState {
  selectedWeather: SelectedWeather;
  savedWeather: SelectedWeather[];
  errors: string[];
  loading: boolean;
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    selectedWeather: {} as SelectedWeather,
    savedWeather: [] as SelectedWeather[],
    errors: [],
    loading: false,
  } as InitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getWeather.pending, state => {
      state.loading = true;
    });
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.selectedWeather = action.payload;
      state.loading = false;
    });
    builder.addCase(getWeatherByGeolocation.pending, state => {
      state.loading = true;
    });
    builder.addCase(getWeatherByGeolocation.fulfilled, (state, action) => {
      state.selectedWeather = action.payload;
      state.loading = false;
    });
  },
});

export const refreshWeatherData = () => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  getState().weatherSlice.selectedWeather.geolocation
    ? dispatch(getWeatherByGeolocation())
    : dispatch(getWeather(getState().weatherSlice.selectedWeather.gId ?? ""));
};

export default weatherSlice.reducer;
