import { GMapGeocodeResult, Weather } from '@functions/types';
import { appApi } from '@slices/api';

export const weatherApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    weather: builder.query<Weather, GMapGeocodeResult>({
      query: ({ lat, lng }) =>
        `${import.meta.env.VITE_GET_WEATHER_VIA_COORDS}?lat=${lat}&lon=${lng}`,
      providesTags: ['weather'],
    }),
  }),
});

export const { useWeatherQuery } = weatherApi;
