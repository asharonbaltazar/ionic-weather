import { PlaceAutocompleteResponse } from '@google/maps';
import { GMapPrediction } from '@types';

export const getFormattedGMapPredictions = ({
  predictions,
}: PlaceAutocompleteResponse): GMapPrediction[] =>
  predictions.map((prediction) => ({
    text: {
      mainText: prediction.structured_formatting.main_text,
      secondaryText: prediction.structured_formatting.secondary_text,
    },
    placeId: prediction.place_id,
  }));
