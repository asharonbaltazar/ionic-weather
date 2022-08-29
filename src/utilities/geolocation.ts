export const getGeolocation = async () => {
  try {
    return await new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(res, rej)
    );
  } catch (error) {
    return error.message;
  }
};
