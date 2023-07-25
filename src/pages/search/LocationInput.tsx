import { useState } from 'react';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import { Input } from '@components/Input';

type LocationInputProps = {
  getLocation: (locationString: string) => void;
};

export const LocationInput = ({ getLocation }: LocationInputProps) => {
  const [locationQuery, setLocationQuery] = useState('');
  const [debouncedLocationQuery] = useDebouncedValue(locationQuery, 750);

  useDidUpdate(() => {
    if (debouncedLocationQuery.trim().length) {
      getLocation(debouncedLocationQuery);
    }
  }, [debouncedLocationQuery]);

  return (
    <div className="mt-4 px-3">
      <Input
        placeholder="e.g. Baltimore"
        label="City Name"
        onChange={(e) => setLocationQuery(e.currentTarget.value)}
        value={locationQuery}
      />
    </div>
  );
};
