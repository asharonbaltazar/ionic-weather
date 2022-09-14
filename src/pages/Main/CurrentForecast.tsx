import { formatTemp } from '@utilities/format';
import { ColorfulStat } from '@components/ColorfulStat';
import { useSettings, useWeather } from '@utilities/hooks';
import { WeatherIcon } from '@components/WeatherIcon';

export const CurrentForecast = () => {
  const { tempPreference } = useSettings();

  const { selectedWeather } = useWeather();

  if (!selectedWeather) {
    return null;
  }

  const { details, dewPoint, feelsLike, humidity, pressure, temp, uvi, wind } =
    selectedWeather.current;

  const [{ pop }] = selectedWeather.hourly;

  return (
    <div className="space-y-5">
      <div className="relative space-y-10 rounded-3xl bg-slate-100 p-6 dark:bg-zinc-800">
        <div className="relative">
          <div>
            <h1 className="text-7xl font-bold text-slate-800 dark:text-stone-200">
              {formatTemp[tempPreference](temp)}°
            </h1>
            <h4 className="mt-1 font-medium text-slate-800 opacity-70 dark:text-stone-200 dark:opacity-50">
              feels like {formatTemp[tempPreference](feelsLike)}°
            </h4>
          </div>
          <WeatherIcon
            className="absolute right-0 top-5 text-7xl text-blue-400/90 dark:text-blue-200/90 lg:text-9xl"
            icon={details.icon}
          />
        </div>
        <h2 className="text-4xl font-medium text-slate-800 first-letter:capitalize dark:text-stone-200">
          {details.description}
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
          value={wind.speed}
          bgColor="bg-emerald-500"
        />
        <ColorfulStat
          label="Dew Point"
          value={dewPoint}
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
