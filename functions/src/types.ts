export interface FunctionsResponse<T> {
  data: T;
  msg: string;
}

export interface GMapPrediction {
  text: {
    mainText: string;
    secondaryText: string;
  };
  placeId: string;
}
