import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { formatTemp } from '@utilities/format';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ColorfulStat } from '@components/ColorfulStat';
dayjs.extend(isBetween);

interface MainWeatherProps {
  day: 'today' | 'tomorrow';
}

export const CurrentWeatherTimelineItem = ({ day }: MainWeatherProps) => {
  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );

  const { details } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather.weather[day]
  );

  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    dew_point,
    humidity,
    pressure,
    uvi,
    weather,
    wind_speed,
    pop,
  } = details;

  const icon = dayjs(dt).isBetween(sunrise, sunset) ? 'day' : 'night';

  return (
    <div className="space-y-5">
      <div className="bg-zinc-800 p-6 rounded-3xl relative space-y-10">
        <div className="relative">
          <div>
            <h1 className="text-7xl font-bold">
              {formatTemp[selectedTemp](temp.day)}°
            </h1>
            <h4 className="mt-1 font-medium opacity-50">
              feels like {formatTemp[selectedTemp](feels_like.day)}°
            </h4>
          </div>
          <i
            className={`wi wi-owm-${icon}-${weather[0].id} weather-icon text-8xl lg:text-9xl text-blue-200/90 absolute right-0 top-5`}
          />
        </div>

        <h2 className="text-4xl first-letter:capitalize font-medium">
          {weather[0].description}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ColorfulStat
          label="Humidity"
          value={humidity}
          bgColor="bg-slate-500"
        />
        <ColorfulStat label="Pressure" value={pressure} bgColor="bg-zinc-500" />
        <ColorfulStat
          label="UVI"
          value={uvi}
          bgColor="bg-yellow-500"
          textColor="text-gray-900"
        />
        <ColorfulStat
          label="Wind Speed"
          value={wind_speed}
          bgColor="bg-emerald-500"
        />
        <ColorfulStat
          label="Dew Point"
          value={dew_point}
          bgColor="bg-blue-500"
        />
        <ColorfulStat
          label="Chance of Rain"
          value={`${Math.floor(pop * 100)}%`}
          bgColor="bg-sky-500"
        />
      </div>
    </div>
  );
};
