import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { HourlyForecasts } from '@pages/hourly/HourlyForecasts';

export const Hourly = () => (
  <div className="h-screen">
    <HeaderWithBackButton title="Hourly" />
    <HourlyForecasts />
  </div>
);
