import { config, logger } from 'firebase-functions';
import axios from 'axios';
import { PlaceAutocompleteResponse, GeocodingResponse } from '@google/maps';
import { onRequest } from '@api';
import {
  getFirstGMapGeocodeResult,
  getFormattedGMapPredictions,
  getFormattedWeather,
} from '@helpers';
import { OpenWeatherMapResponse } from '@types';

// GOOGLE PLACES AUTOCOMPLETE
export const getGMapSuggestions = onRequest(async (request, response) => {
  const { query = '' } = request.query;

  if (query === '') {
    return response.status(400).send({ error: 'City query has no length' });
  }

  const { data } = await axios.get<PlaceAutocompleteResponse>(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&language=en&key=${
      config().gmaps.key
    }`
  );

  if (data.status === 'OK') {
    const predictions = getFormattedGMapPredictions(data);

    return response.status(200).send(predictions);
  }

  if (data.status === 'ZERO_RESULTS') {
    return response.status(200).send({ error: 'No city found' });
  }

  logger.debug(data);
  return response.status(500).send({ error: 'Internal Server Error' });
});

// COORDINATES VIA GOOGLE PLACE ID
export const getGPlaceId = onRequest(async (request, response) => {
  const { id = '' } = request.query;

  if (id === '') {
    return response.status(400).send({ error: 'Geocoding ID has no length' });
  }

  const { data } = await axios.get<GeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${
      config().gmaps.key
    }`
  );

  if (data.status === 'OK') {
    const geocodeResult = getFirstGMapGeocodeResult(data);

    return response.status(200).send(geocodeResult);
  }

  if (data.status === 'ZERO_RESULTS') {
    return response.status(200).send({ error: 'No city found' });
  }

  return response.status(500).send({ error: 'Internal Server Error' });
});

// GEOLOCATION
export const getGeolocationPlaceData = onRequest(async (request, response) => {
  const { lat = '', lon = '' } = request.query;

  if (lat === '' || lon === '') {
    return response
      .status(400)
      .send({ error: 'Latitude or longitude has no length' });
  }

  const { data } = await axios.get<GeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&location_type=APPROXIMATE&result_type=locality&key=${
      config().gmaps.key
    }`
  );

  if (data.status === 'OK') {
    const geocodeResult = getFirstGMapGeocodeResult(data);

    return response.status(200).send(geocodeResult);
  }

  if (data.status === 'ZERO_RESULTS') {
    return response.status(200).send({ error: 'No city found' });
  }

  logger.debug(data);
  return response.status(500).send({ error: 'Internal Server Error' });
});

// WEATHER VIA COORDINATES
export const getWeatherViaCoordinates = onRequest(async (request, response) => {
  const { lat = '', lon = '' } = request.query;

  if (lat === '' || lon === '') {
    return response
      .status(400)
      .send({ error: 'Latitude or longitude has no length' });
  }

  const { data: weather, status } = await axios.get<OpenWeatherMapResponse>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${
      config().openweatherapi.key
    }`
  );

  if (status === 200) {
    const formattedWeather = getFormattedWeather(weather);

    return response.status(200).send(formattedWeather);
  }

  logger.error(weather, status);
  return response.status(500).send({ error: 'Internal Server Error' });
});
