export type FunctionsResponse<T> =
  | T
  | {
      error: string;
    };

export interface GMapPrediction {
  text: {
    mainText: string;
    secondaryText: string;
  };
  placeId: string;
}

export interface GMapGeocodeResult {
  formattedAddress: string;
  lat: number;
  lng: number;
}
