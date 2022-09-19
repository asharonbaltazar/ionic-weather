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
  address: string;
  lat: number;
  lng: number;
  placeId: string;
}

export interface Details {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Minutely {
  dt: number;
  precipitation: number;
}

interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Details[];
  pop: number;
}

interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Details[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface OpenWeatherMapResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Details[];
  };
  daily: Daily[];
  hourly: Hourly[];
  minutely: Minutely[];
  alerts: Alert[];
}

export type BaseDetails = Omit<Details, 'id'>;

export interface BaseWeather {
  clouds: number;
  dewPoint: number;
  dt: string;
  feelsLike: number;
  humidity: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  temp: number;
  uvi: number;
  visibility: number;
  details: BaseDetails;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export interface HourlyWeather extends Omit<BaseWeather, 'sunrise' | 'sunset'> {
  pop: number;
}

export interface DailyWeather
  extends Omit<BaseWeather, 'feelsLike' | 'temp' | 'visibility'> {
  moonrise: string;
  moonset: string;
  moonPhase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feelsLike: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  rain: number;
  pop: number;
}

export interface Weather {
  current: BaseWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  updated: string;
}

export interface StateWeather extends Weather {
  address: string;
  isGeolocation: boolean;
  placeId: string;
}
