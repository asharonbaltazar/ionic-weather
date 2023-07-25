import { useAppDispatch } from '@store';
import { clearRecentLocations } from '@slices/app';

export const ClearRecentLocations = () => {
  const dispatch = useAppDispatch();

  const onClear = () => {
    dispatch(clearRecentLocations());
  };

  return (
    <button
      className="rounded-md px-1.5 py-0.5 text-sm font-medium text-gray-500 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 hover:dark:text-slate-200"
      onClick={onClear}
    >
      Clear
    </button>
  );
};
