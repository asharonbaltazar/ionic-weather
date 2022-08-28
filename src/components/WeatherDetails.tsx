import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { formatSpeed, formatTemp, getUviIndex } from '@utilities/format';
import dayjs from 'dayjs';
import { LabelAndValue } from '@components/LabelAndValue';

interface WeatherDetailsProps {
  sunrise?: string;
  sunset?: string;
  humidity: number;
  pressure: number;
  dew_point?: number;
  uvi?: number;
  wind_speed?: number;
  pop?: number;
  compass?: string;
}

export const WeatherDetails = ({
  sunrise,
  sunset,
  humidity,
  dew_point = 0,
  pressure,
  uvi = 0,
  wind_speed = 0,
  pop = 0,
}: WeatherDetailsProps) => {
  const { timePreference, windSpeedPreference, tempPreference } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  const exactTime = timePreference === 'h a' ? 'h:mm a' : 'HH:mm';

  return (
    <div className="flex flex-col">
      <LabelAndValue label="Humidity" value={humidity} />

      <LabelAndValue label="Pressure" value={`${pressure} mBar`} />

      <LabelAndValue
        label="Dew point"
        value={formatTemp[tempPreference](dew_point)}
      />
      <LabelAndValue
        label="UVI index"
        value={`${getUviIndex(uvi)}, ${Math.ceil(uvi)}`}
      />
      <LabelAndValue
        label="Wind"
        value={`${formatSpeed[windSpeedPreference](wind_speed)}`}
      />

      <LabelAndValue label="Change of rain" value={Math.floor(pop * 100)} />

      <LabelAndValue
        label="Sunrise/sunset"
        value={`${dayjs(sunrise).format(exactTime)}, ${dayjs(sunset).format(
          exactTime
        )}`}
      />
    </div>
  );
};
