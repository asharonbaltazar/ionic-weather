export const getGeolocation = () =>
  new Promise<GeolocationPosition>((res, rej) =>
    navigator.geolocation.getCurrentPosition(res, rej)
  ).catch((error) => {
    console.error(error);
    return null;
  });
