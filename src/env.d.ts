/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_GET_GPLACE_ID: string;
  VITE_GET_WEATHER_VIA_COORDS: string;
  VITE_GET_GMAPS_SUGGESTIONS: string;
  VITE_GET_GEOLOCATION_DATA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
