import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetLocations, setSearchLoading } from '@slices/searchSlice';
import { getLocationByQuery } from '@slices/searchSlice.thunks';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import { Input } from '@components/Input';
import { useSearch } from '@utilities/hooks';

export const LocationInput = () => {
  const [locationQuery, setLocationQuery] = useState('');
  const [debouncedLocationQuery] = useDebouncedValue(locationQuery, 750);

  const dispatch = useDispatch();
  const { loading } = useSearch();

  useDidUpdate(() => {
    if (debouncedLocationQuery.trim().length) {
      dispatch(getLocationByQuery(debouncedLocationQuery));
    } else {
      dispatch(resetLocations());
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
