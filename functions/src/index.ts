import * as functions from "firebase-functions";
import axios from "axios";
const cors = require("cors")({ origin: true });

export const getGMapSuggestions = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      try {
        // Split query from the url
        const query = request.url.split("/")[1];

        const results = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&language=en&key=${
            functions.config().googlemaps.key
          }`
        );

        if (results.data.status === "OK") {
          response.send(results.data);
        } else if (results.data.status === "ZERO_RESULTS") {
          response.send("No city found");
        }
      } catch (error) {
        response.send("Internal Server Error");
      }
    });
  }
);

export const getGPlaceId = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      // Split query from the url
      const id = request.url.split("/")[1];

      const results = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${
          functions.config().googlemaps.key
        }`
      );

      response.send(results.data);
    } catch (error) {
      response.send("Internal Server Error");
    }
  });
});
