import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    selectedWeather: {},
    savedWeather: [],
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
    const { data } = await axios.get(
      `https://us-central1-ionic-weather-7b2ef.cloudfunctions.net/getGPlaceId/${placeId}`
    );

    if (data.status === "OK") {
      const {
        formatted_address,
        geometry: {
          location: { lat, lng },
        },
      } = data.results[0];

      const response = await axios.get(
        `https://us-central1-ionic-weather-7b2ef.cloudfunctions.net/getWeatherViaCoordinates/${lat}/${lng}`
      );

      console.log(response.data);

      const weatherObj = {
        address: formatted_address,
        data: response.data,
      };

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
