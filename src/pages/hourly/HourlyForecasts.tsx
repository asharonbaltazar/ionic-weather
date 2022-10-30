import { useWeather } from '@utilities/hooks';
import { HourlyForecast } from '@pages/hourly/HourlyForecast';

export const HourlyForecasts = () => {
  const { selectedWeather } = useWeather();

  if (!selectedWeather) {
    return null;
  }

  return (
    <ul className="space-y-2 overflow-auto px-3 py-4">
      {selectedWeather.hourly.map((hourly) => (
        <HourlyForecast key={hourly.dt} hourly={hourly} />
      ))}
    </ul>
  );
};
