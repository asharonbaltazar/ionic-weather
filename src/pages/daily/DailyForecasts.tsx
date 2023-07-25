import { DailyForecast } from '@pages/daily/DailyForecast';
import { useWeather } from '@utilities/hooks';

export const DailyForecasts = () => {
  const { data: weather } = useWeather();

  if (!weather) {
    return null;
  }

  return (
    <ul className="space-y-2 overflow-auto px-3 py-4">
      {weather.daily.map((daily) => (
        <DailyForecast key={daily.dt} daily={daily} />
      ))}
    </ul>
  );
};
