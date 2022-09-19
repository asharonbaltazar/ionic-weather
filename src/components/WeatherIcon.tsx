import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { BaseDetails } from '@functions/types';

dayjs.extend(isBetween);

type WeatherIconProps = { icon: BaseDetails['icon'] } & DetailedHTMLProps<
  HtmlHTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const WeatherIcon = ({
  icon,
  className,
  ...iProps
}: WeatherIconProps) => (
  <i
    // Disabling due to custom CSS className for weather icons
    className={clsx(`wi wi-owm-${icon}`, className)} // eslint-disable-line
    {...iProps}
  />
);
