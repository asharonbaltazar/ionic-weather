
# Ionic Weather
## 🌥 An open-source weather app, built with the Ionic framework 🌧

### Instructions for installing
It's a bit of a setup, thankfully not too complicated, but *it is* long — so bear with me. 
##### npm
 - Clone this repo
 - `npm install` 
##### firebase
- Navigate to the functions folder (`cd functions`)
 - `npm install` again
 - Make an account on firebase.google.com (it's free) and create a new project. Then make an account for Google's Cloud Platform. Have an API key ready. Do the same with OpenWeatherMap
 - Back at the console, type `firebase login`; it'll open up the browser for you to log in.
 - Pick your project from the console using the arrow keys
 - Run `firebase functions:config:set gmaps.key="YOUR_API_KEY"`
 - Replace `gmaps.key` with `owmapi.key` and run that function again
 - Run `firebase deploy`. It'll deploy the functions in the `index.ts` file and upload them to your firebase project. 
 - Create a `.env.local` file in the root directory of the project, and use your firebase function URLs to create these variables: 
	 1. `REACT_APP_GET_GPLACE_ID=getGPlaceId`
	2.  `REACT_APP_GET_WEATHER_VIA_COORDS=getWeatherViaCoordinates` 
	3. `REACT_APP_GET_GMAPS_SUGGESTIONS=getGMapSuggestions` 
	4. `REACT_APP_GET_GEOLOCATION_DATA=getGeolocationPlaceData` 

### That's it. You're all set. Just have your commits begin with the issue-number. Thank you! 🤗
