import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

interface weatherObj {
  address: string;
  weather: {
    current: {};
    today: {}[];
    tomorrow: {}[];
    next_week: {}[];
  };
  gId: string;
  icon_times: {}[];
  updated: string;
}

export const formatTemp = {
  celsius: (value: number) => Math.ceil(value - 273.15),
  fahrenheit: (value: number) => Math.ceil((value - 273.15) * 1.8 + 32),
  kelvin: (value: number) => Math.ceil(value),
};

export const formatSpeed = {
  miles: (value: number) => Math.ceil(value / 1.609),
  kilometers: (value: number) => value,
};

export const formatIconTime = (day: boolean): string => {
  return day ? "day" : "night";
};

export const timeIsWithinTimes = (
  time: any,
  times: { sunrise: string; sunset: string }[]
): boolean =>
  times.some(element => dayjs(time).isBetween(element.sunrise, element.sunset));

// Getting and formatting weather data
export const formatWeatherData = async (
  lat: string,
  lng: string,
  formatted_address: string,
  placeId: string
): Promise<weatherObj> => {
  // Grab weather data
  const { data } = await axios.get(
    process.env.REACT_APP_GET_WEATHER_VIA_COORDS + `/${lat}/${lng}`
  );

  // tomorrow morning
  const tom_morn = dayjs()
    .tz(data.timezone)
    .add(1, "day")
    .hour(6)
    .minute(0)
    .second(0)
    .format("YYYY-MM-DDTHH:mm:ss");
  // after tomorrow morning
  const after_tom_morn = dayjs()
    .tz(data.timezone)
    .add(2, "day")
    .hour(7)
    .minute(0)
    .second(0)
    .format("YYYY-MM-DDTHH:mm:ss");

  // Split hourly into today and tomorrow
  const hourly = data.hourly.reduce(
    (acc: any, element: any) => {
      // Convert seconds to ISO format for readability
      if (element.hasOwnProperty("dt"))
        element.dt = dayjs
          .tz(dayjs.unix(element.dt), data.timezone)
          .format("YYYY-MM-DDTHH:mm:ss");

      // Split into today and tomorrow
      dayjs(element.dt).isSameOrBefore(tom_morn) && acc[0].push(element);
      dayjs(element.dt).isBetween(tom_morn, after_tom_morn) &&
        acc[1].push(element);

      return acc;
    },
    [[], []]
  );

  // Create weather object
  const weatherObj = {
    address: formatted_address,
    weather: {
      current: {
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
      },
      today: hourly[0],
      tomorrow: hourly[1],
      next_week: data.daily.map((element: any) => ({
        ...element,
        dt: dayjs
          .tz(dayjs(element.dt), data.timezone)
          .format("YYYY-MM-DDTHH:mm:ss"),
        sunrise: dayjs
          .tz(dayjs(element.sunrise), data.timezone)
          .format("YYYY-MM-DDTHH:mm:ss"),
        sunset: dayjs
          .tz(dayjs(element.sunset), data.timezone)
          .format("YYYY-MM-DDTHH:mm:ss"),
      })),
    },
    gId: placeId,
    icon_times: data.daily.flatMap((element: any, index: any) =>
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
    updated: dayjs().format(),
  };

  // Conditionally assign alerts property if data.alerts exists
  Object.assign(
    weatherObj.weather,
    data.hasOwnProperty("alerts")
      ? {
          alerts: data.alerts.map((element: any) => ({
            ...element,
            start: dayjs
              .tz(dayjs(element.start), data.timezone)
              .format("YYYY-MM-DDTHH:mm:ss"),
            end: dayjs
              .tz(dayjs(element.end), data.timezone)
              .format("YYYY-MM-DDTHH:mm:ss"),
          })),
        }
      : null
  );

  return weatherObj;
};
