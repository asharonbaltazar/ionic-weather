import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    selectedWeather: {},
    savedWeather: [],
  },
  reducers: {},
});

// Thunk functions
export const getWeather = (placeId: string) => async (dispatch: Function) => {
  try {
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
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default weatherSlice.reducer;
