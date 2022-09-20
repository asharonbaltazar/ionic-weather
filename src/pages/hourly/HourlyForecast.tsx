import { HourlyWeather } from '@functions/types';
import { WeatherIcon } from '@components/WeatherIcon';
import { useFormatting } from 'src/utilities/hooks';

interface HourlyForecastProps {
  hourly: HourlyWeather;
}

export const HourlyForecast = ({ hourly }: HourlyForecastProps) => {
  const { formatTemp, formatTime } = useFormatting();

  const { details, dt, temp } = hourly;

  return (
    <li className="space-y-1">
      <span className="pl-2 text-sm text-gray-900/50 dark:text-stone-200/70">
        {formatTime(dt)}
      </span>
      <div className="space-y-1 rounded-3xl bg-slate-100 px-3 py-6 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <WeatherIcon
              className="text-3xl text-blue-400/90 dark:text-blue-200/90"
              icon={details.icon}
            />
            <p className="text-xl first-letter:capitalize">
              {details.description}
            </p>
          </div>
          <p className="text-xl font-semibold">{formatTemp(temp)}</p>
        </div>
      </div>
    </li>
  );
};
