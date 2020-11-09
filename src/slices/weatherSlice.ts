import { createSlice } from "@reduxjs/toolkit";
import { Geolocation } from "@ionic-native/geolocation";
import { Vibration } from "@ionic-native/vibration";
import { AppDispatch, RootState } from "../store";
import { formatWeatherData } from "../utilities/format";
import axios from "axios";

export interface TodayTomorrow {
  details: {
    dt: string;
    sunrise: string;
    sunset: string;
    temp: {
      [key: string]: number;
    };
    feels_like: {
      [key: string]: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
  };
  hourly: [
    {
      dt: string;
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      dew_point: number;
      compass: string;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      pop: number;
    }
  ];
}
export interface SelectedWeather {
  address: string;
  weather: {
    current: object;
    today: TodayTomorrow;
    tomorrow: TodayTomorrow;
    next_week: object[];
    alerts?: object[];
  };
  icon_times: [
    {
      sunrise: string;
      sunset: string;
    }
  ];
  gId?: string;
  geolocation?: boolean;
}

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
    const response = await axios.get(
      `${process.env.REACT_APP_GET_GPLACE_ID}/${placeId}`
    );

    if (response.data.status === "OK") {
      const {
        formatted_address,
        geometry: {
          location: { lat, lng },
        },
      } = response.data.results[0];

      // Format weather data
      const weatherObj = await formatWeatherData(lat, lng, formatted_address);

      weatherObj.geolocation = false;
      weatherObj.gId = placeId;

      dispatch(setWeatherData(weatherObj));
      getState().settingsSlice.vibrationPreference && Vibration.vibrate(100);
    }
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
    const {
      coords: { latitude, longitude },
    } = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 20000,
    });

    const {
      data: {
        results: [{ formatted_address, place_id }],
      },
    } = await axios.get(
      `${process.env.REACT_APP_GET_GEOLOCATION_DATA}/${latitude}/${longitude}`
    );

    if (formatted_address && place_id) {
      // Format weather data
      const weatherObj = await formatWeatherData(
        latitude.toString(),
        longitude.toString(),
        formatted_address
      );

      weatherObj.geolocation = true;
      weatherObj.gId = place_id;

      dispatch(setWeatherData(weatherObj));
      getState().settingsSlice.vibrationPreference && Vibration.vibrate(100);
    }
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
