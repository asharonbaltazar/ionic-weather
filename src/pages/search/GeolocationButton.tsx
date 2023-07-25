import { ButtonWithIcon } from '@components/ButtonWithIcon';
import { useLazyGeocodeByCoordsQuery } from '@slices/location';
import { useNavigate } from 'react-router-dom';

export const GeolocationButton = () => {
  const [getGeocode] = useLazyGeocodeByCoordsQuery();
  const navigate = useNavigate();

  const getGeoLocation = async () => {
    const { isSuccess } = await getGeocode({ isGeolocation: true });

    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <div className="mt-3 md:mt-5">
      <ButtonWithIcon onClick={getGeoLocation} icon="tabler:current-location">
        Use your current location
      </ButtonWithIcon>
    </div>
  );
};
