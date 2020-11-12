import { createSlice } from "@reduxjs/toolkit";
import { Vibration } from "@ionic-native/vibration";
import { AppDispatch, RootState } from "../store";
import { SelectedWeather } from "../../interface";
import {
  fetchGooglePlacesByCoordinates,
  fetchWeatherData,
  fetchGooglePlacesById,
} from "../utilities/fetch";
import { geolocation } from "../utilities/geolocation";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    selectedWeather: {} as SelectedWeather,
    savedWeather: [] as SelectedWeather[],
    loading: false,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.selectedWeather = action.payload;
      state.loading = false;
    },
    setWeatherLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Thunk functions
export const getWeather = (placeId: string) => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  dispatch(setWeatherLoading(true));
  try {
    const { lat, lng, formattedAddress } = await fetchGooglePlacesById(placeId);

    // Format weather data
    const weatherObj = await fetchWeatherData(
      lat,
      lng,
      formattedAddress,
      placeId,
      false
    );

    dispatch(setWeatherData(weatherObj));
    getState().settingsSlice.vibrationPreference && Vibration.vibrate(100);
  } catch (error) {
    dispatch(setWeatherLoading(false));
    console.error(error.message);
  }
};

export const getWeatherByGeolocation = () => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  try {
    dispatch(setWeatherLoading(true));
    // geolocation coordinates
    const { latitude, longitude } = await geolocation();

    const { formattedAddress, placeId } = await fetchGooglePlacesByCoordinates(
      latitude,
      longitude
    );

    const weatherObj = await fetchWeatherData(
      latitude.toString(),
      longitude.toString(),
      formattedAddress,
      placeId,
      true
    );

    dispatch(setWeatherData(weatherObj));
    getState().settingsSlice.vibrationPreference && Vibration.vibrate(100);
  } catch (error) {
    dispatch(setWeatherLoading(false));
    console.log(error.message);
  }
};

export const refreshWeatherData = () => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  getState().weatherSlice.selectedWeather.geolocation
    ? dispatch(getWeatherByGeolocation())
    : dispatch(getWeather(getState().weatherSlice.selectedWeather.gId ?? ""));
};

export const { setWeatherData, setWeatherLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
