import { useWeather } from '@utilities/hooks';
import { Redirect } from 'react-router';
import { HourlyForecast } from './HourlyForecast';

export const HourlyForecasts = () => {
  const { selectedWeather } = useWeather();

  if (!selectedWeather) {
    return <Redirect to="/" />;
  }

  return (
    <main className="mt-4 px-3 pb-4">
      <ul className="space-y-4">
        {selectedWeather.hourly.map((hourly) => (
          <HourlyForecast key={hourly.dt} {...hourly} />
        ))}
      </ul>
    </main>
  );
};