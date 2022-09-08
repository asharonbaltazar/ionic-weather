export const getGeolocation = async (
  successCallback: (geolocation: GeolocationPosition) => void = () => {},
  rejectedCallback: (error?: unknown) => void = () => {}
) =>
  new Promise<GeolocationPosition>(() =>
    navigator.geolocation.getCurrentPosition(successCallback, rejectedCallback)
  ).catch((error) => {
    console.error(error);
    return null;
  });
