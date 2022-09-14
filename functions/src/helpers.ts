import { GeocodingResponse, PlaceAutocompleteResponse } from '@google/maps';
import {
  GMapGeocodeResult,
  GMapPrediction,
  OpenWeatherMapResponse,
  Weather,
  BaseWeather,
  HourlyWeather,
  DailyWeather,
  Details,
  BaseDetails,
} from '@types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dayjsTimezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(dayjsTimezone);
dayjs.extend(isBetween);

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

const formatUnixWithTimezoneAndISO = (tz: string) => (time: number) =>
  dayjs.unix(time).tz(tz).format();

const formatDetails = (
  { description, id, main }: Details,
  dt: number,
  sunrise: number,
  sunset: number
): BaseDetails => {
  const timeOfDay = dayjs(dt).isBetween(sunrise, sunset) ? 'day' : 'night';

  return {
    description,
    main,
    icon: `${timeOfDay}-${id}`,
  };
};

const getCurrentWeather = ({
  current,
  timezone,
}: OpenWeatherMapResponse): BaseWeather => {
  const formatTime = formatUnixWithTimezoneAndISO(timezone);

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
    details: formatDetails(details, dt, sunrise, sunset),
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
  current: { sunrise, sunset },
}: OpenWeatherMapResponse): HourlyWeather[] => {
  const formatTime = formatUnixWithTimezoneAndISO(timezone);

  const tomorrowMorning = dayjs()
    .tz(timezone)
    .add(1, 'day')
    .startOf('date')
    .add(6, 'hours')
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

    if (dt <= tomorrowMorning) {
      return acc.concat({
        dt: formatTime(dt),
        details: formatDetails(details, dt, sunrise, sunset),
        dewPoint,
        feelsLike,
        sunrise: formatTime(sunrise),
        sunset: formatTime(sunset),
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
  const formatTime = formatUnixWithTimezoneAndISO(timezone);

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
      details: formatDetails(details, dt, sunrise, sunset),
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
