import axios from "axios";
import { getDirection } from "./format";
import {
  SelectedWeather,
  GooglePlaceData,
  GoogleCoordinatesData,
} from "../../interface";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

// Search queries
export const fetchPlacesBySearch = async (query: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_GET_GMAPS_SUGGESTIONS}/${query}`
  );
  if (response.data.status === "OK" && response.data.predictions.length) {
    const formattedResults = response.data.predictions.map((element: any) => {
      return {
        text: {
          mainText: element.structured_formatting.main_text,
          secondaryText: element.structured_formatting.secondary_text,
        },
        place_id: element.place_id,
      };
    });
    return formattedResults;
  } else return response.data;
};

// Google Places ID
export const fetchGooglePlacesById = async (
  placeId: string
): Promise<GooglePlaceData> => {
  const response = await axios.get(
    `${process.env.REACT_APP_GET_GPLACE_ID}/${placeId}`
  );

  const {
    formatted_address,
    geometry: {
      location: { lat, lng },
    },
  } = response.data.results[0];

  return {
    formattedAddress: formatted_address,
    lat,
    lng,
  };
};

export const fetchGooglePlacesByCoordinates = async (
  latitude: number,
  longitude: number
): Promise<GoogleCoordinatesData> => {
  const {
    data: {
      results: [{ formatted_address, place_id }],
    },
  } = await axios.get(
    `${process.env.REACT_APP_GET_GEOLOCATION_DATA}/${latitude}/${longitude}`
  );

  return {
    formattedAddress: formatted_address,
    placeId: place_id,
  };
};

// Weather query and formatting
export const fetchWeatherData = async (
  lat: string,
  lng: string,
  formatted_address: string,
  gId: string,
  isGeolocation: boolean
): Promise<SelectedWeather> => {
  // Grab weather data
  const { data } = await axios.get(
    `${process.env.REACT_APP_GET_WEATHER_VIA_COORDS}/${lat}/${lng}`
  );

  // tomorrow morning
  const tom_morn = dayjs()
    .tz(data.timezone)
    .add(1, "day")
    .hour(6)
    .minute(0)
    .second(0)
    .format("YYYY-MM-DDTHH:mm:ss");
  // after tomorrow midnight
  const after_tom_midnight = dayjs()
    .tz(data.timezone)
    .add(2, "day")
    .hour(1)
    .minute(0)
    .second(0)
    .format("YYYY-MM-DDTHH:mm:ss");

  // Split hourly into today and tomorrow
  const hourly = data.hourly.reduce(
    (acc: any, element: any) => {
      // Convert seconds to ISO format for readability
      if ("dt" in element)
        element.dt = dayjs
          .tz(dayjs.unix(element.dt), data.timezone)
          .format("YYYY-MM-DDTHH:mm:ss");
      if ("wind_deg" in element)
        element.compass = getDirection(element.wind_deg);

      // Split into today and tomorrow
      dayjs(element.dt).isSameOrBefore(tom_morn) && acc[0].push(element);
      dayjs(element.dt).isBetween(tom_morn, after_tom_midnight) &&
        acc[1].push(element);

      return acc;
    },
    [[], []]
  );

  // Turn unix timestamps to readable format (ISO)
  const daily = data.daily.map((element: any) => ({
    ...element,
    dt: dayjs
      .tz(dayjs.unix(element.dt), data.timezone)
      .format("YYYY-MM-DDTHH:mm:ss"),
    sunrise: dayjs
      .tz(dayjs.unix(element.sunrise), data.timezone)
      .format("YYYY-MM-DDTHH:mm:ss"),
    sunset: dayjs
      .tz(dayjs.unix(element.sunset), data.timezone)
      .format("YYYY-MM-DDTHH:mm:ss"),
    compass: getDirection(element.wind_deg),
  }));

  // Create weather object
  const weatherObj = {
    address: formatted_address,
    weather: {
      today: {
        details: {
          ...data.current,
          dt: dayjs
            .tz(dayjs.unix(data.current.dt), data.timezone)
            .format("YYYY-MM-DDTHH:mm:ss"),
          sunrise: dayjs
            .tz(dayjs.unix(data.current.sunrise), data.timezone)
            .format("YYYY-MM-DDTHH:mm:ss"),
          sunset: dayjs
            .tz(dayjs.unix(data.current.sunset), data.timezone)
            .format("YYYY-MM-DDTHH:mm:ss"),
          temp: {
            day: data.current.temp,
          },
          feels_like: {
            day: data.current.feels_like,
          },
          pop: daily[0].pop,
        },
        hourly: hourly[0],
      },
      tomorrow: {
        details: { ...daily[1], dt: hourly[1][5].dt },
        hourly: hourly[1],
      },
      nextWeek: daily.slice(1),
    },
    iconTimes: data.daily.flatMap((element: any, index: any) =>
      index <= 2
        ? {
            sunrise: dayjs
              .tz(dayjs.unix(element.sunrise), data.timezone)
              .format("YYYY-MM-DDTHH:mm:ss"),
            sunset: dayjs
              .tz(dayjs.unix(element.sunset), data.timezone)
              .format("YYYY-MM-DDTHH:mm:ss"),
          }
        : []
    ),
    geolocation: isGeolocation,
    gId: gId,
    updated: dayjs().format(),
  };

  // Conditionally assign alerts property if data.alerts exists
  Object.assign(
    weatherObj.weather,
    "alerts" in data
      ? {
          alerts: data.alerts.map((element: any) => ({
            ...element,
            start: dayjs
              .tz(dayjs.unix(element.start), data.timezone)
              .format("YYYY-MM-DDTHH:mm:ss"),
            end: dayjs
              .tz(dayjs.unix(element.end), data.timezone)
              .format("YYYY-MM-DDTHH:mm:ss"),
          })),
        }
      : null
  );

  return weatherObj;
};
