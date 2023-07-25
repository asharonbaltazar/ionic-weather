import { Fragment } from 'react';
import { MainPlaceholder } from '@pages/home/MainPagePlaceholder';
import { CurrentForecast } from '@pages/home/CurrentForecast';
import { LinkButtonWithIcon } from '@components/LInkButtonWithIcon';
import { useWeather } from '@utilities/hooks';

export const WeatherContent = () => {
  const { data: weather } = useWeather();

  if (!weather) {
    return <MainPlaceholder />;
  }

  return (
    <Fragment>
      <div className="mt-4 space-y-5 px-3">
        <CurrentForecast selectedWeather={weather} />
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
