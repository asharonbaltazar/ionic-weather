import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

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
  const tom_morn = dayjs().add(1, "day").hour(6).minute(0).second(0);
  // after tomorrow morning
  const after_tom_morn = dayjs().add(2, "day").hour(6).minute(0).second(0);

  // Split hourly into today and tomorrow
  const hourly = data.hourly.reduce(
    (acc: any, element: any) => {
      // Convert seconds to ISO format for readability
      if (element.hasOwnProperty("dt"))
        element.dt = new Date(element.dt * 1000).toISOString();

      // Split into today and tomorrow
      dayjs(element.dt).isBefore(tom_morn) && acc[0].push(element);
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
        dt: new Date(data.current.dt * 1000).toISOString(),
        sunrise: new Date(data.current.sunrise * 1000).toISOString(),
        sunset: new Date(data.current.sunset * 1000).toISOString(),
      },
      today: hourly[0],
      tomorrow: hourly[1],
      next_week: data.daily.map((element: any, index: number) => ({
        ...element,
        dt: new Date(element.dt * 1000).toISOString(),
        sunrise: new Date(element.sunrise * 1000).toISOString(),
        sunset: new Date(element.sunset * 1000).toISOString(),
      })),
    },
    gId: placeId,
    icon_times: data.daily.flatMap((element: any, index: any) =>
      index <= 2
        ? {
            sunrise: new Date(element.sunrise * 1000).toISOString(),
            sunset: new Date(element.sunset * 1000).toISOString(),
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
            start: new Date(element.start * 1000).toISOString(),
            end: new Date(element.end * 1000).toISOString(),
          })),
        }
      : null
  );

  return weatherObj;
};
