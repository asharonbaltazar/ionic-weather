import { DailyWeather } from '@functions/types';
import { useFormatting } from '@utilities/hooks';

interface DailyTempProps {
  temp: DailyWeather['temp'];
  open: boolean;
}

export const DailyTemp = ({ temp, open }: DailyTempProps) => {
  const { formatTemp } = useFormatting();

  const { day, night } = temp;

  if (open) {
    return (
      <div>
        <p className="text">
          <span className="text-sm text-gray-900/50 dark:text-stone-200/70">
            Day:
          </span>{' '}
          <span className="font-semibold">{formatTemp(day)}</span>
        </p>
        <p className="text">
          <span className="text-sm text-gray-900/50 dark:text-stone-200/70">
            Night:
          </span>{' '}
          <span className="font-semibold">{formatTemp(night)}</span>
        </p>
      </div>
    );
  }

  return <p className="text text-xl font-semibold">{formatTemp(day)}</p>;
};
