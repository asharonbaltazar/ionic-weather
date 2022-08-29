import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { changeTimePreference } from '@slices/settingsSlice';
import { Switch } from '@components/Switch';

export const TimePreference = () => {
  const { timePreference } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  const dispatch = useAppDispatch();

  const checked = timePreference === 'HH:mm';

  const onClick = () =>
    dispatch(changeTimePreference(checked ? 'h a' : 'HH:mm'));

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
