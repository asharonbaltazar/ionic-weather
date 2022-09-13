import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { BaseWeather } from '@functions/types';

dayjs.extend(isBetween);

type WeatherIconProps = { weather: BaseWeather } & DetailedHTMLProps<
  HtmlHTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const WeatherIcon = ({
  weather,
  className,
  ...iProps
}: WeatherIconProps) => {
  const {
    dt,
    sunrise,
    sunset,
    details: { id },
  } = weather;

  const timeOfDay = dayjs(dt).isBetween(sunrise, sunset) ? 'day' : 'night';

  return (
    <i
      // Disabling due to custom CSS className for weather icons
      className={clsx(`wi wi-owm-${timeOfDay}-${id}`, className)} // eslint-disable-line
      {...iProps}
    />
  );
};
