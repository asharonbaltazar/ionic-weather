import { Fragment } from 'react';
import { MainPlaceholder } from '@pages/home/MainPagePlaceholder';
import { CurrentForecast } from '@pages/home/CurrentForecast';
import { LinkButtonWithIcon } from '@components/LInkButtonWithIcon';
import { useWeather } from '@utilities/hooks';
import { FullscreenLoading } from 'src/components/FullscreenLoading';

export const WeatherContent = () => {
  const { selectedWeather, loading } = useWeather();

  if (!selectedWeather) {
    return <MainPlaceholder />;
  }

  return (
    <Fragment>
      <FullscreenLoading loading={loading} />
      <div className="mt-4 space-y-5 px-3">
        <CurrentForecast selectedWeather={selectedWeather} />
        <div className="space-y-2 lg:hidden">
          <LinkButtonWithIcon icon="tabler:clock-hour-3" to="/hourly">
            Hourly Forecast
          </LinkButtonWithIcon>
          <LinkButtonWithIcon icon="tabler:calendar-event" to="/daily">
            Weekly Forecast
          </LinkButtonWithIcon>
        </div>
      </div>
    </Fragment>
  );
};