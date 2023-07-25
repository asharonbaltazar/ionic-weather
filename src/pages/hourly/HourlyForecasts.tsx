import { HourlyForecast } from '@pages/hourly/HourlyForecast';
import { useWeather } from '@utilities/hooks';

export const HourlyForecasts = () => {
  const { data: weather } = useWeather();

  if (!weather) {
    return null;
  }

  return (
    <ul className="space-y-2 overflow-auto px-3 py-4">
      {weather.hourly.map((hourly) => (
        <HourlyForecast key={hourly.dt} hourly={hourly} />
      ))}
    </ul>
  );
};
