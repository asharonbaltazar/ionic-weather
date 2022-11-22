import { useAppDispatch } from '@store';
import { clearRecentLocations } from '@slices/searchSlice';

export const ClearRecentLocations = () => {
  const dispatch = useAppDispatch();

  const onClear = () => {
    dispatch(clearRecentLocations());
  };

  return (
    <button
      className="rounded-md px-1.5 py-0.5 text-sm font-medium text-gray-500 hover:bg-slate-500 hover:text-slate-100"
      onClick={onClear}
    >
      Clear
    </button>
  );
};
