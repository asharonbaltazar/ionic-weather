import { MainPlaceholder } from '@pages/main/MainPagePlaceholder';
import { CurrentForecast } from '@pages/main/CurrentForecast';
import { LinkButtonWithIcon } from '@components/LInkButtonWithIcon';
import { useWeather } from '@utilities/hooks';

export const WeatherContent = () => {
  const { selectedWeather } = useWeather();

  if (!selectedWeather) {
    return <MainPlaceholder />;
  }

  return (
    <main className="mt-4 space-y-5 px-3">
      <CurrentForecast />
      <div className="space-y-2">
        <LinkButtonWithIcon icon="tabler:clock-hour-3" to="/hourly">
          Hourly Forecast
        </LinkButtonWithIcon>
        <LinkButtonWithIcon icon="tabler:calendar-event" to="/weekly">
          Weekly Forecast
        </LinkButtonWithIcon>
      </div>
    </main>
  );
};
