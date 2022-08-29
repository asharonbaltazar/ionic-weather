import { PlaceAutocompleteResponse } from '@google/maps';

export const getFormattedGMapPredictions = ({
  predictions,
}: PlaceAutocompleteResponse) =>
  predictions.map((prediction) => ({
    text: {
      mainText: prediction.structured_formatting.main_text,
      secondaryText: prediction.structured_formatting.secondary_text,
    },
    placeId: prediction.place_id,
  }));
