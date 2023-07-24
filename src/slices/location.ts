import { GMapGeocodeResult, GMapPrediction } from '@functions/types';
import { appApi } from '@slices/api';

export const locationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    location: builder.query<GMapPrediction[], string>({
      query: (query) =>
        `${import.meta.env.VITE_GET_GMAPS_SUGGESTIONS}?query=${query}`,
      providesTags: ['location'],
    }),
    geocode: builder.query<GMapGeocodeResult, string>({
      query: (placeId: string) =>
        `${import.meta.env.VITE_GET_GPLACE_ID}?id=${placeId}`,
      providesTags: ['location'],
    }),
  }),
});

export const { useLazyGeocodeQuery, useLazyLocationQuery, useLocationQuery } =
  locationApi;
