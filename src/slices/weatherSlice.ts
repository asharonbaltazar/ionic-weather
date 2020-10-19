import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface selectedWeather {
  address: string;
  weather: {
    current: object;
    today: Array<object>;
    tomorrow: Array<object>;
    next_week: Array<object>;
    alerts?: Array<object>;
  };
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
export const getWeather = (placeId: string) => async (dispatch: Function) => {
  try {
    dispatch(setWeatherLoading(true));
    const response = await axios.get(
      `https://us-central1-ionic-weather-7b2ef.cloudfunctions.net/getGPlaceId/${placeId}`
    );

    if (response.data.status === "OK") {
      const {
        formatted_address,
        geometry: {
          location: { lat, lng },
        },
      } = response.data.results[0];

      // Grab weather data
      const { data } = await axios.get(
        `https://us-central1-ionic-weather-7b2ef.cloudfunctions.net/getWeatherViaCoordinates/${lat}/${lng}`
      );

      // Split hourly into today and tomorrow
      const hourly = data.hourly.reduce(
        (acc: any, element: any, index: number) => {
          // Convert seconds to ISO format for readability
          if (element.hasOwnProperty("dt"))
            element.dt = new Date(element.dt * 1000).toISOString();

          // Split into today and tomorrow
          index <= 23 ? acc[0].push(element) : acc[1].push(element);

          return acc;
        },
        [[], []]
      );

      // Create weather object
      const weatherObj = {
        address: formatted_address,
        weather: {
          current: {
            ...data.current,
            dt: new Date(data.current.dt * 1000).toISOString(),
            sunrise: new Date(data.current.sunrise * 1000).toISOString(),
            sunset: new Date(data.current.sunset * 1000).toISOString(),
          },
          today: hourly[0],
          tomorrow: hourly[1],
          next_week: data.daily.flatMap((element: any, index: number) =>
            index !== 0
              ? {
                  ...element,
                  dt: new Date(element.dt * 1000).toISOString(),
                  sunrise: new Date(element.sunrise * 1000).toISOString(),
                  sunset: new Date(element.sunset * 1000).toISOString(),
                }
              : []
          ),
        },
      };

      // Conditionally assign alerts property if (data.alerts)
      Object.assign(
        weatherObj.weather,
        data.hasOwnProperty("alerts")
          ? {
              alerts: data.alerts.map((element: any) => ({
                ...element,
                start: new Date(element.start * 1000).toISOString(),
                end: new Date(element.end * 1000).toISOString(),
              })),
            }
          : null
      );

      setTimeout(() => {
        dispatch(setWeatherData(weatherObj));
      }, 500);
    }
  } catch (error) {
    dispatch(setWeatherLoading(false));
    console.error(error.message);
  }
};

export const { setWeatherData, setWeatherLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
