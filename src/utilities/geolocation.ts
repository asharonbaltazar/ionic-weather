export const getGeolocation = async (
  successCallback: () => void = () => {},
  rejectedCallback?: () => void
) => {
  try {
    return await new Promise<GeolocationPosition>(() =>
      navigator.geolocation.getCurrentPosition(
        successCallback,
        rejectedCallback
      )
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
