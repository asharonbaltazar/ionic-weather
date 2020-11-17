import * as functions from "firebase-functions";
import axios from "axios";
const cors = require("cors")({ origin: true });

// This is for the Google Places suggestions
export const getGMapSuggestions = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      try {
        // Split query from the url
        const query = request.url.split("/")[1];

        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&language=en&key=${
            functions.config().googlemaps.key
          }`
        );

        if (data.status === "OK") {
          response.send(data);
        } else if (data.status === "ZERO_RESULTS") {
          response.send("No city found");
        }
      } catch (error) {
        response.send("Internal Server Error");
      }
    });
  }
);

// This is for the coordinates of the selected place via Google Geocoding
export const getGPlaceId = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      // Split query from the url
      const id = request.url.split("/")[1];

      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${
          functions.config().googlemaps.key
        }`
      );

      if (data.status === "OK") {
        response.send(data);
      } else if (data.status === "ZERO_RESULTS") {
        response.send("No city found");
      } else {
        response.send("Please contact the developer");
      }
    } catch (error) {
      response.send("Internal Server Error");
    }
  });
});

// This is for the weather via coordinates
export const getWeatherViaCoordinates = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      try {
        const [, lat, lon] = request.url.split("/");

        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${
            functions.config().openweatherapi.key
          }`
        );

        response.send(data);
      } catch (error) {
        response.send("Internal Server Error");
      }
    });
  }
);

// This is for the geolocation function
export const getGeolocationPlaceData = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      try {
        const [, lat, lon] = request.url.split("/");

        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&location_type=APPROXIMATE&result_type=locality&key=${
            functions.config().googlemaps.key
          }`
        );

        if (data.status === "OK") {
          response.send(data);
        } else if (data.status === "ZERO_RESULTS") {
          response.send("No city found");
        } else {
          response.send("Please contact the developer");
        }
      } catch (error) {
        response.send("Internal Server Error");
      }
    });
  }
);
