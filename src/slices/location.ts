import { GMapGeocodeResult, GMapPrediction } from '@functions/types';
import { appApi } from '@slices/api';
import { getGeolocation } from '@utilities/geolocation';
import { setRecentLocation, setSelectedLocation } from '@slices/app';

type GeocodeByCoordsArgs =
  | {
      lat: number;
      lon: number;
    }
  | { isGeolocation: true };

type GeocodeByPlaceIdArgs = {
  text: { mainText: string; secondaryText: string };
  placeId: string;
};

export const locationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    location: builder.query<GMapPrediction[], string>({
      query: (query) =>
        `${import.meta.env.VITE_GET_GMAPS_SUGGESTIONS}?query=${query}`,
      providesTags: ['location'],
    }),
    geocodeByPlaceId: builder.query<GMapGeocodeResult, GeocodeByPlaceIdArgs>({
      queryFn: async ({ placeId, text }, { dispatch }, _api, fetchWithBQ) => {
        const response = await fetchWithBQ({
          url: `${import.meta.env.VITE_GET_GPLACE_ID}?id=${placeId}`,
        });

        if (response.error) {
          return {
            error: { error: 'Failed to fetch geocode', status: 'FETCH_ERROR' },
          };
        }

        const location = response.data as GMapGeocodeResult;

        dispatch(setRecentLocation({ placeId, text }));

        const newSelectedLocation = {
          ...location,
          isGeolocation: false,
        };

        dispatch(setSelectedLocation(newSelectedLocation));

        return { data: location };
      },
      providesTags: ['location'],
    }),
    geocodeByCoords: builder.query<GMapGeocodeResult, GeocodeByCoordsArgs>({
      queryFn: async (args, { dispatch }, _api, fetchWithBQ) => {
        let lon: number = 'lon' in args ? args.lon : 0;
        let lat: number = 'lat' in args ? args.lat : 0;

        if ('isGeolocation' in args) {
          const geolocation = await getGeolocation();

          if (geolocation === null) {
            return {
              error: {
                error: 'Failed to get geolocation',
                status: 'CUSTOM_ERROR',
              },
            };
          }

          const { latitude, longitude } = geolocation.coords;

          lat = latitude;
          lon = longitude;
        }

        const response = await fetchWithBQ({
          url: `${
            import.meta.env.VITE_GET_GEOLOCATION_DATA
          }?lat=${lat}&lon=${lon}`,
        });

        if (response.error) {
          return {
            error: {
              error: 'Failed to fetch geocode by coords',
              status: 'FETCH_ERROR',
            },
          };
        }

        const location = response.data as GMapGeocodeResult;

        const newSelectedLocation = {
          ...location,
          isGeolocation: 'isGeolocation' in args,
        };

        dispatch(setSelectedLocation(newSelectedLocation));

        return { data: location };
      },

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
