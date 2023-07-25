import { useAppDispatch, useAppSelector } from '@store';
import { Switch } from '@components/Switch';
import { setTimePreference } from '@slices/app';

export const TimePreference = () => {
  const { time } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const checked = time === 'HH:mm';

  const onClick = () =>
    dispatch(setTimePreference(checked ? 'hh:mm a' : 'HH:mm'));

  return (
    <div className="flex items-center justify-between">
      <button
        className="text flex w-full items-center justify-between gap-x-2 rounded bg-slate-100 p-2 font-medium dark:bg-zinc-800 dark:hover:bg-slate-700"
        onClick={onClick}
      >
        24 Hour Format:
        <Switch checked={checked} />
      </button>
    </div>
  );
};
