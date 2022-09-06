import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetQueries, setSearchLoading } from '@slices/searchSlice';
import { getPredictionsByQuery } from '@slices/searchSlice.thunks';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import { RootState } from '@store';
import { Input } from '@components/Input';

export const LocationInput = () => {
  const [locationQuery, setLocationQuery] = useState('');
  const [debouncedLocationQuery] = useDebouncedValue(locationQuery, 750);

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.searchSlice);

  useDidUpdate(() => {
    if (debouncedLocationQuery.trim().length) {
      dispatch(getPredictionsByQuery(debouncedLocationQuery));
    } else {
      dispatch(resetQueries());
    }
  }, [debouncedLocationQuery]);

  const onSearch = (newQuery: string) => {
    if (!loading && newQuery.trim().length) {
      dispatch(setSearchLoading(true));
    }

    setLocationQuery(newQuery);
  };

  return (
    <div className="mt-4 px-3">
      <Input
        placeholder="e.g. Baltimore"
        label="City Name"
        onChange={(e) => onSearch(e.currentTarget.value)}
        value={locationQuery}
      />
    </div>
  );
};
