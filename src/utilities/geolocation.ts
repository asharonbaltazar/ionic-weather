export const geolocation = async () => {
  try {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  } catch (error) {
    return error.message;
  }
};
