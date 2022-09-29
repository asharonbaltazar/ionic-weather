import { useWeather } from '@utilities/hooks';
import { DailyForecast } from '@pages/daily/DailyForecast';

export const DailyForecasts = () => {
  const { selectedWeather } = useWeather();

  if (!selectedWeather) {
    return null;
  }

  return (
    <ul className="space-y-2 overflow-auto px-3 py-4">
      {selectedWeather.daily.map((daily) => (
        <DailyForecast key={daily.dt} weekly={daily} />
      ))}
    </ul>
  );
};
