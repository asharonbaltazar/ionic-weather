import { GeocodingResponse, PlaceAutocompleteResponse } from '@google/maps';
import {
  GMapGeocodeResult,
  GMapPrediction,
  OpenWeatherMapResponse,
  Weather,
  BaseWeather,
  HourlyWeather,
  DailyWeather,
} from '@types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dayjsTimezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(dayjsTimezone);

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
    place_id: placeId,
    geometry: {
      location: { lat, lng },
    },
  } = firstGeoCodeResult;

  return { address: formattedAddress, placeId, lat, lng };
};

const formatTimeByTimezone = (tz: string) => (time: string | number) =>
  dayjs.tz(time, tz).format();

const getCurrentWeather = ({
  current,
  timezone,
}: OpenWeatherMapResponse): BaseWeather => {
  const formatTime = formatTimeByTimezone(timezone);

  const {
    dt,
    dew_point: dewPoint,
    feels_like: feelsLike,
    sunrise,
    sunset,
    wind_deg: deg,
    wind_gust: gust,
    wind_speed: speed,
    weather: [details],
    ...restOfCurrent
  } = current;

  return {
    dt: formatTime(dt),
    details,
    dewPoint,
    feelsLike,
    sunrise: formatTime(sunrise),
    sunset: formatTime(sunset),
    ...restOfCurrent,
    wind: {
      deg,
      gust,
      speed,
    },
  };
};

const getHourlyWeather = ({
  hourly,
  timezone,
}: OpenWeatherMapResponse): HourlyWeather[] => {
  const formatTime = formatTimeByTimezone(timezone);

  const tomorrowMorning = dayjs()
    .tz(timezone)
    .add(1, 'day')
    .startOf('day')
    .hour(6)
    .unix();

  return hourly.reduce((acc, hour) => {
    const {
      dt,
      dew_point: dewPoint,
      feels_like: feelsLike,
      wind_deg: deg,
      wind_gust: gust,
      wind_speed: speed,
      weather: [details],
      ...restOfHour
    } = hour;

    if (tomorrowMorning <= dt) {
      return acc.concat({
        dt: formatTime(dt),
        details,
        dewPoint,
        feelsLike,
        ...restOfHour,
        wind: {
          deg,
          gust,
          speed,
        },
      });
    }

    return acc;
  }, [] as HourlyWeather[]);
};

const getDailyWeather = ({
  daily,
  timezone,
}: OpenWeatherMapResponse): DailyWeather[] => {
  const formatTime = formatTimeByTimezone(timezone);

  return daily.map((day) => {
    const {
      dt,
      dew_point: dewPoint,
      feels_like: feelsLike,
      sunrise,
      sunset,
      wind_deg: deg,
      wind_gust: gust,
      wind_speed: speed,
      weather: [details],
      moon_phase: moonPhase,
      moonrise,
      moonset,
      ...restOfDay
    } = day;

    return {
      dt: formatTime(dt),
      details,
      dewPoint,
      feelsLike,
      sunrise: formatTime(sunrise),
      sunset: formatTime(sunset),
      moonPhase,
      moonrise: formatTime(moonrise),
      moonset: formatTime(moonset),
      ...restOfDay,
      wind: {
        deg,
        gust,
        speed,
      },
    };
  });
};

export const getFormattedWeather = (
  weather: OpenWeatherMapResponse
): Weather => {
  const current = getCurrentWeather(weather);

  const hourly = getHourlyWeather(weather);

  const daily = getDailyWeather(weather);

  const updated = dayjs().format();

  return { current, hourly, daily, updated };
};
