import { config } from 'firebase-functions';
import axios from 'axios';
import { PlaceAutocompleteResponse, GeocodingResponse } from '@google/maps';
import { onRequest } from '@api';
import { getFormattedGMapPredictions } from '@helpers';

// GOOGLE PLACES AUTOCOMPLETE
export const getGMapSuggestions = onRequest(async (request, response) => {
  const { query = '' } = request.query;

  if (query === '') {
    return response.status(400).send('City query has no length');
  }

  const { data } = await axios.get<PlaceAutocompleteResponse>(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&language=en&key=${
      config().gmaps.key
    }`
  );

  if (data.status === 'OK') {
    const predictions = getFormattedGMapPredictions(data);

    return response.status(200).send({ data: predictions, msg: '' });
  }

  if (data.status === 'ZERO_RESULTS') {
    return response.status(200).send({ data: [], msg: 'No city found' });
  }

  return response.status(200).send({ data: [], msg: '' });
});

// COORDINATES VIA GOOGLE PLACE ID
export const getGPlaceId = onRequest(async (request, response) => {
  const { id = '' } = request.query;

  if (id === '') {
    return response.status(400).send('Geocoding ID has no length');
  }

  const { data } = await axios.get<GeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${
      config().gmaps.key
    }`
  );

  if (data.status === 'OK') {
    return response.status(200).send(data);
  }

  if (data.status === 'ZERO_RESULTS') {
    return response.status(200).send('No city found');
  }

  return response.status(200).send({ results: [] });
});

// WEATHER VIA COORDINATES
export const getWeatherViaCoordinates = onRequest(async (request, response) => {
  const { lat = '', lon = '' } = request.query;

  if (lat === '' || lon === '') {
    return response.status(400).send('Latitude or longitude has no length');
  }

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${
      config().openweatherapi.key
    }`
  );

  return response.status(200).send(data);
});

// GEOLOCATION
export const getGeolocationPlaceData = onRequest(async (request, response) => {
  const { lat = '', lon = '' } = request.query;

  if (lat === '' || lon === '') {
    return response.status(400).send('Latitude or longitude has no length');
  }

  const { data } = await axios.get<GeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&location_type=APPROXIMATE&result_type=locality&key=${
      config().gmaps.key
    }`
  );

  if (data.status === 'OK') {
    return response.status(200).send(data);
  }

  if (data.status === 'ZERO_RESULTS') {
    return response.status(200).send('No city found');
  }

  return response.status(200).send({ results: [] });
});
