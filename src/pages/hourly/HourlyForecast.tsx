import { HourlyWeather } from '@functions/types';
import { useFormatting } from 'src/utilities/hooks';

interface HourlyForecastProps {
  hourly: HourlyWeather;
}

export const HourlyForecast = ({ hourly }: HourlyForecastProps) => {
  const { formatTemp, formatTime } = useFormatting();

  const { details, dt, temp, feelsLike } = hourly;

  return (
    <li className="space-y-1">
      <span className="pl-2 text-sm text-gray-900/50 dark:text-stone-200/70">
        {formatTime(dt)}
      </span>
      <div className="space-y-1 rounded-3xl bg-slate-100 px-3 py-6 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <p className="text text-xl first-letter:capitalize">
            {details.description}
          </p>

          <div className="text-right">
            <p className="text text-xl font-semibold">{formatTemp(temp)}</p>
            <p className="text-xs text-slate-800 opacity-70 dark:text-stone-200/70">
              feels like {formatTemp(feelsLike)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
