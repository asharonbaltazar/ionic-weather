import { GeocodingResponse, PlaceAutocompleteResponse } from '@google/maps';
import { GMapGeocodeResult, GMapPrediction } from '@types';

export const getFormattedGMapPredictions = ({
  predictions = [],
}: PlaceAutocompleteResponse): GMapPrediction[] =>
  predictions.map((prediction) => ({
    text: {
      mainText: prediction.structured_formatting.main_text,
      secondaryText: prediction.structured_formatting.secondary_text,
    },
    placeId: prediction.place_id,
  }));

export const getFirstGMapGeocodeResult = ({
  results,
}: GeocodingResponse): GMapGeocodeResult => {
  const [firstGeoCodeResult] = results;

  const {
    formatted_address: formattedAddress,
    geometry: {
      location: { lat, lng },
    },
  } = firstGeoCodeResult;

  return { formattedAddress, lat, lng };
};
