import { GMapGeocodeResult, GMapPrediction } from '@functions/types';
import { appApi } from '@slices/api';

type GeocodeByCoordsArgs = {
  lat: number;
  lon: number;
};

export const locationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    location: builder.query<GMapPrediction[], string>({
      query: (query) =>
        `${import.meta.env.VITE_GET_GMAPS_SUGGESTIONS}?query=${query}`,
      providesTags: ['location'],
    }),
    geocodeByPlaceId: builder.query<GMapGeocodeResult, string>({
      query: (placeId: string) =>
        `${import.meta.env.VITE_GET_GPLACE_ID}?id=${placeId}`,
      providesTags: ['location'],
    }),
    geocodeByCoords: builder.query<GMapGeocodeResult, GeocodeByCoordsArgs>({
      query: ({ lat, lon }) =>
        `${import.meta.env.VITE_GET_GEOLOCATION_DATA}?lat=${lat}&lon=${lon}`,
      providesTags: ['location'],
    }),
  }),
});

export const {
  useLazyGeocodeByCoordsQuery,
  useLazyGeocodeByPlaceIdQuery,
  useLazyLocationQuery,
  useLocationQuery,
} = locationApi;
