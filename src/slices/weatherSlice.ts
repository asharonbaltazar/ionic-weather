import { createSlice } from "@reduxjs/toolkit";
import { Geolocation } from "@ionic-native/geolocation";
import { Vibration } from "@ionic-native/vibration";
import { AppDispatch, RootState } from "../store";
import { formatWeatherData } from "../utilities/format";
import axios from "axios";

interface today_tomorrow {
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

export interface selectedWeather {
  address: string;
  weather: {
    current: object;
    today: today_tomorrow;
    tomorrow: today_tomorrow;
    next_week: object[];
    alerts?: object[];
    gId?: string;
  };
  icon_times: [
    {
      sunrise: string;
      sunset: string;
    }
  ];
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    selectedWeather: {} as selectedWeather,
    savedWeather: [] as Array<selectedWeather>,
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
  try {
    dispatch(setWeatherLoading(true));
    const response = await axios.get(
      process.env.REACT_APP_GET_GPLACE_ID + placeId
    );

    if (response.data.status === "OK") {
      const {
        formatted_address,
        geometry: {
          location: { lat, lng },
        },
      } = response.data.results[0];

      // Format weather data
      const weatherObj = await formatWeatherData(
        lat,
        lng,
        formatted_address,
        placeId
      );

      dispatch(setWeatherData(weatherObj));
      getState().settings.vibrationPreference && Vibration.vibrate(100);
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
      process.env.REACT_APP_GET_GEOLOCATION_DATA + `/${latitude}/${longitude}`
    );

    if (formatted_address && place_id) {
      // Format weather data
      const weatherObj = await formatWeatherData(
        latitude.toString(),
        longitude.toString(),
        formatted_address,
        place_id
      );

      dispatch(setWeatherData(weatherObj));
      getState().settings.vibrationPreference && Vibration.vibrate(100);
    }
  } catch (error) {
    dispatch(setWeatherLoading(false));
    console.log(error.message);
  }
};

export const { setWeatherData, setWeatherLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
