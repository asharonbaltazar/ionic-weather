import { DailyWeather } from '@functions/types';
import { useFormatting } from '@utilities/hooks';

interface DailyTempProps {
  temp: DailyWeather['temp'];
  open: boolean;
}

export const DailyTemp = ({ temp, open }: DailyTempProps) => {
  const { formatTemp } = useFormatting();

  const { max, min } = temp;

  if (open) {
    return (
      <div>
        <p className="text font-semibold">{formatTemp(max)}</p>
        <p className="text text-gray-900/50 dark:text-stone-200/70">
          {formatTemp(min)}
        </p>
      </div>
    );
  }

  return <p className="text text-xl font-semibold">{formatTemp(max)}</p>;
};
