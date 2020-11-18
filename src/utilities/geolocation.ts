import { Geolocation } from "@ionic-native/geolocation";

export const geolocation = async () => {
  try {
    const {
      coords: { latitude, longitude },
    } = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 20000,
    });
    return {
      latitude,
      longitude,
    };
  } catch (error) {
    return error.message;
  }
};
