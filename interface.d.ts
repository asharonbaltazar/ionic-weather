export interface Details {
  dt: string;
  sunrise: string;
  sunset: string;
  temp: {
    [key: string]: number;
  };
  feels_like: {
    [key: string]: number;
  };
  pressure: number;
  humidity: number;
  dew_point?: number;
  wind_speed: number;
  wind_deg?: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds?: number;
  pop: number;
  rain?: number;
  uvi: number;
  compass?: string;
}

export interface TodayTomorrow {
  details: Details;
  hourly: [
    {
      dt: string;
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      dew_point: number;
      compass: string;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      pop: number;
    }
  ];
}
export interface SelectedWeather {
  address: string;
  weather: {
    current: object;
    today: TodayTomorrow;
    tomorrow: TodayTomorrow;
    nextWeek: object[];
    alerts?: object[];
  };
  iconTimes: [
    {
      sunrise: string;
      sunset: string;
    }
  ];
  gId: string;
  geolocation: boolean;
}

export interface GooglePlaceData {
  formattedAddress: string;
  lat: string;
  lng: string;
}

export interface GoogleCoordinatesData {
  formattedAddress: string;
  placeId: string;
}
